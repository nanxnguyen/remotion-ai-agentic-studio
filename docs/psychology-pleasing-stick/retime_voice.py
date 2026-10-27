#!/usr/bin/env python3
"""Retimes measured long Vbee inter-line gaps without synthetic voice substitution."""
from pathlib import Path
from array import array
import subprocess,json,hashlib,os,wave,math
ROOT=Path(__file__).resolve().parent
mp3=ROOT/'psychology-people-pleasing-VBEE.mp3'
pauses=[(6.252562,7.411927),(10.202132,11.395102),(14.358095,15.495828),(18.639002,19.816417),(22.925079,24.074512),(27.355828,28.506259),(31.330522,32.458277),(39.43746,40.609342)]
start=[0]+[b-.08 for a,b in pauses]
end=[a+.08 for a,b in pauses]+[43.8]
gap=.24
src=subprocess.check_output(['ffmpeg','-v','error','-i',str(mp3),'-ac','1','-ar','48000','-f','s16le','-'])
samples=array('h');samples.frombytes(src)
segments=[];out=array('h');edges=[0.0]
for i,(s,e) in enumerate(zip(start,end)):
    frag=samples[round(s*48000):min(len(samples),round(e*48000))]
    out.extend(frag)
    if i<len(start)-1:out.extend(array('h',[0])*round(gap*48000))
    edges.append(len(out)/48000)
    segments.append([float(s),float(e),len(frag)/48000])
voice=ROOT/'voice-clean-48k.wav'
with wave.open(str(voice),'wb') as o:
    o.setnchannels(1);o.setsampwidth(2);o.setframerate(48000);o.writeframes(out.tobytes())
# Original gentle score. Generative oscillator, not stock copyrighted music.
score=ROOT/'psychology-music-48k.wav'
notes=[220,246.94,261.63,196,174.61,220,261.63,246.94,196,220]
frames=len(out)+round(.50*48000)
with wave.open(str(score),'wb') as o:
    o.setnchannels(1);o.setsampwidth(2);o.setframerate(48000)
    chunk=array('h');last=0
    for i in range(frames):
        t=i/48000;index=int(t//3.6)%len(notes);n=notes[index];local=t%3.6
        env=(1-math.exp(-min(.1,local)*55))*math.exp(-local/2.5)
        fade=min(1,t/1.2,(frames-i)/(48000*.7))
        value=.055*fade*env*(.75*math.sin(2*math.pi*n*t)+.25*math.sin(2*math.pi*(n*2)*t))
        value+=.009*fade*math.sin(2*math.pi*55*t)
        chunk.append(int(max(-.9,min(.9,value))*32767))
        if len(chunk)>=48000:
            o.writeframes(chunk.tobytes());chunk=array('h')
    if chunk:o.writeframes(chunk.tobytes())
# JSON checked-in separately under measured original; compare runtime to avoid divergence.
info=json.loads((ROOT/'timing.json').read_text())
assert abs(edges[-1]-info['voiceDuration'])<.005,(edges,info)
assert len(edges)==10
print(json.dumps({'actualVoiceDuration':len(out)/48000,'sceneEdges':edges,'sha256OriginalVbee':hashlib.sha256(mp3.read_bytes()).hexdigest(),'scoreBytes':score.stat().st_size},ensure_ascii=False))
