#!/usr/bin/env python3
"""Original 20-shot stick-figure animation and adaptive piano for Short 01 v2.
No external stock art, no reused 17-shot footage. Deterministic frame animation.
"""
import argparse
import math
import subprocess
import wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W,H,FPS,FRAMES=540,960,24,970
BG=(8,9,12); WHITE=(245,245,241); AMBER=(239,158,105); MUTED=(112,119,132)
STORY=[
 ("Có thể bạn nhớ…","phone","alone"),
 ("Không hẳn là họ.","sofa","alone"),
 ("Mà là chính mình","window","alone"),
 ("Khi còn được yêu.","stars","memory"),
 ("Một chiều rất cũ.","clock","memory"),
 ("Một tin nhắn nhỏ.","message","memory"),
 ("Một bàn ăn hai người.","table","memory"),
 ("Và nụ cười của bạn.","smile","memory"),
 ("Giờ chỉ còn khoảng trống.","empty","loss"),
 ("Bạn chạm vào ký ức.","reach","loss"),
 ("Rồi tự hỏi bản thân…","mirror","loss"),
 ("Mình có thể vui nữa không?","rain","loss"),
 ("Nhưng trái tim ấy","heart","shift"),
 ("Vẫn biết yêu thương.","hands","shift"),
 ("Bạn tự tặng mình hoa.","flowers","healing"),
 ("Một ly cà phê ấm.","coffee","healing"),
 ("Đi qua con phố quen.","street","healing"),
 ("Chọn một điều mình thích.","sketch","healing"),
 ("Ánh sáng dần trở lại.","sunrise","hope"),
 ("Bạn vẫn có thể rạng rỡ.","bloom","hope"),
]
assert len(STORY)==20
def ease(t): return t*t*(3-2*t)
def color_mix(a,b,t): return tuple(int(x*(1-t)+y*t) for x,y in zip(a,b))
def line(d,points,fill=WHITE,width=4): d.line(points,fill=fill,width=width,joint="curve")
def ellipse(d,box,outline=WHITE,width=3,fill=None): d.ellipse(box,outline=outline,width=width,fill=fill)
def font(size,bold=False):
    f="/usr/share/fonts/truetype/dejavu/DejaVuSans"+("-Bold" if bold else "")+".ttf"
    return ImageFont.truetype(f,size)
def centered(d,xy,text,size,color=WHITE,bold=False):
    f=font(size,bold)
    box=d.textbbox((0,0),text,font=f)
    d.text((xy[0]-(box[2]-box[0])/2,xy[1]),text,font=f,fill=color,stroke_width=0)
def glow(d,x,y,r,fill=AMBER):
    for j in range(6,0,-1):
        rr=r+j*10
        col=color_mix(BG,fill,0.045*(7-j))
        ellipse(d,(x-rr,y-rr,x+rr,y+rr),outline=col,width=3)
def stick(d,x,y,phase=0,mood="alone",scale=1,ghost=False,pose=""):
    s=scale; bob=math.sin(phase*2*math.pi)*2*s
    y+=bob
    col=(112,105,104) if ghost else WHITE
    heady=y-144*s
    ellipse(d,(x-25*s,heady-25*s,x+25*s,heady+25*s),outline=col,width=max(2,int(4*s)))
    # expressive face: eye height, subtle mouth arcs, gaze
    ey=heady-3*s
    gaze=4*s if mood=="hope" else (-3*s if mood in ("loss","alone") else 0)
    ellipse(d,(x-11*s+gaze,ey-2*s,x-8*s+gaze,ey+1*s),outline=col,width=1,fill=col)
    ellipse(d,(x+7*s+gaze,ey-2*s,x+10*s+gaze,ey+1*s),outline=col,width=1,fill=col)
    if mood in ("hope","healing","memory"):
        d.arc((x-11*s,heady+1*s,x+11*s,heady+15*s),0,180,fill=col,width=max(1,int(2*s)))
    elif mood=="loss":
        d.arc((x-9*s,heady+8*s,x+9*s,heady+18*s),180,350,fill=col,width=max(1,int(2*s)))
    else:
        line(d,[(x-7*s,heady+11*s),(x+7*s,heady+11*s)],col,max(1,int(2*s)))
    neck=heady+25*s
    hip=y-23*s
    line(d,[(x,neck),(x+2*s,hip)],col,max(2,int(5*s)))
    swing=math.sin(phase*2*math.pi)*8*s
    if pose=="reach":
        left=[(x-58*s,y-88*s),(x-89*s,y-115*s)]
        right=[(x+58*s,y-85*s),(x+101*s,y-130*s)]
    elif pose=="heart":
        left=[(x-39*s,y-92*s),(x-6*s,y-97*s)]
        right=[(x+39*s,y-92*s),(x+6*s,y-97*s)]
    elif pose=="hold":
        left=[(x-36*s,y-92*s),(x-22*s,y-58*s)]
        right=[(x+42*s,y-94*s),(x+30*s,y-60*s)]
    else:
        left=[(x-34*s,y-100*s),(x-46*s-swing,y-61*s)]
        right=[(x+34*s,y-100*s),(x+46*s+swing,y-61*s)]
    line(d,[(x,neck+33*s)]+left,col,max(2,int(4*s)))
    line(d,[(x,neck+33*s)]+right,col,max(2,int(4*s)))
    line(d,[(x+2*s,hip),(x-29*s-swing,y+57*s)],col,max(2,int(4*s)))
    line(d,[(x+2*s,hip),(x+30*s+swing,y+57*s)],col,max(2,int(4*s)))
    return (x,heady)
