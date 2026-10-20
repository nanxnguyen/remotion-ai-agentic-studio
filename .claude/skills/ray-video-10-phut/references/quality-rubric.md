# Creative quality rubric + non-negotiable technical blockers

This is a **producer self-review and reviewer guidance**, NOT a replacement for `.claude/skills/ray-pineline-worflow-agent/schemas/review-gates.json`. Actual gate pass thresholds are enforced by `scripts/pipeline.py` and the current schema.

## Creative rubric (100 points; internal only)

| Dimension | Weight | Evidence / what a good result looks like |
|---|---:|---|
| Hook clarity & honesty | 15 | Frame 0 + first 3s, clear/credible promise even on mute |
| Narrative structure & payoff | 20 | One insight, causal flow, re-hook where relevant, concrete payoff |
| Claim correctness & proof | 15 | Sources for assertions, no misleading supporting footage |
| Topic-specific art direction | 15 | Palette/type/composition chosen for subject, no generic AI card spam |
| Shotcraft / transition / motion | 15 | Semantically meaningful movement, variation, no jitter |
| Sound / performance / sync | 10 | Voice clarity, natural rests, accents and musical balance |
| Mobile readability | 10 | Captions legible with diacritics/safe areas; actual still evidence |
| **Total** | **100** | No score can override a machine or independent review failure |

Self-review target suggested ≥85, or ≥90 for premium high-craft path; neither is a new `pipeline.py` gate. Weak producer dimensions become revision tickets **before** independent review. Human listening is necessary to assert subjective voice quality.

## Original repo gate thresholds (observed v4; re-read current contracts)

| Gate | Threshold | Reviewer |
|---|---:|---|
| A script | ≥9/10 | script-reviewer |
| Content | ≥9/10 | content-reviewer |
| Audio | ≥9/10 | audio-reviewer |
| D design | ≥8.5/10 | design-reviewer |
| Motion | ≥9/10 | motion-reviewer |
| E integration | ≥9/10 | integration-reviewer |
| B tasks/tools | ≥9/10 | task-reviewer |
| C final MP4 | ≥8/10 | video-reviewer |

Pass means threshold **and** verdict pass **and** no open high/medium issue, with required evidence. `qa` follows C as separate independent validation. Actual schema may evolve, so never hardcode these in a new pipeline implementation.

## Final MP4 blocker list (do not waive)

- Missing, wrong, truncated or obscured spoken words; captions/on-screen claims conflicting with `voice.json`/content pack.
- Text, especially Vietnamese marks, clipped or overflow; content inside forbidden bottom 210px overlay zone.
- Render/codec/duration/fps failures; invalid fingerprint; black/flash frames; unplanned freeze or silence.
- Severe timing discontinuities, masked narration, unacceptable clipped/peaking audio or mix metrics outside current contract.
- Unsupported factual claims presented as proven; source/illustration mismatches; nondeterminism.

**Blocker wins even if creative quality ≥95/100 or time budget expired.** Route to precise owner, invalidate downstream approval, re-render the whole output as required, run C and final QA on new fingerprint.

## Evidence collection

- Phase A: research, brief, exact script, voice direction, content claim map.
- Branches: voice clips + measured durations + ASR, audio evidence, design kit + cover + three style frames + storyboard + hook strip.
- Motion: spec + animatic + hook/highlight/boundary strips + review.
- Before full build: joined timeline and E/B reviews.
- C: rendered MP4 + hash, contact sheet, dense frames, technical `verify`, silence/freeze/flash scan, loudness/true-peak, ASR-vs-voice, captions, 3 deterministic stills twice, carried-ticket closure.
- QA: independent re-run of final checks, code/typecheck, at least three stills per shot and transitions.
- Delivery: every stage/required gate status passes current `pipeline.py check`, mandatory `eval.md` and truthful listener record.

## Four critical reviewer questions

1. Does visual execution tell *this* story rather than any generic story?
2. Can a viewer understand the claim with sound off, and hear narration comfortably when sound is on?
3. Are all technical assertions reproducibly tested against the actual MP4 fingerprint?
4. Which concrete defect remains, who owns its fix and which gate must be invalidated?
