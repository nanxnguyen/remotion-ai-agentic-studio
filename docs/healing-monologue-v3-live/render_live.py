#!/usr/bin/env python3
"""92-second documentary-style healing monologue from licensed Pexels footage.
No still-frame AI animation. 60fps output can include frame duplication where
a licensed source clip has a lower native rate; that coverage is reported.
"""
import concurrent.futures, hashlib, io, json, math, os, re, shutil, subprocess, time, urllib.request, wave
from pathlib import Path
from urllib.error import URLError, HTTPError
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont

ROOT=Path(__file__).resolve().parent
WORK=Path('/tmp/healing92live');WORK.mkdir(parents=True,exist_ok=True)
DATA=json.loads((ROOT/'manifest.json').read_text(encoding='utf8'))
FPS=60;W=960;H=540;DURATION=92;FADE=.32
OUT=ROOT/'final'/'healing-monologue-92s-live-footage-v3-vbee.mp4'

def check(cmd):
    subprocess.run(cmd,check=True)
def probe(path):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries',
      'format=duration,size:stream=codec_type,width,height,avg_frame_rate',
      '-of','json',str(path)],text=True))
def asset(id):
    return WORK/f'pexels-{id}.mp4'
def download(clip):
    path=asset(clip['id'])
    if path.exists() and path.stat().st_size>100000:return
    id=clip['id']
    base=f'https://www.pexels.com/download/video/{id}/'
    # Try optimized HD versions first. 302 from Pexels itself is the fallback.
    import requests
    resp=requests.head(base,allow_redirects=False,timeout=28,headers={'User-Agent':'Mozilla/5.0'})
    destination=resp.headers.get('Location','')
    candidates=[]
    m=re.search(r'/video-files/(\d+)/(\d+)-((?:uhd|hd|sd)_\d+_\d+_\d+fps)\.mp4',destination)
    if m:
        _,baseid,quality=m.groups()
        hz=re.search(r'_(\d+)fps',quality)
        fps=hz.group(1) if hz else '25'
        prefix=f'https://videos.pexels.com/video-files/{id}/{baseid}'
        candidates.extend([f'{prefix}-hd_1920_1080_{fps}fps.mp4',
            f'{prefix}-hd_1280_720_{fps}fps.mp4',
            f'{prefix}-sd_640_360_{fps}fps.mp4'])
    candidates.append(base)
    for url in candidates:
        try:
            r=requests.get(url,stream=True,timeout=(30,120),allow_redirects=True,
              headers={'User-Agent':'Mozilla/5.0'})
            if r.status_code!=200 or 'video' not in r.headers.get('content-type','video/mp4'):
                r.close();continue
            with path.open('wb') as f:
                size=0
                for chunk in r.iter_content(1<<20):
                    if chunk:
                        f.write(chunk);size+=len(chunk)
            r.close()
            if size>100000:
                print('DOWNLOADED',id,round(size/1e6,1),'MB',flush=True);return
        except Exception as e:
            print('CLIP_URL_RETRY',id,type(e).__name__,str(e)[:100],flush=True)
    raise RuntimeError(f'Unable to download authentic stock clip id={id}')

def source_inventory():
    clips=DATA['clips']
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
        jobs={ex.submit(download,c):c for c in clips}
        for f in concurrent.futures.as_completed(jobs):
            f.result()
    out={}
    for c in clips:
        p=probe(asset(c['id']))
        vid=next(x for x in p['streams'] if x['codec_type']=='video')
        ns,ds=map(int,vid['avg_frame_rate'].split('/'))
        out[c['id']]={'sourceUrl':c['link'],'credit':c['credit'],
                      'realSourceFps':ns/ds,'width':vid['width'],'height':vid['height'],
                      'duration':float(p['format']['duration']),
                      'bytes':int(p['format']['size'])}
    return out

def font_path():
    path=WORK/'BeVietnamPro-Bold.ttf'
    if path.exists() and path.stat().st_size>12000:return path
    import requests
    ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'
    css=requests.get('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&display=swap',
        headers={'User-Agent':ua},timeout=35).text
    # CSS first Vietnamese subsection when present; download actual WOFF2 and convert to TTF.
    entries=re.findall(r'src:\s*url\((https://fonts\.gstatic\.com/[^\)]+)\)',css)
    if not entries:raise RuntimeError('Cannot retrieve real Be Vietnam Pro. No silent font substitution.')
    link=entries[0]
    data=requests.get(link,timeout=60).content
    font=TTFont(io.BytesIO(data))
    font.flavor=None
    font.save(path)
    f=ImageFont.truetype(str(path),32)
    if not f.getbbox('Đừng bỏ rơi chính mình.'):
        raise RuntimeError('Font does not support Vietnamese')
    print('FONT_OK',path.name,path.stat().st_size,flush=True)
    return path

