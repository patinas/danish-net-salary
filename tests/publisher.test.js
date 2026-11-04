import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
test('nontracking publisher verification and operator disclosure',()=>{
 execFileSync(process.execPath,['scripts/build.js']);
 for(const lang of ['en','da']){
  const html=readFileSync(`dist/${lang}/privacy/index.html`,'utf8');
  assert.ok(html.includes('Andreas Patinas'));
  assert.ok(html.includes('mailto:info@calcfjord.win'));
  assert.ok(html.includes('content="ca-pub-1398772381037303"'));
  assert.ok(html.includes('https://calcfjord.win'));
  assert.ok(!html.includes('adsbygoogle.js'));
 }
 assert.equal(readFileSync('dist/ads.txt','utf8'),'google.com, pub-1398772381037303, DIRECT, f08c47fec0942fa0\n');
 const headers=readFileSync('dist/_headers','utf8');
 assert.ok(headers.includes('connect-src https://fundingchoicesmessages.google.com;'));
 assert.ok(!headers.includes('googlesyndication'));
 for(const lang of ['en','da']){
  const privacy=readFileSync(`dist/${lang}/privacy/index.html`,'utf8');
  assert.ok(!privacy.includes('src="/consent.js"'));
  assert.ok(!privacy.includes('fundingchoicesmessages.google.com'));
  assert.ok(privacy.includes(`/${lang}/?privacy-settings=1`));
  const home=readFileSync(`dist/${lang}/index.html`,'utf8');
  assert.ok(home.includes('src="/consent.js"'));
  assert.ok(home.includes('data-privacy-settings'));
 }
});
