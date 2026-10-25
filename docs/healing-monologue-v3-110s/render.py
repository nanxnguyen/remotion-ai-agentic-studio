#!/usr/bin/env python3
"""V3 workprint from verified-footage Pexels sources, real Vbee MP3 and original score.
Stock footage has mixed actors, therefore this is a review cut, not cast-consistent FINAL.
No artificial claim of native 60fps. Requires 10 voice MP3 generated separately.
"""
from pathlib import Path
import os,json,subprocess,hashlib,math,wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parent
WORK=Path("/tmp/healing_v3")
WORK.mkdir(parents=True,exist_ok=True)
STORY=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
FPS=30
W,H=960,540
DISSOLVE=.30
TARGET=STORY["duration"]
OUT=ROOT/"preview"/"healing-v3-real-footage-vbee-110s-review.mp4"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def run(args):
    subprocess.run(args,check=True)
def meta(path):
    return json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries",
         "format=duration,size:stream=codec_type,codec_name,width,height,avg_frame_rate",
         "-of","json",str(path)],text=True))
def check_story():
    assert TARGET==110 and len(STORY["shots"])==20 and len(STORY["storyBeats"])==10
    for group in (STORY["shots"],STORY["storyBeats"]):
        assert group[0]["start"]==0 and group[-1]["end"]==TARGET
        assert all(group[i]["end"]==group[i+1]["start"] for i in range(len(group)-1))
    print("PRECHECK: 110s, 20 shots, 10 voice beats",flush=True)
def download():
    import urllib.request
    for key,pid in STORY["sources"].items():
        src=WORK/f"raw-{key}.mp4"
        proxy=WORK/f"{key}.mp4"
        if proxy.exists() and proxy.stat().st_size>100_000:continue
        url=f"https://www.pexels.com/download/video/{pid}/"
        print("GET SOURCE:",key,pid,flush=True)
        run(["curl","-fLsS","--retry","3","--retry-all-errors",
             "--connect-timeout","25","--max-time","360","-A","Mozilla/5.0",
             "-o",str(src),url])
        if src.stat().st_size<100_000:raise RuntimeError("Invalid download: "+key)
        info=meta(src)
        if not any(s["codec_type"]=="video" for s in info["streams"]):
            raise RuntimeError("Not a video: "+key)
        # Work with low-resolution mezzanine for 20-shot montage; NO fabricated actor motion.
        run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(src),
             "-vf","fps=30,scale=960:540:force_original_aspect_ratio=decrease",
             "-an","-r","30","-c:v","libx264","-preset","ultrafast","-crf","25",
             "-pix_fmt","yuv420p",str(proxy)])
        if proxy.stat().st_size<100_000:raise RuntimeError("Proxy empty: "+key)
        print("SOURCE VERIFIED",key,"seconds",info["format"]["duration"],"bytes",proxy.stat().st_size,flush=True)
def overlay(i,shot):
    im=Image.new("RGBA",(W,H),(0,0,0,0));d=ImageDraw.Draw(im,"RGBA")
    # Safe readable lower third (no faux film poster text).
    d.rounded_rectangle((44,420,916,505),radius=18,fill=(5,9,16,210),
                        outline=(207,150,99,105),width=2)
    f=ImageFont.truetype(FONT,27 if len(shot["headline"])<25 else 23)
    txt=shot["headline"]
    left=max(52,int((W-d.textbbox((0,0),txt,font=f)[2])/2))
    d.text((left,449),txt,font=f,fill=(247,229,205,255))
    d.text((46,26),"LỚN RỒI... ĐỪNG BỎ RƠI CHÍNH MÌNH",font=ImageFont.truetype(FONT,16),
           fill=(246,226,203,220))
    d.line((44,525,916,525),fill=(121,125,135,190),width=3)
    d.line((44,525,44+int((872*shot["end"])/TARGET),525),
          fill=(234,177,115,250),width=4)
    dest=WORK/f"overlay{i:02}.png";im.save(dest)
    return dest
