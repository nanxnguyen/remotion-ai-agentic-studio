import { test } from 'node:test';
import assert from 'node:assert/strict';
import { E, setStyle } from '../../engine/core.js';
import * as H from '../../engine/horror.js';
import { mockCtx } from './mockctx.mjs';

setStyle('amhon');
const setAspect = vertical => { E.vertical = vertical; E.W = vertical ? 1080 : 1920; E.H = vertical ? 1920 : 1080; };
const finiteArgs = log => log.every(([, ...a]) => a.every(v => typeof v !== 'number' || Number.isFinite(v)));

test('flicker is deterministic and stays in (0, 1]', () => {
  for (let i = 0; i < 400; i++) {
    const t = i * 0.037;
    const v = H.flicker(t, { seed: 3 });
    assert.ok(v > 0 && v <= 1, `flicker(${t}) = ${v}`);
    assert.equal(v, H.flicker(t, { seed: 3 }));
  }
});

test('presence is a binary 0/1 blink', () => {
  for (let i = 0; i < 200; i++) assert.ok([0, 1].includes(H.presence(i * 0.05)));
});

test('punch only kicks in at the hit and decays back to 1', () => {
  assert.equal(H.punch(0.99, 1), 1);
  assert.ok(Math.abs(H.punch(1, 1, 0.16) - 1.16) < 1e-9);
  assert.ok(H.punch(1.2, 1) < H.punch(1.05, 1));
  assert.ok(H.punch(3, 1) - 1 < 0.001);
});

test('hush peaks just before the scare and is zero outside the window', () => {
  assert.equal(H.hush(0, 2, 0.6), 0);
  assert.ok(Math.abs(H.hush(1.7, 2, 0.6) - 1) < 1e-9);
  assert.equal(H.hush(2.5, 2, 0.6), 0);
});

test('creep and dollyZoom stay bounded over the shot', () => {
  for (const t of [0, 1, 2.5, 5]) {
    const c = H.creep(t, 5, 0.1);
    assert.ok(c >= 1 && c <= 1.1 + 1e-9);
    const d = H.dollyZoom(t, 5, 0.22);
    assert.ok(d.bg >= 1 && d.bg <= 1.22 + 1e-9 && d.fg <= 1 && d.fg >= 1 - 0.22 * 0.35 - 1e-9);
  }
});

test('dread tremble scales with fear and is zero without fear', () => {
  assert.deepEqual(H.dread(1.3, 0).map(Math.abs), [0, 0]);
  const lo = Math.hypot(...H.dread(1.3, 0.2)), hi = Math.hypot(...H.dread(1.3, 1));
  assert.ok(hi > lo);
});

test('scareFlash draws only inside its window', () => {
  const before = mockCtx(); H.scareFlash(before, 0.9, 1); assert.equal(before.log.length, 0);
  const during = mockCtx(); H.scareFlash(during, 1.05, 1); assert.ok(during.log.length > 0);
  const after = mockCtx(); H.scareFlash(after, 1.5, 1); assert.equal(after.log.length, 0);
});

for (const vertical of [false, true]) {
  test(`entities draw with finite coordinates (${vertical ? '9:16' : '16:9'})`, () => {
    setAspect(vertical);
    for (const kind of ['woman', 'child', 'bride', 'old']) {
      for (const reveal of [0, 0.5, 1]) {
        const g = mockCtx();
        H.ghost(g, { kind, reveal, reach: 0.6, t: 1.3 });
        assert.ok(g.log.length > 0, `ghost ${kind} drew nothing`);
        assert.ok(finiteArgs(g.log), `ghost ${kind} reveal=${reveal} produced NaN`);
      }
    }
    const s = mockCtx(); H.shadowFigure(s, { t: 2 }); assert.ok(s.log.length > 0 && finiteArgs(s.log));
    // darkness() needs a real canvas (document); it is covered by the hem-demo golden frames.
  });
}
setAspect(false);
