# Voice clone ASR check (ban-khong-yeu-duoi-chi-da-manh-qua-lau)

References are recorded per shot in `voice-report.md`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small.

| clip | phrase | seed | CER | ASR |
|---|---|---:|---:|---|
| s9 | Người thường xuyên che ô cho người khác | 1 | 0.077 | Người thường xuyên trẻ ô cho người khác. |
| s9 | cũng có những ngày bị ướt. | 0 | 0.000 | Cũng có những ngày bị ướt |
| s8 | Bạn biết không… | 0 | 0.000 | Bạn biết không? |
| s7 | Mà vì bạn đã quen | 0 | 0.059 | mà vì bạn đã quên. |
| s7 | với việc mình phải là người ổn. | 0 | 0.000 | Với việc mình phải là người ổn. |
| s5 | Rồi nghĩ một lúc, | 0 | 0.000 | rồi nghĩ một lúc. |
| s5 | bạn lại thôi. | 0 | 0.000 | Bạn lại thôi! |
| s4 | Bạn muốn nhắn: | 0 | 0.077 | bạn muốn nhấn. |
| s4 | 'Hôm nay mình mệt quá.' | 0 | 0.000 | Hôm nay mình mệt quá! |
