# Kịch Bản Tập Dài 16:9 — "Tí Hon Đi Họp Họ: 7 Cặp Họ Hàng Điên Rồ Nhất Trái Đất!"

> **Series:** Khủng Long Tí Hon (`@TinyRex01`)  
> **Định dạng:** Video dài `16:9` (`2560×1440`, `24fps`) — Thời lượng dự kiến: **~6 phút 45 giây – 7 phút 30 giây**  
> **Chuẩn nhân vật & HUD:** Tuân thủ `docs/ti-hon-series/01-series-bible.md` v3.0 (Tí Hon cao 35–40 cm, khăn quàng cam, nút đỏ `"VỀ NHÀ / TUA LẠI"` trên đỉnh đầu bấm bằng đuôi, vùng phụ đề đáy `y >= 940`).  
> **Lời đọc Vbee (nguồn chuẩn):** `docs/ti-hon-series/longform-hop-ho-7-cap-vbee.txt` — mọi chỉnh lời thoại sửa ở đó trước, rồi đồng bộ về file này.

### Nhật ký nâng cấp v2 (2026-11-22)
- **Trả lời gài mở đầu:** thêm *Trạm bí mật* giải thích vì sao gà gọi Tí Hon là "chú út" (chim là nhánh khủng long còn sống; protein collagen T-Rex 2007 giống gà nhất).
- **Sắp xếp lại 7 trạm theo độ sâu thời gian** (vài chục triệu → hơn 1 tỷ năm), mỗi trạm có câu "Máy quét lùi về…" + HUD mốc năm.
- **Sửa sai khoa học:** Hồng Hạc không làm tổ nổi (đổi sang vỏ trứng phủ phấn + cùng họ rận lông); bao trứng Gián không xốp; "9 bộ não" → 1 não chính + 8 "não mini"; Chuối "60% gen giống hệt" → "~60% gen có bản họ hàng".
- **Phá nhịp lặp:** Trạm 3 Tí Hon tự đoán sai; Trạm 5 có 3 đáp án; thêm nhịp *Tạm dừng chấm điểm* giữa video; mọi trạm đều có A/B + đếm 3 giây.
- **Open loop đầu video:** hứa "cặp thứ 7 nằm trong hộp cơm trưa" + "trạm bí mật" về con gà.
- **Hook mới (chấm bằng `plugins/youtube-agent-skill`):** đưa câu hỏi con gà + lời thách "3 giây, đừng đoán sai 7 cặp" + lời hứa "có họ với nấm" (trả lời ở Trạm 7) lên 5 giây đầu, phần tự giới thiệu chuyển xuống sau. Hook `21 → 90`; tiêu đề + thumbnail `100/100`.
- **CTA:** bỏ kiểu "sai quá 4 cặp thì đăng ký"; sửa lỗi "trưa nay… ăn tối".

---

## 1. Đóng Gói YouTube (Chuẩn `youtube-agent-skill`)

- **Tiêu đề chính (49 ký tự — an toàn Desktop & Mobile):**  
  `7 Cặp Họ Hàng Tiến Hóa Sốc Nhất: Bạn Đoán Đúng Mấy?`
- **Text trên Thumbnail 16:9 (3 từ, 0 trùng chữ với Title):**  
  `CHUNG GIA PHẢ?!`
- **Concept Thumbnail 16:9 (`1280×720`):**  
  Nền chia đôi tia sét DNA vàng rực: bên trái là **Bạch Tuộc** khổng lồ đang bắt tay với **Con Ốc Sên** tí hon; bên phải là **Tí Hon** (khăn cam) há hốc mồm khi **Gà Trống** khoác vai gọi "chú út"; góc trên là dòng chữ trắng-vàng viền đen dày **`CHUNG GIA PHẢ?!`**.
- **Mô tả (2 dòng đầu chuẩn SEO):**  
  Tí Hon bật Máy Quét Gia Phả lùi từ vài chục triệu năm về hơn 1 tỷ năm trước để tìm xem ai mới thật sự là họ hàng ruột của nhau — từ Cá Ngựa, Hồng Hạc, Hà Mã, Voi, Bọ Ngựa cho tới Bạch Tuộc và... hộp cơm trưa của bạn!  
  Bạn đoán trúng được bao nhiêu trên 7 cặp? Comment số điểm bên dưới nhé!

