# Design spec — dung-bien-tuoi-30-thanh-ban-an (Phase 3c, design-agent)

Profile `story` · 9:16 1080×1920 · 30fps · 10 shot / 16 key · ~51.6s @4.1 · light mode.

## 0. Library validation (Round 3)

The vendored Shotcraft library is present at `skills/video-shotcraft/`. Every row below was checked directly against `gallery/api/library.json`, `gallery/media/<style-key>.mp4`, `gallery/media/poster/<style-key>.jpg`, and the exact demo TSX path. The cards are motion-grammar equivalents for a story film: product/UI surfaces are re-laid out as pencil, paper, feast, phone, and hand-drawn props. Reuse is intentional where the gallery has no closer poster-backed card; no fabricated card, style-key, poster, or demo path remains.

## 1. Palette and materials

| Token | Hex | Role |
|---|---|---|
| `PAPER` | `#F0F3F0` | cold graph paper |
| `GRID` | `#AFD6D3` | 2px graph grid |
| `INK` | `#3E454B` | graphite character, type, captions |
| `PAPER_TEXT` | `#F3F5F2` | inverse text only |
| `RED` | `#D23B2E` | imposed measurement / questions |
| `HILITE` | `#FFE24D` | self-claimed agency |
| `LAMP` | `#F6E7C4` | warm ending light |
| `SCREEN` | `#DCEAF2` | illustrative phone light |
| `LABEL` | `#7C858C` | minh hoạ / source labels |

Headline uses Literata Bold (VN subset), captions use Be Vietnam Pro SemiBold, hand-written marks use Lora Italic. Bitter/Caveat/Nunito Sans lack the required Vietnamese subset in this checkout, so the fallback is intentional and documented. Headline is dark ink with a paper keyline; no fuzzy shadow is needed for phone contrast. Captions remain ≥54px glyph height, auxiliary labels ≥32px, and all text stays above y=1710.

## 2. Motion recipe

Frame-driven only: `useCurrentFrame`, seeded grain, and `ramp`. First half uses `EASE.snappy`; turn/macro/end use `E_SINE`/`EASE.smooth`. The only whole-frame hero technique is s5a freeze; s5b is a short impact accent. Hook: ruler settle → circle reveal → character already present at frame 0. Turn: feast/steam → question burst → freeze → pen drop. End: warm sweep → hand-written question/title → 1.03 push-in → 2.4s hold. Voice timing remains join-owned.

## 3. Safe-zone / staging locks

- Cover frame 0: headline top, ruler/circled 30 mid-frame, graphite character at x≈130 and y≈1260–1540, looking toward 30 with pencil visible.
- Turn: visible mâm cỗ, three steam contours, chopsticks, temple reaction, and three question bursts; no oval-only placeholder.
- End: same character proportions and graphite construction marks; Literata closing type relates to hook/turn; ruler is unattended.
- Board: every tile includes a character action/pose and a key prop/location/device, not only a label.
- No numbers in s8; only a salary bar and four departing arrows.

## 4. Energy curve

`hook → rising pressure → freeze/re-hook → macro turn → feed/money drain → empty silence → warm self-question → close/hold` across `s1, s2, s3a, s3b, s4a, s4b, s5a, s5b, s6a, s6b, s7a, s7b, s8, s9a, s9b, s10`.

## 5. Shot → validated card table

`poster/sample` is the validation artifact for the selected style-key. Each demo's timing/easing grammar is retained, while the visual surface is adapted to 9:16. The freeze hero appears once, at s5a.

