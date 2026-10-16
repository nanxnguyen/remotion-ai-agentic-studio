# Voice ASR check (xay-doi-minh-hay-chung-minh)

Route: fallback edge-tts `vi-VN-HoaiMyNeural` (Cam clone NOT authorized). ASR: faster-whisper `small`, CPU, language `vi`. CER after lowercase + punctuation normalisation; `adj` additionally maps digits→words (`18`→`mười tám`, `10`→`mười`, `1`→`một`, `5`→`năm`) and `TV`→`ti vi` (same pronunciation, orthographic only).

Repo ASR note: `faster-whisper` 1.2.1 + `av` 19.0.1 is broken (`metadata_errors` kwarg); bypassed by decoding wav via stdlib `wave` + numpy and passing the array to `transcribe`.

| key | CER raw | CER adj | ASR heard |
|---|---|---|---|
| s1 | 0.000 | 0.000 | Bạn đang xây cuộc đời mình, hay cố chứng minh ai đó đã sai? |
| s2a | 0.129 | 0.000 | 18 tuổi, mâm cơm tết đông họ hàng, bạn nói, con sẽ làm được. |
| s2b | 0.067 | 0.067 | Có người bực cười, nó á. Còn lâu? |
| s3 | 0.080 | 0.080 | Từ đó, Luân tháng đầu, chiếc xe, tấm bằng, thành gặp xây về phía nhà người đó. |
| s4 | 0.056 | 0.014 | Nửa đêm đang story xong, bạn mở danh sách người xem, tìm đúng 1 cái tên. |
| s5a1 | 0.000 | 0.000 | Họ có đang nhìn không? |
| s5a2 | 0.089 | 0.089 | Một tuối, bạn leo lên viên gặp cao nhất để xem. |
| s5b | 0.051 | 0.013 | Bên kia cửa sổ, người ta đang rửa bác, cười theo TV. Tối ấy, chẳng ai nhìn sang. |
| s6 | 0.017 | 0.017 | Phía sau bức tường, không cửa, không máy, không một chỗ để ngồi. |
| s7a | 0.080 | 0.000 | 10 năm, bạn xây một bức tường cho người khác nhìn. |
| s7b | 0.189 | 0.108 | Chưa xây 1 đăng phòng nào cho mình nhở |
| s8 | 0.125 | 0.078 | tôi còn lâu ý từng kéo bạn dậy lúc 5 giờ sáng. Nó cũng có công. |
| s9a | 0.000 | 0.000 | Người từng xem thường bạn có thể đã quên. |
| s9b | 0.031 | 0.031 | Còn bạn vẫn sống để họ phải tiết. |
| s10 | 0.044 | 0.044 | Viên gặt trên tay, lần này, bạn đặt xuống đất. Ngay chỗ mình đang đứng. |
| s11 | 0.088 | 0.088 | Viên gặt tiếp theo, bạn đặt cho ai? |

Adj CER > 0.04: s2b, s3, s5a2, s7b, s8, s10 (borderline), s11. All failures are vowel/final-consonant confusions typical of faster-whisper-small on Southern-accented TTS (final -c/-t merging: gạch→gặt/gặp, tiếc→tiết, bát→bác; close vowels: bật/bực, tối/tuối, mái/máy). Script watch-words: "story" ✓, "Còn lâu"/"còn lâu" ✓ everywhere, "Tết" ✓, "đặt" ✓, "tiếc"→"tiết" (final merge, mandatory line), "rửa bát"→"rửa bác" (final merge).
