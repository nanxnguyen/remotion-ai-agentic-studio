# V6 Gate 1 — ENGLISH TYPOGRAPHY / MOTION REPAIR

Original independent 2D animated proof for **Không Ai Vỗ Tay Cho Ngày Đầu Tiên**. This is a 15-second **REVIEW**, not the 140-second final film.

## Structure

- `src/rig_v6.py`: deterministic contact/IK/action functions for four staged actions.
- `src/render_gate1_v6.py`: native 1920×1080, 30fps Pillow renderer, English Inter Display typography and original 48k stereo soundtrack.
- `src/test_v6.py`: 10 geometry and motion regression tests.
- `V5-vs-V6-real-MP4-comparison.jpg`: same timestamp comparison extracted from exported MP4s.
- `QA-V6-GATE1-REVIEW.md`: defects fixed and remaining artistic blockers.

## Reproduce

Python 3.11+, `Pillow`, `numpy`, `ffmpeg` on PATH. Inter Display font in the rendering environment or update the two font paths (avoid bundling copyrighted font files).

```bash
cd src
python test_v6.py
python render_gate1_v6.py preview
python render_gate1_v6.py
```

This source does not yet implement a registered Remotion composition. Do **not** label as verified Remotion native or publish as final based on geometry tests alone.
