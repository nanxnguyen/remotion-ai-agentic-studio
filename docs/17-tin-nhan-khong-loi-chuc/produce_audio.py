#!/usr/bin/env python3
"""Ray Emotional Stick Shorts — original piano, Vbee Batch timing and AV mixing.

Audio is produced from independently generated Vbee Thanh Long Batch MP3 beats
and a new deterministic note-level score. No substitute voice is permitted.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import math
import re
import subprocess
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
STORY = json.loads((ROOT / "story.json").read_text(encoding="utf-8"))
DURATION = float(STORY["durationSeconds"])
FPS = int(STORY["fps"])
VOICES = STORY["beats"]
assert DURATION == 42.5 and FPS == 60 and len(VOICES) == 7


def run(*command: str) -> str:
    return subprocess.check_output(list(command), text=True).strip()


def probe(path: Path) -> dict:
    return json.loads(run("ffprobe", "-v", "error", "-show_format",
                          "-show_streams", "-of", "json", str(path)))


def duration(path: Path) -> float:
    return float(probe(path)["format"]["duration"])


def prepare(target: Path) -> None:
    target.mkdir(parents=True, exist_ok=True)
    for index, beat in enumerate(VOICES):
        (target / f"beat{index}.txt").write_text(beat["text"], encoding="utf-8")
        (target / f"speed{index}.txt").write_text(str(beat["speed"]) + "\n")
    print(f"Prepared {len(VOICES)} separate voice performances.")


def build_piano(path: Path) -> None:
    sr = 32000
    sound = np.zeros(math.ceil(sr * DURATION), dtype=np.float64)

    # Original three-act harmonic design:
    # fragile D minor memory -> sparse A minor realization -> C-major self-care.
    chords = [
        (0.0, [50, 53, 57]), (4.7, [46, 50, 53]), (9.5, [45, 48, 52]),
        (14.4, [43, 46, 50]), (19.5, [45, 48, 52]), (24.0, [50, 53, 57]),
        (28.9, [48, 52, 55]), (33.8, [53, 57, 60]), (38.2, [48, 52, 55]),
    ]

    def note(pitch: int, at: float, length: float, gain: float) -> None:
        begin = round(sr * at)
        if begin >= len(sound):
            return
        count = min(round(sr * length), len(sound) - begin)
        ts = np.arange(count) / sr
        hz = 440 * 2 ** ((pitch - 69) / 12)
        envelope = (1.0 - np.exp(-ts * 70)) * np.exp(-ts * 1.75)
        piano = (0.73 * np.sin(2 * np.pi * hz * ts)
                 + 0.18 * np.sin(2 * np.pi * hz * 2.006 * ts)
                 + 0.055 * np.sin(2 * np.pi * hz * 3.012 * ts))
        sound[begin:begin + count] += gain * envelope * piano

    for index, (at, tones) in enumerate(chords):
        energy = 0.067 if index < 4 else (0.047 if index < 6 else 0.096)
        for j, pick in enumerate((0, 1, 2, 1, 0, 2, 1)):
            note(tones[pick] + 12 + (12 if j == 6 else 0),
                 at + 0.62 * j, 2.65, energy * (0.82 if j % 2 else 1.))
        note(tones[0], at, 3.65, energy * 0.82)
    for at, pitch in [(1.2, 69), (5.1, 65), (11.2, 64),
                      (17.1, 62), (22.3, 60), (29.3, 67),
                      (32.6, 69), (36.8, 72), (40.0, 76)]:
        note(pitch, at, 2.8, 0.037 if at < 29 else 0.075)

    # Subtle room reflection, no unlicensed audio clips.
    for delay, gain in [(0.12, 0.115), (0.27, 0.073), (0.52, 0.042)]:
        samples = round(delay * sr)
        sound[samples:] += sound[:-samples].copy() * gain

    # Hook tension -> middle hush -> hopeful release -> final hold.
    seconds = np.arange(len(sound)) / sr
    dynamics = np.interp(seconds, [0, 2, 8, 15.5, 22, 25, 28.8, 32, 38, 41, DURATION],
                         [0.38, 0.57, 0.66, 0.53, 0.26, 0.12, 0.30, 0.66, 0.79, 0.57, 0.05])
    sound *= dynamics

    # Gentle notification motifs, not 17 loud dings.
    for tick in (0.58, 1.05, 1.67, 2.15, 16.65, 20.60):
        start = round(tick * sr)
        count = round(0.105 * sr)
        ts = np.arange(count) / sr
        click = np.sin(2 * np.pi * 730 * ts) * np.exp(-ts * 52) * 0.011
        sound[start:start + count] += click[:max(0, min(count, len(sound) - start))]

    sound = np.tanh(sound * 2.0) * 0.56
    pcm = (np.clip(sound, -1, 1) * 32767).astype("<i2")
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as audio:
        audio.setnchannels(1)
        audio.setsampwidth(2)
        audio.setframerate(sr)
        audio.writeframes(pcm.tobytes())
    print(f"Original three-act piano score: {path} ({DURATION}s)")


def audio_peak(path: Path) -> float:
    result = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
                             "-af", "volumedetect", "-f", "null", "-"],
                            text=True, capture_output=True, check=True)
    found = re.search(r"max_volume:\s*(-?[0-9.]+) dB", result.stderr)
    if not found:
        raise RuntimeError(f"No audio signal information for {path}")
    peak = float(found.group(1))
    if peak < -36 or peak > 0:
        raise RuntimeError(f"Unexpected source peak of {peak} dB in {path}")
    return peak


def mix(workdir: Path, output: Path) -> None:
    picture = workdir / "picture.mp4"
    music = workdir / "original-piano.wav"
    assert picture.is_file() and music.is_file(), "Picture or original piano not present"
    vp = probe(picture)
    visuals = [stream for stream in vp["streams"] if stream["codec_type"] == "video"]
    if len(visuals) != 1 or visuals[0]["width"] != 1080 or visuals[0]["height"] != 1920:
        raise RuntimeError("Unexpected dimensions")
    if visuals[0]["avg_frame_rate"] != "60/1" or abs(duration(picture) - DURATION) > .06:
        raise RuntimeError("Picture must be original 60 fps and exactly 42.5 seconds")

    starts = [float(b["start"]) for b in VOICES]
    budgets = starts[1:] + [DURATION - 0.18]
    inputs = ["-i", str(picture), "-i", str(music)]
    filters = []
    evidence = []
    for index, (beat, begin, end) in enumerate(zip(VOICES, starts, budgets)):
        file = workdir / f"voice{index}.mp3"
        if not file.is_file():
            raise RuntimeError(f"Missing real Vbee voice beat {index}")
        mp3_duration = duration(file)
        peak = audio_peak(file)
        available = end - begin - 0.08
        if available <= 0:
            raise RuntimeError("Invalid voice start times")
        tempo = max(1, mp3_duration / available)
        if tempo > 1.24:
            raise RuntimeError(
                f"Vbee beat {index+1} {mp3_duration:.2f}s exceeds {available:.2f}s budget; "
                "rewrite this sentence, do not artificially rush narration.")
        inputs += ["-i", str(file)]
        filters.append(f"[{index+2}:a]aresample=48000,atempo={tempo:.6f},"
                       f"adelay={round(begin*1000)}:all=1,volume=1.04[v{index}]")
        evidence.append({
            "beat": index+1, "start": begin, "sourceSeconds": round(mp3_duration, 3),
            "atempo": round(tempo, 3), "peakDb": peak,
            "direction": beat["emotion"], "source": "Vbee Batch Thanh Long"
        })

    filters.append("".join(f"[v{i}]" for i in range(len(VOICES))) +
                   f"amix=inputs={len(VOICES)}:duration=longest:normalize=0[voice]")
    filters.append("[1:a]aresample=48000,volume=0.53[piano]")
    filters.append("[voice]asplit=2[side][spoken]")
    filters.append("[piano][side]sidechaincompress=threshold=0.025:ratio=5:attack=28:release=420[ducked]")
    filters.append("[ducked][spoken]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.92[a]")
    output.parent.mkdir(parents=True, exist_ok=True)
    command = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"] + inputs + [
        "-filter_complex", ";".join(filters),
        "-map", "0:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac",
        "-b:a", "192k", "-t", str(DURATION), "-movflags", "+faststart", str(output)
    ]
    subprocess.run(command, check=True)

    final = probe(output)
    streams = final["streams"]
    kinds = {s["codec_type"] for s in streams}
    measured = float(final["format"]["duration"])
    if not {"video", "audio"}.issubset(kinds):
        raise RuntimeError("Final video is missing a voice/piano audio stream or picture")
    if not 30 <= measured <= 45 or abs(measured - DURATION) > 0.15:
        raise RuntimeError(f"Final duration must be 30-45s; actual={measured}")
    if output.stat().st_size < 500000:
        raise RuntimeError("Final MP4 unexpectedly small")

    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    checksum = output.parent / "SHA256SUMS"
    checksum.write_text(f"{digest}  {output.name}\n", encoding="ascii")
    (output.parent / "AV-QA.json").write_text(json.dumps({
        "status": "technical-pass", "durationSeconds": measured, "width": 1080, "height": 1920,
        "fps": 60, "scenes": 16, "voice": "Vbee Thanh Long Batch",
        "voiceBeats": evidence, "music": "original generated three-act piano",
        "audioPeakValid": True, "visualContinuity": "checked separately",
        "subjectiveListening": "pending independent listener",
        "canonicalIndependentReviewGates": "not fabricated; see HANDOFF.md",
        "publishedToYoutube": False, "sha256": digest, "bytes": output.stat().st_size
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"duration": measured, "sha256": digest, "bytes": output.stat().st_size,
                      "beatDetails": evidence}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    cli = argparse.ArgumentParser()
    cli.add_argument("mode", choices=("prepare", "score", "mix"))
    cli.add_argument("--workdir", type=Path, default=Path("/tmp/17-tin-nhan"))
    cli.add_argument("--out", type=Path)
    args = cli.parse_args()
    if args.mode == "prepare":
        prepare(args.workdir)
    elif args.mode == "score":
        build_piano(args.out or args.workdir / "original-piano.wav")
    else:
        mix(args.workdir, args.out or ROOT / "final" / STORY["videoFile"])
