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
