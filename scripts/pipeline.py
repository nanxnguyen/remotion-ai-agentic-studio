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
Gate pass scores: A, content, audio, E >= 9; D >= 8.5; B, C >= 8 (PASS_SCORE). The A sub-score for specificity (>= 9)
and the no-open-Cao/Trung rule are reviewer-side rules in the skill; this CLI records one number.
States: pending, in_progress, done, blocked, failed.
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import unicodedata
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
    ("render", "Render"),
    ("qa", "Final QA"),  # last barrier: verifies everything on the rendered, gate-C-approved video
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
# `set done` needs these gates accepted first; render is done once verified, and gate C reviews that file after.
DONE_NEEDS_GATE = {s: g for s, g in STAGE_GATE.items() if s != "render"}
REVIEW_ORDER = list(REVIEW_GATES)
PASS_SCORE = {"A": 9, "D": 8.5, "E": 9, "B": 9, "content": 9, "audio": 9}  # C passes at 8
INVALIDATE_FROM_STAGE = {
    "research": "A", "brief": "A", "script": "A", "content": "E", "voice": "E", "design": "D",
    "build": "C", "audio": "C", "qa": None, "render": "C",  # final QA runs after C: starting it must not void C
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
    {"id": "render", "label": "Render + gate C", "lane": "main", "stage": "render", "agents": ["render-agent"], "reviewer": "video-reviewer", "gate": "C"},
    {"id": "qa", "label": "Final QA", "lane": "main", "stage": "qa", "agents": ["qa-agent"], "reviewer": None, "gate": None},
    {"id": "delivery", "label": "Delivery", "lane": "main", "stage": None, "agents": ["video-director"], "reviewer": None, "gate": None},
]


def roster() -> list:
    """Agents in .claude/agents/*.md (generated from .agents/roles/ by sync_agents.py), plus the director thread."""
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


if os.name == "nt":
    import msvcrt

    def lock_file(f) -> None:
        # msvcrt locks byte ranges at the current position; always lock byte 0.
        f.seek(0)
        while True:
            try:
                msvcrt.locking(f.fileno(), msvcrt.LK_LOCK, 1)
                return
            except OSError:
                time.sleep(0.1)

    def unlock_file(f) -> None:
        f.seek(0)
        msvcrt.locking(f.fileno(), msvcrt.LK_UNLCK, 1)
else:
    import fcntl

    def lock_file(f) -> None:
        fcntl.flock(f, fcntl.LOCK_EX)

    def unlock_file(f) -> None:
        fcntl.flock(f, fcntl.LOCK_UN)


@contextmanager
def status_lock(folder: str):
    p = status_path(folder)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.with_suffix(".lock").open("a+") as lock:
        lock_file(lock)
        try:
            yield
        finally:
            unlock_file(lock)


def load(folder: str) -> dict:
    return json.loads(status_path(folder).read_text(encoding="utf-8"))


def save(folder: str, data: dict) -> None:
    data["updated"] = now()
    p = status_path(folder)
    tmp = p.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for attempt in range(40):
        try:
            os.replace(tmp, p)
            return
        except PermissionError:  # Windows: a reader (monitor poll) holds status.json open for a moment
            if attempt == 39:
                raise
            time.sleep(0.05)


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


# Content rules: a video must show pictures or motion, not only text on a background (what the monitor showed).
SHOTCRAFT_DEMOS = ROOT / "skills" / "video-shotcraft" / "demos"  # vendored motion library, not in Git: restore it first
VISUAL_ASSET_RE = re.compile(r"<(Img|Video|OffthreadVideo|Lottie|svg|path|rect|circle|ellipse|polygon|line)\b"
                             r"|staticFile\(|from\s+['\"][^'\"]*(assets|demos)/")
MOTION_RE = re.compile(r"transform|scale\(|translate|rotate|clipPath|backgroundPosition|\bwidth:|\bheight:|\bleft:|\btop:")
VISUAL_CONTENT_RE = re.compile(r"visual content\s*[:=]\s*(\d+(?:\.\d+)?)\s*/\s*10", re.I)
VISUAL_MIN = 7  # gate C: a report must score "visual content" at least this, or C cannot pass


def scene_problems(folder: str) -> list:
    scenes = sorted((ROOT / "src" / "videos" / folder / "scenes").glob("*.tsx"))
    if not scenes:
        return [f"no scene files in src/videos/{folder}/scenes/"]
    problems = []
    for f in scenes:
        text = f.read_text(encoding="utf-8")
        if VISUAL_ASSET_RE.search(text) or (MOTION_RE.search(text) and "interpolate(" in text):
            continue
        problems.append(f"{f.name} is text on a background only (no image, shape, video or motion)")
    return problems


def demo_problems(folder: str) -> list:
    spec = DOCS / folder / "design-spec.md"
    if not spec.is_file() or not re.search(r"demo", spec.read_text(encoding="utf-8"), re.I):
        return []
    has_demos = SHOTCRAFT_DEMOS.is_dir() and any(SHOTCRAFT_DEMOS.rglob("*.tsx"))
    if not has_demos:
        return ["design-spec cites demo TSX but skills/video-shotcraft/demos has no .tsx files (restore the motion library)"]
    return []


def stills_problem(shots: list) -> str:
    """Stills must be several and distinct. Size cannot tell a blank still from a real one, so content is judged by
    scene_problems and the gate C visual score."""
    if len(shots) < 3:
        return f"{len(shots)} stills (need at least 3)"
    if len({file_sha256(s) for s in shots}) < len(shots):
        return "duplicate stills"
    return ""


def visual_problem(report: Path) -> str:
    m = VISUAL_CONTENT_RE.search(report.read_text(encoding="utf-8"))
    if not m:
        return "report has no line 'visual content: X/10' (frames with real image or motion)"
    if float(m.group(1)) < VISUAL_MIN:
        return f"visual content {m.group(1)}/10 is below {VISUAL_MIN}: text on a background is not a video"
    return ""


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
    ev["content"] = {"ok": bool(cp), "files": cp, "detail": "" if cp else "no content-pack.md"}

    ds = files("design-spec.md")
    ev["design"] = {"ok": bool(ds), "files": ds}

    root_tsx = (ROOT / "src" / "Root.tsx").read_text(encoding="utf-8")
    # Registry-first: comps are registered via videoRegistry (src/videos/**/index.ts), Root.tsx maps it.
    catalog = ""
    videos_dir = ROOT / "src" / "videos"
    if videos_dir.is_dir():
        catalog = "\n".join(p.read_text(encoding="utf-8") for p in sorted(videos_dir.glob("**/index.ts")))
    ev["build"] = {"ok": bool(comp) and (f'id="{comp}"' in root_tsx
                                         or f"id: '{comp}'" in catalog or f'id: "{comp}"' in catalog),
                   "files": ["src/Root.tsx"] if comp else [],
                   "detail": f"composition {comp or '?'}"}

    am = files("assets-manifest.md")
    ev["audio"] = {"ok": True if am else None, "files": am}

    shots = sorted((ROOT / "out" / "qa").glob(f"{qa_prefix}-*.png"))
    qa_problem = stills_problem(shots)
    ev["qa"] = {"ok": not qa_problem, "files": [rel(s) for s in shots[-6:]], "detail": qa_problem or f"{len(shots)} stills"}

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
        # v3: only an agent's `set done` makes a stage done; files alone (a scaffold, design stills) never do.
        state = d.get("state") or ("done" if e["ok"] and flow_version(data) < 3 else "pending")
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


def missing_prerequisites(folder: str, data: dict, stage: str) -> list:
    """v3 order: build waits for the join (E) and the plan (B); final QA waits for the verified render and gate C,
    with every other stage done, because it is the last barrier over the whole video."""
    declared = data.get("stages", {})
    missing = []
    if stage == "build":
        missing += [f"gate {g} has not passed" for g in ("E", "B") if not review_satisfied(data, g)]
        missing += scene_problems(folder)
    if stage == "design":
        missing += demo_problems(folder)
    if stage == "qa":
        if not evidence(folder, data)["render"]["ok"]:
            missing.append("no verified render yet (run `pipeline.py render` first)")
        if not review_satisfied(data, "C"):
            missing.append("gate C has not passed")
        missing += [f"stage {s} is not done" for s in required_stages(data)
                    if s != "qa" and declared.get(s, {}).get("state") not in {"done", "skipped"}]
    return missing


