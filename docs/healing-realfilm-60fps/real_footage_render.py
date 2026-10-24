#!/usr/bin/env python3
"""REAL-LIFE CINEMATIC HEALING V3: 92s horizontal, 60fps output, 18 Pexels scenes.
The final audio stream is copied exactly from the previously verified Vbee master.
Some footage is 25–50fps: 60fps output does NOT make its original motion native 60fps.
Do NOT claim a single consistent actress across independently licensed stock clips.
"""
import json, math, os, hashlib, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE=Path(__file__).resolve().parent
PROJECT=json.loads((BASE/"scene_manifest.json").read_text(encoding="utf-8"))
WORK=Path("/tmp/real_healing_60fps")
WORK.mkdir(parents=True,exist_ok=True)
FPS=60; WIDTH=1280; HEIGHT=720; OVERLAP=.36
OUTPUT=BASE/"realfilm_v3_92s_60fps_VbeeThanhLong.mp4"
ASSETS=PROJECT["stock"]
SCENES=PROJECT["scenes"]
FONT_BOLD="/usr/local/share/fonts/bevietnam/BeVietnamPro-Bold.ttf"
FONT_REG="/usr/local/share/fonts/bevietnam/BeVietnamPro-Regular.ttf"

def call(args):
    subprocess.run(args,check=True)

def probe(p):
    return json.loads(subprocess.check_output(
        ["ffprobe","-v","error","-show_entries",
         "format=duration,size:stream=codec_type,avg_frame_rate,width,height,codec_name",
         "-of","json",str(p)],text=True))

def get_source(k,meta):
    p=WORK/f"pexels_{meta['pexelsId']}.mp4"
    if not p.exists() or p.stat().st_size<200_000:
        call(["curl","-fL","--retry","5","--retry-all-errors","--connect-timeout","25",
              "--max-time","240","-A","Mozilla/5.0",
              "-o",str(p),f"https://www.pexels.com/download/video/{meta['pexelsId']}/"])
    if p.stat().st_size<200_000:
        raise RuntimeError("Not valid camera footage: "+k)
    d=probe(p)
    v=next((x for x in d["streams"] if x["codec_type"]=="video"),None)
    if v is None:raise RuntimeError("No camera video stream "+k)
    return p, float(d["format"]["duration"]),v["avg_frame_rate"],(v["width"],v["height"])

def headline_overlay(s,i):
    if not Path(FONT_BOLD).exists():raise FileNotFoundError("True Be Vietnam Pro Bold font missing")
    im=Image.new("RGBA",(WIDTH,HEIGHT),(0,0,0,0))
    # only cinematic shadow at bottom, no baked text from AI and no face obscuring
    dr=ImageDraw.Draw(im,"RGBA")
    for row in range(HEIGHT-220,HEIGHT):
        alpha=int(max(0,min(185,(row-(HEIGHT-220))/220*185)))
        dr.line((0,row,WIDTH,row),fill=(5,9,14,alpha),width=1)
    chapter={1:"01  /  ÁP LỰC",8:"02  /  TỔN THƯƠNG",14:"03  /  NHẬN RA",16:"04  /  CHỮA LÀNH"}
    if s["shot"] in chapter:
        dr.rounded_rectangle((55,56,378,106),radius=11,fill=(9,13,21,185))
        dr.text((76,70),chapter[s["shot"]],font=ImageFont.truetype(FONT_REG,19),fill=(242,229,213,248))
    text=s["headline"]
    f=ImageFont.truetype(FONT_BOLD,46 if len(text)<27 else 37)
    box=dr.textbbox((0,0),text,font=f)
    if box[2]>WIDTH-130:
        f=ImageFont.truetype(FONT_BOLD,33)
        box=dr.textbbox((0,0),text,font=f)
    left=int((WIDTH-box[2])/2);top=HEIGHT-155
    color=(240,187,128,255) if s["grade"]!="warm" else (254,238,215,255)
    dr.text((left,top),text,font=f,fill=color,
           stroke_width=2,stroke_fill=(5,9,14,215))
    dr.line((78,HEIGHT-72,WIDTH-78,HEIGHT-72),fill=(246,236,215,78),width=2)
    dr.line((78,HEIGHT-72,78+int((WIDTH-156)*(i+1)/18),HEIGHT-72),
           fill=(233,173,112,225),width=4)
    p=WORK/f"overlay_{s['shot']:02d}.png";im.save(p);return p

