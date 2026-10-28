"""Real HTTPX socket proof for the bridge's process-disconnect fallback.

The only HTTP server is this loopback fixture. No OpenAI account or request.
"""
import os
from pathlib import Path
import subprocess
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from cypher_native.protocol import write_message, read_message


def test_disconnect_exits_host_and_closes_a_real_socket_waiting_for_headers():
    entered = threading.Event()
    socket_closed = threading.Event()

    class WaitingHeaders(BaseHTTPRequestHandler):
        def do_POST(self):
            self.rfile.read(int(self.headers['Content-Length']))
            entered.set()
            self.connection.settimeout(5)
            try:
                if self.connection.recv(1) == b'':
                    socket_closed.set()
            except ConnectionResetError:
                socket_closed.set()
            except TimeoutError:
                pass

        def log_message(self, format, *args):
            pass

    server = ThreadingHTTPServer(('127.0.0.1', 0), WaitingHeaders)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    root = Path(__file__).resolve().parents[3]
    script = '''
import sys,threading,httpx
from cypher_native.cloud import CloudClient
from cypher_native.host import NativeHost
from cypher_native.protocol import read_message,write_message
class Auth:
 def access_token(self):return 'explicit-local-test-fixture-not-a-real-token'
class LocalOnly(httpx.Client):
 def stream(self,method,url,**kwargs):
  assert url=='https://api.openai.com/v1/responses'
  return super().stream(method,sys.argv[1],**kwargs)
cloud=CloudClient(Auth(),client=LocalOnly(trust_env=False))
class Service:
 def handle(self,action,payload,cancel,emit):
  return next(cloud.stream('fixture',[{'role':'user','content':'fixture'}],'fixture-model',cancel))
host=NativeHost(Service(),lambda value:write_message(sys.stdout.buffer,value))
try:
 while True:
  request=read_message(sys.stdin.buffer)
  if request is None:break
  host.dispatch(request)
finally:host.close()
'''
    env = {**os.environ, 'PYTHONPATH': os.pathsep.join([
        str(root / 'services/native_host/src'),
        str(root / 'services/companion/src'),
    ])}
    proc = subprocess.Popen([sys.executable, '-u', '-c', script,
                             f'http://127.0.0.1:{server.server_port}/explicit-test-fixture'],
                            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env)
    try:
        assert proc.stdin and proc.stdout
        write_message(proc.stdin, {'id': 'generation', 'action': 'chat'})
        assert entered.wait(5), 'fixture never reached real HTTPX pre-header wait'
        write_message(proc.stdin, {'id': 'stop', 'action': 'cancel', 'payload': {'requestId': 'generation'}})
        ack = read_message(proc.stdout)
        assert ack == {'id': 'stop', 'event': 'result', 'data': {'cancelled': True}}
        # Equivalent to Chrome disconnecting native stdin after its 2s guard.
        proc.stdin.close()
        assert proc.wait(timeout=3) == 0
        assert socket_closed.wait(1), 'HTTPX socket remained open after native host shutdown'
    finally:
        if proc.poll() is None:
            proc.kill()
            proc.wait(timeout=3)
        if proc.stdin and not proc.stdin.closed:
            proc.stdin.close()
        if proc.stdout:
            proc.stdout.close()
        if proc.stderr:
            proc.stderr.close()
        server.shutdown()
        server.server_close()
