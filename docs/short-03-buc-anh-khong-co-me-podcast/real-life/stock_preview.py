#!/usr/bin/env python3
"""Stock-actor visual podcast sample, using licensed Pexels live-action clips.

Audio is copied without re-synthesis from the fully completed original Vbee
Thanh Long Short03 mix. Presenter is real stock footage, NOT HeyGen AI.
"""
import hashlib
import json
import subprocess
import textwrap
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont

ROOT=Path(__file__).resolve().parent
PARENT=ROOT.parent
OUT=ROOT/"final"/"short03-real-life-podcast-preview-full-vbee.mp4"
WORK=Path("/tmp/short03-real-life")
VOICE=PARENT/"final"/"short03-me-trong-anh-podcast-full-vbee.mp4"
WORK.mkdir(parents=True,exist_ok=True)
DURATION=2425/60
FADE=.30
SOURCE={
"host":("6878202","6878202-uhd_2160_4096_25fps.mp4","Man Doing Podcast"),
"album":("5493991","5493991-uhd_2160_4096_25fps.mp4","A Mother Looking at Photo Album with Daughter"),
"memory":("5493999","5493999-uhd_2160_4096_25fps.mp4","Mother and daughter family moment"),
"portrait":("5494001","5494001-uhd_4096_2160_25fps.mp4","A person taking photos of elderly woman"),
"family":("5494003","5494003-uhd_4096_2160_25fps.mp4","Family moment"),
"graduate":("7712993","7712993-hd_1920_1080_30fps.mp4","Graduation scene"),
}
# Timeline is authored against the measured original eight Vbee narration beats.
BOUND=[0,2.8,5.15,7.9,10.5,13.2,16,18.8,21.4,24.15,27.1,29.65,31.8,34.3,36.7,DURATION]
SCENES=[
("host",0.0,"HƠN 100 BỨC ẢNH..."),
("album",1.0,"NHƯNG KHÔNG CÓ MẸ"),
("memory",2.0,"SINH NHẬT, MẸ CHỤP"),
("portrait",2.2,"MẸ LUÔN LÀ NGƯỜI CHỤP"),
("graduate",1.3,"NGÀY TỐT NGHIỆP"),
("portrait",5.0,"MẸ CŨNG ĐỨNG SAU MÁY"),
("family",0.0,"BỮA CƠM ĐÔNG ĐỦ"),
("host",4.2,"MẸ BẢO CẢ NHÀ CƯỜI"),
("album",5.5,"AI CŨNG CÓ MẶT"),
("memory",9.0,"CHỈ MẸ VẮNG BÓNG"),
("portrait",3.0,"MẸ ĐÃ Ở ĐÓ..."),
("graduate",4.8,"TRONG Ô KÍNH PHẢN CHIẾU"),
("album",12.0,"LINH NGHẸN LẠI"),
("portrait",13.4,"MẸ ƠI..."),
("family",6.4,"LẦN NÀY MẸ ĐỨNG GIỮA")
]
assert len(BOUND)==len(SCENES)+1

def run(args):subprocess.run(args,check=True)
def txtfont(size=27):
 return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",size)

def make_overlay(title,i,p):
    im=Image.new("RGBA",(540,960),(0,0,0,0))
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((22,708,518,860),radius=24,fill=(7,9,14,212),
       outline=(239,158,105,115),width=2)
    d.text((40,724),"MỘT BỨC ẢNH  •  MỘT NGƯỜI MẸ",
        font=txtfont(12),fill=(185,187,192,255))
    chars=title.upper()
    f=txtfont(28 if len(chars)<25 else 23)
    bbox=d.textbbox((0,0),chars,font=f);width=bbox[2]-bbox[0]
    if width>450:
        fragments=chars.split();s="";parts=[]
        for word in fragments:
            tryword=(s+" "+word).strip()
            if d.textbbox((0,0),tryword,font=f)[2]>440 and s:
                parts.append(s);s=word
            else:s=tryword
        if s:parts.append(s)
    else:parts=[chars]
    for lineidx,s in enumerate(parts[:2]):
        d.text(((540-d.textbbox((0,0),s,font=f)[2])/2,766+lineidx*31),
          s,font=f,fill=(239,158,105,255) if i in (0,1,10,14) else (245,245,244,255))
    d.rounded_rectangle((28,885,512,889),radius=2,fill=(70,73,84,255))
    d.rounded_rectangle((28,885,28+round((i+1)*484/len(SCENES)),889),
                        radius=2,fill=(239,158,105,255))
    d.text((34,904),f"PODCAST • CHỮA LÀNH                                 {i+1:02d}/{len(SCENES):02d}",
         font=txtfont(11),fill=(190,192,198,255))
    im.save(p)

