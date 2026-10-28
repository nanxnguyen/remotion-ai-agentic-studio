# Ngôi Nhà Thứ 49 — V3 Action Upgrade REVIEW, 2026-10-28

## Actual verified media
- Same existing film folder #29 (retains all V2): https://drive.google.com/drive/folders/1QwvZWX0yANLu4qRc4Sklhy4AL5kHNlwO
- V3 watchable MP4: https://drive.google.com/file/d/1N9w-tRK2J6X9IrtW-A_4xJGVJSbKTQWo/view?usp=drivesdk
- 18 MP4-extracted midpoint frames: https://drive.google.com/file/d/1zrUxVPKO5C4olE0tL5NGaD9M_KQOFkmM/view?usp=drivesdk
- V3 compositing scripts, measured voice metadata and QA archive: https://drive.google.com/file/d/1GBzGk-Gl1m7GrYkEwrFE8h4vVMo_hQa_/view?usp=drivesdk
- JSON QA: https://drive.google.com/file/d/14ewU0PpLP545Bzj-2pYVyq-Hev7X9mKX/view?usp=drivesdk
- Existing original V2 retained: https://drive.google.com/file/d/1eJj-02hYOTHkOAhoxu90gITjZOo-Ra3a/view?usp=drivesdk

## Verified AV metrics
- 60.000000 seconds, 720x1280 9:16 at 30 fps; exactly 1,800 H.264 frames, AAC 48 kHz stereo stream.
- V3 file size **20,586,861** bytes; SHA-256 `8f1952ede601dbe105718ebf428923844c6cc974a7f65decedf49d32db9afb42`.
- FFprobe PASS; all audio/video fully decoded with FFmpeg exit code 0, stderr 0 bytes; sampled 18 actual output scene midpoints and key action phases.
- The *compressed AAC audio stream hash* from V2 and V3 is exactly equal: `05ebf9bf5d1a7249ed4930fd59ec07317c928d537e446f4886204c9f7bda625f`. Original 18 Vbee Anh Khôi MP3s provenance: [successful GitHub Actions run 40695675428](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40695675428).
- Intro CTA 0–3s, final CTA 56–60s, separate clean native typography labeled `LỜI KỂ` only. Exact approved 18-line narrative and timing unchanged.

## V3 vs V2 improvements
- The 'house #49 dissolves' action at 50–54s is composited as an **object-localized fog dissolve in the same scene geography**, rather than fading the entire image to black.
- The family photo at 54–56s is rebuilt as a **fixed photograph frame** that transitions from two people to the mother alone, rather than a mismatched whole-scene crossfade.
- The 38–42s door transition now has a moving door-slab overlay, showing a closure before Thảo can follow the double (editorial simulated motion, not new human-acting footage).
- Motion is smooth-eased 2D/2.5D; native 30fps; subdued restrained atmosphere; old footage and Vbee track preserved.

## Remaining critical blockers (REVIEW; NOT FINAL)
1. **Independent high-quality original scene art: FAIL**. Existing shot art came from low-res approved review storyboard crops. V3 does not solve the need for full-portrait 9:16 clean images or full-motion actor performance. Blurred padding remains visible around central photo strips.
2. **P0 physical action still PARTIAL**: vanishing metal knob is an inpaint/photometric visual indication, not photo-real door geometry; duplicate cannot be seen running convincingly toward house 48; clear before/action/after of double's movement requires new independently generated footage.
3. **Canonical repo pipeline: NOT RUN**. This review was authored by a procedural Python+FFmpeg editor. It was not registered in Remotion and did not pass npm verify, visual tests or pipeline audit. Do not mark final.
4. Full subjective end-to-end human listening/film-review approval outstanding; no monetization guarantees.
5. Drive is private; no YouTube publishing and no GitHub Release, following current no-release override.

## Reproduction
The Drive `house49-v3-editable-review-package.zip` contains `render_v3.py`, `qa_v3.py`, approved timeline, measured Vbee metadata and report. It **requires** the previously delivered V2 `production-review-assets.zip` containing the original images, native overlays and audio files. Source/asset lineage is intentionally not presented as new high-resolution art. V3 video is separate and leaves old V2 unchanged.

Do not use source screenshots as independent scene assets or claim 1080p native art by upscaling this MP4.
