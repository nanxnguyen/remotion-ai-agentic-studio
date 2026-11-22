# Thanh Hai Learn AI 2D Studio

Biến bất kỳ file giọng đọc nào thành video hoạt hình người que mang chất điện ảnh: người que đen có viền sáng diễn theo lời kể trong bối cảnh 2.5D tối và giàu cảm xúc, cận mặt khổng lồ, khoảnh khắc "đóng băng thời gian", số liệu và biểu đồ chuyển động, sơ đồ kiểu bản vẽ kỹ thuật, cảnh 3D low-poly, kèm nhạc nền và hiệu ứng âm thanh tự tạo.

Mọi khung hình đều được vẽ bằng code và render từng khung. Không dùng AI tạo ảnh hay tạo video, nên nhân vật luôn nhất quán và chữ luôn sắc nét. Hình ảnh được nghĩ mới cho từng kịch bản; phong cách luôn giữ nguyên.

## Mới trong v0.5.3: skill `doc-hud-video` (Tài liệu khoa học tư liệu thật + HUD & Infographic)
- **Skill mới `doc-hud-video`**: dựng video khám phá khoa học (kiểu *Tò Mò 1*) kết hợp ảnh/clip thật từ nguồn mở (NOAA, NASA, Wikimedia) với hiệu ứng Ken Burns, hạt bụi biển (`MarineSnowLayer`), thước đo độ sâu/thang đo dọc (`DepthGaugeHud`), lower-third viền vàng (`GoldLowerThird`), và infographic phân tầng 2D (`OceanBuildingInfographic`).
- Hỗ trợ cả **9:16 Shorts/TikTok (`1080×1920`)** tối ưu mobile safe-area và **16:9 Long-form (`1920×1080`)**.

## Mới trong v0.5.2: chuẩn thuật toán YouTube v3, `spotTracker`, Vbee-First & 1440p nhanh 3×
- **Cấu trúc giữ chân & tăng trưởng (`mascot-explainer`, `story-breakdown.md`)**: Chuẩn hóa Intro Vàng `<= 28 giây` (`<= 110` từ tiếng Việt), xâu chuỗi Open Loop xóa sạch "Section Cliffs", `1–2` cú lừa **False Victory** + kèo cược giữa video (**Mid-Video Wager**), điểm lặng `Silence Drop` (`0.02`) sạch slapstick, và **Binge Outro** không nói tạm biệt trỏ thẳng thẻ End Screen `15–20s`.
- **`spotTracker()` & `/engine/tihon.js` v3.0 (`explainer.js`, `engine-api.md`)**: Tích hợp thanh tiến độ đa vòng gọn tại dải Top HUD (`y = 92..130`), kèm bộ kiểm tra liên tục đạo cụ kịch bản–nhân vật và quy tắc tiếng Việt sạch cho Vbee (1 vòng `script -> voiceover.mp3 -> Whisper -> shots.json`).
- **Tối ưu render `1440p` & âm thanh `-14 LUFS` (`render-qc.md`, `render-video`)**: Cờ `--format jpeg --preset veryfast` tăng tốc chụp frame `1440p` ~2.5–3×, chuẩn `loudnorm` `-14.0 ± 0.4 LUFS` (`TP <= -1.0 dBTP`), lề HUD `x >= 52, y >= 36` và cỡ chữ callout `>= 30 px` nền tối `y <= 860`.

