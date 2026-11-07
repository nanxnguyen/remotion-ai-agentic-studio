# Laundry Horror V5 — Full HD 60 FPS delivery / evidence (2026-10-25)

## Verified Google Drive final package
- Numbered folder: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN
- Final distribution MP4: https://drive.google.com/file/d/1REkgLXtROoxACwF0eFMJg9WeYA01kuZf/view?usp=drivesdk
- Thumbnail: https://drive.google.com/file/d/1cUyLiJHs6ZNOv0phL9mtkkSR7ci3s9nZ/view?usp=drivesdk
- YouTube copy: https://drive.google.com/file/d/13ME2ciwr1eYtzO18SDCbbvewHDlfiqCX/view?usp=drivesdk

Drive metadata was fetched **after upload**: 3 files are immediate children of numbered folder #18. The MP4 is 53,475,835 bytes (`video/mp4`), JPG is 1,023,071 bytes (`image/jpeg`), and publication copy is 566 bytes (`text/plain`). Permissions returned `anyone: reader` and `owner`; no permissions were changed by this production.

## Two master versions
- Distribution file SHA-256: `b0c6bdf4ba285b484138af094cf513e58a25a87f074636a63600a7e6a9896cd5` (53,475,835 bytes).
- High-bitrate chat master SHA-256: `49cff87054d31f9947b8f43ec14dca3ec12c8194e922fe7cb21fda9534402f5f` (152,738,274 bytes).
- Both are **1080×1920 / 9:16 / 60.000 sec / 60 fps / 3,600 video frames / H.264 + AAC**. The Drive copy was recompressed from master at roughly 7 Mbps after the Google Drive bridge rejected the 152 MB master. This is a separate smaller binary, not the original denied upload; output streams and entire decode were retested. `ffprobe` results, file checksums, and `ffmpeg -v error -f null` checks are in local artifact manifest.

## Voice provenance and sync
- **Genuine Vbee Batch** voice code: `hn_male_phuthang_stor_24k-stl` (Anh Khoi).
- Successful GitHub Actions run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40172785416 ; artifact ID `12590174732`.
- All 16 MP3 source files re-hashed successfully against `measured-timeline.json` and placed on the timeline; last utterance ends 59.872 seconds. No audio was truncated.
- Original Vbee dialogue is overlaid with locally synthesized original ambience and frame-driven foley, not replaced by eSpeak. Mix peak measured -3.4 dBFS pre-AAC. No auto-publishing was attempted.

## Story-critical visual action proof (cinematic 2.5D)
- 0–2: unplugged plug moves away from power socket while washer drum remains rotating.
- 10–14: customer name **Cô Thu** typeset correctly on physical receipt.
- 26–30: reflected face appears ahead of the terrified woman's reaction.
- 30–34: a visible finger pushes STOP and drum speeds up in the background.
- 34–38: actual pictured hand grips / pulls a washer latch, LOCKED stays lit.
- 38–42: dark waterline rises vertically through time with changing ripples.
- 42–48: phone screen changes from idle to recording of trapped Thu behind washer glass.
- 48–52: the reflection disappears; 52–56: the second woman walks into the rainy doorway; 56–60: Thu is visibly trapped inside the washer.
- A manually inspected 14-moment output contact sheet and 10 event-specific before/action/after checks were sampled from the actual final MP4; frame samples have measurable pixel changes and the native subtitle layer is present.

## Honest scope of QA
- PASS: video/audio codec integrity, Full HD vertical 60fps, genuine Vbee source checks, duration/caption timing preflight, full media decode, selected P0 visual evidence, Google Drive binary and media readback.
- **Not equivalent to native Full HD footage**: scenes originate from some 540×960 storyboard-derived artwork and other ~941×1672 commissioned/generated stills, composited at 720×1280 before final 1080×1920 upscale. It is cinematic **2D/2.5D motion**, not real filmed human acting/lip-sync. There are deliberate physical graphic composites to evidence narrated action.
- **Repo canonical full review gates (A/content/audio/D/motion/E/B/C) / Remotion npm verify / visual tests / pipeline audit were not run on this local FFmpeg export.** Do not claim this repository-native pipeline passed or substitute automated frame differences for human video review.
- A complete full-audio **human listening** review is not recorded; this is a valid technical deliverable with available local QA evidence, not an assertion of completed unaudited gates.
- No GitHub Releases or YouTube/TikTok public posting; GitHub stores provenance and production docs, Drive stores the film and three publication assets.

## Local sources
- `build_v5_actions.py`: 16 scripted shots, after-action visual composites, 0.45s fades, native Vietnamese typography.
- `mix_foley_v5.py`: original SFX layer on Vbee WAV.
- `finalize-master.sh`: 1080p60 H.264/AAC master build and technical preflight.
- `final-qa.py`: hashes, real Vbee source, metadata and sample frame checks.

The existing PR #70 contains storyboards, character bible, Vbee Batch runner and prior QA records. This report supersedes V4 review metadata, not the approved voice/source checksum record.
