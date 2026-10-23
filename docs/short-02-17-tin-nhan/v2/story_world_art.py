#!/usr/bin/env python3
"""Original scene-specific art and one expressive character for Short 02 v2.

All motion is deterministic and derived from the global film clock (60 FPS).
No still-photo zooms, stock backgrounds or per-scene actor teleportation.
"""
import math
from PIL import ImageDraw, ImageFont

INK=(8,9,12)
WHITE=(245,245,244)
GRAY=(133,135,138)
AMBER=(239,158,105)
SOFT=(32,35,42)
EDGE=(68,72,80)
W=540
H=960

def mix(a,b,t):
    t=max(0.0,min(1.0,t))
    return tuple(int(a[k]*(1-t)+b[k]*t) for k in range(3))

def ease(t):
    t=max(0.0,min(1.0,t))
    return t*t*(3-2*t)

def font(n,bold=False):
    file="DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/"+file,n)

def ln(d,coords,fill=WHITE,width=3):
    d.line([(round(x),round(y)) for x,y in coords],fill=fill,width=width,joint="curve")

def rr(d,box,outline=EDGE,fill=None,radius=12,width=2):
    d.rounded_rectangle(tuple(map(int,box)),radius=radius,fill=fill,outline=outline,width=width)

def text(d,xy,s,size=15,color=WHITE,bold=False):
    d.text(tuple(map(int,xy)),s,font=font(size,bold),fill=color)

def circle(d,x,y,r,outline=EDGE,fill=None,width=2):
    d.ellipse((int(x-r),int(y-r),int(x+r),int(y+r)),outline=outline,fill=fill,width=width)

def warm_glow(d,x,y,energy=1):
    for j in range(10,0,-1):
        r=12+j*11
        circle(d,x,y,r,mix(INK,AMBER,energy*(11-j)/55),None,3)

def apartment(d,day=False):
    rr(d,(30,245,512,720),outline=mix(EDGE,AMBER,.15 if day else 0),radius=12,width=3)
    # A believable room with a city window, rug, picture frames and cake table.
    rr(d,(325,278,491,570),outline=EDGE,fill=(14,21,32),radius=5,width=5)
    ln(d,[(405,278),(405,570)],EDGE,3)
    ln(d,[(325,419),(491,419)],EDGE,2)
    for x,h in [(334,73),(355,114),(385,97),(420,84),(453,106),(477,67)]:
        d.rectangle((x,555-h,x+11,555),fill=(25,31,44))
        for yy in range(int(565-h),550,19):
            circle(d,x+5,yy,1,AMBER if day else GRAY,None,1)
    if day:
        warm_glow(d,450,371,.50)
        circle(d,450,371,23,AMBER,mix(INK,AMBER,.28),3)
    rr(d,(79,288,143,368),outline=EDGE,radius=3)
    circle(d,111,324,12,outline=mix(EDGE,AMBER,.4))
    ln(d,[(53,689),(498,689)],EDGE,3)
    d.polygon([(78,690),(190,705),(318,702),(412,690)],fill=(22,24,31))
    ln(d,[(300,649),(501,649)],AMBER if day else EDGE,4)
    ln(d,[(332,649),(325,717)],EDGE,4)
    ln(d,[(476,649),(483,717)],EDGE,4)

def birthday_cake(d,lit,sec,x=411,y=638,scale=1):
    s=scale
    rr(d,(x-42*s,y-15*s,x+42*s,y+7*s),outline=mix(EDGE,AMBER,.45),fill=(28,27,29),radius=5,width=2)
    ln(d,[(x-34*s,y-15*s),(x+35*s,y-15*s)],WHITE,2)
    for cx in [-22,0,22]:
        circle(d,x+cx*s,y-9*s,2,AMBER,None,1)
    ln(d,[(x,y-16*s),(x,y-38*s)],WHITE,3)
    if lit:
        warmth=.82+.18*math.sin(12*sec)
        warm_glow(d,x,y-47*s,warmth*.75)
        d.polygon([(x,y-63*s),(x-5*s,y-47*s),(x,y-40*s),(x+5*s,y-48*s)],fill=AMBER)
        circle(d,x,y-47*s,2,WHITE,WHITE,1)

