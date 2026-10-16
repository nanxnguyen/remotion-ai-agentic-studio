# Design spec — chung-minh-de-lam-gi (design-agent, Phase 3c)

Comp: `ChungMinhDeLamGiReel` · profile `story` · 9:16 1080×1920 30fps · ~53s · 15 keys / 12 shots.

## 0. Scope note (DESIGN.md)

Repo-root `DESIGN.md` specifies the **MONITOR UI** (teal command deck: canvas `#04060B`,
primary `#2DD4BF`, Sora/JetBrains Mono) — a production dashboard, **not video art**.
No monitor token is imported into this video. This video reuses the **truongthanh visual
SYSTEM** (black bg, white stick figures, orange accent, top…→bottom captions) per explicit
user exception in `brief.md`, with its own story devices (medal/ghost-chair/mirror/beam;
no invoice/stamp/sofa/chart, no channel tag/hashtags, bottom captions, night-calm tone,
open-question + 2.0s silence ending).

## 1. Reference analysis — truongthanh contact sheet (`out/truongthanh-contact-sheet.jpg`)

System kept: black stage, white que figures, orange keyword accent, sparse flat props,
top captions. Top 5 problems of the reference this design beats:

| # | Reference weakness | This video's answer |
|---|---|---|
| W1 | Figures tiny at phone size (~15–20% frame height) | Hero figure ≥35% height; key object (medal) r≥84px, headline ≥72px |
| W2 | Top captions collide with figure band | Captions move to bottom (`bottom:224`); headlines *replace* captions (s1/s5/s10/s11) |
| W3 | Device reuse (stamp, sofa, bar-chart repeat across panels) | One unique metaphor prop per shot; H-devices (chair/medal/chest/mirror/beam) never repeat as hero |
| W4 | Flat staging, single depth plane on void | Foreground-focus vs background-ghost (chair @20%, silhouette @35–45%); overlap + scale contrast, no gradients (T6) |
| W5 | Middle panels share one energy (all same beat) | Rupture per highlight: H1 hard bright→dark cut, H2 tilt medal→chest, H3 mirror duet + beam landing |

Faces: reference = uniform frown. Here: expressive que faces in ≤3 strokes
(2 eye dots + 1 mouth): `downcast / smirk (asymmetric, s2b) / smile (s4a only) / droop / calm / lit`.

## 2. Art direction + energy curve

**Direction:** minimal editorial stick-figure — black void, warm-white type, single orange
accent reserved for *recognition objects + the words that hurt/heal*. Every scene thưa
(sparse), high contrast, one metaphor. Type is the narrator; figures are the witnesses.
Motion: slow symmetric arcs, single overshoot on prop pops only, long true-still holds
(R1/R3). Light = flat solid shapes + opacity (T6 locked: **no gradient / blur / SVG
filter** anywhere in render).

**Energy (hook→re-hook→turn→climax→hold):**
s1 hook-mid (question + ting) → s2 wound-low → s3 grind-rising (3×`tách` beats) →
s4a warm local-peak (applause) → **H1 s4b cold drop** (hard cut, machine hum) →
s5 **re-hook snap** (new question, lamp pool) → s6 calm-low (mechanism) →
**H2 s7a/s7b turn-lowest** (intimate, medal→chest) → s8 calm (evidence) →
**H3 s9a/s9b spine-stillness** (beam lands, absolute quiet) → s10 firm naming →
s11 open hold (question + 2.0s pure silence, dead still last 60f). Climax = s9b+s10
(emotional, not loud). Whole-frame beat impacts: 1 (s4a→s4b cut). Glints: 0.

## 3. Tokens (locked)

