# Native Remotion psychology animation quality

## Visual language

Reproduce the **method**, not the copyrighted reference frames. Original SVG stick rig with connected joints and prop contact: visible reach/grab/release, real foot placement, gaze, head turn, eye/brow emotion, character interaction. Build scenes that demonstrate a psychology concept (e.g. fatigue calendar, chat bubbles, crossed-out unpaid task, boundary response) rather than a static portrait plus zoom.

Default video 1080×1920, 30 fps, true source resolution, `H264/yuv420p`, audio `AAC 48kHz stereo`, `+faststart`. Use `spring`, `interpolate`, `Sequence`, `Audio` or `OffthreadVideo`, deterministic frame-based animation, seeded randomness when needed. **Do not call Pillow/FFmpeg-only a native Remotion render**. Use real assets and valid imports, follow `src/videos/registry.ts` and `AGENTS.md` of `nanxnguyen/remotion-ai-agentic-studio` before modifying repository files. Do not commit credentials/MP4/media with unclear rights.

Safe motion budget: 2–4 useful changes per ten seconds, scene-level differentiation; do not chase arbitrary cut counts. A psychology observation needs a compelling visual example with stakes and a visible change of decision, not 10 thumbnails sharing one rig and background. Avoid overly rapid pan/flash and distracting sparkles. 3D is optional, unnecessary for this format.

## Captions/typography

- Prefer **authentic Be Vietnam Pro ExtraBold** installed as actual font; test Vietnamese glyphs and multi-accent characters; disclose fallback if unavailable.
- Every spoken word represented in correct order. Split at natural sense, usually 3–8 words per card and **max two lines**; do not delete spoken material to achieve design length. Word highlight only when timed by verified word onset (30fps target ~≤2 frames, manual review required).
- Use measured final MP3 and word/phrase timestamps; forced alignment assists but must be audited. **Uniformly splitting an utterance interval into 3–4 caption groups is an estimate, never "100% sync".** If timed only by whole phrases, label "phrase aligned / not word verified" and keep REVIEW.
- Place subtitles in mobile safe zone: avoid platform buttons and progress bars. Avoid opaque black blocks. High contrast, responsive width at 360×640 proof frames.
- Distinguish static titles from speech captions. Hooks can use a single short on-screen headline plus exact speech captions, but no text piled on faces/bubbles/CTA.

## Regression checklist learned from #27 V1

- **Counter bug:** V1 displayed **08 / 06**, while content had only 6 signs. Build counter from actual `signs.length`; only show counter on numbered sign scenes and clamp 1..N. Unit test boundaries and end slide.
- **CTA collision:** Subscribe button overlay obscured character feet. Separate CTA safe zone from rig/feet, test at 360×640 and 1080×1920.
- **Word timing:** Original caption chunks followed phrase windows from silence boundaries, **not verified per word**. New take requires final-audio alignment and listening; no shortcut by proportional allocation.
- **Speech bubble/face:** avoid bubble overlapping head at the final takeaway.
- **Headline collision:** avoid re-adding thumbnail title atop an already-captioned frame; generate thumbnail with clear dedicated title zone.
- **Opening:** earlier first 6.57s covered intro; ensure visible situation change and real tension by ~2–3s without falsely manufacturing a dramatic fact.

Proof with a contact sheet from **actual decoded video** AND real-time whole-video inspection. A rendered screenshot alone cannot prove audio/caption sync.
