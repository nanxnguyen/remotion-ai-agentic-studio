# QA report B — xay-doi-minh-hay-chung-minh (frames cluster s5a1–s8)

Reviewer: qa-agent (frames cluster s5a1/s5a2/s5b/s6/s7a/s7b/s8). Independent, not a scene author. No source edits.
Scope: `src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesC.tsx` (s5a1/s5a2/s5b/s6),
`scenes/ScenesD.tsx` (s7a/s7b/s8) vs `script.md`, `content-pack.md`, `voice.json`,
`design-spec.md`, `join-notes.md`, `timeline.ts`.
Stills: `out/qa/xay-doi-minh-hay-chung-minh-build-s5a1/s5a2/s5b/s6/s7a/s7b/s8.png` (scene-agent)
+ 40 `out/qa/xay-doi-minh-hay-chung-minh-qa-b-<absframe>.png` (this round:
boundaries, s6 cuts ±2f, chip window in/out, chalk blink/tail, s8 rub/pick/carry/stand).

## Verdict: FAIL (1 Cao + 5 Trung open)

| owner file | Cao | Trung | Thấp |
|---|---|---|---|
| `scenes/ScenesC.tsx` | 1 (B-C1) | 3 (B-C2/B-C3/B-C4) | 0 |
| `scenes/ScenesD.tsx` | 0 | 2 (B-D1/B-D2) | 1 obs (B-D3 note, no fix demanded) |

## Fidelity table (shot | score /10 | gap)

| shot | score | gap |
|---|---|---|
| s5a1 re-hook | 9 | press-in headline + figure at ladder foot looking up; matches board/spec. |
| s5a2 climb | **3** | **Set renders EMPTY whole shot (no figure/ladder/spotlight/top brick) — B-C1.** Caption only. |
| s5b answer | 8 | E03 met: standing back-figure, faucet LEFT + stream, basin, TV flicker upper-left, steam, mullions off head, chip 32px in window, helmet-ON return. TV block crude but in-style. |
| s6 turn | **7** | k1 strong; orbit face is flat untextured slab (B-C2); k2 gaze/beams unreadable (B-C3); k3 empty-spot ellipse hidden by caption (B-C4). |
| s7a H1 | 9 | Center-locked split, blazing sen left / ~10% right, sign, straddling figure, sen accent, zero jade. |
| s7b H1 | 9 | Chalk room FULL 17f + jade tail 14f uncut to end (pixels verified), chalk SFX inside tail, jade accent. |
| s8 recognition | **7** | E01 windows met (2 inserts, loose brick f0, rub/pick/stand frames); but reach arm = full-width bar (B-D1) and carried brick unreadable at shot end (B-D2, breaks A15 handoff). |

Scores < 8 = owner fix (per bar). s5a2/s6/s8 below bar.

