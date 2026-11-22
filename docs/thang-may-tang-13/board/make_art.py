"""Original SVG scene art for thang-may-tang-13 review board (1080x1920, clean: no captions/timecodes)."""
import sys, subprocess
from pathlib import Path
OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
W, H = 1080, 1920
AMBER, RED, IVORY = "#F5C467", "#ED3E4C", "#F7F1E8"
COAT, COAT_D = "#C98F2B", "#8A5E17"
SKIN, SKIN_D = "#E9CDB4", "#B89275"

DEFS = f'''<defs>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0"/></filter>
<filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="blur20"><feGaussianBlur stdDeviation="20"/></filter>
<filter id="blur40"><feGaussianBlur stdDeviation="40"/></filter>
<filter id="glowR" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.85"/></radialGradient>
<linearGradient id="steel" x1="0" x2="1"><stop offset="0" stop-color="#1b232c"/><stop offset=".45" stop-color="#3a4652"/><stop offset=".55" stop-color="#2a333d"/><stop offset="1" stop-color="#141a20"/></linearGradient>
<linearGradient id="coldTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b3a"/><stop offset="1" stop-color="#05080c"/></linearGradient>
<linearGradient id="warm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2512"/><stop offset="1" stop-color="#0c0704"/></linearGradient>
<radialGradient id="lamp" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFC877" stop-opacity=".85"/><stop offset="1" stop-color="#FFC877" stop-opacity="0"/></radialGradient>
<radialGradient id="tvglow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7FB4FF" stop-opacity=".75"/><stop offset="1" stop-color="#7FB4FF" stop-opacity="0"/></radialGradient>
<linearGradient id="coat" x1="0" x2="1"><stop offset="0" stop-color="{COAT_D}"/><stop offset=".5" stop-color="{COAT}"/><stop offset="1" stop-color="{COAT_D}"/></linearGradient>
</defs>'''

def svg(body, bg="#05070a"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{DEFS}'
            f'<rect width="{W}" height="{H}" fill="{bg}"/>{body}'
            f'<rect width="{W}" height="{H}" fill="url(#vig)"/><rect width="{W}" height="{H}" filter="url(#grain)"/></svg>')

SEG = {"0":"abcdef","1":"bc","2":"abged","3":"abgcd","4":"fgbc","5":"afgcd","6":"afgedc","7":"abc","8":"abcdefg","9":"abcdfg"}
def seg7(d, x, y, s, col, off="#2a0608"):
    w, h, t = 60*s, 110*s, 13*s
    P = {"a":(x+t,y,w-2*t,t),"g":(x+t,y+h/2-t/2,w-2*t,t),"d":(x+t,y+h-t,w-2*t,t),
         "f":(x,y+t,t,h/2-1.5*t),"b":(x+w-t,y+t,t,h/2-1.5*t),"e":(x,y+h/2+t/2,t,h/2-1.5*t),"c":(x+w-t,y+h/2+t/2,t,h/2-1.5*t)}
    out = ""
    for k,(a,b,c,e) in P.items():
        on = k in SEG[d]
        out += f'<rect x="{a:.1f}" y="{b:.1f}" width="{c:.1f}" height="{e:.1f}" rx="{t/3:.1f}" fill="{col if on else off}" {"filter=\"url(#glowR)\"" if on else ""}/>'
    return out
def display(num, cx, cy, s, col=RED):
    w = 60*s; gap = 22*s; total = len(num)*w + (len(num)-1)*gap
    box = f'<rect x="{cx-total/2-40*s}" y="{cy-85*s}" width="{total+80*s}" height="{170*s}" rx="{14*s}" fill="#080304" stroke="#3b444d" stroke-width="{6*s}"/>'
    return box + "".join(seg7(c, cx-total/2+i*(w+gap), cy-55*s, s, col) for i,c in enumerate(num)) + \
        f'<ellipse cx="{cx}" cy="{cy}" rx="{total}" ry="{120*s}" fill="{col}" opacity=".10" filter="url(#blur40)"/>'

