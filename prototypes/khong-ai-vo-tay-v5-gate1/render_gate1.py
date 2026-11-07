"""Render V5 Gate-1 film proof at NATIVE 1920x1080 30fps, original score and vector rig.
This is not a FINAL 140-second film. All graphics originate in code; no reference footage embedded.
"""
from __future__ import annotations
import math, random, sys, wave, json, hashlib, subprocess, time
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from rig_v5 import *
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'qa';OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=1920,1080,30,15
IVORY=(226,212,188); WARM=(240,172,117); PINK=(211,107,107)
REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def text_font(sz,bold=False):
 return ImageFont.truetype(BOLD if bold else REG,sz)

def make_gradient(top,bottom,hl=(0,0,0),center=(.5,.45)):
 # 100% native resolution; static assets cached; no upscaling prior frame.
 row=np.linspace(0,1,H,dtype=np.float32)[:,None,None]
 top=np.array(top,dtype=np.float32).reshape(1,1,3)
 bot=np.array(bottom,dtype=np.float32).reshape(1,1,3)
 pixels=np.repeat(top*(1-row)+bot*row,W,axis=1)
 yy,xx=np.ogrid[:H,:W]
 radial=np.exp(-((xx/W-center[0])**2/.125+(yy/H-center[1])**2/.35)).astype('float32')
 pixels+=radial[...,None]*np.array(hl,dtype=np.float32)
 vignette=1-0.38*(((xx/W-.5)/.75)**2+((yy/H-.5)/.84)**2)
 pixels*=np.clip(vignette,.58,1)[...,None]
 return Image.fromarray(np.uint8(np.clip(pixels,0,255)),'RGB')

def gym_back():
 im=make_gradient((8,12,26),(28,40,53),(18,15,17),(.39,.32));d=ImageDraw.Draw(im,'RGBA')
 # painted industrial architecture, structured but no clutter.
 for i,x in enumerate([160,620,1265,1730]):
  d.rectangle((x,112,x+27,835),fill=(10,17,29,155))
  d.line((x,122,x+27,122),fill=(122,146,159,57),width=3)
 for x in (160,620,1265):d.line((x,110,x+570,110),fill=(93,107,123,95),width=7)
 # large window with panes / warm street glow
 d.rounded_rectangle((220,185,810,730),radius=15,fill=(30,58,79,255),outline=(115,139,164,140),width=16)
 for y in range(205,720,90):
  alpha=49+int((y-205)/515*32);d.line((235,y,795,y),fill=(135,163,180,alpha),width=4)
 d.rectangle((513,185,529,730),fill=(12,21,38,255))
 for _ in range(28):
  rr=random.Random(111+_);x=rr.randrange(244,784);y=rr.randrange(210,704)
  d.line((x,y,x-14,y+53),fill=(170,191,211,44),width=2)
 d.polygon([(350,730),(795,730),(1500,985),(835,985)],fill=(136,147,154,22))
 d.rectangle((0,872,1920,1080),fill=(9,15,26,246))
 d.line((0,871,1920,871),fill=(148,164,179,102),width=5)
 for y in (909,1008):d.line((0,y,1920,y),fill=(178,186,193,20),width=3)
 # small stacked weights, atmosphere
 d.ellipse((1390,820,1560,888),fill=(18,24,34,195))
 for xx in (1410,1450,1490):d.ellipse((xx,820,xx+54,870),fill=(33,51,66,150),outline=(123,142,151,45),width=4)
 return im

def exterior_back():
 im=make_gradient((15,24,44),(30,48,67),(18,15,9),(.72,.5));d=ImageDraw.Draw(im,'RGBA')
 # dark city block silhouettes. No screenshot/real photo used.
 for i in range(19):
  x=i*140-70; y=500-(i*89%240)
  d.rectangle((x,y,x+129,852),fill=(13+(i%3)*4,26+(i%4)*5,42+(i%3)*7,220))
  for wy in range(y+25,820,49):
   for wx in range(x+17,x+122,38):
    if (i+wx+wy)%5!=0:d.rectangle((wx,wy,wx+12,wy+19),fill=(203,167,116,46))
 d.polygon([(0,853),(1920,853),(1920,1080),(0,1080)],fill=(10,17,26,255))
 d.line((0,854,1920,854),fill=(120,144,170,125),width=4)
 for i in range(12):
  x=i*191-35;d.line((x,1080,x+130,858),fill=(136,153,162,28),width=2)
 # moon, reflected rim
 d.ellipse((1517,173,1625,281),fill=(242,195,151,83))
 return im

