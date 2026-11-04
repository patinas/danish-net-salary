export async function onRequestGet(context){
  const {request,env}=context;
  const denied=()=>new Response('not found',{status:404});
  if(!env.STATS||!env.STATS_KEY)return denied();
  const key=new URL(request.url).searchParams.get('key')||'';
  if(key.length<16||key!==env.STATS_KEY)return denied();
  const out={site:'calcfjord.win',since:'2026-11-04',pageviews:{total:0,days:{}},events:{calculate:{total:0,days:{}},example:{total:0,days:{}}}};
  try{
    const list=await env.STATS.list();
    const pairs=await Promise.all(list.keys.map(async k=>[k.name,Number(await env.STATS.get(k.name))||0]));
    for(const [k,v] of pairs){
      if(k.startsWith('pv:')){out.pageviews.days[k.slice(3)]=v;out.pageviews.total+=v}
      else if(k.startsWith('ev:')){const r=k.slice(3),i=r.indexOf(':'),e=r.slice(0,i),d=r.slice(i+1);if(out.events[e]){out.events[e].days[d]=v;out.events[e].total+=v}}
    }
  }catch{return Response.json({site:'calcfjord.win',since:'2026-11-04',error:'counters temporarily unavailable'},{status:503})}
  return Response.json(out);
}
