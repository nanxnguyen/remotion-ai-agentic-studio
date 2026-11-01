#!/usr/bin/env python3
"""Generate deterministic, original 2.5D horror scene plates and ambient audio for Hẻm Chuyện Lạ.
No third-party stock, no gore, no violent imagery, no external image service.
"""
from __future__ import annotations
import math, random, wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
W, H = 1080, 1920
FPS = 30
SLUGS = [
    "hanh-khach-khong-buoc-ra",
    "ban-tin-luc-0-gio-07",
    "sap-hang-khong-co-trong-so",
    "cot-den-thu-tam",
]
FONT_REG = [
    "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
FONT_BOLD = [
    "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

def get_font(size: int, bold: bool = False):
    for p in (FONT_BOLD if bold else FONT_REG):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def blend(a, b, t):
    return tuple(int(a[i] * (1-t) + b[i] * t) for i in range(3))

def base(seed: int, top=(5, 12, 20), bottom=(12, 27, 34), accent=(35, 80, 92)):
    rng = np.random.default_rng(seed)
    grad = np.zeros((H, W, 3), dtype=np.float32)
    for y in range(H):
        t = y / max(1, H-1)
        c = blend(top, bottom, t)
        grad[y, :, :] = c
    noise = rng.normal(0, 3.2, (H, W, 1))
    grad += noise
    yy, xx = np.mgrid[0:H, 0:W]
    nx = (xx - W/2) / (W/2)
    ny = (yy - H/2) / (H/2)
    vignette = np.clip(1 - 0.40*(nx*nx + ny*ny), 0.48, 1.0)[..., None]
    grad *= vignette
    img = Image.fromarray(np.uint8(np.clip(grad, 0, 255)), "RGB").convert("RGBA")
    fog = Image.new("RGBA", (W, H), (0,0,0,0))
    fd = ImageDraw.Draw(fog)
    rr = random.Random(seed)
    for _ in range(18):
        x = rr.randint(-180, W+180); y = rr.randint(120, H+120)
        rx = rr.randint(120, 420); ry = rr.randint(35, 150)
        fd.ellipse((x-rx, y-ry, x+rx, y+ry), fill=(*accent, rr.randint(8, 22)))
    img = Image.alpha_composite(img, fog.filter(ImageFilter.GaussianBlur(75)))
    return img

def glow(img, x, y, radius, color=(225, 55, 50), alpha=150):
    layer = Image.new("RGBA", (W,H), (0,0,0,0))
    d = ImageDraw.Draw(layer)
    d.ellipse((x-radius, y-radius, x+radius, y+radius), fill=(*color, alpha))
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(radius*0.55)))

def rain(img, seed, density=220):
    layer = Image.new("RGBA", (W,H), (0,0,0,0))
    d = ImageDraw.Draw(layer)
    rng = random.Random(seed)
    for _ in range(density):
        x = rng.randint(0,W); y = rng.randint(0,H)
        length = rng.randint(18,85)
        d.line((x,y,x-10,y+length), fill=(155,190,205,rng.randint(18,55)), width=rng.choice([1,1,2]))
    img.alpha_composite(layer)

def grain(img, seed):
    rng = np.random.default_rng(seed+99)
    rgb = np.asarray(img.convert("RGB")).astype(np.int16)
    n = rng.normal(0, 2.1, (H,W,1))
    rgb = np.clip(rgb+n,0,255).astype(np.uint8)
    return Image.fromarray(rgb, "RGB").convert("RGBA")

def text(d, xy, value, size, color=(238,232,215,255), bold=False, anchor=None, stroke=0):
    d.text(xy, value, font=get_font(size,bold), fill=color, anchor=anchor,
           stroke_width=stroke, stroke_fill=(0,0,0,210))

