# Brief — truongthanh (Đừng sợ phải trả giá cho sự trưởng thành)

## Content
- **Spine:** ai cũng muốn lớn lên, ít ai muốn nhận hóa đơn đi kèm. Ẩn dụ xuyên suốt: *hóa đơn của sự trưởng thành*.
- **Thông điệp 1 câu:** trưởng thành không phải hết sợ, mà là vẫn sợ nhưng vẫn chịu trả giá.
- **Tone:** ấm, thủ thỉ như podcast đêm khuya, có chút dí dỏm nhẹ ("trả góp", "thanh toán"), không giảng đạo, không đùa nỗi đau.
- **Callback:** "hóa đơn" mở đầu → "thanh toán" cuối, "Thức dậy đi" là câu chốt.
- **Hook (<6s):** "Ai cũng muốn trưởng thành. Nhưng ít ai muốn nhận hóa đơn đi kèm."
- **Ý chính (đều là phản tư, không cần nguồn):** hóa đơn gồm gì; trì hoãn = trả góp lãi cao; đau là lúc học nhiều; vẫn sợ vẫn trả; hôm nay hỏi "mình muốn trở thành ai".
- **Bỏ ra:** số liệu, trích dẫn, lời khuyên cụ thể cho hoàn cảnh riêng.
- **Giọng:** ưu tiên danh sách `vietnamese-voice-samples/`. Hợp nhất: **Ngọc Huyền 2.0** (Vbee, nhấn nhá truyền cảm) hoặc **Ngan/Huyen** (ElevenLabs). Chưa có API key hay clip → dùng bản tạm edge-tts `vi-VN-HoaiMyNeural` rate +0%, đọc chậm hơn video trước, và báo rõ.

## Style (user-specified reference: kênh pictogram kiểu "9 câu nói..." / "Hành trình kỷ luật")
- **Nền đen thuần `#000`**, nhân vật que (pictogram) **trắng đặc**, nét tròn dày; mặt chỉ có mắt chấm + miệng (cau/cười) màu đen.
- **Chữ:** trắng đậm (Inter 700) đặt **phía trên**, 2-3 dòng căn giữa, từ nhấn màu **cam `#F58B4C`**. Chữ trên đầu chính là caption, mỗi câu thoại một lần đổi chữ.
- **Cảnh:** mỗi câu = một pictogram diễn đạt đúng ý (đứng cầm hóa đơn, ngồi một mình dưới trăng, hai người xa dần, bóng cũ rời đi, ghế sofa + lãi tăng, leo cầu thang, run nhưng bước, mặt trời mọc). Phụ kiện đơn giản trắng/cam, không gradient, không bóng đổ.
- **Đáy:** nhãn kênh nhỏ xám "Thức dậy đi" (chữ, không dùng logo thật), hashtag ở cảnh cuối.
- **Chuyển động:** chậm, cắt thẳng giữa cảnh, nhân vật nhún nhẹ (idle bob), squash nhẹ khi xuất hiện; hold ≥0.5s; con dấu "ĐÃ THANH TOÁN" cam là cú đập duy nhất.
- **Khác video cũ:** không terminal, không sơ đồ node, không giấy kem, không serif; đen-trắng-cam + nhân vật que.
