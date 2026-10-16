# QA report — gaplai V2 (2026-10-13)

- `npx tsc --noEmit`: sạch (trước và sau fix).
- Stills `out/qa/gaplai-<frame>.png` (22 file): s1 54/95 · s2 137/184/249/277 ·
  s3 376/445 · s4 552/630 · s5 736/770/813 · s6 922/960/1001 · s7 1100/1170 ·
  s8 1262/1325 · s9 1429/1503. Đã đọc tất cả: không chữ cắt/chồng, caption đáy
  250–260px (trên safe-zone 210px), đủ dấu, nhãn "minh hoạ" đầy đủ.

## Lỗi tìm thấy & đã sửa (1, mức Cao)
- Caption s2 sai voice (`src/gaplai/scenesA.tsx` P2): hiển thị
  "Vì hồi đó, mình đã cố nhiều lắm rồi." — bịa chữ "Vì"/"lắm", nuốt mất vế cuối
  "cố tới mức chẳng muốn nghe thêm lời khuyên nào nữa."
  (đối chiếu `docs/gaplai/voice.json` + ASR `voice-clone-asr.md`).
  Fix: tách P2 thành 3 parts khớp từng chữ, accents
  ['cố lên','cố nhiều rồi','lời khuyên'], size 54; chụp lại 137/184/249/277
  xác nhận đủ 3 vế, vừa 2 dòng, không tràn. Stale still 200 đã xóa.

## Không phải lỗi (đã xác minh, không sửa)
- Stills 736 (s5) / 922 (s6) caption mờ: trúng fade-in 9f đầu mỗi caption part
  (GCaps/GLine chuyển part). Stills bù 770/960 + đo brightness xác nhận caption
  đạt full opacity giữa part. 1001 (s6) full (band 49.1, cao nhất).
- Nhãn "minh hoạ" s4 giữa dissolve (552) thấy bóng ma: 2 label chồng khi
  crossfade 22f do zoom khác nhau — hết dissolve (630) còn 1 nhãn sạch.
- s8 cuối shot (1325) không caption: đúng thiết kế (lặng 0.8s trước CTA, xem scenesC).

## MP4 duy nhất: `out/gaplai-reel.mp4` (7.3 MB)
- ffprobe: 1080×1920, 30fps, H.264 yuv420p + AAC 48kHz stereo, 50.60s (45–60s ✓).
- volumedetect: max −4.0 dB (không clipping ✓), mean −19.4 dB.
- Contact sheet: `out/gaplai-contact-sheet.jpg` (2s / 25s / 48s) — đã xem, đạt.

## Final review fix + re-render (2026-10-13, sau review ngoài)
3 lỗi đã sửa trước khi re-render:
1. Heartbeat dời s6+45 → s7+25 (`src/gaplai/timeline.ts`): 1 nhịp tim ngay
   đầu cái ôm s7 thay vì cuối s6.
2. `src/gaplai/scenesA.tsx` bỏ `@import` Google Fonts, dùng `@font-face`
   local như scenesB (tránh fetch mạng lúc render).
3. Docs ghi license OFL font (`design-spec.md`, `assets-manifest.md`:
   SIL Open Font License 1.1).
- `npx tsc --noEmit`: sạch (exit 0).
- Stills kiểm tra lại font local `out/qa/gaplai-final-s1.png` (f54),
  `gaplai-final-s2.png` (f184), `gaplai-final-s3.png` (f376): đã đọc cả 3 —
  chữ Be Vietnam Pro hiển thị đúng, đủ dấu Việt (ặ ồ ố ườ ậ ẻ ọ…),
  không tofu/cắt/chồng; nhãn "minh hoạ" s2 đủ dấu.
- Re-render `out/gaplai-reel.mp4` (ghi đè, 7 275 941 bytes): ffprobe
  1080×1920, 30fps, H.264 yuv420p + AAC 48kHz stereo, 50.60s (45–60s ✓,
  1518f/30). volumedetect toàn file: max −4.0 dB (không clipping ✓),
  mean −19.4 dB.
- Contact sheet làm lại `out/gaplai-contact-sheet.jpg` (1080×640, tile 3×1
  frames 0/760/1430 = s1/s5/s9): đã xem — caption đủ dấu, không tofu.
- Đoạn 28–36s (s6 cuối → s7 ôm heartbeat mới → s8 lặng), cắt ra
  `out/qa/gaplai-seg28-36.mp4`: volumedetect đoạn này mean −18.8 dB /
  max −5.3 dB. Heartbeat = s7.from(1016)+25 = frame 1041 = 34.70s
  (> 33.9s ✓, file heartbeat 1.1s → 34.70–35.80s). Kiểm chứng âm học:
  lowpass 150Hz max từng giây 28–36s: 28–29 −16.7 · 29–30 −15.8 ·
  30–31 −18.4 · 31–32 −18.0 · 32–33 −16.9 · 33–34 −15.4 ·
  **34–35 −12.8** · 35–36 −16.7 dB — gù năng lượng trầm duy nhất rơi
  đúng giây 34–35, trước 33.9s không có thump lạ.
