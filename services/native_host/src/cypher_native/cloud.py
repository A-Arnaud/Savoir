"""ChatGPT-plan Responses API client: streaming only, never paid fallback/retry."""
import codecs
import json
import threading

import httpx

from .auth import AuthError


class CloudError(Exception):
    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(message)


class CloudClient:
    MAX_EVENT_BYTES = 1024 * 1024

    def __init__(self, auth, client: httpx.Client | None = None):
        self.auth = auth
        # HTTPS proxy configuration is deliberately ignored: bearer credentials stay direct.
        self.client = client if client is not None else httpx.Client(trust_env=False, timeout=httpx.Timeout(180, connect=10, write=30, pool=10), follow_redirects=False)

    @staticmethod
    def _check_status(response):
        if response.status_code == 401:
            raise AuthError('auth_required', 'ChatGPT authorization expired. Please sign in again.')
        if response.status_code == 429:
            raise CloudError('rate_limited', 'ChatGPT usage limit reached. Check ChatGPT Settings → Usage.')
        if response.status_code != 200:
            raise CloudError('cloud_http_error', 'ChatGPT could not complete the request.')

    def models(self) -> list[dict]:
        try:
            response = self.client.get('https://api.openai.com/v1/models', headers={'Authorization': 'Bearer ' + self.auth.access_token()}, follow_redirects=False, timeout=httpx.Timeout(30, connect=10))
            self._check_status(response)
            catalog = response.json()['models']
            if not isinstance(catalog, list):
                raise ValueError()
            result = []
            for item in catalog:
                if item.get('visibility') == 'list':
                    if not isinstance(item.get('slug'), str) or not item['slug'] or not isinstance(item.get('display_name'), str):
                        raise ValueError()
                    result.append({'slug': item['slug'], 'display_name': item['display_name']})
            return result
        except (AuthError, CloudError):
            raise
        except httpx.HTTPError:
            raise CloudError('network_error', 'ChatGPT is unreachable. Check your connection.') from None
        except Exception:
            raise CloudError('invalid_catalog', 'ChatGPT returned an invalid model catalog.') from None

    @staticmethod
    def _failure(event):
        response = event.get('response')
        error = (response.get('error') if isinstance(response, dict) else None) or event.get('error') or event
        code = error.get('code') if isinstance(error, dict) else None
        if code in {'subscription_sharing_usage_limit_exceeded', 'subscription_sharing_usage_unavailable', 'insufficient_quota', 'rate_limit_exceeded'}:
            return CloudError('usage_limit', 'ChatGPT plan usage is unavailable or its limit was reached. Check ChatGPT Settings → Usage.')
        return CloudError('response_failed', 'ChatGPT did not complete the response.')

    def _events(self, response, cancel):
        decoder = codecs.getincrementaldecoder('utf-8')('strict')
        buffer = ''
        data = []
        event_size = 0
        for chunk in response.iter_bytes():
            if cancel.is_set():
                raise CloudError('cancelled', 'Generation was cancelled.')
            buffer += decoder.decode(chunk)
            if len(buffer.encode('utf-8')) > self.MAX_EVENT_BYTES:
                raise CloudError('stream_too_large', 'ChatGPT stream event exceeded the safety limit.')
            while '\n' in buffer:
                line, buffer = buffer.split('\n', 1)
                line = line.removesuffix('\r')
                if not line:
                    if data:
                        payload = '\n'.join(data)
                        data = []
                        event_size = 0
                        if payload != '[DONE]':
                            event = json.loads(payload)
                            if not isinstance(event, dict):
                                raise ValueError()
                            yield event
                    continue
                if line.startswith('data:'):
                    value = line[5:].removeprefix(' ')
                    event_size += len(value.encode('utf-8'))
                    if event_size > self.MAX_EVENT_BYTES:
                        raise CloudError('stream_too_large', 'ChatGPT stream event exceeded the safety limit.')
                    data.append(value)
        decoder.decode(b'', final=True)
        # An unfinished event is intentionally never interpreted as a terminal success.

    def stream(self, instructions: str, messages: list[dict], model: str, cancel: threading.Event):
        if cancel.is_set():
            raise CloudError('cancelled', 'Generation was cancelled.')
        if not isinstance(messages, list) or any(not isinstance(m, dict) or m.get('role') == 'system' for m in messages):
            raise CloudError('invalid_input', 'Provide message history as a list; use instructions for system guidance.')
        watcher_done = threading.Event()
        watcher = None
        try:
            token = self.auth.access_token()
            if cancel.is_set():
                raise CloudError('cancelled', 'Generation was cancelled.')
            with self.client.stream('POST', 'https://api.openai.com/v1/responses',
                                    headers={'Authorization': 'Bearer ' + token, 'Accept': 'text/event-stream'},
                                    json={'model': model, 'instructions': instructions, 'input': messages, 'store': False, 'stream': True},
                                    timeout=httpx.Timeout(180, connect=10, write=30, pool=10), follow_redirects=False) as response:
                self._check_status(response)
                def watch_cancel():
                    while not watcher_done.wait(.05):
                        if cancel.is_set():
                            try:
                                response.close()
                            except Exception:
                                pass
                            return
                watcher = threading.Thread(target=watch_cancel, daemon=True)
                watcher.start()
                for event in self._events(response, cancel):
                    if cancel.is_set():
                        raise CloudError('cancelled', 'Generation was cancelled.')
                    kind = event.get('type')
                    if kind == 'response.output_text.delta':
                        if not isinstance(event.get('delta'), str):
                            raise ValueError()
                        yield {'type': 'delta', 'text': event['delta']}
                    elif kind in ('response.failed', 'response.incomplete', 'error', 'response.error'):
                        raise self._failure(event)
                    elif kind == 'response.completed':
                        details = event.get('response', {})
                        if not isinstance(details, dict) or details.get('error') or details.get('status', 'completed') != 'completed':
                            raise self._failure(event)
                        usage = details.get('usage') or {}
                        if not isinstance(usage, dict):
                            raise ValueError()
                        yield {'type': 'completed', 'usage': usage}
                        return
                if cancel.is_set():
                    raise CloudError('cancelled', 'Generation was cancelled.')
                raise CloudError('stream_interrupted', 'ChatGPT stream ended before completion.')
        except (AuthError, CloudError):
            raise
        except httpx.HTTPError:
            if cancel.is_set():
                raise CloudError('cancelled', 'Generation was cancelled.') from None
            raise CloudError('network_error', 'ChatGPT connection was interrupted.') from None
        except Exception:
            if cancel.is_set():
                raise CloudError('cancelled', 'Generation was cancelled.') from None
            raise CloudError('invalid_stream', 'ChatGPT returned an invalid response stream.') from None
        finally:
            watcher_done.set()
            if watcher:
                watcher.join(timeout=1)
