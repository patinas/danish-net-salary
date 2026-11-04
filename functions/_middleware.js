import {countPageView,bump,dayKey} from './lib/measure.js';
export async function onRequest(context){
  const {request,env,next,waitUntil}=context;
  const response=await next();
  try{
    if(env.STATS&&countPageView(request)){
      const d=dayKey();
      waitUntil(Promise.allSettled([bump(env.STATS,'total:pv'),bump(env.STATS,'pv:'+d,120)]));
    }
  }catch{}
  return response;
}