Palette: `bg #060606` · `panel #101010` · `white #FAFAF7` · **`orange #F58B4C`**
(= `stick.tsx` OR, = script `#F58B4C`) · `grey #8F8F8F` · ghost white @20% ·
`ink #060606` (face strokes) · `chipBd #3A3A3A` · `chipTx #C9C9C9` · lamp flat white.
Fonts (OFL verified via font name-table → `scripts.sil.org/OFL`; VN subsets
`public/fonts/*-VN.woff2`): headlines **Lexend Bold 700** (`F_HEAD`), captions/chips
**Be Vietnam Pro SemiBold 600** (`F_BODY`). No mono in-video (JetBrains Mono has no VN file).
Type scale: headline 72–88px/1.28 (≤3 lines) · caption 58px/1.38 plain on black (black IS
the pill) · chip 30px bordered · `(minh hoạ)` 28px grey. Q11: caption glyph ≈58px ✓,
aux ≥30px on chip ✓ (verified on still pixels; phone-check at 480px width: legible).
Layout zones (1920h): headline 154–~500 · subject 653–1114 · ghost 1190–1459 ·
captions `bottom:224` (clears 210px safe zone) · chips top:120 (s6/s8), top:500 on s10
(below 3-line headline). Radius: bubbles 44 · chips 18 · tag 26.

## 4. Reusable layout system (`src/chung-minh-de-lam-gi/proto/`)

`tokens.ts` (C, F_HEAD/F_BODY, press/draw/pop/drift easings, hash) · `fonts.ts`
(auto-generated base64 @font-face, deterministic stills) · `figures.tsx`
(Que/STAND/SIT/BOW/ARMS_UP, Face ≤3 strokes, Medal/Chair/Bubble/PriceTag/Mirror/
LightDisc/BeamFan/Motes — all flat SVG) · `text.tsx` (Headline+Rule, Caption, Chip,
MinhHoa). All frame-driven; seeded hash only.

## 5. Shot → card table (all cards/names/`style-key`s validated in `SC/gallery/api/library.json`)

