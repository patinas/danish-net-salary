// First-party aggregate measurement: cookieless, no IP, no identity, no form values.
export const PAGE_PATHS=new Set(['/','/en/','/da/','/en/guide/','/da/guide/','/en/method/','/da/method/','/en/privacy/','/da/privacy/','/en/terms/','/da/terms/']);
export const EVENTS=new Set(['calculate','example']);
const BOT=/bot|crawl|spider|slurp|bingpreview|facebookexternal|headless|lighthouse|pingdom|uptime|scan|python|curl|wget|httpclient|go-http|java\//i;
export function isBot(ua){return BOT.test(ua||'')}
export function optedOut(headers){return headers.get('dnt')==='1'||headers.get('sec-gpc')==='1'}
export function countPageView(request){
  if(request.method!=='GET')return false;
  const url=new URL(request.url);
  return PAGE_PATHS.has(url.pathname)&&!isBot(request.headers.get('user-agent'))&&!optedOut(request.headers);
}
export function validEvent(body){return body&&typeof body.e==='string'&&EVENTS.has(body.e)?body.e:null}
export function allowedOrigin(request,hosts){
  const ref=request.headers.get('origin')||request.headers.get('referer');
  if(!ref)return false;
  try{const h=new URL(ref).hostname;return hosts.some(x=>h===x||h.endsWith('.'+x))}catch{return false}
}
export function dayKey(d=new Date()){return d.toISOString().slice(0,10)}
export async function bump(kv,key,ttlDays){
  const n=Number(await kv.get(key))||0;
  await kv.put(key,String(n+1),ttlDays?{expirationTtl:ttlDays*86400}:{});
}
