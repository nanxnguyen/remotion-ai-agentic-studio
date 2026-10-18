#!/usr/bin/env python3
"""Replicate existing local pipeline API projections to read-only Cloudflare D1.
Use only an explicit local monitor origin and an approved HTTPS Worker endpoint.
"""
import argparse
import json
import os
import pathlib
import sqlite3
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

ROOT=pathlib.Path(__file__).resolve().parents[1]
def load_json(url):
    with urllib.request.urlopen(url, timeout=15) as res:
        return json.load(res)
def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--local",default="http://127.0.0.1:4180")
    ap.add_argument("--remote",default=os.environ.get("CLOUDFLARE_MONITOR_URL",""))
    ap.add_argument("--state-db",default=str(ROOT/"out"/"monitor-sync.sqlite3"))
    args=ap.parse_args()
    remote=args.remote.rstrip("/")
    token=os.environ.get("CLOUDFLARE_MONITOR_SYNC_TOKEN","")
    if not remote.startswith("https://") or not token:
        ap.error("Requires HTTPS remote and CLOUDFLARE_MONITOR_SYNC_TOKEN")
    local=args.local.rstrip("/")
    if local not in ("http://127.0.0.1:4180","http://localhost:4180"):
        ap.error("Local monitor origin must be localhost:4180")
    status=load_json(local+"/api/status")
    meta=load_json(local+"/api/meta")
    pathlib.Path(args.state_db).parent.mkdir(parents=True,exist_ok=True)
    with sqlite3.connect(args.state_db) as db:
        db.execute("CREATE TABLE IF NOT EXISTS revision (id INTEGER PRIMARY KEY CHECK(id=1), n INTEGER NOT NULL)")
        old=db.execute("SELECT n FROM revision WHERE id=1").fetchone()
        rev=(old[0] if old else 0)+1
        # Store before uploading: ambiguous responses never repeat an old revision.
        db.execute("INSERT INTO revision(id,n) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET n=excluded.n",(rev,))
        db.commit()
    payload=json.dumps({"revision":rev,"source":"local-pipeline-monitor","sourceUpdatedAt":datetime.now(timezone.utc).isoformat(),"status":status,"meta":meta},ensure_ascii=False).encode()
    headers={"Content-Type":"application/json","Authorization":"Bearer "+token}
    access_id=os.environ.get("CF_ACCESS_CLIENT_ID","")
    access_secret=os.environ.get("CF_ACCESS_CLIENT_SECRET","")
    if access_id and access_secret:
        headers.update({"CF-Access-Client-Id":access_id,"CF-Access-Client-Secret":access_secret})
    req=urllib.request.Request(remote+"/api/sync",data=payload,method="POST",headers=headers)
    try:
        with urllib.request.urlopen(req,timeout=30) as res:
            print(json.dumps({"synced":True,"revision":rev,"response":json.load(res)},ensure_ascii=False))
    except urllib.error.HTTPError as exc:
        print(json.dumps({"synced":False,"revision":rev,"status":exc.code}),file=sys.stderr)
        return 1
    return 0
if __name__=="__main__":sys.exit(main())