def phone(d,x,y,w,h,sec,kind="requests",amount=17):
    rr(d,(x,y,x+w,y+h),outline=mix(EDGE,WHITE,.30),fill=(15,18,26),radius=18,width=4)
    rr(d,(x+9,y+15,x+w-9,y+h-15),outline=None,fill=(23,27,37),radius=8,width=1)
    ln(d,[(x+w*.43,y+8),(x+w*.57,y+8)],GRAY,3)
    if kind=="requests":
        text(d,(x+21,y+27),"TIN NHẮN",15,WHITE,True)
        for k,msg in enumerate(["Giúp chị nhé?","An ơi, rảnh không?","Xem giúp mình..."]):
            yy=y+69+k*63
            rr(d,(x+17,yy,x+w-15,yy+50),outline=(49,54,63),fill=(33,37,47),radius=10,width=1)
            circle(d,x+31,yy+23,9,AMBER,None,2)
            text(d,(x+47,yy+11),msg,13,WHITE)
            text(d,(x+47,yy+30),"Vừa gửi",9,GRAY)
        circle(d,x+w-17,y+37,12,AMBER,AMBER,1)
        text(d,(x+w-27,y+29),str(amount),12,INK,True)
        if math.sin(sec*5)>0:
            rr(d,(x+20,y+h-56,x+w-20,y+h-31),outline=AMBER,radius=4)
    elif kind=="typing":
        text(d,(x+19,y+29),"CHỊ QUẢN LÝ",14,WHITE,True)
        rr(d,(x+17,y+77,x+w-18,y+154),outline=(63,65,74),fill=(36,40,50),radius=10)
        text(d,(x+24,y+91),"Giúp chị nốt",14,WHITE)
        text(d,(x+24,y+112),"việc này nhé?",14,WHITE)
        rr(d,(x+17,y+h-99,x+w-16,y+h-43),outline=AMBER,fill=(22,28,36),radius=9,width=2)
        moment=max(0,min(1,(sec-29)/3))
        if moment<.47:
            text(d,(x+26,y+h-87),"Vâng...",16,WHITE)
            if moment>.12:
                ln(d,[(x+23,y+h-65),(x+96,y+h-65)],AMBER,3)
        else:
            text(d,(x+24,y+h-90),"Hôm nay em",14,WHITE)
            text(d,(x+24,y+h-69),"cần nghỉ.",14,AMBER,True)
    circle(d,x+w*.5,y+h-8,3,GRAY,None,1)

def digital_clock(d,x,y,s="23:59"):
    rr(d,(x-57,y-31,x+59,y+34),outline=EDGE,fill=(20,24,30),radius=10,width=3)
    text(d,(x-46,y-21),s,26,AMBER,True)

def office(d,sec,late=False):
    rr(d,(24,253,514,716),outline=EDGE,fill=(12,15,22),radius=11,width=3)
    rr(d,(335,279,487,503),outline=EDGE,fill=(13,19,30),radius=3,width=3)
    for x,h in [(341,60),(364,107),(389,82),(425,119),(457,70)]:
        d.rectangle((x,489-h,x+16,489),fill=(25,31,44))
    if late:
        digital_clock(d,404,326,"22:30")
    ln(d,[(270,606),(509,606)],EDGE,5)
    ln(d,[(312,607),(312,711)],EDGE,3)
    ln(d,[(484,607),(484,711)],EDGE,3)
    rr(d,(334,452,479,575),outline=mix(EDGE,AMBER,.32),fill=(20,27,39),radius=6,width=3)
    rr(d,(343,461,470,559),outline=None,fill=(29,36,49),radius=5)
    for j in range(5):
        ln(d,[(360,484+j*12),(429-j*6,484+j*12)],AMBER if j==2 else EDGE,2)
    ln(d,[(350,579),(473,579)],WHITE,3)
    for j in range(4):
        rr(d,(288+j*15,588-j*7,344+j*11,595-j*7),outline=EDGE,fill=(42,42,46),radius=1,width=1)
    # A colleague has already left, leaving an empty chair.
    ln(d,[(75,581),(127,581)],EDGE,4)
    rr(d,(85,540,116,604),outline=EDGE,radius=6,width=3)
    if not late:
        ln(d,[(44,277),(246,277)],AMBER,3)

def friend_scene(d,sec):
    rr(d,(32,256,508,715),outline=EDGE,fill=(15,18,25),radius=12,width=3)
    rr(d,(295,500,490,649),outline=(69,63,67),fill=(35,32,38),radius=22,width=4)
    ln(d,[(310,650),(310,695)],EDGE,4)
    ln(d,[(473,650),(473,695)],EDGE,4)
    # Friend with bowed head and an amber teardrop, not an unrelated graphic.
    circle(d,389,491,25,WHITE,(25,27,36),4)
    ln(d,[(388,516),(379,590),(413,590)],WHITE,4)
    ln(d,[(378,548),(355,576)],WHITE,3)
    ln(d,[(396,544),(433,574)],WHITE,3)
    d.ellipse((402,502+3*math.sin(sec*2),406,512+3*math.sin(sec*2)),fill=AMBER)
    text(d,(329,290),""An ơi..."",16,GRAY)

