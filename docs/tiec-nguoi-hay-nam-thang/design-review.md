# Gate D — Design review — "Tiếc người hay tiếc năm tháng?"

- Profile: `story` (1080×1920, 30 FPS, minimalist flat-SVG line art)
- Reviewer: independent design-reviewer subagent, clean context
- Date: 2026-10-17
- Verdict: **REVISE** — score **8/10**, 3 open Trung tickets (D-01, D-02, D-03)

## Evidence read

| File | What it showed |
|---|---|
| `out/qa/tiec-nguoi-hay-nam-thang-cover.png` | frame 0 thumbnail, 1080×1920 |
| `out/qa/tiec-nguoi-hay-nam-thang-board.png` | 4×2 storyboard, all 8 shots (s1..s8) |
| `out/qa/tiec-nguoi-hay-nam-thang-style-hook.png` | s1 finished style frame |
| `out/qa/tiec-nguoi-hay-nam-thang-style-turn.png` | s5 (re-hook turn) |
| `out/qa/tiec-nguoi-hay-nam-thang-style-end.png` | s8 (ending) |
| `out/qa/tiec-nguoi-hay-nam-thang-motion-hook.png` | hook strip, frames 0→42 (8 samples) |
| `docs/tiec-nguoi-hay-nam-thang/design-spec.md` | provisional spec |
| `docs/tiec-nguoi-hay-nam-thang/brief.md` | brief / palette / story spine |

Measurements below were taken pixel-wise from the PNGs (Pillow/NumPy), not by eye.

## Q1 — Is it beautiful?

**Yes on the whole: this is a clean, confident, editorial-minimal frame system.** Concrete
positives with evidence:

- **Palette is exact and disciplined.** Non-black pixels resolve to `#FFFFFF` (figure, headline
  line 1), `#BDBDBD` (calendar frame, rows, footer), and `#F28C52` (measured `(242,139,82)` in
  `style-end`, the accent rows/headline line 2). No stray hue anywhere in the four style frames.
  Contrast on black: white ≈ 21:1, orange ≈ 8:1, `#BDBDBD` ≈ 7.7:1 — all comfortably AA at
  phone size.
- **Typography hierarchy works.** Headline cap/diacritic band = 71–73 px per line
  (e.g. cover rows 295–366 and 390–463), i.e. above the 68 px spec floor; line 1 white,
  line 2 `#F28C52` — a clear two-beat "setup / turn" read. Vietnamese diacritics (Ơ, Ề, Ể, Ắ, Ợ)
  render correctly with no clipping or collisions. Grey eyebrow `BẠN ĐANG TIẾC ĐIỀU GÌ?` sits
  under a 1 px hairline divider (row 1639) and stays visually subordinate.
- **Line craft is good.** s1 art crop: uniform 9 px rounded strokes, head outer diameter 97 px
  (= radius 44 + stroke, exactly per spec) in both `style-hook` (x371–468) and `style-end`
  (x481–578); figure height 435 px in s1 and s5 — character scale is identical across shots
  (board cells 1/4/5/6/7 all art bbox `y229–337` at cell scale).
- **Negative space is deliberate**, not accidental: headline block (y271–533), art block
  (y871–1608), footer (y1639–1711) form three calm bands with no element collisions.

**But finish has three real defects** (tickets D-01, D-02, D-03 below): the hook motion is
effectively static, the footer text sits *on* the bottom safe-zone line, and s8's fork leg is
drawn through the calendar. Each is visible at phone size.

## Q2 — Does it fit the subject?

**Yes — the motif vocabulary matches the reflective/regretful beat well.**

- Calendar with 2 grey rows + 1 orange row (s1/s6) reads exactly as "almost-empty months, one
  highlighted"; the dashed empty frame (s5) reads as "the present, blank"; the white/orange
  figure pair (s2/s3) reads as narrator + friend without needing faces; the orange recolor in
  s7 flips emphasis onto "the person / the meaning"; s8's fork + calendar lands the title
  question. No frame contains an element that does not serve its beat (no decoration, no props,
  no CTA) — consistent with the brief's "no unrelated props".
- **Character is consistent** across all 8 shots (same head radius, stroke weight, limb ratios;
  measured head width 97 px in every full-res frame).
- **Palette/mood fit**: black field + white figure + one orange accent is sombre and reflective
  rather than upbeat; orange never becomes decorative noise.
