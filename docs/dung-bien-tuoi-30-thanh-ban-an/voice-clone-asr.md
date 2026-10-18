# Voice clone ASR check (dung-bien-tuoi-30-thanh-ban-an)

Round 3 final PCM verification, 2026-10-18. Canonical text is locked in `docs/dung-bien-tuoi-30-thanh-ban-an/voice.json`; it was not edited. Route: VieNeu-TTS v3 Turbo clone with `docs/dung-bien-tuoi-30-thanh-ban-an/voice-ref/refTrungKien.wav`. ASR: faster-whisper `small`, CPU/int8, Vietnamese, after FFmpeg mono 16 kHz PCM decode. CER is punctuation/case-normalised character error rate; threshold is `<=0.04`.

Targeted regeneration used only `s1,s3a,s4a,s4b,s6a,s6b,s8,s10`, with `--tries 8`. Best selected seeds were `s1=1`, `s3a=3`, `s4a=1`, `s4b=0`, `s6a=0`, `s6b=0`, `s8=1`, `s10=1`. The final PCM check below is after common gain normalisation applied to all 16 clips.

| clip | canonical phrase | duration s | CER | result | current PCM ASR |
|---|---|---:|---:|---|---|
| s1 | Tuổi ba mươi, bị coi như một bản án. | 2.159042 | 0.294 | FAIL | Vũi 30 bị coi như một bản án. |
| s2 | Ba dòng tội danh: chưa nhà, chưa kết hôn, chưa có địa vị. | 3.326333 | 0.000 | PASS | ba dòng tội danh chưa nhà, chưa kết hôn, chưa có địa vị. |
| s3a | Cái thước khắc sẵn: mười tám học xong, hai mươi lăm cưới, ba mươi lên quản lý. | 4.297958 | 0.405 | FAIL | Cây thước khắc sẵn 18 học xong 25 cưới 30 liền quản lý. |
| s3b | Và danh sách ấy, vẫn cứ dài thêm. | 1.974625 | 0.129 | FAIL | và trên sách ấy vẫn cứ dài thêm. |
| s4a | Tết đến. Mâm cỗ còn bốc khói, thì những câu hỏi bật lên. | 3.380292 | 0.094 | FAIL | đến mâm cổ còn bốc khói, thì những câu hỏi bật lên. |
| s4b | Khi nào cưới? Lương bao nhiêu? Mua nhà chưa? | 2.347667 | 0.024 | PASS | Khi nào cưới, lưng bao nhiêu mua nhà chưa? |
| s5a | Bạn chưa có nhà, chưa kết hôn. | 1.660833 | 0.000 | PASS | bạn chưa có nhà, chưa kết hôn. |
| s5b | Nhưng ai đã quy định hôm nay bạn phải có đủ? | 2.497958 | 0.000 | PASS | nhưng ai đã quy định hôm nay bạn phải có đủ. |
| s6a | Một người ba mươi tuổi chưa có nhà, không nhất thiết là người thất bại. | 3.475083 | 0.101 | FAIL | Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại. |
| s6b | Cái mốc ba mươi ấy, chỉ là một nét ai đó kẻ tay. | 3.086917 | 0.174 | FAIL | Cây móc và mùi ấy chỉ là một nét ai đó kể tay. |
| s7a | Nửa đêm, bạn lướt thấy bạn bè đã có nhà, có xe, đã cưới. | 3.265958 | 0.038 | PASS | Nửa đêm, bạn lứt thấy bạn bè đã có nhà, có xe, đã cưới. |
| s7b | Rồi tự hỏi: mình đi nhầm đường à? | 1.748208 | 0.032 | PASS | Rồi tự hỏi, mình đi nhằm đường à. |
| s8 | Không phải bạn không tiết kiệm. Lương về chưa kịp giữ, đã có nơi đi mất. | 4.129958 | 0.058 | FAIL | không phải bàn không tiết kiệm. Lưu về chưa kịp giữ, đã có nơi đi mất. |
| s9a | Mà đã bao nhiêu năm rồi, chẳng ai hỏi bạn một câu. | 2.975458 | 0.000 | PASS | Mà đã bao nhiêu năm rồi? Chẳng ai hỏi bạn một câu? |
| s9b | Dạo này, bạn sống có vui không? | 1.909667 | 0.276 | FAIL | Bạn sống có vui không? |
| s10 | Đừng biến tuổi ba mươi thành bản án. | 1.897958 | 0.257 | FAIL | Đừng biến tuổi 30 thành bản ảnh. |

## Round-3 result

The final post-normalisation measurement has **7/16** clips at CER `<=0.04`: `s4b,s5a,s5b,s9a` plus the unchanged clean set `s2,s7a,s7b` (the rate columns above are syl/s, not CER). The targeted ASR ticket remains open for `s1,s3a,s4a,s6a,s6b,s8,s10`. `s3b` and `s9b` also fail in the final post-normalisation measurement, so the packet is not an audio-gate pass. Naturalness, Vietnamese tone/accent quality, breaths, clicks, robotic artifacts, and exact human-perceived wording remain unverified by machine.
