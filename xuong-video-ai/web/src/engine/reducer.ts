import { descendants } from './graph';
import type { AgentState, ChannelDef, ChannelState, FactoryEvent, Job, Workflow } from './types';

const clone = <T,>(v: T): T => structuredClone(v);

export function newAgent(id: string, t: number): AgentState {
  return { id, since: t, stats: { done: 0, rejects: 0, errors: 0, busy: 0, work: 0, tokens: 0, cost: 0, scores: [] }, lessons: {} };
}

export function initChannel(def: ChannelDef, t = 0): ChannelState {
  const wf = clone(def.workflow);
  const agents: ChannelState['agents'] = {};
  wf.agents.forEach(a => { agents[a.id] = newAgent(a.id, t); });
  return {
    id: def.id, workflow: wf, history: [{ version: wf.version, note: wf.note, at: t, workflow: clone(wf) }],
    jobs: {}, order: [], agents, seq: 0, autoApprove: false, nextSpawn: t + 1, titleIdx: 0,
  };
}

function lastRun(job: Job, stepId: string) {
  const r = job.steps[stepId]?.runs;
  return r && r[r.length - 1];
}

function releaseHolders(ch: ChannelState, jobId: string, steps?: Set<string>) {
  for (const a of Object.values(ch.agents)) {
    if (a.jobId === jobId && !a.walk && (!steps || (a.stepId && steps.has(a.stepId)))) {
      a.jobId = undefined; a.stepId = undefined; a.phaseEnd = undefined; a.thinkEnd = undefined; a.error = undefined;
    }
  }
}

function syncJobToWorkflow(job: Job, wf: Workflow) {
  const next: Job['steps'] = {};
  for (const s of wf.steps) next[s.id] = job.steps[s.id] ?? { status: 'pending', attempts: 0, runs: [] };
  job.steps = next;
}

