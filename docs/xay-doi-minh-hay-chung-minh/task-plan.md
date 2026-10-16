# Task plan — xay-doi-minh-hay-chung-minh (FINAL, gate E passed 9.0 Round 2)

Comp `XayDoiMinhReel` · profile `story` · 9:16 1080×1920 30fps · 16 keys / 11 shots · total **59.20s = 1776f** (HoaiMy measured 51.75s + holds 7.45s, join-notes.md). Voice `hoaimy` (fallback route, Cam NOT authorized). Gate E Round 2 closed E01–E05 with no plan-breaking changes — all folded below.

## Tool checks (re-ran at finalize)
- `ffmpeg 9.0.1` OK · `ffprobe 9.0.1` OK · `npx tsc --noEmit` clean · `remotion 4.0.534` OK.
- Voice clips: 16/16 `s*.mp3` present; BGM + 8 SFX present.
- Fonts: Archivo + Bricolage × (LA+LE+VN) + 2 OFL texts (final build moves to `public/fonts` + `staticFile`, NOT data-URI).
- CompId `XayDoiMinhReel`: 0 hits in `registry.ts`/`Root.tsx` — unique, safe to add via registry only.
- Card demos: 14/14 TSX paths exist.
- ⚠️ `@remotion/motion-blur` **still MISSING** — director installs at build (s3 fast-deal + s5a2 fast-rise).

## Shared files — single owner: video-director (NO two workers on one file)
| file | owner | note |
|---|---|---|
| `src/videos/xay-doi-minh-hay-chung-minh/index.ts` | director | manifest via `defineVideo` (pattern `src/videos/truong-thanh/index.ts`); adapter allowed, do NOT mix visual systems |
| `src/videos/xay-doi-minh-hay-chung-minh/timeline.ts` | director | frame starts below (director finalizes exact frames); `XDM_TOTAL = 1776`; s6 cuts at E02 numbers |
| `src/videos/xay-doi-minh-hay-chung-minh/kit.tsx` | director | tokens + Headline/Caption/Sweep/People/Wall/Paper from proto grammar only |
| `src/videos/xay-doi-minh-hay-chung-minh/Reel.tsx` | director | BGM offset **+3.0s** + mix-plan fade table; s1 hum bed (E09: lift to **−24dB** optional); `bgm` inputProp |
| `src/videos/registry.ts` (+ Root via registry) | director | Root.tsx untouched — renders via `videoRegistry` |
| `docs/.../voice.json` | read-only | byte-exact since gate A; scene-agents never edit |
| `workbench.ts` | director | per workbench §2 reference |
| `lib/Polish.tsx` + `lib/fonts/` | director copies once | before scene dispatch |

Snippets only (director writes):
```tsx
// manifest (mirror truong-thanh/index.ts)
import {defineVideo} from '../../core';
import {XayDoiMinhReel} from './Reel';
import {XDM_TOTAL} from './timeline';
export const xayDoiMinhVideo = defineVideo({ id: 'XayDoiMinhReel', slug: 'xay-doi-minh-hay-chung-minh',
  component: XayDoiMinhReel, durationInFrames: XDM_TOTAL, fps: 30, width: 1080, height: 1920,
  defaultProps: {withBgm: true}, tags: ['story', 'vietnamese'] });
```
Root snippet: design-spec §11 (unchanged).

## Scene split — 5 agents, disjoint files (light mode)
New scenes under `src/videos/xay-doi-minh-hay-chung-minh/scenes/`. Proto already exists as scaffold base — scene-agents adapt proto grammar; **final detail pass (text/captions/audio sync) after gate B**.

