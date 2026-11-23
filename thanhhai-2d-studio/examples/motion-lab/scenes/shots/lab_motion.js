// shots/lab_motion.js — demonstrates the v0.3 animation toolkit (engine/motion.js + rig v2).
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, visemeAt } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import { act, exprAt, follow, swingFrom, impact, beatHold, boilPose, saccade, spring } from '/engine/motion.js';
import * as FX from '/engine/fx2d.js';
import { lab } from '../sets/lab.js';
import { NOVA, MAX } from '../cast.js';

const blinkAt = (t, period, off = 0) => ((t + off) % period) > period - 0.12;

// m01 — wide: Nova walks in, the ponytail and coat lag behind (follow-through), stops, then POINTS:
// anticipation (pulls back) -> arc -> overshoot -> settle.
registerShot('m01', { draw(g, t) {
  const cam = { z: 1 + 0.05 * ease.inOut(t / 3.6), x: -20 * ease.inOut(t / 3.6) };
  const { GY, M } = lab(g, t, cam, { mood: 'interiorWarm' });
  const stopT = 1.6, x0 = E.W / 2 + 330, speed = 260;            // walks in from the right, towards the board
  const xAt = tt => x0 - speed * Math.min(Math.max(tt, 0), stopT);
  const walking = t < stopT;
  const pose = walking ? walkPose(t * Math.PI * 2 * 0.9)
    : act(t, [[0, POSES.stand], [stopT + 0.55, POSES.point, { antic: 0.22, amt: 0.2 }]]);
  layer(g, cam, 1, g => {
    drawFigure(g, { x: xAt(t), y: GY, s: 1.15, facing: -1, outfit: NOVA, pose: walking ? pose : breathe(pose, t), expr: t < stopT + 0.4 ? 'neutral' : exprAt(t, [[0, 'neutral'], [stopT + 0.55, 'smile']]),
      swing: swingFrom(xAt, t, { facing: -1 }), rim: { color: M.rim, dir: [0, -1] }, blink: blinkAt(t, 3.1), hands: walking ? null : { F: 'point' } });
    drawFigure(g, { x: E.W / 2 + 520, y: GY, s: 1.15, facing: -1, outfit: MAX, pose: breathe(POSES.stand, t, 1, 3), expr: 'neutral', look: saccade(t, 4), rim: { color: M.rim, dir: [0, -1] }, blink: blinkAt(t, 3.7, 1) });
  });
  FX.dust(g, t, { count: 40 });
} });

// m02 — medium two-shot: Nova speaks a quoted line, lip-synced from timeline/visemes.json; explaining
// gestures with arcs and overshoot; Max listens, eyes darting.
registerShot('m02', { draw(g, t, info) {
  const cam = { z: 1.32 + 0.04 * ease.inOut(t / 3), x: 80 };
  const { GY, M } = lab(g, t, cam, { mood: 'interiorWarm' });
  const g0 = info.shot.start, s = V(1.6, 1.7);
  const nova = act(t, [[0, POSES.stand], [0.35, POSES.explain], [1.4, POSES.talk], [2.25, POSES.explain]]);
  layer(g, cam, 1, g => {
    drawFigure(g, { x: E.W / 2 - 230, y: GY, s, facing: 1, outfit: NOVA, pose: breathe(nova, t), expr: exprAt(t, [[0, 'neutral'], [0.3, 'smile']]),
      viseme: visemeAt(info.globalT, g0, info.shot.end), hands: 'open', rim: { color: M.rim, dir: [0.3, -1] }, blink: blinkAt(t, 2.9) });
    drawFigure(g, { x: E.W / 2 + 250, y: GY, s, facing: -1, outfit: MAX, pose: breathe(POSES.crossArms, t, 1, 2), expr: exprAt(t, [[0, 'neutral'], [1.8, 'thinking']]), look: saccade(t, 9, { min: 0.9, max: 1.6 }),
      rim: { color: M.rim, dir: [-0.3, -1] }, blink: blinkAt(t, 3.4, 1) });
  });
  blurLayer(g, 10, g => { g.fillStyle = 'rgba(200,140,220,.5)'; g.beginPath(); g.ellipse(120, E.H - 120, 110, 240, 0, 0, 7); g.fill(); }, cam, 1.6);
  FX.dust(g, t, { count: 30 });
} });

