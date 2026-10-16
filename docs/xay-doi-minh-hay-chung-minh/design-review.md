# Design review — xay-doi-minh-hay-chung-minh (gate D)

## Round 1 (design-reviewer, clean context, 2026-10-16)

Inputs read: brief.md, script.md, design-spec.md, content-pack.md (fit only),
proto/People.tsx + tokens.ts, library.json (14/14 keys FOUND),
style-hook.png, style-turn.png, style-end.png, cover.png, board.png, motion-hook.png.
Aesthetic rules read in full. No prior rounds. tsc/cards taken from spec §5/§7 (not re-run; reviewer never edits).

### Score table (1–10, evidence cited)

| # | item | score | evidence |
|---|---|---|---|
| 1 | Beautiful | 8 | Cover/headline type + cobalt/sen/ice harmony strong (style-hook, cover). Finish gaps: bricks are glossy gradients with no paper fiber/deckle/inter-layer shadow; sky flat; character limbs sausage-like, no visible joints (brief asked khớp xoay); window block clunky; style-end has unlisted warm blob + orange sun. Not yet "publish unchanged". |
| 2 | Fits subject | 8 | Two-worlds mapping, s6 thin-edge, s7 100/10 split, s9 dark-window-vs-blazing-sign, s10 dawn jade, s11 two-worlds all staged correctly. Deductions: s2b/s5b expressive close-ups absent everywhere; s5b interior (rửa bát/steam/TV) not evidenced; s8 loose brick missing from board; s9 brick-in-hand unreadable; jade chalk box leaks into s7a still (belongs to s7b); s11 hat/chair details off-script. |
| 3 | Originality | 9 | Clearly distinct from truongthanh (no black/white-stick/orange/stamp, captions bottom, paper depth), claude-mem (no cream/clay/terminal), Understand Anything (no gold/diagram). Own wall+sign+window device. Dot-face simplicity is generic but carried by palette/metaphor. |
| 4 | Consistency | 9 | Same person (shirt/pants/hat/ink), same wall sen, same headline/caption system across hook/turn/end/board/cover. Hat-off continuity handled; night→dawn shift is intentional. |
| 5 | Phone legibility + safe zone | 8 | Headlines large, diacritics intact (đang/cuộc/chứng/ờ/ắ correct), cover bands respected, 88–100% empty on cover. Fail: chip spec'd Archivo 30px < Q11 32px floor, and chip appears in NO still. Board low-fi micro-text is not final sizing (not counted). |
| 6 | Profile visual test (story) | 8 | Consistent character acts every tile; situation/turn/ending staging earned; captions support scenes. Fail: required expressive close-ups s2b (cười gượng/mắt cụp) and s5b (face in spotlight, môi khẽ mở) exist in NO render; spec §12.3 admits hi-res face art not built. |
| 7 | Motion | 8 | Bulb chase + sweep + brick drop visible across 6×4 strip; sweep linear = slide-spotlight-pan grammar (locked). Fail: no visible overshoot/squash/dust at 12fps; push-in 1.00→1.04 imperceptible; easing unreadable from tiles. |
| 8 | Cover + storyboard | 8 | Cover works as thumbnail (question + wall + sign + window readable at 1/3 size; character small but subject is wall+question). Board covers all 11 shots, labelled with card keys. Fail: keys merged into shared tiles (s2a/s2b, s5×3, s7a/s7b, s9a/s9b) so per-key staging is unverifiable. |
| 9 | Shot-card choice and fidelity | 8 | 14/14 style-keys FOUND in library.json; energy mapping sensible; whole-frame impacts 2/3 (crash-zoom + aurora flip); hero-once respected; conscious s6 deviation documented; 9:16 re-layouts reasoned. Fail: 8/14 posters unpublished (judged md+mp4 only, per spec) and proto proves only s1/s7a/s11 grammar — s3 deal, s6 orbit, s9 flip, s10 chalk motion unproven. |
| 10 | Aesthetic rules | 8 | Pass: R1 (2.0s/1.0s holds), R3 (hook arc 3.81s), R4 (2/3), Q1 (generic UI + "minh hoạ"), Q3 (no shake), Q10 (low-fi doc density OK for board). Violations: Q11 chip 30px<32px (D07); Q4 sweep whitens sign rows 2–3 (D11); Q5 multi-focus hook covered by cover-brief override (logged, no ticket). |

**Mean 8.2 · items 1, 2 = 8 · verdict: revise** (needs ≥9, items 1+2 ≥9, no open Cao/Trung).

