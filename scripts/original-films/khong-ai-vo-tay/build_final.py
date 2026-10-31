#!/usr/bin/env python3
"""Original 140 s Vietnamese 2D short, adapted and expanded from the user's 50 s pilot.
All shapes and audio are synthesized locally; deterministic frame/time functions.
"""
import sys, math, random, subprocess, wave, hashlib, json, time
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter
sys.path.insert(0,str(Path(__file__).resolve().parent/'pilot'))
import build as B

OUT=Path(__file__).resolve().parent/'out';OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,DURATION=1280,720,24,140
G=B.G
FONT='/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
FONT_R='/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'
IVORY=B.IVORY;CORAL=B.CORAL
fnt=lambda s,b=True: ImageFont.truetype(FONT if b else FONT_R,s)
clamp=B.clamp; ease=B.ease; mix=B.mix

# Running timeline: 24 scenes over 140 s. A meaningful pose/object/setting change at ~3–7 s.
BEATS=[
(0,5,'collapse','Một cú ngã không có khán giả.'),
(5,10,'gloves','Đôi găng rơi xuống sàn.'),
(10,16,'nightroom','Về nhà. Lặp lại nỗi sợ.'),
(16,22,'alarm','05:00. Một quyết định mới.'),
(22,28,'walk','Bước ra khỏi cánh cửa.'),
(28,35,'street_run','Bắt đầu chạy khi phố còn ngủ.'),
(35,41,'push_fail','Ngày đầu: không nâng nổi người.'),
(41,47,'crouch','Nỗi đau và sự lặng im.'),
(47,54,'boxing','Học cách ra một cú đấm.'),
(54,60,'bag_react','Thất bại rồi thử lại.'),
(60,66,'marks','Những dấu gạch trên tường.'),
(66,72,'alarm2','Lại là 05:00.'),
(72,79,'street_run2','Chạy khi mọi người chưa thức.'),
(79,86,'push_better','Thêm một lần chống đẩy.'),
(86,92,'boxing_better','Nhịp tay mạnh hơn.'),
(92,99,'collapse2','Nhưng một ngày anh vẫn gục.'),
(99,105,'kid_door','Một người đứng ở cửa.'),
(105,112,'kid_try','Cậu bé làm theo.'),
(112,118,'kid_fail','Cậu bé cũng ngã xuống.'),
(118,124,'adult_notices','Anh nhìn thấy chính mình.'),
(124,130,'together','Hai người cùng tập.'),
(130,135,'help_up','Một cánh tay đưa ra.'),
(135,138,'sunrise','Không còn một mình.'),
(138,140,'endcard','Khung kết.'),
]
assert BEATS[0][0] == 0 and BEATS[-1][1] == DURATION


def background_bedroom():
 base=Image.new('RGB',(W,H),(10,14,26));d=ImageDraw.Draw(base,'RGBA')
 for y in range(H):
  col=int(12+16*y/H);d.line((0,y,W,y),fill=(col,col+5,col+15,255))
 # room, night sky, window cross
 d.rectangle((755,95,1150,460),fill=(13,34,57,255),outline=(99,119,143,210),width=12)
 d.line((950,95,950,460),fill=(8,15,30,250),width=13);d.line((755,292,1150,292),fill=(8,15,30,250),width=13)
 for x,y in [(805,140),(868,172),(1020,138),(1100,231),(896,340)]:d.ellipse((x,y,x+3,y+3),fill=(240,218,174,145))
 d.polygon([(0,586),(W,586),(W,H),(0,H)],fill=(5,8,17,255))
 # bedroom shadow on lower side, bed and alarm on nightstand
 d.rectangle((170,458,690,574),fill=(33,43,66,255))
 d.rounded_rectangle((154,448,710,517),radius=17,fill=(57,68,88,255))
 d.rounded_rectangle((211,443,405,501),radius=20,fill=(200,207,208,255))
 d.rectangle((140,553,733,575),fill=(15,17,28,255))
 d.rectangle((720,485,837,563),fill=(45,48,58,255))
 d.rectangle((735,561,749,591),fill=(33,35,42,255));d.rectangle((813,561,826,591),fill=(33,35,42,255))
 return base

BEDROOM=background_bedroom()

