# Tài Liệu #4 — Biên Bản Animatic & Kiểm Nhịp Tập 3 v3 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long`
- **Tệp Animatic xuất kiểm tra:** `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/build/animatic.mp4`
- **Cấu trúc âm thanh & hình ảnh ghép kiểm nhịp:**
  - **Hình ảnh:** `138` khung hình Storyboard (`s01a` → `end02`) cắt đúng tới từng mili-giây theo `story/shots.json`.
  - **Giọng đọc Vbee thật (`input/voiceover.mp3`):** `397.584 giây` (`52` đoạn `p01..p52`, `1.703` từ căn chỉnh bằng Whisper trong `timeline/words.json`).
  - **Màn hình kết thúc hoạt họa có nhạc nền (`end01..end02`):** **`16.416 giây`** (`397.584s → 414.000s`: `end01` `8.216s` + `end02` `8.200s`), đạt chuẩn bắt buộc **`15–20 giây` End Screen**.
  - **Tổng thời lượng Animatic & Bản xuất chính thức:** **`414.000 giây` (`06:54` / `6 phút 54 giây`)**.
  - **Hệ thống âm thanh:** `18` phân đoạn nhạc nền tâm trạng (`story.music`) + `69` cảnh có hiệu ứng âm thanh WAV/procedural (`SHOT_SFX`), chuẩn hóa ở **`-14.0 LUFS`** integrated (`± 0.4 LUFS`) / **`TP <= -1.0 dBTP`** / `LRA = 7` (`48 kHz`).
  - **Thanh tiến độ mới (`drawSpotTracker`):** Căn giữa ngay dưới `spotLabel` tại `y = 92..130` (`420 × 38 px`, 7 ô `0s, 1s, 20m, 40m, 3h, 3M, ∞`, 4 trạng thái `pending | active | failed | win`), hiển thị từ `s03c` đến `s45b` và ẩn ở các cảnh Intro đầu (`s01a..s03b`), Bảng xếp hạng, Epilogue, Binge Outro và End Screen.

---

## 1. Đánh Giá Nhịp Mở Màn & Hook Vàng `<= 28 Giây` (`0.000s – 21.590s`, Cảnh `s01a` → `s03c`)

| Giai đoạn Hook | Cảnh | Mốc thời gian | Thời lượng | Đánh giá nhịp điệu & Giữ chân người xem (Retention Check) |
|---|---|---|---|---|
| **1. Visual Hook + Freeze Frame #1 (`p01`)** | `s01a` → `s01b` | `0.000s – 4.560s` | `4.560s` | Mở thẳng vào đồng hồ sinh tồn tụt về `00:01` và cây kem dâu bốc khói tan sạch trong 1 giây kèm `sizzle.wav` và `flash` + `freeze` ở `2.460s`. Không logo, không câu rào cản nhịp. |
| **2. Promise + Open Loop 7 Chỗ (`p02`)** | `s02a` → `s02c` | `4.560s – 13.360s` | `8.800s` | Tiếng `rewind.wav` và chuyển cảnh `whip` đưa về sáng mùa xuân 66 triệu năm trước (`yucatan_beach`), mở bảng `7` thẻ ẩn `?` khẳng định đúng 1 chỗ sống và chạy xa tới đâu vẫn có bẫy. |
| **3. Stakes + Luật Nút Đỏ + Cổng 3D (`p03`)** | `s03a` → `s03c` | `13.360s – 21.590s` | `8.230s` | Sơ đồ thước cao ngang mắt cá chân người lớn + mảng miếng dùng đuôi bấm nút đỏ `'TUA LẠI'` trên đầu (`boing.wav` + `ding.wav`), đẩy thẳng qua cảnh **3D #1 (`s03c`, `portals`)** ở `21.16s` VO / `21.590s` hết cảnh (`<= 28s` mục tiêu), vào Chỗ #1 ngay mốc **`00:22`**. |

---

## 2. Kiểm Nhịp Các Điểm Chuyển 7 Chỗ Trốn (`Chỗ #1` → `Chỗ #7`, Nối Đuôi Open Loop)

