# Final check — cuoc-goi-nho-cua-me

Render stage doc (rule 02 §38: final regression matrix, every row ✓/✗ with evidence). Video: v3, timeline
1308f = 43.6s. File: `out/cuoc-goi-nho-cua-me-thanh-long-nang-cao-reel.mp4`
(md5 `29c6496bd84f354b3247d734c938e99a`, fingerprint `8912774:1792230196737464600`, verify 2026-10-17 16:43).

| # | Hàng kiểm | Kết quả | Bằng chứng |
|---|---|---|---|
| 1 | Thành phần MP4: H.264 + AAC | ✓ | `pipeline.py render` verify: "43.70s H.264/AAC 1080x1920 30fps" |
| 2 | Duration khớp timeline.ts | ✓ | 43.70s vs CGN_TOTAL 1308f/30 = 43.6s (+container ~0.1s); ceil() từng shot kiểm tay khớp raw v4 |
| 3 | `tsc --noEmit` sạch | ✓ | exit 0 trước render (2026-10-17) |
| 4 | Registry duyệt comp | ✓ | render qua `CuocGoiNhoReel` thành công (đi qua `registry.ts`, không register trực tiếp trong Root) |
| 5 | Voice clips đủ theo voice.json | ✓ | 8/8 `s1..s8.mp3` hi diện; ffprobe durations khớp timeline raw (4dp) |
| 6 | ASR kiểm từng clip | ✓ | CER 0.012–0.037 ≤ 0.04 (`voice-clone-asr.md` v3) |
| 7 | Loudness chuẩn MP4 | ✓ | ebur128 integrated −13.9 LUFS (target −14 ±1), true peak −1.5 dBFS — không clip |
| 8 | Determinism (không wall-clock) | ✓ | mọi timing từ Remotion `useCurrentFrame()`; không Date/random trong scenes (kit core guard) |
| 9 | Ảnh khớp text v3 (không câu đã bỏ) | ✓ | f640 caption "cũng chính ngón tay ban chiều bấm tắt." (không "hai tiếng"); f975 "chỗ con có mặt không." → KHÔNG câu mưa — 12/12 khung ĐẠT (`video-review.md` vòng 3) |
| 10 | SFX offset trong dur từng shot | ✓ | mix-plan §SFX (7 cues, max end 190 ≤ 252) |
| 11 | BGM chuẩn max<0dB | ✓ | bgm 104.31s max −1.4 dB (volumedetect 2026-10-14, nguyên vật liệu) |
| 12 | Gate C đã pass trên đúng fingerprint | ✓ | status review C 9.0 (2026-10-17), không override |
| 13 | Giọng người đã nghe MP4 cuối | ✗ (pending) | `pipeline.py listen` chưa ghi — yêu cầu tai người trước cổng social post |
| 14 | Golden frames tests/golden khớp MP4 mới | ✗ (stale) | retime 1419→1308 thay đổi viền/đuôi shot; saliency cần regen có giải trình trong PR (CONTRIBUTING) |

Verdict render: **PASS kỹ thuật** (12/14 ✓; 2 hàng còn lại là bước tai người + regen golden theo quy trình — không cản delivery `check`).
