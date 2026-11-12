#!/usr/bin/env python3
"""Render the Retro TV V2 cloud/sky revision from measured Vbee audio and licensed footage.

Required inputs:
  --base-frame: clean 1080x1920 V1 Retro TV frame with no subtitle visible
  --voice-dir: s1.mp3 ... s5.mp3 (original Vbee Ngoc Huyen segments)
  --assets-dir: five Pexels MP4s + BeVietnamPro-ExtraBold.ttf
Requires FFmpeg/FFprobe, Pillow and NumPy.
"""
from __future__ import annotations
import argparse, json, math, re, subprocess, wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

FPS=30
W,H=1080,1920
GAP=.20
OUTRO=.66
XFADE=.42
SPEECH=[
 {"id":1,"trim":2.49,"narration":"Không ai vỗ tay cho những ngày bạn cố gắng trong im lặng."},
 {"id":2,"trim":5.40,"narration":"Có những buổi tối, bạn vẫn cười như không có gì, nhưng trong lòng đã mệt đến mức chỉ muốn biến mất khỏi mọi ồn ào."},
 {"id":3,"trim":7.99,"narration":"Bạn tự học cách nuốt nước mắt, tự bước qua thất vọng, tự đứng dậy sau những lần chẳng ai đỡ mình. Và rồi, bạn lớn lên lúc nào… chính bạn cũng không để ý."},
 {"id":4,"trim":5.23,"narration":"Nên nếu hôm nay bạn thấy mình chưa đủ giỏi, hãy nhớ rằng: bạn đã trưởng thành rất nhiều trong những ngày không ai thấy."},
 {"id":5,"trim":3.10,"narration":"Nếu câu chuyện này chạm đến bạn, hãy thả tim và đăng ký kênh nhé."},
]
CAPTIONS=[
 (0,0.00,1.12,"Không ai vỗ tay","vỗ tay"),(0,1.12,2.43,"cho những ngày bạn cố gắng trong im lặng.","im lặng"),
 (1,0.00,0.80,"Có những buổi tối,","buổi tối"),(1,1.09,2.34,"bạn vẫn cười như không có gì,","vẫn cười"),
 (1,2.63,3.82,"nhưng trong lòng đã mệt","đã mệt"),(1,3.82,5.29,"đến mức chỉ muốn biến mất khỏi mọi ồn ào.","mọi ồn ào"),
 (2,0.00,1.24,"Bạn tự học cách nuốt nước mắt,","nước mắt"),(2,1.53,2.34,"tự bước qua thất vọng,","thất vọng"),
 (2,2.63,4.45,"tự đứng dậy sau những lần chẳng ai đỡ mình.","tự đứng dậy"),(2,4.93,5.33,"Và rồi,","Và rồi"),
 (2,5.62,6.51,"bạn lớn lên lúc nào…","lớn lên"),(2,6.78,7.89,"chính bạn cũng không để ý.","không để ý"),
 (3,0.00,1.96,"Nên nếu hôm nay bạn thấy mình chưa đủ giỏi,","chưa đủ giỏi"),(3,2.22,2.78,"hãy nhớ rằng:","hãy nhớ"),
 (3,3.02,4.12,"bạn đã trưởng thành rất nhiều","trưởng thành"),(3,4.12,5.12,"trong những ngày không ai thấy.","không ai thấy"),
 (4,0.00,1.28,"Nếu câu chuyện này chạm đến bạn,","chạm đến bạn"),(4,1.53,3.01,"hãy thả tim và đăng ký kênh nhé.","thả tim"),
]
CLIPS={
 "aerial_clouds_sunrise":{"creator":"Arturo Salas","page":"https://www.pexels.com/video/aerial-view-of-clouds-over-mountain-range-at-sunrise-37517582/"},
 "clouds_sunrise_mountains":{"creator":"Jatin Verma","page":"https://www.pexels.com/video/clouds-and-sunlight-over-mountains-13928593/"},
 "sea_of_clouds_golden_hour":{"creator":"Mikhail Nilov","page":"https://www.pexels.com/video/sea-of-clouds-and-mountains-during-golden-hour-6989027/"},
 "sunlight_over_clouds":{"creator":"Altaf Shah","page":"https://www.pexels.com/video/sunlight-over-clouds-12278192/"},
 "clouds_mountain_sunset":{"creator":"Erhan Dayı","page":"https://www.pexels.com/video/time-lapse-of-moving-clouds-over-the-mountains-at-sunset-11998311/"},
}
SHOTS=[
 ("aerial_clouds_sunrise",.8,3.09,"cool"),
 ("clouds_sunrise_mountains",1.0,2.41,"cool"),
 ("sea_of_clouds_golden_hour",1.0,3.99,"mist"),
 ("sunlight_over_clouds",2.0,2.96,"warm"),
 ("clouds_mountain_sunset",1.0,3.10,"neutral"),
 ("aerial_clouds_sunrise",8.0,3.35,"neutral"),
 ("clouds_sunrise_mountains",12.0,3.20,"bright"),
 ("sea_of_clouds_golden_hour",7.0,3.05,"gold"),
 ("sunlight_over_clouds",8.0,3.88,"gold"),
]
GRADES={
 "cool":"eq=brightness=-0.035:saturation=0.88:contrast=1.10,colorbalance=rs=-0.01:bs=0.02",
 "mist":"eq=brightness=-0.015:saturation=0.92:contrast=1.06,colorbalance=bs=0.015",
 "neutral":"eq=brightness=0.0:saturation=0.98:contrast=1.05",
 "warm":"eq=brightness=0.015:saturation=1.02:contrast=1.04,colorbalance=rs=0.02:gs=0.01",
 "bright":"eq=brightness=0.035:saturation=1.05:contrast=1.03,colorbalance=rs=0.02:bs=-0.01",
 "gold":"eq=brightness=0.035:saturation=1.08:contrast=1.04,colorbalance=rs=0.035:gs=0.012:bs=-0.02",
}
def run(args):
 subprocess.run([str(x) for x in args],check=True)
