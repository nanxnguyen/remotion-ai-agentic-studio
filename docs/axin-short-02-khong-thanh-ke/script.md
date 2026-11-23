# Kịch Bản Shorts Tập 2: Tư Mã Ý Thật Sự Sợ Thành Trống? (Không Thành Kế)

- **Kênh:** A Xin Chém Sử (`A_XIN_KE_CHUYEN`)
- **Định dạng:** 9:16 Vertical Shorts (`1080×1920`), 24fps. **181 âm tiết, 29 dấu câu** → ước tính Vbee ~4.5 âm/s + đệm ~0.55s/dấu = **~56s thô**; siết pause còn ~0.3s/dấu trong timeline builder (không tăng speed) = **~49s**. Timecode bảng beat tính theo bản siết; khóa lại sau khi đo voice thật.
- **Skill hình ảnh:** `chibi-history-video` (`cityGate` mở toang, Khổng Minh chibi gảy đàn trên lầu, lính già quét đường, quân Tư Mã Ý nhân bản `drawSoldierCrowd`, `tacticalMap`, bàn trà A Xìn gõ búa)
- **Phong cách:** Hài hước, châm biếm, cà khịa vui, đổi cảnh mỗi 2.5–4 giây
- **Series:** *A Xin Chém Sử* — Tập 1 Thuyền cỏ → **Tập 2 Không Thành Kế** → Tập 3 Váy đàn bà → Tập 4 Điêu Thuyền → Tập 5 A Đẩu
- **Video dài liên kết:** *Tam Quốc Trong 25 Phút: Ai Thắng Thật?* (chưa đo voice → trên màn hình chỉ ghi `XEM BẢN FULL`, không ghi số phút)

---

## 1. Packaging

### A. Tiêu đề & Thumbnail
- **Tiêu đề (37 ký tự):** `Tập 2: Tư Mã Ý Thật Sự Sợ Thành Trống?`
  Câu hỏi mở, video trả lời thật (ông không có mặt) → không lừa. Khi đăng gắn `#shorts #tamquoc #axin`.
- **Chữ Thumbnail / Cover (≤ 3 chữ):** `VẮNG MẶT!`
  Hình: Khổng Minh chibi gảy đàn trên lầu, dưới cổng là đạo quân Tư Mã Ý **đang tan thành khói** (khung Beat 1). Tiêu đề hỏi "sợ không", thumbnail gợi "không có ở đó" → bổ sung, không lặp.
- *Điểm `title.py` / `hookscore.py` cũ đã cũ (tiêu đề, hook đổi) → cần chạy lại.*

### B. Hook (bản sửa 2026-11-24)
> *"Một cây đàn đuổi mười lăm vạn quân? Màn đấu trí đẹp nhất Tam Quốc có một lỗ hổng to đùng!"* (21 âm, ~5.3s)

- Công thức *Myth-bust*: nêu huyền thoại ai cũng biết → hứa một lỗ hổng → trả ở Beat 5.
- Bỏ hook cũ "Tại sao bạn tin… nhưng sự thật… lại ít ai biết?" (35 âm, ~8.4s, câu hỏi lồng hai vế, khó nghe khi lướt).

### C. Ghi chú nguồn sử (bắt buộc giữ đúng)
- Chuyện thành trống không có trong chính văn *Tam Quốc Chí*. Nó là giai thoại của **Quách Xung** (đời Tấn), được **Bùi Tùng Chi** trích trong phần chú *Gia Cát Lượng truyện* rồi **bác bỏ**: lúc đó Tư Mã Ý làm đô đốc Kinh Châu, trấn **Uyển Thành**, chưa từng giáp mặt Khổng Minh ở mặt trận này.
- "Cách cả nghìn dặm" là **ước tính của A Xìn trên bản đồ** (Uyển Thành → vùng Nhai Đình/Kỳ Sơn ~600–700 km đường chim bay ≈ hơn nghìn dặm Hán). Không viết "sử ghi cách nghìn dặm".
- Kết luận giữ mức **"khả năng cao là chưa từng xảy ra"** (cùng cách nói bản full, dòng 139), không viết "chính sử ghi rõ" hay "chắc chắn".
- Chi tiết truyện (hồi 95 *Tam Quốc Diễn Nghĩa*): Tây Thành, 2.500 lính, Tư Mã Ý 15 vạn quân, lính giả dân quét đường, gảy đàn trên lầu. Tất cả nằm sau mốc "Trong truyện" ở Beat 2.

