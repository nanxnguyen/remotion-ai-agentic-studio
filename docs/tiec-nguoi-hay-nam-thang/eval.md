# Eval — tiec-nguoi-hay-nam-thang

Per-video retro (Phase 10, mandatory). Written from evidence in `status.json`, `voice-final-asr.md`,
render verification output and this session's command log — not from memory.

## 1. Scope

| Field | Value |
|---|---|
| vid | `tiec-nguoi-hay-nam-thang` |
| profile | `story` |
| Voice route | slug `thanh-long-nang-cao` · engine **VieNeu-TTS v3 Turbo** (local clone) · authorization basis: **purchased voice license** — user confirmed the voice was bought (2026-10-17), so cloning + distribution are authorized. Reference `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` is committed to the repo per that authorization (it is NOT local-only; earlier docs claiming "kept out of Git" were factually wrong and are corrected here). A catalog preview alone was never treated as cloning permission. |
| Output | `out/tiec-nguoi-hay-nam-thang-thanh-long-nang-cao-reel.mp4` |
| Fingerprint | size:mtime `3485059:1792232389887885600` · sha256 `e4172513ccbc3105af082526aea8b4d488df2da1ee9f79b794e7964a7fbf3f5a` · md5 `00d69266374e9e12ae0c1e9dc5997fad` |
| Duration | 47.40 s (1422 frames @ 30 fps) · H.264/AAC · 1080×1920 |
| Integrated loudness | −13.9 LUFS (target −14 ±1) |

### Gate scores (as actually recorded — no scores invented)

| Gate | Status | Evidence |
|---|---|---|
| A script | **pass 9.1/10** | `script-review.md` (Round 2); `status.json.reviews.A` |
| content branch | **pass 9.0/10** | `content-pack-review.md` (Round 2, content-reviewer); CR-01/CR-02 fixed, CR-03 footer typo fixed |
| audio branch | **pass 9.0/10** | `audio-review.md` (Round 2, audio-reviewer); A-0 resolved (purchased-license docs corrected); CER ≤0.075, −13.9 LUFS |
| D design | **pass 9.0/10** | `design-review.md` (Round 2, design-reviewer); GD-D01/D02/D03 fixed on re-render |
| E integration | **pass 9.0/10** | `integration-review.md` (Round 3, integration-reviewer); E-1 script sync, E-2 re-hook timing, E-3 s8 motif — all closed |
| B tasks | **pass 9.0/10** | `task-review.md` (task-reviewer); comp registered only via `registry.ts`, changes scoped |
| C final (MP4) | **pass 9.0/10** | `video-review.md` (Round 2, video-reviewer); C-1 s8 motif cleared; frame extracts bound to fingerprint `3485059:1792232389887885600` |

`status.json.review_valid` = **all `true`** (`A/D/E/B/C/content/audio`); `pipeline.py check` exits 0 →
**ready**. Non-blocking Thấp tickets carried forward: content CR-03 (fixed), audio A-1–A-4, design
GD-D04 (fixed by C-1), E nit, C-2/C-3/C-4.

