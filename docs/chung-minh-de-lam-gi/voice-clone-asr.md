# Voice clone ASR check (chung-minh-de-lam-gi)

Ref: `docs/chung-minh-de-lam-gi/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Được công nhận rồi. Sao vẫn thấy trống? | 2 | 0.027 | được công nhận rồi, sao vẫn thay trống. |
| s2a | Tháng đầu đi làm, cuối buổi họp, bạn nói khẽ: để rồi xem. | 0 | 0.019 | Thắng đầu đi làm, cuối buổi họp bạn nói khẽ để rồi xem. |
| s2b | Ai đó cười khẩy thành tiếng: nó thì làm được gì. | 0 | 0.022 | Ai đó cười khảy thành tiếng, nó thì làm được gì? |
| s3 | Từ đó, tăng ca triền miên, bằng khen, chức danh, bạn gom hết về mình. | 1 | 0.016 | Từ đó tăng ca triển miên bằng khen chức danh bạn gom hết về mình. |
| s4a | Ngày nhận bằng khen, cả phòng đứng dậy vỗ tay, bạn cười rất tươi. | 0 | 0.032 | Ngày nhận bằng Khên, cả phong đứng dậy vỗ tay bạn cười rất tươi. |
| s4b | Tối về, phòng trọ im phăng phắc, tấm bằng khen nằm im trên tường. | 0 | 0.032 | Tối về, phòng trọ im phang phắc tấm bằng khên nằm im trên tường. |
| s5 | Nếu không ai biết chuyện này, bạn còn làm không? | 0 | 0.000 | Nếu không ai biết chuyện này, bạn còn làm không? |
| s6 | Thật ra, người ta để ý bạn ít hơn nhiều so với bạn vẫn tưởng. | 0 | 0.000 | Thật ra, người ta để ý bạn ít hơn nhiều so với bạn vẫn tưởng. |
| s7a | Bạn đã tưởng tấm bằng khen này sẽ lấp được câu nói cũ. | 0 | 0.038 | bạn đã tưởng tấm bằng khên này sẽ lớp được câu nói cũ. |
| s7b | Nó chỉ treo yên trên tường. Còn câu nói vẫn nằm trong ngực. | 0 | 0.000 | Nó chỉ treo yên trên tường, còn câu nói vẫn nằm trong ngực. |
| s8 | Có nghiên cứu theo dõi bốn tuần: đạt điều mình khoe, lòng vẫn nguyên chỗ trống. | 1 | 0.039 | Có nghiên cứu theo dõi 4 tuần, đạt điều mình khoe, lòng vẫn nguyên chỗ trống. |
| s9a | Nửa đêm, bạn soi gương thật lâu, không sửa tóc, chỉ nhìn. | 0 | 0.019 | Lửa đêm, bạn soi gương thật lâu, không sửa tóc chỉ nhìn. |
| s9b | Rồi bạn hỏi nhỏ: rốt cuộc, mình đang cần điều gì nhất? | 0 | 0.000 | Rồi bạn hỏi nhỏ, rốt cuộc, mình đang cần điều gì nhất? |
| s10 | Bấy lâu nay, bạn trao quyền định giá mình cho người khác. | 0 | 0.000 | Bấy lâu nay, bạn trao quyền định giá mình cho người khác. |
| s11 | Nếu từ mai không cần cho ai thấy nữa, bạn giữ lại điều gì? | 0 | 0.000 | Nếu từ mai không cần cho ai thấy nữa, bạn giữ lại điều gì. |
