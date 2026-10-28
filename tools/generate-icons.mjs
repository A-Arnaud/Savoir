// Rasterize our original SVG with the installed Playwright browser. No image API.
import {chromium} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const svg=await readFile('apps/extension/icons/icon.svg','utf8');
const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage();for(const size of [16,32,48,128]){
 await page.setViewportSize({width:size,height:size});
 await page.setContent(`<style>html,body{margin:0;width:100%;height:100%;background:transparent}svg{display:block;width:100%;height:100%}</style>${svg}`);
 await page.screenshot({path:`apps/extension/icons/icon${size}.png`,omitBackground:true});
}}finally{await browser.close();}