GYM=gym_back(); STREET=exterior_back(); DAWN=make_gradient((41,38,46),(78,60,57),(49,32,12),(.45,.44))

def char_shadow(d,p,scale=1):
 planted=[p.feet[i] for i in range(2) if p.on_ground[i]]
 xx=sum(f[0] for f in planted)/len(planted) if planted else p.hip[0]
 ground=max(f[1] for f in p.feet)
 d.ellipse((xx-83*scale,ground+4,xx+88*scale,ground+16),fill=(0,0,0,104 if planted else 33))

def limb(d,a,b,width,color,outline=None):
 width=max(2,int(width))
 if outline:d.line([a,b],fill=outline,width=width+5,joint='curve')
 d.line([a,b],fill=color,width=width,joint='curve')
 for z in [a,b]:d.ellipse((z[0]-width/2,z[1]-width/2,z[0]+width/2,z[1]+width/2),fill=color)

def actor(im,p,*,scale=1,kid=False,offset=(0,0)):
 d=ImageDraw.Draw(im,'RGBA')
 shd=(35,57,77,255) if not kid else (105,71,62,255)
 shhi=(102,130,151,255) if not kid else (201,141,103,255)
 pants=(31,45,65,255) if not kid else (76,71,79,255)
 skin=(235,203,181,255) if not kid else (245,203,162,255)
 shadow=(149,133,136,255)
 # map all pose points into camera space; rig geometry in world space
 offx,offy=offset
 def xy(v):return (v[0]+offx,v[1]+offy)
 sh=xy(p.shoulder);hip=xy(p.hip);head=xy(p.head)
 feet=[xy(x) for x in p.feet];knees=[xy(x) for x in p.knees]
 hands=[xy(x) for x in p.hands];elbows=[xy(x) for x in p.elbows]
 local_ground=max(f[1] for f in feet)
 xx=sum(f[0] for f in feet)/2
 d.ellipse((xx-100,local_ground+5,xx+100,local_ground+16),fill=(0,0,0,96))
 # Correct occlusion order: back leg and arm, torso, front leg/arm.
 for k in [0,1]:
  hh=(hip[0]+(-16 if k==0 else 16),hip[1]+9)
  thigh=pants if k==0 else shd
  limb(d,hh,knees[k],46 if not kid else 37,thigh)
  limb(d,knees[k],feet[k],33 if not kid else 26,pants)
  d.ellipse((feet[k][0]-19,feet[k][1]-10,feet[k][0]+37,feet[k][1]+7),fill=(90,105,122,255))
  d.line((feet[k][0]-11,feet[k][1]+4,feet[k][0]+35,feet[k][1]+4),fill=(195,191,182,255),width=5)
 left=(sh[0]-23,sh[1]+10);right=(sh[0]+23,sh[1]+10)
 limb(d,left,elbows[0],39,shd)
 limb(d,elbows[0],hands[0],31,shhi)
 # Torso as shaded polygon; does not look like wire stick figure.
 spine_dx=hip[0]-sh[0];spine_dy=hip[1]-sh[1];slen=math.hypot(spine_dx,spine_dy) or 1
 nx=spine_dy/slen;ny=-spine_dx/slen
 shoulder_width=54 if not kid else 43;hip_width=37 if not kid else 30
 shape=[(sh[0]-nx*shoulder_width,sh[1]-ny*shoulder_width),
        (sh[0]+nx*shoulder_width,sh[1]+ny*shoulder_width),
        (hip[0]+nx*hip_width,hip[1]+ny*hip_width),
        (hip[0]-nx*hip_width,hip[1]-ny*hip_width)]
 d.polygon(shape,fill=shd)
 d.line((shape[0],shape[3]),fill=(142,155,169,100),width=7)
 d.line((shape[2],shape[3]),fill=(10,21,37,185),width=7)
 # Collar and neck
 limb(d,(sh[0],sh[1]-22),(head[0]-3,head[1]+32),21,shadow)
 # Head and hair ridge; head slightly oversized for facial acting readability.
 r=43 if not kid else 35
 d.ellipse((head[0]-r,head[1]-r*1.05,head[0]+r,head[1]+r*1.04),fill=skin)
 d.pieslice((head[0]-r-2,head[1]-r-5,head[0]+r+3,head[1]+r*.83),182,325,fill=(45,53,69,230))
 d.ellipse((head[0]-r*.79,head[1]-r*.92,head[0]-r*.34,head[1]-r*.62),fill=(255,251,238,48))
 direction=p.face
 eye=(head[0]+direction*r*.46,head[1]-r*.13)
 brow_y=eye[1]-12 if p.expression not in ('tired','sad') else eye[1]-6
 d.line((eye[0]-direction*9,brow_y,eye[0]+direction*9,brow_y+(-3 if p.expression=='determined' else 3)),fill=(44,53,65,245),width=4)
 d.ellipse((eye[0]-4,eye[1]-4,eye[0]+4,eye[1]+4),fill=(28,34,47,255))
 d.line((head[0]+direction*7,head[1]+18,head[0]+direction*21,head[1]+(20 if p.expression=='hope' else 23)),fill=(106,75,74,220),width=3)
 # subtle hoodie outline and hood at nape; preserve 2 actors clothing differentiation
 d.arc((head[0]-46,head[1]-11,head[0]+48,head[1]+78),20,138,fill=(54,70,89,140) if not kid else (164,121,99,170),width=10)
 limb(d,right,elbows[1],43,shhi)
 limb(d,elbows[1],hands[1],33,shhi)
 # exposed hand + boxing glove on puncher
 for k in [0,1]:
  if p.mode=='boxing':
   color=(191,66,79,255); rr=20
   d.ellipse((hands[k][0]-rr,hands[k][1]-rr,hands[k][0]+rr,hands[k][1]+rr),fill=color)
   d.arc((hands[k][0]-rr+6,hands[k][1]-rr+5,hands[k][0]+rr-6,hands[k][1]+rr-6),0,125,fill=(245,158,149,180),width=5)
  else:
   rr=13 if not kid else 11
   d.ellipse((hands[k][0]-rr,hands[k][1]-rr,hands[k][0]+rr,hands[k][1]+rr),fill=skin)
 # visible fatigue breath marks, slight motion dependent
 if p.expression=='tired':
  d.arc((head[0]+min(direction*45,direction*84),head[1]+13,head[0]+max(direction*45,direction*84),head[1]+43),30,130,fill=(163,191,206,87),width=3)

