#!/usr/bin/env python3
"""Story-specific, original 2-D line-art environments for Short 03 (Mother in photos).

Two recognisable protagonists, recurring phone/camera and photographed memories.
Deterministic movements derive from the clip's global 60 FPS timeline.
"""
import math
from PIL import ImageFont

BLACK=(8,9,12)
NIGHT=(14,18,27)
WHITE=(245,245,244)
GRAY=(132,139,151)
AMBER=(239,158,105)
SLATE=(42,48,63)
GOLD=(225,180,115)
WINDOW=(24,35,49)
W,H=540,960

def mix(a,b,t):
    t=min(1,max(0,t))
    return tuple(round(a[k]*(1-t)+b[k]*t) for k in range(3))
def ease(t):
    t=max(0,min(1,t));return t*t*(3-2*t)
def f(pt,bold=False):
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/"+("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"),pt)
def line(d,pts,c=WHITE,w=3):
    d.line([(round(x),round(y)) for x,y in pts],fill=c,width=w,joint="curve")
def rect(d,xy,fill=None,outline=GRAY,rad=9,w=2):
    d.rounded_rectangle(tuple(round(x) for x in xy),radius=rad,fill=fill,outline=outline,width=w)
def ell(d,x,y,r,outline=GRAY,fill=None,w=2):
    d.ellipse((round(x-r),round(y-r),round(x+r),round(y+r)),outline=outline,fill=fill,width=w)
def txt(d,x,y,s,sz=14,color=WHITE,bold=False):
    d.text((round(x),round(y)),s,font=f(sz,bold),fill=color)
def ellipsefill(d,box,color):
    d.ellipse(tuple(round(i) for i in box),fill=color)
def warm(d,x,y,power=.75):
    for j in range(13,1,-1):
        ell(d,x,y,j*8,outline=mix(BLACK,AMBER,power*(14-j)/42),w=2)
def wallpaper(d,light=.06):
    d.rectangle((0,235,540,753),fill=mix(BLACK,SLATE,light))
    line(d,[(20,735),(520,735)],SLATE,3)
    for yy in (280,445,610):
        line(d,[(22,yy),(518,yy)],mix(BLACK,GRAY,.13),1)

def window(d,x1=328,y1=285,x2=485,y2=544,sunset=False):
    rect(d,(x1,y1,x2,y2),outline=SLATE,fill=WINDOW,rad=4,w=5)
    line(d,[((x1+x2)/2,y1),((x1+x2)/2,y2)],SLATE,2)
    line(d,[(x1,(y1+y2)/2),(x2,(y1+y2)/2)],SLATE,2)
    for i,h in enumerate((49,73,84,58,116,67,78)):
        x=x1+6+i*((x2-x1-12)/7)
        d.rectangle((x,y2-h,x+12,y2),fill=(30,39,55))
        if i%2==0: ell(d,x+4,y2-h+12,1,outline=GOLD,fill=GOLD,w=1)
    if sunset:
        warm(d,x2-35,y1+60,.5)
        ell(d,x2-35,y1+60,15,outline=AMBER,fill=mix(AMBER,BLACK,.35))

def camera(d,x,y,size=1,angle=0):
    s=size
    rect(d,(x-27*s,y-17*s,x+28*s,y+18*s),fill=(29,32,42),outline=WHITE,rad=6,w=max(2,round(2*s)))
    ell(d,x+1*s,y,9*s,outline=AMBER,w=3)
    ell(d,x+1*s,y,3*s,outline=GRAY,fill=BLACK)
    rect(d,(x-17*s,y-22*s,x-1*s,y-16*s),fill=SLATE,outline=WHITE,rad=2,w=2)
    ell(d,x+21*s,y-12*s,2*s,outline=AMBER,fill=AMBER)

