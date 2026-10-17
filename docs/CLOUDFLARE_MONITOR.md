# Cloudflare read-only Pipeline Monitor
This deployment **does not** run agents, TTS, Remotion, local Python pipeline, publishing, media playback or gate-approval commands. Local `pipeline.py` remains the source of truth.

## Setup
1. In `cloudflare/monitor`, run `npm install`.
2. Create D1: `npx wrangler d1 create remotion-monitor`; replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc`.
3. `npx wrangler d1 migrations apply remotion-monitor --remote`.
4. Set a secret: `npx wrangler secret put SYNC_TOKEN` (generate securely; never commit).
5. Build static assets from the existing monitor: from repo root run `python3 scripts/prepare-cloudflare-monitor.py`. This copies the existing UI and removes local-only gate action controls.
6. `cd cloudflare/monitor && npm run check && npm run deploy`.
7. Configure a **Cloudflare Access application** for the resulting workers.dev URL or custom domain, using your email identity policy. The Worker by itself does not enforce interactive viewer authentication; do NOT share the URL until Access policy is active. Permit local machine-to-Worker `/api/sync` via a scoped Access service token or a separate protected route; Cloudflare Access authentication and SYNC_TOKEN are both required when Access covers the entire domain.

## Local sync
Start the canonical local server: `npm run pipeline`.
Export `CLOUDFLARE_MONITOR_URL=https://YOUR_WORKER.workers.dev` and `CLOUDFLARE_MONITOR_SYNC_TOKEN` in a protected environment, then run `python3 scripts/sync-cloudflare-monitor.py`.
The script copies the **computed** /api/status and /api/meta output, never raw status files, via HTTPS to D1. Use OS scheduler/cron every 30-60 seconds when ready. If local is offline, D1 keeps the last snapshot. `GET /api/sync-info` exposes last sync time; stale indicator UI is future work.
This POC uses a single local sync producer. Back up `out/monitor-sync.sqlite3`, otherwise revision numbers may restart and be rejected. Multiple local sync producers need a coordinated revision service.

## Security and release checks
- Remote `POST /api/gate`, commands, notes, run creation, media and audio are unavailable.
- Protect dashboard with Cloudflare Access before sharing link. Apply Access service credentials to sync if required.
- Do not sync private transcripts, secrets, or personal content beyond approved local monitor views.
- Verify no unrelated video files or gate scores changed; compare cloud `/api/status` against local projection.
- No live Cloudflare deployment is claimed until authenticated smoke tests and HTTPS URL are verified.
