"""Generate each runtime's agent definitions from the runtime-neutral roles in `.agents/roles/`.

Edit `.agents/roles/<name>.md`, then run `python3 scripts/sync_agents.py`. `--check` exits 1 when a
generated file is stale. Outputs: `.claude/agents/*.md` (Claude Code), `.opencode/agents/*.md`
(OpenCode, mode: subagent) and `.codex/agents/*.toml` (Codex). Hand-written files with no role
(the OpenCode primary `video-director.md`) are never touched.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROLES = ROOT / ".agents" / "roles"
NOTE = "<!-- Generated from .agents/roles/{name}.md by scripts/sync_agents.py. Edit the source, then rerun it. -->"
EFFORT = {"opus": "high", "sonnet": "medium", "haiku": "low"}  # Claude model tier -> Codex reasoning effort


def parse(path: Path) -> tuple:
    text = path.read_text(encoding="utf-8")
    _, head, body = text.split("---\n", 2)
    meta = dict(line.split(": ", 1) for line in head.strip().splitlines())
    return meta, body.lstrip("\n")


def tools(meta: dict) -> list:
    return [t.strip() for t in meta.get("tools", "").split(",") if t.strip()]


def permission(meta: dict) -> dict:
    have = set(tools(meta))
    allow = lambda ok: "allow" if ok else "deny"
    # OpenCode `edit` also covers writing new files, so reviewers with Write can still save their report.
    return {"edit": allow(have & {"Write", "Edit"}), "bash": allow("Bash" in have),
            "webfetch": allow(have & {"WebFetch", "WebSearch"})}


def render(role: Path) -> dict:
    meta, body = parse(role)
    name = meta["name"]
    note = NOTE.format(name=name)
    head = role.read_text(encoding="utf-8").split("---\n", 2)[1]
    claude = f"---\n{head}---\n\n{note}\n\n{body}"
    perm = "".join(f"  {k}: {v}\n" for k, v in permission(meta).items())
    opencode = f"---\ndescription: {json.dumps(meta['description'], ensure_ascii=False)}\nmode: subagent\npermission:\n{perm}---\n\n{note}\n\n{body}"
    assert "'''" not in body, f"{role}: ''' breaks the Codex TOML literal string"
    effort = EFFORT.get(meta.get("model", ""))
    codex = (f"# {note[5:-4]}\n"
             f"name = {json.dumps(name)}\n"
             f"description = {json.dumps(meta['description'], ensure_ascii=False)}\n"
             + (f'model_reasoning_effort = "{effort}"\n' if effort else "")
             + f"developer_instructions = '''\n{body}'''\n")
    return {ROOT / ".claude/agents" / f"{name}.md": claude,
            ROOT / ".opencode/agents" / f"{name}.md": opencode,
            ROOT / ".codex/agents" / f"{name}.toml": codex}


def outputs() -> dict:
    out = {}
    for role in sorted(ROLES.glob("*.md")):
        out.update(render(role))
    return out


def stale() -> list:
    return [str(p.relative_to(ROOT)) for p, text in outputs().items()
            if not p.is_file() or p.read_text(encoding="utf-8") != text]


def main(argv: list) -> int:
    if "--check" in argv:
        bad = stale()
        for p in bad:
            print(f"stale: {p}")
        return 1 if bad else 0
    for p, text in outputs().items():
        p.parent.mkdir(parents=True, exist_ok=True)
        if not p.is_file() or p.read_text(encoding="utf-8") != text:
            p.write_text(text, encoding="utf-8")  # overwrite in place: the path never disappears
            print(f"wrote {p.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
