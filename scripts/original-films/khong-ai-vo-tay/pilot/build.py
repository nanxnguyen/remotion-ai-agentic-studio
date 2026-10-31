#!/usr/bin/env python3
"""Original 2D cinematic animated story preview, procedural SVG-like vector animation and original score.
Completely original artwork. Render deterministic frames in Pillow, then encode H.264 through ffmpeg.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math, random, subprocess, wave, os, sys
import numpy as np
from pathlib import Path

OUT=Path(__file__).resolve().parent; OUT.mkdir(exist_ok=True)
W,H,FPS,DURATION=1280,720,24,50
N=FPS*DURATION
G=596
FONT='/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
FONT_R='/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'
IVORY=(239,231,217); DARK=(8,14,27); CORAL=(208,80,93); AMBER=(246,184,113)
font_cache={}

def font(size, bold=True):
 k=(size,bold)
 if k not in font_cache: font_cache[k]=ImageFont.truetype(FONT if bold else FONT_R,size)
 return font_cache[k]

def mix(a,b,u): return a+(b-a)*u

def clamp(u): return min(1,max(0,u))

def ease(u):
 u=clamp(u);return u*u*(3-2*u)

def tri(u): return 1-abs(2*(u%1)-1)

def draw_capsule(d,a,b,r,color,outline=None):
 x,y=a;xx,yy=b
 d.line([(int(x),int(y)),(int(xx),int(yy))],fill=color,width=max(1,int(2*r)),joint='curve')
 for px,py in (a,b):d.ellipse((int(px-r),int(py-r),int(px+r),int(py+r)),fill=color)

def vec(x,y):return (float(x),float(y))

def lerp_point(a,b,t):return (mix(a[0],b[0],t),mix(a[1],b[1],t))

def ik(a,b,L1,L2,bend=1):
 dx=b[0]-a[0];dy=b[1]-a[1];ang=math.atan2(dy,dx)
 dist=max(abs(L1-L2)+.01,min(L1+L2-.01,math.hypot(dx,dy)))
 theta=math.acos(max(-1,min(1,(L1*L1+dist*dist-L2*L2)/(2*L1*dist))))
 return (a[0]+math.cos(ang+bend*theta)*L1,a[1]+math.sin(ang+bend*theta)*L1)

def circ(d,p,r,color):
 x,y=p;d.ellipse((int(x-r),int(y-r),int(x+r),int(y+r)), fill=color)

def backdrop(t, dawn=0, camera=0):
 # Photo-like illustrated gradients, volumetric light and charcoal atmosphere.
 dawn=clamp(dawn)
 yy,xx=np.mgrid[0:H,0:W]
 u=xx/W;v=yy/H
 top=np.array([8,14,28]);bot=np.array([20,32,49]);warm=np.array([43,33,42]);light=np.array([69,54,52])
 row=(top[None,None,:]*(1-v[:,:,None])+bot[None,None,:]*v[:,:,None]);row=row*(1-dawn)+ ((warm[None,None,:]*(1-v[:,:,None])+light[None,None,:]*v[:,:,None]))*dawn
 radial=np.exp(-(((u-.24)/.34)**2+((v-.50)/.68)**2))*15
 light_rad=np.exp(-(((u-.18)/.19)**2+((v-.3)/.37)**2))*75*dawn
 row[:,:,0] += radial*.70 + light_rad*1.0
 row[:,:,1] += radial*.65 + light_rad*.83
 row[:,:,2] += radial*.90 + light_rad*.51
 # deterministic vignette
 vig=1-.42*np.maximum(0,(((u-.5)/.69)**2+((v-.5)/.77)**2))
 row*=vig[:,:,None]
 rng=np.random.default_rng(13)
 grain=rng.normal(0,1.3,(H,W,1));row+=grain
 row=np.uint8(np.clip(row,0,255));img=Image.fromarray(row,'RGB');d=ImageDraw.Draw(img,'RGBA')
 # distant ceiling industrial beams
 for x in [10,415,830,1240]:
  d.polygon([(x-30,0),(x+4,0),(x+90,84),(x+65,84)],fill=(5,8,14,130))
 d.line([(0,120),(W,120)],fill=(109,130,160,45),width=6)
 # long window, blue beyond with haze
 wx=int(86-camera*.23)
 d.rounded_rectangle((wx,133,wx+303,472),radius=7,fill=(24+int(dawn*44),51+int(dawn*33),85+int(dawn*8),245),outline=(111,140,166,180),width=9)
 for h in [195,278,351]:
  d.line((wx,h,wx+303,h),fill=(11,22,39,226),width=10)
 d.line((wx+150,132,wx+150,473),fill=(11,22,39,235),width=12)
 # panes mist / distant rain
 rng=random.Random(22)
 for i in range(32):
  x=wx+rng.randint(13,286); y=rng.randint(145,454)
  d.line((x,y,x-3,y+20),fill=(169,193,218,35),width=1)
 # window ray as transparent polygons
 d.polygon([(wx+18,473),(wx+292,473),(wx+635,590),(wx+440,590)],fill=(106+int(dawn*120),132+int(dawn*50),174-int(dawn*54),int(23+60*dawn)))
 # back wall markings, motivational recording without textual branding
 for j in range(26):
  x=452+(j//6)*30; y=267+(j%6)*14
  d.line([(x,y),(x+10,y-17)],fill=(139,149,161,int(32+14*dawn)),width=3)
 # door with dramatic underlighting
 d.rectangle((1117,201,1267,G),fill=(7,10,19,234),outline=(79,101,121,105),width=10)
 d.polygon([(1118,246),(1142,249),(1176,G),(1135,G)],fill=(196,163,122,int(13+dawn*80)))
 d.ellipse((1236,399,1243,406),fill=(183,158,111,195))
 # floor
 d.polygon([(0,G),(1280,G),(1280,H),(0,H)],fill=(4,8,16,235))
 d.line([(0,G),(W,G)],fill=(129,150,161,80),width=3)
 for y in [635,689]:d.line([(0,y),(W,y)],fill=(111,124,133,27),width=2)
 for x in [145,415,689,962,1200]:
  d.line([(x,G),(640+(x-640)*1.7,H)],fill=(100,117,137,18),width=2)
 # medicine ball, bench and silhouettes in distance
 d.ellipse((454,542,516,602),fill=(22,35,55,200),outline=(93,120,149,80),width=3)
 d.rounded_rectangle((528,520,668,537),radius=8,fill=(53,67,80,140))
 d.line((551,535,531,587),fill=(70,86,100,120),width=12)
 d.line((644,535,658,588),fill=(70,86,100,120),width=12)
 return img

# Precompute expensive static environments.
BG_NIGHT=backdrop(0,0)
BG_DAWN=backdrop(0,1)

def gym_base(t,warm=0):
 if warm<=0:return BG_NIGHT.copy()
 if warm>=1:return BG_DAWN.copy()
 return Image.blend(BG_NIGHT,BG_DAWN,warm)

def bag(d,t,amp=0,base_x=918,forced=0):
 sw=forced+amp*math.exp(-.9*max(t,0))*math.sin(6.2*max(t,0))
 cx=base_x+sw; top=305; bot=572
 d.ellipse((cx-85,G-4,cx+85,G+12),fill=(0,0,0,92))
 d.line([(base_x,89),(cx,top+9)],fill=(139,154,163,240),width=5)
 d.line([(base_x-22,89),(base_x+22,89)],fill=(170,176,181,150),width=14)
 d.rounded_rectangle((cx-66,top,cx+66,bot),radius=50,fill=(138,47,60,255),outline=(224,109,112,140),width=4)
 d.rounded_rectangle((cx-55,top+20,cx-29,bot-21),radius=17,fill=(244,132,125,70))
 d.rectangle((cx-59,350,cx+59,363),fill=(72,31,47,195))
 d.rectangle((cx-59,510,cx+59,520),fill=(72,31,47,185))
 d.rounded_rectangle((cx-43,399,cx+43,443),radius=9,fill=(84,31,43,116))
 d.text((cx,419),'KEEP',fill=(244,206,181,128),font=font(18),anchor='mm')
 return cx

def body(d,pose,scale=1,back=False,alpha=255,accent=CORAL,kid=False):
 # Pose dictionary uses points in global frame. Draw rear limbs first, then torso and head, then foreground limbs.
 def p(k): return pose[k]
 def thick(val): return max(1,int(val*scale))
 darklimb=(137,149,159,alpha)
 bright=(241,233,220,alpha)
 mid=(202,205,201,alpha)
 deep=(94,111,129,alpha)
 d.ellipse((p('hip')[0]-65*scale,G-7*scale,p('hip')[0]+65*scale,G+6*scale),fill=(0,0,0,int(74*alpha/255)))
 # thigh/calf layered back
 for j in [1,0]:
  hip=(p('hip')[0]+(-16 if j==0 else 16)*scale,p('hip')[1])
  knee=p('knee'+str(j)); foot=p('foot'+str(j))
  draw_capsule(d,hip,knee,thick(13 if j==0 else 15),darklimb if j==0 else mid)
  draw_capsule(d,knee,foot,thick(10 if j==0 else 12),darklimb if j==0 else bright)
  draw_capsule(d,(foot[0]-8*scale,foot[1]),(foot[0]+19*scale,foot[1]),thick(6),deep)
 # far arm
 shoulder_far=(p('shoulder')[0]-13*scale,p('shoulder')[1])
 draw_capsule(d,shoulder_far,p('elbow0'),thick(10),darklimb)
 draw_capsule(d,p('elbow0'),p('hand0'),thick(9),darklimb)
 circ(d,p('hand0'),thick(12),tuple(list(accent)+[alpha]))
 # torso tapered, dynamic follow-through
 sx,sy=p('shoulder');hx,hy=p('hip')
 a=21*scale;b=26*scale
 d.polygon([(sx-a,sy-10*scale),(sx+a,sy-10*scale),(hx+b,hy+5*scale),(hx-b,hy+5*scale)],fill=bright)
 d.polygon([(sx-a+7*scale,sy+2*scale),(hx-b+4*scale,hy+5*scale),(hx-7*scale,hy+5*scale),(sx-5*scale,sy)],fill=(255,255,255,int(alpha*.10)))
 # hoodie hood/collar neck
 draw_capsule(d, (sx,sy-7*scale),(p('head')[0],p('head')[1]+16*scale),thick(12),bright)
 # head
 head=p('head'); radius=30*scale
 circ(d,head,radius,bright)
 d.ellipse((head[0]-radius*.8,head[1]-radius*.95,head[0]+radius*.2,head[1]-radius*.31),fill=(255,255,255,24))
 # cute cheek and expressive facial micro-details (always faces screen-left by convention)
 ex=head[0]+(11 if pose.get('face_right',False) else -11)*scale;ey=head[1]+1*scale
 circ(d,(ex,ey),3.1*scale,(36,42,55,alpha))
 d.line([(ex-8*scale,ey-12*scale),(ex+1*scale,ey-14*scale)],fill=(51,56,68,alpha),width=thick(3))
 if pose.get('tired',False):
  d.arc((head[0]-17*scale,head[1]+11*scale,head[0]+4*scale,head[1]+22*scale),190,350,fill=(65,62,65,alpha),width=thick(2))
 else:
  d.arc((head[0]-15*scale,head[1]+8*scale,head[0]+7*scale,head[1]+17*scale),200,345,fill=(65,62,65,alpha),width=thick(2))
 # near arm now foreground
 shoulder_near=(sx+14*scale,sy+2*scale)
 draw_capsule(d,shoulder_near,p('elbow1'),thick(12),bright)
 draw_capsule(d,p('elbow1'),p('hand1'),thick(10),bright)
 circ(d,p('hand1'),thick(12 if not kid else 11),tuple(list(accent)+[alpha]))
 # sweat beads following head
 if pose.get('sweat',False):
  d.ellipse((head[0]+24*scale,head[1]-2*scale,head[0]+29*scale,head[1]+12*scale),fill=(137,206,234,155))

def stand_pose(x,y,t=0,scale=1,mode='stand',tired=False):
 # y is physical floor; adult 245px height. Animated non-looping body squash.
 bob=(0 if tired else 1.5*math.sin(t*4))*scale
 root=(x,y-91*scale+bob)
 shoulder=(x-4*scale,y-211*scale+bob)
 head=(x-9*scale,y-256*scale+bob)
 leftfoot=(x-28*scale,y);rightfoot=(x+31*scale,y)
 leftknee=(x-35*scale,y-45*scale);rightknee=(x+44*scale,y-42*scale)
 if mode in ('walk','run'):
  stride=54 if mode=='walk' else 90
  phase=t*(2.2 if mode=='walk' else 3.8)
  gait=math.sin(phase*2*math.pi)
  speed=abs(gait)
  leftfoot=(x-stride*gait*scale,y-max(0, math.cos(phase*2*math.pi))*24*scale)
  rightfoot=(x+stride*gait*scale,y-max(0,-math.cos(phase*2*math.pi))*24*scale)
  leftknee=ik((root[0]-13*scale,root[1]),leftfoot,64*scale,61*scale,-1)
  rightknee=ik((root[0]+13*scale,root[1]),rightfoot,64*scale,61*scale,-1)
  shoulder=(x+(-9 if mode=='run' else -5)*scale,y-211*scale+4*speed*scale)
  head=(shoulder[0]-8*scale,shoulder[1]-45*scale)
  arm=math.sin(phase*2*math.pi)
  h0=(x-28*scale+arm*45*scale,y-159*scale-18*speed*scale)
  h1=(x+31*scale-arm*45*scale,y-157*scale-18*speed*scale)
 else:
  h0=(x-37*scale,y-113*scale);h1=(x+36*scale,y-114*scale)
 if tired:
  shoulder=(x-15*scale,y-177*scale+5*math.sin(t*3)*scale)
  head=(x-31*scale,y-219*scale+7*math.sin(t*3)*scale)
  h0=(x-45*scale,y-98*scale);h1=(x+30*scale,y-110*scale)
 elbow0=ik((shoulder[0]-14*scale,shoulder[1]),h0,65*scale,67*scale,-1)
 elbow1=ik((shoulder[0]+14*scale,shoulder[1]),h1,65*scale,67*scale,+1)
 return {'head':head,'shoulder':shoulder,'hip':root,'knee0':leftknee,'knee1':rightknee,'foot0':leftfoot,'foot1':rightfoot,'elbow0':elbow0,'elbow1':elbow1,'hand0':h0,'hand1':h1,'tired':tired}

def crouch_pose(x,y,t=0,scale=1, slump=1):
 # knees on floor, side profile; shoulder drops and head hanging.
 hip=(x+42*scale,y-55*scale);shoulder=(x-14*scale,y-(145-30*slump)*scale);head=(shoulder[0]-26*scale,shoulder[1]-40*scale+slump*17*scale)
 foot0=(x-81*scale,y);foot1=(x+109*scale,y)
 knee0=(x-20*scale,y-9*scale);knee1=(x+108*scale,y-8*scale)
 hand0=(x-48*scale,y-14*scale);hand1=(x+14*scale,y-17*scale)
 elbow0=ik((shoulder[0]-10*scale,shoulder[1]),hand0,61*scale,62*scale,-1)
 elbow1=ik((shoulder[0]+10*scale,shoulder[1]),hand1,61*scale,62*scale,+1)
 return {'head':head,'shoulder':shoulder,'hip':hip,'knee0':knee0,'knee1':knee1,'foot0':foot0,'foot1':foot1,'elbow0':elbow0,'elbow1':elbow1,'hand0':hand0,'hand1':hand1,'tired':True,'sweat':True}

def push_pose(x,y,t,scale=1,kid=False,struggle=0):
 # Full horizontal plank. Hands + toes remain fixed across a repetition.
 h=22+32*(1+math.cos(2*math.pi*t))*.5 # shoulders higher at phase zero
 drop=struggle*clamp((t-0.4)/1.3)
 h= h*(1-drop*.6)
 hip=(x+78*scale,y-(42+17*(h-24)/32)*scale)
 shoulder=(x-75*scale,y-(38+h)*scale)
 head=(shoulder[0]-37*scale,shoulder[1]-10*scale+struggle*15*scale)
 hand0=(x-86*scale,y-4*scale);hand1=(x-51*scale,y-4*scale)
 elbow0=ik((shoulder[0]-12*scale,shoulder[1]),hand0,54*scale,55*scale,-1)
 elbow1=ik((shoulder[0]+12*scale,shoulder[1]),hand1,54*scale,55*scale,+1)
 return {'head':head,'shoulder':shoulder,'hip':hip,'knee0':(x+150*scale,y-24*scale),'knee1':(x+167*scale,y-15*scale),'foot0':(x+223*scale,y),'foot1':(x+243*scale,y),'elbow0':elbow0,'elbow1':elbow1,'hand0':hand0,'hand1':hand1,'tired':bool(struggle),'sweat':bool(struggle)}

def box_pose(x,y,t,bag_front):
 root=(x,y-100);shoulder=(x+8,y-216);head=(x+2,y-260)
 foot0=(x-65,y);foot1=(x+50,y)
 kick=clamp(t/.22) if t>=0 else 0
 # Punch impact every 1.3s; anticipation, overshoot, recoil.
 phase=t%1.3
 ext=(ease((phase-.17)/.23) if phase<.4 else 1-ease((phase-.4)/.32))
 ext=clamp(ext)
 shoulder=(shoulder[0]+ext*12,shoulder[1]-ext*4)
 fist=(mix(x+34,bag_front,ext),shoulder[1]+mix(62,0,ext))
 guard=(x+23,shoulder[1]+62)
 elbow0=ik((shoulder[0]-14,shoulder[1]),guard,91,89,-1)
 elbow1=ik((shoulder[0]+14,shoulder[1]),fist,95,95,+1)
 return {'head':head,'shoulder':shoulder,'hip':root,'knee0':ik((x-16,y-100),foot0,80,75,-1),'knee1':ik((x+16,y-100),foot1,80,75,-1),'foot0':foot0,'foot1':foot1,'elbow0':elbow0,'elbow1':elbow1,'hand0':guard,'hand1':fist,'tired':False,'sweat':True,'face_right':True},ext

def overlay_text(img,top,small=None,y=78,align='left',emph=None):
 d=ImageDraw.Draw(img,'RGBA'); x=82 if align=='left' else W//2
 if small:
  d.text((x,y),small.upper(),font=font(17),fill=(233,178,133,225),anchor='la' if align=='left' else 'ma',stroke_width=0)
  y+=33
 f=font(43 if len(top)<21 else 35)
 d.text((x+2,y+3),top.upper(),font=f,fill=(0,0,0,140),anchor='la' if align=='left' else 'ma',stroke_width=0)
 d.text((x,y),top.upper(),font=f,fill=(245,237,224,243),anchor='la' if align=='left' else 'ma',stroke_width=0)
 d.rounded_rectangle((x if align=='left' else x-55,y+56,x+94 if align=='left' else x+55,y+61),radius=2,fill=(215,91,100,210))

def wipe(img,local,dur):
 # fades in/out across cuts but keep text legible; no motion-induced frame flicker
 alpha=min(clamp(local/.28),clamp((dur-local)/.24),1)
 if alpha>=1: return img
 return Image.blend(Image.new('RGB',(W,H),(5,8,17)),img,alpha)

def dust(d,x,y,t,n=12,color=(184,176,166,100)):
 for j in range(n):
  p=(t*.45 + j*.618)%1
  dx=math.cos(j*2.54)*p*69
  dy=-p*38+math.sin(j*2.3)*8
  r=max(1,3*(1-p))
  d.ellipse((x+dx-r,y+dy-r,x+dx+r,y+dy+r),fill=(color[0],color[1],color[2],int(color[3]*(1-p))))

def frame_render(frame):
 t=frame/FPS
 # shots: [0..5] despair, [5..12] running, [12..18] pushup, [18..24] boxing, [24..30] failure, [30..36] child, [36..44] shared, [44..50] sunrise
 bounds=[0,5,12,18,24,30,36,44,50];cut=next(i for i in range(8) if t<bounds[i+1]);local=t-bounds[cut];dur=bounds[cut+1]-bounds[cut]
 warm=0 if t<29 else ease((t-29)/18)
 img=gym_base(t,warm);d=ImageDraw.Draw(img,'RGBA')
 # gentle upward atmospheric dust motes
 for i in range(19):
  rnd=random.Random(334+i)
  x=rnd.uniform(30,1270);y=((rnd.uniform(10,640)-t*(4+i%4))%690)+20
  r=rnd.choice([1,1,2]);d.ellipse((x-r,y-r,x+r,y+r),fill=(214,204,193,20+int(warm*21)))
 # bag consistently hangs on right in first five shots, hidden in child close-up for focus
 if cut in [0,1,2,4,7]:
  bag(d,local-.4,amp=19 if cut==3 else 2)
 # scene key poses/actions
 if cut==0:
  # Open on a near-crushed fighter, glove drop and pale window framing; hooked by action
  p=crouch_pose(537,G,local,1.32,slump=1)
  body(d,p,1.32)
  glove_y=min(G-6, 345+max(0,local-.1)**2*230)
  if local<1.55:
   d.ellipse((740,glove_y-11,772,glove_y+16),fill=(199,65,78,255))
  else:
   d.ellipse((738,G-15,776,G+5),fill=(199,65,78,255))
  d.ellipse((716,G-3,793,G+12),fill=(0,0,0,80))
  if local>1.0:
   overlay_text(img,'KHÔNG AI VỖ TAY...',small='MỘT BỘ PHIM HOẠT HÌNH NGẮN',y=69)
  if local>3.25:
   d.text((83,192),'CHO NGÀY ĐẦU TIÊN.',font=font(29),fill=(222,179,163,237))
 elif cut==1:
  # kinetic running with feet, athlete enters and exits. Subtle speed trails.
  speed=145
  x=265+speed*local
  for i in range(20):
   xx=(W*1.2-(local*(185+i*7)+i*104)%(W*1.34))
   yy=170+(i*73)%383
   d.line((xx,yy,xx+42,yy),fill=(151,175,206,22+(i%3)*8),width=1+(i%3))
  pose=stand_pose(x,G,local,1.25,'run')
  body(d,pose,1.25)
  dust(d,x-40,G,local,14)
  if local>0.5:overlay_text(img,'CHẠY THÊM MỘT BƯỚC.',small='NGÀY 1 / KHÔNG AI NHÌN THẤY',y=73)
 elif cut==2:
  # pushups near floor; orange glow travels off the figure with each rise
  p=push_pose(540,G,local*.65,1.35)
  body(d,p,1.35)
  if local>0.3:overlay_text(img,'ĐỨNG DẬY THÊM MỘT LẦN.',small='NGÀY 14 / MỖI LẦN NGÃ',y=73)
  dust(d,422,G,local,6)
 elif cut==3:
  p,ext=box_pose(670,G,local,918-66)
  # bag displacement linked to impact: 0.4 + n*1.3
  displacement=0
  for n in range(6):
   impact=.4+1.3*n
   if local>impact:
    age=local-impact;displacement+=43*math.exp(-2.5*age)*math.sin(8*age)
  bag(d,local,amp=0,base_x=918,forced=displacement)
  # overlay extra punch afterglow lines
  if ext>.88:
   hx=p['hand1'][0];hy=p['hand1'][1]
   for j in range(5):
    d.line((hx-33-j*13,hy-18+j*10,hx-55-j*17,hy-23+j*12),fill=(252,194,161,int(115*(1-ext)+65)),width=3)
  body(d,p,1.21)
  if local>.4:overlay_text(img,'ĐẤM THÊM MỘT CÚ.',small='NGÀY 30 / KHÔNG BỎ CUỘC',y=74)
 elif cut==4:
  pose=crouch_pose(570,G,local,1.32,slump=1)
  body(d,pose,1.32)
  d.ellipse((765,G-17,799,G+3),fill=(185,64,75,255))
  if local>0.6:overlay_text(img,'ANH MUỐN DỪNG LẠI.',small='NHƯ MỌI LẦN TRƯỚC...',y=74)
  # glimmer of child in doorway very late
  if local>4.1:
   a=clamp((local-4.1)/.7)
   shadow=stand_pose(1173,G,local,.60,tired=False)
   body(d,shadow,.6,alpha=int(220*a),accent=(182,146,130))
 elif cut==5:
  # child's first attempt: awkward and brave
  p=push_pose(740,G,local*.47,.68,True,struggle=.7 if local>1.7 else 0)
  body(d,p,.68,kid=True,accent=(244,177,121))
  # blurred adult in background gently noticing
  a=crouch_pose(395,G,local,1,slump=.7)
  body(d,a,.95,alpha=150)
  if local>.8:overlay_text(img,'...ĐANG HỌC THEO ANH.',small='NHƯNG CÓ MỘT NGƯỜI',y=74)
 elif cut==6:
  # emotional turn: man carefully lowers body alongside child; visually synchronized.
  p1=push_pose(375,G,local*.30,1.14)
  p2=push_pose(835,G,local*.30,.72,True)
  body(d,p1,1.14)
  body(d,p2,.72,kid=True,accent=(244,177,121))
  if local>1.0:overlay_text(img,'HỌ CÙNG BẮT ĐẦU LẠI.',small='LẦN NÀY / KHÔNG CÒN MỘT MÌNH',y=76)
  if local>4.3:
   d.line((689,510,714,508),fill=(248,187,139,60),width=3)
 elif cut==7:
  # Two friends upright in warming gym. One adult extends hand to child's shoulder.
  adult=stand_pose(581,G,local,1.14)
  kid=stand_pose(793,G,local,.76)
  # bring both characters slowly upright without hard jump in this shot
  adult['hand1']=(696,G-241+math.sin(local*2)*3)
  adult['elbow1']=ik((adult['shoulder'][0]+16,adult['shoulder'][1]),adult['hand1'],78,86,+1)
  body(d,adult,1.14)
  body(d,kid,.76,kid=True,accent=(244,177,121))
  # sun leak over floor
  d.polygon([(108,476),(345,476),(1136,717),(555,717)],fill=(246,185,104,int(23+warm*53)))
  if local>.7:
   overlay_text(img,'KHÔNG CẦN HOÀN HẢO.',small='SỰ CỐ GẮNG CÓ THỂ LAN TỎA',y=75)
  if local>2.9:
   d.text((85,184),'ĐỂ TRỞ THÀNH ĐỘNG LỰC CỦA AI ĐÓ.',font=font(27),fill=(244,184,143,255))
  if local>4.8:
   d.text((W//2,666),'ĐIỀU QUAN TRỌNG LÀ BẠN ĐÃ KHÔNG DỪNG LẠI.',font=font(20),fill=(236,219,200,221),anchor='mm')
 # add cinematic black letterbox, lower than 16:9 canvas but intentionally modest
 d=ImageDraw.Draw(img,'RGBA')
 d.rectangle((0,0,W,27),fill=(3,5,10,245))
 d.rectangle((0,692,W,720),fill=(3,5,10,245))
 # flicker vignette subtle, cuts film properly
 img=wipe(img,local,dur)
 return img

def generate_score(path):
 # Original synthesised minimalist score: evolving pad, heartbeat kick and action accents (no copyrighted samples).
 sr=32000; seconds=DURATION; z=np.arange(int(seconds*sr),dtype=np.float64)/sr
 audio=np.zeros(z.shape,dtype=np.float64)
 # Five-note motif and gentle chord changes. EQ approximation through harmonics.
 chord_steps=[(0, [146.83,174.61,220.0]),(12,[130.81,164.81,196.0]),(24,[146.83,185.0,220.0]),(36,[174.61,220.0,261.63])]
 for start, notes in chord_steps:
  end=min(seconds,start+12)
  ids=np.logical_and(z>=start,z<end)
  tt=z[ids]-start
  fade=np.minimum(1,np.minimum(tt/1.7,(end-start-tt)/1.9))
  fade=np.maximum(.0,fade)
  chord=np.zeros(tt.shape,dtype=np.float64)
  for k, hz in enumerate(notes):
   chord+=(.30/(k+1))*(np.sin(2*np.pi*hz*tt)+.22*np.sin(2*np.pi*hz*2*tt))
  audio[ids] += .105 * fade * chord
 # notes plucked with 0.43s attacks, with original phrase to suit each scene
 melody=[(0,293.66),(2.5,261.63),(5,293.66),(7,349.23),(9.0,293.66),
        (12.2,349.23),(14.0,392),(16,440),(18,392),(20,349.23),
        (24,293.66),(26,261.63),(28,220),(30,261.63),(32,293.66),
        (36,349.23),(38,440),(40,392),(42,440),(45,523.25),(47,440)]
 for start,hz in melody:
  end=min(start+1.4,seconds)
  a=int(start*sr);b=int(end*sr);tt=z[a:b]-start
  env=(1-np.exp(-tt*9))*np.exp(-tt*2.2)
  audio[a:b]+=.067*env*(np.sin(2*np.pi*hz*tt)+.15*np.sin(4*np.pi*hz*tt))
 # low drum thuds that intensify during training; last half score uplifting
 rng=np.random.default_rng(991)
 for stamp in np.arange(0.7,seconds-1,1.25):
  if 24<stamp<30:continue
  a=int(stamp*sr);sz=min(int(.26*sr),len(audio)-a);tt=np.arange(sz)/sr
  intensity=.045 if stamp<5 else .085 if stamp<36 else .065
  audio[a:a+sz]+=intensity*np.sin(2*np.pi*(52*tt-30*tt**2))*np.exp(-18*tt)
 # punch bag impacts at 18+0.4+n*1.3
 for stamp in np.arange(18.4,24,1.3):
  a=int(stamp*sr);sz=min(int(.31*sr),len(audio)-a);tt=np.arange(sz)/sr
  rng=np.random.default_rng(int(stamp*100));noise=rng.normal(0,1,sz)
  audio[a:a+sz]+=.10*np.exp(-30*tt)*noise +.17*np.sin(2*np.pi*49*tt)*np.exp(-14*tt)
 # fall glove at 1.0s and final gentle whoosh
 for stamp in [1.13,24.7]:
  a=int(stamp*sr);sz=min(int(.34*sr),len(audio)-a);tt=np.arange(sz)/sr
  audio[a:a+sz]+=.13*np.sin(2*np.pi*80*tt)*np.exp(-17*tt)
 # dynamics and fade
 env=np.minimum(1,z/1.0)*np.minimum(1,(seconds-z)/1.7)
 audio*=np.maximum(env,0)
 audio=np.tanh(audio*1.7)*.79
 pcm=np.int16(np.clip(audio,-.98,.98)*32767)
 with wave.open(str(path),'wb') as wf:
  wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(sr);wf.writeframes(pcm.tobytes())


def render_all():
 score=OUT/'original-score.wav';generate_score(score)
 temp=OUT/'silent.mp4'
 cmd=['ffmpeg','-loglevel','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(temp)]
 ff=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 keytimes=[1.5,6.5,13.0,20.1,26,32,39,47.2]
 thumbs=[]
 try:
  for j in range(N):
   im=frame_render(j)
   if any(abs(j/FPS-k)<.5/FPS for k in keytimes):
    thumbs.append((j,im.copy()))
   ff.stdin.write(im.tobytes())
   if j%120==0: print('frame',j,'/',N,flush=True)
 finally:
  try:ff.stdin.close()
  except:pass
 rc=ff.wait();print('ffmpeg code',rc)
 if rc:raise RuntimeError('Render failed')
 final=OUT/'khong-ai-vo-tay-pilot-50s.mp4'
 subprocess.run(['ffmpeg','-loglevel','error','-y','-i',str(temp),'-i',str(score),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','160k','-movflags','+faststart','-shortest',str(final)],check=True)
 # storyboard 4x2 actual rendered frames
 tw,th=480,270
 sheet=Image.new('RGB',(tw*2,th*4),(10,13,22))
 for idx,(_,im) in enumerate(thumbs[:8]):
  sheet.paste(im.resize((tw,th),Image.Resampling.LANCZOS),(idx%2*tw,idx//2*th))
 sheet.save(OUT/'storyboard-8-frames.jpg',quality=91)
 print('OUTPUT',final,final.stat().st_size,'storyboard',len(thumbs))

if __name__=='__main__':
 if len(sys.argv)>1 and sys.argv[1]=='frames':
  ims=[frame_render(int(t*FPS)) for t in [1.4,6.3,13,19.3,26,33.5,38,47]]
  sheet=Image.new('RGB',(640*2,360*4))
  for i,im in enumerate(ims):sheet.paste(im.resize((640,360)),(i%2*640,i//2*360))
  sheet.save(OUT/'storyboard-preview.jpg',quality=92)
  print('Preview exported')
 else:render_all()
