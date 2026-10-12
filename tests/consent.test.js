import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('src/consent.js','utf8');
function fixture(search=''){
 const events={}, nodes=[],queue=[];
 const doc={documentElement:{lang:'en'},head:{append:n=>nodes.push(n)},body:{append:n=>nodes.push(n)},createElement:tag=>({tag,style:{},setAttribute(){}}),querySelector:()=>({append:n=>nodes.push(n)}),querySelectorAll:()=>[{addEventListener:(name,fn)=>events[name]=fn}]};
 let revocations=0;
 const googlefc={callbackQueue:queue,showRevocationMessage:()=>revocations++};
 vm.runInNewContext(source,{window:{googlefc},document:doc,location:{search},URLSearchParams});
 return {events,nodes,queue,googlefc,get revocations(){return revocations;}};
}
test('only verified CMP bootstrap; no advertising, analytics or input disclosure',()=>{
 const f=fixture();
 assert.deepEqual(f.nodes.filter(n=>n.tag==='script').map(n=>n.src),['https://fundingchoicesmessages.google.com/i/pub-1398772381037303?ers=1']);
 assert.doesNotMatch(source,/adsbygoogle|googlesyndication|google-analytics|localStorage|fetch\(|\.value/);
 assert.equal(f.nodes.find(n=>n.tag==='iframe').name,'googlefcPresent');
});
test('withdrawal uses supported callback queue, waits for readiness',()=>{
 const f=fixture();let prevented=false;
 f.events.click({preventDefault:()=>prevented=true});assert.equal(prevented,true);
 assert.equal(f.queue.length,1);assert.equal(f.nodes[0].hidden,false);
 f.queue[0].CONSENT_API_READY();
 assert.equal(f.queue.length,2);assert.equal(f.queue[1],f.googlefc.showRevocationMessage);
 f.queue[1]();assert.equal(f.revocations,1);
});
test('privacy page return link reopens choices after readiness',()=>{
 const f=fixture('?privacy-settings=1');f.queue[0].CONSENT_API_READY();assert.equal(f.queue[1],f.googlefc.showRevocationMessage);
});
test('CMP failure leaves calculation usable and never loads ads',()=>{
 const f=fixture();f.nodes.find(n=>n.tag==='script').onerror();assert.match(f.nodes[0].textContent,/No ads are active/);
 assert.equal(f.nodes.filter(n=>n.tag==='script').length,1);
});
