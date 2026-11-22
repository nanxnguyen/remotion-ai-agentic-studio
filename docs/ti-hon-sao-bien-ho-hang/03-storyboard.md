# Tài Liệu #3 — Storyboard & Bố Cục Hình Ảnh Tập 5 (`03-storyboard.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang`
- **Tệp hình tham chiếu trực tiếp (`1080×1920`, 9:16):**
  - Contact sheet 16 cảnh: `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/build/sheets/sheet_01.png`
  - Lưới nghiệm thu 4×4 trích từ MP4 cuối: `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/build/final_mp4_qa.png`
  - Thumbnail YouTube Shorts 9:16: `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/out/thumbnail-youtube.png`
- **Chuẩn thiết kế nhân vật (`scenes/cast.js` → `/engine/tihon.js` v3.0):**
  - Tí Hon v3.0 da xanh lá `#48b83e` (bóng `#2f8a28`), bụng kem ngấn ngang `#d8f3b4`, gai đầu & lưng xanh đậm `#1b661e`, khăn quàng cam `#f97316`, đế xám `#334155` gắn nút đỏ **`VỀ NHÀ`** và đèn **`TUA LẠI`** (không mũ bảo hộ vàng), viền sáng rim `#fde047`.
- **Quy tắc vùng an toàn 9:16 (`1080 × 1920`):**
  - Vùng mép tai thỏ trên: `y = 0..140`.
  - Vùng tiêu đề đỉnh (`drawTopHeader`): `y = 140..310`.
  - Sân khấu chính, thẻ dữ liệu & nhân vật: `y = 330..1330`, tránh vùng nút tương tác bên phải `x > 920` khi `y > 900`.
  - Vùng phụ đề (`captionStyle`): `y = 1360..1540` (`y = 1455`, cỡ `60`, tối đa `4` từ/dòng).
  - Vùng giao diện đáy YouTube Shorts / TikTok: `y > 1540`.

---

## 1. Bố Cục Chi Tiết 16 Ô Trên `build/sheets/sheet_01.png` (`s01` → `s16`)

