#!/usr/bin/env python3
"""Ray Retro TV long-form 16:9 film. Rendering uses LIVE moving Pexels footage.
Vbee voice clips MUST be synthesized first. No other TTS and no fake 60fps claims.
"""
from pathlib import Path
import json,math,random,subprocess,hashlib,wave
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter

HERE=Path(__file__).resolve().parent
DATA=json.loads((HERE/"production.json").read_text(encoding="utf-8"))
TEMP=Path("/tmp/ray_retro_long");TEMP.mkdir(parents=True,exist_ok=True)
W,H,FPS=1920,1080,60
SCR_X,SCR_Y,SCR_W,SCR_H=166,269,860,484
OVERLAP=float(DATA["frameFadeSeconds"])
BEATS=DATA["beats"]
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SERIF="/usr/share/fonts/truetype/dejavu/NotoSerif-Bold.ttf"
if not Path(SERIF).exists():SERIF=BOLD
GOLD=(255,210,122,255)
IVORY=(247,244,238,255)
SAND=(196,174,151,255)
WARM=(234,153,96,255)

def cmd(args):
    subprocess.run(args,check=True)
def fp(n,b=False,serif=False):
    return ImageFont.truetype(SERIF if serif else BOLD if b else FONT,n)
def wrap(draw,text,font,maxw):
    parts=[];last=""
    for word in text.split():
        trial=(last+" "+word).strip()
        if last and draw.textbbox((0,0),trial,font=font)[2] > maxw:
            parts.append(last);last=word
        else:last=trial
    if last:parts.append(last)
    return parts
def painttext(draw,text,x,y,size=36,maxw=940,color=IVORY,bold=False,spacing=52,center=False,serif=False):
    f=fp(size,bold,serif);lines=wrap(draw,text,f,maxw)
    for line in lines:
        ww=draw.textbbox((0,0),line,font=f)[2]
        dx=x-ww/2 if center else x
        draw.text((int(dx),int(y)),line,font=f,fill=color)
        y+=spacing
    return y
def gradient_room():
    xx=np.arange(W,dtype=np.float32)[None,:]
    yy=np.arange(H,dtype=np.float32)[:,None]
    warmth=np.exp(-(((xx-1650)/810)**2+((yy-300)/570)**2))*32
    edge=np.clip(1-np.hypot((xx-960)/1800,(yy-450)/970),.1,1)
    grain=np.random.default_rng(1254).normal(0,2.6,(H,W))
    col=np.zeros((H,W,3),dtype=np.uint8)
    for i,(base,weight) in enumerate([(21,1.0),(19,.63),(23,.3)]):
        col[:,:,i]=np.clip((base+warmth*weight+grain)*edge,0,255).astype(np.uint8)
    room=Image.fromarray(col,"RGB").convert("RGBA")
    d=ImageDraw.Draw(room,"RGBA")
    # Warm window and desk props; landscape adaptation of V17 without reuse of old baked words.
    d.rounded_rectangle((1505,95,1867,631),radius=15,fill=(64,42,28,118),outline=(171,110,62,145),width=6)
    for x in [1517,1682,1853]:
        d.line((x,105,x,621),fill=(170,112,63,105),width=5)
    d.line((1514,366,1860,366),fill=(170,112,63,95),width=5)
    d.ellipse((1595,180,1795,380),fill=(231,167,90,55))
    d.rectangle((0,980,W,H),fill=(68,41,26,180))
    for y in [991,1036]:
        d.line((0,y,W,y),fill=(213,142,84,38),width=3)
    d.ellipse((1289,947,1581,1047),fill=(8,8,11,90))
    d.ellipse((1370,955,1511,1029),fill=(226,190,147,180),outline=(126,78,49,220),width=4)
    d.ellipse((1395,957,1489,1015),fill=(74,48,35,235))
    # The black/bronze TV dominates the left side, with curved frame and real knobs.
    d.rounded_rectangle((68,186,1173,823),radius=65,fill=(14,14,17,255),outline=(161,103,62,245),width=12)
    d.rounded_rectangle((105,223,1057,780),radius=48,fill=(79,51,35,255),outline=(226,156,93,225),width=8)
    d.rounded_rectangle((147,250,1040,759),radius=44,fill=(7,14,20,255),outline=(22,22,24,255),width=17)
    for cy in [405,566]:
        d.ellipse((1084,cy-47,1178,cy+47),fill=(14,15,18,255),outline=(198,133,79,255),width=8)
        d.ellipse((1106,cy-27,1156,cy+27),fill=(108,76,55,255),outline=(242,191,114,240),width=3)
        d.line((1131,cy-19,1131,cy-3),fill=(252,215,153,245),width=4)
    d.text((954,784),"by ray simple",font=fp(20),fill=(241,188,124,255))
    d.line((145,815,1120,815),fill=(236,163,104,95),width=2)
    # reserve darker, clearly separated zone below the CRT for captions
    d.rounded_rectangle((102,835,1196,967),radius=20,fill=(6,7,10,220),outline=(170,119,83,100),width=2)
    d.rounded_rectangle((1210,178,1868,849),radius=36,fill=(8,10,16,205),outline=(156,102,69,115),width=3)
    return room
