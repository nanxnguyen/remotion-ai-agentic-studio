# Fast video skill and local API regression report

Date: 2026-10-21. Scope: `ray-video-10-phut`, voice evidence validation, and local monitor HTTP contracts. No video assets or production gate records were changed.

## Reproduce

Use Python 3.12+ and Node 22 (repository baseline):

```bash
python3 .claude/skills/ray-video-10-phut/scripts/validate_skill.py
python3 -m unittest discover -s .claude/skills/ray-video-10-phut/scripts -p 'test_*.py'
python3 -m unittest discover -s tests -p test_fast_video_api.py
python3 -m unittest discover -s tests -p test_terminal_api.py
python3 -m unittest scripts.test_voice_catalog scripts.test_voice_cache scripts.test_voice_performance
python3 -m unittest discover -s tests -p test_voice_performance_handoff.py
npm run verify
```

The HTTP suite uses a real loopback server and real HTTP connections. Status data is a fixed 200-video fixture; writes use an isolated temporary docs directory. It does not execute paid agents or call remote TTS APIs.

## Focused results

| Suite | Result |
|---|---|
| Skill structure, installer, voice evidence | 22 tests pass |
| Local status/meta/gate/listening HTTP | 7 tests pass |
| Existing terminal HTTP integration | 5 tests pass |
| Existing voice catalog/cache/performance | 18 tests pass |
| Existing voice-performance handoff | 3 tests pass |
| TypeScript typecheck | Pass |
| Vitest with Node test file excluded | 96 tests pass |
| Node monitor status tests | 13 tests pass |
| ESLint | Pass |

New negative coverage includes 300 deterministic malformed nested inputs, numeric overflow, NaN/infinity, booleans masquerading as numbers, malformed JSON, unknown/wrong speaker/voice, picture coverage, caption timing boundaries, duplicate/overlapping dialogue, unheard or failed acting reviews, stale fingerprints and changed/missing actual output files. Hash checks verify file identity only; fixture output bytes are deliberately not presented as decodable media.

## Bugs found and fixed

- `/api/gate` previously disconnected on `video: []` because set membership raised `TypeError`. It now returns JSON HTTP 400, without saving state.
- Voice IDs previously accepted non-string values and whitespace-only IDs. Reject them.
- Huge integers previously caused overflow during finite-number checks. Reject numeric metadata beyond the JavaScript-safe integer magnitude, and reject non-finite values.
- A shot's visible speaker list previously accepted unknown roles. Require known speaker references.
- Declared MP4 hashes alone did not check the actual output file. `validate_voice_sync.py ... --mp4 <path>` now hashes the actual bytes and rejects missing, empty or replaced output.

## Local performance observations

- HTTP fixture: 40 GET `/api/status` requests, four concurrent clients, 200 fixture videos. One run: P50 6.09 ms, P95 9.30 ms. Other observed P95 samples were 9.90–13.64 ms.
- Voice evidence validation: five passes over 1,000 utterances in 0.0239 seconds in one run.
- Regression tests use a generous five-second responsiveness bound to catch gross stalls; these observations are not production SLAs.
- Environment: Linux container, Python 3.12, Node 24.19.0. npm warned that the repository expects Node 22. Recheck on the target Node 22 production host.

These measurements exclude network TTS, ASR/model loading, real status artifact scanning, Remotion rendering and final media QA. They cannot establish ten-minute video production throughput or provider uptime.

## Repository-wide blockers resolved

After the follow-up fixes, `npm run verify` exits 0: ESLint, Prettier, TypeScript, asset validation, 13 Node status tests, 96 Vitest tests, 124 pipeline/monitor/catalog tests and 12 publisher tests pass. The expanded pipeline/monitor/voice run passes all 141 tests. The full `tests/` discovery passes 60 tests, including HTTP, terminal, cloud monitor, runtime orchestration, publisher and isolated handoff contracts.

- Restore `advance` as a wrapper around the existing validated review, gate query and agent completion commands. Invalid reviewer-agent IDs and failed reviews do not mark an agent complete.
- Restore isolated `render --draft --scale` previews. They neither overwrite the final MP4 nor change stage/review state. Invalid scales and renderer failure have explicit regression tests.
- Run an audit after `set ... done`; `--strict-audit` returns failure on audit errors after preserving the truthful stage update.
- Add clip-vs-shot overflow checks for the supported literal `shot(id, VOICE_SECONDS.key, hold)` 30fps timeline form. Dynamic TypeScript is not evaluated or certified by this check.
- Mock executable discovery in the OpenCode command-construction test, while retaining separate tests that reject unavailable CLIs.
- Launch the Node-only monitor tests with `node --test`, then run Vitest with that file excluded. No suite is silently dropped.
- Apply Prettier to the 46 previously failing files; changes to video source are formatting only.
- Isolate pending-handoff tests from a completed production video using a temporary fixture; retain explicit rejection tests for generated voice, enabled publishing and reordered shots. Production video status is unchanged.
- Align stale terminal tests with the existing bare OpenCode interactive launcher. Replace the obsolete input-guard string expectation with a Node execution test: inactive sessions reject input, running sessions preserve Vietnamese input and flush immediately.

The original six pipeline failures were first reproduced in an isolated pre-change worktree. Their tests now pass, along with three added CLI edge cases. No gate thresholds were lowered and no failing tests were skipped.

## Quality limits

No live TTS provider benchmark, ASR inference, new MP4 render, human listening test or platform retention analysis was performed. Machine tests protect declared data and actual file identity; they cannot prove natural acting, emotional credibility, correct waveform contents or script completeness. Existing canonical-script comparison, final media verification and independent viewing/listening remain required. Do not mark the full repository or video production SLA as passing based on these focused tests.
