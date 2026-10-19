#!/usr/bin/env python3
"""Licence-coverage check for the ban-khong-yeu-duoi-chi-da-manh-qua-lau audio assets.

Every sfx-* cue in assets-manifest.md must resolve to (a) a source file registered in
skills/video-shotcraft/assets/audio/ATTRIBUTION.md and (b) a Mixkit asset URL present in
that same file. Exits non-zero on any gap. Run from the repo root.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
ATT = ROOT / "skills/video-shotcraft/assets/audio/ATTRIBUTION.md"
MANIFEST = ROOT / "docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/assets-manifest.md"

att = ATT.read_text()
plan = MANIFEST.read_text()

urls = re.findall(r"\| `sfx-[a-z-]+\.mp3` \| (https://assets\.mixkit\.co/\S+) \|", plan)
srcs = re.findall(r"\| `sfx-[a-z-]+\.mp3` \| `sfx/([a-z]+/[a-z0-9-]+\.mp3)`", plan)

gaps = 0
for u in urls:
    ok = u in att
    gaps += 0 if ok else 1
    print(f"{'OK  ' if ok else 'MISS'} url   {u}")
for s in srcs:
    base = s.split("/")[-1]
    ok = f"`{base}`" in att
    gaps += 0 if ok else 1
    print(f"{'OK  ' if ok else 'MISS'} file  sfx/{s}")

# BGM is original synthesis: assert it is declared as such and has no external URL.
bgm_ok = "Original synthesis" in plan and "no third-party licence" in plan
gaps += 0 if bgm_ok else 1
print(f"{'OK  ' if bgm_ok else 'MISS'} bgm   original synthesis declared (no external URL expected)")

print(f"\n{len(urls)} urls + {len(srcs)} sources + 1 bgm checked; licence gaps: {gaps}")
sys.exit(1 if gaps else 0)