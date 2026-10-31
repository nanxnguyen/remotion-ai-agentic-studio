# Character Motion Engine — Design (2026-10-31)

## Intent
Equip the existing Remotion studio with an original, reusable 2D stick-figure animation engine: anchored walking/running feet, articulated pushups, IK punching, and a reactive punching bag. This is a foundation toward the DISCIPLINE reference's motion quality, NOT a 1:1 reproduction or a finished film.

## Goals
- Body motion is calculated from Remotion frames, not clocks or unseeded randomness.
- Reuse deterministic IK and pose math across videos without sharing video-specific color palettes.
- Provide a 10-second, silent, landscape technical demo to assess the actual rendered quality.
- Preserve existing video outputs and the canonical registry.

## Alternatives and decision
1. **Spine Pro + exported sequences:** good for artist-authored performance, but adds paid tooling and a complex authoring pipeline. Defer until a proven need.
2. **GSAP-based imperative timelines:** unnecessary for reproducible per-frame rigs; do not add.
3. **Pure TypeScript FK/IK + SVG + Remotion (selected):** zero extra dependencies, testable, frame-deterministic; use existing stack.

## Components
- `src/animation/character-motion.ts`: IK with reachable-target clamping; planted-step locomotion; pushup contact; IK punch to a target; damped bag response; pose blending.
- `src/animation/CharacterPuppet.tsx`: visual SVG rig driven solely by pose.
- `src/videos/character-motion-lab/`: test composition with three distinct 16:9 actions.
- `tests/core/character-motion.node.ts`: motion invariants verified via Node 22.

## Constraints
- Remotion 4.0.534, React 19, TypeScript; no new dependencies.
- Diagnostic: 1920×1080, 30 FPS, 300 frames. Normal story output remains 9:16 unless separately specified.
- No third-party reference artwork copied into the render. No user media, personal voice, or binary MP4 in Git.
- New composition registered ONLY in `src/videos/registry.ts`.

## Non-goals
No paid Spine integration, no full 2–3-minute story film, no 100% frame-accurate imitation, no publishing to YouTube or other platforms.

## Acceptance
- Check FK/IK geometry and exact contact/foot-lock via unit tests.
- Run `npm run verify` and `npm run test:visual`.
- Render `CharacterMotionLab` and visually inspect frame 0, transitions, repeated actions and contact frames. Math tests alone do not certify animation looks natural.
- Keep PR in review until the actual video and visual QA are verified.
