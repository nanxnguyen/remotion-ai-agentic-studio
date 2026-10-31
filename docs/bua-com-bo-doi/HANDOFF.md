# HANDOFF — Bữa Cơm Bố Đợi V3 (2026-10-31)

## Production status
- Content/script: APPROVED BY USER.
- Storyboard concept: APPROVED BY USER.
- Preproduction: 12-scene, 20-shot production lock in `PRODUCTION-LOCK-V3.md`.
- Voice (Vbee): NOT STARTED. No authenticated direct workflow_dispatch action currently available in this chat's GitHub connector. The existing `.github/workflows/vbee-audition.yml` targets a different story and must not be reused as proof.
- Native Remotion 16:9: NOT STARTED. The repository's current short default is 9:16; create a new 16:9 composition only for this title.
- Pipeline audit, tests and QA: NOT RUN. Do not mark them passed.
- MP4: NOT GENERATED. No video URL may be claimed.
- Drive upload: NOT ATTEMPTED, because no verified MP4 exists.
- YouTube publish: NOT AUTHORIZED.

## Next execution steps
1. Initialize `bua-com-bo-doi` via the canonical pipeline and populate production artifacts from V3 lock; read current `AGENTS.md`.
2. Verify applicable gates and originality, review 16:9 style frames and character rig consistency.
3. Use authenticated Vbee Batch workflow with approved V3 text, audition narration and separate Dad voice; confirm exact voice IDs/licensing and measured per-line MP3 durations.
4. Retime 90-second picture lock according to actual audio. Preserve final payoff and measured 1–4 second CTA.
5. Build original connected-rig animation in 1920×1080 Remotion. Run unit, visual, pipeline and audio QA. Check actual MP4 in full.
6. Re-read Drive `Videos-shorts` direct children, reuse an existing same-topic folder or create the next numbered folder only if novel; upload verified assets, preserve versions and check URLs/bytes/MIME/parent.
7. Return draft REVIEW MP4 to owner; never publish on YouTube or merge PR automatically.

**Blocker summary:** No direct invocation of authenticated Vbee voice workflow or render workflow was available in this tool context; do not silently use another provider, pretend a voice exists or relabel a storyboard as a finished film.
