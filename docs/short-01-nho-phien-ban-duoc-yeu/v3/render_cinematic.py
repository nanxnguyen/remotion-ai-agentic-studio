#!/usr/bin/env python3
"""Short 01 V3: 28 individually art-directed shots, animated typesetting and original score.

Builds on the original V2 vector figure primitives only; no old footage is stretched.
Every frame is computed deterministically; 1080x1920, 24fps, 970 frames.
"""
import argparse
import importlib.util
import json
import math
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
STORY = json.loads((ROOT / "story.json").read_text(encoding="utf8"))
spec = importlib.util.spec_from_file_location("short01_v2_primitives", ROOT.parent / "v2" / "render_20_scenes.py")
v2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v2)

W, H, FPS, FRAMES = 540, 960, 24, 970
BG = (8, 9, 12)
WHITE = (246, 244, 240)
AMBER = (245, 166, 105)
GRAY = (139, 145, 153)
PALE = (70, 76, 87)
shots = STORY["shots"]
assert len(shots) == 28 and STORY["qa"]["requiredShots"] == 28
BASE = {name: i for i, (_, name, _) in enumerate(v2.STORY)}
def ease(t):
    t = max(0., min(1., t))
    return t*t*(3.-2.*t)
def lerp(a, b, t):
    return a*(1-t)+b*t
def mix(a,b,t):
    return tuple(round(lerp(x,y,t)) for x,y in zip(a,b))
def font(size, bold=False):
    family = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/"+family, size)
def ring(d,x,y,r,c=AMBER,w=3):
    d.ellipse((int(x-r),int(y-r),int(x+r),int(y+r)),outline=c,width=w)
def stroke(d,pts,c=WHITE,w=3):
    d.line([(int(x),int(y)) for x,y in pts], fill=c, width=w, joint="curve")
def glow(d,x,y,r,energy=.8):
    for k in range(9,0,-1):
        tone=mix(BG,AMBER,energy*(10-k)/105)
        ring(d,x,y,r+k*8,tone,2)
