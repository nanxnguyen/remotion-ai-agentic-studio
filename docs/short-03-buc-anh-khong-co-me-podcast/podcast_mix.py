#!/usr/bin/env python3
"""Sync eight actual Vbee voice segments to original piano and QA final podcast."""
import argparse
import hashlib
import json
import math
import re
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
BEATS=DATA["narrator"]["segments"]
DURATION=2425/60

def run(args,**kwargs):return subprocess.check_output(args,text=True,**kwargs)
def probe(path):
    return json.loads(run(["ffprobe","-v","error","-show_entries",
       "format=duration,size:stream=codec_type,width,height,avg_frame_rate",
       "-of","json",str(path)]))
def voice_peak(path):
    p=subprocess.run(["ffmpeg","-nostats","-hide_banner","-i",str(path),
          "-af","volumedetect","-f","null","-"],
          capture_output=True,text=True)
    if p.returncode:raise RuntimeError("Voice could not be decoded: "+str(path))
    m=re.search(r"max_volume:\s*(-?[0-9.]+) dB",p.stderr)
    if not m or float(m.group(1))<-33:raise RuntimeError("Voice is missing or too quiet: "+str(path))
    return float(m.group(1))
def mix(workdir,out,smoke=False):
    vid=workdir/"visual.mp4";score=workdir/"piano.wav"
    if not vid.exists() or not score.exists():raise FileNotFoundError("visual or piano missing")
    v=probe(vid)
    video=[x for x in v["streams"] if x["codec_type"]=="video"]
    if len(video)!=1 or video[0]["avg_frame_rate"]!="60/1":raise RuntimeError("not 60fps")
    if abs(float(v["format"]["duration"])-DURATION)>.2:raise RuntimeError("bad video duration")
    if len(BEATS)!=8:raise RuntimeError("Need exactly 8 spoken beats")
    starts=[b["start"] for b in BEATS]
    ends=starts[1:]+[DURATION-.05]
    flt=[]
    inputs=["-i",str(vid),"-i",str(score)]
    proof=[]
    for i,(b,start,end) in enumerate(zip(BEATS,starts,ends)):
        audio=workdir/f"voice{i}.mp3"
        if not audio.exists():raise FileNotFoundError("Missing Vbee clip "+str(i))
        duration=float(probe(audio)["format"]["duration"])
        peak=voice_peak(audio)
        budget=end-start-.08
        if budget<=0:raise RuntimeError(f"Invalid slot {i}")
        tempo=max(1.,duration/budget)
        if tempo>1.32 and not smoke:raise RuntimeError(
            f"Vbee beat {i} too long: {duration:.2f}s for {budget:.2f}s; shorten script, do not rush emotion")
        inputs+=["-i",str(audio)]
        flt.append(f"[{i+2}:a]aresample=48000,atempo={tempo:.6f},adelay={round(start*1000)}:all=1,volume=1.05[v{i}]")
        proof.append({"beat":i+1,"duration":round(duration,3),"start":start,"tempo":round(tempo,3),"peakDb":peak})
    flt.append("".join(f"[v{i}]" for i in range(len(BEATS)))+"amix=inputs=8:duration=longest:normalize=0[voice]")
    flt.append("[voice]asplit=2[side][narr]")
    flt.append("[1:a]aresample=48000,volume=0.53[music]")
    flt.append("[music][side]sidechaincompress=threshold=0.025:ratio=5:attack=28:release=470[duck]")
    flt.append("[duck][narr]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.93[a]")
    out.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error"]+inputs+[
        "-filter_complex",";".join(flt),"-map","0:v:0","-map","[a]",
        "-c:v","copy","-c:a","aac","-b:a","192k","-t",f"{DURATION:.6f}",
        "-movflags","+faststart",str(out)]
    subprocess.run(cmd,check=True)
    info=probe(out)
    if not 30<=float(info["format"]["duration"])<=45:raise RuntimeError("Invalid Shorts duration")
    if {s["codec_type"] for s in info["streams"]}!={"audio","video"}:
        raise RuntimeError("No complete audio/video pair")
    if out.stat().st_size<450000:raise RuntimeError("Unexpectedly tiny MP4")
    if not smoke:
        sha=hashlib.sha256(out.read_bytes()).hexdigest()
        qa={"status":"technical-pass","format":"9:16 visual podcast","duration":float(info["format"]["duration"]),
         "fps":60,"sceneCount":16,"spokenBeats":len(BEATS),
         "speechChecks":proof,"hasSpokenAudio":True,"hasPianoAudio":True,
         "voiceProvider":"Vbee Thanh Long","audioListeningReview":"pending",
         "humanVisualReview":"pending","youtubePublished":False,
         "sha256":sha,"bytes":out.stat().st_size}
        (ROOT/"final-QA.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
        (ROOT/"final-SHA256SUMS").write_text(sha+"  "+out.name+"\n")
    print(json.dumps({"bytes":out.stat().st_size,"duration":info["format"]["duration"],
      "timings":proof},indent=2))
if __name__=="__main__":
    a=argparse.ArgumentParser()
    a.add_argument("--workdir",type=Path,required=True)
    a.add_argument("--out",type=Path,required=True)
    a.add_argument("--smoke",action="store_true")
    x=a.parse_args();mix(x.workdir,x.out,x.smoke)
