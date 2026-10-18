# Task review — dung-bien-tuoi-30-thanh-ban-an

Phase 6 task plan, prepared from the locked brief/script/content/design/audio packet and the current join scaffold. This is an early scaffold plan while Gate E fixes are under review.

## Gate and status constraint

Gate E is not passed. The current integration review is `3.1/10`, verdict `revise`, with E-001 through E-008 still open. Therefore this document is a provisional build plan only:

- Gate E **must pass before Gate B is reviewed or build is declared**.
- Gate B must pass before production build work is accepted as complete.
- The current `timeline.ts` and scene files are scaffold inputs, not production approval.
- Any Gate E change to voice keys, s1 lead-in, s8 split, card staging, or audio integration invalidates the affected rows below and requires the frame/dependency table to be recalculated before Gate B.
- Do not edit shared timeline, Reel, kit, Root, or voice files from scene-agent work.

## Ownership

| Owner | Writable scope | Responsibility | Handoff / acceptance |
|---|---|---|---|
| `video-director` | `src/videos/dung-bien-tuoi-30-thanh-ban-an/timeline.ts`, `kit.tsx`, `Reel.tsx`, `voice.json`, `src/Root.tsx` entry/registry integration, `workbench.ts` | Reconcile Gate E fixes, copy shared proto/lib code, integrate voice/BGM/SFX and scene imports, preserve registry contract | Gate E pass first; then Gate B packet and integration checks |
| `scene-agent-1` | `scenes/Scene01.tsx`–`Scene04.tsx` only | Build s1–s3b hook, verdict, ruler, and overflow beats | Four scenes show the accepted paper world, character/action/prop, captions, and deterministic motion |
| `scene-agent-2` | `scenes/Scene05.tsx`–`Scene08.tsx` only | Build s4a–s5b feast/questions, freeze, and re-hook | Freeze, pen drop, exact mandatory line, and action-readable Tết staging match the accepted packet |
| `scene-agent-3` | `scenes/Scene09.tsx`–`Scene12.tsx` only | Build s6a–s7b unfinished verdict, macro reveal, feed, and screen-off | Macro reveal and phone actions are readable at full size and thumbnail size; no placeholder labels |
| `scene-agent-4` | `scenes/Scene13.tsx`–`Scene16.tsx` only | Build s8–s10 money drain, clearing, climax, and close | Number-free money treatment, exact climax question, yellow close, unattended ruler, and final hold are present |
| `audio-agent` / director integration | No scene files; audio packet and `Reel.tsx` integration only after E/B direction | Apply accepted relative SFX offsets, BGM duck/fade, and voice placement; verify integrated mix | Render evidence meets mix-plan targets; no cue overlaps spoken audio |
| `task-reviewer` | Append review rounds below this plan only | Independent Gate B review | Score >=9/10 and no open Cao/Trung task ticket |

`src/videos/.../scenes/` files are disjoint: no two agents edit the same file. The director remains the sole owner of shared timeline/audio/composition integration.

## Shared inputs and preparation order

1. Resolve E-003/E-004/E-005 first: canonical voice clips, explicit s1 lead-in, and the s8 internal pause or split. Regenerate `voice-durations.ts` and update `join-notes.md`, `timeline.ts`, mix offsets, and any downstream frame rows.
2. Resolve E-001/E-006/E-007 through the design/scene owners: replace all production placeholders; make s4b, s7a/s7b, s8, s9a/s9b action-readable; correct s9b to `Dạo này, bạn sống có vui không?`.
3. After the fixes, rerun the independent Gate D/audio reviews as required by `integration-review.md`, then rerun Gate E. No Gate B/build declaration is valid before this pass.
4. After Gate E passes, the director copies the accepted shared proto primitives into `src/videos/dung-bien-tuoi-30-thanh-ban-an/lib/`, creates/updates `kit.tsx` and `workbench.ts` per the shotcraft workbench guidance, and provides the scene agents with stable exports and measured durations.
5. Scene agents work in parallel on their disjoint scene files. The director then integrates scenes, voice, BGM, SFX, and the registry-backed composition; run the Gate B review on the complete task packet before calling build complete.

