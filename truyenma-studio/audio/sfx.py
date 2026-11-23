"""audio/sfx.py — procedural sound-effects library (no downloads, no API keys).

  python audio/sfx.py --list                      names + descriptions
  python audio/sfx.py --demo build/sfx_demo       render every effect to WAV for auditioning
  python audio/sfx.py --make whoosh --out w.wav [--dur 0.8] [--seed 3]

Every effect returns stereo float32 at 48 kHz, peak-normalised to about -1 dBFS.
In story/shots.json a cue looks like {"at": 0.25, "name": "whoosh", "gain": -8, "dur": 0.7, "seed": 2}
("at" is seconds from the shot start; "gain" in dB; dur/seed/pitch are optional).
"""
import argparse, os, sys
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from dsp import (SR, secs, t_axis, noise, lp, hp, bp, sweep_filter, env_adsr, expdec, sine, osc, stereo, as_stereo,
                 reverb, delay, fade, normalize, midi_hz, rng, write_wav, place)

LIB = {}
def sfx(desc, dur=1.0):
    def deco(fn):
        LIB[fn.__name__] = {"fn": fn, "desc": desc, "dur": dur}; return fn
    return deco


def _thump(n, f0=150, f1=42, tau=0.25, click=0.3, seed=0):
    t = t_axis(n); f = f1 + (f0 - f1) * np.exp(-t / 0.04)
    x = sine(f, n) * expdec(n, tau)
    x[: secs(0.004)] += noise(secs(0.004), seed) * click
    return x


@sfx("air whoosh past camera / quick movement", 0.7)
def whoosh(dur=0.7, seed=1, pitch=1.0, **_):
    n = secs(dur); x = noise(n, seed)
    y = sweep_filter(x, 300 * pitch, 3500 * pitch, q=1.6, curve=0.8) * np.sin(np.pi * np.linspace(0, 1, n)) ** 1.6
    y += sweep_filter(noise(n, seed + 1), 120 * pitch, 900 * pitch, q=0.9) * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * 0.6
    return normalize(fade(stereo(y, 0, 0.6)), -2)


@sfx("short sharp swish (arm swing, card flick, whip pan)", 0.3)
def swish(dur=0.3, seed=2, pitch=1.0, **_):
    n = secs(dur); y = sweep_filter(noise(n, seed), 1200 * pitch, 6000 * pitch, q=2.0, curve=0.6) * np.sin(np.pi * np.linspace(0, 1, n) ** 0.7) ** 2
    return normalize(fade(stereo(y, 0, 0.3)), -3)


@sfx("deep cinematic boom / impact with tail", 2.5)
def impact(dur=2.5, seed=3, pitch=1.0, **_):
    n = secs(dur); x = _thump(n, 120 * pitch, 32 * pitch, 0.6, 0.8, seed) * 1.2
    x += lp(noise(n, seed), 900) * expdec(n, 0.25) * 0.9 + hp(noise(n, seed + 1), 3000) * expdec(n, 0.04) * 0.5
    return normalize(reverb(fade(x, 0, 0.3), 2.6, 0.35, seed), -1)


@sfx("punchy short hit (body hit, ball strike, door slam)", 0.6)
def hit(dur=0.6, seed=4, pitch=1.0, **_):
    n = secs(dur); x = _thump(n, 180 * pitch, 55 * pitch, 0.12, 0.6, seed) + bp(noise(n, seed), 800, 4000) * expdec(n, 0.03) * 0.8
    return normalize(reverb(x, 0.8, 0.15, seed), -1)


@sfx("rising tension sweep into a moment (use 1-3 s before a cut)", 2.0)
def riser(dur=2.0, seed=5, pitch=1.0, **_):
    n = secs(dur); u = np.linspace(0, 1, n)
    y = sweep_filter(noise(n, seed), 300 * pitch, 7000 * pitch, q=2.5, curve=1.5) * u ** 2.2
    y += sine(110 * pitch * 2 ** (u * 2.5), n) * u ** 3 * 0.35 + sine(165 * pitch * 2 ** (u * 2.5), n) * u ** 3 * 0.2
    return normalize(fade(reverb(stereo(y, 0, 0.7), 1.5, 0.25, seed), 0.01, 0.02), -2)


