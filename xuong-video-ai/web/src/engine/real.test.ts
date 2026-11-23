import { describe, expect, it } from 'vitest';
import { Factory } from './factory';
import { CHANNELS } from './presets';
import type { RealHooks, RealResult } from './sim';

const REAL = new Set(['research', 'script', 'review-script']);

function fakeHooks(opts: { scores?: number[]; failFirst?: boolean; budget?: number } = {}) {
  const pending = new Map<string, { at: number; res: RealResult }>();
  const calls: string[] = [];
  let scoreIdx = 0, spent = 0, failed = false;
  let now = 0;
  const hooks: RealHooks = {
    isReal: (ch, s) => ch === 'hcl' && REAL.has(s.id),
    canStart: () => (opts.budget !== undefined && spent >= opts.budget ? `Hết ngân sách ngày ($${opts.budget})` : null),
    start: (ch, job, step) => {
      calls.push(step.id);
      let res: RealResult = { tokens: 1000, cost: 0.05, output: `Kết quả thật cho ${step.id}` };
      if (opts.failFirst && !failed) { failed = true; res = { tokens: 0, cost: 0, output: '', error: 'API 529 quá tải' }; }
      if (step.id === 'review-script') res = { ...res, score: opts.scores?.[scoreIdx++] ?? 90, reasons: ['Hook yếu'] };
      spent += res.cost;
      pending.set(`${ch}/${job.id}/${step.id}`, { at: now + 3, res });
    },
    take: (ch, jobId, stepId) => {
      const k = `${ch}/${jobId}/${stepId}`, p = pending.get(k);
      if (p && now >= p.at) { pending.delete(k); return p.res; }
      return undefined;
    },
  };
  return { hooks, calls, tick: (t: number) => { now = t; } };
}

function run(f: Factory, fake: ReturnType<typeof fakeHooks>, seconds: number) {
  for (let k = 0; k < seconds * 4; k++) { f.advance(0.25); fake.tick(f.t); }
}

describe('bước chạy bằng Claude thật', () => {
  it('chỉ gọi 3 bước thật, kết quả thật đi vào log, các bước sau ghi (mock)', () => {
    const fake = fakeHooks();
    const f = new Factory(CHANNELS, 1, {}, { real: fake.hooks, autoSpawn: { hcl: false } });
    f.addJob('hcl', 'Cây đa đầu làng');
    run(f, fake, 400);
    expect(fake.calls).toEqual(['research', 'script', 'review-script']);
    const j = f.channels.hcl.jobs['HCL-001'];
    expect(j.steps.research.runs[0].output).toBe('Kết quả thật cho research');
    expect(j.steps.voice.runs[0].output?.startsWith('(mock)')).toBe(true);
    expect(j.steps['review-script'].runs[0].score).toBe(90);
    expect(Object.keys(f.channels.hcl.jobs)).toEqual(['HCL-001']);   // không tự sinh video ở kênh thật
  });

  it('điểm thật dưới ngưỡng thì trả về biên kịch và gọi lại Claude', () => {
    const fake = fakeHooks({ scores: [60, 88] });
    const f = new Factory(CHANNELS, 2, {}, { real: fake.hooks, autoSpawn: { hcl: false } });
    f.addJob('hcl', 'Giếng cổ');
    run(f, fake, 200);
    expect(fake.calls).toEqual(['research', 'script', 'review-script', 'script', 'review-script']);
    expect(f.logs.hcl.some(e => e.type === 'gate.scored' && !e.passed && e.reasons[0] === 'Hook yếu')).toBe(true);
  });

  it('lỗi API thì tự thử lại một lần', () => {
    const fake = fakeHooks({ failFirst: true });
    const f = new Factory(CHANNELS, 3, {}, { real: fake.hooks, autoSpawn: { hcl: false } });
    f.addJob('hcl', 'Bóng đèn dầu');
    run(f, fake, 120);
    expect(fake.calls.slice(0, 2)).toEqual(['research', 'research']);
    expect(f.logs.hcl.some(e => e.type === 'step.failed' && e.retry)).toBe(true);
  });

  it('hết ngân sách thì giữ trong khay và ghi lý do', () => {
    const fake = fakeHooks({ budget: 0.05 });
    const f = new Factory(CHANNELS, 4, {}, { real: fake.hooks, autoSpawn: { hcl: false } });
    f.addJob('hcl', 'A'); f.addJob('hcl', 'B');
    run(f, fake, 120);
    expect(fake.calls).toEqual(['research']);
    expect(f.logs.hcl.filter(e => e.type === 'step.blocked').length).toBeGreaterThan(0);
    expect(f.channels.hcl.jobs['HCL-002'].steps.research.blocked).toContain('Hết ngân sách');
  });

  it('dựng lại từ log ra đúng state', () => {
    const fake = fakeHooks();
    const f = new Factory(CHANNELS, 5, {}, { real: fake.hooks, autoSpawn: { hcl: false } });
    f.addJob('hcl', 'X');
    run(f, fake, 300);
    const g = new Factory(CHANNELS, 99);
    g.replay(f.logs.hcl);
    expect(JSON.stringify(g.channels.hcl.jobs)).toEqual(JSON.stringify(f.channels.hcl.jobs));
  });
});
