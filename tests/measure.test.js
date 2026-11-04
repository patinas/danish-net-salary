import {test} from 'node:test';
import assert from 'node:assert/strict';
import {countPageView,isBot,optedOut,validEvent,allowedOrigin,bump,dayKey} from '../functions/lib/measure.js';
const req=(url,opts={})=>new Request(url,{method:opts.method||'GET',headers:opts.headers||{}});
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15';

test('counts real page views on known pages',()=>{
  assert.equal(countPageView(req('https://calcfjord.win/en/',{headers:{'user-agent':UA}})),true);
  assert.equal(countPageView(req('https://calcfjord.win/da/guide/',{headers:{'user-agent':UA}})),true);
});
test('ignores non-GET, unknown paths, bots, DNT and GPC',()=>{
  assert.equal(countPageView(req('https://calcfjord.win/en/',{method:'POST',headers:{'user-agent':UA}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/signin',{headers:{'user-agent':UA}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/api/dev/.env',{headers:{'user-agent':UA}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/en/',{headers:{'user-agent':'Mozilla/5.0 (compatible; Googlebot/2.1)'}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/en/',{headers:{'user-agent':'AdsBot-Google'}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/en/',{headers:{'user-agent':UA,dnt:'1'}})),false);
  assert.equal(countPageView(req('https://calcfjord.win/en/',{headers:{'user-agent':UA,'sec-gpc':'1'}})),false);
});
test('bot detection covers common crawlers but not browsers',()=>{
  assert.equal(isBot('Mozilla/5.0 (compatible; bingbot/2.0)'),true);
  assert.equal(isBot('python-requests/2.31.0'),true);
  assert.equal(isBot(UA),false);
});
test('event allowlist',()=>{
  assert.equal(validEvent({e:'calculate'}),'calculate');
  assert.equal(validEvent({e:'example'}),'example');
  assert.equal(validEvent({e:'gross',value:30000}),null);
  assert.equal(validEvent({}),null);
  assert.equal(validEvent(null),null);
});
test('origin allowlist per host',()=>{
  const hosts=['calcfjord.win','danish-net-salary.pages.dev'];
  assert.equal(allowedOrigin(req('https://calcfjord.win/api/event',{headers:{origin:'https://calcfjord.win'}}),hosts),true);
  assert.equal(allowedOrigin(req('https://calcfjord.win/api/event',{headers:{origin:'https://evil.example'}}),hosts),false);
  assert.equal(allowedOrigin(req('https://calcfjord.win/api/event',{headers:{origin:'https://calcfjord.win.evil.example'}}),hosts),false);
  assert.equal(allowedOrigin(req('https://calcfjord.win/api/event'),hosts),false);
});
test('bump increments with TTL',async()=>{
  const store=new Map();const kv={async get(k){return (store.get(k)||[null])[0]},async put(k,v,o){store.set(k,[v,o])}};
  await bump(kv,'total:pv');await bump(kv,'pv:2026-11-04',120);await bump(kv,'total:pv');
  assert.equal(store.get('total:pv')[0],'2');
  assert.deepEqual(store.get('pv:2026-11-04')[1],{expirationTtl:120*86400});
});
test('dayKey format',()=>{assert.match(dayKey(new Date('2026-11-04T08:00:00Z')),/^2026-11-04$/)});
