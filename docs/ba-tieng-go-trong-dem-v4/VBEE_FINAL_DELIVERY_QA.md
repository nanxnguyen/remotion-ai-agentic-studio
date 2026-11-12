# Ba Tiếng Gõ Trong Đêm V4 — genuine Vbee picture-sync and Google Drive delivery

Date: 2026-10-25 (Asia/Ho_Chi_Minh)

## Deliverable
- **Film:** [Watch actual final MP4 on Google Drive](https://drive.google.com/file/d/1aQtsGLikjmDyWXSQGjY_7OCtYwYc6pXb/view?usp=drivesdk)
- **Folder:** [20. Ba Tiếng Gõ Trong Đêm](https://drive.google.com/drive/folders/1OFuWJi4td_cg3qnP2YwF6gGb9L3H5-VV)
- **Thumbnail:** [Original clean vertical cover](https://drive.google.com/file/d/1QwoEk2x63M1RhLZyJTCU2aRAl0iu8VVA/view?usp=drivesdk)
- **Copy:** [YouTube title and description](https://drive.google.com/file/d/1fba9O_bwBmeBgXHe9e1nJkuLga5x59TC/view?usp=drivesdk)

All three files were read back from Google Drive with correct parent and MIME type. File sizes: MP4 4,411,839 bytes; cover 348,386 bytes; copy 620 bytes.

## Authentic provider and exact synchronization
- Verified Vbee Batch main run: [40183288817](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40183288817), **12 original MP3s** measured by FFprobe, batch code `hn_male_phuthang_stor_24k-stl`.
- Verified separate female dialogue run: [40183521139](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40183521139), 5 mother / imitated-mother MP3s, batch voice `hn_female_ngochuyen_full_48k-fhg`. Female clips override original male dialogue at scene IDs 3, 4, 10, 11, 12.
- Per-scene source-cue manifest: [vbee-voice-cues.json](vbee-voice-cues.json). Original MP3 provenance and SHA-256s are retained in the Actions artifacts (14-day retention).
- Actual speech position / intended visual slot (all **12 / 12 fit**, verified by audio duration and synchronization arithmetic):

| Cue | Character | Actual MP3 in final (s) | Matching picture slot (s) |
|---|---|---|---|
| 1 | Entity | 2.220–4.332 | 2–6 |
| 2 | Narrator | 6.220–8.140 | 6–9 |
| 3 | Mother (Vbee female) | 9.550–13.050 | 9–14 |
| 4 | Imitated mother (Vbee female) | 18.220–21.146 | 18–22 |
| 5 | Message narration | 22.220–23.924 | 22–26 |
| 6 | Huy | 26.134–27.550 | 26–28 |
| 7 | Entity | 28.220–30.404 | 28–32 |
| 8 | Huy | 37.220–39.212 | 37–42 |
| 9 | Huy | 42.220–44.188 | 42–46 |
| 10 | Mother (Vbee female) | 46.150–48.449 | 46–49 |
| 11 | Mother (Vbee female) | 49.250–51.105 | 49–52 |
| 12 | Mother (Vbee female) | 52.500–54.590 | 52–55 |

## Render and QA evidence
- **Runtime:** 55.000 seconds, 540 × 960, 24 FPS, H.264 + AAC.
- Full FFmpeg media decode: PASS; stream/timecode checks by FFprobe: PASS.
- Export uses independent video shots, gentle camera motion/crossfades, native Vietnamese subtitles, knocks/rain/creak SFX, real original Vbee clips; eSpeak temporary preview voice was completely removed from the final soundtrack.
- At 19 sampled timestamps, review showed the storyboard **review timecodes** and panel boundaries do not appear in the final. The diegetic red LED **2:17 AM** in the opening is a clock in the story, not a video timecode.
- Source storyboard lettering contamination in the final coffin shot was removed by a clean original coffin-only crop and darkened lower composition.
- **Local exported MP4 SHA-256:** `0953d08b3133655c4575745709c4958fdd597e049123ba37746da7e0d49f60bf`; Drive confirms byte size and MIME but remote checksum readback was not available. No unsupported claim of Drive-byte checksum comparison.
- **Visual method:** cinematic 2D/2.5D motion assembled from cinematic source frames, not independent natural actor performances or verified lip-sync.
- 12/12 clip-within-picture-slot arithmetic PASS is **not** a blanket claim of subjective/perceptual 100% lip-sync; actual mouth phoneme sync is not present.
- Canonical Remotion `npm run verify` / full Ray production gates not run on this local Python picture/FFmpeg render; CI on production PR may be red. Do not misrepresent these gates as passed.
- No GitHub Release was created/uploaded (latest user's Drive-only media policy); GitHub keeps the production script/manifest and QA documentation.

## Audio / picture source
The MP4 was produced in the ChatGPT execution container from previously approved V4 12-panel review art using clean separated images and a deterministic PIL+FFmpeg renderer, then uploaded to the user Google Drive folder. Exact local voice alignment report and QA contact frames were produced; PR holds provider manifests and source workflows, while the edited film itself is archived on Drive.
