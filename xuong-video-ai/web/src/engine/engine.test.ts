import { describe, expect, it } from 'vitest';
import { Factory } from './factory';
import { topo, validate } from './graph';
import { layout, pathLen, walkPath } from './layout';
import { CHANNELS } from './presets';
import type { ChannelState, Workflow } from './types';

function runFor(f: Factory, seconds: number, helpers = true) {
  for (let k = 0; k < seconds * 4; k++) {
    f.advance(0.25);
    if (!helpers) continue;
    for (const ch of Object.values(f.channels)) {
      for (const j of Object.values(ch.jobs)) {
        if (j.status !== 'running') continue;
        for (const [sid, st] of Object.entries(j.steps)) {
          if (st.status === 'waiting_human' && f.t - (st.requestedAt ?? 0) > 3) f.approve(ch.id, j.id, sid);
        }
      }
      for (const a of Object.values(ch.agents)) if (a.error) f.retry(ch.id, a.id);
    }
    checkInvariants(f);
  }
}

function checkInvariants(f: Factory) {
  for (const ch of Object.values(f.channels)) invariants(ch);
}

function invariants(ch: ChannelState) {
  const holders = new Map<string, string>();
  for (const a of Object.values(ch.agents)) {
    if (a.jobId && a.stepId && !a.walk) {
      expect(ch.jobs[a.jobId], `agent ${a.id} giữ video không tồn tại`).toBeTruthy();
      holders.set(`${a.jobId}/${a.stepId}`, a.id);
    }
    if (a.walk?.carrying) expect(ch.jobs[a.walk.carrying]).toBeTruthy();
  }
  for (const j of Object.values(ch.jobs)) {
    if (j.status !== 'running') continue;
    for (const [sid, st] of Object.entries(j.steps)) {
      if (st.status === 'active' || st.status === 'error') {
        expect(holders.has(`${j.id}/${sid}`), `${ch.id} ${j.id}/${sid} ${st.status} không có người làm`).toBe(true);
      }
      if (st.status === 'handoff') {
        const walker = Object.values(ch.agents).find(a => a.walk?.purpose === 'handoff' && a.walk.carrying === j.id && a.walk.stepId === sid);
        expect(walker, `${j.id}/${sid} đang chuyển mà không ai mang`).toBeTruthy();
      }
    }
  }
  for (const j of Object.values(ch.jobs)) {
    if (j.status === 'done') expect(Object.values(j.steps).every(s => s.status === 'done')).toBe(true);
  }
}

describe('graph', () => {
  it('3 workflow mặc định hợp lệ', () => {
    for (const c of CHANNELS) expect(validate(c.workflow)).toEqual([]);
  });
  it('phát hiện vòng lặp', () => {
    const wf: Workflow = structuredClone(CHANNELS[2].workflow);
    wf.edges.push({ from: 'publish', to: 'research' });
    expect(topo(wf)).toBeNull();
    expect(validate(wf).some(p => p.message.includes('vòng lặp'))).toBe(true);
  });
  it('cổng chỉ được trả về bước đứng trước', () => {
    const wf: Workflow = structuredClone(CHANNELS[0].workflow);
    wf.steps.find(s => s.id === 'review-script')!.gate!.reworkTo = 'render';
    expect(validate(wf).some(p => p.stepId === 'review-script')).toBe(true);
  });
});

describe('layout', () => {
  it('đường đi không xuyên qua phòng khác', () => {
    for (const c of CHANNELS) {
      const wf = c.workflow, L = layout(wf);
      const ids = wf.steps.map(s => s.id);
      for (const a of ids) for (const b of [...ids, 'exit', 'pantry']) {
        if (a === b) continue;
        const to = b === 'exit' ? { kind: 'exit' as const } : b === 'pantry' ? { kind: 'pantry' as const } : { kind: 'step' as const, id: b };
        const p = walkPath(wf, { from: { kind: 'step', id: a }, to, start: 0, dur: 0, purpose: b === 'pantry' ? 'break' : 'handoff' });
        expect(Number.isFinite(pathLen(p))).toBe(true);
        const len = pathLen(p);
        for (let d = 0; d <= len; d += 0.2) {
          // điểm trên đường
          let rest = d, pt = p[0];
          for (let i = 1; i < p.length; i++) {
            const l = Math.hypot(p[i].x - p[i - 1].x, p[i].z - p[i - 1].z);
            if (rest <= l) { const k = l ? rest / l : 0; pt = { x: p[i - 1].x + (p[i].x - p[i - 1].x) * k, z: p[i - 1].z + (p[i].z - p[i - 1].z) * k }; break; }
            rest -= l;
          }
          for (const id of ids) {
            if (id === a || id === b) continue;
            const r = L.rooms[id];
            const inside = Math.abs(pt.x - r.x) < 2.7 && Math.abs(pt.z - r.z) < 2.7;
            expect(inside, `${c.id}: ${a}→${b} xuyên phòng ${id}`).toBe(false);
          }
        }
      }
    }
  });
});