/** Áp một event vào state (sửa tại chỗ). Mọi thay đổi hiển thị đều đi qua đây. */
export function apply(ch: ChannelState, e: FactoryEvent): void {
  const job = 'jobId' in e ? ch.jobs[e.jobId] : undefined;
  if (job) job.updated = e.t;
  switch (e.type) {
    case 'job.created': {
      const steps: Job['steps'] = {};
      ch.workflow.steps.forEach(s => { steps[s.id] = { status: 'pending', attempts: 0, runs: [] }; });
      ch.jobs[e.jobId] = { id: e.jobId, title: e.title, created: e.t, updated: e.t, status: 'running', priority: false, steps, tokens: 0, cost: 0 };
      ch.order.push(e.jobId);
      ch.seq++;
      break;
    }
    case 'step.queued': if (job) { job.steps[e.stepId].status = 'queued'; job.steps[e.stepId].queuedAt = e.t; } break;
    case 'step.blocked': if (job && job.steps[e.stepId]) job.steps[e.stepId].blocked = e.reason; break;
    case 'step.started': {
      if (!job) break;
      const st = job.steps[e.stepId];
      st.status = 'active';
      st.blocked = undefined;
      st.runs.push({ start: e.t, agentId: e.agentId });
      const a = ch.agents[e.agentId];
      Object.assign(a, { jobId: e.jobId, stepId: e.stepId, phaseStart: e.t, thinkEnd: e.thinkEnd, phaseEnd: e.end, walk: undefined, error: undefined });
      break;
    }
    case 'step.finished': {
      if (!job) break;
      const r = lastRun(job, e.stepId);
      if (r) Object.assign(r, { end: e.t, tokens: e.tokens, cost: e.cost, output: e.output });
      job.steps[e.stepId].status = 'handoff';
      job.tokens += e.tokens; job.cost += e.cost;
      const a = ch.agents[e.agentId];
      a.stats.tokens += e.tokens; a.stats.cost += e.cost;
      if (!ch.workflow.steps.find(s => s.id === e.stepId)?.gate) a.stats.done++;
      if (r) a.stats.work += e.t - r.start;
      a.phaseEnd = undefined; a.thinkEnd = undefined;
      break;
    }
    case 'gate.scored': {
      if (!job) break;
      const r = lastRun(job, e.stepId);
      if (r) Object.assign(r, { score: e.score, passed: e.passed, reasons: e.reasons });
      const a = ch.agents[e.agentId];
      a.stats.scores.push(e.score);
      if (e.passed) a.stats.done++;
      if (!e.passed) {
        a.stats.rejects++;
        const step = ch.workflow.steps.find(s => s.id === e.stepId);
        const target = step?.gate && ch.workflow.steps.find(s => s.id === step.gate!.reworkTo);
        const owner = target && ch.agents[target.agentId];
        if (owner) e.reasons.forEach(x => { owner.lessons[x] = (owner.lessons[x] ?? 0) + 1; });
      }
      break;
    }
    case 'step.reworked': {
      if (!job) break;
      const ids = descendants(ch.workflow, e.toStep);
      for (const id of ids) {
        const st = job.steps[id];
        if (st && st.status !== 'pending') st.status = 'pending';
      }
      job.steps[e.stepId].attempts = e.attempt;
      releaseHolders(ch, e.jobId, ids);
      break;
    }
    case 'step.failed': {
      if (!job) break;
      const r = lastRun(job, e.stepId);
      if (r) Object.assign(r, { end: e.t, error: e.error });
      const a = ch.agents[e.agentId];
      a.stats.errors++;
      a.phaseEnd = undefined;
      if (!e.retry) { job.steps[e.stepId].status = 'error'; a.error = e.error; }
      break;
    }
    case 'step.retried': {
      if (!job) break;
      job.steps[e.stepId].status = 'active';
      job.steps[e.stepId].runs.push({ start: e.t, agentId: e.agentId });
      Object.assign(ch.agents[e.agentId], { jobId: e.jobId, stepId: e.stepId, phaseStart: e.t, thinkEnd: e.t, phaseEnd: e.end, error: undefined });
      break;
    }
    case 'human.requested': {
      if (!job) break;
      job.steps[e.stepId].status = 'waiting_human';
      job.steps[e.stepId].requestedAt = e.t;
      releaseHolders(ch, e.jobId, new Set([e.stepId]));
      break;
    }
    case 'human.approved': {
      if (!job) break;
      const st = job.steps[e.stepId];
      st.runs.push({ start: st.requestedAt ?? e.t, end: e.t, agentId: 'ban', passed: true, output: 'Đã duyệt' });
      st.status = 'done';
      break;
    }
    case 'agent.walk': {
      const a = ch.agents[e.agentId];
      a.walk = e.walk;
      if (e.walk.purpose === 'return' || e.walk.purpose === 'break-return' || e.walk.purpose === 'break') { a.jobId = undefined; a.stepId = undefined; }
      break;
    }
    case 'agent.arrived': {
      const a = ch.agents[e.agentId];
      a.walk = undefined;
      break;
    }
    case 'step.delivered': if (job && job.steps[e.stepId]?.status === 'handoff') job.steps[e.stepId].status = 'done'; break;
    case 'job.done': if (job) { job.status = 'done'; job.doneAt = e.t; } break;
    case 'job.cancelled': if (job) { job.status = 'cancelled'; releaseHolders(ch, e.jobId); } break;
    case 'job.priority': if (job) job.priority = e.priority; break;
    case 'step.rerun': {
      if (!job) break;
      const ids = descendants(ch.workflow, e.stepId);
      ids.forEach(id => { const st = job.steps[id]; if (st) { st.status = 'pending'; st.attempts = 0; } });
      if (e.prompt) job.overrides = { ...(job.overrides ?? {}), [e.stepId]: e.prompt };
      job.status = 'running'; job.doneAt = undefined;
      releaseHolders(ch, e.jobId, ids);
      break;
    }
    case 'workflow.published': {
      const wf = clone(e.workflow);
      // ai đang đi thì coi như đã tới nơi; hồ sơ đang chuyển được giao luôn
      for (const a of Object.values(ch.agents)) {
        if (a.walk?.purpose === 'handoff' && a.walk.carrying && a.walk.stepId) {
          const j = ch.jobs[a.walk.carrying];
          if (j?.steps[a.walk.stepId]?.status === 'handoff') j.steps[a.walk.stepId].status = 'done';
        }
        a.walk = undefined;
      }
      const stepIds = new Set(wf.steps.map(s => s.id));
      for (const j of Object.values(ch.jobs)) {
        if (j.status !== 'running') continue;
        syncJobToWorkflow(j, wf);
        for (const st of Object.values(j.steps)) if (st.status === 'handoff') st.status = 'done';
      }
      const agents: ChannelState['agents'] = {};
      wf.agents.forEach(ad => {
        const a = ch.agents[ad.id] ?? newAgent(ad.id, e.t);
        if (a.stepId && !stepIds.has(a.stepId)) { a.jobId = undefined; a.stepId = undefined; a.phaseEnd = undefined; a.error = undefined; }
        if (a.stepId) { const s = wf.steps.find(x => x.id === a.stepId); if (s && s.agentId !== ad.id) { a.jobId = undefined; a.stepId = undefined; a.phaseEnd = undefined; } }
        agents[ad.id] = a;
      });
      // việc đang làm dở mà người làm không còn: trả về hàng đợi
      for (const j of Object.values(ch.jobs)) {
        if (j.status !== 'running') continue;
        for (const [sid, st] of Object.entries(j.steps)) {
          if (st.status === 'active' || st.status === 'error') {
            const holder = Object.values(agents).find(a => a.jobId === j.id && a.stepId === sid);
            if (!holder) st.status = 'pending';
          }
        }
      }
      ch.agents = agents;
      ch.workflow = wf;
      ch.history.unshift({ version: wf.version, note: wf.note, at: e.t, workflow: clone(wf) });
      break;
    }
    case 'channel.auto': ch.autoApprove = e.on; break;
  }
}