def draw_person(d, x, y, scale=1.0, jacket=(18,30,37), face=(155,126,105), back=False, cap=True, scared=False):
    # Stylized, consistent adult figure; no violence or injury.
    r = 66*scale
    d.ellipse((x-r,y-r*1.35,x+r,y+r*0.65), fill=(8,13,18,255), outline=(67,87,93,220), width=max(2,int(3*scale)))
    if cap:
        d.pieslice((x-r*1.12,y-r*1.58,x+r*1.12,y-r*0.25), 180, 360, fill=(9,16,22,255))
        d.rectangle((x-r*1.05,y-r*0.72,x+r*1.05,y-r*0.52), fill=(24,38,45,255))
    if not back:
        d.ellipse((x-r*0.76,y-r*0.92,x+r*0.76,y+r*0.45), fill=(*face,255))
        # hair and brows
        d.pieslice((x-r*0.83,y-r*1.05,x+r*0.83,y+r*0.10), 180, 360, fill=(10,15,19,255))
        eye_y = y-r*0.15
        d.line((x-r*0.43,eye_y,x-r*0.12,eye_y-3*scale), fill=(20,22,22,255), width=max(2,int(5*scale)))
        d.line((x+r*0.12,eye_y-3*scale,x+r*0.43,eye_y), fill=(20,22,22,255), width=max(2,int(5*scale)))
        d.ellipse((x-r*0.25,eye_y+8*scale,x-r*0.12,eye_y+21*scale), fill=(4,8,10,255))
        d.ellipse((x+r*0.12,eye_y+8*scale,x+r*0.25,eye_y+21*scale), fill=(4,8,10,255))
        d.line((x,y-r*0.02,x-r*0.05,y+r*0.25,x+r*0.05,y+r*0.27), fill=(91,68,59,255), width=max(2,int(3*scale)))
        mouth_y = y+r*0.39
        d.line((x-r*0.22,mouth_y,x+r*0.22,mouth_y+(7*scale if scared else 0)), fill=(54,28,28,255), width=max(2,int(4*scale)))
    # shoulders, torso and arms
    d.polygon([(x-r*1.45,y+r*0.45),(x-r*2.15,y+r*1.15),(x-r*2.55,y+r*3.0),
               (x+r*2.55,y+r*3.0),(x+r*2.15,y+r*1.15),(x+r*1.45,y+r*0.45)],
              fill=(*jacket,255), outline=(48,68,74,255))
    d.line((x-r*1.45,y+r*0.85,x-r*2.0,y+r*2.25), fill=(*jacket,255), width=max(10,int(35*scale)))
    d.line((x+r*1.45,y+r*0.85,x+r*2.0,y+r*2.25), fill=(*jacket,255), width=max(10,int(35*scale)))
    d.line((x-r*0.65,y+r*2.9,x-r*0.82,y+r*4.2), fill=(8,13,18,255), width=max(8,int(36*scale)))
    d.line((x+r*0.65,y+r*2.9,x+r*0.82,y+r*4.2), fill=(8,13,18,255), width=max(8,int(36*scale)))

def draw_hallway(img, open_door=False, indicator=True):
    d = ImageDraw.Draw(img, "RGBA")
    # walls and floor perspective
    d.polygon([(0,250),(360,430),(360,1500),(0,1920)], fill=(8,18,25,255))
    d.polygon([(1080,250),(720,430),(720,1500),(1080,1920)], fill=(5,13,20,255))
    d.polygon([(0,1920),(360,1500),(720,1500),(1080,1920)], fill=(13,23,29,255))
    for x in [90,230,850,990]:
        d.line((x,450,540+(x-540)*2,1880), fill=(44,69,78,105), width=3)
    for y in [520,760,1010,1280,1540]:
        d.line((0,y,1080,y+int((y-520)*0.22)), fill=(39,58,66,90), width=2)
    # elevator portal
    d.rounded_rectangle((300,470,780,1510), radius=12, fill=(3,8,13,255), outline=(94,117,125,255), width=8)
    if open_door:
        d.rectangle((330,500,750,1480), fill=(1,4,8,255))
        d.rectangle((350,520,535,1470), fill=(15,26,32,255))
        d.rectangle((545,520,730,1470), fill=(9,19,25,255))
        d.line((540,520,540,1470), fill=(110,131,135,180), width=4)
        glow(img, 540, 720, 230, (120,170,190), 40)
    else:
        d.rectangle((330,500,535,1480), fill=(29,43,49,255), outline=(92,111,118,220), width=3)
        d.rectangle((545,500,750,1480), fill=(21,34,41,255), outline=(92,111,118,220), width=3)
        for x in [380,430,590,650,700]:
            d.line((x,520,x,1460), fill=(67,85,92,90), width=2)
    # ceiling light
    d.rounded_rectangle((410,330,670,385), radius=12, fill=(162,191,194,190))
    glow(img,540,370,180,(150,200,210),45)
    if indicator:
        d.rounded_rectangle((800,360,1005,500), radius=14, fill=(3,7,11,255), outline=(100,116,120,255), width=5)
        text(d,(902,430),"13",72,(244,54,57,255),True,"mm")
        glow(img,902,430,105,(230,30,35),75)

