# Task review — thuong-hay-so-bat-dau-lai (gate B, Phase 6)

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080×1920 30fps · comp `ThuongHaySoReel`.
Planner: `task-planner` (2026-10-16). Inputs read in full: `script.md` v2, `brief.md`,
`design-spec.md` (D1–D9 + kit khóa + Root snippet), `content-review.md` (Round 1: 9.4 pass,
E-T1..T4), `design-review.md` (Round 5: t8/t9/t10/t11 chuyển build),
`voice-report.md` (13 clip, tổng voice 52.6s), `assets-manifest.md` (BGM + 9 SFX + cue/mix plan),
`font-check.md`, `src/Root.tsx`, `src/thuong-hay-so-bat-dau-lai/proto/` (kit/entry/scenes/motion).
Gates: D kẹt 8.8 + user override cho đi tiếp (đã ghi sổ trong status.json);
E 9.4 pass. Plan này không phán xét gates, chỉ lập kế hoạch build.

## 1. Ownership (khóa)

- `video-director` sở hữu DUY NHẤT: `src/thuong-hay-so-bat-dau-lai/timeline.ts`,
  `kit.tsx` (copy từ proto kit + self-host fonts §7), `Reel.tsx` (+ mix BGM/SFX theo
  `assets-manifest.md` §Mix plan), `src/Root.tsx` entry (CompId `ThuongHaySoReel`,
  snippet trong `design-spec.md` §7), `voice.json`, `src/thuong-hay-so-bat-dau-lai/workbench.ts`.
- `scene-agent-N` sở hữu đúng 1 file scene của mình, KHÔNG ai chạm kit/timeline/Reel/Root/voice.json.
- `design-agent` sở hữu proto + board (`out/qa/*`, tile t10) — scene build KHÔNG copy tile,
  build từ kit + card mechanic (chuẩn đọc board: `design-spec.md` §5).
- Beat-sync: KHÔNG có (`assets-manifest.md`: BGM pad mềm, no beat sync, không dùng `beatF(n)`).
  Cuts land trên voice/foley theo cue table.

## 2. Shot → card → demo (10/10 demo tồn tại, 10/10 style-key validate trong `gallery/api/library.json`)

| Shot | Card | Style-key | Demo TSX (SC, read-only — copy/adapt, không import xuyên) |
|---|---|---|---|
| s1 | spotlight-hero-card | spotlight-hero-card | `skills/video-shotcraft/demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx` |
| s2 | depth-layer-moves | multiplane | `skills/video-shotcraft/demos/camera/depth-layer-moves/MultiplaneReal.tsx` |
| s3 | overhead-camera-moves | tilt-reveal | `skills/video-shotcraft/demos/camera/overhead-camera-moves/TiltReveal.tsx` |
| s4 | speed-ramp-freeze | freeze-annotate | `skills/video-shotcraft/demos/rhythm/speed-ramp-freeze/FreezeAnnotateReal.tsx` |
| s5 | transition-hidden-cut | light-leak-burn | `skills/video-shotcraft/demos/transition/transition-hidden-cut/LightLeakBurn.tsx` |
| s6 | transition-hidden-cut | invisible-cut | `skills/video-shotcraft/demos/transition/transition-hidden-cut/InvisibleCut.tsx` |
| s7 | before-after-slider-scrub | before-after-slider-scrub | `skills/video-shotcraft/demos/data/before-after-slider-scrub/BeforeAfterSliderScrub.tsx` |
| s8 | tension-camera-moves | pull-back-isolation | `skills/video-shotcraft/demos/camera/tension-camera-moves/PullBackIsolation.tsx` |
| s9 | scan-bracket-sweep | scan-bracket-sweep | `skills/video-shotcraft/demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx` |
| s10 | paper-title-card | paper-title-card | `skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx` |

- Fixtures/lib director copy 1 lần vào `src/thuong-hay-so-bat-dau-lai/lib/` trước dispatch:
  `demos/_fixtures/Polish.tsx` (bezier/EASE/ramp/mix/Grain) + kit proto (`HandChop`, `Bowl`,
  `Cooker`, `Led`, `TileWall`, `DuskWindow`, `ThoLine`, `Headline`, `MinhHoa`, `Finish`,
  palette + `E.inOutSine`). Text system chung: `blur-slide` cho caption/tag/nhãn/s4b.
- npm deps mới: **không** (CSS/SVG thuần; không three/fiber/motion-blur).
- Locked params giữ nguyên命门 từ `design-spec.md` §3 (D1–D9, s5+s6 = 1 device tương phản).

