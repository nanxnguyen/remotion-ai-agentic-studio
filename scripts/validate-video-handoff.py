#!/usr/bin/env python3
"""Validate a hybrid-local video handoff without claiming any review gate passed."""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def validate(slug: str) -> list[str]:
    base = ROOT / "docs" / slug
    problems = []
    try:
        contract = json.loads((base / "production-contract.json").read_text(encoding="utf-8"))
        voice = json.loads((base / "voice.json").read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError) as exc:
        return [f"invalid handoff metadata: {exc}"]
    shots = contract.get("shots", [])
    keys = [s.get("voiceKey") for s in shots]
    if not shots or keys != list(voice):
        problems.append("shot voiceKey order must match voice.json exactly")
    if len(set(keys)) != len(keys):
        problems.append("duplicate voiceKey")
    if contract.get("timeline", {}).get("finalized") is not False:
        problems.append("handoff timeline must be provisional")
    if contract.get("publish", {}).get("enabled") is not False:
        problems.append("handoff must disable publishing")
    if contract.get("voice", {}).get("generated") is not False:
        problems.append("voice must be pending on ChatGPT handoff")
    for name in ("brief.md", "script.md", "content-pack.md", "design-spec.md", "HANDOFF.md"):
        if not (base / name).is_file():
            problems.append(f"missing {name}")
    for name in ("index.ts", "Reel.tsx", "scenes.tsx", "timeline.ts"):
        if not (ROOT / "src" / "videos" / slug / name).is_file():
            problems.append(f"missing video/{name}")
    registry = (ROOT / "src" / "videos" / "registry.ts").read_text(encoding="utf-8")
    if f"from './{slug}'" not in registry:
        problems.append("composition not registered in videos/registry.ts")
    return problems

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: python3 scripts/validate-video-handoff.py <slug>")
    errors = validate(sys.argv[1])
    print(json.dumps({"valid": not errors, "errors": errors}, ensure_ascii=False))
    raise SystemExit(bool(errors))