- **Chapters (ước tính, chốt lại sau khi đo voice thật):**
  - `00:00` Mở đầu — Con gà gọi Tí Hon bằng... chú út?!
  - `00:25` Luật chơi Máy Quét Gia Phả
  - `00:50` Cặp #1: Cá Ngựa — anh em Cá Vàng hay Cá Chìa Vôi?
  - `01:35` Cặp #2: Hồng Hạc chung họ Cò Trắng hay Chim Lặn?
  - `02:25` Cặp #3: Hà Mã là họ hàng Lợn hay Cá Heo?
  - `03:15` Cặp #4: Voi gần Tê Giác hay… Đa Man bé xíu?
  - `04:00` Tạm dừng chấm điểm
  - `04:15` Cặp #5: Bọ Ngựa — Châu Chấu, Chuồn Chuồn hay Gián?!
  - `05:00` Cặp #6: Bạch Tuộc thiên tài lại cùng họ Ốc Sên?!
  - `05:50` Cặp #7 (Trùm cuối): Con Người gần Rau hay Nấm?
  - `06:35` Trạm bí mật: Vì sao gà gọi Tí Hon là chú út?
  - `07:05` Tổng kết & chấm điểm

---

## 2. Hệ Thống HUD & Đạo Cụ Riêng Của Tập

1. **HUD Trái (`y = 36, x = 52`):** **Đồng hồ Gia Phả (`DNA Clock`)** hiển thị mốc lùi thời gian theo thứ tự trạm: `Hiện tại` → `-vài chục Tr năm` (Cá Ngựa, Hồng Hạc) → `-55 Tr năm` (Hà Mã) → `-60+ Tr năm` (Voi) → `-~300 Tr năm` (Bọ Ngựa) → `-500+ Tr năm` (Bạch Tuộc) → `-1 Tỷ năm` (Người–Nấm) → nhảy ngược về `-68 Tr năm` cho Trạm bí mật (T-Rex). Các mốc là ước tính làm tròn, không ghi số lẻ.
2. **HUD Phải (`y = 92, x = 1868`):** **Bộ đếm "ĐỘ SỐC / ĐỒ ĐÃ RỚT"** — mỗi lần Tí Hon ngã ngửa trước sự thật gia phả, cậu đánh rơi 1 món đồ từ ba lô: `Đùi gà` → `Kính lặn` → `Ống nhòm` → `Kính lúp` → `Mũ thám hiểm` → `La bàn` → `Phao vịt` → `Hộp cơm trưa`.
3. **Thẻ Đáp Án (`Quiz Card`):** Mỗi trạm hiện khung chọn **A/B** (Trạm 5: **A/B/C**) trong `3 giây` có tiếng tick (`tick.wav`) trước khi tia sét DNA nối hai loài!
4. **Bảng điểm Tí Hon (mới):** pill nhỏ dưới HUD Trái hiển thị điểm của chính Tí Hon (`Tí Hon: 0/1` sau Trạm 3 → `3/4` ở nhịp chấm điểm) — tạo đối thủ để khán giả so điểm.

---

## 3. Kịch Bản Chi Tiết Từng Scene (Lời Thoại TTS + Hình Ảnh)

