import { NativeBridge } from './native.js';
import { parseVideoUrl } from '../content/youtube.js';

const origin = `chrome-extension://${chrome.runtime.id}/`;
const bridge=new NativeBridge();
chrome.runtime.onConnect.addListener(port=>{
  if(port.name!=='cypher:panel'||port.sender?.id!==chrome.runtime.id||!port.sender.url?.startsWith(origin)){port.disconnect();return;}
  bridge.attach(port,async request=>{
    if(!['chat','collect'].includes(request.action))return true;
    const tabId=port.sender?.tab?.id;
    if(tabId===undefined)return false;
    const context=(await chrome.storage.session.get(`video:${tabId}`))[`video:${tabId}`] as {videoId?:string}|undefined;
    const video=request.payload?.video as {videoId?:string}|undefined;
    return !!context&&context.videoId===video?.videoId;
  });
});
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (sender.id !== chrome.runtime.id) return false;
  (async () => {
    if (message?.type === 'cypher:video' && sender.tab?.id !== undefined
      && parseVideoUrl(sender.tab.url || sender.url || '') === message.video?.videoId) {
      const key = `video:${sender.tab.id}`;
      await chrome.storage.session.set({ [key]: message.video });
      void chrome.runtime.sendMessage({ type: 'cypher:contextChanged', video: message.video, tabId: sender.tab.id }).catch(() => {});
      return { ok: true };
    }
    if (!sender.url?.startsWith(origin)) throw new Error('forbidden_sender');
    if (message?.type === 'cypher:context') {
      const tabId = sender.tab?.id ?? (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id;
      const video = tabId === undefined ? null : (await chrome.storage.session.get(`video:${tabId}`))[`video:${tabId}`] || null;
      return { tabId, video };
    }

    throw new Error('invalid_request');
  })().then(data => respond({ ok: true, data }), error => respond({ ok: false, error: typeof error.code === 'string' ? error.code : 'invalid_request' }));
  return true;
});
chrome.tabs.onRemoved.addListener(id => { void chrome.storage.session.remove(`video:${id}`); });