@sfx("downward whoosh + low groan: time slowing down / slow motion begins", 2.2)
def slowmo(dur=2.2, seed=6, **_):
    n = secs(dur); u = np.linspace(0, 1, n)
    y = sweep_filter(noise(n, seed), 4000, 150, q=1.8, curve=0.7) * np.sin(np.pi * u) ** 0.8
    y += sine(220 * 2 ** (-u * 2.2), n) * (1 - u) ** 0.5 * 0.4 * np.minimum(1, u * 10)
    y += sine(55, n) * np.sin(np.pi * u) * 0.5
    return normalize(reverb(stereo(y, 0, 0.6), 3.0, 0.4, seed), -2)


@sfx("time-freeze: reverse swell that snaps into a shimmering high tone", 2.5)
def freeze(dur=2.5, seed=7, **_):
    n = secs(dur); k = int(n * 0.45); u = np.linspace(0, 1, k)
    sw = hp(noise(k, seed), 2500) * u ** 3
    tail_n = n - k; tt = t_axis(tail_n)
    tail = sum(sine(midi_hz(m), tail_n) * a for m, a in [(88, 0.3), (95, 0.2), (100, 0.15), (76, 0.25)]) * np.exp(-tt / 0.9)
    tail += _thump(tail_n, 90, 40, 0.5, 0.2, seed) * 0.8
    return normalize(reverb(np.concatenate([sw, tail]), 3.2, 0.45, seed), -2)


@sfx("clock tick (single)", 0.12)
def tick(dur=0.12, seed=8, pitch=1.0, **_):
    n = secs(dur); x = bp(noise(n, seed), 1800 * pitch, 5000 * pitch) * expdec(n, 0.008) + sine(2400 * pitch, n) * expdec(n, 0.01) * 0.3
    return normalize(stereo(x, 0.1), -6)


@sfx("ticking clock loop (tick-tock every 0.5 s)", 4.0)
def clock(dur=4.0, seed=9, rate=2.0, **_):
    n = secs(dur); out = np.zeros((n, 2), np.float32)
    for i, at in enumerate(np.arange(0, dur, 1 / rate)):
        s = tick(pitch=1.0 if i % 2 == 0 else 0.8, seed=seed + i); a = secs(at); m = min(len(s), n - a)
        out[a:a + m] += s[:m]
    return normalize(out, -6)


@sfx("heartbeat lub-dub (loops cleanly at 1 beat/s)", 1.0)
def heartbeat(dur=1.0, seed=10, bpm=60, **_):
    n = secs(dur); out = np.zeros(n, np.float32); beat = 60 / bpm
    for at in np.arange(0, dur, beat):
        for off, g in [(0, 1.0), (0.17, 0.7)]:
            s = _thump(secs(0.25), 70, 38, 0.07, 0.05, seed) * g; a = secs(at + off); m = min(len(s), n - a)
            if m > 0: out[a:a + m] += s[:m]
    return normalize(stereo(lp(out, 300)), -3)


@sfx("UI pop: graphic / label appears", 0.15)
def pop(dur=0.15, seed=11, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n); x = sine(500 * pitch * (1 + 1.2 * (1 - np.exp(-t / 0.02))), n) * expdec(n, 0.035)
    return normalize(stereo(x), -4)


@sfx("soft UI blip / data beep", 0.12)
def blip(dur=0.12, seed=12, pitch=1.0, **_):
    n = secs(dur); x = (osc("square", 1320 * pitch, n) * 0.4 + sine(1320 * pitch, n)) * env_adsr(n, 0.003, 0.03, 0.4, 0.04)
    return normalize(stereo(lp(x, 6000)), -8)


@sfx("number counter ticking up (rapid blips)", 1.5)
def counter(dur=1.5, seed=13, **_):
    n = secs(dur); out = np.zeros((n, 2), np.float32); at = 0.0; i = 0
    while at < dur - 0.06:
        s = blip(pitch=1 + 0.02 * i, seed=seed); a = secs(at); m = min(len(s), n - a); out[a:a + m] += s[:m] * 0.6; at += 0.07; i += 1
    return normalize(out, -8)


@sfx("bright bell ding / realisation / correct", 2.0)
def ding(dur=2.0, seed=14, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n); f = 1046 * pitch
    x = sum(sine(f * r, n) * a * np.exp(-t / d) for r, a, d in [(1, 1, 0.9), (2.76, 0.4, 0.4), (5.4, 0.2, 0.2), (8.9, 0.1, 0.1)])
    return normalize(reverb(stereo(x), 2.0, 0.3, seed), -4)


