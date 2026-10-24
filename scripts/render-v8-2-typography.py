"""Render 27 transparent cinematic captions with real Be Vietnam Pro. No font redistributed."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont, ImageFilter

src=Path('docs/retro-tv-v8-2/caption-beats.json')
out=Path('public/generated/retro-tv-v8-2/captions')
out.mkdir(parents=True,exist_ok=True)
fontpath='/tmp/retro-v8-2-bevietnam.ttf'
beats=json.loads(src.read_text(encoding='utf-8'))
for beat in beats:
    text=beat['text']
    hi=beat['highlight']
    test=Image.new('RGBA',(640,640))
    d=ImageDraw.Draw(test)
    f=None
    for size in range(62,35,-1):
        cand=ImageFont.truetype(fontpath,size)
        if d.textlength(text,font=cand)<=548:
            f=cand
            break
    if f is None:
        f=ImageFont.truetype(fontpath,36)
    width=d.textlength(text,font=f)
    left=(640-width)/2
    y=307-f.size/2
    base=Image.new('RGBA',(640,640),(0,0,0,0))
    shadow=Image.new('RGBA',(640,640),(0,0,0,0))
    sd=ImageDraw.Draw(shadow)
    sd.text((left+1.5,y+4),text,font=f,fill=(0,0,0,218),stroke_width=6,stroke_fill=(0,0,0,170))
    base.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(5)))
    ImageDraw.Draw(base).text((left,y),text,font=f,fill=(249,248,243,255),stroke_width=1,stroke_fill=(25,30,19,125))
    gold=Image.new('RGBA',(640,640),(0,0,0,0))
    if hi:
        pos=text.casefold().find(hi.casefold())
        if pos < 0:
            raise ValueError('Missing focus: '+hi+' in '+text)
        xx=left+d.textlength(text[:pos],font=f)
        w=d.textlength(hi,font=f)
        gd=ImageDraw.Draw(gold)
        gd.text((xx,y),hi,font=f,fill=(255,210,122,255),stroke_width=1,stroke_fill=(25,30,19,110))
        uy=y+f.size+8
        gd.rounded_rectangle((xx+3,uy,xx+w-3,uy+2.7),radius=1,fill=(255,210,122,227))
    base.save(out/f"base_{beat['id']:02}.png",optimize=True)
    gold.save(out/f"gold_{beat['id']:02}.png",optimize=True)
(out/'beats.json').write_text(json.dumps(beats,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Rendered',len(beats),'caption pairs with Be Vietnam Pro ExtraBold')
