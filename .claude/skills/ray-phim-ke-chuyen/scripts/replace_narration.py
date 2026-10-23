#!/usr/bin/env python3
"""Replace narration in an existing MP4; copy video bitstream without re-encoding.

Voice clips sN.mp3 placed at manifest start_sec. Drops old mixed audio entirely;
optionally mixes a SEPARATE licensed BGM track. The result preserves frames.
"""
from __future__ import annotations
import argparse
import json
import math
from pathlib import Path
import subprocess


def probe(path: Path) -> dict:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(path)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(r.stdout)


def duration(path: Path) -> float:
    p = probe(path)
    d = float(p["format"]["duration"])
    if not math.isfinite(d) or d <= 0:
        raise RuntimeError(f"Cannot measure duration: {path}")
    return d


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", type=Path, required=True)
    ap.add_argument("--manifest", type=Path, required=True)
    ap.add_argument("--audio-dir", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--bgm", type=Path, help="Independent, licensed music file (not the old mixed video audio)")
    ap.add_argument("--bgm-volume", type=float, default=0.12)
    ap.add_argument("--voice-volume", type=float, default=1.0)
    args = ap.parse_args()
    if not (0.0 <= args.bgm_volume <= 1.0 and 0.1 <= args.voice_volume <= 2.0):
        ap.error("--bgm-volume must be 0..1; --voice-volume must be 0.1..2")
    if args.video.resolve() == args.output.resolve():
        ap.error("Never overwrite source MP4; use a new output path")
    scenes = json.loads(args.manifest.read_text(encoding="utf-8"))
    if not isinstance(scenes, list) or not scenes:
        ap.error("Manifest must be a nonempty list")
    total = duration(args.video)
    source = probe(args.video)
    if not any(s.get("codec_type") == "video" for s in source.get("streams", [])):
        ap.error("Source has no video stream")

    names = [int(s["id"]) for s in scenes]
    if len(names) != len(set(names)):
        ap.error("Duplicate scene ids")
    if args.bgm and not args.bgm.is_file():
        ap.error("Separate BGM file not found")
    ff = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-nostdin", "-y", "-i", str(args.video)]
    filters = []
    speech_labels = []
    last_end = -1.0
    for n, scene in enumerate(scenes, start=1):
        start = float(scene["start_sec"])
        slot = float(scene["duration_sec"])
        if not (0 <= start < total and slot > 0 and start + slot <= total + 0.05):
            ap.error(f"Invalid time slot for scene {scene['id']}")
        if start < last_end - 0.05:
            ap.error("Overlapping scene time slots; explicit cross-shot voice not supported")
        last_end = start + slot
        voice = args.audio_dir / f"s{int(scene['id'])}.mp3"
        if not voice.is_file():
            ap.error(f"Missing voice file {voice}")
        spoken = duration(voice)
        if spoken > slot - 0.08:
            ap.error(f"Scene {scene['id']} voice {spoken:.2f}s exceeds {slot:.2f}s slot; adjust wording/timing")
        ff.extend(["-i", str(voice)])
        shift_ms = int(round(start * 1000))
        label = f"a{n}"
        filters.append(
            f"[{n}:a:0]aresample=48000,aformat=channel_layouts=stereo,"
            f"volume={args.voice_volume},adelay={shift_ms}:all=1[{label}]"
        )
        speech_labels.append(f"[{label}]")
    speech_mix = "[narration]"
    filters.append(
        "".join(speech_labels) +
        f"amix=inputs={len(speech_labels)}:duration=longest:dropout_transition=0:normalize=0{speech_mix}"
    )
    if args.bgm:
        ff.extend(["-stream_loop", "-1", "-i", str(args.bgm)])
        idx = len(scenes) + 1
        filters.append(f"[{idx}:a:0]aresample=48000,aformat=channel_layouts=stereo,volume={args.bgm_volume}[music]")
        filters.append("[narration][music]amix=inputs=2:duration=first:normalize=0[mixed]")
        post_in = "[mixed]"
    else:
        post_in = "[narration]"
    # Pad the tail to retain exact video duration, then limit to avoid clipped peaks.
    filters.append(f"{post_in}apad=whole_dur={total:.5f},atrim=0:{total:.5f},alimiter=limit=0.94[aout]")
    ff.extend([
        "-filter_complex", ";".join(filters), "-map", "0:v:0", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-t", f"{total:.5f}", "-movflags", "+faststart", str(args.output),
    ])
    args.output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(ff, check=True)
    print(f"Created {args.output} ({duration(args.output):.2f}s), video stream copied without re-encoding")
    if not args.bgm:
        print("Note: old mixed audio dropped; no separate BGM provided, so final contains new narration only.")


if __name__ == "__main__":
    main()
