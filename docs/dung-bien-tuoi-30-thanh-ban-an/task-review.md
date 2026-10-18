# Task review — dung-bien-tuoi-30-thanh-ban-an

Phase 6 task plan, refreshed after Gate E hard-cap disposition and current voice/timeline/mix integration.

## Gate and status constraint

Gate E Round 3 is recorded as `6.8/10`, verdict `revise`, with an explicit hard-cap override and accepted-risk carry-forward. Gate B remains a separate review barrier; this document does not convert the Gate E override into a clean pass:

- Gate E **must pass before Gate B is reviewed or build is declared**.
- Gate B must pass before production build work is accepted as complete.
- The current `timeline.ts` and scene files are production build inputs pending Gate B approval; all 16 scenes are substantive and type-check.
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

1. Carry the accepted E-003/E-004/E-005 risks explicitly: current voice clips were regenerated and remeasured, s1 exposes a 0.15s contract with a 5-frame conservative quantization, and s8 caption boundaries remain documented pending a voice-pause measurement.
2. Resolve E-001/E-006/E-007 through the design/scene owners: replace all production placeholders; make s4b, s7a/s7b, s8, s9a/s9b action-readable; correct s9b to `Dạo này, bạn sống có vui không?`.
3. After the fixes, rerun the independent Gate D/audio reviews as required by `integration-review.md`, then rerun Gate E. No Gate B/build declaration is valid before this pass.
4. The director has exposed the accepted shared proto primitives through video-owned `kit.tsx`/`motion.ts` facades and created `workbench.ts` + `workbench-keys.ts`; scenes retain their reviewed `proto/` imports for this build revision.
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
| Current production scene readiness | READY FOR GATE B | `Scene01.tsx`–`Scene16.tsx` contain substantive frame-driven visuals; `npx tsc --noEmit` passes |
| Gate E / Gate B readiness | GATE B REVIEW REQUIRED | Gate E is hard-cap override with accepted risks; current task packet must be independently re-reviewed before build completion |

## Risks and acceptance checks

- Voice risk: 9/16 clips have documented ASR/CER issues. Do not accept the current takes merely because files probe successfully; canonical words and measured durations must be reverified.
- Timing risk: s1 lead-in and s8 internal pause are unresolved. Any change shifts downstream frames and SFX offsets.
- Visual risk: the current scenes are placeholders, and the prior storyboard review carried action-readability issues. Each scene agent must prove character + action + prop/location at full and thumbnail size.
- Audio risk: source cue proofs exist, but integrated loudness, ducking, true peak, and final near-silence are not yet measured. These remain render evidence requirements.
- Licensing risk: use only the manifest-listed original BGM and vendored Mixkit SFX; do not add unlicensed media or generated MP4s to Git.

Acceptance before Gate B review: E-001…E-008 are closed or formally resolved by the owning review loop, Gate E is passed by the independent integration reviewer, all 16 scenes contain real visual content, the frame table reflects final measured voice, shared files are integrated by the director, and the tool checks above are rerun on the resulting tree. The reviewer must append all rounds and fix tickets below this plan; the producer must not self-review.

## Round 1 — independent Gate B task review

Reviewed 2026-10-18 as a clean-context, review-only task review. Inputs: this task plan, `join-notes.md`, `integration-review.md` through Gate E Round 3, the current `Scene01.tsx`–`Scene16.tsx`, `Reel.tsx`, `timeline.ts`, `index.ts`, `src/videos/registry.ts`, the core video-definition contract, and the workflow/rules. No source file, `status.json`, or pipeline state was edited. No `pipeline.py review`, `gate`, or `override` command was run.

### Verdict

**score: 4.8/10 — verdict: REVISE**

Gate B **does not pass**. The task plan has a usable ownership split and the current runtime has 16 substantive scene files, but the plan is not yet an approval-ready build packet: Gate E Round 3 is `6.8/10 — REVISE` with open Cao/Trung tickets, the task evidence contains stale contradictions, the final timing/audio contract is still invalidated, and no build/render/QA evidence exists. Per workflow, Gate B remains blocked until Gate E is independently passed and the affected dependencies are recalculated.

### Review rubric