def fetch():
    for key,(vid,name,title) in SOURCE.items():
        p=WORK/(key+".mp4")
        if p.exists() and p.stat().st_size>100000:continue
        url="https://videos.pexels.com/video-files/"+vid+"/"+name
        print("DOWNLOAD",key, url,flush=True)
        run(["curl","-fL","--retry","4","--retry-all-errors","--connect-timeout","25",
             "--max-time","180","-A","Mozilla/5.0","-o",str(p),url])
        if p.stat().st_size<100000:raise RuntimeError("empty source "+key)

def render():
    fetch()
    clips=[]
    for i,(kind,offset,title) in enumerate(SCENES):
        begin=BOUND[i];end=BOUND[i+1]
        length=end-begin+(FADE if i<len(SCENES)-1 else 0)
        shot=WORK/f"shot{i:02d}.mp4"
        overlay=WORK/f"text{i:02d}.png"
        make_overlay(title,i,overlay)
        src=WORK/f"{kind}.mp4"
        # Fit portrait and landscape sources without over-cropping human subjects.
        fit="[0:v]fps=30,scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2:color=0x12151d,setsar=1[bg];[bg][1:v]overlay=0:0:shortest=1,format=yuv420p[v]"
        cmd=["ffmpeg","-hide_banner","-loglevel","error","-y","-stream_loop","-1",
             "-ss",str(offset),"-i",str(src),"-loop","1","-i",str(overlay),
             "-filter_complex",fit,"-map","[v]", "-an","-t",f"{length:.6f}",
             "-r","30","-c:v","libx264","-preset","veryfast","-crf","24","-pix_fmt","yuv420p",
             str(shot)]
        run(cmd)
        clips.append((shot,length))
        print("SHOT",i,kind,"seconds",round(length,2),flush=True)
    # Cross-dissolves performed on motion footage, no photographic Ken Burns slideshow.
    args=["ffmpeg","-hide_banner","-loglevel","error","-y"]
    for path,_ in clips:args+=["-i",str(path)]
    filters=[]
    pos=clips[0][1]-FADE
    last="[0:v]"
    for j in range(1,len(clips)):
        name=f"[x{j}]"
        filters.append(f"{last}[{j}:v]xfade=transition=fade:duration={FADE}:offset={pos:.6f}{name}")
        last=name
        if j<len(clips)-1:pos+=clips[j][1]-FADE
    silent=WORK/"visual.mp4"
    run(args+["-filter_complex",";".join(filters),"-map",last,"-r","30",
             "-t",f"{DURATION:.6f}","-an","-c:v","libx264",
             "-preset","veryfast","-crf","21","-pix_fmt","yuv420p",
             "-movflags","+faststart",str(silent)])
    if not VOICE.exists():raise RuntimeError("Source Vbee full AV is missing")
    OUT.parent.mkdir(parents=True,exist_ok=True)
    run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(silent),"-i",str(VOICE),
         "-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","copy","-t",f"{DURATION:.6f}",
         "-movflags","+faststart",str(OUT)])
    probe=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries",
         "format=duration,size:stream=codec_type,width,height,avg_frame_rate",
         "-of","json",str(OUT)],text=True))
    assert {s["codec_type"] for s in probe["streams"]}=={"audio","video"}
    assert 30<=float(probe["format"]["duration"])<=45
    def aud_md5(p):
        return subprocess.check_output(["ffmpeg","-hide_banner","-loglevel","error","-i",str(p),
           "-map","0:a:0","-c:a","copy","-f","md5","-"],text=True).strip()
    assert aud_md5(OUT)==aud_md5(VOICE)
    sha=hashlib.sha256(OUT.read_bytes()).hexdigest()
    qa={"status":"technical-pass","file":OUT.name,"duration":float(probe["format"]["duration"]),
        "fps":30,"width":540,"height":960,"scenes":15,
        "hasNarrationAndMusic":True,"sourceVbeeAudioByteIdentical":True,
        "actorConsistency":"stock actors; NOT guaranteed same family across multiple clips",
        "AIHostStatus":"Separate HeyGen AI studio-host generation; not inserted in this stock preview",
        "clipSources":{k:{"pexelsId":v[0],"page":"https://www.pexels.com/video/"+v[0]+"/"} for k,v in SOURCE.items()},
        "sha256":sha,"size":OUT.stat().st_size,"publishedYouTube":False,
        "subjectiveReview":"pending"}
    (ROOT/"final-QA.json").write_text(json.dumps(qa,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    # Contact sheet of exact rendered MP4 across the 15 clips for manual inspection.
    stills=[]
    for j in range(15):
        st=WORK/f"frame{j:02d}.png"
        mid=(BOUND[j]+BOUND[j+1])*.5
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-ss",f"{mid:.4f}",
             "-i",str(OUT),"-frames:v","1",str(st)])
        stills.append(Image.open(st).convert("RGB").resize((162,288)))
    sheet=Image.new("RGB",(810,864),(10,12,16))
    for j,im in enumerate(stills):sheet.paste(im,((j%5)*162,(j//5)*288))
    sheet.save(ROOT/"contact-sheet.jpg",quality=88)
    print("SUCCESS",sha,OUT.stat().st_size,flush=True)

if __name__=="__main__":render()
