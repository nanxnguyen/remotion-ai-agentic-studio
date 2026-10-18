# Assets Manifest: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Date:** 2026-10-18
**Audio agent:** audio-agent

---

## Voice Clips (from voice-agent)

| File | Key | Duration | Source | License |
|---|---|---|---|---|
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s1.mp3 | s1 | ~3.3s | VieNeu-TTS clone (Thanh Long Nâng Cao) | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s2.mp3 | s2 | ~4.9s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s3.mp3 | s3 | ~3.3s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s4.mp3 | s4 | ~5.5s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s5.mp3 | s5 | ~3.4s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s6a.mp3 | s6a | ~1.8s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s6b.mp3 | s6b | ~1.5s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s7.mp3 | s7 | ~5.7s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s8.mp3 | s8 | ~3.4s | VieNeu-TTS clone | Local generation |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/s9.mp3 | s9 | ~6.3s | VieNeu-TTS clone | Local generation |

---

## BGM (Background Music)

| File | Source | License | Notes |
|---|---|---|---|
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/bgm-main.mp3 | video-shotcraft/assets/audio/ambient-warm-pad.mp3 | CC0 | Warm ambient pad, 90s loop |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/bgm-turn.mp3 | video-shotcraft/assets/audio/ambient-tension.mp3 | CC0 | Brighter texture for s4-s7 |

**Beat grid analysis:** Neither BGM has strong rhythmic pulse. Both are ambient pads. Beat grid = **none** (free tempo). No `beatF(n)` helper needed. SFX cues timed to voice accents, not beats.

---

## SFX (Sound Effects)

| File | Shot | Trigger | Source | License | Purpose |
|---|---|---|---|---|---|
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/sfx-type-delete.mp3 | s1 | On "xoa" | video-shotcraft/assets/afx/ui-subtle-click.mp3 | CC0 | Tactile grounding |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/sfx-heartbeat.mp3 | s5 | On "kho" | video-shotcraft/assets/afx/heartbeat-soft.mp3 | CC0 | Internal tension |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/sfx-breath.mp3 | s6a-s6b | Gap s6a/s6b | video-shotcraft/assets/afx/breath-inhale.mp3 | CC0 | Embodies pause |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/sfx-light-shimmer.mp3 | s7 | On "giau di" | video-shotcraft/assets/afx/magic-subtle.mp3 | CC0 | Parts slipping away |
| public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/sfx-warm-resolve.mp3 | s9 | On "van con cho" | video-shotcraft/assets/afx/warm-chime.mp3 | CC0 | Resolution, hope |

---

## Mix Plan

**Target loudness:** -14 LUFS +/-1, True peak <= -1.5 dBTP
**Voice vs BGM:** BGM bed 12-18 dB below voice, ducking further 4-6 dB during voice
**BGM crossfade:** 0s fade in, s4 crossfade to bgm-turn, s8 crossfade back, s9 fade out 2s
**SFX:** -18 dBFS relative to voice, ducked 3 dB during voice overlap

---

## Verification Checklist

- [ ] All 10 voice clips present, valid MP3
- [ ] ASR matches voice.json (voice-clone-asr.md)
- [ ] Duration/syllable rate ~4.1 syl/s
- [ ] Silence gaps: s6a-s6b gap, s9 2s hold
- [ ] Loudness/clipping per clip within spec
- [ ] Timbre consistency
- [ ] BGM/SFX files present, CC0 licensed
- [ ] Beat grid documented (none)
- [ ] SFX cues mapped to accents
- [ ] Mix plan complete