### D. Dấu ấn kênh & nối tập
- Búa **CẠCH** frame 0 · câu cửa miệng **"A Xìn soi luôn: sử thật thì sao?"** (khớp Tập 1) · dấu kết **`TRUYỆN CHÉM!`**
- Manh mối xem lại: Beat 1 quân Tư Mã Ý tan thành khói = gợi ý "ông không có mặt", trả ở Beat 5.
- Nối tập: thẻ **`TẬP 3: BỊ TẶNG VÁY, TƯ MÃ Ý CƯỜI HAY GIẬN?`** ở Beat 7.

---

## 2. Kịch Bản Từng Beat

| Beat / Mốc | Lời đọc (Vbee TTS) | `[ON SCREEN]` | Cảm xúc / Nhịp & SFX |
|---|---|---|---|
| **Beat 1: Hook**<br>`00:00–00:05.3` | Một cây đàn đuổi mười lăm vạn quân? Màn đấu trí đẹp nhất Tam Quốc có một lỗ hổng to đùng! | Frame 0 (hiểu khi tắt tiếng): cổng Tây Thành (`cityGate`) mở toang, Khổng Minh chibi gảy đàn trên lầu, dưới là đạo quân đông nghịt. **Búa A Xìn gõ CẠCH** → cả đạo quân **tan thành khói mờ**. Chữ: **`1 CÂY ĐÀN ĐUỔI 15 VẠN QUÂN?`** — khung thumbnail. | **Mystery**<br>Crash-zoom lên cây đàn.<br>SFX: `impact` (frame 0), `guzheng` |
| **Beat 2: Mã Tốc làm mất Nhai Đình**<br>`00:05.3–00:13.1` | Trong truyện, Mã Tốc thuộc làu binh thư mà vẫn làm mất Nhai Đình. Tư Mã Ý kéo quân ập tới, Tây Thành chỉ còn hai nghìn rưỡi lính già. | Nhãn góc **`TRONG TRUYỆN`**. Mã Tốc chibi ôm chồng sách **`LÝ THUYẾT 10/10`**, kéo trại lên đỉnh núi → biển **`MẤT NHAI ĐÌNH`** rơi xuống. Cắt sang Tây Thành: vài lính râu bạc, đếm **`2.500 LÍNH GIÀ`** vs **`15 VẠN`**. | **Humor → Pressure**<br>Whip-pan lên núi.<br>SFX: `pop`, `buzz` |
| **Beat 3: Mở toang cổng**<br>`00:13.1–00:17.8` | Khổng Minh mở toang cổng, sai lính quét đường, còn mình lên lầu gảy đàn tỉnh bơ! | Lính giả dân cầm chổi quét đường. Khổng Minh gảy đàn, HUD **`MẶT TỈNH 100% · TIM 200 NHỊP`**, một giọt mồ hôi. | **Tension-Comedy**<br>Zoom chậm vào giọt mồ hôi.<br>SFX: `heartbeat`, `guzheng` |
| **Beat 4: Tư Mã Ý rút**<br>`00:17.8–00:22.7` | Tư Mã Ý nghe đàn không loạn một nhịp, nghĩ ngay có phục binh, quay đầu rút sạch! | Tư Mã Ý (`shocked`), bong bóng nghĩ vẽ cung thủ sau tường **`PHỤC BINH?`** → phất cờ chạy, lính ngơ ngác. | **Reversal**<br>Pop bong bóng + tiếng phanh.<br>SFX: `whoosh`, `swish` |
| **Beat 5: A Xìn soi**<br>`00:22.7–00:34.1` | Nhưng A Xìn soi luôn: sử thật thì sao? Năm hai trăm hai mươi tám, Tư Mã Ý đang trấn Uyển Thành bên Kinh Châu, cách chiến trường cả nghìn dặm! Nhà chú sử Bùi Tùng Chi đã bác thẳng giai thoại này. | Bàn trà (`teaTable`): **CẠCH** đúng chữ "soi luôn". Bản đồ (`tacticalMap`): ghim **Khổng Minh (Nhai Đình · Kỳ Sơn)** và **Tư Mã Ý (Uyển Thành · Kinh Châu)**, thước đỏ kéo căng **`~1.000 DẶM`** (nhãn nhỏ "ước tính"). Cuộn sách: **`Bùi Tùng Chi chú: BÁC BỎ`**. | **Climax / Reveal**<br>Thước kéo theo nhịp lời.<br>SFX: `impact`, `powerup` |
| **Beat 6: Payoff**<br>`00:34.1–00:38.0` | Màn đối mặt đẹp nhất Tam Quốc, khả năng cao là chưa từng xảy ra! | A Xìn đóng dấu đỏ **`TRUYỆN CHÉM!`** lên bức tranh Không Thành Kế; trong tranh, chỗ Tư Mã Ý đứng chỉ còn bóng trống. | **Payoff**<br>Shake khi đóng dấu.<br>SFX: `stamp` |
| **Beat 7: CTA, Comment & Tập sau**<br>`00:38.0–00:48.9` | Khổng Minh mở cổng thành, A Xìn mở cổng kênh: bấm Thích, rồi Đăng ký mà vào! Bạn tin có thành trống không? Comment đi! Tập sau: bị tặng váy đàn bà, Tư Mã Ý làm gì? | A Xìn kéo mở cổng thành có biển **`👍 THÍCH`** và **`ĐĂNG KÝ`**, vẫy vào. Bong bóng **`💬 CÓ THÀNH TRỐNG KHÔNG?`**. Thẻ dưới: **`TẬP 3: BỊ TẶNG VÁY, TƯ MÃ Ý CƯỜI HAY GIẬN?`** (hộp quà hồng hé mở) + mũi tên **`XEM BẢN FULL`**. Frame cuối quay về cổng thành Beat 1 để loop. | **CTA / Loop**<br>SFX: `pop`, `bell-ding` |

