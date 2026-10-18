# Motion workflow implementation: independent code review

Review scope: shared motion adapter/helpers, pinned package manifests, workflow skill/rules/roles, motion pipeline enforcement, and monitor ordering. The reviewer did not author production code. Demo production is still in progress and is outside this review verdict.

## Verdict

No remaining blocking defect found in the reviewed transition adapter or workflow after the pipeline author addressed the findings below. This is a code review, not motion-art direction approval or final video QA.

The adapter compensates outgoing visual tails by the same duration that the official `TransitionSeries` subtracts. Measured shot starts and total duration therefore remain unchanged. Contiguous positive shot spans, known adjacent IDs, unique boundaries, zero-duration cuts and invalid/colliding overlaps are checked. The installed official implementation permits a transition equal to an adjacent sequence duration, consistent with these checks. Audio and captions are explicitly excluded from the visual callback contract. Shared helpers contain no palette or video styling.

## Findings and resolution

| ID | Severity | Evidence | Required acceptance | Status |
| --- | --- | --- | --- | --- |
| CR-01 | High | `motion_inputs` originally scanned `docs/<video>/motion-proto`, whereas the producer owns `src/videos/<video>/motion-proto`. Its original test repeated that wrong path. | Modify actual source prototype after acceptance and require motion/downstream reviews to become stale. | Fixed by pipeline author. Canonical-source drift integration check passes. |
| CR-02 | Medium | Review validity originally checked only previously recorded files; added prototype/caption files and non-MP3 audio cues were not represented. | Detect file additions/deletions and modified WAV/audio cues as well as edits to existing files. | Fixed by pipeline author using a source-set snapshot and expanded audio/source coverage. Integration test checks a newly added prototype file. |
| CR-03 | Medium | Monitor Join originally used `motion.declared`; script invalidation itself creates pending motion, so Join could appear completed before measured Join existed. | Pending motion must not complete Join. Require branch acceptance and measured Join evidence; exercise JavaScript behavior. | Fixed by pipeline author with server `join_ready` and a runtime monitor regression. |

## Nonblocking hardening suggestion

The new motion helpers validate cue spans and fps, but do not consistently reject nonfinite frame/camera arguments. Reproduced `motionProgress(NaN, 30, {from: 0, durationInFrames: 20})` returning approximately `0.00725`, and `panZoomStyle(NaN, ...)` emitting `NaN` CSS. Normal Remotion frame input is finite, so this is not a current rendering defect. Add finite-input tests/guards for the new public helpers if their contract is intended to validate numeric input. Preserve intentional spring overshoot rather than clamping all motion progress.

## Verification evidence

- `npm.cmd test -- --run tests/core/motion-sequence.test.ts`: 12 passed.
- `npm.cmd run typecheck`: passed at review time before demo integration.
- Five focused pipeline tests covering real motion media/input drift, v4/legacy contracts, missing Join evidence, invalidation and explicit upgrade: passed.
- `python3 -m unittest scripts.test_monitor_ui scripts.test_sync_agents`: 16 passed after the Join fix.
- Source inspection of installed `@remotion/transitions@4.0.534` duration checks and official timing functions.
- Package manifest pins transitions and motion-blur at exactly `4.0.534`.

Full repository verification, golden visual comparisons, demo phase gates, playback evidence and final audit remain director responsibilities. No claim here substitutes for those checks.