Mỗi điểm chuyển địa điểm đều được đánh dấu bằng hiệu ứng chuyển cảnh `whip` hoặc `dip` (`0.28s–0.42s`), Open Loop nối đuôi trước khi cắt cảnh, đồng bộ cập nhật **`drawSpotTracker`** (`y=92..130`), **`ĐỒ ĐÃ MẤT`** ở góc trên phải và mood nhạc nền:

| Chỗ trốn | Phạm vi cảnh (`pNN`) | Mốc thời gian (`start–end`) | Thời lượng | Số cảnh | Mood nhạc nền & Cường độ | Kết quả đồng hồ, Tracker & Đồ mất | Đánh giá nhịp kể chuyện & Thủ pháp giữ chân |
|---|---|---|---:|---:|---|---|---|
| **Chỗ #1: Bãi biển Yucatán (`0 km`)** | `s04a` → `s08c`<br>(`p04..p08`) | `21.590s – 57.520s` | `35.930s` | 12 | `epic` (`0.85`) | **`00:00` (`0s`)**<br>Tracker `[✕ 0s]`<br>Mất: `clock` | **Vào ở `00:22` (`<= 28s`).** Nhịp dồn dập với **3D #2 (`s06a`, `asteroid`)** và 2 cú nổ `flash_boom.wav`, chốt Open Loop cầu nối chạy xa `1.500 km` ở `s08c`. |
| **Chỗ #2: Đất liền (`1.500 km`)** | `s09a` → `s12c`<br>(`p09..p12`) | `57.520s – 87.660s` | `30.140s` | 12 | `action` (`0.70`) | **`VÀI GIÂY`**<br>Tracker `[✕ 0s, ✕ 1s]`<br>Mất: `clock, popsicle` | Giải quyết món nợ cây kem ở giây `0:00` (`s11b` `sizzle.wav` + `boing.wav`), chứng minh vòng nhiệt `> 900 dặm` (~1.500 km) rồi mở cầu nối `3.000 km`. |
| **Chỗ #3: Sông Tanis (`3.000 km`)** | `s13a` → `s18c`<br>(`p13..p18`) | `87.660s – 129.880s` | `42.220s` | 15 | `tension` (`0.68`) | **`20 PHÚT`**<br>Tracker `[.. ✕ 20m]`<br>Mất: `clock, popsicle` | Tăng tiến 3 tầng: không khí mát -> động đất & sóng ngược Seiche (`15–30 phút`) -> mưa hạt thủy tinh `lộp độp` trên nút đỏ (`s16c`) + X-quang mang cá Tanis (`s17a..s17b`), mở cầu nối xuống đáy biển. |
| **Chỗ #4: Đáy Vịnh Mexico** | `s19a` → `s24d`<br>(`p19..p24`) | `129.880s – 176.820s` | `46.940s` | 15 | `action` (`0.74`) | **`~40 PHÚT`**<br>Tracker `[.. ✕ 40m]`<br>Mất: `clock, popsicle, float` | **False Victory #1 (`s20a..s20b`):** Khoảng êm ru đánh lừa trước cú nổ `BÙM!` (`s21a`, `mblur=5`) + lồng máy giặt đứt phao + dòng hút ngược `130 m` đá lấp hố, kết bằng **Mid-Video Wager (`s24d`, `recap_studio`)** chọn 1 trong 3 chỗ cuối. |
| **Chỗ #5: Rừng lục địa (`Lò nướng`)** | `s25a` → `s30b`<br>(`p25..p30`) | `176.820s – 222.310s` | `45.490s` | 14 | `dark` (`0.74`) | **`~3 GIỜ`**<br>Tracker `[.. ✕ 3h]`<br>Mất: `clock, popsicle, float` | Điểm nhấn **3D #3 (`s28a`, `oven_earth`)** nắp vung bụi silicat Purdue 2026 (`17×` ngưỡng tử vong ở người) nối mượt sang cảnh hài hồ nước sôi ùng ục như nồi lẩu (`lava_boil.wav`), mở cầu nối sang châu Á. |
| **Chỗ #6: Châu Á (`Mùa đông -26°C`)** | `s31a` → `s36c`<br>(`p31..p36`) | `222.310s – 270.160s` | `47.850s` | 16 | `playful` (`0.48`) → **`Silence Drop #1`** → `sad` (`0.66`) | **`~3 THÁNG`**<br>Tracker `[.. ✕ 3M]`<br>Mất: `clock, popsicle, float, picnic` | **False Victory #2 (`s32a..s32b`):** Picnic bánh mì ấm áp giữa hoàng hôn lạ bị cắt gắt bởi **Silence Drop #1 (`p33`)**, mặt trời tắt nắng (`-26°C`, `75%` loài tuyệt chủng), mở Open Loop *"chỉ còn một hướng duy nhất"*. |
| **Chỗ #7: Hang ngầm (`Climax sống sót`)** | `s37a` → `s45b`<br>(`p37..p45`) | `270.160s – 329.380s` | `59.220s` | 21 | **`Silence Drop #2`** → `calm` (`0.36`) → `hopeful` (`0.62`) | **`∞` (Ngày 365!)**<br>Tracker `[.. ∞ win]`<br>Giữ đủ 4 món đã mất | Mở bằng **Silence Drop #2 (`p37`)** đầy hồi hộp trước cửa hang, lật callback chiều cao mắt cá chân thành "tấm vé vàng", kết bạn thú nhỏ, đất chắn nhiệt, chuỗi nấm–giun (`1` con giun/ngày) qua 365 ngày tới **`∞`** (`s45b`). |

