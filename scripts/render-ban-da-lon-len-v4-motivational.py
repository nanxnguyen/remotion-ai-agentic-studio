#!/usr/bin/env python3
"""V4 motivating human action + clouds. Audio locked, never false-label FINAL."""
from __future__ import annotations
import argparse, hashlib, json, math, re, subprocess, unicodedata, wave
from pathlib import Path
import urllib.request
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT=Path("build/retro-ban-da-lon-len-v4")
ASSETS=Path("build/retro-ban-da-lon-len-clouds-v2/assets")
HUMAN=Path("build/retro-ban-da-lon-len-v4/human-assets")
VOICE=Path("build/retro-ban-da-lon-len/voice")
FPS=30
SR=48000
WIDTH,HEIGHT=1080,1920
SX,SY,SW,SH=161,521,758,490
FONT_URL="https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/BeVietnamPro-ExtraBold.ttf"
OUT=ROOT/"Ban_Da_Lon_Len_V4_HANH_TRINH_REVIEW_9x16.mp4"

# Each displayed caption is an exact consecutive subsection of the authentic Vbee text.
GROUPS=[
["Không ai vỗ tay","cho những ngày bạn cố gắng","trong im lặng."],
["Có những buổi tối,","bạn vẫn cười như không có gì,","nhưng trong lòng đã mệt","đến mức chỉ muốn biến mất","khỏi mọi ồn ào."],
["Bạn tự học cách nuốt nước mắt,","tự bước qua thất vọng,","tự đứng dậy sau những lần","chẳng ai đỡ mình.","Và rồi, bạn lớn lên lúc nào…","chính bạn cũng không để ý."],
["Nên nếu hôm nay","bạn thấy mình chưa đủ giỏi,","hãy nhớ rằng:","bạn đã trưởng thành rất nhiều","trong những ngày không ai thấy."],
["Nếu câu chuyện này chạm đến bạn,","hãy thả tim và đăng ký kênh nhé."]
]
SHOTS=[
 # file name, fraction of phrase act, seconds into clip, semantic narrative evidence
 [("walking_to_mountain",0.65,1.0,"một mình bước đi, không ai chứng kiến"),("clouds_sunrise_mountains",0.35,1.0,"khoảng trời vắng")],
 [("silhouette_sunrise",0.47,1.0,"bóng người trong hoàng hôn"),("clouds_mountain_sunset",0.24,1.2,"mây dày che sáng"),("rolling_clouds_highlands",0.29,4.0,"đứng giữa khoảng không yên tĩnh")],
 [("hiker_trail",0.39,1.0,"đang bước lên sườn núi"),("dramatic_clouds_mountains",0.22,1.4,"vượt qua thất vọng"),("hiker_trail",0.39,4.0,"tiếp tục bước sau khó khăn")],
 [("aerial_clouds_sunrise",0.31,1.2,"bầu trời mở sáng"),("mountain_peak",0.69,1.1,"đứng vững trên đỉnh núi")],
 [("sea_of_clouds_golden_hour",0.38,6.0,"khoảnh khắc bình yên"),("mountain_peak",0.62,5.2,"đứng lại đón ánh nắng")]
]

def run(*args,stdout=False):
    cmd=[str(x) for x in args]
    if stdout:return subprocess.check_output(cmd,text=True)
    subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)

def normalize(x):
    x=unicodedata.normalize("NFC",x.lower())
    return re.sub(r"[^a-zA-Z0-9À-ỹđĐ ]+"," ",x).split()

def ffprobe(path):
    return json.loads(run("ffprobe","-v","error","-show_entries",
                          "format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels,pix_fmt",
                          "-of","json",path,stdout=True))

def audio_read(mp3,out):
    run("ffmpeg","-y","-v","error","-i",mp3,"-ar",SR,"-ac","1","-c:a","pcm_s16le",out)
    with wave.open(str(out),"rb") as w:
        assert w.getframerate()==SR and w.getnchannels()==1
        data=np.frombuffer(w.readframes(w.getnframes()),dtype="<i2").astype(np.float32)/32768
    return data

