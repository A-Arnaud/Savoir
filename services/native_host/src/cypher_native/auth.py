"""Official public-client Sign in with ChatGPT; no imported app credentials."""
import base64
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import math
from pathlib import Path
import secrets
import threading
import time
from urllib.parse import parse_qs, urlencode, urlsplit
import webbrowser

import httpx
import jwt

from .secure_store import SecureStore, StorageError

ISSUER = 'https://auth.openai.com'
AUTHORIZE = ISSUER + '/api/accounts/authorize'
TOKEN = ISSUER + '/api/accounts/oauth/token'
JWKS = ISSUER + '/.well-known/jwks.json'
DISCOVERY = ISSUER + '/.well-known/openid-configuration'
RESOURCE = 'https://api.openai.com/v1'
DIRECT_SCOPE = 'chatgpt.tokens.use.direct'
DYNAMIC_CLIENT = 'dynamic_agent_client'


class AuthError(Exception):
    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(message)


class AuthManager:
    callback_timeout = 180.0

    def __init__(self, data_dir: Path, client: httpx.Client | None = None, open_browser=None):
        # Disable environment proxies for credentials; injected clients are explicit trust seams.
        self.client = client if client is not None else httpx.Client(trust_env=False, timeout=httpx.Timeout(30, connect=10), follow_redirects=False)
        self.open_browser = open_browser if open_browser is not None else webbrowser.open
        self.store = SecureStore(data_dir)
        self._connect_lock = threading.Lock()

    def _request(self, method, url, **kwargs):
        try:
            response = self.client.request(method, url, follow_redirects=False, timeout=httpx.Timeout(30, connect=10), **kwargs)
            if response.status_code != 200:
                code = 'auth_required' if response.status_code in (400, 401, 403) else 'auth_unavailable'
                raise AuthError(code, 'ChatGPT authorization could not be completed.')
            value = response.json()
            if not isinstance(value, dict):
                raise ValueError()
            return value
        except AuthError:
            raise
        except Exception:
            raise AuthError('auth_unavailable', 'ChatGPT authorization service is unavailable.') from None

    @staticmethod
    def _status(record):
        if not record or not record.get('access_token'):
            return {'connected': False}
        account_id = hashlib.sha256((record['client_id'] + '\0' + record['subject']).encode()).hexdigest()
        return {'connected': True, 'accountLabel': record.get('email') or 'ChatGPT', 'accountId': account_id}

    def status(self) -> dict:
        try:
            return self._status(self.store.load())
        except (StorageError, KeyError, TypeError):
            return {'connected': False}

    def _validate_identity(self, token, client_id, nonce=None, subject=None):
        try:
            if not isinstance(token, str) or len(token) > 65536:
                raise ValueError()
            header = jwt.get_unverified_header(token)
            if header.get('alg') != 'RS256' or not isinstance(header.get('kid'), str):
                raise ValueError()
            keys = self._request('GET', JWKS)['keys']
            matching = [key for key in keys if key.get('kid') == header['kid'] and key.get('kty') == 'RSA' and key.get('use', 'sig') == 'sig']
            if len(matching) != 1:
                raise ValueError()
            key = jwt.PyJWK.from_dict(matching[0], algorithm='RS256').key
            claims = jwt.decode(token, key, algorithms=['RS256'], issuer=ISSUER, audience=client_id, options={'require': ['iss', 'aud', 'exp', 'iat', 'sub']}, leeway=5)
            if not isinstance(claims['sub'], str) or not claims['sub'].strip():
                raise ValueError()
            if nonce is not None and (not isinstance(claims.get('nonce'), str) or not secrets.compare_digest(claims['nonce'], nonce)):
                raise ValueError()
            if subject is not None and claims['sub'] != subject:
                raise ValueError()
            if isinstance(claims['aud'], list) and len(claims['aud']) > 1 and claims.get('azp') != client_id:
                raise ValueError()
            return claims
        except Exception:
            raise AuthError('invalid_identity', 'ChatGPT identity could not be verified.') from None

    def _record(self, tokens, client_id, old=None, nonce=None):
        try:
            scopes = tokens.get('scope')
            if scopes is None and old and nonce is None:
                scopes = ' '.join(old['scopes'])
            if not isinstance(scopes, str) or DIRECT_SCOPE not in scopes.split():
                raise AuthError('scope_required', 'ChatGPT plan permission was not granted.')
            for name in ('access_token',):
                if not isinstance(tokens.get(name), str) or not tokens[name] or len(tokens[name]) > 65536:
                    raise ValueError()
            if tokens.get('token_type', '').lower() != 'bearer':
                raise ValueError()
            expires = tokens['expires_in']
            if isinstance(expires, bool) or not isinstance(expires, (int, float)) or not math.isfinite(expires) or expires <= 0:
                raise ValueError()
            refresh = tokens.get('refresh_token')
            if 'refresh_token' not in tokens and nonce is None:
                refresh = (old or {}).get('refresh_token')
            if not isinstance(refresh, str) or not refresh or len(refresh) > 65536:
                raise ValueError()
            if nonce is not None or tokens.get('id_token'):
                identity = self._validate_identity(tokens.get('id_token'), client_id, nonce, (old or {}).get('subject'))
            elif old:
                identity = {'sub': old['subject'], 'email': old.get('email')}
            else:
                raise ValueError()
            email = identity.get('email')
            if not isinstance(email, str) or len(email) > 320 or any(ord(c) < 32 for c in email):
                email = None
            return {'client_id': client_id, 'subject': identity['sub'], 'issuer': ISSUER, 'email': email,
                    'access_token': tokens['access_token'], 'refresh_token': refresh,
                    'id_token': tokens.get('id_token') or (old or {}).get('id_token'),
                    'token_type': 'Bearer', 'scopes': scopes.split(), 'expires_at': time.time() + expires}
        except AuthError:
            raise
        except Exception:
            raise AuthError('invalid_tokens', 'ChatGPT returned invalid credentials.') from None

    def connect(self, cancel: threading.Event, notify) -> dict:
        if not self._connect_lock.acquire(blocking=False):
            raise AuthError('auth_busy', 'A ChatGPT sign-in is already in progress.')
        try:
            return self._connect(cancel, notify)
        except StorageError:
            raise AuthError('storage_error', 'Protected credential storage is unavailable.') from None
        finally:
            self._connect_lock.release()

    def _connect(self, cancel, notify):
        if cancel.is_set():
            raise AuthError('cancelled', 'ChatGPT sign-in was cancelled.')
        host_id = self.store.host_id()
        previous = self.store.load()
        selected_id = (previous or {}).get('client_id', DYNAMIC_CLIENT)
        state, nonce, verifier = (secrets.token_urlsafe(48) for _ in range(3))
        challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode('ascii')).digest()).rstrip(b'=').decode('ascii')
        received = threading.Event()
        callback = {}
        callback_lock = threading.Lock()

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def setup(self):
                super().setup()
                self.connection.settimeout(1)

            def do_GET(self):
                parsed = urlsplit(self.path)
                if parsed.path != '/auth/callback' or len(self.path) > 16384 or self.headers.get('Host') != f'127.0.0.1:{self.server.server_port}':
                    self.send_error(400, 'Invalid callback')
                    return
                values = parse_qs(parsed.query, keep_blank_values=True, max_num_fields=20)
                with callback_lock:
                    if not received.is_set():
                        callback.update({key: vals[0] for key, vals in values.items() if len(vals) == 1})
                        received.set()
                body = b'You can close this window and return to Savoir.'
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.send_header('Cache-Control', 'no-store')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)

        class Server(ThreadingHTTPServer):
            daemon_threads = True
            def handle_error(self, request, client_address):
                pass  # Never emit callback traces or URLs to stderr.

        try:
            server = Server(('127.0.0.1', 0), Handler)
        except OSError:
            raise AuthError('callback_unavailable', 'Local sign-in listener is unavailable.') from None
        thread = threading.Thread(target=server.serve_forever, kwargs={'poll_interval': .05}, daemon=True)
        thread.start()
        redirect = f'http://127.0.0.1:{server.server_port}/auth/callback'
        params = {'client_id': selected_id, 'ext_agent_host_id': host_id, 'response_type': 'code',
                  'redirect_uri': redirect, 'scope': 'openid profile email offline_access resource.invoke ' + DIRECT_SCOPE,
                  'resource': RESOURCE, 'state': state, 'nonce': nonce, 'code_challenge_method': 'S256', 'code_challenge': challenge}
        if selected_id == DYNAMIC_CLIENT:
            params['agent_name_hint'] = 'Savoir'
        elif (previous or {}).get('id_token'):
            params['id_token_hint'] = previous['id_token']
        try:
            notify({'type': 'auth_pending'})
            try:
                opened = self.open_browser(AUTHORIZE + '?' + urlencode(params))
            except Exception:
                raise AuthError('browser_unavailable', 'The sign-in browser could not be opened.') from None
            if opened is False:
                raise AuthError('browser_unavailable', 'The sign-in browser could not be opened.')
            deadline = time.monotonic() + self.callback_timeout
            while not received.wait(.025):
                if cancel.is_set():
                    raise AuthError('cancelled', 'ChatGPT sign-in was cancelled.')
                if time.monotonic() >= deadline:
                    raise AuthError('auth_timeout', 'ChatGPT sign-in timed out.')
            if cancel.is_set():
                raise AuthError('cancelled', 'ChatGPT sign-in was cancelled.')
            if not secrets.compare_digest(callback.get('state', ''), state):
                raise AuthError('invalid_state', 'ChatGPT sign-in could not be verified.')
            if callback.get('error'):
                raise AuthError('consent_denied', 'ChatGPT sign-in was declined or could not be completed.')
            issued = callback.get('client_id', selected_id)
            if not issued or issued == DYNAMIC_CLIENT or len(issued) > 512 or (selected_id != DYNAMIC_CLIENT and issued != selected_id):
                raise AuthError('invalid_client', 'ChatGPT registration could not be verified.')
            code = callback.get('code')
            if not code:
                raise AuthError('invalid_callback', 'ChatGPT sign-in did not return an authorization code.')
            tokens = self._request('POST', TOKEN, data={'grant_type': 'authorization_code', 'client_id': issued, 'code': code, 'code_verifier': verifier, 'redirect_uri': redirect, 'resource': RESOURCE})
            record = self._record(tokens, issued, old=previous, nonce=nonce)
            if cancel.is_set():
                raise AuthError('cancelled', 'ChatGPT sign-in was cancelled.')
            with self.store.locked():
                # Do not resurrect a session explicitly disconnected during the browser flow.
                if self.store.load() != previous:
                    raise AuthError('auth_changed', 'ChatGPT account changed during sign-in. Please retry.')
                self.store.save(record)
            return self._status(record)
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def access_token(self) -> str:
        try:
            with self.store.locked():
                record = self.store.load()
                if not record or not record.get('access_token'):
                    raise AuthError('auth_required', 'Continue with ChatGPT to connect your account.')
                if record.get('expires_at', 0) <= time.time() + 60:
                    tokens = self._request('POST', TOKEN, data={'grant_type': 'refresh_token', 'client_id': record['client_id'], 'refresh_token': record['refresh_token'], 'resource': RESOURCE})
                    record = self._record(tokens, record['client_id'], old=record)
                    self.store.save(record)
                return record['access_token']
        except StorageError:
            raise AuthError('storage_error', 'Protected credential storage is unavailable.') from None

    def disconnect(self) -> dict:
        confirmed = True
        try:
            with self.store.locked():
                record = self.store.load()
                if record and record.get('refresh_token'):
                    confirmed = False
                    try:
                        discovery = self._request('GET', DISCOVERY)
                        endpoint = discovery.get('revocation_endpoint', '')
                        parsed = urlsplit(endpoint)
                        if discovery.get('issuer') != ISSUER or parsed.scheme != 'https' or parsed.netloc != 'auth.openai.com' or parsed.fragment or parsed.query:
                            raise ValueError()
                        for attempt in range(2):
                            try:
                                result = self.client.post(endpoint, data={'token': record['refresh_token'], 'token_type_hint': 'refresh_token', 'client_id': record['client_id']}, follow_redirects=False, timeout=10)
                                if result.status_code == 200:
                                    confirmed = True
                                    break
                                if result.status_code < 500:
                                    break
                            except httpx.HTTPError:
                                pass
                            if attempt == 0:
                                time.sleep(.1)
                    except Exception:
                        pass
                mapping = {key: record[key] for key in ('client_id', 'subject', 'issuer', 'email') if key in (record or {})}
                # A durable generation marker also invalidates an initial pending sign-in.
                mapping['session_revision'] = secrets.token_hex(16)
                self.store.save(mapping)
                return {'connected': False, 'remoteRevocationConfirmed': confirmed}
        except StorageError:
            raise AuthError('storage_error', 'Protected credentials could not be cleared.') from None
