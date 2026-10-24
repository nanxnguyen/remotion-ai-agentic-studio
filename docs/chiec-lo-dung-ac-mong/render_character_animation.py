#!/usr/bin/env python3
"""Narrative-first 2D character-animation fallback.

This is REAL frame-driven puppet acting (not a static-image slideshow), but it
is NOT AI-generated CGI/3D. Do not call it a photorealistic or native 3D film.
"""
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import math,random,subprocess,argparse,json
import numpy as np
W,H,FPS=540,960,30
HERE=Path(__file__).resolve().parent
DUR=45
N=DUR*FPS
COLD=(15,19,39);WARM=(253,190,106);VIOLET=(101,45,160)
def cv(a,b,t):
 t=max(0,min(1,t));return tuple(round(a[i]*(1-t)+b[i]*t) for i in range(3))
def font(size=20,bold=False):
 return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans"+("-Bold" if bold else "")+".ttf",size)
def oval(d,x,y,rx,ry,fill,outline=None,w=1):
 d.ellipse((int(x-rx),int(y-ry),int(x+rx),int(y+ry)),fill=fill,outline=outline,width=w)
def line(d,xy,color,width=4):
 d.line(xy,fill=color,width=width,joint="curve")
def roundrect(d,box,fill,outline=None,r=15,w=1):
 d.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=w)
def pulse(t,speed=2):
 return (1+math.sin(t*speed))*.5
def smooth(x):
 x=max(0,min(1,x));return x*x*(3-2*x)
def eased(t,a,b):return smooth((t-a)/(b-a))
def bg_base():
 im=Image.new("RGB",(W,H));p=im.load()
 for y in range(H):
  top=(10,14,32); bot=(30,24,42)
  col=cv(top,bot,y/H)
  for x in range(W):
   v=int(9*max(0,1-abs(x-W*.5)/(W*.5)))
   p[x,y]=(min(255,col[0]+v),min(255,col[1]+v),min(255,col[2]+v))
 d=ImageDraw.Draw(im)
 roundrect(d,(24,188,514,795),(28,30,50),(65,70,93),20,3)
 # Fixed room continuity: window on right rear, bed left, lamp on left nightstand.
 roundrect(d,(324,217,480,515),(12,22,48),(76,85,111),5,7)
 line(d,[(402,218),(402,514)],(71,81,114),3);line(d,[(327,366),(478,366)],(71,81,114),3)
 oval(d,443,266,26,26,(226,223,185))
 for a,x,w,h in [(0,328,25,70),(0,360,31,115),(0,405,21,56),(0,440,37,110)]:
  d.rectangle((x,492-h,x+w,494),fill=(26,31,62))
 roundrect(d,(48,506,328,747),(50,61,87),(90,107,139),24,3)
 roundrect(d,(51,535,335,722),(64,79,108),None,23)
 roundrect(d,(58,533,156,612),(164,180,204),None,15)
 d.rectangle((26,688,504,717),fill=(27,29,47))
 roundrect(d,(290,651,366,728),(84,63,67),(130,105,95),5,2)
 # star-lamp base and ring on bedside table, crucial consistent light source
 line(d,[(332,640),(332,610)],(160,121,77),6)
 for k in range(5):
  a=k*math.tau/5-math.pi/2
  x=332+16*math.cos(a);y=592+16*math.sin(a)
  if k==0:pts=[]
  pts.append((x,y))
 d.polygon(pts,fill=(200,134,68))
 roundrect(d,(46,249,153,314),(34,33,46),(88,77,87),12,3)
 d.text((55,262),"03:00",font=font(24,True),fill=(237,91,92))
 return im
BASE=bg_base()
CAPTIONS=[
 "BA GIỜ SÁNG","KHÔNG CHẠM VÀO NAM","MỘT BÍ MẬT NHỎ",
 "CHIẾC LỌ ÁC MỘNG","ĐÊM NÀO CŨNG VẬY","CHIẾC LỌ NỨT RỒI",
 "KHÔNG CÒN KỊP NỮA","ÁC MỘNG THOÁT RA","NÓ KHÔNG BỎ CHẠY",
 "BẢO VỆ NAM ĐẾN CÙNG","LẦN ĐẦU NAM HIỂU","AI CŨNG CẦN ĐƯỢC CHE CHỞ"
]
START=[0,3,6,10,13,17,20,24,28,32,36,40]
END=START[1:]+[45]
def chapter(t):
 for i,e in enumerate(END):
  if t<e:return i
 return 11
