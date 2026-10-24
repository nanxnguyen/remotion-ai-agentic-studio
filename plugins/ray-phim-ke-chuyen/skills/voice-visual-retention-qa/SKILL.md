---
name: voice-visual-retention-qa
description: Use when planning, storyboarding, editing or approving Ray Phim Kể Chuyện Shorts and ensuring narration, action and actual footage agree before marking a version final.
---

# Ray Voice-to-Visual Retention QA

Read `skills/ray-phim-ke-chuyen/references/voice-visual-retention-qa-v029.md` **before generating scenes**. Build a story-specific timeline of actionable viewer-observable events. For every action described by a Vbee line, generate a before → action → outcome visual. Require real scene assets and reviewed MP4 frame references; do not mistake a spoken event or caption for visual proof. Run `python skills/ray-phim-ke-chuyen/scripts/validate_voice_visual_evidence.py voice-visual-evidence.json --assets-root ./production` after examining the actual video and proof frames. If any event cannot be shown, re-stage it or honestly mark it incomplete, do not self-pass.

Keep 60s 9:16 0–6s hook, soft fades 0.35–0.55s, measured original Vbee, legible white/amber/red captions, restrained foley and clean cinematic 2.5D. Original realistic actor animation remains optional. Deliver video/thumbnail/YouTube copy on numbered Google Drive movie folder, production source and QA on GitHub, NO GitHub Releases.
