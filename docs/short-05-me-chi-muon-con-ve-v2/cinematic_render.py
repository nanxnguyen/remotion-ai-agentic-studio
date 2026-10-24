#!/usr/bin/env python3
"""Approved V2 44s family-film demo: actual motion stock film + art-directed inserts.

Important: People in sourced film are not guaranteed to be the same actors.
This is a cinematic edit using live-action footage, NOT a synthesized one-cast film.
"""
import json, math, subprocess, wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
WORK=Path("/tmp/short05"); WORK.mkdir(exist_ok=True,parents=True)
SRC={a["code"]:a["id"] for a in DATA["sourceAssets"]}
SRC.update({"door":"8561462"})
FRAME_W,FRAME_H,FPS=540,960,30
CUTS=DATA["shots"]
RUN_TIME=44
FADE=.38
INK=(8,9,12,255);AMBER=(233,164,105,255);WHITE=(245,243,239,255)
PALE=(167,171,180,255)
FONT_REG="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_ITAL="/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf"

def run(c):subprocess.run(c,check=True)
def font(n,style="normal"):return ImageFont.truetype(
    FONT_BOLD if style=="bold" else FONT_ITAL if style=="italic" else FONT_REG,n)
def write(d,text,xy,n=25,limit=460,color=WHITE,align="left",style="bold",spacing=32):
    words=text.split(" ");lines=[];s=""
    f=font(n,style)
    for w in words:
        s2=(s+" "+w).strip()
        if s and d.textbbox((0,0),s2,font=f)[2] > limit:
            lines.append(s);s=w
        else:s=s2
    if s:lines.append(s)
    x,y=xy
    for line in lines:
        dx=x
        if align=="center":dx=x-d.textbbox((0,0),line,font=f)[2]/2
        d.text((int(dx),y),line,font=f,fill=color,stroke_width=0)
        y+=spacing
    return y

def vignette(d):
    d.rectangle((0,0,540,96),fill=(7,8,13,128))
    d.text((31,39),"NHỮNG ĐIỀU CHƯA KỊP NÓI",font=font(13,"bold"),fill=WHITE)
    d.line((30,84,510,84),fill=(233,164,105,150),width=2)

def calendar(d,full=False,note=False):
    d.rounded_rectangle((55,176,485,739),radius=12,fill=(234,216,186,247),
                        outline=(154,128,105,255),width=3)
    d.rectangle((67,193,473,271),fill=(109,58,47,255))
    d.text((163,217),"THÁNG 10",font=font(33,"bold"),fill=(253,240,221,255))
    for i in range(7):
        d.text((91+i*54,294),["T2","T3","T4","T5","T6","T7","CN"][i],
               font=font(13,"bold"),fill=(95,76,66,255))
    for row in range(5):
        y=320+row*72
        d.line((77,y+65,462,y+65),fill=(185,165,143,135),width=1)
        for col in range(7):
            day=row*7+col+1
            if day>31:continue
            x=94+col*54
            d.text((x,y+14),str(day),font=font(19),
                   fill=(77,70,68,255))
    marks=[(3,2),(4,3),(2,4),(6,0),(1,1)]
    for i,(row,col) in enumerate(marks):
        x=102+col*54;y=352+row*72
        d.ellipse((x-9,y-7,x+29,y+31),outline=(173,50,46,255),width=3)
        if full or i<2:
            d.line((x-13,y-10,x+35,y+34),fill=(164,43,40,255),width=4)
            d.line((x+32,y-10,x-10,y+34),fill=(164,43,40,255),width=4)
    if note:
        d.rounded_rectangle((79,501,459,708),radius=5,fill=(247,231,207,255),
            outline=(152,130,109,255),width=2)
        write(d,"Hôm nào Nam về,", (101,534),24,335,(75,55,46,255),
             style="italic",spacing=42)
        write(d,"nhớ nấu cá kho.",(101,590),24,333,(75,55,46,255),
             style="italic",spacing=42)
        d.text((337,655),"Mẹ",font=font(22,"italic"),fill=(81,66,61,255))

