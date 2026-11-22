# Truyện Ma 2D Studio

Plugin làm **video truyện ma / kinh dị bằng nhân vật 2D – 2.5D vẽ bằng code**, xây trên nền **Thanh Hai Learn AI 2D Studio** (engine canvas + Three.js, render từng khung bằng Chromium, ghép bằng ffmpeg). Mọi hình đều vẽ bằng code nên nhân vật nhất quán, chữ tiếng Việt sắc nét, không dùng AI tạo ảnh/video.

## Làm được gì
- **Từ ý tưởng tới video hoàn chỉnh:** đề xuất 3 ý tưởng dựa trên dữ liệu các kênh kinh dị đang thắng → kịch bản gốc có kế hoạch hù doạ (hook 0–3 s, leo thang 3 bậc, im lặng rồi hù, twist trả lại chi tiết đã cài) → giọng đọc → dựng cảnh → âm thanh → render → thumbnail, tiêu đề, mô tả.
- **4 định dạng:** Shorts 45–60 s (9:16), truyện đơn 8–15 phút, tổng hợp "3 chuyện có thật…" 15–25 phút, tập tâm linh dài 30–60 phút.
- **Engine kinh dị (`engine/horror.js` & `engine/ditap.js`):**
  - `engine/horror.js`: ma nữ tóc dài / ma trẻ con / cô dâu ma / bà già (lướt, không đi bộ; tóc rẽ dần để lộ mặt; tay vươn tới), bóng đen mắt đỏ phát sáng xuyên bóng tối, mắt trong bóng tối, bàn tay từ dưới giếng, dấu tay trên kính, hơi thở lạnh; bóng tối có lỗ sáng và đèn pin, đèn chập chờn, rung tim; bàn thờ (ảnh thờ mắt đỏ), nhang khói, nến, cây đa rễ phụ, giếng cổ, đèn lồng, vàng mã bay, mặt nước, nhà cổ mái ngói; **bộ cảnh "hẻm" 02:17** 2.5D; multiplane 2.5D, creep/punch/dolly-zoom; lớp phủ VHS, nhiễu sóng; thẻ tiêu đề, thẻ "QUY TẮC SỐ 1", đồng hồ 02:17, thẻ chương, chữ thumbnail.
  - `engine/ditap.js` (**Option C — Phong cách Dạ Hành Dị Tạp 25–35 phút**): nhân vật vector 2D dáng pill viền đen đậm (`ditapFigure`, `ditapBigFace`) với khăn tang xô trắng (`khanTang`), sẹo mày (`scar`), mắt đục một bên (`blindEye`), mặt trơn mất ngũ quan (`faceless`), áo bà ba, nón lá, hũ sành bịt vải đỏ, điện thoại phát sáng; bối cảnh gian thờ tổ tiên làm mờ hậu cảnh (`ditapAltar` với hoành phi `德流光`, gương trùm vải trắng, nến chập chờn) và phố chợ nông thôn xưa (`ditapVillageStreet`); thẻ tiêu đề đen (`ditapTitleCard`), phụ đề burn-in trắng viền đen sắc nét không hộp nền (`ditapSubtitle`, `ditapTimedSubtitle`) và chữ thumbnail tách màu (`ditapThumbText`).
- **5 màu phim kinh dị:** `amhon` (mặc định), `nhang`, `huyet`, `vhs`, `giayma` + 5 mood ánh sáng.
- **Âm thanh tự tạo, không bản quyền:** scare, reverse, drone, whisper, creak, knock, musicbox, breath, chuông chùa, drip, static, phong linh, wail, scrape + 5 mood nhạc (dread, haunt, folk, chase, void) + **hush** tự hạ nhạc trước cú hù.
- **Công cụ:** `scare_lint.py` (kiểm tra nhịp sợ, vẽ đường cong sợ hãi), `vbee_tts.py` (giọng Vbee, khoá API qua biến môi trường), `make_thumb.py` (thumbnail 1280×720 từ cảnh vẽ bằng code, nhiều phiên bản A/B).

## Skills
| Skill | Khi nào dùng |
|---|---|
| `make-horror-video` | Quy trình chuẩn làm trọn một video truyện ma |
| `make-horror-video-code` | **Option A:** Làm video truyện ma 100% vẽ bằng code nâng cấp (chất liệu tường, cận cảnh biểu cảm, không cần ảnh ngoài) |
| `make-horror-video-illustrated` | **Option B:** Làm video truyện ma kết hợp ảnh minh họa PNG nhiều lớp + animation/ánh sáng/camera 2.5D bằng code |
| `make-horror-video-ditap` | **Option C:** Làm video truyện ma / dị văn dân gian 25–35 phút phong cách **Dạ Hành Dị Tạp** 100% bằng code (`engine/ditap.js`: nhân vật dáng pill, khăn tang, mắt đục, mặt mất ngũ quan, gian thờ mờ hậu cảnh, phụ đề burn-in không hộp nền, kịch bản 8 hồi) |
| `horror-story-writer` | Chỉ viết / chấm / sửa kịch bản truyện ma (hỗ trợ cả cấu trúc 8 hồi Dạ Hành Dị Tạp) |
| `horror-package` | Tiêu đề, thumbnail, mô tả, chương, bình luận ghim, kế hoạch cắt Shorts |

Ví dụ câu lệnh: "làm video truyện ma về chiếc xe buýt số 0 cho kênh Hẻm Chuyện Lạ, 10 phút", "làm truyện ma 30 phút bằng code phong cách Dạ Hành Dị Tạp", "viết kịch bản Shorts 60 giây truyện ma giếng cổ", "làm thumbnail cho video truyện ma này".

## Cài đặt studio (lần đầu)
Skill tự làm: copy `kit/` thành `truyenma-studio/`, `npm install`, Chromium (hoặc dùng Chrome có sẵn qua `CHROME_PATH`), `pip install numpy scipy faster-whisper`, rồi tự kiểm tra bằng dự án mẫu `examples/hem-demo` và `examples/ditap-demo`.

## Giọng Vbee
Đặt `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN`, `VBEE_WEBHOOK_URL` trong biến môi trường (máy bạn hoặc GitHub Actions secrets). Không bao giờ ghi khoá vào file. Không có Vbee thì dùng file giọng tự thu.

## Ghi công
Engine nền: Thanh Hai Learn AI 2D Studio v0.5 (kit 1.1.0). Lớp kinh dị, công cụ và hướng dẫn: Ray.
