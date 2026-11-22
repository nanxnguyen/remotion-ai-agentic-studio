---
name: make-horror-video-ditap
description: "Option C — 100% code-drawn 2D/2.5D Vietnamese folklore horror video pipeline in the Da Hanh Di Tap style (25-35 min long-form episodes or Shorts, pill-body characters with bold dark outlines, mourning headbands, blind/scarred/faceless variants, blurred ancestor-altar and rural street sets, crisp black-outlined white burn-in subtitles without background boxes, 8-beat taboo-and-twist script structure, minimal titles, and split-color thumbnails). Use when the user asks for \"phong cách Dạ Hành Dị Tạp\", \"làm truyện ma 30 phút bằng code\", \"Option C\", \"dị văn dân gian 2D\", \"truyện ma dân gian dài 30 phút\", \"make horror video option C\", or \"Dạ Hành Dị Tạp style\"."
metadata:
  version: "0.3.0"
  author: Ray (built on Thanh Hai Learn AI 2D Studio)
---

# Truyện Ma 2D Studio — Option C (Phong Cách Dạ Hành Dị Tạp 25–35 Phút Bằng Code)

Dùng skill này khi sản xuất video truyện ma / dị văn dân gian Việt Nam dài **25–35 phút** (hoặc bản cắt Shorts 9:16) **100% bằng code vector 2D/2.5D** theo đúng ngôn ngữ hình ảnh, nhịp kể chuyện 8 hồi và công thức đóng gói đã kiểm chứng thực tế trên kênh `@DạHànhDịTạp` (*Thần Trùng - Chiếc Khăn Tang Thứ Ba Mươi Hai* 29:59 — 1.68M views / 12 ngày; *Bùa Lỗ Ban* 30:20; *Thiên Linh Cái* 31:55).

**Tài liệu bắt buộc đọc trước khi viết kịch bản hoặc dựng cảnh:**
- `references/ditap-playbook.md` — Cấu trúc kịch bản 8 hồi chuẩn 25–35 phút, 3 tầng cấm kỵ + bẫy công nghệ hiện đại, cao trào giả, manh mối sai lệch, cú lật danh tính 90%, lời kết phá vỡ bức tường thứ 4 (mặt kính đen), ngân sách tái sử dụng tài nguyên 30 phút, công thức tiêu đề tối giản, thumbnail chữ tách màu và mẫu bình luận ghim.
- `../make-horror-video/references/horror-engine-api.md` — API của `/engine/ditap.js` và `/engine/horror.js`.
- `../make-horror-video/references/horror-sound.md`, `voice.md`, `packaging.md`, `install.md`.
- Dự án mẫu kiểm chứng: `truyenma-studio/examples/ditap-demo/` (8 shots, 24s, style `nhang`, đạt chuẩn `shot_lint.py --strict` và `scare_lint.py --strict`).

---

## 1. Bốn đặc trưng cốt lõi của Option C (`engine/ditap.js`)

1. **Nhân vật vector 2D dáng Pill viền đậm (`D.ditapFigure`, `D.ditapBigFace`):**
   - Thân hình viên thuốc (`pill`), vai tròn khớp rời, cổ ngắn, viền đen đậm đồng đều (`#111216`, `3–4px`).
   - Đầu tròn/hơi oval, mắt tròn trắng lớn kèm con ngươi đen nhỏ liếc theo `look` và nháy mắt theo thời gian `t`, lông mày cong biểu cảm (`neutral`, `worried`, `scared`, `shocked`, `determined`, `angry`, `sad`, `eerie`, `smirk`), miệng nhép tự động theo `core.visemeAt`.
   - **Hệ thống dấu hiệu dị văn bản địa:**
     - `khanTang: true` — khăn tang xô trắng quấn trán có dải rủ đung đưa phía sau.
     - `scar: true` — vết sẹo chéo qua lông mày (dấu hiệu thầy pháp / người từng sống sót qua đại nạn).
     - `blindEye: 'left' | 'right'` — một bên mắt trắng đục không có con ngươi đen, bên mắt lành vẫn liếc theo `look`.
     - `faceless: true` — **mặt trơn mất toàn bộ ngũ quan** (tự động ẩn mắt, lông mày, mũi, miệng ngay cả khi truyền kèm `expr`, `blindEye` hay `viseme` — dùng cho thực thể thế mạng hoặc cú twist nhận diện ở hồi 7).
     - Trang phục & đạo cụ: áo bà ba nâu/chàm, áo tang trắng thắt dải xô, nón lá (`nonLa`), râu dê bạc (`beard`), gậy gỗ (`cane`), hũ sành bịt vải đỏ (`jar`), điện thoại phát sáng (`phone`).