def environment(d,i,t,fade):
    name,prop,mood=STORY[i]
    # scene-specific illustrated sets; muted architecture, restrained amber accents
    x=270; y=560
    if prop=="phone":
        d.rounded_rectangle((352,454,410,554),radius=10,outline=MUTED,width=3)
        d.rounded_rectangle((362,469,400,533),radius=5,fill=(35,35,42))
        ellipse(d,(379,489,385,495),outline=AMBER,fill=AMBER,width=1)
        line(d,[(356,554),(395,554)],MUTED,2)
    elif prop=="sofa":
        d.rounded_rectangle((74,570,464,720),radius=24,outline=MUTED,width=4)
        line(d,[(94,630),(444,630)],MUTED,3)
        line(d,[(270,635),(270,708)],MUTED,2)
        ellipse(d,(376,594,393,610),outline=AMBER,width=2)
    elif prop=="window":
        d.rectangle((65,190,465,680),outline=MUTED,width=5)
        line(d,[(265,190),(265,680)],MUTED,3)
        line(d,[(65,445),(465,445)],MUTED,3)
        for k in range(10):
            xx=88+(k*83)%350; yy=215+(k*47)%210
            line(d,[(xx,yy),(xx-13,yy+32)],(65,76,96),2)
    elif prop=="stars":
        for k in range(25):
            xx=32+(k*79)%475; yy=175+(k*47)%430
            rr=2+(k%3); ellipse(d,(xx-rr,yy-rr,xx+rr,yy+rr),outline=AMBER if k%5==0 else MUTED,width=1)
        glow(d,392,330,38)
    elif prop=="clock":
        ellipse(d,(335,236,462,363),outline=MUTED,width=5)
        line(d,[(399,299),(399+math.sin(t*2)*20,261)],AMBER,3)
        line(d,[(399,299),(429,310)],WHITE,2)
    elif prop=="message":
        d.rounded_rectangle((295,255,479,352),radius=16,outline=MUTED,width=3)
        centered(d,(386,271),"Bạn về chưa?",16,AMBER)
        centered(d,(386,306),"♡",20,AMBER)
    elif prop=="table":
        line(d,[(70,635),(470,635)],MUTED,5)
        line(d,[(116,635),(108,748)],MUTED,4);line(d,[(427,635),(434,748)],MUTED,4)
        ellipse(d,(349,605,406,631),outline=AMBER,width=3)
        line(d,[(377,606),(377,574)],MUTED,3)
    elif prop=="smile":
        glow(d,374,375,66)
        ellipse(d,(345,344,405,404),outline=AMBER,width=3)
        d.arc((355,362,394,389),0,180,fill=AMBER,width=3)
    elif prop=="empty":
        d.rounded_rectangle((338,478,445,640),radius=10,outline=MUTED,width=3)
        line(d,[(338,570),(445,570)],MUTED,2)
        line(d,[(350,640),(350,685)],MUTED,3);line(d,[(430,640),(430,685)],MUTED,3)
    elif prop=="reach":
        for k in range(3):
            ellipse(d,(373-k*12,345-k*12,410+k*12,382+k*12),outline=color_mix(BG,AMBER,.3-k*.07),width=2)
    elif prop=="mirror":
        d.rounded_rectangle((338,220,472,677),radius=65,outline=MUTED,width=5)
        line(d,[(345,424),(464,424)],(40,44,53),2)
    elif prop=="rain":
        for k in range(28):
            xx=22+(k*97)%490; yy=155+(k*59+int(t*85))%570
            line(d,[(xx,yy),(xx-9,yy+28)],(53,72,94),2)
        line(d,[(42,719),(496,719)],MUTED,2)
    elif prop=="heart":
        glow(d,390,411,36)
        d.arc((348,377,390,433),155,355,fill=AMBER,width=4)
        d.arc((387,377,430,433),185,385,fill=AMBER,width=4)
        line(d,[(350,416),(390,458),(427,416)],AMBER,4)
    elif prop=="hands":
        line(d,[(322,497),(368,465),(405,493)],AMBER,5)
        ellipse(d,(377,432,394,450),outline=AMBER,width=3)
    elif prop=="flowers":
        line(d,[(385,584),(385,407)],(89,137,97),4)
        for k in range(5):
            a=k*math.tau/5+t*.07
            px=385+math.cos(a)*23; py=397+math.sin(a)*23
            ellipse(d,(px-14,py-14,px+14,py+14),outline=AMBER,width=3)
        ellipse(d,(378,390,392,404),outline=WHITE,fill=AMBER,width=2)
        line(d,[(385,520),(358,485)],(89,137,97),3)
    elif prop=="coffee":
        d.rounded_rectangle((351,508,427,588),radius=9,outline=AMBER,width=4)
        d.arc((409,526,459,574),260,100,fill=AMBER,width=4)
        for k in range(3):
            xx=364+k*22
            line(d,[(xx,485+math.sin(t*3+k)*6),(xx+5,456)],MUTED,2)
    elif prop=="street":
        for xx,hh in [(32,230),(110,300),(375,275),(447,225)]:
            d.rectangle((xx,560-hh,xx+62,705),outline=(53,59,68),width=3)
            for yy in range(590-hh,672,47):
                d.rectangle((xx+13,yy,xx+22,yy+17),fill=AMBER if (xx+yy)%3 else MUTED)
        line(d,[(32,708),(508,708)],MUTED,3)
    elif prop=="sketch":
        d.polygon([(350,337),(474,353),(456,556),(334,544)],outline=MUTED)
        d.arc((358,378,438,478),15,180,fill=AMBER,width=4)
        line(d,[(430,516),(469,461)],AMBER,4)
    elif prop=="sunrise":
        glow(d,395,476,67)
        ellipse(d,(332,411,459,538),outline=AMBER,width=4)
        d.rectangle((318,495,485,559),fill=BG)
        line(d,[(320,495),(480,495)],MUTED,3)
        for k in range(4):
            line(d,[(331+k*40,557),(331+k*40,620)],(55,67,73),2)
    elif prop=="bloom":
        glow(d,400,365,80)
        for k in range(8):
            a=k*math.tau/8+t*.1
            px=400+math.cos(a)*42;py=370+math.sin(a)*42
            ellipse(d,(px-21,py-21,px+21,py+21),outline=AMBER,width=3)
        ellipse(d,(389,359,411,381),outline=WHITE,fill=AMBER,width=2)
    # ghost memory appears only in past relationship beats
    if i in (3,6,7):
        stick(d,390,600,t,mood,0.67,True)
    if i in (0,1,2,4,5,8,9,10,11,12,13,14,15,16,17,18,19):
        pose="reach" if i==9 else "heart" if i in (12,13) else "hold" if i in (0,14,15) else ""
        stick(d,210 if i in (0,1,6,7,8,9,10,11,12,13,14,15,16,17,18,19) else 245,580,t,mood,1.0,False,pose)
    if i==7: stick(d,203,580,t,"memory",1.0)
