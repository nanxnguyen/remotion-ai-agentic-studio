# QA Report — Cluster C: s9a / s9b / s10 / s11 (Round 1)

Vid `xay-doi-minh-hay-chung-minh` · Comp `XayDoiMinhReel` · reviewer `qa-agent` (frames cluster s9a–s11, independent).
Sources read: `script.md`, `content-pack.md`, `voice.json` (s9–s11 rows), `design-spec.md`, `join-notes.md`,
`src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesE.tsx` (sole scene owner: agent E),
`timeline.ts`, proto stills `out/qa/xay-…-build-s9a/s9b/s10/s11/end.png` + `detail-s9a-brick.png`.
Extra stills rendered (real comp): `out/qa/xay-doi-minh-hay-chung-minh-qa-c-{1354,1421,1423,1425,1428,1430,1432,1433,1505,1515,1587,1589,1591,1654,1674,1716,1775}.png`.

Absolute frames: s9a 1354 (79f) · window-off cue local+69 = **1423** · s9b 1433 (82f) · s10 1515 (144f) ·
thud local+74 = **1589** · chalk local+139 = **1654** · s11 1659 (117f) · end 1776.

## Fidelity (shot | score /10 | gap)

| shot | score | gap vs spec/pack |
|---|---|---|
| s9a | 6 | Sign occluded → misreads (C1); fg hand/brick blob ambiguous (C7) |
| s9b | 8.5 | Hold works: sign blazing, pool narrows, window dark; faint building blocks only |
| s10 | 6.5 | Bulbs-out + dawn + chalk land; kneel/place/thud hidden behind caption (C3); floating brick at f0 (C8) |
| s11 | 6 | True hold byte-identical 1716=1775 ✓; hat-off ✓; but headline contrast fail (C2), ghost sign text (C4), chalk overlaps board + no chair/window (C5), placed brick missing (C9) |

Cleared known issues (no ticket): orange sun taste (s11 diffuse wash fine; s10 disc ramps 0.2→1 by design),
diacritics (thường/thể/tiếc/chỗ/đứng/gạch/tiếp/THẤY CHƯA? all correct), caption↔voice/pack match incl. accents,
safe-zone (captions bottom:224, nothing in 210px), H2 timing (flip local 69–80 ≈ abs 1423–1434, "tách" aligned),
s10 actions 2+3 overlap clean (spatially separated, no collision).

## Tickets (owner: agent E → `src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesE.tsx` unless noted)

| id | sev | where | evidence | concrete fix | acceptance |
|---|---|---|---|---|---|
| C1 | **Cao** | s9a all frames (e.g. qa-c-1354); ScenesE:267-271 | Dark tower `x=-40 w=180` drawn AFTER Sign covers plate/bulbs/"TH" → sign reads **"HẨY CHƯA?"** whole shot; s9b (no towers) reads full | Draw flanking towers BEFORE wall+Sign (or shift towers clear of x 60..480) | qa-c-1354 re-render: full "THẤY CHƯA?" + 9 bulbs visible, zero dark overlap on plate |
| C2 | **Cao** | s11 all frames (qa-c-1674/1716/1775); ScenesE:53-75,655-663 | Headline lines 1–2 white `#F3F6FF` on dawn `#DDEBFF→#F2FBF6` ≈ invisible; only jade "cho ai?" reads; persists through 2.0s silence | s11-local contrast: add `shadow` prop to file-local Headline (ink text-shadow/scrim), enable only in S11Scene; do not change dark-scene rendering | Re-render 1716: all 3 lines legible at 480px width (or measured contrast ≥ 4.5:1) |
| C3 | **Cao** | s10 thud (qa-c-1587/1589/1591); ScenesE:426-428,482-484,534 | Kneel head-top ≈1505, placed brick ends y=1520, dust at brick — chunk1 pill top ≈1515 → kneel/place/thud/dust all behind pill; only hat peeks out | Restage ground action ≥60px above pill top (e.g. raise ground/action zone; brick-end y ≤1440, figure feet y ≤1500) keeping caption at bottom:224 | Re-render 1589: kneeling figure + brick on ground + dust fully above pill, unobstructed |
| C4 | Trung | s11 (qa-c-1716); ScenesE:601-614 | `<text>` 52px "THẤY CHƯA?" (~340px) wider than 280px plate → pale spill both sides = ghost double-image | Fit text in plate: fontSize ~38–40 or widen plate to ~360 | Re-render: no glyph extends beyond plate rect |
| C5 | Trung | s11 (qa-c-1674); ROOM_PTS:400-409 vs board:601 | Chalk left edge x=300 runs inside board x-range (120..480, y1180..1400) → green line crosses dead board; script needs door+window-facing-dawn+chair, only door notch exists | Shift room clear of board (x > 480) + add jade window + chair strokes | Re-render: zero chalk/board overlap; door + window + chair each recognizable |
| C6 | Trung | s9a→s9b cut (qa-c-1432→1433) | Sink overlay dims sign dull maroon at 1432, then cut pops to full blaze at 1433 | Exempt Sign from sink overlay (or match s9b f0 brightness to s9a end) | 1432 vs 1433: no visible sign brightness pop |
| C7 | Thấp | s9a (qa-c-1354); ScenesE:288-295 | E07 fg brick (260×160 slab) + white ellipse "hand" reads as cooler + egg, not grip | Reshape hand (fingers/grip cue) or shrink mitt ellipse | Still reads as hand holding brick at 480px |
| C8 | Thấp | s10 f0–0.4s (qa-c-1515); ScenesE:482 | Placed-brick group visible floating mid-air before step starts | Fade/slide brick in with step (opacity 0 until local ~12f) | qa-c-1515/1520: no floating brick |
| C9 | Thấp | s11 (qa-c-1674+); S11Scene:599-653 | s10's placed brick absent on s11 ground (continuity) | Render placed brick at s10 end pos on s11 ground | Brick visible near figure feet in s11 wide |

