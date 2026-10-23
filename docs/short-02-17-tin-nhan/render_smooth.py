#!/usr/bin/env python3
"""Cinematic 60fps continuity renderer for the 28-shot Short #01.

A single, persistent protagonist is drawn in the foreground throughout all
28 scene changes. Only backgrounds/props dissolve; there is no double-figure
ghosting or pose teleportation. Camera movement is fractional, globally
continuous, and BICUBIC filtered (not integer-rounded per shot).
"""
import argparse
import importlib.util
import json
import math
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

HERE=Path(__file__).resolve().parent
V3=HERE.parent/"short-01-nho-phien-ban-duoc-yeu"/"v3"/"render_cinematic.py"
spec=importlib.util.spec_from_file_location("short01_cinematic_v3",V3)
v3=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v3)
v3.STORY=json.loads((HERE/'story.json').read_text(encoding='utf8'))
v3.shots=v3.STORY['shots']
FRAMERATE=60
FRAMES=2425
W,H=540,960
DURATION=FRAMES/FRAMERATE
STORY=v3.STORY
SHOTS=STORY["shots"]
assert len(SHOTS)==28
TRANSITION=22   # 44 contiguous frames / 0.733s in every shot hand-off

# One readable visual headline spans two complementary visual shots. This
# avoids flashing a completely new title every ~1.4 seconds.
TITLES=[
    "17 TIN NHẮN. 0 LỜI CHÚC",
    "AI CŨNG NHỜ AN",
    "CÔ LUÔN NÓI ĐƯỢC",
    "CHỈ CÒN MỘT MÌNH",
    "AI CŨNG CẦN AN",
    "NHƯNG AI THƯƠNG AN?",
    "23 GIỜ 59 PHÚT",
    "LẠI MỘT LỜI NHỜ",
    "AN BỖNG DỪNG LẠI",
    "SỢ AI ĐÓ THẤT VỌNG",
    "HÔM NAY EM CẦN NGHỈ",
    "AN TỰ THẮP NẾN",
    "KHÔNG CẦN VỖ TAY",
    "BẠN CŨNG ĐÁNG ĐƯỢC THƯƠNG"
]
assert len(TITLES)==len(SHOTS)//2
ORIGINAL_STICK=v3.v2.stick

def eased(t):
    return v3.ease(max(0.,min(1.,t)))

def allocation():
    weights=np.array([s["weight"] for s in SHOTS],dtype=np.float64)
    exact=weights/weights.sum()*FRAMES
    alloc=np.floor(exact).astype(int)
    for i in np.argsort(-(exact-alloc))[:FRAMES-int(alloc.sum())]:
        alloc[i]+=1
    assert len(alloc)==28 and sum(alloc)==FRAMES and min(alloc)>2*TRANSITION+6
    return alloc

ALLOC=allocation()
OFFSETS=np.concatenate([[0],np.cumsum(ALLOC)])

def actor_pose(shot):
    prop=shot["baseProp"]
    if prop=="reach":return "reach"
    if prop=="heart" or prop=="hands":return "heart"
    if prop in ("phone","flowers","coffee"):return "hold"
    return "idle"

POSES={
    "idle":((-34,-100),(-46,-61),(34,-100),(46,-61)),
    "hold":((-36,-92),(-22,-58),(42,-94),(30,-60)),
    "reach":((-58,-88),(-89,-115),(58,-85),(101,-130)),
    "heart":((-39,-92),(-6,-97),(39,-92),(6,-97)),
}

JOY={"alone":.20,"memory":.82,"loss":0.,"shift":.54,"healing":.78,"hope":1.}

