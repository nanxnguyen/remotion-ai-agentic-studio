# Design spec — thuong-hay-so-bat-dau-lai (Phase 3, design-agent)

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080×1920 30fps · comp `ThuongHaySoReel`.
Inputs: `brief.md` (v2 tokens), `script.md` v2 (10 shot / 13 keys), `research.md`, gate-A Round-2 fixes (Thấp-6/7/8).
Voice measured (ffprobe 2026-10-16): s1 3.41 · s2 4.35 · s3 3.67 · s4a 1.42 · s4b 3.60 · s5 5.42 · s6a 4.24 · s6b 3.99 · s7a 5.08 · s7b 1.50 (13/13 clip đã đủ — s8 5.00s · s9 6.35s · s10 4.39s, ffprobe 2026-10-16; timeline chốt theo số đo này).

## 1. Visual direction (chốt từ brief, không vay video khác)

**Palette (hex, vai trò khóa):**
`TILE #E6ECE8` gạch men dưới đèn tuýp · `GROUT #C3CEC8` ron gạch · `INOX #B8C2C6` bàn/nồi ·
`DUSK1 #3D2C5E → DUSK2 #C77DA0` trời chạng vạng ngoài cửa sổ · `INK #2A2238` mực/viền, pill caption `#241B33` 85% ·
`PAPER #F7F5FA` chữ · **`RED #FF5A36` thương** (LED Giữ ấm + chữ/grade ấm, chấm không tô mảng) ·
**`BLUE #9DB4FF` sợ** (tuýp lạnh + chữ/grade lạnh) · **`BLUE_DEEP #6E8BFF` chữ sợ text-only** (T1: LED/grade giữ BLUE) · `LABEL #8C86A0` nhãn "minh hoạ".
Hai mã màu luôn ngang nhau ở s10, không màu nào trả lời thay người xem.

**Fonts (đã verify §7):** Headline `Literata SemiBold 600` (F1 s1, câu hỏi s4b, F2 s10);
caption/tag/label `Lexend Medium 500 / Bold 700`, caption đáy `bottom: 224`.
Cả hai OFL (Google Fonts). Subset `vietnamese` tồn tại cho Literata 600–700 + Lexend 500/600/700
(verify qua css2 API 2026-10-16) + render kiểm dấu đầy đủ ở proto `DiacriticsTest`, đọc PNG.
Fallback nếu lỗi dấu: `Be Vietnam Pro` chỉ cho caption (không dùng headline).

**Type scale (pixel cuối 1080, Q11):** headline 80–88px (≈58–62px glyph ✓≥54) · caption 56–60px ·
tag "vì thương/vì sợ" 40px Bold · nhãn "minh hoạ" 32px · bong bóng s9b dòng phóng to ≥64px (fix Thấp-7).
Caption: tối đa 2 dòng căn giữa, max-width 952, pill INK 85%, chữ PAPER, trên đáy 210px (`bottom: 224`).
s1 + s10 headline lớn thay caption (không lặp chữ hai chỗ).

**Vật liệu/không gian:** bếp chung giờ chạng vạng — tường gạch men (lưới ron mờ), cửa sổ tím,
bàn inox, nồi cơm (đèn Nấu tắt / Giữ ấm đỏ son "thở" chu kỳ 2.4s = 72f suốt video),
hai bộ đũa, áo khoác người ấy trên ghế, móc chìa khoá cạnh cửa. Nhân vật phẳng tả thực tối giản
(không que — cấm trùng lan), "mình" qua bàn tay/bóng lưng, người ấy trung tính giới.

**Character kit khóa (T3, `kit.tsx`):** mình = da `SKIN #E3B98E` + tay áo `SLEEVE_MINH #C9BBA6`;
người ấy = da SKIN + torso `SHIRT #5A6B8C` + tóc `HAIR #23202B`;
đũa `STICK1 #8A5A33`/`STICK2 #74491F`; bát = KitBowl (rim ring + wall band + soup gloss + hành đổ bóng + steam).
Components khóa: `HandChop` (dir down/right, ngón kẹp đũa) + `Bowl` — dùng chung hook/turn/end, cấm blob thay tay.
Board tiles là sơ đồ low-fi (màu trùng kit) — scene build không copy tile, build từ kit.

**Motion personality "nhịp thói quen":** `easeInOutSine` toàn video, **TUYỆT ĐỐI KHÔNG overshoot/nảy/elastic/spring**
(thói quen thì trơn). Máy gần như chân đứng: push-in 1.00→1.03/1.04 cả shot, cắt theo SFX trong cảnh.
Ba thủ pháp có tên: freeze (s4), tua lại + diễn y hệt (s6), chia đôi + hội tụ grade (s7). Kết push-in rồi đứng im hẳn.

