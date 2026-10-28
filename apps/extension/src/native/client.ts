import type {Action,NativeEvent} from './protocol.js';
export class NativeError extends Error{constructor(public code:string,message=code){super(message);}}
export class NativeSession{
 private port:chrome.runtime.Port;
 private pending=new Map<string,{resolve:(v:any)=>void;reject:(e:Error)=>void;event:(e:NativeEvent)=>void}>();
 private closed=false;
 constructor(factory=()=>chrome.runtime.connect({name:'cypher:panel'})){
  this.port=factory();this.port.onMessage.addListener(this.receive);this.port.onDisconnect.addListener(this.lost);
 }
 private receive=(value:NativeEvent)=>{
  const request=this.pending.get(value?.id);if(!request)return;
  if(value.event==='result'){this.pending.delete(value.id);request.resolve(value.data);}
  else if(value.event==='error'){this.pending.delete(value.id);request.reject(new NativeError(value.code||'connector_error',value.message));}
  else request.event(value);
 };
 private lost=()=>{
  void globalThis.chrome?.runtime?.lastError;
  this.closed=true;for(const request of this.pending.values())request.reject(new NativeError('connector_missing','Installez le connecteur Savoir, puis rouvrez le panneau.'));
  this.pending.clear();
 };
 start<T=any>(action:Action,payload:Record<string,unknown>={},event:(e:NativeEvent)=>void=()=>{}){
  const id=crypto.randomUUID();
  const promise=new Promise<T>((resolve,reject)=>{
   if(this.closed){reject(new NativeError('connector_missing','Le connecteur est déconnecté. Fermez puis rouvrez le panneau.'));return;}
   this.pending.set(id,{resolve,reject,event});
   try{this.port.postMessage({id,action,payload});}catch{this.pending.delete(id);reject(new NativeError('connector_missing'));}
  });
  return {id,promise};
 }
 cancel(requestId:string){if(!this.closed)this.port.postMessage({id:crypto.randomUUID(),action:'cancel',payload:{requestId}});}
 close(){if(this.closed)return;this.port.onMessage.removeListener(this.receive);this.port.onDisconnect.removeListener(this.lost);this.lost();this.port.disconnect();}
}
