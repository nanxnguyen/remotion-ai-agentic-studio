# Mix plan — Cột Đèn Thứ Tám

- Narration: Vbee Batch MP3, foreground, target peak around -6 dBFS; no time-stretch or syllable trimming.
- Ambient bed: original generated stereo WAV, low level (about 15–18% Remotion volume); keep at least 15 dB below narration during speech.
- SFX: integrated as subtle events in the ambient bed; avoid sharp transients and jump-scare spikes.
- Master: H.264 video + AAC audio, stereo 48 kHz; true peak target <= -1 dBTP; no clipping or long unintended silence.
- Transitions: soft 0.35–0.55s dissolves; never let transitions mask an important action or subtitle.
- Final check: measure all MP3s with FFprobe, confirm each clip ends before the next beat or intentionally continues over a supported visual; listen to the full mix before marking audio QA complete.