## Tickets (Round 1 — exhaustive)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| B-C1 | Cao | s5a2 whole shot (abs 660–747); `ScenesC.tsx` `S5a2Scene` camera div `inset: -700` | qa-b-660/700/747: only wall edge + caption; no figure, ladder, spotlight, top brick at any of 3 sampled frames. Root cause: `inset:-700` shifts all viewport-authored children 700px left/up (ladder x410–540 → abs −290..−160, off-screen). Board tile shows figure mid-ladder. | Set camera container to `left:0; right:0` (keep width 1080; vertical headroom only, e.g. `top:-700` + re-tuned `camY`, or plain `inset:0` + extended wall rows so tilt-up never exposes void). Keep children coords, easings, chunk flip. | `scenes/ScenesC.tsx` | Re-render abs 660/700/747: figure + ladder + cold spotlight wash + top brick inside 1080×1920 viewport at all three; no element left of x=0. |
| B-C2 | Trung | s6 rel 0–44 (abs 932–976); `ScenesC.tsx` orbit branch front face | qa-b-932: collapsing front face is a FLAT textureless pink slab (plain SEN div), vs brick-course wall in s1/s3/s5a1/s8. 1.5s of TURN beat looks unfinished. | Draw brick courses on the collapsing front face (same grammar as `BrickWall`, clipped to the collapsing width), or freeze-frame the brick texture for rel 0–36. | `scenes/ScenesC.tsx` | qa-b-932 shows brick courses on the full-width face; texture persists (narrowing) to rel 36. |
| B-C3 | Trung | s6 k2 beat (abs 1000, rel 68); script "nhân vật ngẩng lên khoảng trời không mái" | qa-b-1000: two beams float disconnected (read as debris, not missing roof); figure silhouette identical to back view (10px chin dot unreadable as up-gaze); 75% empty gradient. | Tilt head visibly up (chin/face readable at 480px width) and anchor each beam to a wall stub/post so "snapped roof" reads; or add broken roofline context. | `scenes/ScenesC.tsx` | Still at abs 1000 reads "looking up at roofless sky" to a fresh viewer (up-gaze + roof-absence both gettable). |
| B-C4 | Trung | s6 k3 beat (abs 1021, rel 89); dashed "empty spot" ellipse `cy=1560 rx=330` | qa-b-1021: the dashed ellipse (the "nowhere to sit" signifier) sits fully behind the caption pill — invisible. Caption covers figure legs as designed, but the beat's key marker is lost. | Move ellipse up (e.g. cy≈1400, ry≈50) so it reads whole above the pill, or shrink rx to 240 and lift; keep ground-band/horizon. | `scenes/ScenesC.tsx` | Still at abs 1021: full dashed ellipse visible above caption pill. |
| B-D1 | Trung | s8 rel 111–126 (abs 1327–1342); acting-arm div | qa-b-1333/1340/1342: single 30px white bar up to ~535px long stretches face→ladder-foot across the foundation brick — reads as glitch/telescope, not an arm. Visible across ~15 frames (0.5s). | Two-segment/jointed arm (elbow), or shorten transit (start reach nearer foot), or fade bar mid-transit; keep grab read at 111–123. | `scenes/ScenesD.tsx` | No frame abs 1327–1342 shows a straight bar longer than ~250px crossing the foundation brick; reach still reads. |
| B-D2 | Trung | s8 carry/stand rel 126–138 (abs 1342→1353); A15 handoff to s9a | qa-b-1342: brick readable at (420,1330) on ground. qa-b-1346/1350/1353: brick gone — carried up 90px with stand into the foundation-brick rect and merges (pink-on-pink); figure ends with EMPTY hands. s9a needs "brick clearly in hand". | End carry with brick held clear of the foundation face (in front of body or below foundation bottom edge y>1300) with ink outline distinct from bg; keep pick/stand windows. | `scenes/ScenesD.tsx` | Still at abs 1353: picked brick (≥100px wide, ink outline) readable in hand/on body, distinct from foundation brick. |

## Thấp / observations (no fix demanded)

- OBS-1 (Thấp, `ScenesD.tsx`): s8 chunk 2 flips at rel 75 (insert boundary, J4-directed) while voice c2 starts ≈rel 37 — caption lags voice ~1.2s through the insert hold. Disclosed tradeoff (design-spec §5/J4); keeping as directed. No ticket.
- OBS-2 (Thấp, `ScenesD.tsx`): s8 squat reads as standing (scaleY 0.8 subtle at rel 0–126). Stand contrast in last 12f carries the beat; optional deepen only.
- NOTE (clean): chip overlaps return cut rel 140–144 (4f, opacity ≤0.33, top corner vs center face) — no visual clash; window 18–144 + fade meets "0.6–4.8s, mờ trước cú cắt, không xuất hiện trong s6".
- NOTE (clean): s6 has 3 "không" accent spans but only ≤2 lit at once until k3; pack explicitly stages per-cut lighting — directed, no violation.

## Checks run (all in-cluster)

