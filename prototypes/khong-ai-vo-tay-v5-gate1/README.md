# Không Ai Vỗ Tay Cho Ngày Đầu Tiên — V5 / Gate 1

**Technical 15-second proof; NOT the final 140-second film.** Visual acting still requires artist QA; see [QA-V5-GATE1.md](./QA-V5-GATE1.md).

## Run from repository root

```bash
python3 -m pip install Pillow numpy
python3 -m unittest discover -s prototypes/khong-ai-vo-tay-v5-gate1 -p test_v5.py -v
python3 prototypes/khong-ai-vo-tay-v5-gate1/render_gate1.py
```

FFmpeg (with H.264 and AAC encoders) must be available on PATH.

The Python renderer currently writes the MP4 to `prototypes/V5-GATE1-15s-1080p30.mp4`, the contact sheet to `prototypes/V5-GATE1-storyboard-from-render.jpg`, and the generated manifest to `prototypes/manifest-v5-gate1.json`.

- `rig_v5.py`: pure FK/IK/contact motion math for running, pushups, boxing and helping the child.
- `render_gate1.py`: actual vector-frame rendering at native 1920×1080 / 30 FPS with original synthesized audio.
- `test_v5.py`: 8 deterministic motion tests.
- `.github/workflows/v5-animation-gate1.yml`: self-contained proof render and 90-day GitHub artifact.

The project-wide Remotion pipeline is **not integrated** yet. This folder is a Python proof to validate the art-direction gate before spending time on the full film and Remotion port. No original DISCIPLINE frames, audio or characters were included.