The edit is intentionally **not beat-synced**. `docs/dung-bien-tuoi-30-thanh-ban-an/analysis/no-beat-sync.md` is authoritative: shot boundaries, holds, SFX, and motion are voice/frame-led; no `beatF(n)` or `beat_data.json` dependency is planned.

## Card/demo and asset copy map

The design spec validates 16/16 card/style/poster/demo lookups, with 14 unique demo TSX paths. Before scene work, the director copies only the required reusable helpers and `_fixtures`/`assets/lib` implementations into the video-owned `src/videos/dung-bien-tuoi-30-thanh-ban-an/lib/`; scene agents consume those exports rather than importing from a mutable shared demo tree.

| Shot | Card / style key | Exact demo TSX | Required video-owned helpers |
|---|---|---|---|
| s1 | `paper-title-card` / `paper-title-card` | `skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx` | `Ruler`, `Headline`, `GridPaper` |
| s2 | `word-relay-filmstrip` / `word-relay-filmstrip` | `skills/video-shotcraft/demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx` | `RedPenLines`, `Headline` |
| s3a | `outline-word-fill` / `outline-word-fill` | `skills/video-shotcraft/demos/typography/outline-word-fill/OutlineWordFill.tsx` | `Ruler`, `Handwrite` |
| s3b | `list-reveal` / `list-reveal` | `skills/video-shotcraft/demos/ui-entrance/list-reveal/ListReveal.tsx` | `PaperStack`, `PencilChar` |
| s4a | `card-stack` / `card-stack` | `skills/video-shotcraft/demos/ui-entrance/card-stack/CardStack.tsx` | `Feast`, `Steam`, `PencilChar` |
| s4b | `circle-match-iris` / `circle-match-iris` | `skills/video-shotcraft/demos/transition/circle-match-iris/CircleMatchIris.tsx` | `Feast`, `QuestionBurst`, `PencilChar` |
| s5a | `fracture` / `fracture` | `skills/video-shotcraft/demos/opening/fracture/Fracture.tsx` | `PencilChar`, `RedPenLines` |
| s5b | `glitch-cycle` / `glitch-cycle` | `skills/video-shotcraft/demos/typography/glitch-cycle/GlitchCycle.tsx` | `PenDrop`, `QuestionMark`, `LampGlow` |
| s6a | `paper-title-card` / `paper-title-card` | `skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx` | `RedScribble`, `PencilChar` |
| s6b | `blur-slide` / `blur-slide` | `skills/video-shotcraft/demos/typography/blur-slide/BlurSlide.tsx` | `MacroZoom`, `GraphiteLine` |
| s7a | `radial-ripple-phone-chips` / `radial-ripple-phone-chips` | `skills/video-shotcraft/demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx` | `PhoneMock`, `PencilChar`, `MinhHoa` |
| s7b | `chip-grid-single-select-blackout` / `chip-grid-single-select-blackout` | `skills/video-shotcraft/demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx` | `PhoneMock`, `PencilChar`, `Handwrite` |
| s8 | `bezier-source-converge-merge` / `bezier-source-converge-merge` | `skills/video-shotcraft/demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx` | `MoneyArrows`, `Highlighter`, `PencilChar` |
| s9a | `ui-strip-away-outro` / `ui-strip-away-outro` | `skills/video-shotcraft/demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx` | `Feast`, `PencilChar`, `GridPaper` |
| s9b | `outline-word-fill` / `outline-word-fill` | `skills/video-shotcraft/demos/typography/outline-word-fill/OutlineWordFill.tsx` | `Handwrite`, `PencilChar`, `LampGlow`, `HILITE` |
| s10 | `spotlight-hero-card` / `spotlight-hero-card` | `skills/video-shotcraft/demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx` | `Highlighter`, `Ruler`, `PencilChar` |

Required shared visual locks: paper/grid surface, graphite character with an active pose in every shot, thin red measuring marks, yellow agency marks only from s8 onward, caption safe zone `bottom: 224`, and no resemblance to the forbidden prior-video systems in `design-spec.md`.

## Scene split and frame plan

Current join draft: 30 fps, 1553 total frames, 51.7667 s. Each row uses the current measured `VOICE_SECONDS`, current post-voice hold, and frame-quantized `from`/`end` from `join-notes.md`. Motion must be derived from `useCurrentFrame()`/local frame, not wall-clock time or unseeded randomness.