def linh_head(x, y, s=1.0, look="up", mouth="o", light="#9ec3ff"):
    # bob hair, pale face, eyes
    ey = -10 if look == "up" else 0
    return f'''<g transform="translate({x},{y}) scale({s})">
<path d="M-120,-40 C-130,-170 130,-170 120,-40 L128,90 L60,96 L60,-20 L-60,-20 L-60,96 L-128,90 Z" fill="#0d0b0c"/>
<ellipse cx="0" cy="10" rx="82" ry="104" fill="{SKIN}"/>
<ellipse cx="-30" cy="10" rx="82" ry="104" fill="{SKIN_D}" opacity=".25"/>
<path d="M-90,-30 C-60,-120 80,-110 95,-25 C40,-70 -20,-60 -90,-30Z" fill="#0d0b0c"/>
<ellipse cx="-30" cy="{12+ey}" rx="15" ry="{12 if look!='wide' else 17}" fill="#fff"/><ellipse cx="30" cy="{12+ey}" rx="15" ry="{12 if look!='wide' else 17}" fill="#fff"/>
<circle cx="-30" cy="{8+ey}" r="7" fill="#151010"/><circle cx="30" cy="{8+ey}" r="7" fill="#151010"/>
<path d="M-50,{-12+ey} q20,-10 40,0 M10,{-12+ey} q20,-10 40,0" stroke="#3a2a22" stroke-width="5" fill="none"/>
<path d="M0,25 l-6,22 h10" stroke="{SKIN_D}" stroke-width="4" fill="none"/>
{'<ellipse cx="0" cy="72" rx="11" ry="14" fill="#5a2b2b"/>' if mouth=='o' else '<path d="M-18,70 q18,6 36,0" stroke="#7a3b35" stroke-width="5" fill="none"/>'}
<ellipse cx="0" cy="0" rx="90" ry="110" fill="{light}" opacity=".12"/>
</g>'''

def linh_body(x, y, s=1.0):
    return f'''<g transform="translate({x},{y}) scale({s})">
<path d="M-60,0 L60,0 L80,40 C170,70 200,150 210,420 L-210,420 C-200,150 -170,70 -80,40 Z" fill="url(#coat)"/>
<path d="M-60,0 L0,90 L60,0 L80,40 L0,140 L-80,40Z" fill="{COAT_D}"/>
<path d="M0,140 L0,420" stroke="{COAT_D}" stroke-width="6"/>
<path d="M-150,80 C-170,200 -175,300 -170,420" stroke="#e8e2d8" stroke-width="5" fill="none" opacity=".7"/>
</g>'''

def mother(x, y, s=1.0, turn=1.0):
    return f'''<g transform="translate({x},{y}) scale({s})">
<path d="M-230,520 C-220,250 -170,170 -80,150 L80,150 C170,170 220,250 230,520Z" fill="#4a1520"/>
<path d="M-70,150 L0,250 L70,150Z" fill="#e8dcc8"/>
<ellipse cx="0" cy="20" rx="88" ry="108" fill="#D8B79C"/>
<path d="M-92,0 C-100,-120 100,-130 92,0 C70,-60 -60,-70 -92,0Z" fill="#8d8a86"/>
<circle cx="{-70*turn+50}" cy="-80" r="42" fill="#7d7a76"/>
<path d="M-48,8 q16,-8 32,0 M16,8 q16,-8 32,0" stroke="#5a3c30" stroke-width="5" fill="none"/>
<ellipse cx="-32" cy="22" rx="12" ry="8" fill="#fff"/><ellipse cx="32" cy="22" rx="12" ry="8" fill="#fff"/>
<circle cx="-32" cy="22" r="6" fill="#1a1010"/><circle cx="32" cy="22" r="6" fill="#1a1010"/>
<ellipse cx="-32" cy="34" rx="16" ry="5" fill="{RED}" opacity=".35"/><ellipse cx="32" cy="34" rx="16" ry="5" fill="{RED}" opacity=".35"/>
<path d="M-60,60 q12,10 22,0 M40,60 q12,10 22,0" stroke="#a88a74" stroke-width="3" fill="none"/>
<path d="M-20,82 q20,-6 40,0" stroke="#6e3a34" stroke-width="5" fill="none"/>
</g>'''

def incense(x, y, s=1.0):
    sticks = "".join(f'<line x1="{x+i*14}" y1="{y}" x2="{x+i*20-10}" y2="{y-260*s}" stroke="#8b3a1a" stroke-width="6"/><circle cx="{x+i*20-10}" cy="{y-262*s}" r="7" fill="#ff7a2a" filter="url(#glowR)"/>' for i in range(3))
    smoke = "".join(f'<path d="M{x+i*20-10},{y-270*s} c40,-80 -40,-160 10,-260 c40,-80 -20,-140 20,-220" stroke="#d9d4cc" stroke-width="{5-i}" fill="none" opacity=".35" filter="url(#blur8)"/>' for i in range(3))
    hand = f'<ellipse cx="{x+15}" cy="{y+20}" rx="55" ry="38" fill="#D8B79C"/>'
    return sticks + smoke + hand

