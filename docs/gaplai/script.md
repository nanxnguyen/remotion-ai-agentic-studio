# Script — gaplai (Nếu gặp lại mình của vài năm trước) — v2

- Tổng: 9 shots, **186 từ**, voice thuần ước tính ~46.5s (chuẩn thận trọng 4.0 từ/giây cho giọng Cam),
  + padding (8×0.5s + 1.4s cuối = 5.4s) → video dự kiến **~52s**.
- Mỗi shot = 1 đoạn thoại riêng, tiếng Việt đời thường, đủ dấu (trừ hook s1 giữ nguyên 13 từ).
- v1 có 7 shots / ~130 từ / voice Cam 29.13s (quá nhanh, thiếu khoảng lặng).
  v2 = tách s7 cũ (chốt + CTA) thành s8 + s9 để CTA không nuốt lời chốt,
  + tách lớp "nghe kể" thành s4 + s5 để đào sâu chi tiết.
- Cột pause = gợi ý khoảng lặng khi clone/dựng (voice.json giữ text thuần, không kèm marker).

| # | từ | voice ước tính (4.0 từ/s) | pause gợi ý | thoại | hình ảnh |
|---|----|---------------------------|-------------|-------|-----------|
| s1 | 13 | ~3.3s | — | Gặp lại mình của vài năm trước, bạn sẽ nói gì đầu tiên? | Phòng đêm đèn vàng, một ghế có người ngồi, ghế đối diện trống; camera push-in chậm về ghế trống (hook giữ nguyên bản duyệt) |
| s2 | 25 | ~6.3s | — | Chắc không phải là cố lên đâu. Hồi đó mình đã cố nhiều rồi, cố tới mức chẳng muốn nghe thêm lời khuyên nào nữa. | Khung ảnh cũ hiện lên (nhãn "minh hoạ"): bản trẻ gục đầu bên bàn làm việc đêm khuya |
| s3 | 18 | ~4.5s | **0.6s sau "mệt lắm hả?"** | Mình sẽ ngồi xuống cạnh bạn ấy thôi, rồi hỏi khẽ một câu: dạo này, mệt lắm hả? | Hai ghế đối diện gần lại, tách trà bốc khói giữa bàn, ánh đèn ấm lên |
| s4 | 24 | ~6.0s | — | Rồi nghe bạn ấy kể hết. Những đêm tăng ca muộn, mùi mì khuya lẫn tiếng quạt rè, một mình nuốt mệt vào trong. | Khung ảnh cũ dissolve (nhãn "minh hoạ"): văn phòng khuya, tô mì đêm bốc khói; chi tiết giác quan mới |
| s5 | 24 | ~6.0s | — | Có tin nhắn soạn rồi lại xóa, chẳng dám gửi cho ai. Nhìn bạn bè đi xa, chỉ thấy mình đứng yên mà tủi. | Khung ảnh cũ (nhãn "minh hoạ"): màn hình điện thoại với tin nhắn đang soạn dở + hành lang đèn đêm về nhà |
| s6 | 25 | ~6.3s | — | Mình sẽ cho bạn ấy xem hôm nay. Chưa hoàn hảo đâu, vẫn mệt, nhưng biết nghỉ, biết nhờ giúp, biết tha cho mình hơn. | Khung ảnh mới đặt cạnh khung cũ: buổi sáng bình thường, cười nhẹ; đèn sáng hơn một nấc (không khoe, chỉ "đi qua được") |
| s7 | 20 | ~5.0s | **0.5s trước "cảm ơn nha"** | Và trước khi rời đi, mình sẽ ôm bạn ấy một cái thật lâu, rồi nói khẽ: cảm ơn nha. | Hai bóng người ôm nhau giữa hai ghế, ánh đèn vàng tràn đầy (cú đập duy nhất) |
| s8 | 17 | ~4.3s | **0.8s cuối shot, trước CTA** (lặng) | Vì lúc khó nhất, chính bạn đã gồng mình đưa chúng ta bước tiếp qua đoạn ấy. | Lặng: ghế nay trống, tách trà đã nguội, hai khung ảnh cạnh nhau; hold ≥0.6s |
| s9 | 20 | ~5.0s | — | Còn bạn thì sao, có điều gì muốn nhắn với mình của vài năm trước không? Kể mình nghe nhé. | Chữ cuối + CTA comment trên nền phòng đêm |

## Hooks (6 ứng viên, giữ từ v1)

1. Gặp lại mình của vài năm trước, bạn sẽ nói gì đầu tiên?
2. Nếu được ngồi đối diện mình của năm hai hai, bạn có dám nhìn thẳng không?
3. Đừng nói cố lên với mình của vài năm trước. Bạn ấy mệt lắm rồi.
4. Bạn nợ mình của vài năm trước một lời cảm ơn.
5. Tưởng tượng đi: tối nay, mình của vài năm trước gõ cửa phòng bạn.
6. Có một người đã gồng cả đoạn đường để bạn được như hôm nay.

**Hook được chọn:** số 1 — "Gặp lại mình của vài năm trước, bạn sẽ nói gì đầu tiên?"
**Vì sao:** hỏi thẳng người xem bằng ngôn ngữ đời thường, mở tò mò mà không spoil kết, khớp hình ảnh ghế trống ngay giây đầu.