| Agent / file | Shot | Voice span | Current frames | Hold | Motion/action and still checks | Audio cue |
|---|---|---:|---:|---:|---|---|
| 1 / Scene01 | s1 | 2.160s | 0–77 | 0.400s | Cover from frame 0: ruler, circled 30, character lower-left; circle reveal 0–66f. Check 0, 33, 71, 76. | Pencil write at local 71f/5f; s1 0.15s lead-in remains an E-004 blocker and must be re-anchored |
| 1 / Scene02 | s2 | 3.327s | 77–184 | 0.250s | Three red verdict lines, character looking toward writing; relay and 15f rest. Check 77, 130, 177, 183. | Pencil write local 101f/6f |
| 1 / Scene03 | s3a | 4.298s | 184–322 | 0.300s | Ruler ticks 18/22/25/30, spoken tick reveals; check fast tick boundaries. Check 184, 230, 300, 315, 321. | Paper slide local 130f/7f |
| 1 / Scene04 | s3b | 1.975s | 322–389 | 0.250s | Lists extend past portrait crop; second sheet pushes ruler. Check 322, 350, 382, 388. | Paper slide local 61f/5f |
| 2 / Scene05 | s4a | 3.381s | 389–499 | 0.300s | Overhead feast, steam and active seated character; spring settle. Check 389, 440, 492, 498. | Plate slide local 103f/7f |
| 2 / Scene06 | s4b | 2.348s | 499–578 | 0.300s | Freeze chopsticks, temple reaction, three question bursts; check freeze at 499, arrivals near 525/545/565, 577. | No listed SFX; preserve question-dense timing |
| 2 / Scene07 | s5a | 1.661s | 578–641 | 0.450s | Hard freeze/re-hook: blank grid, red lines, suspended pen; 0.4s freeze. Check 578, 590, 625, 640. | Room cut/tail handled in mix; exact mandatory v1 text |
| 2 / Scene08 | s5b | 2.498s | 641–726 | 0.350s | Pen fall 16f, impact 6f, red question mark, lamp contraction; check 641, 657, 680, 725. | Pen drop local 76f/9f |
| 3 / Scene09 | s6a | 3.476s | 726–842 | 0.400s | Character stands on 30; red `thất bại` stops before final stroke. Check 726, 780, 830, 841. | No listed SFX |
| 3 / Scene10 | s6b | 3.087s | 842–944 | 0.300s | Macro push for hand-drawn 30, graphite edge, eraser crumbs; 1.1s zoom and 18f hold. Check 842, 875, 910, 943. | Macro zoom local 94f/7f |
| 3 / Scene11 | s7a | 3.266s | 944–1051 | 0.300s | Phone x=390, face light, thumb scroll through three abstract cards, `minh hoạ`. Check 944, 980, 1035, 1050. | Feed swipe local 99f/7f |
| 3 / Scene12 | s7b | 1.749s | 1051–1112 | 0.300s | Phone screen turns off via one dark sweep; character remains readable in isolation. Check 1051, 1070, 1105, 1111. | No listed SFX |
| 4 / Scene13 | s8 | 4.130s | 1112–1245 | 0.300s | Number-free salary bar, four arrows depart with 22f stagger; caption chunks require E-005 pause decision. Check 1112, 1160, 1220, 1244. | Notify local 125f/3f and 129f/3f |
| 4 / Scene14 | s9a | 2.976s | 1245–1355 | 0.700s | Marks/feed/props retract outward to blank paper; actor remains. Check 1245, 1290, 1345, 1354. | Paper wind local 91f/19f |
| 4 / Scene15 | s9b | 1.910s | 1355–1424 | 0.400s | Warm lamp, hug-knees character, exact handwritten `Dạo này, bạn sống có vui không?`, yellow underline; sweep 18f then 12f silence. Check 1355, 1390, 1415, 1423. | No SFX by design |
| 4 / Scene16 | s10 | 1.898s | 1424–1553 | 2.400s | Yellow closing sweep 18f, push 1.00→1.03, unattended ruler, 72f quiet hold and paper edge. Check 1424, 1460, 1490, 1552. | Paper wind local 58f/48f; BGM fade and near-silence must be render-verified |