def seal(x, y, w, h, rot):
    return f'''<g transform="translate({x},{y}) rotate({rot})">
<rect x="{-w/2}" y="{-h/2}" width="{w}" height="{h}" fill="#efe9dc" opacity=".92"/>
<circle cx="0" cy="0" r="{h*0.33}" fill="none" stroke="{RED}" stroke-width="{max(2,h*0.06)}" opacity=".85"/>
</g>'''

def door(x, y, w, h, fill="#2a2620", sealed=True, num=None, ns=1.0):
    d = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="#0a0908" stroke-width="{4*ns}"/>'
    d += f'<circle cx="{x+w*0.85}" cy="{y+h*0.55}" r="{6*ns}" fill="#9a8a6a"/>'
    if num: d += f'<rect x="{x+w*0.3}" y="{y+h*0.12}" width="{w*0.4}" height="{h*0.07}" fill="#c9b88f"/><text x="{x+w*0.5}" y="{y+h*0.175}" font-family="Arial" font-weight="bold" font-size="{h*0.05}" text-anchor="middle" fill="#2a2016">{num}</text>'
    if sealed:
        d += seal(x+w/2, y+h*0.45, w*1.15, h*0.11, -32) + seal(x+w/2, y+h*0.45, w*1.15, h*0.11, 32)
    return d

def corridor(vp=(540, 900), light=1.0, seals=True):
    vx, vy = vp
    b = f'<rect width="{W}" height="{H}" fill="url(#coldTop)"/>'
    b += f'<polygon points="0,0 {W},0 {vx+120},{vy-200} {vx-120},{vy-200}" fill="#141a20"/>'  # ceiling
    b += f'<polygon points="0,{H} {W},{H} {vx+120},{vy+180} {vx-120},{vy+180}" fill="#2a2a27"/>'  # floor
    b += f'<polygon points="0,0 {vx-120},{vy-200} {vx-120},{vy+180} 0,{H}" fill="#3b4044"/>'  # left wall
    b += f'<polygon points="{W},0 {vx+120},{vy-200} {vx+120},{vy+180} {W},{H}" fill="#343a3e"/>'  # right wall
    for i in range(6):  # floor tiles
        t = i/6
        yy = vy+180 + (H-vy-180)*t**1.8
        b += f'<line x1="0" y1="{yy}" x2="{W}" y2="{yy}" stroke="#1d1d1b" stroke-width="3" opacity=".6"/>'
    b += f'<rect x="{vx-120}" y="{vy-200}" width="240" height="380" fill="#0b0d0f"/>'
    # soot on ceiling
    b += f'<ellipse cx="{vx-150}" cy="{vy-420}" rx="380" ry="120" fill="#000" opacity=".55" filter="url(#blur40)"/>'
    b += f'<ellipse cx="{vx+260}" cy="{vy-560}" rx="260" ry="90" fill="#000" opacity=".5" filter="url(#blur40)"/>'
    # tube lights
    for t in (0.25, 0.55, 0.8):
        yy = vy-200 - (vy-200)*(1-t)**1.6; ww = 40 + 300*(1-t)**1.6
        b += f'<rect x="{vx-ww/2}" y="{yy}" width="{ww}" height="{8+20*(1-t)}" fill="#dfefff" opacity="{0.9*light}" filter="url(#glowR)"/>'
    # doors left/right in perspective (as trapezoids approximated)
    for side in (-1, 1):
        for k, t in enumerate((0.15, 0.45, 0.68, 0.84)):
            s = (1-t)
            xx = vx + side*(120 + (540-120)*s**1.2)
            topy = vy-200 - (vy-200)*s**1.3 + 200*s
            h = 380 + (1300)*s**1.25
            w = 40 + 260*s**1.3
            x0 = xx - (w if side > 0 else 0)
            if side > 0: x0 = xx - w
            b += door(x0 if side>0 else xx, topy, w, h, fill="#2b2822" if side<0 else "#26231e", sealed=seals, ns=s+0.2)
    return b

