import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setStyle } from '../../engine/core.js';
import { roundTitle, dangerCard, tally, sizeCompare, ouch, sign, bug, BUGS } from '../../engine/explainer.js';
import { mockCtx } from './mockctx.mjs';

setStyle('dusk');
const texts = g => g.log.filter(c => c[0] === 'fillText').map(c => String(c[1]));

test('roundTitle shows the round number and title', () => {
  const g = mockCtx(); roundTitle(g, 0.8, { n: 3, title: 'BỌ HUNG GOLIATH' });
  assert.ok(texts(g).includes('#3') && texts(g).includes('BỌ HUNG GOLIATH'), JSON.stringify(texts(g)));
});

test('dangerCard: name, every stat label, bars fill over time', () => {
  const stats = [{ label: 'Nguy hiểm', v: 0.9, text: '9/10' }, { label: 'Kích thước', v: 0.3, text: '12 cm' }];
  const width = t => { const g = mockCtx(); dangerCard(g, t, { name: 'Nhện góa phụ', stats }); return g.log.filter(c => c[0] === 'roundRect' || c[0] === 'arcTo').length + texts(g).length; };
  const g = mockCtx(); const bars0 = dangerCard(g, 0.05, { name: 'Nhện góa phụ', stats }), bars1 = dangerCard(mockCtx(), 2, { name: 'Nhện góa phụ', stats });
  for (const s of ['Nhện góa phụ', 'Nguy hiểm', 'Kích thước']) assert.ok(texts(g).includes(s), s);
  assert.ok(bars1[0] > bars0[0] && Math.abs(bars1[0] / bars1[1] - 3) < 0.01, JSON.stringify([bars0, bars1]));
  assert.ok(width(2) > 0);
});

test('tally shows its count and pops right after an increment', () => {
  const g = mockCtx(); const sc = tally(g, { label: 'Số lần bị ăn', count: 4, since: 0.05 });
  assert.ok(texts(g).some(s => s.includes('4'))); assert.ok(sc > 1);
  assert.equal(tally(mockCtx(), { label: 'x', count: 4, since: 2 }), 1);
});

test('sizeCompare scales heights to the tallest item', () => {
  const h = sizeCompare(mockCtx(), 2, { items: [{ label: 'Người', h: 1.7 }, { label: 'Bọ', h: 0.17 }], maxH: 500 });
  assert.equal(h[0], 500); assert.ok(Math.abs(h[1] - 50) < 1e-9);
});

test('ouch pops then disappears; sign draws its words', () => {
  const g = mockCtx(); ouch(g, 0.1, 500, 500, { text: 'BỐP!' }); assert.ok(texts(g).includes('BỐP!'));
  const g2 = mockCtx(); ouch(g2, 0.9, 500, 500); assert.equal(g2.log.length, 0);
  const g3 = mockCtx(); sign(g3, 300, 800, 'ĐỪNG THỬ Ở NHÀ'); assert.ok(texts(g3).includes('ĐỪNG THỬ Ở NHÀ'));
});

test('bug draws every kind, all different, with a rim pass', () => {
  const sigs = new Set();
  for (const k of BUGS) { const g = mockCtx(); bug(g, k, { x: 500, y: 800, s: 1, t: 0.4, rim: { color: '#ffc68a', dir: [0, -1] } }); assert.ok(g.log.length > 8, k); sigs.add(JSON.stringify(g.log.slice(0, 60))); }
  assert.equal(sigs.size, BUGS.length);
});

test('caption groups break at sentence ends and pauses, max 4 words', async () => {
  const { captionGroup } = await import('../../engine/ui2d.js');
  const W = ['Nọc', 'độc', 'thần', 'kinh', 'đấy!', 'Vòng', 'hai', 'nào'].map((w, i) => ({ word: w, start: i * 0.3, end: i * 0.3 + 0.25 }));
  assert.deepEqual(captionGroup(W, 4, 4), [4, 5]);          // "đấy!" alone after the first 4 words
  assert.deepEqual(captionGroup(W, 5, 4), [5, 8]);          // a new sentence starts a new group
  const P = [{ word: 'a', start: 0, end: 0.2 }, { word: 'b', start: 0.3, end: 0.5 }, { word: 'c', start: 1.5, end: 1.7 }];
  assert.deepEqual(captionGroup(P, 2, 4), [2, 3]);          // a 1 s pause splits too
  assert.deepEqual(captionGroup(P, 0, 4), [0, 2]);
});
