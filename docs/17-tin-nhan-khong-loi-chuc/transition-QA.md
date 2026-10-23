# Transition QA (pre-render plan)

Check 15 boundaries with frame n-1 and frame n at 60fps, detect sudden flash, actor double image or teleport, disappearing hand-held props, caption morph/reset, camera discontinuity, unnatural loss-to-hope jump.

- Preflight status: PENDING.
- Producer must save measured results and representative still frames when CI completes.
- For subjective continuity, human viewing is additional evidence, not replaced by a numeric score.
- Historical defect from V3: foreground actor rendered in both crossfaded scene layers, causing ghosting and hard pose resets. New composition renders foreground protagonist once.
