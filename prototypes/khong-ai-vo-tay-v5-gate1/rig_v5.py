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

RUN_STRIDE=154.0
RUN_SPEED=274.0
RUN_PERIOD=RUN_STRIDE/RUN_SPEED

def run(t:float,start=760.0,ground=858.0,camera=0.0)->Motion:
 """Absolute world space: support foot x constant throughout stance phase.

 Track camera separately in visual layer; feet world coordinates can be proven stable.
 A run cycle includes flight after ~78% of each step.
 """
 t=max(t,0.0);u=t/RUN_PERIOD;step=math.floor(u);phase=u-step
 planted_x=start+step*RUN_STRIDE
 is_left=step%2==0
 launch=smooth((phase-.72)/.28)
 support=(planted_x, ground - 21*math.sin(math.pi*launch))
 # A raised swinging foot has toe clearance and reaches next plant on the last frame.
 swing=(start+(step-1+2*smooth(phase))*RUN_STRIDE,ground-78*(math.sin(math.pi*phase)**1.15))
 feet=(support,swing) if is_left else (swing,support)
 root=start+RUN_SPEED*t
 # squash on impact; flight lifts pelvis, shoulder tilts with forward momentum.
 hip=(root+8,ground-209+16*math.exp(-16*phase)-13*math.sin(math.pi*phase))
 shoulder=(root+43+7*math.sin(2*math.pi*phase),hip[1]-174+5*math.sin(2*math.pi*phase))
 head=(shoulder[0]+22,shoulder[1]-49+2*math.sin(2*math.pi*phase-.65))
 knees=[]
 for i,foot in enumerate(feet):
  anchor=(hip[0]+(-19 if i==0 else 19),hip[1]+7)
  joint,end=ik(anchor,foot,168,167,-1)
  knees.append(joint)
 # Opposition to legs and anatomically short bent arms, shoulders flex through stride.
 arm_swing=math.sin(2*math.pi*phase)
 hand0=(shoulder[0]-24-78*arm_swing,shoulder[1]+126-26*abs(arm_swing))
 hand1=(shoulder[0]+24+78*arm_swing,shoulder[1]+118-27*abs(arm_swing))
 elbows=[]
 for i,target in enumerate((hand0,hand1)):
  anchor=(shoulder[0]+(-26 if i==0 else 26),shoulder[1]+13)
  joint,end=ik(anchor,target,99,98,-1 if i==0 else 1)
  elbows.append(joint)
 feet_ground=[(abs(f[1]-ground)<1e-5) for f in feet]
 return Motion('run',head,shoulder,hip,tuple(knees),feet,tuple(elbows),(hand0,hand1),'determined',1,tuple(feet_ground))

def pushup(t:float,origin=810,ground=868,exhaustion=.35)->Motion:
 """Two palms and both toes never move, shoulder/hip follow authored effort curve."""
 # Phase 0 up, .34 down, .52 holding low, .85 up.
 u=(max(t,0)*.54)%1
 low=smooth(u/.32) if u<.32 else 1 if u<.59 else 1-smooth((u-.59)/.28)
 low=clamp(low)
 fail=smooth((t-2.7)/.9)*exhaustion
 hand0=(origin-150,ground-4);hand1=(origin-95,ground-4)
 feet=((origin+395,ground-4),(origin+415,ground-4))
 shoulder=(origin-87,ground-(162-70*low-25*fail))
 hip=(origin+175,ground-(164-67*low-12*fail))
 head=(shoulder[0]-62,shoulder[1]-13+8*low)
 # Bending elbow outward provides load transfer; endpoints are planted.
 # Deliberately posed elbow tracks the shoulder down, not a long swinging triangle.
 elbow0=(lerp(shoulder[0]-16,hand0[0],.55)-18,lerp(shoulder[1]+10,hand0[1],.55))
 elbow1=(lerp(shoulder[0]+18,hand1[0],.55)+11,lerp(shoulder[1]+10,hand1[1],.55))
 # Plank: shins stay nearly aligned with torso; avoid deeply bent 'frog' legs.
 knee0=(lerp(hip[0]-17,feet[0][0],.52),lerp(hip[1],feet[0][1],.52)-5)
 knee1=(lerp(hip[0]+17,feet[1][0],.52),lerp(hip[1],feet[1][1],.52)-4)
 return Motion('pushup',head,shoulder,hip,(knee0,knee1),feet,(elbow0,elbow1),(hand0,hand1),'tired' if fail>.15 else 'focused',-1,(True,True))

PUNCH_PERIOD=1.3
CONTACT_AT=.64

