import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setStyle, visemeAt, E } from '../../engine/core.js';
import { drawFigure, face, bigFace, POSES, HANDS, VISEMES } from '../../engine/rig2d.js';
import { mockCtx } from './mockctx.mjs';

setStyle('dusk');
const base = { x: 500, y: 800, s: 1.6, pose: POSES.explain, outfit: { top: 'hoodie', color: '#d64a33', head: 'ponytail' }, expr: 'smile', rim: { color: '#ffc68a', dir: [-1, -0.3] } };
const ops = o => { const g = mockCtx(); drawFigure(g, o); return g.log; };

test('defaults draw exactly as before (no new options = no extra ops)', () => {
  assert.deepEqual(ops(base), ops({ ...base, squash: 0, swing: 0 }));
});

test('squash scales the body around the feet, preserving area', () => {
  const sc = ops({ ...base, squash: 0.2 }).filter(c => c[0] === 'scale');
  const hit = sc.find(c => Math.abs(c[2] / 1.6 - 0.8) < 1e-9);
  assert.ok(hit, 'a scale with sy = s * 0.8');
  assert.ok(Math.abs((hit[1] / 1.6) * (hit[2] / 1.6) - 1) < 1e-9, 'sx * sy = 1');
});

test('every hand shape draws extra geometry, in both rim and body passes', () => {
  const n0 = ops(base).length;
  for (const h of Object.keys(HANDS)) {
    const n = ops({ ...base, hands: h }).length;
    assert.ok(n > n0 + 2, `${h}: ${n} vs ${n0}`);
  }
  assert.ok(ops({ ...base, hands: { F: 'point', B: 'open' } }).length > n0);
});

test('swing bends the ponytail', () => {
  assert.notDeepEqual(ops({ ...base, swing: 0.4 }), ops(base));
});

test('visemes: 7 mouth shapes, each different from the others', () => {
  const sig = v => { const g = mockCtx(); face(g, 0, 0, 26, { expr: 'neutral', viseme: v }); return JSON.stringify(g.log); };
  const all = VISEMES.map(sig);
  assert.equal(VISEMES.length, 7);
  assert.equal(new Set(all).size, 7);
});

test('expression cross-fade draws both faces with complementary alpha', () => {
  const g = mockCtx(); face(g, 0, 0, 26, { expr: { from: 'neutral', to: 'shocked', k: 0.25 } });
  const alphas = g.log.filter(c => c[0] === 'alpha').map(c => +c[1].toFixed(3));
  assert.ok(alphas.includes(0.75) && alphas.includes(0.25), JSON.stringify(alphas));
});

test('bigFace accepts viseme and expression blends', () => {
  const g = mockCtx(); bigFace(g, 0, 0, 300, { expr: { from: 'sad', to: 'joy', k: 0.5 }, viseme: 'O' }); assert.ok(g.log.length > 10);
});

test('visemeAt reads timeline visemes inside a window only', () => {
  E.visemes = [{ t: 1.0, v: 'M' }, { t: 1.1, v: 'A' }, { t: 1.4, v: 'rest' }];
  assert.equal(visemeAt(1.05), 'M'); assert.equal(visemeAt(1.2), 'A'); assert.equal(visemeAt(1.5), 'rest');
  assert.equal(visemeAt(1.2, 2, 3), null, 'outside the speaking window');
  E.visemes = [];
  assert.equal(visemeAt(1.2), null);
});

test('wordTime matches Vietnamese words with diacritics exactly', async () => {
  const { wordTime } = await import('../../engine/core.js');
  E.words = [{ word: 'Nhìn', start: 1, end: 1.3 }, { word: 'này!', start: 1.4, end: 1.7 }, { word: 'nay', start: 2, end: 2.2 }];
  assert.equal(wordTime('này'), 1.4);
  assert.equal(wordTime('nay'), 2);
  assert.equal(wordTime('nhìn'), 1);
  E.words = [{ word: 'bố', start: 1, end: 1.2 }, { word: 'bà', start: 2, end: 2.2 }];
  assert.equal(wordTime('bà'), 2, 'diacritics must not be stripped (bà ≠ bố)');
  E.words = [];
});

test('jersey numbers read correctly when the figure faces left', () => {
  const o = { x: 500, y: 800, s: 1.5, pose: POSES.stand, outfit: { top: 'jersey', color: '#3fb950', number: '10' } };
  // replay save/restore/scale to get the horizontal sign of the transform when the number is drawn
  const signAtText = f => { const g = mockCtx(); drawFigure(g, { ...o, facing: f }); const st = []; let sx = 1;
    for (const c of g.log) { if (c[0] === 'save') st.push(sx); else if (c[0] === 'restore') sx = st.pop(); else if (c[0] === 'scale') sx *= Math.sign(c[1]); else if (c[0] === 'fillText' && c[1] === '10') return sx; } };
  assert.equal(signAtText(1), 1);
  assert.equal(signAtText(-1), 1, 'text must not be mirrored');
});

test('mascot species heads (dog, cat, bear) add ears/snout in both the rim and body passes', () => {
  const o = { x: 500, y: 800, s: 1.6, pose: POSES.stand, outfit: { top: 'tshirt', color: '#f2c21a' }, rim: { color: '#ffc68a', dir: [0, -1] } };
  const n0 = (() => { const g = mockCtx(); drawFigure(g, o); return g.log.length; })();
  const sigs = new Set();
  for (const sp of ['dog', 'cat', 'bear']) {
    const g = mockCtx(); drawFigure(g, { ...o, outfit: { ...o.outfit, species: sp } });
    assert.ok(g.log.length > n0 + 4, sp); sigs.add(JSON.stringify(g.log));
    const b = mockCtx(); bigFace(b, 0, 0, 300, { outfit: { species: sp }, expr: 'happy' }); assert.ok(b.log.length > 10);
  }
  assert.equal(sigs.size, 3);
});
