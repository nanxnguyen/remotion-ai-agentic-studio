# Video review độc lập — `cuoc-goi-nho-cua-me` v2 (final file)

- File: `out/cuoc-goi-nho-cua-me-thanh-long-nang-cao-reel.mp4`
- Ngày review: 2026-10-14. Reviewer độc lập (không sửa code, không render lại).
- Đối chiếu: `script.md` v2 + `voice.json` v2 + `design-spec.md` + `qa-report.md` (code review v2 + boundary tests).
- Phương pháp: ffprobe + volumedetect/ebur128/astats + contact sheet 1-fps
  (`out/qa/review-v2/contact-sheet-1fps.jpg`) + stills trích **từ chính file final**
  tại 7 biên shot + 3 điểm highlight (`out/qa/review-v2/rv-f*.png`), đọc từng PNG.

## 1. Số đo kỹ thuật (ffprobe)

| Hạng mục | Giá trị |
|---|---|
| Video | H.264, 1080×1920, 30fps, 1419 frames = 47.30s |
| Audio | AAC 48kHz stereo |
| Duration container | 47.40s (video 47.30 / audio 47.40 — chênh 0.1s, chuẩn, không vấn đề) |
| Bitrate tổng | ~983 kbps (video ~778k + audio ~197k) |
| Timeline | khớp `CGN_TOTAL`=1419: s1 0/114, s2 114/99, s3 213/193, s4 406/179, s5 585/219, s6 804/132, s7 936/233, s8 1169/250 |

## 2. Số đo âm thanh (không nghe — chỉ đo tín hiệu)

| Hạng mục | Giá trị |
|---|---|
| mean_volume | **−16.4 dB** |
| max_volume | **−1.5 dB** |
| Integrated loudness | −13.9 LUFS (hợp mức reels, TikTok ~−14) |
| LRA | 1.9 LU |
| True peak | −1.5 dBFS |
| Clipping | **không** — astats peak −1.53/−1.61 dBFS hai kênh, flat factor 0.0, peak count 2 (mẫu gần đỉnh, không chạm 0 dBFS) |
| Mix BGM/voice (code + đo) | Voice volume 1.0; BGM volume **0.05** (`Reel.tsx:28`); SFX 0.16–0.20 (`timeline.ts:30-37`). Đo raw: voice s5 −16.9 LUFS vs BGM −16.4 LUFS → BGM hiệu dụng ≈ −42 LUFS, **nằm ~25 dB dưới giọng**. PASS by-design |
| SFX offsets (code) | 7/7 nằm gọn trong shot (s1+5+90≤114 … s8+120+70≤250) — khớp beat: ring s5+5, pickup s5+45, chime s8+120. **Khớp beat bằng tai: PENDING (cần nghe)** |

## 3. Bảng alignment shot-by-shot

Spoken words = `voice.json` v2 (nguyên văn). Caption = chữ đọc được trên stills.
Timing start/end = frame biên v2 @30fps.