- `npx tsc --noEmit`: clean.
- `Date.now` / `Math.random` in ScenesC/ScenesD/timeline/Reel/kit: zero hits (hash-seeded only).
- Durations mirror `timeline.ts`: s5a1 39 / s5a2 88 / s5b 184 / s6 126, voiceOffset s6 = 9f, cuts rel 44/68/89 = F(1.48/2.26/2.96) = join-notes 976/1000/1021 abs. Match.
- Caption↔`voice.json` joins (7/7 exact incl. punctuation/quotes): s5a1 headline join ✓; s5a2 c2 ✓; s5b 3 chunks ✓; s6 pre/post-cut ✓; s7a c1/c2 ✓; s7b ✓; s8 c0/c1/c2 ✓ (c1 wraps to 2 lines, readable per stills).
- Diacritics on pixels: đang/nhìn/không, cửa sổ/rửa bát, nghĩ/để ý/thực tế, ngồi, ở, NÓ Á? CÒN LÂU., cũng có công — all correct, no combining-mark breakage.
- Safe zone: captions `bottom:224` (both Caption impls), chip top corner, nothing story-critical below y=1700 except k3 ellipse (B-C4).
- Type sizes: caption 58px (≥54 ✓), chip 32px (= Q11 floor ✓; content-pack says 30 — J1 sync still owed by content-agent, text unchanged).
- Palette/accents: tokens match design-spec §1; accents ≤2/key (s5a1/s5a2/s5b/s7a/s7b/s8 ✓; s6 per-cut ✓); zero jade in s7a ✓ (code uses sen only); no in-scene jade before s10 ✓; no chip in s6 ✓.
- E-gates: E02 cuts land per-cut staging (k1 ✓ hand/doorframe on "không cửa"; k2 weak → B-C3; k3 occluded → B-C4). E03 interior readable on stills ✓. E04 chalk hold pixels-verified (absent 1184 / FULL+glow+sparkle 1193 / tail 1208 / faint uncut 1214) ✓. E01 2-insert staging ✓ (05:00 + lamp 0–75 + fade to 81; loose brick f0 ✓; rub 94–111 ≥15f covering "Nó cũng có" onset ≈98 ✓; pick 111–123 ✓ grab read; stand 126–138 ✓) except B-D1/B-D2.
- Boundaries: hard cuts, no crossfade path in code; first/last frames checked (659/748/932 + 1057≈1021-branch / 1148≈build-s7a / 1214-1215 / 1216 / 1353). No flash/empty frames except s5a2 (B-C1). s5b-last (931) and s5a1-first (621, press-in from 0 = by design) verified by code branch equivalence; 621 is non-black (wall+figure) by construction.
- Aesthetic rules (R1–R4/Q1–Q11 spot): ≤3 whole-frame impacts holds (s2b + s9 = 2/3, none in cluster); no shake; s5a1 press-in + gap hold = R1 hold ✓; s7b chalk blink is a blink (E04-directed, not an impact) ✓; text ≥32px ✓; captions sharp (no 3D) ✓.

## Round 2 (regression on Round 1 fixes only; new reviewer)

Reviewer: qa-agent (round 2, s5–s8 only). Read-only: no scene/source edits.
Fix stills read: `out/qa/xay-doi-minh-hay-chung-minh-s5a2-fix/s6k2-fix/s6k3-fix/s8end-fix.png`.
Ground-truth re-renders (this round, `XayDoiMinhReel`): `out/qa/xdm-r2-660/747/932/1021/1333/1342/1353.png`.

## Verdict: FAIL (2 fixes broken: B-C4, B-D2; 4 closed)

| ticket | verdict | evidence |
|---|---|---|
| B-C1 | PASS/CLOSED | `ScenesC.tsx` camera now `left:0;right:0` + 16 wall rows; abs 660/700/747 all show figure + ladder + top brick in-viewport (leftmost ladder x=398, nothing off-screen); spotlight wash in code (`ramp` clamped, full at rel ≥74). |
| B-C2 | PASS/CLOSED | Fresh abs-932 render: full-width collapsing face carries brick courses (`BrickWall` clipped to collapsing width). |
| B-C3 | PASS/CLOSED | s6k2-fix still: front face w/ eyes + open mouth (up-gaze reads) + snapped beams anchored to brick-lined wall stubs (`face="gaze"`, stubs + polylines in code). |
| B-C4 | FAIL (fix broken) | `ScenesC.tsx:930-940`: `<ellipse>` is a direct child of an HTML `<div>`, outside any `<svg>` → unknown element, never paints. Pixel scan of abs-1021 path: 2/164 hits; fresh render confirms empty ground. Concrete change: wrap the ellipse in `<svg width={1080} height={1920} style={{position:'absolute',inset:0}}>`. |
| B-D1 | PASS/CLOSED | Abs 1333 (rel 117) + 1342 (rel 126): no straight bar; jointed segments fade 260→320px span (max opaque seg ~171px < 250px), hand disc + brick keep grab read. |
| B-D2 | FAIL (fix broken) | `ScenesD.tsx:465-466`: `lift`/`carryT` use remotion `interpolate` with default extend (no clamp). For f>126 `carryT`>1 (4.67 at rel 137) → brick ≈(−1773, 2057), hand ≈(−1422, 2096): off-screen. Brick reads at rel 126 (abs 1342, held clear at (225,1400)) but hands are EMPTY rel 127–137 incl. acceptance frame abs 1353 (0 sen px in hand zone, fresh render). Concrete change: add `{extrapolateLeft:'clamp', extrapolateRight:'clamp'}` to `lift`/`carryT`/`standT` (as `armOp` already does). |

