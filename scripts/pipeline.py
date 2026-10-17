#!/usr/bin/env python3
"""Status and review gates for the canonical video production workflow.

Each video has docs/<folder>/status.json. The monitor shows declared progress
alongside file evidence. The independent review gates run A -> D -> E -> B -> C.
Final videos default to 40-60 seconds and use out/<topic>-<voice>-reel.mp4.

Common commands:
  pipeline.py init <folder> --comp <CompId> --voice <voice-slug> [--profile story|product|knowledge|news]
                 (voice not chosen yet? use a placeholder slug such as `tbd`, then `voice` renames it)
  pipeline.py voice <folder> <new-voice-slug>   (rename output, invalidates C)
  pipeline.py set <folder> <stage> <state>
  pipeline.py agent <folder> <agent-name> <running|done|failed|idle> [--stage S --note ...]  (lights the agent in the monitor)
  pipeline.py review <folder> <A|content|audio|D|E|B|C> <score> --reviewer NAME --report FILE
  pipeline.py override <folder> <A|content|audio|D|E|B|C> --by NAME [--note ...]  (explicit override; keeps true score)
  pipeline.py gate <folder> <A|content|audio|D|E|B|C>
  pipeline.py render <folder> [--min-seconds 40 --max-seconds 60]
  pipeline.py verify <folder> [--min-seconds 40 --max-seconds 60]
  pipeline.py audio-listen <folder> --by NAME   (optional record of a human audition; NOT required, gate D never waits for it)
  pipeline.py listen <folder> --by NAME   (optional record that a human heard the C-approved MP4)
  pipeline.py check <folder>
  pipeline.py show [folder]
  pipeline.py serve [--port 4180]

Stages: research, brief, script, content, voice, design, build, audio, qa, render (content: workflow v3 only).
Workflow v3: after A, three branches run in parallel (content -> review `content`, voice+audio -> review `audio`,
design -> gate D); gate E (integration) needs all three. Branch reviews sit outside the A->D->E->B->C order.
Gate pass scores: A, content, audio, D, E >= 9; B, C >= 8 (PASS_SCORE). The A sub-score for specificity (>= 9)
and the no-open-Cao/Trung rule are reviewer-side rules in the skill; this CLI records one number.
States: pending, in_progress, done, blocked, failed.
"""
import argparse
import fcntl
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from contextlib import contextmanager
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
HTML = Path(__file__).resolve().parent / "monitor.html"
AUDITION_HTML = Path(__file__).resolve().parent / "audition.html"
HOWLER = ROOT / "node_modules" / "howler" / "dist" / "howler.min.js"

AGENTS_DIR = ROOT / ".claude" / "agents"

STAGES = [
    ("research", "Research"),
    ("brief", "Brief"),
    ("script", "Script"),
    ("content", "Content pack"),
    ("voice", "Voice"),
    ("design", "Design + storyboard"),
    ("build", "Timeline + scenes"),
    ("audio", "SFX / BGM"),
    ("qa", "Stills QA"),
    ("render", "Render"),
]
STAGE_IDS = [s for s, _ in STAGES]
STATES = {"pending", "in_progress", "done", "blocked", "failed"}
AGENT_STATES = {"running", "done", "failed", "idle"}
DECISIONS = {"approved", "rejected"}
REVIEW_GATES = {"A": "script", "D": "design", "E": "integration", "B": "tasks", "C": "video"}
# Phase 3 branch reviews (workflow v3): checkpoints between A and E, outside the A->D->E->B->C order.
BRANCH_REVIEWS = {"content": "content branch", "audio": "audio branch"}
ALL_REVIEWS = [*REVIEW_GATES, *BRANCH_REVIEWS]
# Stage -> review that guards it (E/B are phase-level, no single stage).
STAGE_GATE = {"script": "A", "content": "content", "design": "D", "render": "C"}
REVIEW_ORDER = list(REVIEW_GATES)
PASS_SCORE = {"A": 9, "D": 9, "E": 9, "content": 9, "audio": 9}  # B and C pass at 8
INVALIDATE_FROM_STAGE = {
    "research": "A", "brief": "A", "script": "A", "content": "E", "voice": "E", "design": "D",
    "build": "C", "audio": "C", "qa": "C", "render": "C",
}
# ponytail: `audio` is also reopened for Phase 7 mix integration, so only voice/content reopen a branch review.
INVALIDATE_BRANCH = {"content": "content", "voice": "audio"}
FLOW_VERSION = 3  # v3 = content/audio/design branches + join; v2 videos keep their linear history

# One map for the monitor: DAG node -> lane, stage, producers, reviewer, gate.
FLOW = [
    {"id": "intake", "label": "Intake", "lane": "main", "stage": None, "agents": ["intake-agent"], "reviewer": None, "gate": None},
    {"id": "research", "label": "Research", "lane": "main", "stage": "research", "agents": ["research-agent"], "reviewer": None, "gate": None},
    {"id": "brief", "label": "Brief", "lane": "main", "stage": "brief", "agents": ["script-agent"], "reviewer": None, "gate": None},
    {"id": "script", "label": "Script", "lane": "main", "stage": "script", "agents": ["script-agent"], "reviewer": "script-reviewer", "gate": "A"},
    {"id": "content", "label": "Content pack", "lane": "content", "stage": "content", "agents": ["content-agent"], "reviewer": "content-reviewer", "gate": "content"},
    {"id": "voice", "label": "Voice", "lane": "audio", "stage": "voice", "agents": ["voice-agent"], "reviewer": None, "gate": None},
    {"id": "audio", "label": "SFX / BGM", "lane": "audio", "stage": "audio", "agents": ["audio-agent"], "reviewer": "audio-reviewer", "gate": "audio"},
    {"id": "design", "label": "Design + storyboard", "lane": "design", "stage": "design", "agents": ["design-agent"], "reviewer": "design-reviewer", "gate": "D"},
    {"id": "join", "label": "Join + integration", "lane": "main", "stage": None, "agents": ["video-director"], "reviewer": "integration-reviewer", "gate": "E"},
    {"id": "tasks", "label": "Task plan", "lane": "main", "stage": None, "agents": ["task-planner"], "reviewer": "task-reviewer", "gate": "B"},
    {"id": "build", "label": "Timeline + scenes", "lane": "main", "stage": "build", "agents": ["scene-agent"], "reviewer": None, "gate": None},
    {"id": "qa", "label": "Stills QA", "lane": "main", "stage": "qa", "agents": ["qa-agent"], "reviewer": None, "gate": None},
    {"id": "render", "label": "Render + final barrier", "lane": "main", "stage": "render", "agents": ["render-agent"], "reviewer": "video-reviewer", "gate": "C"},
    {"id": "delivery", "label": "Delivery", "lane": "main", "stage": None, "agents": ["video-director"], "reviewer": None, "gate": None},
]


