#!/usr/bin/env python3
"""Generate verified Thanh Long narration and add it to the 37s *preview*.

This is not a substitute for the required Remotion pipeline/gates.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

SLUG = "bat-dau-lai-sau-moi-quan-he-dai"
REFERENCE = "docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav"
EXPECTED_MD5 = "199de31c8281d895dd571e36fe464ed5"
STARTS = (0, 6, 11.5, 17.5, 23.5, 29.5)
LENGTH = 37.0
END_HOLD = 1.5


def run(*args: str, cwd: Path | None = None, capture: bool = False) -> str:
    result = subprocess.run(args, cwd=cwd, check=True, text=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else ""


def duration(path: Path) -> float:
    return float(run("ffprobe", "-v", "error", "-show_entries",
                     "format=duration", "-of", "default=nw=1:nk=1",
                     str(path), capture=True))


def verify_reference(path: Path) -> None:
    if not path.is_file():
        raise FileNotFoundError(f"Missing private voice reference: {path}")
    digest = hashlib.md5(path.read_bytes()).hexdigest()
    if digest != EXPECTED_MD5:
        raise RuntimeError(f"Voice reference MD5 mismatch: {digest}")


def slots(durations: list[float]) -> list[dict[str, float | str]]:
    if len(durations) != len(STARTS):
        raise ValueError("Exactly six distinct voice clips are required")
    result = []
    for i, (start, length) in enumerate(zip(STARTS, durations)):
        end = STARTS[i + 1] if i < 5 else LENGTH - END_HOLD
        if not 0 < length <= end - start - .1:
            raise ValueError(f"s{i+1} speech {length:.3f}s exceeds preview slot "
                             f"{end-start:.3f}s; retime native Remotion visuals, NEVER cut/stretch audio")
        result.append({"shot": f"s{i+1}", "start": start, "seconds": length})
    return result


def mix(video: Path, clips: list[Path], output: Path) -> None:
    graph = ["[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.16[bg]"]
    for i, start in enumerate(STARTS):
        graph.append(f"[{i+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,"
                     f"loudnorm=I=-16.5:TP=-2:LRA=11,adelay={round(start*1000)}:all=1[v{i}]")
    graph.append("".join(f"[v{i}]" for i in range(6)) +
                 "amix=inputs=6:duration=longest:normalize=0[vo]")
    graph.append("[bg][vo]amix=inputs=2:duration=first:normalize=0,"
                 "alimiter=limit=0.84[out]")
    output.parent.mkdir(parents=True, exist_ok=True)
    temp = output.with_name(output.stem + ".partial.mp4")
    try:
        command = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(video)]
        for clip in clips:
            command.extend(["-i", str(clip)])
        command += ["-filter_complex", ";".join(graph), "-map", "0:v:0",
                    "-map", "[out]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                    "-t", str(LENGTH), "-movflags", "+faststart", str(temp)]
        run(*command)
        if temp.stat().st_size < 50000 or not 36.9 <= duration(temp) <= 37.2:
            raise RuntimeError("Output MP4 verification failed")
        temp.replace(output)
    finally:
        temp.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("--video", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path(SLUG + "-thanh-long-nang-cao-voiced-preview.mp4"))
    parser.add_argument("--python", default=sys.executable)
    parser.add_argument("--preflight", action="store_true")
    args = parser.parse_args()
    repo, video = args.repo.resolve(), args.video.resolve()
    for tool in ("ffprobe", "ffmpeg"):
        if not shutil.which(tool):
            raise RuntimeError(f"Missing {tool}")
    if not (repo / "scripts/gen-voice-clone.py").is_file():
        raise RuntimeError("Source repository gen-voice-clone.py is missing")
    if not video.is_file() or not 36.9 <= duration(video) <= 37.2:
        raise RuntimeError("Expected existing 37-second visual preview MP4")
    ref = repo / REFERENCE
    verify_reference(ref)
    canonical = repo / "docs" / SLUG / "voice.json"
    performance = repo / "docs" / SLUG / "voice-performance.json"
    if not canonical.is_file() or not performance.is_file():
        raise RuntimeError("Voice manifests are missing (checkout this PR branch)")
    canonical_data = json.loads(canonical.read_text(encoding="utf-8"))
    plan = json.loads(performance.read_text(encoding="utf-8"))["shots"]
    if tuple(canonical_data) != tuple(f"s{i}" for i in range(1, 7)):
        raise RuntimeError("Unexpected voice keys/order")
    if any(" ".join(part["text"] for part in plan[key]["phrases"]) != value
           for key, value in canonical_data.items()):
        raise RuntimeError("Voice plan does not match canonical text")
    print("Reference MD5 verified; 6-script manifest verified")
    if args.preflight:
        return 0
    run(str(Path(args.python).expanduser()), "-c",
        "import vieneu, faster_whisper, huggingface_hub", cwd=repo)
    run(str(Path(args.python).expanduser()),
        str(repo / "scripts/gen-voice-clone.py"), SLUG,
        "--ref", str(ref), "--json", str(canonical),
        "--performance", str(performance), "--max-cer", "0.04", cwd=repo)
    folder = repo / "public/audio" / SLUG
    clips = [folder / f"s{i}.mp3" for i in range(1, 7)]
    if any(not p.is_file() or p.stat().st_size == 0 for p in clips):
        raise RuntimeError("One or more real audio assets missing")
    data = slots([duration(p) for p in clips])
    output = args.output.resolve()
    mix(video, clips, output)
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    print(json.dumps({"status": "VOICED_PREVIEW_ONLY", "mp4": str(output),
                      "sha256": digest, "shots": data}, ensure_ascii=False, indent=2))
    print("Pending: mandatory Remotion workflow, independent gates, ASR full mix and final QA")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as exc:
        print(f"BLOCKED: {exc}", file=sys.stderr)
        raise SystemExit(2)