def draw_cctv(img, x=55, y=650, w=360, h=280, twin=True):
    d = ImageDraw.Draw(img,"RGBA")
    d.rounded_rectangle((x,y,x+w,y+h),radius=18,fill=(2,5,9,255),outline=(95,122,132,255),width=7)
    d.rectangle((x+16,y+16,x+w-16,y+h-16),fill=(8,23,31,255))
    d.line((x+20,y+60,x+w-20,y+60),fill=(75,111,121,80),width=2)
    if twin:
        draw_person(d,x+w*0.55,y+h*0.40,0.28,(10,20,27),(150,120,100),back=True,cap=False)
    else:
        d.rectangle((x+60,y+80,x+w-60,y+h-50),fill=(1,7,12,255))
    for yy in range(y+30,y+h-20,12):
        d.line((x+18,yy,x+w-18,yy),fill=(120,160,170,18),width=1)
    text(d,(x+24,y+h-42),"CAM 01",20,(160,185,187,230),True)

def draw_studio(img, onair=True):
    d=ImageDraw.Draw(img,"RGBA")
    # glass partition and acoustic wall
    d.rectangle((0,330,1080,1220),fill=(8,18,26,170),outline=(45,71,82,190),width=8)
    for x in [170,520,870]:
        d.line((x,330,x,1220),fill=(67,92,102,150),width=8)
    # console desk
    d.polygon([(80,1250),(1000,1180),(1080,1510),(0,1630)],fill=(11,17,23,255),outline=(77,94,99,255))
    for i in range(10):
        x=130+i*82
        d.rounded_rectangle((x,1290,x+45,1400),radius=6,fill=(22,40,47,255),outline=(82,111,120,255),width=2)
        d.rectangle((x+12,1310,x+24,1370),fill=(150,165,156,220))
    # monitor waveform
    d.rounded_rectangle((610,760,980,1050),radius=16,fill=(2,8,13,255),outline=(80,113,121,255),width=5)
    for x in range(640,950,14):
        y=905+math.sin(x*0.09)*40+math.sin(x*0.31)*18
        d.line((x,y-40,x,y+40),fill=(45,173,164,210),width=4)
    # mic
    d.line((500,1020,500,1270),fill=(124,142,145,255),width=9)
    d.ellipse((455,870,545,1080),fill=(22,32,37,255),outline=(140,154,155,255),width=6)
    d.line((470,920,530,920),fill=(100,123,129,255),width=3)
    d.line((470,960,530,960),fill=(100,123,129,255),width=3)
    # ON AIR sign
    d.rounded_rectangle((80,420,480,590),radius=18,fill=(9,7,10,255),outline=(145,44,43,255),width=6)
    if onair:
        glow(img,280,505,190,(235,30,34),95)
        text(d,(280,505),"ON AIR",88,(255,75,65,255),True,"mm")
    else:
        text(d,(280,505),"OFF AIR",74,(90,95,96,255),True,"mm")

def draw_market(img, stall=True):
    d=ImageDraw.Draw(img,"RGBA")
    # wet market aisle
    d.polygon([(0,620),(400,760),(400,1500),(0,1920)],fill=(6,16,22,255))
    d.polygon([(1080,620),(680,760),(680,1500),(1080,1920)],fill=(5,13,19,255))
    for x in [70,230,850,1010]:
        d.line((x,480,540+(x-540)*1.8,1880),fill=(45,70,77,100),width=5)
    # stall canopy and warm lamp
    if stall:
        d.polygon([(190,620),(870,620),(980,850),(100,850)],fill=(17,30,33,255),outline=(102,111,93,255))
        for x in range(210,900,70):
            d.line((x,640,x-35,830),fill=(71,84,76,150),width=4)
        d.line((530,520,530,660),fill=(95,100,91,255),width=5)
        d.ellipse((470,640,590,760),fill=(255,183,89,245))
        glow(img,530,700,250,(255,156,60),95)
        d.rectangle((170,840,910,1120),fill=(29,24,20,255),outline=(117,91,60,255),width=6)
        d.rectangle((210,1120,870,1220),fill=(13,18,20,255))
    # wet floor
    for i in range(9):
        y=1270+i*72
        d.line((70,y,1010,y+random.randint(-20,20)),fill=(67,101,110,60),width=3)

