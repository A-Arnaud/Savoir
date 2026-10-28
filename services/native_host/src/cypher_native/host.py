"""Dispatch native requests without blocking the reader/cancellation path."""
import threading
from .protocol import validate_request,ProtocolError
from .service import ServiceError

class NativeHost:
    def __init__(self,service,send):
        self.service=service;self.send=send;self.pending={};self.lock=threading.RLock();self.write_lock=threading.Lock();self.closed=False

    def emit(self,value):
        with self.write_lock:
            if not self.closed:
                try:self.send(value)
                except ProtocolError:
                    self.send({'id':value.get('id',''),'event':'error','code':'result_too_large','message':'Ce résultat est trop volumineux pour le navigateur.'})
                except (OSError,ValueError):self.close()

    def dispatch(self,value):
        try:request=validate_request(value)
        except ProtocolError:
            self.emit({'id':value.get('id','') if isinstance(value,dict) else '', 'event':'error','code':'invalid_request','message':'Requête invalide.'});return None
        identifier=request['id'];action=request['action']
        with self.lock:
            if self.closed:return None
            if action=='cancel':
                target=self.pending.get(request['payload'].get('requestId'))
                if target:target.set()
                self.emit({'id':identifier,'event':'result','data':{'cancelled':bool(target)}});return None
            if identifier in self.pending:
                self.emit({'id':identifier,'event':'error','code':'duplicate_request','message':'Cette requête est déjà en cours.'});return None
            if len(self.pending)>=8:
                self.emit({'id':identifier,'event':'error','code':'busy','message':'Trop de requêtes simultanées.'});return None
            cancel=threading.Event();self.pending[identifier]=cancel
        def run():
            try:
                result=self.service.handle(action,request['payload'],cancel,lambda event:self.emit({'id':identifier,**event}))
                self.emit({'id':identifier,'event':'result','data':result})
            except Exception as error:
                # Only application errors carry intentionally safe diagnostics.
                from .auth import AuthError
                from .cloud import CloudError
                safe=isinstance(error,(ServiceError,AuthError,CloudError))
                self.emit({'id':identifier,'event':'error','code':error.code if safe else 'connector_error',
                           'message':error.message if safe else 'Le connecteur a rencontré une erreur. Réessayez.'})
            finally:
                with self.lock:self.pending.pop(identifier,None)
        worker=threading.Thread(target=run,daemon=True,name='Cypher-'+action);worker.start();return worker

    def close(self):
        with self.lock:
            self.closed=True
            for event in self.pending.values():event.set()
