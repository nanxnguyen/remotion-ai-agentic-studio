#!/usr/bin/env python3
"""Download only traceable Pexels motion footage and official Be Vietnam Pro font."""
import os,re,sys,json,urllib.request,urllib.error,time,subprocess
from pathlib import Path
ROOT=Path("build/retro-met-roi/assets");ROOT.mkdir(parents=True,exist_ok=True)
UA={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36","Referer":"https://www.pexels.com/"}
FONT="https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/BeVietnamPro-ExtraBold.ttf"
def load(url):
 try:
  req=urllib.request.Request(url,headers=UA)
  with urllib.request.urlopen(req,timeout=30) as r:
   b=r.read(50000000); typ=r.headers.get("content-type","")
  return b,typ
 except Exception as e:
  print("FETCH ERROR",url,str(e)[:160],flush=True);return b"",""
b,typ=load(FONT)
if b[:4] in (b'\\x00\\x01\\x00\\x00',b'OTTO') or b[:4]==bytes([0,1,0,0]):
 (ROOT/"BeVietnamPro-ExtraBold.ttf").write_bytes(b);print("FONT VERIFIED",len(b))
else:print("FONT NOT VERIFIED",len(b),repr(b[:8]))
SHOTS=[
 ("rain",3139871,"https://www.pexels.com/video/a-glass-window-with-water-droplets-3139871/"),
 ("tea",8549583,"https://www.pexels.com/video/hot-tea-and-reading-glasses-while-raining-8549583/"),
 ("leaves",8534971,"https://www.pexels.com/video/tree-leaves-shading-the-rays-of-the-sun-8534971/"),
 ("forest",27100094,"https://www.pexels.com/video/a-forest-with-trees-and-sunlight-shining-through-27100094/"),
 ("meadow",27100096,"https://www.pexels.com/video/a-sunrise-over-a-field-with-grass-and-trees-27100096/"),
 ("sunflare",4376502,"https://www.pexels.com/video/sun-flare-through-the-tree-leaves-4376502/"),
 ("rays",2882618,"https://www.pexels.com/video/rays-of-sun-in-a-forest-2882618/"),
 ("cup",11350957,"https://www.pexels.com/video/hot-tea-in-cup-11350957/"),
 ("sunrise",34446404,"https://www.pexels.com/video/serene-sunrise-over-swaying-meadow-grass-34446404/"),
]
manifest=[]
for name,id,url in SHOTS:
 html,typ=load(url)
 text=html.decode("utf8","ignore")
 text=text.replace("\\/","/").replace("&amp;","&")
 urls=re.findall(r'https?://[^"\\\\\s<>]+?\\.mp4(?:\\?[^"\\\\\s<>]*)?',text)
 urls=[u for u in urls if "pexels.com" in u]
 patterns=["hd_1920_1080_25fps","hd_1080_1920_25fps","hd_1080_1920_30fps","hd_1920_1080_30fps","hd_1080_1920_24fps","hd_1920_1080_24fps","hd_1920_1080_60fps","hd_1920_1080_50fps","hd_1920_1080_29fps","hd_1920_1080_29.97fps","sd_960_540_25fps","sd_540_960_25fps"]
 urls.extend(f"https://videos.pexels.com/video-files/{id}/{id}-{p}.mp4" for p in patterns)
 print("CANDIDATES",name,len(urls),"html",len(html),flush=True)
 success=None
 for candidate in dict.fromkeys(urls):
  try:
   request=urllib.request.Request(candidate,headers=UA,method="HEAD")
   with urllib.request.urlopen(request,timeout=10) as res:
    length=int(res.headers.get("content-length","0"));typ=res.headers.get("content-type","")
   if length>30000000 or not any(x in typ for x in ("video/","octet-stream")):continue
   data,_=load(candidate)
   if len(data)>100000 and data[4:8]==b"ftyp":
    path=ROOT/(name+".mp4");path.write_bytes(data);success={"name":name,"id":id,"source":url,"download_url":candidate,"bytes":len(data)}
    print("DOWNLOADED",name,len(data),candidate,flush=True);break
  except Exception as e:
   pass
 if success:manifest.append(success)
(ROOT/"asset-manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
print("TOTAL_CLIPS",len(manifest),"FONT", (ROOT/"BeVietnamPro-ExtraBold.ttf").exists(),flush=True)
if not (ROOT/"BeVietnamPro-ExtraBold.ttf").exists():sys.exit("Required official font unavailable")
if len(manifest)<2:sys.exit("Fewer than 2 licensed real-motion clips; reject final asset batch")