| Ô trên Sheet | Mã cảnh & Thời gian | Bối cảnh & Cỡ cảnh | Vị trí nhân vật, Đạo cụ & Diễn xuất | Vùng chữ, Sơ đồ & Safe Zone 9:16 |
|---:|---|---|---|---|
| Ô #1 (Hàng 1, Cột 1) | **`s01`**<br>`0.000s–3.250s` | `ocean_bg` (`purple`)<br>**`close`** (`cut`) | Phôi nang phát sáng (`drawEmbryo`) phóng lớn ở trung tâm (`y≈680`) với 2 tế bào đỏ đánh dấu lỗ phôi đầu tiên; Tí Hon v3.0 đứng góc trái dưới sửng sốt toát mồ hôi. | `drawTopHeader` **`PHÔI THAI CỦA BẠN?`** / **`LÚC MỚI HÌNH THÀNH...`**; burst **`HẢ?!`** ở `(825, 515)` (r=105, tách hoàn toàn header); pill **`1. CÁI MÔNG?!`** ở `y≈920`. |
| Ô #2 (Hàng 1, Cột 2) | **`s02`**<br>`3.250s–5.750s` | `ocean_bg` (`ocean`)<br>**`medium`** (`zoom`) | Hai thẻ song song: trái là `SAO BIỂN` (`= BẠN ✓`), phải là `CON TÔM` (`KHÁC ✗`); Tí Hon đứng góc trái dưới thuyết minh. | `drawTopHeader` **`PHÁT TRIỂN PHÔI GIỐNG AI?`** / **`SAO BIỂN vs CON TÔM`**; toàn bộ thẻ nằm trong `y=390..880`. |
| Ô #3 (Hàng 1, Cột 3) | **`s03`**<br>`5.750s–8.600s` | `ocean_bg` (`ocean`)<br>**`data`** (`whip`) | 2 thẻ quiz đối đầu `A: CON TÔM` vs `B: SAO BIỂN` kèm vòng tròn `VS` ở giữa; Tí Hon đứng dưới tự tin đố khán giả. | `drawTopHeader` **`AI LÀ BÀ CON GẦN HƠN?`** / **`CHỌN A HAY B?`**; hai thẻ nằm gọn trong `y=410..810`. |
| Ô #4 (Hàng 1, Cột 4) | **`s04`**<br>`8.600s–11.460s` | `ocean_bg` (`ocean`)<br>**`close`** (`cut`) | Thẻ A phóng lớn giữa khung với con tôm bơi sinh động; Tí Hon đứng dưới-trái quan sát. | `drawTopHeader` **`LỰA CHỌN A: CON TÔM?`** / **`NHÌN RẤT GIỐNG ĐỘNG VẬT!`**; 3 pills **`✓ CÓ MẮT`**, **`CÓ CHÂN`**, **`BƠI VÈO VÈO`** hiện lần lượt dưới thẻ (`y≈900..960`). |
| Ô #5 (Hàng 2, Cột 1) | **`s05`**<br>`11.460s–14.280s` | `ocean_bg` (`ocean`)<br>**`medium`** (`whip`) | Nền đáy biển cát vàng (`drawSeabedFloor`) với rong biển; thẻ B ở trên chiếu sao biển mắt ngố (`goofy`) cùng mạch nước nhấp nháy; Tí Hon suy nghĩ góc trái. | `drawTopHeader` **`LỰA CHỌN B: SAO BIỂN?`** / **`TRÔNG NGỘ GHÊ...`**; 3 pills **`✗ KHÔNG ĐẦU`**, **`✗ KHÔNG NÃO`**, **`BƠM NƯỚC BIỂN`** xếp gọn dưới thẻ B. |
| Ô #6 (Hàng 2, Cột 2) | **`s06`**<br>`14.280s–16.550s` | `ocean_bg` (`emerald`)<br>**`freeze`** (`flash`) | Cột trái: thẻ Con Tôm dính mộc đỏ **`SAI RỒI! ✗`** từ `lt=0.08s`. Cột phải: `drawHumanIcon` nối sợi DNA vàng-lam xuống Sao Biển phát hào quang. | `drawTopHeader` **`SAI RỒI! ĐÁP ÁN LÀ...`** / **`SAO BIỂN = BÀ CON CỦA BẠN!`**; pill **`BÀ CON CỦA BẠN! ✓`** ở `y≈980`. |
| Ô #7 (Hàng 2, Cột 3) | **`s07`**<br>`16.550s–18.300s` | `ocean_bg` (`blueprint`)<br>**`blueprint`** (`dip`) | Nền lưới Blueprint phóng to phôi nang với vòng tròn radar tập trung vào lỗ đầu tiên bên dưới; Tí Hon đứng nhỏ góc trái dưới làm điểm nhấn tỷ lệ. | `drawTopHeader` **`BÍ MẬT PHÔI THAI HỌC`** / **`CÁI LỖ ĐẦU TIÊN TRÊN PHÔI`**; pill **`LỖ ĐẦU TIÊN (BLASTOPORE)`** dưới vòng phôi. |
| Ô #8 (Hàng 2, Cột 4) | **`s08`**<br>`18.300s–19.940s` | `ocean_bg` (`blueprint`)<br>**`insert`** (`cut`) | Hai ô Blueprint nối mũi tên đỏ: trái là `PHÔI CON TÔM`, phải là `CON TÔM` ngoạm miệng đại diện nhánh `PROTOSTOMIA`. | `drawTopHeader` **`Ở CON TÔM THÌ SAO?`** / **`LỖ ĐẦU TIÊN BIẾN THÀNH CÁI MIỆNG`**; mũi tên & nhãn gọn trong `y=430..820`. |
| Ô #9 (Hàng 3, Cột 1) | **`s09`**<br>`19.940s–24.040s` | `ocean_bg` (`emerald`)<br>**`data`** (`cut`) | Khung trên hiển thị phôi **`1. CÁI MÔNG`**; khung dưới là lưới 4 loài (`BẠN (NGƯỜI)`, `CÁ`, `CHIM`, `SAO BIỂN`) hội tụ về lõi DNA trung tâm. | Stamp xanh cỡ lớn `size=46` **`DEUTEROSTOMIA ✓`** hiện đầy đủ tại `lt=2.72s` ở khoảng trống `y≈1150` bên cạnh Tí Hon. |
| Ô #10 (Hàng 3, Cột 2) | **`s10`**<br>`24.040s–28.150s` | `ocean_bg` (`ocean`)<br>**`medium`** (`whip`) | Đáy biển cát vàng (`drawSeabedFloor`): sao biển ngồi trên con sò mở (`drawClam`) lộn túi dạ dày hồng ra ngoài; Tí Hon bên trái hốt hoảng ghê sợ. | `drawTopHeader` **`TUYỆT CHIÊU ĂN ĐỘC LẠ`** / **`SAO BIỂN TIÊU HÓA NGAY TRONG VỎ SÒ`**; pill hồng **`LỘN DẠ DÀY RA NGOÀI 🤢`** (`y≈405`) và burst **`MĂM!`** (`r=92`) gọn trên sao biển. |
| Ô #11 (Hàng 3, Cột 3) | **`s11`**<br>`28.150s–29.880s` | `ocean_bg` (`coral`)<br>**`close`** (`dip`) | Khoảnh khắc **Silence Drop**: cận mặt `bigFaceTiHon` chính giữa khung (`y≈780..1040`), mắt đảo `saccade`, khẩu hình `visemeAt`, mồ hôi rơi. | `drawTopHeader` **`KHOAN ĐÃ...?!`** / **`TÍ HON VỪA NHẬN RA ĐIỀU GÌ?`**; bong bóng nghĩ **`TỚ CŨNG...`** phía trên nút `VỀ NHÀ`. |
| Ô #12 (Hàng 3, Cột 4) | **`s12`**<br>`29.880s–32.280s` | `ocean_bg` (`purple`)<br>**`close`** (`cut`) | `bigFaceTiHon` lệch trái hoảng loạn kết nối sợi DNA vàng-lam với Sao Biển đáng yêu quàng khăn cam giống hệt! | `drawTopHeader` **`TÍ HON & SAO BIỂN`** / **`BÀ CON CÙNG ĐỜI PHÔI?!`**; pill **`BÀ CON TỪ CÁI MÔNG?!`** ở `y≈430`. |
| Ô #13 (Hàng 4, Cột 1) | **`s13`**<br>`32.280s–33.300s` | `ocean_bg` (`purple`)<br>**`ots`** (`whip`) | Trên nền đáy biển: Tí Hon (`visemeAt`) quay lưng vẫy tay phủ nhận; sao biển quàng khăn cam đứng bên phải xụ mặt buồn. | `drawTopHeader` **`CHỐI BỎ HỌ HÀNG?!`** / **`NHƯNG PHÔI KHÔNG NÓI DỐI!`**; pill đỏ **`KHÔNG NHẬN ĐÂU!! 🙅`** phía trên Tí Hon. |
| Ô #14 (Hàng 4, Cột 2) | **`s14`**<br>`33.300s–34.700s` | `ocean_bg` (`emerald`)<br>**`medium`** (`cut`) | Tí Hon (`visemeAt`) đứng ở `y≈1135`, vung đuôi cong vút lên chạm mép trái nút **`ĐÃ ĐĂNG KÝ ✓`** ở `y=620` hoàn toàn sạch chữ. | `drawTopHeader` **`ĐĂNG KÝ KÊNH NHÉ!`** / **`KHỦNG LONG TÍ HON`**; pill **`BẤM CHUÔNG HẸN TẬP SAU! 🔔`** ở `y=1235`. |
| Ô #15 (Hàng 4, Cột 3) | **`s15`**<br>`34.700s–37.780s` | `ocean_bg` (`abyss`)<br>**`wide`** (`whip`) | Sứa bất tử *Turritopsis dohrnii* phát sáng tím-xanh lơ lửng giữa biển thẳm (`y≈680`) với các xúc tu uốn lượn. | `drawTopHeader` **`TẬP SAU: SINH VẬT KỲ LẠ`** / **`SỐNG MÃI KHÔNG GIÀ?!`**; 3 pills **`KHÔNG TIM 💔`**, **`KHÔNG NÃO 🧠✗`**, **`GẦN NHƯ BẤT TỬ ♾️`** bố trí quanh sứa. |
| Ô #16 (Hàng 4, Cột 4) | **`s16`**<br>`37.780s–38.438s` | `ocean_bg` (`abyss`)<br>**`end`** (`flash`) | Bóng sứa bí ẩn phát sáng với dấu **`?`** lớn ở giữa; kết thúc nối vòng lặp tự nhiên về `s01`. | `drawTopHeader` **`TẬP SAU: CON GÌ ĐÂY?`** / **`NHỚ ĐÓN XEM NHÉ!`**; pill **`ĐOÁN Ở BÌNH LUẬN! 👇`** ở `y≈1050` trên vùng phụ đề. |

---

## 2. Kết Quả Kiểm Định Storyboard & Thumbnail

- Toàn bộ 16 cảnh trên `build/sheets/sheet_01.png` và các stills kiểm định đã sạch hoàn toàn sau khi xử lý 2 lỗi burst `popText` (`s01` đổi thành `"HẢ?!"`, `s10` đổi thành `"MĂM!"`, `s09` phóng to stamp `DEUTEROSTOMIA ✓`).
- Thumbnail `out/thumbnail-youtube.png` (`1080×1920`, `1.732.171` bytes) thể hiện rõ `bigFaceTiHon` v3.0 sửng sốt + Sao Biển khăn cam + Con Tôm gạch `✗` + DNA + hook **`SAO BIỂN = BÀ CON?!`** sắc nét, giữ sạch vùng UI đáy và góc phải.