### Scene 1 — Nhịp 1: Cold Open Cảnh Thảm Nhất (`0:00 – 0:25`)
- **Hình ảnh:** Mở thẳng vào khoảnh khắc: **Gà Trống** giơ cánh chỉ thẳng mặt Tí Hon, Freeze Frame xám-đỏ + `record_scratch.wav` ngay giây 0. Câu thứ hai: hiện 7 thẻ `?` lướt nhanh + thẻ khóa hình bóng con gà. Câu thứ ba: lùi khung hình để thấy toàn cảnh trước tiệm gà rán, Tí Hon (khăn cam) cầm miếng đùi gà.
- **Hook (chấm `yt-script/hookscore.py`):** câu 2 đạt `90 STRONG` (công thức *The Question*), so với hook cũ `21 WEAK`.
- **Lời thoại:**
  > *"Khoan đã! Con gà trống vừa gọi tớ là... chú út!"*  
  > *"Bạn có 3 giây. Đừng đoán sai 7 cặp này, nhưng đừng bỏ lỡ lý do vì sao bạn có họ với nấm?"*  
  > *"Tớ là Tí Hon, khủng long Tê Rếch bạo chúa cao đúng tới mắt cá chân người lớn. Sáng nay tớ vừa mua miếng đùi gà, thì con gà ngoài sân nhìn tớ rồi gọi đúng một tiếng: Chú út ơi!"*  
  > *(Tí Hon quăng đuôi bấm nút đỏ `"VỀ NHÀ / TUA LẠI"`)*  
  > *"Tua lại gấp! Chẳng lẽ trên Trái Đất này, mấy loài nhìn chẳng liên quan gì tới nhau lại toàn là họ hàng ruột của nhau hết sao?!"*

---

### Scene 2 — Nhịp 2: Luật Chơi & Hai Lời Hứa (`0:25 – 0:50`)
- **Hình ảnh:** Vệt quét VHS về phòng thí nghiệm gia phả. Tí Hon rút **Máy Quét Gia Phả** từ ba lô, chiếu 7 thẻ `?` + 1 thẻ khóa `🔒 BÍ MẬT` có hình bóng con gà. Khi nói "hộp cơm trưa", zoom thẻ #7 thấy bóng hộp cơm.
- **Lời thoại:**
  > *"Được! Hôm nay tớ bật luôn Máy Quét Gia Phả, lùi ngược thời gian từng chặng, từ vài chục triệu năm cho tới hơn một tỷ năm trước, để bóc trần bảy cặp họ hàng điên rồ nhất hành tinh!"*  
  > *"Luật chơi cực đơn giản: trước mỗi cặp, bạn có đúng ba giây để chốt đáp án. Nhớ đếm điểm nhé, cuối video tớ sẽ chấm bài! Và tớ hứa: cặp thứ bảy đang nằm ngay trong hộp cơm trưa của bạn. Còn bí mật con gà, tớ để dành cho trạm cuối cùng!"*

---

### Scene 3 — Cặp #1: Cá Ngựa — Cá Vàng Hay Cá Chìa Vôi? (`0:50 – 1:35`)
- **Hình ảnh:** HUD Trái `-vài chục Tr năm`. Tí Hon đeo kính lặn nhảy ùm xuống rạn san hô. **Cá Ngựa** bơi thẳng đứng; **A: Cá Vàng** vs **B: Cá Chìa Vôi (dài như chiếc đũa)**. Tia sét DNA nối **Cá Ngựa ↔ Cá Chìa Vôi**. Cảnh cuối: cá ngựa bố phồng túi ấp, bầy cá con phụt ra.
- **Lời thoại:**
  > *"Máy quét đang lùi về vài chục triệu năm trước..."*  
  > *"Trạm số một: lặn xuống rạn san hô gặp sinh vật kỳ lạ nhất biển... Cá Ngựa! Bơi thẳng đứng, đầu giống ngựa, đuôi cuốn vào san hô!"*  
  > *"Đố bạn: anh em ruột của Cá Ngựa là A: Con Cá Vàng tròn trịa trong bể kính, hay B: Con Cá Chìa Vôi dài ngoằng như chiếc đũa?"*  
  > *"Ba... hai... một... Đáp án là B: Cá Chìa Vôi!"*  
  > *"Tổ tiên của cả hai vốn bơi ngang bình thường. Một nhánh giữ nguyên dáng thuôn dài thành Cá Chìa Vôi, nhánh kia dựng đứng thân mình lên để núp giữa cỏ biển thành Cá Ngựa! Và điểm chung bá đạo nhất của cả nhà này: con đực mới là người mang túi ấp và... sinh con hộ vợ!"*  
  > *(Tí Hon đánh rơi **Kính lặn** — HUD Phải: `2 món`)*

---