describe('mô phỏng', () => {
  it('chạy 30 phút không mất video, có xuất bản, có trả về, có song song', () => {
    const f = new Factory(CHANNELS, 11);
    runFor(f, 1800);
    for (const ch of Object.values(f.channels)) {
      const done = Object.values(ch.jobs).filter(j => j.status === 'done').length;
      expect(done, `${ch.id} phải có video xong`).toBeGreaterThan(5);
    }
    const log = f.logs.hcl;
    expect(log.some(e => e.type === 'step.reworked')).toBe(true);
    expect(log.some(e => e.type === 'gate.scored' && e.passed)).toBe(true);
    // nhánh song song: lồng tiếng và storyboard cùng chạy cho một video
    const ch = f.channels.hcl;
    const overlap = Object.values(ch.jobs).some(j => {
      const v = j.steps.voice.runs, s = j.steps.storyboard.runs;
      return v.some(a => s.some(b => a.start < (b.end ?? Infinity) && b.start < (a.end ?? Infinity)));
    });
    expect(overlap).toBe(true);
  });

  it('tua lại ra đúng state hiện tại và state quá khứ hợp lệ', () => {
    const f = new Factory(CHANNELS, 3);
    runFor(f, 600);
    const now = f.stateAt('hcl', f.t);
    expect(JSON.stringify(now.jobs)).toEqual(JSON.stringify(f.channels.hcl.jobs));
    const past = f.stateAt('hcl', 200);
    expect(Object.keys(past.jobs).length).toBeLessThan(Object.keys(now.jobs).length);
    invariants(past);
  });

  it('xuất bản workflow giữa chừng vẫn chạy tiếp', () => {
    const f = new Factory(CHANNELS, 5);
    runFor(f, 300);
    const draft: Workflow = structuredClone(f.channels.hcl.workflow);
    // bỏ bước Âm thanh, nối Lồng tiếng thẳng vào Dựng phim, thêm bước Phụ đề
    draft.steps = draft.steps.filter(s => s.id !== 'sound');
    draft.edges = draft.edges.filter(e => e.from !== 'sound' && e.to !== 'sound');
    draft.edges.push({ from: 'voice', to: 'subs' }, { from: 'subs', to: 'render' });
    draft.steps.push({ ...draft.steps.find(s => s.id === 'voice')!, id: 'subs', name: 'Phụ đề', action: 'write', prop: 'script', tokens: [500, 900] });
    expect(f.publish('hcl', draft, 'Thay Âm thanh bằng Phụ đề')).toEqual([]);
    expect(f.channels.hcl.workflow.version).toBe(2);
    const before = Object.values(f.channels.hcl.jobs).filter(j => j.status === 'done').length;
    runFor(f, 600);
    const after = Object.values(f.channels.hcl.jobs).filter(j => j.status === 'done').length;
    expect(after).toBeGreaterThan(before + 2);
  });

  it('hủy và chạy lại từ một bước', () => {
    const f = new Factory(CHANNELS, 9);
    runFor(f, 400);
    const ch = f.channels.lab;
    const running = Object.values(ch.jobs).find(j => j.status === 'running')!;
    f.cancel('lab', running.id);
    expect(ch.jobs[running.id].status).toBe('cancelled');
    const done = Object.values(ch.jobs).find(j => j.status === 'done')!;
    f.rerun('lab', done.id, 'render');
    expect(ch.jobs[done.id].status).toBe('running');
    expect(ch.jobs[done.id].steps.render.status).toBe('pending');
    runFor(f, 300);
    expect(ch.jobs[done.id].status).toBe('done');
  });
});