**Không giống:** gaplai (hai ghế đối diện + đèn vàng + nâu đêm) · camon (polaroid, rêu/lá) ·
cuoc-goi (điện thoại hai phòng, đỏ gọi nhỡ) · metkhong (một mình phòng trọ đêm) ·
lan (đen + người que + cam) · UA/ClaudeMem (đen+gold sơ đồ / kem+clay terminal).

## 2. Energy curve (story-adapted; promo-energy-arc là hàng product — chỉ mượn xương hook→turn→hold)

| Shot | Năng lượng | Vai trò |
|---|---|---|
| s1 hook | thấp–trung, hội tụ | 1 hero (bát canh đối diện + tay) + F1 đủ từ frame 0 |
| s2–s3 | thấp, đều | thói quen chạy (toàn bếp → top-down nhặt hành) |
| s4 | nén (freeze) → câu hỏi mới | re-hook "vì ai" ở ~15s |
| s5 | dâng ấm | tương phản A "thương" |
| s6 | hạ lạnh | tương phản B "sợ" (tua lại + y hệt) — đáy turn |
| s7 | **đỉnh turn** | chia đôi → hội tụ "y hệt nhau" → câu rơi |
| s8 | lặng reset | ngưỡng cửa, trung tính |
| s9 | thấp–trung | 3 bằng chứng "mọi điều đang biết" |
| s10 | tĩnh tuyệt đối + lặng 1.8–2.0s | F2 + hold, hai màu ngang nhau |

R1: F1/s4b/F2 + s7 "y hệt nhau" hold ≥1s · R2: đĩa hành đầy dần + 3 insert s9收尾 0.5s rest ·
R3: arc chính s1/s5/s7 ≥3s · R4: **0 whole-frame slam** (≤3 ✓) — flicker tuýp + "cạch" chỉ ở element layer ·
Q4: **glint duy nhất** s5 (dusk tràn cửa); LED "thở" là emissive pulse, không phải sweep.

## 3. Shot → card mapping (tên + style-key đã validate trong `gallery/api/library.json`)

Chữ chung toàn video: grammar `blur-slide` (y+blur+opacity, easeInOutSine, không overshoot)
cho caption/tag/nhãn/s4b — là **text system, không phải hero** của shot nào.
Hero mỗi shot khác nhau (P4); hero duy nhất 1 lần: freeze s4.

