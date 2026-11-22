# Tài Liệu #1 — Bộ Nhận Diện Series "Khủng Long Tí Hon" (Series Bible v3.0)

> **Phạm vi áp dụng:** Tài liệu chuẩn dùng chung cho mọi tập phim dài (`16:9`, `1440p`) và YouTube Shorts (`9:16`, `1080×1920`) của Series **Khủng Long Tí Hon** trên engine `thanhhai-2d-studio` (`/engine/tihon.js`).

---

## 1. Thiết Kế Nhân Vật Chính: Tí Hon v3.0 (`/engine/tihon.js`)

**Tí Hon** là chú khủng long T-Rex con xuyên không đi khám phá các kỷ nguyên địa chất và thảm họa tiền sử. Phiên bản **v3.0** chuẩn hóa hình khối 2.5D chibi sắc nét, biểu cảm rõ trên cả màn hình điện thoại lẫn TV 1440p:

| Bộ phận | Thông số hình học & Đặc điểm nhận diện chuẩn v3.0 | Mã màu Hex |
|---|---|---|
| **Thân & Đầu (Góc 3/4)** | Khung đầu và thân T-Rex bo tròn góc nhìn 3/4, tỷ lệ đầu lớn chibi (cao ngang mắt cá chân người lớn `~35–40 cm` so với mốc `1,7 m`), viền nét mực tối dày dặn. | Da chính: `#48b83e`<br>Bóng đổ da: `#2f8a28`<br>Viền nét: `#112214` |
| **Đôi mắt & Lông mày** | **2 mắt trắng to tròn** đặt lệch góc 3/4, con ngươi đen sâu kèm đốm sáng kép (catchlight); **lông mày đậm** linh hoạt theo 9 biểu cảm (`normal`, `shock`, `sad`, `happy`, `smug`, `deadpan`, `freeze`, `proud`, `Determine`). | Lòng trắng: `#ffffff`<br>Đồng tử/Mày: `#0f172a` |
| **Gai sừng & Đỉnh đầu** | **KHÔNG đội mũ bảo hộ vàng che kín đầu.** Đỉnh đầu lộ rõ hàng **gai sừng tam giác xanh đậm** chạy từ đỉnh sọ xuống sống lưng và đuôi. | Gai sừng: `#1b661e` |
| **Thiết bị "VỀ NHÀ / TUA LẠI"** | Gắn trực tiếp lên đỉnh đầu bằng **đế bầu dục xám kim loại**, trên có **nút bấm vòm đỏ `"VỀ NHÀ"`** (Tí Hon luôn dùng **đuôi** vòng lên bấm vì tay quá ngắn) và **đèn báo `"TUA LẠI"`** phát sáng xanh/vàng. | Đế máy: `#334155`<br>Viền đế: `#64748b`<br>Nút bấm: `#ef4444`<br>Đèn báo: `#38bdf8` / `#fde047` |
| **Hàm dưới, Răng & Lưỡi** | Hàm dưới tách lớp màu xanh kem sáng, lộ **5 chiếc răng trắng nhọn** đều đặn và **lưỡi hồng** khi há miệng cảm thán hoặc nếm đồ ăn. | Hàm dưới: `#d8f3b4`<br>Răng: `#ffffff`<br>Lưỡi: `#fb7185`<br>Khoang miệng: `#4c0519` |
| **Bụng & Khăn quàng cổ** | Bụng bầu dục màu xanh kem có **3 đường ngấn ngang** đặc trưng; cổ quấn **khăn quàng cam** có đuôi khăn bay nhẹ theo gió hoặc chuyển động. | Bụng: `#d8f3b4`<br>Ngấn bụng: `#99d98c`<br>Khăn quàng: `#f97316`<br>Bóng khăn: `#c2410c` |
| **Đuôi, Tay ngắn & Chân trụ** | **Đuôi tam giác chĩa ngang** khỏe khoắn có hàng gai xanh đậm `#1b661e` (vừa giữ thăng bằng, vừa là "cánh tay thứ ba" để bấm nút mũ và bấm Đăng ký). **2 tay trước cực ngắn** (tạo mảng miếng hài cố với đồ vật không tới). **2 chân trụ chibi** bàn chân 3 móng trắng. | Móng chân: `#f8fafc` |

---

## 2. Bảng Màu Chuẩn & Hệ Thống Đạo Cụ Cố Định (HUD & Props)

### 2.1. Bảng màu giao diện & HUD toàn series
- **Nền bảng thông tin / Thẻ dữ liệu (Data Card & HUD Scrim):** Xanh đen bán trong suốt `rgba(8, 14, 26, 0.84)` đến `rgba(15, 23, 42, 0.92)`.
- **Màu nhấn cảnh báo / Nguy hiểm (Crisis Accent):** Đỏ cam thiên thạch `#ef4444` / `#f97316`.
- **Màu nhấn khoa học / Sơ đồ (Blueprint Accent):** Xanh lam điện tử `#38bdf8` / `#7dd3fc`.
- **Màu nhấn an toàn / Sống sót (Survival Accent):** Vàng kim `#fde047` và Xanh lục bảo `#4ade80`.