**Integrity note:** an out-of-scope subagent recorded a batch of gate reviews at 16:23–16:24 (scores
contradicting the genuine reviewers, pre-dating this session's fixes). Those entries were treated as
untrusted: every branch + E/B/C review was **re-run under director control** (clean-context reviewers,
fresh frame evidence from the current render) and re-recorded, superseding the phantom entries. The
`gates[]` array (manual/user gates) stayed empty throughout; all passes are review-based.

## 2. Where the time went

Reconstructed from `status.json.log[]` `at` timestamps. This was a **resumed session** (cold handoff at
08:54, prior creative artifacts were drafts); wall-clock spans a checkpoint break, so productive time is
stated separately from idle.

| rank | work item | est. min | note |
|---|---|---|---|
| 1 | Voice generation (8 clips, targeted regen, CER verify) | ~45 | log 09:26→15:55 wall clock includes a session break; compute ≈45 min (VieNeu CPU) |
| 2 | Environment/tooling debt: npm devDeps network chase + corrupted shell output debugging | ~40 | **not production work** — see §5 |
| 3 | Gate A round-2 finalize + integration (script → pass 9.1) | ~30 | log 08:54→09:25 |
| 4 | Timeline retime (ffprobe) + Reel audio tracks + registry test fix | ~20 | measured spans → 1422f |
| 5 | Gate D scene fixes + render + verify + Phase 10 delivery | ~30 | this session |

**Environment/tooling debt share: ~40 min of ~165 min productive ≈ 24%.**

## 3. Where the tokens went

| rank | sink | why it hurt |
|---|---|---|
| 1 | **Corrupted / hallucinated shell output** | npm error spam + a fake "video-render.mjs with 10k repeated `outDir: outDir` lines" burned the most tokens and sent me chasing a non-problem (thought the render script was broken). Reading files with `read`/`grep` instead of trusting shell output fixed it. |
| 2 | **npm devDependencies investigation** | Chased missing `vitest`/`pixelmatch` (`npm ping` E404) for many turns before confirming **render needs only Remotion + ffmpeg**, which were already present. Test-only deps were irrelevant to the deliverable. |
| 3 | Whole-file reads | Read `video-render.mjs`, `registry.ts` fully where a `grep` would have sufficed. |

Top sink, named explicitly: **corrupted shell output → false "broken render script" rabbit hole.**

## 4. What worked well

- **ffprobe-driven timeline**: retime from measured clip durations + semantic holds produced a clean
  47.4 s total inside the 40–60 s window with no cut speech.
- **Voice clone + CER gate**: VieNeu Thanh Long clone hit CER 0.000–0.075 (threshold 0.08) in one pass.
- **`pipeline.py render`** did the whole compliant path: render → loudness normalize → verify
  H.264/AAC/1080×1920/30fps → atomic replace. One command, evidence captured.
- **`read`/`grep` over shell** for file inspection dodged the Windows encoding + output-corruption issues.

## 5. Root-cause debt

| defect | one-line fix |
|---|---|
| `npm install` silently skips devDeps; `npm ping` E404 (registry/mirror `node-bin-source` misbehaves) | Pin a reachable registry in project `.npmrc`, or pre-vendor `vitest`/`pixelmatch`; render never needs them. |
| Shell output corruption / Windows cp1252 crashes (`pipeline.py show`, voice script) | Always run Python with `-X utf8`; prefer `read`/`grep` tools over `shell` for file inspection. |
| `video-render.mjs` spawns `remotion.cmd` with `shell:true`, breaking on the `Máy tính` space-in-path | Render via `pipeline.py render` (worked) or invoke `node node_modules/@remotion/cli/remotion-cli.js` directly (no cmd.exe). |
| Voice + timeline + render were done but pipeline status/gates lagged reality | Update `pipeline.py set <stage> done` immediately after each verified step, not at the end. |
| **Out-of-scope subagent recorded phantom gate reviews** (content 10.0 / audio 9.3 / D 9.3 / E 9.0 / B 9.5 / C 9.0 at 16:23–24, contradicting the genuine reviewers and predating the fixes) | Constrain review subagents to "return JSON only; never run `pipeline.py`"; record all scores yourself. Re-run every suspect review under clean control. Never deliver on a gate you did not dispatch. |
| `render … \| tail` masked a render failure (`tail` exits 0) → frame extracts came from the **stale** MP4, so reviewers re-litigated an already-fixed ticket | Do not pipe a command you need the exit code of; check `render` succeeded (byte size / `render_check`) **before** extracting QA frames. |

## 6. Next-video improvements

- Run `pipeline.py set <vid> voice done` the moment clips verify; do not leave the stage `in_progress`.
- Invoke Python pipeline commands with `python -X utf8 -I scripts/pipeline.py …` from the first call.
- Do **not** chase `vitest`/`pixelmatch` before confirming whether the task needs them; render only needs
  Remotion + ffmpeg.
- Render through `pipeline.py render` (normalizes + verifies) rather than raw `remotion render`.
- Complete content + audio + D reviews right after Gate A, before rendering, so Gate C is a re-test rather
  than the first review.
- When shell output looks impossible, re-read the file with `read` before "fixing" a non-problem.

## 7. Deliverable verdict

**Ship: YES as a fully gate-compliant delivery (subject to the owner's publish decision).**

- Verified: 47.40 s, H.264/AAC, 1080×1920, 30 fps, −13.9 LUFS, deterministic frame-0 cover visible
  (Gate D frame-0 opacity + idle-bob tickets fixed). Voice CER within threshold. `tsc --noEmit` clean.
- **All gates independently reviewed and passed under director control:** A 9.1 · content 9.0 ·
  audio 9.0 · D 9.0 · E 9.0 · B 9.0 · C 9.0 (C frame-bound to fingerprint `3485059:…887885600`).
  `status.json.review_valid` all `true`; `pipeline.py check` exits 0 → **ready**.
- **Accepted imperfections (non-blocking Thấp, carried forward):** no BGM (voice-only, judged
  acceptable for the story profile); audio A-1 recommends a human Vietnamese listen-through of s8
  (CER 0.075, just under the 0.08 threshold) before social publish; C-2 (s8 "four-legs" reading),
  C-3 (near-identical s2/s3 poses) are optional polish.
- **Voice license:** purchased (user-confirmed 2026-10-17); reference WAV is committed to the repo
  per that authorization (docs corrected from an earlier false "local-only" claim).
- Not committed/pushed/published — awaiting the owner's explicit go.
