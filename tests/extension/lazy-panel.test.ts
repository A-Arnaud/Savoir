// @vitest-environment jsdom
import {test,expect,vi} from 'vitest';
import {mountPanel} from '../../apps/extension/src/content/youtube.js';
test('content adds only a button and mounts the panel on explicit click',async()=>{
 history.replaceState({},'','/watch?v=abcdefghijk');
 document.body.innerHTML='<h1>Video</h1><div id="top-level-buttons-computed"></div><div id="secondary-inner"></div><video></video>';
 vi.stubGlobal('chrome',{runtime:{id:'a'.repeat(32),getURL:(s:string)=>'chrome-extension://'+'a'.repeat(32)+'/'+s,sendMessage:vi.fn(async()=>({ok:true}))}});
 Element.prototype.scrollIntoView=()=>{};
 await import('../../apps/extension/src/content/index.js');
 await vi.waitFor(()=>expect(document.querySelector('#cypher-action')).not.toBeNull());
 expect(document.querySelector('#cypher-panel')).toBeNull();
 (document.querySelector('#cypher-action') as HTMLButtonElement).click();
 expect(document.querySelectorAll('#cypher-panel')).toHaveLength(1);
 (document.querySelector('#cypher-action') as HTMLButtonElement).click();
 expect(document.querySelector('#cypher-panel')).toBeNull();
 vi.unstubAllGlobals();
});
