#!/usr/bin/env python3
"""16-shot father/daughter cinematic video. Real stock footage, custom phone acting,
a restrained amber lighting system, soft crossfades and 30fps (source 25fps).
No voice substitutions: final spoken soundtrack is mixed separately from Vbee.
"""
import json,math,subprocess
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import numpy as np

ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/"story.json").read_text(encoding="utf-8"))
WORK=Path("/tmp/short04")
WORK.mkdir(parents=True,exist_ok=True)
W,H,FPS=540,960,30
LENGTH=DATA["lengthSeconds"]
FADE=.42
ASSETS={"father":"8871835","daughter":"8835827","family":"7407134"}
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
IVORY=(247,243,238,255)
AMBER=(235,160,102,255)
SILVER=(161,165,177,255)
SHOTS=DATA["scenes"]
assert len(SHOTS)==16 and len(DATA["voice"]["beats"])==8

def execute(args):
    subprocess.run(args,check=True)
def ft(n,bold=False):
    return ImageFont.truetype(BOLD if bold else FONT,n)
def write(d,text,x,y,limit=456,size=25,color=IVORY,bold=False,leading=33,center=False):
    f=ft(size,bold)
    rows=[];tmp=""
    for token in text.split():
        nxt=(tmp+" "+token).strip()
        if tmp and d.textbbox((0,0),nxt,font=f)[2]>limit:
            rows.append(tmp);tmp=token
        else:tmp=nxt
    if tmp:rows.append(tmp)
    for s in rows:
        dx=x
        if center: dx=x-d.textbbox((0,0),s,font=f)[2]/2
        d.text((int(dx),int(y)),s,font=f,fill=color)
        y+=leading
    return y
def phone(d,mode):
    # Brandless, readable handset. Small content changes tell the story.
    d.rounded_rectangle((68,217,472,736),radius=34,fill=(16,20,28,238),outline=(184,188,198,230),width=3)
    d.rounded_rectangle((89,238,451,709),radius=23,fill=(25,29,36,252))
    d.rounded_rectangle((232,246,307,252),radius=3,fill=(109,113,121,255))
    d.text((108,276),"21:17",font=ft(18,True),fill=SILVER)
    if mode in ("search","typing"):
        d.rounded_rectangle((107,332,430,386),radius=15,fill=(40,45,56,255),outline=(91,95,108,255),width=2)
        d.text((121,347),"Tìm kiếm",font=ft(14),fill=SILVER)
        if mode=="search":
            write(d,"Cách gửi trái tim cho con gái",118,414,300,20,IVORY,True,31)
            d.line((118,486,415,486),fill=(75,80,88,255),width=2)
            d.text((117,510),"Đã tìm gần đây",font=ft(17),fill=SILVER)
            write(d,"Biểu tượng trái tim trên điện thoại",118,552,305,17,AMBER,False,28)
        else:
            d.text((120,411),"♡   ♡   ♥",font=ft(50,True),fill=AMBER)
            write(d,"Bố thử lại…",120,514,300,19,SILVER)
            d.text((124,583),"17 phút",font=ft(34,True),fill=AMBER)
    elif mode in ("oldmsg","heart","reply","ending"):
        d.text((115,336),"‹   Bố",font=ft(24,True),fill=IVORY)
        d.line((105,377,437,377),fill=(86,90,101,255),width=2)
        d.rounded_rectangle((112,414,324,478),radius=19,fill=(61,66,78,255))
        d.text((128,435),"Ăn cơm chưa?",font=ft(18),fill=IVORY)
        if mode=="oldmsg":
            d.rounded_rectangle((112,501,316,561),radius=18,fill=(61,66,78,255))
            d.text((131,519),"Nhớ ngủ sớm.",font=ft(17),fill=IVORY)
        else:
            d.rounded_rectangle((120,501,220,579),radius=22,fill=(59,65,78,255))
            d.text((144,513),"♥",font=ft(44,True),fill=AMBER)
        if mode in ("reply","ending"):
            d.rounded_rectangle((228,598,430,666),radius=20,fill=(107,69,54,255))
            d.text((243,623),"Con thương bố ♥",font=ft(16,True),fill=IVORY)
            d.text((342,675),"Đã gửi",font=ft(12),fill=SILVER)
    elif mode=="heart":
        pass
