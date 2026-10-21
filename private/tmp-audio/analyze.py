import librosa, numpy as np, json, sys
files = {
 'generated-soft': 'private/tmp-audio/bgm-test.mp3',
 'bgm-tech-house': 'skills/video-shotcraft/assets/audio/bgm/bgm-tech-house.mp3',
 'cat-walk': 'skills/video-shotcraft/assets/audio/bgm/cat-walk.mp3',
 'g-eazy-nba-type': 'skills/video-shotcraft/assets/audio/bgm/g-eazy-nba-type.mp3',
 'house-vibez': 'skills/video-shotcraft/assets/audio/bgm/house-vibez.mp3',
 'tonight-hiphop': 'skills/video-shotcraft/assets/audio/bgm/tonight-hiphop.mp3',
}
rows={}
for name,path in files.items():
    y,sr = librosa.load(path, sr=22050, mono=True, duration=32.0)
    dur = len(y)/sr
    rms = float(np.sqrt(np.mean(y**2)))
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units='time')
    onset_rate = len(onsets)/dur
    H,P = librosa.effects.hpss(y)
    perc = float(np.sum(P**2)/(np.sum(H**2)+np.sum(P**2)+1e-12))
    cent = float(np.mean(librosa.feature.spectral_centroid(y=y,sr=sr)))
    flat = float(np.mean(librosa.feature.spectral_flatness(y=y)))
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr, tightness=400)
    rows[name]=dict(dur=round(dur,2), rms_db=round(20*np.log10(rms+1e-12),2),
                    onsets_per_s=round(onset_rate,2), percussive_ratio=round(perc,3),
                    centroid_hz=round(cent,0), flatness=round(flat,4),
                    tempo=round(float(np.atleast_1d(tempo)[0]),1), beat_count=int(len(beats)))
print(json.dumps(rows, indent=1, ensure_ascii=False))
