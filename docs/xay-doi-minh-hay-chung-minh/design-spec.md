# Design spec — xay-doi-minh-hay-chung-minh (design-agent, Phase 3c)

Comp `XayDoiMinhReel` · profile `story` · 9:16 1080×1920 30fps · 16 keys / 11 shots.
Must NOT resemble: truongthanh (black/white-stick/orange/stamp), claude-mem (cream/clay/terminal),
Understand Anything (black/gold/node-diagram), gaplai/metkhong/camon/cuoc-goi/thuong-hay-so (per brief §Style).

## 1. Palette (two worlds, carries meaning)

| token | hex | use |
|---|---|---|
| cobalt night sky | `#141B6B` → `#2A36C9` | sky/alley s1–s9 |
| sen (proof side) | `#FF2E9A` (light `#FF5CB3`, dark `#B3126A`) | wall, sign, "chứng minh" accents |
| lamp cold white | `#F3F6FF` | sign bulbs, spotlight, captions text |
| ice (the "họ" side) | `#8FE3FF` | window light; ONLY accent in s9a "có thể đã quên" |
| raw board back | `#7A7FA6` + tape `#D9DCF2` | wall back s6–s7, dead board s11 |
| jade (self side) | `#19C48A` | in-scene ONLY from s10 (chalk room, dawn); accent for "xây cho mình" |
| dawn | `#DDEBFF` → `#F2FBF6` | s10–s11 sky |
| ink | `#0A0F3D` | outlines (4–6px), caption pill 85% |
| shirt / pants / hat | `#E9EEFF` / `#1A2060` / `#FFA3D1` | character (hat pale pink = proof family, off wall sen) |
| wood (tool) | `#8A6B46` | ladder / brace timber — tool, never accent |
| dawn sun | `#FFC46B` | first morning sun + its wash, s10–s11 only |
| label grey | `#8B93C9` | "minh hoạ" tag s4 |

## 2. Fonts (OFL, embedded in proto as data-URI; final build → public/fonts + staticFile per camon/kit.tsx)

- **Bricolage Grotesque 96pt ExtraBold** (variable wght 200–800, pinned 800): headlines s1/s5a1/s9/s11,
  sign "THẤY CHƯA?", brick carvings. Width axis pinned 100 (narrow per brief handled by size, not wdth).
- **Archivo SemiBold** (variable wght 100–600, default 600): captions, brick labels, chip, UI.
- Fallback: Be Vietnam Pro (captions only); headline fallback Archivo ExtraBold.
- **Subset finding (verified with fontTools):** `*-VN.woff2` holds ONLY Vietnamese-specific glyphs
  (114–115 glyphs; basic Latin/digits/punctuation MISSING). Full coverage needs LA+LE+VN stacked
  as same-family @font-face with unicode-range (latin / latin-ext / vietnamese blocks).
  Vietnamese diacritics verified on rendered stills (đang, cuộc, đời, chứng, ờ, ắ… all correct).

## 3. Type / caption system

- Headline (replaces caption): Bricolage 800, 84–88px, center, top band; accents ≤2 per key
  (sen = proof side, jade = self side, ice = s9a only, else bold white).
- Caption: `bottom: 224`, ≤2 lines, Archivo SemiBold 58px on `#0A0F3D` 85% pill (radius 28).
  Nothing inside bottom 210px. Chip s5b: Archivo **32px** (Q11 floor; content-pack.md still says 30px —
  JOIN FLAG: content-agent sync 30→32, text unchanged) top corner, 0.6–4.8s of shot.
- Component: `proto/Caption.tsx` (`CapSeg[]`), `proto/Headline.tsx` (press-in grammar).

## 4. Energy curve (story arc, not promo arc — conscious deviation from promo-energy-arc noted)

