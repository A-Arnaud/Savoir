import {test,expect,chromium} from '@playwright/test';
import {mkdtemp,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';

test('explicit synthetic account transport exercises summary, discussion, source links and late-reply isolation',async()=>{
 await mkdir('.local/native-browser',{recursive:true});const root=await mkdtemp(path.resolve('.local/native-browser/synthetic-'));
 const extension=path.join(process.env.LOCALAPPDATA!,'Programs/Savoir YouTube/extension');
 const context=await chromium.launchPersistentContext(root,{channel:'chromium',headless:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
 try{
  const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
  // This is deliberately a test-only account/transport, NOT an OpenAI response
  // and NOT code or a fake API inside the packaged production executable.
  await worker.evaluate(()=>{
   const messages=new Set<(value:any)=>void>(),disconnect=new Set<()=>void>();
   const state={calls:[] as any[],stale:()=>{}};(globalThis as any).__cypherSynthetic=state;
   const emit=(value:any)=>{for(const f of messages)f(value);};
   (chrome.runtime as any).connectNative=()=>({
    onMessage:{addListener:(f:any)=>messages.add(f),removeListener:(f:any)=>messages.delete(f)},
    onDisconnect:{addListener:(f:any)=>disconnect.add(f),removeListener:(f:any)=>disconnect.delete(f)},
    disconnect:()=>{for(const f of disconnect)f();},
    postMessage:(request:any)=>{
     state.calls.push(request);const id=request.id;const result=(data:any)=>emit({id,event:'result',data});
     queueMicrotask(()=>{
      if(request.action==='status')result({connected:true,accountLabel:'Explicit synthetic test account'});
      else if(request.action==='collect')result({sourceHash:'a'.repeat(64),transcript:{language:'fr',source:'manual',complete:true,diagnostics:[],segments:[{id:'one',startSeconds:0,durationSeconds:10,text:'Le conseil a installé 12 bancs.'},{id:'two',startSeconds:50,durationSeconds:10,text:'Le budget est de 7200 euros.'}]}});
      else if(request.action==='cancel')result({cancelled:true});
      else if(request.action==='chat'){
       if(request.payload.question==='Réponse tardive'){
        emit({id,event:'delta',text:'Brouillon synthétique en cours'});
        state.stale=()=>result({text:'Ancienne réponse synthétique interdite',sourceHash:'a'.repeat(64),model:'explicit-fixture',cached:false});
       }else{
        const text=request.payload.mode==='summary'?'Résumé synthétique : 12 bancs et 7200 euros [00:50].':'Réponse synthétique : le budget est de 7200 euros [00:50].';
        emit({id,event:'delta',text});result({text,sourceHash:'a'.repeat(64),model:'explicit-fixture',cached:false});
       }
      }
     });
    },
   });
  });
  const page=await context.newPage();await page.route('https://www.youtube.com/**',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>Vidéo originale de test</title><h1>Vidéo originale de test</h1><div id="top-level-buttons-computed"></div><div id="secondary-inner"></div><video></video>'}));
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('https://www.youtube.com/watch?v=abcdefghijk');await page.getByRole('button',{name:'Savoir',exact:true}).click();
  const panel=page.frameLocator('#cypher-panel');await expect(panel.getByText('ChatGPT connecté',{exact:true})).toBeVisible();
  await panel.getByRole('button',{name:'Résumer la vidéo',exact:true}).click();await expect(panel.locator('.cy-answer')).toContainText('Résumé synthétique : 12 bancs');
  await expect(panel.locator('button.timestamp')).toHaveText('00:50');
  const question=panel.getByLabel('Question sur la vidéo');await question.fill('Quel budget ?');await panel.getByRole('button',{name:'Envoyer',exact:true}).click();
  await expect(panel.locator('article.assistant')).toContainText('Réponse synthétique : le budget est de 7200 euros');
  const calls=await worker.evaluate(()=>(globalThis as any).__cypherSynthetic.calls);
  const chat=calls.filter((r:any)=>r.action==='chat');expect(chat).toHaveLength(2);expect(chat.every((r:any)=>r.payload.sourceHash==='a'.repeat(64))).toBe(true);
  await question.fill('Réponse tardive');await panel.getByRole('button',{name:'Envoyer',exact:true}).click();await expect(panel.locator('article.assistant').last()).toContainText('Brouillon synthétique');
  await page.evaluate(()=>{history.pushState({},'','/watch?v=01234567890');window.dispatchEvent(new Event('yt-navigate-finish'));});
  await expect(panel.locator('article')).toHaveCount(0);
  await worker.evaluate(()=>(globalThis as any).__cypherSynthetic.stale());
  await expect(panel.locator('article')).toHaveCount(0);await expect(panel.locator('main')).not.toContainText('Ancienne réponse synthétique interdite');
  expect(errors).toEqual([]);
  await writeFile(test.info().outputPath('synthetic-transport-evidence.json'),JSON.stringify({scope:'Explicit synthetic account/native transport; actual installed extension UI and background, no OpenAI or real credentials',summary:true,question:true,sourceHashBound:true,staleReplyDiscarded:true,errors},null,2));
 }finally{await context.close();}
});
