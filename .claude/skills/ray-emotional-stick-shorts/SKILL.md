---
name: ray-emotional-stick-shorts
description: Produce emotionally expressive Vietnamese stick-figure Shorts with polished multi-scene direction, character acting, natural voice and musical storytelling, based on ray-video-10-phut.
---

# Ray Emotional Stick Shorts

Specialization of [ray-video-10-phut](../ray-video-10-phut/SKILL.md). Preserve canonical `ray-pineline-worflow-agent` and repo gates; do not invent approvals or bypass pipeline. This skill specializes **35–50s, 9:16** films with approximately **12–20 purposefully distinct shots**. Reference aesthetic: approved V5 "Hai phần ăn, một người": white expressive stick figures, nearly black background, restrained amber accents, deeply emotional narration and piano.

## Rules

1. Read repository AGENTS/CLAUDE rules, canonical pipeline and parent skill before executing. Gate order: A → Content/Audio/D → Motion → E → B → C → final QA/eval.
2. Develop three hooks, choose one story question and visual motif. Script short conversational Vietnamese around the measured utterance durations, not forced reading speed.
3. Build a stable character bible: line widths, proportions, joint pivots, face/head orientation, prop attachment, screen direction and 5 expressive poses. Emotion lives in tiny gestures, anticipation and breathing, not random effects.
4. Create a shot list with each shot's narrative purpose, camera, actor action, continuity anchor, transition, audio and target timing. Establishing → medium → insert → reaction → visual metaphor → climax → release. Do not cut solely to increase shot count.
5. Use frame-driven easing and at most two predominant transition families: match cuts, camera continuity, prop transformation, intentional holds and selective J/L-cuts. Render boundary-frame strips to inspect jumps, flashes and disconnected props.
6. Use the frontend-design pass and mobile-safe captions, especially Vietnamese diacritics; reference layout tokens: near-black #08090B, white #F5F5F4, gray #85878A, amber #EF9E69. Deviate only with user approval.
7. Cast each speaker, audition Vietnamese pronunciation and emotion, measure actual audio, synchronize to shots and captions. Prefer HeyGen Paul – Soothing when available and appropriate; never silently replace with synthetic fallback. Keep metadata/directions out of spoken text.
8. Compose a licensed/original subtle piano score tracking emotional stages. Duck below intelligible voice, verify true peak and integrated loudness as feasible, and **listen to final MP4**, not only a source WAV.
9. Use canonical Remotion build/render and review gates when accessible; record honest partial/previews if unavailable. Verify final MP4 has **both audible speech and music**; music-only file must never be labeled FULL.
10. Publishing and remote upload require distinct authorization. vidIQ import is not publishing. Save durable media IDs, not signed URLs, credentials or OAuth tokens.

Read [integrations](references/integrations.md), [creative direction](references/directing.md), and [video #12 production manifest](../../../docs/video-12-cho-duoc-lua-chon/README.md).

## Standard output

`docs/<vid>/brief.md`, `script.md`, `shot-list.csv`, `character-bible.md`, `design-spec.md`, `voice-sync.md`, `music-cues.md`, `motion-spec.md`, `transition-QA.md`, `asset-manifest.md`, `eval.md`; genuinely verified `out/<vid>-reel.mp4` when rendered. No channel name in narration unless user explicitly requests it.
