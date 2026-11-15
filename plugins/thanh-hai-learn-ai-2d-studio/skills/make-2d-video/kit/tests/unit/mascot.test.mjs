import test from 'node:test';
import assert from 'node:assert/strict';
import { mockCtx } from './mockctx.mjs';
import { setStyle } from '../../engine/core.js';
import { mascot, mascotFace, inked, MASCOT_POSES, MASCOT_EXPRS } from '../../engine/mascot.js';
setStyle('dusk');
const log = o => { const g = mockCtx(); mascot(g, { x: 500, y: 900, s: 1.5, t: 0.4, ...o }); return JSON.stringify(g.log); };

test('every pose draws a different body', () => {
  const sigs = new Set(MASCOT_POSES.map(p => log({ pose: p })));
  assert.equal(sigs.size, MASCOT_POSES.length);
});
test('every expression draws a different face (full body and close-up)', () => {
  assert.equal(new Set(MASCOT_EXPRS.map(e => log({ expr: e, blink: false }))).size, MASCOT_EXPRS.length);
  const faces = new Set(MASCOT_EXPRS.map(e => { const g = mockCtx(); mascotFace(g, 500, 500, 120, { expr: e, blink: false, t: 0.5 }); return JSON.stringify(g.log); }));
  assert.equal(faces.size, MASCOT_EXPRS.length);
});
test('visemes open the jaw; facing mirrors', () => {
  assert.notEqual(log({ viseme: 'A', expr: 'happy' }), log({ viseme: 'M', expr: 'happy' }));
  assert.notEqual(log({ facing: 1 }), log({ facing: -1 }));
});
test('inked falls back to drawing straight through without a real canvas', () => {
  const g = mockCtx(); let called = 0; inked(g, () => { called++; }); assert.equal(called, 1);
});
