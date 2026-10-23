#!/usr/bin/env python3
"""Short 03 full-frame 60fps scene-art renderer and original piano score.

Nine emotional chapters, 18 complementary shots, two fixed character identities.
Only factual render, seam and audio-content metrics are described as QA.
"""
import argparse
import hashlib
import json
import math
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

import art

HERE=Path(__file__).resolve().parent
STORY=json.loads((HERE/"story.json").read_text(encoding="utf8"))
W,H=540,960
FPS=60
DURATION=STORY["durationTargetSeconds"]
TOTAL=round(DURATION*FPS)
CHAPTERS=STORY["chapters"]
SHOTS=STORY["shots"]
assert len(SHOTS)==18 and len(CHAPTERS)==9
TRANSITION_HALF=20

def ease(t):
    t=max(0.,min(1.,t))
    return t*t*(3.-2*t)

def allocation():
    # Shot weight is half its chapter length. Largest remainder prevents drift.
    w=np.array([s["weight"] for s in SHOTS],dtype=np.float64)
    exact=w/w.sum()*TOTAL
    frames=np.floor(exact).astype(int)
    remainder=TOTAL-int(frames.sum())
    for i in np.argsort(-(exact-frames))[:remainder]:
        frames[i]+=1
    assert len(frames)==18 and frames.sum()==TOTAL and min(frames)>2*TRANSITION_HALF+9
    return frames

ALLOC=allocation()
OFFSETS=np.concatenate(([0],np.cumsum(ALLOC)))

def locate(n):
    return min(17,int(np.searchsorted(OFFSETS[1:],n,side="right")))

def mixing_pair(n):
    i=locate(n)
    if i>0 and n<OFFSETS[i]+TRANSITION_HALF:
        pivot=i;left=i-1;right=i
    elif i<17 and n>=OFFSETS[i+1]-TRANSITION_HALF:
        pivot=i+1;left=i;right=i+1
    else:
        return i,i,0.
    alpha=ease((n-(int(OFFSETS[pivot])-TRANSITION_HALF))/(2*TRANSITION_HALF))
    return left,right,alpha

def lettering(d,chapter,elapsed):
    # Global information hierarchy has no per-shot reset.
    art.txt(d,34,69,"NHỮNG BỨC ẢNH THIẾU MẸ",15,art.GRAY,True)
    art.txt(d,34,99,f"0{chapter+1} / KÝ ỨC",12,art.AMBER,True)
    art.line(d,[(34,131),(506,131)],art.SLATE,2)
    title=CHAPTERS[chapter]["title"]
    size=28 if len(title)>19 else 33
    ft=art.f(size,True)
    words=title.split()
    rows=[];s=""
    for word in words:
        trial=(s+" "+word).strip()
        if d.textbbox((0,0),trial,font=ft)[2]>466 and s:
            rows.append(s);s=word
        else:
            s=trial
    if s:rows.append(s)
    if len(rows)>2:
        size=25
        rows=[title[:28],title[28:]]
        ft=art.f(size,True)
    for i,text in enumerate(rows[:2]):
        b=d.textbbox((0,0),text,font=ft)
        xx=(W-(b[2]-b[0]))/2
        art.txt(d,xx,162+i*(size+12),text,size,art.AMBER if chapter in (5,8) else art.WHITE,True)
    sub=CHAPTERS[chapter]["sub"]
    subfont=art.f(15,True)
    width=d.textbbox((0,0),sub,font=subfont)[2]
    d.text(((W-width)/2,776),sub,font=subfont,fill=art.AMBER if chapter in (5,8) else art.WHITE)
    art.line(d,[(34,821),(506,821)],art.SLATE,2)
    art.line(d,[(34,821),(34+472*elapsed/DURATION,821)],art.AMBER,3)
    art.txt(d,34,839,f"BỨC ẢNH {chapter+1:02d} / 09",12,art.GRAY,True)
    if chapter==8:
        art.txt(d,60,879,"ĐỪNG ĐỂ MẸ ĐỨNG NGOÀI KÝ ỨC.",13,art.AMBER,True)