def draw_road(img, lamps=7):
    d=ImageDraw.Draw(img,"RGBA")
    # road perspective
    d.polygon([(420,720),(660,720),(1080,1920),(0,1920)],fill=(7,14,20,255))
    d.polygon([(0,1920),(420,720),(0,500)],fill=(4,11,17,255))
    d.polygon([(660,720),(1080,1920),(1080,500)],fill=(4,11,17,255))
    for k in range(1,8):
        y=720+k*155
        d.line((540-(k*38),y,540+(k*38),y),fill=(104,128,133,45),width=3)
    # street lamps
    positions=[(150,580),(310,500),(455,435),(620,380),(760,330),(885,285),(990,245),(1040,190)]
    for idx,(x,y) in enumerate(positions[:lamps]):
        d.line((x,y,x,y+330+idx*20),fill=(29,42,48,255),width=11)
        d.line((x,y,x+95,y-5),fill=(50,63,66,255),width=10)
        d.ellipse((x+65,y-20,x+120,y+35),fill=(255,195,112,245))
        glow(img,x+92,y+8,150,(255,172,80),65)
        d.polygon([(x+25,y+25),(x+155,y+25),(x+300,y+600),(x-100,y+600)],fill=(255,174,87,10))
    # wet road reflections
    for x in [330,450,610,760]:
        d.line((x,1180,x+random.randint(-45,45),1880),fill=(93,133,144,65),width=random.randint(5,12))

def draw_phone(d, x=650, y=720, name="PHÚC", status="ĐƠN HÀNG"):
    d.rounded_rectangle((x,y,x+300,y+520),radius=38,fill=(3,7,11,255),outline=(133,152,155,255),width=8)
    d.rounded_rectangle((x+18,y+30,x+282,y+490),radius=24,fill=(14,29,35,255))
    text(d,(x+150,y+100),status,24,(176,201,200,255),True,"mm")
    d.ellipse((x+90,y+150,x+210,y+270),fill=(29,51,59,255),outline=(130,165,170,255),width=4)
    d.ellipse((x+128,y+170,x+172,y+215),fill=(168,143,121,255))
    d.arc((x+115,y+205,x+185,y+255),0,180,fill=(8,14,18,255),width=7)
    text(d,(x+150,y+320),name,38,(247,80,73,255),True,"mm")
    text(d,(x+150,y+390),"NGƯỜI NHẬN",18,(175,192,193,255),True,"mm")

