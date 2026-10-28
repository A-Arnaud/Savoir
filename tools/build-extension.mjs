import { build } from 'vite';
import { build as bundle } from 'esbuild';
import { copyFile, cp } from 'node:fs/promises';
await build({ configFile: 'apps/extension/vite.config.ts' });
await bundle({ entryPoints: ['apps/extension/src/content/index.ts'], bundle: true, format: 'iife', outfile: 'dist/extension/content.js', target: 'chrome120' });
await bundle({ entryPoints: ['apps/extension/src/background/index.ts'], bundle: true, format: 'esm', outfile: 'dist/extension/background.js', target: 'chrome120' });
await copyFile('apps/extension/manifest.json', 'dist/extension/manifest.json');
await cp('apps/extension/icons','dist/extension/icons',{recursive:true});
