# 01 · Status truth: the monitor shows what is really happening

`docs/<vid>/status.json` feeds the Pipeline Monitor (`npm run pipeline`, http://127.0.0.1:4180/). The owner watches it to know the state of the video being produced **right now**. A status that is behind, ahead, or optimistic is a defect, equal to a broken file.

## S1 · One writer, one tool

- Change status only with `python3 -I scripts/pipeline.py` (`init`, `set`, `agent`, `review`, `override`, `voice`, `render`, `verify`, `listen`, `audio-listen`, `upgrade`). Never edit, copy, merge or "fix" `status.json` by hand or with another script.
- `init` once per video, after the duplicate-topic check. Never re-init an existing video.

## S2 · Stage state follows the work, not the plan

| When                                                                 | Command                                                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| You start work on a stage                                            | `set <vid> <stage> in_progress --note "<what>" --next "<next step>"`                   |
| The work is finished **and** its files exist **and** its gate passed | `set <vid> <stage> done --note "<result>" --next "<next step>"`                        |
| You cannot continue (missing input, tool, authorization)             | `set <vid> <stage> blocked --note "<exact reason>" --next "<who must do what>"`        |
| A command or check failed                                            | `set <vid> <stage> failed --note "<error>"`                                            |
| You change an artifact of a stage already `done`                     | `set <vid> <stage> in_progress` first (this invalidates downstream reviews on purpose) |

- Never set `done` in advance, "to be fixed later", or because a draft exists.
- `set ... done` refuses when evidence is missing or the guarding gate (`script`→A, `content`→content, `design`→D) is neither passed nor overridden. Produce the artifact, then retry. Never create placeholder files, empty clips or fake reports to satisfy it.
- `render` is set only by `pipeline.py render` (it verifies the MP4 itself).

## S3 · Every agent is visible

- Whoever dispatches an agent (or starts working as one) runs `agent <vid> <agent-name> running --stage <stage> --note "<task>"` first, and `agent <vid> <agent-name> done|failed` when it returns. Parallel copies use numbered names (`scene-agent-1`).
- An agent that stops without finishing is set `idle` (paused) or `failed` (broken), never left `running`.
- A tool that cannot dispatch subagents (for example OpenCode in one thread) still records the role it is acting as, so the monitor lights the right agent.
- `running` on a stage that is already `done` is an audit error.

## S4 · `next` is always current

- Every `set` that moves the video passes `--next "<concrete next step>"` (agent + action, e.g. `"audio-reviewer round 1 on s1–s8"`). An empty `next` on a started, undelivered video is an audit error.

## S5 · Reviews are recorded, never narrated

- A score exists only after `review <vid> <gate> <score> --reviewer <name> --report <file> --verdict pass|revise`. A score in prose, chat or a document is not a review.
- The report file must exist in `docs/<vid>/` and stay there; deleting or renaming it is an audit error.
- The cap-3 acceptance uses `override --by video-director --note "..."`. Never invent or round up a score.

## S6 · Audit before you stop

Run `python3 -I scripts/pipeline.py audit <vid>` before ending a turn, after a handoff, and before any review or delivery. It fails when:

- a stage is `done` but its evidence or documents are missing ("Lệch file" in the monitor);
- a stage is `done` but its gate has not passed;
- a recorded review's report file is missing;
- an agent is `running` on a `done` stage;
- `next` is empty on a started, undelivered video;
- gate C passed but `eval.md` is missing.

Warnings (fix or explain): a stage `in_progress` for more than 2 h with no running agent; render verified but gate C not passed yet.

Exit 0 is required. If you cannot reach it, set the blocked stage to `blocked`, write every remaining error in `docs/<vid>/HANDOFF.md`, and say so to the owner.
