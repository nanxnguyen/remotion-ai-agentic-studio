#!/usr/bin/env python3
"""Lightweight static validator (no third-party dependencies). Does NOT validate runtime gates."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

MANDATORY_REFERENCES = (
    "fast-lane.md", "hook-story.md", "visual-direction.md", "quality-rubric.md",
    "remotion-playbook.md", "shotcraft.md", "eval-guidance.md",
)
MANDATORY_TEMPLATES = ("creative-brief.md", "eval.md")


def validate(root: Path) -> list[str]:
    errors: list[str] = []
    path = root / "SKILL.md"
    if not path.is_file():
        return ["SKILL.md not found"]
    text = path.read_text(encoding="utf-8")
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", text, flags=re.DOTALL)
    if not match:
        return ["Invalid or missing YAML frontmatter"]
    fm = match.group(1)
    name = re.search(r"^name:\s*([^\n]+)$", fm, re.MULTILINE)
    desc = re.search(r"^description:\s*([^\n]+)$", fm, re.MULTILINE)
    if not name:
        errors.append("Missing name")
    else:
        value = name.group(1).strip().strip('"\'')
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", value) or len(value) > 64:
            errors.append("name must be lower-case ASCII kebab-case with <=64 chars")
        if root.name != value:
            errors.append(f"name {value!r} must equal folder {root.name!r}")
    if not desc or not desc.group(1).strip() or len(desc.group(1)) > 1024:
        errors.append("description required (<=1024 chars)")
    for f in MANDATORY_REFERENCES:
        if not (root / "references" / f).is_file():
            errors.append(f"Missing references/{f}")
    for f in MANDATORY_TEMPLATES:
        if not (root / "templates" / f).is_file():
            errors.append(f"Missing templates/{f}")
    for token in (
        "ray-pineline-worflow-agent", "pipeline.py", "Gate A", "Motion", "Gate C",
        "eval.md", "600s", "10 phút", "reviewer", "render",
    ):
        if token.lower() not in text.lower():
            errors.append(f"Missing required guidance keyword: {token}")
    for f in MANDATORY_REFERENCES:
        if f"references/{f}" not in text:
            errors.append(f"Reference is not routed from SKILL.md: {f}")
    if not (root / "README-INSTALL.md").is_file():
        errors.append("Missing README-INSTALL.md")
    if (root / "SKILL.md").stat().st_size > 100000:
        errors.append("SKILL.md too large; split to references")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    issues = validate(args.skill.resolve())
    if issues:
        print("FAILED:")
        for e in issues:
            print(" - " + e)
        return 1
    print(f"PASS: {args.skill} frontmatter, references, templates, safety terminology")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
