#!/usr/bin/env python3
"""Auditable, credential-free long-form stick-figure rendering support.

validate: validate the creative manifest BEFORE spending runner minutes.
audio: generate a deterministic ORIGINAL five-phase instrumental bed/SFX.
qa: verify the ACTUAL 210-second encoded 2K movie and save scene evidence.
This is objective QA only: never impersonates independent semantic film review.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import struct
import subprocess
import sys
import wave
from pathlib import Path

FPS = 30
FRAMES_PER_SHOT = 175
EXPECTED_SHOTS = 36
EXPECTED_FRAMES = FPS * 210
WIDTH, HEIGHT = 2560, 1440
SCENES = {"city", "stairs", "workshop", "bridge", "dawn"}
ACTIONS = {"walk", "run", "stumble", "reach", "repair", "help", "rise", "pause"}
PALETTES = {"cold", "warm", "hope"}


def manifest(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data.get("title"), str) or not 8 <= len(data["title"].strip()) <= 100:
        raise ValueError("A nonempty, truthful English title is required")
    if not isinstance(data.get("shots"), list) or len(data["shots"]) != EXPECTED_SHOTS:
        raise ValueError("Exactly 36 timed shots are required for the 210s composition")
    ids = set()
    caption_count = 0
    for i, shot in enumerate(data["shots"]):
        if not isinstance(shot, dict):
            raise ValueError(f"shot {i} is not an object")
        sid = shot.get("id")
        if not isinstance(sid, str) or not re.fullmatch(r"shot-[0-9]{2}", sid) or sid in ids:
            raise ValueError(f"invalid/duplicate shot id: {sid!r}")
        ids.add(sid)
        if shot.get("action") not in ACTIONS or shot.get("scene") not in SCENES:
            raise ValueError(f"invalid scene/action for {sid}")
        caption, highlight = shot.get("caption"), shot.get("highlight")
        if not isinstance(caption, str) or not 5 <= len(caption) <= 100 or "\n" in caption:
            raise ValueError(f"invalid English micro-caption for {sid}")
        if not isinstance(highlight, str) or not highlight.strip() or highlight.casefold() not in caption.casefold():
            raise ValueError(f"highlight is not a literal part of caption in {sid}")
        if shot.get("palette", "cold") not in PALETTES:
            raise ValueError(f"invalid highlight palette in {sid}")
    revision = data.get("revision", 0)
    if isinstance(revision, bool) or not isinstance(revision, int) or not 0 <= revision <= 5:
        raise ValueError("revision must be integer 0..5 (baseline plus five real fixes)")
    return data


def create_original_audio(path: Path) -> None:
    """Purely generated synthesis, no third-party samples or copyrighted tracks."""
    path.parent.mkdir(parents=True, exist_ok=True)
    sample_rate = 24000
    duration = 210
    # Five emotional sections; each has a new minor/major progression.
    chords = [
        (174.61, 207.65, 261.63),    # F minor tension
        (196.00, 233.08, 293.66),    # G minor effort
        (174.61, 220.00, 261.63),    # F major-ish realization
        (220.00, 261.63, 329.63),    # A minor turning point
        (261.63, 329.63, 392.00),    # C major hope
    ]
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        chunk = bytearray()
        for n in range(sample_rate * duration):
            t = n / sample_rate
            section = min(4, int(t // 42))
            frequencies = chords[section]
            phase = (t % 42) / 42
            envelope = max(0.0, min(1.0, t / 2.0, (duration - t) / 3.0))
            # Frame-exact, layered pad and arpeggio; original synthesis.
            pad = (
                0.23 * math.sin(2 * math.pi * frequencies[0] * t + 0.16 * math.sin(t * 0.7))
                + 0.15 * math.sin(2 * math.pi * frequencies[1] * t)
                + 0.13 * math.sin(2 * math.pi * frequencies[2] * t)
                + 0.10 * math.sin(2 * math.pi * frequencies[0] * 0.5 * t)
            )
            # Sparse animated-pluck motif, changing notes by visual beat.
            note = frequencies[int(t * 1.17) % 3] * 2
            pulse = math.exp(-8 * ((t * 1.17) % 1))
            pluck = 0.07 * pulse * math.sin(2 * math.pi * note * t)
            # Soft story-motivated step/wood taps, no imported recordings.
            hit_phase = t % (175 / FPS)
            tap = 0.05 * math.exp(-37 * hit_phase) * math.sin(2 * math.pi * 82 * hit_phase)
            section_dynamic = 0.5 + 0.18 * math.sin(phase * math.pi)
            sample = (pad * section_dynamic + pluck + tap) * envelope
            v = int(max(-1, min(1, sample)) * 19000)
            chunk += struct.pack("<h", v)
            if len(chunk) >= 65536:
                wav.writeframesraw(chunk)
                chunk.clear()
        if chunk:
            wav.writeframesraw(chunk)
        wav.writeframes(b"")


def run(command: list[str], *, capture: bool = False) -> subprocess.CompletedProcess[str]:
    p = subprocess.run(command, text=True, capture_output=capture, check=False)
    if p.returncode:
        raise RuntimeError(f"{command[0]} exit={p.returncode}: {(p.stderr or '')[-1300:]}")
    return p


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(4 * 1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def quality_assurance(movie: Path, data: dict, report_path: Path, sheet: Path) -> dict:
    raw = run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(movie)], capture=True)
    streams = json.loads(raw.stdout)
    v = next(x for x in streams["streams"] if x["codec_type"] == "video")
    a = next(x for x in streams["streams"] if x["codec_type"] == "audio")
    seconds = float(streams["format"]["duration"])
    fps = v["avg_frame_rate"]
    n, d = [int(x) for x in fps.split("/")]
    if (v["width"], v["height"]) != (WIDTH, HEIGHT) or abs(n / d - FPS) > 0.01:
        raise RuntimeError("Expected native 2560x1440 at exactly 30 FPS")
    if not 209.9 <= seconds <= 210.3:
        raise RuntimeError(f"Expected 210-second movie, got {seconds:.3f}")
    if v["codec_name"] != "h264" or a["codec_name"] != "aac":
        raise RuntimeError("Video must contain H.264 + AAC")
    # Decode ALL frames, not a 2-second preview or metadata-only probe.
    run(["ffmpeg", "-hide_banner", "-nostdin", "-v", "error", "-xerror", "-i", str(movie),
         "-map", "0:v:0", "-f", "null", "-"])
    run(["ffmpeg", "-hide_banner", "-nostdin", "-v", "error", "-xerror", "-i", str(movie),
         "-map", "0:a:0", "-f", "null", "-"])
    sheet.parent.mkdir(parents=True, exist_ok=True)
    # One actual encoded image from the middle of every 175-frame shot.
    run(["ffmpeg", "-y", "-hide_banner", "-nostdin", "-v", "error", "-i", str(movie),
         "-vf", "select='eq(mod(n-87\\,175)\\,0)',scale=320:180,tile=6x6",
         "-frames:v", "1", "-update", "1", str(sheet)])
    if not sheet.is_file() or not sheet.stat().st_size:
        raise RuntimeError("Actual-encoded 36-shot contact sheet missing")
    # Integrated loudness is measured rather than assumed from synthesis.
    meter = run(["ffmpeg", "-hide_banner", "-nostdin", "-i", str(movie), "-filter_complex",
                 "ebur128=peak=true", "-f", "null", "-"], capture=True)
    last = meter.stderr.rsplit("Summary:", 1)[-1]
    match = re.search(r"I:\s*(-?\d+(?:\.\d+)?) LUFS", last)
    loudness = float(match.group(1)) if match else None
    evidence = {
        "status": "TECHNICAL_QA_PASSED_CREATIVE_REVIEW_PENDING",
        "movie_sha256": sha256(movie),
        "movie_bytes": movie.stat().st_size,
        "fps": n / d,
        "width": v["width"], "height": v["height"],
        "duration_seconds": seconds,
        "video_codec": v["codec_name"], "audio_codec": a["codec_name"],
        "shots": len(data["shots"]),
        "expected_total_frames": EXPECTED_FRAMES,
        "caption_highlights_supplied": len(data["shots"]),
        "all_video_frames_decoded": True,
        "all_audio_decoded": True,
        "integrated_lufs": loudness,
        "contact_sheet": str(sheet),
        "creative_independent_review_complete": False,
        "creative_qa_passed": False,
        "video_final_certified": False,
        "upload_authorized": False,
        "notes": "A technical QA report does not certify storytelling, copyright or independent full-film semantic viewing."
    }
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(evidence, indent=2) + "\n", encoding="utf-8")
    return evidence


def main() -> None:
    cli = argparse.ArgumentParser()
    cli.add_argument("operation", choices=["validate", "audio", "qa"])
    cli.add_argument("--manifest", type=Path)
    cli.add_argument("--out", type=Path)
    cli.add_argument("--movie", type=Path)
    cli.add_argument("--report", type=Path)
    cli.add_argument("--sheet", type=Path)
    args = cli.parse_args()
    if args.operation == "validate":
        if not args.manifest:
            cli.error("validate requires --manifest")
        doc = manifest(args.manifest)
        print(json.dumps({"status": "validated", "title": doc["title"],
                          "shots": len(doc["shots"]), "seconds": 210, "revision": doc.get("revision", 0)}))
    elif args.operation == "audio":
        if not args.out:
            cli.error("audio requires --out")
        create_original_audio(args.out)
        print(json.dumps({"audio": str(args.out), "bytes": args.out.stat().st_size, "copyright": "original synthesis"}))
    else:
        if not all([args.manifest, args.movie, args.report, args.sheet]):
            cli.error("qa requires --manifest, --movie, --report and --sheet")
        print(json.dumps(quality_assurance(args.movie, manifest(args.manifest), args.report, args.sheet), indent=2))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, RuntimeError, OSError, KeyError, StopIteration) as exc:
        print(f"SILENT_FACTORY_EXECUTOR_BLOCKED: {type(exc).__name__}: {exc}", file=sys.stderr)
        sys.exit(1)
