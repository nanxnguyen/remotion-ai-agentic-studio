#!/usr/bin/env python3
"""Fail-closed YouTube private / Facebook Page Reel draft publisher. No public uploads."""
import argparse, hashlib, json, os, sqlite3, subprocess, sys, time, urllib.parse, urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DB=Path(os.getenv("PUBLISH_DB",str(ROOT/"out"/"publishing.sqlite3")))
def api(url,method="GET",body=None,headers=None):
    req=urllib.request.Request(url,data=body,headers=headers or {},method=method)
    with urllib.request.urlopen(req,timeout=900) as res: return res.status,dict(res.headers),res.read()
def digest(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for b in iter(lambda:f.read(1024*1024),b""):h.update(b)
    return h.hexdigest()
def gate(slug):
    p=subprocess.run([sys.executable,"-I",str(ROOT/"scripts"/"pipeline.py"),"check",slug],cwd=ROOT,capture_output=True,text=True)
    if p.returncode: raise RuntimeError("Gate C/check failed: "+(p.stderr or p.stdout)[-500:])
def probe(file):
    j=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(file)]))
    v=next((x for x in j["streams"] if x["codec_type"]=="video"),None)
    a=next((x for x in j["streams"] if x["codec_type"]=="audio"),None)
    if not v or not a or (v["width"],v["height"])!=(1080,1920) or not 4<=float(j["format"]["duration"])<=60:
        raise RuntimeError("Video requires audio, 1080x1920, duration 4..60s")
def init(db):
    db.execute("CREATE TABLE IF NOT EXISTS uploads (key TEXT PRIMARY KEY,slug TEXT,platform TEXT,sha TEXT,status TEXT,remote_id TEXT,error TEXT,updated INTEGER)")
    db.commit()
def save(db,key,slug,platform,sha,status,remote_id=None,error=None):
    db.execute("""INSERT INTO uploads VALUES(?,?,?,?,?,?,?,?)
    ON CONFLICT(key) DO UPDATE SET status=excluded.status,remote_id=COALESCE(excluded.remote_id,uploads.remote_id),error=excluded.error,updated=excluded.updated""",
    (key,slug,platform,sha,status,remote_id,error,int(time.time())));db.commit()
def youtube(file,title,description):
    for k in ("YOUTUBE_CLIENT_ID","YOUTUBE_CLIENT_SECRET","YOUTUBE_REFRESH_TOKEN"):
        if not os.getenv(k):raise RuntimeError("Missing "+k)
    data=urllib.parse.urlencode(dict(client_id=os.environ["YOUTUBE_CLIENT_ID"],client_secret=os.environ["YOUTUBE_CLIENT_SECRET"],refresh_token=os.environ["YOUTUBE_REFRESH_TOKEN"],grant_type="refresh_token")).encode()
    _,_,token=api("https://oauth2.googleapis.com/token","POST",data,{"Content-Type":"application/x-www-form-urlencoded"})
    access=json.loads(token)["access_token"]
    meta=json.dumps({"snippet":{"title":title[:100],"description":description,"categoryId":"22"},"status":{"privacyStatus":"private","selfDeclaredMadeForKids":False}},ensure_ascii=False).encode()
    _,headers,_=api("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status","POST",meta,{"Authorization":"Bearer "+access,"Content-Type":"application/json","X-Upload-Content-Type":"video/mp4","X-Upload-Content-Length":str(file.stat().st_size)})
    url=headers.get("Location") or headers.get("location")
    if not url or not url.startswith("https://www.googleapis.com/"):raise RuntimeError("Untrusted resumable session")
    _,_,raw=api(url,"PUT",file.read_bytes(),{"Authorization":"Bearer "+access,"Content-Type":"video/mp4"})
    return json.loads(raw)["id"]