def render_scene(slug: str, i: int):
    seed = 4100 + SLUGS.index(slug)*100 + i
    if slug == "hanh-khach-khong-buoc-ra":
        img=base(seed,(5,12,20),(13,28,36),(42,89,103))
        rain(img,seed,120)
        draw_hallway(img,open_door=(i in [0,7,8]),indicator=True)
        d=ImageDraw.Draw(img,"RGBA")
        if i in [0,1,4,5,6,7]:
            draw_cctv(img,55 if i%2==0 else 650,780 if i%2==0 else 620,360,270,twin=True)
        if i in [1,2,3,6]:
            draw_person(d,540 if i!=3 else 350,1050,1.05,(17,32,39),(157,126,106),back=(i==3),cap=True,scared=True)
        if i==2:
            d.rounded_rectangle((780,340,1010,500),radius=12,fill=(3,6,10,255),outline=(150,45,48,255),width=5)
            text(d,(895,420),"13",90,(250,48,51,255),True,"mm"); glow(img,895,420,120,(230,20,30),80)
        if i==4:
            d.rounded_rectangle((50,1150,1030,1430),radius=24,fill=(5,10,14,235),outline=(95,119,126,220),width=5)
            text(d,(540,1290),"BÀN TAY SAU LỚP KÍNH",42,(233,229,214,255),True,"mm")
        if i==8:
            d.rounded_rectangle((390,1460,690,1575),radius=14,fill=(193,180,144,255),outline=(40,48,49,255),width=4)
            text(d,(540,1515),"THẺ NHÂN VIÊN",26,(24,31,32,255),True,"mm")
    elif slug == "ban-tin-luc-0-gio-07":
        img=base(seed,(4,8,16),(12,23,31),(40,77,87))
        draw_studio(img,onair=(i not in [2,4]))
        d=ImageDraw.Draw(img,"RGBA")
        if i in [1,2,3,5,6,7]:
            draw_person(d,260 if i%2 else 780,960,0.95,(13,27,35),(156,125,104),back=(i in [1,5,6]),cap=False,scared=True)
        if i in [0,8,9]:
            glow(img,280,505,230,(235,20,30),110)
        if i==3:
            d.rounded_rectangle((60,1480,1020,1670),radius=18,fill=(2,8,13,245),outline=(76,121,130,255),width=5)
            text(d,(540,1570),"00:07  •  KHÔNG CÓ NGƯỜI PHÁT",34,(90,220,199,255),True,"mm")
        if i==5:
            draw_hallway(img,open_door=False,indicator=False)
            d=ImageDraw.Draw(img,"RGBA"); d.rounded_rectangle((80,700,1000,1050),radius=20,fill=(2,8,13,220),outline=(73,107,119,255),width=5)
            text(d,(540,870),"HÀNH LANG TRỐNG",46,(181,205,205,255),True,"mm")
        if i==6:
            d.ellipse((420,660,660,910),fill=(10,19,26,230),outline=(102,136,143,220),width=5)
            draw_person(d,540,870,0.75,(8,17,25),(155,122,105),back=False,cap=False,scared=False)
        if i==7:
            d.line((500,1060,580,1230),fill=(150,160,157,255),width=18)
            d.ellipse((450,880,600,1120),fill=(24,37,42,255),outline=(120,145,147,255),width=5)
    elif slug == "sap-hang-khong-co-trong-so":
        img=base(seed,(7,12,14),(17,26,27),(74,75,54))
        rain(img,seed,150)
        draw_market(img,stall=True)
        d=ImageDraw.Draw(img,"RGBA")
        if i in [1,2,3,6,7]:
            draw_person(d,330 if i%2 else 760,1080,0.9,(18,29,31),(154,122,100),back=(i in [1,3,6]),cap=True,scared=True)
        if i==2:
            d.rounded_rectangle((80,680,1000,980),radius=16,fill=(214,207,181,255),outline=(59,67,58,255),width=5)
            text(d,(540,765),"SƠ ĐỒ CHỢ",46,(32,42,38,255),True,"mm")
            text(d,(540,875),"DÃY B — KHÔNG CÓ SẠP",32,(125,44,38,255),True,"mm")
        if i==3:
            d.rounded_rectangle((220,980,860,1370),radius=12,fill=(226,216,189,255),outline=(58,54,44,255),width=5)
            text(d,(540,1080),"HÓA ĐƠN",40,(42,43,37,255),True,"mm")
            text(d,(540,1190),"THUẬN  •  2 SUẤT",38,(126,44,35,255),True,"mm")
        if i in [4,5,8]:
            d.ellipse((290,1180,540,1410),fill=(44,35,27,255),outline=(188,149,94,255),width=8)
            d.ellipse((570,1180,820,1410),fill=(44,35,27,255),outline=(188,149,94,255),width=8)
            glow(img,540,1240,140,(255,175,85),55)
        if i==5:
            d.polygon([(700,1450),(930,1430),(990,1540),(670,1560)],fill=(13,20,21,255),outline=(110,126,120,255))
            d.line((700,1540,680,1720),fill=(55,61,57,255),width=20)
            d.line((950,1530,980,1710),fill=(55,61,57,255),width=20)
        if i==8:
            d.rounded_rectangle((60,700,1020,1050),radius=18,fill=(2,8,12,245),outline=(105,133,136,255),width=5)
            draw_person(d,390,890,0.48,(14,25,30),(152,121,100),back=True,cap=True)
            draw_person(d,690,890,0.48,(14,25,30),(152,121,100),back=True,cap=True)
    else:  # cot-den-thu-tam
        img=base(seed,(3,10,17),(9,22,29),(42,73,84))
        rain(img,seed,260)
        draw_road(img,lamps=8 if i in [2,4,6,8] else 7)
        d=ImageDraw.Draw(img,"RGBA")
        if i in [0,1,3,4,5,7,8,9]:
            draw_person(d,380 if i%2 else 720,1180,0.88,(17,28,34),(157,128,108),back=True,cap=True)
        if i==1:
            d.rounded_rectangle((650,700,1010,1230),radius=26,fill=(3,7,12,250),outline=(116,142,146,255),width=6)
            draw_phone(d,680,735,"PHÚC","ĐƠN HÀNG")
        if i==2:
            glow(img,1020,200,240,(255,175,78),130)
            text(d,(820,530),"08",90,(250,191,117,255),True,"mm")
        if i in [4,6]:
            draw_person(d,760,820,0.72,(11,21,28),(158,127,105),back=(i==4),cap=True,scared=False)
            glow(img,850,590,220,(255,173,90),75)
        if i==7:
            d.rounded_rectangle((630,650,1030,1310),radius=28,fill=(2,7,11,250),outline=(111,139,143,255),width=6)
            draw_phone(d,680,700,"PHÚC","NGƯỜI NHẬN")
        if i==8:
            d.rounded_rectangle((620,700,1030,1180),radius=26,fill=(4,9,13,245),outline=(111,138,141,255),width=6)
            text(d,(825,800),"ĐÃ GIAO",54,(91,221,164,255),True,"mm")
            d.rounded_rectangle((690,890,960,1080),radius=10,fill=(116,85,56,255),outline=(191,157,114,255),width=5)
            text(d,(825,980),"GÓI HÀNG",30,(239,225,196,255),True,"mm")
    # subtle lens haze and film grain
    if slug in [ "sap-hang-khong-co-trong-so", "cot-den-thu-tam" ]:
        rain(img,seed+9,90)
    img=grain(img,seed)
    return img.convert("RGB")

