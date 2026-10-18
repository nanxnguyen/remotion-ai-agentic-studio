# Motion workflow implementation ledger

Approved scope (2026-10-18): workflow v4, Phase 2a Script -> Phase 2b Voice Direction -> A, Phase 4a Join -> Phase 4b Motion Design and independent motion review -> E; shared voice/motion foundations; a new 36-second vertical demo. Existing videos retain their visuals and workflow history. No uploads or publication are requested.

## Decisions

- Keep Remotion packages at exactly 4.0.534. Add official transitions; do not install all of Remotion Bits.
- Motion style follows each video's brief. Default new-video duration remains 30-45 seconds including intentional holds.
- Preserve absolute shot, voice and caption starts; compensate visual overlap rather than shortening the measured timeline.
- Use the current workspace because the requested prior skill edits and uncommitted motion foundation are inputs to this task. Preserve other contributors' changes.
- Motion evidence includes the full animatic and a structured manifest linking hook, highlight and boundary strips. Media stays local and is never committed.
- `voice.json` remains canonical. Workflow-v4 videos add `voice-direction.md`, a proposed performance sidecar at gate A and an accepted `voice-performance.json` for generation/review.
- Local VieNeu 3.8.3 uses the purchased, read-only preview catalog. References never leave the machine. ASR proves textual fidelity, not perceived naturalness.
- New audio reviews fingerprint the performance sidecar and generated media; changed voice inputs invalidate audio acceptance and the motion/downstream chain.

## Ownership and progress

| Work | Owner | State |
| --- | --- | --- |
| Pipeline v4, invalidation, upgrade, evidence, monitor and tests | pipeline_motion_v4 + video-director | Implemented; final regression pending |
| Dependencies, typed transition adapter, helpers and tests | motion_core | Implemented; final regression pending |
| Skill, rules, roles and generated runtime definitions | motion_workflow_docs + voice_workflow_docs | Implemented and targeted checks passed |
| Voice performance validator/generator and tests | voice_performance_code | Implemented; local inference pending |
| Demo orchestration, shared video files, integration and final checks | video-director (root) | Gate A voice-direction review in progress |

## Baseline

- Existing uncommitted edits were inventoried before implementation; unrelated video files are outside this task.
- Node, Python 3.12, FFmpeg and FFprobe are present. Python edge_tts, faster_whisper, PIL and YAML are installed; faster-whisper-small is cached.
- Voice catalog test passed. Local Be Vietnam Pro font files are available.
- Prior full verify stopped at formatting issues in 99 unrelated files; no blanket formatting is planned.
- The existing lam-lai video's audit errors are pre-existing and outside this task. They must not be used as evidence for the new demo.

## Verification

Passed so far: core motion tests, targeted v4 pipeline tests, voice-performance/catalog tests, monitor/sync tests, agent sync check and skill validation. Pending: fresh full verification, typecheck, visual diff inspection, demo branch reviews, measured local voice, Join, Motion review, E/B, build, render, C, final QA and final audit.