## Mới trong v0.5.1: chuẩn 2.5D điện ảnh, cảnh 3D POV & kiểm định dài tập
- **engine/explainer.js**: `dangerCard` tự chuẩn hóa cả dữ liệu mảng (`['Nhãn', 0.8, '18 cm']`); bổ sung `pill`, `stamp`, `popText` và `subtitleScrim` đo chữ chính xác bằng `measure()` giúp chữ tiếng Việt không bị tràn khung hay mất dấu trên nền sáng.
- **Đồ họa 2.5D & góc máy đa tầng**: hướng dẫn đổ khối gradient đa lớp cho linh vật/quái vật, lớp tiền cảnh mờ DoF (`blurLayer`), xoay vòng góc máy `OTS` / `POV` / `submerge` / `freeze` / `three-kit.js` 3D, cùng phòng tránh bẫy `radGrad` (6 tham số), `rng(seed)()`, `"bars": "none"`.
- **Render dài tập & QC chắc chắn**: hướng dẫn soi `--stills` cho toàn bộ cảnh 3D/POV, phục hồi render từng chunk (`--from/--to`) khi đứt quãng, kiểm định FFmpeg `blackdetect`/`freezedetect`/`silencedetect` + montage 16 khung hình từ MP4 hoàn chỉnh.

## Mới trong v0.5: video giải thích có linh vật (kiểu Dumb Doggo)
- Skill mới `mascot-explainer`: "làm video cảm giác đánh nhau với các loài nhện", "mọi cách để bị hoá thạch", "hành trình xuyên qua hệ tiêu hoá".
- Một linh vật gốc của kênh (chó, mèo hoặc gấu, tự chọn màu lông, áo) tự trải nghiệm từng sự thật và luôn là người chịu trận.
- Cấu trúc: mở bằng khoảnh khắc thảm nhất, các vòng có thẻ chỉ số thật (thanh chạy), gag cuối mỗi vòng, bộ đếm gag xuyên suốt, bảng xếp hạng, câu hỏi bình luận.
- Hiệu ứng truyện tranh (BỐP!, KẸP!), biển gỗ, so sánh kích thước, bộ côn trùng vẽ sẵn (bọ hung, nhện, cua, cây bắt mồi).
- Phụ đề giờ ngắt đúng câu, không còn vắt chữ sang câu sau.
- Project mẫu `mascot-explainer` (16:9, 46 giây, linh vật "Cún Lú").

## Mới trong v0.4: video "Sự tiến hoá của…" (kiểu diarymation)
- Skill mới `evolution-video`: nói "làm video sự tiến hoá của con mèo / của một cầu thủ / của điện thoại" là được.
- Một chủ thể biến đổi qua 6–10 giai đoạn: bộ đếm tuổi, năm hoặc "triệu năm trước" chạy số, tên giai đoạn bật lên, thanh timeline, hiệu ứng biến hình mỗi lần chuyển.
- Mở đầu bằng khoảnh khắc đỉnh cao, kết bằng hàng tất cả giai đoạn và một câu hỏi, vòng lặp cho Shorts.
- Bộ sinh vật vẽ sẵn: tế bào, cá, lưỡng cư, bò sát, thú, vượn, người đứng thẳng, người tinh khôn. Nhân vật lớn dần theo tuổi, về già thì còng lưng.
- Làm được video không có giọng đọc (chỉ nhạc + chữ).
- 2 project mẫu: `evolution-life` (9:16, 30 giây) và `evolution-species` (16:9, 26 giây).

## Mới trong v0.3: nhân vật biết diễn
- **Nguyên lý hoạt hình:** mỗi động tác có lấy đà, đi theo đường cong, nảy nhẹ quá đích rồi dừng; tóc và vạt áo đuổi theo khi dừng lại; nhảy và tiếp đất có co giãn (squash & stretch); dừng hình vài khung trước câu chốt.
- **Khẩu hình tiếng Việt:** nhân vật nói lời thoại có 7 hình miệng khớp từng âm tiết (tách theo phụ âm đầu, vần, phụ âm cuối).
- **Bàn tay biểu cảm** (chỉ, xòe, nắm, giơ ngón cái, vẫy, cầm) ở cảnh trung và cận.
- **Chất vẽ tay:** tuỳ chọn on twos (giữ hình 2 khung) và nét rung nhẹ, đúng xu hướng hoạt hình 2026; motion blur cho cảnh nhanh.
- **Kiểm tra trước khi render:** hook trong 3 giây đầu, không mở bằng logo, nhịp cắt, cảnh trùng cỡ liên tiếp.
- Project mẫu mới `motion-lab` (14 giây) minh hoạ tất cả; bộ test tự động (unit + so khung hình chuẩn) cho người phát triển plugin.

