# Voice clone ASR check (camon)

Ref: `docs/camon/voice-ref/refA.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Có một phiên bản của mình... | 1 | 0.000 | có một phiên bản của mình. |
| s1 | đã cố gắng rất nhiều, | 0 | 0.000 | đã cố gắng rất nhiều. |
| s1 | nhưng chẳng mấy ai biết. | 1 | 0.000 | nhưng chẳng mấy ai biết. |
| s2 | Đó là những ngày đi làm về mệt rã rời, | 14 | 0.000 | Đó là những ngày đi làm về mệt rã rời. |
| s2 | vẫn tự nhủ: | 9 | 0.000 | vẫn tự nhủ. |
| s2 | thôi, mai cố thêm chút nữa. | 0 | 0.000 | Thôi, mai cố thêm chút nữa. |
| s3 | Là những lúc thấy người khác tiến nhanh quá, | 0 | 0.000 | là những lúc thấy người khác tiến nhanh quá. |
| s3 | mình cũng chạnh lòng chứ. | 40 | 0.083 ⚠ | Mình cũng chạy lòng chứ. |
| s3 | Mình tự hỏi liệu bản thân có đang làm đủ tốt không. | 1 | 0.000 | Mình tự hỏi liệu bản thân có đang làm đủ tốt không? |
| s4 | Hồi đó, | 0 | 0.000 | Hồi đó. |
| s4 | mình chỉ nhìn thấy những thứ mình chưa làm được. | 0 | 0.000 | Mình chỉ nhìn thấy những thứ mình chưa làm được. |
| s5 | Còn bây giờ nhìn lại... | 1 | 0.050 | Con bây giờ nhìn lại |
| s5 | mình thấy một người đã vượt qua rất nhiều ngày khó khăn. | 0 | 0.000 | Mình thấy một người đã vượt qua rất nhiều ngày khó khăn. |
| s6 | Có hôm buồn, | 0 | 0.000 | Có hôm buồn |
| s6 | vẫn dậy đi làm. | 2 | 0.000 | Vẫn dậy đi làm. |
| s6 | Có hôm, muốn bỏ cuộc, | 2 | 0.000 | Có hôm muốn bỏ cuộc. |
| s6 | vẫn chọn làm tiếp. | 0 | 0.000 | Vẫn chọn làm tiếp. |
| s7 | Chậm thôi, | 0 | 0.000 | Chậm thôi! |
| s7 | nhưng chưa từng đứng yên. | 5 | 0.000 | nhưng chưa từng đứng yên. |
| s8 | Nên mình muốn nói với phiên bản ấy một câu, | 0 | 0.024 | nên mình muốn nói với thiên bản ấy một câu. |
| s8 | mà ngày đó mình quên nói. | 0 | 0.000 | Mà ngày đó mình quên nói |
| s9 | Cảm ơn, | 0 | 0.000 | Cảm ơn. |
| s9 | vì đã cố gắng. | 0 | 0.000 | vì đã cố gắng. |
| s10 | Cảm ơn, | 0 | 0.000 | Cảm ơn. |
| s10 | vì đã đưa mình đến hôm nay. | 0 | 0.000 | vì đã đưa mình đến hôm nay. |

## Ghi chú (13/10/2026)
- ASR small và large-v3 nghe "rã rời" thành "giã rời", "chạnh lòng" thành "chạy lòng" ở nhiều seed. Hai lỗi này khớp với giọng Bắc của Anh Khôi: "r" đọc như "gi", vần "-anh" đọc gần "-ainh". Vì vậy có thể là ASR nghe nhầm giọng vùng miền, không hẳn là đọc sai. Cụm s3 "mình cũng chạnh lòng chứ" ghim seed 40: large-v3 nhận đúng "chạnh lòng" khi đọc riêng cụm này, nhưng khi đọc cả clip s3 thì lại ra "chạy lòng". **Cần người nghe kiểm câu này.**
- Hai câu "Cảm ơn" (s9, s10) được tách thành hai cụm "Cảm ơn," + "vì đã ...", nghỉ 0.28s/0.32s, rồi làm chậm nhẹ bằng atempo 0.85/0.82. Chậm theo yêu cầu "đọc chậm, ấm" của người dùng, không phải để ép vừa thời lượng.
