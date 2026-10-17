type Env={DB:D1Database;ASSETS:Fetcher;SYNC_TOKEN:string};
type Snapshot={revision:number;source:string;sourceUpdatedAt:string;status:unknown[];meta:Record<string,unknown>};
const reply=(obj:unknown,status=200)=>Response.json(obj,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const sameToken=(a:string,b:string)=>{const e=new TextEncoder();const x=e.encode(a),y=e.encode(b);let bad=x.length^y.length;for(let i=0;i<Math.max(x.length,y.length);i++)bad|=(x[i]??0)^(y[i]??0);return bad===0};
export default {
 async fetch(req:Request,env:Env):Promise<Response>{
  const url=new URL(req.url);
  if(url.pathname==="/health")return reply({ok:true,service:"pipeline-monitor",mode:"read-only"});
  if(req.method==="POST"&&url.pathname==="/api/sync"){
   const token=req.headers.get("Authorization")??"";
   if(!env.SYNC_TOKEN||!sameToken(token,"Bearer "+env.SYNC_TOKEN))return reply({error:"unauthorized"},401);
   if(Number(req.headers.get("content-length")||0)>2_000_000)return reply({error:"payload too large"},413);
   let data:Snapshot;
   try{data=await req.json() as Snapshot;}catch{return reply({error:"invalid json"},400);}
   if(!Number.isSafeInteger(data?.revision)||data.revision<1||!Array.isArray(data.status)||data.status.length>1000
       ||typeof data.source!=="string"||data.source.length>120||typeof data.sourceUpdatedAt!=="string"
       ||typeof data.meta!=="object"||data.meta===null||Array.isArray(data.meta)){
    return reply({error:"invalid snapshot"},400);
   }
   if(!data.status.every(x=>typeof x==="object"&&x!==null&&typeof (x as {folder?:unknown}).folder==="string"))
    return reply({error:"invalid video entries"},400);
   const payload=JSON.stringify(data);
   if(payload.length>2_000_000)return reply({error:"payload too large"},413);
   // One atomic update prevents an older source revision overwriting a newer snapshot.
   const out=await env.DB.prepare(`INSERT INTO monitor_snapshot(singleton,status_json,meta_json,revision,source,source_updated_at,synced_at)
     VALUES(1,?,?,?,?,?,?)
     ON CONFLICT(singleton) DO UPDATE SET
       status_json=excluded.status_json,meta_json=excluded.meta_json,revision=excluded.revision,
       source=excluded.source,source_updated_at=excluded.source_updated_at,synced_at=excluded.synced_at
     WHERE excluded.revision>monitor_snapshot.revision`)
     .bind(JSON.stringify(data.status),JSON.stringify(data.meta),data.revision,data.source,data.sourceUpdatedAt,new Date().toISOString()).run();
   if(!out.meta.changes)return reply({error:"stale or duplicate revision"},409);
   return reply({ok:true,revision:data.revision});
  }
  if(req.method!=="GET"&&req.method!=="HEAD")return reply({error:"read only"},405);
  if(url.pathname==="/api/status"||url.pathname==="/api/meta"||url.pathname==="/api/sync-info"){
   const row=await env.DB.prepare("SELECT status_json,meta_json,revision,source,synced_at FROM monitor_snapshot WHERE singleton=1")
     .first<{status_json:string;meta_json:string;revision:number;source:string;synced_at:string}>();
   if(!row)return reply(url.pathname==="/api/status"?[]:url.pathname==="/api/meta"?{flow:[],agents:[],stages:{},pass_score:{}}:{synced:false});
   if(url.pathname==="/api/sync-info")return reply({synced:true,revision:row.revision,source:row.source,lastSynced:row.synced_at});
   return reply(JSON.parse(url.pathname==="/api/status"?row.status_json:row.meta_json));
  }
  // No gate approval, command execution, creator, remote media or audio endpoints.
  if(url.pathname.startsWith("/api/")||url.pathname.startsWith("/media/")||url.pathname.startsWith("/audio/")||url.pathname.startsWith("/audition/")||url.pathname.startsWith("/voice-preview/"))
   return reply({error:"not available in read-only cloud monitor"},404);
  return env.ASSETS.fetch(req);
 }
} satisfies ExportedHandler<Env>;