def draw_scene_motif(d,s,u,i):
    kind=s["motif"]
    t=u*math.pi*2
    if kind=="reflect":
        stroke(d,[(335,265),(342,625)],mix(PALE,AMBER,.3),2)
        stroke(d,[(350,300),(359,394)],PALE,2)
        ring(d,409,419,27+u*7,mix(BG,AMBER,.2+u*.12),2)
    elif kind=="pulse":
        for j in range(3):
            r=20+(u*42+j*26)%95
            ring(d,390,480,r,mix(BG,AMBER,.32/(j+1)),2)
    elif kind=="thread":
        x=334+18*math.sin(t*.17)
        pts=[(300,490),(328,463),(x,416),(384,385)]
        stroke(d,pts,mix(BG,AMBER,.65),2)
        ring(d,384,385,9+3*math.sin(t),AMBER,2)
    elif kind=="halo" or kind=="warmth":
        glow(d,379,374,33+8*math.sin(t),.7 if kind=="halo" else .95)
        for a in [0,2,4]:
            aa=a*math.pi/3+t*.015
            ring(d,379+math.cos(aa)*74,374+math.sin(aa)*59,2,AMBER,1)
    elif kind=="sun":
        glow(d,431,272,45,.65)
        ring(d,431,272,28,AMBER,3)
        for k in range(10):
            a=k*math.tau/10+u*.05
            stroke(d,[(431+40*math.cos(a),272+40*math.sin(a)),
                      (431+52*math.cos(a),272+52*math.sin(a))],AMBER,2)
    elif kind=="cups":
        for x in (344,408):
            d.rounded_rectangle((x-17,576,x+17,612),radius=5,outline=AMBER if x==344 else PALE,width=2)
            d.arc((x+12,584,x+30,602),290,95,fill=GRAY,width=2)
    elif kind=="fade":
        v2.stick(d,395+22*u,578,u,"memory",.72,True)
        stroke(d,[(380,686),(428,686)],PALE,2)
    elif kind=="clock":
        for k in range(4):
            a=k*math.pi/2+u*.8
            x,y=398+75*math.cos(a),300+75*math.sin(a)
            ring(d,x,y,2,AMBER if k==0 else PALE,2)
    elif kind=="shadow":
        for k in range(8):
            stroke(d,[(212+k*11,701),(220+k*13,735+4*k)],mix(BG,PALE,.47-k*.04),2)
    elif kind=="crack" or kind=="fragment":
        x=387
        points=[(x-13,330),(x+8,371),(x-8,409),(x+16,454),(x-5,504),(x+17,542)]
        if kind=="fragment":
            points=[(x-28,312),(x+12,378),(x-15,454),(x+22,530)]
        stroke(d,points,mix(PALE,AMBER,.5),3)
    elif kind=="rain":
        for k in range(9):
            x=310+k*19
            y=230+(k*53+u*90)%400
            stroke(d,[(x,y),(x-6,y+20)],mix(BG,GRAY,.6),2)
    elif kind=="heartbeat":
        glow(d,392,405,26+5*math.sin(t*2),.9)
        stroke(d,[(317,644),(353,644),(364,630),(376,661),
                  (391,619),(406,644),(472,644)],mix(PALE,AMBER,.7),3)
    elif kind=="message":
        d.rounded_rectangle((329,339,465,379),radius=8,outline=PALE,width=2)
        ring(d,349,359,4,AMBER,2)
        stroke(d,[(364,357),(431,357)],GRAY,2)
    elif kind=="bloom":
        x=399; y=367
        for k in range(9):
            a=k*math.tau/9+u*.10
            px=x+52*math.cos(a);py=y+52*math.sin(a)
            ring(d,px,py,7+1.5*math.sin(t+k),mix(PALE,AMBER,.6),2)
    elif kind=="steam":
        for j in range(3):
            x=365+j*17
            pts=[(x,500),(x+5*math.sin(t+j),480),(x+5*math.cos(t+j),457)]
            stroke(d,pts,GRAY,2)
    elif kind=="steps":
        for k in range(7):
            x=295+k*29;y=730-k*18
            a=ease((u*7-k)/2)
            if a>0: d.ellipse((x,y,x+9,y+15),fill=mix(BG,AMBER,.26+.32*a))
    # softly linked grain-free particles for depth; 100% deterministic
    if s["mood"] in ("memory","hope","healing"):
        for j in range(7):
            x=55+(i*71+j*67)%433
            y=295+(j*109+i*33+int(u*13))%335
            ring(d,x,y,1, mix(BG,AMBER,.32),1)

def fit_lines(d,text,limit,pt):
    words=text.split()
    out=[];current=""
    for word in words:
        trial=(current+" "+word).strip()
        bbox=d.textbbox((0,0),trial,font=font(pt,True))
        if bbox[2]-bbox[0]>limit and current:
            out.append(current); current=word
        else:current=trial
    if current:out.append(current)
    return out

def draw_centered_phrase(d,text,x,y,pt,u,emph=False):
    f=font(pt,True)
    words=text.split()
    widths=[d.textbbox((0,0),word,font=f)[2] for word in words]
    gap=d.textbbox((0,0)," ",font=f)[2]
    total=sum(widths)+max(0,len(words)-1)*gap
    left=x-total/2
    progress=max(0.,min(1.,u*2.8+.1))
    for j,(word,width) in enumerate(zip(words,widths)):
        term=word.strip(".,?!")
        selected=term in ("MÌNH","HỌ","QUÊN","SÁNG","RẠNG","NHẤT","KHÔNG","ĐAU")
        color=AMBER if selected or emph and j==len(words)-1 else WHITE
        alpha=ease((progress*len(words)-j)*1.2)
        d.text((left,y),word,font=f,fill=mix(BG,color,alpha))
        left+=width+gap

