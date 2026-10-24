#!/usr/bin/env python3
"""Real stock footage edit for 92 second 60fps healing monologue.

Stock subjects are different actors: this is a poetic documentary montage, not
one fictional actress played by one person. No AI-generated moving footage.
"""
import hashlib, json, os, math, subprocess, sys, wave
from pathlib import Path

import numpy as np

HERE=Path(__file__).resolve().parent
STORY=json.loads((HERE/'story.json').read_text(encoding='utf-8'))
WORK=Path('/tmp/healing60')
SRC=WORK/'stock'; SRC.mkdir(exist_ok=True,parents=True)
SHOTS=WORK/'shots'; SHOTS.mkdir(exist_ok=True)
OUT=HERE/'output'; OUT.mkdir(exist_ok=True)
FPS=60; W=1920; H=1080; FADE=.35

def run(*args):
    subprocess.run(list(map(str,args)),check=True)

def probe(path):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries',
      'format=duration,size:stream=codec_type,width,height,r_frame_rate,avg_frame_rate',
      '-of','json',str(path)],text=True))

def ratio(s):
    from fractions import Fraction
    return float(Fraction(s))

def footage():
    source_qa={}
    for d in STORY['frames']:
        pid=d['pexelsId']; file=SRC/f'{pid}.mp4'
        if pid in source_qa:continue
        url=f'https://www.pexels.com/download/video/{pid}/'
        if not file.exists() or file.stat().st_size<100000:
            print('Download licensed Pexels source',pid,flush=True)
            run('curl','-fLSs','--retry','3','--retry-all-errors','--connect-timeout','30',
                '--max-time','240','-A','Mozilla/5.0','-o',str(file),url)
        if file.stat().st_size<100000:raise RuntimeError(f'File {pid} invalid')
        metadata=probe(file)
        vid=next((s for s in metadata['streams'] if s['codec_type']=='video'),None)
        if not vid:raise RuntimeError(f'Pexels {pid} is not decodable')
        source_qa[pid]={'source':url,'bytes':file.stat().st_size,
             'duration':float(metadata['format']['duration']),
             'width':vid['width'],'height':vid['height'],
             'nativeFps':ratio(vid['avg_frame_rate'])}
    (OUT/'stock-provenance.json').write_text(json.dumps(source_qa,indent=2)+'\n')
    return source_qa

def fontsetup():
    d=WORK/'fonts';d.mkdir(exist_ok=True)
    for weight in ('Regular','Bold'):
        file=d/f'BeVietnamPro-{weight}.ttf'
        if not file.exists():
            run('curl','-fLSs','--retry','3','-o',str(file),
                f'https://raw.githubusercontent.com/bettergui/BeVietnamPro/main/fonts/ttf/BeVietnamPro-{weight}.ttf')
        if file.stat().st_size<90000:raise RuntimeError('Missing real Be Vietnam Pro')
    # Fonts exist only in CI runner and are not redistributed in user artifacts.
    return d