def clock(d,t,blink=False):
 x,y=775,463
 d.rounded_rectangle((x-45,y-37,x+50,y+28),radius=12,fill=(31,35,52,255),outline=(95,109,130,255),width=4)
 d.text((x+2,y-1),'05:00' if not blink or math.sin(t*6)>-0.8 else '     ',font=fnt(25),anchor='mm',fill=(246,126,124,255))
 for a in [-23,27]:d.line((x+a,y+30,x+a-5,y+40),fill=(87,97,112,255),width=5)

def background_street(warm=.25):
 base=Image.new('RGB',(W,H),(10,17,33));ar=np.asarray(base).copy(); yy=np.linspace(0,1,H)[:,None,None]
 night=np.array([11,22,42]);day=np.array([67,63,68]);bottom=np.array([30,43,62]);bottomday=np.array([170,107,83]);a=night*(1-warm)+day*warm;b=bottom*(1-warm)+bottomday*warm
 gradient=np.broadcast_to(a[None,None,:]*(1-yy)+b[None,None,:]*yy,(H,W,3));base=Image.fromarray(np.uint8(gradient),'RGB')
 d=ImageDraw.Draw(base,'RGBA')
 # parallax skyline (separate architecture from gym)
 for i in range(16):
  x=i*104-30; hh=190+(i*73)%174
  d.rectangle((x,525-hh,x+75,526),fill=(11,22,36,240))
  for y in range(555-hh,505,33):
   for a in [17,47]:
    d.rectangle((x+a,y,x+a+8,y+13),fill=(249,180,116,35+(i%4)*13))
 d.polygon([(0,525),(W,525),(W,H),(0,H)],fill=(12,18,29,252))
 d.line((0,526,W,526),fill=(118,143,166,110),width=4)
 for x in range(-50,1410,175):d.line((x,H,x+205,526),fill=(144,159,165,21),width=3)
 d.ellipse((1032,99,1100,167),fill=(247,171,116,int(65+160*warm)))
 # low retaining wall
 d.rectangle((0,499,W,530),fill=(26,34,51,240))
 return base
STREET_NIGHT=background_street(.05);STREET_DAWN=background_street(.95)

def street_img(t,warm):return Image.blend(STREET_NIGHT,STREET_DAWN,clamp(warm))

def caption(img,main,eyebrow='',position='left'):
 d=ImageDraw.Draw(img,'RGBA');y=74;x=78 if position=='left' else W//2;anchor='la' if position=='left' else 'ma'
 if eyebrow:d.text((x,y),eyebrow.upper(),font=fnt(16),fill=(247,175,127,245),anchor=anchor);y+=31
 # keep titles under 37 characters if possible
 size=35 if len(main)>28 else 40
 d.text((x+2,y+3),main.upper(),font=fnt(size),fill=(0,0,0,180),anchor=anchor)
 d.text((x,y),main.upper(),font=fnt(size),fill=(245,240,230,255),anchor=anchor)
 d.rounded_rectangle((x-50 if position!='left' else x,y+51,x+50 if position!='left' else x+85,y+56),radius=2,fill=(219,94,96,255))

def partial_fade(im,t,st,en):
 a=min(1,clamp((t-st)/.26),clamp((en-t)/.35))
 return im if a>.999 else Image.blend(Image.new('RGB',im.size,(5,8,17)),im,a)

def gray_gloves(d,x,y,a=255):
 d.ellipse((x-25,y-10,x+21,y+14),fill=(176,64,79,a))
 d.ellipse((x+33,y-4,x+64,y+14),fill=(176,64,79,a))

def draw_bag(d,local,impact=0):
 sx=0
 for n in range(7):
  mark=.38+n*1.27
  if local>mark:
   age=local-mark;sx+=impact*math.exp(-2.65*age)*math.sin(8.5*age)
 return B.bag(d,max(0,local),amp=0,forced=sx)