def protagonist(d,old_shot,new_shot,blend,absolute_s):
    # The single figure never changes anchor or jumps to a different camera
    # position between scenes. Limbs and expression interpolate continuously.
    x,y=208.,578.
    breath=1.8*math.sin(math.tau*absolute_s/4.7)
    sway=1.3*math.sin(math.tau*absolute_s/6.2)
    y+=breath
    mood=v3.lerp(JOY[old_shot["mood"]],JOY[new_shot["mood"]],blend)
    first=POSES[actor_pose(old_shot)]
    second=POSES[actor_pose(new_shot)]
    arms=[
        (v3.lerp(a[0],b[0],blend),v3.lerp(a[1],b[1],blend))
        for a,b in zip(first,second)
    ]
    bob=.5*math.sin(math.tau*absolute_s/2.9)
    head_y=y-144.
    color=v3.WHITE
    d.ellipse((x-25,head_y-25,x+25,head_y+25),outline=color,width=4)
    # Emotive head tilt is subtle and continuous.
    gaze=2*math.sin(absolute_s*.36)
    d.ellipse((x-11+gaze,head_y-4,x-8+gaze,head_y-1),fill=color)
    d.ellipse((x+7+gaze,head_y-4,x+10+gaze,head_y-1),fill=color)
    mouth_pts=[
        (x-10,head_y+8-mood*2),
        (x,head_y+9+mood*9),
        (x+10,head_y+8-mood*2),
    ]
    v3.stroke(d,mouth_pts,color,2)
    neck=head_y+25
    hip=y-23
    v3.stroke(d,[(x,neck),(x+sway,hip)],color,5)
    l0,l1,r0,r1=arms
    motion=1.1*math.sin(absolute_s*2.0)
    # Shoulder->elbow->hand segments; offset coordinates from the torso.
    v3.stroke(d,[(x,neck+33),(x+arms[0][0],y+arms[0][1]),
                 (x+arms[1][0]+motion,y+arms[1][1])],color,4)
    v3.stroke(d,[(x,neck+33),(x+arms[2][0],y+arms[2][1]),
                 (x+arms[3][0]-motion,y+arms[3][1])],color,4)
    gait=1.8*math.sin(absolute_s*1.2)
    v3.stroke(d,[(x+sway,hip),(x-29-gait,y+57)],color,4)
    v3.stroke(d,[(x+sway,hip),(x+30+gait,y+57)],color,4)

def figureless_environment(d,shot,i,u):
    # Reuse all custom scene art/props, but suppress duplicated stick figures.
    # Memory silhouettes are allowed in the background as artistic props.
    def suppress(draw,x,y,phase=0,mood="alone",scale=1,ghost=False,pose=""):
        if ghost:
            return ORIGINAL_STICK(draw,x,y,phase,mood,scale,ghost,pose)
        return None
    v3.v2.stick=suppress
    try:
        v3.v2.environment(d,v3.BASE[shot["baseProp"]],u,1)
    finally:
        v3.v2.stick=ORIGINAL_STICK
    v3.draw_scene_motif(d,shot,u,i)

