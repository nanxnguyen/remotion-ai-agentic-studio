# Audio Review — machine checks

- 19 genuine Vbee Anh Khôi clips and 4 genuine Vbee female Linh clips: PASS.
- SHA-256 equality against the Vbee workflow artifact manifest: PASS (23/23).
- FFmpeg full decode for every MP3: PASS (23/23).
- FFprobe measured duration: PASS (23/23; within 30 ms of artifact manifest).
- Combined measured voice duration: 111.407s.
- Film timeline: 134.559s; exact clip placement and scene holds are in timeline.json.
- Voice-to-BGM ducking, SFX synchronization, clipping, subjective balance and full human listening: PENDING until final mixed MP4.
- ASR / Vietnamese pronunciation verification: PENDING; see voice-clone-asr.md.

The successful GitHub Actions Vbee run is the provenance source: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41081842335
