# Brief — metkhong (Lớn rồi, ít ai hỏi mình có mệt không)

## Content
- **Story spine:** tối muộn trong căn phòng trọ/chung cư, một người tự làm mọi việc lặt vặt (thay bóng đèn, bê thùng, gõ máy khuya), rồi ngồi ăn một mình. Không ai thấy, không ai hỏi.
- **Thông điệp 1 câu:** lớn rồi không có nghĩa lúc nào cũng phải tự gánh hết, mệt thì được nghỉ và được nhờ giúp.
- **Tone:** thủ thỉ, đời thường, không hài, không giảng đạo, không sáo. Giống tâm sự đêm khuya với bạn thân.
- **Callback hình ảnh:** bàn tay tự làm mọi việc (s1-s4) → ánh mắt nhìn thẳng máy quay ở câu hỏi (s6) → bàn tay khác chìa ra / tách trà ấm ở cuối (s7).
- **Hook (<3s):** "Hồi nhỏ, ngã một cái là có người chạy tới hỏi: Đau không con?" + hình bàn tay trẻ con té / ảnh tuổi thơ nhãn "minh hoạ".
- **Claim:** không có claim sự thật/số liệu (nội dung phản tư cá nhân) → không cần nguồn. Firecrawl chỉ dùng tìm ảnh tham khảo (Phenikaa Lighting, Kiến Vàng, Tuổi Trẻ, Thanh Niên...) và bài viết burnout (VTV2, TikTok "gồng mình") để dựng hình, không đưa số liệu vào video.
- **Bỏ ra:** lời khuyên y tế/tâm lý cụ thể, số liệu burnout, so sánh "cố hơn nữa", CTA bán hàng.

## Style — "chung cư khuya xám lạnh + một bóng đèn ấm" (mới, không trùng)
- **Palette:** nền đêm xám lạnh `#141A24`, tường `#1E2633`, xám mệt `#9AA3B2`, chữ kem `#F3EDE2`, điểm ấm duy nhất vàng đèn `#FFC46B` (bóng đèn s1, đèn bàn s4-s7).
- **Chữ:** DM Serif Display Regular cho câu hỏi chốt s6 (nhìn thẳng), Be Vietnam Pro SemiBold cho caption dưới 2 dòng căn giữa các shot còn lại. Từ nhấn ("mệt không?", "nghỉ một chút") màu `#FFC46B`.
- **Khác Lan:** Lan = đen thuần `#000` + que trắng + cam `#F58B4C` + Inter trên đầu, cắt thẳng. Metkhong = xám lạnh có chiều sâu + tả thực bàn tay/người + vàng đèn + chữ dưới.
- **Khác gaplai:** gaplai = nâu đêm `#171310` + vàng đèn `#E8B04B` + BeVnPro. Metkhong = xám lạnh xanh `#141A24` (lạnh hơn, cô đơn hơn) + vàng `#FFC46B` + DM Serif cho câu chốt. Không ghế đối diện, không khung ảnh cũ.
- **Khác camon:** camon = đêm xanh-đá → bình minh `#F4C77D` + Lora trên đầu + polaroid/mầm lá. Metkhong = lạnh suốt tới s6, chỉ ấm lên ở s7 (tách trà/bàn tay), caption dưới, không polaroid, không mầm lá.
- **Chuyển động:** POV bàn tay (thay đèn, bê thùng), push-in rất chậm, hold ≥0.6s ở cảnh ăn một mình, cú đập duy nhất là s6 nhìn thẳng + push-in + đèn sáng lên một nấc.

## Giọng
- **Chọn (CHỐT theo user):** Vbee **Thanh Long nâng cao (Beta)** `hn_male_thanhlong_talk_24k-stl` — nam nhẹ nhàng, điềm tĩnh, hợp podcast chữa lành (voices.csv). File user đưa `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` (720KB) làm ref.
- **Thực tế:** không có `VBEE_*` key → clone zero-shot cục bộ bằng VieNeu-TTS v3 Turbo như video camon/gaplai, ref cắt từ preview trên. Nếu clone lỗi thì fallback edge-tts HoaiMy và báo rõ. Clip tại `public/audio/metkhong/s1..s7.mp3`.
- **Nhịp:** chậm, ấm, nghỉ 0.3-0.5s giữa các câu nặng, ~2.3 từ/giây.