| Area | Score | Finding |
|---|---:|---|
| Ownership and handoff | 7.0 | Scene ownership is disjoint and clearly assigned as 4 files per scene agent; director owns shared timeline/Reel/voice/registry integration; audio ownership is separated. However the plan's required shared `lib/`, `kit.tsx`, and `workbench.ts` handoff is not present in the current video directory, so the declared precondition is incomplete. |
| Scene coverage 16/16 | 8.0 | `Reel.tsx` imports and maps `Scene01`–`Scene16`, and the current files contain substantive frame-driven visuals; placeholder scan found no `Scene NN`, `TODO`, or `PROPOSED_FRAMES` in the scene directory. This closes the original coverage shape, but not downstream full-frame/thumbnail acceptance. |
| Frame ranges and timeline | 5.0 | Runtime `timeline.ts` matches the listed sequential ranges: `0–77, 77–184, 184–322, 322–389, 389–499, 499–578, 578–641, 641–726, 726–842, 842–944, 944–1051, 1051–1112, 1112–1245, 1245–1355, 1355–1424, 1424–1553`; total is 1553 frames / 51.7667s. The table is still based on the unresolved 5-frame s1 approximation and hard-coded s8 boundaries, so E-004/E-005 invalidate the plan before approval. |
| Audio integration dependencies | 3.5 | Track inventory and relative cues exist in `Reel.tsx`, but Gate E Round 3 measured `-21.8 LUFS`, only 7/16 ASR-clean clips, no accepted exact s1 lead-in contract, no voice-measured s8 boundaries, and no integrated duck/gap/true-peak/ending proof. These are open Cao/Trung dependencies, not task-plan-only risks. |
| Build/render/QA checklist | 3.0 | The plan names the required checks and downstream ownership, but there is no Gate B-approved build packet, no final render fingerprint, no `final-check.md`/`render-evidence.md`/`video-review.md`, and no final `qa-report.md`. Existing stills are partial scene evidence and cannot substitute for the required post-build render and QA chain. |
| Contract and risk carry | 6.0 | `index.ts` and the registry preserve `DungBienTuoi30ThanhBanAnReel`, 1080×1920, 30fps, and timeline-derived duration; `npx tsc --noEmit` passes. Gate D's hard-cap override and audio hard-cap accepted-risk are recorded and carried, but neither waives Gate E/B thresholds. The current Gate E report explicitly keeps E-002/E-003/E-004/E-005/E-008/E-009 open. |

### Direct checks

- Scene coverage: **PASS at source inventory level, 16/16**; all 16 scene files exist, are imported by `Reel.tsx`, and contain `useCurrentFrame()`-driven rendering. No placeholder/TODO marker was found in the scene files.
- Runtime frame plan: **PASS for current draft consistency**; `timeline.ts` produces the exact 16 sequential ranges listed above and `index.ts` derives composition duration from `timeline.totalDurationInFrames`.
- Registry/composition contract: **PASS**; the video manifest uses `defineVideo`, preserves the requested composition ID, slug, 30fps, 1080×1920 dimensions, and is registered through `src/videos/registry.ts`; no direct `Root.tsx` registration was found.
- Type check: **PASS**; `npx tsc --noEmit` completed successfully.
- Task evidence freshness: **FAIL**; the plan's own tool-check and risk sections still say the 16 production scenes are placeholders, contradicting the current source. This must be reconciled before a later Gate B review can rely on the packet.
- Shared implementation dependency: **BLOCKED**; the plan requires video-owned shared helpers plus `kit.tsx`/`workbench.ts` before scene handoff, but the current video directory contains only `proto/` helpers and the scene files; no production `lib/`, `kit.tsx`, or `workbench.ts` was verified.
- Pipeline audit: **FAIL (exit 1)** due the pre-existing Gate A report path defect: `docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing`. This review did not alter status or repair the defect.

### Gate B blocker tickets

| ID | Severity | Finding | Required resolution | Owner |
|---|---|---|---|---|
| B-001 | Cao | Gate E Round 3 is `6.8/10 — REVISE`; E-002, E-003, E-004, E-005, E-008, and E-009 remain open. | Close the owning E tickets, rerun required branch reviews, and obtain an independent Gate E pass at ≥9 with no open Cao/Trung ticket before rerunning Gate B. | video-director + owning branch agents |
| B-002 | Cao | The task packet's current frame/audio contract is not stable: s1 lead-in is 5 frames rather than the specified 0.150s contract, and s8 caption boundaries are not voice-measured. | Recalculate `voice-durations.ts`, `join-notes.md`, `timeline.ts`, SFX offsets, scene frame rows, and Reel placement after E-004/E-005 resolution. | video-director + voice/audio/content agents |
| B-003 | Cao | Integrated audio is not accepted: preview is −21.8 LUFS, ASR is 7/16, and required windowed mix/true-peak/ending evidence is absent. | Regenerate or formally resolve the failing voice keys, produce the accepted integrated mix proof, and rerun audio and Gate E reviews. | voice-agent + audio-agent + video-director |
| B-004 | Trung | Task evidence is stale/inconsistent and shared production helper dependency is unfulfilled. | Update the plan's evidence to current 16-scene reality and complete or explicitly revise the `lib/kit/workbench` handoff before the next Gate B review. | video-director |
| B-005 | Trung | Build/render/QA checklist has no approval evidence yet. | After Gate B passes, complete build, render, Gate C, and final QA in order; attach the required render/final-check/video-review/qa artifacts. | scene agents + render-agent + video-reviewer + qa-agent |

### Accepted-risk carry-forward

- Gate D's recorded hard-cap override is carried as an explicit accepted risk; it is not silently converted to a pass and must be reconsidered if production scenes materially diverge from the reviewed board.
- Audio's hard-cap accepted-risk is also carried, but Gate E Round 3 correctly treats the unresolved heard-track/mix defects as open blockers. Accepted-risk does not authorize Gate B or build.
- The Gate A audit path defect is recorded as pre-existing and outside this review-only scope; it remains a pipeline/audit defect that the director must resolve or document in `HANDOFF.md` before delivery.

### Required disposition

Keep Gate B at **REVISE / blocked**. Do not mark `build` done and do not render the final output from this packet. The next valid sequence is: resolve E tickets → rerun branch reviews as invalidated → pass Gate E independently → refresh task evidence and dependencies → rerun this Gate B review → only then build, render, Gate C, and final QA. This review intentionally did not mutate source or pipeline status.
