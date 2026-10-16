# Design review — chung-minh-de-lam-gi

## Round 1

Role: design-reviewer (clean context, never design-agent). Gate D needs ≥ 9.
Read: brief.md, script.md, design-spec.md, content-pack.md, proto Board/figures/text,
out/qa/chung-minh-de-lam-gi-{cover,style-hook,style-turn,style-end,board,motion-hook}.png,
out/truongthanh-contact-sheet.jpg.

### Verdict answers (with frame evidence)

1. **Beautiful? YES.** cover.png / style-hook: 2-line Lexend headline top
   ("trống?" orange #F58B4C), orange rule, white que + orange medal hero,
   20% ghost chair, bottom 78–100% empty black. Confident editorial restraint,
   high contrast, orange reserved for recognition object + hurt/heal words.
   style-end bookends cover (same que/medal/chair grammar, headline
   "giữ lại điều gì?" orange) — earned closure, medal kept in hand per I4.
2. **Fits introspective subject? YES.** style-turn (s7b): lone que center,
   dashed chest outline + flat orange @70% "lit from within", top 60% pure
   void = stillness, not dead space (brief allows large voids). Board s9a
   mirror duet + s9b flat beam landing on chest = "rọi vào trong" literal.
   s11 open question + 2.0s hold, no CTA. Tone night-calm throughout.
3. **Senior-Designer checklist:**
   - Hierarchy: PASS on hero stills (headline 8–26% / subject 653–1114 /
     ghost 1190–1459 / bottom empty). Board s10 chip top:500 below 3-line
     headline per spec — PASS by construction.
   - Expressive figures/objects: PASS system (figures.tsx Face ≤3 strokes:
     downcast/smirk/smile/droop/calm/lit). Cover downcast, s4a smile,
     s9b lit all read. See T2 (s2b smirk scale).
   - No dead space: PASS (voids intentional + brief-allowed); turn top void
     is the H2 intimacy device.
   - Type consistency: PASS on stills (Lexend Bold headlines, Be Vietnam
     captions, orange ≤2 clusters: "trống?", "treo yên"+"nằm trong ngực",
     "giữ lại điều gì?"). See T4 (lock s7b to 2 spans).
   - Safe zones: PASS on cover/hook/end (no bottom caption on headlines).
     See T5 (measure turn caption ≥210px clearance in build).
   - Subtle motion: PASS grammar (push 1.00→1.03, holds, single overshoot
     on props only). See T6 (motion-hook strip near-identical — verify
     perceptibility, keep dead-still s11).
4. **Profile story:** que character consistent across all 15 board tiles
   (same white stick kit) — PASS. Close-ups: PARTIAL (see T2). Situation
   (s2 wound → s3 grind → H1 s4b ghế trống) / turn (H2 medal→chest +
   H3 mirror→beam) / ending (s10 naming + s11 open hold, medal kept,
   chair turned toward que) — EARNED, no face-reveal, no revenge beat. PASS.
5. **vs truongthanh ref:** system kept (black/white/orange + que + sparse
   flat props) per user exception; story DIFFERENT (medal/ghost-chair/
   mirror/beam/price-tag; zero invoice/stamp/sofa/bar-chart/hashtag/
   channel-tag; bottom captions; night-calm vs warm-witty) — PASS.
   W2 (bottom captions) / W3 (one metaphor/shot) / W4 (foreground-focus vs
   ghost) / W5 (H1 cut, H2 tilt, H3 beam ruptures) BEATEN. W1 beaten on
   hero shots (s1 medal r=84, figure ≥35%) — see T3 for s2a board framing.

### Tickets (owner: design-agent)

- **T1 [BLOCKING — content-pack violation]: empty speech bubbles.**
  Board s2b (line 44) and s7a (line 56) render `<Bubble/>` outline with NO
  text, but content-pack mandates bubble text `nó thì làm được gì` (s2b) /
  old-quote bubble beside medal (s7a), each with `minh hoạ` label, and
  script §notes makes the label mandatory. Board tiles confirm: blank white
  rounded rects. Fix: put the quote text INSIDE the bubble component (or as
  board/stage text at bubble center, ≤28ch/line) + `MinhHoa` tag adjacent,
  in Board AND carry into build scenes. Re-render board + affected stills.
- **T2 [BLOCKING — s2b close-up]: smirk unreadable at full-body scale.**
  Spec §9.2 already flags it: board s2b stages que at s=1.7 full body; tile
  reads as generic smile, not the asymmetric smirk (figures.tsx:51-59, one
  eye lower + crooked mouth). Script demands ≤3-stroke expressive close-up
  ("cận mặt que"). Fix: stage s2b build as face close-up (face ≥300px per
  spec), keep smirk asymmetry legible at 480px phone width; add s2b
  close-up still as evidence.
- **T3 [MAJOR — W1 regression on s2a]: figure tiny (~15% height).**
  Board s2a (line 42): que at (820,1150) s=0.9 dwarfed by 800px tube +
  grey disc; repeats the exact truongthanh W1 weakness the spec claims to
  beat (hero ≥35%). Fix: enlarge que to ≥35% frame height and rebalance
  tube/disc as background band (opacity ≤0.5, no compositional dominance);
  re-render board tile.
- **T4 [MINOR — accent discipline]: s7b has 5 accent tokens in code.**
  Board line 58 accents 5 words; content-pack allows 2 clusters
  (`treo yên` · `nằm trong ngực`) and the turn still correctly renders 2 —
  lock build to 2 accent spans so a future edit can't re-split them.
- **T5 [MINOR — safe zone]: measure turn caption clearance in build.**
  style-turn caption sits low; assert bottom:224 clears the 210px safe zone
  on pixels at 1080×1920 AND legible at 480px width; attach measurement.
- **T6 [MINOR — motion perceptibility]: motion-hook strip is 24× identical.**
  Push 1.00→1.03 over 2s is below perception threshold in the strip;
  either confirm on video (not stills) that ting-pop + push reads, or add
  one just-noticeable cue (medal pop f6 + chair fade-in per spec §5) while
  keeping s11 60f dead still. No gradient/blur to achieve it (T6 locked).
- **T7 [NIT — board captions truncated vs content-pack]:** board s2a/s2b/
  s3/s4a/s4b/s6/s7a/s8 captions show only first 2 chunks (e.g. s8 missing
  `mình khoe, lòng vẫn / nguyên chỗ trống`). If board is intentionally
  low-fi, add one line to Board.tsx header comment stating captions are
  abbreviated and build uses full content-pack chunks; if not intentional,
  complete them.

### Score

**7/10 — REQUEST CHANGES (gate D needs ≥ 9).**
+2 for T1 fix (mandatory on-screen text), +1 for T2 close-up evidence,
+1 for T3 W1 reframing (capped at 10). Re-review on: board re-render
(s2b/s7a bubbles with text, s2a reframe) + s2b close-up still + safe-zone
pixel note. No pipeline run performed (per instructions).

## Round 2

Role: design-reviewer (new clean context, never design-agent). Gate D needs ≥ 9.
Read: design-review.md Round 1 + design-spec.md §10 (R1 closure) +
`src/chung-minh-de-lam-gi/proto/{Board,S2bClose,figures,text,ProtoTurn}.tsx` +
re-rendered `out/qa/chung-minh-de-lam-gi-{board,style-s2b,cover,style-hook,style-turn,style-end,motion-hook}.png`.

### Ticket verification (acceptance + frame evidence)

- **T1 [BLOCKING] PASS.** Board s2b tile: bubble carries `nó thì làm được gì`
  inside the outline + `(minh hoạ)` tag directly below; s7a tile: same text in
  bubble + tag below medal. style-s2b (S2bClose f60): quote inside bubble,
  18ch single line, tag adjacent. Pack-exact, no new wording.
- **T2 [BLOCKING] PASS.** style-s2b: face close-up fills ~1/3 frame height;
  smirk asymmetry unmistakable (right eye lower, diagonal-slash mouth) at full
  1080px and clearly legible scaled to 480px width. Code: Que s=3.0, mouth kick
  + eye offset per spec §9. `S2bClose.tsx` exists as build-staging comp (88f).
- **T3 [MAJOR] PASS.** Board s2a: hero que visibly dominant (~37% frame height
  by construction: 558u × 1.3 ≈ 725px ≈ 38%); tube/disc reduced to thin flat
  background band (opacity 0.5/0.4, no dominance). W1 now beaten, not repeated.
- **T4 PASS.** s7b locked to exactly 2 accent spans (`treo yên` ·
  `nằm trong ngực.`) in Board:62 AND ProtoTurn:40; style-turn still shows
  exactly 2 orange clusters.
- **T5 PASS.** style-turn caption sits high-clear of bottom edge (spec PIL:
  lowest lit row 1690 → 230px ≥ 210px safe zone); visually confirmed, legible.
- **T6 PASS.** motion-hook strip: medal pop reads across tiles (small → large
  orange disc f6–16); strip otherwise stable = push is subtle but motion is
  perceptible via prop pop, as specified. s11 hold grammar untouched.
- **T7 PASS.** Board.tsx:1-5 header states board captions are abbreviated
  previews; build uses full content-pack chunks byte-exact.
- **Caption z-order (found+fixed) PASS.** style-s2b caption crosses the
  close-up legs but rides on the flat dark `band` (S2bClose:30 `band`) —
  fully legible, no white-on-white.

### Regression

Beautiful? YES — cover/hook/end byte-same grammar as R1 (Lexend headline,
orange rule, que + medal + ghost chair). Introspective? YES — turn void,
chest-glow, beam, open hold all intact. Checklist holds (hierarchy / ≤3-stroke
faces / intentional voids / 2-cluster accents / safe zones / subtle motion).
W1 held and improved (s2a 37% vs ref 15–20%).

### NEW nits only (board-staging, build unaffected — non-blocking)

- **N1:** board s2b tile caption lacks `band` (S2bClose has it) → caption text
  crosses white legs white-on-white in the tile. Build still is fine.
- **N2:** board s2a `accents={['để','rồi','xem.']}` are dead tokens — none occur
  in its 2 chunks. Drop or align.
- **N3:** board s2b accent (`khẩy`) vs build S2bClose accent (`làm được gì.`).
  Covered by the T7 abbreviation note, but align to avoid confusion.

### Score

**9/10 — PASS (gate D needs ≥ 9).** All R1 tickets closed with frame evidence;
−1 for three board-only nits (N1–N3, build unaffected). No pipeline run
performed (per instructions).
