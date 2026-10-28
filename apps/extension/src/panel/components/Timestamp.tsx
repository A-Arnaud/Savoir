import { formatTimestamp } from './time.js';
function send(type:'cypher:seek'|'cypher:preview',seconds:number|null) {
  try {
    const declared=new URLSearchParams(location.search).get('parentOrigin');
    const origin=declared || new URL(document.referrer).origin;
    if(['https://www.youtube.com','https://youtube.com','https://www.youtube-nocookie.com'].includes(origin))window.parent.postMessage({type,seconds},origin);
  }catch{/* No containing YouTube player in a standalone extension page. */}
}
export function Timestamp({seconds}:{seconds:number}) {
  return <button className="timestamp" onClick={event=>{event.stopPropagation();send('cypher:seek',seconds);}}
    onMouseEnter={()=>send('cypher:preview',seconds)} onMouseLeave={()=>send('cypher:preview',null)}>{formatTimestamp(seconds)}</button>;
}
