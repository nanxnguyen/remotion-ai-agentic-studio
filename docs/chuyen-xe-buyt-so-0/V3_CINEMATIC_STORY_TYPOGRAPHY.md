# Chuyen Xe Buyt So 0 — Cinematic Story Typography V3

## Scope and final render

- User-approved 60-second story, unchanged narration and plot.
- **60.000 s**, vertical **720 x 1280** at **24 fps**, **1,440 frames**.
- Verified streams: **H.264 video** and **AAC audio**.
- Local final MP4: `chuyen_xe_buyt_so_0_V3_cinematic_story_typography_60s.mp4`.
- Actual size: **28,277,177 bytes**; SHA-256: `8cdcd098ebc349b4cd116609c935a6a9d6fe1a70e82cf379d45599532294f84c`.
- Original Vbee Anh Khoi narrator and genuine Vbee female grandmother dialogue **retained unchanged from V2**. V3 is a picture/typography-only revision, not a re-performed voice synthesis.
- Actual motion: 2D keyframed illustration pans and cinematic dissolves; **not independent AI video acting**.

## Typography system

- Fonts: Noto Sans Display Condensed ExtraBold and Vietnamese-capable Noto Sans Bold. Never distribute font binaries in the source ZIP.
- Main text **warm ivory** (`#F6F3E9`); suspense accent **signal red** (`#FF4C53`); discoveries/commands **amber** (`#F4C575`).
- Upper micro-series identifier + context chapter + dynamic story headline. Thin editorial rule rather than heavy subtitles-card backgrounds.
- Lower subtitle: single compact **narrative cue**, not the repeated text from top headline. Maintain no more than 2 lines in phone-safe area.
- Exactly **20 timed typography beats for 10 scenes**, anchored to the previously measured real Vbee speech windows (manifest from V2).
- Captions ease in, lift by at most ~20 px, fade out at their relevant line end. No bouncing, random rotation or uncontrolled shakes.
- 3 dramatic bells receive restrained **01 → 02 → 03** cue markers; the final ticket payoff gets a cinematic focal graphic **'LUOT VE CON LAI: 0'**.
- Do not cover actors' eyes, facial reactions, or the fatal red ticket with typesetting. Color accents should deliver meaning, not constant decoration.
- Never claim frame-by-frame lip sync or independent character motion unless generated and actually verified.

## Output and reproduction

The final rendered MP4, real original Vbee MP3 tracks, sound mix, fonts-independent Python renderer, source art, voice beat map and QA contact sheet are delivered together as a project ZIP in ChatGPT. They are **not** automatically hosted on GitHub.

Python runtime: Pillow, OpenCV, NumPy and FFmpeg. Rebuild the picture with `python render_v3.py --preset veryfast` and mux the included audio mix as described in the delivered project README. Reconstructed binaries may have different checksums due to encoder settings.

## Release and QA policy

- Verified local/chat MP4 exists and was probed; this does **not** count as a draft GitHub Release asset.
- `github_release_uploaded=false`. The container does not have an authenticated `gh` CLI. Until a real binary asset is uploaded using the repository's `scripts/archive-local-final-video.sh` or `.github/workflows/archive-finished-video.yml`, there is **no verified GitHub MP4 download URL**.
- Source editing/rendering for this V3 was performed in the chat container, not in the repository's registered Remotion composition; repository-wide verify/visual tests and pipeline audit were not executed. These are outstanding gates if this production is brought into the canonical Remotion registry.
