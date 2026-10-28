"""On-demand Chrome Native Messaging executable entrypoint."""
import json
import os
from pathlib import Path
import sys
from .constants import EXTENSION_ORIGIN,HOST_NAME,VERSION
from .protocol import read_message,write_message,ProtocolError


def main():
    if sys.argv[1:]==['--self-test']:
        print(json.dumps({'name':HOST_NAME,'version':VERSION,'transport':'native-messaging','localModels':False}));return 0
    if len(sys.argv)<2 or sys.argv[1]!=EXTENSION_ORIGIN:
        # Chrome supplies the caller origin; direct arbitrary-origin callers
        # receive no account state or credentials.
        return 2
    if os.name=='nt':
        import msvcrt
        msvcrt.setmode(sys.stdin.fileno(),os.O_BINARY);msvcrt.setmode(sys.stdout.fileno(),os.O_BINARY)
    from .auth import AuthManager
    from .cloud import CloudClient
    from .service import VideoService
    from .host import NativeHost
    root=Path(os.environ.get('CYPHER_NATIVE_DATA_DIR',str(Path(os.environ.get('LOCALAPPDATA',str(Path.home()/'AppData/Local')))/'CypherYouTube')))
    auth=AuthManager(root/'account');service=VideoService(root,auth,CloudClient(auth))
    host=NativeHost(service,lambda message:write_message(sys.stdout.buffer,message))
    try:
        while True:
            value=read_message(sys.stdin.buffer)
            if value is None:break
            host.dispatch(value)
    except (ProtocolError,OSError):return 1
    finally:host.close()
    return 0


if __name__=='__main__':raise SystemExit(main())
