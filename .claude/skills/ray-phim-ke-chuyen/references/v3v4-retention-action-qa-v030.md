# V3V4_RETENTION_ACTION_QA_V2 — Ray Phim Kể Chuyện v0.3.0

**Nguồn bài học:** so sánh sản xuất *Ngọn Hải Đăng Không Chiếu Ra Biển* V3 (10 cảnh nguồn, một số hành động chỉ được kể) và V4 (25 micro-shots từ 16 asset, hiệu ứng cửa, nước, tia sáng, hai twist). Đây là đánh giá chất lượng bản dựng, **không phải kết quả nghiên cứu tỷ lệ giữ chân thực tế**. Những ví dụ bên dưới chỉ là ca kiểm thử, không phải cốt truyện bắt buộc cho mọi phim.

## 1. Creative story lock: chứng cứ trước mỹ thuật

- HOOK 0–6s: 0–2s bất thường PHẢI nhìn ra ngay; 2–4s phản ứng cụ thể; 4–6s mối đe dọa/câu hỏi chưa giải. Không dạo đầu bằng logo, diễn giải dài hoặc tàu/hiện tượng ở quá xa nhìn không rõ trên điện thoại.
- BODY 6–30s: thông tin/hành động mới thường 3–6s/lần; biến cố có quan hệ nhân quả. CLIMAX 30–48s: sự kiện trực quan có hệ quả. PAYOFF 48–60s: không tiết lộ nhân vật/twist sớm; giữ hình rõ tối thiểu một khoảnh khắc sau fade cho người xem hiểu.
- Không lấy tổng micro-shot làm KPI đơn lẻ. V4 dùng 25 micro-shot để xử lý 10 câu chuyện/beat; các phim sau nên dùng số cảnh **vừa đủ**. Mặc định chia đoạn 6s có nhiều hành động thành 2–3 hình/cảnh; cảnh giữ ngắn có mục đích vẫn được phép.
- Chọn cast, giới tính, độ tuổi, nghề nghiệp theo **từng câu chuyện**; Character Bible bao gồm hình dáng, phụ kiện, hướng nhìn, vết nhận dạng, ký ức trẻ/già nếu có. Tránh lặp nam/nữ chính và biểu cảm một kiểu qua nhiều phim.

## 2. Gate P0: Voice → Visible Action → Frame Proof

Trước tạo asset phải có bản đồ sự kiện theo từng cụm lời kể (`id`, `start_sec/end_sec`, `narration`, `expected_visible_action`, `observable_evidence`, `asset_ref`, `review_frame_ref`, `evidence_time_sec`, `review_status`). Nếu voice nói **một vật chuyển động/hành động**, khán giả phải thấy **TRƯỚC → HÀNH ĐỘNG → KẾT QUẢ** theo đúng thứ tự hoặc một composite tương đương truyền tải rõ thay đổi. Không thể coi tiếng nói, caption hoặc zoom tĩnh là bằng chứng. Cảnh có hành động riêng phải có asset, pose sequence hay lớp composite được thiết kế riêng; không tái dùng bừa một ảnh V3 cho thoại V4.

**Regression Lighthouse:**
- Bóng tàu giơ tay **trước** Lâm → hai tư thế/nhịp trước-sau nhìn thấy và âm đúng thời điểm.
- Cầu thang → tay mở cửa → **trở lại cùng phòng đèn**, không chỉ là khung cầu thang.
- Nước biển thực sự **dâng dần thấp→cao trên màn hình**, không dùng voice cộng ảnh cầu thang để tự nhận là đạt.
- Tay vận hành cơ cấu → chùm đèn quét → chiếu vào tàu, SFX bám theo hành động.
- Nhận dạng Lâm trẻ/già có liên kết gương mặt, rồi mới reveal ngọn hải đăng chìm và giữ hình đủ lâu.

Cần lưu **proof frame MP4** và review trạng thái mặc định `pending`. Chỉ ghi `visually_verified` sau khi xem thật từng pixel/clip. Script kiểm tra JSON chỉ xác nhận *cấu trúc*, không xác định nội dung hình thật; không dùng kết quả script để tự tuyên bố cinematic/action QA đạt.

## 3. Motion, typography & audio

