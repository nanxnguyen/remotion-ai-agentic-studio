# QA, versioning and delivery contract

## Checklist, in order

**Opening hook gate (REQUIRED):** first 1–4 seconds must contain an original viewer challenge, precise dilemma or compelling curiosity that is paid off in the video. Compare the spoken line AND first-second action to 10 most recent accessible intros, never reuse the same sentence across episodes, and store the selection and real Vbee-measured duration in the `intro_hook`/hook ledger. `scripts/check_hook.py` flags mechanical exact/near duplicates and timing/visual metadata gaps, but manual editorial review must validate true idea uniqueness and accurate psychology. On missing previous history mark `INCOMPLETE`; on unverified audio/visual duration mark `REVIEW`; on recycled or misleading hook rewrite before publication.

**Audio + meaning**: correct actual Vbee voice/code, original MP3 with hash, sample rate/duration measured; scripts and spoken captions match verbatim, punctuation/accents correct; inspect note-to-voice sample timing, no unintentional silence >0.65s, music under speech and no harsh cutoff. If no human listening, do not say 100% or FINAL.

**Visual**: use exported MP4 for snapshots, 0s, 1s, 3s, each scene boundary, last 6s, and CTA; check 360×640 phone scale, continuous limb and prop attachment, actual motion (not just slides), captions not covering character/YouTube overlay, no counters exceeding total, complete final moment and legible thumbnail.

**Technical**: ffprobe duration (must match intended real audio plus purposeful outro), 1080×1920, 30/60 CFR, h264 yuv420p, AAC stereo 48k, faststart. Full FFmpeg decode with `-xerror -f null -`; examine clipping/silence with actual waveform (auto test is not human listening). Use local `scripts/verify_shorts.py --video PATH --manifest PATH --full-decode` if possible.

**Scientific + policy**: factual claim source, original rendering and assets, license evidence, audience/AI disclosure, ad suitability, truthful title/caption/thumbnail.

## Labels

- `PREPRODUCTION`: concept, script, storyboard only.
- `BLOCKED`: missing mandatory media or rights, can't produce true output.
- `REVIEW`: MP4 exists but any release gate lacks evidence or approval (most first drafts).
- `FINAL`: real artifact plus complete technical AND manual artistic/voice/caption/rights review, explicit release approval if owner required. No overnight or automatic FINAL from just workflow green.

Files: `video-review-Vx.mp4` or `video-final-Vx.mp4`, thumbnail `.png`, `captions-Vx.srt`, `voice-vbee-<voice>-Vx.mp3`, `voice-cast-Vx.json`, `production-manifest-Vx.json`, `youtube-safety-review-Vx.json`, `QA-report-Vx.md`, `youtube-title-description-Vx.txt`, `source-project-Vx.zip` when relevant. Include run URL/artifact ID/hash and Drive URLs. Preserve previous review/final files.

**No fake success**: GitHub workflow `success` proves its steps passed; it does NOT prove user watched the video. A GitHub Actions artifact can expire; distinguish it from a verified archived draft Release. Do not publish YouTube automatically.