Frame plan caveats: the current s1 range does not encode the required 0.15s pre-roll, and s8 may become s8a/s8b. These are not to be papered over in scenes; the director must recalculate all affected ranges after the owning Gate E fixes.

## Dependencies and parallelism

### Blocking dependencies

- Gate E fixes E-003/E-004/E-005 block stable frame/audio contracts.
- Gate E fixes E-001/E-006/E-007 block visual acceptance for the scene agents.
- Gate E pass blocks Gate B/build declaration.
- Gate B pass blocks treating the scaffold as an approved build.
- `Reel.tsx` audio integration depends on final voice keys/durations and the accepted mix-plan offsets.
- `workbench.ts`, shared kit exports, and copied lib helpers must exist before scene agents import them.
- Final render/QA depends on all scene files, director integration, and the updated timeline.

### Parallel work after the blockers are cleared

- Scene agents 1–4 can build in parallel because their files and shot ranges are disjoint.
- Demo/lib copy and workbench preparation can run in parallel with scene implementation only if exported names and interfaces are frozen first.
- Audio integration and scene implementation can proceed in parallel in separate ownership scopes, but the director must merge only after voice/timeline decisions are final.
- Gate D/audio re-review, then Gate E, then Gate B are sequential gates; none may be skipped, merged, or declared in prose.

## Tool checks actually run

Run from `/Users/nguyenanhnhut/Desktop/Projects/AI-video-edition` on 2026-10-18:

| Check | Result | Evidence / limitation |
|---|---|---|
| Every unique demo path in the 16-row card table | PASS, 14/14 unique paths | All exact TSX paths in `design-spec.md` exist and are non-empty; s1/s6a and s3a/s9b intentionally reuse demos |
| `ffprobe` every current MP3 | PASS, 25/25 | Voice clips, BGM, and all delivered SFX under `public/audio/dung-bien-tuoi-30-thanh-ban-an/` probe successfully |
| Audio asset existence | PASS | Manifested BGM, 16 voice clips, and 8 SFX files exist and are non-empty |
| Font file/reference check | PASS at file/reference level | Proto `@font-face` references resolve to existing `public/fonts` files; VN-safe fallbacks are `Literata`, `Be Vietnam Pro`, and `Lora`. A browser glyph screenshot is still a build/visual check, not claimed here |
| CompId uniqueness / registry path | PASS | `DungBienTuoi30ThanhBanAnReel` is defined in the video index and consumed through `src/videos/registry.ts`; `Root.tsx` maps the registry and has no direct video registration |
| `npx tsc --noEmit` | PASS | Current tree type-checks with no output |
| Beat-sync dependency | PASS / not applicable | `analysis/no-beat-sync.md` confirms no beat grid is consumed |
| Current production scene readiness | BLOCKED | `Scene01.tsx`–`Scene16.tsx` still render placeholder `Scene NN`; this is the primary E-001/build dependency |
| Gate E / Gate B readiness | BLOCKED | Integration review is 3.1 revise; `status.json` reports `review_valid.E=false` and `review_valid.B=false` |

## Risks and acceptance checks

- Voice risk: 9/16 clips have documented ASR/CER issues. Do not accept the current takes merely because files probe successfully; canonical words and measured durations must be reverified.
- Timing risk: s1 lead-in and s8 internal pause are unresolved. Any change shifts downstream frames and SFX offsets.
- Visual risk: the current scenes are placeholders, and the prior storyboard review carried action-readability issues. Each scene agent must prove character + action + prop/location at full and thumbnail size.
- Audio risk: source cue proofs exist, but integrated loudness, ducking, true peak, and final near-silence are not yet measured. These remain render evidence requirements.
- Licensing risk: use only the manifest-listed original BGM and vendored Mixkit SFX; do not add unlicensed media or generated MP4s to Git.

Acceptance before Gate B review: E-001…E-008 are closed or formally resolved by the owning review loop, Gate E is passed by the independent integration reviewer, all 16 scenes contain real visual content, the frame table reflects final measured voice, shared files are integrated by the director, and the tool checks above are rerun on the resulting tree. The reviewer must append all rounds and fix tickets below this plan; the producer must not self-review.
