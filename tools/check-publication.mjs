// Local publication gate: relative documentation links, required assets,
// accidental private artifacts and recognizable live-secret formats.
import {execFileSync} from 'node:child_process';
import {readFileSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const files=[...new Set(execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean))];
const errors=[];
const forbidden=/(^|\/)(node_modules|\.venv|\.local|\.superpowers|__pycache__|reference|test-results)(\/|$)|(^|\/)\.env(?:\.|$)|\.(?:pem|key|p12|dpapi|db|sqlite3?|exe|zip|gguf|ftz)$/i;
const liveSecret=/(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{32,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
for(const file of files){
 if(forbidden.test(file))errors.push(`Private/generated artifact in publication: ${file}`);
 if(!existsSync(file)||!statSync(file).isFile())continue;
 if(/\.(md|ts|tsx|mjs|py|json|yml|yaml|html|svg|toml|lock|nsi)$/.test(file)){
  const text=readFileSync(file,'utf8');if(liveSecret.test(text))errors.push(`Possible live secret: ${file} (value withheld)`);
  if(file.endsWith('.md')){
   const targets=[...text.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map(m=>m[1]);
   targets.push(...[...text.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]));
   for(const target of targets){
    if(/^(?:[a-z]+:|#|\/\/)/i.test(target))continue;
    const clean=decodeURIComponent(target.split('#')[0].split('?')[0]);if(!clean)continue;
    const resolved=path.resolve(path.dirname(file),clean);
    if(path.relative(root,resolved).startsWith('..')||!existsSync(resolved))errors.push(`${file}: broken/out-of-root target ${target}`);
   }
  }
 }
}
for(const file of ['README.md','LICENSE','CONTRIBUTING.md','SECURITY.md','CHANGELOG.md','.github/workflows/ci.yml','docs/installation.md','docs/faq.md','docs/privacy.md','docs/development.md',...['overview','summary','discussion','transcript','signed-out','installation','extensions'].map(n=>`docs/assets/${n}.png`)])if(!existsSync(file))errors.push(`Required publication file missing: ${file}`);
const nativeSources='installer/licenses/native/sources.json';
if(existsSync(nativeSources)){
 for(const entry of JSON.parse(readFileSync(nativeSources,'utf8')).files){
  const file=`installer/licenses/native/${entry.file}`;
  if(!files.includes(file))errors.push(`Native notice is missing from the publishable Git file set: ${file}`);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${files.length} publication files scanned; local documentation targets/assets present; no forbidden artifact or recognizable live-secret format.`);
console.log('This heuristic is not a guarantee that all possible secrets or private data are absent; review the staged diff before publishing.');
