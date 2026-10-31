"""V5 deterministic 2D procedural rig — actual contact timing, IK and object response.

All coordinates in 1920x1080 logical pixels and seconds, with world-space anchors.
Visual rendering is a separate concern; this math is unit-testable without Pillow.
"""
import math
from dataclasses import dataclass

P = tuple[float, float]

def clamp(t, a=0., b=1.): return min(b,max(a,t))
def lerp(a,b,t):return a+(b-a)*t
def smooth(t):
 t=clamp(t);return t*t*(3-2*t)
def dist(a:P,b:P):return math.hypot(a[0]-b[0],a[1]-b[1])
def point(a,b,t):return (lerp(a[0],b[0],t),lerp(a[1],b[1],t))

def ik(a:P,target:P,upper:float,lower:float,side:int=-1):
 """Exact two-bone IK and reach clamping (pole bend sign)."""
 if upper<=0 or lower<=0:raise ValueError('positive bone lengths required')
 dx=target[0]-a[0];dy=target[1]-a[1]
 angle=math.atan2(dy,dx)
 length=clamp(math.hypot(dx,dy),abs(upper-lower)+1e-5,upper+lower-1e-5)
 projection=(upper*upper+length*length-lower*lower)/(2*upper*length)
 theta=math.acos(clamp(projection,-1,1))
 end=(a[0]+math.cos(angle)*length,a[1]+math.sin(angle)*length)
 elbow=(a[0]+upper*math.cos(angle+side*theta),a[1]+upper*math.sin(angle+side*theta))
 return elbow,end

@dataclass(frozen=True)
class Motion:
 mode:str
 head:P;shoulder:P;hip:P
 knees:tuple[P,P];feet:tuple[P,P]
 elbows:tuple[P,P];hands:tuple[P,P]
 expression:str='focus'
 face:int=1
 on_ground:tuple[bool,bool]=(True,True)
 contact:float=0


RUN_STRIDE=150.0
RUN_SPEED=262.0
RUN_PERIOD=RUN_STRIDE/RUN_SPEED

def run(t:float,start=760.0,ground=858.0,camera=0)->Motion:
 """Contact-lock per step, moving pelvis, short opposite-swing arms and stabilized head."""
 t=max(0.,t)
 phase_time=t/RUN_PERIOD
 step=int(math.floor(phase_time)); phase=phase_time-step
 planted=start+step*RUN_STRIDE
 support_is_left=(step%2==0)
 heel_lift=smooth((phase-.68)/.30)
 support=(planted,ground-9*math.sin(math.pi*heel_lift))
 swing_x=start+(step-1+2*smooth(phase))*RUN_STRIDE
 swing=(swing_x,ground-75*max(0,math.sin(math.pi*phase))**1.4)
 feet=(support,swing) if support_is_left else (swing,support)
 root=start+RUN_SPEED*t
 # Body mass settles during contact and rises into flight.
 compression=12*math.exp(-13*phase)
 flight=15*smooth((phase-.72)/.16)*(1-smooth((phase-.9)/.1))
 hip=(root+2,ground-219+compression-flight)
 shoulder=(root+30+6*math.sin(math.pi*2*phase+.6),hip[1]-180+4*math.sin(2*math.pi*phase))
 head=(shoulder[0]+12,shoulder[1]-57-2*math.sin(math.pi*2*phase-.3))
 knees=[]
 for i,foot in enumerate(feet):
  anchor=(hip[0]+(-16 if i==0 else 16),hip[1]+7)
  joint,_=ik(anchor,foot,178,172,-1 if (i==0) else -1)
  knees.append(joint)
 # Deliberate opposite swing: hands near hip/ribcage, never over shoulder.
 wave=math.sin(2*math.pi*phase)
 hands=((shoulder[0]-31-39*wave,shoulder[1]+142-17*max(0,wave)),
        (shoulder[0]+31+39*wave,shoulder[1]+139-17*max(0,-wave)))
 elbows=[]
 for i,target in enumerate(hands):
  anchor=(shoulder[0]+(-23 if i==0 else 23),shoulder[1]+10)
  joint,_=ik(anchor,target,89,86,-1 if i==0 else 1)
  elbows.append(joint)
 flags=tuple(abs(f[1]-ground)<.05 for f in feet)
 return Motion('run',head,shoulder,hip,tuple(knees),feet,tuple(elbows),hands,'determined',1,flags)

def pushup(t:float,origin=810,ground=868,exhaustion=.36)->Motion:
 """Locked palms and toes; upper/lower arm segment lengths fixed through full rep.

 Character pose depicts a plank with shoulders and hips sinking together; fatigue
 is an authored downward beat, not telescoping wrist/elbow geometry.
 """
 q=max(0.,t);phase=(q*.53)%1
 low=smooth(phase/.31) if phase<.31 else 1 if phase<.59 else 1-smooth((phase-.59)/.30)
 low=clamp(low);fail=smooth((q-2.75)/.82)*exhaustion
 hands=((origin-137,ground-4),(origin-96,ground-4))
 feet=((origin+391,ground-3),(origin+414,ground-3))
 shoulder=(origin-78,ground-(178-81*low-18*fail))
 hip=(origin+160,ground-(165-74*low-11*fail))
 head=(shoulder[0]-60,shoulder[1]-4+9*low)
 knees=((lerp(hip[0]-17,feet[0][0],.54),lerp(hip[1],feet[0][1],.54)-4),
        (lerp(hip[0]+17,feet[1][0],.54),lerp(hip[1],feet[1][1],.54)-4))
 elbows=[]
 for i,h in enumerate(hands):
  origin_arm=(shoulder[0]+(-23 if i==0 else 23),shoulder[1]+10)
  elbow,_=ik(origin_arm,h,103,97,-1 if i==0 else 1)
  elbows.append(elbow)
 return Motion('pushup',head,shoulder,hip,knees,feet,tuple(elbows),hands,'tired' if q>2.65 else 'focused',-1,(True,True))

