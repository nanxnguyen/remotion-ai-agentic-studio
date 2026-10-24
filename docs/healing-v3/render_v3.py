#!/usr/bin/env python3
"""6m30 real-stock-footage editor. FFmpeg picture, original piano, Vbee narration.

IMPORTANT: This demo uses illustrative real footage, but NOT a single continuous actress.
Each shot's provenance is recorded in v3-project.json. Render to 30 fps because
most verified source footage is 24/25/30/50 fps, NOT native 60 fps.
"""
import concurrent.futures
import hashlib
import json
import math
import os
import subprocess
import sys
import urllib.request
import wave
from pathlib import Path

PROJECT = Path(__file__).with_name('v3-project.json')
P = json.loads(PROJECT.read_text(encoding='utf-8'))
WORK = Path(os.environ.get('HEALING_V3_WORK','/tmp/healing-v3'))
WORK.mkdir(parents=True,exist_ok=True)
VID = WORK/'stock'
SHOTS = WORK/'shots'
CHAPTERS = WORK/'chapters'
VOICE = WORK/'voice'
for d in (VID,SHOTS,CHAPTERS,VOICE):d.mkdir(exist_ok=True)
FPS = 30
W,H = 1920,1080
FADE = 0.3


def cmd(args):
    print('RUN', ' '.join(str(x) for x in args[:12]), flush=True)
    subprocess.run([str(x) for x in args],check=True)


def probe(path):
    return json.loads(subprocess.check_output([
        'ffprobe','-v','error','-show_entries',
        'format=duration,size:stream=codec_type,width,height,avg_frame_rate',
        '-of','json',str(path)],text=True))


def validate():
    assert P['chapterDurationSeconds']==390 and len(P['shots'])==52
    assert len(P['vbeeSegments'])==26 and len(P['footage'])>=15
    assert all(s['start'] == i*7.5 and s['end']==(i+1)*7.5 for i,s in enumerate(P['shots']))
    assert all(s['start']==i*15 and s['end']==(i+1)*15 for i,s in enumerate(P['vbeeSegments']))
    assert all(s['key'] in {c['key'] for c in P['footage']} for s in P['shots'])
    assert sum(len(s['text'].split()) for s in P['vbeeSegments'])>=800
    print('CONTRACT_OK: 390s, 52 scenes, 26 voice segments, mixed native fps / honest 30fps deliverable')


def download_one(c):
    path=VID/(c['key']+'.mp4')
    if path.exists() and path.stat().st_size>100_000:return path
    # Official downloadable asset endpoint for verified Pexels ID.
    url=f'https://www.pexels.com/download/video/{c["id"]}/'
    tmp=path.with_suffix('.tmp')
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; FilmArchive/1.0)'})
    try:
        with urllib.request.urlopen(req,timeout=150) as r, tmp.open('wb') as out:
            while b:=r.read(1024*512):out.write(b)
        if tmp.stat().st_size<100_000:raise RuntimeError(f'Source too small: {url}')
        info=probe(tmp)
        if not any(s['codec_type']=='video' for s in info['streams']):raise RuntimeError(f'Not a movie: {url}')
        tmp.rename(path)
        print('DOWNLOADED',c['key'],path.stat().st_size,flush=True)
        return path
    finally:
        if tmp.exists():tmp.unlink()


def download():
    # Prefer prior cached files in the selected runner; concurrent to save build time.
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futs={pool.submit(download_one,c):c['key'] for c in P['footage']}
        errors=[]
        for f in concurrent.futures.as_completed(futs):
            try:f.result()
            except Exception as e:errors.append((futs[f],str(e)))
    if errors:raise RuntimeError('Missing footage. DO NOT publish a still-image substitute: '+repr(errors))