def caption_png(i,shot,font):
    img=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(img,'RGBA')
    # Semi-transparent caption band, no letterboxing. Keep faces visible above the lower third.
    for y in range(380,H):
        al=int(170*((y-380)/(H-380))**.8)
        d.line((0,y,W,y),fill=(4,7,10,al))
    d.rounded_rectangle((40,35,380,73),radius=12,fill=(6,9,15,155))
    bf=ImageFont.truetype(str(font),16)
    d.text((54,45),'NHỮNG ĐIỀU CHƯA KỊP NÓI',font=bf,fill=(251,235,213,240))
    headline=shot['headline'];sub=shot['subtitle']
    hfont=ImageFont.truetype(str(font),38 if len(headline)<24 else 32)
    sfont=ImageFont.truetype(str(font),23)
    def centered(line,ft,y,color):
        bbox=d.textbbox((0,0),line,font=ft)
        x=(W-(bbox[2]-bbox[0]))/2
        d.text((int(x),y),line,font=ft,fill=color,stroke_width=1,stroke_fill=(6,8,9,180))
    centered(headline,hfont,422,(248,198,144,255) if i in (1,10,17) else (251,249,243,255))
    centered(sub,sfont,478,(238,234,227,255))
    d.line((42,H-14,W-42,H-14),fill=(175,180,187,120),width=2)
    d.line((42,H-14,42+int((W-84)*shot['end']/92),H-14),fill=(247,183,118,245),width=3)
    png=WORK/f'caption-{i:02d}.png';img.save(png);return png

