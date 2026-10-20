#!/usr/bin/env python3
"""Non-destructive installer for ray-video-10-phut.

Run from an extracted bundle:
  python3 ray-video-10-phut/scripts/install.py --repo /path/to/repo
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


def install(repo: Path, source: Path) -> tuple[Path, str]:
    repo = repo.expanduser().resolve()
    source = source.resolve()
    if not repo.is_dir():
        raise ValueError(f"Repository path does not exist: {repo}")
    if not (repo / "scripts" / "pipeline.py").is_file():
        raise ValueError("This is not the expected repository: scripts/pipeline.py missing")
    if not (repo / ".agents" / "skills" / "ray-pineline-worflow-agent" / "SKILL.md").exists() and not (
        repo / ".claude" / "skills" / "ray-pineline-worflow-agent" / "SKILL.md"
    ).exists():
        raise ValueError("Original ray-pineline-worflow-agent skill not found")
    dest = repo / ".claude" / "skills" / source.name
    if dest.exists() or dest.is_symlink():
        raise FileExistsError(f"Refusing to overwrite existing skill: {dest}")
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source, dest, ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))

    agents_root = repo / ".agents" / "skills"
    agents_root.mkdir(parents=True, exist_ok=True)
    agents_dest = agents_root / source.name
    if agents_dest.exists() or agents_dest.is_symlink():
        if agents_dest.resolve() == dest.resolve():
            return dest, "Agent skill path already resolves to installed skill"
        return dest, f"WARNING: Agent skill path occupied, left unchanged: {agents_dest}"
    try:
        agents_dest.symlink_to(Path("../../.claude/skills") / source.name, target_is_directory=True)
        return dest, f"Linked Agent skill entry: {agents_dest}"
    except OSError as err:
        return dest, f"WARNING: Could not create Agent symlink ({err}). Add it manually if needed."


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, required=True, help="Path to cloned remotion-ai-agentic-studio repo")
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1]
    try:
        path, info = install(args.repo, source)
    except (OSError, ValueError) as err:
        print(f"ERROR: {err}", file=sys.stderr)
        return 1
    print(f"Installed: {path}")
    print(info)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