### 2.2. Bộ 4 đạo cụ cố định xuyên suốt các tập
1. **Đồng hồ sinh tồn góc trên trái (`Survival Clock HUD` — `x = 52, y = 36`, `315×92 px` ở hệ quy chiếu `1920×1080`):**
   - Hiển thị nhãn vị trí ở dòng trên (`spotLabel`, cỡ `16px` bold) và thời gian trụ hạng ở dòng dưới (`clockText`, cỡ `30px` monospace/bold).
   - Có 6 trạng thái trực quan (`clockMode`): `running` (xanh dương), `warning` (vàng cam rung nhẹ), `cracked` (đỏ nứt kính), `vaporized` (tím/xám bốc khói), `stopped` (đỏ chốt sổ), và `infinite` (`∞` xanh lục phát sáng khi chiến thắng).
2. **Bộ đếm "ĐỒ ĐÃ MẤT" góc trên phải (`Lost Items Counter HUD` — `x = 1868, y = 92`, căn phải):**
   - Ghi nhận chuỗi mất đồ hài hước tích lũy qua từng mốc thử thách trong tập (ví dụ Tập 3: mất Đồng hồ `clock` -> mất Kem dâu `popsicle` -> mất Phao bơi `float` -> mất Khăn picnic & bánh mì `picnic`).
   - Có kèm thẻ trạng thái nhanh (`spotTag`) ngay phía trên (`y = 54`) để khán giả nắm quy luật sinh tồn của từng mốc chỉ trong 1 giây.
3. **Ba lô thám hiểm gọn sau lưng (`Explorer Backpack`):**
   - Đeo sát lưng màu nâu đất `#854d0e` viền `#a16207`, là nơi Tí Hon rút ra các đạo cụ đời thường đối lập hài hước với thảm họa tiền sử (cây kem dâu, kính lặn, phao bơi sọc, khăn trải picnic, đèn pin đội đầu).
4. **Cổng thời gian & Hiệu ứng Tua lại (`Time Portal & Rewind VHS Overlay`):**
   - Mỗi lần "bay màu" hoặc hết giờ ở một địa điểm, nút `"VỀ NHÀ"` kích hoạt chế độ `"TUA LẠI"` với vệt quét ngang và tiếng tua băng `audio/rewind.wav`, đưa Tí Hon quay về đúng thời điểm bắt đầu thử thách nhưng giữ nguyên ký ức (và mất luôn món đồ vừa xài).

---

## 3. Câu Cửa Miệng & Công Thức Cấu Trúc Hài Lặp Lại (Series Narrative Formula)

### 3.1. Câu cửa miệng đặc trưng (Catchphrases)
- *"Tớ là Tí Hon — cao đúng tới mắt cá chân người lớn, tay ngắn cũn cỡn nhưng có cái đuôi cân cả thế giới!"*
- *"May mà nút VỀ NHÀ trên đầu đã gạt sang chế độ TUA LẠI, chứ không là hết phim từ phút thứ nhất!"*
- *"Khoan đã! Nhìn cái tay ngắn của tớ xem... lấy đuôi bấm giùm cái nút Đăng Ký nha!"*

### 3.2. Cấu trúc 8 nhịp chuẩn của mỗi tập (Running Gag & Retention Loop)
1. **Nhịp 1 — Cold Open Cảnh Thảm Nhất (`0–5s`):** Mở màn ngay tại khoảnh khắc dở khóc dở cười nhất (cây kem vừa đưa lên miệng đã bốc khói trong 1 giây, hoặc vừa thò chân xuống nước đã bị cá săn mồi rượt) kèm **Freeze Frame** tự trào. Tuyệt đối không có logo hay intro dài dòng.
2. **Nhịp 2 — Tua Lại & Đặt Luật Chơi (`5–45s`):** Tua băng về buổi sáng yên bình, nhắc lời hứa từ tập trước, mở bảng các lựa chọn ẩn (`?`) và giới thiệu quy tắc đồng hồ sinh tồn + nút `"TUA LẠI"`.
3. **Nhịp 3 — Thử Từng Chỗ & Mất Đồ Liên Tiếp (Các mốc đầu):** Đi từ nơi tưởng nguy hiểm nhất đến những nơi tưởng an toàn nhưng dính bẫy vật lý/địa chất thật (sóng địa chấn Seiche, mưa hạt thủy tinh tektite, sóng thần dội ngược). Mỗi chỗ mất thêm 1 món đồ trên HUD `"ĐỒ ĐÃ MẤT"`.
4. **Nhịp 4 — Hai Nhịp Lặng Cảm Xúc (`Silence Drop #1 & #2`):** Hạ nhạc nền về gần `0` (`intensity: 0.02`) trước bước ngoặt tăm tối nhất (mùa đông hạt nhân/tuyệt chủng) và trước khi bước vào nơi trú ẩn cuối cùng để tạo độ tương phản cảm xúc mạnh.
5. **Nhịp 5 — Chỗ Cuối Thắng Nhờ Thân Hình Tí Hon (Climax):** Những con khủng long khổng lồ thất bại vì quá to và cần quá nhiều thức ăn; riêng Tí Hon lọt qua khe hẹp/hang ngầm, kết bạn với thú có vú nhỏ và sống sót nhờ chuỗi thức ăn mùn bã (nấm, giun) suốt 365 ngày cho tới khi đồng hồ nhảy sang **`∞`**.
6. **Nhịp 6 — Bảng Xếp Hạng Tổng Kết (`Leaderboard Recap`):** Xếp hạng toàn bộ các mốc từ bét bảng (`0 giây`) lên quán quân (`∞`) bằng thẻ lật trực quan kèm tiếng `card_flip.wav`.
7. **Nhịp 7 — Cú Lật Cuối Liên Hệ Hiện Tại (`Epilogue Twist`):** Kết nối câu chuyện tiền sử với đời sống hôm nay bằng một cú lật hài hước kèm **Freeze Frame** (ví dụ: nhánh khủng long lông vũ nhỏ tiến hóa thành chim hiện đại — và thành... miếng gà trên đĩa cơm trưa!).
8. **Nhịp 8 — Khảo Sát Khán Giả, Bấm Đăng Ký Bằng Đuôi & End Screen (`15–20s`):** Hỏi khán giả chọn chỗ số mấy để kích thích bình luận, diễn cảnh tay ngắn không với tới nút Đăng ký phải dùng đuôi bấm, và giữ màn hình kết thúc hoạt họa sống động `15–20 giây` trỏ sang tập tiếp theo.

