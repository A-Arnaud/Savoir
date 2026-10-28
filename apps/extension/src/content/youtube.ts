import type { VideoContext } from '../../../../packages/contracts/src/index.js';

export function parseVideoUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !['www.youtube.com', 'youtube.com', 'youtu.be', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(parsed.hostname)) return null;
    const candidate = parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1)
      : parsed.pathname === '/watch' ? parsed.searchParams.get('v')
      : /^\/(shorts|embed|live)\//.test(parsed.pathname) ? parsed.pathname.split('/')[2] : null;
    return candidate && /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch { return null; }
}

export function observeVideo(onChange: (video: VideoContext) => void): () => void {
  let last: string | null = null, revision = 0, stopped = false, pending = false,metadata='';
  const check = () => {
    if (pending || stopped) return;
    pending = true;
    queueMicrotask(() => {
      pending = false;
      if (stopped) return;
      const id = parseVideoUrl(location.href);
      if (!id) { last = null;metadata='';return; }
      if(id!==last){last=id;revision++;metadata='';}
      const video = document.querySelector('video');
      const context:VideoContext={ videoId: id, canonicalUrl: `https://www.youtube.com/watch?v=${id}`,
        title: (document.querySelector('ytd-watch-metadata h1')||document.querySelector('#title h1')||document.querySelector('h1'))?.textContent?.trim() || null,
        durationSeconds: video && Number.isFinite(video.duration) ? video.duration : null,
        navigationRevision: revision };
      const signature=JSON.stringify(context);if(signature===metadata)return;metadata=signature;onChange(context);
    });
  };
  // YouTube navigation and native video metadata events cover updates without
  // observing every DOM character change throughout playback.
  document.addEventListener('loadedmetadata',check,true);document.addEventListener('durationchange',check,true);
  window.addEventListener('yt-navigate-finish', check);
  window.addEventListener('popstate', check);
  check();
  return () => { stopped = true;document.removeEventListener('loadedmetadata',check,true);document.removeEventListener('durationchange',check,true);window.removeEventListener('yt-navigate-finish', check); window.removeEventListener('popstate', check); };
}

export function mountPanel(url: string): void {
  const parent = document.querySelector('#secondary-inner, #secondary');
  if (!parent || document.querySelector('#cypher-panel')) return;
  const iframe = document.createElement('iframe');
  iframe.id = 'cypher-panel'; iframe.src = url; iframe.title = 'Cypher';
  iframe.allow='clipboard-write';
  iframe.style.cssText = 'display:block;width:100%;height:clamp(420px,calc(100vh - 32px),760px);border:1px solid #3b3d46;border-radius:14px;margin-bottom:16px;background:#18191d;color-scheme:dark;';
  parent.prepend(iframe);
}