def elevator_interior(mirror_person=None):
    b = f'<rect width="{W}" height="{H}" fill="url(#steel)"/>'
    for x in range(0, W, 120): b += f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="#0e1216" stroke-width="2" opacity=".5"/>'
    return b

import random
def R(i,k):
    return random.Random(i*31+k).random()
# ---------------- panels ----------------
P = {}
P["p01"] = svg(elevator_interior() + display("12", 540, 560, 2.6) +
  f'<rect x="380" y="900" width="320" height="760" rx="20" fill="#1a1f25" stroke="#4b5560" stroke-width="5"/>' +
  "".join(f'<circle cx="{460+(i%2)*160}" cy="{1580-(i//2)*120}" r="44" fill="#232a31" stroke="#8a96a3" stroke-width="5"/><text x="{460+(i%2)*160}" y="{1594-(i//2)*120}" font-family="Arial" font-weight="bold" font-size="38" fill="#c9d3dc" text-anchor="middle">{i+1}</text>' for i in range(12)) +
  f'<circle cx="620" cy="980" r="52" fill="none" stroke="{AMBER}" stroke-width="6" filter="url(#glowR)"/>' +
  f'<path d="M150,300 L150,820" stroke="{RED}" stroke-width="3" opacity=".4"/>')
P["p02"] = svg(elevator_interior() + display("13", 540, 420, 2.6) +
  f'<rect x="200" y="760" width="680" height="1160" fill="#20272e"/>' +
  f'<rect x="525" y="760" width="30" height="1160" fill="#0a1018"/>' +
  f'<rect x="533" y="760" width="14" height="1160" fill="#9fc6ff" opacity=".55" filter="url(#blur8)"/>' +
  f'<line x1="540" y1="760" x2="540" y2="1920" stroke="#000" stroke-width="4"/>')
P["p03"] = svg(elevator_interior() +
  f'<rect x="0" y="0" width="330" height="{H}" fill="#2d3946"/><rect x="0" y="0" width="330" height="{H}" fill="#9ec3ff" opacity=".06"/>' +
  f'<g opacity=".55"><g transform="translate(-380,0)">{linh_body(540,1180,1.0)}{linh_head(540,930,1.0,look="up")}</g></g>' +
  f'<line x1="330" y1="0" x2="330" y2="{H}" stroke="#0a0d10" stroke-width="10"/>' +
  linh_body(620, 1180, 1.25) + linh_head(620, 880, 1.35, look="up") +
  f'<path d="M560,1010 C520,1100 540,1200 470,1250" stroke="#f2f2f2" stroke-width="7" fill="none"/><circle cx="470" cy="1255" r="16" fill="#f2f2f2"/>' +
  f'<rect x="460" y="120" width="320" height="150" rx="12" fill="#080304"/>{seg7("1",520,140,1.0,RED)}{seg7("3",620,140,1.0,RED)}')
P["p04"] = svg(
  f'<rect width="{W}" height="{H}" fill="#06090d"/>' +
  f'<g opacity=".9">{corridor(vp=(540,820), light=.5, seals=True)}</g>' +
  f'<rect x="0" y="0" width="300" height="{H}" fill="url(#steel)"/><rect x="780" y="0" width="300" height="{H}" fill="url(#steel)"/>' +
  f'<rect x="560" y="1050" width="380" height="700" rx="18" fill="#1a1f25" stroke="#4b5560" stroke-width="5"/>' +
  f'<circle cx="680" cy="1200" r="52" fill="#232a31" stroke="{AMBER}" stroke-width="7" filter="url(#glowR)"/><path d="M660,1180 l20,20 l20,-20 M660,1220 l20,-20 l20,20" stroke="{AMBER}" stroke-width="7" fill="none"/>' +
  f'<circle cx="840" cy="1200" r="52" fill="#232a31" stroke="#8a96a3" stroke-width="5"/><text x="840" y="1216" font-family="Arial" font-weight="bold" font-size="44" fill="#c9d3dc" text-anchor="middle">12</text>' +
  f'<path d="M1080,1500 C950,1420 820,1330 735,1240 C715,1220 690,1230 700,1255 C760,1340 860,1460 1080,1620Z" fill="{SKIN}"/>' +
  f'<path d="M1080,1470 L1080,1700 L940,1600 C990,1560 1030,1520 1080,1470Z" fill="url(#coat)"/>' +
  "".join(f'<path d="M{700-i*30},{1150-i*25} q-20,-10 -40,0" stroke="{AMBER}" stroke-width="4" fill="none" opacity="{.6-i*.15}"/>' for i in range(3)))