def make_scene(s,i,source,source_duration):
    span=float(s["end"]-s["start"])
    video_len=span+(OVERLAP if i<len(SCENES)-1 else 0)
    start=min(float(s["offset"]),max(0,source_duration-video_len-.15))
    overlay=headline_overlay(s,i)
    color={"cold":("1.075","-0.015","0.79"),
           "neutral":("1.050","-0.003","0.91"),
           "warm":("1.045","0.006","1.07")}[s["grade"]]
    eq=f"eq=contrast={color[0]}:brightness={color[1]}:saturation={color[2]}"
    fade_out=max(0.1,video_len-.25)
    graph=(
      "[0:v]fps=60,scale=1280:720:force_original_aspect_ratio=increase,"
      f"crop=1280:720,{eq},setsar=1,format=yuv420p[film];"
      "[1:v]format=rgba,fade=t=in:st=0:d=0.45:alpha=1,"
      f"fade=t=out:st={fade_out:.3f}:d=0.23:alpha=1[title];"
      "[film][title]overlay=0:0:shortest=1,format=yuv420p[vo]"
    )
    out=WORK/f"shot_{s['shot']:02d}.mp4"
    call(["ffmpeg","-y","-hide_banner","-loglevel","error",
          "-stream_loop","-1","-ss",f"{start:.3f}","-i",str(source),
          "-loop","1","-framerate","60","-i",str(overlay),
          "-filter_complex",graph,"-map","[vo]","-an",
          "-t",f"{video_len:.3f}","-r","60",
          "-c:v","libx264","-preset","ultrafast","-crf","25",
          "-pix_fmt","yuv420p",str(out)])
    o=probe(out)
    stream=next(x for x in o["streams"] if x["codec_type"]=="video")
    if stream["avg_frame_rate"]!="60/1":
        raise RuntimeError("Normalization to 60fps failed for shot "+str(s["shot"]))
    print("SCENE_OK",s["shot"],s["src"],"offset",start,"length",video_len,flush=True)
    return out,video_len

def picture(parts):
    command=["ffmpeg","-y","-hide_banner","-loglevel","error"]
    for clip,_ in parts:command+=["-i",str(clip)]
    edges=[];prev="[0:v]";pos=parts[0][1]-OVERLAP
    for i in range(1,len(parts)):
        dest=f"[xf{i}]"
        edges.append(f"{prev}[{i}:v]xfade=transition=fade:duration={OVERLAP}:offset={pos:.4f}{dest}")
        prev=dest
        if i<len(parts)-1:pos+=parts[i][1]-OVERLAP
    edges.append(f"{prev}scale=1920:1080:flags=bicubic,setsar=1,format=yuv420p[final]")
    target=WORK/"picture_60fps_1080p.mp4"
    call(command+["-filter_complex",";".join(edges),"-map","[final]",
          "-t","92","-r","60","-an","-c:v","libx264",
          "-preset","ultrafast","-crf","22","-maxrate","8M","-bufsize","16M",
          "-pix_fmt","yuv420p","-movflags","+faststart",str(target)])
    return target

