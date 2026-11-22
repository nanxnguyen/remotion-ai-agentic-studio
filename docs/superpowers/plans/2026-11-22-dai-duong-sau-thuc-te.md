# Dai Duong Sau Thuc Te Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 65-75s 9:16 (`1080x1920`, `30fps`) Remotion documentary-style Shorts demo (`dai-duong-sau-thuc-te`) combining real Public Domain NOAA/Wikimedia deep-sea squid imagery with Tò Mò 1-style depth gauge HUD, vertical gold-accented lower-thirds, and a 2D ocean-layers infographic.

**Architecture:** Scaffold a new isolated video slug `src/videos/dai-duong-sau-thuc-te/` registered in `src/videos/registry.ts`. Download verified Public Domain / CC0 deep-sea media assets into `public/videos/dai-duong-sau-thuc-te/` (or `public/images/...`), build reusable 9:16-safe HUD components (`DepthGaugeHud`, `GoldLowerThird`, `MarineSnowLayer`, `KenBurnsMedia`), build 5-6 purposeful scenes matching the 65-75s retention arc, and synthesize local ambient BGM + SFX WAVs so the demo renders and plays cleanly even before GitHub Actions Vbee TTS synthesis.

**Tech Stack:** Remotion 4.0.534, React 19, TypeScript 5.9, Python 3.12 (asset download & procedural WAV SFX/BGM), FFmpeg/FFprobe, Vitest.

**Spec:** Approved user design (Option A: Real open-source deep-sea media + Remotion HUD/Infographic, 9:16 `1080x1920`, 65-75s demo).

## Global Constraints

- `1080x1920` (9:16), `30fps`, deterministic frame-based animation only (no `Math.random()`, no `Date.now()`).
- Keep `src/videos/dai-duong-sau-demo/` untouched.
- Register via `src/videos/registry.ts` only (never directly in `Root.tsx`).
- Mobile safe-area compliance for YouTube Shorts & TikTok (keep HUD and lower-thirds clear of bottom 260px and right-edge action icons).
- Run `npm run verify` and render + inspect `video-preview.mp4` frames before completion.

## Review Focus

- Missing or broken `staticFile()` paths causing Remotion render failure — verified via `npm run assets:validate` and actual render.
- HUD / Lower-third overlapping TikTok/Shorts UI zones — verified by inspecting extracted frames.
- Audio clipping or missing audio streams — verified via `ffprobe` and `SfxTrack`/`BackgroundMusic` volume levels.
- Timeline frame-count mismatch with scene durations — verified via `timeline.ts` unit test.
- Lint/format/typecheck regressions — verified via `npm run verify`.

---

### Task 1: Scaffold video slug and download real NOAA / Wikimedia deep-sea media

- [ ] Run `npm run video:new -- --slug dai-duong-sau-thuc-te --id 22-DaiDuongSauThucTeReel --scenes 5`
- [ ] Download verified Public Domain / CC0 images from Wikimedia Commons / NOAA for:
  1. `magnapinna.jpg` (Bigfin squid *Magnapinna* ROV capture)
  2. `cranchiidae.jpg` (Glass squid *Cranchiidae* transparent body)
  3. `vampyroteuthis.jpg` (Vampire squid *Vampyroteuthis infernalis*)
  4. `reef-surface.jpg` (Sunlit shallow ocean / reef squid)
- [ ] Generate procedural ambient deep-sea BGM (`bgm-abyss.wav`) and transition SFX (`whoosh.wav`, `sonar-ping.wav`, `abyss-hit.wav`) into `public/audio/dai-duong-sau-thuc-te/`.

### Task 2: Build Tò Mò 1-style 9:16 HUD & Media Kit (`kit.tsx`)

- [ ] Implement `DepthGaugeHud` (vertical scale `0 → 200m → 1.000m → 4.000m → 6.000m → 11.000m` with animated yellow indicator dot + arrow, positioned in top-right safe area).
- [ ] Implement `GoldLowerThird` (dark translucent card with `#f59e0b` vertical left bar, species/zone title + subtitle, positioned above bottom 280px safe area).
- [ ] Implement `KenBurnsMedia` (smooth frame-driven pan/zoom on `staticFile()` images with subtle vignette & deep-water color grade) and `MarineSnowLayer` (deterministic floating particles).
- [ ] Implement `OceanBuildingInfographic` (2D cross-section *"ĐẠI DƯƠNG = MỘT TÒA NHÀ KHỔNG LỒ"* with animated water surface and depth tiers `0–200m`, `200–1.000m`, `1–4km`, `6km+`).

### Task 3: Author 5 retention-paced scenes, timeline, and Reel (`65s` / `1950 frames`)

- [ ] `Scene01` (0–5s, 150f): Hook — *Magnapinna* real ROV image + dramatic zoom + `"Càng xuống sâu, loài mực càng giống sinh vật ngoài hành tinh?"`
- [ ] `Scene02` (5–18s, 390f): Infographic — *"ĐẠI DƯƠNG = MỘT TÒA NHÀ KHỔNG LỒ"* + diving into `0–200m` sunlit zone.
- [ ] `Scene03` (18–33s, 450f): `200–1.000m` Twilight Zone — **Mực thủy tinh (*Cranchiidae*)** real NOAA photo + glass-transparency callout.
- [ ] `Scene04` (33–49s, 480f): `1.000–4.000m` Midnight Zone — **Mực ma cà rồng (*Vampyroteuthis*)** real photo + bioluminescence & low-oxygen adaptation.
- [ ] `Scene05` (49–65s, 480f): `4.000–6.000m+` Abyssal Zone — **Mực vây lớn (*Magnapinna*)** full reveal + survival payoff.

### Task 4: Add tests, verify, render MP4, and visually inspect frames

- [ ] Add unit test `tests/videos/dai-duong-sau-thuc-te.test.ts` validating timeline sum, `1080x1920`, `30fps`, and scene sequence bounds.
- [ ] Run `npm run format && npm run verify`.
- [ ] Render `dai-duong-sau-thuc-te` to MP4 in scratch/out and extract contact sheet via `ffmpeg` to visually inspect with `read_file`.
