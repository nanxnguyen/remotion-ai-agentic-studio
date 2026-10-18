---
name: viral-tech-video-creator
description: Use when creating a Vietnamese Reel, TikTok or Short about a GitHub repository, developer tool, SaaS, AI product or technology website, especially when the video must be funny, vivid, accessible and emotionally relatable rather than a feature list.
---

# Viral Tech Video Creator

## Mission
Produce a **publish-ready 30–45 second 9:16 Vietnamese tech explainer**, not merely a storyboard. Research facts, understand the viewer's real problem, write a funny human-centered story, synthesize natural Vietnamese voiceover, build cinematic Remotion motion graphics, add licensed music/SFX, synchronize captions, QA, and render MP4.

Make the viewer feel: **“Đúng cái cảnh của mình luôn” → “Ủa, hay vậy?” → “Cho tôi xem thử.”** Favor accuracy, warmth and clarity over hype. Use playful cheekiness to make technical ideas memorable, never to mock the viewer.

## Input
- `source_url`: GitHub repository, GitHub Trending entry, or product website (required).
- `target_audience`: developers / general tech / founders (default developers).
- `platform`: Reels / TikTok / Shorts (default Reels).
- `duration_seconds`: 30–45 (default 42).
- `voice`: Vietnamese conversational voice, warm, expressive and naturally funny; gender/accent configurable.
- `tone`: lively, playful, cheeky but credible.
- `humor_level`: light / playful / cheeky (default playful); never crude, insulting or misleading.
- `brand`: optional colors/logo; use accurate assets only where permitted.
- `project_dir`: working directory for artifacts.

## Routing and tools
1. Check available tools and environment. Use an environment with file access, shell, Node.js, Remotion, media processing, and TTS integrations when available.
2. If the current chat cannot execute/render, request handoff to a capable mode **only via an available handoff mechanism**; honor user acceptance/rejection. Never claim to have switched modes without confirmation. If unavailable, produce an actionable build package and disclose what remains unfinished.
3. Select a valid TTS provider (Vietnamese supported) by **listening to sample output**, not solely by brand: Azure Speech, Google Cloud TTS, ElevenLabs, or local alternatives. Never invent API credentials, voice names, or audio files.
4. Use license-safe music, SFX, fonts, and assets. Track origin/license in `assets-manifest.md`. Do not scrape unlicensed clips or reproduce existing creator intros.
5. Use Remotion to author/render final video. FFmpeg may be used for post-production, normalization and QC.

## Production pipeline
### 1. Research and fact-check
- Read repository README, install instructions, package metadata, docs, demo/showcases, licensing, and relevant source paths; for websites inspect official pages and linked docs.
- Extract: what it does, user problem, differentiator, supported use cases, setup prerequisites, real demo, limitations.
- Cite each technical claim in `research.md` with URL/file path. Separate confirmed facts, inference and unknowns.
- Use GitHub Trending only for discovery, not as evidence of product capabilities. Record research date; avoid unstable numbers unless verified.
- Do not make cybersecurity tools sound universally capable. Only depict lawful, authorized analysis.

### 2. Audience and problem analysis
Before writing dialogue, create a compact `audience-brief.md` answering:

1. Who is watching, and what do they already understand?
2. What frustrating moment happens in their real life?
3. What workaround are they using now, and why is it annoying?
4. What misconception or fear blocks them from trying the product?
5. What single emotional payoff should the ending deliver?

Translate product features into human consequences. Prefer “đỡ ngồi dò 37 cái log lúc nửa đêm” over “cải thiện observability”. Choose one relatable situation as the story spine. If the audience insight is weak, research further before scripting.

### 3. Human-centered comedy story
- Choose ONE narrative thread and ONE concrete protagonist moment; avoid feature dumping.
- Use this emotional arc: **pain → playful exaggeration → reveal → simple proof → relief → CTA**.
- Allocate approximately 0–3s relatable pattern-break, 3–8s playful escalation and reveal, 8–24s mini-story/demo, 24–34s simple explanation, 34–40s payoff, 40–45s CTA. Adapt to actual speech.
- Put the first smile beat inside 6 seconds. Use 3–4 humor beats in a 40–45s video, leaving space for the joke to land.
- Select one primary comedy device: relatable exaggeration, deadpan contrast, self-aware aside, everyday analogy, mini-character, or callback. Do not stack random memes.
- Aim jokes at the broken process, confusing technology, or narrator's own struggle—never at the viewer's intelligence, identity, appearance or livelihood.
- Write spoken Vietnamese: short phrases, natural particles, contractions, sentence fragments and intentional pauses. Avoid corporate phrases such as “giải pháp toàn diện”, “nâng tầm trải nghiệm”, or repeated “Với [product]...”.
- Explain each technical term immediately through a familiar image or consequence. A non-expert should understand the value even if the product targets developers.
- Draft ~85–110 Vietnamese words for 40–45s, then calibrate with synthesized speech. If speech exceeds budget, edit copy before speeding audio.
- Read `references/humor-storytelling.md` before scripting. Use `templates/script-template.md` as the required output structure.