---

## 3. Kiểm Định Chi Tiết 2 Điểm Lặng Cảm Xúc (`Silence Drop #1 & #2`)

1. **Silence Drop #1 — Khoảnh khắc Mặt Trời tắt nắng tại Châu Á (`p33`, `237.160s – 240.960s`, kéo dài `3.800 giây`, cảnh `s33a` → `s33b`):**
   - **Kỹ thuật chuyển:** Ngay sau cao trào tự mãn ở **False Victory #2 (`s32b`)**, cảnh `s33a` vào bằng `dip` (`0.42s`) tối sầm bầu trời; nhạc nền `playful` (`0.48`) cắt đột ngột xuống `calm` ở mức gần như im lặng tuyệt đối (`intensity: 0.02`).
   - **Hiệu quả trên Animatic:** Khoảng lặng `3.800s` làm câu *"Nhưng tớ đã nhầm..."* và tiếng gió băng `audio/frost_wind.wav` (`s33b`) nổi lên gai góc, tạo bước ngoặt cảm xúc sang `sad` (`intensity: 0.66`) và cú đóng băng bánh mì `audio/ice_snap.wav` (`s33c`).
2. **Silence Drop #2 — Khoảnh khắc tĩnh lặng trước cửa Hang Ngầm Chỗ #7 (`p37`, `270.160s – 274.360s`, kéo dài `4.200 giây`, cảnh `s37a` → `s37b`):**
   - **Kỹ thuật chuyển:** Sau nhịp hụt hơi ở cuối Chỗ #6 (`s36c`), cảnh `s37a` chuyển bằng `dip` (`0.42s`) sang không gian tranh tối tranh sáng dưới gốc cây; nhạc nền giữ ở `calm` (`intensity: 0.02`) trong `4.200s`.
   - **Hiệu quả trên Animatic:** Tạo nhịp lấy hơi tĩnh lặng trước hồi Climax cuối cùng (*"Chỗ thứ bảy. Chỗ cuối cùng. Chui xuống lòng đất"*), kéo sự chú ý tuyệt đối vào câu hỏi làm sao T-Rex chui vừa cái hang nhỏ xíu.

---

## 4. Kiểm Nhịp Bảng Xếp Hạng, Cú Lật Đùi Gà, Binge Outro & End Screen `16.416 Giây`

