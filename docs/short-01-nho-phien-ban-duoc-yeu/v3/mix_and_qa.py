#!/usr/bin/env python3
"""Synchronize Vbee performance beats, duck original piano, validate final Short.

Smoke mode uses locally generated synthetic speech and checks the exact FFmpeg
filter graph before requesting paid Vbee synthesis in GitHub Actions.
"""
import argparse
import hashlib
import json
import math
import re
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parent
STORY=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
LENGTH=970/24

def duration(path):
    return float(subprocess.check_output(
        ["ffprobe","-v","error","-show_entries","format=duration",
         "-of","default=nokey=1:noprint_wrappers=1",str(path)],
        text=True).strip())

def streams(path):
    return json.loads(subprocess.check_output([
        "ffprobe","-v","error","-show_streams","-of","json",str(path)],text=True))["streams"]

def synth_test_voices(workdir):
    for i in range(len(STORY["voice"]["beats"])):
        path=workdir/f"voice{i}.mp3"
        subprocess.run(["ffmpeg","-y","-hide_banner","-loglevel","error",
            "-f","lavfi","-i",f"sine=frequency={200+i*34}:sample_rate=24000:duration=3.0",
            "-c:a","libmp3lame","-b:a","80k",str(path)],check=True)

def validate_voice(path):
    result=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",str(path),
        "-af","volumedetect","-f","null","-"],capture_output=True,text=True)
    if result.returncode:raise RuntimeError(f"Could not decode voice: {path.name}")
    m=re.search(r"max_volume:\s*(-?[0-9.]+) dB",result.stderr)
    if not m: raise RuntimeError(f"Missing voice volume measurement: {path.name}")
    db=float(m.group(1))
    if not math.isfinite(db) or db < -34:
        raise RuntimeError(f"Voice seems silent: {path.name} peak={db}dB")
    return db

def mix(workdir,out,smoke=False):
    beats=STORY["voice"]["beats"]
    starts=[float(b["start"]) for b in beats]
    if sorted(starts)!=starts or starts[0]<0 or starts[-1]>LENGTH:
        raise RuntimeError("Invalid story beat schedule")
    end_times=starts[1:]+[LENGTH-.08]
    video=workdir/"visual.mp4";piano=workdir/"piano.wav"
    if not video.exists() or not piano.exists():
        raise FileNotFoundError("Visual / original piano missing")
    video_info=streams(video)
    if not any(s.get("codec_type")=="video" and s.get("width")==1080 and s.get("height")==1920
               for s in video_info):
        raise RuntimeError("Expected 1080x1920 video")
    if abs(duration(video)-LENGTH)>.10:
        raise RuntimeError("Visual duration mismatch")
    if smoke:synth_test_voices(workdir)
    ffinput=["-i",str(video),"-i",str(piano)]
    filters=[]
    report=[]
    gains=[.99,1.02,.96,.94,1.11,1.07,1.08,1.03]
    for i,(beat,start,end) in enumerate(zip(beats,starts,end_times)):
        path=workdir/f"voice{i}.mp3"
        if not path.exists():raise FileNotFoundError(f"Missing Vbee beat: {i}")
        actual=duration(path)
        maxdb=validate_voice(path)
        available=end-start-.11
        speed=max(1.,actual/available)
        if not smoke and speed>1.31:
            raise RuntimeError(f"Beat {i} exceeds emotional timing budget ({actual:.2f}s/{available:.2f}s). Edit narration instead of rushing.")
        ffinput+=["-i",str(path)]
        filters.append(
            f"[{i+2}:a]aresample=48000,atempo={speed:.6f},"
            f"adelay={round(start*1000)}:all=1,volume={gains[i]:.3f}[v{i}]")
        report.append({"beat":i+1,"start":start,"sourceDuration":round(actual,2),
                       "tempo":round(speed,3),"maxVolumeDb":maxdb,"direction":beat["emotion"]})
    filters.append("".join(f"[v{i}]" for i in range(len(beats)))+
                   f"amix=inputs={len(beats)}:duration=longest:normalize=0[voice]")
    filters.append("[1:a]aresample=48000,volume=0.53[music]")
    filters.append("[voice]asplit=2[side][narr]")
    filters.append("[music][side]sidechaincompress=threshold=0.023:ratio=5:attack=28:release=470[duck]")
    filters.append("[duck][narr]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.92[a]")
    out.parent.mkdir(parents=True,exist_ok=True)
    command=["ffmpeg","-y","-hide_banner","-loglevel","error"]+ffinput+[
        "-filter_complex",";".join(filters),"-map","0:v:0","-map","[a]",
        "-c:v","copy","-c:a","aac","-b:a","192k","-t",f"{LENGTH:.6f}",
        "-movflags","+faststart",str(out)]
    subprocess.run(command,check=True)
    check=streams(out)
    measured=duration(out)
    kinds={stream["codec_type"] for stream in check}
    if not {"audio","video"}.issubset(kinds):
        raise RuntimeError("Final MP4 missing audio or video")
    if not 30<=measured<=45 or abs(measured-LENGTH)>.2:
        raise RuntimeError(f"Incorrect final duration {measured}")
    if out.stat().st_size<450000:
        raise RuntimeError("Final file unexpectedly small")
    if not smoke:
        digest=hashlib.sha256(out.read_bytes()).hexdigest()
        checksum=out.parent/"V3-28-SCENES-SHA256SUMS"
        checksum.write_text(f"{digest}  {out.name}\n",encoding="ascii")
        (out.parent/"V3-QA.json").write_text(json.dumps({
            "video":out.name,"durationSeconds":measured,"resolution":"1080x1920",
            "fps":24,"distinctShots":len(STORY["shots"]),"voiceBeats":len(beats),
            "speechPeakChecks":report,"technicalAVCheck":"pass",
            "subjectiveListening":"not independently verified",
            "retentionAnalytics":"unavailable until published and measured",
            "youtubePublished":False,"sha256":digest},
            ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(json.dumps({"path":str(out),"duration":measured,"bytes":out.stat().st_size,
                      "beats":report,"smoke":smoke},ensure_ascii=False,indent=2))

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--workdir",type=Path,required=True)
    p.add_argument("--out",type=Path,required=True)
    p.add_argument("--smoke",action="store_true")
    args=p.parse_args()
    mix(args.workdir,args.out,args.smoke)

if __name__=="__main__":main()
