# Thiết kế nâng cấp `truyen-ma-2d-studio`: Phong cách Dạ Hành Dị Tạp (`make-horror-video-ditap`)

**Ngày:** 2026-11-21  
**Plugin mục tiêu:** `plugins/truyen-ma-2d-studio` (`v0.2.0`)  
**Nguồn nghiên cứu thực tế:** Video `https://www.youtube.com/watch?v=h2vVFeUv7a4` (*Thần Trùng - Chiếc Khăn Tang Thứ Ba Mươi Hai*, 29:59, 1.68M views / 12 ngày), *Bùa Lỗ Ban* (30:20, 123K views), *Thiên Linh Cái* (31:55, 27K views / 9h) trên kênh `@DạHànhDịTạp`.

## 1. Mục tiêu
Bổ sung **Option C (`make-horror-video-ditap`)** vào plugin `truyen-ma-2d-studio` để sản xuất hàng loạt video truyện ma / dị văn dân gian Việt Nam dài **25–35 phút** hoàn toàn bằng code 2D vector (chi phí ảnh = 0, tốc độ sản xuất cao, nhất quán tuyệt đối) theo đúng ngôn ngữ hình ảnh và cấu trúc giữ chân của `Dạ Hành Dị Tạp`.

## 2. Đặc trưng thị giác & kỹ thuật đã quan sát thực tế
1. **Nhân vật vector 2D dáng Pill (`ditapFigure`, `ditapBigFace`):**
   - Thân hình viên thuốc, vai tròn khớp rời, cổ ngắn, viền đen đậm đồng đều (`#111`, `3–4px`).
   - Đầu tròn/hơi oval, mắt tròn trắng to kèm con ngươi đen nhỏ liếc/nháy được, lông mày cong biểu cảm, miệng nhép `viseme` (`core.visemeAt`).
   - Biến thể bản địa: khăn tang xô trắng có dải rủ (`khanTang`), vết sẹo lông mày (`scar`), mắt đục một bên (`blindEye`), mặt trơn không mắt mũi (`faceless`), áo bà ba, áo tang trắng thắt dải xô, nón lá, râu dê bạc, đạo cụ (gậy, hũ sành bịt vải đỏ, điện thoại).
2. **Bối cảnh 2.5D làm mờ hậu cảnh (`ditapAltar`, `ditapVillageStreet`):**
   - Gian thờ hậu cảnh làm mờ (`blurLayer`) để nhân vật tiền cảnh bật khối: tường vôi/gỗ, hoành phi chữ Hán (`德流光`), di ảnh thờ, 2 cây nến bập bùng (`horror.flicker`), gương trùm vải trắng (`veiledMirrors`), quầng sáng ấm giữa khung và vignette 4 góc.
   - Phố chợ nông thôn Việt Nam xưa: đồi núi mờ sương ở độ sâu xa, các gian nhà mái ngói rêu với biển hiệu (`TẠP HOÁ`, `VẢI SỢI`), xe đạp, quang gánh.
3. **Typography & Nhịp dựng 30 phút:**
   - **Cold open 0:00–1:00:** Kể ngay quy tắc đếm / con số bất thường (không intro kênh).
   - **Title card lúc ~1:00 (`ditapTitleCard`):** Nền đen tuyền, biểu tượng tối giản phía trên, chữ trắng ngà Serif to, dòng phụ đỏ thẫm, tag nhỏ `TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM`.
   - **Phụ đề Burn-in (`ditapSubtitle`, `ditapTimedSubtitle`):** Font sans-serif trắng đậm (`Nunito 800`), viền đen dày sắc nét, **tuyệt đối không đặt khung hộp tối che nền**, nằm sát vùng an toàn đáy (`y = E.H * V(0.89, 0.80)`).
   - **Cấu trúc Twist & Ending:** 3 tầng leo thang kết hợp bẫy công nghệ hiện đại (video call / điện thoại là gương) → nghi thức giả → manh mối nhỏ → Twist lật vai ở 90% → lời kết phá vỡ bức tường thứ 4 ở 20s cuối (*"màn hình tắt thành mặt kính đen..."*).
4. **Đóng gói (`packaging`) & Thumbnail (`ditapThumb`):**
   - Tiêu đề tối giản: `[Từ khóa dân gian/cấm kỵ] - [Con số / chi tiết ám ảnh]`, bỏ đuôi thừa (`| Truyện Ma...`).
   - Thumbnail tách chữ trắng + đỏ nổi khối cực lớn, đặt cạnh khung cảnh cao trào 2D.

## 3. Thành phần triển khai
- `truyenma-studio/engine/ditap.js` (+ test `tests/unit/ditap.test.mjs`)
- `truyenma-studio/examples/ditap-demo/` (dự án mẫu 8 shot / 24s + `thumb.js`, pass `shot_lint --strict` & `scare_lint --strict`, render `sheet_01.png` + thumbnail để kiểm tra trực quan)
- `plugins/truyen-ma-2d-studio/skills/make-horror-video-ditap/{SKILL.md, references/ditap-playbook.md}` + symlink tại `.claude/skills/` và `.agents/skills/`
- Đồng bộ kit sang `plugins/truyen-ma-2d-studio/skills/make-horror-video/kit/`, cập nhật manifest (`v0.2.0`), `README.md`, `CHANGELOG.md`, `update_verify_kit.py`, `build-plugin.sh`, `validate_plugin.py`.
