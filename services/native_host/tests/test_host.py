import threading
from cypher_native.host import NativeHost

class Service:
 def __init__(self):self.start=threading.Event();self.stop=threading.Event()
 def handle(self,action,payload,cancel,emit):
  if action=='status':return {'connected':False}
  self.start.set()
  assert cancel.wait(2),'operation was not cancelled'
  self.stop.set()
  return {'cancelled':True}


def test_native_host_status_and_disconnection_cancel_work():
 events=[];service=Service();host=NativeHost(service,events.append)
 thread=host.dispatch({'id':'s','action':'status'});thread.join(2)
 assert events==[{'id':'s','event':'result','data':{'connected':False}}]
 worker=host.dispatch({'id':'c','action':'chat','payload':{}})
 assert service.start.wait(1)
 host.close();worker.join(2)
 assert service.stop.is_set()


def test_duplicate_request_and_cancel_are_explicit():
 events=[];service=Service();host=NativeHost(service,events.append)
 worker=host.dispatch({'id':'a','action':'chat'});assert service.start.wait(1)
 host.dispatch({'id':'a','action':'chat'})
 assert any(e.get('code')=='duplicate_request' for e in events)
 host.dispatch({'id':'cancel','action':'cancel','payload':{'requestId':'a'}})
 worker.join(2)
 assert service.stop.is_set()
 assert any(e['id']=='cancel' and e['event']=='result' for e in events)


def test_unhandled_error_never_leaks_exception_content():
 class Broken:
  def handle(self,*args):raise RuntimeError('secret-api-token-not-to-leak')
 events=[];host=NativeHost(Broken(),events.append);worker=host.dispatch({'id':'a','action':'status'});worker.join(2)
 assert events[0]['event']=='error' and 'secret' not in str(events)


def test_cancel_target_must_be_a_bounded_string_and_never_crashes_reader():
 for value in ({},[],None,12,True,'','x'*129):
  events=[];host=NativeHost(Service(),events.append)
  host.dispatch({'id':'cancel','action':'cancel','payload':{'requestId':value}})
  assert events[0]['event']=='error' and events[0]['code']=='invalid_request'
