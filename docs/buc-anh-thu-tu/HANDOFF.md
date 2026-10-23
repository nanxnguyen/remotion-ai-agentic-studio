# Production handoff — Bức Ảnh Thứ Tư

- [x] Ten-shot script and captions saved to timeline.
- [x] 10 generated cinematic artwork scene cards in local downloadable project.
- [x] 10 genuine Vbee Anh Khôi MP3s created in GitHub Actions run `39936286701`.
- [x] Completed MP4 rendered locally and checked by ffprobe (H.264, AAC, 55.0s, 720×1280).
- [x] Extracted 10 QC still frames representing scene boundaries; visual captions and scene order reviewed.
- [x] Original ambient soundtrack generated, mixed beneath the spoken voice.
- [ ] **BLOCKED:** Transfer actual MP4 bytes into GitHub Releases. The active GitHub connector does not expose raw binary release-asset uploading.
- [ ] CI's existing repo-wide format-check failures are unrelated to this storyboard; this script's canonical Remotion registry/gates were not executed.
- [ ] Follow `AGENTS.md` pipeline A → Content/Audio/D → Motion → E → B → C, run `python3 -I scripts/pipeline.py audit buc-anh-thu-tu`, and record any scorecards and additional review findings before a release is reported as QA-approved under repo policy.

**Do not report the completed local MP4 as a GitHub Release asset.** GitHub link delivery remains pending until `scripts/archive-local-final-video.sh` succeeds and returns verified `video_url` and `release_url`.

**Final local MP4 sha256:** `03c5b0fd09dc2197000032af684165960c7b9384bbb2ab34d15ba3416b976113`.
