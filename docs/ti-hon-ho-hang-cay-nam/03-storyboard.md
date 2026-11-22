# Tài Liệu #3 — Storyboard & Bố Cục Hình Ảnh — Bản V2 (`03-storyboard.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam`
- **Tệp hình tham chiếu trực tiếp (Bản V2 `41.476s`):**
  - Contact sheet 18 cảnh (`1080×1920` tỷ lệ 9:16): `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/build/sheets/sheet_01.png`
  - Lưới nghiệm thu 4×4 trích từ MP4 V2 cuối: `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/build/final_mp4_qa_v2.png`
  - Thumbnail YouTube Shorts 9:16: `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/out/thumbnail-youtube.png`
- **Chuẩn thiết kế nhân vật (`scenes/cast.js` → `/engine/tihon.js` v3.0):**
  - Tí Hon v3.0 da xanh lá `#48b83e` (bóng `#2f8a28`), bụng kem ngấn ngang `#d8f3b4`, gai đầu & lưng xanh đậm `#1b661e`, khăn quàng cam `#f97316`, đế xám `#334155` gắn nút đỏ **`VỀ NHÀ`** và đèn **`TUA LẠI`** (không mũ bảo hộ vàng), viền sáng rim `#fde047`.
- **Quy tắc vùng an toàn 9:16 (`1080 × 1920`):**
  - Vùng mép tai thỏ trên: `y = 0..140` (để trống hoàn toàn).
  - Vùng tiêu đề đỉnh (`drawTopHeader`): `y = 140..310`.
  - Sân khấu chính, thẻ dữ liệu & nhân vật: `y = 330..1330`, các nhãn quan trọng tránh vùng nút tương tác bên phải `x > 920` khi `y > 900`.
  - Vùng phụ đề (`captionStyle`): `y = 1360..1540` (tâm chữ `y = 1455`, cỡ `60`, tối đa `4` từ/dòng).
  - Vùng giao diện đáy YouTube Shorts / TikTok: `y > 1540` (không đặt chữ hoặc mặt nhân vật dưới `y = 1520`).

---

## 1. Bố Cục Chi Tiết 18 Ô V2 Trên `build/sheets/sheet_01.png` (`s01` → `s18`)

