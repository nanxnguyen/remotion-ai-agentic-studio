# Design Spec (Updated post Builder-Check): Đò Âm V2 — 2.5D Multi-Layer Puppet, Packaging & Shorts Funnel

- **Date:** 2026-11-21
- **Project:** `truyenma-studio/projects/do-am-chiec-dep-thu-chin`
- **Voice & Timing Source of Truth:** `input/voiceover.mp3` (`389.799s`), `timeline/beats.json` (`117` beats), `timeline/visemes.json` (`1954` visemes), total video duration `390.80s` (`1920x1080 @ 24fps`, `amhon`).

## 1. Intent, Goals, Non-Goals
- **Why:** V1 (`do-am-chiec-dep-thu-chin-final.mp4`) already has voice alignment, scare pacing (`0` lint errors/warnings), SFX/music `hush -> hit`, and readable timed captions, but visually relies on flat single-layer pan/zoom over 12 static images and misses 4 story-critical visuals.
- **Goals:**
  1. Upgrade visual presentation to **2.5D Multi-Layer Puppet** inspired by top 2D horror channels (*Wansee*, *MJV*, *Llama Arts*, *Truyện của Emma*): layered parallax (`bg / mid / fg`), deterministic breathing/blinking/eye-saccades, swinging practical oil-lamp lighting, animated water-ripple reflections, and voice-synced lip-movement (`visemeAt(globalT, ...)` reading `E.visemes`) on direct dialogue lines.
  2. Fix the **4 missing/inconsistent story scenes**:
     - `03_prop_dep_le_v2.png`: **4 pairs** of adult sandals + **1 small blue child sandal** stitched with red thread. Replaces `03_prop_dep_le.png` on all shots EXCEPT `s108` (*"Chiếc dép trẻ con dưới sàn cũng không còn"*).
     - `08b_nuoc_phan_chieu_5_nguoi.png`: matching 2D comic art showing the **5th small wet crouched silhouette** reflected beside Minh in black water (replaces `08_bg_mat_song_toc.png` + mismatched procedural `H.ghost()` on `s061–s066`).
     - `13_climax_ao_mua.png`: dynamic climax confrontation (black raincoat figure wrapping *khăn rằn* around Minh while boatman slams the bamboo pole into water), used on `s097–s104`.
     - `14_khoang_do_trong.png`: empty wooden boat interior with only Minh and the stern boatman silhouette (zero phantom passengers), used on `s108` (*chiếc dép cũng không còn*) and `s126–s128` (*"Đêm qua tôi chỉ chở mình cậu"*, removing `fx.solo_boat: true`).
  3. Upgrade **Thumbnail V2** (`15_thumb_v2_bg.png` + `scenes/shots/thumb.js`) rendered via `tools/make_thumb.py` -> `out/thumbnail_1.png` -> copied to `out/thumbnail-youtube.png`, verified at `320px` width.
  4. Produce **3 vertical YouTube Shorts (`1080x1920`, `< 60s`)** in `truyenma-studio/projects/do-am-short-1`, `do-am-short-2`, `do-am-short-3`, slicing both exact audio and re-timed `beats.json` + `visemes.json`, passing `shot_lint.py --strict` and `scare_lint.py --strict`.
  5. Keep all unit tests (`npm test`), linters, `ffprobe` QA, visual inspections, and Google Drive folder `57` delivery (always using real filename `do-am-chiec-dep-thu-chin-final.mp4`, never `video-final.mp4`).
- **Non-Goals:**
  - Do NOT alter `input/voiceover.mp3` (`389.799s`) or claim guaranteed "1 million views".
  - Do NOT auto-publish to YouTube/TikTok or widen Drive sharing permissions.

## 2. Builder-Check Resolutions (Authoritative Contracts)
1. **Shared Engine Module & Node Testability:**
   - Place `puppet2d.js` at `truyenma-studio/engine/puppet2d.js` (NOT inside `projects/.../scenes/` so `render.mjs` does not treat it as a shot file, and all 4 projects—long-form + 3 Shorts—import `/engine/puppet2d.js`).
   - Keep pure math & deterministic helper functions (`puppetFrameState`, `computeCoverTransform`, `waterSliceOffsets`, `dialogueMouthOpen`, `isBlinkFrame`, `resolveShortsSplices`) free of `document` / DOM calls so `tests/unit/puppet2d.test.mjs` runs natively in Node (`npm test`) using `mockCtx()`.
   - Also update `plugins/truyen-ma-2d-studio/skills/make-horror-video/kit/` if `engine/puppet2d.js` is added, OR keep `engine/puppet2d.js` synced cleanly and run `update_verify_kit.py` if needed (Decision: keep `puppet2d.js` inside `truyenma-studio/engine/puppet2d.js` and `truyenma-studio/tests/unit/puppet2d.test.mjs`, keeping the packaged `.plugin` kit hashes untouched unless requested later).