| shot | beat | card | style-key | demo TSX path | assets/lib components | 9:16 adaptation | locked params | SFX idea |
|---|---|---|---|---|---|---|---|---|
| s1 | hook/COVER | `paper-title-card` | `paper-title-card` | `skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx` | Ruler, Headline, GridPaper | headline / ruler / character lower-left | dark ink keyline; circle reveal 30–66f | pencil cạ |
| s2 | tội danh | `word-relay-filmstrip` | `word-relay-filmstrip` | `skills/video-shotcraft/demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx` | RedPenLines, Headline | filmstrip becomes three red verdict lines behind actor | 3-line relay; 15f rest | pencil cọt kẹt |
| s3a | thước vạch | `outline-word-fill` | `outline-word-fill` | `skills/video-shotcraft/demos/typography/outline-word-fill/OutlineWordFill.tsx` | Ruler, Handwrite | outline-to-fill grammar becomes ruler ticks | four ticks; only 30 circled | cộp cộp |
| s3b | dài thêm | `list-reveal` | `list-reveal` | `skills/video-shotcraft/demos/ui-entrance/list-reveal/ListReveal.tsx` | PaperStack, PencilChar | six-list rhythm becomes stacked sheets overflowing portrait crop | 3 sheets; 10f stagger; 18f hold | giấy trượt |
| s4a | Tết cỗ | `card-stack` | `card-stack` | `skills/video-shotcraft/demos/ui-entrance/card-stack/CardStack.tsx` | Feast, Steam, PencilChar | card stack becomes an overhead mâm cỗ entering from below | 3 dishes; spring settle; steam ±5px | bát đũa cạch |
| s4b | hỏi dồn | `circle-match-iris` | `circle-match-iris` | `skills/video-shotcraft/demos/transition/circle-match-iris/CircleMatchIris.tsx` | Feast, QuestionBurst, PencilChar | circle match anchors three question bursts to the frozen plate | 12f freeze; 3 question arrivals | hỏi dồn |
| s5a | re-hook freeze | `fracture` | `fracture` | `skills/video-shotcraft/demos/opening/fracture/Fracture.tsx` | PencilChar, RedPenLines | tile convergence hard-stops into one suspended actor/pen frame | one freeze hero; 12f hold | room cuts silent |
| s5b | pen drop | `glitch-cycle` | `glitch-cycle` | `skills/video-shotcraft/demos/typography/glitch-cycle/GlitchCycle.tsx` | PenDrop, QuestionMark, LampGlow | state-cycle grammar becomes pen fall → red question impact | 16f fall + 6f impact | cộp + reverb |
| s6a | red unfinished | `paper-title-card` | `paper-title-card` | `skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx` | RedScribble, PencilChar | paper imprint stops before the final “bại” stroke | type → hesitate → stop | red pencil stop |
| s6b | macro turn | `blur-slide` | `blur-slide` | `skills/video-shotcraft/demos/typography/blur-slide/BlurSlide.tsx` | MacroZoom, GraphiteLine | blur-to-sharp title grammar becomes a portrait macro push | 1.1s smooth zoom; 18f hold | graphite stops |
| s7a | feed | `radial-ripple-phone-chips` | `radial-ripple-phone-chips` | `skills/video-shotcraft/demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx` | PhoneMock, PencilChar, MinhHoa | phone portrait x=390, light on face | 3 abstract cards, 18f cadence | paper scroll |
| s7b | screen off | `chip-grid-single-select-blackout` | `chip-grid-single-select-blackout` | `skills/video-shotcraft/demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx` | PhoneMock, PencilChar, Handwrite | selected chip blackout becomes the phone screen turning off | one 15° dark sweep; position locked | swallow |
| s8 | money drain | `bezier-source-converge-merge` | `bezier-source-converge-merge` | `skills/video-shotcraft/demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx` | MoneyArrows, Highlighter, PencilChar | four routes depart one salary bar | 22f stagger; no numeric claim | two ting then stop |
| s9a | empty | `ui-strip-away-outro` | `ui-strip-away-outro` | `skills/video-shotcraft/demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx` | Feast, PencilChar, GridPaper | props leave outward; actor stays on blank paper | outer→inner vanish every 4f | room fades to silence |
| s9b | climax question | `outline-word-fill` | `outline-word-fill` | `skills/video-shotcraft/demos/typography/outline-word-fill/OutlineWordFill.tsx` | Handwrite, PencilChar, LampGlow, HILITE | outline-to-fill becomes a warm self-written question | 18f sweep; 12f silence | silent 0.4s |
| s10 | close/hold | `spotlight-hero-card` | `spotlight-hero-card` | `skills/video-shotcraft/demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx` | Highlighter, Ruler, PencilChar | tungsten spotlight becomes the quiet yellow closing hold | 18f sweep; push 1.00→1.03; 72f hold | pencil placed |

All selected card/style pairs, poster files, MP4 samples, and exact demo files resolve. The table is an equivalent story adaptation, not a claim that a product demo literally depicts a Tết table. `paper-title-card` and `outline-word-fill` are reused deliberately; the freeze hero remains unique to s5a.

## 6. Must NOT resemble

This stays distinct from `xay-doi` (paper diorama/cobalt-pink), `truongthanh` (black/white/orange stick figures), `thuong-hay` (purple kitchen/LED red), `camon` (polaroid/green night), `gaplai` (two chairs/brown night), `metkhong` (gray room), and `cuoc-goi` (two-room phone call). This film is flat graph paper, graphite, red measurement, and yellow agency.

## 7. Proto deliverables

- `src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/index.tsx` — separate entry; Root untouched.
- `proto/kit.tsx` — palette, fonts, dark-keyline headline, finished graphite silhouette, feast/steam/question/phone helpers.
- `proto/motion.tsx` — deterministic easing and grain.
- `proto/scenes.tsx` — ProtoHook, ProtoTurn, ProtoEnd, beat-specific BoardTile.

## 8. Known limits

1. Gallery timing is validated as motion grammar, not literal content fidelity.
2. The prototype is visual-only; measured voice join and final captions remain producer-owned.
3. Full scene owners must preserve the frame-0 staging, character silhouette, feast/steam/question grammar, and board action map.

## 9. Evidence pass (Round 3, 2026-10-18)

| Evidence | Inspection result |
|---|---|
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-cover.png` | frame 0 includes headline, circled 30, ruler, pencil character at lower-left; readable at thumbnail |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-style-hook.png` | dark headline/keyline, finished graphite silhouette, ruler and circle read without fuzzy-shadow dependence |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-style-turn.png` | visible feast, three steam contours, chopsticks, reaction character, and three question bursts |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-style-end.png` | same silhouette family, Literata closing card, yellow sweep, unattended ruler |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-board.png` | rebuilt 4×4 board: every tile has an acting figure, beat prop, and location/device cue; s4 feast/questions, s8 salary bar/arrows, s9 empty table/self-question are visible at thumbnail |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-motion-hook.png` | 4×3 strip has readable ruler settle, circle reveal, and character hold landmarks |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-motion-turn.png` | 4×3 strip proves feast/steam → question burst → red freeze wash → pen drop/re-hook text |
| `out/qa/dung-bien-tuoi-30-thanh-ban-an-motion-end.png` | 4×3 strip proves warm sweep → character/ruler hold → title settle/push-in |

### Round 3 gallery lookup

Direct filesystem lookup returned `16/16`: every selected card is in `gallery/api/library.json`, every style-key has an MP4 and exact poster under `gallery/media/`, and every demo path in §5 exists under `skills/video-shotcraft/demos/`. Reused poster-backed cards are `paper-title-card` (s1/s6a) and `outline-word-fill` (s3a/s9b); no selected row points to a missing poster.

Reproduction commands are recorded in `design-review.md` Round 2. `npx tsc --noEmit` and gallery lookup are required before handoff.
