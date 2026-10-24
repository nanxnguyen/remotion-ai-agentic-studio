#!/usr/bin/env python3
"""Bức Ảnh Duy Nhất Không Có Mẹ — 9:16 Memory Film + POV short.

Original Vietnamese Vbee Thanh Long speech and original piano are copied
byte-for-byte from Short03's completed audio mux. All photographic scenes
are constructed from licensed Pexels moving footage, not AI-generated faces.
POV is conveyed by real hands holding photographs and the film's perspective.
"""
import hashlib,json,math,random,subprocess
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageFilter,ImageEnhance
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
SOURCE_AUDIO=ROOT/"final"/"short03-me-trong-anh-podcast-full-vbee.mp4"
TEMP=Path("/tmp/short03-memory-pov")
TEMP.mkdir(parents=True,exist_ok=True)
FINAL=HERE/"final"/"short03-memory-film-pov-vbee.mp4"
W,H=540,960
FPS=30
DURATION=2425/60
XFADE=.42
C=(239,158,105)
WHITE=(245,242,235)
TIMES=[0,2.7,5.15,7.9,10.5,13.2,16.0,18.7,21.4,24.0,26.9,29.45,31.8,34.4,37.1,DURATION]
# The same cottonbro mother/daughter pair recur in album and camera scenes.
SOURCES={
  "album":("5493991","cottonbro studio","A Mother Looking at Photo Album with Her Daughter"),
  "snap":("5493995","cottonbro studio","A Woman Taking Photos of Her Mother"),
  "mother":("5494001","cottonbro studio","A Person Taking Photos of an Elderly Woman"),
  "pov":("9885561","Ron Lach","A Person Holding a Family Picture"),
  "birthday":("7119985","Pavel Danilyuk","A Family Eating a Birthday Cake"),
  "dinner":("6305117","Kampus Production","Mother and Daughter Taking Picture after Family Dinner"),
  "graduation":("7712993","Pavel Danilyuk / stock video","Graduation montage"),
  "end":("7174589","Anastasia Shuraeva","Mother and Daughter Leaning Against Each Other")
}
# 15 authored shots; still polaroids alternate with moving memories.
# Photo scene still uses a true frame extracted from that live-action source.
SHOTS=[
 {"src":"pov","start":1.1,"mode":"motion","label":"HƠN 100 BỨC ẢNH...","chapter":"MỞ CUỐN ALBUM"},
 {"src":"album","start":2.1,"mode":"motion","label":"NHƯNG KHÔNG CÓ MẸ","chapter":"LẬT TỪNG TRANG"},
 {"src":"birthday","start":9.0,"mode":"photo","label":"SINH NHẬT...","chapter":"NGÀY SINH NHẬT"},
 {"src":"birthday","start":12.0,"mode":"motion","label":"MẸ LUÔN CHỤP","chapter":"KÝ ỨC BẮT ĐẦU"},
 {"src":"graduation","start":.8,"mode":"photo","label":"NGÀY TỐT NGHIỆP","chapter":"BỨC ẢNH THỨ HAI"},
 {"src":"snap","start":4.1,"mode":"motion","label":"MẸ Ở SAU ỐNG KÍNH","chapter":"MỘT NGƯỜI LUÔN LÙI LẠI"},
 {"src":"dinner","start":.9,"mode":"photo","label":"CẢ NHÀ ĐÔNG ĐỦ","chapter":"NHỮNG BỮA CƠM"},
 {"src":"dinner","start":4.6,"mode":"motion","label":"MẸ BẢO: CƯỜI LÊN!","chapter":"CÙNG NHAU LỚN LÊN"},
 {"src":"pov","start":9.0,"mode":"motion","label":"AI CŨNG CÓ MẶT","chapter":"LẬT LẠI CUỐN ALBUM"},
 {"src":"album","start":9.3,"mode":"photo","label":"CHỈ THIẾU MẸ...","chapter":"MỘT KHOẢNG TRỐNG"},
 {"src":"graduation","start":3.4,"mode":"reveal","label":"TRONG Ô KÍNH...","chapter":"BỨC ẢNH CŨ"},
 {"src":"mother","start":10.8,"mode":"photo","label":"MẸ ĐÃ Ở ĐÓ...","chapter":"BÓNG DÁNG PHẢN CHIẾU"},
 {"src":"album","start":16.7,"mode":"motion","label":"LINH NGHẸN LẠI","chapter":"MẸ GIỮ TỪNG KÝ ỨC"},
 {"src":"snap","start":14.0,"mode":"motion","label":"MẸ ƠI...","chapter":"LẦN NÀY CHO CON"},
 {"src":"end","start":1.3,"mode":"motion","label":"LẦN NÀY MẸ ĐỨNG GIỮA ♡","chapter":"BỨC ẢNH ĐỦ ĐẦY"}
]
assert len(SHOTS)==len(TIMES)-1 and 30<DURATION<45

