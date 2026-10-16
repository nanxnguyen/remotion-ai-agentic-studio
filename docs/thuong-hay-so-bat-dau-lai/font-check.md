# Font check — thuong-hay-so-bat-dau-lai (2026-10-15)

Brief §Chữ: headline **Literata SemiBold** + caption/tag **Lexend Medium/Bold**,
fallback **Be Vietnam Pro** nếu lỗi dấu. Script v2 câu dấu nặng kiểm tra:
"Giữ ấm", "lạch cạch", "ngưỡng cửa", "người mới ghét gì".

## 1. Kết quả kiểm tra trong repo

| Font | package.json | public/fonts | src | Kết luận |
|---|---|---|---|---|
| Literata (600/700) | không có (`@fontsource` hay file nào) | **không có file** | chỉ `@import` Google Fonts CDN trong `src/thuong-hay-so-bat-dau-lai/proto/kit.tsx:31` (`ThoFonts`) | ❌ chưa self-host; phụ thuộc mạng lúc render |
| Lexend (500/600/700) | không có | **không có file** | cùng `@import` trên; fallback chain `CAP = 'Lexend','Be Vietnam Pro'` (`kit.tsx:26`) | ❌ chưa self-host |
| Be Vietnam Pro (fallback) | — | ✅ chỉ weight **600** (`BeVietnamPro-SemiBold-{VN,LatinExt,Latin}.woff2`, kèm unicode-range VN như `src/cuocgoinho/kit.tsx:49-57`) | dùng ở cuocgoinho/gaplai | ⚠️ đủ làm fallback caption khẩn, nhưng **thiếu weight 500 và 700** |

Pattern chuẩn của repo là self-host local qua `staticFile('fonts/...')` + `@font-face`
unicode-range (cuocgoinho, gaplai, camon). Proto hiện tại dùng `@import` CDN là
lệch pattern: render headless/offline sẽ rơi vào fallback mà không báo lỗi.

## 2. Glyph dấu tiếng Việt — verify thật (không đoán)

- Google Fonts CSS API (UA Chrome) trả block `/* vietnamese */` cho **cả hai font,
  đủ các weight yêu cầu** (Lexend 500/600/700; Literata 600/700), unicode-range
  `U+1EA0-1EF9` + `U+01A0-01B0` + `U+0102-0103`…
- Đã tải 2 file subset `vietnamese` (variable font, `fvar` có mặt) và đọc `cmap`
  bằng fontTools 4.67.0. Mọi codepoint dấu chồng trong câu test **đều có glyph**:
  - "Giữ ấm": ữ U+1EEE ✅, ấ U+1EA5 ✅
  - "lạch cạch": ạ U+1EA1 ✅
  - "ngưỡng cửa": ư U+01B0 ✅, ỡ U+1EE1 ✅, ử U+1EED ✅
  - "người mới ghét gì": ờ U+1EDD ✅
  - hook/F2: ơ U+01A1 ✅, ợ U+1EE3 ✅, ắ U+1EAE ✅, ế U+1EBE ✅, ọ U+1ECD ✅
  - thêm: ự U+1EF1, ỗ U+1ED7, ẫ U+1EAA, ĩ U+0129, Đ/đ ✅
- Nguyên âm nền (ê ô à á ã ì…) nằm ở subset `latin`/`latin-ext`, không nằm trong
  file `vietnamese` — **đây là chia subset bình thường của Google, không phải lỗi**.
  CSS đầy đủ (23 `@font-face`, đã đếm) load cả 3 subset qua unicode-range nên
  phủ kín. Kết luận: **nguồn font OK, không lỗi dấu ở cấp glyph**.

## 3. Rủi ro còn lại (không phải glyph, mà là phân phối)

1. **CDN `@import` trong `ThoFonts`**: Remotion render cần Chromium tải font qua
   mạng; offline/retry render = rơi về `Georgia` (headline) / `Be Vietnam Pro 600`
   (caption) trong im lặng → stills/QA có thể chốt nhầm mặt chữ.
2. **Fallback caption lệch weight**: caption chạy Lexend 500, accent Bold 700;
   Be Vietnam Pro local chỉ có 600 → 500 sẽ hơi đậm, 700 sẽ hơi nhạt khi fallback.
3. **Fallback headline**: `Georgia` có phủ tiếng Việt trên macOS/Windows nhưng
   nét khác Literata hẳn (không phải slab cùng họ) — chỉ nên là lưới an toàn cuối.

## 4. Đề xuất (cho design-agent, Phase 3)

- **Khuyến nghị: self-host cả hai font**, copy đúng pattern `CcFonts`
  (`src/cuocgoinho/kit.tsx:47-59`):
  1. Tải từ Google Fonts CSS (UA trình duyệt hiện đại để nhận file `woff2`
     chia subset): mỗi font 3 file `vietnamese` + `latin-ext` + `latin`
     cho mỗi weight cần dùng (Literata 600+700, Lexend 500+600+700).
     URL mẫu đã verify 2026-10-15 (gstatic, versioned — tải lại lúc cài):
     - Lexend VI: `https://fonts.gstatic.com/s/lexend/v26/wlpwgwvFAVdoq2_v9KQU82RHaBBX.woff2`
     - Literata VI: `https://fonts.gstatic.com/s/literata/v40/or3aQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbBG_df3-vbgKBM6YoggA-vpB-7cHM524yN0.woff2`
     (latin/latin-ext lấy URL tương ứng trong cùng CSS response.)
  2. Đặt vào `public/fonts/` (đặt tên kiểu `Literata-SemiBold-VN.woff2`,
     `Lexend-Medium-VN.woff2`…), thêm file OFL license như các font hiện có.
  3. Thay `ThoFonts` (`kit.tsx:30-32`) bằng component `@font-face` local dùng
     `staticFile('fonts/...')` + `unicode-range` VN/LatinExt/Latin, giữ nguyên
     chain `'Lexend','Be Vietnam Pro'` và `'Literata',Georgia,serif`.
  4. QA: render 1 still mỗi headline chứa "Giữ ấm / ngưỡng cửa / người mới ghét gì",
     soi dấu chồng ở 200% (đặc biệt ữ ễ ợ trong Literata 600).
- **Fallback nếu chưa kịp self-host trước Phase 3**: giữ CDN nhưng thêm
  `&text=` không dùng được ở đây (text động) → chấp nhận CDN tạm, và bổ sung
  `BeVietnamPro-Medium/Bold-VN.woff2` local để fallback caption đủ 500/700.
  Headline fallback giữ Georgia (cuối cùng mới tới serif hệ thống).
- **Không cần đổi brief**: Literata + Lexend đều có subset `vi` đầy đủ —
  dòng "verify bộ dấu ở Phase 3" trong brief coi như đã verify ở cấp nguồn;
  việc còn lại là self-host + QA still, không phải đổi font.

## 5. Tóm tắt 1 dòng

- **Literata: OK glyph (vi subset đầy đủ) / ❌ chưa có local.**
- **Lexend: OK glyph (vi subset đầy đủ) / ❌ chưa có local.**
- **Be Vietnam Pro: ✅ local nhưng chỉ weight 600 — fallback tạm được, nên bổ sung 500/700.**