## Checks run

- `npx tsc --noEmit`: clean (exit 0).
- Determinism grep (`Date.now|Math.random` in ScenesE/timeline/Reel): no usage (only a compliance comment); motion is `useCurrentFrame` + sin/interpolate — deterministic ✓.
- Registry: `XayDoiMinhReel` registered once via `videoRegistry`/`Root.tsx` ✓. Audio offsets match timeline (window-off 2.3s, thud 2.46s, chalk 4.64s) ✓.
- s11 freeze: qa-c-1716 and qa-c-1775 byte-identical (398789 B) — TRUE hold, push-in completes before final 2.0s ✓.
- s9b hold (1505): full headline + blazing sign + narrowing pool ✓; 1.0s silence staging intact.

## Verdict: **FAIL** — 3 Cao (C1–C3) + 3 Trung (C4–C6) + 3 Thấp (C7–C9) open, all owned by agent E (ScenesE.tsx).

Cluster score: **6.5/10**. H2 lands (modulo C1/C6); H3 half-lands (sound + caption only, visual occluded — C3);
s11 hold + hat-off work but closing question is 2/3 illegible (C2). No story/wording changes needed — all fixes are staging/contrast/draw-order.

## Round 2

Vid `xay-doi-minh-hay-chung-minh` · new reviewer · regression-only on fix stills
`out/qa/xay-doi-minh-hay-chung-minh-{s9a-fix,s10-fix,s11-fix,end-fix}.png` (4 stills, no source edits).

| id | status | evidence |
|---|---|---|
| C1 | **FIXED** | s9a-fix: full "THẤY CHƯA?" legible, 9 bulbs visible, zero dark overlap on plate (towers now flank clear) |
| C2 | **FIXED** | s11-fix + end-fix: all 3 headline lines legible (ink-on-dawn; jade "cho ai?"); holds through silence hold (s11-fix ≈ end-fix) |
| C3 | **PARTIAL** | s10-fix: figure + ground brick fully above pill, occlusion cleared ✓; but figure is standing (not kneeling) and no dust visible — thud-frame (local+74) posture/dust unconfirmed in this still |
| C4 | **FIXED** | s11-fix: "THẤY CHƯA?" fits inside magenta plate, no glyph spill |
| C5 | **FIXED** | s11-fix: chalk room right of board (no overlap); door + 4-pane window + chair each recognizable |
| C6 | **UNVERIFIED** | Needs 1432-vs-1433 frame pair; single s9a-fix still cannot show pop |
| C7 | **PARTIAL** | Small figure's held brick reads OK; big fg pink slab + white capsule bottom-right still reads notebook/cooler-like |
| C8 | **UNVERIFIED** | Needs f0 still; s10-fix shows grounded brick mid-scene, no float here |
| C9 | **FIXED** | s11-fix: pink placed brick on ground by figure feet ✓ |

Diacritics intact (THẤY CHƯA?, gạch, tiếp, đặt, cho ai?). No new overflow/regression in the 4 stills.

## Verdict: **CONDITIONAL PASS** — all Cao occlusion/contrast defects (C1, C2) resolved in-still; C3 occlusion cleared but thud-frame kneel+dust needs one confirming still; C6 needs the 1432/1433 pair. C7-taste residual is Thấp, non-blocking.