def frame(n):
    i=min(19,n*20//FRAMES)
    start=i*FRAMES/20
    p=min(1,max(0,(n-start)/(FRAMES/20)))
    name,prop,mood=STORY[i]
    im=Image.new("RGB",(W,H),BG)
    d=ImageDraw.Draw(im)
    # film-like top/bottom fine framing and amber scene chapter
    line(d,[(34,113),(506,113)],(43,46,53),2)
    centered(d,(270,65),"NHỚ PHIÊN BẢN MÌNH",17,MUTED,True)
    centered(d,(270,159),name,27,WHITE,True)
    centered(d,(270,209),("KÝ ỨC" if i<8 else "KHOẢNG LẶNG" if i<13 else "TRỞ VỀ VỚI MÌNH"),13,AMBER)
    environment(d,i,p,1)
    line(d,[(40,826),(500,826)],(38,42,49),2)
    line(d,[(40,826),(40+(i+p)*460/20,826)],AMBER,3)
    centered(d,(270,852),"BẠN KHÔNG CẦN HỌ QUAY LẠI",15,MUTED)
    centered(d,(270,885),f"{i+1:02d} / 20",12,AMBER)
    # soft fade at every scene boundary; never flash white
    fade=min(1,p/.14,(1-p)/.12)
    if fade<1:
        veil=Image.new("RGB",(W,H),BG)
        im=Image.blend(veil,im,max(0,fade))
    return im
def render(out):
    out.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24",
         "-s",f"{W}x{H}","-r",str(FPS),"-i","-","-vf","scale=1080:1920:flags=lanczos",
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
         "-movflags","+faststart",str(out)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        for n in range(FRAMES):
            p.stdin.write(frame(n).tobytes())
    finally:
        p.stdin.close()
    if p.wait(): raise RuntimeError("ffmpeg video encoder failed")
def piano(out):
    sr=32000; duration=FRAMES/FPS
    audio=np.zeros(int(sr*duration),dtype=np.float64)
    # A minor grief -> F reflection -> C/G gentle rediscovery; original generated score
    chords=[(0,[57,60,64]),(1,[53,57,60]),(2,[48,52,55]),(3,[55,59,62]),
            (4,[50,53,57]),(5,[53,57,60]),(6,[48,52,55]),(7,[48,52,55])]
    def note(midi,start,seconds,velocity):
        nonlocal audio
        k=int(start*sr)
        if k>=len(audio): return
        N=min(int(seconds*sr),len(audio)-k)
        t=np.arange(N)/sr
        f=440*2**((midi-69)/12)
        env=(1-np.exp(-t*85))*np.exp(-t*2.05)
        signal=(np.sin(2*np.pi*f*t)*.73+
                np.sin(2*np.pi*f*2.002*t)*.17+
                np.sin(2*np.pi*f*3.008*t)*.075+
                np.sin(2*np.pi*f*4.01*t)*.025)
        audio[k:k+N]+=signal*env*velocity
    for j,(idx,notes) in enumerate(chords):
        base=j*5.05
        strength=.11 if j<3 else .095 if j<5 else .15
        for k in range(8):
            pitch=notes[[0,1,2,1,0,2,1,2][k]]+(12 if k in (3,7) else 0)
            note(pitch,base+k*.63,2.2,strength*(.75 if k%2 else 1))
        note(notes[0]-12,base,3.2,strength*.6)
    # subtle original melodic motif, brighter toward resolution
    for t,m in [(2,72),(4,69),(7,69),(9,67),(12,64),(14,67),(18,69),
                (22,65),(26,69),(29,72),(32,72),(34,76),(37,79),(39,76)]:
        note(m,t,2.5,.06 if t<28 else .105)
    # light echo/reverb and controlled dynamic emotional arc
    for delay,gain in [(0.115,.10),(0.245,.07),(0.48,.045)]:
        k=int(delay*sr);audio[k:]+=audio[:-k].copy()*gain
    t=np.arange(len(audio))/sr
    rise=np.interp(t,[0,2,12,21,28,33,37,40.42],[.15,.60,.56,.42,.55,.72,.88,0])
    audio*=rise
    audio=np.tanh(audio*1.5)*.64
    pcm=(np.clip(audio,-1,1)*32767).astype("<i2")
    out.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(out),"wb") as wav:
        wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(sr);wav.writeframes(pcm.tobytes())
if __name__=="__main__":
    a=argparse.ArgumentParser()
    a.add_argument("mode",choices=["render","piano","preview"])
    a.add_argument("--out",type=Path,required=True)
    a.add_argument("--shot",type=int,default=15)
    args=a.parse_args()
    if args.mode=="render": render(args.out)
    elif args.mode=="piano": piano(args.out)
    else:
        args.out.parent.mkdir(parents=True,exist_ok=True)
        frame(int((args.shot-.5)*FRAMES/20)).save(args.out)
