#!/usr/bin/env python3
"""Vbee-only narration + original piano/SFX + animation, with truthful QA."""
import argparse,json,math,hashlib,subprocess,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent
DUR=45.0
START=[0,6,13,20,28,36]
def run(c,**kw):return subprocess.run(c,check=True,**kw)
def probe(p):
 return json.loads(subprocess.check_output(["ffprobe","-v","error","-show_format","-show_streams","-of","json",str(p)],text=True))
def duration(p):return float(probe(p)["format"]["duration"])
def peaks(p):
 c=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",str(p),"-af","volumedetect","-f","null","-"],capture_output=True,text=True)
 if c.returncode:raise RuntimeError("Failed to decode Vbee narration")
 m=re.search(r"max_volume:\s*(-?[\d.]+) dB",c.stderr)
 if not m or float(m.group(1)) < -34:raise RuntimeError("Vbee audio is silent/quiet")
 return float(m.group(1))
def main():
 ap=argparse.ArgumentParser();ap.add_argument("--workdir",type=Path,required=True);ap.add_argument("--out",type=Path,required=True);args=ap.parse_args()
 work=args.workdir;out=args.out;out.parent.mkdir(parents=True,exist_ok=True)
 visual=work/"visual.mp4";piano=work/"piano.wav"
 if not visual.exists() or not piano.exists():raise FileNotFoundError("Visual / piano missing")
 vs=probe(visual)
 vv=[s for s in vs["streams"] if s["codec_type"]=="video"]
 if len(vv)!=1 or (vv[0]["width"],vv[0]["height"])!=(1080,1920):raise RuntimeError("Video geometry failed")
 if abs(duration(visual)-DUR)>.07:raise RuntimeError("Video duration wrong")
 filters=[];inputs=["-i",str(visual),"-i",str(piano)];report=[]
 for i,start in enumerate(START):
  p=work/f"voice{i}.mp3"
  if not p.exists():raise FileNotFoundError(p)
  actual=duration(p);peak=peaks(p);end=(START+[DUR])[i+1];available=end-start-.17
  tempo=max(1,actual/available)
  if tempo>1.22:raise RuntimeError(f"Vbee beat {i} too long: {actual:.2f}s in {available:.2f}s, tempo {tempo:.3f}")
  inputs.extend(["-i",str(p)])
  filters.append(f"[{i+2}:a]aresample=48000,atempo={tempo:.5f},adelay={int(start*1000)}:all=1,volume=1.05[v{i}]")
  report.append(dict(beat=i+1,start=start,sourceDurationSeconds=round(actual,3),availableSeconds=available,appliedTempo=round(tempo,4),maxVoiceDb=peak,provider="Vbee Batch"))
 filters.append("".join(f"[v{i}]" for i in range(6))+"amix=inputs=6:duration=longest:normalize=0[voice]")
 filters.append("[1:a]aresample=48000,volume=0.48[music]")
 filters.append("[voice]asplit=2[side][narr]")
 filters.append("[music][side]sidechaincompress=threshold=0.022:ratio=5:attack=25:release=400[duck]")
 filters.append("[duck][narr]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.94[a]")
 cmd=["ffmpeg","-y","-hide_banner","-loglevel","error"]+inputs+["-filter_complex",";".join(filters),"-map","0:v:0","-map","[a]","-c:v","copy","-c:a","aac","-b:a","192k","-t",str(DUR),"-movflags","+faststart",str(out)]
 run(cmd)
 meta=probe(out)
 v=[s for s in meta["streams"] if s["codec_type"]=="video"];a=[s for s in meta["streams"] if s["codec_type"]=="audio"]
 if len(v)!=1 or len(a)!=1:raise RuntimeError("Incomplete final AV streams")
 if v[0].get("codec_name")!="h264" or a[0].get("codec_name")!="aac":raise RuntimeError("Unexpected AV codecs")
 if float(meta["format"]["duration"])<44.8 or float(meta["format"]["duration"])>45.06:raise RuntimeError("Bad final duration")
 if out.stat().st_size<500000:raise RuntimeError("Unexpected MP4 size")
 sha=hashlib.sha256(out.read_bytes()).hexdigest()
 data={"status":"TECHNICAL_AUDIO_VIDEO_PASS","durationSeconds":duration(out),"videoCodec":"h264","audioCodec":"aac","dimensions":[1080,1920],"fps":30,"beats":report,"sha256":sha,"bytes":out.stat().st_size,"VbeeProvenance":"real Batch API, 6 actual mp3 files synthesized via secrets","originalScore":"procedural piano + timed SFX","animationTechnique":"frame-driven original 2D puppet motion, NOT original CGI/3D or AI video","visualSubjectiveReview":"NOT VERIFIED by watching full final video","narratorListeningReview":"NOT VERIFIED by listening to final MP4","canonicalRemotionPipelineGates":"NOT CERTIFIED","retentionMetrics":"not available before platform publish","YouTubePublished":False,"TikTokPublished":False}
 (ROOT/"final-QA.json").write_text(json.dumps(data,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
 (ROOT/"final-SHA256SUMS").write_text(sha+"  "+out.name+"\n",encoding="ascii")
 print(json.dumps(data,ensure_ascii=False,indent=2))
if __name__=="__main__":main()
