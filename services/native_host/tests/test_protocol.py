import io,json,struct
import pytest
from cypher_native.protocol import read_message,write_message,validate_request,ProtocolError


def test_framing_roundtrip_utf8_and_eof():
 stream=io.BytesIO();write_message(stream,{'id':'one','event':'result','data':{'text':'été中文'}});stream.seek(0)
 assert read_message(stream)['data']['text']=='été中文'
 assert read_message(stream) is None


@pytest.mark.parametrize('raw',[b'\x01',struct.pack('<I',1000001),struct.pack('<I',8)+b'{}',struct.pack('<I',2)+b'[]'])
def test_rejects_truncated_oversized_and_nonobject_frames(raw):
 with pytest.raises(ProtocolError):read_message(io.BytesIO(raw))


def test_writes_never_exceed_chrome_native_message_limit():
 with pytest.raises(ProtocolError):write_message(io.BytesIO(),{'text':'x'*900001})


def test_commands_are_allowlisted_and_ids_bounded():
 assert validate_request({'id':'a','action':'status'})=={'id':'a','action':'status','payload':{}}
 for value in [{'id':'a','action':'shell','payload':{}},{'id':'a'*129,'action':'status'}, {'id':'a','action':'chat','payload':[]},{'id':'a','action':'status','url':'https://evil.test'}]:
  with pytest.raises(ProtocolError):validate_request(value)
