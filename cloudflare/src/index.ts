import {Container, getContainer} from '@cloudflare/containers';

export class VideoContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '15m';
  enableInternet = false;
}
interface Env {
 DB: D1Database;
 ARTIFACTS: R2Bucket;
 VIDEO_CONTAINER: DurableObjectNamespace<VideoContainer>;
 ADMIN_TOKEN: string;
}
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
const validVideo=(id:string)=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && id.length<=100;
async function authorized(request:Request,env:Env) {
 if(!env.ADMIN_TOKEN) return false;
 const h=request.headers.get('Authorization')||'';
 // POC bearer token: configure only via wrangler secret put ADMIN_TOKEN.
 return h==='Bearer '+env.ADMIN_TOKEN;
}
export default {
 async fetch(request:Request,env:Env):Promise<Response> {
  const url=new URL(request.url);
  if(url.pathname==='/health')return json({ok:true,mode:'poc',publicPublishing:false});
  if(!(await authorized(request,env)))return json({error:'unauthorized'},401);
  if(url.pathname==='/jobs'&&request.method==='POST'){
   let data:{videoId?:string};
   try{data=await request.json();}catch{return json({error:'invalid JSON'},400);}
   const videoId=data.videoId||'';
   if(!validVideo(videoId))return json({error:'invalid videoId'},400);
   const id=crypto.randomUUID();const now=new Date().toISOString();
   await env.DB.prepare("INSERT INTO jobs(id,video_id,status,created_at,updated_at) VALUES(?,?,?,?,?)").bind(id,videoId,'queued',now,now).run();
   return json({id,status:'queued',note:'No automatic execution. Use /jobs/:id/run to trigger benchmark.'},202);
  }
  const match=url.pathname.match(/^\/jobs\/([0-9a-f-]{36})(?:\/(run|artifact))?$/);
  if(!match)return json({error:'not found'},404);
  const id=match[1],action=match[2];
  const job=await env.DB.prepare("SELECT * FROM jobs WHERE id=?").bind(id).first<{id:string;video_id:string;status:string;result_key:string|null}>();
  if(!job)return json({error:'not found'},404);
  if(!action&&request.method==='GET')return json(job);
  if(action==='artifact'&&request.method==='GET'){
   if(!job.result_key)return json({error:'artifact missing'},404);
   const object=await env.ARTIFACTS.get(job.result_key);
   if(!object)return json({error:'missing in R2'},404);
   return new Response(object.body,{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  }
  if(action==='run'&&request.method==='POST'){
   if(job.status!=='queued')return json({error:'job already triggered; no duplicate execution'},409);
   // Non-idempotent dispatches are locked BEFORE container startup.
   const now=new Date().toISOString();
   const updated=await env.DB.prepare("UPDATE jobs SET status='running',updated_at=? WHERE id=? AND status='queued'").bind(now,id).run();
   if(!updated.meta.changes)return json({error:'conflict'},409);
   try {
    const container=getContainer(env.VIDEO_CONTAINER,'single-poc-worker');
    await container.startAndWaitForPorts({ports:[8080]});
    const res=await container.fetch(new Request('http://container/benchmark',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({videoId:job.video_id,jobId:id})}));
    if(!res.ok)throw new Error('benchmark HTTP '+res.status);
    const result=await res.text();
    const key='benchmarks/'+id+'.json';
    await env.ARTIFACTS.put(key,result,{httpMetadata:{contentType:'application/json'}});
    await env.DB.prepare("UPDATE jobs SET status='completed',result_key=?,updated_at=? WHERE id=?").bind(key,new Date().toISOString(),id).run();
    return json({id,status:'completed',resultKey:key});
   } catch(e) {
    // Mark failed, never retry automatically.
    await env.DB.prepare("UPDATE jobs SET status='failed',error=?,updated_at=? WHERE id=?").bind(String(e).slice(0,300),new Date().toISOString(),id).run();
    return json({id,status:'failed',error:'benchmark failed; inspect logs'},502);
   }
  }
  return json({error:'method not allowed'},405);
 }
} satisfies ExportedHandler<Env>;
