#!/usr/bin/env python3
"""Objective scene-seam and visual visibility checks for 60fps Short #17."""
import argparse
import json
import subprocess
from pathlib import Path
import numpy as np

FRAMES=2550
FPS=60
DURATIONS=[144,126,174,168,162,168,174,198,168,150,144,168,180,150,132,144]
assert sum(DURATIONS)==FRAMES
BOUNDARIES=np.cumsum(DURATIONS)[:-1]
W,H=120,213
PIXELS=W*H*3

def check(movie:Path,target:Path)->None:
    cmd=["ffmpeg","-hide_banner","-loglevel","error","-i",str(movie),
         "-vf",f"scale={W}:{H}:flags=area","-f","rawvideo","-pix_fmt","rgb24","-"]
    process=subprocess.Popen(cmd,stdout=subprocess.PIPE)
    prior=None
    events=[]
    max_jump=0.0
    n=0
    assert process.stdout
    while True:
        packet=process.stdout.read(PIXELS)
        if not packet:break
        if len(packet)!=PIXELS:raise RuntimeError("Partial decoded RGB frame")
        now=np.frombuffer(packet,dtype=np.uint8).astype(np.int16)
        if prior is not None:
            delta=float(np.mean(np.abs(now-prior)))
            if any(abs(n-int(b))<=3 for b in BOUNDARIES):
                events.append({"frame":n,"time":round(n/FPS,3),"pixelMeanDelta":round(delta,4)})
                max_jump=max(max_jump,delta)
        prior=now
        n+=1
    rc=process.wait()
    if rc:raise RuntimeError("FFmpeg decoder failed")
    if abs(n-FRAMES)>2:raise RuntimeError(f"Wrong frame count {n} vs {FRAMES}")
    if max_jump>24:
        raise RuntimeError(f"Possible abrupt scene transition: pixel delta {max_jump:.2f}")
    result={"status":"technical-pass","fps":FPS,"frames":n,"scenes":16,
            "sceneBoundaries":len(BOUNDARIES),"maxBoundaryPixelMeanDelta":round(max_jump,4),
            "boundaryFrames":events,
            "limitation":"Pixel continuity check does not replace viewing the film"}
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(result,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in result.items() if k!="boundaryFrames"},indent=2))

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--video",required=True,type=Path)
    p.add_argument("--out",required=True,type=Path)
    a=p.parse_args()
    check(a.video,a.out)
