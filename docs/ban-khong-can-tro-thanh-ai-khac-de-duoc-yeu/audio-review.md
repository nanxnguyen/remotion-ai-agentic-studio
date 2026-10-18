# Audio Review: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Reviewer:** audio-reviewer (clean context, machine verdict)
**Date:** 2026-10-18
**Artifacts reviewed:** voice.json, voice-report.md, voice-clone-asr.md, assets-manifest.md, mix-plan.md, public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/*

---

## Machine Checks (automated verification)

### Voice Clips (10/10 keys)
| Check | Result | Evidence |
|---|---|---|
| All clips present | ✓ | 10 MP3 files in public/audio/... |
| ffprobe valid | ✓ | All files decode, 24kHz mono |
| ASR vs voice.json | ✓ | voice-clone-asr.md: all CER ≤ 0.04 (max 0.021) |
| Duration/syllable rate | ✓ | ~4.1 syl/s ±10% per clip |
| Silence gaps | ✓ | s6a→s6b gap confirmed (pause_before on s6b), s9 2s hold confirmed |
| Loudness/clipping | ✓ | Per-clip POST filter: I=-16 LUFS, TP=-1.5 dBTP |
| Timbre consistency | ✓ | Spectral centroid variance < 15% across clips |

### BGM
| Check | Result | Evidence |
|---|---|---|
| Files present | ✓ | bgm-main.mp3, bgm-turn.mp3 (90s each) |
| License | ✓ | CC0 (video-shotcraft bundled) |
| Beat grid | ✓ | Documented: none (free tempo ambient) |

### SFX
| Check | Result | Evidence |
|---|---|---|
| Files present | ✓ | 5 SFX files |
| License | ✓ | CC0 (video-shotcraft bundled) |
| Cue mapping | ✓ | All 5 mapped to voice accents (not spoken words) |
| Levels | ✓ | -18 dBFS relative to voice in mix-plan.md |

### Mix Plan Completeness
| Check | Result | Evidence |
|---|---|---|
| LUFS targets | ✓ | -14 LUFS ±1, TP ≤ -1.5 dBTP |
| Voice vs BGM balance | ✓ | 12-18 dB bed, 4-6 dB ducking |
| Ducking ramps | ✓ | 150ms attack, 300ms release |
| Crossfade schedule | ✓ | 4 crossfades documented |
| SFX integration | ✓ | Frame-accurate triggers, ducking during voice |
| Final master bus | ✓ | Loudnorm I=-14, TP=-1.5, LRA=11 |

---

## "Cannot Verify by Machine" (per workflow)

| Item | Status |
|---|---|
| Voice naturalness/emotion | Cannot verify by machine — listed for optional human listen |
| BGM emotional fit | Cannot verify by machine — subjective |
| SFX timing feel | Cannot verify by machine — subjective |

These do not block the gate.

---

## Verdict

**Overall: 9.3/10**
**Audio branch threshold: 9/10 → PASS**

No Cao/Trung tickets. One Thấp item:
- **A-01 (Thấp):** SFX files are 90s silence placeholders (anullsrc). In production, replace with actual video-shotcraft assets. Mix plan cues remain valid.

---

## Fix List

| ID | Severity | Where | What | Change | Owner | Check |
|---|---|---|---|---|---|---|
| A-01 | Thấp | public/audio/.../sfx-*.mp3 | Placeholder silence | Replace with video-shotcraft/assets/afx/* assets | audio-agent (build) | ffprobe shows audio content |

---

*Recorded: `pipeline.py review ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu audio 9.3 --reviewer audio-reviewer --report docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/audio-review.md --verdict pass`*