def render_frame(f):
 t=f/FPS
 b=next(i for i,(st,en,k,_) in enumerate(BEATS) if st<=t<en)
 st,en,key,_=BEATS[b];local=t-st;dur=en-st
 warm=0 if t<112 else ease((t-112)/24)
 is_street=key.startswith('street') or key=='walk'
 is_bed=key in ['nightroom','alarm','alarm2']
 im = street_img(t,ease((t-70)/22) if key=='street_run2' else .12) if is_street else BEDROOM.copy() if is_bed else B.gym_base(t,warm)
 d=ImageDraw.Draw(im,'RGBA')
 # sparse dust/atmosphere: subtle, frame-deterministic
 if not is_bed:
  for k in range(12):
   rr=random.Random(141+k)
   x=rr.uniform(20,1250);y=(rr.uniform(30,650)-t*(3+k%3))%688
   d.ellipse((x-1,y-1,x+1,y+1),fill=(232,200,168,20+int(warm*25)))
 # foreground action and a few textual emotional beats
 if key=='collapse':
  draw_bag(d,local); B.body(d,B.crouch_pose(555,G,local,1.32),1.32)
  if local>1.4: caption(im,'KHÔNG AI VỖ TAY...','MỘT BỘ PHIM HOẠT HÌNH NGẮN')
 elif key=='gloves':
  B.body(d,B.crouch_pose(510,G,local,1.30),1.3)
  gy=min(G-5,280+470*max(0,local-.35)**1.5)
  gray_gloves(d,717,gy)
  if local>1:caption(im,'...CHO NGÀY ĐẦU TIÊN.','MỌI CHUYỆN BẮT ĐẦU TỪ MỘT LẦN NGÃ')
 elif key=='nightroom':
  # athlete too tired to stand; sat on bed
  pose=B.crouch_pose(475,585,local,1.3,slump=1)
  B.body(d,pose,1.3)
  clock(d,local)
  if local>1:caption(im,'CHẲNG AI BIẾT ANH ĐÃ THỬ.','ĐÊM THỨ NHẤT')
 elif key=='alarm':
  clock(d,local,True)
  if local>1.5:
   p=B.stand_pose(532,586,local,1.18,'stand',tired=False);B.body(d,p,1.18)
  else:
   B.body(d,B.crouch_pose(480,586,local,1.18),1.18)
  if local>.7:caption(im,'05:00 — BẮT ĐẦU LẠI.','SÁNG HÔM SAU')
 elif key=='walk':
  p=B.stand_pose(215+local*85,526,local,1.22,'walk');B.body(d,p,1.22)
  if local>.5:caption(im,'ĐI THÊM MỘT BƯỚC.','KHI CẢ THÀNH PHỐ CÒN NGỦ')
 elif key=='street_run':
  p=B.stand_pose(140+local*130,526,local,1.20,'run');B.body(d,p,1.2)
  for q in range(14):
   sx=1280-(local*170+q*110)%1450;sy=245+q*19
   d.line((sx,sy,sx+65,sy),fill=(189,204,215,20),width=2)
  if local>1:caption(im,'KHÔNG AI NHÌN THẤY.','NGÀY 01')
 elif key=='push_fail':
  pp=B.push_pose(550,G,local*.38,1.38,struggle=.75 if local>3.3 else .15)
  B.body(d,pp,1.38)
  if local>.75:caption(im,'CHỈ ĐƯỢC MỘT LẦN.','NGÀY 01 / PHÒNG TẬP')
 elif key=='crouch':
  B.body(d,B.crouch_pose(580,G,local,1.35,slump=1),1.35)
  gray_gloves(d,745,G-10)
  if local>1:caption(im,'VÀ HÀNG TRĂM LÝ DO ĐỂ BỎ.','MỌI THỨ ĐỀU ĐAU')
 elif key in ['boxing','bag_react','boxing_better']:
  strength=28 if key=='boxing' else 42 if key=='bag_react' else 58
  front=918-66;pp,ext=B.box_pose(680,G,local,front)
  draw_bag(d,local,impact=strength)
  if ext>.80:
   xx,yy=pp['hand1']
   for z in range(3):d.line((xx-42-z*15,yy+z*9,xx-71-z*14,yy+z*11),fill=(245,180,145,42+z*15),width=2)
  B.body(d,pp,1.18)
  if local>.8:
   caption(im,('HỌC CÁCH ĐỨNG VỮNG.' if key=='boxing' else 'MỘT CÚ. RỒI MỘT CÚ NỮA.' if key=='bag_react' else 'LẦN NÀY... MẠNH HƠN.'),'NGÀY 07' if key=='boxing' else 'NGÀY 30' if key=='boxing_better' else 'NGÀY 14')
 elif key=='marks':
  # foreground work, progressively accumulating wall scratches over repeated days
  draw_bag(d,local)
  B.body(d,B.stand_pose(607,G,local,1.14,'stand'),1.14)
  n=min(42,int(local*8)+2)
  for q in range(n):
   x=400+(q//7)*31;y=180+(q%7)*25
   d.line((x,y,x+12,y-17),fill=(235,185,151,160),width=4)
  if local>1:caption(im,'KHÔNG CÓ PHÉP MÀU.','CHỈ CÓ NHỮNG NGÀY LẶP LẠI')
 elif key=='alarm2':
  clock(d,local,True)
  B.body(d,B.stand_pose(489,586,local,1.25),1.25)
  if local>.6:caption(im,'LẠI LÀ 05:00.','VÀ ANH VẪN TỚI')
 elif key=='street_run2':
  p=B.stand_pose(100+local*149,526,local,1.24,'run');B.body(d,p,1.24)
  if local>1:caption(im,'CHẠY NHANH HƠN HÔM QUA.','NGÀY 21')
 elif key=='push_better':
  p=B.push_pose(550,G,local*.65,1.35,struggle=0)
  B.body(d,p,1.35)
  if local>1:caption(im,'THÊM MỘT LẦN NỮA.','NGÀY 28')
 elif key=='collapse2':
  draw_bag(d,local)
  B.body(d,B.crouch_pose(550,G,local,1.32,slump=1),1.32)
  gray_gloves(d,755,G-8)
  if local>.9: caption(im,'NHƯNG ANH VẪN MUỐN DỪNG.','MỘT NGÀY RẤT MỆT')
 elif key=='kid_door':
  # backlit small figure in the doorway, only gradual reveal
  draw_bag(d,local)
  B.body(d,B.crouch_pose(505,G,local,1.26),1.26)
  kid=B.stand_pose(1175,G,local,.70)
  B.body(d,kid,.70,alpha=int(255*ease((local-.3)/2)),accent=(245,174,121))
  if local>2:caption(im,'CÓ MỘT NGƯỜI ĐANG NHÌN.','LẦN ĐẦU TIÊN...')
 elif key=='kid_try':
  B.body(d,B.push_pose(822,G,local*.40,.76,True,struggle=.36 if local>4 else 0),.76,kid=True,accent=(244,177,121))
  adult=B.crouch_pose(395,G,local,.92,slump=.72)
  B.body(d,adult,.92,alpha=160)
  if local>1.1:caption(im,'CẬU BÉ ĐANG TẬP THEO.','KHÔNG MỘT LỜI NÓI')
 elif key=='kid_fail':
  p=B.push_pose(828,G,local*.28,.77,True,struggle=1)
  B.body(d,p,.77,kid=True,accent=(244,177,121))
  if local>1:caption(im,'RỒI CẬU CŨNG NGÃ.','CẬU ẤY KHÔNG BỎ CHẠY')
 elif key=='adult_notices':
  adult=B.crouch_pose(445,G,local,1.19,slump=1-ease(local/4)*.6)
  B.body(d,adult,1.19)
  kid=B.crouch_pose(857,G,local,.75,slump=.5)
  B.body(d,kid,.75,kid=True,accent=(244,177,121))
  if local>1.1:caption(im,'ANH THẤY CHÍNH MÌNH.','TRONG ĐÔI MẮT NHỎ')
 elif key=='together':
  p1=B.push_pose(380,G,local*.48,1.14)
  p2=B.push_pose(855,G,local*.48,.77,True,struggle=0)
  B.body(d,p1,1.14)
  B.body(d,p2,.77,kid=True,accent=(244,177,121))
  if local>1:caption(im,'LẦN NÀY KHÔNG CÒN MỘT MÌNH.','HAI NGƯỜI / MỘT NHỊP THỞ')
 elif key=='help_up':
  a=B.stand_pose(558,G,local,1.15);c=B.stand_pose(784,G,local,.79)
  a['hand1']=(665,G-156);a['elbow1']=B.ik((a['shoulder'][0]+14,a['shoulder'][1]),a['hand1'],93,91,1)
  B.body(d,a,1.15);B.body(d,c,.79,kid=True,accent=(244,177,121))
  if local>1:caption(im,'MỘT BÀN TAY ĐƯA RA.','BÌNH MINH ĐẾN')
 elif key=='sunrise':
  B.body(d,B.stand_pose(560,G,local,1.15),1.15)
  B.body(d,B.stand_pose(790,G,local,.8),.8,kid=True,accent=(244,177,121))
  d.polygon([(95,473),(382,472),(1120,713),(545,717)],fill=(248,186,114,67))
  caption(im,'BẠN ĐÃ TRỞ THÀNH ÁNH SÁNG.','KHÔNG AI VỖ TAY... NHƯNG CÓ NGƯỜI NHÌN THẤY')
 elif key=='endcard':
  # very short ending with readable final quote
  dr=ImageDraw.Draw(im,'RGBA');dr.rectangle((0,0,W,H),fill=(5,9,20,235))
  dr.text((W//2,290),'ĐỪNG BỎ CUỘC.',font=fnt(67),fill=(248,232,209),anchor='mm')
  dr.text((W//2,374),'BẠN ĐANG TRỞ THÀNH LÝ DO ĐỂ AI ĐÓ CỐ GẮNG.',font=fnt(24,False),fill=(238,177,145),anchor='mm')
  dr.line((W//2-95,426,W//2+95,426),fill=(201,86,91),width=5)
 # light letterbox and soft cut
 d=ImageDraw.Draw(im,'RGBA');d.rectangle((0,0,W,23),fill=(3,5,10,250));d.rectangle((0,695,W,H),fill=(3,5,10,250))
 return partial_fade(im,t,st,en)


def make_score(path):
 """Entirely original harmonic ambient score and diegetic hits; no copyrighted samples."""
 sr=24000;total=DURATION;num=int(sr*total)
 audio=np.zeros(num,dtype=np.float32)
 chords=[(0,[146.83,174.61,220.0]),(16,[130.81,164.81,196.0]),(35,[146.83,185.0,220.0]),(60,[130.81,174.61,196.0]),(81,[146.83,185.0,220.0]),(99,[130.81,164.81,196.0]),(118,[174.61,220.0,261.63])]
 for i,(start,notes) in enumerate(chords):
  end=chords[i+1][0] if i+1<len(chords) else total
  a=int(start*sr);b=int(end*sr);t=np.arange(b-a,dtype=np.float32)/sr
  fade=np.clip(np.minimum(t/1.4,(end-start-t)/1.7),0,1)
  w=np.zeros_like(t)
  for j,hz in enumerate(notes):
   w+=(.33/(j+1))*(np.sin(2*np.pi*hz*t)+.20*np.sin(2*np.pi*(hz*2)*t))
  swell=.8+.2*np.sin(2*np.pi*.09*t)
  audio[a:b]+=.17*w*fade*swell
 # melodic motif evolves from minor solitary to warm major
 motif=[293.66,261.63,220,261.63,293.66,349.23,392.0,349.23]
 for j,start in enumerate(np.arange(2,138,2.3)):
  hz=motif[j%len(motif)] * (2**(1/12) if start>120 else 1)
  a=int(start*sr);b=min(num,a+int(1.4*sr));t=np.arange(b-a,dtype=np.float32)/sr
  env=(1-np.exp(-t*9))*np.exp(-t*2.35)
  vol=.037 if start<28 else .048 if start<98 else .060
  audio[a:b]+=vol*env*(np.sin(2*np.pi*hz*t)+.12*np.sin(2*np.pi*hz*2*t))
 # low, music-synchronized cinematic heartbeat and kicks
 for stamp in np.arange(1.25,136,1.5):
  if 99<stamp<112:continue
  a=int(stamp*sr);b=min(num,a+int(.22*sr));t=np.arange(b-a,dtype=np.float32)/sr
  vol=.033 if stamp<20 else .063 if stamp<100 else .045
  audio[a:b]+=vol*np.sin(2*np.pi*(54*t-22*t*t))*np.exp(-20*t)
 # heavy bag impacts occur only in boxing segments
 for start,end in [(47,54),(54,60),(86,92)]:
  for stamp in np.arange(start+.4,end,1.27):
   a=int(stamp*sr);b=min(num,a+int(.28*sr));t=np.arange(b-a,dtype=np.float32)/sr
   rng=np.random.default_rng(int(stamp*1000))
   noise=rng.standard_normal(b-a,dtype=np.float32)
   audio[a:b]+=.058*noise*np.exp(-41*t)+.16*np.sin(2*np.pi*49*t)*np.exp(-17*t)
 # glove and emotional drop; physical sound
 for stamp in [5.8,92.8,110.5]:
  a=int(stamp*sr);b=min(num,a+int(.4*sr));t=np.arange(b-a,dtype=np.float32)/sr
  audio[a:b]+=.12*np.sin(2*np.pi*73*t)*np.exp(-19*t)
 # mix falloff and silence on final quote
 z=np.arange(num,dtype=np.float32)/sr
 final=np.clip((140-z)/2.2,0,1)
 fade=np.clip(z/1.8,0,1)
 audio*=fade*final
 audio=np.tanh(audio*2.1)*.85
 pcm=(np.clip(audio,-.99,.99)*32767).astype(np.int16)
 with wave.open(str(path),'wb') as wf:
  wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(sr)
  wf.writeframes(pcm.tobytes())

def get_preview():
 # 24 production stills, original render not AI placeholders
 times=[2.5,7,13,19,25,32,38,44,50,57,63,69,76,83,89,95,102,108,115,121,127,132,136,139]
 tw,th=384,216
 board=Image.new('RGB',(tw*4,th*6),(8,12,22))
 for i,tt in enumerate(times):
  image=render_frame(round(tt*FPS)).resize((tw,th),Image.Resampling.LANCZOS)
  board.paste(image,((i%4)*tw,(i//4)*th))
 board.save(OUT/'storyboard-24-frames.jpg',quality=92,optimize=True)
 return times

def make_thumbnail():
 # Thumbnail composed from the fully original movie characters/background.
 im=B.gym_base(136,1)
 d=ImageDraw.Draw(im,'RGBA')
 B.body(d,B.stand_pose(780,G,1,1.25),1.25)
 B.body(d,B.stand_pose(1020,G,1,.8),.8,kid=True,accent=(244,177,121))
 d.polygon([(78,470),(380,472),(1030,719),(488,719)],fill=(247,173,108,59))
 # dark left text plate, accessible contrast
 d.rounded_rectangle((40,132,700,434),radius=28,fill=(6,11,26,215))
 d.text((73,167),'KHÔNG AI',font=fnt(70),fill=(242,238,228))
 d.text((73,248),'VỖ TAY',font=fnt(80),fill=(246,175,137))
 d.text((74,364),'CHO NGÀY ĐẦU TIÊN',font=fnt(32),fill=(243,233,212))
 # Expand to actual 16:9 1920x1080
 im=im.resize((1920,1080),Image.Resampling.LANCZOS)
 im.save(OUT/'thumbnail-youtube.png',optimize=True)

def render_full():
 times=get_preview();make_thumbnail();make_score(OUT/'original-score.wav')
 silent=OUT/'silent-720p-24fps.mp4'
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1280x720','-r',str(FPS),'-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(silent)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,bufsize=10**7)
 start=time.monotonic()
 try:
  for j in range(FPS*DURATION):
   im=render_frame(j)
   proc.stdin.write(im.tobytes())
   if j%240==0:print(f'PROGRESS {j}/{FPS*DURATION} ({100*j/(FPS*DURATION):.0f}%), wall {time.monotonic()-start:.1f}s',flush=True)
 finally:
  proc.stdin.close()
 code=proc.wait()
 if code:raise RuntimeError(f'Encoding failed with return code {code}')
 # upscale clean vectors using high-quality Lanczos to requested delivery 1080p; 24 -> 30 FPS duplicate frames.
 final=OUT/'video-final.mp4'
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(silent),'-i',str(OUT/'original-score.wav'),'-filter:v','scale=1920:1080:flags=lanczos,fps=30','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-t','140',str(final)]
 print('FINAL ENCODE',flush=True);subprocess.run(cmd,check=True)
 sha=hashlib.sha256(final.read_bytes()).hexdigest()
 manifest={'title':'Không Ai Vỗ Tay Cho Ngày Đầu Tiên','slug':'khong-ai-vo-tay-cho-ngay-dau-tien','durationSeconds':140,'output':{'width':1920,'height':1080,'fps':30,'format':'H.264/AAC','renderBase':'1280x720 at 24fps; upscaled and resampled to 1080p30'},'assets':{'video':final.name,'thumbnail':'thumbnail-youtube.png','originalScore':'original-score.wav','storyboard':'storyboard-24-frames.jpg'},'sha256':sha,'storyBeats':BEATS,'status':'rendered-local-awaiting-external-review'}
 (OUT/'production-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 print('FINAL_READY',final,final.stat().st_size,sha,flush=True)
if __name__=='__main__':
 if len(sys.argv)>1 and sys.argv[1]=='preview':get_preview();make_thumbnail()
 elif len(sys.argv)>1 and sys.argv[1]=='score':make_score(OUT/'original-score.wav')
 else:render_full()
