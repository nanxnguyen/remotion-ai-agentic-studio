# Asset manifest

| Asset | Source | License/provenance | Status |
| --- | --- | --- | --- |
| Story and shot design | User direction + original script | Creator project | Authored |
| 16 stick figure scenes | `src/videos/17-tin-nhan-khong-loi-chuc` | Original SVG/React | Authored |
| Narration | Vbee Batch Thanh Long | User's authorized account | Pending CI |
| Piano | `produce_audio.py score` | Generated original notes | Pending CI |
| MP4 | `final/17-tin-nhan-khong-loi-chuc-full-voice-piano.mp4` | Original production | Pending render |
| vidIQ media ID | vidIQ import, never YouTube publishing | User-authorized media library | Pending |

Do not expose signed vidIQ URLs, API keys, or other secrets. All reports must reflect verified files, never inferred path existence.


## Polished V1 — factual deliverable
- **Verified technical render:** `final/17-tin-nhan-khong-loi-chuc-polished60-vbee-piano.mp4`
- **GitHub Actions passed:** https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40013771684
- **Original voiced source passed:** https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40012518442
- **MP4 metadata:** 42.5 seconds, 1080×1920, 60fps, 16 distinct authored scenes; original Vbee Thanh Long Batch narrator 7 beats and original piano.
- **SHA-256:** `ab050f9427de3032ef91ed897940a94186cc57db6d7ce460fa6af3788a73aaf1`
- **QA:** `final/POLISH-QA.json`; continuity `final/POLISH-SEAM-QA.json`, largest measured seam mean RGB delta **0.4436**; 15 boundaries checked.
- **vidIQ library import:** `ready`, durable `uploadId: 46b15dd2-e550-4e13-8167-10edf896b889`. Request a fresh signed URL with `vidiq_video_upload({uploadId})`.
- **Limits:** human playback/audition and canonical independent reviewer gate approvals not recorded. No claim that Vbee API can control emotional acting exactly; delivery is a *technically verified creative candidate*, not guaranteed to get views.
- **YouTube:** not published.
