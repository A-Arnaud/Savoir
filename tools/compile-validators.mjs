import { Ajv } from 'ajv';
import standalone from 'ajv/dist/standalone/index.js';
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { schemas } from '../packages/contracts/src/generated.ts';

const ajv = new Ajv({ strict:false, strictNumbers:true, allErrors:true, code:{source:true} });
for (const name of ['SettingsV1','JobRequest','JobSnapshot','ExportDocument']) ajv.addSchema(schemas[name],name);
const generated = standalone.default(ajv, { SettingsV1:'SettingsV1', JobRequest:'JobRequest', JobSnapshot:'JobSnapshot',ExportDocument:'ExportDocument' });
// Bundle standalone CJS + small Ajv runtime helpers into pure, packaged ESM.
// No runtime schema compilation / new Function under the MV3 CSP.
const result = await build({ stdin:{contents:generated,resolveDir:process.cwd(),sourcefile:'wire.cjs'}, bundle:true,platform:'browser',format:'esm',write:false });
const output = '// Generated from Pydantic schemas with Ajv standalone; do not edit.\n' + result.outputFiles[0].text;
const target = 'packages/contracts/src/validators.mjs';
if(process.argv.includes('--check')) {
  if(await readFile(target,'utf8') !== output) throw new Error('Standalone validators are stale');
} else await writeFile(target,output);
