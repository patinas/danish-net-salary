import {validEvent,allowedOrigin,bump,dayKey} from '../lib/measure.js';
const HOSTS=['calcfjord.win','danish-net-salary.pages.dev'];
export async function onRequestPost(context){
  const {request,env,waitUntil}=context;
  if(!env.STATS)return new Response('measurement unavailable',{status:503});
  if(!allowedOrigin(request,HOSTS))return new Response('forbidden',{status:403});
  let body=null;try{body=await request.json()}catch{}
  const e=validEvent(body);
  if(!e)return new Response('unknown event',{status:400});
  const d=dayKey();
  waitUntil(Promise.allSettled([bump(env.STATS,'total:ev:'+e),bump(env.STATS,'ev:'+e+':'+d,120)]));
  return new Response(null,{status:204});
}
