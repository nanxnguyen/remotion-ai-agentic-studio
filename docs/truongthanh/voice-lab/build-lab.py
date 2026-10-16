#!/usr/bin/env python3
"""Rebuild the voice-lab: per-shot clips in shots/<variant>/sN.mp3, joined <variant>.mp3, metrics.json.

Run with a python that has edge-tts (+ librosa/numpy/soundfile for pitch metrics):
  python build-lab.py [--piper-python PY --piper-model ONNX --piper-data DIR]
Piper is optional (needs its own venv: piper-tts==1.3.0, see README). macOS `say -v Linh` is used if present.
"""
import json, re, subprocess, sys, tempfile
from pathlib import Path

lab = Path(__file__).resolve().parent
root = lab.parent.parent.parent
voice = json.loads((lab.parent / "voice.json").read_text(encoding="utf-8"))
gen = root / "scripts" / "gen-voice-expressive.py"
GAP = 0.5  # same inter-shot padding gen-voice.py uses
A = lambda k, v: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else v
sh = lambda *c: subprocess.run(c, check=True)
ff = lambda *a: sh("ffmpeg", "-v", "error", "-y", *a)


def edge(name, json_path, *extra):
    d = lab / "shots" / name
    sh(sys.executable, "-I", str(gen), "x", "--json", str(json_path), "--out-dir", str(d), "--force", *extra)


def join(name):
    d = lab / "shots" / name
    with tempfile.TemporaryDirectory() as td:
        lst = []
        for k in voice:
            p = Path(td) / f"{k}.wav"
            ff("-i", str(d / f"{k}.mp3"), "-af", f"apad=pad_dur={GAP}", "-ar", "24000", "-ac", "1", str(p))
            lst.append(f"file '{p}'\n")
        (Path(td) / "l.txt").write_text("".join(lst))
        ff("-f", "concat", "-safe", "0", "-i", str(Path(td) / "l.txt"), "-c:a", "libmp3lame", "-b:a", "64k", str(lab / f"{name}.mp3"))


def to_mp3(src, dst):
    ff("-i", str(src), "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "64k", str(dst))


variants = {}
flat = lab / "flat.json"
flat.write_text(json.dumps({k: [{"t": t, "rate": "+4%"}] for k, t in voice.items()}, ensure_ascii=False), encoding="utf-8")
edge("a-flat", flat); variants["a-flat"] = "edge HoaiMy rate +4% (= gen-voice.py default)"
edge("b-expressive", lab / "expressive.json"); variants["b-expressive"] = "edge HoaiMy per-phrase prosody + silences"
edge("b-expressive-tight", lab / "expressive.json", "--rate-shift", "8", "--pause-scale", "0.55"); variants["b-expressive-tight"] = "b-expressive with rate +8pt, pauses x0.55 (fits ~58s)"
edge("b-expressive-tight-fx", lab / "expressive.json", "--rate-shift", "8", "--pause-scale", "0.55", "--post"); variants["b-expressive-tight-fx"] = "b-expressive-tight + ffmpeg polish"
edge("b-expressive-fx", lab / "expressive.json", "--post"); variants["b-expressive-fx"] = "b-expressive + ffmpeg warm EQ/comp/reverb/loudnorm"

if "--piper-python" in sys.argv:
    d = lab / "shots" / "c-piper-vais1000"; d.mkdir(parents=True, exist_ok=True)
    for k, t in voice.items():
        with tempfile.TemporaryDirectory() as td:
            w = Path(td) / "p.wav"
            sh(A("--piper-python", ""), "-c",
               "import sys,wave;from piper import PiperVoice;v=PiperVoice.load(sys.argv[1],espeak_data_dir=sys.argv[3]);"
               "w=wave.open(sys.argv[2],'wb');v.synthesize_wav(sys.argv[4],w);w.close()",
               A("--piper-model", ""), str(w), A("--piper-data", ""), t)
            to_mp3(w, d / f"{k}.mp3")
    variants["c-piper-vais1000"] = "Piper vi_VN-vais1000-medium (offline, CPU)"

if subprocess.run("say -v '?' | grep -q '^Linh'", shell=True).returncode == 0:
    d = lab / "shots" / "d-macos-linh"; d.mkdir(parents=True, exist_ok=True)
    for k, t in voice.items():
        with tempfile.TemporaryDirectory() as td:
            a = Path(td) / "l.aiff"
            sh("say", "-v", "Linh", "-r", "170", "-o", str(a), t)
            to_mp3(a, d / f"{k}.mp3")
    variants["d-macos-linh"] = "macOS say -v Linh -r 170"


# ---- metrics ----
def dur(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                                capture_output=True, text=True, check=True).stdout)


def pauses(p):
    r = subprocess.run(["ffmpeg", "-v", "info", "-i", str(p), "-af", "silencedetect=n=-35dB:d=0.3", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    return [float(x) for x in re.findall(r"silence_duration: ([\d.]+)", r)]


def pitch(p):
    try:
        import librosa, numpy as np
    except ImportError:
        return None
    y, sr = librosa.load(str(p), sr=16000)
    f0, _, _ = librosa.pyin(y, fmin=70, fmax=400, sr=sr)
    f = f0[~np.isnan(f0)]
    if len(f) < 10:
        return None
    st = 12 * np.log2(f / np.median(f))
    return {"median_hz": round(float(np.median(f)), 1),
            "range_p5_p95_semitones": round(float(np.percentile(st, 95) - np.percentile(st, 5)), 2),
            "std_semitones": round(float(np.std(st)), 2)}


words = sum(len(t.split()) for t in voice.values())
metrics = {}
for name, desc in variants.items():
    join(name)
    f = lab / f"{name}.mp3"
    shots = [dur(lab / "shots" / name / f"{k}.mp3") for k in voice]
    # per shot file, so the fixed 0.5s inter-shot padding is not counted; trailing/leading silence is
    inner = [x for k in voice for x in pauses(lab / "shots" / name / f"{k}.mp3")]
    metrics[name] = {"desc": desc, "total_s": round(dur(f), 2), "shots_s": [round(x, 2) for x in shots],
                     "speech_s": round(sum(shots), 2), "words_per_s": round(words / sum(shots), 2),
                     "pauses_ge_0.3s": len(inner), "pause_total_s": round(sum(inner), 2),
                     "pause_max_s": round(max(inner), 2) if inner else 0, "pitch": pitch(f)}
    print(name, json.dumps(metrics[name], ensure_ascii=False))
(lab / "metrics.json").write_text(json.dumps(metrics, ensure_ascii=False, indent=1), encoding="utf-8")
