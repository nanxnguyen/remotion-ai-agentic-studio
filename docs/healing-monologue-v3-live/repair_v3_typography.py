#!/usr/bin/env python3
"""Repair missing Vietnamese glyphs in an already-rendered 92s live-footage
V3 preview. Reuses live action AND the exact existing Vbee audio stream.
Font from original upstream TTF (full glyph repertoire), not WOFF2 subset.
"""
from pathlib import Path
from PIL import Image,ImageOps
from fontTools.ttLib import TTFont
import hashlib,json,subprocess,urllib.request
ROOT=Path(__file__).resolve().parent;TMP=Path('/tmp/healing-v3-typefix');TMP.mkdir(exist_ok=True,parents=True)
old=ROOT/'final/healing-monologue-92s-live-footage-v3-vbee.mp4'
new=ROOT/'final/healing-monologue-92s-live-footage-v3-TYPOGRAPHY-FIX.mp4'
manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
font=TMP/'BeVietnamPro-Bold.ttf'
url='https://raw.githubusercontent.com/bettergui/BeVietnamPro/main/fonts/ttf/BeVietnamPro-Bold.ttf'
urllib.request.urlretrieve(url,font)
if font.stat().st_size<100000:raise RuntimeError('Invalid upstream font download')
cm=TTFont(font)['cmap'].getBestCmap()
alltext=''.join(s['headline']+' '+s['subtitle'] for s in manifest['shots'])+'NHỮNG ĐIỀU CHƯA KỊP NÓI'
missing={ch for ch in alltext if not ch.isspace() and ord(ch) not in cm}
if missing:raise RuntimeError('Typeface is missing Vietnamese glyphs: '+repr(missing))
print('FONT_FULL_VIETNAMESE_OK',font.stat().st_size,flush=True)

def stamp(x):return f'{x:.3f}'
filters=[
 'drawbox=x=0:y=790:w=iw:h=290:color=0x071019@1:t=fill',
 'drawbox=x=0:y=0:w=770:h=162:color=0x071019@1:t=fill'
]
brand=TMP/'brand.txt';brand.write_text('NHỮNG ĐIỀU CHƯA KỊP NÓI',encoding='utf8')
filters.append(f'drawtext=fontfile={font}:textfile={brand}:fontsize=37:fontcolor=0xFAE2CB:'
               'x=64:y=52:shadowx=2:shadowy=2:shadowcolor=0x000000')
for i,shot in enumerate(manifest['shots']):
    start,end=shot['start'],shot['end']
    headline=TMP/f'h{i:02d}.txt';subtitle=TMP/f's{i:02d}.txt'
    headline.write_text(shot['headline'],encoding='utf8')
    subtitle.write_text(shot['subtitle'],encoding='utf8')
    # Animated alpha with slight offset between main headline/subline.
    for file,y,fs,col,delay in [
       (headline,835,60,'0xF6C18C',0.0),
       (subtitle,935,40,'0xFAF3EB',0.18)]:
        a=start+delay
        alpha=(f"if(lt(t,{a+0.35:.3f}),"
               f"max(0,min(1,(t-{a:.3f})/0.35)),"
               f"if(gt(t,{end-.35:.3f}),max(0,min(1,({end:.3f}-t)/0.35)),1))")
        filters.append(f"drawtext=fontfile={font}:textfile={file}:fontsize={fs}:fontcolor={col}:"
                       f"x=(w-text_w)/2:y={y}:alpha='{alpha}':"
                       f"enable='between(t,{a:.3f},{end:.3f})':"
                       "shadowcolor=0x000000:shadowx=3:shadowy=3")
filtergraph=','.join(filters)+',format=yuv420p[out]'
print('DRAWING',len(filters),'filters',flush=True)
new.parent.mkdir(parents=True,exist_ok=True)
command=['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(old),
 '-filter_complex','[0:v]'+filtergraph,'-map','[out]','-map','0:a:0',
 '-c:v','libx264','-preset','ultrafast','-crf','23','-r','60','-pix_fmt','yuv420p',
 '-c:a','copy','-t','92','-movflags','+faststart',str(new)]
subprocess.run(command,check=True)
def probe(p):
 return json.loads(subprocess.check_output(['ffprobe','-v','error',
    '-show_entries','format=duration,size:stream=codec_type,codec_name,width,height,avg_frame_rate',
    '-of','json',str(p)],text=True))
a=probe(old);b=probe(new)
assert {s['codec_type'] for s in b['streams']}=={'video','audio'}
assert b['streams'][0]['width']==1920 and b['streams'][0]['height']==1080
assert b['streams'][0]['avg_frame_rate']=='60/1'
assert abs(float(b['format']['duration'])-92)<.2
# Validate actual Vbee audio packets unchanged, not simply same codec labels.
def am(md):
 return subprocess.check_output(['ffmpeg','-v','error','-i',str(md),'-map','0:a:0',
      '-c','copy','-f','md5','-'],text=True).strip()
if am(old)!=am(new):raise RuntimeError('Original Vbee audio changed')
# Sample the _actual_ rendered file for contact sheet, not a storyboard image.
contact=Image.new('RGB',(4*400,5*250),'#070a0f')
for i,shot in enumerate(manifest['shots']):
 t=(shot['start']+shot['end'])/2
 path=TMP/f'f{i:02d}.jpg'
 subprocess.run(['ffmpeg','-v','error','-y','-ss',stamp(t),'-i',str(new),
   '-frames:v','1',str(path)],check=True)
 frame=Image.open(path).convert('RGB').resize((400,225),Image.Resampling.LANCZOS)
 contact.paste(frame,((i%4)*400,(i//4)*250))
sheet=ROOT/'contact-sheet-v3-typefixed.jpg'
contact.save(sheet,quality=89)
qa={'status':'TECHNICAL_PASS_REQUIRES_HUMAN_VISUAL_REVIEW',
 'durationSeconds':float(b['format']['duration']),'canvas':[1920,1080],
 'fpsExport':60,'audioUnchangedFromGenuineVbee':True,
 'stockLiveAction':True,'singleActor':False,
 'nativeSourceRateAtLeast50FpsSeconds':17,
 'sourceFpsBelow50Seconds':75,
 'font':'Be Vietnam Pro bold, full TTF from official upstream',
 'missingVietnameseGlyphs':len(missing),
 'fix':'Full-coverage lower-third matte + redrawn timed Be Vietnam Pro titles',
 'file':new.name,'bytes':new.stat().st_size,
 'sha256':hashlib.sha256(new.read_bytes()).hexdigest(),
 'sourceVideoSha256':hashlib.sha256(old.read_bytes()).hexdigest(),
 'limitations':['60fps container includes repeated frames in lower-fps source shots',
 'Montage actors are different stock performers',
 'Human aesthetic/audio review still required before FINAL']}
(ROOT/'final-qa-TYPO-FIX.json').write_text(json.dumps(qa,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('TYPEFIX_SUCCESS',json.dumps(qa,ensure_ascii=False),flush=True)