P["p05"] = svg(corridor(vp=(540, 860)) +
  f'<g transform="translate(0,0)">{linh_body(540,1470,.55)}{linh_head(540,1330,.6,look="side")}</g>' +
  f'<rect x="380" y="1700" width="320" height="220" fill="#9fc6ff" opacity=".12" filter="url(#blur20)"/>')
P["p06"] = svg(
  f'<rect width="{W}" height="{H}" fill="#2a2620"/>' +
  "".join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y+40}" stroke="#1f1c17" stroke-width="3"/>' for y in range(0, H, 90)) +
  f'<g transform="translate(540,900) rotate(-8)"><rect x="-480" y="-260" width="960" height="520" fill="#efe9dc"/>' +
  f'<rect x="-480" y="-260" width="960" height="520" fill="#c9b88f" opacity=".15"/>' +
  f'<text x="-420" y="-150" font-family="Arial" font-weight="bold" font-size="64" fill="#2b2622">NIÊM PHONG</text>' +
  f'<circle cx="250" cy="-40" r="150" fill="none" stroke="{RED}" stroke-width="14" opacity=".85"/><circle cx="250" cy="-40" r="110" fill="none" stroke="{RED}" stroke-width="5" opacity=".8"/><polygon points="250,-110 270,-55 325,-55 280,-20 298,35 250,0 202,35 220,-20 175,-55 230,-55" fill="{RED}" opacity=".8"/>' +
  f'<text x="-420" y="120" font-family="Bradley Hand, Arial" font-style="italic" font-size="110" fill="#1d2a52">07.11.2025</text>' +
  f'<line x1="-430" y1="150" x2="200" y2="150" stroke="#1d2a52" stroke-width="3"/></g>' +
  f'<path d="M1080,1500 C900,1400 640,1240 520,1160 C495,1145 470,1170 492,1192 C600,1300 820,1480 1080,1660Z" fill="{SKIN}"/>' +
  f'<path d="M1080,1560 L1080,1820 L900,1700Z" fill="url(#coat)"/>' +
  f'<ellipse cx="540" cy="900" rx="520" ry="300" fill="{AMBER}" opacity=".08" filter="url(#blur40)"/>')
P["p07"] = svg(
  f'<rect width="{W}" height="{H}" fill="url(#coldTop)"/><rect x="0" y="1500" width="{W}" height="420" fill="#26251f"/>' +
  f'<rect x="250" y="300" width="580" height="1200" fill="#0b0805"/>' +
  f'<polygon points="250,300 690,360 690,1450 250,1500" fill="#2e2a24" stroke="#0a0908" stroke-width="6"/>' +
  f'<rect x="690" y="300" width="140" height="1200" fill="#FFC877" opacity=".85"/><rect x="690" y="300" width="140" height="1200" fill="url(#lamp)" filter="url(#blur20)"/>' +
  f'<polygon points="690,1500 830,1500 1080,1920 760,1920" fill="#FFC877" opacity=".45" filter="url(#blur8)"/>' +
  f'<rect x="370" y="430" width="220" height="80" fill="#c9b88f"/><text x="480" y="492" font-family="Arial" font-weight="bold" font-size="62" text-anchor="middle" fill="#2a2016">1205</text>' +
  f'<g transform="translate(420,980) rotate(-70)"><rect x="-300" y="-30" width="600" height="60" fill="#efe9dc" opacity=".9"/></g>' +
  f'<g transform="translate(560,1150) rotate(12)"><rect x="-90" y="-30" width="180" height="60" fill="#efe9dc" opacity=".85"/><circle cx="20" cy="0" r="20" fill="none" stroke="{RED}" stroke-width="4"/></g>' +
  f'<ellipse cx="300" cy="1780" rx="160" ry="40" fill="#000" opacity=".6" filter="url(#blur8)"/>')
