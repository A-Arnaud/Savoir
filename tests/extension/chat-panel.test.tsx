// @vitest-environment jsdom
import {test,expect,vi,beforeEach,afterEach} from 'vitest';
import {act} from 'react';
import {createRoot} from 'react-dom/client';
const fixture=vi.hoisted(()=>({connected:false,calls:[] as string[],requests:[] as any[],listeners:new Set<Function>(),reply:null as null|((v:any)=>void),reject:null as null|((e:Error)=>void),event:null as any,cancel:vi.fn()}));
vi.mock('../../apps/extension/src/native/client.js',()=>({NativeSession:class{
 start(action:string,payload:any,event:any){fixture.calls.push(action);fixture.requests.push({action,payload});if(action==='chat'){fixture.event=event;return {id:'generation',promise:new Promise((resolve,reject)=>{fixture.reply=resolve;fixture.reject=reject;})};}
 return {id:action,promise:Promise.resolve(action==='collect'?{sourceHash:'hash',transcript:{language:'fr',segments:[{id:'a',startSeconds:50.5,durationSeconds:3,text:'Budget de 24000 euros.'}],diagnostics:[]}}:{connected:fixture.connected})};}
 cancel=fixture.cancel;close(){}
}}));
import {ChatPanel} from '../../apps/extension/src/panel/ChatPanel.js';
let div:HTMLDivElement;let root:ReturnType<typeof createRoot>;
beforeEach(()=>{fixture.connected=false;fixture.calls=[];fixture.requests=[];fixture.listeners.clear();fixture.reply=null;fixture.reject=null;fixture.event=null;fixture.cancel.mockClear();vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.stubGlobal('chrome',{runtime:{id:'a'.repeat(32),sendMessage:async()=>({ok:true,data:{video:{videoId:'abcdefghijk',canonicalUrl:'https://www.youtube.com/watch?v=abcdefghijk',title:'Video test',durationSeconds:60,navigationRevision:1},tabId:1}}),onMessage:{addListener:(f:Function)=>fixture.listeners.add(f),removeListener:(f:Function)=>fixture.listeners.delete(f)},openOptionsPage:vi.fn()},storage:{local:{get:async()=>({}),set:async()=>{}}}});div=document.createElement('div');document.body.append(div);root=createRoot(div);});
afterEach(async()=>{await act(async()=>root.unmount());div.remove();vi.unstubAllGlobals();});
test('signed-out panel offers official sign in without collecting or running a model',async()=>{
 await act(async()=>root.render(<ChatPanel/>));
 expect(div.textContent).toContain('Continuer avec ChatGPT');expect(fixture.calls).toEqual(['status']);
 expect(div.querySelector('select')).toBeNull();expect(div.textContent).not.toContain('Ollama');
});
test('summary is explicit, streaming, source-linked and stale video replies are discarded',async()=>{
 fixture.connected=true;await act(async()=>root.render(<ChatPanel/>));
 const button=[...div.querySelectorAll('button')].find(b=>b.textContent==='Résumer la vidéo')!;
 await act(async()=>button.click());expect(fixture.calls).toEqual(['status','collect','chat']);
 expect(fixture.requests.at(-1).payload.sourceHash).toBe('hash');
 await act(async()=>fixture.event({event:'delta',text:'Budget [00:50]'}));
 expect(div.textContent).toContain('Budget');expect(div.querySelector('button.timestamp')?.textContent).toBe('00:50');
 await act(async()=>fixture.listeners.forEach(listener=>listener({type:'cypher:contextChanged',tabId:1,video:{videoId:'01234567890',canonicalUrl:'https://www.youtube.com/watch?v=01234567890',title:'Autre vidéo',navigationRevision:2,durationSeconds:60}},{id:'a'.repeat(32)})));
 await act(async()=>fixture.reply?.({text:'Ancienne réponse tardive',model:'test',cached:false}));
 expect(div.textContent).not.toContain('Ancienne réponse tardive');expect(fixture.cancel).toHaveBeenCalledWith('generation');
});
test('an interrupted summary is not presented as a completed answer',async()=>{
 fixture.connected=true;await act(async()=>root.render(<ChatPanel/>));
 const button=[...div.querySelectorAll('button')].find(b=>b.textContent==='Résumer la vidéo')!;
 await act(async()=>button.click());
 await act(async()=>fixture.event({event:'delta',text:'Brouillon incomplet du budget'}));
 expect(div.textContent).toContain('Brouillon incomplet');
 await act(async()=>fixture.reject?.(new Error('Flux interrompu')));
 expect(div.querySelector('[role=alert]')?.textContent).toContain('Flux interrompu');
 expect(div.textContent).not.toContain('Brouillon incomplet');expect(button.disabled).toBe(false);
});
test('an interrupted first conversation can retry without replaying its partial assistant message',async()=>{
 fixture.requests=[];fixture.connected=true;await act(async()=>root.render(<ChatPanel/>));
 const question=div.querySelector('#cy-question') as HTMLTextAreaElement;
 await act(async()=>{
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')!.set!.call(question,'Budget ?');
  question.dispatchEvent(new Event('input',{bubbles:true}));
 });
 const send=[...div.querySelectorAll('button')].find(b=>b.textContent==='Envoyer')!;
 expect(send.disabled).toBe(false);await act(async()=>send.click());
 await act(async()=>fixture.event({event:'delta',text:'Brouillon à ne jamais rejouer'}));
 await act(async()=>fixture.reject?.(new Error('Opération annulée')));
 expect(question.value).toBe('Budget ?');expect(div.textContent).not.toContain('Brouillon à ne jamais rejouer');
 await act(async()=>send.click());
 expect(fixture.requests.at(-1)).toMatchObject({action:'chat',payload:{sourceHash:'hash',history:[],question:'Budget ?'}});
 await act(async()=>fixture.reply?.({text:'Réponse terminée',model:'test',cached:false,sourceHash:'hash'}));
 expect(div.textContent).toContain('Réponse terminée');
});