def lamp(d,t):
 bright=eased(t,36.5,37.3)
 dim=.13+.04*math.sin(t*2)
 power=dim+(1-dim)*bright
 x,y=332,592
 for z in range(9,1,-1):
  rad=8+z*13
  c=cv((30,31,50),WARM,power*.08*(11-z))
  oval(d,x,y,rad,rad,c)
 pts=[]
 for k in range(10):
  a=k*math.pi/5-math.pi/2
  r=20 if k%2==0 else 8
  pts.append((x+math.cos(a)*r,y+math.sin(a)*r))
 d.polygon(pts,fill=cv((158,111,56),(255,239,153),power))
 return power
def nightmare(d,t,lamp_power):
 # Foreshadow lamp repels nightmare light during early extraction.
 if t<3:return
 center=(181+math.sin(t*2)*19,448+math.cos(t*1.5)*22)
 if t<24:
  vis=.25+.26*min(1,t/15)
  if 6<t<10 and math.sin(t*9)>0.3:
   center=(center[0]-18,center[1]-7)
  for k in range(10):
   y=center[1]+(k-5)*16
   x=center[0]+math.sin(t*3+k*.8)*22
   oval(d,x,y,12+4*math.sin(t+k),21,cv((40,26,66),VIOLET,vis))
  return
 scale=eased(t,24,27)*(1-eased(t,36.7,40.5))
 if scale<.001:return
 x=390-32*eased(t,28,33);y=425+math.sin(t*1.3)*16
 for i in range(9):
  a=i*.76+t*.21
  rr=(70+25*math.sin(t*2+i))*scale
  xx=x+rr*math.cos(a);yy=y+rr*math.sin(a)
  oval(d,xx,yy,32*scale,55*scale,cv((25,23,45),VIOLET,.35))
 oval(d,x,y,105*scale,145*scale,cv((26,25,51),VIOLET,.38))
 if scale>.3:
  oval(d,x-30*scale,y-12*scale,6*scale,6*scale,(241,65,108))
  oval(d,x+30*scale,y-12*scale,6*scale,6*scale,(241,65,108))
def boy(d,t):
 # Recumbent child, awake + reaches lamp then hugs.
 awake=eased(t,32.6,35.2);reach=eased(t,36,37.15)
 hug=eased(t,37.9,40.1)
 x=186+awake*8;y=559-awake*48
 skin=(244,184,140);hair=(42,29,42)
 # blanket, collar and legs
 roundrect(d,(90,584,294,687),(70,110,169),(133,166,205),36,3)
 line(d,[(92,626),(300,626)],(150,182,219),3)
 oval(d,x,y,66,66,skin,(178,118,99),2)
 d.pieslice((x-67,y-68,x+67,y+35),177,365,fill=hair)
 # cowlick
 d.polygon([(x-35,y-49),(x-14,y-93),(x+2,y-61)],fill=hair)
 eye_y=y+11
 if awake<.05:
  d.arc((x-27,eye_y,x-3,eye_y+10),0,175,fill=(76,51,68),width=3)
  d.arc((x+7,eye_y,x+31,eye_y+10),0,175,fill=(76,51,68),width=3)
 else:
  ex=eased(t,32.6,35.2)
  oval(d,x-17,eye_y,4,2+8*ex,(68,50,58))
  oval(d,x+17,eye_y,4,2+8*ex,(68,50,58))
  if t>37.5:
   oval(d,x+29,eye_y+13,3,6,(139,206,236))
 d.arc((x-13,y+24,x+15,y+38),10 if t>=38.8 else 200,172 if t>=38.8 else 335,fill=(117,64,64),width=2)
 if 36<t<38.7:
  # arm reaching up/right to press lamp, then retract
  armx=x+35+reach*102
  army=y+38+(1-reach)*12
  line(d,[(x+30,y+46),(x+86,y+50),(armx,army+5)],skin,12)
  oval(d,armx,army+5,8,8,skin)
 if hug>.03:
  line(d,[(x-41,y+45),(x+3+80*hug,y+110),(x+39+70*hug,y+145)],skin,13)