| Phân đoạn cuối | Cảnh | Mốc thời gian | Thời lượng | Đánh giá khớp nhịp hình – tiếng trên `build/animatic.mp4` |
|---|---|---|---|---|
| **Bảng xếp hạng 7 chỗ trốn (`p46..p47`)** | `s46a` → `s47d` | `329.380s – 351.720s` | `22.340s` | `8` cảnh lật thẻ liên tiếp từ Hạng #7 (`0 giây`) lên Hạng #1 (`∞`), mỗi thẻ khớp chính xác với `audio/card_flip.wav` (`+0.15s`) và chốt Quán quân bằng `audio/ding.wav` ở `s47d`. |
| **Trái Đất tái sinh (`3D #4`) & Tiến hóa chim (`p48..p49`)** | `s48a` → `s49c` | `351.720s – 368.390s` | `16.670s` | Mở bằng cảnh **3D #4 (`s48a`, `reborn_earth`)** qua chuyển cảnh `dip` (`0.38s`) trên nền nhạc `wonder` (`0.58`), dẫn mượt sang sơ đồ khủng long lông vũ tiến hóa thành chim. |
| **Cú lật Đùi Gà Trên Đĩa Cơm (`Freeze #2`, `p50`)** | `s50a` → `s50b` | `368.390s – 374.140s` | `5.750s` | Tại giây `371.060s` (`s50b`), chớp `flash` (`0.20s`) + tiếng gà cục tác `audio/cluck_scratch.wav` (`-4 dB`) + `freeze` tạo cú punchline sắc gọn nhất cuối phim. |
| **Bình chọn, Bấm Đăng Ký bằng Đuôi & Binge Hook Tập 2 (`p51..p52`)** | `s51a` → `s52c` | `374.140s – 397.584s` | `23.444s` | Mở khảo sát bình luận nếu không có nút tua lại, mảng miếng tay ngắn nhờ bấm Đăng ký (`boing.wav` + `ding.wav`), và **KHÔNG chào tạm biệt** — kéo thẳng Open Loop *"đại dương đứng hình sau 8 giây"* sang Tập 2 tại đúng `397.584s`. |
| **End Screen Hoạt Họa Sống Động (`16.416s`, Chuẩn `15–20s`)** | `end01` → `end02` | `397.584s – 414.000s` | **`16.416s`** | - **`end01` (`397.584s – 405.800s`, `8.216s`):** Vào bằng `fade` (`0.35s`) + `pop.wav`, Tí Hon vẫy tay chỉ sang thẻ **Tập 2 (`8 GIÂY?!`)** bên trái.<br>- **`end02` (`405.800s – 414.000s`, `8.200s`):** Điểm tiếng `ding.wav` (`+0.2s`) và `shimmer` (`+2.6s`), Tí Hon nhún nhảy chỉ sang nút **Đăng Ký** bên phải trên nền nhạc `triumph` (`0.74`) rồi khép mượt tại `414.000s`. Không có khung hình đen. |

---

## 5. Kết Luận Nghiệm Thu Animatic & Audio Master v3

- **Trạng thái kiểm tra kỹ thuật (`shot_lint.py --strict`):** **ĐẠT (`138 shots, 0 error(s), 0 warning(s)`)**.
- **Chuẩn Audio Master (`build/mix.wav`):** Tổng thời lượng **`414.000s`**, chuẩn hóa `ffmpeg loudnorm=I=-14.0:TP=-1.0:LRA=7` ở `48.000 Hz`, kiểm đo `ebur128` đạt **`-14.0 ± 0.4 LUFS`** / **`TP <= -1.0 dBTP`**.
- **Độ khớp khẩu hình & phụ đề:** Toàn bộ `136` cảnh có thoại (`s01a` → `s52c`) khớp 100% với `1.703` từ trong `timeline/words.json`; `2` cảnh `end01..end02` tắt phụ đề (`captions: false`) để nhường không gian cho lớp phủ YouTube End Screen.
- **Độ an toàn vùng chữ & HUD:** Top HUD `y = 36..142` (`drawSpotTracker` ở `y = 92..130` tách biệt hoàn toàn khỏi `spotLabel` `y = 36..84`, đồng hồ trái và `ĐỒ ĐÃ MẤT` phải), 100% nhãn chữ/sơ đồ nằm ở `y <= 860`, không chạm dải nền phụ đề `y >= 940`.
