#!/usr/bin/env python3
"""Night->dawn pad BGM, deterministic, no 3rd-party audio. 60 BPM, 4 s bars.
Bars 0-11 (0-48s) A minor, dark/sparse; bars 12-14 (48-60s) C major, brighter. Usage: gen_night.py out.mp3 [sec=62]"""
import subprocess, sys, tempfile, wave
from pathlib import Path
import numpy as np
SR=44100; BAR=4.0
out=Path(sys.argv[1]); total=float(sys.argv[2]) if len(sys.argv)>2 else 62.0
hz=lambda m:440.0*2**((m-69)/12)
MIN=[(45,[57,60,64]),(41,[57,60,65]),(43,[59,62,67]),(40,[56,59,64])]   # Am F G E
MAJ=[(48,[60,64,67]),(43,[59,62,67]),(45,[60,64,69])]                    # C G Am
n=int(total*SR); mix=np.zeros(n)
def env(L,a,r):
    e=np.ones(L); A,R=int(a*SR),int(r*SR); e[:A]=np.linspace(0,1,A); e[-R:]*=np.linspace(1,0,R); return e
for b in range(int(total/BAR)+1):
    bass,ch=(MIN[b%4] if b<12 else MAJ[(b-12)%3]); dawn=b>=12
    s0=int(b*BAR*SR); L=min(int(BAR*1.5*SR),n-s0)
    if L<=0: break
    tt=np.arange(L)/SR; e=env(L,1.6,1.8)
    for m in ch:
        for d in (-0.1,0.1): mix[s0:s0+L]+=0.05*e*np.sin(2*np.pi*hz(m+d)*tt)
    mix[s0:s0+L]+=0.07*e*np.sin(2*np.pi*hz(bass)*tt)
    # sparse bell/piano: night = 2 notes/bar, dawn = 4 notes/bar an octave up
    pat=[(0,ch[2]+12),(2.0,ch[1]+12)] if not dawn else [(0,ch[0]+24),(1,ch[2]+12),(2,ch[1]+24),(3,ch[2]+24)]
    for beat,m in pat:
        p0=s0+int(beat*SR); pl=min(int(3.0*SR),n-p0)
        if pl<=0: continue
        pt=np.arange(pl)/SR; f=hz(m)
        tone=np.sin(2*np.pi*f*pt)+0.25*np.sin(4*np.pi*f*pt)+0.06*np.sin(6*np.pi*f*pt)
        mix[p0:p0+pl]+=(0.05 if dawn else 0.04)*tone*np.exp(-pt*(2.0 if dawn else 1.6))*np.minimum(1,pt/0.006)
mix*=env(n,3.0,4.0); mix/=np.abs(mix).max()*1.15
pcm=(np.stack([mix,mix],1)*32767).astype(np.int16)
with tempfile.TemporaryDirectory() as td:
    w=Path(td)/"b.wav"
    with wave.open(str(w),"wb") as f: f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes(pcm.tobytes())
    subprocess.run(["ffmpeg","-v","error","-y","-i",str(w),"-af","lowpass=f=4200,aecho=0.8:0.7:180|400|700:0.35|0.25|0.15,loudnorm=I=-20:TP=-2","-ar","44100","-b:a","160k",str(out)],check=True)