def roster() -> list:
    """Agents defined in .claude/agents/*.md (name, color, description), plus the director thread."""
    agents = [{"name": "video-director", "color": "teal", "description": "Main thread: orchestrates every phase, integrates shared files, records gates."}]
    for f in sorted(AGENTS_DIR.glob("*.md")):
        head = f.read_text(encoding="utf-8").split("---")
        if len(head) < 3:
            continue
        meta = dict(re.findall(r"^(\w+):\s*(.*)$", head[1], re.M))
        if meta.get("name"):
            agents.append({"name": meta["name"], "color": meta.get("color", "gray"), "description": meta.get("description", "")})
    return agents


def flow_version(data: dict) -> int:
    return data.get("workflow_version") or 1


def required_stages(data: dict) -> list:
    return STAGE_IDS if flow_version(data) >= 3 else [s for s in STAGE_IDS if s != "content"]


def review_names(data: dict) -> list:
    return ALL_REVIEWS if flow_version(data) >= 3 else REVIEW_ORDER


def now() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def status_path(folder: str) -> Path:
    # Folder names come from the CLI or the HTTP API: plain names only, no path traversal.
    if not re.fullmatch(r"[A-Za-z0-9_-]+", folder):
        raise SystemExit(f"bad video folder: {folder!r}")
    return DOCS / folder / "status.json"


@contextmanager
def status_lock(folder: str):
    p = status_path(folder)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.with_suffix(".lock").open("a+") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        try:
            yield
        finally:
            fcntl.flock(lock, fcntl.LOCK_UN)


def load(folder: str) -> dict:
    return json.loads(status_path(folder).read_text(encoding="utf-8"))


def save(folder: str, data: dict) -> None:
    data["updated"] = now()
    p = status_path(folder)
    tmp = p.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    os.replace(tmp, p)


def invalidate_reviews(data: dict, first: str) -> None:
    gates = REVIEW_ORDER[REVIEW_ORDER.index(first):] if first in REVIEW_ORDER else [first]
    if first == "A":  # a script change re-opens both branch reviews too
        gates += list(BRANCH_REVIEWS)
    for gate in gates:
        if data.get("reviews", {}).get(gate):
            data.setdefault("review_valid", {})[gate] = False


def later_reviews(gate: str) -> list:
    """Reviews a new entry for `gate` makes stale: later gates, and for A also the branch reviews."""
    if gate in BRANCH_REVIEWS:
        return REVIEW_ORDER[REVIEW_ORDER.index("E"):]
    later = REVIEW_ORDER[REVIEW_ORDER.index(gate) + 1:]
    return later + list(BRANCH_REVIEWS) if gate == "A" else later


def review_prerequisites(data: dict, gate: str) -> list:
    if gate in BRANCH_REVIEWS:
        return ["A"]
    i = REVIEW_ORDER.index(gate)
    before = [REVIEW_ORDER[i - 1]] if i else []
    if gate == "E" and flow_version(data) >= 3:  # the join: all three branches must be accepted
        before += list(BRANCH_REVIEWS)
    return before


def review_passed(data: dict, gate: str) -> bool:
    entries = data.get("reviews", {}).get(gate, [])
    if not entries or not data.get("review_valid", {}).get(gate, False):
        return False
    last = entries[-1]
    if last.get("verdict") == "override":
        return False
    if last["score"] < PASS_SCORE.get(gate, 8) or last["verdict"] != "pass":
        return False
    if gate == "C":  # AI video review of frames, captions, ASR and audio metrics; the human listen is separate (cmd_listen)
        render = data["render_check"]
        sha_matches = not (last.get("render_sha256") or render.get("sha256")) or last.get("render_sha256") == render.get("sha256")
        return verified_render(data) and last.get("render_fingerprint") == render.get("fingerprint") and sha_matches
    return True


def review_overridden(data: dict, gate: str) -> bool:
    """Explicit user override of a gate (recorded via `override`, shown distinctly).
    Never fakes a score: the last review entry keeps its true score/verdict."""
    entries = data.get("reviews", {}).get(gate, [])
    if not entries or not data.get("review_valid", {}).get(gate, False):
        return False
    return entries[-1].get("verdict") == "override"


def review_satisfied(data: dict, gate: str) -> bool:
    """Strict pass or explicit user override. Ordering uses this; scoring stays strict."""
    return review_passed(data, gate) or review_overridden(data, gate)


def listened(data: dict) -> bool:
    """The user listened to the exact MP4 that passed gate C (a new render needs a new listen)."""
    fp = data.get("render_check", {}).get("fingerprint")
    return bool(fp) and data.get("listen", {}).get("fingerprint") == fp


def rel(p: Path) -> str:
    return str(p.relative_to(ROOT))