def shot(i,scene):
    key=scene['key']; src=VID/(key+'.mp4')
    dest=SHOTS/f'shot{i:02}.mp4'
    if dest.exists() and dest.stat().st_size>100_000:return
    local=i%4
    dur=7.5+(FADE if local!=3 else 0)
    # Multiple positions for shot reused from same licensed film; always genuine actor-body footage.
    offset=(i//4)%3 * 2.2
    vf=(f'fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=fast_bilinear,'
        f'crop={W}:{H},setsar=1,eq=contrast=1.04:saturation={0.83 if i<26 else 0.97}:'
        f'brightness={-0.025 if i<26 else 0.004},format=yuv420p')
    cmd(['ffmpeg','-y','-hide_banner','-loglevel','error','-stream_loop','-1',
         '-ss',f'{offset:.2f}','-i',src,'-vf',vf,'-t',f'{dur:.3f}',
         '-r',str(FPS),'-an','-c:v','libx264','-preset','ultrafast',
         '-crf','25','-pix_fmt','yuv420p',dest])
    print('SHOT',i, key,flush=True)


def picture():
    all_shots=P['shots']
    for i,s in enumerate(all_shots):shot(i,s)
    outputs=[]
    for group in range(13):
        output=CHAPTERS/f'chapter{group:02}.mp4'
        groupclips=[SHOTS/f'shot{j:02}.mp4' for j in range(group*4,group*4+4)]
        if not output.exists() or output.stat().st_size<100_000:
            # Exactly 30s after 3 × 0.3s dissolves.
            f=('[0:v][1:v]xfade=transition=fade:duration=0.3:offset=7.5[a];'
               '[a][2:v]xfade=transition=fade:duration=0.3:offset=15[b];'
               '[b][3:v]xfade=transition=fade:duration=0.3:offset=22.5,format=yuv420p[v]')
            inputs=[]
            for src in groupclips:inputs+=['-i',str(src)]
            cmd(['ffmpeg','-y','-hide_banner','-loglevel','error']+inputs+
                ['-filter_complex',f,'-map','[v]','-t','30','-an','-r',str(FPS),
                 '-c:v','libx264','-preset','ultrafast','-crf','24',output])
        outputs.append(output)
        print('CHAPTER',group+1,flush=True)
    manifest=WORK/'chapters.txt'
    manifest.write_text(''.join("file '"+str(f)+"'\n" for f in outputs))
    dest=WORK/'picture.mp4'
    cmd(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',manifest,
         '-map','0:v:0','-c','copy','-movflags','+faststart',dest])
    info=probe(dest)
    assert abs(float(info['format']['duration'])-390)<.30,info
    print('PICTURE_DONE',dest,flush=True)


