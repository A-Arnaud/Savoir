import json
import threading
import time
from urllib.parse import parse_qs, urlencode, urlsplit
import httpx
import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from cypher_native.auth import AuthManager, AuthError


@pytest.fixture
def flow(tmp_path):
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public = json.loads(jwt.algorithms.RSAAlgorithm.to_jwk(key.public_key()))
    public['kid'] = 'fixture'
    state = {'calls': [], 'claims': {}, 'callback': {}, 'scope': 'openid chatgpt.tokens.use.direct'}
    def transport(request):
        state['calls'].append(request)
        if request.url.path.endswith('jwks.json'):
            return httpx.Response(200, json={'keys': [public]})
        if request.url.path.endswith('openid-configuration'):
            return httpx.Response(200, json={'issuer': 'https://auth.openai.com', 'revocation_endpoint': 'https://auth.openai.com/oauth/revoke'})
        if request.url.path.endswith('/revoke'):
            return httpx.Response(200)
        claims = {'iss': 'https://auth.openai.com', 'aud': 'oaiapp_test', 'sub': 'test-sub', 'iat': int(time.time()), 'exp': int(time.time()) + 3600, 'nonce': state['nonce'], 'email': 'fixture@example.test'}
        claims.update(state['claims'])
        token = jwt.encode(claims, key, algorithm='RS256', headers={'kid': 'fixture'})
        if state.get('signature'):
            token = jwt.encode(claims, rsa.generate_private_key(public_exponent=65537, key_size=2048), algorithm='RS256', headers={'kid': 'fixture'})
        payload = {'access_token': 'FAKE_ACCESS', 'refresh_token': state.get('refresh', 'FAKE_REFRESH'), 'id_token': token, 'token_type': 'Bearer', 'scope': state['scope'], 'expires_in': 3600}
        if state.get('omit_refresh'):
            payload.pop('refresh_token')
        return httpx.Response(200, json=payload)
    def browser(url):
        params = parse_qs(urlsplit(url).query)
        state['params'] = params
        state['nonce'] = params['nonce'][0]
        if state.get('no_callback'):
            return True
        callback = {'code': 'FAKE_CODE', 'state': params['state'][0], 'client_id': 'oaiapp_test'}
        callback.update(state['callback'])
        with httpx.Client(trust_env=False) as local:
            local.get(params['redirect_uri'][0] + '?' + urlencode(callback))
        return True
    manager = AuthManager(tmp_path, client=httpx.Client(transport=httpx.MockTransport(transport)), open_browser=browser)
    return manager, state


def test_login_validated_identity_and_no_secret(flow):
    auth, state = flow
    result = auth.connect(threading.Event(), lambda x: None)
    assert result['connected'] is True
    assert result['accountLabel'] == 'fixture@example.test'
    assert len(result['accountId']) == 64
    assert 'FAKE_' not in json.dumps(auth.status())
    assert auth.access_token() == 'FAKE_ACCESS'
    assert state['params']['client_id'] == ['dynamic_agent_client']
    assert state['params']['code_challenge_method'] == ['S256']
    form = parse_qs(state['calls'][-2].content.decode())
    assert form['redirect_uri'] == state['params']['redirect_uri']
    assert form['client_id'] == ['oaiapp_test']
    import base64
    import hashlib
    challenge = base64.urlsafe_b64encode(hashlib.sha256(form['code_verifier'][0].encode()).digest()).rstrip(b'=').decode()
    assert state['params']['code_challenge'] == [challenge]
    assert form['resource'] == ['https://api.openai.com/v1']
    assert 'client_secret' not in form
    assert AuthManager(auth.store.directory, client=auth.client).status() == result


@pytest.mark.parametrize('claim,value', [('nonce','bad'),('iss','https://evil.test'),('aud','wrong'),('exp',1),('sub','')])
def test_invalid_claim_never_connected(flow, claim, value):
    auth, state = flow
    state['claims'][claim] = value
    with pytest.raises(AuthError):
        auth.connect(threading.Event(), lambda x: None)
    assert auth.status() == {'connected': False}


@pytest.mark.parametrize('mode', ['state','client','scope','signature','declined'])
def test_invalid_authorization_safe(flow, mode):
    auth, state = flow
    if mode == 'state': state['callback']['state'] = 'FAKE_SECRET'
    if mode == 'client': state['callback']['client_id'] = 'dynamic_agent_client'
    if mode == 'scope': state['scope'] = 'openid'
    if mode == 'signature': state['signature'] = True
    if mode == 'declined': state['callback']['error'] = 'access_denied'
    with pytest.raises(AuthError) as exc:
        auth.connect(threading.Event(), lambda x: None)
    assert 'FAKE_' not in str(exc.value)
    assert not auth.status()['connected']


@pytest.mark.parametrize('cancelled', [True, False])
def test_cancel_timeout(flow, cancelled):
    auth, state = flow
    state['no_callback'] = True
    auth.callback_timeout = .05
    cancel = threading.Event()
    if cancelled: cancel.set()
    with pytest.raises(AuthError) as exc:
        auth.connect(cancel, lambda x: None)
    assert exc.value.code == ('cancelled' if cancelled else 'auth_timeout')


