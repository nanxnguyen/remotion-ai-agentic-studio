# Character Motion Lab — technical diagnostic

A reusable SVG + IK motion engine is in `src/animation/character-motion.ts`. It is independent from video-specific art direction and does not change any existing film.

## What is implemented
- `solveTwoBone()`: deterministic two-bone IK, including unreachable target clamping.
- `locomotionPose()`: grounded alternating walk/run steps; one support foot pinned per step.
- `pushupPose()`: anchored palms and toes with a cycling torso position.
- `punchPose()`: fist target solved with IK, reaching the front face of a punching bag.
- `bagDisplacement()`: deterministic decaying impact response.
- `blendPose()`: coordinate blending for action transitions.
- `CharacterPuppet`: an original SVG visual representation of pose points.

## Preview / QA
In a full repo checkout with Node 22 and dependencies installed:

```sh
npm ci
npm run studio
# Select CharacterMotionLab (1920x1080, 30 FPS, 10s)
npx remotion render src/index.ts CharacterMotionLab out/qa/character-motion-lab.mp4
node --experimental-strip-types --test tests/core/character-motion.node.ts
npm run verify
npm run test:visual
```

The 10-second diagnostic has three action shots: walk-to-run, pushups, and punching a reactive hanging bag. It is intentionally **silent**, with no narration, SFX or film reference imagery. It is not an approved narrative video.

## Remaining quality gap
The math tests prove some contact invariants, not natural full-body acting. Inspect the actual video at each scene cut and every punch impact, especially foot lock during walk-to-run blending, side-facing poses, rig layers, weight, and timing. More polished character acting will require manually directed key poses, expressive hands and body rotation. Do not claim the result matches the source film until after visual QA.

## Originality
The reference was studied as direction only. All diagnostic graphics are authored as original vector shapes, with no sample film frame reused in the output.