def ass_script():
    def ts(t):
        cent=int(t*100+0.5)
        return f'{cent//360000}:{cent//6000%60:02d}:{cent//100%60:02d}.{cent%100:02d}'
    hdr='''[Script Info]
Title: Cinematic healing headlines with Be Vietnam Pro
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
ScaledBorderAndShadow: yes
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Quote,Be Vietnam Pro,54,&H00F3E5D9,&H00FFFFFF,&H95050B10,&H78000000,-1,0,0,0,100,100,1,0,1,3,2,2,170,170,140,1
Style: Impact,Be Vietnam Pro,74,&H009DD6FF,&H00FFFFFF,&H85070A0D,&H6A000000,-1,0,0,0,100,100,1.5,0,1,3,2,5,140,140,0,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
    events=[]
    for item in STORY['frames']:
        start,end=item['start'],item['end']
        text=item['caption'].replace(',','，')
        prefix=r'{\fad(300,350)\t(0,750,\fscx103\fscy103)}'
        events.append(f'Dialogue: 0,{ts(start)},{ts(end)},Quote,,0,0,0,,{prefix}{text}')
    # Subtle, sparse emotional punctuations, separate from lower-third subtitles.
    for start,end,text in [(0,3.7,'KIỆT SỨC'),(40.8,44.7,'ĐÁNH MẤT CHÍNH MÌNH'),(58,63.5,'BÌNH YÊN'),(84.2,91.8,'ĐỪNG BỎ RƠI CHÍNH MÌNH')]:
        text=text.replace(',','，')
        events.append(f'Dialogue: 1,{ts(start)},{ts(end)},Impact,,0,0,0,,{{\\fad(400,650)\\t(0,900,\\fscx105\\fscy105)}}{text}')
    f=WORK/'captions.ass';f.write_text(hdr+'\n'.join(events)+'\n',encoding='utf8')
    return f

def shot_reel(sources):
    paths=[]
    for i,item in enumerate(STORY['frames']):
        pid=item['pexelsId'];src=SRC/f'{pid}.mp4'
        m=sources[pid]
        interp=m['nativeFps']<48
        duration=item['end']-item['start']+(FADE if i<17 else 0)
        start=item['sourceOffset']
        if m['duration'] < .6:raise RuntimeError('Invalid stock source')
        # Source may be looped for artful repeat. We intentionally avoid synthetic character motion.
        condition='framerate=fps=60:interp_start=0:interp_end=255:scene=8.2' if interp else 'fps=60'
        color='eq=contrast=1.09:brightness=-0.04:saturation=0.78,colorbalance=bs=0.042:rs=-0.025' if i<12 else 'eq=contrast=1.04:brightness=0.018:saturation=1.06,colorbalance=rs=0.042:bs=-0.04'
        vf=f'scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720,{condition},scale=1920:1080:flags=lanczos,{color},format=yuv420p,setsar=1'
        out=SHOTS/f'shot{i+1:02d}.mp4'
        # Inserting before -i is important for audio-less source looping.
        run('ffmpeg','-y','-hide_banner','-loglevel','error','-stream_loop','-1',
            '-ss',f'{start:.2f}','-i',str(src),'-vf',vf,'-t',f'{duration:.3f}',
            '-r','60','-an','-c:v','libx264','-preset','veryfast','-crf','22',
            '-pix_fmt','yuv420p',str(out))
        if abs(float(probe(out)['format']['duration'])-duration)>.06:
            raise RuntimeError('Shot duration mismatch')
        paths.append(out)
        print('Real stock shot',i+1,pid,'source native fps',m['nativeFps'],'interpolated' if interp else 'retimed',flush=True)
    return paths

def combine(paths,fonts,ass):
    args=['ffmpeg','-y','-hide_banner','-loglevel','error']
    for p in paths:args+=['-i',str(p)]
    filters=[];last='[0:v]';offset=STORY['frames'][0]['end']-FADE+FADE-FADE # ==first shot end-FADE? first timeline 4.0
    offset=STORY['frames'][0]['end']
    for i in range(1,len(paths)):
        dest=f'[x{i}]'
        filters.append(f'{last}[{i}:v]xfade=transition=fade:duration={FADE:.2f}:offset={offset:.3f}{dest}')
        last=dest
        if i<len(paths)-1:offset=STORY['frames'][i]['end']
    filters.append(f'{last}subtitles={ass}:fontsdir={fonts},format=yuv420p[out]')
    out=WORK/'picture_60fps.mp4'
    run(*(args+['-filter_complex',';'.join(filters),'-map','[out]',
           '-t','92','-r','60','-an','-c:v','libx264','-preset','veryfast',
           '-crf','21','-movflags','+faststart',str(out)]))
    md=probe(out);vs=next(s for s in md['streams'] if s['codec_type']=='video')
    if (vs['width'],vs['height'],ratio(vs['avg_frame_rate']))!=(1920,1080,60):raise RuntimeError('Not 60 FPS 1080p')
    if abs(float(md['format']['duration'])-92)>.07:raise RuntimeError('Not 92s')
    return out

def piano():
    sr=32000;n=92*sr
    arr=np.zeros(n,dtype='float32')
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],[41,45,48],[45,48,52],[48,52,55],[45,48,52],[48,52,57],[48,52,55],[45,48,52],[48,52,57],[48,52,55],[45,48,52],[48,52,57],[48,52,55]]
    for j in range(16):
        t0=j*5.75
        for k,note in enumerate(chords[j]):
            beg=int((t0+k*.84)*sr); steps=min(int(3.3*sr),n-beg)
            if steps<=0:continue
            x=np.arange(steps,dtype=np.float32)/sr
            f=440*(2**((note+12-69)/12))
            tone=(np.sin(2*np.pi*f*x)+.17*np.sin(2*np.pi*2.002*f*x))
            env=(1-np.exp(-x*40))*np.exp(-x*1.25)
            arr[beg:beg+steps]+=.08*env*tone
    ts=np.arange(n,dtype=np.float32)/sr
    curve=np.interp(ts,[0,1,20,40,45,58,71,85,91,92],[.2,.45,.57,.5,.2,.17,.64,.54,.2,0])
    pcm=(np.clip(arr*curve*.65,-1,1)*32767).astype('<i2')
    dest=WORK/'original_piano.wav'
    with wave.open(str(dest),'wb') as f:
        f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes(pcm.tobytes())
    return dest

def mix(picture,score):
    vbee=STORY['voice']['segments']
    inputs=['-i',str(picture),'-i',str(score)]
    graph=[];measure=[]
    for i,s in enumerate(vbee):
        p=WORK/f'voice{i}.mp3'
        if not p.exists() or p.stat().st_size<1000:raise RuntimeError(f'Missing ACTUAL Vbee MP3 beat {i}')
        dur=float(probe(p)['format']['duration']);room=s['end']-s['start']-.07
        tempo=max(1,dur/room)
        if tempo>1.09:raise RuntimeError(f'Voice beat {i+1} overflows sync slot: {dur:.2f}s for {room:.2f}s')
        inputs+=['-i',str(p)]
        graph.append(f'[{i+2}:a]aresample=48000,atempo={tempo:.6f},adelay={int(s["start"]*1000)}:all=1,volume=1.08[a{i}]')
        measure.append({'beat':i+1,'recordedSeconds':round(dur,2),'slotSeconds':round(room,2),'tempo':round(tempo,3)})
    graph.append(''.join(f'[a{i}]' for i in range(8))+'amix=inputs=8:duration=longest:normalize=0[narr]')
    graph.append('[narr]asplit=2[side][voice]')
    graph.append('[1:a]aresample=48000,volume=.36[score]')
    graph.append('[score][side]sidechaincompress=threshold=.025:ratio=4:attack=18:release=320[duck]')
    graph.append('[duck][voice]amix=inputs=2:duration=first:normalize=0,alimiter=limit=.91[a]')
    out=OUT/'healing_monologue_real_life_60fps_VBEE_FINAL.mp4'
    run(*(['ffmpeg','-y','-hide_banner','-loglevel','error']+inputs+
         ['-filter_complex',';'.join(graph),'-map','0:v:0','-map','[a]',
          '-c:v','copy','-c:a','aac','-b:a','192k','-t','92','-movflags','+faststart',str(out)]))
    return out,measure

def qa(file,sources,voice):
    md=probe(file)
    stream={s['codec_type']:s for s in md['streams']}
    if not {'video','audio'}<=set(stream):raise RuntimeError('Audio and video are mandatory')
    vid=stream['video']; duration=float(md['format']['duration'])
    if (vid['width'],vid['height'])!=(1920,1080) or ratio(vid['avg_frame_rate'])!=60 or abs(duration-92)>.1:raise RuntimeError('Incorrect final spec')
    if file.stat().st_size<5_000_000:raise RuntimeError('Unexpectedly small final')
    checksum=hashlib.sha256(file.read_bytes()).hexdigest()
    report={'status':'technical-pass','file':file.name,'seconds':duration,'width':vid['width'],
            'height':vid['height'],'fps':60,'totalFrames':5520,
            'originalFootage':True,'realPersonMontage':True,'samePerformerAllShots':False,
            'sources':len(sources),'nativeSourceFrameRates':{k:v['nativeFps'] for k,v in sources.items()},
            'interpolation': 'frame blending (framerate filter) for sources below 48fps; source >=48fps retimed to 60',
            'footageUsage':'Pexels commercial license; no endorsement implied',
            'vbeeActualVoice':True,'voiceSegments':voice,'font':'Be Vietnam Pro (CI only)',
            'shotCount':18,'music':'New piano, dynamically ducked beneath Vbee',
            'humanSubjectiveReview':'pending','sha256':checksum,'bytes':file.stat().st_size,
            'youtubePublished':False}
    (OUT/'final-QA.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (OUT/'SHA256SUMS').write_text(checksum+'  '+file.name+'\n')
    print(json.dumps(report,ensure_ascii=False),flush=True)
    return report

if __name__=='__main__':
    mode=sys.argv[1]
    if mode=='video':
        meta=footage();fonts=fontsetup();cap=ass_script();parts=shot_reel(meta)
        combine(parts,fonts,cap);piano()
    elif mode=='finish':
        sources=json.loads((OUT/'stock-provenance.json').read_text())
        video,vbee=mix(WORK/'picture_60fps.mp4',WORK/'original_piano.wav')
        qa(video,sources,vbee)
    else:raise SystemExit('Use video or finish')