| shot | beat | card | style-key | demo TSX | lib/components (copied, not imported) | 9:16 adaptation | locked params (命门, never weakened) | SFX idea |
|---|---|---|---|---|---|---|---|---|
| s1 HOOK | hook | `spotlight-hero-card` | `spotlight-hero-card` | `SC/demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx` | none (flat SVG) | single hero center; push 1.00→1.03; cover = frame 0 full headline + subject | Q5 single hero+arc; lamp-snap f2–6 timing; end-hold still | metallic `ting` on medal pop f6 |
| s2a | wound | `spotlight-sweep-moves` | `glow-wake-sleep-panel` | `SC/demos/effects/spotlight-sweep-moves/GlowWakeSleepPanel.tsx` | none | wake = cold tube flickers on (flat opacity snap, no glow streak per T6) | sweep L→R ruling; light-on=bright/off=dark | chair-drag `két` |
| s2b | wound | `crash-zoom-punch` | `crash-zoom-punch` | `SC/demos/camera/crash-zoom-punch/CrashZoomReal.tsx` | none | punch to que face (≤3 strokes, smirk); 1 of ≤2 uses | 6f log-ease push, ONE damped rebound, blur only on push (skipped: T6), 8f HIT flash→flat white 8f, 24f hold | short laugh, hard-cut to silence before “nó thì” |
| s3 | grind | `type-entrance-moves` | letter-drop-physics | `SC/demos/typography/type-entrance-moves/LetterDropPhysics.tsx` | none | 3 medals drop with accelerating stagger (R2), gravity curve, squash on land, hang on wall (T6b(a): 3 medals, 3 even beats, no per-noun sync promise) | accel stagger; y=D(t/24)²; 2 bounces 30%/9%; 3 impact squashes; collective settle; ≥34f still (no SpeedBlur per T6) | typing + 3×`tách` + room tone |
| s4a | warm peak | `wall-reveal-moves` | `bento-light-up` | `SC/demos/ui-entrance/wall-reveal-moves/BentoLightUp.tsx` | none | crowd row lights in place (dark-state 0.18 → lit, 12f stagger); confetti sparse capped (T8c) | 原位显形 (no displacement); 8f edge-draw + 8f back-out pop; ≤1 wall-light per video | even applause bed |
| s4b H1 | drop | `spotlight-sweep-moves` (sleep side) + straight hard cut | `glow-wake-sleep-panel` | same as s2a | none | sleep = room dims to medals @60%, chair ghost; s4a→s4b = exposed hard cut (no transition card) | wake/sleep are one system, distinct moves (P4 at move level) | hum `rè` only |
| s5 RE-HOOK | snap | `paper-title-card` | `paper-title-card` | `SC/demos/typography/paper-title-card/PaperTitleCard.tsx` | none | headline press-in (scale 1.28→1 + opacity, 4f stagger, 9f window, press easing); **NO blur channel (T6 deviation, recorded)**; lamp disc + seeded motes | one accent/line; underline f16–34 draw; sub before fade-out | silence gap after “không?” |
| s6 | mechanism | `list-reveal` | `list-reveal` | `SC/demos/ui-entrance/list-reveal/ListReveal.tsx` | none | passersby stagger (24f, scale .82→1 + rise, soft-back 1.5%, 10f stagger) + corridor linear drift (breath layer); **no focus-blur (T6)** | two decoupled layers; title enters halfway (Q5) | footsteps + distant elevator `ting` |
| s7a H2a | turn | `draw-svg-trace` | `draw-svg-trace` | `SC/demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx` | none | 2–3 white distortion curves trace on (40f in-out, pen nib, close-thicken, handoff to static) | pre-announce; content only AFTER close (causality); one subject per trace | room tone drops |
| s7b H2b | turn | `paper-title-card` (accent-underline system) | `paper-title-card` | same as s5 | none | medal drifts up-out (opacity); chest dashed outline + flat orange @70% settles; hand on chest | underline grammar; 0.40s tail hold | hum stops → silence (heartbeat synth DROPPED per director) |
| s8 | evidence | `paper-title-card` (chip-row system) | `paper-title-card` | same as s5 | none | flat white line + 4 week ticks (static SVG, no draw-anim to protect P4); hero = chip entrance 0.3–3.8s + fade 0.3s | chip window + pre-cut fade (script-locked) | — (voice carries) |
| s9a H3a | spine | `type-assembly-moves` | `split-text-stagger` | `SC/demos/typography/type-assembly-moves/SplitTextStagger.tsx` | none | mirror duet stagger-in (masked rise 115%→−10%→0, 14f+6f, 2f/char-equiv); `?` pops (no blur) | 0–12f empty hold; masked rise + 10% overshoot; 74f-equiv still (no motion-blur per T6) | water drips |
| s9b H3b | spine | `spotlight-sweep-moves` | `corner-spotlight-reveal` | `SC/demos/effects/spotlight-sweep-moves/CornerSpotlightReveal.tsx` | none | beam = FLAT fan polygon @80% landing on chest (no radial-gradient/mask per T6 — conscious deviation); face `lit` | linear travel ruling kept (uniform drift); uniform expansion timing | absolute silence after “nhất?” |
| s10 | naming | `hashtag-to-pill-materialize` | `hashtag-to-pill-materialize` | `SC/demos/interaction/hashtag-to-pill-materialize/HashtagToPillMaterialize.tsx` | none | price tag MATERIALIZES via 1f hard cut (no grow-morph); arm stops mid-way (T4b); tag sways (pendulum); chip Tuổi Trẻ in-shot | **hard-cut materialize, no flight segment** (pit: never revive flight); origin/scale math kept; hold ≥1s | tag sway creak (soft) |
| s11 | hold | `paper-title-card` (hold grammar) | `paper-title-card` | same as s5 | none | headline holds through line + 2.0s silence; push 1.00→1.03 then DEAD STILL 60f | R1 hold ≥1s (here 2.0s); medal kept in hand (not discarded) | distant drips fading to off |

Conscious rule deviations (per aesthetic-rules usage clause): T6 (no blur/gradient/filter)
overrides demo blur/gradient/glow channels in paper-title-card, list-reveal, split-text-stagger,
crash-zoom motion-blur, all spotlight-sweep light volumes — replaced by flat opacity/stroke
equivalents, same timing curves kept. P4: headline press + underline + chip-row are ONE type
system (not three heroes); spotlight-sweep used in 3 shots as 3 distinct moves (wake/sleep/land).
`transition-hidden-cut` read for joint grammar; joints are straight cuts (no hidden-cut device).

## 6. Motion recipe