// m03 — giant close-up: a beat of stillness right before "Ồ", then a cross-fade into shock and a lip-synced line.
registerShot('m03', { draw(g, t, info) {
  const M = mood('interiorWarm'), at = 0.7;                      // "Ồ" lands 0.7 s into the shot
  const tb = beatHold(t, at, 8);                                  // motion freezes 8 frames before the beat
  blurLayer(g, 14, g => lab(g, tb, { z: 1.6, x: 200, y: -140 }, { mood: 'interiorWarm' })); veil(g, '#120a10', 0.35);
  const pop = 1 + 0.06 * (spring(t - at, 2.5, 0.45) - (t > at ? 1 : 0)) + 0.04 * ease.inOut(tb / 2);
  bigFace(g, E.W / 2, E.H * 0.6, V(300, 330) * pop, { outfit: MAX, expr: exprAt(t, [[0, 'thinking'], [at, 'shocked'], [1.4, 'joy']], 0.12),
    viseme: visemeAt(info.globalT, info.shot.start, info.shot.end), look: t < at ? [0.4, -0.3] : [0, 0], rimColor: M.rim, rimSide: -1, blink: blinkAt(t, 3.2) });
} });

// m04 — the jump: crouch (anticipation), stretch on take-off, squash on landing (impact), a 3-drawing line boil
// and motion blur (shot field "mblur": 6). Not on twos: twos would make the blur sub-frames identical.
registerShot('m04', { draw(g, t) {
  const cam = { z: 1.05, x: 0, y: 20 };
  const { GY, M } = lab(g, t, cam, { mood: 'golden' });
  const up = 0.55, land = 1.25, H = 190;                         // take-off and landing times, jump height
  const air = clamp((t - up) / (land - up)), y = t > up && t < land ? -H * 4 * air * (1 - air) : 0;
  const pose = t < up ? act(t, [[0, POSES.stand], [0.22, POSES.crouch, { antic: 0.1 }]])
    : t < land ? POSES.jump : act(t, [[land, POSES.crouch], [land + 0.35, POSES.cheer]]);
  const vel = t > up && t < land ? -H * 4 * (1 - 2 * air) / (land - up) : 0;
  const squash = t < up ? 0.15 * ease.inOut(prog(t, 0.3, up)) : t < land ? clamp(vel / 3000, -0.25, 0.1) : impact(t, land, 0.28);
  layer(g, cam, 1, g => {
    drawFigure(g, { x: E.W / 2, y: GY + y, s: 1.7, facing: 1, outfit: MAX, pose: boilPose(pose, t, 1.4), expr: t < land ? 'determined' : 'joy', squash, hands: t > land + 0.3 ? 'fist' : null,
      rim: { color: M.rim, dir: [0, -1] }, shadow: true });
  });
  if (t > land && t < land + 0.5) FX.rings?.(g, E.W / 2, GY, t - land, { color: M.rim });
  FX.dust(g, t, { count: 40 });
} });

// m05 — closing: both throw a thumbs up, landing with a springy overshoot; the shot is held on twos ("timing": "twos").
registerShot('m05', { draw(g, t) {
  const cam = { z: 1.25 - 0.04 * ease.inOut(t / 2.4), x: 0 };
  const { GY, M } = lab(g, t, cam, { mood: 'golden' });
  const thumbs = (seed, k) => act(t, [[0, POSES.stand], [0.5 + k, { ...POSES.point, hF: [50, -150], eF: [30, -128] }, { amt: 0.25 }]]);
  layer(g, cam, 1, g => {
    drawFigure(g, { x: E.W / 2 - 200, y: GY, s: 1.5, facing: 1, outfit: NOVA, pose: breathe(thumbs(1, 0), t), expr: 'happy', hands: t > 0.45 ? { F: 'thumb' } : null, rim: { color: M.rim, dir: [0, -1] }, blink: blinkAt(t, 2.7) });
    drawFigure(g, { x: E.W / 2 + 200, y: GY, s: 1.5, facing: -1, outfit: MAX, pose: breathe(thumbs(2, 0.15), t, 1, 2), expr: 'joy', hands: t > 0.6 ? { F: 'thumb' } : null, rim: { color: M.rim, dir: [0, -1] }, blink: blinkAt(t, 3.3, 1) });
  });
  FX.dust(g, t, { count: 40 });
} });
