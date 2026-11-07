#!/usr/bin/env python3
"""One-time LOCAL OAuth bootstrap. Never run in public GitHub Actions logs."""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from youtube_multi_channel import ROOT, YT_SCOPES, read_target, resolve_channel
from horror_archive_oauth import provider_options


def private_file(path: Path, content: str) -> None:
    path.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    if path.exists():
        raise RuntimeError(f"Refusing to overwrite existing credential file: {path}")
    descriptor = os.open(str(path), os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
        stream.write(content + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--client-secret", required=True, help="OAuth Desktop JSON from Google Cloud")
    parser.add_argument("--provider", choices=["youtube", "drive", "drive-archive"], required=True)
    parser.add_argument("--channel", default="OLISE_MAN", help="Used when provider=youtube")
    parser.add_argument("--repo", default="nanxnguyen/remotion-ai-agentic-studio")
    args = parser.parse_args()
    target = read_target(ROOT / "config" / "youtube-channel-targets.json", args.channel) if args.provider == "youtube" else None
    scopes = YT_SCOPES if target else provider_options(args.provider)[0]
    flow = InstalledAppFlow.from_client_secrets_file(args.client_secret, scopes)
    credentials = flow.run_local_server(port=0, access_type="offline", prompt="consent")
    if not credentials.refresh_token:
        raise RuntimeError("No refresh token returned; revoke the old consent and authorize again")
    if target:
        yt = build("youtube", "v3", credentials=credentials, cache_discovery=False)
        actual = resolve_channel(yt, target)
        secret_name = "YOUTUBE_REFRESH_TOKEN_" + target["key"]
        print(f"VERIFIED channel: {actual['snippet']['title']} ({actual['id']}) = {target['handle']}")
        print(f"Tip: pin channel_id={actual['id']} in config/youtube-channel-targets.json")
    else:
        _, secret_name, _ = provider_options(args.provider)
    base = Path.home() / ".config" / "ray-youtube-uploader"
    filename = secret_name + ".txt" if target else provider_options(args.provider)[2]
    location = base / filename
    private_file(location, credentials.refresh_token)
    # Client credentials are identical across all channel grants. Write once.
    for name, value in (("YOUTUBE_CLIENT_ID", credentials.client_id), ("YOUTUBE_CLIENT_SECRET", credentials.client_secret)):
        if not (base / (name + ".txt")).exists():
            private_file(base / (name + ".txt"), value)
    print("\nSecrets stay on YOUR COMPUTER and in GitHub Actions Secrets, never in chat:")
    print(f"gh secret set {secret_name} -R {args.repo} < {location}")
    print(f"gh secret set YOUTUBE_CLIENT_ID -R {args.repo} < {base / 'YOUTUBE_CLIENT_ID.txt'}")
    print(f"gh secret set YOUTUBE_CLIENT_SECRET -R {args.repo} < {base / 'YOUTUBE_CLIENT_SECRET.txt'}")
    print("Never commit or publish files in", base)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"OAuth setup blocked: {type(exc).__name__}: {exc}", file=sys.stderr)
        raise SystemExit(1)