Easings: `press bezier(0.2,0.75,0.3,1)` (text) · `draw bezier(0.3,0,0.2,1)` (rules/traces) ·
`pop bezier(0.3,1.4,0.5,1)` (single overshoot, props) · `drift bezier(0.4,0,0.6,1)` (camera).
One idea/shot; holds: headline ≥1s, batch tails 0.5s, hook arc full 66f, s11 60f dead still.
Frame-driven only (hash-seeded motes; no Date.now/random).

## 7. Deliverables

- Spec: `docs/chung-minh-de-lam-gi/design-spec.md` (this file)
- Proto: `src/chung-minh-de-lam-gi/proto/` (tokens, fonts, figures, text, ProtoHook/Turn/End, Board, entry, index)
- Frames: `out/qa/chung-minh-de-lam-gi-style-{hook,turn,end}.png`, `-cover.png` (frame 0),
  `-board.png` (15 tiles, 4×4), `-motion-hook.png` (2s @12fps strip, 6×4)
- Acceptance: `npx tsc --noEmit` ✓ · stills read ✓ · Q11/safe-zone/caption-≤28chips verified on pixels ✓

## 8. Handoff to video-director (do NOT edit — propose only)

npm deps: **none** (flat SVG + remotion only; no three/fiber/motion-blur in proto).
Root snippet (for `src/videos/registry.ts` + `src/videos/chung-minh-de-lam-gi/index.ts`,
by video-director in Phase 7):
```ts
export const chungMinhVideo = defineVideo({
  id: 'ChungMinhDeLamGiReel', slug: 'chung-minh-de-lam-gi',
  component: ChungMinhDeLamGiReel, durationInFrames: 1587, fps: 30,
  width: 1080, height: 1920, defaultProps: {},
  testFrames: [0, 800, 1586], tags: ['story', 'vietnamese'],
});
```
(1587f ≈ 52.9s @4.1syl/s; reconcile with measured voice at join.)
Assets to copy in Phase 7: `SC/assets/lib/Caption.tsx` NOT needed (own Caption in proto);
no audio chosen here (audio-agent owns SFX files + licenses).

## 9. Known weaknesses

1. Chair-back at 20% ghost is minimal — reads at still size, verify at 480px phone width in build.
2. ~~s2b smirk subtle~~ FIXED R1: diagonal-slash smirk (mouth kick 78px + 12px eye offset at s=3.0;
   35px/16px at 480px phone width — legible); staged as face close-up (336px) with lower-third
   flat band (`Caption band`, rgba black 0.72) for caption-over-limb contrast.
3. Turn chest-glow renders peach-over-white (70% orange on white torso, per script) — intended
   “lit from within”, but confirm against D taste.
4. No motion-blur on 6f punch (T6) — punch may read staccato; fallback: 2f white HIT flash (kept).
5. Lexend Bold is 700, not true ExtraBold — compensated with size (≥72px) + tight leading.

## 10. Fix round R1 (design-review Round 1, 7.0 revise → closure)

- T1 BLOCKING fixed: `Bubble` now renders pack-exact quote text INSIDE
  (`nó thì làm được gì`, 18ch ≤28ch/line, Be Vietnam Pro 600) + adjacent `MinhHoa` tag,
  in Board s2b/s7a AND `S2bClose` build-staging comp. No new wording.
- T2 BLOCKING fixed: s2b restaged as face close-up (`S2bClose.tsx`, 88f, Que s=3.0 → face
  336px); evidence `out/qa/chung-minh-de-lam-gi-style-s2b.png` (frame 60).
- T3 MAJOR fixed: s2a reframed — hero que s=1.3 (703px = 37% height), tube/disc reduced to
  subordinate background band (opacity ≤0.5).
- T4 fixed: `Caption` accents are greedy PHRASE spans; s7b locked to 2 spans
  (`treo yên` · `nằm trong ngực.`) in ProtoTurn + Board.
- T5 measured: turn caption lowest lit row 1690 → clearance 230px ≥ 210px safe zone (PIL, pixels).
- T6 measured: motion-hook strip orange-px tile2→tile6: 903→1560 (+657, medal pop f6–16);
  grey-px tile0→tile12: 1409→2210 (chair fade 0–30f). Motion perceptible; s11 60f dead-still kept.
- T7 fixed: Board.tsx header states board captions are abbreviated previews; build uses full
  content-pack chunks byte-exact.
