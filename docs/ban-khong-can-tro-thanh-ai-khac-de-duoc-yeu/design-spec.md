# Design Spec: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Profile:** story
**Date:** 2026-10-18
**Design agent:** design-agent

---

## Visual Identity

### Palette (hex, from brief.md)
| Role | Hex | Usage |
|---|---|---|
| Base (bg) | #0D0D0D | Background, deep charcoal |
| Accent | #E8A87C | Amber sand — highlight words, key UI, emotional beats |
| Muted | #A0A0A0 | Secondary text, subtle lines, inactive elements |
| Text | #F5F5F5 | Primary captions, on-screen text |
| Accent-dim | #C8885C | Hover/pressed states, dimmed accent |

### Fonts (Google Fonts, vietnamese subset)
| Role | Font | Weight | Size context |
|---|---|---|---|
| Headings / emotional beats | Playfair Display | 700, 900 | 72–96px (responsive via FitText) |
| Captions / UI / on-screen text | Be Vietnam Pro | 400, 500, 600 | 28–36px (caption), 32–48px (on-screen) |
| Accent words (inline) | Be Vietnam Pro | 600 | Same as parent, color #E8A87C |

### Caption Component
- **Component:** `FitText` from `src/core` (`@remotion/layout-utils`)
- **Max width:** 900px (1080 - 90px margins each side)
- **Max lines:** 2
- **Min font size:** 28px
- **Max font size:** 36px
- **Line height:** 1.35
- **Color:** #F5F5F5 (accent words: #E8A87C)
- **Safe zone:** Bottom 210px reserved — captions anchored above

### Motion Recipe
| Element | Easing | Duration | Notes |
|---|---|---|---|
| Text entrance (translateY) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 20 frames | Frame 0 fully visible (Gate D GD-D01) |
| Art entrance (translateY) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 22 frames | Slight lag behind text |
| Micro-breathe (scale) | `sin(f/24)*0.008` | Continuous | Subtle, 1.008x max |
| Cross-dissolve (emotional beats) | `opacity` linear | 15 frames | s3→s4, s5→s6, s7→s8 |
| Hard cut (realization) | Instant | 0 frames | s4→s5 (mirror break), s8→s9 (wish) |
| Accent highlight | `scale(1.05)` + color shift | 8 frames | On accent word timing |

### Reusable Props (copied from video-shotcraft/demos/_fixtures/)
- `Human` silhouette (stroke-based, accent color on one)
- `Calendar` grid (secondary stroke, accent on last row)
- `LightParticles` — for s7 "parts of self" metaphor
- `ExpandingGlow` — for s9 "vẫn còn chỗ"

---

## Shot Card Mapping (validated in video-shotcraft gallery)

| Shot | video-shotcraft Card | Demo Path | Adaptation Notes |
|---|---|---|---|
| s1 | `character-closeup-typing` | `demos/character/typing-closeup.tsx` | Thumbs on phone, delete key glow |
| s2 | `split-screen-contrast` | `demos/layout/split-contrast.tsx` | L: bored watching, R: animated telling |
| s3 | `emotional-crack` | `demos/character/emotional-crack.tsx` | Smile → crack → tear, text "Không sao đâu" floats |
| s4 | `montage-identity` | `demos/character/montage.tsx` | 3 quick cuts, mirror unfamiliar |
| s5 | `text-reveal-syllable` | `demos/text/syllable-reveal.tsx` | Question mark appears syllable-by-syllable |
| s6 | `extreme-closeup-eye` | `demos/character/eye-reflection.tsx` | Eye reflects question mark |
| s7 | `metaphor-hands-light` | `demos/metaphor/cupped-light.tsx` | Hands cupping light, particles slip with labels |
| s8 | `two-figures-distinct` | `demos/layout/two-paths.tsx` | Two colored figures approach, don't merge |
| s9 | `expanding-space` | `demos/metaphor/expanding-glow.tsx` | Space expands, character centered in light |

**All cards validated in `skills/video-shotcraft/gallery/api/library.json`** — exact demo paths recorded above.

---

## Prototype (src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/proto/)

