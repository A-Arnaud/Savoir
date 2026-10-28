export function formatTimestamp(seconds:number):string {
  if(!Number.isFinite(seconds)||seconds<0)throw new TypeError('Invalid timestamp');
  const total=Math.floor(seconds),hours=Math.floor(total/3600),minutes=Math.floor(total/60)%60;
  const parts=[minutes,total%60];if(hours)parts.unshift(hours);
  return parts.map(value=>String(value).padStart(2,'0')).join(':');
}