## Luôn hỏi ngôn ngữ video trước
Trước khi cài đặt, tạo file hay chỉnh sửa bất cứ thứ gì, Claude sẽ hỏi: **"Video này dùng ngôn ngữ nào?"** Ngôn ngữ bạn chọn được dùng cho cả quy trình:
- Whisper đánh mốc thời gian đúng ngôn ngữ (`--lang vi`, `--lang en`, …).
- Toàn bộ chữ trên màn hình (tiêu đề, nhãn, đơn vị, phụ đề) viết bằng ngôn ngữ đó.
- Tiếng Việt hiển thị đủ dấu trong cùng một font (tự chuyển sang Nunito cho chữ tiêu đề).

## Bạn có thể nói
- "Làm video 2D từ giọng đọc này" / "Make a 2D video from this voiceover": chạy toàn bộ quy trình.
- `/new-video`: hỏi ngôn ngữ, thiết lập video, đánh mốc thời gian lời đọc, lên danh sách cảnh.
- `/video-styles`: xem chính các cảnh của bạn ở 5 phong cách (Cinematic Dusk, Midnight Blue, Golden Hour, Neon Noir, Soft Storybook), chọn một hoặc tự thiết kế.
- `/render-video`: dựng và kiểm tra cảnh, xem thử, render video cuối.
- `/video-sound`: cảm xúc nhạc, hiệu ứng, âm nền, mix cuối.

## Đầu vào và tùy chọn
- **Ngôn ngữ video** (hỏi đầu tiên).
- **Giọng đọc** (mọi định dạng âm thanh phổ biến).
- **Kịch bản:** không bắt buộc. Có mốc thời gian (SRT/VTT/JSON/TXT) hoặc văn bản thường (tự canh thời gian). Không có kịch bản thì giọng đọc sẽ được chép lời tự động.
- **16:9 hoặc 9:16**, **720p / 1080p / 1440p / 4K**, phụ đề in cứng tùy chọn.
- **Nhạc:** tự tạo theo cảm xúc, nhạc của bạn, hoặc không. **Hiệu ứng:** 36 hiệu ứng có sẵn hoặc file của bạn.

## Cài đặt lần đầu (tự động)
Lần dùng đầu tiên, Claude chép studio vào thư mục dự án (`thanhhai-2d-studio/`) và cài:
- ffmpeg,
- các gói Node.js (renderer, Three.js, font),
- Chromium chạy ẩn,
- numpy, scipy và faster-whisper cho Python.

Whisper tải model giọng nói ở lần chép lời đầu tiên. Tổng cộng cần khoảng 1 GB dung lượng.

## Thời gian render
Máy cloud 2 nhân render 720p khoảng 2 khung hình/giây (video 47 giây mất khoảng 11 phút). 1080p lâu gấp khoảng 2 lần, 4K khoảng 8 lần. Máy bàn hiện đại nhanh hơn 3–5 lần. Video dài ở 4K nên render qua đêm.

## Nội dung
- `skills/make-2d-video/`: toàn bộ quy trình, style bible, nguyên lý hoạt hình và tài liệu tham khảo, cùng bộ studio (`kit/`: renderer, engine hoạt hình, công cụ chép lời, tổng hợp âm thanh và một project mẫu).
- `skills/new-video`, `skills/video-styles`, `skills/render-video`, `skills/video-sound`: các lệnh theo từng giai đoạn.
- `skills/evolution-video`: video "Sự tiến hoá của…".
- `skills/mascot-explainer`: video giải thích có linh vật.
- `skills/doc-hud-video`: video tài liệu khoa học kết hợp tư liệu thật, thước đo HUD và infographic.

Không cần API key hay connector.

© Thanh Hai Learn AI
