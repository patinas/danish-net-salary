export async function onRequestGet({env}){
  const out={site:'calcfjord.win',since:'2026-11-04',bound:Boolean(env.STATS),pageviews:{total:0,days:{}},events:{calculate:{total:0,days:{}},example:{total:0,days:{}}}};
  if(!env.STATS)return Response.json(out);
  const list=await env.STATS.list();
  const pairs=await Promise.all(list.keys.map(async k=>[k.name,Number(await env.STATS.get(k.name))||0]));
  for(const [k,v] of pairs){
    if(k==='total:pv')out.pageviews.total=v;
    else if(k.startsWith('pv:'))out.pageviews.days[k.slice(3)]=v;
    else if(k.startsWith('total:ev:')){const e=k.slice(9);if(out.events[e])out.events[e].total=v}
    else if(k.startsWith('ev:')){const r=k.slice(3),i=r.indexOf(':'),e=r.slice(0,i),d=r.slice(i+1);if(out.events[e])out.events[e].days[d]=v}
  }
  return Response.json(out);
}
