# Assets manifest — gaplai (audio: BGM + SFX)

Ngày chọn: 2026-10-13. Tone brief: thủ thỉ đêm khuya, ấm chậm (docs/gaplai/brief.md).
Giọng Cam mean −15.4..−16.0 dB / max −2.0..−2.7 dB → mọi SFX giữ volume 0.14–0.2,
BGM giữ envelope Reel sẵn có (0 → 0.05 → 0.05 → 0).

## BGM (1)

| File đích (`public/audio/`) | File gốc trong kho | Mixkit原曲名 / artist / style / BPM | URL | License |
|---|---|---|---|---|
| `gaplai-bgm.mp3` | `skills/video-shotcraft/assets/audio/bgm/g-eazy-nba-type.mp3` | G Eazy NBA type · Arulo · Hip Hop ~86 | https://assets.mixkit.co/music/403/403.mp3 | Mixkit Stock Music Free License (free thương mại, miễn署名) |

Lý do chọn: chậm nhất kho (86 BPM), êm nhất (mean −16.7 dB ≈ ngang giọng Cam nên ở volume 0.05 chìm ≈ −43 dB dưới giọng),
tối nhất (treble >5kHz chỉ −34.6 dB, không chói). Loại: `house-vibez.mp3` (= `public/audio/bgm.mp3` hiện tại, md5 khớp
`6ae9eae6…`) vì house 123 BPM quá tươi/kích; `tonight-hiphop` mean −6.9 dB quá đặc sẽ át giọng;
`cat-walk`/`bgm-tech-house` nhịp nhanh, sai mood phòng đêm.
Reel.tsx đã trỏ `audio/gaplai-bgm.mp3` (1 dòng duy nhất được sửa).

## SFX (8, copy từ `skills/video-shotcraft/assets/audio/sfx/` → `public/audio/`)

| File đích | File gốc | Mixkit原名 | URL | License | Vai trò / offset (tương đối đầu shot) |
|---|---|---|---|---|---|
| `gaplai-dissolve-soft.mp3` | `sfx/transition/transition-soft.mp3` | Air zoom vacuum | https://assets.mixkit.co/active_storage/sfx/2608/2608-preview.mp3 | Mixkit SFX Free | s2+10f, vol 0.16, 70f — khung ảnh cũ dissolve vào (1.27s, max −0.9 dB) |
| `gaplai-tea.mp3` | `sfx/fluid/liquid-bubble.mp3` | Liquid bubble | https://assets.mixkit.co/active_storage/sfx/3000/3000-preview.mp3 | Mixkit SFX Free | s3+30f, vol 0.18, 70f — rót tách trà (1.05s, max −0.7 dB) |
| `gaplai-dissolve-short.mp3` | `sfx/transition/sweep-short.mp3` | Short transition sweep | https://assets.mixkit.co/active_storage/sfx/175/175-preview.mp3 | Mixkit SFX Free | s4+10f, vol 0.15, 60f — khung ảnh dissolve (mẫu khác s2, chống machine-gun; 0.61s, max −2.8 dB) |
| `gaplai-lamp.mp3` | `sfx/ui/switch-tap.mp3` | On or off light switch tap | https://assets.mixkit.co/active_storage/sfx/2585/2585-preview.mp3 | Mixkit SFX Free | s5+60f, vol 0.2, 60f — bật/sáng đèn bàn,拟音 công tắc thật (1.11s, max −0.8 dB) |
| `gaplai-heartbeat.mp3` | `sfx/crowd/heartbeat-single.mp3` | Human single heart beat | https://assets.mixkit.co/active_storage/sfx/490/490-preview.mp3 | Mixkit SFX Free | s7+25f, vol 0.2, 60f — cái ôm s7, 1 nhịp tim ngay đầu ôm (fix final review: dời từ s6+45; 1.10s, max −2.2 dB) |
| `gaplai-shimmer.mp3` | `sfx/light/sparkle-touch.mp3` | Magic sparkle touch | https://assets.mixkit.co/active_storage/sfx/3083/3083-preview.mp3 | Mixkit SFX Free | s7+110f, vol 0.16, 70f — shimmer kết dưới lời cảm ơn (2.33s, max −2.2 dB; tail tràn ~11f sang đầu s8, tự nhiên) |
| `gaplai-aura-soft.mp3` | `sfx/light/light-aura.mp3` | Magical light aura | https://assets.mixkit.co/active_storage/sfx/2581/2581-preview.mp3 | Mixkit SFX Free | s8+120f, vol 0.14, 35f — aura rất nhẹ đầu khoảng lặng 0.8s cuối s8, giữ lặng (5.5s, max −1.8 dB, mean −20.7 dB; chỉ phát ~1.2s đầu) |
| `gaplai-cta-soft.mp3` | `sfx/ui/ui-success-soft.mp3` | Success software tone | https://assets.mixkit.co/active_storage/sfx/2865/2865-preview.mp3 | Mixkit SFX Free | s9+25f, vol 0.16, 50f — CTA soft pop/shimmer (1.62s, max −0.6 dB, mean −18.0 dB) |

## Font

- Be Vietnam Pro SemiBold (600) local `public/fonts/BeVietnamPro-SemiBold-{VN,LatinExt,Latin}.woff2`,
  tải từ Google Fonts. License: SIL Open Font License 1.1 (OFL, miễn phí thương mại, được nhúng/subset).
  Dùng qua `@font-face` local trong `GapFonts` (scenesA + scenesB, scenesC dùng chung), fallback Inter.

Ghi chú:
- Scenes hiện là stub nên offsets đặt ở nhịp hình generic (dissolve đầu shot, tea/lamp/hug giữa, shimmer cuối s7);
  khi scenes agent dựng xong cần đối chiếu lại 1 lượt (không đổi file, chỉ kiểm tra khớp).
- Không dùng `switch-light.mp3` (0.17s, max −10.7 dB — quá nhỏ, sẽ bị BGM/giọng chôn) mà dùng `switch-tap`.
- Không dùng `fluid/water-drop-cave.mp3` (mean −39.6 dB — phải khuếch đại >1,抬底噪) mà dùng `liquid-bubble`.
- Không dùng riser-cine 4.81s cho s6 (quá điện ảnh, phá mood thủ thỉ) mà dùng heartbeat.
- Nguồn URL đối chiếu từ docs/audio-attribution.md + sound-design §3 (transition-soft = Air zoom vacuum).
