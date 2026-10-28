type PlayerCommand = { type: 'cypher:seek' | 'cypher:preview'; seconds: number | null };
export function isPlayerCommand(event: { source: unknown; origin: string; data: unknown }, source: Window, origin: string): event is { source: Window; origin: string; data: PlayerCommand } {
  if (event.source !== source || event.origin !== origin || !event.data || typeof event.data !== 'object') return false;
  const command = event.data as Partial<PlayerCommand>;
  if (command.type === 'cypher:preview' && command.seconds === null) return true;
  return ['cypher:seek', 'cypher:preview'].includes(command.type || '') && typeof command.seconds === 'number' && Number.isFinite(command.seconds) && command.seconds >= 0;
}
export async function seekVideo(seconds: number): Promise<void> {
  if (!Number.isFinite(seconds) || seconds < 0) throw new TypeError('Invalid timestamp');
  const video = document.querySelector('video');
  if (!video) throw new Error('Player unavailable');
  video.currentTime = Number.isFinite(video.duration) ? Math.min(seconds, video.duration) : seconds;
  await video.play();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
export function previewTimestamp(seconds: number | null): void {
  const bar = document.querySelector('.ytp-progress-bar');
  const video = document.querySelector('video');
  if (!bar || !video) return;
  if (seconds === null) { bar.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true })); return; }
  if (!Number.isFinite(seconds) || seconds < 0 || !Number.isFinite(video.duration) || video.duration <= 0) return;
  const rect = bar.getBoundingClientRect();
  bar.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: rect.left + rect.width * Math.min(seconds / video.duration, 1), clientY: rect.top + rect.height / 2 }));
}