def phone(d):
    d.rounded_rectangle((107,190,433,716),radius=40,fill=(19,23,30,252),
        outline=(167,172,183,255),width=4)
    d.rounded_rectangle((124,212,416,687),radius=24,fill=(236,240,239,255))
    d.rounded_rectangle((247,219,298,226),radius=4,fill=(63,72,73,255))
    d.text((140,255),"NGÂN HÀNG",font=font(18,"bold"),fill=(38,53,55,255))
    d.ellipse((243,320,300,377),fill=(48,150,98,255))
    d.line((253,347,266,359,286,335),fill=(255,255,255,255),width=5,joint="curve")
    d.text((159,407),"CHUYỂN KHOẢN",font=font(19,"bold"),fill=(50,72,74,255))
    d.text((181,437),"THÀNH CÔNG",font=font(20,"bold"),fill=(50,72,74,255))
    d.text((161,507),"5.000.000 ₫",font=font(27,"bold"),fill=(41,87,68,255))
    d.line((151,568,395,568),fill=(174,183,178,255),width=2)
    d.text((158,590),"Người nhận: Mẹ",font=font(17),fill=(58,77,76,255))

def bowls(d):
    # Two bowls, one full and one untouched, shot as an intentionally symbolic overlay.
    d.ellipse((77,453,473,519),fill=(48,32,26,110))
    for x in (158,376):
        d.ellipse((x-76,455,x+76,520),fill=(215,210,195,255),
                  outline=(178,159,138,255),width=3)
        d.ellipse((x-60,463,x+60,497),fill=(196,166,123,255) if x==158 else (227,223,215,255))
        d.arc((x-76,445,x+76,542),0,180,fill=(232,215,197,255),width=6)
        d.line((x-62,509,x+62,509),fill=(151,131,110,245),width=3)

def overlay(i,shot):
    im=Image.new("RGBA",(540,960),(0,0,0,0));d=ImageDraw.Draw(im,"RGBA")
    vignette(d)
    kind=shot["kind"]
    if kind=="transfer":phone(d)
    elif kind=="calendar":calendar(d,False)
    elif kind=="crosses":calendar(d,True)
    elif kind=="note":calendar(d,True,True)
    elif kind=="bowl":
        # Keep photo acting visible, staged symbol in foreground.
        bowls(d)
    elif kind=="closing":
        d.rectangle((0,125,540,715),fill=(13,9,8,90))
        write(d,"MẸ KHÔNG CẦN TIỀN", (270,365),29,470,WHITE,"center","bold",42)
        write(d,"MẸ CHỈ MUỐN CON VỀ", (270,415),27,470,AMBER,"center","bold",40)
    d.rounded_rectangle((20,770,520,895),radius=19,fill=(5,8,12,220),
                        outline=(221,154,101,145),width=2)
    write(d,shot["headline"],(270,792),27,460,
          AMBER if i in (0,1,10,11,15) else WHITE,"center","bold",34)
    if kind=="note":
        write(d,"MẸ CHỈ CHỜ MỘT BỮA CƠM", (270,833),17,440,WHITE,"center","normal",25)
    if kind=="closing":
        write(d,"ĐỪNG ĐỢI ĐẾN KHI QUÁ MUỘN", (270,835),16,445,WHITE,"center","normal",24)
    d.line((28,919,512,919),fill=(81,84,93,255),width=3)
    d.line((28,919,28+round(484*(i+1)/16),919),fill=AMBER,width=4)
    d.text((30,940),f"{i+1:02d} / 16",font=font(10),fill=PALE)
    fn=WORK/f"overlay{i:02d}.png"
    im.save(fn)
    return fn

def download_stock():
    for key,pid in SRC.items():
        path=WORK/f"{key}.mp4"
        if path.exists() and path.stat().st_size>100000:continue
        url=f"https://www.pexels.com/download/video/{pid}/"
        print("STOCK SOURCE",key,pid,flush=True)
        run(["curl","-fL","--retry","3","--retry-all-errors","--connect-timeout","30",
           "--max-time","230","-A","Mozilla/5.0","-o",str(path),url])
        if path.stat().st_size<100000:raise RuntimeError("Stock download invalid "+key)

