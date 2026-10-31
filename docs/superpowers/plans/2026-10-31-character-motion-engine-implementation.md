# Character Motion Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans for follow-on work. Perform TDD and explicit verification.

**Goal:** Enable original articulated 2D character movements in the Remotion studio and provide a reproducible 10-second technical demo.

**Architecture:** A deterministic TypeScript motion solver drives an independent SVG puppet. Each video chooses its own background, colors, and framing.

**Tech Stack:** Node 22, TypeScript, React 19, Remotion 4.0.534, SVG, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-31-character-motion-engine-design.md`

## Global constraints
Never change old video IDs or output formats. Never use unlicensed reference frames. No paid tools or new runtime dependency.

## Review focus
- Unreachable IK targets should not generate NaN or overextended bones.
- Foot ground contact must not slide during a planted step.
- Pushups must keep hands/toes pinned while the torso lowers.
- Fist must reach the punching bag front plane at exact impact.
- Visual quality must be inspected using genuine rendered frames and MP4.

### Task 1 — Motion mathematics
- [x] Write tests for IK, foot lock, pushups, punch and transitions.
- [x] Verify expected RED (module missing).
- [x] Implement `src/animation/character-motion.ts`.
- [x] Verify eight local targeted tests pass.

### Task 2 — Visual puppet
- [x] Implement `src/animation/CharacterPuppet.tsx`.
- [x] Create 10-second, 1920×1080, 30 FPS `CharacterMotionLab` composition.
- [x] Register composition through `src/videos/registry.ts`.

### Task 3 — Repository integration
- [x] Add Node 22 test invocation to `package.json`.
- [x] Store spec, plan and usage instructions.
- [ ] Full project `npm run verify` in checkout/CI.
- [ ] Full project `npm run test:visual`.
- [ ] Render and view 10-second demo in a full checkout.
- [ ] Review visual issues, then approve merge.

### Follow-up artist-quality work
- [ ] Dedicated animation states and authored key poses with easing for anticipation/overshoot/follow-through.
- [ ] Better torso rotations and directional side-profile, foot roll, hand shapes, collision and occlusion QA.
- [ ] Optional Spine Pro asset authoring only after test scene review.
