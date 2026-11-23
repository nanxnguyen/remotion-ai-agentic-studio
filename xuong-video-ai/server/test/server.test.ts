import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { Factory } from '../../web/src/engine/factory';
import { CHANNELS } from '../../web/src/engine/presets';
import { ClaudeExecutor, parseReview, type Llm } from '../src/claude';
import { loadConfig } from '../src/config';

function setup(llm: Llm, over: Record<string, unknown> = {}) {
  const cfg = { ...loadConfig(), dataDir: mkdtempSync(join(tmpdir(), 'xv-')), ...over };
  const ex = new ClaudeExecutor(cfg, llm);
  const f = new Factory(CHANNELS, 7, {}, { real: ex, autoSpawn: { hcl: false, olise: false, lab: false } });
  ex.bind(f);
  return { cfg, ex, f };
}
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
async function runUntil(f: Factory, ok: () => boolean, maxMs = 20000) {
  const t0 = Date.now();
  while (!ok() && Date.now() - t0 < maxMs) { f.advance(2); await sleep(5); }
}

const quick = (score = 88): Llm & { calls: string[] } => {
  const calls: string[] = [];
  return { calls, async call(c) {
    await sleep(10); calls.push(c.system.includes('"score"') ? 'review' : c.webSearch ? 'research' : 'script');
    if (c.system.includes('"score"')) return { text: `Đây: {"score": ${score}, "reasons": ["ok"], "summary": "tốt"}`, inTok: 2000, outTok: 200, searches: 0 };
    return { text: 'Nội dung thật', inTok: 4000, outTok: 1200, searches: c.webSearch ? 2 : 0 };
  } };
};

describe('server + Claude executor', () => {
  it('chạy 3 bước thật, ghi sổ chi tiêu và lưu bản nháp', async () => {
    const llm = quick();
    const { f, ex, cfg } = setup(llm);
    f.addJob('hcl', 'Cây đa đầu làng');
    const job = () => Object.values(f.channels.hcl.jobs)[0];
    await runUntil(f, () => job().steps['review-script']?.status === 'done' || job().steps['voice']?.status !== 'pending');
    expect(llm.calls).toEqual(['research', 'script', 'review']);
    expect(ex.ledger.length).toBe(3);
    expect(ex.spentToday('hcl')).toBeGreaterThan(0);
    const files = readdirSync(join(cfg.dataDir, 'jobs', job().id));
    expect(files.sort()).toEqual(['research-1.md', 'review-script-1.md', 'script-1.md']);
    expect(readFileSync(join(cfg.dataDir, 'ledger.jsonl'), 'utf8').trim().split('\n').length).toBe(3);
  }, 30000);

  it('chặn khi vượt ngân sách ngày', async () => {
    const { f } = setup(quick(), { dailyCapUsd: 0.01 });
    f.addJob('hcl', 'X');
    await runUntil(f, () => f.logs.hcl.some(e => e.type === 'step.blocked'), 3000);
    const b = f.logs.hcl.find(e => e.type === 'step.blocked') as { reason: string } | undefined;
    expect(b?.reason).toMatch(/ngân sách ngày/);
  });

  it('dừng khẩn cấp hủy lượt đang chờ', async () => {
    const { f, ex } = setup(quick());
    ex.stop();
    f.addJob('hcl', 'Y');
    await runUntil(f, () => f.logs.hcl.some(e => e.type === 'step.blocked'), 3000);
    expect(f.logs.hcl.some(e => e.type === 'step.blocked')).toBe(true);
  });

  it('đọc điểm JSON có chữ thừa, trả null nếu hỏng', () => {
    expect(parseReview('abc {"score": 79.6, "reasons":["a"]} xyz', 80)?.score).toBe(80);
    expect(parseReview('không có json', 80)).toBeNull();
  });
});