| Ô trên Sheet | Mã cảnh & Thời gian | Bối cảnh & Cỡ cảnh | Vị trí nhân vật, Đạo cụ & Diễn xuất | Vùng chữ, Sơ đồ & Safe Zone 9:16 |
|---:|---|---|---|---|
| Ô #1 (Hàng 1, Cột 1) | **`s01`**<br>`0.000s–0.850s` | `studio_bg` (`purple`)<br>**`close`** (`cut`) | Đũa lao xuống đĩa ăn (`x=540, y=880`) ngay khung đầu tiên; Tí Hon v3.0 nhảy ra chặn lại với `KHOAN!` và `ĐỪNG GẮP!!` hoàn tất từ `0.15s` (`stopAt=0.42s`). | Burst **`KHOAN!`** góc trên-trái, pill đỏ **`ĐỪNG GẮP!!`** ở đỉnh giữa; phụ đề ở `y=1455`. |
| Ô #2 (Hàng 1, Cột 2) | **`s02`**<br>`0.850s–2.700s` | `studio_bg` (`purple`)<br>**`medium`** (`zoom`) | Tia nền tím xoáy; biểu tượng con người (`drawHumanIcon`) ở trên giữa nối sợi DNA vàng-lam phát sáng xuống cây nấm trên đĩa; Tí Hon toát mồ hôi ở góc trái dưới. | `drawTopHeader` **`BÀ CON CỦA BẠN?!`** / **`KHOAN ĐÃ...`** (`y=170..280`); pills **`BẠN`** và **`HỌ HÀNG!`** hai bên DNA. |
| Ô #3 (Hàng 1, Cột 3) | **`s03`**<br>`2.700s–5.500s` | `studio_bg` (`blue`)<br>**`data`** (`whip`) | 3 thẻ bài `A: CON GÀ`, `B: CỌNG RAU`, `C: ???` dàn đều trong vùng `y=410..730` và hiện đủ trong `2.80s`; Tí Hon đứng thuyết minh bên dưới-trái. | `drawTopHeader` **`ĐỐ BẠN: HỌ HÀNG CỦA BẠN?`**; pill câu hỏi **`BẠN CHỌN AI?`** bên phải Tí Hon (`x<=920`). |
| Ô #4 (Hàng 1, Cột 4) | **`s04`**<br>`5.500s–7.100s` | `studio_bg` (`blue`)<br>**`close`** (`cut`) | Thẻ A phóng lớn chính giữa với đùi gà quay; đúng `lt=1.18s`, dấu mộc đỏ **`SAI! ✗`** dập xiên lên thẻ A kèm rung khung hình. | `drawTopHeader` **`LỰA CHỌN A: CON GÀ?`**; nội dung thẻ nằm gọn trong `y=360..920`, Tí Hon góc dưới trái. |
| Ô #5 (Hàng 2, Cột 1) | **`s05`**<br>`7.100s–8.460s` | `studio_bg` (`orange`)<br>**`ots`** (`whip`) | Ánh cam ấm áp; Tí Hon (`visemeAt`) và chú gà trắng (`drawChickenBuddy`) đứng cạnh nhau dưới vòng xoắn DNA vàng nối hai đầu, gợi nhắc Tập 3. | `drawTopHeader` **`HỌ HÀNG CỦA TỚ!`** / **`NHỚ TẬP TRƯỚC KHÔNG?`** + pill **`HỌ HÀNG KHỦNG LONG`**. |
| Ô #6 (Hàng 2, Cột 2) | **`s06`**<br>`8.460s–11.700s` | `studio_bg` (`blue`)<br>**`medium`** (`cut`) | Hai thẻ `B: CỌNG RAU` và `C: CÂY NẤM?` đặt trên dải đất nâu chung; Tí Hon nghĩ ngợi rồi thẻ B dính mộc đỏ **`SAI LUÔN! ✗`** tại `lt=2.50s`. | `drawTopHeader` **`LỰA CHỌN B: CỌNG RAU?`** / **`CÙNG MỌC TỪ ĐẤT MÀ...`**; không che phụ đề đáy. |
| Ô #7 (Hàng 2, Cột 3) | **`s07`**<br>`11.700s–13.450s` | `studio_bg` (`emerald`)<br>**`freeze`** (`flash`) | Thẻ C viền vàng phát sáng ở `(540, 685)` (`y>=385` tách khỏi `CHÍNH LÀ...`), `beatHold` đúng `lt=0.74s`; cây nấm 2.5D cười tươi; Tí Hon ở `(215, 1270)`. | `drawTopHeader` **`ĐÁP ÁN CHÍNH XÁC!`** / **`CHÍNH LÀ...`**; pill **`ĐÁP ÁN: CÂY NẤM! 🍄`** ở `(575, 1015)`. |
| Ô #8 (Hàng 2, Cột 4) | **`s08`**<br>`13.450s–15.100s` | `studio_bg` (`emerald`)<br>**`wide`** (`whip`) | Mặt trời góc trên-trái chiếu luồng `godRays` xuống cây cải xanh hạnh phúc trên luống đất; các đốm sáng đường bay quanh tán lá; Tí Hon đứng bên trái. | `drawTopHeader` **`RAU TỰ LÀM THỨC ĂN`** / **`TỔNG HỢP NĂNG LƯỢNG TỪ ÁNH NẮNG`**; pill **`QUANG HỢP ☀️`**. |
| Ô #9 (Hàng 3, Cột 1) | **`s09`**<br>`15.100s–17.650s` | `studio_bg` (`emerald`)<br>**`medium`** (`cut`) | Bên trái: mặt trời bị gạch dấu `X` đỏ (**`KHÔNG QUANG HỢP`**), nấm đâm rễ tơ vàng hút dưỡng chất dưới đất. Bên phải: dấu `=` nối sang `drawHumanIcon` và Tí Hon. | `drawTopHeader` **`NẤM THÌ KHÔNG QUANG HỢP`**; hai pill **`KHÔNG QUANG HỢP`** và **`PHẢI ĂN GIỐNG BẠN`** ở `y=480..540`. |
| Ô #10 (Hàng 3, Cột 2) | **`s10`**<br>`17.650s–20.800s` | `studio_bg` (`blue`)<br>**`blueprint`** (`dip`) | Nền lưới Blueprint kỹ thuật: 2 kính lúp lục giác song song — trái là nấm, phải lộ con gián nâu bóng (`drawCockroach`) hoàn tất `<= 2.57s`; Tí Hon rùng mình bên dưới. | **`VÁCH CHITIN`** (`x<=223`) và **`CHITIN GIỐNG HỆT!`** (`x<=673`) tách biệt; **`TẾ BÀO NẤM`** & **`VỎ CON GIÁN`** (`y=795`), pill công thức (`y=875`), **`GIỐNG VỎ GIÁN?!`**. |
| Ô #11 (Hàng 3, Cột 3) | **`s11`**<br>`20.800s–24.300s` | `studio_bg` (`emerald`)<br>**`data`** (`cut`) | Cây tiến hóa xuất phát từ `TỔ TIÊN CHUNG` (hoàn tất `<= 2.75s`): nhánh xám tới `THỰC VẬT (RAU)`, nhánh vàng gom `NẤM` + DNA + `ĐỘNG VẬT (BẠN)` trong hộp **`OPISTHOKONTA`**. | Stamp xanh cỡ lớn **`GẦN BẠN HƠN RAU! ✓`** ở `y≈1150`, hoàn toàn rõ nét, không chạm phụ đề. |
| Ô #12 (Hàng 3, Cột 4) | **`s12`**<br>`24.300s–25.850s` | `studio_bg` (`dark`)<br>**`close`** (`zoom`) | Bóng đen khổng lồ hình cây nấm trùm lên đường chân trời; mạng sợi tơ vàng bùng tỏa bên dưới lớp đất (`maxLen <= 245`); Tí Hon quay nhìn xuống đầy kinh ngạc. | `drawTopHeader` **`NHƯNG BÀ CON NÀY...`** / **`KÍCH THƯỚC KHÔNG TƯỞNG`**; stamp cam **`SIÊU TO KHỔNG LỒ!`** ở `y≈390`. |
| Ô #13 (Hàng 4, Cột 1) | **`s13`**<br>`25.850s–29.250s` | `studio_bg` (`underground`)<br>**`top`** (`cut`) | Bản đồ lưới sân bóng trên cao (`🇺🇸 OREGON, MỸ`) với mạng sợi tơ vàng lan xong tại `2.35s`, bộ đếm chạm **`1.300+ SÂN BÓNG`** tại `lt=2.40s` phía trên mặt cắt 3 cây nấm. | Thẻ bộ đếm nổi bật ở `y≈1050..1220`: **`1.300+ SÂN BÓNG`** và dòng phụ **`DIỆN TÍCH ~9,6 KM² DƯỚI LÒNG ĐẤT · > 2.400 TUỔI`**. |
| Ô #14 (Hàng 4, Cột 2) | **`s14`**<br>`29.250s–31.300s` | `studio_bg` (`dark`)<br>**`close`** (`dip`) | Khoảnh khắc **Silence Drop**: cận mặt `bigFaceTiHon` chính giữa khung (`y≈780..1040`), mắt đảo `saccade`, khẩu hình `visemeAt`, giọt mồ hôi rơi bên thái dương. | `drawTopHeader` **`KHOAN ĐÃ...?!`**; bong bóng suy nghĩ **`TỚ = ĐỘNG VẬT...`** ngay phía trên nút đỏ `VỀ NHÀ`. |
| Ô #15 (Hàng 4, Cột 3) | **`s15`**<br>`31.300s–33.350s` | `studio_bg` (`purple`)<br>**`close`** (`cut`) | `bigFaceTiHon` lệch trái hoảng hốt nhìn sang phải: sợi DNA vàng-lam nối thẳng từ mõm Tí Hon sang cây nấm nhỏ quàng chiếc khăn cam giống hệt! | `drawTopHeader` **`KHOAN ĐÃ... CÂY NẤM`** / **`CŨNG LÀ BÀ CON?!`**; pill **`BÀ CON CỦA TỚ?!`** phía trên DNA. |
| Ô #16 (Hàng 4, Cột 4) | **`s16`**<br>`33.350s–35.100s` | `studio_bg` (`dark`)<br>**`insert`** (`whip`) | Đặc tả đĩa thức ăn có cây nấm quàng khăn cam mở to mắt sợ sệt (`scared: true`); đôi đũa nghiêng từ góc trên phải (`angle=0.72`) run nhẹ ngay mép đĩa. | `drawTopHeader` **`VẬY THÌ...`** / **`BẠN CÒN DÁM GẮP NỮA KHÔNG?`**; pill **`DÁM GẮP KHÔNG?!`** đặt lệch trái `(315, 465)`. |
| Ô #17 (Hàng 5, Cột 1) | **`s17`**<br>`35.100s–37.100s` | `studio_bg` (`purple`)<br>**`medium`** (`cut`) | Cảnh CTA độc lập (`2.00s`): Tí Hon đứng ở `y=1135` (`visemeAt` `35.08..36.86s`) vung đuôi cong vút lên chạm mép trái nút **`ĐĂNG KÝ`** (`y=620` → **`ĐÃ ĐĂNG KÝ ✓`**), mặt và `VỀ NHÀ` hoàn toàn dưới nút. | `drawTopHeader` **`ĐĂNG KÝ KÊNH NHÉ!`** / **`KHỦNG LONG TÍ HON`**; nút **`ĐÃ ĐĂNG KÝ ✓`** giữa khung; pill **`BẤM CHUÔNG HẸN TẬP SAU! 🔔`** ở `y=1235`. |
| Ô #18 (Hàng 5, Cột 2) | **`s18`**<br>`37.100s–41.476s` | `studio_bg` (`ocean`)<br>**`end`** (`whip`) | Sân khấu đại dương độc lập (`4.376s`): thẻ đôi **`5 CÁNH TAY ???`** (**`GẦN BẠN HƠN!`**) vs **`CON TÔM`** ở `y=420..840`, Tí Hon đeo kính lặn (`divingMask`) góc trái dưới + pill **`ĐOÁN Ở BÌNH LUẬN! 👇`** hiện rõ ở cuối (`40.8s`). | `drawTopHeader` **`TẬP SAU: BÍ ẨN ĐẠI DƯƠNG`** / **`CON NÀO GẦN BẠN HƠN?`**; tất cả thẻ & pill nằm gọn trong `y=360..1120`, chừa thoáng phụ đề `y=1455` để loop mượt về `s01`. |

---

## 2. Kết Quả Kiểm Định Storyboard V2

- Toàn bộ 18 cảnh V2 trên `build/sheets/sheet_01.png` và các stills kiểm định (`0.4s`, `6.75s`, `11.1s`, `12.5s`, `20.3s`, `23.7s`, `28.5s`, `36.2s`, `39.5s`, `40.8s`) đều sạch lỗi: không còn bóng đè chữ, không đứt dấu tiếng Việt, đúng chuẩn Tí Hon v3.0.
- Cảnh `s17` và `s18` tách mạch rõ ràng, kết thúc bằng câu hỏi bình luận **`ĐOÁN Ở BÌNH LUẬN! 👇`** thay cho đoạn lặp tiêu đề, tối ưu tỷ lệ giữ chân và vòng lặp xem lại cho YouTube Shorts / TikTok.