def woman(d,x,y,scale=1.0,who="linh",pose="idle",mood="neutral",sec=0):
    """Waist at y; continuous head/arm poses and facial changes, recognisable silhouettes."""
    s=scale
    t=sec
    bob=1.3*math.sin(t*1.2+(1.9 if who=="mom" else 0))*s
    sway=1.2*math.sin(t*.66)*s
    x+=sway
    y+=bob
    hx=x+(3*s if who=="mom" else 0)
    hy=y-150*s
    if who=="mom":
        # Grey low-bun hair and round spectacles belong to this character forever.
        ell(d,hx+25*s,hy+15*s,11*s,outline=GRAY,fill=(38,42,49),w=3)
        ell(d,hx,hy,28*s,outline=GRAY,fill=(30,35,44),w=4)
        d.arc((hx-27*s,hy-27*s,hx+27*s,hy+7*s),185,354,fill=WHITE,width=3)
        ell(d,hx-10*s,hy+3*s,7*s,outline=WHITE,w=2)
        ell(d,hx+11*s,hy+3*s,7*s,outline=WHITE,w=2)
        line(d,[(hx-3*s,hy+3*s),(hx+4*s,hy+3*s)],GRAY,2)
        skin=GRAY
        tilt=8*s
    else:
        # Daughter's long ponytail and an amber hair pin remain fixed.
        ell(d,hx+28*s,hy-8*s,11*s,outline=WHITE,fill=(22,25,36),w=3)
        ell(d,hx,hy,29*s,outline=WHITE,fill=(20,24,33),w=4)
        line(d,[(hx+22*s,hy-25*s),(hx+31*s,hy-19*s)],AMBER,4)
        d.arc((hx-30*s,hy-29*s,hx+28*s,hy+4*s),187,346,fill=GRAY,width=3)
        tilt=0
    # Slightly tired eyes -> smile at ending, with actor-specific moods.
    for dx in (-10,10):
        if mood in ("happy","proud","relief"):
            d.arc((hx+(dx-5)*s,hy-3*s,hx+(dx+5)*s,hy+8*s),190,355,fill=WHITE,width=2)
        elif mood in ("sad","shock","tear"):
            line(d,[(hx+(dx-5)*s,hy),(hx+(dx+3)*s,hy+3*s)],WHITE,2)
        else:
            ell(d,hx+dx*s,hy+2*s,1.7*s,outline=WHITE,fill=WHITE,w=1)
    if mood in ("happy","proud","relief"):
        d.arc((hx-11*s,hy+5*s,hx+13*s,hy+25*s),15,168,fill=WHITE,width=2)
    else:
        d.arc((hx-8*s,hy+11*s,hx+11*s,hy+22*s),198,343,fill=WHITE,width=2)
    if mood in ("tear","sad"):
        ellipsefill(d,(hx+18*s,hy+11*s,hx+21*s,hy+21*s),AMBER)
    # Mother's rounded cardigan; daughter's straight shirt/dress with amber button.
    neck=hy+28*s
    shoulder=neck+22*s
    waist=y-25*s
    dx=4*s if who=="mom" else 0
    line(d,[(hx,neck),(x+dx,waist)],GRAY if who=="mom" else WHITE,5)
    if who=="mom":
        line(d,[(x-18*s,shoulder),(x+19*s,shoulder)],AMBER,3)
        ell(d,x,shoulder+16*s,2.5*s,outline=AMBER,fill=AMBER)
    else:
        line(d,[(x-14*s,shoulder),(x+14*s,shoulder)],SLATE,4)
    # Hands interpolate via pose in real time; only a small motion drift.
    lift=3*math.sin(t*2.4)
    if pose in ("camera","photo"):
        lt=(x-31*s,y-92*s);rt=(x+64*s,y-110*s+lift*s)
    elif pose=="hold":
        lt=(x-15*s,y-92*s);rt=(x+31*s,y-87*s+lift*s)
    elif pose=="reach":
        lt=(x-49*s,y-84*s);rt=(x+91*s,y-103*s+lift*s)
    elif pose=="hug":
        lt=(x-64*s,y-112*s);rt=(x+78*s,y-116*s+lift*s)
    elif pose=="wash":
        lt=(x+12*s,y-68*s);rt=(x+48*s,y-54*s+lift*s)
    else:
        lt=(x-46*s,y-48*s);rt=(x+46*s,y-45*s+lift*s)
    for side,end in ((-1,lt),(1,rt)):
        elbow=(x+side*33*s,y-96*s)
        line(d,[(x,shoulder),elbow,end],GRAY if who=="mom" else WHITE,4)
        ell(d,end[0],end[1],3*s,outline=WHITE,w=2)
    if who=="mom" and pose in ("camera","photo"):
        camera(d,rt[0]+15*s,rt[1]-11*s,.58*s)
    gait=2.5*math.sin(t*1.7)
    line(d,[(x+dx,waist),(x-22*s-gait*s,y+65*s)],GRAY if who=="mom" else WHITE,4)
    line(d,[(x+dx,waist),(x+22*s+gait*s,y+65*s)],GRAY if who=="mom" else WHITE,4)
    if who=="mom":
        line(d,[(x-32*s,y+65*s),(x-10*s,y+65*s)],AMBER,3)