def monster(d,t):
 # Mực: indigo fluffy puppet, alive every frame with breath and blinks.
 if t<.6:return
 guard=eased(t,28,30.1)*(1-eased(t,36.9,39))
 resting=eased(t,38.5,40.5)
 p=.5+.5*math.sin(t*2.8)
 x=115+20*eased(t,1,4)+50*eased(t,17,21)+102*guard+95*resting
 y=694-190*eased(t,1,3.7)+36*eased(t,18,25)-105*guard-46*resting
 y+=2.4*math.sin(t*3.3)
 if t>=40:
  x=295+math.sin(t)*1.5;y=623+math.sin(t*2)*1
 fur=(49,65,131);edge=(108,119,199)
 energy=1-.78*(eased(t,32,35.3)-eased(t,39,41.5))
 # tiny legs attached to body 
 line(d,[(x-21,y+53),(x-27,y+85-5*p)],fur,13)
 line(d,[(x+23,y+52),(x+27,y+82+4*p)],fur,13)
 # swinging arms, realistic elbow
 if guard>.1:
  line(d,[(x-36,y-8),(x-68-35*guard,y-36-25*guard),(x-83-40*guard,y-46)],fur,14)
  line(d,[(x+36,y-8),(x+70+30*guard,y-40-28*guard),(x+82+35*guard,y-47)],fur,14)
 else:
  sway=13*math.sin(t*5)*(1-resting)
  line(d,[(x-32,y-7),(x-48+sway,y+27),(x-44+sway,y+48)],fur,12)
  line(d,[(x+32,y-7),(x+53-sway,y+23),(x+42-sway,y+50)],fur,12)
 oval(d,x,y,49+2*p,63+1*p,fur,edge,2)
 # tufted silhouette: 16 persistent hair spikes
 for k in range(15):
  a=k*math.pi/8
  xx=x+48*math.cos(a);yy=y-58*math.sin(a)
  tx=xx+11*math.cos(a+.1*math.sin(t*2+k))
  ty=yy-9*math.sin(a)
  line(d,[(xx,yy),(tx,ty)],cv(edge,fur,.45),5)
 # small ears with notch on left
 d.polygon([(x-40,y-43),(x-49,y-77),(x-20,y-61)],fill=fur)
 d.polygon([(x+40,y-43),(x+49,y-77),(x+20,y-61)],fill=fur)
 line(d,[(x-43,y-64),(x-36,y-57)],(33,32,70),4)
 blink=math.sin(t*3.7)>.993
 for off in [-21,21]:
  oval(d,x+off,y-12,17,19,(245,178,65) if not blink else (54,56,82))
  if not blink:oval(d,x+off+4,y-12,6,12,(42,35,59))
 d.arc((x-12,y+16,x+12,y+31),5 if t>39 else 192,173 if t>39 else 342,fill=(229,198,216),width=2)
 if t>30 and t<38:
  oval(d,x-35,y+13,3,9,(152,223,246))
 if t>=32:oval(d,x+22,y-12,17,19,cv((57,55,90),(245,178,65),energy))
def jar(d,t):
 if t>=24:return
 mx=165+45*eased(t,17,20)
 x=mx+20;y=601+14*math.sin(t*.9)
 roundrect(d,(x-28,y-56,x+32,y+55),(45,38,65),(183,167,190),13,3)
 roundrect(d,(x-16,y-63,x+19,y-53),(155,115,95),(211,172,132),3,2)
 fillp=min(1,.12+t*.032)
 d.pieslice((x-20,y+54-95*fillp,x+24,y+49),0,360,fill=(85,44,129))
 for k in range(9):
  a=t*2.4+k*.8
  oval(d,x+10*math.sin(a),y+34-(k*13)*fillp,3,7,(156,84,212))
 if t>=17:
  m=eased(t,17,23)
  line(d,[(x+16,y-32),(x+3,y-13),(x+14,y+7),(x-8,y+24*m)],(225,197,245),2)
 if t>=23.3:
  for q in range(7):
   rr=(t-23.3)*12+q*2
   oval(d,x+(q-3)*rr,y+q*3,2,4,(220,170,248))
