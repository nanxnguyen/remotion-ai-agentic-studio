import { preds, succs } from './graph';
import { walkDuration } from './layout';
import { mockCost } from './presets';
import { apply } from './reducer';
import type { AgentState, AgentStatus, ChannelState, FactoryEvent, Job, Place, StepDef, Walk } from './types';

export const MAX_OPEN = 6;

const REASONS: Record<string, string[]> = {
  audit: ['Hook 3 giây đầu chưa có câu hỏi', 'Twist lộ quá sớm', 'Thoại không gắn với hành động hình', 'Nhịp giữa truyện bị chùng', 'CTA cuối chưa tự nhiên'],
  qa: ['Câu thoại nói "mở cửa" nhưng hình không có cửa', 'Còn badge timecode ở 00:12', 'Chuyển cảnh giật ở 0:31', 'Phụ đề lệch giọng 0.4 giây', 'Âm lượng nhạc át lời đọc'],
  generic: ['Chưa đạt tiêu chí chất lượng', 'Thiếu nguồn tham chiếu'],
};
const ERRORS = ['Hết bộ nhớ khi render frame 1432', 'API trả 503, máy chủ bận', 'Hết thời gian chờ upload'];

export const OUTPUT: Record<string, (title: string) => string> = {
  read: t => `3 tích truyện có nguồn. Chọn: “${t}”. Hook gợi ý: “Bạn có dám nghe tới cuối?”`,
  write: t => `Kịch bản “${t}”: 14 câu, 56 giây. Hook 0–3s, twist ở 0:44, CTA 0:52.`,
  speak: () => 'audio.wav · 56.8 giây · 14 câu · timestamps.json',
  mix: () => 'mix.wav · nhạc nền + 6 hiệu ứng · -14 LUFS',
  draw: () => '16 khung · card mở 2.0s · card CTA 4.0s',
  animate: () => '24 cảnh hoạt họa · ease-out · giữ model nhân vật',
  render: t => `out/${t.slice(0, 18).replace(/\s+/g, '-').toLowerCase()}.mp4 · h264 · crf 20`,
  review: () => '',
  publish: () => 'Drive: Videos-shorts/… · YouTube: Private · link đã xác minh',
  approve: () => 'Đã duyệt',
};

/** Kết quả từ một bước chạy bằng Claude thật. */
export interface RealResult { tokens: number; cost: number; output: string; score?: number; reasons?: string[]; error?: string }
/** Móc để server chạy một số bước bằng model thật thay vì mô phỏng. */
export interface RealHooks {
  isReal(chId: string, step: StepDef): boolean;
  canStart(chId: string, job: Job, step: StepDef): string | null;
  start(chId: string, job: Job, step: StepDef, agentId: string): void;
  take(chId: string, jobId: string, stepId: string): RealResult | undefined;
}
export const REAL_TIMEOUT = 600;

export interface Ctx { rng: () => number; emit: (e: FactoryEvent) => void; real?: RealHooks; autoSpawn?: boolean }

const between = (rng: () => number, [a, b]: [number, number]) => a + rng() * (b - a);

export function homeStep(ch: ChannelState, agentId: string): string | undefined {
  return ch.workflow.steps.find(s => s.agentId === agentId)?.id;
}

export function agentStatus(ch: ChannelState, a: AgentState, t: number): AgentStatus {
  const def = ch.workflow.agents.find(x => x.id === a.id);
  if (a.walk) return a.walk.purpose === 'break' || a.walk.purpose === 'break-return' ? 'break' : 'walking';
  if (a.error) return 'error';
  if (a.stepId && a.phaseEnd !== undefined) return t < (a.thinkEnd ?? 0) ? 'thinking' : 'working';
  if (def?.role === 'human') return waitingHuman(ch).length ? 'waiting_human' : 'idle';
  if (def?.role === 'director') return Object.values(ch.jobs).some(j => j.status === 'running') ? 'working' : 'idle';
  return 'idle';
}

export function waitingHuman(ch: ChannelState): { job: Job; step: StepDef }[] {
  const out: { job: Job; step: StepDef }[] = [];
  for (const id of ch.order) {
    const j = ch.jobs[id];
    if (j.status !== 'running') continue;
    for (const s of ch.workflow.steps) if (j.steps[s.id]?.status === 'waiting_human') out.push({ job: j, step: s });
  }
  return out;
}

export function progress(a: AgentState, t: number): number {
  if (a.phaseEnd === undefined || a.phaseStart === undefined) return 0;
  const s = a.thinkEnd ?? a.phaseStart;
  return Math.max(0, Math.min(1, (t - s) / Math.max(0.01, a.phaseEnd - s)));
}

function walk(ch: ChannelState, ctx: Ctx, t: number, agentId: string, w: Omit<Walk, 'dur'>) {
  const dur = walkDuration(ch.workflow, w);
  ctx.emit({ t, ch: ch.id, type: 'agent.walk', agentId, walk: { ...w, dur } });
}