2. **Bối cảnh 2.5D làm mờ hậu cảnh (`D.ditapAltar`, `D.ditapVillageStreet`):**
   - **Gian thờ tổ tiên (`D.ditapAltar`):** Hậu cảnh làm mờ (`blurLayer`, mặc định `blur: 5.5`) để nhân vật tiền cảnh bật khối rõ nét; gồm cột gỗ nhà cổ, bức hoành phi sơn son thếp vàng (`plaqueText = '德流光'`), di ảnh thờ (`photoEyes`), bát nhang, 2 cây nến bập bùng (`H.flicker`), **2 tấm gương hai bên trùm vải trắng** (`mirrorPeek: 0..1` hé mắt đỏ sau gương), quầng sáng ấm giữa khung và vignette tối 4 góc.
   - **Phố chợ nông thôn Việt Nam xưa (`D.ditapVillageStreet`):** Dãy đồi núi đá vôi mờ sương phía xa, các gian nhà mái ngói âm dương phủ rêu kèm biển hiệu tiếng Việt (`TẠP HOÁ`, `VẢI SỢI`), bóng chiếc xe đạp cũ, đôi quang gánh tre và cột điện dây chằng chịt.

3. **Thẻ tiêu đề đen & Phụ đề Burn-in không hộp nền (`D.ditapTitleCard`, `D.ditapSubtitle`, `D.ditapTimedSubtitle`):**
   - **Cold open 0:00–1:00:** Kể thẳng vào con số/quy tắc đếm bất thường, **không** đặt thẻ tiêu đề trong 3 giây đầu.
   - **Title card lúc ~1:00 (`D.ditapTitleCard`):** Nền đen tuyền (`#000000`), biểu tượng tối giản phía trên (`scarf` | `jar` | `mirror` | `boat`), tiêu đề chính font Serif màu trắng ngà lớn, dòng phụ màu đỏ thẫm, và tag `TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM`.
   - **Phụ đề Burn-in (`D.ditapSubtitle`, `D.ditapTimedSubtitle`):** Chữ trắng đậm (`Nunito 800`), viền đen dày sắc nét (`#000`) + bóng đổ mềm ở vùng an toàn đáy (`y = E.H * V(0.89, 0.80)`), tự động ngắt tối đa `<= 2` dòng; **TUYỆT ĐỐI KHÔNG vẽ khung hộp chữ nhật/pill tối màu (`fillRect`) che hậu cảnh**. Khi chuỗi rỗng hoặc nằm trong khoảng lặng giữa hai câu (`beats`), hàm tự động bỏ qua an toàn.

4. **Cấu trúc kịch bản 8 hồi (25–35 phút) & Đóng gói tối giản:**
   - Tuân thủ 8 hồi trong `references/ditap-playbook.md`: Cold open đếm số/luật cấm → Title card nền đen → 3 điều cấm kỵ từ thầy dân gian → 3 tầng leo thang (đỉnh điểm là **bẫy công nghệ hiện đại**: gọi video call / màn hình điện thoại biến thành tấm gương không che) → Cao trào giả (nghi thức tưởng đã xong) → Manh mối sai lệch âm thầm → Twist lật vai/danh tính ở mốc 90% → Lời kết phá vỡ bức tường thứ 4 ở 20 giây cuối (*"màn hình tắt thành mặt kính đen..."*).

---

## 2. Engine API (`import * as D from '/engine/ditap.js'`)

Tất cả hàm trong `/engine/ditap.js` hoạt động hoàn toàn tất định (deterministic, không dùng `Math.random()` hay `Date.now()`) và tự thích ứng cả `16:9` (`1920x1080`) lẫn `9:16` (`1080x1920`) qua `E.W`, `E.H`, `V()`.