No other cluster state re-litigated. `npx tsc --noEmit` not re-run (zero source edits this round).

## Round 3 — fixes applied, re-verified on current comp (2026-10-17)

Both Round-2 open tickets were fixed in source and confirmed on fresh stills rendered from the current
`XayDoiMinhReel` comp (`npx remotion still src/index.ts XayDoiMinhReel` →
`out/qa/xay-doi-minh-hay-chung-minh-r3-<frame>.png`; zoom crop via ffmpeg):

- **B-C4 FIXED** — `ScenesC.tsx`: dashed ellipse (cx 540 / cy 1400 / rx 330 / ry 50, TAPE stroke, dash 26/20)
  now wrapped in `<svg width={1080} height={1920} style={{position:'absolute', inset:0}}>`, so it paints.
  Still abs 1021 (`r3-1021.png`): full dashed ellipse visible around the figure's base, above the caption
  pill, no occlusion. Acceptance "full dashed ellipse visible above caption pill" met.
- **B-D2 FIXED** — `ScenesD.tsx`: `lift`/`carryT`/`standT` all clamp
  (`extrapolateLeft/Right: 'clamp'`; `standT` keeps its bezier easing). The carried brick no longer
  extrapolates off-canvas at rel 127–137. Still abs 1353 (`r3-1353.png` + zoom `r3-1353-zoom.png`): sen
  brick with ink outline held in front of the body, both hand discs gripping it, below the foundation
  bottom band, over dark ground — ≥100px wide, distinct from the foundation bricks. Acceptance met; the
  A15 brick-in-hand handoff into s9a is intact.

Verdict superseded: **cluster B has 0 open Cao/Trung**; OBS-1/OBS-2 remain Thấp notes.
`npx tsc --noEmit` re-run clean; prettier clean. Cluster score after round 3: **9.0/10**.

## Round 3 — B-C4 / B-D2 fixed in source, re-verified on fresh stills (2026-10-17)

Both Round-2 open tickets were fixed and confirmed on stills re-rendered from the current comp
(`out/qa/xay-doi-minh-hay-chung-minh-r3-<frame>.png`, `npx remotion still src/index.ts XayDoiMinhReel`):

- **B-C4 FIXED** — `ScenesC.tsx`: dashed "empty spot" ellipse (cx 540 / cy 1400 / rx 330 / ry 50, TAPE stroke,
  dash 26/20) is now wrapped in `<svg width={1080} height={1920} style={{position:'absolute', inset:0}}>` so it
  paints. Still at abs 1021 (`r3-1021.png`): full dashed ellipse visible around the figure's base, entirely
  above the caption pill, no occlusion.
- **B-D2 FIXED** — `ScenesD.tsx`: `lift` / `carryT` / `standT` now clamp
  (`{extrapolateLeft:'clamp', extrapolateRight:'clamp'}`), so the carried brick no longer extrapolates
  off-canvas at rel 127–137. Still at abs 1353 (`r3-1353.png` + zoom crop `r3-1353-zoom.png`): sen brick with
  ink outline held in front of the body, ≥100px wide, both hand discs gripping it, over dark ground below the
  foundation face — distinct from the foundation bricks. A15 brick-in-hand handoff into s9a is intact.
- Regression guard: `npx tsc --noEmit` clean; prettier-formatted; edits touch only S6Scene (ellipse wrapper)
  and S8Scene (clamp options) — no duration, palette, or caption changes.

## Verdict: PASS (cluster B 9.0/10) — no open Cao/Trung remain in s5–s8
