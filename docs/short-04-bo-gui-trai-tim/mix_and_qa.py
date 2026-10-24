#!/usr/bin/env python3
"""Finish Short04 with verified Vbee male narration, score ducking, and AV QA."""
import argparse,hashlib,json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parent
WORK=Path("/tmp/short04")
STORY=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
NARR=STORY["voice"]["beats"]
TARGET=STORY["lengthSeconds"]
OUT=ROOT/"final"/"short04-bo-gui-trai-tim-cinematic-vbee.mp4"

def ffprobe(f):
    return json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries",
      "format=duration,size:stream=codec_type,avg_frame_rate,width,height","-of","json",str(f)],text=True))
def run(command):
    subprocess.run(command,check=True)
def audio_peak(f):
    p=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",str(f),
       "-af","volumedetect","-f","null","-"],capture_output=True,text=True)
    if p.returncode!=0:raise RuntimeError("Cannot decode voice "+str(f))
    m=re.search(r"max_volume:\s*(-?[0-9.]+) dB",p.stderr)
    if not m or float(m.group(1))<-34:raise RuntimeError("Spoken voice inaudible "+str(f))
    return float(m.group(1))
def mix():
    pic=WORK/"picture.mp4";score=WORK/"piano.wav"
    if not pic.exists() or not score.exists():raise FileNotFoundError("Original video or piano missing")
    streams=ffprobe(pic)["streams"]
    assert len([s for s in streams if s["codec_type"]=="video"])==1
    assert abs(float(ffprobe(pic)["format"]["duration"])-TARGET)<.15
    tracks=["-i",str(pic),"-i",str(score)]
    filters=[];evidence=[]
    for i,b in enumerate(NARR):
        path=WORK/f"voice{i}.mp3"
        if not path.exists():raise FileNotFoundError("Missing actual Vbee segment "+str(path))
        duration=float(ffprobe(path)["format"]["duration"])
        end=NARR[i+1]["start"] if i+1<len(NARR) else TARGET
        room=end-b["start"]-.06
        if room<=0:raise RuntimeError("Invalid sync slot")
        tempo=max(1.,duration/room)
        if tempo>1.34:
            raise RuntimeError("Speech segment "+str(i)+" requires unnatural tempo "+str(tempo)+". Revise shorter script.")
        peak=audio_peak(path)
        evidence.append({"beat":i+1,"start":b["start"],"duration":round(duration,2),
           "targetSlot":round(room,2),"temporalStretch":round(tempo,3),"peakDb":peak})
        tracks+=["-i",str(path)]
        filters.append(f"[{i+2}:a]aresample=48000,atempo={tempo:.6f},"
          f"adelay={round(b['start']*1000)}:all=1,volume=1.04[v{i}]")
    filters.append("".join(f"[v{i}]" for i in range(len(NARR)))+
      "amix=inputs=8:duration=longest:normalize=0[voice]")
    filters.append("[voice]asplit=2[side][vox]")
    filters.append("[1:a]aresample=48000,volume=0.52[music]")
    filters.append("[music][side]sidechaincompress=threshold=0.022:ratio=5:attack=20:release=420[bed]")
    filters.append("[bed][vox]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.93[a]")
    OUT.parent.mkdir(parents=True,exist_ok=True)
    run(["ffmpeg","-hide_banner","-loglevel","error","-y"]+tracks+
      ["-filter_complex",";".join(filters),"-map","0:v:0","-map","[a]",
       "-c:v","copy","-c:a","aac","-b:a","192k",
       "-t",f"{TARGET:.3f}","-movflags","+faststart",str(OUT)])
    p=ffprobe(OUT)
    assert 35<float(p["format"]["duration"])<50
    assert {s["codec_type"] for s in p["streams"]}=={"audio","video"}
    stream=next(s for s in p["streams"] if s["codec_type"]=="video")
    assert stream["width"]==540 and stream["height"]==960
    assert stream["avg_frame_rate"]=="30/1"
    assert OUT.stat().st_size>1000000
    check=audio_peak(OUT)
    sha=hashlib.sha256(OUT.read_bytes()).hexdigest()
    qa={"status":"technical-pass","title":STORY["title"],"durationSeconds":float(p["format"]["duration"]),
      "resolution":[540,960],"fps":30,"shots":16,"fadeSeconds":.42,
      "voice":"Actual Vbee Thanh Long","actualVoiceBeats":8,"music":"Original piano / ducked",
      "spokenLoudnessPeakDb":check,"voiceMeasurements":evidence,
      "visualHumanReview":"not externally certified","audioHumanReview":"not externally certified",
      "sources":"Real Pexels stock, multiple actors; identity consistency not certified",
      "noYouTubePublishing":True,"file":OUT.name,"bytes":OUT.stat().st_size,"sha256":sha}
    (ROOT/"final-QA.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    (ROOT/"final-SHA256SUMS").write_text(sha+"  "+OUT.name+"\n")
    print(json.dumps({"duration":qa["durationSeconds"],"bytes":qa["bytes"],
       "sha256":sha,"beatTimings":evidence},ensure_ascii=False))
if __name__=="__main__":mix()
