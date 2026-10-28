import { mountPanel, observeVideo, parseVideoUrl } from './youtube.js';
import { isPlayerCommand, previewTimestamp, seekVideo } from './bridge.js';

function panelUrl(){
  const id=parseVideoUrl(location.href);
  const shared=id&&location.hash.startsWith('#cypher=')&&location.hash.length<=16384?`https://www.youtube.com/watch?v=${id}${location.hash}`:null;
  return chrome.runtime.getURL('src/panel/index.html')+'?parentOrigin='+encodeURIComponent(location.origin)+(shared?'&configurationLink='+encodeURIComponent(shared):'');
}
const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
function mount() {
  if (!parseVideoUrl(location.href)) { document.getElementById('cypher-panel')?.remove(); document.getElementById('cypher-action')?.remove(); return; }
  const url=panelUrl();
  const frame=document.querySelector<HTMLIFrameElement>('#cypher-panel');if(frame&&frame.src!==url)frame.src=url;
  const actions = document.querySelector('#top-level-buttons-computed, #actions-inner');
  if (actions && !document.getElementById('cypher-action')) {
    const button = document.createElement('button');
    button.id = 'cypher-action'; button.textContent = 'Savoir'; button.title = 'Ouvrir Savoir';
    button.style.cssText = 'border:1px solid #ffffff26;border-radius:20px;padding:8px 14px;margin-right:8px;background:#242427;color:#efeff4;font:500 13px system-ui,sans-serif;cursor:pointer;';
    button.setAttribute('aria-expanded','false');
    button.onclick = () => {
      const existing=document.getElementById('cypher-panel');
      if(existing){existing.remove();button.setAttribute('aria-expanded','false');return;}
      mountPanel(panelUrl());button.setAttribute('aria-expanded','true');
    };
    actions.prepend(button);
  }
  if(document.getElementById('cypher-action'))observer.disconnect();
}
let pending=false;
const observer=new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(()=>{pending=false;mount();});}});
function watchMount(){observer.observe(document.documentElement,{childList:true,subtree:true});mount();}
watchMount();
window.addEventListener('yt-navigate-finish',watchMount);
window.addEventListener('hashchange',mount);
observeVideo(video => { mount(); void chrome.runtime.sendMessage({ type: 'cypher:video', video }).catch(() => {}); });
window.addEventListener('message', event => {
  const frame = document.querySelector<HTMLIFrameElement>('#cypher-panel');
  if(frame?.contentWindow&&event.source===frame.contentWindow&&event.origin===extensionOrigin&&event.data?.type==='cypher:close'){
    frame.remove();document.getElementById('cypher-action')?.setAttribute('aria-expanded','false');return;
  }
  if (!frame?.contentWindow || !isPlayerCommand(event, frame.contentWindow, extensionOrigin)) return;
  if (event.data.type === 'cypher:seek') void seekVideo(event.data.seconds as number).catch(() => {});
  else previewTimestamp(event.data.seconds);
});
