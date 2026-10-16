# Assets manifest — thuong-hay-so-bat-dau-lai

Vid `thuong-hay-so-bat-dau-lai` · story thủ thỉ ấm-tỉnh 56–60s · 30fps.
Voice report chưa có lúc làm audio — ước tính theo script v2 (207 âm tiết, hold 6.0–6.2s).
Offsets dưới đây tương đối đầu shot (§4.5); mốc từ ước tính theo vị trí âm tiết — director/voice-agent đối chiếu sau khi có voice-report.

## BGM

| File | Duration | Sample rate | Peak | Mean | Origin | License |
|---|---|---|---|---|---|---|
| `public/audio/thuong-hay-so-bat-dau-lai/bgm.mp3` | 65.43s | 44100 Hz stereo | −10.1 dB | −22.5 dB | Generated `scripts/gen-bgm-soft.py` (C–Am–F–G pad + arp 72 BPM, 65s, fade in 3s / out 4s) | Original synthesis, no license needed |

Beat: **no beat sync** — BGM pad mềm không beat rõ; cuts land trên voice/foley, không landing beat.
Chi tiết `docs/thuong-hay-so-bat-dau-lai/analysis/no-beat-sync.md`.
Riser→impact→sparkle (§4.3) **bỏ qua có chủ ý**: board không có peak — s10 là lặng thuần 1.8–2.0s sau "không?",
mọi swell năng lượng sẽ phá thiết kế im lặng.

## SFX (foley-first)

| Cue file | Source (SC) | Duration | Peak | Origin / license |
|---|---|---|---|---|
| `sfx-cooker-click.mp3` | `sfx/ui/switch-light.mp3` (Light switch sound) | 0.17s (5f) | −10.7 dB | Mixkit SFX Free License, commercial OK, no attribution. Mixkit URL: https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3 |
| `sfx-keys-a.mp3` | `sfx/mech/lock-quick.mp3` (Quick lock sound) | 1.13s (34f) | −0.3 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/2854/2854-preview.mp3 |
| `sfx-keys-b.mp3` | `sfx/mech/gear-lock-metallic.mp3` (Gear metallic lock sound) | 1.10s (33f) | −1.0 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/2858/2858-preview.mp3 |
| `sfx-soup.mp3` | `sfx/fluid/liquid-bubble.mp3` (Liquid bubble) | 1.05s (31f) | −0.7 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/3000/3000-preview.mp3 |
| `sfx-humcut.mp3` | `sfx/scifi/tech-hum-futuristic.mp3` trim 0–1.2s + fade-out 0.3s (foley tiếng ù đèn tuýp; cắt lúc freeze) | 1.20s (36f) | −4.8 dB | Mixkit SFX Free License (file gốc 6.0s >5s — đã pre-trim nên không cần durationInFrames dài). URL: https://assets.mixkit.co/active_storage/sfx/2133/2133-preview.mp3 |
| `sfx-rewind.mp3` | `sfx/film/tape-rewind-fast.mp3` trim 0–0.45s + fades (foley 12 frame tua ngược đầu s6) | 0.45s (14f) | −5.9 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/1092/1092-preview.mp3 |
| `sfx-exhale.mp3` | Synthesized (brown noise → one-pole lowpass ~600 Hz, attack 50ms / release 150ms, peak −9.2 dB) — thư viện không có breath foley; đặt trong gap 400ms sau "thở phào.", không đè chữ | 0.35s (11f) | −9.2 dB | Original synthesis, no license needed |
| `sfx-converge.mp3` | `sfx/transition/transition-soft.mp3` (Air zoom vacuum) — swell nhẹ lúc hai grade hội tụ ở "y hệt nhau" | 1.27s (38f) | −0.9 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/2608/2608-preview.mp3 |
| `sfx-msg.mp3` | `sfx/ui/ui-message-pop.mp3` (Message pop alert) — tin nhắn "Xin lỗi nha." hiện (insert s9-1); "the system speaks" nên synthetic pop được chấp nhận (§3.3 ngoại lệ) | 1.06s (32f) | −3.2 dB | Mixkit SFX Free License. URL: https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3 |