def subtitle(d,t):
 i=chapter(t)
 label=CAPTIONS[i]
 d.rounded_rectangle((28,819,512,883),radius=16,fill=(13,17,38),outline=(76,78,114),width=2)
 f=font(20,True)
 box=d.textbbox((0,0),label,font=f);w=box[2]-box[0]
 d.text(((W-w)/2,836),label,font=f,fill=WARM if i in (0,5,7,9,11) else (251,244,242))
 # subtle time progress below title
 d.rectangle((42,900,498,904),fill=(54,60,91))
 d.rectangle((42,900,42+int(456*(t/DUR)),904),fill=(241,161,98))
def draw_frame(frame):
 t=frame/FPS
 im=BASE.copy()
 d=ImageDraw.Draw(im)
 power=lamp(d,t)
 nightmare(d,t,power)
 boy(d,t)
 monster(d,t)
 jar(d,t)
 if t>39:
  for k in range(26):
   sx=(k*73+int(t*4))%W
   sy=220+(k*131)%400
   alpha=eased(t,39,41)*(1-eased(t,43.8,45))
   oval(d,sx,sy,1.5+1.5*math.sin(t+k),1.5,(int(172+50*alpha),int(151+56*alpha),int(129+70*alpha)))
 subtitle(d,t)
 return im
def music(out):
 sr=24000
 duration=DUR
 a=np.zeros(sr*duration,dtype=np.float32)
 progression=[(0,[164.81,196,246.94]),(8,[146.83,174.61,220]),(17,[130.81,164.81,196]),(24,[123.47,155.56,196]),(32,[130.81,164.81,220]),(38,[174.61,220,261.63])]
 for start,notes in progression:
  for idx,freq in enumerate(notes):
   st=int((start+idx*.13)*sr);length=min(sr*8,len(a)-st)
   if length<=0:continue
   ts=np.arange(length,dtype=np.float32)/sr
   decay=np.exp(-ts/2.3)*(1-np.exp(-ts*12))
   a[st:st+length]+=(np.sin(2*np.pi*freq*ts)+.2*np.sin(2*np.pi*2*freq*ts)+.11*np.sin(2*np.pi*3*freq*ts))*decay*.034
 # sound effects keyed to actual actions (jar crack, break, lamp, stars)
 rng=np.random.default_rng(91)
 for at,noise,dur,amp in [(17.2,"crack",.20,.055),(23.95,"glass",.67,.14),(36.78,"switch",.08,.11),(40.1,"chime",.85,.035)]:
  st=int(at*sr);ln=min(int(dur*sr),len(a)-st)
  if noise=="chime":
   ts=np.arange(ln)/sr;v=np.sin(2*np.pi*880*ts)*np.exp(-ts*6)
  else:
   n=rng.normal(0,1,ln)
   smoothn=np.convolve(n,np.ones(11)/11,mode="same")
   v=(n*.3+smoothn*.7)*np.exp(-np.arange(ln)/(ln*.20))
  a[st:st+ln]+=v*amp
 a=np.tanh(a*1.4)
 import wave
 with wave.open(str(out),"wb") as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
  w.writeframes((a*32767).astype("<i2").tobytes())
def main():
 p=argparse.ArgumentParser()
 p.add_argument("--out",required=True);p.add_argument("--music",required=True);p.add_argument("--frames",type=int,default=N)
 args=p.parse_args()
 Path(args.out).parent.mkdir(parents=True,exist_ok=True)
 Path(args.music).parent.mkdir(parents=True,exist_ok=True)
 music(Path(args.music))
 cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-vf","scale=1080:1920:flags=lanczos","-c:v","libx264","-preset","veryfast","-crf","22","-pix_fmt","yuv420p","-movflags","+faststart",str(args.out)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 try:
  for i in range(min(args.frames,N)):
   im=draw_frame(i)
   proc.stdin.write(im.tobytes())
   if i%150==0:print("rendered",i,"/",args.frames,flush=True)
 finally:
  proc.stdin.close()
 rc=proc.wait()
 if rc:raise SystemExit(f"FFmpeg encode failed: {rc}")
 print("Completed visual",args.out,flush=True)
if __name__=="__main__":main()
