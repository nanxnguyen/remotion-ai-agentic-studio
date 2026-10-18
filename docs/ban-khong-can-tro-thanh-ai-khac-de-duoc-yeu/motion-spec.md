# Motion Spec: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Profile:** story
**Date:** 2026-10-18
**From:** join-notes.md, timeline.ts, design-spec.md, content-pack.md
**Motion agent:** motion-agent

---

## Global Parameters
| Parameter | Value |
|---|---|
| FPS | 30 |
| Duration | 1767 frames (58.9s) |
| Shot count | 9 |
| Composition | BanKhongCanTroThanhAiKhacDeDuocYeuReel |

---

## Shot Specifications (per shot + boundaries)

### s1 (frames 0-191): "Ban tung xoa mot tin nhan..."
- Voice: frames 0-161 (5.4s), Hold: frames 162-191 (1.0s)
- Entrance: text translateY 24->0 over 20f; art translateY 36->0 over 22f
- Micro-motion: breathe scale 1+sin(f/24)*0.008
- Accent highlights: "xoa" (frame ~15): scale 1.05; "noi nhieu" (frame ~45): scale 1.05
- Delete key pulse on "xoa": amber glow 0.8->1.0->0.8 over 8f
- Caption timing: chunk 1 frame 10, chunk 2 frame 35
- Boundary -> s2: Hard cut (instant)

### s2 (frames 192-404): "Tung gia vo thich mot bo phim..."
- Voice: frames 192-380 (6.3s), Hold: frames 381-404 (0.8s)
- Split screen: L idle, R animated (accent color)
- Accent highlights: "gia vo" (frames ~210, ~240): scale 1.05 each; "chuyen noi" (frame ~280): scale 1.05
- Boundary -> s3: Hard cut

### s3 (frames 405-587): "Tung bao minh khong buon..."
- Voice: frames 405-551 (4.9s), Hold: frames 552-587 (1.2s)
- Smile crack on "khong buon" (frame ~420): mouth line -> crack path over 15f
- Accent: "khong buon" flat; "nhay cam" (frame ~460): scale 1.05 warm
- Boundary -> s4: Cross-dissolve 15f (frames 573-587)

### s4 (frames 588-812): "Lau dan, ban tro nen rat gioi doan..."
- Voice: frames 588-785 (6.6s), Hold: frames 786-812 (0.9s)
- Montage: 3 cuts at frames 600, 640, 680. Mirror unfamiliar at 720.
- BGM crossfade: bgm-main -> bgm-turn frames 588-633 (1.5s)
- Accent: "gioi doan" (frame 610): sharp 1.05; "dot hoi minh" (frame 670): quiet 1.0
- Boundary -> s5: Hard cut (mirror break)

### s5 (frames 813-959): "Nhung co mot cau hoi ban lai kho tra loi."
- Voice: frames 813-929 (3.9s), Hold: frames 930-959 (1.0s)
- Question mark build: syllable-by-syllable, 5f apart from frame 813
- Accent: "kho tra loi" (frame 848): scale 1.05 pause
- sfx-heartbeat: frame 853 on "kho", -18 dBFS
- Boundary -> s6: Cross-dissolve 15f (frames 945-959)

### s6 (frames 960-1103): "Rot cuoc minh that su thich dieu gi?" (s6a+s6b)
- Voice: frames 960-1058 (s6a 54f + s6b 45f = 99f/3.3s), Hold: frames 1059-1103 (1.5s)
- s6a: breathy, eye reflection appears frame 965
- Gap s6a->s6b: 0.8s silence (frames 1014-1037), sfx-breath at 1014
- s6b: vulnerable, question mark in eye pulses
- Accent: "that su" (980): 1.05; "thich" (1045): 1.08 hold
- Boundary -> s7: Cross-dissolve 15f (frames 1089-1103)

### s7 (frames 1104-1352): "That la, khi co gang..."
- Voice: frames 1104-1322 (7.3s), Hold: frames 1323-1352 (1.0s)
- Hands cupping light: oval path 1104-1322, 16 particles drift outward
- Particle labels: "thich", "ghet", "mo uoc", "so hai" - FitText min 28px, staggered 1130-1160
- sfx-light-shimmer: frame ~1180 on "giau di", -18 dBFS
- Accent: "co gang" (1120): 1.05; "giau di" (1180): 1.03; "chinh minh" (1240): 1.05
- Boundary -> s8: Cross-dissolve 15f (frames 1338-1352), BGM crossfade starts

### s8 (frames 1353-1529): "Mot moi quan he co the can su dieu chinh tu ca hai."
- Voice: frames 1353-1499 (4.9s), Hold: frames 1500-1529 (1.0s)
- Two figures approach from edges to center, stop distinct (don't merge)
- BGM crossfade: bgm-turn -> bgm-main frames 1353-1398 (1.5s)
- Accent: "dieu chinh" (1370): 1.05; "ca hai" (1430): 1.05
- Boundary -> s9: Hard cut (wish realization)

### s9 (frames 1530-1766): "Nhung mong rang trong nhung dieu ban thay doi..."
- Voice: frames 1530-1706 (5.9s), Hold: frames 1707-1766 (2.0s)
- Expanding glow: radius 0->400 over voice, opacity 0.12
- sfx-warm-resolve: frame ~1550 on "van con cho", -18 dBFS
- Accent: "van con cho" (1550): 1.05 pause; "con nguoi that" (1620): 1.05
- Ending: silent hold 1707-1766, BGM fade out 2s

---

## Transition Summary
| Boundary | Type | Duration | Notes |
|---|---|---|---|
| s1->s2 | Hard cut | 0f | - |
| s2->s3 | Hard cut | 0f | - |
| s3->s4 | Cross-dissolve | 15f | Emotional turn |
| s4->s5 | Hard cut | 0f | Mirror break |
| s5->s6 | Cross-dissolve | 15f | Stillness -> question |
| s6->s7 | Cross-dissolve | 15f | Question -> paradox |
| s7->s8 | Cross-dissolve | 15f | Paradox -> healthy |
| s8->s9 | Hard cut | 0f | Model -> wish |

---

## Motion Evidence (machine-readable)
{
  "fps": 30,
  "durationFrames": 1767,
  "shotStartFrames": [0, 192, 405, 588, 813, 960, 1104, 1353, 1530],
  "animatic": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-animatic.mp4",
  "hook": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-hook.png",
  "highlight": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-highlight.png",
  "boundaries": [
    {"frame": 192, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-192.png"},
    {"frame": 405, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-405.png"},
    {"frame": 588, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-588.png"},
    {"frame": 813, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-813.png"},
    {"frame": 960, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-960.png"},
    {"frame": 1104, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-1104.png"},
    {"frame": 1353, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-1353.png"},
    {"frame": 1530, "strip": "out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-1530.png"}
  ]
}

---

## Acceptance Checks
- [ ] motion-spec.md covers every shot and boundary
- [ ] motion-evidence.json matches timeline.ts SPANS
- [ ] Full animatic rendered at actual voice timing
- [ ] Hook strip (2s @ 12fps) shows entrance, micro-motion, accent highlight
- [ ] Highlight strip (s5/s6 boundary) shows cross-dissolve + question mark build
- [ ] All 8 boundary strips decode and show transition type
- [ ] Continuity: position/scale/direction/speed consistent
- [ ] Reading time: captions on screen >= 1.5s per chunk
- [ ] Accent sync: highlight on accent word frame +/-3f
- [ ] No Math.random/Date.now - all deterministic from useCurrentFrame
