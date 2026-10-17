# Cloudflare-only CPU experiment (NOT production deployment)
The POC uses a Cloudflare Worker front-end, a single Cloudflare Container, D1 job metadata, and R2 result storage. It does **not** auto-publish or bypass video review gates.

## Setup
1. Paid Cloudflare account with Containers enabled. Install Docker, Node 22.
2. In `cloudflare/`: `npm install`, then create D1 database `npx wrangler d1 create remotion-video-jobs` and R2 bucket `npx wrangler r2 bucket create remotion-video-artifacts`.
3. Replace `REPLACE_WITH_D1_ID` in `cloudflare/wrangler.jsonc` with returned D1 identifier.
4. `npx wrangler d1 migrations apply remotion-video-jobs --remote` (migration directory must match cloudflare/migrations).
5. Configure `npx wrangler secret put ADMIN_TOKEN`. Use a unique long random secret; do not commit it.
6. With Docker running, `npx wrangler deploy`. Cloudflare builds the Container image.
7. API: `POST /jobs` JSON `{"videoId":"tiec-nguoi-hay-nam-thang"}` authenticated with `Authorization: Bearer ...`. Then `POST /jobs/<id>/run`, `GET /jobs/<id>`, `GET /jobs/<id>/artifact`.

## Benchmark scope and honesty
The container benchmark invokes the **real Remotion CLI** on a small registered test composition `HelloWorld`, captures wall time, exit code and ffprobe metadata. It does NOT benchmark the real story reel, and does NOT generate Thanh Long narration without models/reference.
VieNeu CPU benchmark must be added only after verified image bundling or R2 model delivery, known authorization for reference audio, and a real inference test. Never substitute preview audio for licensed reference.
Capture actual D1/R2/Container benchmark artifacts in `docs/cloudflare-benchmarks/` before any go/no-go decision. No results have been measured on Cloudflare yet.

## Security/operational limits
POC accepts only protected API calls except /health. Upload/publish is **not implemented**. It uses a single container; on failure the job becomes failed and is never auto-retried. A worker request may time out before heavy CPU work finishes; for production convert to async queue/DO-alarm orchestration with reconciliation. Container local disk is ephemeral, so persist actual outputs in R2.
Cloudflare Containers are CPU-only; default max 4 vCPU / 12 GiB RAM / 20GB disk. Large models may not fit and low CPU inference throughput may make 24/7 processing unsuitable. Benchmarks and worker quota/Cloudflare billing must be checked before deployment.
