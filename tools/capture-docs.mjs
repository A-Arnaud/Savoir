// Documentation screenshots: real installed UI; deterministic transport is
// explicitly labeled in each demo image. No account or OpenAI endpoint is used.
import {chromium} from '@playwright/test';
import {readFile,mkdir,mkdtemp,writeFile} from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('docs/assets');await mkdir(out,{recursive:true});await mkdir('.local/doc-browser',{recursive:true});
const html=await readFile('tests/fixtures/demo-video.html','utf8');
const extension=path.join(process.env.LOCALAPPDATA,'Programs/Savoir YouTube/extension');
async function start(){const profile=await mkdtemp(path.resolve('.local/doc-browser/profile-'));const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,locale:'fr-FR',viewport:{width:1320,height:900},env:{...process.env,CYPHER_NATIVE_DATA_DIR:path.join(profile,'native-data')},args:['--lang=fr',`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');return {context,worker};}
async function open(context){const page=await context.newPage();await page.route('https://www.youtube.com/**',r=>r.fulfill({contentType:'text/html',body:html}));await page.goto('https://www.youtube.com/watch?v=abcdefghijk');await page.getByRole('button',{name:'Savoir',exact:true}).click();return page;}
const real=await start();
try{
 const page=await open(real.context);const panel=page.frameLocator('#cypher-panel');await panel.getByRole('button',{name:'Continuer avec ChatGPT',exact:true}).waitFor();
 await page.locator('#cypher-panel').screenshot({path:path.join(out,'signed-out.png')});
 const guide=await real.context.newPage();await guide.goto('file:///'+path.join(process.env.LOCALAPPDATA,'Programs/Savoir YouTube/Premiers pas.html').replaceAll('\\','/'));await guide.locator('#folder').evaluate(e=>{e.style.filter='blur(5px)';e.setAttribute('aria-label','Chemin personnel masqué sur cette capture');});await guide.screenshot({path:path.join(out,'installation.png'),fullPage:true});
 const manager=await real.context.newPage();await manager.goto('chrome://extensions/');await manager.waitForLoadState('domcontentloaded');await manager.getByText('Savoir',{exact:true}).first().waitFor();await manager.locator('extensions-toolbar #devMode').click();await manager.getByRole('button',{name:/Charger.*extension/}).waitFor();await manager.getByRole('button',{name:/Charger.*extension/}).scrollIntoViewIfNeeded();await manager.screenshot({path:path.join(out,'extensions.png'),animations:'disabled',clip:{x:0,y:0,width:1320,height:520}});
}finally{await real.context.close();}
const demo=await start();
try{
 await demo.worker.evaluate(()=>{
  const listeners=new Set(),disconnected=new Set();const emit=v=>listeners.forEach(f=>f(v));
  chrome.runtime.connectNative=()=>({onMessage:{addListener:f=>listeners.add(f),removeListener:f=>listeners.delete(f)},onDisconnect:{addListener:f=>disconnected.add(f),removeListener:f=>disconnected.delete(f)},disconnect:()=>disconnected.forEach(f=>f()),postMessage:r=>queueMicrotask(()=>{
   const result=data=>emit({id:r.id,event:'result',data});
   if(r.action==='status')result({connected:true,accountLabel:'Compte de démonstration — transport simulé'});
   else if(r.action==='collect')result({sourceHash:'a'.repeat(64),transcript:{language:'fr',source:'manual',complete:true,diagnostics:[],segments:[{id:'a',startSeconds:0,durationSeconds:75,text:'Le cache garde une copie de certaines ressources déjà téléchargées, comme les images, les feuilles de style et les scripts. Une nouvelle visite peut réutiliser ces ressources plutôt que tout télécharger à nouveau.'},{id:'b',startSeconds:75,durationSeconds:75,text:'Une durée de validité indique combien de temps une ressource peut être réutilisée. Selon les instructions du serveur, le navigateur peut aussi demander si la version enregistrée est encore actuelle avant de la reprendre.'},{id:'c',startSeconds:150,durationSeconds:150,text:'Vider le cache tous les jours n’est pas nécessaire. Cela peut même ralentir la prochaine visite. En revanche, recharger sans le cache peut aider lorsqu’une page affiche une ancienne version après une mise à jour.'}]}});
   else if(r.action==='cancel')result({cancelled:true});
   else if(r.action==='chat'){
    const text=r.payload.mode==='summary'?'Le cache évite de tout retélécharger.\n\n• Il conserve certaines ressources déjà reçues pour accélérer les visites suivantes. [00:00]\n\n• Leur durée de validité et leur revalidation dépendent des instructions du serveur. [01:15]\n\n• Le vider chaque jour n’est pas nécessaire ; une recharge sans cache est surtout utile pour vérifier une mise à jour. [02:30]':'Non, pas au quotidien. Le cache sert justement à éviter des téléchargements inutiles.\n\nSi une page semble bloquée sur une ancienne version, une recharge sans cache peut aider. [02:30]\n\nÀ retenir : gardez le cache pour la rapidité ; utilisez une recharge ciblée pour diagnostiquer un affichage dépassé.';
    emit({id:r.id,event:'delta',text});result({text,sourceHash:'a'.repeat(64),model:'explicit-documentation-fixture',cached:false});
   }
  })});
 });
 const page=await open(demo.context);const panel=page.frameLocator('#cypher-panel');await panel.getByText('ChatGPT connecté',{exact:true}).waitFor();
 await panel.locator('main').evaluate(e=>{const label=document.createElement('div');label.textContent='DÉMONSTRATION · COMPTE ET RÉPONSES SIMULÉS';label.style.cssText='font:600 10px/1.5 system-ui;letter-spacing:.06em;text-align:center;padding:7px 3px;background:#25354a;color:#d5e0ff;flex-shrink:0;';e.prepend(label);});
 await panel.getByRole('button',{name:'Résumer la vidéo',exact:true}).click();await panel.locator('.cy-answer').getByText('Le cache évite de tout retélécharger.',{exact:false}).waitFor();
 await page.screenshot({path:path.join(out,'overview.png'),fullPage:true});await page.locator('#cypher-panel').screenshot({path:path.join(out,'summary.png')});
 await panel.getByLabel('Question sur la vidéo').fill('Faut-il vider le cache tous les jours ?');await panel.getByRole('button',{name:'Envoyer',exact:true}).click();await panel.locator('article.assistant').waitFor();await page.locator('#cypher-panel').screenshot({path:path.join(out,'discussion.png')});
 await panel.getByRole('button',{name:'Transcription',exact:true}).click();await panel.locator('.cy-source').waitFor();await page.locator('#cypher-panel').screenshot({path:path.join(out,'transcript.png')});
}finally{await demo.context.close();}
await writeFile(path.join(out,'README.md'),'# Captures de Savoir\n\nGénérées avec `node tools/capture-docs.mjs` depuis l’extension installée.\n\n- `signed-out.png`, `extensions.png`, `installation.png` : vrais états sans compte, navigateur isolé ; chemin utilisateur flouté dans le guide.\n- `overview.png`, `summary.png`, `discussion.png`, `transcript.png` : vrai panneau, page/texte originaux fictifs, compte et réponses via transport explicite de test. Mention de démonstration visible dans chaque image. Aucune inférence OpenAI réelle.\n\nAucun compte, historique de navigation, média tiers ou transcription privée n’a été utilisé.\n');
console.log('7 documentation screenshots captured; real signed-out/install states and explicitly labeled synthetic demonstrations.');
