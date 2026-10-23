# Gương Chậm Ba Giây — V2 Acting/Voice Sync

## Result
- Title: **Gương Chậm Ba Giây — V2 Acting & Sync**
- Story: approved 10-scene / 24 micro-beat shotlist, Hook → Body → Climax → Ending.
- Export: 60.000 seconds, 720×1280, 24 fps (1440 frames), H.264/AAC stereo at 48 kHz.
- Exact SHA-256 of QA-verified local MP4: `c1a7dc63d79d84948feacc646393f7c70cbdf0b87acf1cc9d54b15ad22941407`
- Exact filename: `guong_cham_ba_giay_V2_acted_synced_60s.mp4`, 8,927,545 bytes.
- MP4 plus renderer source and 84-file complete project package are delivered as ChatGPT artifacts. **MP4 has NOT yet been uploaded to GitHub Releases**. This document must not be cited as a binary Release link.

## Motion staging, with clear limitations
1. Scene 1: protagonist's face holds its serious pose while reflection switches between separate neutral and smiling expression source frames.
2. Scene 2: real character changes hand pose at local +0.70–1.11 seconds, reflection changes at +3.70–4.11 seconds; offsets differ by **3.00 s = 72 frames at 24 fps**. This is staged 2D pose-interpolation, not physics-driven hand tracking.
3. Scene 5: CCTV scan overlay, glitch cue and separately animated replacement figure layer.
4. Scene 7: localized mouth deformation timed near narrator's **ĐỪNG MỞ CỬA** words, plus emotional close-up. The mouth deformation is **not** phoneme-accurate lip sync.
5. Scene 8: unique genuine Vbee mother line **Mai ơi, mở cửa cho mẹ!** in a female voice, replacing previous narration-only delivery.
6. Scene 9: progressive expression/light transition to an uncanny smile.
7. Scene 10: genuine Vbee female replica dialogue **Mẹ tới rồi à?**, long suspense beat and dry door latch at 58.94 seconds.

## Voices and provenance
- Narrator: genuine Vbee Anh Khôi, voice code `hn_male_phuthang_stor_24k-stl`.
- Mother and replica: genuine Vbee Ngọc Huyền, voice code `hn_female_ngochuyen_full_48k-fhg`. Minor post-processing on replica line distinguishes it acoustically.
- Verified [female dialogue run](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40000965096) and [revised narrator run](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40002029066).
- Prior ten-scene narrator original [successful run](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39997419999).

## Reproduction
- Download and extract the chat-delivered complete V2 project archive.
- Run `python render_v2.py`, then `python mix_v2.py` in an environment with `ffmpeg`, `Pillow`, `opencv-python`, `numpy`, `pydub` and `scipy`.
- Source art and authentic voice MP3s are in the archive. Font source files are not bundled.
- Commit validated renderer revisions when suitable; archive the real MP4 only in a GitHub draft Release after actual binary upload and verified asset URL.
