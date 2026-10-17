# Voice clone ASR check (xay-doi-minh-hay-chung-minh)

Ref: `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| key | CER raw | CER adj | ASR heard |
| s1 | Bạn đang xây cuộc đời mình, hay cố chứng minh ai đó đã sai? | 0 | 0.000 | bạn đang xây cuộc đời mình, hay cố chứng minh ai đó đã sai? |
| s2a | Mười tám tuổi, mâm cơm Tết đông họ hàng, bạn nói: "Con sẽ làm được." | 3 | 0.129 ⚠ | 18 tuổi mâm cơm tết đông họ hàng, bạn nói con sẽ làm được. |
| s2b | Có người bật cười: "Nó á? Còn lâu." | 0 | 0.067 | Có người bật cười nó còn lâu. |
| s3 | Từ đó, lương tháng đầu, chiếc xe, tấm bằng, thành gạch xây về phía nhà người đó. | 0 | 0.013 | từ đó lương tháng đầu chiếc xe tấm bằng thanh gạch xây về phía nhà người đó. |
| s4 | Nửa đêm đăng story xong, bạn mở danh sách người xem, tìm đúng một cái tên. | 0 | 0.014 | Nửa đêm đang story xong, bạn mở danh sách người xem tìm đúng một cái tên. |
| s5b | Bên kia cửa sổ, người ta đang rửa bát, cười theo ti vi. Tối ấy, chẳng ai nhìn sang. | 1 | 0.090 ⚠ | Bên kia cửa sổ người ta đang dựa bắt cười theo TV, tôi ấy chẳng ai nhìn sang. |
| s6 | Phía sau bức tường: không cửa, không mái, không một chỗ để ngồi. | 3 | 0.083 ⚠ | vì sau bức tường không cửa, không máy, không một chỗ để ngồi. |
| s7a | Mười năm, bạn xây một bức tường cho người khác nhìn. | 0 | 0.080 | 10 năm bạn xây một bức tường cho người khác nhìn. |
| s7b | Chưa xây một căn phòng nào cho mình ở. | 0 | 0.000 | chưa xây một căn phòng nào cho mình ở. |
| s8 | Câu "còn lâu" ấy từng kéo bạn dậy lúc năm giờ sáng. Nó cũng có công. | 0 | 0.047 | Câu còn lâu ấy từng kéo bạn dậy lúc 5 giờ sáng, nó cũng có công. |
| s9a | Người từng xem thường bạn có thể đã quên. | 0 | 0.000 | Người từng xem thường bạn có thể đã quên. |
| s9b | Còn bạn vẫn sống để họ phải tiếc. | 0 | 0.031 | Còn bạn vẫn sống để họ phải tiết. |
| s10 | Viên gạch trên tay, lần này, bạn đặt xuống đất. Ngay chỗ mình đang đứng. | 0 | 0.029 | Viên gạch trên tay, lần này bạn đã xuống đất, ngay chỗ mình đang đứng. |
| s11 | Viên gạch tiếp theo, bạn đặt cho ai? | 1 | 0.000 | viên gạch tiếp theo bạn đặt cho ai. |
| s5a1 | Họ có đang nhìn không? | 0 | 0.000 | Họ có đang nhìn không? |
| s5a2 | Một tối, bạn leo lên viên gạch cao nhất để xem. | 0 | 0.067 | Ngủ tối, bạn leo lên viên gạch cao nhất để xem. |