| Shot | Beat | Card | Style-key | Demo TSX ("参考实现") | 9:16 adaptation | Locked params (命门, không hạ) | SFX idea |
|---|---|---|---|---|---|---|---|
| s1 | HOOK·COVER | spotlight-hero-card | spotlight-hero-card | `demos/opening/spotlight-hero-card/SpotlightHeroCard.tsx` | Tableau bếp dọc thay page screenshot; pool = vầng ấm quanh bát đối diện; không tilt 3D, chỉ push-in 1.00→1.03 | pool lock +6% pulse; push 18f→cả shot chậm; lock xong **khóa máy**, hold chỉ thở sáng (R1); Q5 1 hero | ù tuýp nền + tick khi grade đổi |
| s2 | routine wide | depth-layer-moves | multiplane | `demos/camera/depth-layer-moves/MultiplaneReal.tsx` | Drift ngang biên độ nhỏ (9:16 hẹp): xa cửa sổ 0.35x + blur, giữa bàn 0.7x nét, gần nồi/LED 1.4x lướt | hệ số 0.35/0.7/1.4; drive asymmetric in-out `bezier(0.45,0,0.18,1)`; có điểm dừng + hero float; blur chỉ trên layer nhỏ, không blur full-frame | "cạch" nồi nhảy + LED Nấu→Giữ ấm |
| s3 | nhặt hành | overhead-camera-moves | tilt-reveal | `demos/camera/overhead-camera-moves/TiltReveal.tsx` | Mở hơi nghiêng → settle top-down khóa cứng, rồi micro push-in theo tay gắp 3 cọng | pan-lock...: **bỏ overshoot −2.2°** (brief cấm) → settle 0° easeInOutSine; hold cuối极缓 push 1→1.018 giữ | đũa chạm + hơi nước |
| s4 | RE-HOOK freeze | speed-ramp-freeze | freeze-annotate | `demos/rhythm/speed-ramp-freeze/FreezeAnnotateReal.tsx` | Freeze đũa khựng + cọng hành lơ lửng; vòng tròn nhấn quanh cọng hành thay bút marker; **bỏ chrome viewfinder** (không REC/timecode attempted — bếp không phải camera); tín hiệu pause = ù tuýp cắt + LED vẫn thở | freeze **slope 0瞬切** không缓入; thaw smootherstep ease-in +斜率>1 bù giờ; thaw xong hold đọc câu hỏi; ≤1 freeze/video ✓ | ù tuýp cắt (sfx-humcut) |
| s5 | tương phản A | transition-hidden-cut | light-leak-burn | `demos/transition/transition-hidden-cut/LightLeakBurn.tsx` | Cut bàn→cửa giấu trong đỉnh sáng: dusk hồng tràn khi cửa mở = leak có động cơ (motivated), không phải trang trí | peak-frame藏切; leak 3-tone ấm沿对角线; **1 lần duy nhất** (Q4); không叠 flash-cut | lạch cạch chìa + bản lề cửa |
| s6 | tương phản B | transition-hidden-cut | invisible-cut | `demos/transition/transition-hidden-cut/InvisibleCut.tsx` | Tua lại 12f chạy ngược + blur = "vật che" giấu hard-cut grade ấm→lạnh; rồi diễn y hệt staging s5 | vật che phải **thật sự phủ kín** frame ở cut-frame (实心核 đủ rộng); cut xong replay ease-out回稳; một接缝 một式 | rewind whoosh + thở ra ở gap 400ms |
| s7 | turn hội tụ | before-after-slider-scrub | before-after-slider-scrub | `demos/data/before-after-slider-scrub/BeforeAfterSliderScrub.tsx` | Chia trên/dưới (9:16 dọc): trên ấm / dưới lạnh, cùng tay nâng bát; ở "y hệt nhau" hai grade hội tụ trung tính, nhãn mờ, đường chia tan | rod x = clip boundary (lệch là穿帮); **bỏ overshoot tay cầm** → easeInOutSine; cùng layout cùng máy (điều kiện cần); converge về merged (card dừng 40% — brief đòi nhập một, deviation đã ghi) | converge shimmer nhẹ |
| s8 | reset ngưỡng | tension-camera-moves | pull-back-isolation | `demos/camera/tension-camera-moves/PullBackIsolation.tsx` | Pull-back chậm về khung cửa bếp (frame-in-frame) + rack focus vai mình → người ấy treo chìa; **bỏ "tắt"** (không gì熄灭 — brief: sáng reset trung tính) | pull-back out-cubic chậm; xong **hold tĩnh ≥30f** (R1); không叠 group-photo (đánh nhau) | lạch cạch treo móc |
| s9 | 3 bằng chứng | scan-bracket-sweep | scan-bracket-sweep | `demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx` | 3 insert (~2.2s): mỗi insert = 1 "tài liệu" tĩnh +括号 + 1 lượt scan chậm; (2) hai bong bóng cùng câu cãi phóng to **1 dòng ≥64px** + nhãn "minh hoạ" (fix Thấp-7); màu SCAN = BLUE lạnh trung tính | tài liệu **tuyệt đối tĩnh** (động là mất语义); bracket stagger依次; 1 pass/insert (card 5趟 — rút vì 2.2s, deviation); quang帯裁 trong bbox | msg pop + scan tick |
| s10 | F2 + lặng | paper-title-card | paper-title-card | `demos/typography/paper-title-card/PaperTitleCard.tsx` | F2 press từng từ (scale 1.28→1 + blur 7→0, stagger 4f/9f, `bezier(0.2,0.75,0.3,1)`) trên scrim tối thay giấy; **giữ suốt lặng**, không fade-out (R1); **bỏ underline** (câu hỏi không "chốt"); **không accent màu** — F2 trắng hết, từ nhấn chỉ đậm (không màu nào trả lời thay viewer) | press-in 1.28 sweet spot; stagger 4f/9f; xong hold tĩnh tuyệt đối 1.8–2.0s chỉ LED thở | tắt BGM ở "không?" + ù nồi rất nhỏ |

s5+s6 dùng chung card `transition-hidden-cut` với 2 style-key khác nhau = **một device tương phản**
theo script (cùng staging, hai grade), tính 1 lần cho P4 — đã ghi lý do.
s6b insert đũa lạ 0.6s mờ: hình dung thoáng qua, không thoại đè, không thành nhân vật thứ ba
(độ mờ cao, tan nhanh, không mặt/tay người).
s10 cấm tuyệt đối: bố cục hai ghế đối diện + đèn (trùng gaplai).

