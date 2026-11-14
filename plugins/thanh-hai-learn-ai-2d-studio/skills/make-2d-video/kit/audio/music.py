"""audio/music.py — procedural, mood-driven background score (royalty-free, generated locally).

  python audio/music.py --project projects/my-video            # reads story/shots.json "music" plan
  python audio/music.py --mood tension --dur 30 --out test.wav  # audition one mood
  python audio/music.py --list

Plan format (story/shots.json -> "music"): contiguous sections in seconds
  [{"start": 0, "end": 42, "mood": "mystery", "intensity": 0.4},
   {"start": 42, "end": 95, "mood": "tension", "intensity": 0.7}, ...]
Moods: mystery, tension, action, wonder, hopeful, sad, triumph, playful, calm, dark, epic
intensity 0..1 adds layers (pulse, arps, drums) and opens the filter. Sections cross-fade over ~2 s.
"""
import argparse, json, os, sys
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from dsp import SR, secs, t_axis, noise, lp, hp, bp, osc, sine, expdec, env_adsr, stereo, reverb, delay, midi_hz, rng, write_wav, rms_db, db, place

NOTE = {"C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11}
MOODS = {
    "mystery":  dict(key="D", minor=True,  prog=["i", "bVI", "bVII", "i"], bpm=72, bars=2, bright=0.35, layers=dict(pad=0, sub=0, bell=0.0, pulse=0.35, tick=0.55, arp=0.75)),
    "tension":  dict(key="C#", minor=True, prog=["i", "i", "bVI", "V"], bpm=96, bars=1, bright=0.45, layers=dict(pad=0, sub=0, pulse=0.0, tick=0.3, kick=0.6, drone=0.0)),
    "action":   dict(key="E", minor=True,  prog=["i", "bVII", "bVI", "bVII"], bpm=128, bars=1, bright=0.6, layers=dict(pad=0, sub=0, pulse=0, kick=0.3, snare=0.45, hat=0.35, brass=0.7)),
    "wonder":   dict(key="F", minor=False, prog=["I", "V", "vi", "IV"], bpm=80, bars=2, bright=0.6, layers=dict(pad=0, sub=0.2, arp=0.0, bell=0.3, piano=0.5)),
    "hopeful":  dict(key="G", minor=False, prog=["IV", "I", "V", "vi"], bpm=88, bars=1, bright=0.55, layers=dict(pad=0, sub=0, piano=0, arp=0.5, kick=0.7, hat=0.75)),
    "sad":      dict(key="A", minor=True,  prog=["i", "bVI", "bIII", "bVII"], bpm=66, bars=2, bright=0.3, layers=dict(pad=0, sub=0.2, piano=0, bell=0.6)),
    "triumph":  dict(key="D", minor=False, prog=["I", "V", "vi", "IV"], bpm=108, bars=1, bright=0.65, layers=dict(pad=0, sub=0, arp=0.2, kick=0.35, snare=0.5, hat=0.45, brass=0.3)),
    "playful":  dict(key="C", minor=False, prog=["I", "vi", "ii", "V"], bpm=112, bars=1, bright=0.6, layers=dict(pluck=0, bass=0, hat=0.3, clap=0.4, bell=0.6)),
    "calm":     dict(key="Eb", minor=False, prog=["I", "IV", "vi", "V"], bpm=70, bars=2, bright=0.4, layers=dict(pad=0, sub=0.2, piano=0.2)),
    "dark":     dict(key="B", minor=True,  prog=["i", "bII", "i", "bVI"], bpm=60, bars=2, bright=0.25, layers=dict(drone=0, pad=0.2, sub=0, bell=0.4, tick=0.6)),
    "epic":     dict(key="C", minor=True,  prog=["i", "bVI", "bIII", "bVII"], bpm=100, bars=1, bright=0.6, layers=dict(pad=0, sub=0, pulse=0, kick=0.3, snare=0.55, brass=0.2, arp=0.6)),
}
ROMAN = {"I": 0, "II": 2, "III": 4, "IV": 5, "V": 7, "VI": 9, "VII": 11}


def chord_tones(rn, key_midi):
    flat = rn.startswith("b"); core = rn.lstrip("b"); up = core.upper()
    base = ROMAN[up.replace("7", "")] - (1 if flat else 0)
    minor = core == core.lower()
    tri = [0, 3, 7] if minor else [0, 4, 7]
    return [key_midi + base + x for x in tri]


def pluck_layer(n, notes, wave="saw", tau=0.2, cutoff=2000, gain=1.0):
    out = np.zeros(n, np.float32)
    for at, m, dur_, vel in notes:
        a = secs(at); k = min(secs(dur_), n - a)
        if k <= 0: continue
        out[a:a + k] += osc(wave, midi_hz(m), k) * np.exp(-np.arange(k) / (SR * tau)) * vel
    return lp(out, cutoff) * gain


def piano_note(m, k, vel):
    f = midi_hz(m); t = np.arange(k) / SR
    x = sum(np.sin(2 * np.pi * f * h * (1 + 0.0004 * h * h) * t) * a * np.exp(-t / (1.6 / h ** 0.7)) for h, a in [(1, 1), (2, 0.45), (3, 0.25), (4, 0.12), (5, 0.06)])
    x *= np.minimum(1, t / 0.004)
    return (x * vel).astype(np.float32)


def drum(kind, k, seed):
    t = np.arange(k) / SR
    if kind == "kick": f = 45 + 110 * np.exp(-t / 0.035); return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.22)).astype(np.float32)
    if kind == "snare": return (bp(noise(k, seed), 1200, 6000) * np.exp(-t / 0.09) * 0.7 + np.sin(2 * np.pi * 185 * t) * np.exp(-t / 0.06) * 0.5).astype(np.float32)
    if kind == "hat": return (hp(noise(k, seed), 7500) * np.exp(-t / 0.025) * 0.5).astype(np.float32)
    if kind == "clap": return (bp(noise(k, seed), 900, 4000) * (np.exp(-t / 0.012) + 0.6 * np.exp(-np.maximum(0, t - 0.012) / 0.06) * (t > 0.012)) * 0.6).astype(np.float32)
    if kind == "tick": return (bp(noise(k, seed), 2500, 7000) * np.exp(-t / 0.006) * 0.6).astype(np.float32)
    return np.zeros(k, np.float32)


