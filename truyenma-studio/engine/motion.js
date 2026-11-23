// engine/motion.js — the animation principles as small, deterministic functions (no Math.random, no clocks).
// Use them on top of rig2d poses so characters move like hand-animated cartoons instead of sliding between poses:
//   act(t, keys)            anticipation -> action (arc) -> overshoot -> settle, per pose key
//   arcBlend(a, b, k)       blend two poses with hands/elbows travelling on arcs around the shoulder
//   spring(t)               0 -> 1 step with a small overshoot (≈8%) that settles in ≈0.4 s
//   follow(fn, t)           secondary / follow-through: a lagging, springy copy of any 1-D driver
//   impact(t, at)           decaying squash value after a landing or a hit; squashScale(s) -> [sx, sy] (area kept)
//   beatHold(t, at)         freeze 6–12 frames before a punchline word, then snap back to real time
//   onTwos(t)               hold each drawing for 2 frames (hand-drawn cadence)
//   boilPose(p, t)          3-drawing line boil: tiny deterministic jitter that changes every 2 frames
//   saccade(t, seed)        eye darts: hold a look 1.5–3 s, then jump
import { E, clamp, lerp, ease } from './core.js';
import { POSES } from './rig2d.js';

const TAU = Math.PI * 2;
const asPose = p => (typeof p === 'string' ? POSES[p] || POSES.stand : p);
const h1 = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// Under-damped step response. freq in Hz, damp = damping ratio (0.62 -> ≈8% overshoot).
export function spring(t, freq = 3, damp = 0.62) {
  if (t <= 0) return 0;
  const w = TAU * freq, wd = w * Math.sqrt(1 - damp * damp);
  return 1 - Math.exp(-damp * w * t) * (Math.cos(wd * t) + ((damp * w) / wd) * Math.sin(wd * t));
}

// Decaying oscillation after a contact at `at` (positive = squash). Feed it to drawFigure({ squash }).
export function impact(t, at, amt = 0.22, freq = 4, damp = 0.35) {
  if (t < at) return 0;
  const u = t - at, w = TAU * freq, wd = w * Math.sqrt(1 - damp * damp);
  return amt * Math.exp(-damp * w * u) * Math.cos(wd * u);
}
// Volume-preserving squash/stretch scale: s > 0 squashes (shorter, wider), s < 0 stretches.
export function squashScale(s) { const sy = 1 - clamp(s, -0.45, 0.45); return [1 / sy, sy]; }

const ARC = [['eF', 'sh'], ['hF', 'sh'], ['eB', 'sh'], ['hB', 'sh']];
// Blend two poses; arms move along arcs (polar interpolation around the shoulder). k may go < 0 or > 1.
export function arcBlend(a, b, k) {
  a = asPose(a); b = asPose(b);
  const out = {};
  for (const key in a) out[key] = [lerp(a[key][0], b[key][0], k), lerp(a[key][1], b[key][1], k)];
  for (const [pt, piv] of ARC) {
    const ax = a[pt][0] - a[piv][0], ay = a[pt][1] - a[piv][1], bx = b[pt][0] - b[piv][0], by = b[pt][1] - b[piv][1];
    const ra = Math.hypot(ax, ay), rb = Math.hypot(bx, by); if (ra < 1e-6 || rb < 1e-6) continue;
    const aa = Math.atan2(ay, ax); let d = Math.atan2(by, bx) - aa; d = ((d + Math.PI) % TAU + TAU) % TAU - Math.PI;
    const ang = aa + d * k, r = lerp(ra, rb, k);
    out[pt] = [out[piv][0] + Math.cos(ang) * r, out[piv][1] + Math.sin(ang) * r];
  }
  return out;
}

