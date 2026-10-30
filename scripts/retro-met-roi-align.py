import json, pathlib, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
p=pathlib.Path('voice')
out=pathlib.Path('build/retro-met-roi/alignment')
out.mkdir(parents=True,exist_ok=True)
model=WhisperModel('base',device='cpu',compute_type='int8')
r={}
for i in range(1,5):
  f=p/f's{i}.mp3'
  audio,sr=sf.read(str(f),dtype='float32')
  if audio.ndim>1:audio=audio.mean(axis=1)
  xp=np.arange(len(audio))*16000/sr
  newlen=round(len(audio)*16000/sr)
  audio=np.interp(np.arange(newlen),xp,audio).astype('float32')
  segments,info=model.transcribe(audio,language='vi',word_timestamps=True,beam_size=5,vad_filter=False)
  rows=[]
  for s in segments:
    for w in (s.words or []):
      if w.start is not None and w.end is not None:
        rows.append({'word':w.word.strip(),'start':round(w.start,3),'end':round(w.end,3)})
  r[str(i)]=rows
  print('ACT',i,[(w['word'],w['start'],w['end']) for w in rows],flush=True)
(out/'words.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf8')
assert all(len(r[str(i)])>2 for i in range(1,5))
