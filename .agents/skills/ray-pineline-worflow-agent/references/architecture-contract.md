# Production architecture contract

This document defines ownership boundaries. It is normative for all runtimes.

| Layer | Owns | Must not own |
|---|---|---|
| SKILL.md | Phases, artifacts, dependencies, human-facing workflow | Mutable state, enforcement code, runner lifecycle |
| scripts/pipeline.py | Authoritative state transitions, gate enforcement, persisted evidence | Choosing agent models, retry schedules, creative briefs |
| .agents/roles/*.md | Agent identity, ownership, inputs, outputs, acceptance responsibilities | Transition rules or executable retry logic |
| schemas/review-gates.json | Versioned scoring thresholds and non-overridable blocker categories | Pipeline mutations or review execution |
| scripts/runtime_orchestrator.py | Dispatch ledger, leases, retry/backoff, resume state | Approving reviews, bypassing pipeline.py or authoring artifacts |

## Execution invariants

1. Only pipeline.py can accept a stage/gate transition; orchestrator status is descriptive, not approval.
2. A review requires an independent reviewer with artifact evidence. A score is not a proof of quality.
3. Failure, timeout, absent capability, unsupported provider, or missing media is blocked, never silently marked complete.
4. Non-overridable failures include missing render/audio, incorrect or unsourced factual claims, unauthorized voice reproduction, and missing mandatory user content.
5. Never claim a provider action, execution, human audition, or review happened unless a verifiable tool output or artifact proves it.
6. Existing composition IDs and legacy statuses remain valid. The registry is src/videos/registry.ts; the canonical video path is src/videos/<slug>/.
7. Changes to workflow contracts need tests and review; retrospective recommendations are proposals, not authority to self-modify rules.

## Gate references

Review standards: `schemas/review-gates.json`. Reviewers provide evidence in their markdown reports; machine-checkable claims should use structured sidecars as tooling evolves.

## Operator controls

`runtime_orchestrator.py` manages run intent, retry budget and recovery. It never auto-invokes a coding agent without an explicit adapter; its tasks should be executed through the chosen runtime and then acknowledged. After task completion, pipeline.py verifies the stage/gate.

## Migration

Do not rewrite previous `status.json` or earlier reviews merely to adopt this contract. Migrate one enforcement rule at a time with regression tests.
