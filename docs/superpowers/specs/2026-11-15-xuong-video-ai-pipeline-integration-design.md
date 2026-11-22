# Design: Integrating `xuong-video-ai` with `AI-video-edition` (`scripts/pipeline.py`)

**Date:** 2026-11-15  
**Status:** Draft (pending builder check & owner approval)  
**Selected Approach:** Approach 1 — Direct Pipeline Bridge (`scripts/pipeline.py` as single source of truth)

---

## 1. Intent & Why

The user wants to integrate `xuong-video-ai/` (a 3D multi-agent office + CMS web app) into the main `AI-video-edition` repository so they can:
1. **Monitor 100% accurately** all real videos in `docs/*/status.json`, their real pipeline stages, review scores, gates, errors, logs, and rendered MP4s in `out/`.
2. **Create and control real videos** (create new video, approve/reject gates, inspect and play finished MP4s) from the `xuong-video-ai` UI without any mock/simulated state diverging from reality.

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **100% Real State Fidelity:** Every video, stage status, review score, gate, blocker, and finished MP4 shown in `xuong-video-ai` comes directly from `scripts/pipeline.py` (`/api/status`, `/api/meta`, `/media/<folder>`, `/api/create-options`) and `docs/*/status.json`.
- **Real Actions:** Creating a video (`+ Video`), approving/rejecting a gate (`Duyệt`), and sending runner commands execute against `scripts/pipeline.py` (`POST /api/videos`, `POST /api/gate`, `POST /api/videos/<folder>/command`).
- **3D Office Visualization:** The 3D robots in `Floor3D` reflect real agent/stage states (working, waiting for human gate approval, error, done).
- **Real Media Playback:** `Library` lists completed/rendered videos and streams real MP4s via HTTP Range from `pipeline.py` (`/media/<folder>`).
- **Zero Regression:** Existing `AI-video-edition` tests (`npm run verify`) continue to pass.

### Non-Goals
- Rewriting `scripts/pipeline.py` in Node.js (it remains the Python source of truth on port `4180`).
- Running `xuong-video-ai`'s standalone Claude 3-step `events.jsonl` simulator for the real channel.
- Auto-publishing to YouTube/Drive without explicit user action.

### Anti-Goals
- Mixing fake/auto-spawned mock jobs with real `docs/*/status.json` videos on the real channel.
- Duplicating state in `events.jsonl` that can drift out of sync with `docs/*/status.json`.

## 3. Constraints

- `scripts/pipeline.py` enforces CSRF protection via `_trusted_json()` (`Origin` must be `http://127.0.0.1:4180` or `http://localhost:4180` when calling `/api/videos` and `/api/videos/*/command`). The Node bridge (`port 8787`) must supply that `Origin` header when forwarding studio actions.
- `xuong-video-ai` has its own `web/` (Vite + React + Three.js) and `server/` (Node + TypeScript + `ws`).
- Root `package.json` must remain clean and `npm run verify` must pass.

## 4. Approaches Considered

1. **Approach 1: Direct Pipeline Bridge (Selected)**
   - `xuong-video-ai/server` acts as a live bridge/adapter to `scripts/pipeline.py` (`http://127.0.0.1:4180`).
   - It fetches `/api/meta` and polls `/api/status`, maps `pipeline.FLOW`, `pipeline.roster()`, and `all_views()` into `xuong-video-ai`'s `Workflow`, `Job`, `AgentState`, and `FactoryEvent` structures, and pushes diffs over WebSocket (`/ws`).
   - *Pros:* 100% accurate, single source of truth, zero state drift, all 18+ existing videos appear immediately.
   - *Cons:* Requires `scripts/pipeline.py serve --port 4180` to be running alongside `xuong-video-ai/server`.

2. **Approach 2: Hybrid Dual-State (Rejected)**
   - Keep `xuong-video-ai`'s `events.jsonl` Claude 3-step engine alongside `pipeline.py`.
   - *Why rejected:* Creates two conflicting sources of truth for videos and risks showing mock/stale data when the user asked for 100% accurate monitoring.

## 5. Architecture & Data Mapping

### 5.1 Process & Startup Topology
- `scripts/pipeline.py serve --port 4180` (Python backend, source of truth).
- `xuong-video-ai/server` on `port 8787` (`PIPELINE_URL=http://127.0.0.1:4180`), serving `xuong-video-ai/web/dist` and `/api/*` + `/ws`.
- Add a convenience script in root `package.json` (e.g. `monitor:3d`) and update `xuong-video-ai/start.sh` so starting the 3D monitor ensures `pipeline.py serve --port 4180` is running (or connects to an already-running instance) and launches `xuong-video-ai/server`.

