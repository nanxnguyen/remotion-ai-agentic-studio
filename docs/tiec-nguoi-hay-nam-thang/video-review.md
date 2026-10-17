# Video Review — tiec-nguoi-hay-nam-thang (Gate C, round 2)

Render reviewed: `out/tiec-nguoi-hay-nam-thang-reel.mp4` (current verified render, includes the s8 fix).
Evidence: `out/qa/tiec-nguoi-hay-nam-thang-c-frame-{0,65,129,300,447,639,790,988,1171,1400}.png`, `-board`, `-cover`, `-footer-zoom`, `-motion-hook`, `-style-{hook,turn,end}`.

## Verdict

**Gate C round 2: PASS — score 9/10.** C-1 is closed. No open Cao/Trung tickets; two carried-over Thap notes remain (C-2, C-3) plus one new Thap observation.

## 1. Composition

- **Safe zones:** clean on every shot. Headline tops sit at ~y280 (top 240px empty); footer divider at ~y1578, CTA baseline ~y1635, and everything below y1710 is empty — bottom 210px clear of content that platform UI would clip. Confirmed on frames 0/65/129/300/447/639/790/988/1171/1400 and the board.
- **C-1 verification (s8, frames 1171 & 1400 + footer zoom):** the raised grey fork motif (`M540 1230L280 1490` path) and the calendar (`y=1265`) now sit entirely ABOVE the footer divider. In frame 1171 the fork left-leg tip ends ~y1530 and the calendar bottom ~y1545, both above the y1578 rule; in frame 1400 they are higher still (~y1495/~y1515). The footer zoom shows a clear black gap between the calendar bottom edge and the divider, and the CTA "BẠN ĐANG TIẾC ĐIỀU GÌ?" sits well below the rule with no overlap. **C-1 closed.**
- Hierarchy and negative space remain balanced across the 8-shot board; no element collisions anywhere else (figure/calendar, figure/chart frame, dashed box, two-figure shots all have generous clearance).

## 2. Typography

- All headlines legible at phone scale with correct Vietnamese diacritics: NĂM NĂM… CÒN GÌ ĐỂ KỂ?, NĂM NĂM RỒI…, CÒN BÂY GIỜ?, CHUYỆN CỦA NGÀY XƯA, NHỮNG NGÀY GẦN ĐÂY?, SỢ MỌI THỨ VÔ NGHĨA, ĐÃ TỪNG CÓ Ý NGHĨA, TIẾC NGƯỜI HAY TIẾC NĂM THÁNG?.
- Footer CTA renders Ạ / TIẾC / Ề / Ì correctly, grey-on-black with adequate contrast; no clipping or diacritic collisions with the line above.
- White lead line + orange accent line reads clearly on black; cover frame is clean.

## 3. Design

- Line art consistent: constant head-circle radius and stroke weight on the white, orange, and s8 white figures across all shots; calendar/chart/dashed-box props share the same stroke system.
- Palette strict: #000 / #FFF / #F28C52 / #BDBDBD only (frame 988 shows opacity-dimmed grey calendar + orange figure, which are tints of the same palette, acceptable).
- Motion is not stiff: the hook strip (8 frames) shows art entrance progression with micro-motion in figure/calendar placement and scale; board confirms pose variety and the s8 motif is static-free with breathing room.

## Open tickets (all Thap / non-blocking)

| id | sev | where | change |
|----|-----|-------|--------|
| C-2 | Thap | s8 (frames 1171/1400) | Carried from round 1: the giant fork motif's two grey legs plus the figure's own legs can still be read as "four legs" at a glance. Optional: widen the fork apex or add a small gap where the motif meets the figure's leg junction. |
| C-3 | Thap | s2 "NĂM NĂM RỒI…" / s3 "CÒN BÂY GIỜ?" (frames 300/447, board row 1) | Carried from round 1: white+orange figure poses are near-identical, only the headline changes. Optional: shift the orange figure's arm angle or stance slightly on s3. |
| C-4 | Thap | s8 frame 1171 | New observation: calendar bottom edge clears the divider by ~30px at its closest in-frame point. Non-blocking, but a few more px of margin would future-proof the composition against any later footer drift. |

## Gate decision

Score 9/10, no open Cao or Trung → **PASS**.