def evidence(folder: str, data: dict) -> dict:
    """Per stage: ok True/False/None (None = no file check for this stage) + files found."""
    paths = data.get("paths", {})
    docs = DOCS / folder
    audio = ROOT / "public" / "audio" / paths.get("audio", folder)
    out_name = paths.get("out", folder)
    qa_prefix = paths.get("qa", folder)
    comp = data.get("comp", "")
    ev = {}

    def files(*globs):
        found = []
        for g in globs:
            found += sorted(docs.glob(g))
        return [rel(f) for f in found]

    for sid, pattern in (("research", "research*.md"), ("brief", "brief.md"), ("script", "script*")):
        f = files(pattern)
        ev[sid] = {"ok": bool(f), "files": f}

    vj = docs / "voice.json"
    if vj.exists():
        keys = list(json.loads(vj.read_text(encoding="utf-8")))
        clips = [audio / f"{k}.mp3" for k in keys]
        have = [rel(c) for c in clips if c.exists()]
        ev["voice"] = {"ok": len(have) == len(keys) > 0, "files": [rel(vj)] + have,
                       "detail": f"{len(have)}/{len(keys)} clips"}
    else:
        ev["voice"] = {"ok": False, "files": [], "detail": "no voice.json"}

    cp = files("content-pack.md")
    ev["content"] = {"ok": True if cp else None, "files": cp}

    ds = files("design-spec.md")
    ev["design"] = {"ok": bool(ds), "files": ds}

    root_tsx = (ROOT / "src" / "Root.tsx").read_text(encoding="utf-8")
    ev["build"] = {"ok": bool(comp) and f'id="{comp}"' in root_tsx, "files": ["src/Root.tsx"] if comp else [],
                   "detail": f"composition {comp or '?'}"}

    am = files("assets-manifest.md")
    ev["audio"] = {"ok": True if am else None, "files": am}

    shots = sorted((ROOT / "out" / "qa").glob(f"{qa_prefix}-*.png"))
    ev["qa"] = {"ok": bool(shots), "files": [rel(s) for s in shots[-6:]], "detail": f"{len(shots)} stills"}

    mp4 = ROOT / "out" / f"{out_name}-reel.mp4"
    stamp = data.get("render_check", {})
    current = mp4.exists() and stamp.get("fingerprint") == file_fingerprint(mp4)
    ev["render"] = {"ok": bool(current), "files": [rel(mp4)] if mp4.exists() else [],
                    "detail": f"verified {stamp.get('duration', '?')}s" if current else "missing or not verified"}
    return ev


def file_fingerprint(path: Path) -> str:
    stat = path.stat()
    return f"{stat.st_size}:{stat.st_mtime_ns}"


def file_sha256(path: Path) -> str:
    value = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            value.update(block)
    return value.hexdigest()


def audio_fingerprint(folder: str, data: dict) -> str:
    """Voice clips named in voice.json plus bgm* files: what the user auditions before gate D."""
    audio = ROOT / "public" / "audio" / data.get("paths", {}).get("audio", folder)
    vj = DOCS / folder / "voice.json"
    keys = list(json.loads(vj.read_text(encoding="utf-8"))) if vj.is_file() else []
    clips = [audio / f"{k}.mp3" for k in keys] + sorted(audio.glob("bgm*"))
    if not keys or not all(c.is_file() for c in clips):
        return ""
    return hashlib.sha1("|".join(f"{c.name}:{file_fingerprint(c)}" for c in clips).encode()).hexdigest()


def audio_listened(folder: str, data: dict) -> bool:
    fp = audio_fingerprint(folder, data)
    return bool(fp) and data.get("audio_listen", {}).get("fingerprint") == fp


def view(folder: str) -> dict:
    data = load(folder)
    ev = evidence(folder, data)
    declared = data.get("stages", {})
    gates = data.get("gates", [])
    stages = []
    required = required_stages(data)
    for sid, label in STAGES:
        d = declared.get(sid, {})
        e = ev[sid]
        state = d.get("state") or ("done" if e["ok"] else "pending")
        if sid not in required and not d.get("state") and not e["ok"]:
            state = "skipped"  # legacy (v2) video: the content branch did not exist yet
        rg = STAGE_GATE.get(sid)
        rg_passed = review_passed(data, rg) if rg else None
        rg_over = review_overridden(data, rg) if rg else None
        stages.append({
            "id": sid, "label": label, "state": state, "declared": bool(d.get("state")),
            "note": d.get("note", ""), "at": d.get("at", ""),
            "gate": (d.get("gate") or "open") if sid in gates else None,
            "gate_comment": d.get("gate_comment", ""),
            "review_gate": rg, "review_gate_passed": rg_passed,
            "review_gate_overridden": rg_over,
            "gate_mismatch": state == "done" and rg is not None and not (rg_passed or rg_over),
            "evidence": e,
            "mismatch": state == "done" and e["ok"] is False,
        })
    reviews = {}
    for g in (review_names(data) if flow_version(data) >= 2 else []):
        entries = data.get("reviews", {}).get(g, [])
        last = entries[-1] if entries else {}
        scored = [x for x in entries if x.get("verdict") != "override"]
        reviews[g] = {"passed": review_passed(data, g), "overridden": review_overridden(data, g),
                      "stale": bool(entries) and not data.get("review_valid", {}).get(g, False),
                      "rounds": len(scored), "threshold": PASS_SCORE.get(g, 8),
                      "kind": "branch" if g in BRANCH_REVIEWS else "gate",
                      "score": last.get("score"), "verdict": last.get("verdict"),
                      "reviewer": (scored[-1] if scored else {}).get("reviewer", ""),
                      "by": last.get("by", ""), "at": last.get("at", ""),
                      "note": last.get("note", ""), "report": last.get("report", "")}
    return {"folder": folder, "name": data.get("name", folder), "comp": data.get("comp", ""),
            "flow": flow_version(data), "profile": data.get("profile", ""), "voice": data.get("voice", ""),
            "next": data.get("next", ""), "updated": data.get("updated", ""),
            "stages": stages, "reviews": reviews, "agents": data.get("agents", {}),
            "log": data.get("log", [])[-60:][::-1]}


def all_views() -> list:
    return [view(p.parent.name) for p in sorted(DOCS.glob("*/status.json"))]


def log(data: dict, stage: str, msg: str, who: str) -> None:
    data.setdefault("log", []).append({"t": now(), "stage": stage, "who": who, "msg": msg})


