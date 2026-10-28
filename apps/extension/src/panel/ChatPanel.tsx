import {useEffect,useRef,useState} from 'react';
import type {VideoContext} from '../../../../packages/contracts/src/index.js';
import {NativeSession} from '../native/client.js';
import type {NativeEvent} from '../native/protocol.js';
import {citedParts} from '../native/citations.js';
import {Timestamp} from './components/Timestamp.js';
import './chat.css';
interface Source{language:string;segments:{id:string;startSeconds:number;durationSeconds:number;text:string}[];diagnostics:string[]}
interface Message{role:'user'|'assistant';content:string}
interface Account{connected:boolean;accountLabel?:string;model?:string}
function Answer({text,source}:{text:string;source:Source|null}){
 const timed=source&&!source.diagnostics.includes('timing_unavailable')?source.segments:[];
 return <div className="cy-answer">{citedParts(text,timed).map((part,index)=>part.seconds===undefined?<span key={index}>{part.text}</span>:<Timestamp key={index} seconds={part.seconds}/>)}</div>;
}
export function ChatPanel(){
 const [video,setVideo]=useState<VideoContext|null>(null),[account,setAccount]=useState<Account|null>(null),[source,setSource]=useState<Source|null>(null);
 const [view,setView]=useState<'summary'|'chat'|'transcript'>('summary'),[summary,setSummary]=useState(''),[messages,setMessages]=useState<Message[]>([]);
 const [question,setQuestion]=useState(''),[busy,setBusy]=useState(false),[stage,setStage]=useState(''),[error,setError]=useState(''),[cached,setCached]=useState(false);
 const [settings,setSettings]=useState(false),[pasted,setPasted]=useState('');
 const historyHash=useRef('');
 const sourceHash=useRef('');
 const session=useRef<NativeSession|null>(null),active=useRef(''),epoch=useRef(0),alive=useRef(true),videoRef=useRef(video),tab=useRef<number|undefined>(undefined);
 videoRef.current=video;
 function fail(e:unknown){setError(e instanceof Error?e.message:'Le traitement a échoué. Réessayez.');}
 async function status(){
  session.current?.close();session.current=new NativeSession();
  try{const data=await session.current.start<Account>('status').promise;if(alive.current)setAccount(data);}
  catch(e){if(alive.current)fail(e);}
 }
 useEffect(()=>{
  alive.current=true;
  const change=(next:VideoContext|null)=>{
   const previous=videoRef.current;
   if(previous?.videoId===next?.videoId&&previous?.navigationRevision===next?.navigationRevision){setVideo(next);videoRef.current=next;return;}
   epoch.current++;if(active.current)session.current?.cancel(active.current);active.current='';historyHash.current='';sourceHash.current='';
   videoRef.current=next;setVideo(next);setSource(null);setSummary('');setMessages([]);setQuestion('');setBusy(false);setStage('');setError('');setCached(false);
   if(next){const version=epoch.current;void chrome.storage.local.get(`cypher-chat:${next.videoId}`).then(saved=>{
    const savedChat=saved[`cypher-chat:${next.videoId}`] as {sourceHash?:string;messages?:Message[]}|undefined;
    if(alive.current&&version===epoch.current&&savedChat&&typeof savedChat.sourceHash==='string'&&Array.isArray(savedChat.messages)){
     historyHash.current=savedChat.sourceHash;setMessages(savedChat.messages.filter(item=>item&&['user','assistant'].includes(item.role)&&typeof item.content==='string').slice(-20));
    }
   }).catch(()=>{});}
  };
  const listener=(message:any,sender:chrome.runtime.MessageSender)=>{if(sender.id===chrome.runtime.id&&message?.type==='cypher:contextChanged'&&message.tabId===tab.current)change(message.video);};
  chrome.runtime.onMessage.addListener(listener);
  void chrome.runtime.sendMessage({type:'cypher:context'}).then(reply=>{if(alive.current&&reply?.ok){tab.current=reply.data.tabId;change(reply.data.video);}});
  void status();
  return()=>{alive.current=false;epoch.current++;chrome.runtime.onMessage.removeListener(listener);session.current?.close();};
 },[]);
 function progress(event:NativeEvent,version:number){
  if(!alive.current||version!==epoch.current)return;
  if(event.event==='progress'){
   const data=event.data||{};
   setStage(data.stage==='collecting'?'Récupération des sous-titres…':data.stage==='summarizing'?`Résumé en cours${data.total?` · ${data.completed} / ${data.total} passages`:''}`:data.stage==='relevant_passages'?`Réponse à partir de ${data.selected} passages pertinents sur ${data.total}.`:'Connexion en cours…');
  }
 }
 async function collect(version:number,importedText?:string){
  if(source&&importedText===undefined)return source;
  if(!videoRef.current||!session.current)throw new Error('Ouvrez une vidéo YouTube.');
  setStage('Récupération des sous-titres…');
  const run=session.current.start<{transcript:Source;sourceHash:string}>('collect',{video:videoRef.current,...(importedText===undefined?{}:{importedText})},event=>progress(event,version));active.current=run.id;
  const result=await run.promise;
  if(!alive.current||version!==epoch.current)throw new Error('La vidéo a changé.');
  sourceHash.current=result.sourceHash;setSource(result.transcript);return result.transcript;
 }
 async function generate(mode:'summary'|'chat'){
  if(active.current||!videoRef.current||!account?.connected)return;
  const value=question.trim();if(mode==='chat'&&!value)return;
  const version=epoch.current,context=videoRef.current,history=messages.slice(-20);
  active.current='starting';setBusy(true);setError('');setCached(false);
  if(mode==='summary')setSummary('');else{setView('chat');setMessages([...history,{role:'user',content:value},{role:'assistant',content:''}]);setQuestion('');}
  let streamed='';
  try{
   await collect(version);if(version!==epoch.current)return;
   const run=session.current!.start<{text:string;model:string;cached:boolean;sourceHash:string}>('chat',{video:context,sourceHash:sourceHash.current,mode,question:mode==='chat'?value:'',history:mode==='chat'?history:[],historyVideoId:context.videoId,historySourceHash:historyHash.current},event=>{
    if(!alive.current||version!==epoch.current)return;
    progress(event,version);
    if(event.event==='delta'){
     streamed+=event.text||'';
     if(mode==='summary')setSummary(streamed);else setMessages([...history,{role:'user',content:value},{role:'assistant',content:streamed}]);
    }
   });active.current=run.id;setStage('Réponse en cours…');
   const result=await run.promise;if(!alive.current||version!==epoch.current)return;
   if(mode==='summary'){setSummary(result.text);setCached(result.cached);}else{
    const next:Message[]=[...history,{role:'user',content:value},{role:'assistant',content:result.text}];setMessages(next);
    historyHash.current=result.sourceHash;
    void chrome.storage.local.set({[`cypher-chat:${context.videoId}`]:{sourceHash:result.sourceHash,messages:next.slice(-20)}}).catch(()=>{});
   }
  }catch(e){if(alive.current&&version===epoch.current){if(mode==='summary')setSummary('');else{setMessages(history);setQuestion(value);}fail(e);}}
  finally{if(alive.current&&version===epoch.current){active.current='';setBusy(false);setStage('');}}
 }
 async function loadSource(importedText?:string){
  if(active.current)return;const version=epoch.current;setBusy(true);setError('');active.current='starting';
  try{await collect(version,importedText);if(version===epoch.current){setView('transcript');setPasted('');if(importedText!==undefined){setSummary('');setMessages([]);historyHash.current='';if(videoRef.current)void chrome.storage.local.set({[`cypher-chat:${videoRef.current.videoId}`]:null});}}}
  catch(e){if(alive.current&&version===epoch.current)fail(e);}
  finally{if(alive.current&&version===epoch.current){active.current='';setBusy(false);setStage('');}}
 }
 async function connect(){
  if(active.current||!session.current)return;const version=epoch.current;setBusy(true);setError('');
  const run=session.current.start<Account>('connect',{},event=>progress(event,version));active.current=run.id;
  try{const value=await run.promise;if(alive.current&&version===epoch.current)setAccount(value);}
  catch(e){if(alive.current&&version===epoch.current)fail(e);}
  finally{if(alive.current&&version===epoch.current){active.current='';setBusy(false);setStage('');}}
 }
 function close(){const origin=new URLSearchParams(location.search).get('parentOrigin');if(origin&&['https://www.youtube.com','https://youtube.com','https://www.youtube-nocookie.com'].includes(origin))window.parent.postMessage({type:'cypher:close'},origin);}
 return <main className="cy-chat" lang="fr">
  <header className="cy-header"><strong>Savoir</strong><span className="cy-account">{account?.connected?'ChatGPT connecté':'Votre vidéo, vos questions'}</span><button aria-label="Réglages" aria-expanded={settings} onClick={()=>setSettings(!settings)}>⚙</button><button aria-label="Fermer Savoir" onClick={close}>×</button></header>
  <div className="cy-video" title={video?.title||''}>{video?.title||'Ouvrez une vidéo YouTube'}</div>
  <nav aria-label="Vues Savoir">{(['summary','chat','transcript'] as const).map((name,index)=><button key={name} aria-pressed={view===name} onClick={()=>setView(name)}>{['Résumé','Discussion','Transcription'][index]}</button>)}</nav>
  {settings&&<section className="cy-settings"><p>{account?.accountLabel||'Connexion officielle OpenAI. Aucun mot de passe conservé par Savoir.'}</p><button onClick={()=>chrome.runtime.openOptionsPage()}>Installation et confidentialité</button>{account?.connected&&<button disabled={busy} onClick={async()=>{try{setAccount(await session.current!.start<Account>('disconnect').promise);}catch(e){fail(e);}}}>Déconnecter ChatGPT</button>}<button disabled={busy} onClick={()=>{setMessages([]);if(video)void chrome.storage.local.set({[`cypher-chat:${video.videoId}`]:[]});}}>Effacer cette discussion</button></section>}
  {error&&<div className="cy-error" role="alert"><p>{error}</p><button disabled={busy} onClick={()=>{setError('');void status();}}>Vérifier la connexion</button><button onClick={()=>chrome.runtime.openOptionsPage()}>Aide à l’installation</button></div>}
  {!account?.connected&&<section className="cy-signin"><p>Résumé et questions avec votre compte ChatGPT, sans modèle à installer.</p><button className="cy-primary" disabled={busy||!session.current} onClick={()=>void connect()}>Continuer avec ChatGPT</button><p className="cy-muted">Selon les accès et quotas de votre compte. Aucune bascule vers une API payante.</p></section>}
  <section className="cy-reading" aria-label="Contenu">
   {view==='summary'&&<>{summary?<Answer text={summary} source={source}/>:<p className="cy-empty">Les idées importantes de la vidéo, avec les passages pour les vérifier.</p>}<button className="cy-primary" disabled={!video||!account?.connected||busy} onClick={()=>void generate('summary')}>Résumer la vidéo</button>{cached&&<p className="cy-muted">Résumé déjà calculé · aucun nouvel appel IA</p>}</>}
   {view==='chat'&&<>{!messages.length&&<p className="cy-empty">Posez une question sur la vidéo : une explication, un chiffre ou un passage à retrouver.</p>}{messages.map((message,index)=><article key={index} className={`cy-message ${message.role}`}><span className="cy-speaker">{message.role==='user'?'Vous':'Assistant'}</span><Answer text={message.content} source={source}/></article>)}</>}
   {view==='transcript'&&<>{!source?<><p className="cy-empty">La transcription originale, sans traduction ni téléchargement audio.</p><button disabled={!video||busy} onClick={()=>void loadSource()}>Charger la transcription</button></>:<div className="cy-source">{source.segments.map(segment=><p key={segment.id}>{!source.diagnostics.includes('timing_unavailable')&&<Timestamp seconds={segment.startSeconds}/>} {segment.text}</p>)}</div>}<details><summary>Coller une transcription si nécessaire</summary><textarea aria-label="Transcription à importer" value={pasted} maxLength={300000} onChange={e=>setPasted(e.target.value)}/><button disabled={!video||busy||!pasted.trim()} onClick={()=>void loadSource(pasted)}>Utiliser ce texte</button></details></>}
  </section>
  {busy&&<div className="cy-progress" role="status"><span>{stage||'Traitement en cours…'}</span><button onClick={()=>{if(active.current)session.current?.cancel(active.current);setStage('Annulation…');}}>Annuler</button></div>}
  <form className="cy-compose" onSubmit={event=>{event.preventDefault();void generate('chat');}}><label className="cy-sr" htmlFor="cy-question">Question sur la vidéo</label><textarea id="cy-question" placeholder="Une question sur cette vidéo…" rows={2} maxLength={8000} value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();void generate('chat');}}}/><button className="cy-primary" disabled={!video||!account?.connected||busy||!question.trim()} type="submit">Envoyer</button></form>
  <footer className="cy-muted">Résumer ou envoyer transmet le texte de cette vidéo à OpenAI. L’IA peut se tromper : vérifiez les passages cités.{busy&&summary?' · Réponse en cours, non terminée.':''}</footer>
 </main>;
}
