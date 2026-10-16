# Voice report — cuoc-goi-nho-cua-me (GIỌNG CHỐT: clone Thanh Long)

## Route CHỐT (ủy quyền trực tiếp của user)

- **BẮT BUỘC dùng giọng `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3`
  (Vbee "Thanh Long nâng cao (Beta)", voiceId `hn_male_thanhlong_talk_24k-stl`,
  nam miền Bắc nhẹ nhàng điềm tĩnh).** Đây là ủy quyền trực tiếp của user cho
  voice này (chỉ thị trực tiếp trong chat, ngày 2026-10-14) — làm cơ sở clone.
- Lưu ý: preview là demo công khai của Vbee, quyền thương mại tuân theo điều
  khoản Vbee.
- Engine: `scripts/gen-voice-clone.py` (VieNeu-TTS v3 Turbo, ONNX/CPU),
  `--tries 14 --max-cer 0.04 --force`, text giữ Y NGUYÊN từng chữ từ
  `voice.json` (plain, script tự bọc phrase).
- Bản tạm NamMinh cũ đã bị ghi đè toàn bộ s1–s8.

## Ref

- File: `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav`
  (24000 Hz, mono, 8.2s).
- Cắt từ preview `Thanh-Long-Nang-Cao.mp3` đoạn 12.5s → 20.7s: đoạn kể chuyện
  liền mạch, thuần Việt, không tạp (tránh đoạn code-switch tiếng Anh
  "sometimes we just need a little break" ở 27–31s và từ "schedule" ở ~12s).
- Nội dung ref: "Hãy thử pha một tách trà, mở cửa sổ và ngồi yên một lúc,
  bạn sẽ thấy, khi mình chậm lại, những điều rất nhỏ cũng trở nên dễ nhận ra hơn".
- Kiểm tra 1 giọng duy nhất: ASR (faster-whisper small) trên ref cho 1 mạch
  tường thuật liên tục, không dấu hiệu chồng giọng/đổi người nói; preview là
  demo đơn giọng của Vbee theo cấu trúc.

## Durations (ffprobe, giây) — giọng CHỐT clone Thanh Long (VÒNG 2 — đã bị thay bởi vòng 3 bên dưới)

| Shot | Clip voice | Timeline gợi ý (from → frames, padding 0.5s/shot, cuối +1.4s) |
|------|-----------|---------------------------------------------------------------|
| s1 | 2.80 | from=0, duration=99 |
| s2 | 2.50 | from=99, duration=91 |
| s3 | 4.73 | from=190, duration=157 |
| s4 | 2.99 | from=347, duration=105 |
| s5 | 4.22 | from=452, duration=142 |
| s6 | 4.18 | from=594, duration=141 |
| s7 | 5.91 | from=735, duration=193 |
| s8 | 6.40 | from=928, duration=234 |
| **TOTAL voice** | **≈ 33.73s** | **1162 frames ≈ 38.7s** |

So với bản tạm cũ (NamMinh): 36.32s / 1240f (≈ 41.3s) → bản chốt ngắn hơn
**≈ 2.6s voice, −78 frames (≈ −2.6s timeline)**. Timeline/cut phải rerun theo
số mới.

## CER từng clip (faster-whisper small, ngưỡng 0.04 — 8/8 PASS, seed 0)

| Clip | CER | Ghi chú ASR |
|------|-----|-------------|
| s1 | 0.000 | khớp tuyệt đối |
| s2 | 0.000 | khớp tuyệt đối |
| s3 | 0.026 | "họp→học", "vài→vai" — nhầm âm gần giống của ASR small |
| s4 | 0.000 | khớp tuyệt đối |
| s5 | 0.030 | "Mình→Bình", "Con→Còn" — nhầm âm gần giống, **cần người nghe kỹ** |
| s6 | 0.026 | "giọng→dọng" — đồng âm, đúng phát âm |
| s7 | 0.028 | "trời→chơi" — nhầm ASR small |
| s8 | 0.018 | "Cúp→Cúc", "lao→lau" — đồng âm, đúng phát âm |

Chi tiết: `docs/cuoc-goi-nho-cua-me/voice-clone-asr.md`.

## Voice QA listening = ⏳ PENDING

- Subagent **không nghe được audio** — KHÔNG claim "tự nhiên như người thật",
  không claim phát âm chuẩn hay giống Thanh Long.
- Người (hoặc agent có khả năng nghe) cần duyệt 8 clip trong
  `public/audio/cuoc-goi-nho-cua-me/s1–s8.mp3` trước khi lock voice: kiểm tra
  ngắt nghỉ, nhấn từ (gọi lại / bấm tắt / Con ăn cơm chưa? /
  Một cuộc gọi lại thôi), tông ấm nửa sau, và đặc biệt từ đầu câu s5
  ("Mình gọi lại", "Con ăn cơm chưa?") — v1, xem vòng 3 bên dưới cho text v2.