// act(t, [[0,'stand'], [1.2,'point'], [3,'cheer', {antic:0.2, amt:0.25, freq:2.5}]])
// Each key STARTS a move at its time (put it on the word that triggers the action). Just before the key the body
// pulls the other way (anticipation, `antic` s, `amt` of the move), then swings along arcs, reaches the pose
// ≈0.15–0.2 s after the key, overshoots a little (≈8%) and settles by ≈0.4 s. Options per key or as 3rd argument.
export function act(t, keys, opts = {}) {
  const at = (n, tt) => {
    if (n === 0) return asPose(keys[0][1]);
    const [ti, pi, ko = {}] = keys[n];
    const o = { antic: 0.15, amt: 0.15, freq: 3, damp: 0.62, ...opts, ...ko };
    const t0 = ti - o.antic;
    if (tt < t0) return at(n - 1, tt);
    const from = at(n - 1, t0);
    const k = tt < ti ? -o.amt * Math.sin((Math.PI / 2) * clamp((tt - t0) / Math.max(o.antic, 1e-6)))
      : -o.amt + (1 + o.amt) * spring(tt - ti, o.freq, o.damp);
    return arcBlend(from, asPose(pi), k);
  };
  return at(keys.length - 1, t);
}

// Freeze motion `hold` frames before the beat at `at`, then snap to real time after `catchUp` frames.
export function beatHold(t, at, hold = 8, fps = E.fps, catchUp = 1) {
  const a = at - hold / fps, c = catchUp / fps;
  if (t < a || t >= at + c) return t;
  if (t < at) return a;
  return a + ((t - at) * (at + c - a)) / c;
}

// Secondary motion: a damped spring chasing fn(t). Deterministic (re-simulated from t - window every call).
export function follow(fn, t, { freq = 2.2, damp = 0.25, window = 1.5, dt = 1 / 120 } = {}) {
  const w = TAU * freq, t0 = t - window;
  let x = fn(t0), v = (fn(t0) - fn(t0 - dt)) / dt;
  const n = Math.ceil(window / dt), step = window / n;
  for (let i = 1; i <= n; i++) { const target = fn(t0 + i * step); v += (w * w * (target - x) - 2 * damp * w * v) * step; x += v * step; }
  return x;
}
// Swing angle for hair / headband / coat tails from a character's world x position over time (radians, ±maxA).
// Pass the same `facing` as drawFigure: tails stream behind while moving and flick forward when the body stops.
export function swingFrom(xFn, t, { gain = 0.035, maxA = 0.6, facing = 1, ...o } = {}) {
  return clamp((follow(xFn, t, o) - xFn(t)) * gain * -facing, -maxA, maxA);
}

export const onTwos = (t, fps = E.fps, n = 2) => (Math.floor((t * fps + 1e-6) / n) * n) / fps;

export function boilPose(p, t, amt = 1.2, fps = E.fps, seed = 0) {
  const variant = Math.floor((t * fps + 1e-6) / 2) % 3; let j = 0; const out = {};
  for (const k in p) { j++; out[k] = [p[k][0] + (h1(variant * 31 + j * 7 + seed) * 2 - 1) * amt, p[k][1] + (h1(variant * 31 + j * 7 + seed + 101) * 2 - 1) * amt]; }
  return out;
}

// Eye darts. Returns [x, y] in -amp..amp for face({look}).
export function saccade(t, seed = 0, { min = 1.5, max = 3, amp = 0.45, move = 2 / 24 } = {}) {
  let start = 0, i = 0, prev = [0, 0], cur = [0, 0];
  while (true) {
    const d = lerp(min, max, h1(seed * 13 + i * 3.1));
    prev = cur; cur = i === 0 ? [0, 0] : [(h1(seed + i * 5.7) * 2 - 1) * amp, (h1(seed + i * 9.3) * 2 - 1) * amp * 0.5];
    if (t < start + d || i > 10000) { const k = ease.out((t - start) / move); return [lerp(prev[0], cur[0], k), lerp(prev[1], cur[1], k)]; }
    start += d; i++;
  }
}

// Expression keys with a short cross-fade: exprAt(t, [[0,'neutral'],[1.2,'shocked']]) -> value for drawFigure({expr})
export function exprAt(t, keys, blend = 0.15) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  if (i === 0 || t - keys[i][0] >= blend) return keys[i][1];
  return { from: keys[i - 1][1], to: keys[i][1], k: clamp((t - keys[i][0]) / blend) };
}
