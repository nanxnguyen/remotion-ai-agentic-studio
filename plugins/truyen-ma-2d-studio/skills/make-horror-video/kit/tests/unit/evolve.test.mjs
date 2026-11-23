import { test } from 'node:test';
import assert from 'node:assert/strict';
import { E, setStyle } from '../../engine/core.js';
import { POSES } from '../../engine/rig2d.js';
import { stageAt, stagesFromShots, counterAt, fmtCounter, ageLook, agePose, creature, CREATURES, evoOverlay } from '../../engine/evolve.js';
import { mockCtx } from './mockctx.mjs';

setStyle('dusk');
const ST = [{ start: 0, end: 2, value: 2000, title: 'A' }, { start: 2, end: 5, value: 2006, title: 'B' }, { start: 5, end: 8, value: 2014, title: 'C' }];

test('stageAt finds the stage, local time and progress', () => {
  assert.equal(stageAt(0.5, ST).i, 0); assert.equal(stageAt(2, ST).i, 1); assert.equal(stageAt(9, ST).i, 2);
  const s = stageAt(3.5, ST); assert.equal(s.local, 1.5); assert.equal(s.k, 0.5); assert.equal(s.prev.title, 'A'); assert.equal(s.next.title, 'C');
  assert.equal(stageAt(-1, ST).i, 0);
});

test('stagesFromShots keeps only shots tagged with params.stage, in order', () => {
  const shots = [{ id: 'h', start: 0, end: 1.5, params: { hook: true } }, { id: 'a', start: 1.5, end: 3, params: { stage: 0, value: 1, title: 'x' } }, { id: 'b', start: 3, end: 5, params: { stage: 1, value: 5, title: 'y' } }, { id: 'o', start: 5, end: 7 }];
  const st = stagesFromShots(shots); assert.deepEqual(st.map(s => s.title), ['x', 'y']); assert.equal(st[0].start, 1.5);
  const split = stagesFromShots([{ start: 0, end: 4, params: { stage: 0 } }, { start: 4, end: 9, params: { stage: 0, part: 1 } }, { start: 9, end: 12, params: { stage: 1 } }]);
  assert.equal(split.length, 2); assert.equal(split[0].end, 9);
});

test('counterAt rolls from the previous value to the new one, then holds', () => {
  assert.equal(counterAt(1, ST), 2000);
  const mid = counterAt(2.2, ST); assert.ok(mid > 2000 && mid < 2006, `${mid}`);
  assert.equal(counterAt(3, ST), 2006);
  assert.equal(counterAt(7, ST), 2014);
});

test('fmtCounter: years, ages and deep time in Vietnamese and English', () => {
  assert.equal(fmtCounter(2006.4, 'year', 'vi'), '2006');
  assert.equal(fmtCounter(12.2, 'age', 'vi'), '12 tuổi'); assert.equal(fmtCounter(12, 'age', 'en'), 'Age 12');
  assert.equal(fmtCounter(0.4, 'age', 'vi'), 'Sơ sinh'); assert.equal(fmtCounter(0, 'age', 'en'), 'Newborn');
  assert.equal(fmtCounter(3.5e9, 'ago', 'vi'), '3,5 tỷ năm trước'); assert.equal(fmtCounter(3.5e9, 'ago', 'en'), '3.5 billion years ago');
  assert.equal(fmtCounter(375e6, 'ago', 'vi'), '375 triệu năm trước'); assert.equal(fmtCounter(6e6, 'ago', 'en'), '6 million years ago');
  assert.equal(fmtCounter(300000, 'ago', 'vi'), '300 nghìn năm trước'); assert.equal(fmtCounter(0, 'ago', 'vi'), 'Hôm nay');
});

test('ageLook: size grows to adulthood; kids flagged; seniors stoop', () => {
  const ages = [0, 3, 8, 14, 25, 70].map(ageLook);
  for (let i = 1; i < 5; i++) assert.ok(ages[i].s > ages[i - 1].s, `age step ${i}`);
  assert.equal(ages[0].kid, false); assert.ok(ages[0].s < 0.5);
  assert.ok(ages[5].stoop > 0 && ages[4].stoop === 0);
  assert.deepEqual(agePose(POSES.stand, 30), POSES.stand);
  assert.ok(agePose(POSES.stand, 80).head[1] > POSES.stand.head[1], 'old head lower');
});

test('creature draws every species silhouette with a rim pass', () => {
  const sigs = new Set();
  for (const k of CREATURES) {
    const g = mockCtx(); creature(g, k, { x: 500, y: 800, s: 1, t: 0.3, rim: { color: '#ffc68a', dir: [0, -1] } });
    assert.ok(g.log.length > 5, k); sigs.add(JSON.stringify(g.log.slice(0, 40)));
  }
  assert.equal(sigs.size, CREATURES.length, 'all different');
});

test('evoOverlay draws counter, title, timeline and the transition burst', () => {
  E.shots = [{ id: 'a', start: 0, end: 2, params: { stage: 0, value: 2000, title: 'A' } }, { id: 'b', start: 2, end: 5, params: { stage: 1, value: 2006, title: 'B' } }];
  E.cfg = { lang: 'vi', evolution: { counter: 'year' } };
  const g1 = mockCtx(); evoOverlay(g1, 0.1, { globalT: 2.1, shot: E.shots[1] });
  const g2 = mockCtx(); evoOverlay(g2, 1.5, { globalT: 3.5, shot: E.shots[1] });
  const texts = g => g.log.filter(c => c[0] === 'fillText').map(c => c[1]);
  assert.ok(texts(g2).includes('2006') && texts(g2).includes('B'), JSON.stringify(texts(g2)));
  assert.ok(g1.log.length > g2.log.length, 'burst only at the start of a stage');
  E.shots = []; E.cfg = {};
});
