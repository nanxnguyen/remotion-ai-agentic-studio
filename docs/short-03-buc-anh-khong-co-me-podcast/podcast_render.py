#!/usr/bin/env python3
"""An original 60fps visual podcast: persistent host + animated family memories.

The story is deliberately voice-led. Every memory scene has its own location,
props and acting, while the host, desk and microphone remain continuous.
"""
import argparse
import json
import math
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent
STORY=json.loads((ROOT/"story.json").read_text(encoding="utf-8"))
SHOTS=STORY["shots"]
assert len(SHOTS)==16
W,H,FPS,FRAMES=540,960,60,2425
INK=(8,9,11);WHITE=(245,245,244);GRAY=(133,135,138)
AMBER=(239,158,105);DARK=(20,23,29);LINE=(66,69,76)
STEPS=[0,2.6,5.15,7.75,10.5,13.25,16,18.7,21.4,24.3,27.1,29.45,31.8,34.25,36.7,38.55,FRAMES/FPS]
CUTS=np.array([round(t*FPS) for t in STEPS],dtype=int)
assert len(CUTS)==17 and CUTS[-1]==FRAMES

def eased(x):
    x=max(0.,min(1.,x)); return x*x*(3-2*x)
def mix(a,b,p):
    p=max(0.,min(1.,p))
    return tuple(round(x*(1-p)+y*p) for x,y in zip(a,b))
def font(n,bold=False):
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-"+("Bold" if bold else "")+".ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",n)
def line(d,coords,color=WHITE,w=3):
    d.line([(int(x),int(y)) for x,y in coords],fill=color,width=w,joint="curve")
def box(d,rect,color=LINE,fill=None,r=12,w=2):
    d.rounded_rectangle(tuple(map(int,rect)),radius=r,outline=color,fill=fill,width=w)
def circ(d,x,y,r,col=WHITE,fill=None,w=3):
    d.ellipse((int(x-r),int(y-r),int(x+r),int(y+r)),outline=col,fill=fill,width=w)
def txt(d,xy,s,n=17,col=WHITE,bold=False):
    d.text(xy,s,font=font(n,bold),fill=col)
def draw_character(d,x,y,mother=False,small=1.0,smile=.5,t=0,pose="idle"):
    # Same female line-art rig in every memory: mother has low bun and amber scarf.
    c=GRAY if mother else WHITE
    bob=math.sin(t*1.55+x*.01)*1.5
    y+=bob
    radius=21*small
    circ(d,x,y-83*small,radius,c,INK if mother else (24,25,31),max(2,int(3*small)))
    bx=x+19*small if mother else x-18*small
    by=y-102*small
    circ(d,bx,by,9*small,c,(22,25,32),2)
    if mother:
        line(d,[(bx-5*small,by-9*small),(bx+2*small,by-11*small)],AMBER,3)
    eye=(x+9*small,y-85*small)
    circ(d,*eye,1.6*small,c,c,1)
    if smile>.3:
        d.arc((x-9*small,y-83*small,x+12*small,y-64*small),10,155,fill=c,width=2)
    else:
        line(d,[(x-8*small,y-64*small),(x+8*small,y-64*small)],c,2)
    line(d,[(x,y-61*small),(x,y+20*small)],c,3)
    if pose=="camera":
        line(d,[(x,y-34*small),(x+17*small,y-32*small),(x+25*small,y-58*small)],c,3)
        line(d,[(x,y-34*small),(x-18*small,y-31*small),(x-5*small,y-58*small)],c,3)
        box(d,(x-10*small,y-75*small,x+33*small,y-50*small),AMBER,(25,28,35),3,2)
        circ(d,x+13*small,y-62*small,6*small,WHITE,None,2)
    elif pose=="reach":
        line(d,[(x,y-32*small),(x+31*small,y-21*small),(x+45*small,y-33*small)],c,3)
        line(d,[(x,y-32*small),(x-30*small,y+7*small)],c,3)
    else:
        line(d,[(x,y-32*small),(x+28*small,y-5*small)],c,3)
        line(d,[(x,y-32*small),(x-24*small,y-5*small)],c,3)
    line(d,[(x,y+20*small),(x-18*small,y+64*small)],c,3)
    line(d,[(x,y+20*small),(x+20*small,y+64*small)],c,3)

