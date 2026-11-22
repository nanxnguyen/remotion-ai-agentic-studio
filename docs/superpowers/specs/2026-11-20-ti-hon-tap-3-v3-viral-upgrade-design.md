# Design Doc — Nâng Cấp Tập 3 v3 Theo Thuật Toán Đề Xuất & Giữ Chân YouTube (`ti-hon-ngay-cuoi-khung-long`)

- **Ngày lập:** `2026-11-20`
- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long`
- **Phương án được chọn:** **Phương án B — Nâng cấp tận gốc từ kịch bản (`script` v3) + thu lại Vbee thật + `@Swarm` tái cấu trúc hình ảnh/nhịp dẫn và render `1440p` v3**
- **Mục tiêu đích:** Khắc phục các điểm nghẽn thuật toán trên bản v2 hiện tại, đưa thời lượng Intro xuống `<= 28 giây`, xóa bỏ toàn bộ "Section Cliffs" bằng Open Loop nối đuôi, tăng cường thử thách & Pattern Interrupts, sau đó đồng bộ giao hàng vào cùng thư mục Google Drive `#55` (`1xEVvmz4KTrbbm56FjcJgXcArRZq9hyEY`).

---

## 1. Mục Tiêu, Phạm Vi & Ranh Giới (Goals, Non-Goals, Anti-Goals)