---

## 3. Bản Text Sạch Cho Vbee TTS (`narration-vbee.txt`)

> Một cây đàn đuổi mười lăm vạn quân? Màn đấu trí đẹp nhất Tam Quốc có một lỗ hổng to đùng!
> Trong truyện, Mã Tốc thuộc làu binh thư mà vẫn làm mất Nhai Đình. Tư Mã Ý kéo quân ập tới, Tây Thành chỉ còn hai nghìn rưỡi lính già.
> Khổng Minh mở toang cổng, sai lính quét đường, còn mình lên lầu gảy đàn tỉnh bơ!
> Tư Mã Ý nghe đàn không loạn một nhịp, nghĩ ngay có phục binh, quay đầu rút sạch!
> Nhưng A Xìn soi luôn: sử thật thì sao? Năm hai trăm hai mươi tám, Tư Mã Ý đang trấn Uyển Thành bên Kinh Châu, cách chiến trường cả nghìn dặm! Nhà chú sử Bùi Tùng Chi đã bác thẳng giai thoại này.
> Màn đối mặt đẹp nhất Tam Quốc, khả năng cao là chưa từng xảy ra!
> Khổng Minh mở cổng thành, A Xìn mở cổng kênh: bấm Thích, rồi Đăng ký mà vào! Bạn tin có thành trống không? Comment đi! Tập sau: bị tặng váy đàn bà, Tư Mã Ý làm gì?
