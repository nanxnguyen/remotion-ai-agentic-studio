import { validate } from './graph';
import { CHANNELS, mulberry32 } from './presets';
import { apply, initChannel } from './reducer';
import { REAL_TIMEOUT, tick, type RealHooks } from './sim';
import type { ChannelDef, ChannelState, FactoryEvent, Workflow } from './types';

interface Snap { i: number; t: number; state: ChannelState }
const SNAP_EVERY = 300;

/** Gói engine: đồng hồ, các kênh, log event, checkpoint để tua lại. */
export class Factory {
  t = 0;
  rev = 0;
  defs: ChannelDef[];
  channels: Record<string, ChannelState> = {};
  logs: Record<string, FactoryEvent[]> = {};
  snaps: Record<string, Snap[]> = {};
  rng: () => number;
  listeners = new Set<(e: FactoryEvent) => void>();

  real?: RealHooks;
  autoSpawn: Record<string, boolean>;

  constructor(defs: ChannelDef[] = CHANNELS, seed = 7, overrides: Record<string, Workflow> = {}, opts: { real?: RealHooks; autoSpawn?: Record<string, boolean> } = {}) {
    this.defs = defs;
    this.real = opts.real;
    this.autoSpawn = opts.autoSpawn ?? {};
    this.rng = mulberry32(seed);
    for (const d of defs) {
      const def = overrides[d.id] ? { ...d, workflow: overrides[d.id] } : d;
      this.channels[d.id] = initChannel(def, 0);
      this.logs[d.id] = [];
      this.snaps[d.id] = [{ i: 0, t: 0, state: structuredClone(this.channels[d.id]) }];
    }
  }

  emit = (e: FactoryEvent) => {
    const ch = this.channels[e.ch];
    apply(ch, e);
    const log = this.logs[e.ch];
    log.push(e);
    if (log.length % SNAP_EVERY === 0) this.snaps[e.ch].push({ i: log.length, t: e.t, state: structuredClone(ch) });
    this.rev++;
    this.listeners.forEach(f => f(e));
  };

  advance(dt: number) {
    this.t += dt;
    for (const d of this.defs) tick(this.channels[d.id], this.t, dt, { rng: this.rng, emit: this.emit, real: this.real, autoSpawn: this.autoSpawn[d.id] ?? true }, d.titles);
  }

  /** Tua lại: state của kênh tại thời điểm T, dựng từ checkpoint gần nhất. */
  stateAt(chId: string, T: number): ChannelState {
    const snaps = this.snaps[chId];
    let s = snaps[0];
    for (const x of snaps) if (x.t <= T) s = x;
    const state = structuredClone(s.state);
    const log = this.logs[chId];
    for (let i = s.i; i < log.length && log[i].t <= T; i++) apply(state, log[i]);
    return state;
  }

  /** Dựng lại state từ log đã lưu (khởi động lại server). */
  replay(events: FactoryEvent[]) {
    for (const e of events) { if (!this.channels[e.ch]) continue; this.t = Math.max(this.t, e.t); this.emit(e); }
  }

  /* ---- thao tác từ giao diện ---- */
  approve(chId: string, jobId: string, stepId: string) { this.emit({ t: this.t, ch: chId, type: 'human.approved', jobId, stepId }); }
  retry(chId: string, agentId: string) {
    const ch = this.channels[chId]; const a = ch.agents[agentId];
    const s = ch.workflow.steps.find(x => x.id === a?.stepId);
    if (!a?.error || !a.jobId || !s) return;
    const real = !!this.real?.isReal(chId, s);
    const dur = s.duration[0] + this.rng() * (s.duration[1] - s.duration[0]);
    this.emit({ t: this.t, ch: chId, type: 'step.retried', jobId: a.jobId, stepId: s.id, agentId, end: this.t + (real ? REAL_TIMEOUT : 1 + dur), manual: true });
    if (real) this.real!.start(chId, ch.jobs[a.jobId], s, agentId);
  }
  rerun(chId: string, jobId: string, stepId: string, prompt?: string) { this.emit({ t: this.t, ch: chId, type: 'step.rerun', jobId, stepId, prompt }); }
  cancel(chId: string, jobId: string) { this.emit({ t: this.t, ch: chId, type: 'job.cancelled', jobId }); }
  priority(chId: string, jobId: string, on: boolean) { this.emit({ t: this.t, ch: chId, type: 'job.priority', jobId, priority: on }); }
  setAuto(chId: string, on: boolean) { this.emit({ t: this.t, ch: chId, type: 'channel.auto', on }); }
  addJob(chId: string, title: string) {
    const ch = this.channels[chId];
    this.emit({ t: this.t, ch: chId, type: 'job.created', jobId: `${chId.toUpperCase()}-${String(ch.seq + 1).padStart(3, '0')}`, title });
  }
  publish(chId: string, draft: Workflow, note: string) {
    const problems = validate(draft);
    if (problems.length) return problems;
    const ch = this.channels[chId];
    const wf: Workflow = { ...structuredClone(draft), version: ch.workflow.version + 1, publishedAt: this.t, note };
    this.emit({ t: this.t, ch: chId, type: 'workflow.published', workflow: wf });
    return [];
  }
}
