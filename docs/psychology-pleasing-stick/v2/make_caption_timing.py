"""Measured speech-energy guided phrase timing; NOT forced word alignment."""
from pathlib import Path
import numpy as np, json, wave, re
ROOT=Path(__file__).resolve().parent
S=ROOT.parent
TIMING=json.loads((S/'timing.json').read_text())
SCRIPT=[
['Bạn thường nói "được thôi",','dù trong lòng muốn từ chối?','Đây là sáu dấu hiệu','bạn đang cố làm hài lòng tất cả mọi người.'],
['Một: Bạn nhận lời giúp đỡ,','ngay cả khi đã kiệt sức.'],
['Hai: Bạn xin lỗi,','dù mình chẳng làm điều gì sai.'],
['Ba: Bạn sợ người khác thất vọng,','nên không dám nói thật.'],
['Bốn: Bạn đổi ý kiến,','chỉ để tránh một cuộc tranh cãi.'],
['Năm: Bạn hỏi ai cũng ổn không,','nhưng quên hỏi chính mình.'],
['Sáu: Khi từ chối một lần,','bạn day dứt cả ngày.'],
['Nhớ nhé, tử tế không đồng nghĩa','phải đánh mất bản thân.','Bạn có thể nói:','"Mình muốn giúp, nhưng hôm nay mình không thể."'],
['Nếu thấy hữu ích,','hãy thả tim và đăng ký kênh nhé!']]
with wave.open(str(S/'voice-clean-48k.wav')) as f:
  assert f.getnchannels()==1 and f.getframerate()==48000 and f.getsampwidth()==2
  samples=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32)/32768
# RMS every 12 ms + smoothly average ~48ms to find natural low energy transitions.
hop=576;win=1920
rms=np.array([np.sqrt(np.mean(samples[i:i+win]**2)) for i in range(0,len(samples),hop)])
rms=np.convolve(rms,np.ones(5)/5,mode='same')
T=hop/48000
cues=[]
for si,phrases in enumerate(SCRIPT):
  st=float(TIMING['edges'][si]);en=float(TIMING['edges'][si+1]);dur=en-st
  # Vietnamese spoken syllables tend to correspond more closely to whitespace tokens than written character counts.
  weights=np.array([len(p.split()) for p in phrases],dtype=float)
  fractions=np.cumsum(weights)/weights.sum()
  bounds=[st]
  for frac in fractions[:-1]:
    expect=st+dur*frac
    lo=max(bounds[-1]+.45,expect-.35);hi=min(en-.40,expect+.35)
    if lo>=hi:found=expect
    else:
      ia=max(0,int(lo/T));ib=min(len(rms),int(hi/T)+1)
      # Energy minima near estimated syllable allocation, penalize drifting away by >200ms
      timestamps=np.arange(ia,ib)*T
      clip=rms[ia:ib]
      scores=clip+0.03*np.square((timestamps-expect)/.35)
      found=float(timestamps[np.argmin(scores)])
    bounds.append(round(found,3))
  bounds.append(en)
  for i,phrase in enumerate(phrases):
    cues.append({'scene':si,'text':phrase,'start':round(bounds[i],3),'end':round(bounds[i+1],3),'timing_type':'estimated_energy_phrase_boundary'})
# invariants
assert len(cues)==22
for i,v in enumerate(cues):
  assert v['end']-v['start']>.25, v
  if i:assert abs(v['start']-cues[i-1]['end'])<.002, (i,v)
assert abs(cues[-1]['end']-TIMING['voiceDuration'])<.1
out={'source':'verified Vbee 48k mono measured; 2026-10-28','alignment':'phrase-level estimated from RMS minima and Vietnamese syllable weights; NOT forced aligned; unverified word-level', 'cues':cues}
(ROOT/'caption-timing-V2.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('cues=',len(cues),'segments=',len(SCRIPT),'last=',cues[-1]['end'])
for i,v in enumerate(cues):print(f"{i+1:02d} {v['start']:.2f}–{v['end']:.2f} {v['text']}")
