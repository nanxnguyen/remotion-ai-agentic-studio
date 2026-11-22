"""audio/dsp.py — tiny synthesis/DSP toolkit (numpy + scipy). 48 kHz stereo float32 everywhere."""
import numpy as np
from scipy import signal

SR = 48000


def secs(n): return int(round(n * SR))
def t_axis(n): return np.arange(n) / SR
def rng(seed): return np.random.default_rng(seed)
def db(x): return 10 ** (x / 20)


def noise(n, seed=0, color="white"):
    x = rng(seed).standard_normal(n).astype(np.float32)
    if color == "pink":
        b, a = [0.049922035, -0.095993537, 0.050612699, -0.004408786], [1, -2.494956002, 2.017265875, -0.522189400]
        x = signal.lfilter(b, a, x).astype(np.float32) * 4
    elif color == "brown":
        x = np.cumsum(x).astype(np.float32); x = signal.sosfilt(signal.butter(1, 25, "highpass", fs=SR, output="sos"), x).astype(np.float32); x = x / (np.abs(x).max() + 1e-9)
    return x


def _sos(kind, f, order=2):
    f = np.clip(np.atleast_1d(f), 10, SR / 2 - 100)
    return signal.butter(order, f if len(f) > 1 else f[0], btype=kind, fs=SR, output="sos")


def lp(x, f, order=2): return signal.sosfilt(_sos("lowpass", f, order), x, axis=0).astype(np.float32)
def hp(x, f, order=2): return signal.sosfilt(_sos("highpass", f, order), x, axis=0).astype(np.float32)
def bp(x, lo, hi, order=2): return signal.sosfilt(_sos("bandpass", [lo, hi], order), x, axis=0).astype(np.float32)


def sweep_filter(x, f0, f1, q=1.2, kind="bp", curve=1.0):
    """time-varying state-variable filter (cutoff glides f0 -> f1). Works block-wise for speed."""
    n = len(x); out = np.zeros_like(x); blk = 256
    low = band = 0.0
    for i in range(0, n, blk):
        u = (i / max(1, n - 1)) ** curve
        fc = f0 * (f1 / f0) ** u
        f = 2 * np.sin(np.pi * min(fc, SR / 6) / SR); damp = 1 / q
        seg = x[i:i + blk]; o = np.empty_like(seg)
        for k, s in enumerate(seg):
            low += f * band; high = s - low - damp * band; band += f * high
            o[k] = band if kind == "bp" else low if kind == "lp" else high
        out[i:i + blk] = o
    return out


def env_adsr(n, a=0.01, d=0.1, s=0.0, r=0.1, curve=4.0):
    t = t_axis(n); e = np.zeros(n, np.float32)
    A, D = a, a + d
    e[t < A] = (t[t < A] / max(a, 1e-6))
    m = (t >= A) & (t < D); e[m] = 1 - (1 - s) * (1 - np.exp(-curve * (t[m] - A) / max(d, 1e-6))) / (1 - np.exp(-curve))
    rel_start = n / SR - r
    m2 = t >= D; e[m2] = s
    m3 = t >= rel_start; e[m3] = e[m3] * np.clip((n / SR - t[m3]) / max(r, 1e-6), 0, 1)
    return e


def expdec(n, tau): return np.exp(-t_axis(n) / tau).astype(np.float32)


def sine(freq, n, phase=0.0):
    f = np.broadcast_to(np.asarray(freq, dtype=np.float64), (n,))
    ph = 2 * np.pi * np.cumsum(f) / SR + phase
    return np.sin(ph).astype(np.float32)


