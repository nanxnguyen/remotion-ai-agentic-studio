# 04 · Handoff and concurrency

Several agents, tools and machines may work on this repository. These rules keep their work from colliding and keep the status honest across them.

## H1 · Start of a session on a video

1. Read `AGENTS.md`, this folder, the production skill, and `docs/<vid>/HANDOFF.md` if it exists.
2. Run `pipeline.py show <vid>` and `pipeline.py audit <vid>`. Fix or reopen every `⚠`/audit error **before** new work. A status copied from another machine can say `done` while `public/audio/` and `out/` are absent here (they are not in Git): restore the original files, or reopen the stage and regenerate. Never re-mark it done from memory.
3. Look at `agents` in the status and at file modification times. An agent `running` with recent activity belongs to someone else: do not touch its files or stage. A `running` agent with no output and no log entry for more than 2 h is stale: set it `failed` with a note, then re-dispatch once.

## H2 · During work

- Claim before you write: `agent <vid> <name> running --stage <stage>` and `set <vid> <stage> in_progress`. One stage has one active producer at a time.
- Keep writes inside your owned files ([03-source-code.md](03-source-code.md) C1) and your phase's documents ([02-documentation.md](02-documentation.md)).
- Different videos may run in parallel only with distinct ids, audio folders, QA prefixes and output names.
- **Owner notes.** The owner can send instructions from the Pipeline Monitor while you work; they land in `docs/<vid>/owner-notes.md`. Read it at the start and at every stage transition. Apply each `pending` note (reopen the affected stage if it changes a finished artifact), then replace `pending` in its heading with `done: <what you changed>` or `declined: <reason>`. Never delete or reword a note.

## H3 · Stopping, pausing, or handing over

When you stop for any reason (finished your part, blocked, the owner said stop, context running out):

1. Set every agent you started to `done`, `idle` or `failed`. Stop background workers you started.
2. Set your stage to its true state (`done` only per [01-status-truth.md](01-status-truth.md) S2; otherwise `in_progress`, `blocked` or `failed`) with `--next`.
3. Write or update `docs/<vid>/HANDOFF.md`:
   - stage/gate table from `pipeline.py show <vid>` and the `audit` output;
   - locked decisions (mandated user lines, voice route + authorization, palette/metaphor, what must not resemble other videos);
   - files half-edited and by whom;
   - ordered next steps with exact commands;
   - warnings and open tickets.
4. Run `pipeline.py audit <vid>` and include its result in your final report.

## H4 · Honesty

- Never claim a review, listen, render, check or publication that did not happen. Report failures with their output.
- Never publish to any platform without the owner's explicit request for that specific video.
