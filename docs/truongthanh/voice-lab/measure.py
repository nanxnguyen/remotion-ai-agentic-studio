#!/usr/bin/env python3
"""Prosody metrics of audio files (needs librosa). Same estimator for every file so numbers are comparable.
Usage: python measure.py file.mp3 [more.mp3 ...]   -> one JSON line per file
Only measures; nothing is cloned or imitated from any clip.
"""
import json, sys
import librosa, numpy as np

TOP_DB, MIN_PAUSE = 35, 0.25


def measure(path, words=None):
    y, sr = librosa.load(path, sr=16000)
    dur = len(y) / sr
    # pause = run of frames >=8 dB below the file's median speech level, lasting >= MIN_PAUSE (leading/trailing excluded)
    hop = 160
    r = librosa.feature.rms(y=y, frame_length=400, hop_length=hop)[0]
    d = 20 * np.log10(r + 1e-9)
    thr = np.median(d[d > -40]) - 8
    low = d < thr
    idx = np.where(~low)[0]
    lo_i, hi_i = idx[0], idx[-1]
    pauses, run = [], 0
    for v in low[lo_i:hi_i + 1]:
        if v: run += 1
        else:
            if run * hop / sr >= MIN_PAUSE: pauses.append(run * hop / sr)
            run = 0
    active = (hi_i - lo_i) * hop / sr - sum(pauses)
    # phrase loudness: split the speech span at those pauses
    seg, cur = [], []
    run = 0
    for i in range(lo_i, hi_i + 1):
        if low[i]:
            run += 1
        else:
            if run * hop / sr >= MIN_PAUSE and cur: seg.append(cur); cur = []
            run = 0
            cur.append(d[i])
    if cur: seg.append(cur)
    phr = seg
    # syllable-nucleus estimate: peaks of smoothed RMS envelope (Vietnamese: 1 syllable = 1 word)
    rms = librosa.feature.rms(y=y, frame_length=400, hop_length=160)[0]
    env = np.convolve(rms, np.ones(5) / 5, "same")
    pk = librosa.util.peak_pick(env, pre_max=6, post_max=6, pre_avg=12, post_avg=12, delta=env.max() * 0.04, wait=8)
    syl = len(pk)
    f0, _, _ = librosa.pyin(y, fmin=70, fmax=400, sr=sr)
    f = f0[~np.isnan(f0)]
    st = 12 * np.log2(f / np.median(f))
    db = [10 * np.log10(np.mean(10 ** (np.array(p) / 10))) for p in phr]
    out = {
        "file": path.split("/")[-1], "dur_s": round(dur, 2), "active_s": round(active, 2),
        "syll_per_s_active": round(syl / active, 2), "est_syllables": syl,
        "pauses_ge_0.25s": len(pauses), "pause_mean_s": round(float(np.mean(pauses)), 2) if pauses else 0,
        "pause_total_s": round(sum(pauses), 2), "pause_max_s": round(max(pauses), 2) if pauses else 0,
        "phrases": len(phr), "phrase_len_mean_s": round(active / len(phr), 2),
        "f0_median_hz": round(float(np.median(f)), 1),
        "f0_range_p5_p95_st": round(float(np.percentile(st, 95) - np.percentile(st, 5)), 2),
        "f0_std_st": round(float(np.std(st)), 2),
        "phrase_loudness_db_std": round(float(np.std(db)), 2),
        "phrase_loudness_db_range": round(float(max(db) - min(db)), 2),
    }
    if words:
        out["words_per_s_active"] = round(words / active, 2)
    return out


if __name__ == "__main__":
    for p in sys.argv[1:]:
        print(json.dumps(measure(p)))
