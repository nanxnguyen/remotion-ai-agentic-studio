# Voice synchronization

- Provider: Vbee AIVoice Batch, male HN Thanh Long `hn_male_thanhlong_talk_48k-fhg`.
- Source: `story.json` seven beats, saved TTS text and measured MP3 files within CI temp (not committed with credentials).
- Starts in seconds: 0.12, 4.78, 10.12, 15.55, 22.21, 29.65, 35.76.
- Sequence: 01–02 hook; 03–06 burden; 07–08 renewed request; 09–11 mirror revelation; 12–15 agency; 16 hopeful close.
- Mix uses FFmpeg per beat, (atempo = \max(1, measured\_duration / available\_time)); block any beat requiring >1.24×.
- Sidechain piano ducking under voice with 28ms attack, 420ms release.
- Status: **pending Vbee render + measured MP3 checks**. Save final metrics to `final/AV-QA.json`.
- Audition requirement: pronunciation of “mười bảy”, “không sao”, “Vâng”, “em cần nghỉ”; pause around screen reflection; independent listening not claimed.