def bezel_overlay():
    layer=Image.new("RGBA",(W,H))
    d=ImageDraw.Draw(layer,"RGBA")
    d.rounded_rectangle((147,250,1040,759),radius=44,outline=(7,8,11,240),width=17)
    d.rounded_rectangle((157,258,1034,753),radius=30,outline=(242,184,118,70),width=3)
    d.arc((170,274,1020,725),192,257,fill=(250,229,194,35),width=5)
    return layer
def graphic(i,half):
    beat=BEATS[i]
    layer=Image.new("RGBA",(W,H))
    d=ImageDraw.Draw(layer,"RGBA")
    act=beat["act"]
    d.text((1260,212),f"CHƯƠNG 0{['HOOK','THÂN','CAO TRÀO','KẾT'].index(act)+1} / {act}",
       font=fp(25,True),fill=(244,191,129,255))
    d.line((1260,258,1815,258),fill=(228,166,100,155),width=2)
    if i<5:
        painttext(d,"ĐỪNG BỎ RƠI",1260,285,58,525,IVORY,True,75)
        painttext(d,"CHÍNH MÌNH",1260,360,64,560,GOLD,True,78)
    else:
        painttext(d,"BÌNH YÊN",1260,285,72,560,IVORY,True,80)
        painttext(d,"BẮT ĐẦU TỪ BẠN",1260,373,41,570,GOLD,True,55)
    d.text((1260,501),"TỪ LỜI KỂ...",font=fp(21),fill=(170,167,162,255))
    quote=["Đừng sống chỉ để được chấp nhận.",
      "Bạn cũng có quyền nói không.",
      "Ngay cả bạn cũng cần được hỏi han.",
      "Đừng nhường đến khi mất mình.",
      "Người thương bạn không đòi bạn kiệt sức.",
      "Một khoảng nghỉ cũng đáng được nâng niu.",
      "Không sao nếu hôm nay bạn mệt.",
      "Chọn mình là bắt đầu bình yên."][i]
    painttext(d,quote,1260,549,36,548,IVORY,False,54,False,True)
    d.line((1260,745,1805,745),fill=(196,125,79,120),width=2)
    d.text((1260,777),"Một chút dịu dàng với chính mình",font=fp(21),fill=(188,170,155,255))
    headline=beat["visualA"] if half==0 else beat["visualB"]
    size=47 if len(headline)<26 else 39
    painttext(d,headline,649,858,size,1030,GOLD,True,57,True)
    d.line((149,944,1151,944),fill=(75,74,76,255),width=4)
    d.line((149,944,149+int(((i*2+half+1)/16)*1002),944),fill=GOLD,width=6)
    layer.save(TEMP/f"fg_{i}_{half}.png")
    return TEMP/f"fg_{i}_{half}.png"

def create_assets():
    gradient_room().save(TEMP/"room.png")
    bezel_overlay().save(TEMP/"bezel.png")
    for i in range(8):
        for half in [0,1]:graphic(i,half)