/** Một nhịp mô phỏng: đọc state, phát event. */
export function tick(ch: ChannelState, t: number, dt: number, ctx: Ctx, titles: string[]): void {
  const wf = ch.workflow;
  const emit = ctx.emit;
  const running = ch.order.map(id => ch.jobs[id]).filter(j => j.status === 'running');

  // 1. Video mới
  if (ctx.autoSpawn !== false && t >= ch.nextSpawn && running.length < MAX_OPEN) {
    const n = ch.seq + 1;
    const title = titles[ch.titleIdx % titles.length];
    ch.titleIdx++;
    ch.nextSpawn = t + between(ctx.rng, [14, 22]);
    emit({ t, ch: ch.id, type: 'job.created', jobId: `${ch.id.toUpperCase()}-${String(n).padStart(3, '0')}`, title });
  }

  // 2. Bước sẵn sàng vào khay; video xong
  for (const j of running) {
    let allDone = true;
    for (const s of wf.steps) {
      const st = j.steps[s.id];
      if (!st) continue;
      if (st.status !== 'done') allDone = false;
      if (st.status === 'pending' && preds(wf, s.id).every(p => j.steps[p]?.status === 'done')) {
        emit({ t, ch: ch.id, type: 'step.queued', jobId: j.id, stepId: s.id });
        if (s.kind === 'human') emit({ t, ch: ch.id, type: 'human.requested', jobId: j.id, stepId: s.id, reason: 'Cổng duyệt cuối' });
      }
      if (st.status === 'waiting_human' && ch.autoApprove && s.kind === 'human' && t - (st.requestedAt ?? t) > 2) {
        emit({ t, ch: ch.id, type: 'human.approved', jobId: j.id, stepId: s.id });
      }
    }
    if (allDone) emit({ t, ch: ch.id, type: 'job.done', jobId: j.id });
  }

  // 3. Agent
  for (const def of wf.agents) {
    const a = ch.agents[def.id];
    if (!a || def.role === 'human' || def.role === 'director') continue;
    const home = homeStep(ch, def.id);
    if (!home) continue;
    if (a.walk || a.phaseEnd !== undefined) a.stats.busy += a.walk && a.walk.purpose.startsWith('break') ? 0 : dt;

    if (a.walk) {
      const w = a.walk;
      if (t < w.start + w.dur) continue;
      emit({ t, ch: ch.id, type: 'agent.arrived', agentId: a.id });
      if (w.purpose === 'handoff' && w.carrying && w.stepId) {
        const j = ch.jobs[w.carrying];
        if (j && j.status === 'running') emit({ t, ch: ch.id, type: 'step.delivered', jobId: j.id, stepId: w.stepId });
      }
      if (w.purpose === 'handoff' || w.purpose === 'rework') {
        walk(ch, ctx, t, a.id, { from: w.to, to: { kind: 'step', id: home }, start: t, purpose: 'return' });
      } else if (w.purpose === 'break') {
        walk(ch, ctx, t, a.id, { from: { kind: 'pantry' }, to: { kind: 'step', id: home }, start: t + between(ctx.rng, [2.5, 4]), purpose: 'break-return' });
      }
      continue;
    }
    if (a.error) continue;

    if (a.stepId && a.jobId && a.phaseEnd !== undefined) {
      const cur = wf.steps.find(x => x.id === a.stepId);
      if (cur && ctx.real?.isReal(ch.id, cur)) {
        const res = ctx.real.take(ch.id, a.jobId, a.stepId);
        if (res) finish(ch, ctx, t, a, res);
        else if (t >= a.phaseEnd) finish(ch, ctx, t, a, { tokens: 0, cost: 0, output: '', error: 'Quá 10 phút không có phản hồi từ Claude' });
      } else if (t >= a.phaseEnd) finish(ch, ctx, t, a);
      continue;
    }

    // rảnh: nhận việc
    const mine = wf.steps.filter(s => s.agentId === def.id && s.kind !== 'human');
    let best: { j: Job; s: StepDef } | undefined;
    for (const j of running) {
      for (const s of mine) {
        if (j.steps[s.id]?.status !== 'queued') continue;
        if (ctx.real?.isReal(ch.id, s)) {
          const why = ctx.real.canStart(ch.id, j, s);
          if (why) { if (j.steps[s.id].blocked !== why) emit({ t, ch: ch.id, type: 'step.blocked', jobId: j.id, stepId: s.id, reason: why }); continue; }
        }
        if (!best || (j.priority && !best.j.priority) || (j.priority === best.j.priority && j.created < best.j.created)) best = { j, s };
      }
    }
    if (best) {
      const real = !!ctx.real?.isReal(ch.id, best.s);
      const think = real ? 0.8 : between(ctx.rng, [0.8, 1.8]);
      const end = real ? t + REAL_TIMEOUT : t + think + between(ctx.rng, best.s.duration);
      emit({ t, ch: ch.id, type: 'step.started', jobId: best.j.id, stepId: best.s.id, agentId: def.id, thinkEnd: t + think, end });
      if (real) ctx.real!.start(ch.id, best.j, best.s, def.id);
      (a as AgentState & { idle?: number }).idle = 0;
      continue;
    }
    const ax = a as AgentState & { idle?: number; breakAt?: number };
    ax.idle = (ax.idle ?? 0) + dt;
    ax.breakAt ??= between(ctx.rng, [22, 45]);
    if (ax.idle > ax.breakAt) {
      ax.idle = 0; ax.breakAt = between(ctx.rng, [30, 60]);
      walk(ch, ctx, t, a.id, { from: { kind: 'step', id: home }, to: { kind: 'pantry' }, start: t, purpose: 'break' });
    }
  }
}