P["p08"] = svg(
  f'<rect width="{W}" height="{H}" fill="#0b0805"/>' +
  f'<polygon points="80,200 640,280 640,1700 80,1800" fill="#2e2a24" stroke="#0a0908" stroke-width="6"/>' +
  f'<rect x="640" y="200" width="440" height="1600" fill="#FFC877" opacity=".7"/><rect x="640" y="200" width="440" height="1600" fill="url(#lamp)" filter="url(#blur40)"/>' +
  f'<path d="M0,1180 C180,1150 330,1080 470,1000 L520,1100 C380,1200 200,1290 0,1330Z" fill="url(#coat)"/>' +
  f'<path d="M470,1000 C520,960 600,930 640,950 C660,990 640,1040 600,1060 L520,1100Z" fill="{SKIN}"/>' +
  "".join(f'<path d="M{560+i*18},{955+i*8} l40,-10" stroke="{SKIN_D}" stroke-width="5"/>' for i in range(4)))
P["p09"] = svg(
  f'<rect width="{W}" height="{H}" fill="url(#warm)"/>' +
  f'<rect x="300" y="620" width="420" height="320" rx="30" fill="#0c0f14" stroke="#2a2a2a" stroke-width="14"/><rect x="330" y="650" width="360" height="260" rx="20" fill="#5d8dd6"/>' +
  f'<ellipse cx="510" cy="780" rx="520" ry="420" fill="url(#tvglow)"/>' +
  f'<rect x="250" y="940" width="520" height="80" fill="#2a1b10"/>' +
  f'<path d="M120,1300 C120,1150 180,1100 260,1100 L760,1100 C840,1100 900,1150 900,1300 L900,1600 L120,1600Z" fill="#3a2418"/>' +
  f'<path d="M120,1250 L900,1250 L900,1600 L120,1600Z" fill="#2b190f"/>' +
  f'<ellipse cx="510" cy="1040" rx="85" ry="100" fill="#141010"/><circle cx="530" cy="955" r="40" fill="#5a5753"/><path d="M380,1250 C390,1140 440,1110 510,1110 C580,1110 630,1140 640,1250Z" fill="#160c0e"/>' +
  f'<rect x="900" y="980" width="180" height="40" fill="#5a2a12"/><rect x="940" y="860" width="80" height="110" fill="#c9b88f" stroke="#2a1608" stroke-width="8"/>' +
  f'<circle cx="930" cy="960" r="10" fill="#ffb347" filter="url(#glowR)"/><circle cx="1050" cy="960" r="10" fill="#ffb347" filter="url(#glowR)"/>' +
  f'<rect x="0" y="0" width="90" height="{H}" fill="#2e2a24"/>')
TVHEAD = lambda inner: (f'<rect width="{W}" height="{H}" fill="#06070a"/>'
  f'<rect x="60" y="420" width="960" height="1080" rx="70" fill="#111418" stroke="#2c2f33" stroke-width="20"/>'
  f'<rect x="110" y="470" width="860" height="980" rx="50" fill="#1b2c45"/>{inner}'
  + "".join(f'<rect x="110" y="{470+i*14}" width="860" height="5" fill="#000" opacity=".18"/>' for i in range(70)) +
  f'<rect x="110" y="470" width="860" height="980" rx="50" fill="#9ec3ff" opacity=".08"/><ellipse cx="540" cy="960" rx="700" ry="700" fill="url(#tvglow)" opacity=".5"/>')
P["p10"] = svg(TVHEAD(
  f'<rect x="110" y="470" width="860" height="980" rx="50" fill="#0c0e1a"/>' +
  "".join(f'<rect x="{360}" y="{560+i*58}" width="300" height="40" fill="#{"ffb347" if (i*7)%3 else "3a3a44"}" opacity=".9"/>' for i in range(12)) +
  f'<rect x="340" y="540" width="340" height="760" fill="none" stroke="#2a2a33" stroke-width="10"/>' +
  f'<path d="M330,1300 C320,1000 420,900 400,700 C470,820 520,760 510,600 C590,720 640,820 690,700 C730,900 720,1100 700,1300Z" fill="#ff5a1f" opacity=".85" filter="url(#blur8)"/>' +
  f'<path d="M380,1300 C380,1100 450,1000 440,850 C500,950 560,900 560,780 C620,900 660,1000 650,1300Z" fill="#ffd36a" opacity=".9" filter="url(#blur8)"/>' +
  f'<rect x="110" y="1270" width="860" height="110" fill="#b3121f"/><text x="140" y="1342" font-family="Arial" font-weight="bold" font-size="46" fill="#fff">CHÁY CHUNG CƯ AN PHÚ — 12 TẦNG</text>' +
  f'<rect x="110" y="1380" width="860" height="56" fill="#0b1a3a"/><text x="140" y="1420" font-family="Arial" font-size="32" fill="#e8eefc">00:12 · 1 nạn nhân không kịp thoát ra</text>' +
  f'<rect x="150" y="510" width="120" height="50" fill="#b3121f"/><text x="210" y="545" font-family="Arial" font-weight="bold" font-size="30" fill="#fff" text-anchor="middle">TIN</text>'))