def movie():
    download_stock()
    look={
        "bowl":"alone","alone":"alone","office":"office","transfer":"office",
        "mother":"mother","calendar":"calendar","crosses":"calendar",
        "arrival":"door","note":"calendar","reaction":"office",
        "reunion":"reunion","meal":"meal","closing":"meal",
    }
    offsets={
      "alone":.3,"mother":.5,"office":1.25,"transfer":2.6,"calendar":.3,
      "crosses":2.8,"arrival":.3,"note":3.4,"reaction":3.8,"reunion":1.5,
      "meal":3.3,"bowl":1.7,"closing":5.5,
    }
    tracks=[]
    for i,shot in enumerate(CUTS):
        kind=shot["kind"]
        source=look[kind]
        path=WORK/f"{source}.mp4"
        out=WORK/f"shot{i:02d}.mp4"
        span=shot["end"]-shot["start"]
        duration=span+(FADE if i<15 else 0)
        still=overlay(i,shot)
        # Match focus/movement with real source, preserve full face rather than crop.
        vf=(
         "[0:v]fps=30,split=2[back][focus];"
         "[back]scale=540:960:force_original_aspect_ratio=increase,"
           "crop=540:960,gblur=sigma=16,eq=saturation=0.7:brightness=-0.12[b];"
         "[focus]scale=540:960:force_original_aspect_ratio=decrease,"
           "eq=contrast=1.04:saturation=0.85:brightness=-0.03[f];"
         "[b][f]overlay=(W-w)/2:(H-h)/2-30[acting];"
         "[acting][1:v]overlay=0:0:shortest=1,format=yuv420p[v]"
        )
        offset=offsets.get(kind,.3)
        run(["ffmpeg","-y","-hide_banner","-loglevel","error",
             "-stream_loop","-1","-ss",f"{offset:.2f}","-i",str(path),
             "-loop","1","-framerate","30","-i",str(still),
             "-filter_complex",vf,"-map","[v]","-an","-t",f"{duration:.3f}",
             "-r","30","-c:v","libx264","-preset","ultrafast","-crf","24",
             "-pix_fmt","yuv420p",str(out)])
        tracks.append((out,duration))
        print("SHOT",i+1,source,kind,round(duration,2),flush=True)
    inputs=["ffmpeg","-hide_banner","-loglevel","error","-y"]
    for p,_ in tracks:inputs+=["-i",str(p)]
    fades=[];last="[0:v]";at=tracks[0][1]-FADE
    for i in range(1,len(tracks)):
        dest=f"[xf{i}]"
        fades.append(f"{last}[{i}:v]xfade=transition=fade:duration={FADE}:offset={at:.6f}{dest}")
        last=dest
        if i<len(tracks)-1:at+=tracks[i][1]-FADE
    out=WORK/"picture.mp4"
    run(inputs+["-filter_complex",";".join(fades),"-map",last,
        "-t","44.000","-r","30","-an",
        "-vf","scale=1080:1920:flags=lanczos",
        "-c:v","libx264","-preset","veryfast","-crf","22",
        "-pix_fmt","yuv420p","-movflags","+faststart",str(out)])
    print("MOVIE",out,flush=True)
def piano():
    sr=32000;n=int(44*sr)
    data=np.zeros(n,dtype=np.float64)
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],
      [41,45,48],[45,48,52],[48,52,55],[48,52,57]]
    def add(key,sec,length,vol):
        beg=round(sec*sr);num=min(round(length*sr),n-beg)
        if num<=0:return
        t=np.arange(num)/sr
        hz=440*2**((key-69)/12)
        env=(1-np.exp(-t*48))*np.exp(-t*1.6)
        data[beg:beg+num]+=(np.sin(2*math.pi*hz*t)*.81+
          np.sin(2*math.pi*hz*2.01*t)*.16)*env*vol
    for i,chord in enumerate(chords):
        sec=i*5.5
        for j in range(7):
            add(chord[[0,1,2,1,0,2,1][j]]+12,sec+j*.7,2.9,.095)
        add(chord[0],sec,3.8,.1)
    ts=np.arange(n)/sr
    gain=np.interp(ts,[0,.8,9,17,23,28,33,36,40,43,44],
      [.05,.45,.58,.46,.25,.36,.14,.6,.76,.3,.0])
    music=(np.tanh(data*gain*2)*.52*32767).astype("<i2")
    out=WORK/"piano.wav"
    with wave.open(str(out),"wb") as f:
        f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr)
        f.writeframes(music.tobytes())
    print("PIANO",out,flush=True)
def sheet(out):
    # 4×4 preview made from the actual encoded frame, not the reference poster.
    contact=Image.new("RGB",(4*162,4*288),(12,14,17))
    for i in range(16):
        shot=WORK/f"shot{i:02d}.mp4"
        frame=WORK/f"qa{i:02d}.png"
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-ss","1.1",
             "-i",str(shot),"-frames:v","1",str(frame)])
        im=Image.open(frame).convert("RGB").resize((162,288),Image.Resampling.LANCZOS)
        contact.paste(im,((i%4)*162,(i//4)*288))
    out.parent.mkdir(parents=True,exist_ok=True)
    contact.save(out,quality=90)
    print("SHEET",out,flush=True)

if __name__=="__main__":
    import sys
    op=sys.argv[1]
    if op=="video":movie()
    elif op=="piano":piano()
    elif op=="sheet":sheet(Path(sys.argv[2]))
    else:raise ValueError(op)
