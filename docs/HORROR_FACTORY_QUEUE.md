# Horror Factory: reproducible production queue

**Scheduler:** the existing ChatGPT task at 19:00 Asia/Ho_Chi_Minh. It is the only daily scheduler; this GitHub workflow has **no cron**.

The creative agent researches one new original Vietnamese folklore/horror film, records its references and independent script audit, creates 8–20 original cinematic 1080×1920 SVG scene artworks plus two genuinely different vertical 9:16 thumbnails, and writes a JSON production manifest. Commit all scene assets first, then **create** exactly one `production/horror-queue/<unique-slug>.json` on `main` last. Adding the JSON automatically triggers `.github/workflows/horror-factory-queue.yml` through `push`, without `workflow_dispatch`.

## Manifest schema v1

- `slug`: unique lowercase hyphenated identifier.
- `classification`: `FOLKLORE`, `FICTION_INSPIRED_BY_FOLKLORE`, or `DOCUMENTED_CASE`; `sources`: researched HTTPS citations, two independent sources for documented cases.
- `script_audit`: named independent reviewer, quality score ≥90/100, predicted retention ≥42/50. These estimates are **not real audience data**.
- `scenes`: 8–20 sequential objects with `id`, Vietnamese `narration`, and `art` pointing inside `production/horror-assets/<slug>/`.
- `thumbnail_candidates`: two original 1080×1920 SVG artworks inside the same folder.
- `title_candidates`: three unique relevant truthful titles; `description`: natural CTA and accurate folklore/fiction label.

`scripts/horror_factory_run.py` validates the inputs, uses actual Vbee Batch `n_hn_male_ngankechuyen_ytstable_vc`, transforms the original artwork to 9:16 PNG, renders a real 1080×1920 H.264/AAC MP4 using FFmpeg, fully decodes it, and publishes **non-secret GitHub Actions artifacts**, including an SHA-256 receipt. **It never declares full artistic QA PASS, uploads Drive files, or publishes a Public video.** An independent review of the actual MP4/thumbnail/title/description/rights and the existing Public-release workflow remain mandatory. No bypass if Vbee, secrets, media or reviews are missing.

## Runner failure is external

The [two-runner, zero-secret smoke workflow](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/42109038856) failed on both `ubuntu-22.04` and `ubuntu-24.04` **before the first echo**. This excludes the Vbee/render Python code as the cause of this specific startup failure. Inspect GitHub run annotations, account Actions policies, runner and billing restrictions; escalate with GitHub Support if no actionable message. Track [issue #104](https://github.com/nanxnguyen/remotion-ai-agentic-studio/issues/104).