P["p11"] = svg(TVHEAD(
  f'<rect x="110" y="470" width="860" height="980" rx="50" fill="#20242c"/>' +
  f'<rect x="300" y="560" width="480" height="640" fill="#c9c3b6"/><rect x="320" y="580" width="440" height="600" fill="#3a4250"/>' +
  f'<g>{linh_body(540,1060,.75)}{linh_head(540,880,.95,look="front",mouth="flat",light="#ffffff")}</g>' +
  f'<rect x="110" y="1270" width="860" height="110" fill="#b3121f"/><text x="140" y="1342" font-family="Arial" font-weight="bold" font-size="46" fill="#fff">NẠN NHÂN: L., 26 TUỔI</text>' +
  f'<rect x="110" y="1380" width="860" height="56" fill="#0b1a3a"/><text x="140" y="1420" font-family="Arial" font-size="32" fill="#e8eefc">Căn hộ 1205 · chung cư An Phú</text>'))
P["p12"] = svg(
  f'<rect width="{W}" height="{H}" fill="#04060a"/><ellipse cx="380" cy="900" rx="700" ry="900" fill="url(#tvglow)" opacity=".6"/>' +
  linh_body(560, 1250, 1.6) + linh_head(560, 860, 1.9, look="wide", mouth="o", light="#7fb4ff") +
  f'<path d="M380,1100 C430,1000 520,980 600,990 C680,1000 700,1060 660,1100 C600,1150 480,1160 380,1100Z" fill="{SKIN}"/>' +
  f'<path d="M150,1500 C220,1300 300,1180 380,1100 L460,1180 C380,1260 320,1400 280,1600Z" fill="url(#coat)"/>' +
  f'<rect width="{W}" height="{H}" fill="#2a5aa8" opacity=".12"/>')
P["p13"] = svg(
  f'<rect width="{W}" height="{H}" fill="url(#warm)"/><ellipse cx="760" cy="600" rx="420" ry="420" fill="url(#lamp)"/>' +
  f'<ellipse cx="260" cy="900" rx="420" ry="600" fill="url(#tvglow)" opacity=".45"/>' +
  f'<path d="M0,1400 C0,1250 80,1180 200,1180 L880,1180 C1000,1180 1080,1250 1080,1400 L1080,{H} L0,{H}Z" fill="#3a2418"/>' +
  mother(540, 820, 1.35) + incense(470, 1500, 1.2) +
  f'<rect width="{W}" height="{H}" fill="#ff9a3a" opacity=".05"/>')
P["p14"] = svg(
  f'<rect width="{W}" height="{H}" fill="#0b0604"/><ellipse cx="540" cy="760" rx="600" ry="620" fill="url(#lamp)" opacity=".75"/>' +
  f'<rect x="80" y="1280" width="920" height="640" fill="#4a1d0e"/><rect x="80" y="1280" width="920" height="40" fill="#6a2c14"/>' +
  f'<rect x="300" y="460" width="480" height="640" fill="#2a1608" stroke="#b8862f" stroke-width="22"/><rect x="330" y="490" width="420" height="580" fill="#3a4250"/>' +
  f'<g>{linh_body(540,920,.7)}{linh_head(540,760,.85,look="front",mouth="flat",light="#ffffff")}</g>' +
  f'<rect x="330" y="490" width="420" height="580" fill="#d8d0c0" opacity=".18"/>' +
  f'<path d="M460,470 L540,430 L620,470" stroke="#111" stroke-width="18" fill="none"/>' +
  f'<rect x="460" y="1180" width="160" height="110" rx="20" fill="#7a3a12"/>' + incense(510, 1190, .9) +
  f'<ellipse cx="300" cy="1290" rx="110" ry="30" fill="#e8e2d8"/><path d="M190,1290 C200,1350 400,1350 410,1290Z" fill="#cfc6b8"/><ellipse cx="300" cy="1270" rx="95" ry="30" fill="#fbf8f2"/>' +
  f'<line x1="330" y1="1290" x2="420" y2="1150" stroke="#9b6b3a" stroke-width="8"/><line x1="350" y1="1290" x2="440" y2="1160" stroke="#9b6b3a" stroke-width="8"/>' +
  "".join(f'<rect x="{cx-18}" y="1140" width="36" height="140" fill="#d23a2a"/><ellipse cx="{cx}" cy="1120" rx="14" ry="26" fill="#ffcf6a" filter="url(#glowR)"/>' for cx in (160, 920)) +
  f'<path d="M800,1280 C820,1240 880,1230 900,1280Z" fill="#e5a52a"/>')
