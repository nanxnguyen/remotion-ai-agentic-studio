# HANDOFF — voice-over / Remotion completion

## Current state (2026-10-22)

**NOT A COMPLETED VIDEO.** The previous chat produced a separate 37-second *Python/FFmpeg visual preview*, with music but no narration. This PR contains a canonical six-shot **proposed** narration, performance plan, and a helper for generating and mixing an **interim voiced preview**. No actual audio MP3, raw ref WAV, rendered MP4, QA stills, gate scores, status.json or audit results are checked in. This PR **does not imply any pipeline state** and must remain Draft until source-workflow completion. Never mark a stage `done` without its required evidence or claim a reviewer checked it.

### Locked decisions

- Slug: `bat-dau-lai-sau-moi-quan-he-dai`, story profile.
- Voice: authorized **Thanh Long Nâng Cao**, VieNeu-TTS v3 Turbo; do not substitute a generic TTS voice.
- Theme: aftermath of long relationship; two meals → one meal; pure black background, stick figures, restrained orange #F28C52.
- Must preserve the original hook idea and first-person perspective. Reconcile its exact words in Gate A; see `script.md`.
- Silence at the end; music required; **do not publish automatically**.

### Prerequisites

1. Checkout this PR branch on the actual configured project machine (Node 22, npm, Python 3.12+, FFmpeg/FFprobe, Chrome/Remotion, VieNeu-TTS + faster-whisper + Hugging Face cached models).
2. Keep private sample `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav` local; verify its **actual** MD5 before generation and confirm rights/permission to synthesize from it.
3. Download the separately delivered preview video `bat-dau-lai-sau-moi-quan-he-dai-preview.mp4` from the conversation if producing the **interim preview**. It is intentionally **not in Git**.
4. Read `AGENTS.md`, `.agents/rules/README.md` + all rules, `.claude/skills/ray-pineline-worflow-agent/SKILL.md`, `.claude/skills/ray-video-10-phut/SKILL.md`, architecture contract, review gate schema, voice-sync reference and frontend-design skill. Current workflow is v4.

### A. Interim voiced-preview helper (does not pass pipeline)

```bash
python3 -m unittest scripts.test_voiceover_preview_thanh_long
python3 scripts/voiceover_preview_thanh_long.py \
  --repo . \
  --video /ABSOLUTE/PATH/bat-dau-lai-sau-moi-quan-he-dai-preview.mp4 \
  --python ~/.venvs/vieneu/bin/python \
  --output /ABSOLUTE/PATH/bat-dau-lai-sau-moi-quan-he-dai-thanh-long-nang-cao-voiced-preview.mp4
```

Use `--preflight` to check reference/video/FFmpeg availability without generation. This helper uses **real** `scripts/gen-voice-clone.py` with `--max-cer 0.04`, checks each generated clip's duration against original slots, and refuses to trim speech. The source preview is not the final production composition. If a clip overflows, rework the script/story and native Remotion timeline; **never** time-stretch or truncate real voice just to fit.

### B. Required full pipeline, from Phase 0 to delivery

1. Preflight: `ffmpeg -version`, `node -v`, `npx remotion --version`, browser/Chrome, import test for TTS. Run `python3 -m unittest scripts.test_voice_catalog`. If `scripts/preflight.py` is missing, record manual preflight. Check duplicate subjects in `docs/` and `src/`. Also note whether `scripts/tone-probe.py` and `scripts/gen-voice-vc.py` are missing.
2. Initialize **once** after duplicate check: `python3 -I scripts/pipeline.py init bat-dau-lai-sau-moi-quan-he-dai --comp BatDauLaiSauMoiQuanHeDaiReel --voice thanh-long-nang-cao --profile story`. Do not replace any existing `status.json`, and resolve conflicts with the `video:new` numbering process.
3. Create `research.md`, revise `brief.md` and `script.md`; verify hook fidelity and write `voice-direction.md`, `voice.proposed.json`, `voice-performance.proposed.json`. Dispatch **independent** `script-reviewer` for Gate A ≥9 before audio.
4. After A: content-agent + reviewer ≥9, real voice/audio-agent + audio reviewer ≥9, design-agent + reviewer D≥8.5. Read frontend-design; produce 3 genuine style stills, cover, storyboard and design pass report. Reviewers must be fresh processes / contexts.
5. Voice: only actual clone and real ASR evidence (CER ≤0.04 each key). For direct generation: `python3 scripts/gen-voice-clone.py bat-dau-lai-sau-moi-quan-he-dai --ref docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav --json docs/bat-dau-lai-sau-moi-quan-he-dai/voice.json --performance docs/bat-dau-lai-sau-moi-quan-he-dai/voice-performance.json --max-cer 0.04`. Validate hashes and duration of each `sN.mp3`; document licence, real SFX/BGM, loudness and `voice-sync.json`.
6. Generate measured durations: `npm run voice:measure -- bat-dau-lai-sau-moi-quan-he-dai --out src/videos/bat-dau-lai-sau-moi-quan-he-dai/voice-durations.ts`. Native Remotion scene files belong at `src/videos/bat-dau-lai-sau-moi-quan-he-dai/scenes/*.tsx`. Use `defineVoiceTimeline` based on measured `VOICE_SECONDS`, semantic holds (end ≥1.5s) and 30–40s target, not the interim 6-slot preview boundaries.
7. Complete Join → Motion full animatic and clean reviewer ≥9 → E integration reviewer ≥9 → task plan B reviewer ≥9 → scenes build → stills of every shot and boundary → `npm run verify`, `npm run test:visual` and typecheck.
8. Render via `python3 -I scripts/pipeline.py render bat-dau-lai-sau-moi-quan-he-dai --min-seconds 30 --max-seconds 40`. Run blackdetect, EBU R128/true-peak check, mix ASR, per-shot still check, voice sync validation, independent Gate C ≥8 + final QA after C. Keep voice ~12–18 dB over BGM; no clipped narration, blank frames or truncated subtitles.
9. Write actual `eval.md`, audit and check (must exit 0): `python3 -I scripts/pipeline.py audit bat-dau-lai-sau-moi-quan-he-dai` and `python3 -I scripts/pipeline.py check bat-dau-lai-sau-moi-quan-he-dai`. Only then deliver `out/bat-dau-lai-sau-moi-quan-he-dai-thanh-long-nang-cao-reel.mp4` with genuine SHA-256, duration, reviewer names and measured stats.

**Required gate order:** A → [content, audio, D] → motion → E → B → C → final QA. Track stage and agent lifecycles with `pipeline.py`; never fabricate status.json, gate scores, ASR, human listening or file hashes.

### Known blockers / next action

- This PR environment cannot run the actual user-side TTS/Remotion model pipeline, verify authorization, or access the private sample and local preview in the source checkout.
- Mandatory user quote needs a Gate A text reconciliation before voice generation, as noted in `script.md`.
- Obtain the original preview MP4 for the interim helper; create native Remotion visuals from scratch for the true deliverable.
- `scripts/preflight.py`, `scripts/tone-probe.py`, and `scripts/gen-voice-vc.py` may be absent; test and document, never claim they ran.
- Use the pipeline's real `show`/`audit` outputs as the authoritative stage table; none were recorded for this PR.