def piano():
    # A newly written, copyright-free synthesized piano underscore.
    import numpy as np
    sr=32000;length=390
    x=np.zeros(sr*length,dtype=np.float64)
    notes=[[45,48,52],[43,47,50],[41,45,48],[48,52,55]]
    def add(key,t0,secs,level):
        a=int(t0*sr); k=min(int(secs*sr),len(x)-a)
        if k<=0:return
        t=np.arange(k)/sr; freq=440*2**((key-69)/12)
        env=(1-np.exp(-t*40))*np.exp(-t*1.55)
        x[a:a+k]+=level*env*(.82*np.sin(2*np.pi*freq*t)+.12*np.sin(2*np.pi*freq*2.01*t))
    for i in range(67):
        start=i*5.8; chord=notes[i%4]
        for j,idx in enumerate([0,1,2,1,0,2]):add(chord[idx]+12,start+j*.8,2.7,.085)
        add(chord[0],start,4,.075)
    gain=np.interp(np.arange(len(x))/sr,[0,15,90,140,198,220,315,375,390],[.2,.52,.55,.28,.15,.45,.65,.36,0])
    samples=(np.clip(np.tanh(x*gain*2.2)*.62,-1,1)*32767).astype('<i2')
    out=WORK/'piano.wav'
    with wave.open(str(out),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
        w.writeframes(samples.tobytes())
    print('PIANO_DONE',out,flush=True)


def vbee_segments():
    # Only genuine real API calls; webhook is the existing project callback.
    legacy=Path('docs/short-01-nho-phien-ban-duoc-yeu/voice/vbee_batch_tts.py')
    if not legacy.exists():raise FileNotFoundError(legacy)
    for i,seg in enumerate(P['vbeeSegments']):
        file=VOICE/f'voice{i:02}.mp3'
        if file.exists() and file.stat().st_size>1000:continue
        textfile=VOICE/f'beat{i:02}.txt'
        textfile.write_text(seg['text'],encoding='utf8')
        cmd(['python3',legacy,'--text-file',textfile,
             '--voice-code',P['targetVoice'],'--speed','1.01',
             '--attempts','90','--output',file])
    print('VOICE_DONE',len(P['vbeeSegments']),flush=True)


def mix():
    picture=WORK/'picture.mp4'; score=WORK/'piano.wav'
    assert picture.exists() and score.exists()
    inp=['-i',str(picture),'-i',str(score)]
    chain=[];trace=[]
    for i,seg in enumerate(P['vbeeSegments']):
        file=VOICE/f'voice{i:02}.mp3'
        length=float(probe(file)['format']['duration'])
        target=14.65 # leave 0.35s for breath
        ratio=max(1.0, length/target)
        if ratio>1.30:raise RuntimeError(f'Beat {i} long {length:.2f}s vs 15s. Rewrite text, do not speed up unacceptably')
        inp+=['-i',str(file)]
        chain.append(f'[{i+2}:a]aresample=48000,atempo={ratio:.6f},'
                     f'adelay={i*15000}:all=1,volume=1.03[v{i}]')
        trace.append({'beat':i+1,'nativeSeconds':length,'tempo':round(ratio,4),'start':seg['start']})
    chain.append(''.join(f'[v{i}]' for i in range(26))+'amix=inputs=26:duration=longest:normalize=0[voice]')
    chain+=['[1:a]aresample=48000,volume=0.28[bg]',
            '[bg][voice]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.89[out]']
    output=WORK/'stock-film-with-real-vbee.mp4'
    cmd(['ffmpeg','-y','-hide_banner','-loglevel','error']+inp+[
        '-filter_complex',';'.join(chain),'-map','0:v:0','-map','[out]',
        '-c:v','copy','-c:a','aac','-b:a','192k','-ac','2','-ar','48000',
        '-t','390','-movflags','+faststart',output])
    detail=probe(output)
    assert 389.7<float(detail['format']['duration'])<390.3
    Path(WORK/'voice-trace.json').write_text(json.dumps(trace,ensure_ascii=False,indent=2))
    print('MIX_DONE',str(output),flush=True)


def qa(file=None):
    file=Path(file or str(WORK/'stock-film-with-real-vbee.mp4'))
    assert file.exists()
    p=probe(file)
    assert abs(float(p['format']['duration'])-390)<.35
    stream=next(s for s in p['streams'] if s['codec_type']=='video')
    assert stream['width']==1920 and stream['height']==1080
    assert any(s['codec_type']=='audio' for s in p['streams'])
    sha=hashlib.sha256(file.read_bytes()).hexdigest()
    out={'status':'technical-pass / human-review-pending','name':file.name,
         'durationSeconds':float(p['format']['duration']),'resolution':[1920,1080],
         'fps':30,'native60Guarantee':False,'footageCount':len(P['footage']),
         'stockActorsNotConsistent':True,'vbee':P['targetVoice'],
         'scenes':52,'fileSize':file.stat().st_size,'sha256':sha,
         'limitations':['Footage from multiple actors; not one continuous cast',
                        '30fps is deliberate due to source mixed FPS',
                        'Human aesthetic QA pending','Not published to YouTube']}
    (WORK/'QA.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    print('QA',json.dumps(out,ensure_ascii=False),flush=True)

if __name__=='__main__':
    task=sys.argv[1]
    globals()[task](*sys.argv[2:])