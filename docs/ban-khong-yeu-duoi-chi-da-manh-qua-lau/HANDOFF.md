# HANDOFF — ban-khong-yeu-duoi-chi-da-manh-qua-lau (stopped by user)

Run `python3 -I scripts/pipeline.py show ban-khong-yeu-duoi-chi-da-manh-qua-lau` first (no live agents; stale markers cleared).

## Stage / gate table
| item | state |
|---|---|
| research, brief, script | done; gate A accepted at cap 3 (8.8) |
| content | done; gate `content` passed 9.1 (round 2) |
| voice | done, 13/13 clips; **audio gate not yet recorded** |
| audio (BGM/SFX) | done by audio-agent; audio review round 1 = 5.0 revise; round 2 reviewer stopped before reporting |
| design | in_progress; gate D round 1 = 4.6 revise (lens a 4.6, lens b 5.7); rebuild interrupted |
| motion, build, render, qa | pending |

## Locked decisions
- Voice route 2: VieNeu, ref `voice-ref/refThanhLong.wav`, slug `thanh-long-nang-cao`. voice.json unchanged (gate A text).
- Caller line on phone UI = `Người thân`. Content-pack §3 headlines are authoritative (s2a `Ly của bạn vẫn trống`, s6 `Bạn không nghe máy` after ring stops; s3/s7/s9 caption-only). Ring must stop ≥1.0 s before s6→s7 boundary.
- Phrases were re-split in `voice-performance.json` for AR-03/04/05/s6 (director ruling); words not changed.
- Must not resemble `met-khong`, `cuoc-goi-nho` (motif overlap, D-12).

## Half-edited
- `src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/kit.tsx` modified by design-agent mid-rebuild (rigged figure, anchored umbrella, props). design-spec.md and out/qa/<vid>-style/cover/board/motion-hook PNGs are still the OLD failing versions.
- `.voice-input-manifest.json` stale (next gen-voice-clone run: use `--max-cer 0.04` + pinned seeds from sidecar).

## Open voice risks (listen items)
s2a "an ủi" (ASR "an ui"), a1 "chùng xuống" ("trùng", CER 0.041), s9 "che ô" ("chè ô"), s6 "nhắn" ("nhấn"). Cap spent; audio-reviewer round 2 was to judge real vs ASR noise (use multi-model ASR). If real → Cao ticket: options = other reference for those phrases, or reopen gate A for wording.

## Next steps (in order)
1. Resume design-agent (same task: fix 38 tickets in `design-review.lens-a.md` + `design-review.lens-b.md`, apply content-pack changes; see list of spec edits: headlines, `Người thân`, `minh hoạ` y-ranges, headline band 300–620, strong/light accent tiers, END line 2 no full stop, caption bottom ≤1710). Then 2 new design-reviewers (round 2) → `pipeline.py review D ...`, `gate D`.
2. In parallel: new audio-reviewer round 2 (docs/<vid>/audio-review.md) → `review audio`, `gate audio`, `set audio done`.
3. Join (director): `npm run voice:measure -- ban-khong-yeu-duoi-chi-da-manh-qua-lau --out src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-durations.ts`; build timeline (clip sum 31.419 s + holds ≈45.2 s, just over 45 s default — trim holds); audio-agent re-derives BGM_FILE_GAIN + re-bases SFX cues (AR-09/10/12); write join-notes.md.
4. motion-agent → motion-reviewer → E → task-planner → B → scenes → render → C → QA → eval.md → delivery.

## Việc dở dang → agent nhận (copy-paste cho agent kế tiếp)
| # | việc | agent | input | output | lệnh pipeline |
|---|---|---|---|---|---|
| 1 | Làm lại prototype design, sửa 38 ticket | `design-agent` | design-review.lens-a.md, design-review.lens-b.md, content-pack.md, design-spec.md, proto/kit.tsx (dở) | design-spec.md, proto/**, out/qa/<vid>-{style-1..3,cover,board,motion-hook}.png | `agent <vid> design-agent running --stage design` |
| 2 | Review Gate D vòng 2 (2 lens, mới) | `design-reviewer` ×2 | kết quả #1 + closure table | design-review.md (+lens files) | `review <vid> D <min> --verdict ...`, `gate <vid> D` |
| 3 | Audio review vòng 2 (ASR đa model cho s2a,a1,s9,s6) | `audio-reviewer` (mới) | audio-review.md, voice-report.md, 13 clip | audio-review.md | `review <vid> audio ...`, `gate <vid> audio`, `set <vid> audio done` |
| 4 | Join: voice:measure, timeline.ts, join-notes.md, trim holds ≤45 s | `video-director` | voice-durations, mix-plan.md | src/videos/<slug>/{voice-durations,timeline}.ts, join-notes.md | — |
| 5 | Re-derive BGM_FILE_GAIN, rebase SFX cue (AR-09/10/12) | `audio-agent` | voice-report.md (13 clip), measured timeline | mix-plan.md, assets-manifest.md | — |
| 6 | Motion design + review | `motion-agent`, `motion-reviewer` | join-notes, timeline, design accepted | motion-spec.md, motion-evidence.json, strips, animatic | `review <vid> motion`, `gate`, `set motion done` |
| 7 | Gate E → task-planner → Gate B | `integration-reviewer`, `task-planner`, `task-reviewer` | toàn bộ packet | integration-review.md, task-review.md | `review E/B`, `gate E/B` |
| 8 | Build scenes + Reel/registry | `scene-agent` ×N, director | task-review.md | src/videos/<slug>/scenes/*.tsx | `set build` |
| 9 | Render, Gate C, QA, eval.md, delivery | `render-agent`, `video-reviewer` ×3, `qa-agent`, director | — | out/<vid>-thanh-long-nang-cao-reel.mp4, final-check.md, qa-report.md, eval.md | `render`, `review C`, `set qa done`, `check` |
| 10 | (tuỳ chọn) nghe tay 4 từ lỗi giọng; nếu thật sự sai: đổi ref cho phrase đó hoặc mở lại Gate A | user/director | — | — | — |

## Warnings
- A peer session `ai-video-edition-a1` was running on this repo; check it does not write this video's status.json.
- script est. 46–50 s vs default 30–45 s (gate A accepted); trim holds at Join or ask user.