def still(index,n):
    image=Image.new("RGB",(W,H),art.BLACK)
    d=ImageDraw.Draw(image)
    seconds=n/FPS
    art.scene(d,index,seconds)
    lettering(d,index//2,seconds)
    return image

def camera(im,t):
    # One global subpixel path; no geometry restart between shots.
    scale=1.019+.006*math.sin(t*.24)
    ox=W*(1-1/scale)/2+1.9*math.sin(t*.32)
    oy=H*(1-1/scale)/2+2.2*math.cos(t*.28)
    return im.transform((W,H),Image.Transform.AFFINE,
        (1/scale,0,ox,0,1/scale,oy),resample=Image.Resampling.BICUBIC)

def frame(n):
    a,b,blend=mixing_pair(n)
    if a==b:
        im=still(a,n)
    else:
        im=Image.blend(still(a,n),still(b,n),blend)
    return camera(im,n/FPS)

def contact_sheet(path):
    tile_w,tile_h=192,341
    sheet=Image.new("RGB",(tile_w*6,tile_h*3),art.BLACK)
    for idx in range(18):
        n=int(OFFSETS[idx]+ALLOC[idx]/2)
        sheet.paste(frame(n).resize((tile_w,tile_h),Image.Resampling.LANCZOS),
                    (idx%6*tile_w,idx//6*tile_h))
    path.parent.mkdir(parents=True,exist_ok=True)
    sheet.save(path,quality=92)

def seams(path):
    boundaries=[]
    for idx,b in enumerate(OFFSETS[1:-1],start=1):
        peaks=[]
        for n in range(int(b)-3,int(b)+3):
            first=np.asarray(frame(n).resize((135,240),Image.Resampling.BILINEAR),dtype=np.int16)
            second=np.asarray(frame(n+1).resize((135,240),Image.Resampling.BILINEAR),dtype=np.int16)
            peaks.append(float(np.mean(np.abs(first-second))))
        boundaries.append({"sceneBoundary":idx,"timeSeconds":round(b/FPS,3),
                           "maxAdjacentFrameMeanAbsDelta":round(max(peaks),3)})
    worst=max(x["maxAdjacentFrameMeanAbsDelta"] for x in boundaries)
    # Objective per-frame continuity test, NOT a subjective acting evaluation.
    if worst>18:
        raise RuntimeError(f"Scene boundary jump is too high: {worst:.3f}")
    report={"fps":FPS,"frames":TOTAL,"duration":DURATION,"shots":18,"chapters":9,
            "testedSceneBoundaries":17,"transitionFrames":2*TRANSITION_HALF,
            "maximumBoundaryMeanAbsDelta":worst,"subpixelGlobalCamera":True,
            "characterIdentityLock":["Linh","Mom"],"boundaries":boundaries}
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in report.items() if k!="boundaries"},indent=2,ensure_ascii=False))

def render(out,sheet=None):
    out.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error",
         "-f","rawvideo","-pix_fmt","rgb24","-s","540x960","-r",str(FPS),"-i","-",
         "-vf","scale=1080:1920:flags=lanczos",
         "-c:v","libx264","-preset","fast","-crf","19",
         "-pix_fmt","yuv420p","-profile:v","high","-level","4.2",
         "-g","120","-movflags","+faststart",str(out)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        for n in range(TOTAL):
            proc.stdin.write(frame(n).tobytes())
    finally:
        proc.stdin.close()
    if proc.wait():raise RuntimeError("FFmpeg failed encoding RGB cinematic story frames")
    if sheet:contact_sheet(sheet)
    print(f"Rendered {TOTAL} native frames, {FPS}fps, {DURATION:.3f}s")

def original_piano(path):
    """Deterministic three-part original harmonized piano with natural tails."""
    sr=48000
    num=round(DURATION*sr)
    mix=np.zeros(num,dtype=np.float64)
    bars=[(0,[220.00,261.63,329.63]),(5.3,[196,246.94,293.66]),
          (10.5,[174.61,220,261.63]),(15.7,[164.81,196,246.94]),
          (20.2,[146.83,174.61,220]),(25.6,[164.81,207.65,261.63]),
          (30.9,[174.61,220,261.63]),(36.2,[196,246.94,329.63]),
          (40.2,[220,277.18,329.63])]
    for i,(bar,freqs) in enumerate(bars):
        beat_length=(bars[i+1][0]-bar) if i<len(bars)-1 else DURATION-bar
        if beat_length<=0:continue
        for k,pitch in enumerate(freqs):
            at=bar+min(k*.42,beat_length*.46)
            length=min(3.5,DURATION-at)
            if length<=.05:continue
            n=round(length*sr);start=round(at*sr)
            tt=np.arange(n,dtype=np.float64)/sr
            # light hammer attack, harmonic partials and exponential decay.
            env=np.minimum(1.,tt/.03)*np.exp(-tt*(.55 if i>=7 else .85))
            sound=(np.sin(2*np.pi*pitch*tt)+.21*np.sin(2*np.pi*pitch*2*tt)+
                   .08*np.sin(2*np.pi*pitch*3*tt))*env
            mix[start:min(num,start+n)]+=.15*sound[:min(num-start,n)]*(.83 if k else 1)
    fade=np.minimum(1,np.arange(num)/max(1,sr*.7))
    ending=np.minimum(1,np.arange(num)[::-1]/max(1,sr*1.0))
    audio=np.clip(mix*np.minimum(fade,ending),-.93,.93)
    path.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(path),"wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes((audio*32767).astype(np.int16).tobytes())
    print(f"Original emotional piano: {path} ({DURATION:.2f}s)")

def main():
    p=argparse.ArgumentParser()
    p.add_argument("mode",choices=("render","sheet","seams","score"))
    p.add_argument("--out",type=Path,required=True)
    p.add_argument("--sheet",type=Path)
    a=p.parse_args()
    if a.mode=="render":render(a.out,a.sheet)
    elif a.mode=="sheet":contact_sheet(a.out)
    elif a.mode=="seams":seams(a.out)
    else:original_piano(a.out)

if __name__=="__main__":
    main()
