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

## Round 2 (design-reviewer, clean context, new agent, 2026-10-16)

Inputs read: brief.md, script.md (frame0 bands, A15/A16/A18, R3.6#3), design-spec.md (updated §§1/3/7/12/13, join flags J1/J2/J3), proto/ (Paper.tsx grain, People joints, BoardFrame, Details), content-pack.md (fit only), Round 1 report (8.2 revise, D01-D07 Trung, D08-D14 Thấp). Renders Read: style-hook, style-turn (jade-px 0), style-end, cover, board (1080x1920 4x4), motion-hook (1620x1920), detail-s2b-face, detail-s5b-interior, detail-s5b-face, detail-s9a-brick, detail-s5b-chip, drop-detail (1296x1920). No pipeline.py run (reviewer never edits).

### Ticket verification (D01-D14 by acceptance)

| id | verdict | frame evidence |
|---|---|---|
| D01 Trung | CLOSED | detail-s2b-face.png: single gượng face fullscreen (code S2bFace s=3.4, head ~520px+ per spec), eyes-down lids, tilted flat mouth, blush, short-hair (18yo, never bald); dismissive adult hand at left edge shows no second face. Board tile s2b split to own FaceBig d=500 tile. |
| D02 Trung | CLOSED | detail-s5b-interior.png (S5bInterior): ice-window frame + mullions + TV set + back-turned sink silhouette (no face) + faucet + 2 water streams + 3 steam curls + ice spill; caption/chip zones clear. detail-s5b-face.png (S5bFaceReturn): helmet-on face in cold spotlight beam, calm side-eyes, parted lips (môi khẽ mở). |
| D03 Trung | CLOSED | BoardFrame.tsx s8 (lines 198-211) + board tile s8: foundation brick "NÓ Á? CÒN LÂU." + ladder (wood) + loose brick w=190 at ladder foot (frame 0 per A18) + 05:00 insert. |
| D04 Trung | CLOSED | detail-s9a-brick.png (S9aBrick): foreground brick 600px wide (code line 301) sen gradient + Deckle + grain, gripping hand + cuff from right; headline "có thể đã quên" ice above; dark clicked-off window behind. Readable at 480px crop (brick fills >50% width). Hand is abstract mitten by minimalism direction, brick is the readable subject. |
| D05 Trung | CLOSED | style-turn.png pixel scan: 0 jade-ish px (step-4 sweep). ProtoTurn s7a = split at board edge, no chalk box in code or render. Jade dashed room lives only in board tile s7b (correct per script s7b chalk-blink). |
| D06 Trung | CLOSED | Paper.tsx: feTurbulence fiber (seed 7, 240px tile) + 2px Deckle plates + per-brick grain (Wall.tsx 0.22). People.tsx: knee discs + elbow discs (khớp xoay). Renders carry grain/vignette overlays; flat-glossy look gone (wall shows layered tones + offsets; character limbs segmented). 200% crop readability is build-time QA, grammar is locked. |
| D07 Trung | CLOSED | Details.tsx ChipSource fontSize 32 (Q11 floor); detail-s5b-chip.png renders 4-line chip top-right over interior, outside caption zone. Spec §3 = 32px. Content-pack.md still says 30px → carried as join flag J1 (content-agent sync 30→32, text unchanged). |
| D08 Thấp | CLOSED | style-end.png + ProtoEnd.tsx L69-70: hat=false + pink hat plate held low at right side beside body, not on brick/head. Matches script s11 "tháo mũ cầm hờ bên hông". |
| D09 Thấp | CLOSED | style-end.png + ProtoEnd L48-64: jade chalk room = ground outline + right-side door arch + sunrise window (frame + cross + sun disc) + chair (backrest + seat + 2 legs) as one readable silhouette. Script "1 door + 1 window + 1 chair" satisfied. |
| D10 Thấp | CLOSED | tokens.ts adds wood #8A6B46 + sun #FFC46B (§1). End pixel scan: sun-family px 241, truongthanh-orange #F58B4C px 0. Ladder/brace use wood; sun disc + wash in s11 only; dead sign dimmed. Every rendered color maps to a §1 token (wash = sun alpha, declared in §1). |
| D11 Thấp | CLOSED | ProtoHook L177: WallSweep y=1000 h=140 → band 930-1070; SignBoard y=1130 → excluded. Motion-hook strip: sign rows steady while upper-wall band travels. Linear grammar kept (Sweep.tsx interpolate, no easing — 命门). No deviation to log (§12.6 FIXED). |
| D12 Thấp | CLOSED | board.png 4x4 = 16 tiles, one per key: s1/s2a/s2b/s3/s4/s5a1/s5a2/s5b/s6/s7a/s7b/s8/s9a/s9b/s10/s11, each labelled id + card (BoardFrame.tsx 16 branches). Detail stills cover merged-key close-ups (s2b/s5b/s9a). |
| D13 Thấp | CLOSED | Wall.tsx dropY: y1>1 overshoot bezier(0.3,0,0.25,1.15) + ~30px dip + squash 0.12 + 9 dust/20f + ProtoHook dust 16px. Drop-detail strip (f10-40, 6x5) + code together evidence overshoot + squash + dust; tile-mean drift 66.8→70.1 across strip confirms pixel motion. J3 carries magnitude-scaling note to scene-agents (grammar unchanged). |
| D14 Thấp | CLOSED (design side; decision → director) | s11 "cho ai?" rendered jade; content-pack s11 says đậm (white). Design-spec §13 J2 logs the recommendation (self-side accent + dawn pairing + 1-accent/shot). Acceptance for design = logged; final accent choice is a one-line join decision, carried as J2, not a design defect. |

No NEW tickets. One observation (not a ticket): end dawn wash uses sun-alpha rgba(255,214,150,0.35), declared in §1 as sun wash — inside the token family.

### Regression

Grain/deckle: present in Paper/Wall/Details/hook/end (no return of flat gloss). Sweep band: upper-wall only, sign untouched all tiles, linear. Tokens wood/sun: ladder wood in hook + board s5a2/s8; sun + wash s11 only; no orange/black-stick/stamp anywhere. Board split: 16 keys intact, no re-merge.

### The two Gate-D questions

(1) Beautiful — yes. Composition: single subject per frame with big negative sky (truongthanh minimalism adopted: one subject, negative space, 1 accent/shot, sound-off headlines); light: cold bulb chase → spotlight beam → 100/10 split → dawn wash, all motivated; harmony: cobalt/sen/ice with jade reserved for dawn + self-accents (turn scan 0 jade leaks); type: Bricolage headlines + Archivo captions, diacritics correct in every still (đang/cuộc/chứng/minh/ờ/ắ), chip 32px; phone finish: faces 500px+, brick 600px, sign ≤70% headline, caption pill bottom-224. Residual simplicity of dot faces is the agreed minimalism direction, not a finish gap.
(2) Fits subject — yes. s2b gượng close-up + hand-wave; s5b interior (quay lưng ở bồn rửa, faucet + water, steam, TV flicker) + spotlight return-cut (môi khẽ mở) + chip only in s5b; brick continuity s8-loose → s9a-in-hand (600px) → s10-down; chalk room only in s7b (blink) and drawn in s10→s11; dawn jade appears only from s10; s11 two-worlds (dead sen board + jade chalk room + brick on ground + hat in hand + held question + 2.0s hold staging). Chalk only s7b verified; two-worlds ending earns the question "Viên gạch tiếp theo, bạn đặt cho ai?".

User direction check: truongthanh minimalism (single subject, negative space, big faces, 1 accent/shot, sound-off readability) is adopted; its black/white/orange palette, stamp device, and stick figures are nowhere present (orange px 0, no black field, no stamp). Own paper-diorama depth kept.

### Score table (1-10)

| # | item | score | evidence |
|---|---|---|---|
| 1 | Beautiful | 9 | grain + joints + chair/mullions/faucet fixed; palette/light/type/phone finish above; residual dot-face simplicity = direction |
| 2 | Fits subject | 9 | close-ups, interior, brick chain, chalk-only-s7b, dawn jade, two-worlds — all framed above |
| 3 | Originality | 9 | zero black/white-stick/orange/stamp/terminal/gold; wall+sign+window device owned |
| 4 | Consistency | 9 | same person/shirt/hat/ink, same wall sen, same headline/caption system hook→end→board→cover |
| 5 | Phone legibility + safe zone | 9 | headlines big, diacritics intact, chip 32px rendered, cover bands respected |
| 6 | Profile story | 9 | consistent character acts all 16 keys; s2b/s5b expressive close-ups built via crash-zoom/face-tour cards |
| 7 | Motion | 9 | chase + narrowed linear sweep + dropY overshoot/squash/dust in code and strips; orbit/flip/chalk remain build-time (logged risk) |
| 8 | Cover + storyboard | 9 | cover = hook f0 with full headline; board 16/16 keys labelled with cards |
| 9 | Shot-card choice and fidelity | 9 | 14/14 keys FOUND; proto proves s1/s7a/s11 + s2b/s5b/s9a details; s3/s6/s9/s10 motion carried as build risk (was in Cannot-verify) |
| 10 | Aesthetic rules | 9 | R1/R3/R4/Q1/Q3/Q10 hold; Q4 fixed in code + strip; Q11 32px; Q5 covered by cover override (logged) |

**Mean 9.0 · items 1, 2 = 9 · no open Cao/Trung (D14 design-side closed, J2 decision → director; J1/J3 carried) · verdict: pass.**

Cannot verify (unchanged, build-time): voice/BGM/SFX sync; s3 deal / s6 orbit / s9 flip / s10 chalk-draw motion; chip timing 0.6-4.8s; exact 210/224px measurement; s4 final density; 200% grain print check at final scale.
