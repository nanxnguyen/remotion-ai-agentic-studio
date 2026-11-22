# Tập 3 v3 (Viral Algorithm & Retention Upgrade) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` / `@Swarm` parallel execution after the user delivers the new Vbee `voiceover.mp3` generated from Task 1. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp Tập 3 (`ti-hon-ngay-cuoi-khung-long`) lên phiên bản **v3** chuẩn thuật toán giữ chân YouTube: Intro Vàng `<= 28 giây`, Open Loop nối đuôi xóa sạch Section Cliffs giữa Chỗ #1–#7, 2 cú lừa False Victory + Mid-video Wager, thanh tiến độ `drawSpotTracker` trên HUD đỉnh, Binge Outro dẫn sang Tập 2, render `1440p` (`-14.0 LUFS`) và cập nhật in-place vào Google Drive `#55`.

**Architecture:** Chia làm **2 pha cứng** để tuân thủ quy tắc 1-vòng trong `docs/ti-hon-series/05-production-spec.md §5(a)`: Pha 1 hoàn thiện & kiểm duyệt kịch bản v3 sạch cho TTS Vbee trước khi người dùng tạo `input/voiceover.mp3` mới; Pha 2 chạy Whisper word alignment (`words.json`, `anchors.json`) rồi điều phối `@Swarm` song song nâng cấp `props.js`, `tools_build_shots.py`, các module cảnh `01_intro.js..05_spot7_outro.js`, bộ tài liệu `docs/ti-hon-ngay-cuoi-khung-long/`, kiểm định `shot_lint.py --strict` + Storyboard/Animatic, render `1440p`, và đẩy in-place lên Drive `#55`.

**Tech Stack:** `thanhhai-2d-studio` (HTML5 Canvas 2.5D + Three.js, Playwright headless Chromium, Python 3.12 Whisper/FFmpeg pipeline, `/engine/tihon.js` Tí Hon v3.0), `gdrive` CLI.

**Spec:** [docs/superpowers/specs/2026-11-20-ti-hon-tap-3-v3-viral-upgrade-design.md](../../superpowers/specs/2026-11-20-ti-hon-tap-3-v3-viral-upgrade-design.md)

## Global Constraints

- Bảo toàn tuyệt đối thông số kỹ thuật v2: độ phân giải `1440p` (`2560×1440`), `24 fps`, chuẩn âm thanh `-14.0 LUFS` (`TP <= -1.0 dBTP`), End Screen hoạt họa `15–20 giây`.
- Bảo toàn nhân vật **Tí Hon v3.0** (`/engine/tihon.js`): 2 mắt 3/4, **KHÔNG đội mũ bảo hiểm vàng**, chỉ có đế xám + nút đỏ `"VỀ NHÀ / TUA LẠI"` trên đỉnh đầu; lời thoại kịch bản phải khớp chi tiết này (tuyệt đối không gọi "mũ bảo hiểm").
- Bảo toàn toàn bộ sự thật & cặp số liệu khoa học trong `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md`: `10–12 km`, `180–200 km`, `1.500 km`, `3.000 km`, `15–30 phút`, `>30 phút`, `130 m`, `1–3 giờ`, `Purdue 2026`, `ít nhất 26°C` (giảm thêm), `75%`, bạn thú đào hang vô danh (không *Purgatorius*), Tí Hon ăn giun/ấu trùng (không ăn hạt).
- Bảo toàn vùng an toàn màn hình (`1920×1080` logical): Top HUD `y = 36..142` (`x >= 52`), nhãn trên hình `y = 162..340`, đồ họa/callout `y <= 860` (`>= 30px`, nền pill tối), vùng phụ đề `y >= 940`.
- Quy trình 1 vòng duy nhất: **KHÔNG** chỉnh sửa `tools_build_shots.py` hay `story/shots.json` trước khi nhận tệp `input/voiceover.mp3` mới từ Vbee.
- Không tạo GitHub Release cho MP4, không tự động đăng công khai YouTube, cập nhật in-place trong Google Drive folder `#55` (`1xEVvmz4KTrbbm56FjcJgXcArRZq9hyEY`).

## Review Focus

