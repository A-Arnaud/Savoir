import json
import threading
import httpx
import pytest
from cypher_native.cloud import CloudClient, CloudError
from cypher_native.auth import AuthError


class Auth:
    def access_token(self): return 'FAKE_SECRET'


def make_client(handler):
    return CloudClient(Auth(), httpx.Client(transport=httpx.MockTransport(handler)))


def test_models_visible_in_server_order():
    client = make_client(lambda r: httpx.Response(200, json={'models': [{'slug':'b','display_name':'B','visibility':'list'}, {'slug':'hidden','visibility':'hide'}, {'slug':'a','display_name':'A','visibility':'list'}]}))
    assert client.models() == [{'slug':'b','display_name':'B'}, {'slug':'a','display_name':'A'}]


def event(data): return ('data: ' + json.dumps(data, ensure_ascii=False) + '\n\n').encode()


def test_stream_payload_delta_and_completion():
    def handler(request):
        assert json.loads(request.content) == {'model':'m','instructions':'i','input':[{'role':'user','content':'hello'}],'store':False,'stream':True}
        return httpx.Response(200, content=event({'type':'response.output_text.delta','delta':'café'}) + event({'type':'response.completed','response':{'usage':{'output_tokens':1}}}))
    result = list(make_client(handler).stream('i',[{'role':'user','content':'hello'}],'m',threading.Event()))
    assert result == [{'type':'delta','text':'café'}, {'type':'completed','usage':{'output_tokens':1}}]


@pytest.mark.parametrize('terminal', ['response.failed','response.incomplete','error','eof','huge'])
def test_late_failures_never_success(terminal):
    body = event({'type':'response.output_text.delta','delta':'hello'})
    if terminal == 'huge': body += b'data: ' + b'x' * (1024 * 1024 + 1)
    elif terminal != 'eof': body += event({'type': terminal, 'response':{'error':{'code':'subscription_sharing_usage_limit_exceeded','message':'FAKE_SECRET'}}})
    client = make_client(lambda r: httpx.Response(200, content=body))
    with pytest.raises(CloudError) as exc:
        list(client.stream('',[],'m',threading.Event()))
    assert 'FAKE_SECRET' not in str(exc.value)


@pytest.mark.parametrize('status', [401,429,500])
def test_http_errors_no_retry_no_secret(status):
    calls = []
    def handler(request):
        calls.append(request)
        return httpx.Response(status, text='FAKE_SECRET')
    with pytest.raises((CloudError, AuthError)) as exc:
        list(make_client(handler).stream('',[],'m',threading.Event()))
    assert len(calls) == 1
    assert 'FAKE_SECRET' not in str(exc.value)


def test_cancel_during_token_refresh_does_not_post():
    cancel = threading.Event()
    calls = []
    class CancellingAuth:
        def access_token(self):
            cancel.set()
            return 'FAKE_SECRET'
    client = CloudClient(CancellingAuth(), httpx.Client(transport=httpx.MockTransport(lambda r: calls.append(r) or httpx.Response(200))))
    with pytest.raises(CloudError) as exc:
        list(client.stream('', [], 'm', cancel))
    assert exc.value.code == 'cancelled'
    assert calls == []


def test_network_safe():
    def handler(request): raise httpx.ConnectError('FAKE_SECRET', request=request)
    with pytest.raises(CloudError) as exc: make_client(handler).models()
    assert 'FAKE_SECRET' not in str(exc.value)


def test_cancel_closes_response():
    cancel = threading.Event()
    client = make_client(lambda r: httpx.Response(200,content=event({'type':'response.output_text.delta','delta':'hello'}) + event({'type':'response.completed'})))
    iterator = client.stream('',[],'m',cancel)
    assert next(iterator)['type'] == 'delta'
    cancel.set()
    with pytest.raises(CloudError) as exc: next(iterator)
    assert exc.value.code == 'cancelled'


def test_utf8_split_chunks_and_crlf_sse_closed():
    class Chunks(httpx.SyncByteStream):
        closed = False
        def __iter__(self):
            data = b': keepalive\r\n\r\n' + event({'type':'response.output_text.delta','delta':'é😀'}).replace(b'\n', b'\r\n') + event({'type':'response.completed','response':{'usage':{}}})
            for byte in data:
                yield bytes([byte])
        def close(self): self.closed = True
    chunks = Chunks()
    client = make_client(lambda r: httpx.Response(200, stream=chunks))
    assert list(client.stream('',[],'m',threading.Event())) == [{'type':'delta','text':'é😀'},{'type':'completed','usage':{}}]
    assert chunks.closed


def test_cancellation_interrupts_waiting_stream_and_closes():
    cancel = threading.Event()
    class Waiting(httpx.SyncByteStream):
        def __init__(self): self.closed = threading.Event()
        def __iter__(self):
            yield event({'type':'response.output_text.delta','delta':'start'})
            assert self.closed.wait(3), 'Cancellation did not close response'
            return
        def close(self): self.closed.set()
    chunks = Waiting()
    client = make_client(lambda r: httpx.Response(200, stream=chunks))
    iterator = client.stream('',[],'m',cancel)
    assert next(iterator)['text'] == 'start'
    timer = threading.Timer(.1, cancel.set)
    timer.start()
    try:
        with pytest.raises(CloudError) as exc: next(iterator)
        assert exc.value.code == 'cancelled'
        assert chunks.closed.is_set()
    finally:
        timer.cancel()
        iterator.close()
