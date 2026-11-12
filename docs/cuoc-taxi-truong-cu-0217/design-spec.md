# Design Spec — Cuốc Taxi Lúc 02:17

## Design thesis
Luxury Cinematic Horror: “mưa lạnh bên ngoài, ký ức ấm và đau bên trong.” Widescreen supernatural drama. Taxi cabin is the moving frame; wet glass and rear-view mirror are the recurring visual device; amber porch light is the only safe color.

## Canvas
- 1920×1080, 16:9, 30fps; safe margins 5% left/right, 8% top/bottom.
- True widescreen composition; never stretch a vertical crop.
- Quân left-of-frame while driving; Linh rear-right. Preserve mirror and window geography.
- Opening: taxi door foreground, locked school gate in depth, yellow raincoat silhouette. Do not reveal full face too early.
- Payoff: mother in amber doorway, empty rear seat, paper crane, then app timestamp 2014.

## Palette
| Token | Hex | Use |
|---|---|---|
| Asphalt Black | #080C12 | night exterior |
| Rain Teal | #17313A | wet glass and shadows |
| Taxi Amber | #D99A42 | headlights and dashboard |
| Paper Ivory | #F1E8D8 | captions |
| Warning Crimson | #9D3338 | restrained twist accent |

## Typography
- Display: licensed Vietnamese-capable cinematic serif (Cormorant Garamond / Noto Serif Display if installed).
- Captions: Be Vietnam Pro / Noto Sans, 1–2 lines, phrase-synced.
- Ivory narration, amber clues, crimson only for 2014 / 02:17.
- Top headline and bottom spoken subtitle have different roles; never duplicate.
- All Vietnamese text native in Remotion, never AI-baked.

## Motion
- Smooth frame-driven dolly/pan, subpixel parallax, rain on glass, headlight sweep, restrained reflections.
- 0.35–0.55s soft crossfades; no shake, glitch, flash or random zoom.
- Evidence beats: door closed→latch→open; empty mirror→belt clicks→handprint; moving watch→stops at 02:17; blurred badge→LINH legible; dry mat→droplets→puddle; crane transfers; girl disappears→crane remains; app receipt date resolves.
- Describe the result as cinematic 2D/2.5D if still-based; never claim real actor performance.

## frontend-design pass
- Reject generic vertical 9:16 framing because user explicitly requested landscape Full HD.
- Reject blood-red dominant palette; threat is rain, absence and family guilt.
- Reject glitch/shake; luxury cinematic and soft fades are established preferences.
- One memorable device: the rear-view mirror, used for contradiction, recognition and final absence.
- Three required style frames: school pickup; stopped watch in mirror; mother at amber doorway with empty seat and paper crane.

**Asset status:** independent clean landscape frames not yet generated; no storyboard collage may be used as footage.