## 4. Staging khóa (script v2 frame 0 / s10)

- Frame 0 = cover: cận 3/4 từ trên: tay cầm đũa gắp cọng hành từ **bát canh đối diện** (nước trong,
hành xanh); foreground bát mình (còn hành) + đũa ngang; mép trái nồi cơm LED Giữ ấm đỏ son + hơi;
bg mờ: áo khoác trên ghế + cửa sổ tím. F1 đủ 3 dòng ở 1/3 trên ngay frame 0.
- s10: từ ngưỡng cửa bếp: foreground lưng mình đứng yên; trong: người ấy ngồi ăn **chưa ngẩng lên**;
ghế đối diện bày sẵn bát mình (còn hành) + đũa ngang + hơi bốc = "chỗ vẫn chờ";
hai mã màu ngang nhau: chấm LED đỏ son + vệt tuýp lạnh trên gạch. Push-in 1.00→1.04 rồi đứng im hẳn.

## 5. Prototype (`src/thuong-hay-so-bat-dau-lai/proto/`, entry riêng — không chạm Root/kit/timeline/Reel)

Copy từ SC (không import xuyên): `motion.ts` ← `demos/_fixtures/Polish.tsx` (bezier/EASE/ramp/mix/Grain)
+ `E.inOutSine` ("nhịp thói quen") + `Dust`-lite tự viết. Grammar hook抄
`SpotlightHeroCard.tsx` (pool-lock timing LOCK 34f / push / land+hold) nhưng render = SVG bếp tự vẽ
(story profile, như tiền lệ metkhong) — demo là page-screenshot, không có tableau minh họa.
Comps: `ProtoHook` (129f) · `ProtoTurn` (234f) · `ProtoEnd` (198f) · `BoardTile` (prop `shot` 1–10) ·
`DiacriticsTest` (kiểm dấu vi). Render 2026-10-16: style-hook f80 · cover f0 · style-turn f105 ·
style-end f120 · board 10 tiles (ffmpeg tile 4x3) · motion strip hook f0–59 → fps=12 tile 6x4 (24 ô).
Kết quả đọc PNG vòng 1: dấu vi đủ; caption/headline trên đáy 210px; palette đúng brief; strip mượt.
Gate D vòng 1 = 7.6 REVISE (C1/C2/C3/T1/T2/T3/t1). Render vòng 2 (2026-10-16):
cover f0 + style-hook f80 (KitHand ngón + KitBowl depth + cửa sổ mullion + scrim + sợ BLUE_DEEP + push 1.05/pulse 8%) ·
style-turn f150 (KitHand/KitBowl khớp hai nửa + converge trung tính + tag 50% + caption 1 dòng lift 70) ·
style-end f120 (người ấy cúi ăn + khung cửa jamb/threshold/bản lề + vai đầu mình rim lạnh + vệt tuýp ngang tầm LED) ·
board 10 tiles nâng cấp (s2 wide đủ đồ + s5 cửa dusk + s6 rewind band + s8 2 lớp focus + s1/s10 đủ chữ nguyên văn) ·
motion strip hook f0–59 (nhịp push/pool thấy rõ ở cỡ phone) · thumbnail 1/3 cover+end đọc đủ (sợ BLUE_DEEP đạt).
Render vòng 3 (gate-D Round 2, 2026-10-16): style-turn f160 (bát SẠCH + đĩa hành 2 nửa + neutral crossfade
base+table + chia tan + tag 50% + caption 1 dòng) · style-end f120 (phòng chạng vạng + khung cửa 200px +
lưng mình + vệt tuýp ×2 + F2 nguyên văn) · cover f0 (áo ghế vẽ lại + sợ BLUE_DEEP) ·
board nâng cấp (s2 2 bát-đũa + s5 người + s6 ngồi-yên + s8 brackets focus + s1/s10 đủ chữ) ·
strip pulse 10% (t1-carry). Tất cả PNG đã đọc full-size + thumbnail 1/3.
Render vòng 4 (gate-D Round 3, 2026-10-16): style-turn f160 (chia TAN hẳn + tag 35% + neutral crossfade cả base
lẫn bàn + bát sạch/đĩa hành) · style-end f120 (nồi tách khỏi bát + LED ×1.6 + phòng chạng vạng) ·
board T2-cont2 (s2 bếp đủ đồ + s5 người bước vào + s6 rewind rõ ngồi-yên + s7 tay-bát mini + s8 brackets +
inset mắt mình + s1/s10 chữ to) · steam đậm ×~1.7 toàn kit (W3) · strip render lại.
Chuẩn đọc board (§5, T2-cont2): tile là staging map low-fi kể ai–ở đâu–làm gì + tên card + caption zone;
scene build KHÔNG copy tile mà build từ character kit khóa + card mechanic; close-up mắt mình ở tile s8
là chỉ định insert cho build s8 (rubric story: gaze payoff cho beat "nhìn lâu hơn mọi tối").
PNG: `out/qa/thuong-hay-so-bat-dau-lai-style-{hook,turn,end}.png` · `-cover.png` (frame 0 hook) ·
`-board.png` (10 tiles → ffmpeg tile 4x3) · `-motion-hook.png` (render 2s hook 0–59f → fps=12 tile 6x4).

