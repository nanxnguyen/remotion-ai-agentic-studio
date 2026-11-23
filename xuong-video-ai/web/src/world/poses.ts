import { layout, pathLen, sample, seatOf, STAND, WALK_SPEED, walkPath, type Layout, type P } from '../engine/layout';
import { agentStatus, homeStep, progress, waitingHuman } from '../engine/sim';
import type { Action, AgentDef, AgentStatus, ChannelState, FactoryEvent, Walk, Workflow } from '../engine/types';

/** Cảm xúc nhất thời do sự kiện thật gây ra (qua cổng, bị trả về, lỗi, video lên YouTube…). */
export type Emote = 'cheer' | 'thumbs' | 'no' | 'sad' | 'surprised' | 'wave' | 'dance';

/** Mọi thứ một nhân vật cần để tự vẽ trong một khung hình. Tính một lần, mọi lớp hiển thị đọc chung. */
export interface AgentPose {
  visible: boolean;
  x: number; z: number;
  face: number;              // hướng mong muốn (radian)
  sit: number;               // 0 đứng → 1 ngồi
  walking: boolean;
  walkSpeed: number;         // m/s theo đồng hồ xưởng
  carry: boolean;            // đang ôm hồ sơ
  cup: boolean;
  standing: boolean;         // đứng yên chỉ huy (đạo diễn)
  status: AgentStatus;
  action?: Action;
  progress: number;          // 0..1 khi đang làm, -1 nếu không
  line: string;              // dòng phụ trên nhãn
  rework: boolean;           // đang mang hồ sơ bị trả về
  emote?: Emote;
  emoteAge: number;          // giây thực kể từ khi bắt đầu cảm xúc
}

const pathCache = new WeakMap<Walk, { pts: P[]; len: number }>();
export function walkGeom(wf: Workflow, w: Walk) {
  let c = pathCache.get(w);
  if (!c) { const pts = walkPath(wf, w); c = { pts, len: pathLen(pts) }; pathCache.set(w, c); }
  return c;
}

/** Tư thế thuần: chỉ phụ thuộc state kênh và thời gian xưởng. */
export function computePose(ch: ChannelState, L: Layout, def: AgentDef, t: number, prevFace: number): AgentPose {
  const a = ch.agents[def.id];
  const base: AgentPose = { visible: false, x: 0, z: 0, face: prevFace, sit: 1, walking: false, walkSpeed: 0, carry: false, cup: false, standing: false, status: 'idle', progress: -1, line: '', rework: false, emoteAge: 0 };
  if (!a) return base;
  const p = base; p.visible = true;
  p.status = agentStatus(ch, a, t);
  if (def.role === 'director') {
    p.x = L.director.x; p.z = L.director.z; p.sit = 0; p.standing = true; p.face = Math.PI / 2;
  } else if (a.walk) {
    const w = a.walk, { pts, len } = walkGeom(ch.workflow, w);
    const e = t - w.start;
    const standFirst = w.from.kind === 'step' && (w.purpose === 'handoff' || w.purpose === 'rework' || w.purpose === 'break');
    const sitLast = w.purpose === 'return' || w.purpose === 'break-return';
    if (e < 0) { p.x = pts[0].x; p.z = pts[0].z; p.sit = 0; p.cup = w.purpose === 'break-return'; p.face = -Math.PI / 2; }
    else {
      const d = e - (standFirst ? STAND : 0);
      if (d < 0) { p.x = pts[0].x; p.z = pts[0].z; p.sit = 1 - e / STAND; }
      else {
        const dist = d * WALK_SPEED;
        if (dist < len) { const s = sample(pts, dist); p.x = s.x; p.z = s.z; p.face = s.dir; p.sit = 0; p.walking = true; p.walkSpeed = WALK_SPEED; }
        else {
          const end = pts[pts.length - 1]; p.x = end.x; p.z = end.z;
          p.sit = sitLast ? Math.min(1, (dist - len) / WALK_SPEED / STAND) : 0;
          p.face = sitLast ? 0 : prevFace;
        }
      }
    }
    p.carry = !!w.carrying && (w.purpose === 'handoff' || w.purpose === 'rework') && p.walking;
    p.rework = w.purpose === 'rework';
  } else {
    const home = homeStep(ch, def.id);
    const s = home ? seatOf(L, home) : { x: 0, z: 0 };
    p.x = s.x; p.z = s.z; p.face = 0;
  }
  p.action = a.stepId ? ch.workflow.steps.find(s => s.id === a.stepId)?.action : undefined;
  p.progress = p.status === 'working' ? progress(a, t) : -1;

  const job = a.jobId ? ch.jobs[a.jobId] : undefined;
  let line = job?.title ?? (def.role === 'director' ? `${Object.values(ch.jobs).filter(j => j.status === 'running').length} video đang chạy` : def.role === 'human' ? `${waitingHuman(ch).length} việc chờ duyệt` : 'Khay trống');
  if (a.walk) line = a.walk.purpose === 'handoff' ? `Mang “${job?.title ?? ''}”` : a.walk.purpose === 'rework' ? 'Trả về để sửa' : a.walk.purpose === 'break' ? 'Đi pha cà phê' : 'Quay về bàn';
  if (a.error) line = a.error;
  p.line = line;
  return p;
}

/* ---------- cảm xúc theo sự kiện ---------- */
const EMOTE_SECS: Record<Emote, number> = { cheer: 2.2, thumbs: 1.8, no: 1.8, sad: 3.5, surprised: 2.5, wave: 2, dance: 4 };

/** Ánh xạ event thật → ai phản ứng thế nào. Trả về [agentId, emote][]. */
export function emotesFor(ch: ChannelState, e: FactoryEvent): [string, Emote][] {
  const wf = ch.workflow;
  const owner = (stepId: string) => wf.steps.find(s => s.id === stepId)?.agentId;
  switch (e.type) {
    case 'gate.scored': {
      const out: [string, Emote][] = [[e.agentId, e.passed ? 'thumbs' : 'no']];
      if (!e.passed) { const gate = wf.steps.find(s => s.id === e.stepId)?.gate; const back = gate && owner(gate.reworkTo); if (back) out.push([back, 'sad']); }
      return out;
    }
    case 'step.failed': return [[e.agentId, 'surprised']];
    case 'human.approved': { const a = owner(e.stepId); return a ? [[a, 'cheer']] : []; }
    case 'job.done': {
      const dir = wf.agents.find(a => a.role === 'director')?.id;
      const pub = [...wf.steps].reverse().find(s => s.kind !== 'human')?.agentId;
      return [...(dir ? [[dir, 'dance'] as [string, Emote]] : []), ...(pub && pub !== dir ? [[pub, 'wave'] as [string, Emote]] : [])];
    }
    default: return [];
  }
}

/** Bộ nhớ cảm xúc của một tầng: nghe event, hết hạn theo giây thực. */
export class EmoteBook {
  private m = new Map<string, { e: Emote; at: number }>();
  push(id: string, e: Emote, now = performance.now()) { this.m.set(id, { e, at: now }); }
  get(id: string, now = performance.now()): { e: Emote; age: number } | undefined {
    const v = this.m.get(id); if (!v) return;
    const age = (now - v.at) / 1000;
    if (age > EMOTE_SECS[v.e]) { this.m.delete(id); return; }
    return { e: v.e, age };
  }
}

export { layout };
