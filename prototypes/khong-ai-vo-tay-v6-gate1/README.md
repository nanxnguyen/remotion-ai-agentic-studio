# V6.1 — Character Motion Fix (Gate 1 / REVIEW)

Original independent 15-second animation proof for **Không Ai Vỗ Tay Cho Ngày Đầu Tiên**. This is **NOT** the final 140-second film and does not certify professional acting quality.

## Sources
- `src/rig_v6.py`: updated two-bone IK, alternating arm swing with running steps, boxing elbow reach, staged child-help expressions.
- `src/render_gate1_v6.py`: 1920×1080 @ 30 FPS per-frame Pillow/FFmpeg renderer, Inter Display ExtraBold English editorial text, original synthesized soundtrack.
- `src/test_v6.py`: original 10 motion regression tests.
- `src/test_review_regressions.py`: **3 new red→green regression tests** for alternating arm swing, punch elbow continuity and helping expressions.
- `QA-V6-1-REVIEW.md` + `manifest-v6-1-gate1.json`: verified review evidence.

## Reproduce (from repo root)
```bash
python3 -m pip install Pillow numpy
python3 -m unittest discover -s prototypes/khong-ai-vo-tay-v6-gate1/src -p 'test*.py' -v
python3 prototypes/khong-ai-vo-tay-v6-gate1/src/render_gate1_v6.py
```
Required: FFmpeg, ffprobe and Inter Display Medium / ExtraBold installed on the render host. Avoid committing licensed font files.

Output: `prototypes/khong-ai-vo-tay-v6-gate1/V6.1-GATE1-15s-1080p30-EN-REVIEW.mp4` + contact sheet.
CI: `.github/workflows/v6-animation-gate1-review.yml` verifies tests, render and decode.

## Delivery

- [Drive V6.1 review MP4](https://drive.google.com/file/d/1zw0Z4-acuGhwze45PI06-b267eh7vwdA/view)
- [Visual comparison](https://drive.google.com/file/d/1HnFlqQTjXE6qpcUPRLMQG0qwqz94kelW/view)
- Original V6 retained, never overwritten.

**Release blocker:** Further hand-directed acting, real 2.5D camerawork and integration with Remotion needed for professional 140s FINAL. No copied DISCIPLINE frames, voices or music.