@sfx("magical shimmer / sparkle / superpower reveal", 2.5)
def shimmer(dur=2.5, seed=15, **_):
    n = secs(dur); out = np.zeros(n, np.float32); r = rng(seed)
    for i, m in enumerate([84, 88, 91, 96, 100, 103, 108]):
        a = secs(i * 0.07 + r.random() * 0.03); k = n - a; out[a:] += sine(midi_hz(m), k) * np.exp(-t_axis(k) / 0.6) * 0.3
    out += hp(noise(n, seed), 6000) * np.sin(np.pi * np.linspace(0, 1, n)) * 0.15
    return normalize(reverb(delay(stereo(out), 0.18, 0.4, 0.3)[:n], 2.5, 0.4, seed), -4)


@sfx("dramatic stinger: big low chord hit for reveals / cliffhangers", 3.0)
def stinger(dur=3.0, seed=16, minor=True, **_):
    n = secs(dur); t = t_axis(n); notes = [38, 45, 50, 53 if minor else 54, 57, 62]
    x = sum(osc("saw", midi_hz(m), n) * 0.18 for m in notes); x = lp(x, 1800) * np.exp(-t / 1.1)
    x += _thump(n, 110, 35, 0.7, 0.6, seed) * 0.9
    return normalize(reverb(stereo(x, 0, 0.5), 3.0, 0.4, seed), -1)


@sfx("footstep (single)", 0.3)
def footstep(dur=0.3, seed=17, **_):
    n = secs(dur); x = _thump(n, 120, 60, 0.04, 0.1, seed) * 0.8 + bp(noise(n, seed), 400, 2500) * expdec(n, 0.02) * 0.5
    return normalize(stereo(x, 0.05), -6)


@sfx("ball kick / thud", 0.5)
def kick(dur=0.5, seed=18, **_):
    n = secs(dur); x = _thump(n, 220, 70, 0.08, 0.7, seed) + bp(noise(n, seed), 1500, 6000) * expdec(n, 0.012)
    return normalize(reverb(x, 1.0, 0.15, seed), -2)


@sfx("referee whistle (trill)", 1.2)
def whistle(dur=1.2, seed=19, **_):
    n = secs(dur); t = t_axis(n); f = 2850 + 120 * np.sign(np.sin(2 * np.pi * 28 * t)) * 0.5
    x = (sine(f, n) + hp(noise(n, seed), 2000) * 0.08) * env_adsr(n, 0.02, 0.05, 0.9, 0.12)
    return normalize(reverb(stereo(x), 1.5, 0.2, seed), -6)


@sfx("car passing by (left to right)", 3.0)
def carpass(dur=3.0, seed=20, **_):
    n = secs(dur); u = np.linspace(0, 1, n); prox = np.exp(-((u - 0.5) ** 2) / 0.04)
    eng = osc("saw", 55 * (1.06 - 0.12 * (u > 0.5) * (u - 0.5) * 2), n) * 0.3
    x = (lp(noise(n, seed), 700) * 0.8 + lp(eng, 400)) * prox
    pan = np.clip((u - 0.5) * 2.2, -1, 1); l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return normalize(np.stack([x * l, x * r], 1).astype(np.float32), -3)


@sfx("phone vibrating buzz", 1.6)
def phonebuzz(dur=1.6, seed=21, **_):
    n = secs(dur); t = t_axis(n); gate = ((t % 0.8) < 0.45).astype(np.float32)
    x = lp(osc("square", 160, n), 900) * gate * (0.6 + 0.4 * np.sin(2 * np.pi * 12 * t))
    return normalize(stereo(x), -8)


@sfx("phone ringtone (two-tone)", 2.0)
def phonering(dur=2.0, seed=22, **_):
    n = secs(dur); t = t_axis(n); gate = ((t % 1.0) < 0.6).astype(np.float32) * ((t % 0.1) < 0.07)
    return normalize(stereo((sine(880, n) + sine(1100, n)) * gate * 0.5), -8)