## 6. Deviation log (có ý thức, ghi để D/E kiểm)

D1 s3/s7/s9 bỏ overshoot (brief cấm) · D2 s4 bỏ viewfinder chrome + white-flash (tín hiệu pause = ù cắt + LED thở,
hợp bếp hơn) · D3 s7 converge về merged thay vì dừng 40% (script đòi "y hệt nhau") ·
D8 CLOSED (verdict E trong design-review Round 2: BỎ hành) — bát turn KHÔNG hành + đĩa hành cạnh bên mỗi nửa,
đúng script s7a/s9/end. ·
D9 (gate-D Round 2, t3) story ending = tĩnh tuyệt đối + lặng thuần 1.8–2.0s, KHÔNG outro-group-photo peak:
Q8 N/A cho story profile, deviation có ý thức. ·
D4 s8 bỏ "tắt" của pull-back (brief: sáng reset trung tính) · D5 s9 5 ★passes → 1 pass/insert (2.2s/insert) ·
D6 s10: scrim thay giấy, 2-accent→0-accent (trắng hết), bỏ underline + fade-out (giữ suốt lặng) ·
D7 promo-energy-arc chỉ mượn xương (product arc không hợp story) — curve §2 thay thế.

## 7. Handoff cho video-director / scene-agent

- npm deps mới: **không** (CSS/SVG thuần; không three/fiber/motion-blur).
- Root snippet (director thêm, design-agent không chạm Root):
```tsx
import {ThuongHaySoReel} from './thuong-hay-so-bat-dau-lai/Reel';
import {THS_TOTAL} from './thuong-hay-so-bat-dau-lai/timeline';
// trong <Root>: <Composition id="ThuongHaySoReel" component={ThuongHaySoReel} durationInFrames={THS_TOTAL} fps={30} width={1080} height={1920} />
```
- Timeline theo số đo thật: voice 52.42s (13 clip) + holds/gaps script v2 (~6.0s: 9 đuôi 0.35 + gaps 1.0 + lặng cuối 1.8–2.0)
= **~58.4s**, gọn trong 40–60s (dư ~1.6s so với trần; Thấp-6 cleared). Nếu voice-agent regen clip, đo lại ffprobe rồi hãy chốt timeline.

## 8. Weaknesses đã biết (cập nhật sau render proto 2026-10-16)

W1 CLOSED — voice đủ 13/13 clip (s8 5.00 · s9 6.35 · s10 4.39). Tổng voice đo ≈ 54.4s + holds/gaps ≈ 6s → ~60.5s,
chạm mép 60s (Thấp-6): timeline cắt hold trước, không cắt chữ, không tăng tốc audio.
W2 Proto hook là SVG tự vẽ (không có demo tableau minh họa trong SC) — D kiểm "đẹp không + hợp chuyện không".
W3 Bracket/scan ở s9 trên mock phone — QA kiểm "minh hoạ" + không đọc thành footage thật.
W4 Grade hội tụ s7 trên cùng SVG hai bản — scene-agent kiểm banding (thêm Grain 0.06 như demo).

Render vòng 5 (gate-D Round 4 t7, 2026-10-16): jacket hook nét blur 2px (ghế + cổ/ve/nếp/tay áo rủ) +
bàn kể chuyện (đũa thừa + đĩa hành foreground, chân trời 1040); cover f0 + style-hook f80 + motion-hook
render lại, thumbnail 1/3 đọc đủ F1 (sợ BLUE_DEEP đạt), strip sine không jitter.
Render board T2 (task-review §5 t10, 2026-10-16): label tile 2 dòng (id 64px + card 40px), notes 40px, s1 F1 80px / s10 F2 64px đủ chữ nguyên văn, icon móc chìa s2 to + 2 chìa — đọc được ở cỡ board-first, board.png render lại + đã đọc.