| Shot (frames / giây) | Spoken words (voice.json) | Caption thấy | Visual action thấy | Timing | Kết luận |
|---|---|---|---|---|---|
| s1 HOOK 0–114 (0–3.8s) | Mẹ gọi lúc mình đang bận. Mình định lát nữa gọi lại… | "Mẹ gọi lúc mình đang bận." / "Mình định lát nữa gọi lại…" (contact sheet hàng 1) | Mock phone "Cuộc gọi nhỡ — Mẹ / Chiều nay" + nhãn "minh hoạ", rung, nền văn phòng sáng lạnh | voice 2.80s ≤ 3.8s, hold hook +15f | **PASS** — hook hiện ngay <3s, đủ chữ hook đã duyệt |
| s2 114–213 (3.8–7.1s) | Chiều đó mẹ gọi, mình đang họp dở nên bấm tắt vội. | "mình đang họp dở" / "nên bấm tắt vội." (contact sheet hàng 1–2) | f114: close-up ngón tay POV + banner gọi đến + laptop (đối xứng tay bấm gọi s5) | voice 2.80s ≤ 3.3s | **PASS** |
| s3 213–406 (7.1–13.5s) | Mình nhắn vội: "Lát con gọi lại nha." Rồi họp tiếp, trả lời tin nhắn, làm nốt việc, rồi quên bẵng. | "Lát con gọi lại nha." (chat + caption) / "Rồi họp tiếp, trả lời tin nhắn," / "làm nốt việc, rồi quên bẵng." | f213: bong bóng chat "Lát con gọi lại nha."; montage họp → typing → checklist tick | voice 5.92s ≤ 6.43s | **PASS** |
| s4 406–585 (13.5–19.5s) | Tối, phòng đã tắt đèn. Mở điện thoại lên, dòng chữ "Cuộc gọi nhỡ — Mẹ" vẫn nằm đó, mình chột dạ. | "Tối, phòng đã tắt đèn." (f420) / "vẫn nằm đó," / "mình chột dạ." (contact sheet) | Phòng tối + phone sáng bật lên "Mẹ / Cuộc gọi nhỡ / Chiều nay" + "minh hoạ" (f420); dissolve ngày→tối | voice 5.44s ≤ 5.97s | **PASS** (trừ lỗi mưa Thấp §4.1) |
| s5 HIGHLIGHT-a 585–804 (19.5–26.8s) | Mình bấm gọi lại, cũng chính ngón tay ban chiều bấm tắt. Mẹ bắt máy ngay, chưa kịp reo hai tiếng. "Con ăn cơm chưa?" | "Mình bấm gọi lại," / "cùng chính ngón tay ban chiều bấm tắt." / "Mẹ bắt máy ngay, chưa kịp reo hai tiếng." (f700) / ""Con ăn cơm chưa?"" (contact sheet) | Beat 1 (f585): con dưới đèn đường + thẻ "Đang gọi — Mẹ 00:03" + "minh hoạ", timer đúng công thức. Beat 2 (f700): con + mẹ + VoiceWave, glow ấm tràn, caption đủ dấu | voice 6.78s ≤ 7.3s (gồm nín 15f) | **PASS có lưu ý** (§4.2: beat 2 duo thay vì solo close-up mẹ) |
| s6 HIGHLIGHT-b 804–936 (26.8–31.2s) | Hóa ra mẹ chẳng nhờ gì cả. Mẹ chỉ muốn nghe giọng mình một chút thôi. | "Hóa ra mẹ chẳng nhờ gì cả." / "Mẹ chỉ muốn nghe giọng mình một chút thôi." + accent hổ phách (f870) | Mẹ close-up + đèn treo, glow mạnh nhất, push-in chậm; mưa gọn trong cửa sổ (f804/f870) | voice 3.89s ≤ 4.4s | **PASS** — đỉnh ấm rõ nhất toàn video |
| s7 936–1169 (31.2–39.0s) | Mình vừa ăn bát cơm đã nguội, vừa kể: hôm nay ăn gì, chỗ con có mưa không. Ngoài cửa, mưa vẫn gõ nhẹ. Toàn chuyện nhỏ xíu. | "Mình vừa ăn bát cơm đã nguội," / "chỗ con có mưa không." / "mưa vẫn gõ nhẹ." / "Toàn chuyện nhỏ xíu." (contact sheet hàng 5) | f936: TwoRoomsCall — panel `Con` tường lạnh + 1 bát lẻ (không steam) + cửa mưa riêng; panel `Mẹ` tường ấm + mâm 2 bát + steam; phone cầu nối "Đang gọi Mẹ 00:00" + "minh hoạ"; VoiceWave | voice 7.26s ≤ 7.77s | **PASS** — tương phản nguội/có-steam đúng spec |
| s8 HIGHLIGHT-c 1169–1419 (39.0–47.3s) | Cúp máy rồi mình nghĩ mãi: có những người chẳng cần mình làm gì lớn lao. Một cuộc gọi lại thôi, họ cũng vui rồi. | "Cúp máy rồi mình nghĩ mãi:" / "Một cuộc gọi lại thôi," (f1300, accent hổ phách) / "họ cũng vui rồi." → tắt sớm nhường hold lặng (contact sheet ô cuối tối) | f1169: cut sạch → phone "Đã gọi lại ✓" hổ phách + "minh hoạ", **không rò "Đang gọi"**; f1300: TwoRoomsCall tĩnh, sóng dim; outro hold lặng | voice 5.91s ≤ 8.33s (gồm outro +30f) | **PASS** — callback đúng, hold lặng cuối có thật |

