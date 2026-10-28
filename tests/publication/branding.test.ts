import {test,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const text=(file:string)=>readFileSync(file,'utf8');

test('Savoir is the visible product name without changing native or extension identity',()=>{
 const manifest=JSON.parse(text('apps/extension/manifest.json'));
 expect(manifest.name).toBe('Savoir');expect(manifest.description).toContain('ChatGPT');expect(manifest.action.default_title).toBe('Savoir');
 const hex=createHash('sha256').update(Buffer.from(manifest.key,'base64')).digest('hex').slice(0,32);
 const id=[...hex].map(c=>String.fromCharCode(97+parseInt(c,16))).join('');expect(id).toBe('jpikchfngegijdlhpadbahgkaiaihgpi');
 expect(text('apps/extension/src/background/native.ts')).toContain('com.cypher.youtube');
});

test.each([
 'apps/extension/src/content/index.ts','apps/extension/src/panel/ChatPanel.tsx',
 'apps/extension/src/options/NativeOptions.tsx','apps/extension/src/popup/Popup.tsx',
 'apps/extension/src/options/index.html','apps/extension/src/panel/index.html','apps/extension/src/popup/index.html',
])('active public surface %s uses the Savoir name',file=>{
 expect(text(file)).toContain('Savoir');expect(text(file)).not.toMatch(/\bCypher\b/);
});

test('extension icons are original committed PNGs in all advertised sizes',()=>{
 const manifest=JSON.parse(text('apps/extension/manifest.json'));
 for(const size of [16,32,48,128]){
  expect(manifest.icons?.[String(size)]).toBe(`icons/icon${size}.png`);
  const png=readFileSync(`apps/extension/icons/icon${size}.png`);
  expect(png.readUInt32BE(16)).toBe(size);expect(png.readUInt32BE(20)).toBe(size);
 }
});

test('Windows installer has a distinct Savoir YouTube destination and compatible host registration',()=>{
 const nsis=text('installer/cypher.nsi');expect(nsis).toContain('Name "Savoir"');
 expect(nsis).toContain('InstallDir "$LOCALAPPDATA\\Programs\\Savoir YouTube"');
 expect(nsis).toContain('NativeMessagingHosts\\com.cypher.youtube');
 expect(text('scripts/package-native.py')).toContain('Savoir-Setup-');
});