def render_section(mood, intensity, dur, seed=0, key=None):
    M = MOODS[mood]; r = rng(seed); I = float(np.clip(intensity, 0, 1))
    on = {k: I >= v for k, v in M["layers"].items()}
    beat = 60 / M["bpm"]; bar = 4 * beat; clen = bar * M["bars"]
    tail = 3.0; n = secs(dur + tail); key_midi = NOTE[key or M["key"]] + 48
    L = {k: np.zeros(n, np.float32) for k in ["pad", "padR", "sub", "pulse", "arp", "piano", "bell", "drums", "brass", "drone"]}
    starts = np.arange(0, dur, clen)
    plk, arp, pia, bel, brs = [], [], [], [], []
    for ci, cs in enumerate(starts):
        tones = chord_tones(M["prog"][ci % len(M["prog"])], key_midi)
        k = min(secs(clen + 1.6), n - secs(cs)); a = secs(cs)
        if k <= 0: continue
        envp = env_adsr(k, min(1.2, clen * 0.35), 0.5, 0.85, 1.4)
        if on.get("pad"):
            for j, m in enumerate(tones + [tones[0] + 12]):
                for det, side in [(-0.004, "pad"), (0.004, "padR")]:
                    L[side][a:a + k] += osc("saw", midi_hz(m) * (1 + det), k, r.random() * 6.28) * envp * 0.16
        if on.get("sub"): L["sub"][a:a + k] += (sine(midi_hz(tones[0] - 24), k) + 0.25 * sine(midi_hz(tones[0] - 12), k)) * envp * 0.5
        if on.get("drone"): L["drone"][a:a + k] += (osc("saw", midi_hz(key_midi - 12), k) + osc("saw", midi_hz(key_midi - 5), k)) * envp * 0.12
        steps = int(round(clen / (beat / 2)))
        for s in range(steps):
            at = cs + s * beat / 2
            if at >= dur: break
            if on.get("pulse") or on.get("pluck"): plk.append((at, [tones[0], tones[0] + 12, tones[2], tones[0] + 12][s % 4] - (12 if on.get("pulse") else 0), beat * 0.9, 0.55 if s % 2 == 0 else 0.4))
            if on.get("bass") and s % 2 == 0: plk.append((at, tones[0] - 12, beat, 0.7))
            if on.get("arp"):
                for q in range(2):
                    m = (tones + [tones[0] + 12])[(s * 2 + q) % 4] + 12
                    arp.append((at + q * beat / 4, m, beat * 0.6, 0.35 + 0.1 * (q == 0)))
            if on.get("brass") and s == 0: brs.append((at, tones, clen))
        if on.get("piano"):
            for b in range(int(clen / beat)):
                if r.random() < (0.55 if b % 2 == 0 else 0.25):
                    m = int(r.choice(tones)) + 12 + (12 if r.random() < 0.3 else 0)
                    pia.append((cs + b * beat, m, 0.25 + 0.15 * r.random()))
        if on.get("bell") and r.random() < 0.7: bel.append((cs + beat * float(r.choice([0, 1, 2])), tones[int(r.integers(0, 3))] + 24))
        for b in range(int(clen / beat)):
            at = cs + b * beat
            if at >= dur: break
            hits = []
            if on.get("kick") and (b % 2 == 0 or I > 0.85): hits.append(("kick", 0.9))
            if on.get("snare") and b % 2 == 1: hits.append(("snare", 0.6))
            if on.get("clap") and b % 2 == 1: hits.append(("clap", 0.5))
            for kind, v in hits: place(L["drums"], drum(kind, secs(0.4), seed + ci * 31 + b), secs(at), v)
            for h in range(2):
                if on.get("hat"): place(L["drums"], drum("hat", secs(0.1), seed + b + h), secs(at + h * beat / 2), 0.35 if h else 0.25)
                if on.get("tick"): place(L["drums"], drum("tick", secs(0.05), seed + b + h), secs(at + h * beat / 2), 0.35)
    bright = M["bright"] * (0.6 + 0.8 * I)
    pad = np.stack([lp(L["pad"], 500 + 2600 * bright), lp(L["padR"], 500 + 2600 * bright)], 1)
    out = pad + stereo(lp(L["sub"], 200), 0) * 0.9 + stereo(lp(L["drone"], 300 + 800 * bright), 0, 0.6)
    if plk: out += delay(stereo(pluck_layer(n, plk, "saw", 0.16, 900 + 2500 * bright), 0.1), beat * 0.75, 0.3, 0.25)[:n] * 0.55
    if arp: out += delay(stereo(pluck_layer(n, arp, "tri", 0.25, 5000), -0.2), beat * 0.5, 0.35, 0.3)[:n] * 0.35
    for at, m, v in pia:
        a = secs(at); k = min(secs(3.0), n - a)
        if k > 0: out[a:a + k] += stereo(piano_note(m, k, v), (m - 66) / 30) * 0.6
    for at, m in bel:
        a = secs(at); k = min(secs(2.5), n - a)
        if k > 0: out[a:a + k] += stereo(sum(sine(midi_hz(m) * rr_, k) * aa * np.exp(-np.arange(k) / (SR * d)) for rr_, aa, d in [(1, 1, 0.9), (2.76, 0.3, 0.3), (5.4, 0.12, 0.15)]), 0.3) * 0.12
    for at, tones, cl in brs:
        a = secs(at); k = min(secs(cl + 0.8), n - a)
        if k > 0:
            b = sum(osc("saw", midi_hz(m - 12), k) for m in tones[:2]) * env_adsr(k, 0.25, 0.3, 0.8, 0.6) * 0.18
            out[a:a + k] += stereo(lp(b, 1400 * (0.6 + bright)), 0, 0.5)
    out += stereo(lp(L["drums"], 12000), 0) * 0.8
    return reverb(out, 2.8, 0.28, seed).astype(np.float32)