def facebook(file,title,description):
    page=os.environ.get("FACEBOOK_PAGE_ID"); token=os.environ.get("FACEBOOK_PAGE_ACCESS_TOKEN")
    if not page or not token:raise RuntimeError("Missing Facebook Page ID/token")
    version=os.getenv("FACEBOOK_GRAPH_VERSION","v23.0")
    base="https://graph.facebook.com/"+version
    form=lambda d:urllib.parse.urlencode(d).encode()
    _,_,raw=api(base+"/"+urllib.parse.quote(page,safe="")+"/video_reels","POST",form({"upload_phase":"start","access_token":token}),{"Content-Type":"application/x-www-form-urlencoded"})
    started=json.loads(raw);video_id=started["video_id"];upload_url=started.get("upload_url")
    if not upload_url or not upload_url.startswith("https://"):raise RuntimeError("Invalid Facebook upload URL")
    api(upload_url,"POST",file.read_bytes(),{"Authorization":"OAuth "+token,"offset":"0","file_size":str(file.stat().st_size),"Content-Type":"application/octet-stream"})
    api(base+"/"+urllib.parse.quote(page,safe="")+"/video_reels","POST",form({"upload_phase":"finish","video_id":video_id,"video_state":"DRAFT","description":description,"title":title,"access_token":token}),{"Content-Type":"application/x-www-form-urlencoded"})
    return video_id
def main():
    p=argparse.ArgumentParser();p.add_argument("slug");p.add_argument("--file",required=True);p.add_argument("--title",required=True);p.add_argument("--description",default="");p.add_argument("--platform",choices=["youtube","facebook","both"],default="both");p.add_argument("--execute",action="store_true")
    x=p.parse_args();file=Path(x.file).resolve()
    if not file.is_file():raise RuntimeError("MP4 does not exist")
    gate(x.slug);probe(file);sha=digest(file)
    platforms=["youtube","facebook"] if x.platform=="both" else [x.platform]
    if not x.execute:
        print(json.dumps({"mode":"dry-run","slug":x.slug,"platforms":platforms,"sha256":sha,"visibility":{"youtube":"private","facebook":"DRAFT"}}));return
    if os.getenv("PUBLISH_ENABLED")!="1":raise RuntimeError("Blocked: PUBLISH_ENABLED must be 1")
    # Account credentials and --execute do not constitute user consent.
    # Require fresh interactive approval for this exact video.
    if not sys.stdin.isatty():
        raise RuntimeError("Blocked: interactive approval required before upload")
    print("Request to upload", x.slug, sha[:16], "to", ", ".join(platforms), file=sys.stderr)
    print("YouTube PRIVATE / Facebook DRAFT. Type UPLOAD to approve: ", end="", file=sys.stderr, flush=True)
    if input().strip() != "UPLOAD":
        raise RuntimeError("Upload cancelled: user did not approve")
    DB.parent.mkdir(parents=True,exist_ok=True)
    with sqlite3.connect(DB,timeout=30) as db:
        init(db)
        for platform in platforms:
            key=hashlib.sha256((x.slug+":"+platform+":"+sha).encode()).hexdigest()
            previous=db.execute("SELECT status FROM uploads WHERE key=?",(key,)).fetchone()
            if previous:raise RuntimeError("Upload already attempted ("+platform+":"+previous[0]+"); reconcile before retry")
            # Persist BEFORE any network request; ambiguous outcomes never retry automatically.
            save(db,key,x.slug,platform,sha,"uploading")
            try:
                remote=(youtube if platform=="youtube" else facebook)(file,x.title,x.description)
                status="private" if platform=="youtube" else "draft"
                save(db,key,x.slug,platform,sha,status,remote)
                print(json.dumps({"platform":platform,"status":status,"remote_id":remote}))
            except Exception as e:
                save(db,key,x.slug,platform,sha,"needs_reconcile",error=type(e).__name__)
                raise RuntimeError(platform+" upload ambiguous: reconcile provider dashboard; no automatic retry") from e
if __name__=="__main__":
    try:main()
    except Exception as e: print(json.dumps({"status":"error","reason":str(e)}),file=sys.stderr);sys.exit(1)