def artwork(s,i,u):
    im=Image.new("RGB",(W,H),BG)
    d=ImageDraw.Draw(im)
    base=BASE[s["baseProp"]]
    # Scene-aware shot angle: some shots use tight details, others show a full figure.
    v2.environment(d,base,ease(u),1)
    draw_scene_motif(d,s,u,i)
    # Cinematic chapter line, intentional safe areas, and accessible readable text
    chapter=("01 / CÒN NHỚ" if i<8 else
             "02 / VẮNG MẶT" if i<16 else
             "03 / NHẬN RA" if i<22 else "04 / TRỞ VỀ")
    d.text((35,63),"NHỚ HỌ, HAY NHỚ MÌNH?",font=font(15,True),fill=GRAY)
    d.text((35,92),chapter,font=font(12),fill=AMBER)
    stroke(d,[(35,128),(505,128)],PALE,2)
    title=s["headline"]
    max_size=36 if len(title)<19 else 30
    wrapped=fit_lines(d,title,476,max_size)
    if len(wrapped)>2: max_size=28;wrapped=fit_lines(d,title,476,max_size)
    offset=155
    for line in wrapped:
        draw_centered_phrase(d,line,270,offset,max_size,u,emph=(i in (0,1,16,17,26,27)))
        offset+=max_size+16
    # Subtitle safe zone above Shorts lower overlays. Narration-specific phrase,
    # distinct from headline, fades in with slight semantic delay.
    sub=s["subline"]
    sf=font(17)
    subw=d.textbbox((0,0),sub,font=sf)[2]
    alpha=ease((u-.12)*3.6)
    d.text(((W-subw)/2,764+round((1-alpha)*12)),sub,font=sf,fill=mix(BG,WHITE,alpha))
    stroke(d,[(36,820),(504,820)],PALE,2)
    progress=(i+ease(u))/len(shots)
    stroke(d,[(36,820),(36+468*progress,820)],AMBER,3)
    d.text((36,841),f"CẢNH {i+1:02d}/28",font=font(12,True),fill=GRAY)
    # Maintain first-frame hook, final-frame emotional resolution
    if i==27:
        d.text((35,882),"MỘT NGƯỜI RỜI ĐI. BẠN VẪN Ở LẠI.",font=font(13,True),fill=AMBER)
    return im

def camera(im,index,u):
    # Stable dolly movements — no abrupt auto zoom or random shake
    s=1.026+0.036*ease(u) if index%3 else 1.062-0.032*ease(u)
    nw,nh=round(W*s),round(H*s)
    bigger=im.resize((nw,nh),Image.Resampling.BICUBIC)
    dx=round((nw-W)/2 + math.sin(index*.73)*6*ease(u))
    dy=round((nh-H)/2 + math.cos(index*.91)*8*ease(u))
    dx=max(0,min(nw-W,dx));dy=max(0,min(nh-H,dy))
    return bigger.crop((dx,dy,dx+W,dy+H))

def allocation():
    # Hard frame allocations; sum exactly 970.
    weights=np.array([x["weight"] for x in shots],dtype=np.float64)
    floating=weights/weights.sum()*FRAMES
    alloc=np.floor(floating).astype(int)
    remaining=FRAMES-int(alloc.sum())
    for i in np.argsort(-(floating-alloc))[:remaining]:alloc[i]+=1
    assert len(alloc)==28 and int(alloc.sum())==970 and np.all(alloc>=20)
    return alloc

def make_frame(index,alloc,offsets):
    i=int(np.searchsorted(offsets[1:],index,side="right"))
    i=min(i,27)
    start=offsets[i]
    u=max(0,min(1,(index-start)/max(1,alloc[i]-1)))
    current=camera(artwork(shots[i],i,u),i,u)
    # Twelve-frame cinematic dissolve; outgoing shot still animated at the edge.
    fade_len=min(9,int(alloc[i]*.28))
    if i>0 and index-start<fade_len:
        prev=camera(artwork(shots[i-1],i-1,.94+u*.05),i-1,1)
        current=Image.blend(prev,current,ease((index-start+1)/(fade_len+1)))
    return current

def render(path, contact=None):
    alloc=allocation();offsets=np.concatenate([[0],np.cumsum(alloc)])
    path.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24",
         "-s",f"{W}x{H}","-r",str(FPS),"-i","-","-vf","scale=1080:1920:flags=lanczos",
         "-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p",
         "-movflags","+faststart",str(path)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        for n in range(FRAMES):p.stdin.write(make_frame(n,alloc,offsets).tobytes())
    finally:p.stdin.close()
    if p.wait():raise RuntimeError("Video encoder failed")
    if contact:make_sheet(contact,alloc,offsets)
    print(f"Rendered {len(shots)} shots, {FRAMES} frames / {FPS} FPS = {FRAMES/FPS:.4f}s")