Run three writing passes:

1. **Clarity pass:** A viewer can retell the problem and solution in one sentence.
2. **Comedy pass:** Every joke grows from the situation and supports the message.
3. **Spoken pass:** Read aloud; rewrite anything that sounds like brochure copy or an AI reading bullet points.

### 4. Voice and sound
- Synthesize speech in meaning-based phrases or use expressive SSML where supported. Preview pronunciation of product, acronym and English technical words.
- Generate short samples from 2–3 suitable Vietnamese voices when the user has not approved a voice. Let the user choose before rendering the full video when voice quality is subjective.
- Direct the read like a friendly creator explaining something to a friend: vary pace, insert micro-pauses, underplay punchlines and avoid announcer rhythm. Do not imitate a specific living person's voice.
- Use a natural baseline rate; only apply subtle speed variation. Never use global speed-up to hide an overlong script.
- Retrieve word/phrase timestamps from TTS or align to audio; no guessed final timings.
- Choose license-safe instrumental electronic bed and restrained impacts/whooshes/UI clicks; use a brief musical payoff on brand reveal.
- Mix under voice with ducking. Target intelligible narration, controlled peaks and platform-safe loudness; verify by listening.

### 5. Visual direction
- 1080×1920, 30fps, full 9:16 composition, 30–45s.
- Opening 0–6s: fast app reveal -> locked source -> scanning/architectural insight -> product reveal -> seamless transition. Avoid persistent glitch/flashing.
- Every animation must explain an idea: screen UI, code tracing, system architecture, terminal, real case evidence, product identity. Clearly label simulated demo.
- Use layered depth, typography, lighting, particles judiciously. Never visually imply nonexistent features.
- Use Vietnamese-capable font (e.g. Be Vietnam Pro, properly licensed) and safe-area margins for platform chrome.
- Favor coherent continuous transitions over slideshow scenes; support reduced motion in project previews when practical.
- Give humor a visual setup and payoff: reaction cut, freeze beat, literalized analogy, UI surprise or restrained caption emphasis. Do not use unrelated meme clips as a substitute for writing.

### 6. Remotion implementation
- React + TypeScript; composable scene components; frame-based transitions via `useCurrentFrame`, `interpolate`, `spring`, `Sequence`, `Audio`.
- Derive `durationInFrames` from actual final audio timing. Captions are rendered from timestamped cue data; also export UTF-8 SRT.
- Produce `src/Root.tsx`, `src/scenes/*`, `src/components/*`, `src/data/*`, `public/audio/*`, `public/assets/*` and reproducible `package.json`.
- Do not invent placeholders in final render. If actual imagery cannot be obtained, build original explanatory vector diagrams.

### 7. Validation and delivery
- Verify factual claim mapping, accent/diction, word timing, no clipped Vietnamese glyphs, mobile safe zones, scene continuity, music clearance, audible voice, no black-frame glitches or silence gaps.
- Render production MP4 H.264/AAC at 1080×1920 30fps, inspect first/middle/last frames and listen to audio. Check duration and codec with ffprobe.
- Deliver `final-reel.mp4`, source project, `audience-brief.md`, `script.md`, `research.md`, `captions.srt`, audio stems as permitted, `assets-manifest.md` and short reproducibility instructions.
- If blocked by missing dependencies, credentials, or mode permissions: finish all feasible artifacts, mark partial status precisely, and never call a silent preview publish-ready.

## Quality gates (must all pass for 'FINAL')
- [ ] Every product claim backed by official material or labelled inference
- [ ] First meaningful frame and voice within 1 second
- [ ] Strong coherent 0–6s hook, no long blank intro
- [ ] Viewer pain is recognizable before the product explanation
- [ ] At least one natural smile beat lands inside 6 seconds
- [ ] Humor supports the idea; no random meme, shaming, cruelty or forced slang
- [ ] Product value can be retold in one simple sentence by a non-expert
- [ ] Voiceover sounds like conversation, not a feature list or advertisement announcer
- [ ] Audio narration natural and understandable, music not masking speech
- [ ] Subtitles perfectly match spoken Vietnamese and punctuation
- [ ] Every illustration correctly reflects the explained process
- [ ] Dynamic but readable on a phone; no overloaded scenes or excessive flashing
- [ ] Required assets have acceptable rights/licenses
- [ ] MP4 exists, playable, with actual voice + music + picture
- [ ] Render output inspected and technical metadata verified

## Example: REA
Use `https://github.com/morluto/rea`: explain that REA supplies agent-connected reverse-engineering tools through MCP; show a source-locked app, AI investigation and evidence; use documented Notion Electron clipboard showcase; acknowledge extra tools needed for native binary analysis. Use exact installation commands from current README, never fabricated terminal results. Source: official repo and its docs/showcases.

## Supporting references
- `references/creative-direction.md`: visual and sound recipes.
- `references/humor-storytelling.md`: audience analysis, comedy devices and natural Vietnamese dialogue.
- `references/qa-checklist.md`: final technical and editorial checks.
- `templates/config.example.json`: task configuration.
- `templates/script-template.md`: shot/timing structure.