def cmd_init(a) -> None:
    p = status_path(a.folder)
    if not a.voice and not a.out:
        raise SystemExit("--voice is required for new videos (or --out for legacy naming); use a placeholder like `tbd` and rename later with `voice`")
    if a.voice and not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", a.voice):
        raise SystemExit("--voice must be a lowercase kebab-case slug")
    gates = [g for g in (a.gates or "").split(",") if g]
    bad = set(gates) - set(STAGE_IDS)
    if bad:
        raise SystemExit(f"unknown gate stages: {sorted(bad)}")
    with status_lock(a.folder):
        if p.exists():
            raise SystemExit(f"{rel(p)} already exists")
        out_name = a.out or (f"{a.folder}-{a.voice}" if a.voice else a.folder)
        data = {"workflow_version": FLOW_VERSION, "name": a.name or a.folder, "comp": a.comp,
                "voice": a.voice or "", "profile": a.profile,
                "paths": {"audio": a.audio or a.folder, "out": out_name, "qa": a.qa or a.folder},
                "gates": gates, "stages": {}, "reviews": {}, "review_valid": {}, "next": "", "log": []}
        log(data, "-", "status initialised", "agent")
        save(a.folder, data)
    print(f"created {rel(p)}")


def cmd_voice(a) -> None:
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", a.voice):
        raise SystemExit("voice must be a lowercase kebab-case slug")
    with status_lock(a.folder):
        data = load(a.folder)
        if flow_version(data) < 2:
            raise SystemExit("voice changes require a workflow v2+ status")
        if data.get("voice") == a.voice:
            print("voice unchanged")
            return
        data["voice"] = a.voice
        data.setdefault("paths", {})["out"] = f"{a.folder}-{a.voice}"
        data.pop("render_check", None)
        invalidate_reviews(data, "C")
        for stage in ("voice", "render"):
            data.setdefault("stages", {}).setdefault(stage, {})["state"] = "pending"
        log(data, "voice", f"voice changed to {a.voice}; output {data['paths']['out']}-reel.mp4", "agent")
        save(a.folder, data)
    print(f"output: out/{a.folder}-{a.voice}-reel.mp4")


def cmd_set(a) -> None:
    if a.stage not in STAGE_IDS or a.state not in STATES:
        raise SystemExit(f"stage must be one of {STAGE_IDS}; state one of {sorted(STATES)}")
    with status_lock(a.folder):
        data = load(a.folder)
        s = data.setdefault("stages", {}).setdefault(a.stage, {})
        if a.state in {"in_progress", "blocked", "failed"} and flow_version(data) >= 2:
            invalidate_reviews(data, INVALIDATE_FROM_STAGE[a.stage])
            if a.stage in INVALIDATE_BRANCH:
                invalidate_reviews(data, INVALIDATE_BRANCH[a.stage])
            if a.stage in {"voice", "build", "audio", "qa", "render"}:
                data.pop("render_check", None)
        s.update({"state": a.state, "at": now()})
        if a.note is not None:
            s["note"] = a.note
        msg = f"{a.stage} -> {a.state}" + (f": {a.note}" if a.note else "")
        if a.state == "done":
            item = evidence(a.folder, data).get(a.stage, {})
            files = item.get("files", [])
            detail = item.get("detail") or (f"{len(files)} file(s): {files[-1]}" if files else "no files")
            parts = [f"evidence: {detail}"]
            rg = STAGE_GATE.get(a.stage)
            if rg:
                revs = data.get("reviews", {}).get(rg, [])
                if revs:
                    last = revs[-1]
                    parts.append(f"gate {rg}: {last.get('verdict')} {last.get('score')}/10")
                else:
                    parts.append(f"gate {rg}: no review yet")
            msg += " (" + "; ".join(parts) + ")"
        stop = a.stage in data.get("gates", []) and a.state == "done" and s.get("gate") != "approved"
        if stop:
            s["gate"] = "waiting"
            msg += " (waiting for approval)"
        if a.next is not None:
            data["next"] = a.next
        log(data, a.stage, msg, "agent")
        save(a.folder, data)
    print(msg)
    if stop:
        print(f"STOP: gate '{a.stage}' needs approval in the monitor (python3 -I scripts/pipeline.py serve).")


def cmd_upgrade(a) -> None:
    """Move an in-flight v2 video to the v3 branch flow, only while nothing after gate A was reviewed."""
    with status_lock(a.folder):
        data = load(a.folder)
        if flow_version(data) != 2:
            raise SystemExit(f"only workflow v2 videos can be upgraded (this is v{flow_version(data)})")
        later = [g for g in data.get("reviews", {}) if g != "A" and data["reviews"][g]]
        if later:
            raise SystemExit(f"reviews after A already recorded ({later}); finish this video on v2")
        data["workflow_version"] = FLOW_VERSION
        log(data, "-", "workflow upgraded to v3 (content/audio/design branches + join)", "agent")
        save(a.folder, data)
    print(f"{a.folder}: workflow v{FLOW_VERSION}")


def cmd_agent(a) -> None:
    """Record what one agent is doing, so the monitor can light it up (running) or dim it (done/idle)."""
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*(?:-\d+)?", a.agent) or a.state not in AGENT_STATES:
        raise SystemExit(f"agent must be a kebab-case name; state one of {sorted(AGENT_STATES)}")
    with status_lock(a.folder):
        data = load(a.folder)
        data.setdefault("agents", {})[a.agent] = {"state": a.state, "at": now(), "note": a.note or "", "stage": a.stage or ""}
        log(data, a.stage or "agent", f"{a.agent} {a.state}" + (f": {a.note}" if a.note else ""), a.agent)
        save(a.folder, data)
    print(f"{a.agent} -> {a.state}")