## 4. Lỗi phát hiện

### 4.1 [Thấp] Vệt mưa tràn khung cửa sổ s4 — `rv-f406.png`, `rv-f420.png`

- 2–3 vệt mưa mảnh nằm NGOÀI khung `NightWindow` s4 (trái + phải khung), thấy rõ ở f406 (local 0) và f420 (local 14, cửa sổ + phone đã hiện đầy đủ).
- Cửa sổ s7/s8 cùng video không tràn (f936/f1169/f1300 mưa gọn) → chỉ instance s4 thiếu/clip sai. Trái với claim "mưa gọn" trong qa-report (QA chỉ soi f465).
- Tác động mắt thường: nhỏ (vệt mảnh trên nền gần đen, phone là tâm điểm). **Không yêu cầu render lại**; fix nếu có lần render sau.

### 4.2 [Thấp] s5 beat 2 là duo shot, không phải solo CLOSE-UP mẹ — `rv-f700.png`

- Spec §7/§11: beat 2 = "CLOSE-UP mẹ áp phone vào tai". Render: mẹ (lớn, phải) + con (nhỏ, trái) cùng đứng trong bối cảnh đường đêm (đèn + vạch đường) của con.
- Không vi phạm luật cứng (§5 chỉ cấm mẹ trong khung văn phòng lạnh), đọc như ẩn dụ visual cuộc gọi; QA v2 đã chấp nhận ("con + mẹ close-up — ĐẠT"). Ghi nhận để chủ quyết, **không chặn**.

### Không lỗi ở các hạng mục còn lại

- Hook 3s: phone "Cuộc gọi nhỡ — Mẹ" + caption part 1 hiện từ frame đầu. PASS.
- Caption khớp từng chữ: soi ~20 instances trên stills + contact sheet, tất cả khớp `voice.json` v2 (khớp code-level 8/8 của qa-report v2). PASS.
- Dấu Be Vietnam: đủ dấu mọi caption + text scene ("Cuộc gọi nhỡ", "Chiều nay", "Đã gọi lại", "chút thôi"). Ngoại lệ cosmetic đã biết: "✓" rơi về font hệ thống (ngoài unicode-range subset). PASS.
- Safe-zone: caption đáy 250px > 210px (kế thừa qa v2; stills không pill nào chạm đáy). PASS.
- Nhãn "minh hoạ": có trên mọi mock phone (s1/s3/s4/s5/s7/s8, kiểm tra f420/f585/f936/f1169). PASS, cỡ đọc được.
- Chuyển cảnh: 7/7 biên sạch, không nháy/khung trắng (f114/f213/f406/f585/f804/f936/f1169). Cặp cùng tông liền mạch. PASS.
- Nhịp nhanh→chậm + glow s5(0.25→0.5)→s6 max→s7→s8+hold: đọc được qua stills (f585 tối lạnh-ấm lẫn → f700 ấm tràn → f870 glow mạnh nhất → f1300 dịu + hold). PASS.
- SFX khớp beat / BGM dưới giọng **bằng tai**: không thể xác minh (không nghe được) — chỉ xác minh code + đo tín hiệu (§2). PENDING.

## 5. Verdict

**VISUAL: PASS** — 8/8 shots alignment đạt; 3 đỉnh highlight đọc được bằng mắt
(nín s5 + close-up đôi/con–mẹ + thẻ "Đang gọi" → glow max s6 → lặng s8 + phone
"Đã gọi lại ✓"); 2 lỗi mức Thấp (§4.1 mưa tràn s4, §4.2 duo beat 2) không chặn lock.

**AUDIO LISTEN: PENDING — cần người nghe toàn file, trọng tâm s5 (CER 0.046).**
Cần tai người xác nhận: (a) voice s5 "reo hai tiếng" / "Con ăn cơm chưa?" có đúng chữ
không (ASR từng nhầm "rèo"/"còn"); (b) nín ~0.5s sau "hai tiếng" có thật;
(c) chuông dừng ở beat 2 + 7 SFX khớp beat; (d) BGM không lấn giọng (đo cho thấy −25 dB).
Số đo tín hiệu tốt (max −1.5 dB, không clip, −13.9 LUFS) nhưng không thay thế nghe.
