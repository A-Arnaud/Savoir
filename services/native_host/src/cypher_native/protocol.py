"""Chrome native messaging framing. stdout is reserved for these frames."""
import json
import struct

IN_LIMIT=1_000_000
OUT_LIMIT=900_000
ACTIONS={'status','connect','disconnect','collect','chat','cancel'}

class ProtocolError(Exception):
    pass


def _read_exact(stream,size):
    pieces=[];remaining=size
    while remaining:
        part=stream.read(remaining)
        if not part:raise ProtocolError('truncated_frame')
        pieces.append(part);remaining-=len(part)
    return b''.join(pieces)


def read_message(stream):
    header=stream.read(4)
    if not header:return None
    if len(header)<4:header+=_read_exact(stream,4-len(header))
    size=struct.unpack('<I',header)[0]
    if not 0<size<=IN_LIMIT:raise ProtocolError('invalid_frame_size')
    try:value=json.loads(_read_exact(stream,size))
    except (ValueError,UnicodeError,RecursionError) as error:raise ProtocolError('invalid_json') from error
    if not isinstance(value,dict):raise ProtocolError('invalid_object')
    return value


def write_message(stream,value):
    raw=json.dumps(value,ensure_ascii=False,separators=(',',':'),allow_nan=False).encode('utf-8')
    if len(raw)>OUT_LIMIT:raise ProtocolError('result_too_large')
    stream.write(struct.pack('<I',len(raw)));stream.write(raw);stream.flush()


def validate_request(value):
    if not isinstance(value,dict) or set(value)-{'id','action','payload'}:raise ProtocolError('invalid_request')
    identifier=value.get('id');action=value.get('action');payload=value.get('payload',{})
    if not isinstance(identifier,str) or not 1<=len(identifier)<=128:raise ProtocolError('invalid_id')
    if not isinstance(action,str) or action not in ACTIONS or not isinstance(payload,dict):raise ProtocolError('invalid_request')
    if action=='cancel':
        target=payload.get('requestId')
        if set(payload)!={'requestId'} or not isinstance(target,str) or not 1<=len(target)<=128:
            raise ProtocolError('invalid_cancel_target')
    return {'id':identifier,'action':action,'payload':payload}