def shell(*args):
    subprocess.run(list(args),check=True)

def font(sz,bold=True):
    a="/usr/share/fonts/truetype/dejavu/DejaVuSans-"
    return ImageFont.truetype(a+("Bold" if bold else "")+".ttf",sz)

def probe(path):
    return json.loads(subprocess.check_output(
       ["ffprobe","-v","error","-show_entries","format=duration,size:stream=codec_type,width,height,avg_frame_rate",
        "-of","json",str(path)],text=True))

def sources():
    for key,(num,author,title) in SOURCES.items():
        out=TEMP/(key+".mp4")
        if out.exists() and out.stat().st_size>40000:continue
        shell("curl","-fsSL","--retry","4","--retry-all-errors",
              "--connect-timeout","35","--max-time","180",
              "-A","Mozilla/5.0","-o",str(out),
              "https://www.pexels.com/download/video/"+num+"/")
        if out.stat().st_size<40000:raise RuntimeError("Missing clip "+key)
        print("STOCK",key,out.stat().st_size,flush=True)

def grab(src,start,dest):
    shell("ffmpeg","-y","-hide_banner","-loglevel","error",
          "-ss",str(start),"-i",str(TEMP/(src+".mp4")),"-frames:v","1",str(dest))
    if not dest.exists():raise RuntimeError("Frame extraction failed: "+src)

def cover(im,w,h):
    ratio=max(w/im.width,h/im.height)
    sw,sh=round(im.width*ratio),round(im.height*ratio)
    img=im.resize((sw,sh),Image.Resampling.LANCZOS)
    x=(sw-w)//2;y=(sh-h)//2
    return img.crop((x,y,x+w,y+h))

def photo_canvas(idx,shot):
    # Real film photograph on the viewer's tabletop: 2.5D object and paper layers.
    image=TEMP/(f"thumb{idx:02d}.jpg")
    grab(shot["src"],shot["start"],image)
    frame=Image.open(image).convert("RGB")
    rng=np.random.default_rng(20261024+idx)
    y,x=np.mgrid[0:H,0:W]
    wood=np.zeros((H,W,3),dtype=np.uint8)
    light=(np.maximum(0,1-np.sqrt(((x-280)/750)**2+((y-435)/900)**2))*.13)
    grain=rng.normal(0,1.7,(H,W))
    wood[:,:,0]=np.clip(24+light*75+grain,0,255)
    wood[:,:,1]=np.clip(23+light*51+grain,0,255)
    wood[:,:,2]=np.clip(26+light*35+grain,0,255)
    canvas=Image.fromarray(wood,"RGB").convert("RGBA")
    d=ImageDraw.Draw(canvas,"RGBA")
    # Slight tabletop grain, faint paper strips and adjacent old memory.
    for yy in range(50,H,100):
        d.line((0,yy,W,yy-18),fill=(235,170,100,9),width=2)
    for j,rot in [(0,-6),(1,6)]:
        dummy=Image.new("RGBA",(414,598),(233,220,193,255))
        dd=ImageDraw.Draw(dummy)
        dd.rectangle((25,25,390,490),fill=(35,34,37))
        dd.line((33,550,310,550),fill=(178,162,134),width=2)
        img=dummy.rotate(rot,expand=True,resample=Image.Resampling.BICUBIC)
        canvas.alpha_composite(img,(int(55+j*18),int(188+j*8)))
    card=Image.new("RGBA",(421,580),(246,237,213,255))
    cd=ImageDraw.Draw(card)
    cd.rectangle((18,18,403,475),fill=(25,25,28,255))
    cropped=cover(frame,385,457)
    cropped=ImageEnhance.Color(cropped).enhance(.74)
    cropped=ImageEnhance.Contrast(cropped).enhance(1.05)
    card.alpha_composite(cropped.convert("RGBA"),(18,18))
    cd.text((32,508),shot["chapter"],font=font(17),fill=(66,54,44,255))
    cd.text((34,542),"NHỮNG NGÀY KHÔNG THỂ QUÊN",font=font(10),fill=(145,113,82,255))
    # Rotating one unchanging visual prop preserves the motif throughout the movie.
    card=card.rotate([-3,-1,2,-2,1,2,0,3,1,-2,1,2,0,-1,3][idx],
      resample=Image.Resampling.BICUBIC,expand=True)
    shadow=Image.new("RGBA",card.size,(0,0,0,0))
    shadow.putalpha(card.getchannel("A").filter(ImageFilter.GaussianBlur(17)).point(lambda v:int(v*.34)))
    xx=(W-card.width)//2;yy=168
    canvas.alpha_composite(shadow,(xx+14,yy+16))
    canvas.alpha_composite(card,(xx,yy))
    d=ImageDraw.Draw(canvas,"RGBA")
    d.text((40,55),"MỘT BỨC ẢNH   /   MỘT NGƯỜI MẸ",font=font(12),fill=(234,202,166,210))
    d.line((40,90,500,90),fill=(224,188,149,70),width=2)
    return canvas.convert("RGB")