2. **`visemeAt` Contract (`engine/core.js:49-52`):**
   - `visemeAt(globalT, from, to)` takes `globalT` first and reads `E.visemes` populated by `player.js`. Never pass `(visemes, globalT)`.
   - Every Short (`do-am-short-1/2/3`) slices both `timeline/beats.json` AND `timeline/visemes.json` with identical segment offsets so `E.visemes` aligns 100% with the spliced audio.
3. **Unified 16:9 ↔ 9:16 Coordinate Contract:**
   - `computeCoverTransform(imgW, imgH, stageW, stageH, pad, focusX = 0.5)` maps normalized image coordinates `(nx, ny)` in `[0..1]` to stage coordinates via `mapX(nx)` and `mapY(ny)`.
   - All per-asset puppet annotations (`lamp: [nx, ny]`, `eyes: [[nx, ny, rx, ry], ...]`, `mouth: [nx, ny, w, h]`, `waterY: ny`) are normalized `[0..1]`, working accurately in both `1920x1080` and `1080x1920` vertical crops.
4. **Thumbnail V2 Separation:**
   - Place `thumb` and `thumb2` shots in `scenes/shots/thumb.js` (with `15_thumb_v2_bg.png` preloaded only in `thumb.js`) so the main video `main.js` does not load thumbnail-only assets.
5. **Shorts Audio Splicing & `scare_lint --strict` Compliance:**
   - No leading silence padding (so `hook` starts at `t=0` and `s001.end <= 4.0s`).
   - Extend cut endings cleanly to `speechEnd` (`137.54s` for Short 1, `192.44s` for Short 2, `263.57s` for Short 3) so no final word is clipped.
   - Append a `2.8s` ending slate (`beat: "cta"` with `fear: 0.85` / `0.90` or adjusted early `fear` curve `[0.45..0.60]` rising to `[0.85..0.95]` in final third) AND ensure a `"reveal"` or `"twist"` beat lands at `>= 0.75 * dur` in all 3 Shorts so `shot_lint --strict` and `scare_lint --strict` pass with `0 errors, 0 warnings`.
   - Fix `knock` SFX timings in Short 3 relative to the shot containing the knocks (`0.1s`, `0.9s`, `1.7s` inside the knock shot).
6. **Explicit Output Filenames (`audio/mix.py`):**
   - Always pass `--out projects/<slug>/out/<slug>-final.mp4` to `audio/mix.py` (producing `do-am-chiec-dep-thu-chin-final.mp4` and `do-am-short-{1,2,3}-final.mp4`).

## 3. Architecture & Parallel Tracks (`@Swarm`)

- **Worker 1 (`illustrator`):** Generates `03_prop_dep_le_v2.png`, `08b_nuoc_phan_chieu_5_nguoi.png`, `13_climax_ao_mua.png`, `14_khoang_do_trong.png`, and `15_thumb_v2_bg.png` (`1920x1080` PNGs matching the exact 2D Vietnamese horror comic style). *(Fallback if image quota hits 429 again: deterministic high-craft Python Pillow compositing + masking from the 12 verified base PNGs so no track ever blocks.)*
- **Worker 2 (`puppet-dev`):** Implements `truyenma-studio/engine/puppet2d.js` + `truyenma-studio/tests/unit/puppet2d.test.mjs`, updates `projects/do-am-chiec-dep-thu-chin/story/shots.json`, `scenes/shots/main.js`, and `scenes/shots/thumb.js` (V2).
- **Worker 3 (`shorts-packager`):** Creates the 3 vertical `9:16` Shorts projects (`do-am-short-1`, `do-am-short-2`, `do-am-short-3`) with spliced MP3s, re-timed `beats.json` & `visemes.json`, `story/shots.json`, `scenes/shots/main.js`, `scenes/shots/thumb.js`, passing strict linters and producing 9:16 covers.
- **Coordinator + Reviewers:** Runs `npm test`, linters, renders long-form V2 + 3 Shorts MP4s, inspects `ffprobe` & visual QC contact sheets, runs `superpowers-code-reviewer`, and updates Drive folder `57` (`do-am-chiec-dep-thu-chin-final.mp4`, `thumbnail-youtube.png`, `youtube-title-description.txt`).
