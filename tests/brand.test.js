import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {brandHeader,writeBrand} from '../scripts/brand.js';
test('CalcFjord assets and accessible shared branding without external font requests',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'calcfjord-brand-'));
 try{
  const out=pathToFileURL(dir+'/');await writeBrand(out);
  for(const asset of ['favicon.svg','brand-mark.svg','logo.svg','social.svg'])assert.match(await readFile(new URL(asset,out),'utf8'),/<svg/);
  for(const lang of ['en','da'])assert.match(brandHeader(lang,'Calculator'),/class="brand-name">CalcFjord/);
  const build=await readFile(new URL('../scripts/build.js',import.meta.url),'utf8');
  assert.match(build,/brandHeader\(l,t.name\)/);assert.match(build,/writeBrand\(out\)/);assert.match(build,/href="\/favicon.svg"/);
  const css=await readFile(new URL('../public/style.css',import.meta.url),'utf8');
  assert.doesNotMatch(css,/@import|url\(http|gradient\(/i);assert.match(css,/:focus-visible/);
 }finally{await rm(dir,{recursive:true,force:true})}
});
