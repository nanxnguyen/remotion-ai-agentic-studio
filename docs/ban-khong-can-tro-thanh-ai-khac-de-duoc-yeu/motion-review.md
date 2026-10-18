# Motion Review: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Reviewer:** motion-reviewer (clean context)
**Date:** 2026-10-18
**Artifacts reviewed:** motion-spec.md, motion-evidence.json, animatic, hook/highlight/boundary strips, timeline.ts, join-notes.md, design-spec.md

---

## Scoring (1-10 per rubric item)

| Criterion | Score | Evidence |
|---|---|---|
| **Shot coverage** | 10 | All 9 shots + 8 boundaries specified in motion-spec.md with frames, voice/hold, entrance, accents, SFX cues |
| **Boundary coverage** | 10 | 8 boundaries documented with transition type, duration, trigger. Hard cuts (s1→s2, s2→s3, s4→s5, s8→s9) and cross-dissolves (s3→s4, s5→s6, s6→s7, s7→s8) all have strips. |
| **Voice timing authority** | 9 | Timeline built from join-notes.md (script estimates pending real voice:measure). Motion spec notes re-run requirement. s6a/s6b gap correctly modeled (0.8s silence). |
| **Continuity (position/scale/direction/speed)** | 9 | Human figures: consistent positions across shots. Expanding glow radius 0→400 linear. Two figures approach ease-out cubic. No jumps detected in strips. |
| **Attention order** | 9 | Hierarchy: heading → art → caption → divider → footer. Accent highlights draw eye to key words. SFX cues aligned to accents. |
| **Reading time** | 9 | Caption chunks appear ~1.5-2s before voice ends each shot. Hold frames provide additional reading time. Minimum 1.5s per chunk met. |
| **Accent synchronization** | 9 | Highlight animations at ±3 frames of accent word frames. Delete key pulse on "xóa", question mark build syllable-sync, particle labels staggered. |
| **Hook strip quality** | 9 | 2s @ 12fps shows: text entrance (20f), art entrance (22f), micro-breathe, delete key pulse, caption timing. Easing natural. |
| **Highlight strip quality** | 8.5 | s5→s6 cross-dissolve + question mark build visible. s6b vulnerable hold could be more pronounced in strip. |
| **Boundary strips** | 9 | All 8 boundary strips present and decode. Hard cuts instant, cross-dissolves 15f opacity ramp. BGM crossfade frames noted. |
| **Determinism** | 10 | All animations from useCurrentFrame, interpolate, Math.sin. No Math.random, Date.now, or external time. |

open high/medium: 0

---

## Verdict

**Overall: 9.1/10**
**Motion review threshold: 9/10 → PASS**

No Cao/Trung tickets. One Thấp item:
- **M-01 (Thấp):** Highlight strip (s5/s6) — s6b vulnerable hold could show more pronounced question mark pulse. Minor polish.

---

## Fix List

| ID | Severity | Where | What | Change | Owner | Check |
|---|---|---|---|---|---|---|
| M-01 | Thấp | motion-spec.md s6 | s6b question mark pulse in highlight strip | Increase pulse amplitude to 1.12 for strip visibility | motion-agent (trivial) | motion-strip-highlight.png shows clear pulse |

---

## Acceptance Verification

- [ ] motion-spec.md complete with all shots/boundaries
- [ ] motion-evidence.json matches timeline.ts SPANS exactly
- [ ] Animatic renders at 30fps, 1767 frames
- [ ] Hook strip: 2s @ 12fps, shows entrance/micro-motion/accent
- [ ] Highlight strip: s5/s6 boundary cross-dissolve + question build
- [ ] 8 boundary strips: all decode, show correct transition
- [ ] Continuity verified across all boundaries
- [ ] Reading time ≥ 1.5s per caption chunk
- [ ] Accent sync ±3 frames
- [ ] Zero non-deterministic code

---

*Recorded: `pipeline.py review ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu motion 9.1 --reviewer motion-reviewer --report docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/motion-review.md --verdict pass`*