def getstock():
    for b in BEATS:
        id=b["stock"];p=TEMP/f"stock_{id}.mp4"
        if p.exists() and p.stat().st_size>100000:continue
        url=f"https://www.pexels.com/download/video/{id}/"
        print("Pexels",id,flush=True)
        cmd(["curl","-fL","--retry","4","--retry-all-errors","--connect-timeout","30",
           "--max-time","240","-A","Mozilla/5.0",
           "-o",str(p),url])
        if not p.exists() or p.stat().st_size<100000:raise RuntimeError(f"Invalid stock video: {id}")
        z=probe(p);assert any(v["codec_type"]=="video" for v in z["streams"])
def probe(p):
    return json.loads(subprocess.check_output(["ffprobe","-v","error",
      "-show_entries","format=duration,size:stream=codec_type,width,height,avg_frame_rate",
      "-of","json",str(p)],text=True))
def voice_duration(i):
    p=TEMP/f"voice_{i}.mp3"
    if not p.exists():raise FileNotFoundError(f"Real Vbee voice missing: {p}")
    return float(probe(p)["format"]["duration"])
def audio_build():
    # Decode Vbee originals and create human-paced gaps.
    rate=48000
    timeline=[];utterance=[];parts=[];now=.24
    for i,b in enumerate(BEATS):
        inp=TEMP/f"voice_{i}.mp3"
        wav=TEMP/f"voice_{i}.wav"
        cmd(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(inp),
          "-ar",str(rate),"-ac","1","-c:a","pcm_s16le",str(wav)])
        with wave.open(str(wav),"rb") as f:
            data=np.frombuffer(f.readframes(f.getnframes()),dtype="<i2").astype(np.float32)/32768
        if len(data)<int(rate*2):raise RuntimeError("Vbee voice too short")
        duration=len(data)/rate
        utterance.append({"beat":i+1,"start":round(now,3),"seconds":round(duration,3)})
        timeline.append({"id":i,"start":now,"duration":duration})
        parts.append(data)
        now+=duration
        if i<7:parts.append(np.zeros(round(rate*DATA["betweenBeatsPauseSeconds"]),dtype=np.float32));now+=DATA["betweenBeatsPauseSeconds"]
    start=np.zeros(round(rate*DATA["openingPauseSeconds"]),dtype=np.float32)
    end=np.zeros(round(rate*DATA["endPauseSeconds"]),dtype=np.float32)
    voice=np.concatenate([start]+parts+[end])
    dur=len(voice)/rate
    if not 61<dur<125:raise RuntimeError("Final runtime outside requested >1min length: "+str(dur))
    n=len(voice)
    music=np.zeros(n,dtype=np.float32)
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],
      [45,48,52],[41,45,48],[48,52,55],[48,52,57]]
    def tone(midi,sec,loud=.07):
        pos=int(sec*rate)
        length=min(int(rate*3.0),n-pos)
        if length<=0:return
        tt=np.arange(length,dtype=np.float32)/rate
        fq=440*2**((midi-69)/12)
        envelope=(1-np.exp(-tt*52))*np.exp(-tt*1.6)
        v=(np.sin(2*math.pi*fq*tt)*.83+np.sin(4*math.pi*fq*tt)*.16)*envelope*loud
        music[pos:pos+length]+=v
    for index,b in enumerate(timeline):
        t=b["start"];ch=chords[index]
        count=math.ceil(b["duration"]/.65)
        for j in range(count):tone(ch[[0,1,2,1,0,2,1][j%7]]+12,t+j*.65,.084)
        tone(ch[0],t,.10)
    # Programmatic ducking of piano whenever spoken words are present.
    gain=np.full(n,.33,dtype=np.float32)
    for x in timeline:
        a=max(0,int((x["start"]-.25)*rate));b=min(n,int((x["start"]+x["duration"]+.22)*rate))
        gain[a:b]=.19
    # Smooth attack/release in O(n); never run a quadratic window loop.
    a_len=round(rate*.17);r_len=round(rate*.34)
    for x in timeline:
        st=round(x["start"]*rate);en=round((x["start"]+x["duration"])*rate)
        a=max(0,st-a_len);end=min(n,en+r_len)
        if st>a:gain[a:st]=np.linspace(.33,.19,st-a,dtype=np.float32)
        if end>en:gain[en:end]=np.linspace(.19,.33,end-en,dtype=np.float32)
    mix=np.tanh(voice*.99+music*gain)
    mix=np.clip(mix*.88,-.95,.95)
    outfile=TEMP/"mixed.wav"
    with wave.open(str(outfile),"wb") as f:
        f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate)
        f.writeframes((mix*32767).astype("<i2").tobytes())
    (HERE/"voice-timing.json").write_text(json.dumps(utterance,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    return timeline,dur

def shot_render(timeline):
    bg=TEMP/"room.png";bezel=TEMP/"bezel.png"
    scenes=[]
    for i,item in enumerate(timeline):
        shotlen=(item["duration"]+DATA["betweenBeatsPauseSeconds"] if i<7 else item["duration"]+DATA["endPauseSeconds"])
        if i==0:shotlen+=DATA["openingPauseSeconds"]
        split=shotlen/2
        for j in (0,1):
            length=split+(OVERLAP if not(i==7 and j==1) else 0)
            out=TEMP/f"shot_{i}_{j}.mp4"
            src=TEMP/f"stock_{BEATS[i]['stock']}.mp4"
            in_offset=.4 if j==0 else 2.2
            flt=(
             f"[0:v]fps=60,scale={SCR_W}:{SCR_H}:force_original_aspect_ratio=increase,"
             f"crop={SCR_W}:{SCR_H},eq=contrast=1.08:saturation=0.83[scene];"
             f"[1:v][scene]overlay={SCR_X}:{SCR_Y}:shortest=1[pic];"
             f"[pic][2:v]overlay=0:0:shortest=1[crt];"
             f"[crt][3:v]overlay=0:0:shortest=1,format=yuv420p[v]")
            cmd(["ffmpeg","-y","-hide_banner","-loglevel","error",
               "-stream_loop","-1","-ss",str(in_offset),"-i",str(src),
               "-loop","1","-framerate","60","-i",str(bg),
               "-loop","1","-framerate","60","-i",str(bezel),
               "-loop","1","-framerate","60","-i",str(TEMP/f"fg_{i}_{j}.png"),
               "-filter_complex",flt,"-map","[v]","-an",
               "-t",f"{length:.5f}","-r","60","-c:v","libx264","-preset","ultrafast","-crf","25",
               "-pix_fmt","yuv420p",str(out)])
            scenes.append((out,length))
            print("shot",i,j,"duration",round(length,2),flush=True)
    # 15 true dissolves, no hard jumps and no reusing the reference video's image.
    args=["ffmpeg","-y","-hide_banner","-loglevel","error"]
    for p,_ in scenes:args+=["-i",str(p)]
    filt=[];prev="[0:v]";at=scenes[0][1]-OVERLAP
    for i in range(1,len(scenes)):
        nxt=f"[a{i}]"
        filt.append(f"{prev}[{i}:v]xfade=transition=fade:duration={OVERLAP}:offset={at:.6f}{nxt}")
        prev=nxt
        if i<len(scenes)-1:at+=scenes[i][1]-OVERLAP
    output=TEMP/"picture.mp4"
    cmd(args+["-filter_complex",";".join(filt),"-map",prev,
       "-c:v","libx264","-preset","veryfast","-crf","22","-pix_fmt","yuv420p",
       "-r","60","-an","-movflags","+faststart",str(output)])
    return output

def archive(p,timeline,duration):
    final=HERE/"final"/"retro-tv-dung-bo-roi-chinh-minh-full-hd60-vbee.mp4"
    final.parent.mkdir(exist_ok=True,parents=True)
    cmd(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(p),
      "-i",str(TEMP/"mixed.wav"),"-map","0:v:0","-map","1:a:0",
      "-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000",
      "-t",f"{duration:.3f}","-movflags","+faststart",str(final)])
    info=probe(final)
    v=next(z for z in info["streams"] if z["codec_type"]=="video")
    assert (v["width"],v["height"],v["avg_frame_rate"]) == (1920,1080,"60/1"), v
    assert {x["codec_type"] for x in info["streams"]}=={"audio","video"}
    d=float(info["format"]["duration"])
    assert d>60.0 and abs(d-duration)<.18,(d,duration)
    # Contact sheet of actual output; source at 25–60FPS, container is rendered 60.
    sheet=Image.new("RGB",(4*480,4*270),(9,9,11))
    timestamps=[]
    for x in timeline:
        timestamps+=[x["start"]+x["duration"]*.22,x["start"]+x["duration"]*.74]
    for i,t in enumerate(timestamps):
        png=TEMP/f"qa{i:02d}.png"
        cmd(["ffmpeg","-y","-hide_banner","-loglevel","error","-ss",str(t),
          "-i",str(final),"-frames:v","1",str(png)])
        still=Image.open(png).convert("RGB").resize((480,270),Image.Resampling.LANCZOS)
        sheet.paste(still,((i%4)*480,(i//4)*270))
    sheet.save(HERE/"qa-contact-sheet.jpg",quality=89)
    # Thumbnail deliberately unique to long-form, not a grid or old reference's frame.
    thumb=Image.open(TEMP/"room.png").convert("RGB").resize((1280,720),Image.Resampling.LANCZOS)
    dr=ImageDraw.Draw(thumb)
    dr.rounded_rectangle((800,150,1254,490),radius=25,fill=(5,8,14),outline=(216,158,99),width=3)
    painttext(dr,"ĐỪNG BỎ RƠI",820,213,47,430,IVORY,True,62)
    painttext(dr,"CHÍNH MÌNH",820,286,51,430,GOLD,True,65)
    painttext(dr,"VÌ LÀM VUI LÒNG TẤT CẢ",820,382,20,412,IVORY,True,38)
    thumb.save(HERE/"thumbnail-long-1280x720.jpg",quality=93)
    sha=hashlib.sha256(final.read_bytes()).hexdigest()
    meta={"status":"technical-pass","file":str(final.relative_to(HERE)),"duration":d,
      "resolution":"1920x1080","outputFps":60,"sourceFps":"Pexels varies (typically 24-60fps), 60fps output can contain resampled frames",
      "shots":16,"crossfadeSeconds":OVERLAP,"voice":"Actual Vbee Thanh Long via Batch API: eight verified MP3s",
      "music":"Original synthesized piano score with ducking",
      "fullAudioVideoDecode":"pending" ,"externalVisualReview":"pending",
      "stockSourceIds":[x["stock"] for x in BEATS],
      "sha256":sha,"bytes":final.stat().st_size,"youtubePublished":False,
      "timecodes":json.loads((HERE/"voice-timing.json").read_text(encoding="utf-8"))}
    (HERE/"production-manifest.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("FINAL",json.dumps({"duration":d,"size":meta["bytes"],"sha256":sha}),flush=True)
    return final

def metadata():
    content="""TITLE:
Đừng Bỏ Rơi Chính Mình Để Làm Vừa Lòng Tất Cả | Chữa Lành

ALTERNATIVE TITLES:
1. Người Bị Bạn Bỏ Quên Lâu Nhất… Là Chính Mình
2. Bạn Không Cần Làm Hài Lòng Cả Thế Giới Để Được Yêu

DESCRIPTION:
Có khi điều khiến bạn kiệt sức không phải cuộc sống, mà là nỗ lực làm vừa lòng tất cả. Video này là một lời nhắc nhẹ: bạn cũng được phép nghỉ, được nói không, và được lựa chọn sự bình yên của mình.

Nếu bạn đang mệt, hãy giữ lại cho mình một khoảng lặng. Bạn không cần hoàn hảo để xứng đáng được yêu thương.

Bạn có từng quên chăm sóc chính mình vì muốn người khác vui không? Hãy chia sẻ nếu cảm thấy thoải mái.

HASHTAGS:
#ChuaLanh #SongChoBanThan #RetroTV #PodcastCamXuc

TAGS:
chữa lành, yêu bản thân, ranh giới cá nhân, podcast cảm xúc, làm hài lòng người khác, phát triển bản thân, trầm lắng, retro tv, động lực sống, bình yên

THUMBNAIL_TEXT:
ĐỪNG BỎ RƠI CHÍNH MÌNH

FORMAT:
16:9 Full HD 60fps; tệp voice Vbee Thanh Long được đồng bộ sau khi tổng hợp.
"""
    (HERE/"youtube-title-description.txt").write_text(content,encoding="utf-8")
if __name__=="__main__":
    create_assets()
    getstock()
    timeline,duration=audio_build()
    metadata()
    silent=shot_render(timeline)
    archive(silent,timeline,duration)