### Goals (Mục tiêu bắt buộc)
1. **Intro Vàng `<= 28 giây` (vào Chỗ #1 trước mốc `0:30`):** Nén toàn bộ **0–5s Visual Hook** (cây kem tan trong 1 giây + Freeze Frame), **5–15s Payoff Promise & Open Loop** (bài test 7 chỗ trốn thiên thạch, chỉ 1 nơi sống), và **15–28s Stakes & Rules** (gọi thẳng quy mô thảm họa + lồng nút `"VỀ NHÀ / TUA LẠI"` gọn vào 1 câu hành động), thay thế cho phần Intro dài `45.8s` ở bản v2.
2. **Xóa Section Cliffs bằng Open Loop nối đuôi (Chỗ #1 → #7):** Mỗi điểm kết thúc Chỗ `#k` phải mở sẵn câu hỏi hoặc nghịch lý dẫn thẳng sang Chỗ `#(k+1)` *trước* khi chốt đồng hồ, loại bỏ cảm giác liệt kê rời rạc để người xem không có cớ thoát video giữa chừng.
3. **2 Cú Lừa Kỳ Vọng (False Victory Twists) & Thách Thức Tương Tác:**
   - **False Victory #1 (Chỗ #4 — Đáy vịnh Mexico):** Tạo khoảng lặng yên bình đánh lừa (*"Tưởng trốn dưới đáy biển là thoát lửa..."*) ngay trước khi sóng thần và dòng hút ngược 130 m đá nghiền nát kỳ vọng.
   - **False Victory #2 (Chỗ #6 — Châu Á nửa vòng Trái Đất):** Đẩy tương phản cảnh picnic bánh mì ngập nắng ấm sang cú cắt lặng (`Silence Drop #1`) và mùa đông giảm `26°C`.
   - **Mid-video Wager Check-in:** Sau Chỗ #4 (chỉ còn 3 chỗ cuối), đặt câu hỏi cược tương tác trực quan giữ chân nhóm khán giả do dự ở phút thứ 3.
4. **Thanh Tiến Độ 7 Chỗ Trực Quan (`7-Spot Survival Tracker HUD`):** Bổ sung thanh tiến độ 7 chấm/thẻ nhỏ (`1..7`) hiển thị trạng thái từng chỗ (`x` đỏ / `?` đang chờ / `∞` xanh) ngay trong dải Top HUD (`y = 36..142`) để khán giả luôn thấy hành trình đang tiến tới Chỗ #7.
5. **Binge Outro Mở Vòng Lặp Sang Tập 2:** Không dùng tín hiệu kết thúc ("Cảm ơn / Tạm biệt"), đặt câu hỏi bình luận gọn + kéo thẳng Open Loop *"Đại dương nào đánh gục Tí Hon chỉ sau 8 giây?"* sang `end01..end02` (`15–20s` End Screen hoạt họa).
6. **Bảo toàn toàn bộ chuẩn kỹ thuật & nhân vật v2:** Giữ nguyên nhân vật **Tí Hon v3.0** (`/engine/tihon.js`), font `Be Vietnam Pro / Inter`, vùng an toàn chữ `y <= 860`, HUD `x >= 52, y >= 36`, callouts `>= 30px`, độ phân giải `1440p` (`2560×1440`, `24 fps`), chuẩn âm thanh `-14.0 LUFS` (`TP <= -1.0 dBTP`).

### Non-Goals (Ngoài phạm vi)
- Không đổi chủ đề 7 chỗ trốn hay thay đổi 7 kết quả khoa học cốt lõi của Tập 3.
- Không sửa thiết kế gốc nhân vật Tí Hon v3.0 trong plugin `thanh-hai-learn-ai-2d-studio`.
- Không tạo thư mục Drive mới (cập nhật in-place trong thư mục `#55`), không tạo GitHub Release cho file MP4, không tự đăng công khai lên YouTube.

### Anti-Goals (Tuyệt đối tránh)
- Không dựng cảnh/chia `shots.json` bản v3 trước khi có tệp giọng đọc Vbee mới (`voiceover.mp3`) và căn chỉnh Whisper (`timeline/words.json`) — tuân thủ quy trình 1 vòng duy nhất trong `docs/ti-hon-series/05-production-spec.md §5(a)`.
- Không bịa đặt hay phóng đại số liệu khoa học ngoài các nguồn đã kiểm chứng trong `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md`.
- Không đặt thanh tiến độ `7-Spot Tracker` lấn xuống vùng nhãn cảnh `y >= 162` hoặc đè lên Đồng hồ sinh tồn (`x = 52..362`) và bộ đếm `"ĐỒ ĐÃ MẤT"` (`x >= 1416`).

---

## 2. Các Phương Án Đã Cân Nhắc (Approaches)

| Phương án | Mô tả tóm tắt | Đánh đổi (Trade-offs) | Trạng thái |
|---|---|---|---|
| **Phương án A** | Giữ nguyên giọng Vbee `437.6s` v2, chỉ nâng cấp hình ảnh, HUD 7 chấm, nhịp cắt và SFX. | Không thể rút ngắn Intro `45.8s` xuống `<= 28s` hay sửa câu dẫn bị đóng giữa các chỗ. | Không chọn |
| **Phương án B** | Viết lại kịch bản v3 chuẩn thuật toán (Intro `<= 28s`, Open Loop nối đuôi, 2 False Victory, Binge Outro), thu Vbee mới -> Swarm dựng & render v3 `1440p`. | Tốn thêm 1 bước người dùng pass kịch bản qua Vbee trước khi Swarm chạy render lại. | **Được chọn (Chốt)** |
| **Phương án C** | Giữ nguyên Tập 3 v2, biến khung thuật toán thành template cho Tập 4. | Không cải thiện trực tiếp tỷ lệ giữ chân của Tập 3. | Chuyển giao một phần kiến thức sang Series |

---

## 3. Thiết Kế Kiến Trúc & Nâng Cấp Chi Tiết (Architecture & Changes)

### 3.1. Tái Cấu Trúc Kịch Bản TTS Vbee (`input/script.txt` v3 & `docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt`)
- **Nguyên tắc viết cho Vbee:** Viết thành từng câu ngắn giàu nhịp điệu, giữ nguyên các phiên âm tiếng Việt đã test đọc đúng (`Diu ca tan`, `Chích xu lúp`, `Ta nít`, `Bắc Đa cô ta`, `Pơ điu`, `Ê vơ rét`), chỉ dùng chữ và dấu câu chuẩn (không ký hiệu markdown/chú thích trong bản Vbee).
- **Cấu trúc 4 chặng mới:**
  1. **Intro Vàng (`0:00 – ~0:28`, rút từ 7 đoạn còn ~4–5 đoạn nén gọn):**
     - *0–5s (Hook):* *"Cây kem của tớ vừa tan sạch trong đúng một giây. Mà tớ đang đứng cách chỗ thiên thạch rơi tới một nghìn năm trăm ki lô mét."* (Giữ nguyên Hook cực mạnh + Freeze #1).
     - *5–15s (Promise + Open Loop):* *"Tua lại sáng mùa xuân sáu mươi sáu triệu năm trước, ngày cuối cùng của loài khủng long. Tớ sẽ thử trốn ở bảy chỗ — và chỉ đúng một chỗ giúp tớ sống nổi qua năm đầu tiên, chỗ mà gần như ai cũng đoán sai."* (Bỏ *"Như đã hứa ở tập trước..."* gây lạc nhịp người mới và bỏ *"Con số về thiên thạch là thật..."* dài dòng; đưa ghi chú nguồn khoa học thành thẻ visual nhỏ hoặc chú thích ngắn ở màn hình).
     - *15–28s (Stakes + Rules lồng vào hành động):* *"Tớ là Tí Hon, cao đúng tới mắt cá chân người lớn. Trên đầu tớ có nút tua lại: hễ bốc hơi, tớ quay về sáng nay ngay lập tức. Đồng hồ sinh tồn, bắt đầu!"* -> Đẩy thẳng vào hành lang 7 cổng & Chỗ #1 ngay mốc `~26–28s`.
  2. **Thân bài — 7 Chỗ Trốn Xâu Chuỗi Open Loop (`~0:28 – ~5:45`):**
     - **Chỗ #1 (0 km) -> cầu nối sang #2:** Thay vì kết bằng *"May mà mũ đã tua lại sáng nay"* rồi ngắt hẳn, kết bằng câu mở Loop trực tiếp: *"Đứng sát biển thì bốc hơi trong không giây. Vậy chạy xa hẳn một nghìn năm trăm ki lô mét, vừa ăn kem vừa ngắm thiên thạch thì sao?"*
     - **Chỗ #2 (1.500 km, kem tan 1s) -> cầu nối sang #3:** Giải quyết món nợ cây kem ở giây 0:00, rồi bắc cầu: *"Hơi nóng vươn tới hơn một nghìn bốn trăm ki lô mét. Vậy chạy xa gấp đôi, tới ba nghìn ki lô mét ở Bắc Đa cô ta, chắc chắn thoát nóng rồi chứ?"*
     - **Chỗ #3 (Tanis 3.000 km) -> cầu nối sang #4:** Động đất 15–30 phút + sóng đứng chôn cá + mưa hạt thủy tinh tektite -> bắc cầu: *"Trên cạn chỗ nào mặt đất cũng rung và mưa đá thủy tinh. Vậy lặn thẳng xuống đáy biển thì sao?"*
     - **Chỗ #4 (Vịnh Mexico — False Victory #1) -> Mid-video Wager:** Nhấn mạnh vài giây đầu dưới nước *"yên tĩnh lạ thường"* (False Victory), rồi nổ sóng thần máy giặt & hút ngược `130 m` đá lấp hố -> check-in cược: *"Bốn chỗ chưa trụ nổi một giờ. Chỉ còn ba chỗ cuối — và đúng một chỗ kéo dài tới vô cực. Bạn chọn rừng sâu, nửa kia Trái Đất, hay một nơi không ai ngờ?"*
     - **Chỗ #5 (Rừng lò nướng Purdue 2026) -> cầu nối sang #6:** Nắp vung bụi giữ nhiệt + hồ sôi như nồi lẩu -> bắc cầu: *"Ở gần tâm va chạm thì bị nướng chín. Vậy trốn hẳn sang bên kia Trái Đất, nửa vòng địa cầu ở châu Á thì sao?"*
     - **Chỗ #6 (Châu Á — False Victory #2 & Silence Drop #1):** Mở khung picnic bánh mì yên bình dưới nắng hoàng hôn lạ (False Victory), sau đó ngắt nhạc về im lặng (`Silence Drop #1`): bụi & lưu huỳnh che kín Mặt Trời -> giảm tới `26°C` -> đóng băng & `75%` loài tuyệt chủng -> bắc cầu vào #7: *"Trên mặt đất vừa bị nướng, vừa bị đóng băng. Chỉ còn đúng một hướng duy nhất không phải mặt đất..."*
     - **Chỗ #7 (Hang ngầm — Silence Drop #2 & Climax):** Chui vừa hang nhờ chiều cao mắt cá chân ("tấm vé vàng"), bạn thú nhỏ, đất cách nhiệt, mạng lưới nấm–giun (`1` con giun đủ no cả ngày) -> Ngày 100, 200, 365 -> đồng hồ nhảy **`∞`**.
  3. **Bảng Xếp Hạng Nhịp Nhanh & Cú Lật Cơm Gà:** Giữ mạch thẻ lật nhanh (`0:20` gọn gàng hơn), Trái Đất tái sinh (`3D #4`), nhánh khủng long lông vũ -> chim -> **Freeze #2: Đùi gà trên đĩa cơm trưa**.
  4. **Binge Outro (`~18s` cuối lời đọc + `15–20s` End Screen):**
     - Khảo sát chọn chỗ `#1–#7` để kéo bình luận.
     - Mảng miếng tay ngắn dùng đuôi bấm nút Đăng Ký.
     - **Binge Hook (KHÔNG chào tạm biệt):** *"Khoan rời đi! Nếu thiên thạch làm tớ bốc hơi trong không giây, thì ở tập trước, có một đại dương bình thường trên Trái Đất cũng làm đồng hồ của tớ đứng hình chỉ sau tám giây — bấm ngay sang video bên cạnh xem đại dương nào nhé!"* -> Chuyển thẳng vào `end01..end02` (`~16s` End Screen).

### 3.2. Nâng Cấp Hệ Thống HUD & Pattern Interrupts (`scenes/props.js` & `scenes/shots/*.js`)
1. **`drawSpotTracker` trong `scenes/props.js` (Mới):**
   - Vị trí: Đặt ngay dưới thanh `spotLabel` trung tâm đỉnh màn hình (`x = 960, y = 94..128`), chiều rộng `~420 px` (`7` ô tròn/huy hiệu gọn `1..7`), nằm hoàn toàn trong dải Top HUD `y <= 142`, không chạm `drawSurvivalClock` (`x = 52..362`) hay `drawLostItemsBar` (`x = 1430..1868`).
   - Trạng thái mỗi ô `1..7`:
     - Chưa thử: `?` viền xám nhạt
     - Đang thử (`active`): viền vàng sáng nhấp nhẹ + scale `1.15`
     - Thất bại (`failed`): dấu `✕` đỏ kèm nhãn siêu nhỏ (`0s`, `~1s`, `20m`, `40m`, `3h`, `3M`)
     - Chiến thắng (`win`): `∞` xanh lục bảo phát sáng
   - Gọi tự động từ `drawHud(g, info, state)` khi `state.tracker` được truyền vào (ẩn ở `cold_open`, `ranking`, `endscreen`).
2. **Nâng cấp nhịp cắt & Pattern Interrupts (`tools_build_shots.py` + `01_intro.js`..`05_spot7_outro.js`):**
   - Intro `0..28s`: tối đa `2.0–3.2s/shot`, xen kẽ `medium -> freeze -> wide -> close -> blueprint -> 3d`.
   - Tăng cường hiệu ứng thị giác ở 2 cú **False Victory** (Chỗ #4 ánh sáng lấp lánh yên tĩnh chuyển gắt sang rung lắc đỏ; Chỗ #6 bầu trời vàng cam picnic sập tối đen trong tích tắc kèm tiếng gió băng) và **Mid-video Wager** (hiển thị 3 thẻ `?` tương tác `RỪNG / CHÂU Á / ???` ở `s35b`).
   - Giữ toàn bộ 4 cảnh `3D` (`00_3d_hero.js`), 2 cảnh `freeze` (`s01b`, `s70b`), và đồng bộ `config.json` `duration` theo đúng `voiceoverDuration + 16.4s` End Screen.

### 3.3. Quy Trình Thực Thi 2 Giai Đoạn (Bắt Buộc Chờ Giọng Vbee Giữa Chặng)
- **Giai đoạn 1 (Soạn & Duyệt Kịch Bản v3):**
  - Cập nhật `input/script.txt` & `docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt`, kiểm tra đối chiếu khoa học + retention checklist, trình người dùng copy đưa vào **Vbee** xuất `input/voiceover.mp3` mới.
- **Giai đoạn 2 (Swarm Dựng Cảnh, Kiểm Định & Render v3 sau khi có `voiceover.mp3` mới):**
  - Chạy Whisper alignment tạo `timeline/words.json` & `story/anchors.json`.
  - Cập nhật `tools_build_shots.py` -> `story/shots.json` (`shot_lint.py --strict` đạt 0 error/warning).
  - Chia `@Swarm` song song theo file không đụng hàng:
    * Worker 1 (`hud_props_worker`): `scenes/props.js` (`drawSpotTracker` + `drawHud`) + `config.json` + `01_intro.js`
    * Worker 2 (`spots14_worker`): `02_spots_1_2.js`, `03_spots_3_4.js` (False Victory #1 + Wager check-in)
    * Worker 3 (`spots57_outro_worker`): `04_spots_5_6.js` (False Victory #2), `05_spot7_outro.js` (Binge Outro + End Screen)
    * Worker 4 (`docs_sync_worker`): Cập nhật `02-shot-list.md`, `03-storyboard.md`, `04-animatic.md`, `packaging.md`, `out/youtube-title-description.txt` (chapters mới)
    * Verifier (`qa_render_worker`): Kiểm tra `node --check`, `shot_lint.py --strict`, xuất Storyboard `--sheet`, Animatic `animatic.mp4`, Audio Master `-14.0 LUFS`, Render `1440p` (`--format jpeg --workers 6`), kiểm tra `ffprobe`, và cập nhật in-place Google Drive thư mục `#55`.

---

## 4. Các Phần Để Dành Cho Giai Đoạn Lập Plan & Triển Khai (Left to Builder)
- Rà soát chính xác độ dài từng câu Vbee thật sau khi thu âm để chốt ranh giới `p01..pNN` trong `tools_build_shots.py` (không ước lượng mù trước khi chạy Whisper).
- Chỉnh tọa độ chi tiết của `drawSpotTracker` nếu nhãn `spotLabel` ở một số cảnh có chuỗi dài hơn `28` ký tự để bảo đảm khoảng hở dọc `>= 10px`.
- Kiểm tra lại `packaging.md` nếu nhịp thời lượng mới làm thay đổi tổng thời gian hiển thị trên góc dưới phải Thumbnail (giữ sạch vùng `x > 1650, y > 920`).
