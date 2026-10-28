import {test,expect,chromium} from '@playwright/test';
import {mkdtemp,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
function processes():{Id:number;WorkingSet64:number}[]{
 const text=execFileSync('powershell.exe',['-NoProfile','-Command','@(Get-Process SavoirConnector -ErrorAction SilentlyContinue | Select-Object Id,WorkingSet64) | ConvertTo-Json -Compress'],{encoding:'utf8'}).trim();
 if(!text)return [];const result=JSON.parse(text);return Array.isArray(result)?result:[result];
}
const fixture='<!doctype html><html><head><title>Original Cypher test</title><style>body{display:grid;grid-template-columns:minmax(0,1fr) 427px;gap:20px;margin:15px}#secondary-inner{grid-column:2;grid-row:1/5}</style></head><body><h1>Original council fixture</h1><div id="top-level-buttons-computed"></div><div id="secondary-inner"></div><video></video></body></html>';

test('installed native executable starts only on open, collects pasted source and exits on close',async()=>{
 const baseline=new Set(processes().map(p=>p.Id));await mkdir('.local/native-browser',{recursive:true});
 const root=await mkdtemp(path.resolve('.local/native-browser/profile-'));
 const extension=path.join(process.env.LOCALAPPDATA!,'Programs/Savoir YouTube/extension');
 const context=await chromium.launchPersistentContext(root,{channel:'chromium',headless:true,env:{...process.env,CYPHER_NATIVE_DATA_DIR:path.join(root,'connector-data')},args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
 try{
  const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
  expect(new URL(worker.url()).host).toBe('jpikchfngegijdlhpadbahgkaiaihgpi');
  const page=await context.newPage();await page.route('https://www.youtube.com/**',route=>route.fulfill({contentType:'text/html',body:fixture}));
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('https://www.youtube.com/watch?v=abcdefghijk');
  await expect(page.getByRole('button',{name:'Savoir',exact:true})).toBeVisible();
  await expect(page.locator('#cypher-panel')).toHaveCount(0);expect(processes().filter(p=>!baseline.has(p.Id))).toHaveLength(0);
  const started=Date.now();await page.getByRole('button',{name:'Savoir',exact:true}).click();const panel=page.frameLocator('#cypher-panel');
  await expect(panel.getByRole('button',{name:'Continuer avec ChatGPT',exact:true})).toBeEnabled();
  await expect.poll(()=>processes().filter(p=>!baseline.has(p.Id)).length).toBe(1);
  await expect(panel.getByRole('alert')).toHaveCount(0);
  const openingMs=Date.now()-started;const opened=processes().filter(p=>!baseline.has(p.Id));
  await panel.getByRole('button',{name:'Transcription',exact:true}).click();await panel.locator('summary').click();
  await panel.getByLabel('Transcription à importer').fill('Le conseil a planté 120 arbres. Le budget est de 24000 euros.');
  await panel.getByRole('button',{name:'Utiliser ce texte',exact:true}).click();
  await expect(panel.locator('.cy-source')).toContainText('120 arbres');await expect(panel.locator('.timestamp')).toHaveCount(0);
  await page.screenshot({path:test.info().outputPath('native-transcript.png'),fullPage:true});
  await panel.getByRole('button',{name:'Résumé',exact:true}).click();await expect(panel.getByRole('button',{name:'Résumer la vidéo',exact:true})).toBeDisabled();
  await panel.getByRole('button',{name:'Fermer Savoir',exact:true}).click();await expect(page.locator('#cypher-panel')).toHaveCount(0);
  await expect.poll(()=>processes().filter(p=>!baseline.has(p.Id)).length).toBe(0);
  expect(errors).toEqual([]);
  await writeFile(test.info().outputPath('native-evidence.json'),JSON.stringify({scope:'Real packaged host + native Chrome bridge, isolated data; original local text, no ChatGPT login/inference',openingMs,opened,closed:true,errors},null,2));
 }finally{await context.close();}
});
