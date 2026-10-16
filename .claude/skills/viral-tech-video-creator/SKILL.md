---
name: viral-tech-video-creator
description: Use when making a new Vietnamese 9:16 Reel/TikTok/Short (30-60s) in this project about ANY topic (GitHub repo, product, knowledge, news, story, how-to; tech is only the default example). Owns research, audience brief, content+style brief, humor script, voice and fact-check. Hand off to video-shotcraft for building and rendering the Remotion scenes.
---

# Viral Tech Video Creator (project edition)

Vendor source: `skills/viral-tech-video-creator/` (do not edit). Read its `references/humor-storytelling.md` before scripting, and `references/qa-checklist.md` + `templates/script-template.md` when finishing. This file is the project-specific workflow.

## Defaults
9:16, 1080×1920, 30fps, **30-60s** (user range), Vietnamese conversational, playful but credible, humor never aimed at the viewer. Reply to the user in Vietnamese; code/commits in English.

## Steps (in order, no skipping)
1. **Research** the official README/site (WebFetch). Write `docs/<video>/research.md`: facts with URL, inference, unknowns. Avoid unstable numbers (stars, prices).
2. **Brief** `docs/<video>/brief.md` — this is where content and style are decided, per product (see CLAUDE.md "Script phase"):
   - Content: one pain moment (story spine, must differ from existing videos), one-sentence value, comedy device + callback, 3-5 sourced claims, what is left out.
   - Style: palette hex, fonts, motion personality, scene metaphors, caption look, each tied to the product's own branding; name the existing videos it must not resemble.
3. **Script** `docs/<video>/script.md`, using the installed script skills as helpers (third-party, MIT, unmodified; English-first, so patterns apply but the Vietnamese wording is written by us):
   - `viral-short-form`: structure (hook → escalation → payoff → CTA) and diverse hook options from the brief.
   - `viral-hooks`: critique and strengthen the first 1-3 seconds (visual + spoken + on-screen text layers).
   - `video-script`: only the `hook <topic>` and `rewrite <script>` modes. Skip its weekly flow: this project has no `video-agent/voice.md`, so read `brief.md` + `research.md` instead and save to `docs/<video>/script.md`, not `video-agent/scripts/`. Do not run its `humanize` perl step on Vietnamese text; its tip to keep curly quotes and `…` conflicts with our TTS rule (use plain `"` and `...` in text sent to edge-tts).
   - Ignore vendor upsell/publishing advice; take only the pattern guidance.
   Then still apply this project's rules: 6-ish shots, ~110-150 spoken Vietnamese words for 50s, first smile before 6s, pain → exaggeration → reveal → proof → relief → CTA. Run clarity, comedy and spoken passes. One TTS clip per shot.
4. **Voice**: choose the voice from `vietnamese-voice-samples/previews/` first and record it in `brief.md`. Use the authorized route and explicit `--json` command in `.claude/skills/ray-pineline-worflow-agent/SKILL.md`; output `public/audio/<id>/sN.mp3` and measure with `ffprobe`. The preview is only a listening sample.
5. **Hand off** to `video-shotcraft` with the brief, script and measured durations.
6. **Fact-check + QA**: every claim maps to research.md; mock UI is labelled "minh hoạ"; captions equal spoken lines; run an independent subagent review before declaring done.

## Gates
Claims sourced; first smile <6s; one-sentence retellable value; style and hook differ from prior videos; captions match voice; voice audible over BGM; no unlicensed assets (log in `docs/<video>/assets-manifest.md`).