## 3. Scene split (3 agents, files rời nhau)

| Agent | File | Shots | Lý do gom |
|---|---|---|---|
| scene-agent-1 | `src/thuong-hay-so-bat-dau-lai/ScenesA.tsx` | s1, s2, s3 | hook cover + routine setup (E-T4, t11 cùng tableau bếp) |
| scene-agent-2 | `src/thuong-hay-so-bat-dau-lai/ScenesB.tsx` | s4, s5, s6 | re-hook freeze + cặp tương phản (s5/s6 CHUNG staging replay — bắt buộc 1 owner; E-T2) |
| scene-agent-3 | `src/thuong-hay-so-bat-dau-lai/ScenesC.tsx` | s7, s8, s9, s10 | turn hội tụ + reset + 3 inserts + end lặng (E-T1, t8, t9) |

Inputs mỗi agent: kit exports (§2) + props theo timeline §4 + demo TSX tương ứng + voice spans
+ SFX cues (§4) + tickets của mình (§5). Output: component mỗi shot + stills §6.

## 4. Timeline mapping (ffprobe 2026-10-16, tail 11f = 0.35s, gaps 9/12/9f, lặng cuối 57f = 1.9s)

`THS_TOTAL` = **1769f = 58.97s** (trong 40–60s; khớp voice-report ~58.6s trong sai số ceil/frame).

| Shot | Voice span (frames) | Shot range | SFX (offset tương đối đầu shot, gain — xem `assets-manifest.md`) |
|---|---|---|---|
| s1 | 0–102 (3.41s) | 0–113 | ù tuýp nền + tick khi grade đổi ("thương"/"sợ") |
| s2 | 114–244 (4.35s) | 114–255 | `sfx-cooker-click` ≈+3.0s @ −4.4dB, 5f — đúng chữ "cạch" (E-T4: giữ beat Nấu→Giữ ấm) |
| s3 | 256–365 (3.64s) | 256–376 | `sfx-soup` ≈+0.6s @ −9.1dB, 31f |
| s4a | 377–419 (1.42s) | 377–419 (không tail; gap 9f: 420–428) | `sfx-humcut` ≈+1.2s @ −10.5dB, 36f (ù tắt lúc freeze) |
| s4b | 429–536 (3.60s) | 429–547 | — (hold đọc "?" trong tail) |
| s5 | 548–710 (5.42s) | 548–721 | `sfx-keys-a` ≈+3.6s @ −6.0dB, 34f ("Nghe tiếng chìa khoá") |
| s6a | 722–855 (4.47s) | 722–855 (không tail; gap 12f: 856–867) | `sfx-rewind` @ 0.0 (12f tua ngược) @ −8.0dB, 14f; `sfx-exhale` trong gap +0.05 @ −6.0dB, 11f — KHÔNG đè chữ |
| s6b | 868–987 (3.99s) | 868–998 | `sfx-keys-b` ≈+3.6s @ −7.5dB, 33f; insert đũa lạ 0.6s mờ, không thoại đè (E-T2) |
| s7a | 999–1151 (5.08s) | 999–1151 (không tail; gap 9f: 1152–1160) | `sfx-converge` ≈+2.4s @ −12.0dB, 38f ("y hệt nhau") |
| s7b | 1161–1205 (1.50s) | 1161–1216 | — (câu rơi nhỏ ~−3dB, giữ nguyên, không nâng gain) |
| s8 | 1217–1366 (5.00s) | 1217–1377 | `sfx-keys-a` ≈+0.2s @ −9.1dB, 34f ("Lạch cạch.") + eye-insert close-up (t9) |
| s9 | 1378–1568 (6.35s) | 1378–1579 | `sfx-msg` ≈+0.5s @ −10.5dB, 32f (insert 1 "Xin lỗi nha."); 3 inserts ~2.2s mỗi cái (E-T1) |
| s10 | 1580–1711 (4.39s) | 1580–1768 (voice + lặng thuần 57f) | BGM fade to 0 trong 0.3s ở "không?" → lặng thuần 1.8–2.0s (chỉ ù nền rất nhỏ); push-in 1.00→1.04 rồi đứng im hẳn |

## 5. Tickets → owner (E-T1..T4 + t8..t11, toàn Thấp)

