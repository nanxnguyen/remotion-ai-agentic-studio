import { Factory } from './engine/factory';
import { validate } from './engine/graph';
import { CHANNELS } from './engine/presets';
import type { FactoryEvent, Workflow } from './engine/types';

/** Thông tin máy chủ gửi về: chế độ, ngân sách, trạng thái dừng. */
export interface LiveInfo {
  mode: 'live'; fake: boolean; hasKey: boolean; realChannel: string; realSteps: string[];
  dailyCapUsd: number; videoCapUsd: number; spentToday: number; date: string;
  stopped: boolean; paused: boolean; speed: number; webSearch: boolean; inflight: number; queued: number;
}
interface StateResp { t: number; logs: Record<string, FactoryEvent[]>; info: LiveInfo }

const token = new URLSearchParams(location.search).get('token') ?? '';
const q = token ? `?token=${encodeURIComponent(token)}` : '';

/** Địa chỉ API trên cùng máy chủ, kèm token nếu có. */
export const apiUrl = (path: string) => path + (q ? (path.includes('?') ? '&' : '?') + q.slice(1) : '');

/** Thử kết nối máy chủ trên cùng địa chỉ. Trong artifact (bị CSP chặn) sẽ thất bại nhanh và quay về mock. */
export async function probe(): Promise<StateResp | null> {
  if (!/^https?:$/.test(location.protocol) || location.hostname.endsWith('claude.ai') || location.hostname.endsWith('claudeusercontent.com')) return null;
  try {
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 1500);
    const r = await fetch(`/api/state${q}`, { signal: ac.signal, cache: 'no-store' });
    clearTimeout(to);
    if (!r.ok) return null;
    const d = await r.json() as StateResp;
    return d?.info?.mode === 'live' ? d : null;
  } catch { return null; }
}

export async function post(body: Record<string, unknown>): Promise<{ ok: boolean; error?: string; problems?: string[] }> {
  try {
    const r = await fetch(`/api/action${q}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    return await r.json();
  } catch (e) { return { ok: false, error: String(e) }; }
}

/**
 * Xưởng ở chế độ trực tiếp: kênh thật lấy event từ máy chủ (không tự mô phỏng),
 * các kênh còn lại vẫn mô phỏng ngay trong trình duyệt để văn phòng 3D có sức sống.
 */
export class LiveFactory extends Factory {
  serverT: number;
  info: LiveInfo;
  onInfo?: (i: LiveInfo) => void;
  onConn?: (ok: boolean) => void;
  liveCh: string;

  constructor(liveCh: string, d: StateResp, seed: number) {
    super(CHANNELS, seed, {}, { autoSpawn: {} });
    this.liveCh = liveCh;
    this.info = d.info;
    this.serverT = d.t;
    // mô phỏng trước các kênh khác tối đa ~8 phút, kết thúc đúng đồng hồ máy chủ
    const warm = Math.min(475, d.t);
    this.t = d.t - warm;
    for (let k = 0; k < warm / 0.25; k++) {
      this.tickMock(0.25);
      for (const ch of Object.values(this.channels)) {
        if (ch.id === liveCh) continue;
        for (const j of Object.values(ch.jobs)) for (const [sid, st] of Object.entries(j.steps)) if (j.status === 'running' && st.status === 'waiting_human') this.approveLocal(ch.id, j.id, sid);
        for (const a of Object.values(ch.agents)) if (a.error) super.retry(ch.id, a.id);
      }
    }
    for (const e of d.logs[liveCh] ?? []) this.emit(e);
    this.t = d.t;
  }

  private tickMock(dt: number) {
    const keep = this.defs;
    this.defs = keep.filter(x => x.id !== this.liveCh);
    super.advance(dt);
    this.defs = keep;
  }
  private approveLocal(ch: string, jobId: string, stepId: string) { super.approve(ch, jobId, stepId); }

  advance(dt: number) {
    // đồng hồ chạy theo máy chủ: không vượt quá 1.5s, tụt lại thì nhảy lên
    if (this.serverT - this.t > 3) dt = this.serverT - this.t;
    else if (this.t + dt > this.serverT + 1.5) dt = Math.max(0, this.serverT + 1.5 - this.t);
    if (dt > 0) this.tickMock(dt);
  }

  connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${proto}://${location.host}/ws${q}`);
    ws.onopen = () => this.onConn?.(true);
    ws.onmessage = m => {
      const d = JSON.parse(m.data);
      if (d.kind === 'events') for (const e of d.events as FactoryEvent[]) {
        if (e.ch !== this.liveCh) continue;
        this.serverT = Math.max(this.serverT, e.t);
        this.emit(e);
      } else if (d.kind === 'info') {
        this.serverT = Math.max(this.serverT, d.t);
        this.info = d.info; this.onInfo?.(d.info);
      }
    };
    ws.onclose = () => { this.onConn?.(false); setTimeout(() => location.reload(), 3000); };
  }

  /* ---- thao tác: kênh thật gửi lên máy chủ, kênh khác chạy tại chỗ ---- */
  approve(ch: string, jobId: string, stepId: string) { if (ch === this.liveCh) void post({ type: 'approve', ch, jobId, stepId }); else super.approve(ch, jobId, stepId); }
  retry(ch: string, agentId: string) { if (ch === this.liveCh) void post({ type: 'retry', ch, agentId }); else super.retry(ch, agentId); }
  rerun(ch: string, jobId: string, stepId: string, prompt?: string) { if (ch === this.liveCh) void post({ type: 'rerun', ch, jobId, stepId, prompt }); else super.rerun(ch, jobId, stepId, prompt); }
  cancel(ch: string, jobId: string) { if (ch === this.liveCh) void post({ type: 'cancel', ch, jobId }); else super.cancel(ch, jobId); }
  priority(ch: string, jobId: string, on: boolean) { if (ch === this.liveCh) void post({ type: 'priority', ch, jobId, on }); else super.priority(ch, jobId, on); }
  setAuto(ch: string, on: boolean) { if (ch === this.liveCh) void post({ type: 'auto', ch, on }); else super.setAuto(ch, on); }
  addJob(ch: string, title: string) { if (ch === this.liveCh) void post({ type: 'addJob', ch, title }); else super.addJob(ch, title); }
  publish(ch: string, draft: Workflow, note: string) {
    if (ch !== this.liveCh) return super.publish(ch, draft, note);
    const p = validate(draft);
    if (!p.length) void post({ type: 'publish', ch, workflow: draft, note });
    return p;
  }
}