def bag(im,t):
 d=ImageDraw.Draw(im,'RGBA')
 dx=bag_shift(t)
 center=1285+dx;top=365;bottom=821
 d.line((1285,145,center,top+20),fill=(132,151,171,255),width=9)
 d.line((1245,143,1325,143),fill=(163,173,178,180),width=16)
 d.ellipse((center-125,876,center+125,896),fill=(0,0,0,90))
 d.rounded_rectangle((center-110,top,center+110,bottom),radius=99,fill=(129,53,67,255),outline=(210,119,118,140),width=6)
 d.rounded_rectangle((center-98,top+18,center-73,bottom-25),radius=12,fill=(236,152,147,93))
 for y in (460,720):d.line((center-102,y,center+103,y),fill=(68,25,42,174),width=10)
 # Impact rays only when fist actually reaches bag, not unrelated random flicker.
 for n in range(4):
  stamp=CONTACT_AT+n*PUNCH_PERIOD
  if 0<t-stamp<.18:
   amt=1-(t-stamp)/.18
   for i in range(6):
    theta=(i-2.5)*.48;xx=center-115-30*math.cos(theta);yy=533+70*math.sin(theta)
    d.line((xx,yy,xx-amt*(31+5*i),yy+math.sin(theta)*48*amt),fill=(251,197,151,int(170*amt)),width=5)

def static_stage(which):return STREET.copy() if which=='run' else GYM.copy()

def cinematic_overlay(im,caption=None,eyebrow=None,sec=0):
 d=ImageDraw.Draw(im,'RGBA')
 # Letterbox moderately; allow body space inside lower limit.
 d.rectangle((0,0,W,43),fill=(3,7,15,230));d.rectangle((0,H-43,W,H),fill=(3,7,15,234))
 if caption:
  y=95
  if eyebrow:
   d.text((125,y),eyebrow,fill=(232,157,128,220),font=text_font(20,True));y+=42
  d.text((125,y),caption,fill=(245,236,222,235),font=text_font(33,True),stroke_width=1,stroke_fill=(8,11,21))
  d.line((125,y+55,217,y+55),fill=(215,102,99,180),width=6)