def background(index,u,absolute_n):
    s=SHOTS[index]
    im=Image.new("RGB",(W,H),v3.BG)
    d=ImageDraw.Draw(im)
    figureless_environment(d,s,index,u)
    chapter=("01 / SINH NHẬT" if index<8 else
             "02 / MỆT MỎI" if index<16 else
             "03 / DỪNG LẠI" if index<22 else "04 / CHỌN MÌNH")
    d.text((35,63),"17 TIN NHẮN, 0 LỜI CHÚC",font=v3.font(15,True),fill=v3.GRAY)
    d.text((35,92),chapter,font=v3.font(12),fill=v3.AMBER)
    v3.stroke(d,[(35,128),(505,128)],v3.PALE,2)
    pair=(index//2)*2
    pair_start=OFFSETS[pair]
    pair_end=OFFSETS[pair+2]
    pair_pos=max(0.,min(1.,(absolute_n-pair_start)/max(1,pair_end-pair_start)))
    title=TITLES[index//2]
    text_size=31 if len(title)>20 else 36
    wrapped=v3.fit_lines(d,title,474,text_size)
    if len(wrapped)>2:
        text_size=28
        wrapped=v3.fit_lines(d,title,474,text_size)
    for ln,line in enumerate(wrapped):
        # Stable lettering across the pair. No word animation reset between
        # shots; identical title/text layout morphs only at actual beat edges.
        v3.draw_centered_phrase(d,line,270,159+ln*(text_size+14),
                                text_size,min(1,pair_pos*3.8+.3),emph=(index>=16))
    sub=SHOTS[pair+1]["subline"]
    ff=v3.font(17)
    width=d.textbbox((0,0),sub,font=ff)[2]
    text_alpha=eased(pair_pos*5)
    d.text(((W-width)/2,768),sub,font=ff,
           fill=v3.mix(v3.BG,v3.WHITE,text_alpha))
    v3.stroke(d,[(36,820),(504,820)],v3.PALE,2)
    # This progress line moves on absolute film time, never resets at cuts.
    v3.stroke(d,[(36,820),(36+468*max(0,absolute_n)/FRAMES,820)],v3.AMBER,3)
    d.text((36,841),f"CẢNH {index+1:02d} / 28",font=v3.font(12,True),fill=v3.GRAY)
    if index>=26:
        d.text((35,882),"BẠN CŨNG XỨNG ĐÁNG ĐƯỢC THƯƠNG.",
               font=v3.font(13,True),fill=v3.AMBER)
    return im

def camera(image,time_s):
    # Pillow inverse-affine subpixel camera. No frame-by-frame integer jumps.
    scale=1.038+.0055*math.sin(math.tau*time_s/18.0)
    motion_x=2.0*math.sin(math.tau*time_s/21.)
    motion_y=2.5*math.cos(math.tau*time_s/23.)
    offx=W*(1.-1./scale)/2.+motion_x
    offy=H*(1.-1./scale)/2.+motion_y
    return image.transform(
        (W,H),Image.Transform.AFFINE,
        (1./scale,0,offx,0,1./scale,offy),
        resample=Image.Resampling.BICUBIC
    )

def identify(n):
    i=int(np.searchsorted(OFFSETS[1:],n,side="right"))
    return min(len(SHOTS)-1,i)

def pair_at(n):
    i=identify(n)
    if i>0 and n<OFFSETS[i]+TRANSITION:
        k=i;left=i-1;right=i
    elif i<len(SHOTS)-1 and n>=OFFSETS[i+1]-TRANSITION:
        k=i+1;left=i;right=i+1
    else:
        return i,i,1.
    b=int(OFFSETS[k])
    alpha=eased((n-(b-TRANSITION))/(2.*TRANSITION))
    return left,right,alpha

def frame(n):
    old_i,new_i,alpha=pair_at(n)
    # Each background evolves on its own local timeline. The shared actor,
    # camera, subtitle progress, and music all evolve on one global clock.
    old_u=max(0.,min(1.,(n-OFFSETS[old_i])/max(1,ALLOC[old_i]-1)))
    if old_i==new_i:
        bg=background(old_i,old_u,n)
    else:
        new_u=max(0.,min(1.,(n-OFFSETS[new_i])/max(1,ALLOC[new_i]-1)))
        old_bg=background(old_i,old_u,n)
        new_bg=background(new_i,new_u,n)
        bg=Image.blend(old_bg,new_bg,alpha)
    d=ImageDraw.Draw(bg)
    protagonist(d,SHOTS[old_i],SHOTS[new_i],alpha,n/FRAMERATE)
    return camera(bg,n/FRAMERATE)

def sheet(path):
    width,height=176,313
    contact=Image.new("RGB",(width*7,height*4),v3.BG)
    for i in range(28):
        n=int(OFFSETS[i]+ALLOC[i]//2)
        tile=frame(n).resize((width,height),Image.Resampling.LANCZOS)
        contact.paste(tile,((i%7)*width,(i//7)*height))
    path.parent.mkdir(parents=True,exist_ok=True)
    contact.save(path,quality=90)

def diagnostics(path):
    # Measure temporal seam deltas at all 27 shot boundaries. Print a
    # machine-readable report for post-render QA; not a claim of subjective
    # perfection.
    report=[]
    for idx,boundary in enumerate(OFFSETS[1:-1],start=1):
        b=int(boundary)
        deviations=[]
        for n in range(b-3,b+3):
            a=np.asarray(frame(n).resize((135,240),Image.Resampling.BILINEAR),dtype=np.int16)
            bgr=np.asarray(frame(n+1).resize((135,240),Image.Resampling.BILINEAR),dtype=np.int16)
            deviations.append(round(float(np.mean(np.abs(a-bgr))),3))
        report.append({"boundary":idx,"frame":b,"timeSeconds":round(b/FRAMERATE,3),
                       "meanAbsFrameDelta":max(deviations)})
    value=max(x["meanAbsFrameDelta"] for x in report)
    if value>23:
        raise RuntimeError(f"Unexpected visual discontinuity (delta={value}); inspect transition")
    data={"fps":FRAMERATE,"frames":FRAMES,"seconds":DURATION,
          "shots":len(SHOTS),"transitionFrames":TRANSITION*2,
          "singleProtagonistAnchor":[208,578],"subpixelCamera":True,
          "pairedReadableHeadlines":len(TITLES),"maxBoundaryMeanAbsoluteDelta":value,
          "boundaries":report}
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(data,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in data.items() if k!="boundaries"},indent=2))

def render(out,preview=None):
    out.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error",
         "-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}",
         "-r",str(FRAMERATE),"-i","-",
         "-vf","scale=1080:1920:flags=lanczos",
         "-c:v","libx264","-preset","fast","-crf","19",
         "-profile:v","high","-level","4.2",
         "-g","120","-pix_fmt","yuv420p",
         "-movflags","+faststart",str(out)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        for n in range(FRAMES):p.stdin.write(frame(n).tobytes())
    finally:
        p.stdin.close()
    if p.wait():raise RuntimeError("FFmpeg video encoder failed")
    if preview:sheet(preview)
    print(f"Rendered {FRAMES} smooth frames at {FRAMERATE}fps (duration {DURATION:.6f}s)")

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("mode",choices=["render","sheet","seam-qa"])
    parser.add_argument("--out",type=Path,required=True)
    parser.add_argument("--sheet",type=Path)
    args=parser.parse_args()
    if args.mode=="render":render(args.out,args.sheet)
    elif args.mode=="sheet":sheet(args.out)
    else:diagnostics(args.out)
