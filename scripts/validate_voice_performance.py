#!/usr/bin/env python3
"""Read-only validation of the phase 2b voice-performance handoff.

This validation cannot substitute for listening, ASR, or a local VieNeu synthesis.
"""
import argparse
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATOR = ROOT / "scripts" / "gen-voice-clone.py"


def generator_module():
    spec = importlib.util.spec_from_file_location("voice_clone_validation", GENERATOR)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def check(video, root=ROOT):
    folder = root / "docs" / video
    errors = []
    sources = [folder / "voice.json", folder / "voice-performance.json", folder / "voice-direction.md"]
    for path in sources:
        if not path.is_file():
            errors.append(f"missing {path.relative_to(root)}")
    if errors:
        return errors
    try:
        voice = json.loads(sources[0].read_text(encoding="utf-8"))
        performance = json.loads(sources[1].read_text(encoding="utf-8"))
        plan = generator_module().build_performance_plan(voice, performance)
    except (ValueError, KeyError, TypeError, json.JSONDecodeError) as error:
        return [f"invalid performance contract: {error}"]
    direction = sources[2].read_text(encoding="utf-8").strip()
    if not direction:
        errors.append("voice-direction.md is empty")
    for shot in voice:
        if shot not in direction:
            errors.append(f"voice-direction.md lacks shot {shot}")
    for shot, phrases in plan.items():
        if not phrases:
            errors.append(f"missing phrases: {shot}")
        for index, phrase in enumerate(phrases, 1):
            if phrase.seed is not None and not isinstance(phrase.seed, int):
                errors.append(f"{shot} phrase {index}: invalid seed")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video")
    args = parser.parse_args()
    if not args.video.replace("-", "").isalnum() or "/" in args.video or "\\" in args.video:
        parser.error("invalid video slug")
    problems = check(args.video)
    for item in problems:
        print("FAIL:", item)
    if problems:
        raise SystemExit(1)
    print("PASS: canonical speech matches performance phrases and Voice Direction has every shot.")
    print("NOT VERIFIED: local audio synthesis, naturalness by listening, render and gate approval.")


if __name__ == "__main__":
    main()