def picture():
    download()
    tracks=[]
    for i,shot in enumerate(STORY["shots"]):
        source=WORK/f'{shot["source"]}.mp4'
        available=float(meta(source)["format"]["duration"])
        start=min(max(0,float(shot["trim"])),max(0,available-1.5))
        span=shot["end"]-shot["start"]+(DISSOLVE if i<19 else 0)
        stamp=overlay(i,shot)
        target=WORK/f"shot{i:02}.mp4"
        fc=("[0:v]fps=30,split=2[a][b];"
            "[a]scale=960:540:force_original_aspect_ratio=increase,crop=960:540,"
            "gblur=sigma=12,eq=brightness=-0.035[back];"
            "[b]scale=960:540:force_original_aspect_ratio=decrease,"
            "eq=contrast=1.06:saturation=.87[front];"
            "[back][front]overlay=(W-w)/2:(H-h)/2[sc];"
            "[sc][1:v]overlay=0:0:shortest=1,format=yuv420p[v]")
        run(["ffmpeg","-y","-hide_banner","-loglevel","error","-stream_loop","-1",
             "-ss",str(start),"-i",str(source),
             "-loop","1","-framerate","30","-i",str(stamp),
             "-filter_complex",fc,"-map","[v]","-t",f"{span:.3f}",
             "-an","-r","30","-c:v","libx264","-preset","ultrafast","-crf","23",
             "-pix_fmt","yuv420p",str(target)])
        tracks.append((target,span))
        print("SHOT COMPLETE",i+1,shot["source"],span,flush=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error"]
    for f,_ in tracks:cmd+=["-i",str(f)]
    pos=tracks[0][1]-DISSOLVE;last="[0:v]";filters=[]
    for i in range(1,len(tracks)):
        target=f"[xf{i}]"
        filters.append(f"{last}[{i}:v]xfade=transition=fade:duration={DISSOLVE}:offset={pos:.6f}{target}")
        last=target
        if i < len(tracks)-1:pos+=tracks[i][1]-DISSOLVE
    filters.append(f"{last}scale=1920:1080:flags=lanczos[vout]")
    target=WORK/"picture.mp4"
    run(cmd+["-filter_complex",";".join(filters),"-map","[vout]","-t","110",
             "-r","30","-c:v","libx264","-preset","veryfast","-crf","24",
             "-pix_fmt","yuv420p","-an","-movflags","+faststart",str(target)])
    print("PICTURE READY",target,flush=True)
def score():
    sr=32000;n=int(TARGET*sr)
    sound=np.zeros(n,dtype=np.float64)
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],[48,52,55],[45,48,52],[48,52,55],[48,52,57]]
    def note(mid,at,length,volume):
        st=int(at*sr);q=min(int(length*sr),n-st)
        if q<=0:return
        t=np.arange(q)/sr;freq=440*(2**((mid-69)/12))
        env=(1-np.exp(-t*60))*np.exp(-t*1.35)
        sound[st:st+q]+=volume*env*(np.sin(2*np.pi*freq*t)+0.18*np.sin(2*np.pi*2.003*freq*t))
    for i in range(20):
        at=i*5.5;ch=chords[i%len(chords)]
        for j in range(7):
            note(ch[[0,1,2,1,0,2,1][j]]+12,at+j*.73,2.8,.10)
        note(ch[0],at,3.5,.10)
    t=np.arange(n)/sr
    gain=np.interp(t,[0,10,29,41,53,64,70,76,87,94,99,108,110],
                   [.10,.46,.63,.40,.34,.20,.06,.46,.55,.40,.65,.43,0])
    aud=(np.clip(np.tanh(sound*gain*2),-1,1)*.54*32767).astype("<i2")
    f=WORK/"piano.wav"
    with wave.open(str(f),"wb") as h:
        h.setnchannels(1);h.setsampwidth(2);h.setframerate(sr)
        h.writeframes(aud.tobytes())
    print("PIANO READY",flush=True)
def mix():
    picture=WORK/"picture.mp4";score=WORK/"piano.wav"
    if not picture.exists() or not score.exists():raise RuntimeError("Missing picture/score")
    args=["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(picture),"-i",str(score)]
    filters=[];report=[]
    for i,beat in enumerate(STORY["storyBeats"]):
        clip=WORK/f"voice{i:02}.mp3"
        if not clip.exists() or clip.stat().st_size<2000:raise RuntimeError("Missing genuine Vbee "+str(clip))
        actual=float(meta(clip)["format"]["duration"])
        slot=beat["end"]-beat["start"]-0.12
        tempo=max(1,actual/slot)
        if tempo>1.17:raise RuntimeError(f"Voice beat {i+1} too long: {actual:.2f}s for {slot:.2f}s; rewrite rather than chopping audio.")
        args+=["-i",str(clip)]
        filters.append(f"[{i+2}:a]aresample=48000,atempo={tempo:.6f},"
                       f"adelay={int(beat['start']*1000)}:all=1,volume=1.06[v{i}]")
        report.append({"beat":i+1,"duration":actual,"tempo":tempo,"slot":slot})
    filters.append("".join(f"[v{i}]" for i in range(10))+"amix=inputs=10:duration=longest:normalize=0[narr]")
    filters.extend(["[narr]asplit=2[side][spoken]",
        "[1:a]aresample=48000,volume=.43[bed]",
        "[bed][side]sidechaincompress=threshold=.022:ratio=5:attack=18:release=420[duck]",
        "[duck][spoken]amix=inputs=2:duration=first:normalize=0,alimiter=limit=.89[finalAudio]"])
    OUT.parent.mkdir(exist_ok=True,parents=True)
    run(args+["-filter_complex",";".join(filters),
              "-map","0:v:0","-map","[finalAudio]","-t","110",
              "-c:v","copy","-c:a","aac","-b:a","192k",
              "-ar","48000","-ac","2","-movflags","+faststart",str(OUT)])
    p=meta(OUT);v=[s for s in p["streams"] if s["codec_type"]=="video"]
    a=[s for s in p["streams"] if s["codec_type"]=="audio"]
    if len(v)!=1 or len(a)!=1:raise RuntimeError("Missing AV streams")
    assert (v[0]["width"],v[0]["height"],v[0]["avg_frame_rate"])==(1920,1080,"30/1")
    assert abs(float(p["format"]["duration"])-110)<.2
    qa={"status":"REVIEW_CUT—not actor-consistent FINAL", "file":OUT.name,
        "durationSeconds":float(p["format"]["duration"]),"resolution":[1920,1080],
        "fps":30,"actorContinuity":"stock actors vary; human review required",
        "native60fps":False,"voice":"Genuine Vbee Thanh Long from 10 asynchronous Batch API requests",
        "voiceBeats":report,"sourcePexelsIds":STORY["sources"],
        "piano":"original synthetic arpeggio with dynamic mix","youtubePublished":False,
        "sha256":hashlib.sha256(OUT.read_bytes()).hexdigest(),"bytes":OUT.stat().st_size}
    (ROOT/"preview"/"QA.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("REVIEW_MP4_READY",json.dumps(qa,ensure_ascii=False),flush=True)
if __name__=="__main__":
    import sys
    check_story()
    op=sys.argv[1]
    if op=="picture":picture()
    elif op=="score":score()
    elif op=="mix":mix()
    else:raise SystemExit(f"Unknown action {op}")
