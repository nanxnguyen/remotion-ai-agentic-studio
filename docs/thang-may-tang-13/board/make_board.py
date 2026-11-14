"""Captioned 4x4 REVIEW board (timecodes + Vietnamese captions live here only, never in the film)."""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ART, SHOT, OUT = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
COL = {"white": (247,241,232), "amber": (245,196,103), "red": (237,62,76)}
FB = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"; FR = "/System/Library/Fonts/Supplemental/Arial.ttf"
f_cap, f_tc, f_hd, f_sub, f_id = (ImageFont.truetype(FB,26), ImageFont.truetype(FB,22), ImageFont.truetype(FB,60), ImageFont.truetype(FR,28), ImageFont.truetype(FB,20))
scenes = json.load(open(SHOT, encoding="utf-8"))
panels = []
for sc in scenes:
    caps = sc["caption_beats"]; pn = sc["panels"]
    for k, p in enumerate(pn):
        if len(pn) == 1: lines = [(c["text"], c["color"]) for c in caps]; t0 = sc["start_sec"]; t1 = t0 + sc["duration_sec"]
        else:
            c = caps[min(k, len(caps)-1)]; lines = [(c["text"], c["color"])]
            t0 = sc["start_sec"] + (0 if k == 0 else c["start"]); t1 = sc["start_sec"] + (caps[0]["end"] if k == 0 else sc["duration_sec"])
        panels.append((p["id"], sc["phase"], t0, t1, lines))
assert len(panels) == 16, len(panels)
PW, PH, G, TOP = 405, 720, 18, 150
B = Image.new("RGB", (4*PW + 5*G, TOP + 4*PH + 5*G + 40), (10,10,12))
d = ImageDraw.Draw(B)
d.text((G, 28), "THANG MÁY DỪNG Ở TẦNG 13", font=f_hd, fill=COL["red"])
d.text((G, 100), "Storyboard duyệt · 16 khung · 0–60s · HOOK / BODY / CLIMAX / ENDING · art 2D gốc (không phải ảnh thật)", font=f_sub, fill=(200,196,190))
def mmss(t): return f"{int(t)//60:02d}:{int(t)%60:02d}"
for i, (pid, ph, t0, t1, lines) in enumerate(panels):
    x = G + (i % 4) * (PW + G); y = TOP + G + (i // 4) * (PH + G)
    im = Image.open(ART / f"{pid.lower()}.png").convert("RGB").resize((PW, PH), Image.LANCZOS)
    grad = Image.new("L", (PW, PH), 0); gd = ImageDraw.Draw(grad)
    for yy in range(PH//2, PH): gd.line([(0, yy), (PW, yy)], fill=int(215 * ((yy - PH/2) / (PH/2)) ** 1.3))
    im = Image.composite(Image.new("RGB", (PW, PH), (0,0,0)), im, grad)
    pd = ImageDraw.Draw(im)
    tc = f"{mmss(t0)}–{mmss(t1)}"; pd.rounded_rectangle([10, 10, 22 + pd.textlength(tc, font=f_tc), 44], 6, fill=(0,0,0))
    pd.text((16, 14), tc, font=f_tc, fill=COL["white"])
    tag = f"{i+1:02d} · {ph}"; tw = pd.textlength(tag, font=f_id)
    pd.rounded_rectangle([PW-22-tw, 10, PW-10, 40], 6, fill=(0,0,0)); pd.text((PW-16-tw, 14), tag, font=f_id, fill=(190,186,180))
    # wrap captions to max 2 lines each
    out = []
    for text, col in lines:
        words, cur = text.split(), ""
        for w in words:
            if pd.textlength((cur + " " + w).strip(), font=f_cap) > PW - 40: out.append((cur, col)); cur = w
            else: cur = (cur + " " + w).strip()
        out.append((cur, col))
    yy = PH - 24 - 34 * len(out)
    for text, col in out:
        w = pd.textlength(text, font=f_cap); xx = (PW - w) / 2
        for dx, dy in ((-2,0),(2,0),(0,-2),(0,2),(2,2)): pd.text((xx+dx, yy+dy), text, font=f_cap, fill=(0,0,0))
        pd.text((xx, yy), text, font=f_cap, fill=COL[col]); yy += 34
    B.paste(im, (x, y))
B.save(OUT); print(OUT, B.size)