def frame_at(n):
 t=n/FPS
 if t<4:
  im=static_stage('run')
  # running treadmill-like tracking camera: camera moves WITH runner, environment slides behind him.
  cam=RUN_SPEED*t
  if cam:
   d=ImageDraw.Draw(im,'RGBA')
   # Nearby lane tiles move past the camera, unlike a static slide background.
   for i in range(20):
    xx=(i*164-cam*1.15)%2140-110
    d.line((xx,855,xx-59,1080),fill=(164,178,185,38),width=3)
   for i in range(7):
    xx=(i*430-cam*.46)%2350-230
    d.rectangle((xx,340,xx+65,854),fill=(10,19,31,37))
   # Thin translucent motion streaks provide velocity without changing character geometry.
   for k in range(18):
    rr=random.Random(k+85)
    xx=(rr.randrange(W)-cam*(.65+(k%3)*.15))%W
    yy=210+(k*77)%550
    d.line((xx,yy,xx+49,yy),fill=(170,188,207,18+(k%3)*5),width=2)
  m=run(t)
  actor(im,m,offset=(-cam+26,0))
  cinematic_overlay(im,'MỖI BƯỚC ĐỀU CÓ Ý NGHĨA','NGÀY ĐẦU TIÊN') if t<2.8 else cinematic_overlay(im)
 elif t<8:
  q=t-4;im=static_stage('gym')
  p=pushup(q)
  actor(im,p)
  if q>2.5:
   # focal sweat/beads near floor, original procedural particles
   d=ImageDraw.Draw(im,'RGBA')
   for k in range(7):
    x=p.head[0]-25+k*18;y=p.head[1]+75+(k%3)*12
    d.ellipse((x,y,x+5,y+10),fill=(167,196,213,140))
  cinematic_overlay(im,'NGÃ. RỒI THỬ LẠI.','ĐIỀU KHÓ NHẤT') if .35<q<2.6 else cinematic_overlay(im)
 elif t<12:
  q=t-8;im=static_stage('gym')
  bag(im,q)
  actor(im,boxing(q,origin=815,bag_front=1175))
  cinematic_overlay(im,'THÊM MỘT CÚ ĐẤM.','KỶ LUẬT') if .36<q<2.3 else cinematic_overlay(im)
 else:
  q=t-12;im=Image.blend(GYM,DAWN,.35+.18*q/3)
  # Stairwell door caught in light reveals a child; meaningful warm transition.
  d=ImageDraw.Draw(im,'RGBA')
  d.polygon([(1350,175),(1550,175),(1620,850),(1310,850)],fill=(216,157,105,64))
  adult,child=helping(q)
  actor(im,adult)
  actor(im,child,kid=True)
  if q>1.6:
   xx=1028;yy=555
   d.ellipse((xx-37,yy-37,xx+37,yy+37),outline=(246,203,137,int(70+40*math.sin((q-1.6)*math.pi))),width=4)
  cinematic_overlay(im,'ĐÔI KHI BẠN LÀ ÁNH SÁNG CỦA AI ĐÓ.','KHÔNG CÒN MỘT MÌNH') if q>.7 else cinematic_overlay(im)
 return im

def score(path):
 sr=48000;N=int(sr*SECONDS);t=np.arange(N,dtype=np.float32)/sr
 a=np.zeros(N,dtype=np.float32)
 # Original score: soft cinematic harmonic progression, clean and licensed-to-self.
 chords=[(0,[146.83,174.61,220]),(4,[130.81,164.81,196]),(8,[146.83,185,220]),(12,[174.61,220,261.63])]
 for i,(start,notes) in enumerate(chords):
  end=chords[i+1][0] if i<len(chords)-1 else SECONDS
  left=int(start*sr);right=int(end*sr);tt=t[left:right]-start
  env=np.clip(np.minimum(tt/.6,(end-start-tt)/.7),0,1)
  for j,freq in enumerate(notes):
   a[left:right]+=(.018/(j+1))*env*np.sin(2*np.pi*freq*tt)
 # Motivic melody rings out during emotional change
 notes=[(0.2,293.66),(2.5,261.63),(4.2,220),(6.5,261.63),(8.2,349.23),(10.0,392.00),(12.1,440),(13.6,523.25)]
 for ts,freq in notes:
  l=int(ts*sr);r=min(N,l+int(1.4*sr));tt=t[l:r]-ts
  a[l:r]+=.038*np.sin(2*np.pi*freq*tt)*np.exp(-2.4*tt)*(1-np.exp(-11*tt))
 # Character footsteps sync precisely with stance event, not random.
 for stamp in np.arange(.2,4,RUN_PERIOD):
  l=int(stamp*sr);r=min(N,l+int(.16*sr));tt=t[l:r]-stamp
  a[l:r]+=.068*np.sin(2*np.pi*58*tt)*np.exp(-25*tt)
 # punching bag impact at EXACT motion-contact timestamps
 for stamp in np.arange(8+CONTACT_AT,12,PUNCH_PERIOD):
  l=int(stamp*sr);r=min(N,l+int(.29*sr));tt=t[l:r]-stamp
  rng=np.random.default_rng(round(stamp*1000))
  noise=rng.standard_normal(r-l,dtype=np.float32)
  a[l:r]+=.068*noise*np.exp(-35*tt)+.096*np.sin(2*np.pi*48*tt)*np.exp(-15*tt)
 # Quiet down during reveal
 a*=np.clip((SECONDS-t)/.8,0,1)
 a*=np.clip(t/.25,0,1)
 a=np.tanh(a*3)*.7
 # Subtle stereo widening; exact 48K stereo, original procedural audio.
 shifted=np.roll(a,15);shifted[:15]=0
 b=np.column_stack((a*.97+shifted*.03,a*.90+shifted*.10)).astype('<f4')
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr)
  w.writeframes((np.clip(b,-.99,.99)*32767).astype('<i2').tobytes())