@sfx("stadium crowd cheer / roar", 4.0)
def cheer(dur=4.0, seed=23, **_):
    n = secs(dur); u = np.linspace(0, 1, n); r = rng(seed)
    x = bp(noise(n, seed, "pink"), 300, 3500) * (0.6 + 0.4 * lp(noise(n, seed + 1), 3))
    for k in range(40):
        f0 = 300 + r.random() * 500; a = secs(r.random() * dur * 0.6); m = min(secs(0.6 + r.random()), n - a)
        if m > 0: x[a:a + m] += sweep_filter(noise(m, seed + k), f0, f0 * 1.6, q=6) * np.sin(np.pi * np.linspace(0, 1, m)) * 0.3
    x *= np.minimum(1, u * 6) * np.minimum(1, (1 - u) * 3)
    return normalize(reverb(stereo(x, 0, 1.0), 2.5, 0.4, seed), -3)


@sfx("applause / slow building clapping crowd", 4.0)
def applause(dur=4.0, seed=24, density=60, **_):
    n = secs(dur); out = np.zeros(n, np.float32); r = rng(seed); u = np.linspace(0, 1, n)
    for _k in range(int(density * dur)):
        a = secs(r.random() * dur); m = min(secs(0.03), n - a)
        if m > 0: out[a:a + m] += bp(noise(m, int(r.integers(1e6))), 800, 5000) * np.exp(-np.arange(m) / (SR * 0.006)) * r.random()
    out *= np.minimum(1, u * 2.5)
    return normalize(reverb(stereo(out, 0, 1.0), 2.0, 0.35, seed), -4)


@sfx("crowd murmur bed (loopable)", 6.0)
def murmur(dur=6.0, seed=25, **_):
    n = secs(dur); x = bp(noise(n, seed, "pink"), 200, 1800) * (0.7 + 0.3 * lp(noise(n, seed + 3), 2) * 4)
    return normalize(stereo(x, 0, 1.0), -10)


@sfx("rain ambience bed (loopable)", 6.0)
def rain(dur=6.0, seed=26, heavy=0.5, **_):
    n = secs(dur); x = hp(lp(noise(n, seed, "pink"), 7000), 300) * (0.5 + heavy * 0.5); r = rng(seed)
    for _k in range(int(dur * 120 * (0.5 + heavy))):
        a = int(r.integers(0, n - 200)); x[a:a + 120] += hp(noise(120, int(r.integers(1e6))), 2500) * np.exp(-np.arange(120) / 25) * r.random() * 0.6
    return normalize(stereo(x, 0, 1.0), -8)


@sfx("thunder crack + long rumble", 5.0)
def thunder(dur=5.0, seed=27, **_):
    n = secs(dur); t = t_axis(n)
    rumble = lp(noise(n, seed, "brown"), 180) * np.exp(-t / 1.8) * (0.6 + 0.4 * lp(noise(n, seed + 1), 4) * 5)
    crack = hp(noise(n, seed + 2), 1500) * np.exp(-t / 0.08) * 0.6
    return normalize(reverb(stereo(rumble * 2 + crack, 0, 0.8), 3.5, 0.4, seed), -1)


@sfx("wind ambience (loopable)", 6.0)
def wind(dur=6.0, seed=28, **_):
    n = secs(dur); x = sweep_filter(noise(n, seed), 250, 900, q=3) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.15 * t_axis(n)))
    return normalize(stereo(x, 0, 1.0), -10)


@sfx("quiet room tone / interior air (loopable)", 6.0)
def roomtone(dur=6.0, seed=29, **_):
    n = secs(dur); return normalize(stereo(lp(noise(n, seed, "brown"), 400) + lp(noise(n, seed + 1, "pink"), 2500) * 0.15, 0, 1.0), -18)


@sfx("night city ambience: distant traffic hum (loopable)", 6.0)
def city(dur=6.0, seed=30, **_):
    n = secs(dur); x = lp(noise(n, seed, "brown"), 250) * 1.5 + bp(noise(n, seed + 1, "pink"), 400, 1500) * 0.2 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.1 * t_axis(n)))
    return normalize(stereo(x, 0, 1.0), -12)


@sfx("electric hum / lab machine / power-up drone", 3.0)
def hum(dur=3.0, seed=31, **_):
    n = secs(dur); x = sum(sine(60 * h, n) * a for h, a in [(1, 0.5), (2, 0.3), (3, 0.2), (5, 0.08)]) * (0.85 + 0.15 * np.sin(2 * np.pi * 3 * t_axis(n)))
    return normalize(fade(stereo(lp(x, 900)), 0.2, 0.3), -8)