---

## 4. Font Chữ Chuẩn & Quy Tắc Tọa Độ Đặt Nhãn Chữ (Typography & Safe Zones)

Để chữ tiếng Việt có dấu hiển thị sắc nét, không lỗi kerning và **không bao giờ đè lên phụ đề hoặc mặt nhân vật**, toàn bộ các tập tuân thủ hệ quy chiếu thiết kế `1920×1080` (tự động nhân tỷ lệ `1.333×` khi xuất `1440p` `2560×1440`):

### 4.1. Hệ thống Font chữ chuẩn
- **Font chính (Primary Display & UI):** `'Be Vietnam Pro', 'Inter'` (trọng lượng `700 Bold` cho nội dung thẻ và `800–900 Black` cho tiêu đề/con số khoa học).
- **Font dự phòng (Fallback):** `'Nunito', 'Fredoka', system-ui, sans-serif`.
- **Quy tắc hiển thị số liệu:** Các con số đo lường (`00:00`, `10 km`, `1.500 km`, `-26°C`, `75%`, `∞`) luôn đặt cỡ chữ `>= 30px` trên nền pill tối bo góc (`rgba(8,14,26,0.88)`) có viền sáng nhẹ để đọc rõ ngay trên điện thoại.

### 4.2. Phân vùng tọa độ dọc (`Y-Coordinate Zones` trên khung `1920×1080`)

| Vùng hiển thị | Tọa độ `Y` chuẩn (`1080p` canvas) | Tọa độ tương ứng ở `1440p` (`2560×1440`) | Quy tắc bắt buộc |
|---|---|---|---|
| **1. Top HUD Bar** | `y = 36 .. 142` | `y = 48 .. 189` | Chỉ dành cho **Đồng hồ sinh tồn** (`x = 52, y = 36`) và **Bộ đếm ĐỒ ĐÃ MẤT + Thẻ trạng thái** (`x = 1868, y = 54..92`). Không đặt tiêu đề cảnh đè vào hai góc này. |
| **2. Nhãn chữ trên hình (1/3 trên)** | `y = 162 .. 340` | `y = 216 .. 453` | Vùng ưu tiên cho các nhãn thuyết minh nhanh (`drawSpotCallout`), tiêu đề phụ hoặc thông số khoảng cách. Luôn nằm dưới Top HUD ít nhất `20px`. |
| **3. Sơ đồ & Bảng dữ liệu giữa khung** | `y = 340 .. 855` | `y = 453 .. 1140` | Vùng dành cho sơ đồ cắt lớp (`blueprint`), thẻ so sánh dữ liệu (`data`), bảng xếp hạng 7 chỗ và hoạt cảnh nhân vật chính. **Mọi hộp chữ/nhãn trên hình phải kết thúc ở `y <= 860`**. |
| **4. Vùng đệm an toàn (Buffer Zone)** | `y = 860 .. 939` | `y = 1147 .. 1252` | **Vùng cấm đặt chữ tĩnh:** tạo khoảng thở thị giác tách biệt hoàn toàn giữa đồ họa trong cảnh và dải phụ đề bên dưới. |
| **5. Vùng Phụ đề đáy (`Subtitle Zone`)** | `y >= 940` (tâm chữ `y = 1005`) | `y >= 1253` (tâm chữ `y = 1340`) | Luôn vẽ lớp nền tối chuyển sắc `drawSubtitleScrim()` (`y = 940..1080`) trước khi render phụ đề karaoke (`size: 34`, tối đa `9` từ/dòng) để phụ đề nổi bật tuyệt đối trên mọi bối cảnh cháy nổ hay tuyết trắng. |