| Hàm | Chữ ký & Tham số chính | Công dụng |
|---|---|---|
| `ditapFigure` | `D.ditapFigure(g, opts = {})` | Vẽ nhân vật dáng pill 2D tại chân `(x, y)`, tỉ lệ `s = V(1.8, 1.5)`, thời gian `t = 0`. Tuỳ chọn: `facing` (`1\|-1`), `outfit` (`'baBa'\|'mourning'\|'ghost'\|'coat'` hoặc `{top, color, pants, sash}`), `skin`, `shirtColor`, `pantsColor`, `hair` (`'cap'\|'parted'\|'long'\|'bun'\|'none'`), `hairColor`, `expr` (`'neutral'\|'worried'\|'scared'\|'shocked'\|'determined'\|'angry'\|'sad'\|'eerie'\|'smirk'`), `look` (`[dx, dy]`), `blink`, `khanTang` (`bool`), `scar` (`bool\|'left'\|'right'`), `blindEye` (`'left'\|'right'\|null`), `faceless` (`bool`), `beard` (`bool\|'long'`), `nonLa` (`bool`), `prop` (`'cane'\|'jar'\|'phone'\|'lantern'\|'incense'\|null`), `pose` (`'stand'\|'walk'\|'crouch'\|'point'\|'reach'\|'holdJar'\|'cane'\|'phone'\|'fear'`), `talk` (`0..1`), `viseme` (`'A'\|'O'\|'U'\|'E'\|'M'\|'F'\|'rest'`), `globalT` + `talkRange` (`[from, to]`), `seed`. |
| `ditapBigFace` | `D.ditapBigFace(g, cx, cy, r, opts = {})` | Cận cảnh (`close` / `ecu` / thumbnail) khuôn mặt bán thân tại `(cx, cy)` bán kính đầu `r`. Hỗ trợ `outfit`, `shirtColor`, `skin`, `rimColor`, `tilt`, `expr`, `look`, `blink`, `khanTang`, `nonLa`, `scar`, `blindEye`, `faceless` (ẩn toàn bộ mắt/mày/mũi/miệng), `beard`, `hair`, `hairColor`, `talk`, `viseme`, `globalT`, `talkRange`, `t`, `seed`. |
| `ditapAltar` | `D.ditapAltar(g, cam, t, M, opts = {})` | Dựng bối cảnh gian thờ tổ tiên 2.5D có làm mờ hậu cảnh (`blur = 5.5`). Gồm cột gỗ, bức hoành phi chữ Hán (`plaqueText = '德流光'`), di ảnh thờ (`photoEyes = 0..1`), bát nhang + 2 nến chập chờn, 2 tấm gương hai bên trùm vải trắng (`mirrorPeek = 0..1` hé mắt đỏ sau gương), `vignette` (`0.62`). Trả về `{ GY, M, altarTop }`. |
| `ditapVillageStreet` | `D.ditapVillageStreet(g, cam, t, opts = {})` | Dựng bối cảnh đường làng / phố chợ nông thôn Việt Nam xưa nhiều lớp chiều sâu (`layer`): đồi núi mờ sương, mái ngói rêu, biển hiệu `'TẠP HOÁ'` & `'VẢI SỢI'`, xe đạp, quang gánh, cột điện dây sương (`moodName = 'ghostNight'`, `M`). Trả về `{ GY, M }`. |
| `ditapTitleCard` | `D.ditapTitleCard(g, t, opts = {})` | Thẻ tiêu đề nền đen tuyền lúc ~1:00. Tuỳ chọn: `emblem` (`'jar'\|'boat'\|'scarf'\|'mirror'`), `title` (Serif trắng ngà `cream = '#f3ead5'`), `sub` (đỏ thẫm `crimson = '#c41c24'`), `tag` (`'TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM'`), `dur`. |
| `ditapSubtitle` | `D.ditapSubtitle(g, str, opts = {})` | Phụ đề burn-in chữ trắng đậm `Nunito 800`, viền đen dày sắc nét (`strokeColor = '#000000'`), bóng đổ sạch, **không vẽ hộp nền tối**. Tự ngắt `<= 2` dòng; tự return ngay nếu `str` rỗng/khoảng trắng. Tuỳ chọn: `y = E.H * V(0.89, 0.80)`, `size = V(44, 48)`, `maxW`, `color`, `strokeColor`. |
| `ditapTimedSubtitle` | `D.ditapTimedSubtitle(g, globalT, beats, opts = {})` | Tra câu thoại đang đọc tại `globalT` từ mảng `beats` (`[{start, end, text}]`); khi có `words.json` (`E.words` hoặc `opts.words`) sẽ tự động tô sáng vàng (`highlightColor = '#ffd257'`) đúng từ đang nói khớp giọng đọc, không vẽ hộp nền tối. |
| `ditapWordSubtitle` | `D.ditapWordSubtitle(g, globalT, opts = {})` | Phụ đề karaoke cụm 3–4 từ kiểu TikTok/Shorts & Tí Hon (`max = 4`, `uppercase = true`): chữ trắng viền đen dày không hộp nền, từ đang nói sáng vàng nổi nhẹ khớp từng từ theo `words.json`. |
| `ditapThumbText` | `D.ditapThumbText(g, opts = {})` | Cụm chữ thumbnail tách màu nổi khối cực lớn (gọi `horror.thumbText`): `lines` (`['DÒNG TRẮNG', 'DÒNG ĐỎ']`, dòng cuối tô màu `accent = '#e01b24'`), `x`, `y`, `align = 'left'`, `size = V(138, 112)`, `color = '#ffffff'`, `accent`, `tilt = -0.025`. |

