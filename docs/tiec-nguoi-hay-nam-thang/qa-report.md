# QA report — tiec-nguoi-hay-nam-thang

Stage evidence: `qa` done. Frame extracts read visually with an image reader; all extracted from the
current verified render (fingerprint `3485059:1792232389887885600`).

## Evidence set

| artifact | frames | purpose |
|---|---|---|
| `out/qa/tiec-nguoi-hay-nam-thang-c-frame-*.png` | 0, 65, 129, 300, 447, 639, 790, 988, 1171, 1400 | shot boundaries + final hold |
| `…-board.png` | 8 shots tiled | cross-shot consistency |
| `…-cover.png` | 0 | sound-off thumbnail |
| `…-footer-zoom.png` | crop @1400 | footer diacritics |
| `…-motion-hook.png` | 0–42 | hook entrance + micro-motion |
| `…-style-hook/turn/end.png` | hook, s7 turn, s8 end | style checks |

## Checks performed

- **Scene boundaries:** each shot-start frame opens the correct headline + motif, no bleed into the
  next shot (frames 0/129/300/447/639/790/988/1171).
- **Safe zones:** top 240 px and bottom 210 px clear on all frames; footer sits ~60 px above the
  bottom-210 line (Gate D GD-D02 fix).
- **Typography / diacritics:** footer "BẠN ĐANG TIẾC ĐIỀU GÌ?" renders Ạ/Ế/Ề/Ì correctly (zoom);
  headlines legible at phone scale.
- **Palette:** strict `#000000` / `#FFFFFF` / `#F28C52` / `#BDBDBD` only, no stray colours.
- **Motion:** hook strip shows deterministic art entrance (translateY) + breathe micro-motion — not a
  frozen frame (Gate D GD-D01 fix).
- **s8 composition:** fork legs + calendar sit above the footer divider with clear separation from the
  CTA text (Gate C C-1 fix; measured fork bottom y≈1489, calendar y≈1517, divider y≈1578).

Detailed scoring: `design-review.md` (Gate D) and `video-review.md` (Gate C).