import { describe, expect, it } from 'vitest';
import { layout } from '../engine/layout';
import { CHANNELS } from '../engine/presets';
import { initChannel } from '../engine/reducer';
import { computePose, EmoteBook, emotesFor } from './poses';

const ch = () => initChannel(CHANNELS.find(c => c.id === 'hcl')!, 0);

describe('World: tư thế và cảm xúc', () => {
  it('agent rảnh ngồi đúng ghế của phòng mình, đạo diễn đứng ở sân khấu', () => {
    const c = ch(), L = layout(c.workflow);
    const writer = c.workflow.steps.find(s => s.id === 'script')!;
    const p = computePose(c, L, c.workflow.agents.find(a => a.id === writer.agentId)!, 0, 0);
    expect(p.visible).toBe(true);
    expect(p.sit).toBe(1);
    expect(p.x).toBeCloseTo(L.rooms.script.x);
    const dir = computePose(c, L, c.workflow.agents.find(a => a.role === 'director')!, 0, 0);
    expect(dir.standing).toBe(true);
    expect(dir.x).toBeCloseTo(L.director.x);
  });

  it('cổng không đạt: người chấm lắc đầu, người bị trả về buồn', () => {
    const c = ch();
    const gateStep = c.workflow.steps.find(s => s.gate)!;
    const back = c.workflow.steps.find(s => s.id === gateStep.gate!.reworkTo)!;
    const out = emotesFor(c, { t: 1, ch: 'hcl', type: 'gate.scored', jobId: 'J', stepId: gateStep.id, agentId: gateStep.agentId, score: 60, threshold: 80, passed: false, reasons: [] });
    expect(out).toContainEqual([gateStep.agentId, 'no']);
    expect(out).toContainEqual([back.agentId, 'sad']);
  });

  it('video lên YouTube: đạo diễn nhảy mừng; cảm xúc tự hết hạn', () => {
    const c = ch();
    const out = emotesFor(c, { t: 1, ch: 'hcl', type: 'job.done', jobId: 'J' });
    const dir = c.workflow.agents.find(a => a.role === 'director')!.id;
    expect(out).toContainEqual([dir, 'dance']);
    const book = new EmoteBook();
    book.push(dir, 'dance', 0);
    expect(book.get(dir, 1000)?.e).toBe('dance');
    expect(book.get(dir, 60_000)).toBeUndefined();
  });
});
