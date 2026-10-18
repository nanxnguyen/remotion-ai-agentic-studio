# Mix Plan: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Date:** 2026-10-18
**From:** assets-manifest.md

---

## Loudness Targets (measured on final MP4)

| Metric | Target | Measurement Method |
|---|---|---|
| Integrated loudness | −14 LUFS ±1 | ebur128 (ffmpeg) on full mix |
| True peak | ≤ −1.5 dBTP | ebur128 |
| LRA | ≤ 11 LU | ebur128 |
| Voice window (short-term) | Reference | 3s sliding window on voice-only segments |
| Music-only hold window | Reference | 3s window in holds (s5, s6a-s6b gap, s9 ending) |

---

## Voice vs BGM Balance

| Parameter | Value | Notes |
|---|---|---|
| BGM bed level | 12–18 dB below voice | Measured: voice window LUFS − music-only window LUFS |
| Ducking depth | Additional 4–6 dB | Applied during voice activity |
| Ducking attack | 150 ms | Smooth entry |
| Ducking release | 300 ms | Smooth exit, no pumping |
| Pumping risk | Low | s6a-s6b gap (800ms) allows full release |

---

## BGM Crossfade Schedule

| Time (est) | Shot | Action | Duration |
|---|---|---|---|
| 0.0s | s1 start | bgm-main fade in from -inf | 0.5s |
| ~23s | s4 start | Crossfade bgm-main → bgm-turn | 1.5s |
| ~47s | s8 start | Crossfade bgm-turn → bgm-main | 1.5s |
| ~57s | s9 end + hold | bgm-main fade out to -inf | 2.0s |

---

## SFX Cue Table (frame-accurate from timeline.ts)

| SFX File | Shot | Trigger Word | Frame Offset | Level (rel to voice) | Duck During Voice |
|---|---|---|---|---|---|
| sfx-type-delete.mp3 | s1 | "xóa" | +2 frames | −18 dBFS | Yes (−3 dB) |
| sfx-heartbeat.mp3 | s5 | "khó" (held) | +5 frames | −18 dBFS | Yes (−3 dB) |
| sfx-breath.mp3 | s6a→s6b | Gap | Gap start | −18 dBFS | N/A (in gap) |
| sfx-light-shimmer.mp3 | s7 | "giấu đi" | +3 frames | −18 dBFS | Yes (−3 dB) |
| sfx-warm-resolve.mp3 | s9 | "vẫn còn chỗ" | +5 frames | −18 dBFS | Yes (−3 dB) |

**Frame offsets** are from shot start (voice onset). Exact frames computed in join-notes.md after voice:measure.

---

## Voice Processing Chain (applied in gen-voice-clone.py)

1. **Trim silence** (start/end, -45dB threshold)
2. **Highpass** 70 Hz
3. **Equalizer** 180 Hz, Q=1, +1.5 dB (warmth)
4. **Compressor** threshold −22 dB, ratio 2.5:1, attack 15ms, release 200ms
5. **Loudnorm** I=−16 LUFS, TP=−1.5 dBTP, LRA=9
6. **Rate/tempo** per delivery notes (s5, s6a, s6b, s9 slowed)
7. **Pause insertion** per delivery notes (pause_before, pause_after)

---

## Final Master Bus (render-agent applies)

1. **Sum** voice + BGM + SFX
2. **Loudnorm** I=−14 LUFS, TP=−1.5 dBTP, LRA=11
3. **No additional limiting** (loudnorm handles TP)

---

## Implementation Notes (for Reel.tsx)

```tsx
// BGM volume callback (frame-based)
const bgmVolume = (frame: number) => {
  const bgm = getBGMForFrame(frame); // 'main' or 'turn'
  const voiceActive = isVoiceActive(frame);
  const base = bgm === 'main' ? -20 : -18; // dBFS relative to voice
  return voiceActive ? base - 5 : base; // duck 5 dB
};

// SFX triggers
const sfxTriggers = {
  's1': { frame: s1Start + 2, file: 'sfx-type-delete', level: -18 },
  's5': { frame: s5Start + 5, file: 'sfx-heartbeat', level: -18 },
  's6-gap': { frame: s6aEnd, file: 'sfx-breath', level: -18 },
  's7': { frame: s7Start + 3, file: 'sfx-light-shimmer', level: -18 },
  's9': { frame: s9Start + 5, file: 'sfx-warm-resolve', level: -18 },
};
```

---

## Acceptance Checks (audio-reviewer)

- [ ] Final MP4: -14 LUFS ±1, TP ≤ -1.5 dBTP
- [ ] Voice vs music-only windows: 12–18 dB difference
- [ ] Ducking audible in measurements (duck windows 4–6 dB lower)
- [ ] SFX cues audible, not on spoken words
- [ ] BGM crossfades smooth, no clicks
- [ ] s9 ending hold: 2s silence after voice, BGM fade out
- [ ] No pumping on s6a-s6b gap (duck returns fully)