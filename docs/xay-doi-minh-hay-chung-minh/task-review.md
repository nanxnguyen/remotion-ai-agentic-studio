# Task review — xay-doi-minh-hay-chung-minh (gate B, Phase 6 — Fix-loop Round 1)

## Round 1

Scope: `task-plan.md` (FINAL, E 9.0) vs `join-notes.md`, `integration-review.md` Round 2,
`design-spec.md` §5/§11, `mix-plan.md` + `assets-manifest.md`, `proto/` file list,
`src/videos/registry.ts` + `truong-thanh/index.ts` pattern, `src/Root.tsx`.

### Toolchain (actually re-checked, not copied from plan)

- `ffmpeg 9.0.1` OK · `ffprobe 9.0.1` OK · `tsc 5.9.3` OK · `node v22.22.3` OK.
- Voice clips 16/16 `s*.mp3` + `bgm.mp3` + 8 SFX present in
  `public/audio/xay-doi-minh-hay-chung-minh/` — matches manifest cue table.
- Card demos 14/14 TSX exist under `skills/video-shotcraft/`.
- `XayDoiMinhReel`: 0 hits in `registry.ts` / `Root.tsx` — unique, safe to add.
- `@remotion/motion-blur` MISSING — plan discloses it with owner (director installs
  at build, s3 + s5a2 fast segs). Acceptable: flagged, owned, non-blocking.
- Fonts: `public/fonts/` holds BeVietnamPro/Lexend/Inter sets; Archivo + Bricolage
  LA+LE+VN not yet moved there — plan assigns this to director step 1 (final build
  moves off data-URI to `staticFile`). Planned work, not a gap.

### Ownership — one file, one worker

- Director owns: `index.ts` (manifest) · `timeline.ts` (`XDM_TOTAL = 1776`) ·
  `kit.tsx` · `Reel.tsx` (BGM offset +3.0s, E09 hum −24dB) · `registry.ts` (+Root via
  registry, Root.tsx untouched) · `workbench.ts` · `lib/Polish.tsx` + `lib/fonts/`
  copy · motion-blur install. `voice.json` read-only, byte-exact since gate A.
- 5 scene agents own disjoint files only: A `ScenesA.tsx` (s1/s2a/s2b) ·
  B `ScenesB.tsx` (s3/s4) · C `ScenesC.tsx` (s5a1/s5a2/s5b/s6) ·
  D `ScenesD.tsx` (s7a/s7b/s8) · E `ScenesE.tsx` (s9a/s9b/s10/s11).
  No two workers share a file. Proto (`src/xay-doi-minh-hay-chung-minh/proto/`,
  16 files) is scaffold base; scene-agents adapt proto grammar only.

### Per-scene inputs/outputs/still-checks

Every agent row has keys + frame range + E-folded brief + named exports +
dedicated still checks (3/shot + boundaries; A also frame0 cover). Global checks:
diacritics every still, 210px clear / caption `bottom: 224`, accents ≤2/key.

### E-ticket fold-in (E02/E01/E03/E04 + rest)

- E02: s6 cuts at shot-relative 1.48/2.26/2.96 = measured "không" onsets,
  orbit 0–1.2s + 0.30s entry kept — matches manifest anchors exactly.
- E01: s8 two inserts only (05:00 + desk lamp, 0–2.5s) + rub ≥0.5s + pick
  3.70–4.10 + stand 2.5–4.58s + loose brick frame 0 — staged, wording untouched.
- E03: s5b interior restaged standing/faucet+stream/basin/flicker/steam,
  chip 32px 0.6–4.8s only, helmet-ON return — all present.
- E04: s7b full blink ≥0.5s + tail ≥0.35s uncut, jade lingers, no stretch.
- E05–E14 folded: gap 0.7 + hold 1.0 + final 2.0s protected; hum-only s9b;
  brick ≥40px + rim-light s9a; thud 2.46 = "đất"; dawn 51.0 ≈ s10 ±0.5;
  s11 jade "cho ai?" (J2 decided); s4 tag ≥26px `#8B93C9` + 480px density check.

### Naming verified

Comp `XayDoiMinhReel` · 1080×1920 30fps · `XDM_TOTAL = 1776` (59.20s) ·
16 keys / 11 shots · profile `story` · voice `hoaimy` · `withBgm` prop —
consistent across plan, join-notes, mix-plan, manifest.

### AGENTS.md boundaries

- Manifest via `defineVideo` + registry-only registration; Root.tsx untouched
  (renders `videoRegistry`). No direct Composition registration.
- Frame-derived motion only; determinism test bans `Date.now`/`Math.random`.
- Tests-first: 6 tests (total/registration/caption-fidelity/safe-zone/
  determinism/verify+visual) written before implementation.
- `npm run verify` + `npm run test:visual` gated before handoff;
  MP4s/previews/secrets out of Git.

### Scaffold vs final-detail split

Clear: step 2 = parallel scaffold (staging/layout/motion from card demos,
proto grammar); step 3 = final detail pass after gate B (chunks, accents ≤2,
J1 32px, J2 jade, J3 dropY ~8–10%). Proto is base, not final pixels.

### Observations (all Thấp, non-blocking)

1. Plan line "Root snippet: design-spec §11 (unchanged)" is misleading — §11
   shows a direct-`<Composition>` snippet, but the plan's own shared-files table
   correctly mandates registry-only wiring. Registry wins per AGENTS.md;
   reword at build to avoid confusion.
2. `design-spec.md` §4 still says re-hook "gap 0.3"; join-notes/plan use trimmed
   0.15 (E10). Plan is correct; spec line is stale.
3. s3/s6/s9/s10 motion unproven until scenes + s4 480px density + 210/224px
   build check + J1/J2 content confirm — all carried as explicit risks, correctly
   non-blocking for a task plan.

### Score / verdict

- Score: **8.5/10** (tools re-verified end-to-end, ownership clean, all E-tickets
  folded with exact numbers, naming/boundaries hold; −1.5 for the §11 wording
  wrinkle + carried motion-unproven risks that only scene build can close).
- Verdict: **pass** (≥8, zero open Cao/Trung; observations are Thấp).
