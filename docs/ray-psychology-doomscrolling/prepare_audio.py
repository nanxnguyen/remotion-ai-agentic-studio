#!/usr/bin/env python3
"""Genuine single Vbee track -> measured scene windows + gentle fully original music.
This script NEVER substitutes, fabricates, or re-voices narration.
Scene and phrase markers are energy/silence estimates; they are NOT word alignment.
"""
from pathlib import Path
import subprocess, re, json, math, wave, struct, hashlib, os
from array import array
R=Path(__file__).resolve().parent
mp3=R/'voice-vbee.mp3'; assert mp3.exists() and mp3.stat().st_size>10000, 'Actual Vbee mp3 missing'
lines=(R/'vbee-script.txt').read_text(encoding='utf8').strip().splitlines()
assert len(lines)==8, len(lines)
segments=[
 ['Thử đoán: ai đang điều khiển','ngón tay bạn?'],
 ['Bạn chỉ định xem một tin.','Nhưng tin xấu tiếp theo','lại hiện ra.'],
 ['Bạn lướt tiếp, vì sợ','bỏ lỡ điều quan trọng.'],
 ['Đó có thể là doomscrolling:','thói quen lướt tin tiêu cực','ngay cả khi bạn đã mệt.'],
 ['Nghiên cứu ghi nhận mối liên hệ','với căng thẳng và lo âu,','nhưng chưa xác định quan hệ nhân quả.'],
 ['Hãy thử đặt hẹn giờ năm phút.','Khi chuông reo, khóa màn hình','và đứng dậy uống nước.'],
 ['Bạn vẫn có thể cập nhật tin tức','mà không để cả buổi tối','bị cuốn đi.'],
 ['Nếu hữu ích, hãy thả tim','và đăng ký kênh nhé!']]
for l,p in zip(lines,segments):
 a=re.findall(r'\w+',l.casefold(),re.UNICODE);b=re.findall(r'\w+',' '.join(p).casefold(),re.UNICODE)
 assert a==b,(l,p)
audio=subprocess.check_output(['ffmpeg','-v','error','-i',str(mp3),'-ar','48000','-ac','1','-f','s16le','-'])
raw=array('h');raw.frombytes(audio);sr=48000;dur=len(raw)/sr
probe=subprocess.run(['ffmpeg','-hide_banner','-i',str(mp3),'-af','silencedetect=noise=-38dB:d=0.34','-f','null','-'],capture_output=True,text=True)
starts=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',probe.stderr)]
ends=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',probe.stderr)]
pauses=[(s,e) for s,e in zip(starts,ends) if e-s>=.36 and s>.75 and e<dur-.5]
# Candidate pauses are selected closest to each scene's expected relative word count.
counts=[len(x.split()) for x in lines];total=sum(counts)
expected=[dur*sum(counts[:i])/total for i in range(1,len(lines))]
chosen=[];prev=0.0;quality=[]
for i,point in enumerate(expected):
 eligible=[(s,e) for s,e in pauses if s>prev+0.25 and (s+e)/2 < dur-(len(expected)-i-1)*1.7]
 if not eligible:raise RuntimeError(f'No genuine voice pause for boundary {i+1}; review source MP3; do not force fake scene sync')
 s,e=min(eligible,key=lambda x:abs((x[0]+x[1])/2-point))
 gap_err=abs((s+e)/2-point)
 if gap_err>4.5:raise RuntimeError(f'Boundary {i+1} candidate pause too far from expected utterance: {gap_err:.2f}s; review voice')
 chosen.append((s,e));quality.append(round(gap_err,3));prev=e
# Preserve actual phrase speech around each inter-line pause; stitch with 0.24s breath.
start_at=[0.0]+[max(0,e-0.08) for _,e in chosen]
end_at=[min(dur,s+0.08) for s,_ in chosen]+[dur]
out=array('h');edges=[0.0]; silence=int(.24*sr)
for i,(s,e) in enumerate(zip(start_at,end_at)):
 if e<=s:raise RuntimeError('Invalid scene segment')
 frag=raw[int(s*sr):int(e*sr)]
 if i and len(frag)<sr*.8:raise RuntimeError('Tiny scene, verify audio')
 out.extend(frag)
 edges.append(len(out)/sr)
 if i<len(lines)-1:out.extend(array('h',[0])*silence)
# Scene ends include intervening breath; reconstruct boundaries by re-pass
edges=[0.0];position=0
for i,(s,e) in enumerate(zip(start_at,end_at)):
 position+=round((e-s)*sr); position += silence if i<len(lines)-1 else 0
 edges.append(position/sr)
if abs(edges[-1]-len(out)/sr)>.04:raise RuntimeError('Audio and frames mismatch')
(R/'public').mkdir(exist_ok=True)
voice=R/'public/doom-voice.wav'
with wave.open(str(voice),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(out.tobytes())
voice_d=len(out)/sr
if not 1.0<=edges[1]<=4.0:raise RuntimeError(f'HOOK DOES NOT FIT 1–4s: {edges[1]:.2f}s; revise script or TTS')
cues=[]
for i,pieces in enumerate(segments):
 a,b=edges[i:i+2]; weights=[len(x.split()) for x in pieces];sumw=sum(weights)
 t=a
 for k,p in enumerate(pieces):
  end=b if k==len(pieces)-1 else t+(b-a)*weights[k]/sumw
  cues.append({'scene':i,'text':p,'start':round(t,3),'end':round(end,3),'timing_method':'estimated_phrase_distribution'})
  t=end
frames=math.ceil((voice_d+0.45)*30)
data={'edges':[round(e,4) for e in edges],'duration':voice_d,'totalFrames':frames,'fps':30,'cues':cues,'originalVbeeSha256':hashlib.sha256(mp3.read_bytes()).hexdigest(),'voiceTimings':'scene boundaries from measurable acoustic silence; intra-scene phrases ESTIMATED; NOT word level','candidateErrorsSeconds':quality,'chosenSilences':chosen,'sourceAudioSeconds':dur}
(R/'timing.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
# Original deterministic synth score: airy sine pad; no copyright music samples.
score=R/'public/doom-music.wav';n=int((voice_d+0.45)*sr)
with wave.open(str(score),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
 chunk=array('h')
 freqs=[146.83,164.81,174.61,130.81,196.00,164.81,146.83,174.61]
 for i in range(n):
  t=i/sr;bar=int(t//4.9)%len(freqs);f=freqs[bar]
  local=t%4.9;en=min(1,local/.25)*math.exp(-local/6.0)*min(1,t/1.0,(n-i)/(.7*sr))
  v=0.023*en*(math.sin(2*math.pi*f*t)+.32*math.sin(2*math.pi*f*2*t)+.18*math.sin(2*math.pi*f*1.502*t))
  chunk.append(int(max(-.99,min(.99,v))*32767))
  if len(chunk)>24000:w.writeframes(chunk.tobytes());chunk=array('h')
 if chunk:w.writeframes(chunk.tobytes())
print(json.dumps({'sourceSeconds':dur,'cleanSeconds':voice_d,'firstHook':edges[1],'frames':frames,'scenes':len(lines),'voice_sha256':data['originalVbeeSha256'],'bounds_error':quality},ensure_ascii=False))
