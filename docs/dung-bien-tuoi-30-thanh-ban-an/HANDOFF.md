# Handoff — dung-bien-tuoi-30-thanh-ban-an

## Final audio fix round 2 — 2026-10-18

- Updated `mix-plan.md` only for the cue correction; voice clips, `voice.json`, `timeline.ts`, and `Reel.tsx` were not edited.
- Re-ran `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out /tmp/dung-bien-voice-durations-final.ts`; the generated file is byte-identical to `src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts`.
- Rebased every SFX cue on the current measured durations with `ceil(spoken-end × 30) + 1` frame. The critical corrections are `s3a 130f / 4.333s`, `s6b 94f / 3.133s`, and `s10 58f / 1.933s`.
- `mix-plan.md` now contains exact bounded cue windows and a round-2 no-overlap proof. All 12 cue instances pass with at least one 30 fps frame of post-voice clearance.
- Re-ran `ffprobe`, `ebur128=peak=true`, and `volumedetect` across all 25 current MP3s (16 voice + 1 BGM + 8 SFX). The current source measurements are recorded in the latest audio review; no integrated mix was rendered.
- AUD-004/AUD-007 are resolved at the plan/proof level. AUD-005 remains pending: integrated render, final loudness, ducking, voice/music windows, and near-silent ending are director/build dependencies and are not claimed here.
- Final `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` remains **FAIL** for the pre-existing missing canonical Gate A report (`script-review.md`, reported three times) and stale `design-reviewer` running state while design is done. No status file was edited.

## Voice-agent reconciliation update — 2026-10-18

- Current MP3s were remeasured directly; no new audio was generated. `voice.json` and `timeline.ts` remain unchanged.
- Updated `voice-report.md` and `voice-clone-asr.md` with fresh `ffprobe`, PCM faster-whisper CER, `silencedetect`, `ebur128`, and `volumedetect` evidence for all 16 voice clips.
- Reran `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts` because targeted regeneration changed durations. Current total voice is 43.737 s; `s6b` is 3.087 s / 4.21 syl/s.
- Ticket closure: AUD-001 not fixed; AUD-002 not fixed (`s9b` passes but `s8` fails); AUD-003 not fixed (3.5 LU loudness spread); AUD-006 not fixed (s6b CER 0.174). AUD-004 and AUD-005 remain with audio-agent/director for mix integration and render proof.
- Current fresh ASR passes 8/16 clips. The remaining machine-unverifiable items are listed in `voice-report.md` and `voice-clone-asr.md`; no naturalness or accent claim is made.
- Final required audit command: `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` → **FAIL** only because three historical Gate A entries reference missing `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md`. No voice-agent/stale-agent error remains in the final audit output.

## Audio-agent handoff

- Stage: `audio` remains `in_progress`; producer packet is complete, independent `audio-reviewer` is still required before `audio` can be marked `done`.
- Producer: `audio-agent-2` (completed this continuation).
- Owned outputs: `public/audio/dung-bien-tuoi-30-thanh-ban-an/bgm.mp3`, eight `sfx-*.mp3`, `assets-manifest.md`, `mix-plan.md`, and `analysis/no-beat-sync.md`.
- Decision: original deterministic soft-story BGM, no beat grid. Timeline remains voice-led; cues are relative to shot starts.
- Do not edit voice clips, `timeline.ts`, or `Reel.tsx` in this handoff. The director owns the eventual mix integration.

## Stage / gate snapshot

| Area | State | Evidence / next owner |
|---|---|---|
| Research | done | `research.md` |
| Brief / Script | done | Gate A pass 9.0 in round 3; see open audit issue below |
| Content | in_progress | `content-pack.md` from locked script/voice |
| Voice | in_progress | clone route and voice clips owned by voice-agent |
| Design | in_progress | style/prototype work owned by design-agent |
| Audio | in_progress | producer files complete; next `audio-reviewer` measures and records `audio-review.md` |
| Render / Final QA | pending | downstream |

## Checks completed

- `ffprobe` run on BGM and every added SFX: all decode as MP3, 44.1 kHz stereo, with non-zero durations.
- FFmpeg `volumedetect` and `ebur128=peak=true` run on every added file; no selected source has a peak below −12 dB.
- `sfx-paper-wind.mp3` is 5.50s and is explicitly bounded in every cue (`45f` or `48f`).
- No voice clip, timeline, or Reel file was modified.

## Audio fix round 1 update

- `mix-plan.md` was corrected for AUD-004/AUD-005. All SFX cues now use explicit relative frame offsets and bounded `durationInFrames`; each cue starts at least one 30 fps frame after the measured spoken interval and fits the documented hold.
- No audio file, `voice.json`, `timeline.ts`, or `Reel.tsx` was changed. `assets-manifest.md` remains valid because the source inventory and measurements did not change.
- AUD-005 remains pending until Join produces an integrated render. The corrected plan records the exact post-Join acceptance checks for integrated LUFS, true peak, voice/music gap, duck ramps, disjoint SFX intervals, and the final near-silent hold; no render result is claimed here.

## Open issues / exact next steps

1. Run an independent audio reviewer over the packet and write `docs/dung-bien-tuoi-30-thanh-ban-an/audio-review.md`; then record the audio review/gate through `pipeline.py`.
2. Existing preflight/audit failure is outside this audio packet: all three historical Gate A entries point to `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md`, but this checkout only has the round-specific `script-review.a*.md`, `b*.md`, and `c*.md` files. Do not hand-edit status; the director should restore/produce the canonical report or repair the pipeline evidence path.
3. After audio review, the director integrates the mix plan in `Reel.tsx`, renders, and re-measures the final mix.

## Latest required audit result

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` remains **FAIL** for pre-existing/out-of-scope state:

- canonical Gate A report `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md` is missing (three review references); round-specific reports exist.
- `voice-agent-3` is still recorded as running while the `voice` stage is done; status ownership remains with the director/voice workflow.

The last required command for this handoff is `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`; its result is reported in the agent handoff.

## Design-agent Round 2 audit note (2026-10-18)

Design outputs are complete and verified, but the repository-wide audit remains red for pre-existing ownership/evidence issues outside this design scope:

```text
python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an
FAIL
- review A report docs\dung-bien-tuoi-30-thanh-ban-an\script-review.md is missing (reported three times by historical review entries)
- agent voice-agent-3 is still running but stage voice is done
```

`npm run test:visual` also remains red outside this video: `CuocGoiNhoReel@1418` attempts to render frame 1418 although that composition ends at frame 1307. `npm run verify` reaches `format:check` but reports the repository's existing formatting debt across unrelated files; owned proto files were formatted and `npx tsc --noEmit` passes. The director/voice owner must repair the canonical script-review evidence and stale voice-agent state; design-agent did not edit status, timeline, Reel, Root, package.json, or other owners' files.