function finish(ch: ChannelState, ctx: Ctx, t: number, a: AgentState, res?: RealResult) {
  const wf = ch.workflow;
  const j = ch.jobs[a.jobId!];
  const s = wf.steps.find(x => x.id === a.stepId);
  if (!j || !s || j.steps[s.id]?.status !== 'active') return;
  const def = wf.agents.find(x => x.id === a.id)!;
  const emit = ctx.emit;
  const st = j.steps[s.id];

  if (res?.error || (!res && s.errorRate && ctx.rng() < s.errorRate)) {
    const errored = st.runs.filter(r => r.error).length;
    const retry = errored % 2 === 0;   // tự thử lại một lần, lần sau chờ người
    emit({ t, ch: ch.id, type: 'step.failed', jobId: j.id, stepId: s.id, agentId: a.id, error: res?.error ?? ERRORS[Math.floor(ctx.rng() * ERRORS.length)], retry });
    if (retry) {
      emit({ t, ch: ch.id, type: 'step.retried', jobId: j.id, stepId: s.id, agentId: a.id, end: res ? t + REAL_TIMEOUT : t + 1.5 + between(ctx.rng, s.duration), manual: false });
      if (res) ctx.real?.start(ch.id, j, s, a.id);
    }
    return;
  }

  const tokens = res ? res.tokens : Math.round(between(ctx.rng, s.tokens));
  const cost = res ? res.cost : mockCost(def.model, tokens);
  const tag = ctx.real && !res ? '(mock) ' : '';

  if (s.gate) {
    const g = s.gate;
    const score = res?.score !== undefined ? Math.round(res.score) : Math.round(Math.max(40, Math.min(99, g.threshold - 13 + ctx.rng() * 27 + st.attempts * 5)));
    const passed = score >= g.threshold;
    const pool = REASONS[s.prop] ?? REASONS.generic;
    const reasons = passed ? [] : res ? (res.reasons?.length ? res.reasons.slice(0, 3) : ['Chưa đạt ngưỡng']) : [pool[Math.floor(ctx.rng() * pool.length)]];
    const output = res ? res.output : `${tag}Điểm ${score}/100 (ngưỡng ${g.threshold})${reasons.length ? ' · ' + reasons[0] : ''}`;
    emit({ t, ch: ch.id, type: 'step.finished', jobId: j.id, stepId: s.id, agentId: a.id, tokens, cost, output });
    emit({ t, ch: ch.id, type: 'gate.scored', jobId: j.id, stepId: s.id, agentId: a.id, score, threshold: g.threshold, passed, reasons });
    if (!passed) {
      const attempt = st.attempts + 1;
      if (attempt > g.maxRework) {
        emit({ t, ch: ch.id, type: 'human.requested', jobId: j.id, stepId: s.id, reason: `Quá ${g.maxRework} lần trả về` });
        return;
      }
      emit({ t, ch: ch.id, type: 'step.reworked', jobId: j.id, stepId: s.id, toStep: g.reworkTo, attempt });
      walk(ch, ctx, t, a.id, { from: { kind: 'step', id: s.id }, to: { kind: 'step', id: g.reworkTo }, start: t, purpose: 'rework', carrying: j.id });
      return;
    }
  } else {
    emit({ t, ch: ch.id, type: 'step.finished', jobId: j.id, stepId: s.id, agentId: a.id, tokens, cost, output: res ? res.output : tag + (OUTPUT[s.action]?.(j.title) ?? 'Xong') });
  }
  const next = succs(wf, s.id);
  const to: Place = next.length ? { kind: 'step', id: next[0] } : { kind: 'exit' };
  walk(ch, ctx, t, a.id, { from: { kind: 'step', id: s.id }, to, start: t, purpose: 'handoff', carrying: j.id, stepId: s.id });
}

/** Tạo bộ phát event: áp vào state và ghi log. */
export function makeEmitter(ch: ChannelState, log: FactoryEvent[]) {
  return (e: FactoryEvent) => { apply(ch, e); log.push(e); };
}