def cmd_gate(a) -> None:
    data = load(a.folder)
    if a.stage in ALL_REVIEWS:
        ok = review_passed(data, a.stage)
        over = review_overridden(data, a.stage)
        state = 'pass' if ok else ('user-override' if over else 'not passed')
        print(f"review {a.stage}: {state}")
        sys.exit(0 if (ok or over) else 1)
    if a.stage not in data.get("gates", []):
        print("no gate")
        return
    g = data.get("stages", {}).get(a.stage, {})
    print(g.get("gate", "open"), g.get("gate_comment", ""))
    sys.exit(0 if g.get("gate") == "approved" else 1)


def cmd_review(a) -> None:
    if a.gate not in ALL_REVIEWS or not 0 <= a.score <= 10:
        raise SystemExit(f"gate must be one of {ALL_REVIEWS}; score must be 0..10")
    if a.verdict == "pass" and a.score < PASS_SCORE.get(a.gate, 8):
        raise SystemExit(f"passing review {a.gate} requires score >= {PASS_SCORE.get(a.gate, 8)}")
    report = (DOCS / a.folder / a.report).resolve()
    if report.parent != (DOCS / a.folder).resolve() or not report.is_file() or not report.read_text(encoding="utf-8").strip():
        raise SystemExit("review report must be a nonempty file in docs/<video>/")
    with status_lock(a.folder):
        data = load(a.folder)
        if flow_version(data) < 2:
            raise SystemExit("review gates require a workflow v2+ status; create a new video with init")
        if a.gate in BRANCH_REVIEWS and flow_version(data) < 3:
            raise SystemExit("branch reviews require a workflow v3 status")
        for before in review_prerequisites(data, a.gate):
            if not review_satisfied(data, before):
                raise SystemExit(f"review {before} must pass before {a.gate}")
        # Audio needs no user confirmation (automatic workflow); `audio-listen` stays as an optional record.
        if a.gate == "C" and not verified_render(data):
            raise SystemExit("verify the current MP4 before video review")
        entry = {"at": now(), "reviewer": a.reviewer, "score": a.score,
                 "verdict": a.verdict, "report": rel(report), "note": a.note or ""}
        if a.gate == "C":
            entry["render_fingerprint"] = data["render_check"]["fingerprint"]
            entry["render_sha256"] = data["render_check"].get("sha256")
            entry["full_listen"] = bool(a.full_listen)
        data.setdefault("reviews", {}).setdefault(a.gate, []).append(entry)
        data.setdefault("review_valid", {})[a.gate] = True
        for gate in later_reviews(a.gate):
            data.setdefault("review_valid", {})[gate] = False
        log(data, a.gate, f"review {a.score}/10 {a.verdict}: {a.report}" + (f" ({a.note})" if a.note else ""), a.reviewer)
        save(a.folder, data)
    print(f"review {a.gate}: {a.score}/10 {a.verdict}")
    if a.gate == "C" and a.verdict == "pass":
        publish_after_gate_c(a.folder)


def publish_after_gate_c(folder: str) -> None:
    """Upload the exact Gate-C artifact as private/draft when this video opts in."""
    config_path = DOCS / folder / "publishing.json"
    if not config_path.is_file():
        return
    data = load(folder)
    fingerprint = data.get("render_check", {}).get("fingerprint", "")
    try:
        config = json.loads(config_path.read_text(encoding="utf-8"))
        if config.get("autoDraft") is not True:
            return
        platform = config.get("platform", "both")
        title = config.get("title")
        description = config.get("description", "")
        if platform not in {"youtube", "facebook", "both"} or not isinstance(title, str) or not title.strip():
            raise ValueError("publishing.json requires a nonempty title and platform youtube, facebook, or both")
    except (AttributeError, json.JSONDecodeError, TypeError, ValueError) as exc:
        record_publishing(folder, "failed", "invalid", fingerprint, [])
        raise SystemExit(str(exc)) from exc
    if not review_passed(data, "C"):
        raise SystemExit("automatic draft upload requires Gate C to pass")
    video = (ROOT / "out" / f"{data['paths']['out']}-reel.mp4").resolve()
    command = [sys.executable, str(ROOT / "scripts" / "publish-video.py"), folder,
               "--file", str(video), "--title", title.strip(), "--description", str(description),
               "--platform", platform, "--execute", "--auto-draft"]
    result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    state = "submitted" if result.returncode == 0 else "failed"
    results = []
    for line in result.stdout.splitlines():
        try:
            item = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(item, dict) and item.get("platform") in {"youtube", "facebook"}:
            results.append({key: item[key] for key in ("platform", "status", "remote_id", "skipped") if key in item})
    record_publishing(folder, state, platform, fingerprint, results)
    if result.returncode:
        raise SystemExit("automatic draft upload failed: " + (result.stderr or result.stdout)[-500:])


def record_publishing(folder: str, state: str, platform: str, fingerprint: str, results: list) -> None:
    with status_lock(folder):
        latest = load(folder)
        latest["publishing"] = {"state": state, "at": now(), "platform": platform,
                                "fingerprint": fingerprint, "results": results}
        log(latest, "publishing", f"private/draft upload {state} for {platform}", "publisher")
        save(folder, latest)


def cmd_override(a) -> None:
    """Record an explicit user override for a review gate.

    Does NOT change any score: the last review entry keeps its true score/verdict,
    and a new entry {verdict: override, by, note} is appended. Ordering treats an
    overridden gate as satisfied; scoring (`review_passed`, monitor "Đạt") stays strict.
    """
    if a.gate not in ALL_REVIEWS:
        raise SystemExit(f"gate must be one of {ALL_REVIEWS}")
    with status_lock(a.folder):
        data = load(a.folder)
        if flow_version(data) < 2:
            raise SystemExit("review gates require a workflow v2+ status; create a new video with init")
        prev = (data.get("reviews", {}).get(a.gate) or [{}])[-1]
        entry = {"at": now(), "reviewer": f"override:{a.by}", "score": prev.get("score"),
                 "verdict": "override", "report": prev.get("report", ""),
                 "note": a.note or "", "by": a.by}
        data.setdefault("reviews", {}).setdefault(a.gate, []).append(entry)
        data.setdefault("review_valid", {})[a.gate] = True
        for gate in later_reviews(a.gate):
            data.setdefault("review_valid", {})[gate] = False
        log(data, a.gate, f"override by {a.by}" + (f": {a.note}" if a.note else ""), a.by)
        save(a.folder, data)
    print(f"review {a.gate}: user-override by {a.by} (last score: {prev.get('score')})")