def render():
 score(OUT/'original-gate1-score-48khz-stereo.wav')
 raw=OUT/'video-gate1-silent.mp4';final=ROOT/'V5-GATE1-15s-1080p30.mp4'
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1920x1080','-r','30','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(raw)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,bufsize=12_000_000)
 times=[0.5,1.4,2.8,4.6,6.2,7.3,8.45,8.67,9.9,11.4,12.4,13.3,14.6]
 thumbs=[];st=time.monotonic()
 try:
  for i in range(FPS*SECONDS):
   im=frame_at(i)
   if any(abs(i/FPS-ts)<1/FPS for ts in times):thumbs.append((i/FPS,im.copy()))
   proc.stdin.write(im.tobytes())
   if i%60==0:print('FRAME',i,'/',FPS*SECONDS,'seconds_elapsed',round(time.monotonic()-st,1),flush=True)
 finally:proc.stdin.close()
 if proc.wait():raise RuntimeError('ffmpeg encode error')
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(raw),'-i',str(OUT/'original-gate1-score-48khz-stereo.wav'),'-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(final)],check=True)
 tw,th=480,270;sheet=Image.new('RGB',(tw*4,th*4),(8,10,16))
 d=ImageDraw.Draw(sheet)
 for j,(t,im) in enumerate(thumbs):
  x=(j%4)*tw;y=(j//4)*th
  sheet.paste(im.resize((tw,th),Image.Resampling.LANCZOS),(x,y));d.text((x+12,y+th-28),f'{t:04.1f}s',fill=(255,255,255),font=text_font(17,True))
 sheet.save(ROOT/'V5-GATE1-storyboard-from-render.jpg',quality=91)
 manifest={'title':'Không Ai Vỗ Tay Cho Ngày Đầu Tiên','version':'V5 - Gate 1 technical proof','durationSeconds':SECONDS,'width':W,'height':H,'fps':FPS,'frameCount':FPS*SECONDS,'render':'native Pillow vector at 1920x1080 for every frame, no 720p source upscale','audio':'original synthesized 48k stereo AAC','sha256':hashlib.sha256(final.read_bytes()).hexdigest(),'status':'proof-awaiting-human-art-direct-review','isFinalFilm':False,'source':'src/rig_v5.py, src/render_gate1.py'}
 (ROOT/'manifest-v5-gate1.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 print('COMPLETE',final,final.stat().st_size,flush=True)

if __name__=='__main__':
 if len(sys.argv)>1 and sys.argv[1]=='preview':
  tw,th=480,270;sheet=Image.new('RGB',(960,1080))
  for j,sec in enumerate([.4,1.7,2.9,3.7,4.3,5.7,6.7,7.4,8.6,9.3,10.6,11.3,12.6,13.1,14.2,14.7]):
   im=frame_at(round(sec*FPS)).resize((tw,th),Image.Resampling.LANCZOS)
   sheet.paste(im,((j%2)*tw,(j//2)*135)) if False else None
  sheet=Image.new('RGB',(tw*4,th*4))
  for j,sec in enumerate([.4,1.7,2.9,3.7,4.3,5.7,6.7,7.4,8.6,9.3,10.6,11.3,12.6,13.1,14.2,14.7]):
   im=frame_at(round(sec*FPS)).resize((tw,th),Image.Resampling.LANCZOS)
   sheet.paste(im,((j%4)*tw,(j//4)*th))
  sheet.save(ROOT/'V5-GATE1-preview-contact.jpg',quality=89)
  print('PREVIEW READY')
 else:render()
