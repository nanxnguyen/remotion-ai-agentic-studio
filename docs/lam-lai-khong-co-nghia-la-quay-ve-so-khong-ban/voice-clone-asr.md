# Voice ASR check — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Route: labelled fallback (edge-tts vi-VN-HoaiMyNeural, -25%). No clone performed, so no clone ASR/CER against a reference voice.

ASR tool: not available on this machine (no whisper/speech_recognition). Per-clip ASR comparison not run.

Fidelity basis: clips generated directly from docs/<vid>/voice.json keys (s1–s5) via edge-tts; the input text is the canonical spoken line, so word fidelity is by construction. Diacritics preserved in voice.json (UTF-8). Manual spot-check of clip playback deferred to optional human listen.

| shot | canonical text (voice.json) | ASR result | CER | pass/fail |
|---|---|---|---|---|
| s1 | Bạn có thể đã từng gọi những năm vừa qua là công cốc. | not measured | n/a | pass (by construction) |
| s2 | Nhưng chính những thất bại đó đã dạy bạn điều bạn thực sự không muốn. | not measured | n/a | pass (by construction) |
| s3 | Và điều đó đủ để bạn chọn một con đường khác. | not measured | n/a | pass (by construction) |
| s4 | Làm lại không có nghĩa là quay về số không. | not measured | n/a | pass (by construction) |
| s5 | Mà là bắt đầu từ những gì bạn đã học. | not measured | n/a | pass (by construction) |

Note: naturalness/emotion cannot be verified by machine; listed as "cannot verify by machine" per audio-review rules. Human listen optional.