_tables = {}
def wavetable(kind, harmonics):
    key = (kind, harmonics)
    if key not in _tables:
        N = 4096; ph = np.arange(N) / N; w = np.zeros(N)
        for h in range(1, harmonics + 1):
            if kind == "saw": w += np.sin(2 * np.pi * h * ph) / h
            elif kind == "square" and h % 2: w += np.sin(2 * np.pi * h * ph) / h
            elif kind == "tri" and h % 2: w += ((-1) ** ((h - 1) // 2)) * np.sin(2 * np.pi * h * ph) / h ** 2
        _tables[key] = (w / np.abs(w).max()).astype(np.float32)
    return _tables[key]


def osc(kind, freq, n, phase=0.0):
    if kind == "sine": return sine(freq, n, phase)
    fmax = float(np.max(freq))
    harm = max(1, min(60, int((SR / 2 * 0.9) / max(fmax, 20))))
    tab = wavetable(kind, harm)
    f = np.broadcast_to(np.asarray(freq, dtype=np.float64), (n,))
    ph = (np.cumsum(f) / SR + phase / (2 * np.pi)) % 1.0
    return tab[(ph * len(tab)).astype(np.int64) % len(tab)]


def midi_hz(m): return 440.0 * 2 ** ((m - 69) / 12)


def stereo(x, pan=0.0, width=0.0, seed=0):
    """mono -> stereo with constant-power pan and optional decorrelated width (short delay)."""
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    if width > 0:
        d = int(SR * 0.011 * width)
        xr = np.concatenate([np.zeros(d, np.float32), x[:-d]]) if d > 0 else x
        return np.stack([x * l * np.sqrt(2), (x * (1 - width) + xr * width) * r * np.sqrt(2)], axis=1).astype(np.float32)
    return np.stack([x * l * np.sqrt(2), x * r * np.sqrt(2)], axis=1).astype(np.float32)


def as_stereo(x): return x if x.ndim == 2 else stereo(x)


_irs = {}
def reverb(x, size=2.0, wet=0.25, seed=7, damp=5000):
    key = (size, seed, damp)
    if key not in _irs:
        n = secs(size); r = rng(seed)
        ir = r.standard_normal((n, 2)).astype(np.float32) * np.exp(-np.arange(n) / SR * 6.9 / size)[:, None]
        ir = lp(ir, damp); ir[: secs(0.012)] *= np.linspace(0, 1, secs(0.012))[:, None]
        _irs[key] = ir / np.sqrt((ir ** 2).sum(axis=0, keepdims=True)) * 0.5
    ir = _irs[key]; x = as_stereo(x)
    y = np.stack([signal.oaconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], axis=1)
    return (x * (1 - wet) + y * wet * 2).astype(np.float32)


def delay(x, time=0.3, fb=0.35, wet=0.3, pingpong=True):
    x = as_stereo(x); d = secs(time); x = np.concatenate([x, np.zeros((d * 6, 2), np.float32)]); y = x.copy(); tap = x.copy()
    for k in range(8):
        tap = np.concatenate([np.zeros((d, 2), np.float32), tap[:-d]]) * (fb if k else 1.0)
        if pingpong: tap = tap[:, ::-1]
        y += tap * wet
        if np.abs(tap).max() < 1e-4: break
    return y.astype(np.float32)


def fade(x, fin=0.005, fout=0.02):
    x = x.copy(); a, b = secs(fin), secs(fout)
    if a: x[:a] *= np.linspace(0, 1, a)[:, None] if x.ndim == 2 else np.linspace(0, 1, a)
    if b: x[-b:] *= np.linspace(1, 0, b)[:, None] if x.ndim == 2 else np.linspace(1, 0, b)
    return x


def normalize(x, peak_db=-1.0):
    m = np.abs(x).max(); return (x / m * db(peak_db)).astype(np.float32) if m > 0 else x


def rms_db(x):
    v = np.sqrt(np.mean(np.square(x, dtype=np.float64))); return 20 * np.log10(v + 1e-12)


def place(dst, src, at, gain=1.0):
    """add src into dst starting at sample `at` (clipped to bounds)."""
    if at >= len(dst) or at + len(src) <= 0: return
    s0 = max(0, -at); d0 = max(0, at); n = min(len(src) - s0, len(dst) - d0)
    dst[d0:d0 + n] += src[s0:s0 + n] * gain


def write_wav(path, x):
    from scipy.io import wavfile
    x = np.clip(as_stereo(x), -1, 1)
    wavfile.write(path, SR, (x * 32767).astype(np.int16))