| agent | file (sole owner) | keys | scene brief (E-folded) | output |
|---|---|---|---|---|
| A | `scenes/ScenesA.tsx` | s1, s2a, s2b (f0–~337) | s1: spotlight-hero grammar; hum bed 0–3s (no BGM, E09); brick "cộp" f18. s2a: overhead-tabletop Tết. s2b: crash-zoom-punch #1; NO laugh sample (E11: silence stands, wave 0–1.0s + gượng face carry it) | `SceneHook`, `SceneTet`, `SceneSting` |
| B | `scenes/ScenesB.tsx` | s3, s4 | s3: deck-deal + blur (fast segs only); cues 0.41/1.37/2.15/2.85; straight wall top + ladder. s4: linear sweep; UI + "minh hoạ" tag top-right ≥26px `#8B93C9` (E13/E14: clear of caption, density check at 480px) | `SceneBricks`, `ScenePhone` |
| C | `scenes/ScenesC.tsx` | s5a1, s5a2, s5b, s6 | s5a1: re-hook headline @20.69s, hard cut + 0.15 gap (E10). s5a2: crane rise + blur fast-only. s5b: **restaged interior (E03)** — STANDING faceless figure at counter, faucet+stream left, basin line, TV flicker wash upper-left, steam; chip 32px 0.6–4.8s only (J1/E06); return face-cut helmet ON. s6: orbit 90°/36f 0–1.2s, voice entry 0.30s; **cuts at shot-relative 1.48/2.26/2.96 = measured "không" onsets (E02)**; thin-edge done 0.28s before cut 1 | `SceneRehook`, `SceneClimb`, `SceneWindow`, `SceneTurn` |
| D | `scenes/ScenesD.tsx` | s7a, s7b, s8 | s7: split locked center 100/10, zero jade; **s7b HOLD (E04)**: full chalk blink ≥0.5s + tail ≥0.35s uncut, jade "cho mình ở" lingers, no stretch. s8: **E01 staging** — TWO inserts only (05:00 + desk lamp) 0–2.5s; rub ≥0.5s on "Nó cũng có công" + pick 3.70–4.10 + stand in 2.5–4.58s; loose brick frame 0 at ladder foot; chunk 2 timed to insert boundary | `SceneContrast`, `SceneRecognition` |
| E | `scenes/ScenesE.tsx` | s9a, s9b, s10, s11 | s9a: cobalt flip; window-off "tách" @gap 2.30; foreground brick ≥~40px + rim-light (E07); sign blazing. s9b: **E05 accept** — gap 0.7 + hold 1.0 untouched, hum sole sound, BGM −inf, no bleed. s10: thud @2.46 ±0.15 = "đất"; chalk starts ≥2.6; dawn video 51.0 ≈ s10 ±0.5 (E08). s11: jade "cho ai?" (J2 decided); chalk done 0–1.5s, hat off 0–0.8s; push 1.00→1.03 then dead stop; final 2.0s pure silence (E12) | `SceneBlackout`, `SceneBrickDown`, `SceneQuestion` |

Frame starts (director finalizes): s1 f0 · s2a f105 · s2b f237 · s3 f337 · s4 f488 · s5a1 f621 · s5a2 f660 · s5b f748 · s6 f932 · s7a f1058 · s7b f1149 · s8 f1216 · s9a f1354 · s9b f1433 · s10 f1515 · s11 f1659 · end f1776.

## Tests-first (write/update before implementation)
1. Timeline total: `XDM_TOTAL === 1776`, 30fps, 16 keys, monotonic starts.
2. Composition registration: `XayDoiMinhReel` in registry with 1080×1920; no direct Root registration.
3. Caption fidelity: 16/16 content-pack chunks join → `voice.json` text (diff empty); s9a+s9b = mandatory line verbatim.
4. Safe-zone: nothing in bottom 210px; caption `bottom: 224`; lines ≤28 chars; chip only s5b 0.6–4.8s; "minh hoạ" only s4.
5. Determinism: no `Date.now`/`Math.random` in scenes (hash-seed only); frame-derived motion only.
6. `npm run verify` + `npm run test:visual` before handoff; MP4s/previews/secrets out of Git.

## Integration order
1. Director: manifest + timeline (+E02 cuts) + kit + workbench + fonts→public + install motion-blur → `tsc`.
2. 5 agents parallel scaffold (staging/layout/motion from card demos; proto is base).
3. Gate B → final detail pass (chunks, accents ≤2/key, J1 32px, J2 jade, J3 dropY ~8–10% brick height).
4. Director joins → `npm run verify` + `test:visual` before handoff.

## Still-frame checks (3/shot + boundaries; A also frame0)
- A: f0 cover (4-line headline + sign + window + brick); f18 "cộp"+dust; boundary f105/f237/f337; s2b face ~520px; s2a tag "10 năm trước" top-left.
- B: s3 carving + 3 noun bricks + straight top; s4 UI + tag + 480px density; boundaries f488.
- C: s5a1 headline full-frame; s5b interior (standing/basin/faucet/stream/flicker/steam) + chip window + helmet-on return; s6 thin-edge @1.2s + cuts 1.48/2.26/2.96.
- D: s7 split + zero jade + chalk blink; s8 frame0 loose brick + 2 inserts + rub/pick/stand.
- E: s9a brick ≥40px + window-off + blazing sign; s9b full sentence + 1.0s hold; s10 thud/dawn/chalk order; s11 two worlds + jade question + 2.0s silence.
- Global: Vietnamese diacritics every still; 210px clear; accents ≤2/key (sen=proof, jade=self, ice=s9a only).

## Risks (carried, non-blocking)
s3/s6/s9/s10 motion unproven until scenes · s4 density + 210/224px build check · s7b rushed + s9b "tiết" accepted (no regen, edge-tts 403) · hum-only hook tradeoff · J1/J2 content confirm at build.
