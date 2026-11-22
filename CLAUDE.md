# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Read and follow [AGENTS.md](AGENTS.md) as the canonical repository instructions. This file is a thin Claude adapter: it must not fork the workflow's rules. When AGENTS.md sections conflict, the later dated override wins (e.g. "NO GitHub Releases", 2026-10-25).

## Workflow and agents

- Production workflow: `.claude/skills/ray-pineline-worflow-agent/SKILL.md` (canonical directory; `.agents/skills/ray-pineline-worflow-agent` is a symlink to it).
- Specialist roles are generated into `.claude/agents/`, `.opencode/agents/` and `.codex/agents/` from `.agents/roles/` by `python3 scripts/sync_agents.py` (`--check` verifies). Edit the role, never a generated file.
- Rules every video turn must follow: `.agents/rules/README.md`. Before ending a turn on a video, run `python3 -I scripts/pipeline.py audit <vid>`; it must exit 0, or every remaining error goes into `docs/<vid>/HANDOFF.md`.

## Commands not listed in AGENTS.md

```bash
npm run render -- --list                                   # list composition IDs from the registry
npm run render -- --id 01-HelloWorldReel --out out/x.mp4   # render one composition
python3 scripts/pipeline.py render <vid> --draft --scale 0.5  # iteration render (draft)
npm run lint / npm run typecheck / npm test                # pieces of `npm run verify`
npx vitest run tests/core/<file>                           # single Vitest file
python3 -m unittest discover -s tests -p test_<name>.py    # single Python test file
```

## Architecture in one paragraph

Each video is self-contained under `src/videos/<slug>/` (`index.ts` manifest, `Reel.tsx`, `timeline.ts`, `scenes/SceneNN.tsx`, optional `kit.tsx`) and is registered only in `src/videos/registry.ts`, which `Root.tsx`, tests and automation all read. `src/core/` holds shared typed contracts (video/timeline/audio) with no per-video styling. Production evidence (brief, script, shotlist, voice JSON, reviews, `status.json`, `HANDOFF.md`) lives in `docs/<slug>/`; `scripts/pipeline.py` enforces phase/gate transitions over it, scored per the skill's `schemas/review-gates.json`. Images live in `public/images/<slug>/`. Rendered MP4s go to Google Drive, never Git.

## Vbee voices (audition 2026-11-15)

Credentials exist only as GitHub Secrets (`VBEE_ACCESS_TOKEN`, `VBEE_APP_ID`), so every Vbee call runs in GitHub Actions; workflows trigger on push to their branch (workflow_dispatch needs the default branch). Tooling, on branch `feat/cam-giac-bi-con-trung-dot` until merged:

- `scripts/vbee-list-voices.py` + `.github/workflows/vbee-list-voices.yml`: full catalog via `GET https://vbee.vn/api/public/v1/voices` (vi-VN: 35 VBEE + 1,453 COMMUNITY voices).
- `.github/workflows/vbee-voice-audition.yml`: synthesizes `docs/vbee-voice-audition/line.json` with every `code speed` line in `docs/vbee-voice-audition/voices.txt`; edit that list and push to audition other voices.
- Narration itself: `scripts/gen-story-vbee-batch.py --voice-code <code> --speed <x>`. Vbee pads ~0.55 s at punctuation; tighten pauses in the timeline builder rather than raising speed.

Measured on one cartoon line (Whisper-medium word error, pitch range in semitones = expressiveness, `credit_factor` = cost per character):

| Use | Voice | Code | WER | Range | Cost |
|---|---|---|---|---|---|
| Lively narrator, Northern | Quốc Huy Pro (Beta) | `hn_male_quochuy_yt_24k-pre` | 2% | 12.2 | ×3 |
| Lively narrator, Southern | Anh Tú Pro (Beta) | `sg_male_anhtu_yt_24k-pre` | 5% | 13.1 | ×3 |
| Female narrator, most expressive | Thanh Mai Pro (Beta) | `sg_female_thanhmai_yt_24k-pre` | 5% | 13.8 | ×3 |
| Kids storytelling (Vbee's own suggestion) | Ngọc Lan | `hn_female_hermer_stor_48k-fhg` | 2% | 8.6 | ×1 |
| Warm male storyteller | Anh Khôi | `hn_male_phuthang_stor80dt_48k-fhg` | 2% | 10.3 | ×1 |
| Child character, boy | Việt Bách | `hn_male_vietbach_child_22k-vc` | 2% | 6.8 | ×1 |
| Child character, girl | Ngân Hà | `hn_female_nganha_child_22k-vc` | 2% | 8.8 | ×1 |
| Child character, Southern girl | Cutie Jennie (community) | `s_hochiminh_female_cutiejennie_children_vc` | 2% | 10.6 | ×1 |
| Baseline / emotional Shorts default | Thanh Long | `hn_male_thanhlong_talk_48k-fhg` | 5% | 8.1 | ×1 |

For 2D mascot explainers prefer one narrator plus one child voice for the mascot. Community voices are clones of real people: check Vbee's commercial-use terms before monetized use. These are machine measurements, not a listening verdict; the user's ear decides. Thanh Long remains the configured default where a skill or AGENTS.md names it.
