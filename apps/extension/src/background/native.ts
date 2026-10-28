import {validRequest,type NativeRequest,type NativeEvent} from '../native/protocol.js';
const HOST='com.cypher.youtube';
export class NativeBridge{
 private native:chrome.runtime.Port|null=null;
 private pages=new Set<chrome.runtime.Port>();
 private routes=new Map<string,{port:chrome.runtime.Port;id:string}>();
 private sequence=0;
 private inflight=new Set<string>();
 private timers=new Map<string,ReturnType<typeof setTimeout>>();
 constructor(private connect:()=>chrome.runtime.Port=()=>chrome.runtime.connectNative(HOST)){}
 private post(port:chrome.runtime.Port,value:unknown){try{port.postMessage(value);}catch{/* closed page */}}
 private stop(code:string,message:string){
  const native=this.native;this.native=null;
  for(const timer of this.timers.values())clearTimeout(timer);this.timers.clear();this.inflight.clear();
  for(const target of this.routes.values())this.post(target.port,{id:target.id,event:'error',code,message});
  this.routes.clear();native?.disconnect();
 }
 private cancelDeadline(id:string){
  const native=this.native;
  if(this.timers.has(id))return;
  this.timers.set(id,setTimeout(()=>{
   this.timers.delete(id);
   if(this.native===native&&this.inflight.has(id))this.stop('cancelled','Opération annulée. Le connecteur a été arrêté ; aucune requête ne sera relancée automatiquement.');
  },2000));
 }
 private ensure(){
  if(this.native)return this.native;
  const native=this.connect();this.native=native;
  native.onMessage.addListener((message:NativeEvent)=>{
   if(this.native!==native||!message||typeof message.id!=='string')return;
   if(message.event==='result'||message.event==='error'){
    this.inflight.delete(message.id);const timer=this.timers.get(message.id);if(timer)clearTimeout(timer);this.timers.delete(message.id);
   }
   const target=this.routes.get(message.id);if(!target)return;
   if(!['result','error','delta','progress'].includes(message.event))return;
   this.post(target.port,{...message,id:target.id});
   if(message.event==='result'||message.event==='error')this.routes.delete(message.id);
  });
  native.onDisconnect.addListener(()=>{
   void globalThis.chrome?.runtime?.lastError;
   if(this.native!==native)return;this.native=null;
   for(const timer of this.timers.values())clearTimeout(timer);this.timers.clear();this.inflight.clear();
   for(const target of this.routes.values())this.post(target.port,{id:target.id,event:'error',code:'connector_missing',message:'Connecteur Savoir introuvable ou arrêté. Installez-le une fois, puis rouvrez le panneau.'});
   this.routes.clear();
  });
  return native;
 }
 attach(port:chrome.runtime.Port,validate?:(request:NativeRequest)=>Promise<boolean>){
  this.pages.add(port);
  const route=(message:any)=>{
   if(!validRequest(message)){this.post(port,{id:message?.id||'',event:'error',code:'invalid_request',message:'Requête invalide.'});return;}
   const send=()=>{
    if(!this.pages.has(port))return;
    let request=message;
    if(request.action==='cancel'){
     const target=[...this.routes].find(([,value])=>value.port===port&&value.id===request.payload?.requestId);
     if(!target){this.post(port,{id:request.id,event:'result',data:{cancelled:false}});return;}
     request={...request,payload:{requestId:target[0]}};
     this.cancelDeadline(target[0]);
    }
    const id=`request-${++this.sequence}`;
    this.routes.set(id,{port,id:request.id});
    this.inflight.add(id);
    try{this.ensure().postMessage({...request,id});}catch{this.routes.delete(id);this.inflight.delete(id);this.post(port,{id:request.id,event:'error',code:'connector_missing',message:'Connecteur indisponible. Installez Savoir puis rouvrez le panneau.'});}
   };
   if(validate)void validate(message).then(ok=>{if(ok)send();else this.post(port,{id:message.id,event:'error',code:'video_changed',message:'La vidéo a changé. Rouvrez le panneau.'});}).catch(()=>{});
   else send();
  };
  const disconnect=()=>{
   this.pages.delete(port);
   for(const [id,target] of this.routes){
    if(target.port!==port)continue;
    try{this.native?.postMessage({id:`close-${++this.sequence}`,action:'cancel',payload:{requestId:id}});}catch{}
    this.cancelDeadline(id);
    this.routes.delete(id);
   }
   if(!this.pages.size)this.stop('closed','Panneau fermé.');
   port.onMessage.removeListener(route);port.onDisconnect.removeListener(disconnect);
  };
  port.onMessage.addListener(route);port.onDisconnect.addListener(disconnect);
 }
}
