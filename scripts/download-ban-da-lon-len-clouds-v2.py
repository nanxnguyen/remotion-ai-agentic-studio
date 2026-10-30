#!/usr/bin/env python3
"""Fetch distinct Pexels sky/cloud clips for the Retro TV V2 revision.
Only downloads clips whose Pexels source pages expose a free-download link.
"""
from pathlib import Path
import json, hashlib, subprocess, sys, time
import requests

OUT=Path("build/retro-ban-da-lon-len-clouds-v2/assets")
OUT.mkdir(parents=True,exist_ok=True)
SOURCES=[
 {"name":"clouds_sunrise_mountains","download_id":"18307496","page":"https://www.pexels.com/video/clouds-and-sunlight-over-mountains-13928593/","creator":"Jatin Verma","description":"Timelapse sunrise over mountains and clouds"},
 {"name":"clouds_mountain_sunset","download_id":"26599228","page":"https://www.pexels.com/video/time-lapse-of-moving-clouds-over-the-mountains-at-sunset-11998311/","creator":"Erhan Dayı","description":"Moving clouds over mountain at sunset"},
 {"name":"aerial_clouds_sunrise","download_id":"37517592","page":"https://www.pexels.com/video/aerial-view-of-clouds-over-mountain-range-at-sunrise-37517582/","creator":"Arturo Salas","description":"Aerial view of misty mountains and clouds at sunrise"},
 {"name":"sea_of_clouds_golden_hour","download_id":"6850514","page":"https://www.pexels.com/video/sea-of-clouds-and-mountains-during-golden-hour-6989027/","creator":"Mikhail Nilov","description":"Sea of clouds and mountains in golden hour"},
 {"name":"sunlight_over_clouds","download_id":"12278129","page":"https://www.pexels.com/video/sunlight-over-clouds-12278192/","creator":"Altaf Shah","description":"Aerial sunlit cloudscape at sunrise"},
 {"name":"dramatic_clouds_mountains","download_id":"11800506","page":"https://www.pexels.com/video/clouds-over-mountains-11800515/","creator":"Akshit Garg","description":"Dramatic time lapse of mountains and clouds under vivid sky"},
 {"name":"rolling_clouds_highlands","download_id":"28977240","page":"https://www.pexels.com/video/dramatic-cloud-timelapse-over-scenic-mountains-31994182/","creator":"ttudays","description":"Dramatic cloud timelapse over scenic mountain ranges"},
 {"name":"vertical_sunset_clouds","download_id":"12145210","page":"https://www.pexels.com/video/sunset-above-clouds-12113828/","creator":"Altaf Shah","description":"Golden sunset over cloudscape, vertical video"},
]
HEADERS={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36","Referer":"https://www.pexels.com/"}
session=requests.Session()
manifest=[]
for item in SOURCES:
 url=f"https://www.pexels.com/download/video/{item['download_id']}/"
 print("Downloading",item["name"],url,flush=True)
 try:
  with session.get(url,headers=HEADERS,stream=True,timeout=(25,120),allow_redirects=True) as resp:
   resp.raise_for_status()
   path=OUT/(item["name"]+".mp4")
   first=b""
   with path.open("wb") as f:
    for chunk in resp.iter_content(1024*1024):
     if chunk:
      if len(first)<64:first+=chunk[:64-len(first)]
      f.write(chunk)
   if len(first)<12 or first[4:8]!=b"ftyp":
    path.unlink(missing_ok=True)
    raise RuntimeError(f"Not an MP4 response: {resp.url} {resp.headers.get('content-type')} {first[:20]!r}")
  probe=subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration:stream=width,height,r_frame_rate,codec_name","-of","json",str(path)],text=True)
  info=json.loads(probe)
  if not info.get("streams"):raise RuntimeError("ffprobe found no streams")
  digest=hashlib.sha256(path.read_bytes()).hexdigest()
  manifest.append({**item,"download_url_final_host":requests.utils.urlparse(resp.url).netloc,"file":path.name,"bytes":path.stat().st_size,"sha256":digest,"probe":info})
  print("OK",item["name"],path.stat().st_size,info.get("format",{}).get("duration"),flush=True)
 except Exception as e:
  print("FAILED",item["name"],repr(e),flush=True)
  raise
(OUT/"footage-licenses.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
assert len(manifest)==5
print("SUCCESS",len(manifest),"sky/cloud clips",flush=True)
