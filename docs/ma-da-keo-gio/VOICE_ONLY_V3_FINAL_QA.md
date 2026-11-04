# Ma Da Kéo Giò — Vbee Ngạn voice-only final QA

- Production date: 2026-11-04 (Asia/Ho_Chi_Minh)
- Revision: V3 voice-only replacement (preserves V2 video stream, captions, total duration and story visuals)
- Voice provider: Vbee Batch (verified 15 actual MP3 clips, recovered s05 after a TLS handshake timeout)
- Voice code: `n_hn_male_ngankechuyen_ytstable_vc`
- Source video: `MA_DA_KEO_GIO_PHIM_CO_GIONG_V2.mp4` (not committed to Git)
- Final video: `MA_DA_KEO_GIO_VBEE_NGAN_V3.mp4` / Drive `video-final.mp4`
- Final SHA-256: `4c419b0fa9f12c288a165a6bce2a100834d37fa015ff2a7ed610d186896435cb`
- File size: 2,930,452 bytes
- Video: H.264, 1080×1920, 30 fps; **bitstream identical to V2**
- Audio: Vbee MP3 clips mixed with restored rain/river/foley bed; AAC stereo 48 kHz
- Duration: exactly 60.000 seconds
- Full ffmpeg video/audio decode: PASS
- ffprobe stream/type/resolution/duration verification: PASS
- Spoken text matches original V2 burnt-in captions: PASS (15/15)
- Actual Vbee clip SHA-256 checks: PASS (15/15)
- MP4 mux integrity / video bitstream SHA comparison: PASS
- Human-acting / source image-to-video upgrade: NOT DONE. V3 retains stylized storyboard camera motion of V2; do not mislabel as natural acting
- Automated audio-source verification does not replace complete human listening review
- No publishing to YouTube or other public platform

## Artifacts and storage

- [Google Drive final MP4](https://drive.google.com/file/d/1jV5k1YnXpYKhgzsNN_oED_gnMfyim-_c/view?usp=drivesdk)
- [Google Drive release folder #48](https://drive.google.com/drive/folders/1M2Xwj2XFQHrFfsmRc8kDE7cbcnQG3DUQ)
- [Thumbnail](https://drive.google.com/file/d/1EkNmeAc2UnD2lPx_jSrjNkqGTN9K0ILk/view?usp=drivesdk)
- [YouTube title and description](https://drive.google.com/file/d/1BHAWmnLZQSeIT2oOJs1-esZzc93aGeDH/view?usp=drivesdk)
- [Vbee synthesis run (initial 14 clips)](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41862260977)
- [Vbee s05 recovery run](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41863457460)

Private Drive folder. No GitHub Release or MP4 committed per current source/Drive policy.
