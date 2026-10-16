#!/usr/bin/env python3
"""Clone a reference voice with VieNeu-TTS v3 Turbo (local, CPU) and build one mp3 per shot, ASR-verified.

Usage: HF_HUB_DISABLE_IMPLICIT_TOKEN=1 ~/.venvs/vieneu/bin/python -I scripts/gen-voice-clone.py <video_id> \
         --ref docs/<video_id>/voice-ref/refA.wav [--json FILE] [--out-dir DIR] [--force] [--tries 6] [--max-cer 0.08]
Input JSON: same shape as gen-voice-expressive.py: {"s1": "text"} or {"s1": [{"t", "pause_after", optional "rate"}, ...]}.
  rate <= -10% is applied as a gentle ffmpeg atempo slow-down (expressive "read slowly" lines only);
  other rate/pitch/vol fields are ignored (pace and timbre come from the reference clip).
A phrase may pin "seed": N (e.g. after checking it with a larger ASR model); otherwise every phrase is transcribed with faster-whisper; a phrase whose character error rate exceeds --max-cer is
regenerated with a new seed. Writes docs/<video_id>/voice-clone-asr.md (per-phrase CER table).
Setup (once): python3 -m venv ~/.venvs/vieneu && ~/.venvs/vieneu/bin/pip install vieneu faster-whisper
  Models are downloaded to real directories (~/.venvs/vieneu-models) because onnxruntime refuses
  external .data files reached through the Hugging Face cache symlinks.
"""
import json
import math
import re
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

import numpy as np

MODELS = Path.home() / ".venvs" / "vieneu-models"
TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
POST = (
    "highpass=f=70,equalizer=f=180:t=q:w=1:g=1.5,"
    "acompressor=threshold=-22dB:ratio=2.5:attack=15:release=200,"
    "loudnorm=I=-16:TP=-1.5:LRA=9"
)


def opt(name: str, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


vid = sys.argv[1]
root = Path(__file__).resolve().parent.parent
ref = str(root / opt("--ref"))
lines = json.loads(Path(opt("--json", root / "docs" / vid / "voice-expressive.json")).read_text(encoding="utf-8"))
out = Path(opt("--out-dir", root / "public" / "audio" / vid))
out.mkdir(parents=True, exist_ok=True)
force, tries, max_cer = "--force" in sys.argv, int(opt("--tries", 6)), float(opt("--max-cer", 0.08))


def fetch_models() -> None:
    from huggingface_hub import snapshot_download
    snapshot_download("pnnbao-ump/VieNeu-TTS-v3-Turbo", allow_patterns=["onnx_update/*"], local_dir=str(MODELS / "v3turbo"))
    snapshot_download("OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX", local_dir=str(MODELS / "moss-codec"))


def load_tts():
    import vieneu._v3_turbo_engine.onnx_runtime_lite as lite
    from vieneu import Vieneu
    orig = lite.OnnxV3LiteEngine.__init__

    def init(self, *a, **k):  # Vieneu() does not forward codec_dir; point it at the real directory
        k.setdefault("codec_dir", str(MODELS / "moss-codec"))
        orig(self, *a, **k)

    lite.OnnxV3LiteEngine.__init__ = init
    return Vieneu(onnx_dir=str(MODELS / "v3turbo" / "onnx_update"))


def ff(*a: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *a], check=True)


def pcm16k(p: Path) -> np.ndarray:
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32)


def norm(t: str) -> str:
    t = unicodedata.normalize("NFC", t.lower())
    return re.sub(r"[^\w]+", " ", t).strip()


def cer(a: str, b: str) -> float:
    a, b = norm(a), norm(b)
    d = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        prev, d[0] = d[0], i
        for j, cb in enumerate(b, 1):
            prev, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, prev + (ca != cb))
    return d[len(b)] / max(1, len(a))


def seconds(p: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                       capture_output=True, text=True, check=True)
    return float(r.stdout)


def main() -> None:
    fetch_models()
    tts = load_tts()
    from faster_whisper import WhisperModel
    asr = WhisperModel("small", device="cpu", compute_type="int8")
    report = ["| clip | phrase | seed | CER | ASR |", "|---|---|---|---|---|"]
    for key, segs in lines.items():
        dest = out / f"{key}.mp3"
        if dest.exists() and dest.stat().st_size > 0 and not force:
            continue
        segs = [{"t": s} if isinstance(s, str) else dict(s) for s in (segs if isinstance(segs, list) else [segs])]
        with tempfile.TemporaryDirectory() as td:
            tmp, parts = Path(td), []
            for i, s in enumerate(segs):
                text = s["t"].replace("“", "").replace("”", "").replace("…", "...")
                best = None
                for seed in ([s['seed']] if 'seed' in s else []) + list(range(tries)):  # optional pinned seed (verified by ear / larger ASR)
                    np.random.seed(seed)
                    raw = tmp / f"{i}-{seed}.wav"
                    tts.save(tts.infer(text, ref_audio=ref, denoise=False), str(raw))
                    heard = " ".join(x.text for x in asr.transcribe(pcm16k(raw), language="vi")[0]).strip()
                    c = cer(text, heard)
                    if best is None or c < best[0]:
                        best = (c, seed, raw, heard)
                    if c <= max_cer or 'seed' in s:  # a pinned seed is accepted as-is
                        break
                c, seed, raw, heard = best
                report.append(f"| {key} | {text} | {seed} | {c:.3f}{' ⚠' if c > max_cer else ''} | {heard} |")
                print(f"{key}[{i}] seed={seed} CER={c:.3f} :: {heard}")
                rate = int(str(s.get("rate", "+0%"))[:-1])
                tempo = f",atempo={1 + rate / 100:.2f}" if rate <= -10 else ""
                pa = 0.0 if i == len(segs) - 1 else float(s.get("pause_after", 0.3))
                wav = tmp / f"{i}.wav"
                ff("-i", str(raw), "-af", f"{TRIM}{tempo},adelay={int(float(s.get('pause_before', 0)) * 1000)}:all=1,apad=pad_dur={pa}",
                   "-ar", "24000", "-ac", "1", str(wav))
                parts.append(wav)
            lst = tmp / "list.txt"
            lst.write_text("".join(f"file '{p}'\n" for p in parts))
            joined = tmp / "joined.wav"
            ff("-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(joined))
            ff("-i", str(joined), "-af", POST, "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "96k", str(dest))
    if len(report) > 2:
        rp = root / "docs" / vid / "voice-clone-asr.md"
        keep = []  # rows of clips not regenerated this run (so the table always covers every clip)
        if rp.exists():
            done = {r.split("|")[1].strip() for r in report[2:]}
            keep = [r for r in rp.read_text(encoding="utf-8").splitlines() if r.startswith("| ") and r.split("|")[1].strip() not in done and r.split("|")[1].strip() not in ("clip", "---")]
        rows = sorted(keep + report[2:], key=lambda r: int(re.sub(r"\D", "", r.split("|")[1]) or 0))
        rp.write_text(
            f"# Voice clone ASR check ({vid})\n\nRef: `{opt('--ref')}`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.\n\n"
            + "\n".join(report[:2] + rows) + "\n", encoding="utf-8")
    start, keys = 0, list(lines)
    for i, k in enumerate(keys):
        d = seconds(out / f"{k}.mp3")
        frames = math.ceil((d + (1.4 if i == len(keys) - 1 else 0.5)) * 30)
        print(f"{k}: {d:.2f}s  from={start}  duration={frames}")
        start += frames
    print(f"TOTAL frames={start}  seconds={start / 30:.1f}")


main()
