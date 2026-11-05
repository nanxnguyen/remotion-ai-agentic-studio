#!/usr/bin/env python3
"""Gate a reviewed Silent Animation Factory movie before existing PRIVATE-only upload.

Only a NEW release manifest under config/silent-factory/releases/*.json may trigger.
Never overrides creative QA or pretends a technical-only contact sheet is a review.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET_CHANNEL = "UCY3n3Nlqyo6uI4GU8nuX-5g"


class ReleaseBlocked(ValueError):
    pass


def repo_path(p: str, prefix: str) -> Path:
    if not isinstance(p, str) or not re.fullmatch(prefix + r"[a-z0-9-]+\.json", p):
        raise ReleaseBlocked("Unexpected repository path")
    resolved = (ROOT / p).resolve()
    if not resolved.is_relative_to(ROOT):
        raise ReleaseBlocked("Outside repository")
    return resolved


def inspect_release(path: Path) -> dict:
    if not path.is_relative_to(ROOT):
        raise ReleaseBlocked("Manifest must be in repository")
    m = json.loads(path.read_text(encoding="utf-8"))
    if m.get("channel") != "OLISE_MAN" or m.get("channel_id") != TARGET_CHANNEL or m.get("privacy") != "private":
        raise ReleaseBlocked("Wrong channel or privacy; PRIVATE Olise only")
    meta_path = repo_path(m.get("metadata_path"), "config/films/")
    metadata = json.loads(meta_path.read_text(encoding="utf-8"))
    if metadata.get("qa_approved") is not True or metadata.get("privacy") != "private":
        raise ReleaseBlocked("Final release approval and private metadata required")
    if metadata.get("language") != "en":
        raise ReleaseBlocked("Unexpected language")
    reviewer = m.get("independent_audiovisual_review")
    if not isinstance(reviewer, dict) or reviewer.get("complete") is not True or reviewer.get("actual_encoded_media") is not True:
        raise ReleaseBlocked("Independent ACTUAL full-video review not evidenced")
    if reviewer.get("timeline_covered_seconds", 0) < 180 or reviewer.get("all_shots_reviewed") is not True or reviewer.get("audio_reviewed") is not True:
        raise ReleaseBlocked("Incomplete independent media coverage")
    if not isinstance(reviewer.get("method"), str) or len(reviewer["method"].strip()) < 20:
        raise ReleaseBlocked("Missing concrete reviewer method")
    sha = m.get("video_sha256")
    if not isinstance(sha, str) or not re.fullmatch(r"[a-f0-9]{64}", sha):
        raise ReleaseBlocked("Missing SHA-256 binding to actual reviewed MP4")
    if reviewer.get("reviewed_video_sha256") != sha:
        raise ReleaseBlocked("Reviewer inspected different MP4")
    mode = m.get("creative_release_basis")
    if mode not in {"creative_qa_passed", "private_override_after_5_actual_repairs"}:
        raise ReleaseBlocked("Unrecognized creative release basis")
    if mode == "private_override_after_5_actual_repairs":
        if metadata.get("creative_qa_passed") is not False or metadata.get("creative_qa_override") is not True:
            raise ReleaseBlocked("Creative override must be explicit and honest")
        if m.get("genuine_corrective_rounds") != 5:
            raise ReleaseBlocked("Private override requires five real fixes")
        reports = m.get("distinct_attempt_sha256", [])
        if not isinstance(reports, list) or len(reports) != 6 or len(set(reports)) != 6 or sha != reports[-1]:
            raise ReleaseBlocked("Need baseline and five DISTINCT actual render SHA values")
    else:
        if metadata.get("creative_qa_passed") is not True or metadata.get("creative_qa_override") is True:
            raise ReleaseBlocked("Independent creative PASS not evidenced")
    drive = m.get("video_drive_id"), m.get("thumbnail_drive_id")
    if not all(isinstance(x, str) and re.fullmatch(r"[A-Za-z0-9_-]{12,200}", x) for x in drive) or drive[0] == drive[1]:
        raise ReleaseBlocked("Missing distinct verified private Drive asset IDs")
    return m


def run_uploader(m: dict, receipt: Path, execute: bool) -> dict:
    cmd = [
        sys.executable, "scripts/youtube_multi_channel.py",
        "--channel", "OLISE_MAN",
        "--video-drive-id", m["video_drive_id"],
        "--thumbnail-drive-id", m["thumbnail_drive_id"],
        "--metadata", m["metadata_path"],
        "--receipt", str(receipt),
    ]
    if execute:
        cmd.append("--execute")
    subprocess.run(cmd, cwd=ROOT, check=True)
    return json.loads(receipt.read_text(encoding="utf-8"))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--release", required=True)
    ap.add_argument("--receipt-dir", default="out/silent-factory-release")
    ap.add_argument("--execute", action="store_true", help="Upload PRIVATE after verified preflight")
    args = ap.parse_args()
    source = repo_path(args.release, "config/silent-factory/releases/")
    m = inspect_release(source)
    receipt_dir = ROOT / args.receipt_dir
    receipt_dir.mkdir(parents=True, exist_ok=True)
    dry = run_uploader(m, receipt_dir / "dry-run-receipt.json", execute=False)
    if dry.get("channel_id") != TARGET_CHANNEL or dry.get("privacy") != "private":
        raise ReleaseBlocked("OAuth channel mismatch")
    if dry.get("video_sha256") != m["video_sha256"]:
        raise ReleaseBlocked("Drive video not identical to independently reviewed MP4")
    if dry.get("previously_uploaded_id"):
        print(json.dumps({"status": "DUPLICATE_BLOCKED", "previously_uploaded_id": dry["previously_uploaded_id"]}))
        return
    if not args.execute:
        print(json.dumps({"status": "SAFE_DRY_RUN_ONLY", "sha256": dry["video_sha256"]}))
        return
    if os.environ.get("YOUTUBE_UPLOAD_PRIVATE_ENABLED") != "1":
        raise ReleaseBlocked("Private upload runtime toggle not enabled")
    real = run_uploader(m, receipt_dir / "youtube-private-receipt.json", execute=True)
    if not real.get("youtube_video_id") or real.get("status") != "uploaded_private_ready_for_review":
        raise ReleaseBlocked("No verified private YouTube receipt")
    print(json.dumps({"status": real["status"], "youtube_url": real["youtube_url"], "channel_id": TARGET_CHANNEL}))


if __name__ == "__main__":
    try:
        main()
    except (ReleaseBlocked, OSError, ValueError, subprocess.CalledProcessError) as exc:
        print(f"SILENT_FACTORY_UPLOAD_BLOCKED: {type(exc).__name__}: {str(exc)[:350]}", file=sys.stderr)
        sys.exit(1)