@sfx("power-up: rising electric charge (gadget / machine start)", 2.0)
def powerup(dur=2.0, seed=32, **_):
    n = secs(dur); u = np.linspace(0, 1, n); x = osc("saw", 80 * 2 ** (u * 3), n) * 0.3 + sine(160 * 2 ** (u * 3), n) * 0.3
    return normalize(reverb(stereo(sweep_filter(x, 300, 6500, q=0.8, kind='lp', curve=2.0) * u ** 1.2), 1.5, 0.2, seed), -3)


@sfx("glitch / digital stutter", 0.6)
def glitch(dur=0.6, seed=33, **_):
    n = secs(dur); r = rng(seed); x = np.zeros(n, np.float32); a = 0
    while a < n - 600:
        m = int(r.integers(300, 3000)); m = min(m, n - a); x[a:a + m] = (osc("square", float(r.integers(200, 2000)), m) * 0.5 if r.random() < 0.6 else noise(m, a) * 0.5); a += m + int(r.integers(0, 1500))
    return normalize(stereo(x, 0, 0.5), -6)


@sfx("camera flash / shutter + light pop", 0.5)
def flash(dur=0.5, seed=34, **_):
    n = secs(dur); x = hp(noise(n, seed), 2000) * expdec(n, 0.03) + sine(3000, n) * expdec(n, 0.08) * 0.2
    return normalize(reverb(stereo(x), 1.2, 0.3, seed), -6)


@sfx("insect / fly buzzing past (pans left to right)", 1.5)
def buzz(dur=1.5, seed=35, **_):
    n = secs(dur); t = t_axis(n); u = np.linspace(0, 1, n)
    f = 210 + 25 * np.sin(2 * np.pi * 7 * t) + 15 * np.sin(2 * np.pi * 13 * t)
    x = lp(osc("saw", f, n), 2500) * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 3 * t))) * np.sin(np.pi * u) ** 0.8
    pan = np.clip(u * 2 - 1, -1, 1); l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return normalize(np.stack([x * l, x * r], 1).astype(np.float32), -6)


# ---------------------------------------------------------------- horror library (Truyện Ma 2D Studio)
@sfx("HORROR low dread drone bed (loopable, sub + beating detuned tones)", 8.0)
def drone(dur=8.0, seed=40, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n)
    x = sum(osc("saw", f * pitch, n) * a for f, a in [(43.0, 0.5), (43.6, 0.45), (64.5, 0.25), (91.0, 0.12)])
    x = lp(x, 260) + lp(noise(n, seed, "brown"), 180) * 0.25
    x *= 0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * t)
    return normalize(fade(reverb(stereo(x, 0, 0.8, seed), 3.5, 0.35, seed), 1.5, 1.5), -4)


@sfx("HORROR ghostly whisper (breathy, panning, unintelligible)", 2.5)
def whisper(dur=2.5, seed=41, **_):
    n = secs(dur); t = t_axis(n); r = rng(seed); env = np.zeros(n, np.float32)
    a = 0
    while a < n - 2000:
        m = int(r.integers(1500, 7000)); m = min(m, n - a); env[a:a + m] += np.sin(np.pi * np.linspace(0, 1, m)) ** 1.5 * (0.5 + 0.5 * r.random()); a += m + int(r.integers(500, 4000))
    x = bp(noise(n, seed), 1800, 6500) * env + bp(noise(n, seed + 1), 500, 1400) * env * 0.3
    pan = np.sin(2 * np.pi * 0.35 * t); l = np.cos((pan + 1) * np.pi / 4); rr_ = np.sin((pan + 1) * np.pi / 4)
    y = np.stack([x * l, x * rr_], 1).astype(np.float32)
    return normalize(reverb(y, 2.5, 0.45, seed), -6)


@sfx("HORROR slow wooden door creak (stick-slip groan)", 2.2)
def creak(dur=2.2, seed=42, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n); u = np.linspace(0, 1, n)
    f = (180 + 140 * np.sin(np.pi * u) + 40 * np.sin(2 * np.pi * 3.3 * t)) * pitch
    ph = np.cumsum(f) / SR; pulses = (np.sin(2 * np.pi * ph) > 0.92).astype(np.float32)
    x = bp(pulses * (0.6 + 0.4 * noise(n, seed)), 300, 2600) + bp(noise(n, seed + 1), 900, 3000) * 0.05
    x *= np.sin(np.pi * u) ** 0.6
    return normalize(reverb(stereo(x, 0.1, 0.3), 1.6, 0.3, seed), -3)


