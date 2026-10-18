#!/usr/bin/env python3
"""Fast, read-only skill contract validation (no audio generation)."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
SKILL = Path(__file__).resolve().parent
REQUIRED_ROLES = (
    "script-agent", "script-reviewer", "voice-agent", "audio-reviewer",
    "motion-agent", "motion-reviewer", "integration-reviewer",
    "render-agent", "qa-agent",
)
REQUIRED_FILES = (
    SKILL / "SKILL.md",
    SKILL / "references" / "architecture-contract.md",
    SKILL / "schemas" / "review-gates.json",
    ROOT / "scripts" / "pipeline.py",
    ROOT / "scripts" / "runtime_orchestrator.py",
)
EXPECTED_GATES = {"A", "content", "audio", "D", "motion", "E", "B", "C"}


def validate():
    errors = []
    for filename in REQUIRED_FILES:
        if not filename.is_file():
            errors.append(f"missing {filename}")
    if errors:
        return errors
    skill = (SKILL / "SKILL.md").read_text(encoding="utf-8")
    if not all(item in skill for item in ("Phase 2b", "Phase 4b", "voice-performance.json")):
        errors.append("skill lacks Phase 2b / 4b voice-performance contract")
    policy = json.loads((SKILL / "schemas" / "review-gates.json").read_text(encoding="utf-8"))
    if set(policy.get("gates", {})) != EXPECTED_GATES:
        errors.append("gate schema does not cover workflow v4")
    if policy.get("gates", {}).get("motion", {}).get("minimumScore") != 9:
        errors.append("motion must require >=9")
    for role in REQUIRED_ROLES:
        path = ROOT / ".agents" / "roles" / (role + ".md")
        if not path.is_file():
            errors.append(f"missing role {role}")
        elif role != "motion-reviewer":
            contents = path.read_text(encoding="utf-8")
            if "voice-performance" not in contents or "voice-direction" not in contents:
                errors.append(f"role {role} lacks Voice Performance handoff")
    return errors


if __name__ == "__main__":
    problems = validate()
    for issue in problems:
        print("FAIL:", issue)
    if problems:
        sys.exit(1)
    print("PASS: skill references, v4 gates and agent role contracts present")
    print("NOTE: this does not verify synthesis, sound quality, renders or runtime execution")
