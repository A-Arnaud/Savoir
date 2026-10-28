import {test,expect} from 'vitest';
import {NativeSession} from '../../apps/extension/src/native/client.js';
function port(){
 const messages=new Set<(m:any)=>void>(),disconnects=new Set<()=>void>();const sent:any[]=[];let closed=false;
 return {sent,messages,disconnects,get closed(){return closed;},postMessage:(m:any)=>sent.push(m),disconnect:()=>{closed=true;disconnects.forEach(f=>f());},onMessage:{addListener:(f:any)=>messages.add(f),removeListener:(f:any)=>messages.delete(f)},onDisconnect:{addListener:(f:any)=>disconnects.add(f),removeListener:(f:any)=>disconnects.delete(f)}};
}
test('streaming request resolves only its matching final result and closes on unmount',async()=>{
 const p=port();const session=new NativeSession(()=>p as any);const events:any[]=[];
 const run=session.start<{text:string}>('chat',{question:'Budget ?'},e=>events.push(e));
 p.messages.forEach(f=>f({id:'other',event:'result',data:{text:'wrong video'}}));
 p.messages.forEach(f=>f({id:run.id,event:'delta',text:'24000'}));
 p.messages.forEach(f=>f({id:run.id,event:'result',data:{text:'24000 euros'}}));
 expect((await run.promise).text).toBe('24000 euros');expect(events).toHaveLength(1);
 session.close();expect(p.closed).toBe(true);
});
test('native error and lost connector do not become successful answers',async()=>{
 const p=port();const session=new NativeSession(()=>p as any);const a=session.start('status');
 p.messages.forEach(f=>f({id:a.id,event:'error',code:'connector_missing',message:'Installer le connecteur'}));
 await expect(a.promise).rejects.toMatchObject({code:'connector_missing'});
 const b=session.start('chat');p.disconnect();await expect(b.promise).rejects.toThrow();
});
test('cancel references the active request without launching a second chat',()=>{
 const p=port();const session=new NativeSession(()=>p as any);const run=session.start('chat');run.promise.catch(()=>{});
 session.cancel(run.id);expect(p.sent.map(x=>x.action)).toEqual(['chat','cancel']);expect(p.sent[1].payload.requestId).toBe(run.id);session.close();
});