def make_overlay(i,shot):
    kind=shot["kind"]
    im=Image.new("RGBA",(W,H))
    d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,130),fill=(5,8,12,130))
    d.text((28,44),"CHUYỆN NHỎ VỀ BỐ   /   01",font=ft(14,True),fill=IVORY)
    d.line((28,84,500,84),fill=(235,160,102,155),width=2)
    if kind in ("search","oldmsg","heart","typing","reply","ending"):
        phone(d,kind)
    else:
        # Location for real acting; keep faces visible.
        d.rectangle((0,670,W,960),fill=(5,8,12,110))
    d.rounded_rectangle((22,764,518,894),radius=20,fill=(7,9,13,230),outline=(235,160,102,160),width=2)
    y=782
    y=write(d,shot["headline"],270,y,450,28,AMBER,True,34,True)
    if shot["shot"] in (1,9,16):
        y=write(d,"MỘT BIỂU TƯỢNG, CẢ MỘT TÌNH YÊU",270,y+7,456,13,IVORY,False,22,True)
    d.line((30,924,510,924),fill=(90,95,103,255),width=3)
    d.line((30,924,30+round((i+1)/16*480),924),fill=AMBER,width=4)
    d.text((32,939),f"{i+1:02d} / 16",font=ft(11),fill=SILVER)
    out=WORK/f"overlay{i:02d}.png";im.save(out)
    return out

def get_footage():
    for key,num in ASSETS.items():
        video=WORK/f"{key}.mp4"
        if video.exists() and video.stat().st_size>100000:continue
        link=f"https://www.pexels.com/download/video/{num}/"
        print("DOWNLOADING",key,link,flush=True)
        execute(["curl","-fsSL","--retry","4","--retry-all-errors","--max-time","210",
            "-A","Mozilla/5.0","-o",str(video),link])
        assert video.stat().st_size>100000,(key,video.stat().st_size)
def scene_movie(i,shot):
    kind=shot["kind"]
    key="father" if kind in ("father","search","oldmsg","heart","typing","ending") else "daughter" if kind=="daughter" else "family"
    infile=WORK/f"{key}.mp4"
    offset={"father":[0.4,3.1,5.9,1.5],"daughter":[1.5,6.9],"family":[.7,3.5,6.1,8.0]}
    offsets={"father":0.5,"search":4.1,"oldmsg":5.8,"heart":7.4,"typing":3.5,
      "daughter":1.5,"together":1.0,"reply":2.5,"ending":4.5}
    start=offsets[kind] + (i%3)*.65
    duration=2.6+(FADE if i<15 else 0)
    overlay=make_overlay(i,shot)
    output=WORK/f"shot{i:02d}.mp4"
    # Foreground stays uncropped for dependable acting. Blurred cover background
    # gives aspect fill without slicing the father or daughter's face.
    flt=("[0:v]fps=30,split=2[base][cast];"
       "[base]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,"
       "gblur=sigma=19,eq=brightness=-0.17:saturation=0.63[wash];"
       "[cast]scale=540:960:force_original_aspect_ratio=decrease,"
       "eq=contrast=1.04:saturation=0.8:brightness=-0.025[fg];"
       "[wash][fg]overlay=(W-w)/2:(H-h)/2-35,setsar=1[film];"
       "[film][1:v]overlay=0:0:shortest=1,format=yuv420p[v]")
    execute(["ffmpeg","-y","-hide_banner","-loglevel","error",
        "-stream_loop","-1","-ss",str(start),"-i",str(infile),"-loop","1",
        "-framerate","30","-i",str(overlay),"-filter_complex",flt,
        "-map","[v]","-an","-t",f"{duration:.3f}",
        "-r","30","-c:v","libx264","-preset","ultrafast","-crf","24",
        "-pix_fmt","yuv420p",str(output)])
    print("SH01",i+1,kind,flush=True)
    return output,duration