@sfx("HORROR three slow knocks on a wooden door", 2.4)
def knock(dur=2.4, seed=43, count=3, gap=0.55, **_):
    n = secs(dur); out = np.zeros(n, np.float32)
    for i in range(int(count)):
        k = secs(0.25); s = _thump(k, 210, 90, 0.05, 0.5, seed + i) * 0.9 + bp(noise(k, seed + i), 600, 2200) * expdec(k, 0.015) * 0.7
        place(out, s, secs(0.05 + i * gap), 1.0 - 0.08 * i)
    return normalize(reverb(stereo(out, 0), 1.4, 0.3, seed), -2)


@sfx("HORROR jump-scare hit: noise burst + dissonant string cluster + sub boom (put exactly on the reveal frame)", 2.5)
def scare(dur=2.5, seed=44, **_):
    n = secs(dur); t = t_axis(n)
    x = sum(osc("saw", midi_hz(m) * (1 + 0.004 * np.sin(2 * np.pi * 6 * t)), n) * 0.16 for m in [74, 75, 81, 82, 86]) * np.exp(-t / 0.9)
    x = hp(x, 400) + hp(noise(n, seed), 1500) * np.exp(-t / 0.12) * 0.9 + _thump(n, 90, 28, 0.8, 0.9, seed) * 1.1
    return normalize(reverb(stereo(x, 0, 0.6), 2.8, 0.35, seed), -1)


@sfx("HORROR reverse suck-in swell that ends abruptly (place so it ENDS on the scare frame)", 1.6)
def reverse(dur=1.6, seed=45, **_):
    n = secs(dur); u = np.linspace(0, 1, n)
    x = reverb(stereo(hp(noise(n, seed), 600) * expdec(n, 0.3), 0, 0.6), 2.5, 0.6, seed)[::-1].copy()
    x *= (u ** 2.5)[:, None]; x[-secs(0.01):] = 0
    return normalize(x.astype(np.float32), -3)


@sfx("HORROR detuned music box melody (creepy lullaby)", 6.0)
def musicbox(dur=6.0, seed=46, **_):
    n = secs(dur); out = np.zeros(n, np.float32); mel = [81, 76, 79, 77, 76, 74, 76, 72, 74, 71, 69, 0, 81, 76, 79, 84]
    step = 0.36
    for i, m in enumerate(mel):
        at = i * step
        if m == 0 or at >= dur - 0.2: continue
        k = min(secs(1.4), n - secs(at)); tt = np.arange(k) / SR; f = midi_hz(m) * (1 - 0.006 * (i % 3))
        tone = (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * f * 3.01 * tt) * np.exp(-tt / 0.08)) * np.exp(-tt / 0.55)
        place(out, tone.astype(np.float32), secs(at), 0.5)
    out *= 1 - 0.25 * np.linspace(0, 1, n)
    return normalize(reverb(stereo(out, 0.15, 0.3), 2.2, 0.35, seed), -5)


@sfx("HORROR heavy frightened breathing (in / out)", 4.0)
def breath(dur=4.0, seed=47, rate=0.55, **_):
    n = secs(dur); t = t_axis(n); ph = (t * rate) % 1
    env = np.where(ph < 0.45, np.clip(np.sin(np.pi * ph / 0.45), 0, 1) ** 1.4, 0.7 * np.sin(np.pi * np.clip((ph - 0.5) / 0.45, 0, 1)) ** 1.4)
    x = bp(noise(n, seed), 500, 3500) * env * 0.8 + lp(noise(n, seed + 1), 400) * env * 0.4
    return normalize(reverb(stereo(x, 0, 0.2), 0.8, 0.15, seed), -6)


@sfx("HORROR temple bell (chuông chùa) — deep inharmonic strike with very long tail", 7.0)
def templebell(dur=7.0, seed=48, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n); f = 98 * pitch
    x = sum(np.sin(2 * np.pi * f * r_ * t) * a * np.exp(-t / d) for r_, a, d in [(1, 1, 4.5), (2.0, 0.5, 3.0), (2.76, 0.4, 2.2), (4.07, 0.25, 1.4), (5.4, 0.15, 0.8)])
    x *= 1 + 0.15 * np.sin(2 * np.pi * 1.7 * t); x[:secs(0.006)] += noise(secs(0.006), seed) * 0.4
    return normalize(reverb(stereo(x.astype(np.float32), 0, 0.5), 3.5, 0.3, seed), -3)