- Intro v3 bắt buộc kết thúc và bước vào cảnh `Chỗ #1` (`0 km`) ở mốc thời gian **`<= 28.0s`** trên audio Vbee thật (`story/anchors.json`), không có dấu hiệu tụt nhịp do giải thích dài.
- `drawSpotTracker` đặt ở `(x=960, y=94..128)` không bao giờ đè vào `spotLabel` dài (`> 26` ký tự) phía trên (`y=36..84`), không chạm vào `drawSurvivalClock` (`x=52..362`), `drawLostItemsBar` (`x >= 1430`) và luôn giữ khoảng thở `>= 34px` phía trên vùng nhãn `y >= 162`.
- Hai cảnh False Victory (Chỗ #4 yên ả trước xoáy nước; Chỗ #6 picnic ấm áp trước Silence Drop #1) phải chuyển pha hình ảnh & âm thanh dứt khoát tại đúng khung từ khóa Whisper (`timeline/words.json`).
- Binge Outro (`p52`) không dùng lời chào tạm biệt, phải chuyển mượt sang `end01..end02` (`15–20s`) mà không có frame đen hoặc cắt hụt chữ cuối của Vbee.
- Bộ tài liệu `02-shot-list.md`, `03-storyboard.md`, `04-animatic.md`, `packaging.md`, và `youtube-title-description.txt` (chapters) phải khớp từng giây với `shots.json` bản v3 mới.

---

### Task 1: Hoàn Thiện & Kiểm Định Kịch Bản v3 Chuẩn Vbee (Pha 1 — Chờ User Xuất MP3)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/script-v3-vbee.txt`
- Create: `docs/ti-hon-ngay-cuoi-khung-long/script-v3-blueprint.md` (bảng ánh xạ câu -> 4 chặng thuật toán + check số liệu khoa học)

**Interfaces:**
- Produces: `docs/ti-hon-ngay-cuoi-khung-long/script-v3-vbee.txt` (văn bản thuần UTF-8 không markdown, 52 đoạn `p01..p52`, chỉ dùng phiên âm Vbee chuẩn: `Diu ca tan`, `Chích xu lúp`, `Ta nít`, `Bắc Đa cô ta`, `Pơ điu`, `Ê vơ rét`).

- [ ] **Step 1: Viết `docs/ti-hon-ngay-cuoi-khung-long/script-v3-vbee.txt` theo đúng cấu trúc Spec §3.1**
  - Intro `p01..p03` (~105 từ, mục tiêu ~24–27s), bỏ câu nhắc tập trước dài và câu rào khoa học; giữ nguyên Hook cây kem 1s + đổi "mũ bảo hiểm" thành "nút đỏ trên đầu".
  - Chỗ #1–#7 (`p04..p45`) có cầu nối Open Loop ở cuối mỗi chỗ, 2 False Victory (`p20`, `p31..p32`), Mid-video Wager (`p24`), 2 Silence Drops (`p33`, `p37`), đầy đủ 10 token số liệu khoa học trong `research-sources.md`.
  - Xếp hạng + Cú lật + Binge Outro (`p46..p52`).
- [ ] **Step 2: Kiểm tra đối chiếu sự thật khoa học & độ dài Intro**
  - Verify không chứa `"mũ bảo hiểm"`, `"Purgatorius"`, `"giảm xuống còn 26"`, hoặc câu chào tạm biệt trước Outro.
  - Verify tổng số từ của `p01..p03` `<= 115` từ để bảo đảm `<= 28.0s` khi Vbee đọc tốc độ chuẩn.
- [ ] **Step 3: Xuất kịch bản sạch ra chat cho User pass vào Vbee và tạm dừng chờ `voiceover.mp3` mới**

---

### Task 2: Thu Nhận Audio Vbee Mới & Chạy Alignment Đo Từng Từ (Mở Đầu Pha 2)

**Files:**
- Replace: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/input/script.txt` (chỉ sau khi nhận MP3 mới)
- Replace: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/input/voiceover.mp3`
- Regenerate: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/timeline/words.json`
- Regenerate: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/story/anchors.json`

**Interfaces:**
- Consumes: `docs/ti-hon-ngay-cuoi-khung-long/script-v3-vbee.txt` + file `.mp3` mới từ user.
- Produces: `timeline/words.json`, `story/anchors.json` (xác nhận thời lượng thật `p03.end <= 28.0s` và `audioDuration`).

- [ ] **Step 1: Chép file MP3 mới vào `input/voiceover.mp3` và cập nhật `input/script.txt` khớp `script-v3-vbee.txt`**
- [ ] **Step 2: Chạy pipeline Whisper alignment tạo `timeline/words.json` và `story/anchors.json`**
- [ ] **Step 3: Verify mốc thời gian `p03.end <= 28.0s` và `ffprobe` âm thanh sạch**

---

### Task 3: Nâng Cấp HUD (`drawSpotTracker`) & Bố Cục Top Bar (`hud_props_worker`)

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/scenes/props.js`
- Modify: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/config.json`

**Interfaces:**
- Produces: `drawSpotTracker(g, {x = 960, y = 108, current = 0, statuses = [], t = 0})` và tham số tùy chọn `tracker` trong `drawHud(g, info, state)` của `scenes/props.js`.

- [ ] **Step 1: Viết `drawSpotTracker` nằm gọn trong `y = 92..130` (giữa khoảng `x = 730..1190`, 7 huy hiệu `1..7` với trạng thái `'pending' | 'active' | 'failed' | 'win'` và nhãn thời gian siêu ngắn dưới/cạnh huy hiệu nếu `<= 16px` trong pill)**
- [ ] **Step 2: Tích hợp `tracker` vào `drawHud(g, info, state)` mà không làm dịch chuyển `drawSurvivalClock` (`x=52, y=36`), `spotLabel` (`y=36..84`), hay `drawLostItemsBar` (`x=E.W-52, y=92`)**
- [ ] **Step 3: Cập nhật `config.json` `"duration"` bằng `audioDuration + 16.4` (làm tròn 1 chữ số thập phân)**
- [ ] **Step 4: Run `node --check thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/scenes/props.js`** -> Expected: exit 0.

---

### Task 4: Tái Cấu Trúc Shot List v3 & Dựng 6 Module Cảnh Song Song (`@Swarm`)

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/tools_build_shots.py` -> Regenerate `story/shots.json`
- Modify (`@Swarm` 1 file/worker không trùng nhau):
  - `01_intro.js` (`hud_props_worker`): Nén Intro `0..28s` cắt nhanh `2.0–3.2s/shot`, bỏ cảnh giải thích dài, đẩy `s07` (`3D #1`) vào đúng trước Chỗ #1.
  - `02_spots_1_2.js` & `03_spots_3_4.js` (`spots14_worker`): Gắn `tracker` cho Chỗ #1–#4, bỏ chi tiết mũ bảo hiểm cũ nếu còn sót trong lời thoại/callout, nâng cấp **False Victory #1** (Chỗ #4 tĩnh lặng -> giật gắt) & **Mid-video Wager** thẻ `RỪNG / CHÂU Á / ???` tại cuối Chỗ #4.
  - `04_spots_5_6.js` & `05_spot7_outro.js` (`spots57_outro_worker`): Gắn `tracker` Chỗ #5–#7, nâng cấp **False Victory #2** & `Silence Drop #1/#2`, cập nhật nhịp Binge Outro nối sang `end01..end02` (`15–20s`).

**Interfaces:**
- Consumes: `story/anchors.json`, `timeline/words.json`, `drawSpotTracker` trong `scenes/props.js`.
- Produces: `story/shots.json` mới và 5 file `scenes/shots/01_intro.js..05_spot7_outro.js` đồng bộ IDs với `shots.json`.

- [ ] **Step 1: Cập nhật `tools_build_shots.py` khớp 52 đoạn `p01..p52` + `end01..end02` (`16.4s` hold), chạy `python3 tools_build_shots.py`**
- [ ] **Step 2: Chạy `python3 tools/shot_lint.py --project projects/ti-hon-ngay-cuoi-khung-long --strict`** -> Expected: `0 error(s), 0 warning(s)`
- [ ] **Step 3: Phân phối `@Swarm` cập nhật `01_intro.js`, `02_spots_1_2.js`, `03_spots_3_4.js`, `04_spots_5_6.js`, `05_spot7_outro.js` và chạy `node --check` từng file**

---

### Task 5: Đồng Bộ Tài Liệu Series/Tập & Kiểm Duyệt Storyboard + Animatic (`docs_sync_worker`)

**Files:**
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/02-shot-list.md`
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/03-storyboard.md`
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/04-animatic.md`
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/packaging.md`
- Modify: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/out/youtube-title-description.txt` (chapters mới từ `shots.json`)

**Interfaces:**
- Consumes: `story/shots.json` v3.

- [ ] **Step 1: Xuất Contact Sheet Storyboard (`node render.mjs --project projects/ti-hon-ngay-cuoi-khung-long --sheet --scale 0.5`)** -> Kiểm tra `drawSpotTracker` không đè chữ/HUD trên tất cả các sheet.
- [ ] **Step 2: Chạy `python3 audio/mix.py` + 2-pass `loudnorm=I=-14.0:TP=-1.0:LRA=11` ra `build/mix.wav` và dựng `build/animatic.mp4`** -> Đo `ebur128` xác nhận `-14.0 ± 0.3 LUFS`.
- [ ] **Step 3: Cập nhật `02-shot-list.md`, `03-storyboard.md`, `04-animatic.md`, `packaging.md`, `youtube-title-description.txt` khớp timestamps v3 mới.**

---

### Task 6: Render Full `1440p` v3 & Cập Nhật In-Place Google Drive `#55` (`qa_render_worker`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/out/video-final-v3.mp4` (đồng bộ `video-final.mp4`)
- Drive Target: Folder `#55` (`1xEVvmz4KTrbbm56FjcJgXcArRZq9hyEY`)

- [ ] **Step 1: Render `1440p` (`node render.mjs --project projects/ti-hon-ngay-cuoi-khung-long --workers 6 --format jpeg --preset veryfast --out .../build/video_silent.mp4`)**
- [ ] **Step 2: Mux `video_silent.mp4` + `build/mix.wav` -> `out/video-final-v3.mp4` (`2560×1440`, `24fps`, `-movflags +faststart`) và kiểm tra `ffprobe`**
- [ ] **Step 3: Cập nhật in-place Google Drive `#55` (`133PLC5J4NtaDYUIkWybaNK2fRUC8hDzo` và `1iq9XGatN8adsSqbGg8wB-WACYjfseSks`), kiểm chứng bằng `gdrive readonly ls` & `info` và gửi đầy đủ link Drive cho người dùng.**