def piano(out):
    # Self-composed soft A-minor motif, decaying upper partials for piano-like transients.
    import wave
    sr=32000
    n=round(LENGTH*sr)
    mix=np.zeros(n,dtype=np.float64)
    progression=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],
                 [41,45,48],[45,48,52],[48,52,55],[48,52,57]]
    def note(midi,sec,duration,amp):
        start=round(sec*sr);steps=min(round(duration*sr),n-start)
        if steps<=0:return
        tt=np.arange(steps)/sr
        fq=440*2**((midi-69)/12)
        env=(1-np.exp(-tt*42))*np.exp(-tt*1.65)
        tone=(np.sin(2*math.pi*fq*tt)*.8+np.sin(2*math.pi*fq*2.004*tt)*.18)
        mix[start:start+steps]+=amp*env*tone
    for ci in range(8):
        t=ci*5.2;chord=progression[ci]
        for j in range(7):
            note(chord[[0,1,2,1,0,2,1][j]]+12,t+j*.69,2.8,.115)
        note(chord[0],t,3.9,.105)
    ts=np.arange(n)/sr
    env=np.interp(ts,[0,.5,10,18,21,25,30,36,40.4,LENGTH],
      [.08,.44,.58,.45,.28,.40,.68,.63,.4,.02])
    data=(np.clip(np.tanh(mix*env*2.0)*.55,-1,1)*32767).astype("<i2")
    out.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(out),"wb") as wavefile:
        wavefile.setnchannels(1);wavefile.setsampwidth(2);wavefile.setframerate(sr)
        wavefile.writeframes(data.tobytes())
    print("MUSIC",out,flush=True)
def video(out):
    get_footage()
    films=[scene_movie(i,x) for i,x in enumerate(SHOTS)]
    inputs=["ffmpeg","-y","-hide_banner","-loglevel","error"]
    for f,_ in films:inputs+=["-i",str(f)]
    filters=[];prev="[0:v]";point=films[0][1]-FADE
    for i in range(1,len(films)):
        tag=f"[xf{i}]"
        filters.append(f"{prev}[{i}:v]xfade=transition=fade:duration={FADE}:offset={point:.3f}{tag}")
        prev=tag
        if i<len(films)-1:point+=films[i][1]-FADE
    out.parent.mkdir(parents=True,exist_ok=True)
    execute(inputs+["-filter_complex",";".join(filters),"-map",prev,
      "-t",str(LENGTH),"-r","30","-an","-c:v","libx264",
      "-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-movflags","+faststart",str(out)])
    print("VIDEO",out,flush=True)
def storyboard(out):
    sheet=Image.new("RGB",(5*162,4*288),(7,9,12))
    for i,shot in enumerate(SHOTS):
        p=WORK/f"frame{i:02d}.jpg"
        t=1.1
        execute(["ffmpeg","-y","-hide_banner","-loglevel","error","-ss",str(t),
            "-i",str(WORK/f"shot{i:02d}.mp4"),"-frames:v","1",str(p)])
        im=Image.open(p).convert("RGB").resize((162,288),Image.Resampling.LANCZOS)
        sheet.paste(im,((i%5)*162,(i//5)*288))
    out.parent.mkdir(parents=True,exist_ok=True)
    sheet.save(out,quality=90)

if __name__=="__main__":
    import sys
    mode=sys.argv[1]
    if mode=="piano":piano(Path(sys.argv[2]))
    elif mode=="video":video(Path(sys.argv[2]))
    elif mode=="sheet":storyboard(Path(sys.argv[2]))
    else:raise ValueError(mode)