def family_group(d,center_x,foot_y,sec,has_mom=False,scale=1):
    """Exactly the same three-person family silhouette except final adds mom centrally."""
    if has_mom:
        woman(d,center_x-106*scale,foot_y,scale*.7,"linh","hug","happy",sec)
        woman(d,center_x,foot_y,scale*.74,"mom","hug","happy",sec)
        woman(d,center_x+93*scale,foot_y,scale*.79,"linh","idle","happy",sec)
    else:
        for dx,sc in ((-74,.68),(0,.82),(82,.72)):
            woman(d,center_x+dx*scale,foot_y,scale*sc,"linh","idle","happy",sec)

def photo(d,x,y,w,h,sec,kind="birthday",mom=False,reflect=False):
    """Photo-card motif. Every captured shot consistently excludes mom until last."""
    rect(d,(x,y,x+w,y+h),fill=(34,35,39),outline=(206,194,175),rad=4,w=4)
    margin=9
    rect(d,(x+margin,y+margin,x+w-margin,y+h-25),fill=(23,32,42),outline=None,rad=3)
    if kind=="birthday":
        ell(d,x+w*.55,y+h*.36,14,outline=WHITE,w=3)
        line(d,[(x+w*.55,y+h*.36+17),(x+w*.55,y+h*.7)],WHITE,4)
        line(d,[(x+w*.30,y+h*.69),(x+w*.75,y+h*.69)],AMBER,3)
        txt(d,x+18,y+h-22,"SINH NHẬT",11,WHITE)
    elif kind=="grad":
        ell(d,x+w*.45,y+h*.37,14,outline=WHITE,w=3)
        d.polygon([(x+w*.27,y+h*.26),(x+w*.47,y+h*.15),(x+w*.7,y+h*.26),(x+w*.48,y+h*.33)],fill=GRAY)
        line(d,[(x+w*.45,y+h*.38+16),(x+w*.45,y+h*.70)],WHITE,4)
        if reflect:
            # Readable reflected photographer *inside the glass behind graduate*.
            rect(d,(x+w*.68,y+h*.14,x+w*.92,y+h*.67),fill=(48,55,63),outline=AMBER,rad=3,w=2)
            ell(d,x+w*.80,y+h*.31,7,outline=GRAY,w=2)
            ell(d,x+w*.86,y+h*.30,4,outline=WHITE,w=2)
            line(d,[(x+w*.80,y+h*.39),(x+w*.81,y+h*.56)],GRAY,3)
            camera(d,x+w*.83,y+h*.47,.20)
        txt(d,x+18,y+h-22,"TỐT NGHIỆP",10,WHITE)
    elif kind=="dinner":
        for i in range(3):
            ell(d,x+30+i*35,y+h*.35,9,outline=WHITE,w=2)
            line(d,[(x+30+i*35,y+h*.35+10),(x+30+i*35,y+h*.64)],WHITE,3)
        line(d,[(x+15,y+h*.70),(x+w-16,y+h*.70)],AMBER,3)
        txt(d,x+18,y+h-22,"BỮA CƠM",11,WHITE)
    else:
        family_group(d,x+w*.5,y+h*.77,sec,has_mom=mom,scale=.43)
        txt(d,x+19,y+h-22,"GIA ĐÌNH",11,WHITE)