### Scene 4 — Cặp #2: Hồng Hạc — Cò Trắng Hay Chim Lặn? (`1:35 – 2:25`)
- **Hình ảnh:** Đầm nước hồng rực. **Hồng Hạc** đứng một chân giữa **A: Cò Trắng** và **B: Chim Lặn tròn xoe**. Tia sét DNA nối **Hồng Hạc ↔ Chim Lặn**. Minh hoạ: hai quả trứng phủ lớp phấn trắng đặt cạnh nhau + kính lúp soi con rận lông giống nhau.
- **Lời thoại:**
  > *"Trạm số hai: bay tới đầm nước hồng rực... Chim Hồng Hạc chân dài miên man, cổ uốn cong chữ S!"*  
  > *"Nhìn dáng đứng là biết ngay họ hàng với Cò Trắng đúng không? Khoan đã! A: Cò Trắng, hay B: Con Chim Lặn nhỏ xíu tròn vo chuyên ngụp lặn dưới hồ?"*  
  > *"Ba... hai... một... Lại bị lừa rồi! Đáp án là B: Chim Lặn!"*  
  > *"Khi các nhà khoa học giải mã bộ gen của các loài chim, họ phát hiện Hồng Hạc và Cò không hề thân thiết, cả hai chỉ trông giống nhau vì cùng lội nước kiếm ăn! Còn Hồng Hạc và Chim Lặn mới là một cặp chị em siêu khít: vỏ trứng của cả hai đều phủ một lớp phấn trắng giống nhau, và trên lông còn mang cùng một họ rận chim mà loài khác không hề có!"*  
  > *(Tí Hon đánh rơi **Ống nhòm** — HUD Phải: `3 món`)*

---

### Scene 5 — Cặp #3: Hà Mã — Tí Hon Tự Đoán Sai (`2:25 – 3:15`)
- **Hình ảnh:** HUD Trái `-55 Tr năm`. Bờ sông châu Phi. **Hà Mã** giữa **A: Lợn Rừng** và **B: Cá Heo**. Tí Hon vênh mặt (`smug`) gõ đuôi vào thẻ A → đếm ngược → thẻ A vỡ, tia sét nối **Hà Mã ↔ Cá Heo**, Tí Hon `freeze` + pill điểm `Tí Hon: 0/1`. Minh hoạ: tổ tiên thú bốn chân ven sông tách hai nhánh, nhánh biển chân trước hoá vây, chân sau teo dần.
- **Lời thoại:**
  > *"Máy quét lùi tiếp về năm mươi lăm triệu năm trước..."*  
  > *"Trạm số ba: thân hình tròn ủm, bốn chân ngắn cũn... Hà Mã!"*  
  > *"Câu này dễ ợt, để tớ đoán trước! Họ hàng gần nhất của Hà Mã là A: Con Lợn Rừng béo tròn, hay B: Con Cá Heo ngoài biển khơi? Tớ chọn A! Nhìn cái mũi kìa, chắc chắn là lợn!"*  
  > *"Ba... hai... một... Ơ... đáp án là B: Cá Heo và Cá Voi?! Tớ sai ngay câu tớ tự tin nhất!"*  
  > *"Năm mươi lăm triệu năm trước, tổ tiên của cá voi là một loài thú bốn chân sống ven sông nước. Một nhánh ở lại đầm lầy, về sau sinh ra Hà Mã. Nhánh kia bơi dần ra đại dương, chân trước thành vây, chân sau teo mất, để thành Cá Voi và Cá Heo! So với lợn, Hà Mã và Cá Heo mới thật sự là anh em ruột!"*  
  > *(Tí Hon đánh rơi **Kính lúp** — HUD Phải: `4 món`)*

---

