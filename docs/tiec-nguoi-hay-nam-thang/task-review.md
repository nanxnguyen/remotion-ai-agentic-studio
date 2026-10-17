# Task review — tiec-nguoi-hay-nam-thang (gate B)

## Round 2 (task-reviewer, 2026-10-17) — execution discipline / scope audit

Scope of this round: Gate B only (scoping, one owner per file, no unrelated edits, deliverable
wiring). Read-only evidence: file reads, `git status --porcelain`, `git diff`, `grep`.
No `pipeline.py`, no staging/commit, no render, no file written except this report.

### 1. Single-source composition registration — PASS

- `src/videos/registry.ts` imports `tiecNguoiHayNamThangVideo` (line 14) and lists it in
  `videoRegistry` (line 30), before the `// video:new entries` marker; `validateVideoRegistry`
  runs on the array. The entry is already in HEAD (working diff of `registry.ts` adds only
  `dungBienTuoi30ThanhBanAnReelVideo`, another video's line — out of scope here).
- `src/Root.tsx` is 20 lines and only maps `videoRegistry` into `<Composition …/>`; no direct
  registration of `TiecNguoiHayNamThangReel`.
- Grep of `src/` for `TiecNguoiHayNamThang` matches only this module
  (`Reel.tsx:6`, `index.ts:2/5/7`) — the id exists in exactly one place.

### 2. Self-contained module + measured timeline — PASS

- `src/videos/tiec-nguoi-hay-nam-thang/` holds `index.ts` (manifest via `defineVideo`,
  id/slug/durationInFrames=TOTAL_FRAMES/fps 30/1080×1920/testFrames), `Reel.tsx`, `timeline.ts`,
  `scenes.tsx`. No separate `theme.*` file exists in any video in this repo; the palette is
  local to `scenes.tsx` (`WHITE/ACCENT/SECONDARY`, line 16) — no cross-video styling import.
- Imports are only `react`, `remotion`, `../../core` and the module's own files: zero imports
  from any other `src/videos/*` directory (checked all three files).
- `timeline.ts` derives everything from ffprobe-measured `MEASURED_SECONDS` (8 clips,
  `public/audio/tiec-nguoi-hay-nam-thang/s1..s8.mp3`) + semantic `HOLDS`
  `[30,24,48,27,48,27,30,60]`; `ceil(seconds*30)+hold`. Recomputed independently:
  129+171+147+192+151+198+183+251 = **1422 frames = 47.40 s**, matching the value expected in
  `tests/core/registry.test.ts`. Evidence file `voice-final-asr.md` present.
- Docs side complete: `content-pack.md`, `voice.json` (s1..s8), `eval.md`, plus review
  artifacts (`audio-`, `content-pack-`, `design-`, `integration-`, `video-review.md`,
  `task-plan.md`) all under `docs/tiec-nguoi-hay-nam-thang/`.
- Wiring: `Reel.tsx` mounts `<Audio src={staticFile('audio/tiec-nguoi-hay-nam-thang/<id>.mp3')}/>`
  per sequence; all 8 mp3s exist on disk and are gitignored by design
  (`.gitignore: public/audio/**/s[0-9]*.mp3`), i.e. regenerable from the manifest — correct.

### 3. Change set is scoped to this video — PASS (with notes)

This video's own changed paths (nothing else attributable to it):

```
M  src/videos/tiec-nguoi-hay-nam-thang/{index.ts,Reel.tsx,scenes.tsx,timeline.ts}
M  docs/tiec-nguoi-hay-nam-thang/{content-pack.md,production-contract.json,status.json,voice-clone-asr.md}
?? docs/tiec-nguoi-hay-nam-thang/{audio-review,content-pack-review,design-review,eval,integration-review,
                                 task-plan,task-review,video-review,voice-final-asr}.md
M  src/videos/registry.ts (entry for this video already committed; pending hunk = other video)
M  tests/core/registry.test.ts (this video's expected duration 1578 → 1422 — required by the retime)
```

Out of scope, present in the tree, deliberately NOT flagged as defects of this video (owner's /
other videos' parallel work): `chung-minh-de-lam-gi`, `cuoc-goi-nho-cua-me`, `xay-doi-minh-hay-chung-minh`,
`dung-bien-tuoi-30-thanh-ban-an`, `hello-world`, `scripts/pipeline.py`, `scripts/publish-video.py`,
`tests/*`, `package.json`, `.claude/*`, `.agents/*`, `AGENTS.md`, `.env.publisher.example`,
`src/core/{index.ts,fit-text.tsx,voice-timeline.ts}`, `src/videos/{AGENTS.md,CLAUDE.md}`.

### 4. No generated MP4s, secrets or personal voice refs in this deliverable — PASS

- Staging area is empty (`git diff --cached --name-only` → nothing); nothing is staged at all.
- `git ls-files` shows no tracked `.mp4`; `out/` is ignored (`.gitignore:5`).
- This video's docs contain no `voice-ref/` directory; the only tracked personal refs
  (`docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` etc.) are pre-existing, owner-owned and
  outside this video's commit scope (licensing basis documented in `eval.md` /
  `production-contract.json` → `purchased-license:refThanhLong.wav`).
- Secret scan over this video's diff (`api_key|token|secret|password|bearer|sk-`): only the
  reviewer-name/label matches; no credentials.

### Open tickets (all Thấp — non-blocking)

- **B-01 · Thấp · `docs/tiec-nguoi-hay-nam-thang/status.json` + `eval.md`** — status truth lag:
  `reviews[]` records pass for B (9.5) / E (9.0) / C (9.0) at 16:23–16:24, but
  `review_valid` still reads `{A,D,content,audio:true, E,B,C:false}`; `eval.md` §1 gate table
  still claims content/audio/D/E/B/C "NOT RUN" and "review_valid = only A:true" (contradicted by
  `status.json` entries written before eval.md's mtime); `status.json.next` still says
  "Run gen-voice-clone.py …" although voice, render and reviews are done.
  **Change:** refresh `eval.md` gate table + `next`, and let the owner's audit run recompute
  `review_valid` (this reviewer is forbidden to run `pipeline.py`).
- **B-02 · Thấp · `tests/core/registry.test.ts` (shared file)** — the working diff of this shared
  expectation file contains this video's duration update (1578 → 1422, required) *and* a
  `ChungMinhDeLamGiReel` update (1668 → 1728) belonging to another video. Authorship of each hunk
  is not attributable from read-only evidence; flagged only so the owner splits/attributes it at
  commit time. No action needed inside this video's module.

### Verdict

All four Gate B checks pass: registry-only registration, self-contained module with a measured
(ffprobe + semantic hold) 1422-frame timeline, a change set confined to this video's module/docs
(plus its required shared-test line), and a clean deliverable with nothing generated, secret or
personal staged or committed. Two Thấp documentation/attribution notes remain; no Cao/Trung.

**9/10 · verdict: pass**
