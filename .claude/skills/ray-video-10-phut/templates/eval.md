# Production Evaluation — <vid>

> Write to `docs/<vid>/eval.md` according to the current base skill's mandatory format; **never invent measurements or gates**.

## 1. Scope
- Video ID / composition / profile:
- Voice slug / engine / usage authorization basis:
- Output MP4 / SHA or fingerprint:
- Duration, dimensions, fps:
- Independent gate scores A, Content, Audio, D, Motion, E, B, C:
- Final QA / listen record (pending or confirmed):

## 2. Where time went
- Started at (actual):
- Delivered at (actual):
- Wall seconds (actual or unknown):
- Target: 600s
- SLA: HIT | MISSED | NOT_MEASURED
- Setup/tooling debt as % of time (if measurable):

| Rank | Phase / task | Started | Finished | Elapsed seconds | Overlap? | Root cause |
|---|---|---|---|---:|---|---|
| 1 | | | | | | |

- Critical-path evidence and bottleneck:
- Voice/render service latency:
- Cache verified hit / eligible lookup:
- Reviewer rounds, invalidated gate count, rerender count:

## 3. Where tokens went
| Rank | Token/cost sink | Measurement or relative estimate | Why it hurt |
|---|---|---|---|
| 1 | | | |

## 4. What worked well
- Reusable asset/primitive and its verification:
- Best cross-agent coordination result:
- Performance optimization with evidence:

## 5. Root-cause debt
| Fault | Evidence | Owner | One-line prevention | Priority |
|---|---|---|---|---|
| | | | | |

## 6. Next-video improvements (required)
| Imperative change | Status: applied / ticket / machine-only | File / ticket | Verification |
|---|---|---|---|
| | | | |

## 7. Evidence audit
- `pipeline.py show <vid>` warnings:
- `pipeline.py audit <vid>` exit code:
- `pipeline.py check <vid>` exit code:
- Missing evidence / refused transitions (each one assigned):
- Correct approved MP4 fingerprint:

## 8. Deliverable verdict
- Ship? YES / NO
- Why supported by machine evidence + independent review:
- Remaining accepted imperfections, none may be hard blockers:
- Human full-audio listen record: pending / confirmed by [person], not AI-inferred
- Next-run target and test plan:
