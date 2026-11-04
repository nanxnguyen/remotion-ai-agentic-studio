#!/usr/bin/env python3
"""Sync OAuth Desktop client pair to GitHub Secrets without printing credentials.

A new OAuth Desktop JSON must replace BOTH YOUTUBE_CLIENT_ID and
YOUTUBE_CLIENT_SECRET together. This bypasses potentially stale local
~/.config/ray-youtube-uploader/YOUTUBE_CLIENT_ID.txt files.
Refresh tokens must be issued by the same Desktop OAuth client.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def load_desktop_client(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if "installed" not in data or not isinstance(data["installed"], dict):
        raise ValueError("Expected Desktop OAuth JSON with 'installed' (not 'web')")
    client = data["installed"]
    client_id = client.get("client_id")
    client_secret = client.get("client_secret")
    if not isinstance(client_id, str) or not re.fullmatch(r"[\w-]+\.apps\.googleusercontent\.com", client_id):
        raise ValueError("Invalid Desktop OAuth client_id")
    if not isinstance(client_secret, str) or not client_secret.startswith("GOCSPX-"):
        raise ValueError("Invalid Desktop OAuth client_secret")
    return {"YOUTUBE_CLIENT_ID": client_id, "YOUTUBE_CLIENT_SECRET": client_secret}


def run(args: argparse.Namespace) -> None:
    creds = load_desktop_client(Path(args.client_json).expanduser())
    local = Path.home() / ".config" / "ray-youtube-uploader" / "YOUTUBE_CLIENT_ID.txt"
    if local.exists() and local.read_text(encoding="utf-8").strip() != creds["YOUTUBE_CLIENT_ID"]:
        print("NOTE: Desktop OAuth client differs from cached local Client ID.", file=sys.stderr)
        print("Old local files can cause invalid_client. This tool uses the Desktop JSON directly.", file=sys.stderr)
        print("Re-run YouTube and Drive consent if their refresh tokens were issued to the old client.", file=sys.stderr)

    gh = shutil.which("gh")
    if not gh:
        raise RuntimeError("GitHub CLI not installed: https://cli.github.com/ (run 'gh auth login' after installation)")
    for secret_name in ("YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_SECRET"):
        completed = subprocess.run(
            [gh, "secret", "set", secret_name, "--repo", args.repo],
            input=creds[secret_name],
            text=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            check=False,
        )
        if completed.returncode:
            raise RuntimeError(f"GitHub CLI failed to update {secret_name}. Ensure 'gh auth login' has completed.")
        print(f"Updated GitHub Secret: {secret_name}")

    print("Desktop OAuth client pair synchronized without exposing values.")
    print("Run the existing dry-run workflow again before any private upload.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--client-json", required=True, help="Local Desktop OAuth JSON file (keep private)")
    parser.add_argument("--repo", default="nanxnguyen/remotion-ai-agentic-studio")
    options = parser.parse_args()
    try:
        run(options)
    except Exception as exc:
        print(f"Sync blocked: {type(exc).__name__}: {exc}", file=sys.stderr)
        raise SystemExit(1)
