# Video production rules

These rules bind **every agent that touches a video** in this repository: Claude Code subagents in `.claude/agents/`, the main director thread, OpenCode, Codex, Cursor, or any other tool. They apply whenever you read or write `src/videos/<slug>/`, `docs/<vid>/`, `public/audio/<vid>/`, `out/` or `docs/<vid>/status.json` through `scripts/pipeline.py`.

They are tool-neutral on purpose. A tool-specific file (skill, agent definition, prompt) may add detail but must never relax a rule here. When two instructions conflict, this folder wins over skills and agent prompts. `AGENTS.md` and the user's explicit request win over this folder.

| File                                                           | Covers                                                                            |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [01-status-truth.md](01-status-truth.md)                       | `status.json` and the monitor must show what is really happening, at every moment |
| [02-documentation.md](02-documentation.md)                     | The documents every phase must leave; nothing is skipped                          |
| [03-source-code.md](03-source-code.md)                         | Rules for `src/` (ownership, timeline, text, determinism, registry)               |
| [04-handoff-and-concurrency.md](04-handoff-and-concurrency.md) | Several agents or tools on one repo, stopping, cold handoff                       |

## The five rules that matter most

1. **Status is changed only through `python3 -I scripts/pipeline.py`** and always tells the truth: what is running, what is done, what is next. Never edit `status.json` by hand.
2. **A stage is `done` only when its files exist and its gate passed.** `set ... done` refuses otherwise; do not work around the refusal.
3. **Every phase writes its documents in `docs/<vid>/`.** A missing document means the phase is not done, in every mode (light mode included).
4. **Every agent records itself** (`agent <vid> <name> running` at start, `done`/`failed` at the end), so the monitor never shows a ghost or a silent worker.
5. **Before ending any turn, run `python3 -I scripts/pipeline.py audit <vid>`.** Exit 0, or every remaining error is written in `docs/<vid>/HANDOFF.md` and the report to the user.

## Self-check commands

```bash
python3 -I scripts/pipeline.py show <vid>    # stage table; must print no ⚠
python3 -I scripts/pipeline.py audit <vid>   # status truth + documents; exit 0 required
python3 -I scripts/pipeline.py audit         # every video
python3 -I scripts/pipeline.py check <vid>   # delivery readiness (gates, stages, evidence, eval.md)
```