def verified_render(data: dict) -> bool:
    path = ROOT / "out" / f"{data.get('paths', {}).get('out', '')}-reel.mp4"
    return path.is_file() and data.get("render_check", {}).get("fingerprint") == file_fingerprint(path)


def cmd_verify(a) -> None:
    data = load(a.folder)
    path = ROOT / "out" / f"{data.get('paths', {}).get('out', a.folder)}-reel.mp4"
    if not path.is_file():
        raise SystemExit(f"missing final MP4: {path}")
    duration = validate_media(path, a.min_seconds, a.max_seconds)
    fingerprint = file_fingerprint(path)
    sha256 = file_sha256(path)
    with status_lock(a.folder):
        data = load(a.folder)
        previous = data.get("render_check", {})
        if previous.get("fingerprint") != fingerprint or (previous.get("sha256") and previous.get("sha256") != sha256):
            invalidate_reviews(data, "C")
        data["render_check"] = {"fingerprint": fingerprint, "sha256": sha256,
                                "duration": round(duration, 2), "at": now()}
        log(data, "render", f"verified {duration:.2f}s H.264/AAC 1080x1920 30fps", "verify")
        save(a.folder, data)
    print(f"verified {rel(path)}: {duration:.2f}s H.264/AAC 1080x1920 30fps")


def validate_media(path: Path, min_seconds: float, max_seconds: float) -> float:
    if min_seconds < 0 or max_seconds < min_seconds:
        raise SystemExit("invalid duration range")
    result = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
                            capture_output=True, text=True)
    if result.returncode:
        raise SystemExit(f"ffprobe failed: {result.stderr.strip()}")
    probe = json.loads(result.stdout)
    video = next((s for s in probe["streams"] if s["codec_type"] == "video"), None)
    audio = next((s for s in probe["streams"] if s["codec_type"] == "audio"), None)
    duration = float(probe["format"].get("duration", 0))
    if not video or (video["codec_name"], video["width"], video["height"], video.get("r_frame_rate")) != ("h264", 1080, 1920, "30/1"):
        raise SystemExit("expected H.264 video, 1080x1920 at 30 fps")
    if not audio or audio["codec_name"] != "aac":
        raise SystemExit("expected AAC audio")
    if not min_seconds <= duration <= max_seconds:
        raise SystemExit(f"duration {duration:.2f}s outside {min_seconds}..{max_seconds}s")
    return duration


def cmd_render(a) -> None:
    data = load(a.folder)
    out_dir = ROOT / "out"
    out_dir.mkdir(parents=True, exist_ok=True)
    target = out_dir / f"{data['paths']['out']}-reel.mp4"
    lock_path = out_dir / f".{data['paths']['out']}.render.lock"
    with lock_path.open("a+") as render_lock:
        fcntl.flock(render_lock, fcntl.LOCK_EX)
        cmd_set(argparse.Namespace(folder=a.folder, stage="render", state="in_progress", note="rendering", next=None))
        try:
            with tempfile.TemporaryDirectory(prefix=f".{data['paths']['out']}-", dir=out_dir) as td:
                work = Path(td)
                raw = Path(a.raw).resolve() if a.raw else work / "raw.mp4"
                if not a.raw:
                    subprocess.run(["npx", "remotion", "render", "src/index.ts", data["comp"], str(raw),
                                    "--codec", "h264", "--crf", "18", "--pixel-format", "yuv420p"], cwd=ROOT, check=True)
                final = work / "final.mp4"
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-c:v", "copy",
                                "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac",
                                "-b:a", "192k", str(final)], check=True)
                validate_media(final, a.min_seconds, a.max_seconds)
                os.replace(final, target)
            cmd_verify(a)
            cmd_set(argparse.Namespace(folder=a.folder, stage="render", state="done", note="verified final MP4", next=None))
        except (subprocess.CalledProcessError, SystemExit) as exc:
            cmd_set(argparse.Namespace(folder=a.folder, stage="render", state="failed", note=str(exc), next=None))
            raise SystemExit(f"render failed; previous output preserved: {exc}") from exc
        finally:
            fcntl.flock(render_lock, fcntl.LOCK_UN)


def record_audio_listen(folder: str, by: str, note: str = "") -> dict:
    with status_lock(folder):
        data = load(folder)
        fp = audio_fingerprint(folder, data)
        if not fp:
            raise SystemExit("every voice.json clip must exist in public/audio/<video>/ before the audio listen")
        data["audio_listen"] = {"at": now(), "by": by, "note": note, "fingerprint": fp}
        log(data, "audio-listen", f"voice + BGM audition confirmed{': ' + note if note else ''}", by)
        save(folder, data)
    return data


def cmd_audio_listen(a) -> None:
    record_audio_listen(a.folder, a.by, a.note or "")
    print(f"audio listen confirmed by {a.by}")


def audition_files(folder: str, data: dict) -> dict:
    """Voice clips (voice.json order), bgm* and sfx* files the audition page may play."""
    audio = ROOT / "public" / "audio" / data.get("paths", {}).get("audio", folder)
    vj = DOCS / folder / "voice.json"
    lines = json.loads(vj.read_text(encoding="utf-8")) if vj.is_file() else {}
    text = lambda v: v if isinstance(v, str) else " ".join(x["t"] if isinstance(x, dict) else str(x) for x in v)
    pick = lambda pat: sorted(f.name for f in audio.glob(pat) if f.suffix in (".mp3", ".wav"))
    return {"dir": audio,
            "clips": [{"id": k, "text": text(v), "file": f"{k}.mp3", "exists": (audio / f"{k}.mp3").is_file()}
                      for k, v in lines.items()],
            "bgm": pick("bgm*"), "sfx": pick("sfx*")}