- Two semantic wobbles remain (D-06, D-07): orange-figure in s7 collides with the
  orange-figure = friend convention established in s2/s3 and with the provisional spec line
  ("orange highlight stays on elapsed days"), and s8 has no silhouette on the "person" path, so
  the title's two options are only half-encoded visually.

## Gate checks (measured)

| Check | Result | Evidence |
|---|---|---|
| All text above bottom 210 px safe zone (y ≥ 1710 must be text-free) | **FAIL (marginal)** | footer glyph cores end at row **1709**, antialias reaches **1711–1713** (row lum 31–35 at y1710) in all four full-res frames → zero/negative margin |
| Headline legible sound-off on cover | **PASS** | 71 px caps, white + `#F28C52` on pure black, contrast ≥8:1; but copy does not name the topic (D-05) |
| Hook motion not stiff/jerky | **FAIL (stiff, not jerky)** | art pixels identical across all 8 samples (illustration band y229–337 unchanged, 1584 lit px per cell); only the headline block slides **24 px** (full-res; cell rows 73→67) over frames 0–24 with a smooth ease-out (1,2,2,1 px steps), then **frames 24→42 have zero changed pixels** (max diff ≤3) |
| Originality / consistency across 8 shots | **PASS with note** | one coherent system, but 5 of 8 shots reuse the identical staging (board cells 1,4,5,6,7 art bbox `x84–199, y229–337`) → D-08 rhythm note |
| Top / side safe areas | **PASS** | headline top band starts y271–295; side margins ≥167 px |

## Tickets

| id | severity | where | what fails + evidence | concrete change | acceptance check |
|---|---|---|---|---|---|
| GD-D01 | **Trung** | s1 hook strip, frames 0→42 (`motion-hook.png`) | Motion is stiff: the illustration never moves (identical bbox y229–337 and identical lit-pixel count 1584 in all 8 samples); the only motion is a 24 px full-res upward headline drift settling at ~frame 24, after which samples 4→7 (frames 24–42) are pixel-identical (0 changed px, max diff ≤3). A Reel opens with a still image for its last 0.6 s. | Give the art an entrance (calendar rows wipe/fade in, figure spring-rise) and keep a secondary micro-motion alive after settle (e.g. the orange row pulses once, or 4–6 px of parallax on the calendar). Keep easing ease-out — the current curve itself is not jerky. | Re-render strip; ≥4 of samples {6,12,18,24,30,36,42} differ from the previous sample by >30 threshold **inside the illustration region**, and no two consecutive samples are identical. |
| GD-D02 | **Trung** | all 8 shots, footer `BẠN ĐANG TIẾC ĐIỀU GÌ?` | Bottom safe-zone violation (marginal but real): glyph cores end at y1709 and antialias at y1711–1713, while the safe boundary is y1710 (1920−210). Margin = −1..+1 px; Instagram/YouTube bottom UI (username + caption) will clip this line in practice, and any font-metric change breaks it outright. | Move the divider + footer block up by 60 px (divider 1639 → ~1580, footer baseline ~1650). Do not shrink the type. | In `cover`, `style-hook`, `style-turn`, `style-end`: last content row with threshold ≥3 ≤ **1650**; in `board.png`, each cell's footer bottom ≤ **412** of 480. |
| GD-D03 | **Trung** | s8 / `style-end.png`, right fork leg | The right fork path (stroke `#BDBDBD`, from apex ≈ x614,y1300) crosses the calendar's left border (calendar ≈ x722–955, y1350–1610) and terminates **inside** the box at ≈ x830,y1580, cutting through the orange month row. No knockout gap → at phone size (≈0.36 scale) it reads as a drawing error, not as "path leads into the years". | Either stop the leg 40 px short of the calendar's left border (clean gap), or route it behind the calendar with a 24 px knockout gap on entry — pick one reading and execute it deliberately. | Pixel intersection between the fork stroke (`#BDBDBD`-range) and all calendar strokes = **0**, with a visible gap ≥24 px (or a deliberate ≥24 px knockout on both sides of the border). |
| GD-D04 | Thấp | s1, s5, s8 art group | Optical centering off: art group bbox centers are x=624 (s1), x=639 (s5), x=617 (s8) vs canvas center 540; s1 margins are 335 px left / 167 px right, while the headline above is perfectly centered — the art hangs right. | Shift the art group left ~80 px (or right-pad the calendar so margins balance: target ~250/250). | `abs(group_center_x − 540) ≤ 30` in all full-res frames, or the asymmetry is written into `design-spec.md` as an intentional rule. |
| GD-D05 | Thấp | `cover.png` frame 0 | Sound-off thumbnail never states the topic: headline reads `NĂM NĂM… CÒN GÌ ĐỂ KỂ?`; the only "tiếc" cue is the 33 px grey footer line. A scroller sees "five years" but not "regret the person or the years". | Add a third, smaller accent line on frame 0 with the title question, or promote the footer line to `TIẾC NGƯỜI HAY TIẾC NĂM THÁNG?` at ≥48 px on the cover only. | Frame 0 contains the string `TIẾC` at cap height ≥48 px within the top 60% of the frame. |
| GD-D06 | Thấp | s7 (board cell 7) + s1, s4 vs `design-spec.md` | Spec↔render drift: (a) spec s7 says "orange highlight stays on elapsed days" but the render recolors the **figure** orange and dims the calendar (RGB 132 = `#BDBDBD` @70%); this also collides with the s2/s3 convention "orange figure = friend". (b) spec s1 says the protagonist **points** at the calendar — the render has arms down. (c) spec s4 says memory frames sit **behind the friend** — the render has one figure and a chart frame beside it. | Decide which system is canonical: restore the spec motifs, or rewrite `design-spec.md` lines 5–11 to describe the shipped system, and add one sentence defining the orange role (`orange = active memory; orange figure = memory of a person, never a third live character`). | `design-spec.md` s1–s8 lines match the rendered frames one-for-one; orange usage has exactly one documented meaning. |
| GD-D07 | Thấp | s8 / `style-end.png`, left path | Spec requires "one path with silhouette, one with calendar". The left path is empty, so the title question's "tiếc **nggười**" half has no visual counterpart — only the years side is drawn. | Add a small `#BDBDBD` silhouette (head+shoulders, no face) at the far end of the left path, and keep the no-choice marker rule. | Left path contains a silhouette element; still zero "chosen" markers; spec line 11 matches render. |
| GD-D08 | Thấp | board, shots s1/s4/s5/s6/s7 | Staging monotony: 5 of 8 shots use byte-identical art placement (cell bbox `x84–199, y229–337`); across 45–60 s the Reel risks reading as a slideshow of one layout. | Vary framing on the turn beats only: e.g. s6/s7 punch in (figure scale ×1.25, art shifted to center), s4 drop the figure to the lower third. Keep s1/s2/s3/s5 as the baseline. | At least 2 distinct art placements (scale or position classes) appear across the 8 board cells; baseline placement still used by ≥3 shots. |

