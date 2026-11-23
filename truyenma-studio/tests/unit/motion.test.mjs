import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spring, act, arcBlend, beatHold, follow, impact, squashScale, onTwos, boilPose, saccade } from '../../engine/motion.js';
import { POSES } from '../../engine/rig2d.js';

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

test('spring: starts at 0, overshoots 4–10%, settles within 1% by 0.5 s', () => {
  assert.equal(spring(0), 0); assert.equal(spring(-1), 0);
  let peak = 0; for (let t = 0; t <= 0.5; t += 1 / 240) peak = Math.max(peak, spring(t));
  assert.ok(peak > 1.04 && peak < 1.10, `peak ${peak}`);
  for (let t = 0.5; t < 2; t += 0.05) assert.ok(Math.abs(spring(t) - 1) < 0.01, `t=${t} v=${spring(t)}`);
});

test('act: anticipation moves the hand away from the target before the key', () => {
  const keys = [[0, 'stand'], [1, 'point']];
  const start = POSES.stand.hF, target = POSES.point.hF;
  const p = act(0.95, keys);
  assert.ok(dist(p.hF, target) - dist(start, target) >= 8, `pulled back ${dist(p.hF, target) - dist(start, target)}`);
  assert.deepEqual(act(0.5, keys).hF, start, 'holds the first pose before the anticipation window');
});

test('act: overshoots then settles on the target pose', () => {
  const keys = [[0, 'stand'], [1, 'point']];
  const target = POSES.point.hF;
  const at = t => act(t, keys).hF;
  let over = 0; for (let t = 1; t < 1.4; t += 1 / 96) over = Math.max(over, dist(at(t), POSES.stand.hF) - dist(target, POSES.stand.hF));
  assert.ok(over > 1, `no overshoot (${over})`);
  assert.ok(dist(at(1.6), target) < 1.5, `not settled ${dist(at(1.6), target)}`);
});

test('arcBlend: hand travels on an arc around the shoulder, not a straight line', () => {
  const a = POSES.stand, b = POSES.pointUp, m = arcBlend(a, b, 0.5);
  const r = p => dist(p.hF, p.sh);
  const straightMid = [(a.hF[0] + b.hF[0]) / 2, (a.hF[1] + b.hF[1]) / 2];
  assert.ok(Math.abs(r(m) - (r(a) + r(b)) / 2) < 0.03 * r(a), 'radius kept');
  assert.ok(dist(m.hF, a.sh) > dist(straightMid, a.sh) + 5, 'bulges outward vs a straight line');
});

test('beatHold: freezes before the beat, snaps, then runs in real time', () => {
  const fps = 24, at = 2, hold = 8;
  const a = beatHold(at - 6 / fps, at, hold, fps), b = beatHold(at - 1 / fps, at, hold, fps);
  assert.equal(a, b, 'frozen during the hold');
  assert.equal(beatHold(1, at, hold, fps), 1);
  assert.ok(Math.abs(beatHold(at + 0.5, at, hold, fps) - (at + 0.5)) < 1e-9);
  assert.ok(beatHold(at + 1 / fps, at, hold, fps) > at - 1e-9, 'caught up quickly');
});

test('follow: secondary motion lags, keeps swinging 0.3–0.6 s after a hard stop, then rests', () => {
  const drive = t => (t < 1 ? t * 200 : 200); // moves at 200 u/s then stops dead at t=1
  const lag = t => follow(drive, t) - drive(t);
  assert.ok(Math.abs(lag(0.9)) > 2, 'lags while moving');
  assert.ok(Math.abs(lag(1.3)) > 1, `still swinging at +0.3 s (${lag(1.3)})`);
  assert.ok(Math.abs(lag(2.0)) < 0.5, `settled by +1 s (${lag(2.0)})`);
});

test('impact + squashScale: squash keeps area, decays after landing', () => {
  for (const s of [-0.3, -0.1, 0, 0.15, 0.3]) { const [sx, sy] = squashScale(s); assert.ok(Math.abs(sx * sy - 1) < 1e-9); }
  assert.equal(impact(0.9, 1), 0);
  assert.ok(impact(1.02, 1) > 0.1, 'squashes on contact');
  assert.ok(Math.abs(impact(1.8, 1)) < 0.01, 'settles');
});

test('onTwos holds each drawing for 2 frames', () => {
  const fps = 24; for (let f = 0; f < 20; f += 2) assert.equal(onTwos(f / fps, fps), onTwos((f + 1) / fps, fps));
  assert.notEqual(onTwos(0, fps), onTwos(2 / fps, fps));
});

test('boilPose: deterministic, 3 variants changing every 2 frames, small amplitude', () => {
  const fps = 24, p = POSES.stand;
  assert.deepEqual(boilPose(p, 0, 1.2, fps), boilPose(p, 1 / fps, 1.2, fps));
  assert.deepEqual(boilPose(p, 0, 1.2, fps), boilPose(p, 6 / fps, 1.2, fps), 'cycle of 3 drawings');
  assert.notDeepEqual(boilPose(p, 0, 1.2, fps), boilPose(p, 2 / fps, 1.2, fps));
  for (const k in p) assert.ok(dist(boilPose(p, 2 / fps, 1.2, fps)[k], p[k]) <= 1.2 * Math.SQRT2 + 1e-9);
});

test('saccade: eyes hold, then jump; deterministic', () => {
  assert.deepEqual(saccade(5, 3), saccade(5, 3));
  let jumps = 0, prev = saccade(0, 1); for (let t = 0; t < 12; t += 1 / 24) { const s = saccade(t, 1); if (Math.hypot(s[0] - prev[0], s[1] - prev[1]) > 0.05) jumps++; prev = s; }
  assert.ok(jumps >= 3 && jumps <= 10, `jumps ${jumps}`);
});
