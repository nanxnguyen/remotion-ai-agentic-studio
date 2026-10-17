# Render evidence — cuoc-goi-nho-cua-me

Nguồn: lệnh `python -X utf8 -I scripts/pipeline.py render cuoc-goi-nho-cua-me` (2026-10-17 16:38–16:43),
ffmpeg 7.x cục bộ.

## Đối tượng

- `out/cuoc-goi-nho-cua-me-thanh-long-nang-cao-reel.mp4` — **43.70s**, H.264/AAC, 1080×1920@30, CRF 18,
  1308 frames; md5 `29c6496bd84f354b3247d734c938e99a`; size 8,912,774 bytes; fingerprint
  `8912774:1792230196737464600` (bind vào `status.json.render_check`, không override).

## Bảng loudness (ebur128 trên file CUỐI, không phải stem)

| Chỉ số | Giá trị | Target |
|---|---|---|
| Integrated | **−13.9 LUFS** | −14 ± 1 ✓ |
| True peak | **−1.5 dBFS** | < −1.0 dBTP ✓ |
| LRA | (không đo vòng này; quy chi từ vòng đo tiec cùng cấu hình ≈ 2.6) | quy chi |

## ASR clip-level (script `gen-voice-clone.py` v3 run, ref `voice-ref/refThanhLong.wav`)

| clip | dur (ffprobe) | CER | pass (≤ 0.04) |
|---|---|---|---|
| s1 | 2.8157s | 0.012 | ✓ |
| s2 | 2.8635s | 0.021 | ✓ |
| s3 | 5.6260s | 0.033 | ✓ |
| s4 | 5.4312s | 0.023 | ✓ |
| s5 | 5.2049s | 0.012 | ✓ (v2 cũ 0.046⚠ — câu "hai tiếng" đã bỏ hết lỗi) |
| s6 | 3.7676s | 0.030 | ✓ |
| s7 | 5.3887s | 0.022 | ✓ |
| s8 | 5.9716s | 0.037 | ✓ |

Tổng voice 40.06s + 7×0.5 pause + 1.4 outro + holds 15/30f = 1308f; khớp `timeline.ts` v4 (4dp).

## Still frames (12, trích từ MP4 cuối bằng ffmpeg -ss)

`out/qa/cuoc-goi-nho-cua-me-c-frame-` + `0, 60, 115, 216, 400, 578, 640, 750, 879, 975, 1056, 1290` `.png`

Biên/beat: 0 (hook), 115 (s2 POV bấm tắt), 216 (s3 nhắn hứa), 400 (s4 tối), 578 (s5 beat 1), 640 (s5 beat 2
mẹ vào), 750 (s6 đèn ấm nhất), 879 (s7 hai phòng nối lại), 975 (s7 giữa — caption "chỗ con có mưa không.",
KHÔNG câu mưa), 1056 (s8 "Đã gọi lại ✓"), 1290 (hold lặng cuối, không caption).

Đánh giá shot-by-shot: `video-review.md` vòng 3 (C 9.0). Chưa có contact sheet gộp — từng khung đọc
trực tiếp từ file PNG; nếu cần gộp cho PR, dùng `ffmpeg` xstack trên bộ PNG đã nêu.