### 5.2 Pipeline-to-Factory Mapping (`xuong-video-ai/server/src/pipeline-bridge.ts`)
- **Channel Registry (Builder Call):** Statically register `ai-video-edition` ("Xưởng Video AI — Thật", theme `'warm'`) in `xuong-video-ai/web/src/engine/presets.ts` so `Scene.tsx`, `App.tsx`, `Library.tsx`, `store.ts`, and `live.ts` preserve their static `CHANNELS` contract without refactoring 5+ views. In pipeline mode, only `ai-video-edition` is active/monitored.
- **Snapshot Hydration vs Event Replay (Builder Call):** `GET /api/state` returns an authoritative `snapshot: { jobs, agents, workflow }` projected from `pipeline.py`'s `/api/status` and `/api/meta`, rather than synthesizing fake historical replay events. `LiveFactory` hydrates `ch.jobs`, `ch.agents`, and `ch.workflow` directly from `snapshot` on connect and on `snapshot` WebSocket updates, while still receiving incremental `FactoryEvent`s for the `Events` feed and 3D robot reactions.
- **Workflow DAG (`FLOW` → `StepDef[]` + `Edge[]`, Builder Call):** Map `pipeline.FLOW` (16 nodes max, matching `graph.validate()` limit) into a valid acyclic DAG: `intake -> research -> brief -> script -> [content, voice, design] -> audio -> motion -> build -> render -> qa -> approve (human) -> publish`. Any step with `kind: 'review'` sets `gate.reworkTo` to a strict ancestor (never itself) so `graph.validate()` passes cleanly.
- **Wall-Clock Timestamps (Builder Call):** Anchor `factory.t` to Unix epoch seconds (`Math.floor(Date.now() / 1000)`) in pipeline mode, and convert ISO 8601 timestamps from `status.json` via `Date.parse(iso) / 1000`. This keeps `fmt.dur` and `fmt.time` accurate without negative or skewed durations.
- **Agents (`roster()` → `AgentDef[]`):**
  - Each agent in `roster()` maps to an `AgentDef` with deterministic `hue` from its color name (`teal`, `cyan`, `orange`, etc.) and `role` (`director`, `reviewer`, `producer`). Add `you` (`human`) for gate approvals.
- **Jobs (`all_views()` → `Record<string, Job>`):**
  - `job.id = view.folder`, `job.title = view.name || view.folder`.
  - `job.status`: `'done'` if all required stages are `'done'` (or `next` indicates complete/delivered), else `'running'`.
  - Each stage in `view.stages[stageId]` maps to `JobStep`:
    - `state === 'done'` → `status: 'done'`
    - `state === 'active' | 'running' | 'in_progress'` → `status: 'active'`
    - `state === 'waiting_gate' | 'gate'` or gate pending → `status: 'waiting_human'`
    - `state === 'error' | 'failed'` (or `problems` non-empty) → `status: 'error'`
    - otherwise → `status: 'pending'`
  - Review scores from `view.reviews` populate `Run.score`, `Run.passed`, `Run.reasons`.
- **Diff & WebSocket Events:**
  - On each poll (`1500ms`), compare the previous snapshot with the new snapshot from `/api/status` and emit `snapshot` + `FactoryEvent`s (`job.created`, `step.started`, `step.done`, `step.waiting_human`, `step.failed`, `job.done`) so `Floor3D` robots animate and `Events` log updates in real time.

### 5.3 Action & Media Proxying
- `GET /api/state`: Returns `{ t, logs, info, snapshot, pipelineStatus }` where `info.mode = 'pipeline'`, `snapshot` holds the authoritative `Workflow`, `jobs`, and `agents`, and `pipelineStatus` holds exact stage notes, problems, `next` action, `comp`, `voice`, `profile`.
- `GET /api/create-options`: Proxied directly from `pipeline.py` `GET /api/create-options`.
- `POST /api/action`:
  - `addJob`: Calls `POST /api/videos` on `pipeline.py` with `Origin: http://127.0.0.1:4180`.
  - `approve`: Calls `POST /api/gate` on `pipeline.py` with `{ video, stage, decision: 'approved' | 'rejected', comment }` (matching `pipeline.py`'s `DECISIONS` contract). AI review gates (`A`, `D`, `E`, `B`, `C`) remain read-only in the UI (executed/overridden via `pipeline.py` CLI/runner).
  - `command`: Calls `POST /api/videos/<folder>/command` on `pipeline.py` with `Origin: http://127.0.0.1:4180`.
- `GET /api/media/:jobId` & `GET /api/media/:jobId/:file` (Builder Call):
  - `GET /api/media/:jobId` probes `HEAD /media/<folder>` (or `Range: bytes=0-0`) on `pipeline.py` and synthesizes `{ files: [{ name: 'final.mp4', size, type: 'video/mp4' }] }` when available (or `{ files: [] }` on 404), matching `Library.tsx`'s two-step contract.
  - `GET /api/media/:jobId/:file` proxies `GET /media/<folder>` with HTTP `Range` header pass-through so `Library.tsx` streams the real MP4 seamlessly.

### 5.4 Frontend Updates (`xuong-video-ai/web/src/`)
- `live.ts`: Support `pipeline` mode without running fake `tickMock` on non-existent channels; keep `LiveFactory` synced directly with server snapshots/events.
- `views/Videos.tsx`: Replace/augment the simple title-only `+ Video` modal with `create-options` fields (title/slug, profile, voice, runner) when in pipeline mode, and show real `next` action, gate approve/reject buttons, and stage problems/notes.
- `views/Library.tsx`: Detect real MP4 availability via `/api/media/<jobId>` for every finished/rendered video and stream it directly in the `<video>` player.
- `ui.tsx` / `App.tsx`: Top bar shows `Pipeline thật (port 4180)` connection status, total real videos, and active/waiting-gate counts instead of Claude USD spend when in pipeline mode.

## 6. Left to the Builder (Implementation Details)
- Exact CSS/layout tweaks in `xuong-video-ai/web/src/styles.css` for the `+ Video` pipeline form and gate action buttons.
- Exact `hue` mapping table for `roster()` colors.
- Unit tests in `xuong-video-ai/server/test/` for `pipeline-bridge.ts` mapping logic using real sample payloads from `docs/*/status.json`.