def album_scene(d,sec,detail=False):
    wallpaper(d)
    rect(d,(35,268,515,711),outline=SLATE,fill=NIGHT,rad=15)
    window(d,353,286,495,531)
    # Hand-held album/tablet is screen's narrative focus.
    rect(d,(284,333,465,619),fill=(19,24,32),outline=WHITE,rad=13,w=3)
    txt(d,301,351,"ẢNH GIA ĐÌNH",15,WHITE,True)
    for i,(typ,px,py) in enumerate((("birthday",300,393),("grad",384,393),("dinner",300,495),("birthday",384,495))):
        photo(d,px,py,74,91,sec,kind=typ)
    if detail:
        rect(d,(286,624,480,660),outline=AMBER,fill=(36,36,39),rad=6,w=1)
        txt(d,297,634,"100+ ẢNH · 0 BÓNG MẸ",12,AMBER,True)
    woman(d,168,634,1.01,"linh","hold","shock" if detail else "neutral",sec)
    # Her near hand reaches toward the archive, gaze to the right.
    if detail:
        line(d,[(218,516),(284,485)],WHITE,2)
        warm(d,393,481,.22)

def birthday_scene(d,sec,detail=False):
    wallpaper(d,.1)
    window(d,354,281,499,530,True)
    rect(d,(90,598,479,677),fill=(27,30,38),outline=SLATE,rad=9)
    line(d,[(104,598),(466,598)],GOLD,4)
    cake_x,cake_y=299,580
    rect(d,(cake_x-42,cake_y-13,cake_x+45,cake_y+18),fill=(45,34,34),outline=AMBER,rad=7)
    line(d,[(cake_x,cake_y-14),(cake_x,cake_y-39)],WHITE,2)
    warm(d,cake_x,cake_y-44,.45)
    d.polygon([(cake_x,cake_y-63),(cake_x-5,cake_y-43),(cake_x,cake_y-39),(cake_x+5,cake_y-44)],fill=AMBER)
    woman(d,199,608,.67,"linh","hold","happy",sec)
    woman(d,442,619,.83,"mom","camera","proud",sec)
    if detail:
        photo(d,308,296,153,183,sec,"birthday")
        txt(d,318,276,"ẢNH MẸ VỪA CHỤP",12,GRAY)

def graduation_scene(d,sec,detail=False):
    wallpaper(d,.10)
    # Building and glass window are same landmark reused at the reveal.
    rect(d,(245,292,499,619),fill=WINDOW,outline=SLATE,rad=7,w=4)
    for i in range(3):
        line(d,[(265+i*72,302),(265+i*72,609)],SLATE,3)
    line(d,[(249,430),(492,430)],SLATE,2)
    txt(d,293,312,"LỄ TỐT NGHIỆP",14,AMBER,True)
    woman(d,200,645,.98,"linh","hold","happy",sec)
    d.polygon([(164,480),(198,462),(234,480),(201,492)],fill=(104,112,125))
    line(d,[(228,480),(238,511)],AMBER,3)
    woman(d,436,635,.79,"mom","camera","proud",sec)
    if detail:
        photo(d,316,327,168,211,sec,"grad",reflect=True)

def dinner_scene(d,sec,detail=False):
    wallpaper(d,.12)
    window(d,365,272,489,467,False)
    rect(d,(180,582,485,625),outline=GOLD,fill=(33,34,41),rad=6)
    line(d,[(204,624),(203,707)],SLATE,4)
    line(d,[(456,624),(457,707)],SLATE,4)
    for xx in (236,305,382):
        ell(d,xx,599,14,outline=GRAY,w=2)
        ell(d,xx,599,6,outline=AMBER,w=2)
    family_group(d,327,557,sec,False,.65)
    woman(d,123,627,.85,"mom","camera","proud",sec)
    if detail:
        photo(d,345,305,144,171,sec,"dinner")
        txt(d,351,477,"MẸ LUÔN LÙI LẠI",11,AMBER)

def browse_scene(d,sec,detail=False):
    wallpaper(d,.05)
    window(d)
    woman(d,142,637,.98,"linh","hold","sad",sec)
    for i,(typ,xx,yy) in enumerate((("birthday",269,327),("grad",373,327),("dinner",318,505))):
        delta=4*math.sin(sec*.4+i)
        photo(d,xx,yy+delta,98,132,sec,typ)
    if detail:
        txt(d,292,662,"BỨC NÀO CŨNG...",15,GRAY)
        txt(d,320,688,"THIẾU MẸ.",17,AMBER,True)

