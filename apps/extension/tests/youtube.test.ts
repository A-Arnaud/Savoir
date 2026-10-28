// @vitest-environment jsdom
import { afterEach, expect, it,vi } from 'vitest';
import { observeVideo, parseVideoUrl, mountPanel } from '../src/content/youtube.js';

afterEach(() => { document.body.replaceChildren(); });
it('updates late metadata without treating it as another navigation',async()=>{
  document.body.innerHTML='<video></video>';history.replaceState({},'','/watch?v=abcdefghijk');
  const events:import('../../../packages/contracts/src/index.js').VideoContext[]=[];
  const stop=observeVideo(video=>events.push(video));
  try{
    await vi.waitFor(()=>expect(events).toHaveLength(1));
    const title=document.createElement('h1');title.textContent='Original late title';document.body.prepend(title);
    Object.defineProperty(document.querySelector('video'),'duration',{configurable:true,value:120});
    document.querySelector('video')!.dispatchEvent(new Event('loadedmetadata'));
    await vi.waitFor(()=>expect(events.at(-1)).toMatchObject({title:'Original late title',durationSeconds:120}));
    expect(events.at(-1)!.navigationRevision).toBe(events[0].navigationRevision);
  }finally{stop();}
});

it('recognizes supported URLs and ignores arbitrary origins', () => {
  expect(parseVideoUrl('https://youtu.be/abcdefghijk?t=50')).toBe('abcdefghijk');
  expect(parseVideoUrl('https://www.youtube.com/shorts/abcdefghijk')).toBe('abcdefghijk');
  expect(parseVideoUrl('https://www.youtube.com/embed/abcdefghijk')).toBe('abcdefghijk');
  expect(parseVideoUrl('https://evil.example/watch?v=abcdefghijk')).toBeNull();
});
it('uses the watch title rather than an unrelated dialog heading',async()=>{
  document.body.innerHTML='<h1>Original consent dialog</h1><ytd-watch-metadata><h1>Original video title</h1></ytd-watch-metadata>';
  history.replaceState({},'','/watch?v=abcdefghijk');const titles:(string|null)[]=[];
  const stop=observeVideo(video=>titles.push(video.title));
  try{await vi.waitFor(()=>expect(titles.at(-1)).toBe('Original video title'));}finally{stop();}
});
it('mounts one panel after mutations and reports latest SPA video only', async () => {
  document.body.innerHTML = '<div id="secondary-inner"></div>';
  const videos: string[] = [];
  const stop = observeVideo(video => videos.push(video.videoId));
  history.replaceState({}, '', '/watch?v=abcdefghijk');
  window.dispatchEvent(new Event('yt-navigate-finish'));
  history.replaceState({}, '', '/watch?v=01234567890');
  window.dispatchEvent(new Event('yt-navigate-finish'));
  mountPanel('chrome-extension://test/panel.html');
  mountPanel('chrome-extension://test/panel.html');
  await new Promise(resolve => setTimeout(resolve, 30));
  expect(videos.at(-1)).toBe('01234567890');
  expect(document.querySelectorAll('#cypher-panel')).toHaveLength(1);
  stop();
});