---

## 3. Ngân sách sản xuất 30 phút bằng Code (Zero External PNG Cost)

Để dựng một tập dài **25–35 phút (~1.500–2.100 giây, 350–450 shots)** mượt mà, nhất quán và không tốn bất kỳ file ảnh PNG bên ngoài nào:

1. **Tái sử dụng Cast Modular (`scenes/cast.js`):**
   - Khai báo 4–6 đối tượng nhân vật chuẩn trong `scenes/cast.js` (ví dụ: `export const NAM = { ... }`, `THAY_TU`, `BA_NGOAI`, `BONG_MA`) rồi spread `{ ...NAM, ...over }` trong từng shot.
   - Mỗi shot chỉ truyền phần biến đổi trạng thái qua phần ghi đè: `{ expr: 'scared', look: [-1, 0], khanTang: true, pose: 'phone', prop: 'phone', talk: 0.7 }` hoặc ở hồi Twist truyền `{ faceless: true }`.
2. **Biến tấu 3–4 Bối cảnh chủ đạo bằng Độ mờ, Ánh sáng & Cỡ cảnh:**
   - Thay vì vẽ 400 bối cảnh khác nhau, xoay vòng 3–4 không gian chính (`D.ditapAltar`, `D.ditapVillageStreet`, `H.hem`, cảnh buồng trong/bờ sông) và thay đổi:
     - **Cỡ cảnh & tiêu cự:** `wide` (`blur: 2.5`, thấy toàn gian thờ và 2 gương trùm vải) → `med` (`blur: 5.5`, hội thoại 2 nhân vật với thầy pháp) → `close` / `ecu` (`D.ditapBigFace` với `blur: 8` ở hậu cảnh và `rimColor`).
     - **Trạng thái đạo cụ bối cảnh:** `photoEyes: 0 -> 0.9`, `mirrorPeek: 0 -> 0.95` (hé mắt đỏ từ sau gương), `vignette: 0.5 -> 0.82` kết hợp `H.darkness()` khoét lỗ sáng quanh ngọn nến hoặc màn hình điện thoại.
3. **Chia file Shot theo 8 Hồi (`scenes/shots/01_cold_open.js` .. `08_ending.js`):**
   - Mỗi hồi trong `references/ditap-playbook.md` ứng với 1 file module trong `scenes/shots/`, đăng ký các shot thuộc hồi đó bằng `registerShot(id, { draw(g, t, info) { ... } })`.
   - Cuối mỗi shot luôn gọi `D.ditapTimedSubtitle(g, info.globalT, beats)` để phụ đề burn-in bám chính xác từng câu giọng đọc Vbee.

---

## 4. Quy trình thực hiện chuẩn (Stage 0 → Stage 9)

### Stage 0–2: Ngôn ngữ, Định dạng & Kiểm tra Studio
- Mặc định: Tiếng Việt (`vi`), khung hình `16:9` (`1920x1080`), thời lượng mục tiêu **25–35 phút** (hoặc bản mẫu/demo ngắn khi người dùng yêu cầu), bảng màu `nhang` (vàng khói hương trầm mặc) hoặc `amhon`.
- Đảm bảo `truyenma-studio/` đã cài đặt từ `../make-horror-video/kit/` và kiểm tra dự án mẫu `examples/ditap-demo`:
  ```bash
  cd truyenma-studio
  python3 tools/shot_lint.py --project examples/ditap-demo --strict
  python3 tools/scare_lint.py --project examples/ditap-demo --strict
  ```