### Scene 6 — Cặp #4: Voi — Tê Giác Hay Đa Man? (`3:15 – 4:00`)
- **Hình ảnh:** HUD Trái `-60+ Tr năm`. Thảo nguyên nắng vàng. **Voi châu Phi** cạnh **A: Tê Giác** và **B: Đa Man (bé như thỏ)**; sau đáp án hiện thêm **Lợn Biển**. Zoom so răng cửa Đa Man với ngà voi. Tê Giác quay sang bắt tay **Ngựa**.
- **Lời thoại:**
  > *"Máy quét lùi về hơn sáu mươi triệu năm trước..."*  
  > *"Trạm số bốn: gã khổng lồ nặng sáu tấn có làn da xám dày cộm... Con Voi!"*  
  > *"Đố bạn: họ hàng gần của Voi là A: Tê Giác to ngang ngửa, hay B: Con Đa Man bé xíu cỡ con thỏ đang trốn sau tảng đá?"*  
  > *"Ba... hai... một... Đáp án là B! Con Đa Man bé tí teo, và cả Lợn Biển dưới nước nữa!"*  
  > *"Tuy nhìn như chuột đồng cỡ bự, nhưng Đa Man có hai chiếc răng cửa mọc dài ra hệt như cặp ngà voi thu nhỏ, xương chân và răng hàm cũng giống Voi đến kinh ngạc! Còn Tê Giác lại thuộc nhánh thú móng lẻ, chung nhà với... Ngựa cơ!"*  
  > *(Tí Hon đánh rơi **Mũ thám hiểm** — HUD Phải: `5 món`)*

---

### Scene 7 — Nhịp Chấm Điểm Giữa Video (`4:00 – 4:15`)
- **Hình ảnh:** Bảng điểm 4 thẻ đã lật. Pill `Tí Hon: 3/4` nhấp nháy, Tí Hon gãi đầu bằng đuôi. Câu cuối: máy quét rung lắc, kim đồng hồ quay vù xuống sâu.
- **Lời thoại:**
  > *"Tạm dừng chấm điểm! Tới đây bạn đúng được mấy trên bốn cặp rồi? Còn tớ... đúng ba, sai một, vì cái tội tự tin quá!"*  
  > *"Nhưng mấy cặp vừa rồi mới chỉ là họ hàng gần thôi. Nửa sau, máy quét sẽ lùi sâu tới mức... đến cả tớ cũng không dám nhìn!"*

---

### Scene 8 — Cặp #5: Bọ Ngựa — 3 Đáp Án (`4:15 – 5:00`)
- **Hình ảnh:** HUD Trái `-~300 Tr năm`. Cành cây phóng đại (góc nhìn chibi). **Bọ Ngựa** giơ hai càng; **A: Châu Chấu**, **B: Chuồn Chuồn**, **C: Gián nâu** (sau đáp án hiện thêm **Mối**). Tia sét nối **Bọ Ngựa ↔ Gián & Mối**. Minh hoạ: bao trứng bọ ngựa và bao trứng gián đặt cạnh nhau.
- **Lời thoại:**
  > *"Máy quét lùi về gần ba trăm triệu năm trước..."*  
  > *"Trạm số năm: thu nhỏ người lại bằng hạt đậu xanh để gặp đại hiệp võ lâm... Bọ Ngựa!"*  
  > *"Lần này khó hơn, có tới ba đáp án! A: Châu Chấu xanh rì, B: Chuồn Chuồn cánh mỏng, hay C: Con Gián rình trong góc bếp?"*  
  > *"Ba... hai... một... Xin chia buồn với hội fan Bọ Ngựa, đáp án là C: Con Gián!"*  
  > *"Bọ Ngựa, Gián và cả Con Mối nằm chung một siêu bộ côn trùng. Mối thực chất là gián sống thành bầy! Và đại hiệp Bọ Ngựa cũng là anh em cùng nhà: giống hệt Gián, Bọ Ngựa mẹ gom cả ổ trứng vào trong một chiếc bọc gọi là bao trứng!"*  
  > *(Tí Hon rùng mình đánh rơi **La bàn** — HUD Phải: `6 món`)*

---

### Scene 9 — Silence Drop: Xuống Đại Dương Nguyên Thủy (`5:00 – 5:15`)
- **Hình ảnh:** Nhạc nền tắt đột ngột (`intensity: 0.02`). Ánh sáng lịm dần thành xanh thẫm. Đồng hồ Gia Phả quay vù về `-500+ Tr năm`.
- **Lời thoại:**
  > *(Giọng trầm, chậm)*  
  > *"Nhưng khoan đã... nếu bây giờ chúng ta vặn máy quét lùi sâu hơn năm trăm triệu năm... xuống tận đáy đại dương nguyên thủy..."*  
  > *"Nơi chưa có xương sống, chưa có chân tay, và ranh giới giữa các loài bắt đầu bị xóa nhòa hoàn toàn..."*