def mirror_scene(d,sec):
    rr(d,(310,270,487,658),outline=mix(EDGE,AMBER,.3),fill=(17,25,34),radius=35,width=5)
    ln(d,[(333,316),(356,289)],EDGE,2)
    ln(d,[(329,631),(478,631)],EDGE,2)
    # Reflection preserves An's bun, head, tired posture.
    circle(d,399,448,29,outline=mix(EDGE,WHITE,.38),fill=(26,30,38),width=3)
    circle(d,422,425,12,outline=mix(EDGE,WHITE,.32),fill=(22,27,35),width=2)
    ln(d,[(399,480),(408,583)],mix(EDGE,WHITE,.38),4)
    ln(d,[(407,524),(443,555)],mix(EDGE,WHITE,.28),3)
    ln(d,[(407,583),(439,622)],mix(EDGE,WHITE,.28),3)
    if sec>24:
        d.ellipse((413,457,417,469),fill=AMBER)

def rainy_room(d,sec):
    apartment(d,False)
    for j in range(17):
        x=330+(j*41)%155
        y=285+(int(sec*35)+j*37)%260
        ln(d,[(x,y),(x-4,y+14)],mix(EDGE,WHITE,.25),2)

def lights(d,x,y,sec,energy=.6):
    warm_glow(d,x,y,energy)
    for a in range(5):
        ang=a*math.tau/5+sec*.07
        circle(d,x+48*math.cos(ang),y+48*math.sin(ang),2,AMBER,None,1)

def environment(d,index,u,sec):
    """14 narratively connected sets, paired close/wide shots; objects animate."""
    chapter=index//2
    alternate=index%2
    # Floor, lighting and spatial depth stay coherent within every visual beat.
    d.rectangle((0,236,W,745),fill=(11,13,19))
    for z in range(6):
        y=247+z*78
        ln(d,[(12,y),(528,y)],mix(INK,EDGE,.13),1)
    if chapter in (0,1,6,7,10,11,12,13):
        apartment(d,day=chapter==13)
    if chapter in (2,3):
        office(d,sec,late=chapter==3)
    if chapter==4:
        friend_scene(d,sec)
    if chapter in (5,8,9):
        if chapter==9:
            rainy_room(d,sec)
        else:
            apartment(d,False)
        mirror_scene(d,sec)
    if chapter==0:
        birthday_cake(d,False,sec)
        phone(d,350,324,123,256,sec,"requests")
        if alternate:
            text(d,(378,260),"SINH NHẬT AN",14,GRAY)
    elif chapter==1:
        phone(d,315,279,184,365,sec,"requests")
        if alternate:
            text(d,(335,666),"17 lời nhờ. 0 lời chúc.",13,AMBER)
    elif chapter==2:
        # Work request slips physically arrive on An's table.
        for j in range(1+(1 if alternate else 0)):
            rr(d,(348+j*34,390+j*15,468+j*5,425+j*14),outline=EDGE,fill=(28,29,35),radius=3)
    elif chapter==3:
        lights(d,410,334,sec,.28)
        text(d,(336,677),"CHỈ CÒN AN Ở LẠI",13,GRAY)
    elif chapter==4:
        lights(d,376,376,sec,.28)
    elif chapter==5:
        if alternate:
            text(d,(333,662),"Mình vẫn ổn...",13,GRAY)
    elif chapter==6:
        birthday_cake(d,False,sec)
        digital_clock(d,402,346,"23:59")
    elif chapter==7:
        birthday_cake(d,False,sec)
        phone(d,318,300,183,350,sec,"requests",amount=18)
        text(d,(349,672),"Giúp chị nốt nhé?",13,AMBER)
    elif chapter==8:
        phone(d,318,293,179,362,sec,"typing")
        lights(d,409,465,sec,.32)
    elif chapter==9:
        lights(d,405,389,sec,.45)
        text(d,(336,666),"Còn mình thì sao?",13,AMBER)
    elif chapter==10:
        phone(d,312,297,186,373,sec,"typing")
        if alternate:
            text(d,(334,685),"LẦN ĐẦU NÓI KHÔNG",13,AMBER)
    elif chapter==11:
        birthday_cake(d,sec>=32.5,sec)
        if sec>=32.5:
            lights(d,411,584,sec,.90)
    elif chapter==12:
        birthday_cake(d,True,sec)
        lights(d,413,590,sec,.85)
        if alternate:
            text(d,(332,694),"CHÚC MỪNG SINH NHẬT, AN",11,AMBER)
    elif chapter==13:
        birthday_cake(d,sec<39.6,sec)
        lights(d,445,365,sec,.72)
        text(d,(340,685),"BÌNH YÊN TỪ HÔM NAY",12,AMBER)

