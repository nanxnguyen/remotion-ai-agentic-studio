# Luxury Cinematic — V8 typography design + release manifest

**Film:** Ba Tiếng Gõ Trong Đêm — V8 Luxury Cinematic (55s Shorts)
**Revision of:** approved V7, preserving its genuine Vbee 13-line mix.
**Video destination:** Google Drive numbered folder #20 (same film), NOT GitHub Releases.
**Drive video:** https://drive.google.com/file/d/1NwO7tUh00I-UJ9FsYid-RvH_AHh8s7yj/view?usp=drivesdk
**File:** Ba_Tieng_Go_Trong_Dem_V8_LUXURY_VBEE_55s.mp4
**Media:** 55.000s, 720x1280 portrait, 30 fps, H.264/AAC, 24,268,027 bytes
**SHA-256:** cba1b449baf54feab39300796b7b7ac6c0ddcbde22bac4e4a03b7d0a0ec547c1

## Native typography system (per approved owner prompt)

**Palette for THIS movie's requested style only:** black `#0B0D10`, ivory `#F5F1EB`, champagne `#E7BB75`. Do NOT override Ray plugin's default adaptive color palette for other films.

**Scene Headline (top):** two distinct narrative setup lines, NOT verbatim narration; first line small ivory, second larger/heavier champagne. Subtle black translucent card with 1px champagne outline, soft fade / gentle 7px vertical lift. Main screen card x=56, y=155, w=608, h=132 on 720x1280. Scene headlines change on the 16 approved shot boundaries [0,3,6,9,12,16,19,22,26,29,32,36,40,44,48,52,55].

**Narration Subtitle (bottom):** Vbee text only, not headline prose; maximum two lines, ivory text, semi-transparent charcoal card, slim champagne vertical rule, labeled `LỜI KỂ`. Card x=54 y=957 w=612 h=140. Render each timed subtitle cue independently, short 0.15–0.2sec fades, with slight 6px lift. Avoid masking faces, telephone evidence and the coffin.

**Time alignment:** Preserve V6 real Vbee measured speech cues through 51.75s, replace the final cue with the V7 original authentic MP3 generated on GitHub Actions run 40210254658 (spoken: “Thả tim... đăng ký... trước khi nó gõ cửa nhà bạn.”); start 51.82s, duration 3.025958s. Split final subtitle into 2 independently timed phrases. Subtitle phrase boundaries are approximate text-weight interpolation within the measured original MP3, not phoneme forced alignment.

**Clean footage / motion:** Use independent 16 clean vertical scene assets and deterministic smooth eased 2.5D camera movement; visual motion, rain and scene evidence carried forward. Soft 0.42s image dissolves, 0.38s headline fade, no jarring glitch/shake, no review timecode, shot number, border, progress rail, or storyboard image crop. Preserve V7 original 48k stereo WAV voice/foley/music mix unchanged.

## QA evidence

- ffprobe: MP4 has both H.264 720x1280 @ 30fps and AAC; 55.000 sec; 24,268,027 bytes.
- FFmpeg full decode: succeeded with no reported errors.
- Native render: all 16 scene cards + mixed audio produced in the container, 16-scene QA contact sheet visually inspected.
- Known limit: No native speech phoneme forced alignment or full canonical GitHub repo pipeline run on this local render. This is cinematic 2D/2.5D, not natural actor lip-sync.
- Original V6/V7 versions remain in Drive for comparison.

Do not mark the repository's canonical pipeline audit as passed without independent tests. Video binaries stay on Google Drive only.