def write_wave(path,data,channels=1):
    arr=np.clip(data,-.98,.98)
    ints=np.round(arr*32767).astype("<i2")
    with wave.open(str(path),"wb") as w:
        w.setnchannels(channels);w.setsampwidth(2);w.setframerate(SR);w.writeframes(ints.tobytes())

def clip_active(data):
    # 15-ms RMS speech threshold, with padding so consonant boundaries aren't clipped.
    hop=720
    usable=len(data)//hop
    energy=np.sqrt(np.mean(data[:usable*hop].reshape(usable,hop)**2,axis=1))
    smooth=np.convolve(energy,np.ones(3)/3,mode="same")
    threshold=max(0.0035,float(np.quantile(smooth,.45)*.25))
    ids=np.flatnonzero(smooth>threshold)
    if not len(ids):raise ValueError("silent Vbee audio clip")
    start=max(0,int(ids[0]*hop-SR*.09))
    end=min(len(data),int((ids[-1]+1)*hop+SR*.12))
    return start,end,float(threshold)

def font(size):
    return ImageFont.truetype(str(ROOT/"font"/"BeVietnamPro-ExtraBold.ttf"),size)

def make_assets():
    (ROOT/"font").mkdir(parents=True,exist_ok=True)
    path=ROOT/"font"/"BeVietnamPro-ExtraBold.ttf"
    if not path.exists():
        with urllib.request.urlopen(FONT_URL,timeout=35) as f:raw=f.read()
        assert raw[:4] in (b"\x00\x01\x00\x00",b"OTTO") and len(raw)>10000
        path.write_bytes(raw)
    assert ImageFont.truetype(str(path),54).getbbox("Trưởng thành • những ngày")[2]>30
    return path