def test_cancel_while_callback_pending_closes_listener(flow):
    import socket
    auth, state = flow
    state['no_callback'] = True
    cancel = threading.Event()
    timer = threading.Timer(.1, cancel.set)
    timer.start()
    try:
        with pytest.raises(AuthError) as exc:
            auth.connect(cancel, lambda x: None)
        assert exc.value.code == 'cancelled'
        address = urlsplit(state['params']['redirect_uri'][0])
        with socket.socket() as probe:
            probe.settimeout(.2)
            assert probe.connect_ex(('127.0.0.1', address.port)) != 0
    finally:
        timer.cancel()


def test_disconnect_during_initial_login_cannot_resurrect_session(flow):
    auth, state = flow
    with pytest.raises(AuthError) as exc:
        auth.connect(threading.Event(), lambda event: auth.disconnect())
    assert exc.value.code == 'auth_changed'
    assert auth.status() == {'connected': False}


def test_refresh_rotates_persists_and_disconnect_retains_registration(flow):
    auth, state = flow
    auth.connect(threading.Event(), lambda x: None)
    record = auth.store.load()
    record['expires_at'] = 0
    auth.store.save(record)
    state['refresh'] = 'FAKE_ROTATED'
    assert auth.access_token() == 'FAKE_ACCESS'
    assert auth.store.load()['refresh_token'] == 'FAKE_ROTATED'
    auth.disconnect()
    assert not auth.status()['connected']
    assert 'refresh_token' not in auth.store.load()
    assert auth.store.load()['client_id'] == 'oaiapp_test'


@pytest.mark.parametrize('missing', ['scope', 'refresh'])
def test_returning_login_requires_new_granted_scope_and_refresh(flow, missing):
    auth, state = flow
    auth.connect(threading.Event(), lambda x: None)
    previous = auth.store.load()
    if missing == 'scope':
        state['scope'] = None
    else:
        state['omit_refresh'] = True
    with pytest.raises(AuthError):
        auth.connect(threading.Event(), lambda x: None)
    assert auth.store.load() == previous


def test_returning_callback_cannot_change_client(flow):
    auth, state = flow
    auth.connect(threading.Event(), lambda x: None)
    previous = auth.store.load()
    state['callback']['client_id'] = 'oaiapp_other'
    with pytest.raises(AuthError) as exc:
        auth.connect(threading.Event(), lambda x: None)
    assert exc.value.code == 'invalid_client'
    assert auth.store.load() == previous


def test_reauthorization_uses_registration_and_validates_same_subject(flow):
    auth, state = flow
    first = auth.connect(threading.Event(), lambda x: None)
    state['claims']['sub'] = 'other-sub'
    with pytest.raises(AuthError): auth.connect(threading.Event(), lambda x: None)
    assert state['params']['client_id'] == ['oaiapp_test']
    assert 'agent_name_hint' not in state['params']
    assert 'id_token_hint' in state['params']
    assert auth.status()['accountId'] == first['accountId']


def test_missing_new_client_id_rejected(flow):
    auth, state = flow
    state['callback']['client_id'] = ''
    with pytest.raises(AuthError): auth.connect(threading.Event(), lambda x: None)
    assert not auth.status()['connected']


def test_refresh_serialized_and_latest_rotation_used(flow):
    auth, state = flow
    auth.connect(threading.Event(), lambda x: None)
    record = auth.store.load()
    record['expires_at'] = 0
    auth.store.save(record)
    other = AuthManager(auth.store.directory, client=auth.client, open_browser=auth.open_browser)
    state['refresh'] = 'FAKE_ROTATED'
    results, errors = [], []
    barrier = threading.Barrier(3)
    def run(manager):
        barrier.wait()
        try: results.append(manager.access_token())
        except Exception as error: errors.append(error)
    threads = [threading.Thread(target=run, args=(manager,)) for manager in (auth, other)]
    for thread in threads: thread.start()
    barrier.wait()
    for thread in threads: thread.join(timeout=5)
    assert not errors and results == ['FAKE_ACCESS', 'FAKE_ACCESS']
    refreshes = [r for r in state['calls'] if b'grant_type=refresh_token' in r.content]
    assert len(refreshes) == 1
    assert auth.store.load()['refresh_token'] == 'FAKE_ROTATED'


def test_revocation_failure_clears_tokens_warns_and_does_not_leak(flow):
    auth, state = flow
    auth.connect(threading.Event(), lambda x: None)
    def unavailable(request): raise httpx.ConnectError('FAKE_SECRET', request=request)
    auth.client = httpx.Client(transport=httpx.MockTransport(unavailable))
    result = auth.disconnect()
    assert result == {'connected': False, 'remoteRevocationConfirmed': False}
    assert 'FAKE_' not in json.dumps(auth.store.load())


@pytest.mark.parametrize('status', [401,429,500])
def test_auth_http_failure_safe(flow, status):
    auth, state = flow
    auth.client = httpx.Client(transport=httpx.MockTransport(lambda r: httpx.Response(status, text='FAKE_SECRET')))
    with pytest.raises(AuthError) as exc: auth.connect(threading.Event(), lambda x: None)
    assert 'FAKE_' not in str(exc.value)