def palm(cx, mirror):
    sx = -1 if mirror else 1
    fingers = ""
    for i,(dx,ln,ang) in enumerate(((-75,170,-14),(-28,215,-4),(20,225,4),(66,195,12))):
        fingers += (f'<g transform="translate({dx},-150) rotate({ang})">'
            f'<rect x="-21" y="{-ln}" width="42" height="{ln}" rx="21" fill="{SKIN}"/>'
            f'<rect x="-21" y="{-ln}" width="42" height="{ln*0.45:.0f}" rx="21" fill="#8f8a84" opacity=".85"/>'
            f'<rect x="-21" y="{-ln}" width="42" height="{ln*0.22:.0f}" rx="21" fill="#5e5a56" opacity=".9"/></g>')
    thumb = f'<g transform="translate(-120,-40) rotate(-50)"><rect x="-22" y="-150" width="44" height="150" rx="22" fill="{SKIN}"/><rect x="-22" y="-150" width="44" height="50" rx="22" fill="#8f8a84"/></g>'
    return (f'<g transform="translate({cx},1260) scale({sx},1)">'
            f'<path d="M-260,660 C-240,420 -190,300 -140,230 L130,230 C180,300 230,420 250,660Z" fill="url(#coat)"/>'
            f'<path d="M-150,240 C-170,120 -150,-40 -100,-150 L110,-150 C150,-40 160,120 130,240Z" fill="{SKIN}"/>'
            f'<path d="M-90,60 C-30,90 40,90 90,50" stroke="{SKIN_D}" stroke-width="5" fill="none"/>'
            f'{thumb}{fingers}</g>')
P["p15"] = svg(
  f'<rect width="{W}" height="{H}" fill="#120a06"/><ellipse cx="540" cy="900" rx="620" ry="700" fill="url(#lamp)" opacity=".55"/>' +
  palm(330, False) + palm(750, True) +
  "".join(f'<rect x="{R(i,1)*820+130:.0f}" y="{R(i,2)*900+120:.0f}" width="{6+(i%4)*4}" height="{6+(i%3)*4}" fill="#a8a29a" opacity="{.25+R(i,3)*.5:.2f}" transform="rotate({i*23} {R(i,1)*820+130:.0f} {R(i,2)*900+120:.0f})"/>' for i in range(120)))
P["p16"] = svg(corridor(vp=(540, 700), light=.35, seals=True) +
  f'<rect x="230" y="420" width="620" height="1300" fill="url(#steel)"/>' +
  f'<rect x="300" y="480" width="480" height="1180" fill="#3a4a5c"/><rect x="300" y="480" width="480" height="1180" fill="#9ec3ff" opacity=".18"/>' +
  f'<rect x="230" y="420" width="260" height="1300" fill="#5a6672" stroke="#0a0d10" stroke-width="6"/><rect x="590" y="420" width="260" height="1300" fill="#56626e" stroke="#0a0d10" stroke-width="6"/>' +
  f'<rect x="490" y="420" width="100" height="1300" fill="#9ec3ff" opacity=".25"/>' +
  f'<rect x="420" y="300" width="240" height="110" rx="10" fill="#080304"/>{seg7("1",470,316,.7,RED)}{seg7("3",545,316,.7,RED)}' +
  "".join(f'<rect x="{500+(i*37)%80}" y="{600+(i*173)%900}" width="7" height="7" fill="#b9b2a8" opacity=".55"/>' for i in range(25)))

for k, v in P.items():
    s = OUT / f"{k}.svg"; s.write_text(v, encoding="utf-8")
    subprocess.run(["rsvg-convert", "-w", str(W), "-h", str(H), str(s), "-o", str(OUT / f"{k}.png")], check=True)
print(len(P), "panels")
