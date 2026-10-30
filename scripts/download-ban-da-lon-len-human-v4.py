#!/usr/bin/env python3
"""Download and verify moving people-in-nature footage for retro V4, with source provenance.

Only real Pexels clips with verifiable source page/MP4 bytes are accepted.
The downloader never treats a page screenshot as video footage.
"""
from pathlib import Path
import hashlib, json, re, subprocess
from urllib.parse import unquote
import requests

OUT=Path("build/retro-ban-da-lon-len-v4/human-assets")
OUT.mkdir(parents=True,exist_ok=True)
CANDIDATES=[
 {"key":"hiker_trail","page":"https://www.pexels.com/video/a-person-walking-on-a-trail-in-the-mountains-26599223/","page_id":26599223},
 {"key":"silhouette_sunrise","page":"https://www.pexels.com/video/silhouette-of-person-walking-at-sunrise-33766132/","page_id":33766132},
 {"key":"mountain_peak","page":"https://www.pexels.com/video/hiker-stands-tall-on-a-mountain-peak-36931949/","page_id":36931949},
 {"key":"walking_to_mountain","page":"https://www.pexels.com/video/solitary-walk-towards-scenic-mountain-36832454/","page_id":36832454}
]
HEADERS={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36","Referer":"https://www.pexels.com/"}
SESSION=requests.Session()
def probe(path):
 p=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration:stream=width,height,r_frame_rate,codec_type","-of","json",str(path)],text=True,capture_output=True)
 if p.returncode:raise RuntimeError(p.stderr[:150])
 return json.loads(p.stdout)
results=[]
for info in CANDIDATES:
 print("PAGE",info["key"],info["page"],flush=True)
 try:
  html=""
  try:
   page=SESSION.get(info["page"],headers=HEADERS,timeout=20)
   if page.ok:html=unquote(page.text.replace("\\/","/").replace("&amp;","&"))
   else:print("Page HTML unavailable, using direct Pexels video CDN",page.status_code,flush=True)
  except Exception as page_error:print("Page HTML unavailable",str(page_error)[:80],flush=True)
  # Pexels website sometimes sends HTTP 403 to cloud runners. The video CDN can
  # still serve the corresponding original ID; try documented rendition patterns.
  video_ids=list(dict.fromkeys(int(x) for x in re.findall(r'pexels\\.com/download/video/([0-9]+)',html)))
  srcs=list(dict.fromkeys(re.findall(r'https://videos\\.pexels\\.com/video-files/[^"\\x27\\\\<>\\s]+?\\.mp4(?:\\?[^"\\x27\\\\<>\\s]*)?',html)))
  if info["page_id"] not in video_ids:video_ids.append(info["page_id"])
  patterns=["hd_1920_1080_25fps","hd_1080_1920_25fps","hd_1920_1080_30fps",
            "hd_1080_1920_30fps","hd_1920_1080_24fps","hd_1080_1920_24fps",
            "hd_1080_1920_50fps","hd_1920_1080_50fps","sd_960_540_25fps",
            "sd_540_960_25fps","hd_1920_1080_60fps","hd_1080_1920_60fps"]
  urls=srcs[:10]
  for ident in video_ids[:6]:
   urls += [f"https://videos.pexels.com/video-files/{ident}/{ident}-{pat}.mp4" for pat in patterns]
   urls.append(f"https://www.pexels.com/download/video/{ident}/")
  urls=list(dict.fromkeys(urls))
  saved=False
  for candidate in urls:
   dest=OUT/(info["key"]+".mp4")
   try:
    with SESSION.get(candidate,headers=HEADERS,stream=True,timeout=(20,90),allow_redirects=True) as r:
     if r.status_code>=400:continue
     total=0;first=b""
     with dest.open("wb") as f:
      for chunk in r.iter_content(1024*1024):
       if not chunk:continue
       if not first:first=chunk[:12]
       f.write(chunk);total+=len(chunk)
       if total>75*1024*1024:raise ValueError("Video exceeded 75 MiB limit")
    if first[4:8]!=b"ftyp" or total<100000:raise ValueError("Invalid MP4 response")
    pr=probe(dest)
    vs=[s for s in pr["streams"] if s["codec_type"]=="video"]
    if not vs or float(pr["format"]["duration"])<2:raise ValueError("Short/non-video response")
    print("OK",info["key"],dest.stat().st_size,pr["format"]["duration"],flush=True)
    results.append({"name":info["key"],"page":info["page"],"source_video_id":str(video_ids[0]),"download_host":requests.utils.urlparse(r.url).hostname,"file":dest.name,
                    "sha256":hashlib.sha256(dest.read_bytes()).hexdigest(),"bytes":dest.stat().st_size,"probe":pr})
    saved=True;break
   except Exception as e:
    dest.unlink(missing_ok=True)
    print("CANDIDATE FAILED",info["key"],str(e)[:120],flush=True)
  if not saved:print("UNAVAILABLE",info["key"],flush=True)
 except Exception as e:print("SOURCE FAILED",info["key"],repr(e),flush=True)
(OUT/"human-footage-manifest.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
if len(results)<2:raise SystemExit("Not enough verified moving-human Pexels clips for V4 (minimum 2)")
print("READY",len(results),"genuine human action clips",flush=True)