---

### Scene 10 — Cặp #6: Bạch Tuộc Thiên Tài & Ốc Sên (`5:15 – 5:50`)
- **Hình ảnh:** Nhạc dâng lại. **Bạch Tuộc** vặn nắp hũ thủy tinh; đồ hoạ 3 trái tim + 1 não chính sáng đỏ nối 8 "não mini" ở 8 xúc tu. **A: Cá Mập** vs **B: Ốc Sên**. Tia sét nối **Bạch Tuộc ↔ Ốc Sên**. Minh hoạ: tổ tiên có vỏ (giống ốc anh vũ) → vỏ thu nhỏ dần → bạch tuộc.
- **Lời thoại:**
  > *"Trạm số sáu: Bạch Tuộc, sinh vật thông minh bậc nhất đại dương! Ba quả tim, một bộ não chính cùng tám bộ não mini ở tám xúc tu, còn biết tự vặn mở nắp hũ thủy tinh!"*  
  > *"Đố bạn: họ hàng gần của Bạch Tuộc là A: Cá Mập săn mồi, hay B: Con Ốc Sên bò chậm rì ngoài vườn?"*  
  > *"Ba... hai... một... Đáp án là B: Con Ốc Sên!"*  
  > *"Bạch Tuộc, Mực, Ốc Sên và cả Con Sò đều cùng thuộc ngành Thân mềm! Tổ tiên xa xưa của Bạch Tuộc từng mang một chiếc vỏ cứng giống vỏ ốc. Về sau nhánh này bỏ dần lớp vỏ nặng nề để bơi nhanh hơn, đổi lại bằng bộ não siêu việt để tự bảo vệ mình!"*  
  > *(Tí Hon đánh rơi **Phao vịt** — HUD Phải: `7 món`)*

---

### Scene 11 — Cặp #7 (Trùm Cuối): Con Người — Rau Hay Nấm? (`5:50 – 6:35`)
- **Hình ảnh:** Đồng hồ chốt `-1 Tỷ năm`, bùng sáng vàng kim. Hộp cơm trưa mở nắp: **Rau Xà Lách (A)** và **Cây Nấm (B)**. Tia sét nối **Con Người ↔ Nấm**; sau đó **Quả Chuối** sáng mờ trên cây sự sống chung.
- **Lời thoại:**
  > *"Máy quét lùi về hơn một tỷ năm trước..."*  
  > *"Trạm số bảy, trùm cuối của cả gia phả: chính Con Người chúng ta!"*  
  > *"Đúng như tớ hứa, nhìn vào hộp cơm trưa của bạn đi. Thứ nào là họ hàng gần với bạn hơn: A: Cọng Rau Xà Lách, hay B: Cây Nấm?"*  
  > *"Ba... hai... một... Là B: Cây Nấm! Động vật và Nấm nằm chung một nhánh lớn, gần nhau hơn hẳn so với Thực vật!"*  
  > *"Thậm chí ngay cả với Quả Chuối, khoảng sáu mươi phần trăm gen của con người vẫn có một bản họ hàng trong cây chuối, thừa hưởng từ tổ tiên đơn bào chung cách đây hơn một tỷ năm!"*  
  > *"Nói cách khác... cả hành tinh xanh này thực chất đều là anh em một nhà!"*

---

### Scene 12 — Trạm Bí Mật: Vì Sao Gà Gọi Tí Hon Là Chú Út? (`6:35 – 7:05`)
- **Hình ảnh:** Thẻ `🔒 BÍ MẬT` mở khóa. HUD Trái nhảy về `-68 Tr năm`. Bộ xương T-Rex trong viện bảo tàng → zoom vào mảnh xương → chuỗi protein trôi ra, đặt cạnh chuỗi của gà, đèn khớp xanh. Cắt về sân: Gà Trống khoác cánh lên vai Tí Hon. Tí Hon từ từ nhìn xuống miếng đùi gà trên tay → Freeze Frame.
- **Lời thoại:**
  > *"Và giờ là trạm bí mật: vì sao con gà trống lại gọi tớ là chú út?"*  
  > *"Vì nó nói đúng! Chim chính là nhánh khủng long duy nhất còn sống sót tới hôm nay! Năm hai nghìn không trăm lẻ bảy, các nhà khoa học tìm được những mảnh protein trong xương một con Tê Rếch sáu mươi tám triệu năm tuổi, và đem so thì nó giống protein của... con gà nhất!"*  
  > *"Vậy là con gà ngoài sân là cháu họ xa của tớ thật... còn miếng đùi gà trên tay tớ thì..."*  
  > *(Tí Hon đánh rơi **Hộp cơm trưa** — HUD Phải: `8/8 món`)*