def render_score(plan, total, seed=1, key=None):
    n = secs(total + 0.5); out = np.zeros((n, 2), np.float32); xf = 2.0
    plan = sorted(plan, key=lambda s: s["start"])
    for i, s in enumerate(plan):
        st, en = max(0, s["start"]), min(total, s["end"])
        if en - st < 0.5: continue
        y = render_section(s.get("mood", "mystery"), s.get("intensity", 0.5), en - st + xf, seed + i * 101, key)
        m = len(y); fin = secs(xf if i else 2.5); fo = secs(xf)
        ramp_in = np.sin(np.linspace(0, np.pi / 2, fin)) ** 2
        y[:fin] *= ramp_in[:, None]
        cut = secs(en - st + xf); y = y[:cut]
        if i < len(plan) - 1: y[-fo:] *= (np.cos(np.linspace(0, np.pi / 2, fo)) ** 2)[:, None]
        place(out, y, secs(st - (xf * 0.5 if i else 0)))
    k = secs(3.0); out[-k:] *= np.linspace(1, 0, k)[:, None]
    return (out * db(-20 - rms_db(out))).astype(np.float32)


def default_plan(total):
    return [{"start": 0, "end": total, "mood": "mystery", "intensity": 0.5}]


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--project"); ap.add_argument("--mood"); ap.add_argument("--intensity", type=float, default=0.6)
    ap.add_argument("--dur", type=float, default=30); ap.add_argument("--out"); ap.add_argument("--list", action="store_true"); ap.add_argument("--seed", type=int, default=1); ap.add_argument("--key")
    a = ap.parse_args()
    if a.list:
        for k, v in MOODS.items(): print(f"{k:9s} {v['bpm']:>3} bpm  key {v['key']}{'m' if v['minor'] else ''}  {' '.join(v['prog'])}")
        sys.exit()
    if a.project:
        story = json.load(open(os.path.join(a.project, "story", "shots.json"), encoding="utf-8"))
        total = story.get("duration") or story["shots"][-1]["end"]
        plan = story.get("music") or default_plan(total)
        out = a.out or os.path.join(a.project, "build", "music.wav")
        x = render_score(plan, total, a.seed, a.key)
    else:
        x = render_score([{"start": 0, "end": a.dur, "mood": a.mood or "mystery", "intensity": a.intensity}], a.dur, a.seed, a.key)
        out = a.out or f"music_{a.mood}.wav"
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True); write_wav(out, x); print(f"wrote {out}  ({len(x) / SR:.1f}s)")