def ass_time(s):
 cs=round(max(0,s)*100); h=cs//360000; cs%=360000; m=cs//6000; cs%=6000
 return f"{h}:{m:02}:{cs//100:02}.{cs%100:02}"
def main():
 ap=argparse.ArgumentParser()
 ap.add_argument("--base-frame",required=True)
 ap.add_argument("--voice-dir",required=True)
 ap.add_argument("--assets-dir",required=True)
 ap.add_argument("--out",default="Ban_Da_Lon_Len_V2_MAY_TROI_REVIEW_9x16.mp4")
 ap.add_argument("--work",default="build-v2")
 a=ap.parse_args()
 base=Path(a.base_frame); voice=Path(a.voice_dir); assets=Path(a.assets_dir); work=Path(a.work)
 work.mkdir(parents=True,exist_ok=True)
 font=assets/"BeVietnamPro-ExtraBold.ttf"
 assert base.exists() and font.exists()
 starts=[]; tm=0; voice_parts=[]
 for i,s in enumerate(SPEECH):
  starts.append(round(tm,3)); src=voice/f"s{s['id']}.mp3"; wav=work/f"voice-{i}.wav"
  run(["ffmpeg","-y","-v","error","-i",src,"-t",s["trim"],"-ar","48000","-ac","2","-c:a","pcm_s16le",wav])
  voice_parts.append(wav); tm+=s["trim"]
  if i<4:
   gap=work/f"gap-{i}.wav"
   run(["ffmpeg","-y","-v","error","-f","lavfi","-i","anullsrc=r=48000:cl=stereo","-t",GAP,"-c:a","pcm_s16le",gap])
   voice_parts.append(gap); tm+=GAP
 total=tm+OUTRO
 concat=work/"voice-list.txt"; concat.write_text("".join(f"file '{p.resolve()}'\n" for p in voice_parts))
 voice_wav=work/"voice.wav"; run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",concat,"-ar","48000","-ac","2",voice_wav])
 caps=[]
 for idx,st,en,text,highlight in CAPTIONS:
  caps.append({"start":round(starts[idx]+st,3),"end":round(starts[idx]+en,3),"text":text,"highlight":highlight,"act":idx+1})
 ass="""[Script Info]
Title: Ban Da Lon Len V2 Cloud Sky REVIEW
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes
[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Caption,Be Vietnam Pro ExtraBold,60,&H00F7F4F0,&H00FFFFFF,&H00302013,&H90000000,-1,0,0,0,100,100,0,0,1,2.6,1,2,65,65,404,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
 for c in caps:
  text=c["text"]; h=c["highlight"]; pos=text.lower().find(h.lower())
  if pos>=0: text=text[:pos]+r"{\c&H007BD4FF&}"+text[pos:pos+len(h)]+r"{\c&H00F7F4F0&}"+text[pos+len(h):]
  ass+=f"Dialogue: 0,{ass_time(c['start'])},{ass_time(c['end'])},Caption,,0,0,0,,{text}\n"
 ass_path=work/"captions.ass"; ass_path.write_text(ass,encoding="utf-8")
 # Original restrained ambient pad, generated locally; no commercial track.
 sr=48000; n=int(total*sr); t=np.arange(n)/sr; sound=np.zeros(n)
 for f,amp in zip([220,261.626,329.628,440],[.38,.31,.22,.11]):
  sound+=amp*(np.sin(2*np.pi*f*t)+.15*np.sin(2*np.pi*(f*2)*t+.2))
 env=np.minimum(1,t/2)*np.minimum(1,(total-t)/1.9)
 sound=.013*sound*env*(1+.045*np.sin(2*np.pi*.13*t))
 pcm=(sound*32767).clip(-32768,32767).astype("<i2"); stereo=np.column_stack([pcm,np.roll(pcm,19)]).ravel()
 music=work/"ambient.wav"
 with wave.open(str(music),"wb") as f: f.setnchannels(2); f.setsampwidth(2); f.setframerate(sr); f.writeframes(stereo.tobytes())
 # CRT aperture mask.
 mask=Image.new("L",(726,598),0); ImageDraw.Draw(mask).rounded_rectangle((5,5,720,592),radius=94,fill=241)
 mask=mask.filter(ImageFilter.GaussianBlur(10)); mask_png=work/"screen-alpha.png"; mask.save(mask_png)
 shots=[]; processed=[]
 for i,(name,seek,dur,mood) in enumerate(SHOTS):
  src=assets/f"{name}.mp4"; assert src.exists(),src
  dst=work/f"shot-{i:02}.mp4"
  crop_x="(in_w-out_w)*(0.50+0.10*sin(t*0.35))"
  vf=f"fps={FPS},scale=900:740:force_original_aspect_ratio=increase,crop=726:598:x='{crop_x}':y='(in_h-out_h)*0.5',{GRADES[mood]},setsar=1,format=yuv420p"
  run(["ffmpeg","-y","-v","error","-ss",seek,"-i",src,"-t",dur,"-an","-vf",vf,"-r",FPS,"-c:v","libx264","-preset","ultrafast","-crf","19","-pix_fmt","yuv420p",dst])
  processed.append(dst); shots.append({"asset":name,"source":CLIPS[name],"seek_sec":seek,"duration_sec":dur,"grade":mood})
 inputs=[]; filters=[]
 for i,p in enumerate(processed):
  inputs += ["-i",p]; filters.append(f"[{i}:v]settb=AVTB,setpts=PTS-STARTPTS,fps={FPS},format=yuv420p[v{i}]")
 current="v0"; elapsed=SHOTS[0][2]
 for i in range(1,len(processed)):
  out=f"xf{i}"; filters.append(f"[{current}][v{i}]xfade=transition=fade:duration={XFADE}:offset={elapsed-XFADE:.3f}[{out}]")
  elapsed+=SHOTS[i][2]-XFADE; current=out
 program=work/"cloud-program.mp4"
 run(["ffmpeg","-y","-v","error",*inputs,"-filter_complex",";".join(filters),"-map",f"[{current}]","-an","-r",FPS,"-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p",program])
 # Finite background/mask loops avoid open-ended still-image demuxer streams.
 bg_video=work/"background.mp4"; mask_video=work/"mask.mp4"
 run(["ffmpeg","-y","-v","error","-loop","1","-framerate",FPS,"-i",base,"-t",total,"-an","-c:v","libx264","-preset","ultrafast","-crf","18","-pix_fmt","yuv420p",bg_video])
 run(["ffmpeg","-y","-v","error","-loop","1","-framerate",FPS,"-i",mask_png,"-t",total,"-an","-vf","format=gray","-c:v","libx264","-preset","ultrafast","-crf","18","-pix_fmt","yuv420p",mask_video])
 output=Path(a.out)
 filt=(f"[0:v]setpts=PTS-STARTPTS[base];[1:v]setpts=PTS-STARTPTS,format=rgba[screen];[2:v]setpts=PTS-STARTPTS,format=gray[alpha];"
       "[screen][alpha]alphamerge[masked];[base][masked]overlay=x=59:y=654:format=auto,format=yuv420p[full];"
       f"[full]ass='{ass_path.as_posix()}':fontsdir='{assets.as_posix()}',format=yuv420p[v];"
       "[3:a]volume=1[vox];[4:a]volume=1[bed];[vox][bed]amix=inputs=2:duration=longest:dropout_transition=0,loudnorm=I=-16:TP=-1.5:LRA=9[a]")
 run(["ffmpeg","-y","-v","error","-i",bg_video,"-i",program,"-i",mask_video,"-i",voice_wav,"-i",music,"-filter_complex",filt,
      "-map","[v]","-map","[a]","-t",total,"-r",FPS,"-c:v","libx264","-preset","ultrafast","-crf","20","-pix_fmt","yuv420p",
      "-c:a","aac","-b:a","192k","-ar","48000","-ac","2","-movflags","+faststart",output])
 manifest={"version":"V2","status":"REVIEW","duration_sec":round(total,3),"fps":FPS,"resolution":[W,H],"voice_starts":starts,
           "crossfade_sec":XFADE,"captions":caps,"shots":shots,"font":"Be Vietnam Pro ExtraBold","note":"Human review of phoneme and semantic visual sync pending."}
 Path(a.out+".manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
 print("OUTPUT",output.resolve(),output.stat().st_size)
if __name__=="__main__": main()