def typography(idx,shot):
    layer=Image.new("RGBA",(W,H),(0,0,0,0))
    d=ImageDraw.Draw(layer,"RGBA")
    # Mobile-safe 1-2 line typography; translucent near-black lower panel.
    d.rounded_rectangle((22,764,518,907),radius=17,fill=(7,8,12,206),
                        outline=(236,158,105,110),width=2)
    d.text((41,783),"KÝ ỨC   •   "+shot["chapter"],font=font(12),fill=(204,197,183,240))
    title=shot["label"]
    ff=font(27 if len(title)<25 else 23)
    lines=[];s=""
    for word in title.split():
        maybe=(s+" "+word).strip()
        if d.textbbox((0,0),maybe,font=ff)[2]>448 and s:
            lines.append(s);s=word
        else:s=maybe
    lines.append(s)
    for line_i,t in enumerate(lines[:2]):
        width=d.textbbox((0,0),t,font=ff)[2]
        d.text(((W-width)//2,825+line_i*31),t,font=ff,fill=(239,158,105,255)
               if idx in [0,1,9,10,11,14] else (245,242,235,255))
    d.line((40,916,500,916),fill=(80,80,80,220),width=3)
    d.line((40,916,40+round((idx+1)/len(SHOTS)*460),916),fill=(239,158,105,245),width=3)
    layer.save(TEMP/(f"overlay{idx:02d}.png"))

def scene(idx,shot):
    dur=TIMES[idx+1]-TIMES[idx]+(XFADE if idx<len(SHOTS)-1 else 0)
    typography(idx,shot)
    overlay=TEMP/f"overlay{idx:02d}.png"
    part=TEMP/f"scene{idx:02d}.mp4"
    if shot["mode"] in ("photo","reveal"):
        visual=TEMP/f"photocard{idx:02d}.jpg"
        photo_canvas(idx,shot).save(visual,quality=93)
        # A tiny traveling camera over the real photographic print.
        nframes=math.ceil(dur*FPS)
        vf=f"zoompan=z='min(zoom+0.00021,1.065)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d={nframes}:s=540x960:fps=30,format=yuv420p"
        base=["ffmpeg","-y","-hide_banner","-loglevel","error",
              "-loop","1","-framerate","30","-i",str(visual),"-loop","1","-framerate","30","-i",str(overlay),
              "-filter_complex",f"[0:v]{vf}[bg];[bg][1:v]overlay=0:0:shortest=1[v]"]
    else:
        original=TEMP/(shot["src"]+".mp4")
        # Progressive photo-to-memory shots show real source motion. Preserve the full
        # image rather than crop actors; soft focus background fills wider sources.
        vf=("fps=30,split=2[bg][fg];"
           "[bg]scale=540:960:force_original_aspect_ratio=increase,"
           "crop=540:960,boxblur=16:3,eq=saturation=0.68:brightness=-0.065[soft];"
           "[fg]scale=540:960:force_original_aspect_ratio=decrease,"
           "eq=saturation=0.78:contrast=1.05:brightness=-0.025[main];"
           "[soft][main]overlay=(W-w)/2:(H-h)/2,setsar=1[photo];"
           "[photo][1:v]overlay=0:0:shortest=1[v]")
        base=["ffmpeg","-y","-hide_banner","-loglevel","error",
              "-stream_loop","-1","-ss",str(shot["start"]),"-i",str(original),
              "-loop","1","-framerate","30","-i",str(overlay),
              "-filter_complex",vf]
    cmd=base+["-map","[v]","-an","-t",f"{dur:.6f}","-r","30",
              "-c:v","libx264","-preset","veryfast","-crf","23",
              "-pix_fmt","yuv420p",str(part)]
    shell(*cmd)
    print("SHOT",idx,shot["mode"],shot["src"],round(dur,2),flush=True)
    return part,dur

def do_render():
    if not SOURCE_AUDIO.exists():raise RuntimeError("Missing preserved Vbee source media")
    sources()
    films=[scene(i,s) for i,s in enumerate(SHOTS)]
    inputs=["ffmpeg","-hide_banner","-loglevel","error","-y"]
    for p,_ in films:inputs+=["-i",str(p)]
    filters=[];last="[0:v]";pos=films[0][1]-XFADE
    for i in range(1,len(films)):
        nxt=f"[x{i}]"
        filters.append(f"{last}[{i}:v]xfade=transition=fade:duration={XFADE}:offset={pos:.6f}{nxt}")
        last=nxt
        if i<len(films)-1:pos+=films[i][1]-XFADE
    silent=TEMP/"picture.mp4"
    shell(*(inputs+["-filter_complex",";".join(filters),"-map",last,
         "-t",f"{DURATION:.6f}","-r","30","-an","-c:v","libx264",
         "-preset","veryfast","-crf","19","-pix_fmt","yuv420p",
         "-movflags","+faststart",str(silent)]))
    FINAL.parent.mkdir(parents=True,exist_ok=True)
    shell("ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(silent),
         "-i",str(SOURCE_AUDIO),"-map","0:v:0","-map","1:a:0",
         "-c:v","copy","-c:a","copy","-t",f"{DURATION:.6f}",
         "-movflags","+faststart",str(FINAL))
    info=probe(FINAL)
    v=next(s for s in info["streams"] if s["codec_type"]=="video")
    assert v["width"]==W and v["height"]==H and v["avg_frame_rate"]=="30/1"
    assert {s["codec_type"] for s in info["streams"]}=={"video","audio"}
    assert abs(float(info["format"]["duration"])-DURATION)<.15
    def audio_md5(p):
        return subprocess.check_output(["ffmpeg","-hide_banner","-loglevel","error","-i",str(p),
          "-map","0:a:0","-c:a","copy","-f","md5","-"],text=True).strip()
    assert audio_md5(FINAL)==audio_md5(SOURCE_AUDIO)
    # Examine exact frame samples, including every storytelling transition.
    contact=Image.new("RGB",(180*5,320*3),(8,9,11))
    for i in range(15):
        sec=(TIMES[i]+TIMES[i+1])/2
        p=TEMP/f"sample{i:02d}.png"
        shell("ffmpeg","-y","-hide_banner","-loglevel","error","-ss",str(sec),
              "-i",str(FINAL),"-frames:v","1",str(p))
        still=Image.open(p).convert("RGB").resize((180,320),Image.Resampling.LANCZOS)
        contact.paste(still,((i%5)*180,(i//5)*320))
    contact.save(HERE/"contact-sheet.jpg",quality=90)
    sha=hashlib.sha256(FINAL.read_bytes()).hexdigest()
    evidence={
      "status":"technical-pass","format":"Memory Film + POV (stock live-action photographs and memories)",
      "file":FINAL.name,"duration":float(info["format"]["duration"]),
      "resolution":[W,H],"fps":30,"shots":len(SHOTS),"softCrossfadeSeconds":XFADE,
      "voice":"Original Vbee Thanh Long / original piano reused unchanged",
      "audioPacketMD5Preserved":True,"hasVideoAndAudio":True,
      "sha256":sha,"bytes":FINAL.stat().st_size,
      "sourceCredits":[{"id":v[0],"credit":v[1],"title":v[2],
        "url":"https://www.pexels.com/video/"+v[0]+"/"} for v in SOURCES.values()],
      "actorConsistency":"representational stock footage, NOT the same cast in every life event",
      "reflectionReveal":"symbolic crafted-photo reveal; not a literal naturally captured glass reflection",
      "subjectiveViewing":"pending","youtubePublished":False,
      "limitations":"Not a photoreal film production with continuous actors; photo-memory demo with real people stock."
    }
    (HERE/"final-QA.json").write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("DONE",json.dumps({"duration":evidence["duration"],"bytes":evidence["bytes"],"sha256":sha}),flush=True)

if __name__=="__main__":do_render()
