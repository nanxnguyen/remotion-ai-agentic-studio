# Evidence-driven `eval.md`: improve the next 10-minute run

The original workflow requires `docs/<vid>/eval.md` **before** `pipeline.py check`. Its retro is part of delivery even when SLO missed. Adapt the template but preserve every section required by the current base skill.

## Measurement contract

- Set `wall_seconds = delivered_at - started_at` using real timestamps. If start/end missing: `unknown`, **not** zero or guess.
- Track earliest/last timestamps for each phase. For parallel content/audio/design, record the span as independent intervals; do not sum wall time of parallel agents to claim total duration.
- `critical_path`: longest dependency-constrained series of tasks from known logged times. If not derivable, identify observed **bottleneck candidates** instead of fabricating a precise path.
- `token_cost`: use harness meter if exposed; otherwise rank relative cost sinks. Never invent numbers.
- `cache_hit_rate = verified_hits / eligible_lookups` if both counts known; a cached but unverified artifact is not a hit.
- `gate_rounds`: report actual rounds and any invalidation rework. `SLA_MISSED` can coexist with full quality pass.
- Summarize P50/P95 only across prior **measured** videos with identical inclusion criteria (cold/warm separately).

## Failure tagging

- `setup_debt`: machine/env/download/auth issues.
- `agent_latency`: model waiting, serial inference, slow review.
- `creative_rework`: hook/script/design/motion revision.
- `media_latency`: voice, asset generation, rendering.
- `qa_rework`: fixes and invalidated gates after full build/render.

Every top-cost item should have cause → owner → action for next run → measurable check. A one-time retro can suggest a change to the original policy but **cannot** weaken gate thresholds, reviewer independence, blocker rules or automatically modify upstream workflow policy without required approval.

## Good next-run action examples

- “Use verified voice cache only when voice.json + engine settings hash match; compare ASR again after render.”
- “Prototype title glyphs in first frame before full shot build; route overflow tickets to typography owner.”
- “Generate one scene's hook strip in parallel with content pack, without claiming D/motion passed before evidence.”

Do NOT write “make faster” as the whole improvement, invent a completed gate, or report time savings without a second benchmark run.
