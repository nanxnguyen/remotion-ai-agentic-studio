#!/usr/bin/env python3
"""Combine genuine eight-beat Vbee Thanh Long with original emotional piano.

No fallback speech. Strict checks before publishing to repository/vidIQ.
"""
import hashlib,json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parent
WORK=Path("/tmp/short05")
DATA=json.loads((ROOT/"story.json").read_text(encoding="utf8"))
BEATS=DATA["voice"]["segments"]
TARGET=DATA["durationSeconds"]
OUT=ROOT/"final"/"short05-me-chi-muon-con-ve-v2-cinematic-vbee.mp4"

def check(cmd):
    return subprocess.run(cmd,check=True,capture_output=True,text=True)
def probe(p):
    return json.loads(check(["ffprobe","-v","error","-show_entries",
     "format=duration,size:stream=codec_type,width,height,avg_frame_rate",
     "-of","json",str(p)]).stdout)
def vol(p):
    q=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",str(p),
      "-af","volumedetect","-f","null","-"],capture_output=True,text=True)
    if q.returncode:raise RuntimeError("Cannot decode audio: "+str(p))
    match=re.search(r"max_volume:\s*(-?[0-9.]+) dB",q.stderr)
    if not match or float(match.group(1))<-35:raise RuntimeError("Missing or inaudible voice: "+str(p))
    return float(match.group(1))
def run():
    video=WORK/"picture.mp4";score=WORK/"piano.wav"
    if not video.exists() or not score.exists():raise FileNotFoundError("Missing video or piano")
    vp=probe(video);stream=[s for s in vp["streams"] if s["codec_type"]=="video"][0]
    if stream["width"]!=1080 or stream["height"]!=1920 or stream["avg_frame_rate"]!="30/1":
        raise RuntimeError("Failed 9:16 1080p 30fps video")
    if abs(float(vp["format"]["duration"])-TARGET)>.18:raise RuntimeError("Incorrect video length")
    inputs=["-i",str(video),"-i",str(score)];graph=[];report=[]
    for i,beat in enumerate(BEATS):
        audio=WORK/f"voice{i}.mp3"
        if not audio.exists():raise FileNotFoundError("Vbee clip missing "+str(audio))
        duration=float(probe(audio)["format"]["duration"])
        peak=vol(audio)
        end=BEATS[i+1]["start"] if i<len(BEATS)-1 else TARGET
        slot=end-beat["start"]-.09
        if slot<=0:raise RuntimeError("Invalid speech timing")
        tempo=max(1,duration/slot)
        if tempo>1.28:raise RuntimeError(
          f"Voice {i+1} too long ({duration:.2f}s for {slot:.2f}s). Rewrite speech to preserve emotion.")
        inputs+=["-i",str(audio)]
        graph.append(f"[{i+2}:a]aresample=48000,atempo={tempo:.6f},"
          f"adelay={round(beat['start']*1000)}:all=1,volume=1.03[v{i}]")
        report.append({"beat":i+1,"start":beat["start"],"recordedSeconds":round(duration,3),
            "slotSeconds":round(slot,3),"tempo":round(tempo,3),"peakDb":peak})
    graph.append("".join(f"[v{i}]" for i in range(len(BEATS)))+
                 "amix=inputs=8:duration=longest:normalize=0[narr]")
    graph.append("[narr]asplit=2[side][voice]")
    graph.append("[1:a]aresample=48000,volume=0.54[score]")
    graph.append("[score][side]sidechaincompress=threshold=0.022:ratio=5:attack=22:release=450[duck]")
    graph.append("[duck][voice]amix=inputs=2:duration=first:normalize=0,"
                 "alimiter=limit=0.93[out]")
    OUT.parent.mkdir(parents=True,exist_ok=True)
    check(["ffmpeg","-hide_banner","-loglevel","error","-y"]+inputs+
     ["-filter_complex",";".join(graph),"-map","0:v:0","-map","[out]",
      "-c:v","copy","-c:a","aac","-b:a","192k","-t",str(TARGET),
      "-movflags","+faststart",str(OUT)])
    p=probe(OUT)
    if {s["codec_type"] for s in p["streams"]}!={"audio","video"}:raise RuntimeError("Missing audio/video track")
    seconds=float(p["format"]["duration"])
    if not 43.7<seconds<44.3:raise RuntimeError("Failed 44s runtime")
    if OUT.stat().st_size<1000000:raise RuntimeError("Unexpectedly small MP4")
    peak=vol(OUT)
    sha=hashlib.sha256(OUT.read_bytes()).hexdigest()
    qa={"status":"technical-pass","title":DATA["title"],"file":OUT.name,
      "durationSeconds":seconds,"resolution":[1080,1920],"fps":30,
      "scenes":16,"transitionSeconds":.38,
      "voice":"Real Vbee Thanh Long","actualVoiceBeats":len(BEATS),
      "voiceTimings":report,"finalAudioPeakDb":peak,
      "music":"Original piano ducked below narration",
      "realMotion":"Live-action Pexels videos underlaid, no synthetic lip sync",
      "castContinuity":"Stock cast varies between settings; not certified single-actor continuity",
      "props":"Custom two bowls, bank receipt, crossed calendar and handwritten note overlays",
      "humanVisualReview":"pending","humanAudioReview":"pending",
      "youtubePublished":False,
      "sha256":sha,"bytes":OUT.stat().st_size}
    (ROOT/"final-QA.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    (ROOT/"final-SHA256SUMS").write_text(sha+"  "+OUT.name+"\n",encoding="ascii")
    print(json.dumps({"file":OUT.name,"seconds":seconds,"sha256":sha,"bytes":OUT.stat().st_size,"voices":report},ensure_ascii=False),flush=True)
if __name__=="__main__":run()
