import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({ root, base: './', plugins: [react()], build: {
  outDir: '../../dist/extension', emptyOutDir: true,
  rolldownOptions: { input: {
    popup: root + 'src/popup/index.html', panel: root + 'src/panel/index.html', options: root + 'src/options/index.html',
  } },
} });