---

### Scene 13 — Tổng Kết & Cú Lật Mâm Cơm (`7:05 – 7:20`)
- **Hình ảnh:** 8 thẻ lật nhanh (`card_flip.wav`). Cắt về hộp cơm trưa: **Đùi Gà + Canh Nấm + Chuối tráng miệng**. Tí Hon cầm đũa, Freeze Frame.
- **Lời thoại:**
  > *"Tổng kết nào! Cá Ngựa với Cá Chìa Vôi, Hồng Hạc với Chim Lặn, Hà Mã với Cá Heo, Voi với Đa Man, Bọ Ngựa với Gián, Bạch Tuộc với Ốc Sên, Con Người với Cây Nấm, và trạm bí mật: Tê Rếch với Con Gà!"*  
  > *"Giờ tớ nhìn lại hộp cơm trưa có đùi gà, canh nấm với quả chuối... Khoan đã! Thế trưa nay tớ đang ngồi ăn trưa cùng cả họ hàng à?!"*

---

### Scene 14 — Khảo Sát & Bấm Đăng Ký Bằng Đuôi (`7:20 – 7:35`)
- **Hình ảnh:** Tí Hon với hai tay ngắn không tới nút Đăng Ký, xoay người lấy đuôi bấm *"Tách!"* — end screen 15–20 giây trỏ playlist Shorts Họ Hàng.
- **Lời thoại:**
  > *"Bạn đoán đúng được mấy trên bảy cặp trong tập hôm nay? Bình luận số điểm của bạn bên dưới để tớ chấm bài nhé!"*  
  > *"Đúng hay sai thì cũng nhớ bấm Đăng Ký Khủng Long Tí Hon giùm tớ, tay tớ ngắn quá nên để cái đuôi bấm giùm bạn luôn nè! Hẹn gặp bạn ở chuyến xuyên không tiếp theo!"*

---

## 4. Nguồn Kiểm Chứng (cần research-agent xác nhận lại trước gate A)

| Khẳng định | Ghi chú |
|---|---|
| Hà Mã là họ hàng gần nhất còn sống của Cá Voi/Cá Heo (nhánh Whippomorpha) | Phát sinh chủng loại phân tử + hoá thạch *Indohyus*, *Pakicetus* |
| Voi–Đa Man–Lợn Biển cùng nhánh Paenungulata; Tê Giác thuộc Perissodactyla cùng Ngựa | |
| Hồng Hạc–Chim Lặn là nhánh Mirandornithes; vỏ trứng có lớp phấn; cùng họ rận lông | Bộ gen chim 2014 (Jarvis và cs.) |
| Bọ Ngựa–Gián–Mối cùng Dictyoptera; cả Bọ Ngựa và Gián đều đẻ trứng trong bao trứng (ootheca) | |
| Cá Ngựa–Cá Chìa Vôi cùng họ Syngnathidae; con đực ấp trứng | |
| Bạch Tuộc thuộc ngành Thân mềm; tổ tiên chân đầu có vỏ ngoài | |
| Động vật và Nấm cùng nhánh Opisthokonta; ~60% gen người có gen tương đồng ở chuối | Con số chuối là ước tính phổ biến, chỉ nói "khoảng" |
| Chim là khủng long; collagen T-Rex (MOR 1125, ~68 Tr năm) giống gà nhất | Asara và cs., *Science* 2007 — kết quả từng bị tranh luận, nên lời thoại nói "tìm được… giống nhất", không nói "chứng minh tuyệt đối" |