PUNCH_PERIOD=1.3
CONTACT_AT=.64

def punch_reach(t):
 p=t%PUNCH_PERIOD
 if p<=.12:return 0.
 if p<.30:return -.12*smooth((p-.12)/.18)
 if p<=CONTACT_AT:return -.12+1.12*smooth((p-.30)/(.64-.30))
 if p<.73:return 1.
 if p<1.06:return 1-smooth((p-.73)/.33)
 return 0.

def bag_shift(t):
 result=0.
 for i in range(5):
  elapsed=t-(CONTACT_AT+i*PUNCH_PERIOD)
  if elapsed>0:result+=49*math.exp(-2.25*elapsed)*math.sin(5.8*elapsed)
 return result

def boxing(t:float,origin=930,ground=870,bag_front=1175)->Motion:
 """5-beat close-range punch, with fixed-length upper arms and planted feet."""
 ext=punch_reach(t);power=clamp(ext)
 recoil=abs(min(0,ext))
 hip=(origin+10+18*power-12*recoil,ground-279+4*recoil)
 shoulder=(origin+42+30*power-19*recoil,hip[1]-178-4*power)
 head=(shoulder[0]+7-7*power,shoulder[1]-54)
 feet=((origin-84,ground),(origin+70,ground))
 knees=[]
 for i,foot in enumerate(feet):
  knee,_=ik((hip[0]+(-16 if i==0 else 16),hip[1]+7),foot,157,158,-1)
  knees.append(knee)
 # Fist aligned with leading surface only at contact; guard remains near chin.
 face=bag_front
 fist=(lerp(shoulder[0]+40,face,power)-42*recoil,shoulder[1]+43-20*power)
 guard=(shoulder[0]+5,shoulder[1]+105)
 anchors=((shoulder[0]-23,shoulder[1]+10),(shoulder[0]+23,shoulder[1]+10))
 elbows=[]
 for i,target in enumerate((guard,fist)):
  el,_=ik(anchors[i],target,98 if i==0 else 133,94 if i==0 else 130,-1 if i==0 else 1)
  elbows.append(el)
 return Motion('boxing',head,shoulder,hip,tuple(knees),feet,tuple(elbows),(guard,fist),'determined',1,(True,True),power)

def helping(t:float,origin=690,ground=866)->tuple[Motion,Motion]:
 """Two-person acting: adult rises/reaches, child receives hand, then rises into grip."""
 q=clamp(t/3)
 adult_rise=smooth((q-.05)/.49)
 adult_hip=(origin,ground-162-105*adult_rise)
 adult_sh=(origin+49+7*adult_rise,adult_hip[1]-145-15*adult_rise)
 adult_head=(adult_sh[0]+12,adult_sh[1]-54)
 adult_feet=((origin-55,ground),(origin+67,ground))
 adult_knees=tuple(ik((adult_hip[0]+(-16 if i==0 else 16),adult_hip[1]+8),f,151,156,-1)[0] for i,f in enumerate(adult_feet))
 child_x=1120
 child_rise=smooth((q-.46)/.48)
 child_hip=(child_x,ground-122-128*child_rise)
 child_sh=(child_x-24,child_hip[1]-114-18*child_rise)
 child_head=(child_sh[0]-6,child_sh[1]-44)
 child_feet=((child_x-38,ground),(child_x+33,ground))
 child_knees=tuple(ik((child_hip[0]+(-11 if i==0 else 11),child_hip[1]+6),f,122,121,-1)[0] for i,f in enumerate(child_feet))
 # A shared grasp point follows the child's body upwards after contact.
 shared=(967,ground-281-31*child_rise)
 adult_approach=smooth((q-.16)/.39)
 child_approach=smooth((q-.32)/.22)
 adult_rest=(adult_sh[0]+31,adult_sh[1]+115)
 child_rest=(child_sh[0]-28,child_sh[1]+85)
 adult_hand=point(adult_rest,shared,adult_approach)
 child_hand=point(child_rest,shared,child_approach)
 # 0.54..1.0s grip synchronized; child must physically rise.
 adult_back=(adult_sh[0]-51,adult_sh[1]+130)
 child_back=(child_sh[0]+31,child_sh[1]+85)
 adult_anchors=((adult_sh[0]-23,adult_sh[1]+10),(adult_sh[0]+23,adult_sh[1]+10))
 child_anchors=((child_sh[0]-20,child_sh[1]+7),(child_sh[0]+20,child_sh[1]+7))
 adult_elbows=(ik(adult_anchors[0],adult_back,86,83,-1)[0],ik(adult_anchors[1],adult_hand,137,129,1)[0])
 child_elbows=(ik(child_anchors[0],child_hand,102,100,-1)[0],ik(child_anchors[1],child_back,81,80,1)[0])
 adult=Motion('help',adult_head,adult_sh,adult_hip,adult_knees,adult_feet,adult_elbows,(adult_back,adult_hand),'hope',1)
 child=Motion('help',child_head,child_sh,child_hip,child_knees,child_feet,child_elbows,(child_hand,child_back),'hope',-1)
 return adult,child