### Stage 3: Viết kịch bản 8 hồi chuẩn Dạ Hành Dị Tạp
- Đọc kỹ `references/ditap-playbook.md`.
- Đề xuất 3 ý tưởng dị văn dân gian theo công thức tiêu đề tối giản `[Từ khóa dân gian / cấm kỵ] - [Chi tiết số đếm / vật định mệnh]`.
- Viết kịch bản đầy đủ 8 hồi (3.800–4.800 từ cho tập 28–32 phút) lưu vào `drafts/<slug>/script.md` và văn bản đọc sạch từng câu trên một dòng (số viết bằng chữ tiếng Việt) vào `drafts/<slug>/narration.txt`.

### Stage 4–5: Giọng đọc Vbee, Timeline & Kiểm định `shot_lint` / `scare_lint`
```bash
python3 tools/vbee_tts.py --script drafts/<slug>/narration.txt --out drafts/<slug>/voiceover.mp3 --voice <voice_code> --speed 0.93
python3 tools/new_project.py --name <slug> --voice drafts/<slug>/voiceover.mp3 --script drafts/<slug>/narration.txt --aspect 16:9 --resolution 1080p --title "<title>" --lang vi --style nhang
python3 tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang vi --model small
python3 tools/beats.py --project projects/<slug>
python3 tools/visemes.py --project projects/<slug>
```
- Thiết kế `projects/<slug>/story/shots.json` khớp 8 hồi:
  - Shot mở đầu (`0.0s`) là `beat: "hook"` (`<= 4.0s`), vào thẳng dị tượng đếm số, **không** đặt thẻ tiêu đề ở 3 giây đầu.
  - Thẻ tiêu đề `D.ditapTitleCard` đặt ở khoảng `~60s` (hoặc sau shot hook/promise trong bản demo ngắn) với `beat: "chapter"` hoặc `"setup"`.
  - Mọi shot ngay trước `beat: "scare"` bắt buộc có `"hush": true` để `audio/mix.py` rút nhạc nền trước cú hù.
  - Chạy kiểm định nghiêm ngặt:
    ```bash
    python3 tools/shot_lint.py --project projects/<slug> --strict
    python3 tools/scare_lint.py --project projects/<slug> --strict
    ```
    Cả hai lệnh phải đạt `0 error(s), 0 warning(s)`.

### Stage 6–8: Dựng `scenes/cast.js`, `scenes/shots/*.js`, Thumbnail & Âm thanh
- Viết `scenes/cast.js` và các shot sử dụng `import * as D from '/engine/ditap.js'` kết hợp `import * as H from '/engine/horror.js'`.
- Ví dụ cấu trúc shot tiêu chuẩn (tham khảo `examples/ditap-demo/scenes/shots/demo.js`):
  ```js
  import { E, V, registerShot, layer, mood } from '/engine/core.js';
  import * as H from '/engine/horror.js';
  import * as D from '/engine/ditap.js';
  import { NAM, THAY_TU } from '../cast.js';

  const beats = await fetch('/project/timeline/beats.json').then(r => (r.ok ? r.json() : [])).catch(() => []);

  registerShot('s012', {
    draw(g, t, info) {
      const cam = { x: 0, y: 0, z: H.creep(t, info.dur, 0.08) };
      const M = mood('altarRoom');
      const { GY } = D.ditapAltar(g, cam, t, M, { blur: 5.5, mirrorPeek: 0.4 });
      layer(g, cam, 1.0, (lg) => {
        D.ditapFigure(lg, {
          ...THAY_TU, x: E.W * 0.36, y: GY, s: V(1.85, 1.55), t,
          expr: 'determined', look: [1, 0], pose: 'point', prop: 'cane', viseme: 'A',
        });
        D.ditapFigure(lg, {
          ...NAM, x: E.W * 0.64, y: GY, s: V(1.78, 1.5), facing: -1, t,
          expr: 'worried', look: [-1, 0], khanTang: true,
        });
      });
      H.heartbeatVignette(g, t, { bpm: 78, a: 0.25 });
      D.ditapTimedSubtitle(g, info.globalT, beats);
    },
  });
  ```
- Viết `scenes/shots/thumb.js` đăng ký `thumb` và `thumb2` sử dụng `D.ditapBigFace` / `D.ditapFigure` và `D.ditapThumbText` (chữ trắng + đỏ tách dòng cực lớn).