def background_art():
    # Warm, cinematic room art: the CRT is a real transparency-window overlay on moving footage.
    Y=np.linspace(0,1,HEIGHT).reshape((HEIGHT,1,1))
    X=np.linspace(0,1,WIDTH).reshape((1,WIDTH,1))
    top=np.array([25.,19.,24.]).reshape(1,1,3)
    bottom=np.array([64.,40.,33.]).reshape(1,1,3)
    grad=top*(1-Y)+bottom*Y
    amber=np.exp(-((X-.8)**2/.1+(Y-.3)**2/.22))*np.array([22.,11.,2.])
    grad=np.broadcast_to(grad,(HEIGHT,WIDTH,3)).copy()+amber
    vignette=np.clip(1-.46*((X-.5)**2*2+(Y-.5)**2*1.3),.4,1)
    rgb=np.uint8(np.clip(grad*vignette,0,255))
    bg=Image.fromarray(rgb,"RGB").convert("RGBA")
    d=ImageDraw.Draw(bg,"RGBA")
    # soft-room window at back
    d.rounded_rectangle((790,190,1120,1130),radius=22,fill=(92,77,57,45))
    d.line((930,210,930,1170),fill=(194,144,76,50),width=14)
    d.line((790,570,1110,570),fill=(180,136,78,44),width=12)
    # diffuse lamp glow and plant shadows
    glow=Image.new("RGBA",(WIDTH,HEIGHT));g=ImageDraw.Draw(glow,"RGBA")
    g.ellipse((810,260,1220,720),fill=(239,161,61,55))
    glow=glow.filter(ImageFilter.GaussianBlur(120));bg=Image.alpha_composite(bg,glow)
    d=ImageDraw.Draw(bg,"RGBA")
    for i in range(8):
        x=950+i*13;y=1010+i*25
        d.ellipse((x-25,y-70,x+24,y+42),fill=(13,33,23,50))
    # textured desk horizon
    d.rounded_rectangle((-40,1126,1120,1292),radius=14,fill=(83,49,31,255))
    d.line((0,1130,1080,1130),fill=(231,171,95,105),width=7)
    d.rounded_rectangle((-5,1286,1100,1325),radius=4,fill=(33,21,22,255))
    for i in range(12):
        yy=1148+i*12
        d.line((0,yy,1080,yy+3),fill=(188,115,62,15),width=2)
    # warm base typography
    hfont=font(53);sfont=font(35)
    t1="BẠN ĐÃ LỚN LÊN"
    t2="TRONG NHỮNG NGÀY KHÔNG AI THẤY"
    w1=d.textbbox((0,0),t1,font=hfont)[2]
    w2=d.textbbox((0,0),t2,font=sfont)[2]
    d.text(((WIDTH-w1)/2,192),t1,font=hfont,fill=(255,216,163,255),stroke_width=1,stroke_fill=(68,40,25,255))
    d.text(((WIDTH-w2)/2,270),t2,font=sfont,fill=(242,224,196,240))
    d.line((360,328,720,328),fill=(231,181,110,160),width=3)
    bg.save(ROOT/"room.png")
    # Drop shadow and detailed bronze / wood CRT overlay with transparent screen hole
    front=Image.new("RGBA",(WIDTH,HEIGHT),(0,0,0,0))
    sd=Image.new("RGBA",(WIDTH,HEIGHT));q=ImageDraw.Draw(sd,"RGBA")
    q.rounded_rectangle((74,419,1004,1164),radius=79,fill=(0,0,0,175))
    sd=sd.filter(ImageFilter.GaussianBlur(37));front=Image.alpha_composite(front,sd)
    d=ImageDraw.Draw(front,"RGBA")
    d.rounded_rectangle((93,394,987,1141),radius=70,fill=(60,36,28,255),outline=(212,146,78,255),width=9)
    d.rounded_rectangle((114,418,967,1119),radius=56,fill=(114,68,39,255),outline=(210,150,87,255),width=11)
    d.rounded_rectangle((138,461,943,1048),radius=40,fill=(28,23,23,255),outline=(232,174,104,255),width=11)
    # clear the actual moving-view screen; footage behind it stays visible
    d.rounded_rectangle((SX,SY,SX+SW,SY+SH),radius=35,fill=(0,0,0,0))
    d.rounded_rectangle((SX-5,SY-5,SX+SW+5,SY+SH+5),radius=40,outline=(27,20,20,255),width=12)
    d.rounded_rectangle((142,1060,943,1120),radius=12,fill=(62,39,29,255))
    d.ellipse((180,1077,212,1109),fill=(205,149,75,255),outline=(251,206,135,255),width=3)
    d.ellipse((225,1077,258,1110),fill=(205,149,75,255),outline=(251,206,135,255),width=3)
    for i in range(8):
        xx=740+i*19
        d.line((xx,1079,xx,1103),fill=(28,20,20,240),width=4)
    # legs
    d.polygon(((222,1138),(294,1138),(279,1179),(218,1179)),fill=(37,26,24,255))
    d.polygon(((790,1138),(855,1138),(859,1179),(805,1179)),fill=(37,26,24,255))
    front.save(ROOT/"retro-frame.png")
    # Explicit rounded screen matte: sky pixels outside the CRT window MUST NOT leak.
    # Draw at 4x resolution for true anti-aliased rounded corners.
    m=Image.new("L",(SW*4,SH*4),0)
    md=ImageDraw.Draw(m)
    md.rounded_rectangle((0,0,SW*4-1,SH*4-1),radius=34*4,fill=255)
    m=m.resize((SW,SH),Image.Resampling.LANCZOS)
    m.save(ROOT/"screen-alpha.png")
    assert m.getpixel((0,0))<10 and m.getpixel((SW//2,SH//2))==255
    # CRT inner bezel/footage share a single SX,SY,SW,SH geometry.
    assert SX>140 and SY>480 and SX+SW<950 and SY+SH<1060

def make_voice():
    spoken=json.loads(Path("docs/retro-ban-da-lon-len/voice.json").read_text(encoding="utf8"))
    assert len(spoken)==len(GROUPS)==5
    for a,g in zip(spoken,GROUPS):
        assert normalize(a["narration"])==normalize(" ".join(g)),("captions are not verbatim",a["id"])
    clips=[];meta=[]
    for i,s in enumerate(spoken,1):
        p=VOICE/f"s{i}.mp3"
        assert p.exists() and p.stat().st_size>3000,("missing real Vbee",p)
        samples=audio_read(p,ROOT/f"voice{i}.wav")
        aa,bb,threshold=clip_active(samples)
        piece=samples[aa:bb]
        clips.append(piece)
        meta.append({"act":i,"text":s["narration"],"voice_source":p.name,"sha256":hashlib.sha256(p.read_bytes()).hexdigest(),"original_seconds":round(len(samples)/SR,3),"kept_seconds":round(len(piece)/SR,3),"trim_begin_seconds":round(aa/SR,3),"trim_end_seconds":round((len(samples)-bb)/SR,3),"threshold":round(threshold,5)})
    joined=[];cursor=0;act_ranges=[]
    for i,part in enumerate(clips):
        start=cursor
        joined.append(part);cursor+=len(part)
        act_ranges.append((start,cursor))
        if i<len(clips)-1:
            gap=np.zeros(int(SR*.28),dtype=np.float32)
            joined.append(gap);cursor+=len(gap)
    tail=np.zeros(int(SR*.48),dtype=np.float32)
    joined.append(tail)
    raw=np.concatenate(joined)
    # original low-level ambient chords (not copyrighted music)
    t=np.arange(len(raw),dtype=np.float32)/SR
    envelope=np.minimum(1,np.minimum(t/1.2,(len(raw)/SR-t)/1.2))
    envelope=np.clip(envelope,0,1)
    synth=(np.sin(2*np.pi*110*t)+.62*np.sin(2*np.pi*164.81*t+.2)+.38*np.sin(2*np.pi*220*t+.5))
    music=0.0055*synth*envelope*(.82+.18*np.sin(2*np.pi*t/9))
    mixed=np.stack((raw*.92+music,raw*.92+music*.92),axis=1)
    write_wave(ROOT/"mixed.wav",mixed,2)
    write_wave(ROOT/"dry-voice.wav",raw)
    total=len(raw)/SR
    return spoken,meta,act_ranges,total,len(raw)

def shotlist(act_ranges, total_samples):
    shots=[]
    for ai,definitions in enumerate(SHOTS):
        a,b=act_ranges[ai];act_frames=max(1,round((b-a)/SR*FPS))
        # Use exact frame partition; scenes cover the phrase rather than arbitrary filler.
        weights=[s[1] for s in definitions]
        counts=[round(act_frames*x/sum(weights)) for x in weights]
        counts[-1]=act_frames-sum(counts[:-1])
        for (name,w,offset,cue),frames in zip(definitions,counts):
            shots.append({"name":name,"frames":frames,"offset":offset,"cue":cue,"act":ai+1})
    # Include voice-gap frames in previous shot instead of manufacturing a new filler scene.
    bounds=[round(x[0]/SR*FPS) for x in act_ranges]+[round(total_samples/SR*FPS)]
    for ai in range(4):
        act_indices=[i for i,s in enumerate(shots) if s["act"]==ai+1]
        next_start=round(act_ranges[ai+1][0]/SR*FPS)
        present_end=sum(s["frames"] for s in shots if s["act"]<=ai+1)
        missing=next_start-present_end
        shots[act_indices[-1]]["frames"]+=missing
    total_frames=round(total_samples/SR*FPS)
    shots[-1]["frames"]+=total_frames-sum(s["frames"] for s in shots)
    assert sum(s["frames"] for s in shots)==total_frames
    assert all(s["frames"]>=20 for s in shots)
    sky_data=json.loads((ASSETS/"footage-licenses.json").read_text(encoding="utf8"))
    people_data=json.loads((HUMAN/"human-footage-manifest.json").read_text(encoding="utf8"))
    available={x["name"]:x for x in people_data}
    assert len(available)>=2,"At least two meaningful moving human clips are required"
    for s in shots:
        name=s["name"]
        if name in {"walking_to_mountain","silhouette_sunrise","hiker_trail","mountain_peak"}:
            # Prioritise correct named shot; if unavailable choose a semantically nearby
            # real-human motion clip (never swap to generic sky without marking it).
            if name not in available:
                candidates={
                  "walking_to_mountain":["hiker_trail","silhouette_sunrise","mountain_peak"],
                  "silhouette_sunrise":["walking_to_mountain","hiker_trail","mountain_peak"],
                  "hiker_trail":["walking_to_mountain","silhouette_sunrise","mountain_peak"],
                  "mountain_peak":["walking_to_mountain","hiker_trail","silhouette_sunrise"]
                }[name]
                name=next((p for p in candidates if p in available),None)
                if not name:raise ValueError("Missing real human visual beat: "+s["name"])
                s["substitute_from"]=s["name"]
                s["name"]=name
            s["source"]=available[name]["page"]
            s["asset_path"]=str(HUMAN/(name+".mp4"))
            s["type"]="human_action"
        else:
            s["source"]=next((a["page"] for a in sky_data if a["name"]==name),None)
            s["asset_path"]=str(ASSETS/(name+".mp4"))
            s["type"]="nature"
        assert s["source"] and Path(s["asset_path"]).is_file(),s
    return shots,total_frames

def build_sky(shots,frames):
    files=[]
    transition=10 # frame-matched cross dissolve
    for i,s in enumerate(shots):
        src=Path(s["asset_path"])
        dest=ROOT/f"shot_{i:02d}.mp4"
        need=s["frames"]+(transition if i<len(shots)-1 else 0)
        duration=need/FPS
        # All Pexels clips are motion video; no re-use of previous V1 imagery.
        run("ffmpeg","-y","-v","error","-ss",s["offset"],"-i",src,"-t",duration,
            "-vf",f"scale={SW}:{SH}:force_original_aspect_ratio=increase,crop={SW}:{SH},fps={FPS},setsar=1,format=yuv420p",
            "-an","-c:v","libx264","-preset","ultrafast","-crf","21","-r",FPS,"-frames:v",need,dest)
        files.append(dest)
    cmd=["ffmpeg","-y","-v","error"]
    for f in files:cmd+=["-i",str(f)]
    terms=[]
    for i in range(len(files)):
        terms.append(f"[{i}:v]settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v{i}]")
    current="v0";sumframes=0
    for i in range(1,len(files)):
        sumframes+=shots[i-1]["frames"]
        name=f"x{i}"
        terms.append(f"[{current}][v{i}]xfade=transition=fade:duration={transition/FPS:.6f}:offset={sumframes/FPS:.6f}[{name}]")
        current=name
    graph=";".join(terms)
    run(*cmd,"-filter_complex",graph,"-map",f"[{current}]","-an","-r",FPS,"-frames:v",frames,
        "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",ROOT/"sky.mp4")
    sky=ffprobe(ROOT/"sky.mp4")
    assert abs(float(sky["format"]["duration"])-frames/FPS)<.15

def asscolor(hexcode):
    rgb=hexcode.strip("#")
    return "&H00"+rgb[4:6]+rgb[2:4]+rgb[0:2]+"&"

def ass_escape(s):
    return s.replace("\\","").replace("{","").replace("}","").replace("\n","\\N")

def ass_timestamp(seconds):
    whole=int(seconds);hundredths=round((seconds-whole)*100)
    if hundredths==100:whole+=1;hundredths=0
    return f"{whole//3600:d}:{whole//60%60:02d}:{whole%60:02d}.{hundredths:02d}"

def caption_font_wrap(words,max_width=900):
    ft=font(59);pieces=[];line=[]
    d=ImageDraw.Draw(Image.new("RGBA",(1,1)))
    for w in words:
        candidate=" ".join(line+[w])
        width=d.textbbox((0,0),candidate,font=ft)[2]
        if width>max_width and line:
            pieces.append(" ".join(line));line=[w]
        else:line.append(w)
    if line:pieces.append(" ".join(line))
    assert len(pieces)<=2,("caption more than two lines",words,pieces)
    return pieces

def make_ass(spoken,act_ranges,frames):
    ass=["[Script Info]","ScriptType: v4.00+","PlayResX: 1080","PlayResY: 1920","WrapStyle: 2",
         "[V4+ Styles]",
         "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
         "Style: Main,Be Vietnam Pro,59,&H00B8DFFF,&H00F6F3EC,&H00271611,&H000E0B0A,-1,0,0,0,100,100,0,0,1,3.6,1.8,8,75,75,0,1",
         "[Events]","Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
    detail=[]
    for ai,gs in enumerate(GROUPS):
        a,b=act_ranges[ai];start=a/SR;end=b/SR
        weights=[sum(len(w) for w in g.split())+2*len(g.split()) for g in gs]
        step=(end-start)*1.0/sum(weights)
        cursor=start
        for gi,g in enumerate(gs):
            dur=step*weights[gi] if gi<len(gs)-1 else end-cursor
            words=g.split()
            pieces=caption_font_wrap(words)
            escaped=ass_escape(g)
            # Karaoke incremental syllable highlighting, paced to the measured real ACT
            # phrase boundaries are estimated, not falsely certified word timestamps.
            word_w=[max(1,len(normalize(w)[0]) if normalize(w) else len(w)) for w in words]
            time_units=max(1,int(round(dur*100)))
            # ensure valid timings, including the last syllable
            count=[max(1,int(round(time_units*w/sum(word_w)))) for w in word_w]
            count[-1]+=time_units-sum(count)
            if count[-1]<=0: count[-1]=1
            # exact phrase linewrap with karaoke tags attached to each word
            tokens=[];index=0
            for li,line in enumerate(pieces):
                for wi,w in enumerate(line.split()):
                    tokens.append("{\\kf"+str(count[index])+"}"+ass_escape(w));index+=1
                    if wi!=len(line.split())-1:tokens.append(" ")
                if li<len(pieces)-1:tokens.append("\\N")
            assert index==len(words)
            line="{\\an8\\pos(540,1417)\\fad(7,8)}"+"".join(tokens)
            ass.append(f"Dialogue: 0,{ass_timestamp(cursor)},{ass_timestamp(cursor+dur)},Main,,0,0,0,,{line}")
            detail.append({"act":ai+1,"text":g,"start":round(cursor,3),"end":round(cursor+dur,3),"timing":"estimated phrase placement over measured voice act"})
            cursor+=dur
    (ROOT/"captions.ass").write_text("\n".join(ass)+"\n",encoding="utf8")
    (ROOT/"caption-timeline.json").write_text(json.dumps(detail,ensure_ascii=False,indent=2),encoding="utf8")
    return detail

def master(frames):
    # Voice is authored once in the measured timeline. Captions are composited after visual dissolves.
    # Explicit alpha merge prevents raw rectangular footage from spilling
    # beyond rounded CRT screen edges, independent of overlay transparency.
    filt=("[0:v]format=rgba[sky];[3:v]format=gray[matte];"
          "[sky][matte]alphamerge[clipped];"
          "[1:v]format=rgba[room];[room][clipped]overlay=x="+str(SX)+":y="+str(SY)+":shortest=1[base];"
          "[base][2:v]overlay=x=0:y=0:shortest=1[frame];"
          "[frame]ass=filename="+str(ROOT/"captions.ass")+":fontsdir="+str(ROOT/"font")+"[v]")
    run("ffmpeg","-y","-v","error",
        "-i",ROOT/"sky.mp4","-loop","1","-i",ROOT/"room.png","-loop","1","-i",ROOT/"retro-frame.png",
        "-loop","1","-i",ROOT/"screen-alpha.png",
        "-i",ROOT/"mixed.wav","-filter_complex",filt,"-map","[v]","-map","4:a:0",
        "-frames:v",frames,"-r",FPS,"-c:v","libx264","-preset","veryfast","-crf","20",
        "-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-ar",SR,"-ac","2",
        "-movflags","+faststart",OUT)
    # full decoding, not merely probe
    run("ffmpeg","-v","error","-i",OUT,"-map","0:v:0","-map","0:a:0","-f","null","-")
    probe=ffprobe(OUT)
    v=next(s for s in probe["streams"] if s["codec_type"]=="video")
    a=next(s for s in probe["streams"] if s["codec_type"]=="audio")
    assert (v["width"],v["height"],v["codec_name"],v["r_frame_rate"],v["pix_fmt"])==(1080,1920,"h264","30/1","yuv420p")
    assert a["codec_name"]=="aac" and a["sample_rate"]=="48000" and a["channels"]==2
    return probe

def contact_sheet(shots,frames):
    target=ROOT/"previews";target.mkdir(exist_ok=True)
    times=[0,1.25]
    pos=0
    for s in shots:
        mid=(pos+s["frames"]/2)/FPS
        times.append(mid);pos+=s["frames"]
    times += [frames/FPS-.15]
    times=sorted(set(round(t,2) for t in times if 0<=t<frames/FPS))
    tiles=[]
    font_sm=font(18)
    for i,tm in enumerate(times):
        path=target/f"review_{i:02d}.jpg"
        run("ffmpeg","-y","-v","error","-ss",f"{tm:.3f}","-i",OUT,"-frames:v","1",path)
        im=Image.open(path).convert("RGB")
        im.thumbnail((270,480),Image.Resampling.LANCZOS)
        tile=Image.new("RGB",(290,520),"#171310")
        tile.paste(im,((290-im.width)//2,4))
        ImageDraw.Draw(tile).text((12,490),f"{tm:.2f}s",font=font_sm,fill="#eee3d4")
        tiles.append(tile)
    cols=4;rows=math.ceil(len(tiles)/cols)
    sheet=Image.new("RGB",(cols*290,rows*520),"#181412")
    for i,tile in enumerate(tiles):sheet.paste(tile,((i%cols)*290,(i//cols)*520))
    sheet.save(target/"V4_contact_sheet.jpg",quality=88)
    return len(tiles)

def main():
    ROOT.mkdir(parents=True,exist_ok=True)
    make_assets()
    make_bg=background_art()
    spoken,meta,act_ranges,total,total_samples=make_voice()
    shots,frames=shotlist(act_ranges,total_samples)
    captions=make_ass(spoken,act_ranges,frames)
    build_sky(shots,frames)
    probe=master(frames)
    count=contact_sheet(shots,frames)
    timeline={"title":"Bạn Đã Lớn Lên Trong Những Ngày Không Ai Thấy",
              "version":"V4-HUMAN-SKY-REVIEW","duration_seconds":round(float(probe["format"]["duration"]),3),
              "fps":30,"size":[1080,1920],"voice_id":"hn_female_ngochuyen_full_48k-fhg",
              "voice_source_run_id":40918739264,"cloud_source_run_id":41101547956,"human_source_run_id":41114416352,
              "voice_clips":meta,"shots":shots,"captions":captions,
              "qa":{"original_script_exact":True,"actual_genuine_vbee_mp3_provenance":True,
                    "timing_verified_to_word_frame":False,"human_audio_visual_review":False,
                    "full_media_decode":True,"codec_validated":True,
                    "contact_sheet_frame_count":count,"status":"REVIEW",
                    "known_limit":"Caption phrase/word timing is estimated from measured Vbee act durations. Meaningful human actions require manual real-frame semantic review and frame-level dialogue alignment before FINAL."}}
    (ROOT/"production-manifest-V4.json").write_text(json.dumps(timeline,ensure_ascii=False,indent=2),encoding="utf8")
    (ROOT/"youtube-title-description-V4.txt").write_text(
        "TITLE:\nBạn Đã Lớn Lên Trong Những Ngày Không Ai Thấy | Retro TV Chữa Lành\n\n"
        "DESCRIPTION:\nCó những cố gắng chẳng ai chứng kiến. Nhưng từng bước đi âm thầm đều đáng trân trọng.\n"
        "Nếu câu chuyện chạm đến bạn, hãy thả tim và đăng ký kênh nhé.\n\n"
        "HASHTAGS:\n#Shorts #ChuaLanh #RetroTV #TruongThanh\n",encoding="utf8")
    assert sum(x["type"]=="human_action" for x in shots)>=5,"Not enough human-action beats"
    print(json.dumps({"STATUS":"REVIEW","mp4":str(OUT),"size":OUT.stat().st_size,
          "sha256":hashlib.sha256(OUT.read_bytes()).hexdigest(),"duration":float(probe["format"]["duration"]),
          "caption_groups":len(captions),"shots":len(shots),"human_shots":len([x for x in shots if x.get("type")=="human_action"]),
          "full_decode":"PASS","word_level_human_certified":False},ensure_ascii=False),flush=True)

if __name__=="__main__":main()
