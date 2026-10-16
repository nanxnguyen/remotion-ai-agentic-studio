# Script — camon (v3)

10 clip TTS (giọng clone Anh Khôi, VieNeu-TTS; xem brief.md). Caption = đúng lời thoại, tách theo câu. Thời lượng thực tế đọc từ `src/camon/timeline.ts` (≈52s, gồm ~1.5s mờ sáng cuối). Các mốc giây trong bảng dưới là dự kiến theo bản edge-tts ban đầu, chỉ để định hướng; timeline.ts là chuẩn.
Độ dài shot = voice đo + 4f offset + hold hình (0.9-3.2s, khác nhau để không "ngắt đều"; dài ở đáy s4, lối mầm lá s7 và kết s10). Giọng không bị đổi tốc để ép thời lượng; riêng hai câu "Cảm ơn" được làm chậm nhẹ có chủ ý (xem brief).
Khối người dùng → thực tế: 0-5s ảnh cũ (s1: 0-4.8) · 5-20s về nhà/điện thoại (s2-s3: 4.8-18.0) · 20-38s đời thường (s4-s7: 18.0-36.8) · 38-50s nhìn lại ảnh, mỉm cười, về phía ánh sáng (s8-s10: 36.8-49.9).
Ảnh cũ (polaroid) chỉ ở s1 và s8-s10 (callback). Chuyển cảnh: crossfade 10f; s6→s7→s8 crossfade 6f để giữ đủ thời gian hình.

| # | giây | voice | Lời thoại | Hình (que, minh hoạ) | Chữ nhấn |
|---|---|---|---|---|---|
| 1 | 0-4.8 | 3.75 | Có một phiên bản của mình... đã cố gắng rất nhiều, nhưng chẳng mấy ai biết. | Frame 0-10: polaroid "hiện ảnh" (từ trắng sang hình) đã full khung, mưa rơi ngay từ frame 0, đèn đường chớp. Que xám xanh **không mặt** (dấu hiệu quay lưng) đi ra xa vào chiều sâu: nhỏ dần, bóng elip dưới chân. "chẳng mấy ai biết" bật nhẹ (scale 1.06 → 1). | cố gắng rất nhiều / chẳng mấy ai biết |
| 2 | 4.8-10.8 | 4.99 | Đó là những ngày đi làm về mệt rã rời, vẫn tự nhủ: thôi, mai cố thêm chút nữa. | Cửa mở, que xám bước vào, thả túi xuống (rơi bịch), ngồi gục vai mép giường. Bong bóng nghĩ nhỏ: "mai cố thêm chút nữa". | mệt rã rời |
| 3 | 10.8-18.0 | 6.03 | Là những lúc thấy người khác tiến nhanh quá, mình cũng chạnh lòng chứ. Mình tự hỏi liệu bản thân có đang làm đủ tốt không. | Điện thoại phóng to ~60% khung; trên màn hình 3 thanh tiến độ vọt lên + mũi tên; thanh của "mình" đứng yên, nhỏ. Vế 2: dấu "?" mờ nổi lên. | chạnh lòng / đủ tốt |
| 4 | 18.0-22.5 | 2.86 | Hồi đó, mình chỉ nhìn thấy những thứ mình chưa làm được. | Sáng sớm tối mờ: đồng hồ báo thức 6:00 rung, que nằm trên giường; quanh đầu hiện danh sách ô trống chưa tick. Nền tối nhất. Hold 1.5s. | chưa làm được |
| 5 | 22.5-27.7 | 3.97 | Còn bây giờ nhìn lại... mình thấy một người đã vượt qua rất nhiều ngày khó khăn. | Bước ngoặt: nền ấm lên (rêu → ánh vàng nhẹ). Que ngà ("mình bây giờ") đi qua một dải khung cảnh ngày đời thường (xe buýt, bàn làm việc, trăng, mưa) trượt ngang; mỗi khung có ô tick xanh nhỏ ở góc bật lên. | vượt qua |
| 6 | 27.7-32.9 | 4.12 | Có hôm buồn, vẫn dậy đi làm. Có hôm muốn bỏ cuộc, vẫn chọn làm tiếp. | Mỗi vế 1 hành động: (a) mây mưa nhỏ trên đầu, que vẫn bước ra khỏi cửa; (b) que ở bàn đẩy laptop ra, rồi kéo lại, mây tan. | vẫn dậy đi làm / vẫn chọn làm tiếp |
| 7 | 32.9-36.8 | 2.02 | Chậm thôi, nhưng chưa từng đứng yên. | Que đi bộ chậm trên con đường; mỗi bước để lại một mầm lá xanh, lối đi xanh dần. Hold 1.7s. | chưa từng đứng yên |
| 8 | 36.8-41.7 | 3.69 | Nên mình muốn nói với phiên bản ấy một câu, mà ngày đó mình quên nói. | Que ngà cầm tấm polaroid cũ (đúng ảnh s1: mưa, que xám không mặt) lên nhìn; ảnh phóng to dần tới gần full khung. | quên nói |
| 9 | 41.7-44.4 | 1.48 | Cảm ơn vì đã cố gắng. | Que xám trong ảnh "quay lại": mặt hiện dần, rồi bước ra khỏi khung ảnh. Camera zoom vào que ngà, đầu ~1.7x: mỉm cười rõ. | Cảm ơn |
| 10 | 44.4-49.9 | 2.12 | Cảm ơn vì đã đưa mình đến hôm nay. | Que ngà đặt tay lên vai que xám; cả hai bước về phía mặt trời đang lên; lối mầm lá sáng lên. Hold 3.2s tới hết, mờ dần ra sáng. Không hashtag. | đến hôm nay |

Lời giữ nguyên 100% lời gốc (chỉ thêm dấu phẩy "một câu, mà ngày đó"). Nếu sau này phải rút gọn lời: hỏi người dùng trước.