| Ticket | Owner | Acceptance |
|---|---|---|
| E-T1 s9 3 inserts đặc (insert 2 phóng to 1 dòng ≥64px, không thêm element thứ 4) | scene-agent-3 | 3 QA stills (1/insert) đọc được ở cỡ phone 1/3, nhãn "minh hoạ" thấy trên (1)+(2) |
| E-T2 s6b đũa lạ: chỉ đũa + bát lạ, blur nặng, không tay/mặt, dissolve 0.6s | scene-agent-2 | QA still insert không thấy human features |
| E-T3 timestamp "· 00:47": giữ (xin lỗi đêm khuya sau cãi — hợp chuyện) hoặc bỏ | video-director quyết → scene-agent-3 vẽ | lý do ghi vào design-spec hoặc timestamp biến mất; voice.json không đổi |
| E-T4 s2–s3 setup 8s: giữ beat "cạch" + Nấu→Giữ ấm sắc | scene-agent-1 | still s2 thấy khoảnh khắc LED chuyển |
| t8 s7: tay người ấy NÂNG bát (đúng chữ s7a), hai nửa converge cùng grade value | scene-agent-3 | QA fidelity shot s7 ≥8 |
| t9 s8: close-up mắt "nhìn lâu" (eye-insert tile s8 + spec §5) | scene-agent-3 | still s8 có close-up mắt/mặt, QA chấm |
| t10 board chữ tile ≥2x (nhất là s1/s10) + icon móc chìa tile s2 | design-agent (proto) | đọc đủ chữ tile ở 1/3 |
| t11 hook mid-table ~30% xám phẳng: shading ron/vignette/noise nhẹ, giữ safe zone | scene-agent-1 | full-size hết vùng phẳng, thumb không đổi |

## 6. Still-frame check mỗi scene (director/QA chụp, `remotion still`)

- Mỗi shot: frame đầu (voice start), frame giữa, frame biên (shot end / giáp gap), shot nhanh:
  s4 freeze-frame + thaw; s6 cut-frame rewind (vật che phủ kín) + replay; s7 converge-frame
  ("y hệt nhau": seam tan, tag 50%, neutral); s9 1 still/insert (E-T1); s10 frame "không?"
  (BGM tắt) + frame lặng giữa (chỉ LED thở).
- Pass khi: F1/F2 nguyên văn từng chữ (sợ BLUE_DEEP `#6E8BFF`, F2 trắng hết, 0-accent);
  caption/tag trên đáy 210px; LED thở 72f không tắt; easeInOutSine, 0 overshoot/nảy;
  s10 không ghế đối diện+đèn, hai mã màu ngang nhau.

## 7. Fonts — self-host (font-check.md: glyph OK, phân phối ❌)

Literata 600/700 + Lexend 500/600/700 có subset `vietnamese` đầy đủ nhưng **chưa có file local**
(`public/fonts/` chỉ có Be Vietnam Pro 600 + fonts video khác); proto dùng `@import` CDN
(`proto/kit.tsx:40`) — render offline rơi về Georgia/BeVietnamPro trong im lặng.
**Director trước dispatch:** tải woff2 (VI + latin-ext + latin cho mỗi weight, URL mẫu trong
font-check §4), đặt `public/fonts/`, thay `ThoFonts` bằng `@font-face` local +
`unicode-range` (pattern `src/cuocgoinho/kit.tsx:47-59`), giữ chain fallback.
QA: still "Giữ ấm / ngưỡng cửa / người mới ghét gì" soi dấu chồng 200% (ữ ễ ợ Literata 600).
Fallback khẩn: Be Vietnam Pro 600 local (caption tạm), Georgia (headline cuối cùng).

## 8. Tool checks (chạy thật 2026-10-16, end-to-end)

- `ffprobe` 13/13 voice clips: khớp voice-report ±0.03s (s1 3.41 · s2 4.35 · s3 3.64 · s4a 1.42 ·
  s4b 3.60 · s5 5.42 · s6a 4.47 · s6b 3.99 · s7a 5.08 · s7b 1.50 · s8 5.00 · s9 6.35 · s10 4.39);
  tổng voice 52.60s ✓. BGM 65.43s (đủ phủ 59s + fade) ✓. 9/9 SFX tồn tại, durations khớp
  manifest (cooker 0.17 · keys-a 1.13 · keys-b 1.10 · soup 1.05 · humcut 1.20 · rewind 0.45 ·
  exhale 0.35 · converge 1.27 · msg 1.06) ✓.
- Demo paths: 10/10 TSX tồn tại trong `skills/video-shotcraft/` ✓.
  Style-keys: 10/10 validate trong `gallery/api/library.json` ✓.
