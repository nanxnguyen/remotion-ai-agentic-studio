# Voice report — thuong-hay-so-bat-dau-lai

Route: clone local VieNeu-TTS v3 Turbo, giọng Thanh-Long-Nang-Cao (user ủy quyền 2026-10-15).
Ref: `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav` (8.2s, mono 24kHz — sạch, dùng luôn, không cắt lại).
Input: `voice.json` plain shot text (13 keys), `--tries 14 --max-cer 0.04` đợt 1, regenerate cụm lỗi `--tries 30` đợt 2.
Một giọng xuyên suốt. Không tăng tốc audio.

## Machine checks (13/13 clip)

Đơn vị "âm tiết" = tokens tách bằng dấu cách (cách đếm của repo). CER từ `voice-clone-asr.md` (faster-whisper small).
Silence: `silencedetect=noise=-40dB:d=0.6` — không clip nào có gap nội bộ >0.6s.
Loudness: `volumedetect` — peak −1.9..−2.6 dBFS, **không clip nào clipping**.

| shot | duration (ffprobe) | âm tiết | âm tiết/s | CER | issues |
|---|---|---|---|---|---|
| s1 | 3.41s | 15 | 4.40 | 0.000 | — |
| s2 | 4.35s | 17 | 3.91 | 0.043 ⚠ | ASR "Giữ ấm"→"dự ấm" (đồng âm, lỗi ASR). Đã regen 30 seeds, best seed 4 = seed đợt 1 |
| s3 | 3.64s | 14 | 3.85 | 0.032 | pass sau regen (seed 26). ASR "hai"→"hài", "cọng"→"cộng" (lỗi ASR) |
| s4a | 1.42s | 6 | 4.22 | 0.037 | pass. ASR "khựng"→"khụng" (lỗi ASR) |
| s4b | 3.60s | 13 | 3.61 | 0.000 | — |
| s5 | 5.42s | 21 | 3.87 | 0.043 ⚠ | ASR "chìa"→"trìa" (lỗi ASR). Đã regen 30 seeds, best seed 1 = seed đợt 1 |
| s6a | 4.47s | 16 | 3.58 | 0.054 ⚠ | Đợt 2 seed 22: từ khóa **"thở phào" đã đúng** (đợt 1 nghe "thở vào"). CER còn lại do ASR "chìa"→"trìa". Chấp nhận, đưa vào needs-listening |
| s6b | 3.99s | 16 | 4.01 | 0.000 | — |
| s7a | 5.08s | 21 | 4.13 | 0.025 | pass. ASR "vì"→"vị" ×2 (lỗi ASR) |
| s7b | 1.50s | 6 | 4.01 | 0.000 | mean −18.5 dB (nhỏ hơn các clip ~3 dB — đúng delivery câu rơi nhỏ dần, không phải lỗi) |
| s8 | 5.00s | 20 | 4.00 | 0.047 ⚠ | ASR "Lạch"→"Lạc", "treo"→"trao" (lỗi ASR). Đã regen 30 seeds, best seed 16 |
| s9 | 6.35s | 24 | 3.78 | 0.019 | pass sau regen (seed 21). ASR "Ba năm"→"bà nằm" (lỗi ASR) |
| s10 | 4.39s | 18 | 4.10 | 0.000 | — |

Timbre: một ref duy nhất cho cả 13 clip; mean volume −14.9..−15.8 dB (trừ s7b −18.5 dB có chủ ý delivery), peak đồng đều → không dấu hiệu lệch giọng giữa các clip ở mức đo máy.

## Tổng voice

**52.6s** (207 âm tiết / ~3.9 âm tiết/s trung bình) — nằm trong dải ước tính 50.5s (@4.1) – 54.5s (@3.8).
Cộng hold theo script (đuôi 9×0.35 + gap s4/s6/s7 1.0 + lặng cuối ~1.9): video ≈ **58.6s**, gọn trong 40–60s. Không lố; director không cần cắt hold.

## Cụm đã regenerate (đợt 2, --tries 30)

- s3: 0.048 → **0.032 pass** (seed 26)
- s9: 0.047 → **0.019 pass** (seed 21)
- s6a: 0.068 → 0.054, vẫn ⚠ nhưng **"thở phào" đã đúng chữ** (seed 22) — cải thiện thật, giữ
- s8: 0.071 → 0.047 (seed 16) — cải thiện, phần còn lại là lỗi ASR
- s2, s5: best seed không đổi sau 30 tries (lỗi thuần ASR đồng âm) — giữ bản đợt 1

## needs-listening (user nghe tai, ASR không nghe được)

1. **s6a "thở phào"** — từ highlight H1; đợt 2 ASR đã nhận đúng nhưng user cần xác nhận tai là hơi "thở ra" chứ không phải đọc "vào".
2. **s5 vs s6a cùng giai điệu?** — script yêu cầu câu đầu hai shot cùng mẫu câu; clone không pin seed chung (s5 seed 1, s6a seed 22). Nghe xem có lệch nhịp "tua lại diễn y hệt" không.
3. **s8 "Lạch cạch" / "treo chìa khoá"** — ASR nghe sai, nhưng tai người cần loại trừ TTS đọc ngọng thật ("Lạc cạch", "trao").
4. **s2 "đèn Giữ ấm"** — ASR "dự ấm"; xác nhận tai chữ "Giữ" rõ.
5. **s7b** — nhỏ hơn ~3 dB, đúng ý đồ câu rơi; xác nhận không bị chìm khi có BGM.
6. **s10** — câu hỏi cuối, đều giọng, không lên giọng kịch (ASR không đo được ngữ điệu).