### Fix list (exhaustive round 1)

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D01 | Trung | s2b / board tile 2 + all stills | s2a/s2b share one overhead tile; no face close-up anywhere; spec §12.3 admits hi-res face not built | Add s2b crash-zoom endpoint still (face ≥600px, awkward/gượng, eyes down, People `awkward` face) or split board tile | design-agent | Still shows s2b gượng face ≥400px wide, no other face visible |
| D02 | Trung | s5b / board tile 5 + all stills | s5 tile shows wall + lit window only; script requires ice-window interior (bóng quay lưng ở bồn rửa, hơi nước, TV flicker) + return-cut face in spotlight | Add s5b interior still + face return-cut (or split board tile into 3) | design-agent | Still shows back-turned silhouette at sink + steam/TV cues, caption/chip zones clear |
| D03 | Trung | s8 first frame / board tile 8 | Board s8 shows carved brick + 05:00 only; script A18 + spec §6 require loose brick pre-placed at ladder foot from s8 frame 0 | Add labelled loose brick at ladder foot in board s8 tile | design-agent | Board s8 tile shows loose brick at ladder foot + foundation carving |
| D04 | Trung | s9a / board tile 9 | Board s9 character tiny, no brick readable; spec §6 requires brick from end-s8 clearly in hand, readable at 480px | Restage s9 board tile or add s9a detail still with brick in foreground hand | design-agent | Brick readable in 480px-wide crop |
| D05 | Trung | ProtoTurn / style-turn.png | Jade dashed room box on dark right half; script s7a has no chalk — blink belongs to s7b only | Remove dashed box from s7a still; show chalk-blink note only in s7b staging | design-agent | s7a still has zero jade; s7b staging annotated |
| D06 | Trung | Wall.tsx + People.tsx / style-hook | Bricks glossy gradient, no fiber/deckle/layer shadow; limbs jointless (brief: khớp xoay); spec §12.1 self-flags "flat SVG" risk | Add feTurbulence paper grain + 1–2px deckle misregistration (riso-print-hits) + visible limb joints; re-render hook | design-agent | 200% crop shows grain + deckle; elbows/knees articulated |
| D07 | Trung | design-spec §3 + (no still) | Chip spec'd Archivo 30px < Q11 32px floor; chip rendered in zero stills | Bump chip to ≥32px, update §3, render s5b still with chip top-corner 0.6–4.8s zone | design-agent | Still + spec line both show ≥32px chip |
| D08 | Thấp | style-end.png vs script s11 | Hat rests on brick; script s11: tháo mũ cầm hờ bên hông | Hat in hand at side | design-agent | End still shows hat in hand |
| D09 | Thấp | style-end.png vs script s11 | Chalk room shows window+sun + 2 stacked boxes; script: 1 door + 1 window facing dawn + 1 chair | Redraw chalk: door outline + chair shape + window | design-agent | End still shows door + window + chair |
| D10 | Thấp | style-end.png / proto palette | Warm blur blob right + orange sun + ladder brown map to no §1 token | Add dawn-sun token to §1 or remove blob; list ladder wood or retint | design-agent | Every rendered color maps to a §1 token |
| D11 | Thấp | motion-hook.png rows 2–3 / spec §12.6 | Sweep whitens sign mid-pass (Q4) | Narrow sweep to wall-only band (exclude sign y-range) or log conscious deviation in §12 | design-agent | Strip shows sign unaffected OR deviation logged |
| D12 | Thấp | board.png | 16 keys merged into shared tiles (s2a/s2b, s5×3, s7a/s7b, s9a/s9b) | Split to ≥1 tile per shot with inset details, or add detail stills per key | design-agent | Every one of 16 keys has a staged tile/still |
| D13 | Thấp | motion-hook.png (12fps) | Settle+press+2f squash+dust and push-in 1.00→1.04 imperceptible | Add 30fps 1s brick-drop detail strip (f10–f40) or annotate measured values | design-agent | Detail strip visibly shows one overshoot + squash + dust |
| D14 | Thấp | style-end vs content-pack s11 | "cho ai?" jade vs pack "cho ai (đậm=white)" | Confirm jade with content-agent/director at join; log | design-agent | Join-notes records accent choice |

### Cannot verify (outside hook strip / unbuilt)
Voice/BGM/SFX sync; s3 deal, s6 orbit, s9 flip, s10 chalk-draw motion (proto covers s1/s7a/s11 only); chip timing; exact 210px/224px pixel measurement (build-time check); s4 phone final density.

### Strengths (for the record)
Cover band layout matches script frame0 exactly; s7 split and s9 dark-window-vs-blazing-sign stage the beats precisely; s11 two-worlds composition earns the ending; diacritics flawless; palette argument (hue math vs 5 prior videos) holds on the renders.