def punch_reach(t:float)->float:
 p=t%PUNCH_PERIOD
 if p<.19 or p>.92:return 0.
 if p<.34:return -.12*smooth((p-.19)/.15)  # anticipation: draw back
 if p<=CONTACT_AT:return -.12+1.12*smooth((p-.34)/(.64-.34))
 return 1-smooth((p-CONTACT_AT)/(.92-CONTACT_AT))

def bag_shift(t:float)->float:
 """Physics-inspired damped impulse. Bag is stationary up to first contact."""
 a=0.
 for i in range(5):
  tau=t-(CONTACT_AT+i*PUNCH_PERIOD)
  if tau>0:a+=61*math.exp(-2.05*tau)*math.sin(6.5*tau)
 return a

def boxing(t:float,origin=785,ground=870,bag_front=1175)->Motion:
 ext=punch_reach(t);impact=clamp(ext)
 hip=(origin+9+25*impact,ground-213)
 shoulder=(origin+38+38*impact,hip[1]-174-7*impact)
 head=(shoulder[0]+9,shoulder[1]-50)
 feet=((origin-86,ground),(origin+70,ground))
 knee0,_=ik((hip[0]-19,hip[1]),feet[0],163,165,-1)
 knee1,_=ik((hip[0]+19,hip[1]),feet[1],163,165,-1)
 fist=(lerp(shoulder[0]+47,bag_front,impact)+min(0,ext)*92,shoulder[1]+18+12*(1-impact))
 guard=(shoulder[0]+24,shoulder[1]+85)
 elbow0,_=ik((shoulder[0]-21,shoulder[1]+9),guard,113,113,-1)
 elbow1,_=ik((shoulder[0]+23,shoulder[1]+9),fist,162,162,1)
 return Motion('boxing',head,shoulder,hip,(knee0,knee1),feet,(elbow0,elbow1),(guard,fist),'focused',1,(True,True),impact)

def helping(t:float,origin=675,ground=866)->tuple[Motion,Motion]:
 """Two compatible rigs with an exact final hand-to-hand attachment point."""
 t=clamp(t/3)
 adult_hip=(origin,ground-151-49*smooth(t))
 adult_sh=(origin+32+13*smooth(t),adult_hip[1]-130-46*smooth(t))
 adult_head=(adult_sh[0]+8,adult_sh[1]-49)
 adult_feet=((origin-64,ground),(origin+66,ground))
 ak0,_=ik((adult_hip[0]-18,adult_hip[1]),adult_feet[0],157,164,-1)
 ak1,_=ik((adult_hip[0]+18,adult_hip[1]),adult_feet[1],157,164,-1)
 # Child is at screen right in ground-level gym; gently raises hand.
 child_x=1190;child_hip=(child_x,ground-143);child_sh=(child_x-10,ground-252)
 child_head=(child_sh[0]-4,child_sh[1]-44)
 child_feet=((child_x-39,ground),(child_x+35,ground))
 ck0,_=ik((child_hip[0]-13,child_hip[1]),child_feet[0],102,105,-1)
 ck1,_=ik((child_hip[0]+13,child_hip[1]),child_feet[1],102,105,-1)
 join=(1028,ground-311)
 adult_hand=(lerp(adult_sh[0]+55,join[0],smooth((t-.2)/.68)),lerp(adult_sh[1]+150,join[1],smooth((t-.2)/.68)))
 child_hand=(lerp(child_sh[0]-24,join[0],smooth((t-.3)/.60)),lerp(child_sh[1]+102,join[1],smooth((t-.3)/.60)))
 ae0,_=ik((adult_sh[0]-24,adult_sh[1]+8),(adult_sh[0]-48,adult_sh[1]+160),130,128,-1)
 ae1,_=ik((adult_sh[0]+24,adult_sh[1]+8),adult_hand,214,210,1)
 ce0,_=ik((child_sh[0]-16,child_sh[1]+7),child_hand,117,115,-1)
 ce1,_=ik((child_sh[0]+16,child_sh[1]+7),(child_sh[0]+20,child_sh[1]+98),103,102,1)
 adult=Motion('help',adult_head,adult_sh,adult_hip,(ak0,ak1),adult_feet,(ae0,ae1),((adult_sh[0]-48,adult_sh[1]+160),adult_hand),'hope',1)
 child=Motion('help',child_head,child_sh,child_hip,(ck0,ck1),child_feet,(ce0,ce1),(child_hand,(child_sh[0]+20,child_sh[1]+98)),'hope',-1)
 return adult,child