@sfx("HORROR water drip in a cave / well", 1.2)
def drip(dur=1.2, seed=49, **_):
    n = secs(dur); t = t_axis(n); k = secs(0.06); tt = t[:k]
    x = np.zeros(n, np.float32); x[:k] = np.sin(2 * np.pi * (900 + 1600 * np.exp(-tt / 0.01)) * tt) * np.exp(-tt / 0.02)
    return normalize(delay(reverb(stereo(x, 0.2), 2.0, 0.5, seed), 0.21, 0.3, 0.25), -6)


@sfx("HORROR TV / radio static burst", 1.0)
def static(dur=1.0, seed=50, **_):
    n = secs(dur); x = hp(noise(n, seed), 800) * (0.7 + 0.3 * (noise(n, seed + 1) > 0)) * np.minimum(1, np.linspace(0, 8, n))
    return normalize(fade(stereo(x, 0, 0.4), 0.003, 0.05), -8)


@sfx("HORROR wind chime (phong linh) tinkling in a cold breeze", 4.0)
def chime(dur=4.0, seed=51, **_):
    n = secs(dur); out = np.zeros(n, np.float32); r = rng(seed); notes = [84, 88, 91, 93, 96]
    for i in range(int(dur * 3)):
        at = r.random() * (dur - 1.0); k = min(secs(1.6), n - secs(at)); tt = np.arange(k) / SR; f = midi_hz(int(r.choice(notes)))
        place(out, (np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.5) + 0.3 * np.sin(2 * np.pi * f * 2.7 * tt) * np.exp(-tt / 0.15)).astype(np.float32), secs(at), 0.3 + 0.3 * r.random())
    return normalize(reverb(stereo(out, 0, 0.8), 2.4, 0.4, seed), -8)


@sfx("HORROR distant wail / ghostly moan (vowel-shaped, no words)", 3.5)
def wail(dur=3.5, seed=52, pitch=1.0, **_):
    n = secs(dur); t = t_axis(n); u = np.linspace(0, 1, n)
    f = (330 + 60 * np.sin(np.pi * u) - 90 * u + 6 * np.sin(2 * np.pi * 5 * t)) * pitch
    src = osc("saw", f, n) * 0.5 + noise(n, seed) * 0.08
    x = bp(src, 600, 1100) + bp(src, 2200, 2900) * 0.5
    x *= np.sin(np.pi * u) ** 1.2
    return normalize(reverb(stereo(lp(x, 3500), -0.3, 0.4), 3.5, 0.55, seed), -6)


@sfx("HORROR scraping nails / metal drag", 1.8)
def scrape(dur=1.8, seed=53, **_):
    n = secs(dur); u = np.linspace(0, 1, n)
    x = sweep_filter(noise(n, seed), 2500, 5200, q=8, curve=1.0) * (0.6 + 0.4 * np.sin(2 * np.pi * 11 * t_axis(n))) * np.sin(np.pi * u) ** 0.7
    return normalize(reverb(stereo(x, 0.2, 0.3), 1.2, 0.25, seed), -6)


def make(name, **kw):
    if name not in LIB: raise KeyError(f"unknown sfx '{name}'. Available: {', '.join(LIB)}")
    k = {"dur": LIB[name]["dur"], **{a: b for a, b in kw.items() if b is not None}}
    return as_stereo(LIB[name]["fn"](**k)).astype(np.float32)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--list", action="store_true"); ap.add_argument("--demo"); ap.add_argument("--make"); ap.add_argument("--out", default="sfx.wav"); ap.add_argument("--dur", type=float); ap.add_argument("--seed", type=int)
    a = ap.parse_args()
    if a.list or not (a.demo or a.make):
        for k, v in LIB.items(): print(f"{k:11s} {v['dur']:>4.1f}s  {v['desc']}")
    if a.demo:
        os.makedirs(a.demo, exist_ok=True)
        for k in LIB: write_wav(os.path.join(a.demo, f"{k}.wav"), make(k)); print("wrote", k)
    if a.make:
        write_wav(a.out, make(a.make, dur=a.dur, seed=a.seed)); print("wrote", a.out)