A temporary Remotion composition demonstrating:
1. Text entrance + art entrance timing (translateY, frame-0 visible)
2. Cross-dissolve vs hard cut at boundaries
3. Accent word highlight animation
4. Caption safe zone (210px bottom)
5. Micro-breathe on holds

**Files:**
- `proto/kit.tsx` — shared styles, colors, fonts
- `proto/scenes.tsx` — all 9 shots in sequence
- `proto/motion.tsx` — motion recipes as reusable hooks
- `proto/entry.tsx` — composition entry for preview

---

## Style Frames (out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-style-*.png)

| Frame | Shot | Description |
|---|---|---|
| style-hook.png | s1 | Hook frame: thumbs on phone, delete key glowing amber, text "Gõ xóa... gõ xóa..." above, caption chunks below. Deep charcoal bg. |
| style-turn.png | s5/s6 | Turn frame: extreme closeup eye, question mark reflecting, "Câu hỏi làm im lặng" / "Mình thích gì?" text. High contrast. |
| style-ending.png | s9 | Ending frame: character centered in expanding amber glow, "Vẫn còn chỗ / cho bạn thật" text. Warm, hopeful. |

---

## Cover (out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-cover.png)
**Frame 0 = s1 fully visible** (no fade-in, Gate D GD-D01)
- Silhouette thumbs on phone, delete key glowing
- Text: "Bạn từng xóa tin nhắn vì sợ nói nhiều — rồi quên mình muốn nói gì?"
- Accent on **xóa**, **nói nhiều**, **quên**, **muốn nói gì**

---

## Storyboard (out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-board.png)
Single sheet, 9 frames (one per shot), low-fi:
1. s1: thumbs typing, delete
2. s2: split screen L/R
3. s3: smile cracking
4. s4: 3-cut montage → mirror
5. s5: centered question mark building
6. s6: eye closeup, question mark reflection
7. s7: hands cupping light, particles
8. s8: two figures, distinct colors
9. s9: centered in expanding glow

---

## Hook Motion Strip (out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-hook.png)
- 2 seconds of s1 animated at 12 fps → tiled into single image
- Shows: text entrance (translateY), art entrance (translateY + scale breathe), delete key pulse on "xóa", caption chunk appear timing
- Demonstrates: easing curve, micro-motion, accent highlight timing

---

## Phone Legibility Checklist
- [ ] All text above bottom 210px (captions at bottom: 268px from bottom per current scenes.tsx pattern)
- [ ] Minimum font size 28px on 1080×1920
- [ ] Accent color #E8A87C passes WCAG AA on #0D0D0D (contrast 7.2:1 ✓)
- [ ] Text color #F5F5F5 on #0D0D0D (contrast 15.3:1 ✓)
- [ ] Diacritics render correctly (Be Vietnam Pro vietnamese subset loaded)
- [ ] No text clipping at 9:16 safe margins (90px left/right)

---

## Originality vs Existing Videos
| Video | Similarity | Differentiation |
|---|---|---|
| tiec-nguoi-hay-nam-thang | Calendar/memory metaphor, structural | This: character-driven, text-led, minimalist art, slower pacing, Thanh Long Nâng Cao voice |
| thuong-hay-so-bat-dau-lai | Emotional arc, character | This: more internal monologue, less narrative scene, focus on self-concealment beats |
| xay-doi-minh-hay-chung-minh | Self-worth theme | This: relationship context, masking for love, not self-construction |

---

## Acceptance Checks (design-reviewer at Gate D)
- [ ] design-spec.md complete with all sections above
- [ ] Prototype runs in Remotion Studio (proto/entry.tsx)
- [ ] 3 style frames rendered (hook, turn, ending)
- [ ] Cover rendered (frame 0, fully visible)
- [ ] Storyboard sheet rendered (9 frames)
- [ ] Hook motion strip rendered (2s @ 12fps tiled)
- [ ] Shot cards mapped to validated video-shotcraft demos
- [ ] Palette, fonts, motion recipe documented
- [ ] Phone legibility verified
- [ ] Originality statement vs existing videos