def make_ambience(slug: str, out: Path, seconds: float = 45.0):
    sr=48000; n=int(sr*seconds); t=np.arange(n,dtype=np.float32)/sr
    rng=np.random.default_rng(900+SLUGS.index(slug))
    base_drone=(0.030*np.sin(2*np.pi*47*t)+0.018*np.sin(2*np.pi*63*t+0.6)+0.012*np.sin(2*np.pi*91*t+1.2))
    slow=(0.72+0.28*np.sin(2*np.pi*0.08*t+0.5))
    hiss=rng.normal(0,0.004,n).astype(np.float32)
    # one-pole low-pass creates a soft rain / room tone bed
    low=np.empty_like(hiss); prev=0.0
    for j,v in enumerate(hiss):
        prev=0.985*prev+0.015*float(v); low[j]=prev
    ambience=base_drone*slow + hiss*0.45 + low*1.8
    events = {
      "hanh-khach-khong-buoc-ra":[(2.4,110,0.32),(11.5,72,0.28),(18.4,155,0.25),(27.0,95,0.35),(36.2,58,0.30)],
      "ban-tin-luc-0-gio-07":[(3.0,880,0.22),(8.4,62,0.26),(14.2,145,0.28),(24.0,55,0.35),(34.5,440,0.22)],
      "sap-hang-khong-co-trong-so":[(4.0,170,0.22),(11.2,210,0.22),(18.3,80,0.30),(26.5,120,0.26),(35.4,60,0.32)],
      "cot-den-thu-tam":[(5.0,58,0.26),(12.3,900,0.18),(18.5,145,0.24),(27.0,70,0.30),(36.0,50,0.34)],
    }[slug]
    for when,freq,amp in events:
        start=int(when*sr); length=min(int(0.65*sr),n-start)
        if length<=0: continue
        tt=np.arange(length,dtype=np.float32)/sr
        env=np.exp(-tt*6.0)
        tone=np.sin(2*np.pi*freq*tt)*env*amp*0.12
        click=rng.normal(0,1,length).astype(np.float32)*env*amp*0.018
        ambience[start:start+length]+=tone+click
    fade=np.ones(n,dtype=np.float32)
    fade[:sr]=np.linspace(0,1,sr); fade[-sr:]=np.linspace(1,0,sr)
    ambience=np.clip(ambience*fade,-0.45,0.45)
    stereo=np.column_stack([ambience,ambience*0.94])
    pcm=(stereo*32767).astype("<i2")
    out.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(out),"wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(sr); wf.writeframes(pcm.tobytes())

def main():
    for slug in SLUGS:
        out=ROOT/"public"/"images"/slug
        out.mkdir(parents=True,exist_ok=True)
        for i in range(10):
            img=render_scene(slug,i)
            img.save(out/f"scene-{i+1:02d}.png",format="PNG",optimize=True)
        audio=ROOT/"public"/"audio"/slug/"ambience.wav"
        make_ambience(slug,audio)
        print(f"{slug}: 10 scene plates + 45s original ambience generated")
if __name__=="__main__":
    main()
