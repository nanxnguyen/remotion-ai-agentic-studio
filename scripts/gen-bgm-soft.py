#!/usr/bin/env python3
"""Synthesize a calm pad + soft piano-ish arpeggio BGM (no third-party audio, deterministic).

Usage: python3 -I scripts/gen-bgm-soft.py <out.mp3> [seconds=75]
Progression C - Am - F - G (one bar each, 72 BPM), loops for the requested length; fades in/out.
Requires numpy, ffmpeg on PATH.
"""
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

SR = 44100
BPM = 72
BEAT = 60 / BPM
out = Path(sys.argv[1])
total = float(sys.argv[2]) if len(sys.argv) > 2 else 75.0

hz = lambda m: 440.0 * 2 ** ((m - 69) / 12)  # MIDI note -> Hz
# (bass, chord tones) per bar
PROG = [(48, [60, 64, 67, 72]), (45, [57, 60, 64, 69]), (41, [57, 60, 65, 69]), (43, [55, 59, 62, 67])]

n = int(total * SR)
t = np.arange(n) / SR
mix = np.zeros(n)


def env(length: int, attack: float, release: float) -> np.ndarray:
    e = np.ones(length)
    a, r = int(attack * SR), int(release * SR)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] *= np.linspace(1, 0, r)
    return e


bar = 4 * BEAT
for b in range(int(total / bar) + 1):
    bass, chord = PROG[b % len(PROG)]
    s0 = int(b * bar * SR)
    # pad: chord tones, two slightly detuned sines each, slow swell overlapping into the next bar
    L = min(int(bar * 1.35 * SR), n - s0)
    if L <= 0:
        break
    tt = np.arange(L) / SR
    e = env(L, 1.2, 1.4)
    for m in chord[:3]:
        for d in (-0.12, 0.12):
            mix[s0:s0 + L] += 0.045 * e * np.sin(2 * np.pi * hz(m + d) * tt)
    mix[s0:s0 + L] += 0.06 * e * np.sin(2 * np.pi * hz(bass) * tt)
    # piano-ish arpeggio: 8 eighth notes, sine + 2 harmonics, exponential decay
    arp = [chord[0], chord[1], chord[2], chord[3], chord[2], chord[1], chord[2], chord[3]]
    for i, m in enumerate(arp):
        p0 = s0 + int(i * BEAT / 2 * SR)
        pl = min(int(2.2 * SR), n - p0)
        if pl <= 0:
            continue
        pt = np.arange(pl) / SR
        f0 = hz(m + 12)
        tone = np.sin(2 * np.pi * f0 * pt) + 0.3 * np.sin(4 * np.pi * f0 * pt) + 0.08 * np.sin(6 * np.pi * f0 * pt)
        vel = 0.05 if i % 2 == 0 else 0.035  # gentle accent on the beat
        mix[p0:p0 + pl] += vel * tone * np.exp(-pt * 2.6) * np.minimum(1, pt / 0.004)

mix *= env(n, 3.0, 4.0)
mix /= np.abs(mix).max() * 1.15
pcm = (np.stack([mix, mix], axis=1) * 32767).astype(np.int16)

with tempfile.TemporaryDirectory() as td:
    wav = Path(td) / "bgm.wav"
    with wave.open(str(wav), "wb") as w:
        w.setnchannels(2), w.setsampwidth(2), w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    af = "lowpass=f=5200,aecho=0.8:0.7:120|260|430:0.32|0.22|0.14,loudnorm=I=-20:TP=-2"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-af", af, "-ar", "44100", "-b:a", "160k", str(out)], check=True)
print(out, f"{total:.1f}s")
