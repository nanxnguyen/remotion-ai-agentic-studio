#!/usr/bin/env python3
"""Durable runtime task ledger. Never grants pipeline approvals or runs agents implicitly."""
import argparse
import json
import os
import re
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TASK_STATES = {"pending", "running", "done", "failed", "blocked"}
ROLE = re.compile(r"^[a-z][a-z0-9-]*$")
VIDEO = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def utcnow():
    return datetime.now(timezone.utc).isoformat()


def store_path(video, root=ROOT):
    if not VIDEO.fullmatch(video):
        raise ValueError("Invalid video ID")
    return root / "out" / "orchestration" / (video + ".json")


def read(video, root=ROOT):
    path = store_path(video, root)
    if not path.exists():
        return {"version": 1, "video": video, "tasks": {}}
    data = json.loads(path.read_text(encoding="utf8"))
    if data.get("version") != 1 or data.get("video") != video or not isinstance(data.get("tasks"), dict):
        raise ValueError("Invalid orchestration ledger")
    return data


def save(video, data, root=ROOT):
    path = store_path(video, root)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, name = tempfile.mkstemp(prefix=".ledger-", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
            file.write("\n")
            file.flush()
            os.fsync(file.fileno())
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def add(video, task, role, dependencies=(), max_attempts=3, root=ROOT):
    if not ROLE.fullmatch(task) or not ROLE.fullmatch(role):
        raise ValueError("Invalid task or role")
    if not 1 <= max_attempts <= 10:
        raise ValueError("max_attempts must be between 1 and 10")
    data = read(video, root)
    if task in data["tasks"]:
        raise ValueError("Task already exists")
    if task in dependencies or any(dep not in data["tasks"] for dep in dependencies):
        raise ValueError("Dependencies must exist and cannot be self")
    data["tasks"][task] = {
        "role": role, "dependencies": list(dict.fromkeys(dependencies)),
        "state": "pending", "attempts": 0, "maxAttempts": max_attempts,
        "updatedAt": utcnow(), "error": None,
    }
    save(video, data, root)
    return data["tasks"][task]


def transition(video, task, action, reason="", root=ROOT):
    data = read(video, root)
    if task not in data["tasks"]:
        raise ValueError("Unknown task")
    record = data["tasks"][task]
    state = record["state"]
    if action == "start":
        if state not in {"pending", "failed"} or record["attempts"] >= record["maxAttempts"]:
            raise ValueError("Task cannot start (state or retry budget)")
        if any(data["tasks"][dep]["state"] != "done" for dep in record["dependencies"]):
            raise ValueError("Dependencies are not complete")
        record["attempts"] += 1
        record["state"] = "running"
    elif action == "complete":
        if state != "running":
            raise ValueError("Only a running task can complete")
        record["state"] = "done"
    elif action == "fail":
        if state != "running":
            raise ValueError("Only a running task can fail")
        record["state"] = "failed"
        record["error"] = reason or "unspecified error"
    elif action == "block":
        if state == "done":
            raise ValueError("Cannot block completed task")
        record["state"] = "blocked"
        record["error"] = reason or "blocked"
    elif action == "resume":
        if state not in {"blocked", "running", "failed"}:
            raise ValueError("Task cannot resume")
        # A process may have died while running; count its attempt rather than resetting it.
        if record["attempts"] >= record["maxAttempts"]:
            raise ValueError("Retry budget exhausted")
        record["state"] = "pending"
    else:
        raise ValueError("Unknown action")
    record["updatedAt"] = utcnow()
    save(video, data, root)
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video")
    sub = parser.add_subparsers(dest="command", required=True)
    create = sub.add_parser("add")
    create.add_argument("task")
    create.add_argument("role")
    create.add_argument("--after", action="append", default=[])
    create.add_argument("--max-attempts", type=int, default=3)
    for action in ("start", "complete", "fail", "block", "resume"):
        command = sub.add_parser(action)
        command.add_argument("task")
        if action in {"fail", "block"}:
            command.add_argument("--reason", default="")
    sub.add_parser("status")
    args = parser.parse_args()
    try:
        if args.command == "add":
            result = add(args.video, args.task, args.role, args.after, args.max_attempts)
        elif args.command == "status":
            result = read(args.video)
        else:
            result = transition(args.video, args.task, args.command, getattr(args, "reason", ""))
        print(json.dumps(result, indent=2, ensure_ascii=False))
    except (ValueError, OSError) as exc:
        parser.exit(2, str(exc) + "\n")


if __name__ == "__main__":
    main()
