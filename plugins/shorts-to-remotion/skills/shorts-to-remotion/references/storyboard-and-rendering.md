# Storyboard and rendering playbook

## Target configuration

- Vertical 9:16, 1080×1920 ideal; acceptable proof-of-concept 720×1280.
- 30 FPS, target ~55 seconds; target 1650 frames at 30fps.
- 1–3 s opening hook; visual progression every ~3–7 s.
- Underlay background photo/illustration can use full-height crop with subtle Ken Burns, blurred backdrop top/bottom if reference uses a horizontal scene.
- Bottom-third subtitle in safe zone: white uppercase / title case heavy sans, black outline/shadow; cyan and yellow emphasis; at most two lines per phrase.
- Distinct assets, voice, characters and original text. Do not reproduce source imagery.

## Reference-to-original worksheet

| Start–end | Reference observation | Functional technique | Original alternative |
|---|---|---|---|
| 0–3s | Surprise visual | 2-second hook, motion zoom | Contrasting opening image + question |
| 3–10s | Context image + subtitle | Establish timeline quickly | New place/time/subject |
| 10–22s | Character and environment cuts | Faster narration + colored emphasized keywords | Original illustration set |
| 22–40s | Rising tension | Sound design, purposeful close-ups | Three escalations with visual continuity |
| 40–52s | Reveal | 1–2-second pause and reveal | Original payoff grounded in story |
| 52–55s | CTA / lingering frame | Retention end beat | Short question/series promise |

Use this as a template, not a claimed analysis of any particular reference. Derive actual pacing from real source metadata.

## Remotion architecture

```
src/shorts/
  ReferenceStyleShort.tsx     # Composition
  script.ts                   # Scene[] with from/duration/text/emphasis/assetId
  components/Subtitle.tsx
  components/VisualScene.tsx
  assets/                      # Original media assets
```

Pseudo-schema:

```ts
type ShortScene = {
  id: string;
  from: number; // integer frames
  duration: number; // integer frames
  narration: string;
  caption: string;
  highlight?: string;
  image: string;
  zoomFrom?: number;
  zoomTo?: number;
};
```

Design all scene timing from a central FPS. Make text-safe. Use generated illustrations or licensed media rather than screen captures from reference. Record sources/rights. Audio narration should be independently generated or supplied; do not simulate audio availability.

## Acceptance tests

1. Input file playable; `ffprobe` extracts video duration, resolution, stream codecs.
2. Scene timing total exactly matches duration (within one frame).
3. Captions and text remain within vertical crop safe area and do not overflow for Vietnamese glyphs.
4. Output frames non-black/non-empty across opening/middle/end; contact sheet visually checked.
5. If VO/SFX is required, verify separate audio stream and mix; if not available label output silent.
6. Exported artifact actually exists and the stated path is downloadable.

## Example user request

"Dùng Short trên Drive làm style reference, tạo video 55 giây chủ đề 'bí ẩn tàu ma', viết voiceover, chia timeline, tạo asset gốc, dựng Remotion và gửi MP4 + zip code."

## Mandatory visual-quality & regression review (2026-10-25)

Before assessing a reference or rendering a new video, **read and enforce [Video Quality Gates](video-quality-gates.md)**. This is required for ALL future footage and updates, not only stick figure shorts. For stick figure content use white heavy glyph-safe type, restrained amber accents, a thin dark stroke/shadow, **no solid black caption box by default**, no duplicate 'decorative' text overlapping the subtitles. Check font treatment against previously approved version and inspect a 360×640 phone-size preview. Animated actions must keep limbs attached, props consistent, feet planted and dramatic contact visible. A changed-frame percentage alone does not measure true cinematic motion.

For revision comparisons always report **what changed, what still fails, what was measured, and what cannot be inferred about audience retention**. Produce separate versioned preview MP4; keep old final intact until user explicitly approves replacing it. Confirm final 48 kHz AAC audio and playback compatibility. Read actual final MP4 frame boundaries and replay dialogue, not only contact-sheet captions or render logs. Respect repository independent gates and archive policy.

## Mandatory Google Drive storage SOP v1.0 (2026-10-25)

Before every saving or revised video handoff read and follow [the Videos-shorts storage SOP](videos-shorts-storage-sop-v1.md). Exactly one canonical topic maps to one existing numbered Drive folder; NEVER create a new review/V2/V3 folder for revisions, and keep versions side-by-side. Search direct children of root ID `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D` with complete pagination and stable manifest identity before choosing a folder. Only new topics may create `max(number)+1`. No destructive operations without explicit approval; verify Drive metadata for uploads. New SOP overrides obsolete 3-files-only and new-folder-per-render practices.


## Stick figure Shorts curiosity-intro and follow-CTA pacing default (2026-10-27)

Before writing a stick-figure motivational/emotional storyboard, read and enforce [the 45-second intro–hook–payoff–follow CTA standard](curiosity-intro-follow-cta.md). Target 40–45 s (45 s default), with 0–2/3s genuine curiosity intro, concrete hook by 6s, development/re-hook to 25s, climax 25–39s, emotional payoff 39–42s and 1–4s story-specific subscribe/follow CTA at the end. The intro must not be a generic bumper; test merged intro + hook against standalone intro when real analytics permit. For shorter videos adapt proportionally, preserve strongest action at frame 0 and cap subtitles at two clean mobile-readable lines. Retiming requires real voice duration, not fabricated word-level timestamps. This is an editorial default, not a guarantee of viral performance. Obey current Google Drive single-numbered-folder SOP and QA gates.


## Mandatory full production pipeline + Like and Subscribe CTA (2026-10-27)

Read and enforce [Real Vbee production and end Like + Subscribe CTA](real-vbee-production-and-like-subscribe.md) before script, render, voice update, QA and Drive handoff. Add explicit 1–4s ending with **both narrated and visible** “thả tim” + “đăng ký kênh” calls to action; retime against genuine measured Vbee HN Thanh Long, never fake voice. Use the #24 real MP3 → 10-scene render → H.264/AAC QA → canonical Drive folder delivery workflow. This adds to, not bypasses, [the curiosity intro standard](curiosity-intro-follow-cta.md), current quality gates and one-topic-one-folder SOP. Do not claim all visual quality gates are passed merely because a file exported.