def cmd_set(a) -> None:
    if a.stage not in STAGE_IDS or a.state not in STATES:
        raise SystemExit(f"stage must be one of {STAGE_IDS}; state one of {sorted(STATES)}")
    with status_lock(a.folder):
        data = load(a.folder)
        s = data.setdefault("stages", {}).setdefault(a.stage, {})
        if a.state in {"in_progress", "blocked", "failed"} and flow_version(data) >= 2:
            if INVALIDATE_FROM_STAGE[a.stage]:
                invalidate_reviews(data, INVALIDATE_FROM_STAGE[a.stage])
            if a.stage in INVALIDATE_BRANCH:
                invalidate_reviews(data, INVALIDATE_BRANCH[a.stage])
            if a.stage in {"voice", "build", "audio", "render"}:  # final QA reopening alone keeps the render
                data.pop("render_check", None)
        s.update({"state": a.state, "at": now()})
        if a.note is not None:
            s["note"] = a.note
        msg = f"{a.stage} -> {a.state}" + (f": {a.note}" if a.note else "")
        if a.state == "done":
            item = evidence(a.folder, data).get(a.stage, {})
            files = item.get("files", [])
            detail = item.get("detail") or (f"{len(files)} file(s): {files[-1]}" if files else "no files")
            # A stage is done only with its files present and its guarding gate accepted ("Lệch file" otherwise).
            if item.get("ok") is False:
                raise SystemExit(f"refused: {a.stage} cannot be done, evidence missing ({detail})")
            rg = DONE_NEEDS_GATE.get(a.stage)
            if rg and flow_version(data) >= 2 and not review_satisfied(data, rg):
                raise SystemExit(f"refused: {a.stage} cannot be done before gate {rg} passes (review or override)")
            if flow_version(data) >= 3 and (missing := missing_prerequisites(a.folder, data, a.stage)):
                raise SystemExit(f"refused: {a.stage} cannot be done yet: {'; '.join(missing)}")
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
        if a.gate == "C" and a.verdict == "pass" and (problem := visual_problem(report)):
            raise SystemExit(f"gate C cannot pass: {problem}")
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
        lock_file(render_lock)
        cmd_set(argparse.Namespace(folder=a.folder, stage="render", state="in_progress", note="rendering", next=None))
        try:
            with tempfile.TemporaryDirectory(prefix=f".{data['paths']['out']}-", dir=out_dir) as td:
                work = Path(td)
                raw = Path(a.raw).resolve() if a.raw else work / "raw.mp4"
                if not a.raw:
                    # Windows: npx is npx.cmd; CreateProcess can't resolve it without a shell.
                    npx = shutil.which("npx") or "npx"
                    subprocess.run([npx, "remotion", "render", "src/index.ts", data["comp"], str(raw),
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
            unlock_file(render_lock)


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
    if not (DOCS / a.folder / "eval.md").is_file():  # Phase 10 retro is part of delivery
        absent.append("eval.md")
    if missing or incomplete or absent:  # the human listen is an optional record, never blocks delivery
        raise SystemExit(f"not ready: reviews={missing} (user-overridden: {overridden}), stages={incomplete}, evidence={absent}")
    print(f"ready: {a.folder}, out/{data['paths']['out']}-reel.mp4")


# Documents a stage must leave beyond its enforced evidence (rules: .agents/rules/02-documentation.md).
STAGE_DOCS = {
    "script": ["voice.proposed.json"],
    "voice": ["voice-report.md", "voice-clone-asr.md"],
    "audio": ["mix-plan.md"],
    "qa": ["qa-report*.md"],
    "render": ["final-check.md", "render-evidence.md"],
}
STALE_SECONDS = 2 * 3600


def review_report_exists(folder: str, report: str) -> bool:
    # Reports may be stored relative to the repo or as an absolute path from another machine.
    p = Path(report)
    return (ROOT / p).is_file() or p.is_file() or (DOCS / folder / p.name).is_file()


MIN_REVIEW_BYTES = 600  # a passing report this small cannot hold scored criteria plus evidence


def review_report_size(folder: str, report: str) -> int:
    p = Path(report)
    for c in (ROOT / p, p, DOCS / folder / p.name):
        if c.is_file():
            return c.stat().st_size
    return 0


def audit(folder: str) -> dict:
    """Is status.json telling the truth? errors = must fix now, warnings = check by hand."""
    data = load(folder)
    v = view(folder)
    docs = DOCS / folder
    errors, warnings = [], []
    stages = {s["id"]: s for s in v["stages"]}
    for s in v["stages"]:
        if s["mismatch"]:
            errors.append(f"stage {s['id']} is done but evidence is missing ({s['evidence'].get('detail') or 'no files'})")
        if s["gate_mismatch"] and s["id"] in DONE_NEEDS_GATE:
            errors.append(f"stage {s['id']} is done but gate {s['review_gate']} has not passed")
        if s["gate_mismatch"] and s["id"] == "render":
            warnings.append("render is verified but gate C is not passed yet")
        if s["state"] == "done":
            for pattern in STAGE_DOCS.get(s["id"], []):
                if not any(docs.glob(pattern)):
                    errors.append(f"stage {s['id']} is done but docs/{folder}/{pattern} is missing")
            if flow_version(data) >= 3 and s["id"] == "build":
                errors += [f"build is done but {p}" for p in scene_problems(folder)]
            if flow_version(data) >= 3 and s["id"] == "design":
                errors += [f"design is done but {p}" for p in demo_problems(folder)]
    for gate in review_names(data):
        for entry in data.get("reviews", {}).get(gate, []):
            report = entry.get("report")
            if entry.get("verdict") != "override" and report and not review_report_exists(folder, report):
                errors.append(f"review {gate} report {Path(report).name} is missing")
            elif gate == "C" and entry.get("verdict") == "pass" and report and review_report_exists(folder, report) \
                    and (problem := visual_problem(next(c for c in (ROOT / Path(report), Path(report), DOCS / folder / Path(report).name) if c.is_file()))):
                errors.append(f"review C passed without visual evidence: {problem}")
            elif entry.get("verdict") == "pass" and report and review_report_size(folder, report) < MIN_REVIEW_BYTES:
                errors.append(f"review {gate} report {Path(report).name} is too thin to be evidence "
                              f"({review_report_size(folder, report)} bytes; a real review cites files, frames or rows)")
    for name, agent in data.get("agents", {}).items():
        stage = stages.get(agent.get("stage", ""))
        if agent.get("state") == "running" and stage and stage["state"] == "done":
            errors.append(f"agent {name} is still running but stage {stage['id']} is done")
    running = {a.get("stage") for a in data.get("agents", {}).values() if a.get("state") == "running"}
    for s in v["stages"]:
        if s["state"] == "in_progress" and s["id"] not in running and s["at"]:
            try:
                age = (datetime.now().astimezone() - datetime.fromisoformat(s["at"])).total_seconds()
            except ValueError:
                continue
            if age > STALE_SECONDS:
                warnings.append(f"stage {s['id']} in_progress for {int(age // 3600)}h with no running agent")
    started = any(s["state"] not in {"pending", "skipped"} for s in v["stages"]) or data.get("reviews")
    delivered = review_passed(data, "C") and (docs / "eval.md").is_file()
    if started and not delivered and not data.get("next"):
        errors.append("status has no `next` step (set it with `set ... --next`)")
    if review_passed(data, "C") and not (docs / "eval.md").is_file():
        errors.append("gate C passed but eval.md is missing")
    return {"folder": folder, "errors": errors, "warnings": warnings}


def cmd_audit(a) -> None:
    results = [audit(a.folder)] if a.folder else [audit(p.parent.name) for p in sorted(DOCS.glob("*/status.json"))]
    failed = False
    for r in results:
        print(f"{r['folder']}: {'FAIL' if r['errors'] else 'ok'}")
        for e in r["errors"]:
            print(f"  ✗ {e}")
        for w in r["warnings"]:
            print(f"  ! {w}")
        failed = failed or bool(r["errors"])
    sys.exit(1 if failed else 0)


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


# ---- Monitor studio: create videos and command agents from the UI instead of a terminal ----

VOICE_PREVIEWS = ROOT / "vietnamese-voice-samples" / "previews"
RUNS_DIR = ROOT / "out" / "agent-runs"  # prompts + logs; out/ is not in Git
RUNNERS_FILE = Path(__file__).resolve().parent / "agent-runners.json"  # optional local override
DEFAULT_RUNNERS = {
    # Prompts go through stdin or a file, never argv: Windows .cmd shims re-parse argv through cmd.exe.
    # `model_args`/`effort_args` are inserted before the last argument; the model list comes from runner_models().
    "claude": {"label": "Claude Code", "prompt": "stdin",
               "cmd": ["claude", "-p", "--permission-mode", "auto", "--output-format", "stream-json", "--verbose"],
               "model_args": ["--model", "{model}"], "effort_args": ["--effort", "{effort}"],
               "efforts": ["low", "medium", "high", "xhigh", "max"]},
    "opencode": {"label": "OpenCode", "prompt": "file",
                 "cmd": ["opencode", "run", "--auto", "--format", "json", "--file", "{prompt_file}",
                         "Follow the task in the attached file exactly."],
                 # effort is a model variant (`provider/model#max`); `ladder`: on a rate limit step down the ranked models
                 "model_args": ["--model", "{model}"], "effort_variant": True, "ladder": True, "efforts": []},
    # Codex runs with full access (owner's choice): no sandbox, never asks. codex 0.163 dropped --full-auto.
    "codex": {"label": "Codex", "prompt": "stdin",
              "cmd": ["codex", "exec", "--sandbox", "danger-full-access", "-c", "approval_policy=never",
                      "--skip-git-repo-check", "-"],
              "model_args": ["-m", "{model}"], "effort_args": ["-c", "model_reasoning_effort={effort}"],
              "efforts": ["low", "medium", "high", "xhigh", "max"]},
}
FALLBACK_ORDER = ["claude", "codex", "opencode"]  # next runner tried when one runs out of tokens/quota
CLAUDE_MODELS = [("opus", "Opus (mới nhất)"), ("sonnet", "Sonnet (mới nhất)"), ("haiku", "Haiku (mới nhất)"),
                 ("claude-fable-5-1", "Fable 5.1")]
MODEL_RE = re.compile(r"[A-Za-z0-9][A-Za-z0-9._/:#-]{0,99}")  # argv passes through cmd.exe shims: keep it plain
QUOTA_RE = re.compile(r"rate.?limit(ed| exceeded)|usage.?limit|FreeUsageLimitError|insufficient_quota|quota exceeded|"
                      r"provider\.quota|out of (credits|tokens)|credit balance is too low|"
                      r"hit your (usage )?limit|resource_exhausted", re.I)
_MODELS_CACHE: dict = {}  # runner id -> (fetched monotonic time, models)
# OpenCode models, strongest first (size and reasoning from models.dev, checked 2026-10-17). Models not listed go
# after these, ordered by the same metadata. Edit this list when better models appear.
OPENCODE_RANK = [
    "nemotron-3-ultra-free",        # 550B (55B active), "largest Nemotron 3, maximum reasoning"
    "beam-free",                    # 501B (23B active) reasoning MoE, effort up to max
    "space-bunny-free",             # preview reasoning model, 1M context / 512K output, effort up to max
    "longcat-2.5-preview-free",     # newest multimodal reasoning model, 1M context
    "deepseek-v4.1-flash-free",     # flash tier, effort up to max
    "glm-5.3-flash-free",           # flash tier, effort up to max
    "nemotron-3.5-super-vl-free",   # 120B (12B active) vision-language
    "mimo-v2.6-flash-free",         # flash tier, no reasoning effort
    "big-pickle",                   # 2025 reasoning model
    "nemotron-3.5-lightning-free",  # fast small MoE
]
MODELS_DEV = "https://models.dev/api.json"  # the catalog OpenCode itself uses
MODELS_DEV_CACHE = RUNS_DIR / "models-dev-opencode.json"
EFFORT_ORDER = ["none", "minimal", "low", "medium", "high", "xhigh", "max", "ultra"]
PROFILES = [
    {"id": "story", "label": "Câu chuyện", "hint": "Nhân vật xuyên suốt, có bước ngoặt và kết lắng"},
    {"id": "product", "label": "Sản phẩm", "hint": "UI/sản phẩm thật, claim có nguồn"},
    {"id": "knowledge", "label": "Kiến thức", "hint": "Mỗi shot một ý, ví dụ hoặc sơ đồ"},
    {"id": "news", "label": "Tin tức", "hint": "Mốc thời gian, nguồn kiểm chứng"},
]
LIVE_RUNS: dict = {}  # run id -> Popen, only for runs this server process started
LIVE_LOCK = threading.Lock()
TOPIC_STOPWORDS = {"va", "la", "cua", "cho", "the", "nao", "mot", "nhung", "co", "khong", "voi", "thi", "ma", "o"}


def slugify(text: str, max_len: int = 48) -> str:
    plain = unicodedata.normalize("NFD", text.replace("đ", "d").replace("Đ", "D"))
    plain = "".join(c for c in plain if unicodedata.category(c) != "Mn").lower()
    slug = re.sub(r"[^a-z0-9]+", "-", plain).strip("-")
    while len(slug) > max_len and "-" in slug:
        slug = slug.rsplit("-", 1)[0]
    return slug[:max_len]


def comp_id(slug: str) -> str:
    name = "".join(w.capitalize() for w in slug.split("-") if w)
    return f"{'V' if not name[:1].isalpha() else ''}{name}Reel"


def catalog_voices() -> list:
    files = sorted(VOICE_PREVIEWS.glob("*.mp3")) if VOICE_PREVIEWS.is_dir() else []
    return [{"file": f.name, "slug": slugify(f.stem), "name": f.stem.replace("-", " ")}
            for f in files if re.fullmatch(r"[A-Za-z0-9_-]+\.mp3", f.name)]


def runners() -> dict:
    config = {k: dict(v) for k, v in DEFAULT_RUNNERS.items()}
    if RUNNERS_FILE.is_file():
        config.update(json.loads(RUNNERS_FILE.read_text(encoding="utf-8")))
    for spec in config.values():
        spec["path"] = shutil.which(spec["cmd"][0])
    return config


def _discover_models(runner_id: str, spec: dict) -> list:
    if spec.get("models"):  # agent-runners.json may pin a list
        return [m if isinstance(m, dict) else {"id": m, "label": m} for m in spec["models"]]
    if runner_id == "claude":
        return [{"id": m, "label": label} for m, label in CLAUDE_MODELS]
    if runner_id == "codex":
        home = Path(os.environ.get("CODEX_HOME") or Path.home() / ".codex")
        try:
            cache = json.loads((home / "models_cache.json").read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return []
        return [{"id": m["slug"], "label": m.get("display_name") or m["slug"],
                 "efforts": [x.get("effort") for x in m.get("supported_reasoning_levels", []) if x.get("effort")],
                 "default_effort": m.get("default_reasoning_level", "")}
                for m in cache.get("models", []) if m.get("visibility") == "list" and m.get("slug")]
    if runner_id == "opencode" and spec.get("path"):
        try:
            out = subprocess.run([spec["path"], "models"], capture_output=True, text=True, encoding="utf-8",
                                 timeout=30, cwd=ROOT).stdout
        except (OSError, subprocess.SubprocessError):
            return []
        return rank_opencode([line.strip() for line in out.splitlines() if MODEL_RE.fullmatch(line.strip())],
                             opencode_catalog())
    return []


def opencode_catalog() -> dict:
    """models.dev metadata for OpenCode's own models, cached a day; {} when offline (ranking then uses the list)."""
    try:
        if time.time() - MODELS_DEV_CACHE.stat().st_mtime < 86400:
            return json.loads(MODELS_DEV_CACHE.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        pass
    try:
        from urllib.request import Request, urlopen
        # models.dev answers 403 to Python's default User-Agent
        with urlopen(Request(MODELS_DEV, headers={"User-Agent": "remotion-pipeline-monitor/1.0"}), timeout=10) as resp:
            catalog = json.loads(resp.read().decode("utf-8")).get("opencode", {}).get("models", {})
    except Exception:  # network, TLS or JSON errors: keep any stale copy
        try:
            return json.loads(MODELS_DEV_CACHE.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return {}
    MODELS_DEV_CACHE.parent.mkdir(parents=True, exist_ok=True)
    MODELS_DEV_CACHE.write_text(json.dumps(catalog), encoding="utf-8")
    return catalog


def _model_strength(meta: dict) -> tuple:
    """Fallback order for models missing from OPENCODE_RANK: reasoning, active size, light tiers last, recency."""
    canon = str(meta.get("canonical_model_id", ""))
    active = re.search(r"-a(\d+)b\b", canon) or re.search(r"(\d+)b\b", canon)
    light = bool(re.search(r"flash|lightning|mini|tiny|nano|lite", canon + str(meta.get("id", "")), re.I))
    return (bool(meta.get("reasoning")), not light, int(active.group(1)) if active else 0, meta.get("release_date", ""))


def rank_opencode(ids: list, catalog: dict) -> list:
    models = []
    for full in ids:
        short = full.split("/", 1)[-1]
        meta = catalog.get(short, {})
        opts = meta.get("reasoning_options") or []  # models.dev: a list of {"type": "effort", "values": [...]} options
        opts = [opts] if isinstance(opts, dict) else opts
        values = next((o.get("values") or [] for o in opts if isinstance(o, dict) and o.get("type") == "effort"), [])
        efforts = [e for e in EFFORT_ORDER if e in values]
        models.append({"id": full, "label": meta.get("name") or short, "efforts": efforts,
                       "default_effort": efforts[-1] if efforts else "", "note": meta.get("description", "")[:140],
                       "_known": short in OPENCODE_RANK, "_key": _model_strength({**meta, "id": short})})
    known = sorted((m for m in models if m["_known"]), key=lambda m: OPENCODE_RANK.index(m["id"].split("/", 1)[-1]))
    rest = sorted((m for m in models if not m["_known"]), key=lambda m: m["_key"], reverse=True)
    ranked = known + rest
    for i, m in enumerate(ranked, 1):
        m.pop("_known"), m.pop("_key")
        m["rank"] = i
        m["label"] = f"{i}. {m['label']}"
    return ranked


def runner_models(runner_id: str, spec: dict) -> list:
    """Models the runner's CLI can use on this machine, cached for 10 minutes ("" = the CLI's own default)."""
    hit = _MODELS_CACHE.get(runner_id)
    if hit and time.monotonic() - hit[0] < 600:
        return hit[1]
    models = [m for m in _discover_models(runner_id, spec) if MODEL_RE.fullmatch(str(m.get("id", "")))]
    _MODELS_CACHE[runner_id] = (time.monotonic(), models)
    return models


def run_options(runner_id: str, body: dict) -> dict:
    """Validate model / effort / fallback chosen in the UI for `runner_id`. Raises ValueError."""
    spec = runners().get(runner_id) or {}
    model, effort = str(body.get("model") or "").strip(), str(body.get("effort") or "").strip()
    if spec.get("ladder") and not model and spec.get("path"):  # laddered runners start at their strongest model
        top = next(iter(runner_models(runner_id, spec)), None)
        if top:
            model, effort = top["id"], effort or top.get("default_effort", "")
    if model and not (MODEL_RE.fullmatch(model) and spec.get("model_args")):
        raise ValueError(f"model {model!r} is not valid for runner {runner_id!r}")
    model_efforts = next((m.get("efforts", []) for m in runner_models(runner_id, spec) if m["id"] == model), []) \
        if model and spec.get("path") else []
    if effort and effort not in [*spec.get("efforts", []), *model_efforts]:
        raise ValueError(f"effort {effort!r} is not supported by runner {runner_id!r}")
    return {"model": model, "effort": effort, "fallback": body.get("fallback", True) is not False}


def runner_cmd(spec: dict, prompt_file: str, opts: dict) -> list:
    extra = []
    if opts.get("model") and spec.get("model_args"):
        model = opts["model"] + (f"#{opts['effort']}" if opts.get("effort") and spec.get("effort_variant") else "")
        extra += [a.replace("{model}", model) for a in spec["model_args"]]
    if opts.get("effort") and spec.get("effort_args"):
        extra += [a.replace("{effort}", opts["effort"]) for a in spec["effort_args"]]
    args = [a.replace("{prompt_file}", prompt_file) for a in spec["cmd"][1:]]
    return [spec["path"], *args[:-1], *extra, *args[-1:]]  # the last argument is the prompt / "-" placeholder


def run_label(run: dict) -> str:
    return " · ".join(x for x in (run.get("label", run.get("runner", "")), run.get("model"), run.get("effort")) if x)


def similar_videos(slug: str) -> list:
    words = set(slug.split("-")) - TOPIC_STOPWORDS
    matches = []
    for p in sorted(DOCS.glob("*/status.json")):
        other = set(p.parent.name.split("-")) - TOPIC_STOPWORDS
        shared = words & other
        if len(shared) >= 2 and len(shared) / max(1, min(len(words), len(other))) >= 0.5:
            name = json.loads(p.read_text(encoding="utf-8")).get("name", p.parent.name)
            matches.append({"folder": p.parent.name, "name": name, "shared": sorted(shared)})
    return sorted(matches, key=lambda m: -len(m["shared"]))


def _lines(text: str) -> list:
    return [line.strip() for line in str(text or "").splitlines() if line.strip()]


def request_record(req: dict) -> str:
    today = datetime.now().astimezone().date().isoformat()
    voice = req["voice_name"] or "not chosen (placeholder `tbd`)"
    clone = (f"authorized by the owner in the Pipeline Monitor on {today} for voice {req['voice_name']}"
             if req["clone_ok"] and req["voice_name"] else "not authorized: use a provider TTS route or the labelled fallback")
    mandatory = "\n".join(f"- “{line}”" for line in _lines(req["mandatory"])) or "- (none)"
    return "\n".join([
        f"# Video request — {req['video']}",
        "",
        f"Created from the Pipeline Monitor on {datetime.now().astimezone().isoformat(timespec='seconds')}. "
        "This is the owner's request; `brief.md` is written from it in Phase 0.",
        "",
        "| Field | Value |", "| --- | --- |",
        f"| Topic | {req['topic']} |",
        f"| Video id / composition | `{req['video']}` / `{req['comp']}` |",
        f"| Profile | {req['profile']} |",
        f"| Duration | {req['min_s']:g}–{req['max_s']:g} s, 9:16 1080×1920 30 fps |",
        f"| Voice | {voice} (`{req['voice_slug']}`, preview `vietnamese-voice-samples/previews/{req['voice']}`) |"
        if req["voice"] else f"| Voice | {voice} |",
        f"| Voice clone | {clone} |",
        f"| Style reference | {req['reference'] or '(none)'} |",
        f"| Must not resemble | {req['avoid'] or '(not specified)'} |",
        f"| Light mode | {'yes' if req['light'] else 'no'} |",
        f"| Duplicate-topic check | {req['duplicate_note']} |",
        "",
        "## Mandatory lines (keep verbatim)", "", mandatory, "",
        "## Sources", "", req["sources"].strip() or "(none supplied)", "",
        "## Owner notes", "", req["notes"].strip() or "(none)", "",
    ])


NOTE_HEADING = re.compile(r"^## (N\d+) · ([^·\n]+?) · (.+)$", re.M)
NOTES_INTRO = (
    "Notes the owner sent from the Pipeline Monitor while agents work on this video.\n"
    "Agents: read this file at the start and at every stage transition. Apply each `pending` note, then replace "
    "`pending` in its heading with `done: <what you changed>` or `declined: <reason>`. Never delete a note.\n"
)


def owner_notes(folder: str) -> list:
    path = DOCS / folder / "owner-notes.md"
    if not path.is_file():
        return []
    text = path.read_text(encoding="utf-8")
    heads = list(NOTE_HEADING.finditer(text))
    notes = []
    for i, m in enumerate(heads):
        body = text[m.end():heads[i + 1].start() if i + 1 < len(heads) else len(text)].strip()
        notes.append({"id": m.group(1), "at": m.group(2).strip(), "status": m.group(3).strip(), "text": body[:2000]})
    return notes


def add_owner_note(folder: str, text: str) -> list:
    """Append a note for the agent working on `folder`; agents read owner-notes.md at every stage transition."""
    path = DOCS / folder / "owner-notes.md"
    with status_lock(folder):
        existing = path.read_text(encoding="utf-8") if path.is_file() else f"# Owner notes — {folder}\n\n{NOTES_INTRO}"
        ids = [int(m.group(1)[1:]) for m in NOTE_HEADING.finditer(existing)]
        note_id = f"N{max(ids, default=0) + 1}"
        stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M")
        path.write_text(existing.rstrip("\n") + f"\n\n## {note_id} · {stamp} · pending\n\n{text.strip()}\n", encoding="utf-8")
        data = load(folder)
        log(data, "agent", f"owner note {note_id} added for the running agent (owner-notes.md)", "you")
        save(folder, data)
    return owner_notes(folder)


RULES_PREAMBLE = (
    "Work in this repository as `video-director`. Read and follow AGENTS.md and every file in `.agents/rules/` "
    "(README first): status only through `python3 -I scripts/pipeline.py`, every phase writes its documents, "
    "record every agent you act as with `pipeline.py agent`, keep `next` current, never publish. Use the production "
    "workflow in `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (every phase, stage and gate; "
    "its Runtime mapping maps the tool names to your runtime). The owner is not watching a terminal: do not ask questions; "
    "when a critical input is missing, set the stage `blocked` with the exact reason and `--next`, which the "
    "monitor shows. Reply in Vietnamese in documents meant for the owner. Before you finish, run "
    "`python3 -I scripts/pipeline.py audit <vid>` and fix or write every error into `docs/<vid>/HANDOFF.md`. "
    "The owner can add instructions while you work: read `docs/<vid>/owner-notes.md` (if it exists) at the start "
    "and at every stage transition, apply each `pending` note, then mark it `done: ...` or `declined: ...` in its heading."
)


def create_prompt(req: dict) -> str:
    return "\n\n".join([
        RULES_PREAMBLE.replace("<vid>", req["video"]),
        f"Task: produce the new video `{req['video']}` end to end (Phase 0 → 10). The monitor already ran "
        f"`pipeline.py init {req['video']} --comp {req['comp']} --voice {req['voice_slug']} --profile {req['profile']}` "
        f"and the duplicate-topic check ({req['duplicate_note']}). Start with Phase 0 intake/preflight, then research.",
        "Owner request (also saved in `docs/" + req["video"] + "/request.md`; copy its decisions into `brief.md`):\n\n"
        + request_record(req),
    ])


def command_prompt(folder: str, text: str) -> str:
    return "\n\n".join([
        RULES_PREAMBLE.replace("<vid>", folder),
        f"Task: continue video `{folder}`. First run `pipeline.py show {folder}` and `pipeline.py audit {folder}`, "
        f"and read `docs/{folder}/HANDOFF.md` if it exists. Then carry out this instruction from the owner "
        f"(sent from the Pipeline Monitor on {datetime.now().astimezone().isoformat(timespec='seconds')}):",
        text.strip(),
    ])


def _record_run(folder: str, run: dict, agent_state: str, msg: str) -> None:
    with status_lock(folder):
        data = load(folder)
        runs = data.setdefault("runs", [])
        for i, existing in enumerate(runs):
            if existing["id"] == run["id"]:
                runs[i] = run
                break
        else:
            runs.append(run)
        data.setdefault("agents", {})["video-director"] = {
            "state": agent_state, "at": now(), "stage": "", "note": f"monitor run {run['id']} via {run['label']}"}
        log(data, "agent", msg, "monitor")
        save(folder, data)


DETACHED: dict = {}  # run id -> {"folder", "stop_requested"}: runs adopted by pid after a monitor restart


def pid_alive(pid) -> bool:
    if not pid:
        return False
    if os.name == "nt":  # os.kill(pid, 0) would terminate the process on Windows
        out = subprocess.run(["tasklist", "/FI", f"PID eq {int(pid)}", "/NH", "/FO", "CSV"],
                             capture_output=True, text=True).stdout
        return f'"{int(pid)}"' in out
    try:
        os.kill(int(pid), 0)
        return True
    except OSError:
        return False


def _kill_tree(pid: int) -> None:
    if os.name == "nt":  # kill the whole tree: .cmd shims spawn node children
        subprocess.run(["taskkill", "/T", "/F", "/PID", str(pid)], capture_output=True)
    else:
        os.killpg(pid, 15)


def _finish_detached(folder: str, run_id: str) -> None:
    with LIVE_LOCK:
        info = DETACHED.pop(run_id, {})
    try:
        run = next((r for r in load(folder).get("runs", []) if r["id"] == run_id), None)
    except (OSError, ValueError):
        return  # the video folder is gone
    if not run or run.get("state") != "running":
        return
    stopped = info.get("stop_requested")
    run.update({"state": "stopped" if stopped else "exited", "exit_code": None, "ended": now()})
    _record_run(folder, run, "idle", f"monitor run {run_id} {run['state']} (tracked by pid after a monitor restart)")
    if not maybe_fallback(folder, run):
        threading.Thread(target=tick_scheduler, daemon=True).start()


def _watch_detached(folder: str, run_id: str, pid: int) -> None:
    while pid_alive(pid):
        time.sleep(2)
    _finish_detached(folder, run_id)


def adopt_run(folder: str, run: dict) -> bool:
    """Re-attach a `running` run whose server-side handle was lost (monitor restarted). True if still alive."""
    with LIVE_LOCK:
        if run["id"] in DETACHED:
            return True
    if not pid_alive(run.get("pid")):
        _finish_detached(folder, run["id"])
        return False
    with LIVE_LOCK:
        if run["id"] in DETACHED:
            return True
        DETACHED[run["id"]] = {"folder": folder, "stop_requested": False}
    threading.Thread(target=_watch_detached, args=(folder, run["id"], run["pid"]), daemon=True).start()
    return True


def quota_error(run: dict) -> str:
    """The quota / rate-limit error a run ended on, or "". Only the log's last events count, and only error events
    among JSON lines, so a tool that merely printed the words "rate limit" does not trigger a runner switch."""
    path = ROOT / run.get("log", "") if run.get("log") else None
    if not path or not path.is_file():
        return ""
    with path.open("rb") as f:
        f.seek(max(0, path.stat().st_size - 64_000))
        tail = [l for l in f.read().decode("utf-8", "replace").splitlines() if l.strip()][-8:]
    for line in reversed(tail):
        text = line.strip()
        if text.startswith("{"):
            try:
                event = json.loads(text)
            except ValueError:
                event = None
            if isinstance(event, dict) and not (event.get("type") in ("error", "result") or "error" in event
                                                or event.get("is_error")):
                continue
        if m := QUOTA_RE.search(text):
            return text[max(0, m.start() - 60):m.end() + 100]
    return ""


FALLBACK_NOTE = ("A previous agent run ({label}) on this video stopped because it ran out of tokens/quota: {error}\n"
                 "Its files and status already hold its progress. Run `pipeline.py show <vid>` and `audit <vid>` first, "
                 "continue from the true state, and do not redo verified work. The original task follows.")


def fallback_runner(run: dict):
    tried = set(run.get("tried") or []) | {run["runner"]}
    installed = runners()
    order = FALLBACK_ORDER + [k for k in installed if k not in FALLBACK_ORDER]
    return next((k for k in order if k not in tried and (installed.get(k) or {}).get("path")), None)


def lower_model(run: dict):
    """For a laddered runner (OpenCode): the next weaker model not yet rate-limited in this chain, else None."""
    spec = runners().get(run["runner"]) or {}
    if not (spec.get("ladder") and run.get("model") and spec.get("path")):
        return None
    ranked = runner_models(run["runner"], spec)
    ids = [m["id"] for m in ranked]
    tried = set(run.get("tried_models") or []) | {run["model"]}
    start = ids.index(run["model"]) + 1 if run["model"] in ids else 0
    return next((m for m in ranked[start:] if m["id"] not in tried), None)


def maybe_fallback(folder: str, run: dict):
    """When a run died of an exhausted quota, continue the same task: a laddered runner (OpenCode) first steps down
    its ranked models; then, if the owner allowed it, the next installed runner takes over."""
    if run.get("state") == "stopped":
        return None
    error = quota_error(run)
    if not error:
        return None
    run.update({"quota_error": error[:300], "state": "failed" if run["state"] == "done" else run["state"]})
    original = (ROOT / run["prompt_file"]).read_text(encoding="utf-8")
    marker = "The original task follows.\n\n"
    if original.startswith(FALLBACK_NOTE.split("{", 1)[0]) and marker in original:
        original = original.split(marker, 1)[1]  # one note per hand-over, not a growing stack
    prompt = FALLBACK_NOTE.format(label=run_label(run), error=error[:200]).replace("<vid>", folder) + "\n\n" + original
    lower = lower_model(run)
    if lower:  # same runner, next weaker model at its highest effort
        _record_run(folder, run, "failed", f"monitor run {run['id']} hit a rate limit on {run_label(run)}: "
                                           f"stepping down to {lower['id']}")
        try:
            return launch_run(folder, run["runner"], prompt, run["kind"],
                              opts={"model": lower["id"], "effort": lower.get("default_effort", ""),
                                    "fallback": run.get("fallback", True)},
                              extra={"fallback_of": run["id"], "tried": run.get("tried") or [],
                                     "tried_models": sorted(set(run.get("tried_models") or []) | {run["model"]})})
        except (LookupError, RuntimeError, OSError):
            pass  # fall through to the next runner
    if run.get("fallback") is False:
        _record_run(folder, run, "failed", f"monitor run {run['id']} ran out of quota (runner switch is off)")
        return None
    next_id = fallback_runner(run)
    if not next_id:
        _record_run(folder, run, "failed", f"monitor run {run['id']} ran out of quota; no other runner is installed")
        return None
    _record_run(folder, run, "failed", f"monitor run {run['id']} ran out of quota on {run_label(run)}: switching to {next_id}")
    tried = sorted(set(run.get("tried") or []) | {run["runner"]})
    try:  # the new runner picks its own model (OpenCode: its strongest); the chosen one belonged to the runner that ran out
        return launch_run(folder, next_id, prompt, run["kind"], opts=run_options(next_id, {"fallback": True}),
                          extra={"fallback_of": run["id"], "tried": tried})
    except (LookupError, RuntimeError, OSError, ValueError) as exc:
        with status_lock(folder):
            data = load(folder)
            log(data, "agent", f"fallback to {next_id} could not start: {exc}", "monitor")
            save(folder, data)
        return None


def _wait_run(folder: str, run: dict, proc) -> None:
    code = proc.wait()
    with LIVE_LOCK:
        LIVE_RUNS.pop(run["id"], None)
        detached = DETACHED.pop(run["id"], {})
    stopped = run.get("stop_requested") or detached.get("stop_requested")
    run.update({"state": "stopped" if stopped else ("done" if code == 0 else "failed"),
                "exit_code": code, "ended": now()})
    agent_state = "idle" if stopped else ("done" if code == 0 else "failed")
    _record_run(folder, run, agent_state, f"monitor run {run['id']} {run['state']} (exit {code})")
    if not maybe_fallback(folder, run):
        threading.Thread(target=tick_scheduler, daemon=True).start()  # start a queued follow-up right away


def parse_run_at(value):
    """`run_at` from the UI (`YYYY-MM-DDTHH:MM`, local time) -> aware datetime, None for "run now"."""
    if value in (None, ""):
        return None
    try:
        when = datetime.fromisoformat(str(value))
    except ValueError as exc:
        raise ValueError("run_at must be a date and time like 2026-10-18T08:00") from exc
    return when.astimezone() if when.tzinfo is None else when


def new_run_id() -> str:
    return datetime.now().strftime("%Y%m%d-%H%M%S-%f")[:-3]


def schedule_run(folder: str, runner_id: str, prompt: str, kind: str, when: datetime, after_current: bool = False,
                 opts=None) -> dict:
    """Queue a run in status.json; the serve process's scheduler launches it when due (it survives restarts)."""
    spec = runners().get(runner_id)
    if not spec or not spec["path"]:
        raise LookupError(f"runner {runner_id!r} is not configured or not installed")
    run_id = new_run_id()
    out_dir = RUNS_DIR / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    prompt_file = out_dir / f"{run_id}.prompt.md"
    prompt_file.write_text(prompt, encoding="utf-8")
    run = {"id": run_id, "folder": folder, "kind": kind, "runner": runner_id, "label": spec.get("label", runner_id),
           "state": "scheduled", "run_at": when.isoformat(timespec="minutes"), "created": now(),
           "prompt_file": rel(prompt_file).replace("\\", "/"),
           "summary": prompt.splitlines()[-1][:160] if kind == "command" else "create video",
           "model": (opts or {}).get("model", ""), "effort": (opts or {}).get("effort", ""),
           "fallback": (opts or {}).get("fallback", True)}
    if after_current:
        run["after_current"] = True
    with status_lock(folder):
        data = load(folder)
        data.setdefault("runs", []).append(run)
        data["next"] = f"Lệnh chờ chạy tiếp sau lượt hiện tại ({run_label(run)})" if after_current else f"Lịch chạy {run_label(run)} lúc {when.strftime('%H:%M %d/%m/%Y')} ({'tạo video' if kind == 'create' else 'lệnh'})"
        log(data, "agent", f"monitor run {run_id} scheduled for {run['run_at']} via {run_label(run)} ({kind})", "monitor")
        save(folder, data)
    return run


def run_or_schedule(folder: str, runner_id: str, prompt: str, kind: str, run_at, opts=None) -> dict:
    when = parse_run_at(run_at)
    if when and when > datetime.now().astimezone():
        return schedule_run(folder, runner_id, prompt, kind, when, opts=opts)
    return launch_run(folder, runner_id, prompt, kind, opts=opts)


NOTES_FOLLOWUP = ("Read `docs/{vid}/owner-notes.md` and apply every note still marked `pending` (the previous agent run "
                  "ended before handling them), marking each `done: ...` or `declined: ...` in its heading. "
                  "Then continue the pipeline from its true state.")


def send_message(folder: str, runner_id: str, text: str, run_at=None, opts=None) -> dict:
    """One entry point for the monitor's message box, like a chat with the agent.

    Idle video: start a run with the message. Busy video: the running agent cannot take new stdin, so the message
    lands in owner-notes.md (read at every stage transition) and one follow-up run is queued that applies any note
    still pending when the current run ends; the scheduler drops it if nothing is left pending.
    """
    when = parse_run_at(run_at)  # API callers may still schedule a command; the monitor UI no longer does
    if when and when > datetime.now().astimezone():
        return {"delivery": "scheduled",
                "run": schedule_run(folder, runner_id, command_prompt(folder, text), "command", when, opts=opts)}
    try:
        return {"delivery": "started", "run": launch_run(folder, runner_id, command_prompt(folder, text), "command", opts=opts)}
    except RuntimeError:
        pass  # an agent is already working on this video
    notes = add_owner_note(folder, text)
    queued = next((r for r in load(folder).get("runs", [])
                   if r.get("state") == "scheduled" and r.get("notes_followup")), None)
    if queued is None:
        try:
            queued = schedule_run(folder, runner_id, command_prompt(folder, NOTES_FOLLOWUP.format(vid=folder)),
                                  "command", datetime.now().astimezone(), after_current=True, opts=opts)
        except LookupError:
            queued = None  # the note is saved; without an installed runner nothing can pick it up later
        else:
            with status_lock(folder):
                data = load(folder)
                for r in data.get("runs", []):
                    if r["id"] == queued["id"]:
                        r["notes_followup"] = True
                save(folder, data)
            queued["notes_followup"] = True
    return {"delivery": "note", "notes": notes, "run": queued}


def tick_scheduler(current=None) -> list:
    """Launch every scheduled run that is due. Busy videos keep their run queued for the next tick."""
    current = current or datetime.now().astimezone()
    started = []
    for p in sorted(DOCS.glob("*/status.json")):
        folder = p.parent.name
        try:
            runs = load(folder).get("runs", [])
        except (ValueError, OSError):
            continue
        for run in runs:
            if run.get("state") != "scheduled" or datetime.fromisoformat(run["run_at"]) > current:
                continue
            if run.get("notes_followup") and not any(n["status"] == "pending" for n in owner_notes(folder)):
                with LIVE_LOCK:
                    busy = any(r["folder"] == folder for r in [*LIVE_RUNS.values(), *DETACHED.values()])
                if busy:
                    break  # the current run may still mark the notes; decide when it ends
                run.update({"state": "cancelled", "ended": now(), "error": "no pending owner notes left"})
                _record_run(folder, run, "idle", f"follow-up run {run['id']} dropped: the agent handled every owner note")
                break
            try:
                prompt = (ROOT / run["prompt_file"]).read_text(encoding="utf-8")
                keep = {k: run[k] for k in ("fallback_of", "tried", "tried_models", "after_current") if k in run}
                started.append(launch_run(folder, run["runner"], prompt, run["kind"], run_id=run["id"], extra=keep,
                                          opts={k: run.get(k, d) for k, d in (("model", ""), ("effort", ""), ("fallback", True))}))
            except RuntimeError:
                break  # another run is active on this video: try again next tick
            except (LookupError, OSError) as exc:
                run.update({"state": "failed", "ended": now(), "error": str(exc)[:300]})
                _record_run(folder, run, "failed", f"scheduled run {run['id']} could not start: {exc}")
            break  # one launch per video per tick
    return started


def _scheduler_loop() -> None:
    while True:
        try:
            tick_scheduler()
        except Exception as exc:  # never let one bad status file kill the scheduler
            print(f"scheduler: {exc}", file=sys.stderr)
        time.sleep(15)


def start_scheduler() -> None:
    threading.Thread(target=_scheduler_loop, daemon=True, name="agent-scheduler").start()


def launch_run(folder: str, runner_id: str, prompt: str, kind: str, run_id: str = "", opts=None, extra=None) -> dict:
    """Start a headless agent on `folder`. Raises LookupError (unknown/not installed) or RuntimeError (busy)."""
    opts = opts or {}
    spec = runners().get(runner_id)
    if not spec or not spec["path"]:
        raise LookupError(f"runner {runner_id!r} is not configured or not installed")
    with LIVE_LOCK:
        if any(r["folder"] == folder for r in [*LIVE_RUNS.values(), *DETACHED.values()]):
            raise RuntimeError("an agent run is already active for this video")
        run_id = run_id or new_run_id()
        out_dir = RUNS_DIR / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        prompt_file, log_file = out_dir / f"{run_id}.prompt.md", out_dir / f"{run_id}.log"
        prompt_file.write_text(prompt, encoding="utf-8")
        cmd = runner_cmd(spec, rel(prompt_file).replace("\\", "/"), opts)
        flags = {"creationflags": subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.CREATE_NO_WINDOW} \
            if os.name == "nt" else {"start_new_session": True}
        # UTF-8 everywhere: Vietnamese prompts/logs crash a child that writes to a cp1252 pipe.
        env = {**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"}
        with log_file.open("wb") as out:
            proc = subprocess.Popen(cmd, cwd=ROOT, env=env, stdout=out, stderr=subprocess.STDOUT,
                                    stdin=subprocess.PIPE if spec["prompt"] == "stdin" else subprocess.DEVNULL, **flags)
        if spec["prompt"] == "stdin":
            proc.stdin.write(prompt.encode("utf-8"))
            proc.stdin.close()
        run = {"id": run_id, "folder": folder, "kind": kind, "runner": runner_id, "label": spec.get("label", runner_id),
               "state": "running", "started": now(), "pid": proc.pid,
               "log": rel(log_file).replace("\\", "/"), "prompt_file": rel(prompt_file).replace("\\", "/"),
               "summary": prompt.splitlines()[-1][:160] if kind == "command" else "create video",
               "model": opts.get("model", ""), "effort": opts.get("effort", ""), "fallback": opts.get("fallback", True),
               **(extra or {})}
        LIVE_RUNS[run_id] = {"folder": folder, "proc": proc, "run": run}
    _record_run(folder, run, "running", f"monitor run {run_id} started via {run_label(run)} ({kind})")
    threading.Thread(target=_wait_run, args=(folder, run, proc), daemon=True).start()
    return run


def stop_run(folder: str, run_id: str) -> bool:
    with LIVE_LOCK:
        live = LIVE_RUNS.get(run_id)
    if live and live["folder"] == folder:
        live["run"]["stop_requested"] = True
        _kill_tree(live["proc"].pid)
        return True
    run = next((r for r in load(folder).get("runs", []) if r["id"] == run_id), None)
    if run and run.get("state") == "scheduled":  # cancelling a queued run never starts a process
        run.update({"state": "cancelled", "ended": now()})
        with status_lock(folder):
            data = load(folder)
            data["runs"] = [run if r["id"] == run_id else r for r in data.get("runs", [])]
            log(data, "agent", f"monitor run {run_id} cancelled before it started", "you")
            save(folder, data)
        return True
    if not run or run.get("state") != "running" or not adopt_run(folder, run):
        return False
    with LIVE_LOCK:
        DETACHED[run_id]["stop_requested"] = True
    _kill_tree(int(run["pid"]))
    return True


def _short(detail) -> str:
    """Paths inside the repo are shown relative, so log lines stay readable."""
    text = str(detail)
    for root in {str(ROOT), str(ROOT).replace("\\", "/")}:
        text = text.replace(root + "\\", "").replace(root + "/", "")
    return text


def summarize_log(lines: list) -> list:
    """Turn agent output (Claude stream-json, JSON events or plain text) into short lines for people."""
    entries = []
    for raw in lines:
        raw = raw.strip()
        if not raw:
            continue
        try:
            event = json.loads(raw)
        except ValueError:
            entries.append({"kind": "text", "text": raw[:400]})
            continue
        if not isinstance(event, dict):
            continue
        kind = event.get("type")
        part = event.get("part")
        if isinstance(part, dict):  # OpenCode `run --format json`: {"type": ..., "part": {...}}
            if part.get("type") == "tool":
                state = part.get("state") or {}
                args = state.get("input") if isinstance(state.get("input"), dict) else {}
                detail = (args.get("description") or args.get("command") or args.get("filePath") or args.get("path")
                          or args.get("pattern") or args.get("url") or "")
                text = f"{part.get('tool')}: {_short(detail)[:200]}"
                if state.get("status") == "error":
                    entries.append({"kind": "error", "text": f"{text} — {str(state.get('error', ''))[:200]}"})
                else:
                    entries.append({"kind": "tool", "text": text})
            elif part.get("type") == "text" and str(part.get("text", "")).strip():
                entries.append({"kind": "say", "text": str(part["text"]).strip()[:400]})
            continue
        if kind == "error":
            entries.append({"kind": "error", "text": str(event.get("error") or event.get("message") or event)[:400]})
        elif kind == "assistant":
            for part in event.get("message", {}).get("content", []):
                if part.get("type") == "text" and part.get("text", "").strip():
                    entries.append({"kind": "say", "text": part["text"].strip()[:400]})
                elif part.get("type") == "tool_use":
                    args = part.get("input", {})
                    detail = args.get("description") or args.get("command") or args.get("file_path") or args.get("pattern") or ""
                    entries.append({"kind": "tool", "text": f"{part.get('name')}: {_short(detail)[:200]}"})
        elif kind == "result":
            entries.append({"kind": "error" if event.get("is_error") else "result",
                            "text": str(event.get("result", ""))[:600]})
        elif kind not in {"system", "user"}:
            text = event.get("text") or event.get("content") or event.get("message")
            if isinstance(text, str) and text.strip():
                entries.append({"kind": "say", "text": text.strip()[:400]})
    return entries


def runs_view(folder: str) -> dict:
    data = load(folder)
    with LIVE_LOCK:
        live = set(LIVE_RUNS)
    runs = []
    for run in data.get("runs", [])[-10:]:
        run = {k: v for k, v in run.items() if k != "stop_requested"}
        if run.get("state") == "running" and run["id"] not in live:
            # The monitor restarted: follow the process by pid instead of losing it.
            if adopt_run(folder, run):
                run["detached"] = True
            else:
                run = next((r for r in load(folder).get("runs", []) if r["id"] == run["id"]), run)
        runs.append(run)
    log_entries = []
    last_log = next((r["log"] for r in reversed(runs) if r.get("log")), None)  # scheduled runs have no log yet
    if last_log:
        path = ROOT / last_log
        if path.is_file():
            with path.open("rb") as f:
                f.seek(max(0, path.stat().st_size - 96_000))
                tail = f.read().decode("utf-8", errors="replace").splitlines()
            log_entries = summarize_log(tail)[-80:]
    return {"video": folder, "runs": runs, "log": log_entries, "notes": owner_notes(folder)}


def create_video(body: dict) -> tuple:
    """Validate a monitor request, init the video, record the request, optionally launch an agent."""
    topic = str(body.get("topic", "")).strip()[:2000]
    if not topic:
        return 400, {"error": "topic is required"}
    folder = str(body.get("slug") or slugify(topic)).strip()
    comp = str(body.get("comp") or comp_id(folder)).strip()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", folder) or not re.fullmatch(r"[A-Z][A-Za-z0-9]*", comp):
        return 400, {"error": "video id must be kebab-case and composition id PascalCase"}
    profile = body.get("profile", "story")
    if profile not in {p["id"] for p in PROFILES}:
        return 400, {"error": "unknown profile"}
    voices = {v["file"]: v for v in catalog_voices()}
    voice = str(body.get("voice") or "")
    if voice and voice not in voices:
        return 400, {"error": "voice is not in vietnamese-voice-samples/previews/"}
    try:
        min_s, max_s = float(body.get("min_seconds", 40)), float(body.get("max_seconds", 60))
    except (TypeError, ValueError):
        return 400, {"error": "duration must be numbers"}
    if not 5 <= min_s < max_s <= 180:
        return 400, {"error": "duration must satisfy 5 <= min < max <= 180"}
    known = {p.parent.name for p in DOCS.glob("*/status.json")}
    reference = str(body.get("reference") or "")
    if reference and reference not in known:
        return 400, {"error": "unknown style reference video"}
    runner_id = str(body.get("runner") or "")
    try:
        parse_run_at(body.get("run_at"))
        opts = run_options(runner_id, body) if runner_id else {}
    except ValueError as e:
        return 400, {"error": str(e)}
    if runner_id and not (runners().get(runner_id) or {}).get("path"):
        return 400, {"error": f"runner {runner_id!r} is not installed on this machine"}
    if (DOCS / folder).exists() or (ROOT / "src" / "videos" / folder).exists():
        return 409, {"error": f"video {folder} already exists; open it and send a command instead"}
    matches = similar_videos(folder)
    if matches and not body.get("confirm"):
        return 409, {"needs_confirm": True, "matches": matches,
                     "error": "a similar topic already exists; confirm to create a new video anyway"}
    req = {"video": folder, "comp": comp, "topic": topic, "profile": profile, "voice": voice,
           "voice_name": voices[voice]["name"] if voice else "", "voice_slug": voices[voice]["slug"] if voice else "tbd",
           "clone_ok": bool(body.get("clone_ok")), "reference": reference, "avoid": str(body.get("avoid", ""))[:1000],
           "min_s": min_s, "max_s": max_s, "light": bool(body.get("light")),
           "mandatory": str(body.get("mandatory", ""))[:4000], "sources": str(body.get("sources", ""))[:6000],
           "notes": str(body.get("notes", ""))[:6000],
           "duplicate_note": ("owner confirmed a new video despite similar: " + ", ".join(m["folder"] for m in matches))
           if matches else "no similar video found by the monitor (folder names); intake-agent re-checks content"}
    prompt = create_prompt(req)
    if body.get("dry_run"):
        return 200, {"video": folder, "comp": comp, "voice": req["voice_slug"], "prompt": prompt}
    cmd_init(argparse.Namespace(folder=folder, comp=comp, voice=req["voice_slug"], profile=profile, name=topic[:80],
                                audio=None, out=None, qa=None, gates=None))
    (DOCS / folder / "request.md").write_text(request_record(req), encoding="utf-8")
    with status_lock(folder):
        data = load(folder)
        data["next"] = "video-director: Phase 0 intake + preflight from request.md"
        log(data, "-", f"created from the monitor ({'runner ' + runner_id if runner_id else 'no agent launched'})", "you")
        save(folder, data)
    run, run_error = None, ""
    if runner_id:
        try:
            run = run_or_schedule(folder, runner_id, prompt, "create", body.get("run_at"), opts)
        except OSError as exc:  # the executable is installed but cannot start: keep the video, report why
            run_error = f"{runner_id} could not start: {exc}"[:300]
            with status_lock(folder):
                data = load(folder)
                log(data, "agent", f"create run not started: {run_error}", "monitor")
                save(folder, data)
    return 201, {"video": folder, "comp": comp, "voice": req["voice_slug"], "run": run, "run_error": run_error}


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
        elif self.path == "/api/create-options":
            self._create_options()
        elif match := re.fullmatch(r"/voice-preview/([A-Za-z0-9_-]+\.mp3)", self.path):
            if match.group(1) not in {v["file"] for v in catalog_voices()}:
                return self._json(404, {"error": "voice not found"})
            self._stream(VOICE_PREVIEWS / match.group(1), "audio/mpeg")
        elif match := re.fullmatch(r"/api/runs/([A-Za-z0-9_-]+)", self.path):
            if self._load(match.group(1)) is None:
                return self._json(404, {"error": "video not found"})
            self._json(200, runs_view(match.group(1)))
        else:
            self._json(404, {"error": "not found"})

    def _trusted_json(self):
        """Studio endpoints start agents: accept only same-origin JSON from the monitor page (blocks CSRF)."""
        port = self.server.server_port
        allowed = {f"http://127.0.0.1:{port}", f"http://localhost:{port}"}
        if self.headers.get("Origin") not in allowed or not self.headers.get("Content-Type", "").startswith("application/json"):
            self._json(403, {"error": "studio actions are only accepted from the monitor page"})
            return None
        try:
            body = json.loads(self.rfile.read(min(int(self.headers.get("Content-Length", 0)), 60_000)) or b"{}")
        except ValueError:
            self._json(400, {"error": "bad request"})
            return None
        if not isinstance(body, dict):
            self._json(400, {"error": "bad request"})
            return None
        return body

    def _create_options(self) -> None:
        views = all_views()
        self._json(200, {
            "voices": catalog_voices(), "profiles": PROFILES,
            "videos": [{"folder": v["folder"], "name": v["name"]} for v in views],
            "runners": [{"id": k, "label": v.get("label", k), "installed": bool(v["path"]),
                         "models": runner_models(k, v) if v["path"] else [], "efforts": v.get("efforts", []),
                         "has_model": bool(v.get("model_args")), "ladder": bool(v.get("ladder"))}
                        for k, v in runners().items()],
            "fallback_order": FALLBACK_ORDER,
        })

    def _studio_post(self) -> None:
        body = self._trusted_json()
        if body is None:
            return
        if self.path == "/api/videos":
            try:
                code, payload = create_video(body)
            except (LookupError, RuntimeError, SystemExit) as e:
                code, payload = 409, {"error": str(e)}
            return self._json(code, payload)
        if match := re.fullmatch(r"/api/videos/([A-Za-z0-9_-]+)/command", self.path):
            folder, text = match.group(1), str(body.get("text", "")).strip()[:6000]
            if self._load(folder) is None:
                return self._json(404, {"error": "video not found"})
            if not text:
                return self._json(400, {"error": "command text is required"})
            try:
                runner_id = str(body.get("runner", ""))
                result = send_message(folder, runner_id, text, body.get("run_at"), run_options(runner_id, body))
            except (LookupError, ValueError) as e:
                return self._json(400, {"error": str(e)})
            return self._json(201, {"video": folder, **result})
        if match := re.fullmatch(r"/api/videos/([A-Za-z0-9_-]+)/notes", self.path):
            folder, text = match.group(1), str(body.get("text", "")).strip()[:4000]
            if self._load(folder) is None:
                return self._json(404, {"error": "video not found"})
            if not text:
                return self._json(400, {"error": "note text is required"})
            return self._json(201, {"video": folder, "notes": add_owner_note(folder, text)})
        if match := re.fullmatch(r"/api/runs/([A-Za-z0-9_-]+)/([0-9-]+)/stop", self.path):
            if not stop_run(*match.groups()):
                return self._json(404, {"error": "no active run with that id"})
            return self._json(200, {"stopping": match.group(2)})
        self._json(404, {"error": "not found"})

    def do_POST(self):
        if self.path == "/api/audio-listen":
            return self._audio_listen()
        if self.path == "/api/videos" or self.path.startswith(("/api/videos/", "/api/runs/")):
            return self._studio_post()
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


class MonitorServer(ThreadingHTTPServer):
    # On Windows SO_REUSEADDR lets a second monitor bind the same port and silently split requests.
    allow_reuse_address = os.name != "nt"


def cmd_serve(a) -> None:
    try:
        srv = MonitorServer(("127.0.0.1", a.port), Handler)
    except OSError:
        raise SystemExit(f"port {a.port} is already in use: another monitor is running (open http://127.0.0.1:{a.port}/)")
    start_scheduler()  # launches runs scheduled from the monitor, also after a restart
    print(f"pipeline monitor: http://127.0.0.1:{a.port}")
    srv.serve_forever()


def main() -> None:
    # -I ignores PYTHONIOENCODING; a cp1252 pipe on Windows cannot print ✓ or Vietnamese notes.
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")
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
    p = sub.add_parser("audit"); p.add_argument("folder", nargs="?"); p.set_defaults(fn=cmd_audit)
    p = sub.add_parser("serve"); p.add_argument("--port", type=int, default=4180); p.set_defaults(fn=cmd_serve)
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
