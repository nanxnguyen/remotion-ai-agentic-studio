# Short 02 — final media manifest

- Story: **17 Tin Nhắn, Không Một Lời Chúc**
- Production specialization: `ray-emotional-stick-shorts`
- Branch: `feat/short02-17-messages-healing`
- Successful production run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40016793584
- Final full AV: `docs/short-02-17-tin-nhan/final/short02-17-tin-nhan-vbee-60fps.mp4`
- Verified SHA-256 (initial successful render): `cae40120405d8e9b27adb8d2853b250033420dbc3c9167fe8d0fec28731dd966`
- Resolution: 1080 × 1920; 60 native FPS; 2,425 frames; duration: 40.416667 seconds
- Scene count: 28; tested transitions: 27; 44-frame scene handoffs
- Sound: 8 actual Vbee Thanh Long Vietnamese narration beats and original piano soundtrack mixed into complete MP4
- Audio/video technical probe: **passed**; source voice files independently decoded and peak-checked
- Subjective listening and full human visual playback: **not independently verified**; final viewer review advised
- vidIQ media-library upload ID: `5a668cdd-c4ea-4fa0-8934-42ba8f9cbe7a`
- vidIQ state: `ready` (confirmed by upload API)
- vidIQ retrieval: refresh the **expiring signed video URL** with `vidiq_video_upload({uploadId})`; do not commit signed URLs
- YouTube upload/publication: **not performed**
- Technical QA: `docs/short-02-17-tin-nhan/final/SHORT02-QA.json`
- Transition QA: `docs/short-02-17-tin-nhan/seam-QA.json`

**Rendering caveat:** This deliverable is a Python/Pillow + FFmpeg continuity rendition reusing the prior film's 60fps drawing primitives. It does not represent a completed canonical Remotion + pipeline.py gate audit. Technical QA is not a substitute for subjective performance review.