def cmd_listen(a) -> None:
    with status_lock(a.folder):
        data = load(a.folder)
        if not review_passed(data, "C"):
            raise SystemExit("gate C (AI video review) must pass on the current render before the user listen")
        data["listen"] = {"at": now(), "by": a.by, "note": a.note or "", "fingerprint": data["render_check"]["fingerprint"]}
        log(data, "listen", f"full listen confirmed{': ' + a.note if a.note else ''}", a.by)
        save(a.folder, data)
    print(f"listen confirmed by {a.by}")


def cmd_check(a) -> None:
    data = load(a.folder)
    if flow_version(data) < 2:
        raise SystemExit("check requires a workflow v2+ status")
    names = review_names(data)
    missing = [g for g in names if not review_passed(data, g)]
    overridden = [g for g in names if not review_passed(data, g) and review_overridden(data, g)]
    incomplete = [s for s in required_stages(data) if data.get("stages", {}).get(s, {}).get("state") != "done"]
    ev = evidence(a.folder, data)
    absent = [s for s, item in ev.items() if item["ok"] is False]
    if missing or incomplete or absent:  # the human listen is an optional record, never blocks delivery
        raise SystemExit(f"not ready: reviews={missing} (user-overridden: {overridden}), stages={incomplete}, evidence={absent}")
    print(f"ready: {a.folder}, out/{data['paths']['out']}-reel.mp4")


def cmd_show(a) -> None:
    views = [view(a.folder)] if a.folder else all_views()
    icon = {"done": "✓", "in_progress": "…", "pending": "·", "blocked": "!", "failed": "✗", "skipped": "-"}
    for v in views:
        print(f"\n{v['name']} ({v['folder']}, {v['comp']})  next: {v['next'] or '-'}")
        for s in v["stages"]:
            gate = f"  [gate: {s['gate']}]" if s["gate"] else ""
            warn = "  ⚠ declared done but files missing" if s["mismatch"] else ""
            if s["gate_mismatch"]:
                r = v["reviews"].get(s["review_gate"], {})
                warn += f"  ⚠ done nhưng gate {s['review_gate']} chưa đạt ({r.get('score')}/10)"
            print(f"  {icon[s['state']]} {s['label']:<18} {s['state']:<11} {s['note']}{gate}{warn}")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code: int, body: bytes, ctype: str) -> None:
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _json(self, code: int, obj) -> None:
        self._send(code, json.dumps(obj, ensure_ascii=False).encode(), "application/json; charset=utf-8")

    def _load(self, folder: str):
        try:
            return load(folder)
        except (FileNotFoundError, json.JSONDecodeError, SystemExit):
            return None

    def _media(self, folder: str) -> None:
        data = self._load(folder)
        if data is None:
            return self._json(404, {"error": "video not found"})
        out_name = str(data.get("paths", {}).get("out", ""))
        if not re.fullmatch(r"[A-Za-z0-9_-]+", out_name):
            return self._json(404, {"error": "video not found"})
        out_dir = (ROOT / "out").resolve()
        media = (out_dir / f"{out_name}-reel.mp4").resolve()
        if media.parent != out_dir or not media.is_file():
            return self._json(404, {"error": "render not found"})
        self._stream(media, "video/mp4")

    def _audio(self, folder: str, name: str) -> None:
        data = self._load(folder)
        if data is None:
            return self._json(404, {"error": "video not found"})
        files = audition_files(folder, data)
        allowed = {c["file"] for c in files["clips"] if c["exists"]} | set(files["bgm"]) | set(files["sfx"])
        if name not in allowed:
            return self._json(404, {"error": "audio not found"})
        self._stream(files["dir"] / name, "audio/mpeg" if name.endswith(".mp3") else "audio/wav")

    def _audition(self, folder: str) -> None:
        data = self._load(folder)
        if data is None:
            return self._json(404, {"error": "video not found"})
        files = audition_files(folder, data)
        files.pop("dir")
        self._json(200, {"video": folder, "name": data.get("name", folder), **files,
                         "ready": bool(audio_fingerprint(folder, data)),
                         "listened": audio_listened(folder, data), "last": data.get("audio_listen", {})})

    def _stream(self, media: Path, ctype: str) -> None:
        size = media.stat().st_size
        start, end, code = 0, size - 1, 200
        requested = self.headers.get("Range")
        if requested:
            match = re.fullmatch(r"bytes=(\d*)-(\d*)", requested.strip())
            if not match:
                return self._range_error(size)
            left, right = match.groups()
            if not left and not right:
                return self._range_error(size)
            if left:
                start = int(left)
                end = int(right) if right else size - 1
            else:
                length = int(right)
                if length <= 0:
                    return self._range_error(size)
                start = max(0, size - length)
            if start >= size or end < start:
                return self._range_error(size)
            end = min(end, size - 1)
            code = 206

        length = end - start + 1
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(length))
        self.send_header("Cache-Control", "no-store")
        if code == 206:
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.end_headers()
        with media.open("rb") as source:
            source.seek(start)
            remaining = length
            while remaining:
                chunk = source.read(min(64 * 1024, remaining))
                if not chunk:
                    break
                self.wfile.write(chunk)
                remaining -= len(chunk)

    def _range_error(self, size: int) -> None:
        self.send_response(416)
        self.send_header("Content-Range", f"bytes */{size}")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._send(200, HTML.read_bytes(), "text/html; charset=utf-8")
        elif self.path == "/api/status":
            self._json(200, all_views())
        elif self.path == "/api/meta":
            self._json(200, {"flow": FLOW, "agents": roster(), "stages": dict(STAGES), "pass_score": PASS_SCORE})
        elif match := re.fullmatch(r"/media/([A-Za-z0-9_-]+)", self.path):
            self._media(match.group(1))
        elif re.fullmatch(r"/audition/[A-Za-z0-9_-]+", self.path):
            self._send(200, AUDITION_HTML.read_bytes(), "text/html; charset=utf-8")
        elif match := re.fullmatch(r"/api/audition/([A-Za-z0-9_-]+)", self.path):
            self._audition(match.group(1))
        elif match := re.fullmatch(r"/audio/([A-Za-z0-9_-]+)/([A-Za-z0-9_.-]+)", self.path):
            self._audio(*match.groups())
        elif self.path == "/vendor/howler.min.js" and HOWLER.is_file():
            self._send(200, HOWLER.read_bytes(), "text/javascript; charset=utf-8")
        else:
            self._json(404, {"error": "not found"})

    def do_POST(self):
        if self.path == "/api/audio-listen":
            return self._audio_listen()
        if self.path != "/api/gate":
            return self._json(404, {"error": "not found"})
        try:
            body = json.loads(self.rfile.read(min(int(self.headers.get("Content-Length", 0)), 10_000)))
            folder, stage, decision = body["video"], body["stage"], body["decision"]
            comment = str(body.get("comment", ""))[:500]
        except (ValueError, KeyError, TypeError):
            return self._json(400, {"error": "bad request"})
        known = {p.parent.name for p in DOCS.glob("*/status.json")}
        if folder not in known or stage not in STAGE_IDS or decision not in DECISIONS:
            return self._json(400, {"error": "unknown video, stage or decision"})
        with status_lock(folder):
            data = load(folder)
            if stage not in data.get("gates", []):
                return self._json(400, {"error": "stage has no gate"})
            s = data.setdefault("stages", {}).setdefault(stage, {})
            s["gate"], s["gate_comment"] = decision, comment
            log(data, stage, f"gate {decision}" + (f": {comment}" if comment else ""), "you")
            save(folder, data)
        self._json(200, view(folder))

    def _audio_listen(self) -> None:
        try:
            body = json.loads(self.rfile.read(min(int(self.headers.get("Content-Length", 0)), 10_000)))
            folder, by, note = str(body["video"]), str(body["by"]).strip()[:80], str(body.get("note", ""))[:500]
        except (ValueError, KeyError, TypeError):
            return self._json(400, {"error": "bad request"})
        if folder not in {p.parent.name for p in DOCS.glob("*/status.json")} or not by:
            return self._json(400, {"error": "unknown video or missing name"})
        try:
            record_audio_listen(folder, by, note)
        except SystemExit as e:
            return self._json(409, {"error": str(e)})
        self._audition(folder)

    def log_message(self, *args):
        pass