def reflection_scene(d,sec,detail=False):
    wallpaper(d,.05)
    # Photographic window / reflection carries the narrative turn.
    if not detail:
        photo(d,226,275,262,346,sec,"grad",reflect=True)
        woman(d,159,640,.87,"linh","reach","shock",sec)
        line(d,[(216,510),(413,425)],AMBER,2)
    else:
        # Larger overlaid photographic crop zooms on tiny mother's glass reflection.
        rect(d,(66,289,502,683),fill=(23,29,40),outline=GOLD,rad=10,w=4)
        rect(d,(250,317,467,639),fill=(36,46,61),outline=AMBER,rad=6,w=5)
        woman(d,353,615,.82,"mom","camera","proud",sec)
        line(d,[(260,345),(445,620)],mix(GRAY,WHITE,.27),2)
        line(d,[(258,430),(464,354)],mix(GRAY,WHITE,.2),2)
        txt(d,82,310,"TRONG Ô KÍNH...",14,GRAY)
        txt(d,76,634,"MẸ ĐANG MỈM CƯỜI.",16,AMBER,True)
        warm(d,359,482,.34)

def kitchen_scene(d,sec,detail=False):
    wallpaper(d,.11)
    rect(d,(240,285,506,616),fill=(19,24,31),outline=SLATE,rad=6)
    window(d,338,294,487,479)
    line(d,[(241,586),(505,586)],GOLD,4)
    for xx in (303,355,405):
        ell(d,xx,581,19,outline=WHITE,w=2)
        ell(d,xx,581,12,outline=GRAY,w=1)
    woman(d,406,638,.86,"mom","wash","neutral",sec)
    woman(d,166,639,.92,"linh","reach","tear",sec)
    if detail:
        warm(d,408,495,.29)
        txt(d,283,669,"MẸ CHƯA TỪNG ĐÒI HỎI",12,AMBER)

def invite_scene(d,sec,detail=False):
    wallpaper(d,.15)
    window(d,355,282,498,521,True)
    woman(d,186,642,.92,"linh","reach","happy",sec)
    woman(d,318,641,.86,"mom","hold","shock" if detail else "neutral",sec)
    line(d,[(260,540),(278,530)],AMBER,4)
    if detail:
        # Daughter finally handles the phone, mother puts her hands down.
        camera(d,172,505,.57)
        txt(d,293,683,"MẸ ĐỨNG GIỮA NHÉ!",12,AMBER,True)

def portrait_scene(d,sec,detail=False):
    wallpaper(d,.19)
    window(d,354,280,502,513,True)
    if not detail:
        # Camera tripod and countdown lead into the captured portrait.
        line(d,[(101,471),(80,627)],GRAY,3)
        line(d,[(101,471),(134,627)],GRAY,3)
        camera(d,101,469,.78)
        ell(d,103,426,21,outline=AMBER,w=3)
        txt(d,95,415,str(max(1,3-int((sec-40.2)*.75))),19,AMBER,True)
        family_group(d,342,642,sec,True,.98)
    else:
        # Freeze a complete picture with mother in the middle.
        photo(d,114,303,330,347,sec,"family",mom=True)
        warm(d,269,455,.48)
        txt(d,170,667,"CUỐI CÙNG, CÓ MẸ.",17,AMBER,True)

SCENES=("album","birthday","graduation","dinner","browse","reflection","kitchen","invite","portrait")
RENDERERS={"album":album_scene,"birthday":birthday_scene,
           "graduation":graduation_scene,"dinner":dinner_scene,
           "browse":browse_scene,"reflection":reflection_scene,
           "kitchen":kitchen_scene,"invite":invite_scene,"portrait":portrait_scene}
def scene(d,scene_index,global_seconds):
    chapter=scene_index//2
    detail=bool(scene_index%2)
    RENDERERS[SCENES[chapter]](d,global_seconds,detail)
    return {"chapter":chapter,"detail":detail}

def character_bible():
    return {"characters":["Linh","Mother"],"style":"near-black emotional stick figure",
            "linh":"dark ponytail, amber hair pin, white line contour",
            "mother":"grey bun, spectacles, amber cardigan button, soft posture",
            "chapters":list(SCENES),
            "propContinuity":["phone-camera","birthday candle","graduation window"],
            "palette":[BLACK,WHITE,GRAY,AMBER]}