Không sample nào >5s sau trim; không sample nào peak <−12 dB (thấp nhất −10.7 dB, transient click — giữ nguyên).
Hit chìa khoá lặp 3 lần (s5/s6/s8) alternate 2 sample A→B→A, gain giảm dần (S2).

## Cue table (shot | offset tương đối | file | gain | durationInFrames | lands on)

Offsets ước tính theo vị trí âm tiết trong câu; timeline giữ đúng gap s4a→s4b 300ms, s6a→s6b 400ms, s7a→s7b 300ms.

| Shot | Offset (s) | File | Gain dB (linear) | durationInFrames | Lands on |
|---|---|---|---|---|---|
| s2 | ≈3.0 | `sfx-cooker-click.mp3` | −4.4 dB (0.60) | 5f | voice accent "cạch" |
| s3 | ≈0.6 | `sfx-soup.mp3` | −9.1 dB (0.35) | 31f | voice "múc" + đũa gắp hành |
| s4a | ≈1.2 | `sfx-humcut.mp3` | −10.5 dB (0.30) | 36f | voice "khựng lại" (ù tắt lúc freeze) |
| s5 | ≈3.6 | `sfx-keys-a.mp3` | −6.0 dB (0.50) | 34f | voice "Nghe tiếng chìa khoá" |
| s6 | 0.0 | `sfx-rewind.mp3` | −8.0 dB (0.40) | 14f | visual 12f tua ngược |
| s6 | ≈3.6 | `sfx-keys-b.mp3` | −7.5 dB (0.42) | 33f | voice "Nghe tiếng chìa khoá" (lần 2, sample B) |
| s6a end | +0.05 (trong gap 400ms) | `sfx-exhale.mp3` | −6.0 dB (0.50) | 11f | gap sau "thở phào." — không đè chữ |
| s7a | ≈2.4 | `sfx-converge.mp3` | −12.0 dB (0.25) | 38f | voice "y hệt nhau" (grade hội tụ) |
| s8 | ≈0.2 | `sfx-keys-a.mp3` | −9.1 dB (0.35) | 34f | voice "Lạch cạch." đầu shot (lần 3, sample A, nhỏ nhất) |
| s9 | ≈0.5 | `sfx-msg.mp3` | −10.5 dB (0.30) | 32f | insert (1) tin "Xin lỗi nha." hiện |
| s10 | — | (không SFX) | — | — | BGM tắt ở "không?" → lặng thuần 1.8–2.0s |

Tất cả SFX tránh đè lời: exhale nằm gọn trong gap; còn lại là transient/bed ngắn dưới voice.

## Mix plan cho Reel.tsx

Voice ref đo thật (clip s1): peak −2.0 dB, mean −15.5 dB. Gains dưới đây tính trên mốc đó.

- **BGM bed:** `0.22` (−13.2 dB) suốt s1–s9 → peak BGM ≈ −23 dB, ~21 dB dưới voice peak, ~18 dB dưới voice mean.
  Fade-in 1s đầu s1.
- **Ducking:** khi voice nói, duck thêm 6 dB → `0.11` (−19.2 dB), ramp 200ms (trong khung 150–300ms)
  cả attack lẫn release.
- **Swell:** hold cuối s4b (sau "?"), gap s6, câu rơi s7b, insert s9 → `0.28` (−11.0 dB), ramp 300ms.
- **s10:** BGM giữ bed tới chữ "không?", fade to 0 trong 0.3s → **lặng thuần 1.8–2.0s**
  (không SFX, không room tone thêm — chỉ hình đứng im + LED Giữ ấm thở).
- **SFX:** gains theo cue table (peak SFX sau gain đều ≤ −6 dB, dưới voice −2 dB).
  Không SFX nào `volume > 1`; preview-safe.
- BGM `<Audio>` bọc boolean inputProp `bgm` (default true) để渲 bản no-BGM như sound-design §1.

## License summary

- 1 BGM + 1 SFX (exhale) = tổng hợp gốc, không cần license.
- 8 SFX = Mixkit Sound Effects Free License (free commercial, no attribution), URL từng file ghi ở bảng trên;
  đối chiếu `docs/audio-attribution.md` + `SC/assets/audio/ATTRIBUTION.md`.
- Không download nguồn unlicensed. Không chạm voice clips (`s1.mp3`/`s2.mp3` của voice-agent) hay timeline.