def cmd_serve(a) -> None:
    srv = ThreadingHTTPServer(("127.0.0.1", a.port), Handler)
    print(f"pipeline monitor: http://127.0.0.1:{a.port}")
    srv.serve_forever()


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("init"); p.add_argument("folder"); p.add_argument("--comp", required=True)
    p.add_argument("--name"); p.add_argument("--audio"); p.add_argument("--out"); p.add_argument("--qa"); p.add_argument("--gates")
    p.add_argument("--voice"); p.add_argument("--profile", choices=("story", "product", "knowledge", "news"), default="story")
    p.set_defaults(fn=cmd_init)
    p = sub.add_parser("set"); p.add_argument("folder"); p.add_argument("stage"); p.add_argument("state")
    p.add_argument("--note"); p.add_argument("--next"); p.set_defaults(fn=cmd_set)
    p = sub.add_parser("voice"); p.add_argument("folder"); p.add_argument("voice"); p.set_defaults(fn=cmd_voice)
    p = sub.add_parser("gate"); p.add_argument("folder"); p.add_argument("stage"); p.set_defaults(fn=cmd_gate)
    p = sub.add_parser("upgrade"); p.add_argument("folder"); p.set_defaults(fn=cmd_upgrade)
    p = sub.add_parser("agent"); p.add_argument("folder"); p.add_argument("agent"); p.add_argument("state", choices=sorted(AGENT_STATES))
    p.add_argument("--stage"); p.add_argument("--note"); p.set_defaults(fn=cmd_agent)
    p = sub.add_parser("review"); p.add_argument("folder"); p.add_argument("gate", choices=ALL_REVIEWS); p.add_argument("score", type=float)
    p.add_argument("--reviewer", required=True); p.add_argument("--report", required=True)
    p.add_argument("--verdict", choices=("pass", "revise"), default="pass"); p.add_argument("--note")
    p.add_argument("--full-listen", action="store_true", help="gate C: optional note that the reviewer also heard the audio")
    p.set_defaults(fn=cmd_review)
    p = sub.add_parser("override"); p.add_argument("folder"); p.add_argument("gate", choices=ALL_REVIEWS)
    p.add_argument("--by", required=True); p.add_argument("--note"); p.set_defaults(fn=cmd_override)
    p = sub.add_parser("verify"); p.add_argument("folder"); p.add_argument("--min-seconds", type=float, default=40)
    p.add_argument("--max-seconds", type=float, default=60); p.set_defaults(fn=cmd_verify)
    p = sub.add_parser("render"); p.add_argument("folder"); p.add_argument("--raw")
    p.add_argument("--min-seconds", type=float, default=40); p.add_argument("--max-seconds", type=float, default=60)
    p.set_defaults(fn=cmd_render)
    p = sub.add_parser("listen"); p.add_argument("folder"); p.add_argument("--by", required=True); p.add_argument("--note")
    p.set_defaults(fn=cmd_listen)
    p = sub.add_parser("audio-listen"); p.add_argument("folder"); p.add_argument("--by", required=True); p.add_argument("--note")
    p.set_defaults(fn=cmd_audio_listen)
    p = sub.add_parser("check"); p.add_argument("folder"); p.set_defaults(fn=cmd_check)
    p = sub.add_parser("show"); p.add_argument("folder", nargs="?"); p.set_defaults(fn=cmd_show)
    p = sub.add_parser("serve"); p.add_argument("--port", type=int, default=4180); p.set_defaults(fn=cmd_serve)
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