def finish(picture_path,source_report):
    vbee=WORK/"vbee_previous_92s.mp4"
    if not vbee.exists() or vbee.stat().st_size<1_000_000:
        raise RuntimeError("User's genuine previously verified Vbee source MP4 missing")
    voice_meta=probe(vbee)
    if not any(x["codec_type"]=="audio" for x in voice_meta["streams"]):
        raise RuntimeError("Refusing final without original Vbee audio")
    if abs(float(voice_meta["format"]["duration"])-92)>0.35:
        raise RuntimeError("Unexpected Vbee source duration")
    OUTPUT.parent.mkdir(exist_ok=True,parents=True)
    # Preserve actual earlier Vbee + piano AAC data; no synthetic replacement.
    call(["ffmpeg","-hide_banner","-loglevel","error","-y",
          "-i",str(picture_path),"-i",str(vbee),
          "-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","copy",
          "-t","92","-movflags","+faststart",str(OUTPUT)])
    q=probe(OUTPUT)
    if abs(float(q["format"]["duration"])-92)>.15:raise RuntimeError("Final video length not 92s")
    if {x["codec_type"] for x in q["streams"]}!={"video","audio"}:raise RuntimeError("No AV track")
    stream=next(x for x in q["streams"] if x["codec_type"]=="video")
    assert stream["width"]==1920 and stream["height"]==1080 and stream["avg_frame_rate"]=="60/1"
    sha=hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
    report={
      "status":"RENDERED_REAL_CAMERA_FOOTAGE_60FPS_OUTPUT_PENDING_HUMAN_REVIEW",
      "project":PROJECT["title"],"videoFile":OUTPUT.name,
      "seconds":float(q["format"]["duration"]),"width":1920,"height":1080,"outputFPS":60,
      "sceneCount":18,"bytes":OUTPUT.stat().st_size,"sha256":sha,
      "audio":"Unmodified AAC stream from user's 92s Vbee Thanh Long + piano preview on Google Drive",
      "stock":"Genuine Pexels filmed live-action footage; actors are intentionally distinct illustrative B-roll",
      "native60fpsForEveryShot":False,"fpsConvertedShots":[x for x in source_report if float(x["fpsNum"])<59],
      "trueBeVietnamPro":True,
      "honestLimitations":["Footage from independent stock actors, not a single actress",
        "Sources below 60fps use frame-rate conforming; source motion is not native 60fps",
        "Internal edit at 1280x720, final MP4 upscale 1920x1080",
        "Manual visual-and-audio QA still needed before release"],
      "sourceInventory":source_report,
      "youtubePublished":False
    }
    (BASE/"QA-realfilm-60fps.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("FINAL_RENDER_READY_FOR_REVIEW",json.dumps(
      {"file":OUTPUT.name,"bytes":OUTPUT.stat().st_size,"sha256":sha,
       "seconds":report["seconds"],"fps":60},ensure_ascii=False),flush=True)

def screenshot_contact():
    sheet=Image.new("RGB",(4*320,5*198),(9,14,19))
    for i in range(18):
        p=WORK/f"shot_{i+1:02d}.mp4"
        thumb=WORK/f"shot_{i+1:02d}_still.jpg"
        call(["ffmpeg","-hide_banner","-loglevel","error","-y",
              "-ss","1.0","-i",str(p),"-frames:v","1",str(thumb)])
        im=Image.open(thumb).convert("RGB").resize((320,180),Image.Resampling.LANCZOS)
        sheet.paste(im,(i%4*320,i//4*198))
    out=BASE/"realfilm_60fps_contact_sheet.jpg"
    sheet.save(out,quality=89)
    print("CONTACT_SHEET",str(out),flush=True)

if __name__=="__main__":
    if len(SCENES)!=18 or SCENES[-1]["end"]!=92:raise ValueError("Timeline invalid")
    src={};reports=[]
    for name,meta in ASSETS.items():
        file,duration,fps,dimensions=get_source(name,meta)
        src[name]=(file,duration)
        m=re.match(r"(\d+)(?:/(\d+))?",fps)
        num=int(m.group(1))/(int(m.group(2)) if m.group(2) else 1)
        reports.append({"name":name,"pexelsID":meta["pexelsId"],"page":meta["page"],
                        "credit":meta["credit"],"fpsOriginal":fps,"fpsNum":num,
                        "durationSeconds":duration,"dimensions":dimensions})
        print("SOURCE_OK",name,meta["pexelsId"],fps,flush=True)
    generated=[make_scene(scene,i,*src[scene["src"]]) for i,scene in enumerate(SCENES)]
    screenshot_contact()
    render=picture(generated)
    finish(render,reports)