def picture(inventory,font):
    takes={}
    rendered=[]
    native60=0.0
    for i,shot in enumerate(DATA['shots']):
        id=shot['source'];take=takes.get(id,0);takes[id]=take+1
        p=inventory[id];base_d=shot['end']-shot['start']
        used_d=base_d+(FADE if i<17 else 0)
        source_sec=p['duration']
        # Use a different interval of reused sources when available.
        offset=min(max(0,source_sec-used_d-.15),take*3.5+.1)
        if source_sec<used_d:
            offset=0
        if p['realSourceFps']>=50:native60+=base_d
        overlay=caption_png(i,shot,font)
        target=WORK/f'shot{i:02d}.mp4'
        filt=(f'[0:v]fps={FPS},'
          f'scale={W}:{H}:force_original_aspect_ratio=increase,'
          f'crop={W}:{H},setsar=1,eq=contrast=1.07:saturation={0.82 if i<12 else 1.08},'
          'format=yuv420p[video];'
          f'[1:v]format=rgba,fade=t=in:st=0:d=0.28:alpha=1,'
          f'fade=t=out:st={max(0.1,used_d-.3):.3f}:d=0.28:alpha=1[graphic];'
          '[video][graphic]overlay=0:0:shortest=1,format=yuv420p[out]')
        check(['ffmpeg','-hide_banner','-loglevel','error','-y',
          '-stream_loop','-1','-ss',f'{offset:.3f}','-i',str(asset(id)),
          '-loop','1','-framerate',str(FPS),'-i',str(overlay),
          '-filter_complex',filt,'-map','[out]','-t',f'{used_d:.3f}',
          '-r',str(FPS),'-an','-pix_fmt','yuv420p','-c:v','libx264',
          '-preset','ultrafast','-crf','24',str(target)])
        rendered.append((target,used_d))
        print('SHOT_OK',i+1,shot['start'],shot['end'],'source',id,'sourceFPS',round(p['realSourceFps'],2),flush=True)
    cmd=['ffmpeg','-y','-hide_banner','-loglevel','error']
    for p,_ in rendered:cmd+=['-i',str(p)]
    chain=[];previous='[0:v]';offset=rendered[0][1]-FADE
    for i in range(1,len(rendered)):
        dest=f'[xf{i}]'
        chain.append(f'{previous}[{i}:v]xfade=transition=fade:duration={FADE}:offset={offset:.5f}{dest}')
        previous=dest
        if i<len(rendered)-1:offset+=rendered[i][1]-FADE
    chain.append(f'{previous}scale=1920:1080:flags=fast_bilinear,format=yuv420p[final]')
    pic=WORK/'picture92.mp4'
    check(cmd+['-filter_complex',';'.join(chain),'-map','[final]','-t','92',
            '-r',str(FPS),'-an','-c:v','libx264','-preset','veryfast',
            '-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(pic)])
    return pic,native60

def piano():
    sr=32000;n=92*sr;sound=np.zeros(n,np.float64)
    chords=[[45,48,52],[41,45,48],[48,52,55],[43,47,50],
       [45,48,52],[41,45,48],[48,52,55],[48,52,57]]
    def note(midi,start,len_s,vol):
        j=int(start*sr);k=min(int(len_s*sr),n-j)
        if k<1:return
        t=np.arange(k)/sr;hz=440*2**((midi-69)/12)
        envelope=(1-np.exp(-t*37))*np.exp(-t*1.4)
        sound[j:j+k]+=vol*envelope*(.86*np.sin(2*np.pi*hz*t)+.13*np.sin(2*np.pi*hz*2.01*t))
    for i in range(16):
        start=i*5.75;ch=chords[i%8]
        for k in range(7):note(ch[[0,1,2,1,0,2,1][k]]+12,start+k*.7,2.6,.10)
        note(ch[0],start,4,.10)
    tt=np.arange(n)/sr
    gain=np.interp(tt,[0,17,31,45,53,58,71,83,89,92],[.25,.52,.57,.43,.26,.20,.59,.65,.43,.0])
    data=(np.tanh(sound*gain*2)*.5*32767).astype('<i2')
    path=WORK/'piano.wav'
    with wave.open(str(path),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(data.tobytes())
    return path

def render_with_voice(pic,score):
    voice_dir=WORK/'voice'
    mp3s=[voice_dir/f'voice{i}.mp3' for i in range(8)]
    for p in mp3s:
        if not p.exists():raise RuntimeError('Missing genuine Vbee track '+str(p))
    report=[];inputs=['-i',str(pic),'-i',str(score)]
    graph=[]
    for i,(track,beat) in enumerate(zip(mp3s,DATA['voice']['beats'])):
        vdur=float(probe(track)['format']['duration'])
        slot=beat['end']-beat['start']
        tempo=max(.72,vdur/max(.5,slot-.16))
        if tempo>1.36:
            raise RuntimeError(f'Vbee beat {i} too long ({vdur:.2f}s > slot {slot}s). Refuse unnatural acceleration.')
        inputs+=['-i',str(track)]
        graph.append(f'[{i+2}:a]aresample=48000,atempo={tempo:.6f},'
          f'atrim=0:{slot-.12:.3f},adelay={int(beat["start"]*1000)}:all=1,volume=1.10[a{i}]')
        report.append({'beat':i+1,'ttsDuration':round(vdur,2),'slot':slot,'tempo':round(tempo,3)})
    graph.append(''.join(f'[a{i}]' for i in range(8))+'amix=inputs=8:duration=longest:normalize=0[voice]')
    graph.append('[1:a]aresample=48000,volume=0.38[score]')
    graph.append('[score][voice]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.90[aout]')
    OUT.parent.mkdir(parents=True,exist_ok=True)
    check(['ffmpeg','-hide_banner','-loglevel','error','-y']+inputs+
      ['-filter_complex',';'.join(graph),'-map','0:v:0','-map','[aout]',
       '-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-ac','2',
       '-t',str(DURATION),'-movflags','+faststart',str(OUT)])
    return report

def make_sheet():
    from PIL import ImageOps
    img=Image.new('RGB',(4*400,5*260),'#0A0D14')
    for i,shot in enumerate(DATA['shots']):
        t=(shot['start']+shot['end'])/2
        frame=WORK/f'qa-frame-{i:02d}.jpg'
        check(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(OUT),
               '-frames:v','1',str(frame)])
        pic=Image.open(frame).convert('RGB').resize((400,225))
        x=i%4*400;y=i//4*260;img.paste(pic,(x,y))
    img.save(ROOT/'contact-sheet-v3-real-footage.jpg',quality=85)

def main():
    inventory=source_inventory()
    font=font_path()
    pic,coverage=picture(inventory,font)
    score=piano()
    (ROOT/'source-inventory.json').write_text(json.dumps(inventory,indent=2,ensure_ascii=False)+'\n')
    report=render_with_voice(pic,score)
    p=probe(OUT)
    v=next(s for s in p['streams'] if s['codec_type']=='video')
    assert (v['width'],v['height'],v['avg_frame_rate'])==(1920,1080,'60/1')
    assert 91.7<float(p['format']['duration'])<92.3
    assert {s['codec_type'] for s in p['streams']}=={'audio','video'}
    make_sheet()
    qa={'status':'TECHNICAL_PASS_REQUIRES_HUMAN_AESTHETIC_REVIEW',
         'durationSeconds':float(p['format']['duration']),
         'video':OUT.name,'resolution':[1920,1080],'timelineFps':60,
         'nativeSourceRateAtLeast50FpsSeconds':coverage,
         'lowerFrameRateFootageSeconds':92-coverage,
         'liveAction':True,'singleActorAcrossShots':False,
         'voice':'Vbee Thanh Long — regenerated against approved 92s script',
         'voiceBeatQA':report,
         'font':'Be Vietnam Pro authentic Google Fonts',
         'stockAttributions':[{'id':x['id'],'credit':x['credit'],'url':x['link']} for x in DATA['clips']],
         'sha256':hashlib.sha256(OUT.read_bytes()).hexdigest(),
         'bytes':OUT.stat().st_size,
         'limitations':['Source rate varies (some shots below native 60fps)','Stock actors vary; documentary montage, not same character','Human viewing and listening still pending']}
    (ROOT/'final-qa.json').write_text(json.dumps(qa,indent=2,ensure_ascii=False)+'\n')
    print('RENDER_OK',json.dumps({'duration':qa['durationSeconds'],'bytes':qa['bytes'],
        'native50plusSeconds':coverage,'sha256':qa['sha256']},ensure_ascii=False),flush=True)

if __name__=='__main__':main()
