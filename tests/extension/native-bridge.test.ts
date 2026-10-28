import {test,expect,vi} from 'vitest';
import {NativeBridge} from '../../apps/extension/src/background/native.js';
function port(){const listeners=new Set<(x:any)=>void>(),closed=new Set<()=>void>();return {sent:[] as any[],postMessage(m:any){this.sent.push(m);},disconnect:vi.fn(()=>closed.forEach(f=>f())),onMessage:{addListener:(f:any)=>listeners.add(f),removeListener:(f:any)=>listeners.delete(f)},onDisconnect:{addListener:(f:any)=>closed.add(f),removeListener:(f:any)=>closed.delete(f)},emit:(m:any)=>listeners.forEach(f=>f(m)),close:()=>closed.forEach(f=>f())};}
test('bridge starts host only at first request, isolates ids between panels, exits when last panel closes',()=>{
 const native=port(),connect=vi.fn(()=>native as any),bridge=new NativeBridge(connect);const a=port(),b=port();
 bridge.attach(a as any);bridge.attach(b as any);expect(connect).not.toHaveBeenCalled();
 a.emit({id:'same',action:'status'});b.emit({id:'same',action:'status'});expect(connect).toHaveBeenCalledTimes(1);
 expect(native.sent[0].id).not.toBe(native.sent[1].id);
 native.emit({id:native.sent[0].id,event:'result',data:{connected:false}});expect(a.sent).toHaveLength(1);expect(b.sent).toHaveLength(0);
 a.close();expect(native.disconnect).not.toHaveBeenCalled();b.close();expect(native.disconnect).toHaveBeenCalledOnce();
});
test('bridge refuses arbitrary native actions before starting a process',()=>{
 const connect=vi.fn(),bridge=new NativeBridge(connect),a=port();bridge.attach(a as any);
 a.emit({id:'a',action:'shell',payload:{command:'evil'}});expect(connect).not.toHaveBeenCalled();expect(a.sent[0].event).toBe('error');
});
test('an unresponsive generation is stopped within two seconds after cancellation, without retrying it',()=>{
 vi.useFakeTimers();
 try{
  const native=port(),connect=vi.fn(()=>native as any),bridge=new NativeBridge(connect),a=port();bridge.attach(a as any);
  a.emit({id:'chat',action:'chat',payload:{}});a.emit({id:'stop',action:'cancel',payload:{requestId:'chat'}});
  vi.advanceTimersByTime(2100);
  expect(native.disconnect).toHaveBeenCalledOnce();
  expect(a.sent.some(e=>e.id==='chat'&&e.event==='error'&&e.code==='cancelled')).toBe(true);
  expect(native.sent.filter(e=>e.action==='chat')).toHaveLength(1);
 }finally{vi.useRealTimers();}
});
