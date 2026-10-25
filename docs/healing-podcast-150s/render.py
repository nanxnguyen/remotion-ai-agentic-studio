#!/usr/bin/env python3
"""150s film podcast. Natural video-source motion, exact original audio 0-64.6,
licensed Vbee Thanh Long on new text, original piano extension. 30fps H264."""
import json,os,math,hashlib,subprocess,wave
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw,ImageFont
P=Path(__file__).resolve().parent; J=json.loads((P/'production.json').read_text(encoding='utf8'))
T=Path('/tmp/healing150');T.mkdir(exist_ok=True,parents=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',27)
W,H=960,540;FPS=30;DISS=.30;RATE=48000
def ff(a):subprocess.run(a,check=True)
def meta(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_type,width,height,avg_frame_rate','-of','json',str(p)],text=True))
def downloads():
    got=[];issues=[]
    for id in J['stockSources']:
        p=T/f'{id}.mp4'
        try:
            if not p.exists() or p.stat().st_size<100000:
                print('GET SOURCE',id,flush=True)
                ff(['curl','-fsSL','--retry','4','--retry-all-errors','--connect-timeout','30','--max-time','210','-A','Mozilla/5.0','-o',str(p),'https://www.pexels.com/download/video/'+id+'/'])
            if p.stat().st_size<100000:raise ValueError('under-size')
            if not any(s['codec_type']=='video' for s in meta(p)['streams']):raise ValueError('invalid video')
            got.append(id)
        except Exception as e:issues.append([id,str(e)[:100]]);p.unlink(missing_ok=True)
    if len(got)<5:raise RuntimeError('Not enough moving stock media: '+str(issues))
    (P/'stock-QA.json').write_text(json.dumps({'downloaded':got,'failed':issues},indent=2)+'\n')
    return got
def wavdata(f):
    pcm=T/(f.stem+'.pcm')
    ff(['ffmpeg','-y','-loglevel','error','-i',str(f),'-ar',str(RATE),'-ac','2','-f','s16le',str(pcm)])
    return np.fromfile(pcm,dtype='<i2').reshape(-1,2).astype('float32')/32768
def tone(a,sec,note,vol=.05):
    i=round(sec*RATE);N=min(round(RATE*3.5),len(a)-i)
    if N<=0:return
    t=np.arange(N,dtype=np.float32)/RATE;freq=440*2**((note-69)/12)
    e=(1-np.exp(-t*30))*np.exp(-t*1.65)
    a[i:i+N]+=((np.sin(t*2*np.pi*freq)*.82+np.sin(t*4*np.pi*freq)*.16)*e*vol)
def build_audio():
    org=T/'original.mp4'
    if not org.exists():raise FileNotFoundError('Original uploaded clip not downloaded')
    original=float(meta(org)['format']['duration'])
    if not 64.3<original<64.9:raise ValueError('Expected the 64.6s source')
    old=wavdata(org)[:round(original*RATE)]
    voices=[];times=[]
    for i,txt in enumerate(J['voiceExtension']):
        f=T/f'vbee_{i:02d}.mp3'
        if not f.exists():raise RuntimeError('REAL Vbee missing '+str(f))
        a=wavdata(f);voices.append(a)
    voice_s=sum(len(a)/RATE for a in voices)
    target=J['durationTargetSeconds']-original
    extra=target-voice_s
    # Never change speech speed or pitch, only add emotional pauses.
    gap=max(.28,min(1.2,extra/10)) if extra>0 else .28
    tail=max(.4,extra-8*gap)
    run=original+voice_s+8*gap+tail
    if not 135<=run<=172:raise RuntimeError('New speech duration mismatched 150s target: '+str(run))
    new=np.zeros((round((run-original)*RATE),2),dtype=np.float32)
    cur=0
    for i,a in enumerate(voices):
        start=cur;end=start+len(a)
        new[start:end]=a
        times.append({'i':i+1,'start':round(original+start/RATE,3),'end':round(original+end/RATE,3),'text':J['voiceExtension'][i]})
        cur=end+round(gap*RATE)
    music=np.zeros(len(new),dtype=np.float32)
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50]]
    for k,sec in enumerate(np.arange(0,len(new)/RATE,.67)):
        cc=chords[(k//15)%len(chords)]
        tone(music,float(sec),cc[[0,1,2,1,0,2,1][k%7]]+12,.041)
    gain=np.full(len(new),.65,dtype=np.float32)
    for it in times:
        st=max(0,round((it['start']-original-.1)*RATE))
        en=min(len(new),round((it['end']-original+.25)*RATE))
        gain[st:en]=.20
    ext=np.clip(new+music[:,None]*gain[:,None],-.96,.96)
    all_audio=np.concatenate([old,ext])
    pcm=T/'soundtrack.wav'
    with wave.open(str(pcm),'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(RATE)
        w.writeframes((all_audio*32767).astype('<i2').tobytes())
    (P/'extension-timing.json').write_text(json.dumps(times,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('ACTUAL AUDIO',run,'ORIGINAL',original,'NEW VOICE',voice_s,'GAP',gap,flush=True)
    return run,pcm,times
def typography(sh):
    im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im)
    d.rounded_rectangle((20,22,325,66),radius=8,fill=(6,8,13,155))
    d.text((31,35),'NHỮNG ĐIỀU CHƯA KỊP NÓI',font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',17),fill=(250,235,204))
    d.rectangle((0,H-90,W,H),fill=(5,7,10,150))
    words=sh['focusText'].split();line='';rows=[]
    for x in words:
        test=(line+' '+x).strip()
        if line and d.textbbox((0,0),test,font=F)[2]>890:rows.append(line);line=x
        else:line=test
    if line:rows.append(line)
    for i,row in enumerate(rows):
        width=d.textbbox((0,0),row,font=F)[2]
        d.text(((W-width)//2,H-78+i*34),row,font=F,fill=(246,189,115))
    dest=T/f"overlay_{sh['index']:02d}.png";im.save(dest);return dest
def visual(length,available):
    shots=[]
    for i,sh in enumerate(J['shots']):
        srcid=sh['sourceId'] if sh['sourceId'] in available else available[(i*3)%len(available)]
        d=(sh['end']-sh['start'])*length/150
        span=d+(DISS if i<len(J['shots'])-1 else 0)
        src=T/f'{srcid}.mp4';overlay=typography(sh);out=T/f'shot_{i:02d}.mp4'
        vf=(f'[0:v]fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},'
            f'eq=contrast=1.08:saturation=0.87:brightness=-0.014[base];'
            '[base][1:v]overlay=0:0:shortest=1,format=yuv420p[v]')
        ff(['ffmpeg','-y','-hide_banner','-loglevel','error','-stream_loop','-1',
          '-ss',str((i%4)*.45),'-i',str(src),'-loop','1','-framerate',str(FPS),'-i',str(overlay),
          '-filter_complex',vf,'-map','[v]','-an','-t',f'{span:.4f}','-r',str(FPS),
          '-c:v','libx264','-preset','veryfast','-crf','24','-pix_fmt','yuv420p',str(out)])
        shots.append((out,span))
        print('SHOT',i+1,'/',len(J['shots']),flush=True)
    args=['ffmpeg','-hide_banner','-loglevel','error','-y']
    for f,_ in shots:args+=['-i',str(f)]
    filters=[];last='[0:v]';off=shots[0][1]-DISS
    for i in range(1,len(shots)):
        nxt=f'[x{i}]'
        filters.append(f'{last}[{i}:v]xfade=transition=fade:duration={DISS}:offset={off:.4f}{nxt}')
        last=nxt
        if i<len(shots)-1:off+=shots[i][1]-DISS
    filters.append(f'{last}scale=1920:1080:flags=lanczos,format=yuv420p[hd]')
    out=T/'picture.mp4'
    ff(args+['-filter_complex',';'.join(filters),'-map','[hd]','-an','-t',str(length),
      '-r',str(FPS),'-c:v','libx264','-preset','veryfast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',str(out)])
    return out
def srt(t):
    def stamp(sec):
        return f'{int(sec//3600):02d}:{int(sec%3600//60):02d}:{int(sec%60):02d},{round((sec-int(sec))*1000):03d}'
    rows=[];k=1
    for b in t:
        words=b['text'].split();chunks=[words[j:j+10] for j in range(0,len(words),10)]
        for i,c in enumerate(chunks):
            start=b['start']+(b['end']-b['start'])*i/len(chunks)
            end=b['start']+(b['end']-b['start'])*(i+1)/len(chunks)
            rows.append(f'{k}\n{stamp(start)} --> {stamp(end)}\n{" ".join(c)}\n');k+=1
    (P/'extension-only.srt').write_text('\n'.join(rows)+'\n',encoding='utf8')
def final(picture,wav,duration):
    out=P/'final'/'ngung-song-cinematic-150s.mp4';out.parent.mkdir(exist_ok=True,parents=True)
    ff(['ffmpeg','-y','-loglevel','error','-i',str(picture),'-i',str(wav),
       '-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k',
       '-t',str(duration),'-movflags','+faststart',str(out)])
    inf=meta(out);v=next(x for x in inf['streams'] if x['codec_type']=='video')
    if (v['width'],v['height'],v['avg_frame_rate'])!=(1920,1080,'30/1'):raise RuntimeError('Full HD frame-rate failed')
    if abs(float(inf['format']['duration'])-duration)>.16:raise RuntimeError('Duration failed')
    if {x['codec_type'] for x in inf['streams']}!={'audio','video'}:raise RuntimeError('Incomplete AV')
    sha=hashlib.sha256(out.read_bytes()).hexdigest()
    qa={'status':'technical-pass','duration':float(inf['format']['duration']),
      'format':'MP4 1920x1080 30fps 16:9','shots':len(J['shots']), 'bytes':out.stat().st_size,'sha256':sha,
      'voiceOriginal':'Preserved actual source timing in first 64.6 seconds; no speed or pitch adjustment',
      'newVoice':'Licensed Vbee Thanh Long, new continuation; not original speaker identity',
      'visual':'Live moving Pexels stock B-roll; not same actress in every clip',
      'subtitle':'Extension only; original ~65sec transcript requires manual alignment',
      'rights':'Verify permission for original soundtrack before public publication',
      'humanAestheticQA':'not verified','youtubePublished':False}
    (P/'render-QA.json').write_text(json.dumps(qa,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    # Contact sheet extracted from final encoded MP4
    im=Image.new('RGB',(4*480,6*270),(8,8,12))
    for i in range(21):
        t=(i+.5)*duration/21;f=T/f'still{i:02d}.jpg'
        ff(['ffmpeg','-y','-loglevel','error','-ss',str(t),'-i',str(out),'-frames:v','1',str(f)])
        im.paste(Image.open(f).convert('RGB').resize((480,270)),((i%4)*480,(i//4)*270))
    im.save(P/'qa-contact-sheet.jpg',quality=87)
    print('FINAL VERIFIED',out,qa,flush=True)
if __name__=='__main__':
    available=downloads()
    duration,wav,beats=build_audio()
    srt(beats)
    video=visual(duration,available)
    final(video,wav,duration)