- CompId `ThuongHaySoReel`: duy nhất — chưa có trong `src/Root.tsx` (đúng kỳ vọng, director đăng ký) ✓.
- `npx tsc --noEmit` trên cây hiện tại: **sạch (exit 0)** ✓.
- Fonts local: ❌ Literata/Lexend chưa self-host → director làm trước dispatch (§7).

## 9. Thứ tự tích hợp

1. Director: self-host fonts + copy fixtures/lib + `kit.tsx` + `timeline.ts` (số §4) + `workbench.ts`.
2. Dispatch song song scene-agent-1/2/3 (files rời nhau, không block nhau; s5/s6 đã gom 1 owner).
   t10 (design-agent, board) chạy song song, không chặn build.
3. Agents trả component + stills §6 → director ráp `Reel.tsx` (+ BGM/SFX mix plan) + đăng ký Root.
4. QA độc lập (`qa-agent`, round mới) → fixes về đúng owner file → E-T3 quyết trước render cuối.
5. Render 1 bản BGM (`pipeline.py render --min-seconds 40 --max-seconds 60`) → gate C.

## 10. Rủi ro

- R1 (lớn nhất): s5 vs s6a "cùng giai điệu" không pin seed chung (seed 1 vs 22) — tai người chưa
  kiểm (needs-listening #2, audio-listen đã waive). Nếu lệch nhịp, device "tua lại diễn y hệt" vỡ.
- R2: tổng 58.97s, dư ~1.0s so với trần 60s. Nếu voice-agent regen clip dài hơn → cắt hold/tail
  trước, KHÔNG cắt chữ, không tăng tốc audio.
- R3: fonts CDN → local (§7): nếu URL gstatic mẫu hết hạn, tải lại từ CSS API (cách trong font-check).
- R4: s9 6.35s nhét 3 inserts + E-T1: mật độ cao nhất video; stills QA là cổng duy nhất bắt vỡ.
- R5: lặng cuối + LED thở + ù nền: BGM fade 0.3s phải chính xác ở "không?"; QA kiểm ebur128 +
  voice-window vs music-only-window (Phase 7 mix targets).

## Round 1 (2026-10-16, reviewer: task-reviewer, clean context)

Inputs đọc đủ: plan §§1–10 trên, `script.md` v2 (10 shot / 13 key, 207 âm tiết),
`content-review.md` Round 1 (9.4 pass, E-T1..T4), `design-spec.md` (§§1–8 + Root snippet §7),
`voice-report.md` (13 clip, 52.6s), `src/thuong-hay-so-bat-dau-lai/` (timeline.ts/kit.tsx/Reel.tsx/
ScenesA-B-C.tsx/workbench.ts + lib/), `src/Root.tsx`, `public/audio/thuong-hay-so-bat-dau-lai/`
(13 voice + bgm + 9 sfx), `public/fonts/`, `skills/video-shotcraft/` demos + `gallery/api/library.json`.
Checks chạy thật: `ls` demos/lib/fonts/audio, `ffprobe` spot-check s6a/s9/bgm, `grep` ownership/imports,
`npx tsc --noEmit` (exit 0). Không chạy pipeline.

### Điểm (rubric task-reviewer)

| # | item | điểm | evidence |
|---|---|---|---|
| 1 | Coverage | 10 | 10 shot / 13 key mỗi cái đúng 1 owner (§3: A=s1-3, B=s4-6 incl. split s4a/b+s6a/b, C=s7-10 incl. s7a/b); frame ranges cộng khớp THS_TOTAL 1769f (114+142+121+43+9+119+174+134+12+131+153+9+56+161+202+189 = 1769 ✓); voice spans khớp ffprobe ±0.03s |
| 2 | Ownership | 10 | Files trên đĩa đúng plan: ScenesA (297d, s1-3) / B (467d, s4-6) / C (490d, s7-10); không scene file nào import Reel/Root (`grep` rỗng); scene chỉ import `lib/motion` + remotion; kit/timeline/Reel/Root/voice.json/workbench do director giữ |
| 3 | Timing | 9 | Ranges = voice đo + tails/gaps/lặng (§4) đã re-check `ffprobe`: s6a 4.466s (≈4.47 ✓), s9 6.349s (≈6.35 ✓), bgm 65.43s ✓; gaps 9/12/9f + lặng cuối 57f khớp timeline.ts GAPS/SILENCE_END. Trừ 1: design-spec §7 còn số cũ (voice 52.42s/~58.4s) lệch số đo thật 52.60s/58.97s (B-T3) |
| 4 | Tools/assets | 7 | 10/10 demo TSX `ls` tồn tại ✓; 10/10 style-key có trong library.json ✓; 13 voice + bgm + 9 sfx tồn tại ✓; `tsc` sạch ✓. Nhưng: B-T1 (Cao, Root fps sai) + B-T2 (Trung, plan stale về fonts — file local ĐÃ có) |
| 5 | Still-checks | 9 | §6 cụ thể từng shot: đầu/giữa/biên + freeze+thaw s4, cut-frame rewind s6, converge-frame s7, 3 stills s9, 2 frame s10; pass criteria rõ (F1/F2 nguyên văn, caption trên đáy 210px, LED thở 72f, 0 overshoot). Trừ 1: chưa ghi số frame tuyệt đối cho từng still (director/QA tự suy từ §4) |
| 6 | Parallel/order | 9 | Director trước (fonts đã xong thực tế — xem B-T2) → 3 agents song song files rời ✓ s5/s6 gom 1 owner ✓; t10 song song không chặn build ✓; E-T3 chốt trước render cuối ✓. Trừ 1: build trên đĩa đã chạy trước gate B (ScenesA-C + Reel + Root đã tồn tại) — gate B thành hồi tố, director ghi nhận thứ tự thực tế |
| 7 | Card+demo+lib | 10 | Mỗi shot có card + style-key + demo TSX chính xác, 10/10 file tồn tại (verify `ls`); lib `src/.../lib/motion` tồn tại (scene import resolve, `tsc` sạch); npm deps mới = không, hợp lý |

**Mean 9.1. Items 1–2 = 10. Nhưng còn 1 Cao + 1 Trung mở → verdict: revise.**

### Fix list

- B-T1 | Cao | `src/Root.tsx:30` | `fps={50}` cho comp `ThuongHaySoReel` trong khi timeline là 30fps và mọi comp khác dùng `fps={FPS}` (=30) | evidence: 1769f @50fps = 35.4s → rớt `pipeline.py render --min-seconds 40`, toàn bộ map voice/SFX/lặng sai nhịp | concrete: `fps={50}` → `fps={FPS}` | owner: video-director | acceptance: Root fps=30, `npx tsc --noEmit` sạch, render duration check 40–60s pass |
- B-T2 | Trung | `task-review.md` §7 + §8 (fonts) | plan ghi "chưa có file local" + lệnh director tải woff2 trước dispatch, nhưng thực tế ĐÃ self-host xong | evidence: `public/fonts/` có đủ 18 woff2 (Literata SemiBold/Bold + Lexend Medium/SemiBold/Bold × VN/LE/LA) + `kit.tsx:42-59` dùng `@font-face` local + `unicode-range`, không còn `@import` CDN | concrete: gạch việc tải lại trong §7, ghi DONE kèm paths; GIỮ QA soi dấu 200% (ữ ễ ợ Literata 600) | owner: video-director | acceptance: §7 marked done, không tải trùng, still-check dấu giữ nguyên |
- B-T3 | Thấp | `design-spec.md` §7 | tổng voice "52.42s" + video "~58.4s" lệch số đo thật | evidence: voice-report + ffprobe = 52.60s voice → 1769f = 58.97s (timeline.ts đã đúng) | concrete: sửa §7 thành 52.60s / 58.97s | owner: video-director | acceptance: 3 nguồn (voice-report, timeline, design-spec) đồng số |

### Đã verify, không ticket

- SFX `sfx-exhale` offset 135 > s6a duration 134: có chủ ý — rơi vào frame 857 (gap 856–867, +0.05s sau "thở phào"), đúng script "đặt SFX thở ra trong gap, không đè chữ".
- `workbench.ts` import TOTAL: `timeline.ts:60` export alias `TOTAL = THS_TOTAL` ✓; MIX/bgmFadeStart 1703 + dur 9 → fade xong 1712 = đầu lặng thuần ✓.
- E-T1..T4 + t8/t9/t11 đã có owner scene đúng file; t10 design-agent (proto/board) không chặn build; E-T3 route director-quyết → scene-agent-3 vẽ, voice.json không đổi ✓.
- Không beat-sync (`beatF` không dùng) khớp assets-manifest (BGM pad mềm) ✓; R1/R2 trong §10 vẫn đúng và chuyển QA.
