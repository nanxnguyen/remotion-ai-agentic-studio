# Fast-lane orchestration — 600-second SLO, zero fake passes

## Clock model

- Wall clock = delivery confirmation timestamp − first active production/preflight timestamp.
- Critical path = longest chain of dependencies; parallel branch durations must NOT be summed.
- Target SLO: `wall_seconds <= 600` from preflight to approved MP4 + mandatory eval/check.
- Realistic only for warmed environment, cached/fast voice route, bounded scene count, ready motion primitives and responsive reviewers. It is **not** a hard timeout or a quality tradeoff.
- Budget has no priority over pipeline evidence and thresholds. Do not call a draft an approved video.

## Executable dependency graph

```text
[0 preflight & duplicate check]
  → [1 research]
  → [2 brief/script + voice direction + Gate A]
  → ┌──────────── [3 content + content review] ────────┐
    ├──────────── [3 voice/audio + audio review] ─────┤
    └──────────── [3 design + Gate D] ────────────────┘
  → [4a measured join]
  → [4b motion + motion reviewer]
  → [5 integration Gate E]
  → [6 feasibility Gate B]
  → [7 scene build (parallel disjoint files); combine audio]
  → [8 final render/verify + Gate C]
  → [9 independent QA]
  → [10 eval.md + check + delivery]
```

The original skill allows some **early scaffold** while reviews run; do not start full build before its guards, and do not bypass E/B. Share file ownership and mark director as sole writer of `timeline.ts`, `Reel.tsx`, registration and voice JSON. Motion and review gates remain independent.

## Clock budget — desired, not measured

| Stage bundle | Budget | Optimization lever |
|---|---:|---|
| Phase 0 | 45s | preflight, previously tested environment, duplicate topic scan |
| Phases 1–2 | 90s | profile-specific research, 3 hook candidates, script self-review |
| Phase 3 parallel | 135s | verified asset cache, pre-existing fonts/character kit, simultaneous agents |
| Phases 4–6 | 60s | measured joins, predefined motion recipes, focused reviewers |
| Phase 7 | 135s | reusable scene components, disjoint file ownership, targeted draft |
| Phase 8 | 90s | render configuration already tuned, compute evidence concurrently |
| Phases 9–10 | 45s | machine checks automated, eval timestamps from logs |
| **Total critical budget** | **600s** | requires low waiting and near-zero rework |

Do not report these budgets as measured timings. Recorded phase spans should include overlapping timestamps.

## Modes and routing

- **Fast eligible**: passed preflight, credible small script, voice available, verified assets, available reviewer contexts.
- **Quality-safe slow path**: unsupported/new research, bespoke characters, TTS failures, heavy novel generation, a gate restart; continue correctly and mark `SLA_MISSED`.
- **Blocked**: missing credentials, forbidden/unclear rights, no usable voice route, failed hard blocker with no available repair; set stage blocked/failed using authoritative pipeline, write HANDOFF and exact next step.

## Cost-control tactics

1. Check `docs/*/eval.md` for comparable profile, voice route, scene complexity and learned fixes **before estimating**; never blindly copy stale eval improvements.
2. Reuse a prior approved video **component**, not its final media fingerprint. Asset hashes, source, licence, type and compatibility must remain valid.
3. Parallelize review evidence generation that has no dependency; keep actual reviews after evidence exists.
4. Cache self-contained outputs keyed by input hash + model/provider/version/options and voice rights status. A changed source invalidates dependent cached evidence.
5. Make an early low-cost still at frame 0/hook/transition/climax/ending; full final render runs after review prerequisites.
6. Track critical-path vs setup debt (`venv`, download, browser, rate-limit), not only total time. `eval.md` must be evidence-based.
7. Optional expensive aesthetics are the first scope lever; mandatory final validation is never a lever.

## Evaluation protocol (for benchmarks, not an individual run)

Choose 10–20 representative briefs across profiles and voices; warm and cold run separately. Save `wall_seconds`, phase durations, latency per model, number of asset calls, reviewer rounds, retry reasons, `C_score`, `qa_pass`, `SLA_hit`, manual rework count, and costs. Publish P50/P95 only from this dataset. Reject a "fast" variant that drops hard-blocker detection or reviewer independence.