---

## Vòng 3 (2026-10-14) — voice v2: s1 GIỮ NGUYÊN, s2–s8 clone MỚI (Thanh Long)

- Text v2 (`voice.json`): s1 giữ nguyên chữ v1; s2–s8 là câu mới.
- Lệnh (KHÔNG `--force`, script bỏ qua s1 đã tồn tại):
  `HF_HUB_DISABLE_IMPLICIT_TOKEN=1 ~/.venvs/vieneu/bin/python -I scripts/gen-voice-clone.py cuoc-goi-nho-cua-me --json docs/cuoc-goi-nho-cua-me/voice.json --ref docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav --tries 14 --max-cer 0.04`
- s1.mp3 KHÔNG đụng: md5 trước/sau đều `c1a360494baba4d6c71f1d6ce8f6f983`
  (2.80s, vòng 2). s2–s8 cũ đã xóa rồi clone mới.
- Ref giữ nguyên `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav`.

### Durations v2 (ffprobe, giây) + timeline gợi ý (padding 0.5s/shot, cuối +1.4s)

| Shot | Clip voice (MỚI trừ s1) | Timeline gợi ý (from → frames) |
|------|-------------------------|--------------------------------|
| s1 (giữ) | 2.80 | from=0, duration=99 |
| s2 (mới) | 2.80 | from=99, duration=99 |
| s3 (mới) | 5.92 | from=198, duration=193 |
| s4 (mới) | 5.44 | from=391, duration=179 |
| s5 (mới) | 6.78 | from=570, duration=219 |
| s6 (mới) | 3.89 | from=789, duration=132 |
| s7 (mới) | 7.26 | from=921, duration=233 |
| s8 (mới) | 5.91 | from=1154, duration=220 |
| **TOTAL voice v2** | **≈ 40.80s** | **1374 frames ≈ 45.8s; +holds chủ ý s1 +15f hook / s8 +30f outro → 1419 frames ≈ 47.3s** |

So với vòng 2 (33.73s / 1162f): voice v2 dài hơn **≈ 7.1s, +212 frames**.
Timeline/cut phải rerun theo số mới.

### CER v2 từng clip mới (faster-whisper small, ngưỡng 0.04)

| Clip | Seed | CER | Ghi chú ASR |
|------|------|-----|-------------|
| s1 (giữ, vòng 2) | 0 | 0.000 | khớp tuyệt đối (không clone lại) |
| s2 (mới) | 0 | 0.021 | "họp→học" — nhầm âm gần giống của ASR small |
| s3 (mới) | 0 | 0.033 | "họp→học", "nốt→nút" — nhầm ASR small |
| s4 (mới) | 9 | 0.011 | "chột dạ→chuột dạ" — đồng âm; seed 9 (thử 0–9 mới đạt ≤ 0.04) |
| s5 (mới) | 0 | 0.046 ⚠ | **VƯỢT ngưỡng 0.04 (best trong 14 tries)** — "reo→rèo", "Con→còn" — nhầm ASR small, **bắt buộc người nghe kỹ**, nhất là "Con ăn cơm chưa?" |
| s6 (mới) | 8 | 0.030 | "giọng→dọng" — đồng âm, đúng phát âm; seed 8 |
| s7 (mới) | 0 | 0.017 | "bát→bắt", "con→còn" — nhầm ASR small |
| s8 (mới) | 0 | 0.019 | "Cúp→Cục" — nhầm ASR small |

Chi tiết: `docs/cuoc-goi-nho-cua-me/voice-clone-asr.md` (script tự merge: giữ
hàng s1 vòng 2, thay 7 hàng s2–s8 v2).

### Voice QA listening = ⏳ PENDING (vòng 3)

- Subagent **không nghe được audio** — KHÔNG claim "tự nhiên như người thật",
  không claim phát âm chuẩn hay giống Thanh Long.
- Người (hoặc agent có khả năng nghe) cần duyệt lại 7 clip MỚI s2–s8 trong
  `public/audio/cuoc-goi-nho-cua-me/` trước khi lock voice: ngắt nghỉ, nhấn từ
  (bấm tắt vội / Cuộc gọi nhỡ — Mẹ / Con ăn cơm chưa? /
  Một cuộc gọi lại thôi), tông ấm nửa sau, và **ưu tiên s5** (CER 0.046 ⚠ —
  kiểm tra "reo hai tiếng" và "Con ăn cơm chưa?").
