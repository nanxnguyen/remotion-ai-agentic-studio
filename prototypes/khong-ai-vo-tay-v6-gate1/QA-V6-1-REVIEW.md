# V6.1 Gate 1 — Motion Regression Repair Review

Status: **REVIEW** (15-second technical proof; NOT the complete 140-second film).

## Verified changes vs V6

| Defect | Root cause | V6.1 correction | Evidence |
|---|---|---|---|
| Repeated same-side arm drive each consecutive running step | `sin(2π phase)` reset every step, not alternating sides | Use half-wave over total step index `sin(π (step+phase))` with larger opposite arm swing | RED `test_running_arm_counter_swing_alternates_with_support_foot`; GREEN |
| Boxing elbow jumps 56px between frames | Punch fist begins too close to the shoulder, IK singularity causes high angular velocity | Retarget fist guard farther from shoulder with more ergonomic downward resting pose | RED `test_punch_elbow_does_not_teleport_across_a_frame`; GREEN; max elbow delta < 42px/frame |
| Faces static through helping | Both characters' expressions hardcoded `hope` | Animated expression staging `concern`/`uncertain` → `hope`; render eye/brow cues | RED `test_character_emotion_changes_when_child_reacts`; GREEN |
| Visually flat city tracking and punching bag | Flat static skyline and perfectly rigid bag body | Added parallax midground layer; subtle impact compression and damping | Actual MP4 comparison sheet |

## Media QA

- New file `V6.1-GATE1-15s-1080p30-EN-REVIEW.mp4`: 15.000s, 1920×1080, CFR 30fps, 450 video frames.
- H.264 8-bit yuv420p, AAC stereo 48k, 15sec original synthesized music.
- FFmpeg end-to-end decode: PASS. Full 13/13 unit tests: PASS.
- Source and comparison sheet retained separately; V6 file untouched.
- English editorial intertitles, genuine Inter Display medium/extra bold from host. No narrated voice and therefore no voice-caption matching claim.

## Remaining blockers / not claimed

- Body shapes are simplified 2D puppet art; acting/lighting **not certified** equivalent to DISCIPLINE, no independent animator review.
- Push-up anatomy, boxing shoulder and hip twist, help gesture still require hand-directed key poses for near-professional film quality.
- Flat character drawings and simple backgrounds do not meet advanced 2.5D parallax goals despite new midground.
- Renderer remains Pillow/FFmpeg, **not a Remotion composition**. No complete 140-second V6.1 film.
- Re-run V6 PR #93 CI: repo-wide Prettier failure is baseline formatting debt, unrelated to Python proof; resolved only when a subsequent GitHub run actually succeeds. Do not claim overall CI passed unless observed.
- Final publishing/archival is blocked pending artistic and production gate review. Keep all earlier approved films unchanged.
