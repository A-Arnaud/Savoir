import { createRoot } from 'react-dom/client';
import '../panel/chat.css';
function Popup() {
  return <main style={{width:290,padding:18}}><h1 style={{fontSize:20,margin:'0 0 8px'}}>Savoir</h1><p>Ouvrez une vidéo YouTube puis cliquez sur Savoir sous la vidéo : résumé, questions et transcription dans le panneau latéral.</p><button onClick={()=>chrome.runtime.openOptionsPage()}>Connexion et installation</button></main>;
}
createRoot(document.getElementById('root')!).render(<Popup />);