def memory_back(d,kind,t):
    box(d,(31,240,509,702),AMBER if kind in ("REFLECTION","FAMILY_PHOTO") else LINE,(14,17,23),18,3)
    # subdued paper/photo inset and continuous, visible depth
    box(d,(49,260,489,667),LINE,(17,20,28),11,2)
    if kind=="STUDIO_HOOK":
        for i in range(3):
            xx=100+i*105; yy=320+i*28
            box(d,(xx,yy,xx+128,yy+182),GRAY,(24,27,35),6,3)
            draw_character(d,xx+65,yy+126,small=.54,mother=False,t=t)
        circ(d,410,554,30,AMBER,None,3)
    elif kind=="ALBUM":
        for i in range(12):
            xx=68+(i%3)*139; yy=292+(i//3)*85
            box(d,(xx,yy,xx+115,yy+71),LINE,(31,34,42),4,2)
            circ(d,xx+39,yy+25,12,WHITE,None,2)
            circ(d,xx+70,yy+25,12,WHITE,None,2)
            line(d,[(xx+22,yy+55),(xx+87,yy+55)],WHITE,2)
        txt(d,(83,622),"100+ KHOẢNH KHẮC",16,AMBER,True)
    elif kind in ("BIRTHDAY","SHUTTER"):
        box(d,(70,297,465,641),LINE,(28,27,30),6,2)
        draw_character(d,197,473,small=.85,t=t,smile=1)
        circ(d,205,559,28,AMBER,None,2)
        box(d,(170,545,246,568),WHITE,(50,40,35),6,2)
        line(d,[(210,542),(210,518)],AMBER,3)
        draw_character(d,387,474,mother=True,small=.70,pose="camera",t=t,smile=1)
        if kind=="SHUTTER":
            circ(d,393,352,24,AMBER,None,2)
            txt(d,(346,384),"TÁCH!",18,AMBER,True)
    elif kind in ("GRADUATION","PROUD","ZOOM_GLASS","REFLECTION"):
        # Graduation photo and key reflective window reveal.
        box(d,(73,286,466,638),GRAY,(24,29,35),5,3)
        box(d,(296,309,445,477),LINE,(18,27,33),5,3)
        line(d,[(371,309),(371,476)],LINE,2)
        draw_character(d,195,476,small=1.0,t=t,smile=.9)
        d.polygon([(156,389),(192,369),(231,390),(196,408)],fill=WHITE)
        line(d,[(225,388),(238,431)],AMBER,3)
        if kind in ("PROUD","REFLECTION","ZOOM_GLASS"):
            draw_character(d,378,424,mother=True,small=.52,t=t,pose="camera")
        else:
            draw_character(d,412,484,mother=True,small=.69,t=t,pose="camera")
        if kind in ("ZOOM_GLASS","REFLECTION"):
            # Animated spotlight locks onto the glass, then the tiny mother.
            p=eased((t-21.5)/6.0)
            rr=62-(28*p)
            circ(d,380,416,rr,AMBER,None,4)
            txt(d,(294,559),"MẸ Ở ĐÓ...",18,AMBER,True)
    elif kind in ("DINNER","CAMERA"):
        box(d,(75,298,463,635),LINE,(27,27,33),8)
        line(d,[(100,550),(439,550)],WHITE,3)
        for px in [160,268,368]:
            draw_character(d,px,442,small=.7,smile=.8,t=t)
        box(d,(220,535,302,556),AMBER,(54,47,37),5,2)
        draw_character(d,417,527,mother=True,small=.55,pose="camera",t=t)
    elif kind in ("PHOTO_WALL","EMPTY"):
        for i in range(6):
            xx=79+(i%3)*134; yy=291+(i//3)*166
            box(d,(xx,yy,xx+102,yy+132),GRAY,(30,33,39),4)
            for k in range(2):
                draw_character(d,xx+32+k*37,yy+84,small=.36,t=t)
        if kind=="EMPTY":
            box(d,(186,438,359,626),AMBER,(14,17,23),9,4)
            txt(d,(214,514),"...",44,AMBER,True)
    elif kind in ("KITCHEN","HAND"):
        # The same mother from photos, now doing dishes in a real kitchen.
        box(d,(69,291,465,633),LINE,(24,28,31),5)
        line(d,[(284,526),(458,526)],WHITE,3)
        box(d,(335,486,448,521),GRAY,(28,35,42),3)
        draw_character(d,382,455,mother=True,small=.78,smile=.45,t=t)
        if kind=="HAND":
            draw_character(d,194+10*eased((t-31.8)/4.2),470,small=.82,pose="reach",smile=.7,t=t)
            circ(d,310,491,12,AMBER,None,2)
        else:
            draw_character(d,165,498,small=.62,smile=-.3,t=t)
    elif kind in ("CENTER","FAMILY_PHOTO"):
        box(d,(69,286,468,639),AMBER,(29,30,34),7,4)
        for x in [162,273,382]:
            draw_character(d,x,462,mother=(x==273),small=.92,t=t,smile=1,pose="reach")
        if kind=="CENTER":
            box(d,(89,567,135,604),WHITE,(26,29,36),6)
            circ(d,112,586,11,AMBER,None,2)
            txt(d,(315,618),"3... 2... 1...",12,GRAY)
        else:
            txt(d,(120,615),"CẢ NHÀ ĐỦ ĐẦY",19,AMBER,True)
    else:
        raise ValueError(kind)

def studio_overlay(d,seconds,progress):
    # One consistent podcast narrator / microphone, so visual identity persists.
    line(d,[(0,746),(540,746)],LINE,3)
    box(d,(24,760,516,922),LINE,(18,20,25),18,2)
    draw_character(d,170,811,small=.8,t=seconds,smile=.2)
    line(d,[(380,824),(385,873),(416,879)],WHITE,4)
    box(d,(346,786,408,839),GRAY,(25,27,32),22,3)
    for x in range(358,398,9):
        line(d,[(x,804),(x,826)],LINE,2)
    # Geometric motion waveform, no claim of phoneme-level mouth synchronization.
    for i in range(14):
        amp=4+10*(.5+.5*math.sin(seconds*2.9+i*.65))
        x=272+i*6
        line(d,[(x,884-amp),(x,884+amp)],AMBER if i%4==0 else GRAY,2)
    txt(d,(35,932),"PODCAST  /  MỘT CHUYỆN NHỎ VỀ MẸ",11,GRAY)

def add_typography(d,index,seconds):
    text=SHOTS[index]["headline"]
    # Captions are concise narrative beats rather than transcript pretending timed words.
    txt(d,(36,61),"MỘT BỨC ẢNH  /  MỘT NGƯỜI MẸ",14,GRAY)
    line(d,[(35,98),(505,98)],LINE,2)
    pt=30 if len(text)<=22 else 25
    font_obj=font(pt,True)
    words=text.split();parts=[];row=""
    for word in words:
        trial=(row+" "+word).strip()
        if d.textbbox((0,0),trial,font=font_obj)[2]>466 and row:
            parts.append(row);row=word
        else:row=trial
    if row:parts.append(row)
    for i,phrase in enumerate(parts[:2]):
        width=d.textbbox((0,0),phrase,font=font_obj)[2]
        d.text(((540-width)/2,135+i*(pt+10)),phrase,font=font_obj,
               fill=AMBER if index in (0,1,10,11,14,15) and i==0 else WHITE)
    progress=max(0,min(1,seconds/(FRAMES/FPS)))
    line(d,[(40,724),(500,724)],LINE,2)
    line(d,[(40,724),(40+460*progress,724)],AMBER,3)
    txt(d,(40,696),f"{index+1:02d} / 16",12,GRAY,True)

def base_scene(index,n):
    t=n/FPS
    im=Image.new("RGB",(W,H),INK)
    d=ImageDraw.Draw(im)
    # Warm edge contour is an identity, not arbitrary decoration.
    for j in range(8):
        col=mix(INK,AMBER,(8-j)*.008)
        line(d,[(25+j*2,230),(25+j*2,670)],col,1)
    memory_back(d,SHOTS[index]["kind"],t)
    studio_overlay(d,t,t/(FRAMES/FPS))
    add_typography(d,index,t)
    return im

def frame(n):
    i=int(np.searchsorted(CUTS[1:],n,side="right"))
    i=min(i,15)
    edge=int(CUTS[i])
    radius=21
    if i>0 and n<edge+radius:
        left=i-1;right=i;alpha=eased((n-(edge-radius))/(2*radius))
    elif i<15 and n>=int(CUTS[i+1])-radius:
        left=i;right=i+1
        alpha=eased((n-(int(CUTS[i+1])-radius))/(2*radius))
    else:
        return base_scene(i,n)
    return Image.blend(base_scene(left,n),base_scene(right,n),alpha)

def render(out):
    out.parent.mkdir(parents=True,exist_ok=True)
    proc=subprocess.Popen(["ffmpeg","-y","-hide_banner","-loglevel","error",
      "-f","rawvideo","-pix_fmt","rgb24","-s","540x960","-r","60","-i","-",
      "-vf","scale=1080:1920:flags=lanczos","-c:v","libx264",
      "-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-movflags","+faststart",str(out)],
      stdin=subprocess.PIPE)
    try:
        for n in range(FRAMES):
            proc.stdin.write(frame(n).tobytes())
    finally:proc.stdin.close()
    if proc.wait():raise RuntimeError("ffmpeg renderer returned nonzero")
    print(f"Video rendered: {FRAMES} frames, 60fps, 16 authored shots")

def sheet(out):
    tilew,tileh=180,320
    im=Image.new("RGB",(tilew*4,tileh*4),INK)
    for i in range(16):
        n=int((CUTS[i]+CUTS[i+1])//2)
        im.paste(frame(n).resize((tilew,tileh),Image.Resampling.LANCZOS),
                 ((i%4)*tilew,(i//4)*tileh))
    out.parent.mkdir(parents=True,exist_ok=True)
    im.save(out,quality=90)

def seams(out):
    check=[]
    for i,cut in enumerate(CUTS[1:-1],1):
        diffs=[]
        for n in range(int(cut)-3,int(cut)+3):
            a=np.asarray(frame(n).resize((135,240)),dtype=np.int16)
            b=np.asarray(frame(n+1).resize((135,240)),dtype=np.int16)
            diffs.append(float(np.abs(a-b).mean()))
        check.append({"boundary":i,"frame":int(cut),"maxAdjacentMAE":round(max(diffs),3)})
    ma=max(x["maxAdjacentMAE"] for x in check)
    if ma>24:raise RuntimeError(f"Hard frame discontinuity: {ma}")
    out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps({"status":"pass","fps":60,"frames":FRAMES,"shots":16,
      "boundaries":15,"maxAdjacentMAE":ma,"measurements":check},indent=2)+"\n")

def piano(out):
    # Original piano motif: wistful memory -> brief minor reveal -> warmer resolve.
    sr=32000;dur=FRAMES/FPS;sound=np.zeros(int(dur*sr),dtype=np.float64)
    def note(key,sec,length,amp):
        k=int(sec*sr);ln=min(int(length*sr),len(sound)-k)
        if ln<=0:return
        t=np.arange(ln)/sr
        f=440*2**((key-69)/12)
        env=(1-np.exp(-t*45))*np.exp(-t*1.65)
        wave=(np.sin(math.tau*f*t)*.80+np.sin(math.tau*2.003*f*t)*.15)
        sound[k:k+ln]+=amp*env*wave
    groups=[(0,[45,48,52]),(5,[43,47,50]),(10,[41,45,48]),
            (15,[43,47,50]),(20,[40,43,47]),(25,[45,48,52]),
            (30,[48,52,55]),(35,[48,52,55])]
    for sec,chord in groups:
        for i in range(7):
            note(chord[[0,1,2,1,0,2,1][i]]+12,sec+i*.63,2.6,.10 if sec>=30 else .075)
        note(chord[0],sec,3.7,.09)
    for start,key in [(3,69),(8,67),(13,64),(18,62),(22,64),(27,69),(32,72),(37,76)]:
        note(key,start,3.0,.06)
    ts=np.arange(len(sound))/sr
    fade=np.interp(ts,[0,.5,10,19,23,29,35,39,40.417],
         [.12,.42,.58,.44,.23,.35,.7,.48,.04])
    data=np.clip(np.tanh(sound*fade*2.5)*.55,-1,1)
    out.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(out),"wb") as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
        w.writeframes((data*32767).astype("<i2").tobytes())

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("command",choices=["render","sheet","seams","piano"])
    p.add_argument("--out",type=Path,required=True)
    a=p.parse_args()
    {"render":render,"sheet":sheet,"seams":seams,"piano":piano}[a.command](a.out)