def make_sheet(path,alloc=None,offsets=None):
    if alloc is None:alloc=allocation()
    if offsets is None:offsets=np.concatenate([[0],np.cumsum(alloc)])
    cols=7;thumbw=176;thumbh=313;rows=4
    sheet=Image.new("RGB",(cols*thumbw,rows*thumbh),BG)
    for i in range(28):
        n=offsets[i]+alloc[i]//2
        img=make_frame(n,alloc,offsets).resize((thumbw,thumbh),Image.Resampling.LANCZOS)
        sheet.paste(img,((i%cols)*thumbw,(i//cols)*thumbh))
    path.parent.mkdir(parents=True,exist_ok=True)
    sheet.save(path,quality=84)

def score(path):
    # New original three-act score: minor-memory -> breath -> warm C-major resolution.
    sr=32000;total=FRAMES/FPS
    song=np.zeros(int(sr*total),np.float64)
    chords=[(0,[45,48,52]),(4.6,[41,45,48]),(9.1,[43,47,50]),
            (13.6,[40,43,47]),(18.1,[45,48,52]),(22.6,[41,45,48]),
            (27.1,[48,52,55]),(31.6,[43,47,50]),(36.1,[48,52,55])]
    def note(key,start,length,amplitude):
        k=int(sr*start)
        if k>=len(song):return
        n=min(int(sr*length),len(song)-k)
        t=np.arange(n)/sr
        f=440*2**((key-69)/12)
        env=(1-np.exp(-t*65))*np.exp(-t*1.84)
        tone=np.sin(math.tau*f*t)*.73+np.sin(math.tau*f*2.004*t)*.19+np.sin(math.tau*f*3.008*t)*.07
        song[k:k+n]+=amplitude*tone*env
    for i,(start,chord) in enumerate(chords):
        for k in range(7):
            pitch=chord[[0,1,2,1,0,2,1][k]]+12+(12 if k==6 else 0)
            note(pitch,start+k*.63,2.35,.073 if i<5 else .10)
        note(chord[0],start,3.55,.08 if i<5 else .115)
    # Minimal music through revelation; major-key release near the closing.
    for when,pitch in [(2,69),(6,72),(10,67),(14,64),(18,69),(22,65),
                       (27.5,72),(30.5,76),(34,79),(36.5,76),(38.5,79)]:
        note(pitch,when,3.0,.055 if when<27 else .09)
    for delay,gain in [(.14,.10),(.29,.065),(.49,.03)]:
        n=int(delay*sr);song[n:]+=song[:-n].copy()*gain
    secs=np.arange(len(song))/sr
    envelope=np.interp(secs,[0,.4,5,11,17,22,25,28,34,37.5,40.4167],
                       [.35,.60,.66,.46,.38,.24,.47,.65,.86,.77,.08])
    song=np.tanh(song*envelope*2.4)*.57
    pcm=(np.clip(song,-1,1)*32767).astype("<i2")
    path.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(path),"wb") as wav:
        wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(sr)
        wav.writeframes(pcm.tobytes())
    print("Original dynamic piano, 3 mood phases:",str(path))

def main():
    p=argparse.ArgumentParser()
    p.add_argument("mode",choices=("render","sheet","score","inspect"))
    p.add_argument("--out",type=Path,required=True)
    p.add_argument("--sheet",type=Path)
    a=p.parse_args()
    if a.mode=="render":render(a.out,a.sheet)
    elif a.mode=="sheet":make_sheet(a.out)
    elif a.mode=="score":score(a.out)
    else:
        data={"duration":FRAMES/FPS,"shots":len(shots),
              "shotFrames":allocation().tolist(),"beats":len(STORY["voice"]["beats"])}
        a.out.parent.mkdir(parents=True,exist_ok=True)
        a.out.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf8")

if __name__=="__main__":main()