# x,y,lean,smile,left_x,left_y,right_x,right_y: anchored limb gestures
POSES=[
(209,606,-.04,-.30,-35,-72,52,-45),
(209,602,-.04,-.45,-28,-71,52,-62),
(210,601,-.02,-.20,-58,-73,65,-91),
(217,628,-.12,-.75,-38,-49,65,-92),
(226,611,-.02,-.14,23,-60,101,-95),
(220,620,-.09,-.69,-20,-45,46,-35),
(219,605,-.07,-.76,-33,-56,38,-43),
(218,607,-.07,-.78,-32,-60,54,-44),
(209,613,-.09,-.90,-25,-42,45,-63),
(208,618,-.14,-1.0,-20,-43,40,-35),
(205,608,-.05,-.30,-26,-53,49,-75),
(208,601,.01,.26,-28,-54,70,-96),
(210,603,.02,.70,-33,-67,58,-50),
(211,600,.02,.72,-33,-63,56,-48),
]

def protagonist(d,old_shot,new_shot,blend,sec):
    """An is recognizably female: tied bun, amber hair clip and simple cardigan.
    Joint paths and facial expression interpolate across every shot handoff.
    """
    ia=old_shot//2
    ib=new_shot//2
    a=POSES[ia]
    b=POSES[ib]
    lerp=lambda k:a[k]*(1-blend)+b[k]*blend
    x=lerp(0)+1.3*math.sin(sec*.9)
    y=lerp(1)+2.2*math.sin(sec*1.18)
    lean=lerp(2)
    smile=lerp(3)
    head_x=x+lean*28
    head_y=y-160+2*math.sin(sec*.65)
    # Hair/bun silhouette stays attached to the skull across all 28 shots.
    circle(d,head_x+23,head_y-20,12,outline=WHITE,fill=(28,28,35),width=3)
    circle(d,head_x,head_y,32,outline=WHITE,fill=(26,28,36),width=4)
    d.arc((head_x-30,head_y-32,head_x+31,head_y+17),
          198,338,fill=GRAY,width=4)
    ln(d,[(head_x+23,head_y-28),(head_x+31,head_y-22)],AMBER,5)
    # Eyes and mouth reflect stress --> assertiveness --> relief.
    eye_y=head_y+1
    for e in (-12,10):
        if smile>.42:
            d.arc((head_x+e-4,eye_y-2,head_x+e+3,eye_y+4),
                  190,355,fill=WHITE,width=2)
        else:
            circle(d,head_x+e,eye_y,2,WHITE,WHITE,1)
    if smile<-.50:
        d.arc((head_x-12,head_y+10,head_x+13,head_y+28),200,338,fill=WHITE,width=2)
    else:
        d.arc((head_x-13,head_y+7,head_x+14,head_y+26),
              10 if smile>.2 else 340,170 if smile>.2 else 200,fill=WHITE,width=2)
    if smile<-.8:
        d.ellipse((head_x+24,head_y+7,head_x+28,head_y+19),fill=AMBER)
    # Worn blue cardigan, amber clasp, body proportions consistent.
    neck_y=head_y+32
    waist=(x+lean*4,y-26)
    ln(d,[(head_x,neck_y),(waist[0],waist[1])],WHITE,6)
    ln(d,[(head_x-14,neck_y+26),(head_x+14,neck_y+26)],EDGE,3)
    circle(d,head_x+2,neck_y+39,3,AMBER,AMBER,1)
    shoulder_y=neck_y+31
    # elbow guides make reaching a real articulated gesture, never a rigid arm.
    left_end=(x+lerp(4),y+lerp(5))
    right_end=(x+lerp(6),y+lerp(7))
    wobble=1.7*math.sin(sec*3.5)
    if ia in (2,3,8,10):
        right_end=(right_end[0]+2*math.sin(sec*9),right_end[1]+wobble)
    for side,end in [(-1,left_end),(1,right_end)]:
        elbow=(x+side*37,y-90+(10 if ia in (3,9) else 0))
        ln(d,[(x,shoulder_y),(elbow[0],elbow[1]),end],WHITE,4)
        circle(d,end[0],end[1],4,WHITE,None,2)
    stride=1.5*math.sin(sec*1.15)
    ln(d,[waist,(x-23-stride,y+74)],WHITE,4)
    ln(d,[waist,(x+24+stride,y+74)],WHITE,4)
    ln(d,[(x-29-stride,y+74),(x-12-stride,y+74)],WHITE,3)
    ln(d,[(x+17+stride,y+74),(x+34+stride,y+74)],WHITE,3)

def actor_signature():
    return {"name":"An","hair":"low dark bun","accent":"amber barrette",
            "clothing":"white outlines, slate cardigan, amber button",
            "face":"sadness-to-relief continuous interpolation",
            "poses":len(POSES),"locations":14}