- Phong cách cinematic 2D/2.5D **được phép là FINAL** nếu câu chuyện minh họa đúng và MP4 mượt. Diễn xuất diễn viên như người thật KHÔNG bắt buộc. Không gọi keyframe zoom/pan là diễn xuất người thật. Đặt chuyển động camera liên tục subpixel, easing mượt, tránh ảnh đứng kéo dài không có tiến triển thị giác. Các tương tác quan trọng có thể dựng bằng 2–3 pose hoặc lớp composite, phải ghi trung thực loại kỹ thuật.
- Chuyển cảnh mặc định fade/crossfade **0.35–0.55s**, giữ overlap đủ, tránh hard cut, rung, glitch, flash hoặc zoom giật. Crossfade không được che bằng chứng hành động và không để mặt/chữ chồng ảo khiến người xem không đọc được. Kiểm tra ranh giới cảnh tại các frame gần nhau.
- Review storyboard 12–16 frame (thường 4×4) **có chữ tiếng Việt trong từng ô** theo mẫu phim trước; tông trắng ngà dẫn chuyện / vàng manh mối / đỏ twist. **MP4 chỉ dùng từng asset sạch độc lập**, subtitle Remotion/native xuất theo cụm 2–7 từ và đo thời điểm Vbee. Bảo vệ safe area mobile và vật chứng.
- Giọng Vbee thật: nguồn job/MP3, mã giọng, SHA-256 và thời lượng thực đo; khi kịch bản đổi phải phát lại câu đúng. Nhạc nền ducking dưới voice; SFX (còi tàu, cửa, nước, máy đèn...) đúng frame. **Nghe toàn bộ bản dựng**: dB, peak và silencedetect chỉ là dấu hiệu, không thay thế nghe giọng/nhạc/SFX, tránh khoảng rỗng dài không chủ ý, clipping và câu bị mất âm cuối.

## 4. Release gates & learning loop

**Không đánh dấu FINAL nếu P0 còn lỗi:** bất kỳ câu thoại hành động trọng yếu không thấy trên hình, mặt/trang phục không nhất quán, cue twist đọc được nhưng không thấy, hay lỗi âm thanh/hình nghiêm trọng. Sửa câu thoại hoặc tạo asset phù hợp, đừng dùng chuyển cảnh đẹp để che lỗi.

Bắt buộc review trên MP4 thực: `ffprobe` duration/codec/FPS/dimensions, giải mã toàn bộ với FFmpeg, black-gap/freeze/rung bất thường, contact sheet ~1–2 fps cộng toàn bộ biên fade và các sự kiện critical, phụ đề không lỗi dấu/chèn timecode, xem/nghe trên thiết bị dọc. Giữ ảnh bằng chứng trích MP4 tại từng event; ghi PASS/FAIL/PENDING và nguyên nhân, không tự tuyên bố vượt qua chỉ nhờ hash. Kiểm tra SHA-256 sau khi tải lại Drive khi có thể.

**Đo lường sau khi ĐĂNG:** Stayed to watch, Engaged views, Average view duration, Average percentage viewed, retention ở 0–2 / 24–30 / 36–42 / 48–60, lượt xem lại, lượt chia sẻ; so với baseline cùng kênh. Chấm điểm biên tập không phải dữ liệu thuật toán, không cam kết triệu view. Lưu kết quả và bài học để cải tiến phim mới; không dùng ngưỡng retention tự đặt làm cam kết.

**Lưu trữ:** Google Drive Video-shorts theo folder số thứ tự (cùng phim nâng V3→V4 thì cùng thư mục), giữ MP4/thumbnail/title-description riêng từng phiên bản để so sánh. GitHub `nanxnguyen/remotion-ai-agentic-studio` chỉ lưu source/shotlist/pipeline/QA và link Drive; **không upload MP4 lên GitHub Releases**. Chỉ báo link đã xác minh, không đổi quyền chia sẻ nếu chưa được đồng ý.

**Precedence:** Quy định v0.3.0 này supersede các chỉ dẫn cũ yêu cầu natural actor animation hoặc GitHub draft Release; giữ nguyên HOOK 0–6, bố cục storyboard có chữ và soft-fade được duyệt.