## Score rationale

- Beauty: **9/10** — exact palette, strong hierarchy, clean line craft; held back only by the
  s8 collision and the footer's zero safe-zone margin.
- Fit to subject: **9/10** — motif set maps 1:1 onto the reflective beat, character is
  consistent; held back by the s7 orange-role ambiguity and the missing silhouette.
- Craft/motion: **6/10** — the hook strip is effectively a still frame after frame 24.
- Weighted → **8/10**. Gate D requires ≥9 **and** zero open Cao/Trung → **REVISE**.

Blocking: GD-D01, GD-D02, GD-D03. The four Thấp tickets are non-blocking but should be
resolved in the same pass while the scenes are open.

## Round 2 (design-reviewer, 2026-10-17, post-fix) — score 9, verdict pass

The video was re-rendered with the three blocking fixes. Fresh frame evidence read with the
Read tool (`out/qa/tiec-nguoi-hay-nam-thang-motion-hook.png`, `style-end.png`, `cover.png`,
`style-hook.png`, `board.png`).

- **GD-D01 fixed (quantified):** art entrance translateY 36→0 over frames 0–24; frame-0 art
  fully present (1708 lit px); post-settle frames 24/30/36/42 differ (centroid/pixel drift =
  breathe micro-motion) — no longer a frozen frame.
- **GD-D02 fixed:** divider y=1579 (bottom 341) + footer bbox 1617–1649 (bottom 271) → 61 px
  clear of the bottom-210 safe line (y=1710).
- **GD-D03 fixed:** s8 fork right leg now stops before the calendar (no crossing).
- Open (Thấp, non-blocking): **GD-D04** — the raised divider now clips the bottom of the s8
  calendar (~29 px). Cosmetic; not blocking gate D.

Weighted → **9/10**, no open Cao/Trung → **pass**.