hook s1 mid (question + living wall) → warm memory s2 → deal-climb s3/s4 (unease builds) →
**re-hook s5a1** (new question, hard cut, gap 0.3) → climb/suspense s5a2 → quiet answer s5b →
**turn s6** (freeze + 90° orbit reveal, then 3× ~0.5s cuts) → contrast hold s7 (100/10 light split) →
warm recognition s8 (05:00 inserts) → **climax s9** (click-off + blazing sign into dark, 0.7 gap + 1.0 silence) →
release s10 (soft thud on "đất", dawn, chalk begins) → **hold s11** (press-in question + push 1.00→1.03,
dead stop 2.0s, wind only).

Motion personality: job-site weight first half (springs stiffness-high/damping ~12, one small
overshoot + 2f squash + paper dust, cuts on brick "cộp"), breath second half (easeInOutSine,
no overshoot; bulbs die one by one s10; chalk draws itself s10→s11).

## 5. Card table (all names + style-keys validated in gallery/api/library.json; posters viewed
where published — 6/14 published, rest covered by card md + mp4 sample path)

| shot | beat | card | style-key | demo TSX path | lib / fixtures | 9:16 adaptation | locked params (命门) | SFX idea |
|---|---|---|---|---|---|---|---|---|
| s1 hook/cover | wall alive | spotlight-hero-card | spotlight-hero-card | demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx | Polish (EASE/ramp/Grain/Vignette) | no PageCam: cobalt stage, wall = hero, cold sweep instead of tungsten pool, push 1.00→1.04 to window | single hero + full arc (Q5); lock after push (R1); light strictly linear (from sweep card) | bulb hum + chase ticks f0-20, brick "cộp" f18, paper-dust swoosh |
| s2a | memory | overhead-camera-moves | overhead-tabletop-drop (B) | demos/camera/overhead-camera-moves/OverheadTabletopDrop.tsx | Polish | top-down Tết table fills 9:16 vertically; drop along table length | angle-lock: survey vs plunge separate; backface hidden + translateZ 4px | bowl "cạch", room murmur bed |
| s2b | sting | crash-zoom-punch | crash-zoom-punch | demos/camera/crash-zoom-punch/CrashZoomReal.tsx | — | face close-up center; ≤2 uses in video (this is #1) | endpoint must be hi-res raster (Q2); punch OR shake, never both | crowd laugh under "bật cười", hard cut to silence before "Nó á?" |
| s3 | climb | deck-deal-flyin | deck-deal-flyin | demos/ui-entrance/deck-deal-flyin/DeckDealFlyin.tsx | motion-blur (CameraMotionBlur, fast segs only) | 3 labelled bricks dealt bottom→top along wall; character grows per brick (A12) | cue = 36+4k−0.0792k(k−1) hard-accel; y1>1 settle+press; anticipation once, segment-level, pixel-visible | 3× "cộp" on the three nouns, chisel scratch for carving |
| s4 | unease | spotlight-sweep-moves | slide-spotlight-pan | demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx | — | phone screen = panel in dark room; thumb scrolls viewer list | sweep STRICTLY linear (eased light = intent); 4-layer edge glow blur30/10/5/1.5 | fan hum loop, thumb taps, 5% low-battery blip |
| s5a1 | re-hook Q | lead-word-zoom-assemble | lead-word-zoom-assemble | demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx | — | headline center-top, static sky behind | transform-origin = first-word-center % + baseline px (measured, never estimated); opacity 0 until measured | hard-cut silence 0.3 gap after "không?" |
| s5a2 | climb | crane-rise-reveal | crane-rise-reveal | demos/opening/crane-rise-reveal/CraneRiseReveal.tsx | motion-blur (fast rise only) | tilt-up along wall as character climbs ladder | motion-blur fast segment only (slow top would smear text); opening-reveal ×1 (with overhead-B noted, different duties) | ladder creaks, spotlight buzz |
| s5b | answer | graze-face-tour | graze-face-tour | demos/camera/graze-face-tour/GrazeFaceTour.tsx | — | glide across alley into ice window; steam/TV flicker | floating element needs shadow + ~1.3× lift light or float is unreadable | running water, distant TV laugh, no look-back |
| s6 | TURN | tension-camera-moves | bullet-time-freeze-orbit (A) | demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx | — | freeze wall beat at cut, orbit 90° THROUGH paper layers (easeInOutCubic 1.2s per script) to thin edge | dual clock: content frozen visibly, camera on real f; smooth stop/start (8f ramps). CONSCIOUS deviation: card says >70° = paper-thin failure; here edge-on thinness IS the reveal (wall = one board thick) | wind through gap on reveal, 3× soft cuts on "không" |
| s7a/s7b | H1 contrast | before-after-slider-scrub | before-after-slider-scrub | demos/data/before-after-slider-scrub/BeforeAfterSliderScrub.tsx | — | split AT board edge; scrub locked center (no slide): left 100% lit / right 10%; s7b chalk blink holds FULL ≥0.5s + tail ≥0.35s uncut (E04), jade "cho mình ở" lingers through tail | both halves same layout + same camera (else reads as two pages); chalk room blinks 0.5s then off | tape flutter in wind, half-mute world right |
| s8 | recognition | speed-ramp-freeze | freeze-annotate | demos/rhythm/speed-ramp-freeze/FreezeAnnotateReal.tsx | — | E01 STAGING (4.58s, script wording untouched): TWO inserts only — 05:00 alarm + desk lamp, staged 0–2.5s; 2.5–4.58s = rub (≥0.5s ON "Nó cũng có công") + pick 3.70–4.10 + stand; loose brick visible frame 0 at ladder foot (A18); caption chunk 2 timed to insert boundary | SFX pinned to OUTPUT frames; marker-scribble SFX for annotation; pick readable in last 0.4s | alarm ring, soft hand-on-brick rub |
| s9a/s9b | H2 climax | aurora-bloom-bg-flip | aurora-bloom-bg-flip | demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx | — | NO aurora colors: cobalt base, ice window is the "blob"; flip = window clicks off, world sinks (0.36s, inOutQuad); E07: foreground hand/brick ≥~40px in wide WITH rim-light (cold top/left edge from sign); sign stays blazing into the dark | flip 0.57→0.64 (~0.36s) or it becomes a dissolve, not a beat; white-melt layer must zero in dark; bg via JS mix (no CSS transition, seek-safe) | switch "tách", bulb hum only, 0.7 gap + 1.0 silence |
| s10 | H3 release | draw-svg-trace | draw-svg-trace | demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx | — | jade chalk draws room on ground (pathLength=1, dashoffset 1→0, 40f inOut cubic); pen nib visible | nib must lead the line (else it reads as growing border); rx matches subject; content never appears before line closes | soft "cộp" ON "đất" (±0.15f), first distant bird |
| s11 | hold + ? | paper-title-card | paper-title-card | demos/typography/paper-title-card/PaperTitleCard.tsx | — | press-in (delay 4+i·4, 9f, bezier(0.2,0.75,0.3,1), scale 1.28→1, blur 7→0) then TRUE hold to end + 2.0s silence (no fade-out, unlike demo); E12: headline JADE decided; chalk completes 0–1.5s, hat off 0–0.8s, final 2.0s pure silence (no SFX/BGM) | one accent per line ("cho ai?" jade); underline =收束 signal (keep, jade) | wind on paper edges only (staging; silent in mix) |

Whole-frame impacts (R4): crash-zoom s2b + aurora flip s9 = 2/3. Glint/sweep: once in s1 only (Q4).
Hero technique used once: brick-deal ensemble (s3); flip/orbit reveal (s6) is camera, not object — no P4 clash.

## 6. Script-fidelity notes for build (E-gate lessons pre-answered)

- s7/s8: no seating anywhere — character stands / squats / walks; no furniture, no phone call. Nothing to contradict.
- s9a: character SMALL in wide foreground at wall foot, **brick from end of s8 clearly in hand** (A15) — board tile 9 shows person small; final must keep brick readable at 480px width.
- s8: **loose brick pre-placed lying by the ladder foot from the FIRST frame of s8** (A18); hand leaves foundation brick → picks loose brick in last 0.4s → stands. Brick continuity: same brick in s9a/s9b/s10.
- s3: wall top edge STRAIGHT, running bond, no step-terrace (A13); character moves by ladder.
- s5b chip: 0.6–4.8s of shot only, fades before cut, never in s6. s4 "minh hoạ" tag on phone, outside caption zone.
- s5b interior (E03): STANDING back-figure at counter (head high, torso to counter, faceless),
  faucet + ice stream LEFT into basin on the counter line, TV flicker wash upper-left, steam above
  basin, seen through pane mullions (kept off the head); return face-cut (helmet on) unchanged.
- s10 thud anchored to measured timestamp of "đất" (±0.15f), softer than every earlier "cộp".

## 7. Proto (this phase; round 2 updates included)

- `src/xay-doi-minh-hay-chung-minh/proto/`: tokens.ts (+wood/sun), fonts.ts (generated data-URI OFL subsets),
  Headline.tsx (= PaperTitleCard grammar re-skinned), Sweep.tsx (= SlideSpotlightPan grammar re-skinned),
  Caption.tsx, People.tsx + Wall.tsx (original paper-cut art), Paper.tsx (feTurbulence fiber + deckle,
  riso-print-hits grammar), Details.tsx (S2bFace / S5bInterior±chip / S5bFaceReturn / S9aBrick),
  ProtoHook.tsx (s1, 114f), ProtoTurn.tsx (s7a, zero jade), ProtoEnd.tsx (s11),
  BoardFrame.tsx (**16 keys**, one tile each), entryComp.tsx + index.ts (proto-only entry; Root untouched).
- Renders: style-hook f24 (drop beat), cover f0, style-turn f55, style-end f60,
  board 16× tiled 4×4, motion strip = XDM-Hook f0–59 → fps=12 tile 6×4,
  drop-detail = f10–40 (30f) tile 6×5 (overshoot+squash+dust visible),
  details: s2b-face, s5b-interior, s5b-chip (32px), s5b-face, s9a-brick.
- Checks run: `npx tsc --noEmit` clean; all PNGs Read + aesthetic checklist.
- Round-2 craft (user direction: truongthanh minimalism WITHOUT its black/white/orange —
  one subject/frame, big negative space, bigger expressive faces, 1 accent/shot, readable-with-sound-off,
  silence holds; palette/depth stay ours): jointed limbs (elbow/knee discs), short hair when bareheaded
  (never bald; helmet stays on from s3 incl. s5b return-cut), redrawn chair (backrest+seat+legs),
  window mullions + ice rims, faucet + water stream s5b, sweep narrowed to upper-wall band (sign untouched),
  dropY staging amplified for pixel-read (~30px dip, 0.12 squash, 9×16px dust/20f) — final scene-agents
  scale to wall size, grammar (y1>1 overshoot + press) unchanged.

## 8. Motion recipe (for scene-agents)

Easing: entrances `bezier(0.16,1,0.3,1)`; brick settle `bezier(0.3,0,0.25,1.15)` + press 2f;
camera moves `bezier(0.65,0,0.35,1)`; sweeps linear; orbit `easeInOutCubic` 36f; flip
`inOutQuad` 11f; chalk `inOut cubic` 40f; press-in `bezier(0.2,0.75,0.3,1)`.
Dust/shadows lag bodies 2–4f (drag hierarchy). No Date.now/Math.random — hash-seeded only.

## 9. SFX shopping list (SC assets/audio/ — copy at build, log in assets-manifest.md)

paper/ (brick moves, page dust), light/ (sparkle for chalk/sign — NOT ui/ synth tones, S1),
transition (whoosh-big orbit, sweeps), crowd/ (s2b laugh bed), mech/ (switch "tách", alarm),
ambient (fan loop s4, water+TV s5b, wind s11, distant bird s10), impact/ (3 hard + 1 soft "cộp").

## 10. Needed npm deps (director installs at build)

`three` + `@react-three/fiber` + `@remotion/three` — ONLY if a shot takes the PageCam/FlatPanel
route (currently none planned; all proto is 2D DOM). `@remotion/motion-blur` for s3 fast-deal and
s5a2 fast-rise segments (per deck-deal/crane cards). Confirm at task-planner stage; default: just
`@remotion/motion-blur`.

## 11. Root snippet (proposed — video-director adds; durations from voice-report at join)

```tsx
import {XayDoiMinhReel} from './xay-doi-minh-hay-chung-minh/Reel';
import {XDM_TOTAL} from './xay-doi-minh-hay-chung-minh/timeline';
// inside Root:
<Composition id="XayDoiMinhReel" component={XayDoiMinhReel} durationInFrames={XDM_TOTAL} fps={30} width={1080} height={1920} />
```

## 12. Known weaknesses (updated round 2)

1. ~~Flat vector paper~~ → FIXED (D06): feTurbulence fiber overlay (scene + per-brick) + 2px deckle
   misregistration plates + joint discs; visible at 200% and in drop-detail strip.
2. letterspace-materialize rejected for s11 (Vietnamese skeleton paths don't exist); paper-title-card
   press-in + true hold stands.
3. s2b crash-zoom endpoint hi-res face: BUILT (detail-s2b-face, ~520px face, awkward/eyes-down) — D01.
4. ~~8/14 posters unpublished~~ — unchanged (judged via card md + mp4); proto now proves s1 + s7a + s11
   staging AND s2b/s5b/s9a details; s3 deal / s6 orbit / s9 flip / s10 chalk-draw motion still unproven
   until scene build (carried risk, was already in review §Cannot-verify).
5. fonts.ts 386KB base64 proto-only; final MUST move to public/fonts.
6. ~~Sweep whitens sign~~ → FIXED (D11): sweep narrowed to upper-wall band y≈930–1070 (sign at 1130+
   untouched all 24 strip tiles). No deviation to log.
7. Character acting at distance stays simple by design (minimalism direction); expressive close-ups
   live in s2b/s5b detail stills + crash-zoom/face-tour cards at build.

## 13. Join flags (for video-director @ Phase 4)

- J1 (D07): chip rendered + spec'd at Archivo **32px**; content-pack.md says 30px. Ask content-agent
  to sync 30→32 (text unchanged, still ≤28 chars/line). Q11 floor is 32px — 30px would fail QA.
- J2 (D14 → E12 DECIDED): s11 "cho ai?" is **jade** (director decision, self-side system + dawn
  pairing). Content-agent: confirm only, no wording change. Proto + board already render jade.
- J3: dropY staging magnitudes are proto-exaggerated for pixel-read (~30px dip on a 210px fall,
  0.12 squash, 9×16px dust); scene-agents: keep grammar (bezier(0.3,0,0.25,1.15) + 2f press +
  lagged dust), scale dip/squash/dust to final brick size (~8–10% of brick height).
- J4 (E13 build-time checks): multi-chunk caption flips fire on MEASURED word onsets (not estimates);
  verify 210px clear / captions bottom:224 on final pixels; fastest rotation s8 (3 chunks / 4.58s)
  lands chunk 2 on the insert boundary per §5.
- J5 (E14 s4 density): viewer-list UI must read at 480px; "minh hoạ" tag top-right of phone,
  ≥26px `#8B93C9`, clear of caption zone; caption never covers the list.
- Root snippet: NO CHANGE from round 1 (§11 stands).