### Stage 9: Kiểm tra Contact Sheet, Render MP4 & Bàn giao Google Drive (Mặc định)
1. **Kiểm tra Contact Sheet & Thumbnail trước khi render full:**
   ```bash
   node render.mjs --project projects/<slug> --sheet --scale 0.5
   python3 tools/make_thumb.py --project projects/<slug> --variants 2
   ```
   Mở `build/sheets/sheet_01.png` và `out/thumbnail_1.png` để kiểm tra: nhân vật dáng pill sắc nét, hậu cảnh gian thờ làm mờ đúng độ sâu, phụ đề trắng viền đen không có hộp nền tối, biểu cảm `blindEye`/`khanTang`/`faceless` hoạt động đúng. Xoá thư mục tạm `build/` sau khi hoàn tất kiểm tra.
2. **Render MP4 hoàn chỉnh & Mix âm thanh:**
   ```bash
   node render.mjs --project projects/<slug> --workers 4
   python3 audio/mix.py --project projects/<slug> --out projects/<slug>/out/<slug>-final.mp4
   ```
   Xuất file cuối cùng mang tên thật của dự án: **`<slug>-final.mp4`** (ví dụ: `than-trung-khan-tang-32-final.mp4`).
3. **Đóng gói `out/publish.txt` & `youtube-title-description.txt`:**
   - Tiêu đề tối giản chuẩn Dạ Hành Dị Tạp: `[Từ khóa dân gian / cấm kỵ] - [Chi tiết số đếm / vật định mệnh]` (không thêm đuôi `| Truyện Ma...`).
   - Mô tả gồm đoạn dẫn gợi mở (không lộ twist), danh sách timestamps 8 chương, lưu ý tác phẩm hư cấu văn học dân gian, hashtags và **mẫu bình luận ghim** lấy từ `references/ditap-playbook.md`.
4. **Bàn giao Google Drive `Videos-shorts` (Mặc định bắt buộc):**
   - Kiểm tra danh sách thư mục con trong Google Drive `Videos-shorts` (`$VIDEOS_SHORTS_FOLDER_ID`), cấp số thứ tự tiếp theo `max(N)+1`, tạo thư mục `<N>. <Tên video> - <YYYY-MM-DD>` (theo múi giờ Việt Nam).
   - Tải lên đủ 3 file đã kiểm định:
     - **`<slug>-final.mp4`** (**bắt buộc giữ tên thật của video sản xuất, TUYỆT ĐỐI KHÔNG đặt tên chung chung là `video-final.mp4`**)
     - `thumbnail-youtube.png` (16:9 cho tập dài, 9:16 cho Shorts)
     - `youtube-title-description.txt` (UTF-8)
   - Xác thực metadata/byte size trên Google Drive và gửi ngay **4 đường link Google Drive bấm mở được trực tiếp** (thư mục đánh số + 3 file) cho người dùng. Không tự ý đăng công khai lên YouTube/TikTok khi chưa có sự đồng ý.
5. **Khi người dùng yêu cầu Push lên YouTube (ví dụ `@HemChuyenLa`):**
   - **Bắt buộc đẩy trọn bộ cả Video + Title + Mô tả + Tags + Thumbnail cùng lúc** qua workflow `.github/workflows/youtube-longform-private.yml` (profile `LONGFORM_VI` cho tập dài 1080p/2K hoặc `SHORTS_VI` cho Shorts 9:16) kết hợp `config/films/<slug>.json`:
     - **`title` & `description`:** Đồng bộ nguyên văn từ `youtube-title-description.txt` (tiêu đề tối giản, mô tả gợi mở + timestamps + lưu ý hư cấu + hashtags).
     - **`tags`:** Mảng từ khóa chuẩn SEO (`<= 30` tag, tổng `<= 450` ký tự).
     - **`thumbnail_drive_id`:** ID file `thumbnail-youtube.png` trên Google Drive (`<= 2 MiB` với tập dài `1280×720` / `1920×1080`, hoặc dọc `9:16` với Shorts) để API tự động gắn ảnh bìa ngay khi upload.
   - Luôn chạy **`execute=false` (dry-run)** kiểm tra kênh và SHA-256 trước, sau đó mới chạy `execute=true` ở chế độ **Private** và gửi link YouTube video ID + link GitHub Actions run cho người dùng.
