// shots/life.js — "Hành trình của một cầu thủ": one fictional player (signature: green kit, number 10) from birth to
// coach. Same character every stage (ageLook scale, outfit grows up), a new place and action per stage, the evoOverlay
// HUD (age counter + title + timeline), a peak-moment hook and a line-up payoff. 9:16.
import { E, V, registerShot, mood, layer, ease, prog, clamp, lerp, linGrad, glow, alpha, shade, text, rng, FONTS, S, seg, circle, rr } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, soccerBall } from '/engine/rig2d.js';
import { act, arcBlend, spring, impact, exprAt, saccade } from '/engine/motion.js';
import { ageLook, agePose, evoOverlay } from '/engine/evolve.js';
import * as FX from '/engine/fx2d.js';

const GREEN = '#3fb950';
const GY = () => E.H * V(0.8, 0.68);
const CX = () => E.W / 2;
const KIT = [
  { top: 'tshirt', color: '#eaf6ec', head: 'none' },                                  // baby onesie
  { top: 'tshirt', color: GREEN, head: 'none' },                                      // 5
  { top: 'jersey', color: GREEN, color2: '#ffffff', number: '10', head: 'spiky' },     // 12
  { top: 'tracksuit', color: GREEN, color2: '#ffffff', head: 'spiky' },              // 17
  { top: 'jersey', color: GREEN, color2: '#ffffff', number: '10', head: 'spiky' },     // 22
  { top: 'jersey', color: GREEN, color2: '#ffffff', number: '10', head: 'headband', headColor: '#f2c21a' }, // 30
  { top: 'jersey', color: GREEN, color2: '#ffffff', number: '10', head: 'spiky' },     // 38
  { top: 'tracksuit', color: GREEN, color2: '#ffffff', head: 'cap', headColor: GREEN },  // 60 coach
];
const AGES = [0, 5, 12, 17, 22, 30, 38, 60];
const blink = (t, p) => (t % p) > p - 0.12;

// ---------- places ----------
function sky(g, cam, M, extra) { layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY(), M.sky); g.fillRect(-E.W, -E.H, E.W * 3, GY() + E.H); extra?.(g); }); }
function ground(g, cam, top, bottom, stripes = false) {
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, GY(), 0, E.H * 1.6, [top, bottom]); g.fillRect(-E.W, GY(), E.W * 3, E.H * 2);
    if (stripes) for (let i = -6; i < 12; i += 2) { g.fillStyle = 'rgba(255,255,255,.05)'; g.fillRect(-E.W + i * 220, GY(), 220, E.H); } });
}
function bedroom(g, t, cam) {
  const M = mood('night'), gy = GY();
  layer(g, cam, 0.4, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, [M.dark, M.wall]); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    FX.windowFrame(g, { x: CX() - 260, y: gy - 900, w: 520, h: 520, cols: 2, frame: shade(M.wall, -0.5), bar: 12 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, M.sky); g.fillRect(x, y, w, h); FX.stars(g, t, { area: [x, y, w, h], count: 40 }); FX.moon(g, x + w * 0.7, y + h * 0.3, 40); });
    FX.godRays(g, CX() + 80, gy - 700, { color: M.key, a: 0.05, t, angle: Math.PI * 0.62, spread: 0.5, len: 900 }); });
  ground(g, cam, shade(M.floor, 0.1), M.dark); layer(g, cam, 0.9, g => FX.pool(g, CX() + 60, gy + 20, 300, 60, M.key, 0.25));
  return M;
}
function alley(g, t, cam) {
  const M = mood('dusk'), gy = GY();
  sky(g, cam, M);
  layer(g, cam, 0.5, g => { FX.facade(g, { x: -300, y: gy, w: 520, h: 900, color: shade(M.wall, -0.2), win: M.practical, cols: 3, rows: 5, seed: 3 });
    FX.facade(g, { x: E.W - 200, y: gy, w: 560, h: 1000, color: shade(M.wall, -0.3), win: M.practical, cols: 3, rows: 6, seed: 7 }); });
  layer(g, cam, 0.8, g => FX.lampPost(g, CX() + 300, gy, 620, { light: M.practical }));
  ground(g, cam, shade(M.floor, -0.1), M.dark);
  return M;
}
function fieldDay(g, t, cam) {
  const M = mood('day'), gy = GY();
  sky(g, cam, M, g => { FX.clouds(g, { y: E.H * 0.15, h: 300, a: 0.5 }); FX.sun(g, E.W * 0.78, E.H * 0.16, 60, '#fffbe8', M.key, 3); });
  layer(g, cam, 0.35, g => { FX.hills(g, { y: gy - 40, amp: 120, color: shade(M.grass, -0.25), seed: 4 }); for (let i = 0; i < 8; i++) FX.tree(g, -200 + i * 220, gy - 30, 0.7, shade(M.grass, -0.45)); });
  layer(g, cam, 0.6, g => { const gx = CX() - 380; seg(g, [[gx, gy], [gx, gy - 260], [gx + 300, gy - 260], [gx + 300, gy]], 10, '#f4f1ea'); });
  ground(g, cam, M.grass, shade(M.grass, -0.4), true);
  return M;
}
function floodlit(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), gy = GY();
  sky(g, cam, M, g => { if (!o.golden) FX.stars(g, t, { count: 60 }); });
  layer(g, cam, 0.3, g => { if (o.crowd) { g.fillStyle = shade(M.wall, -0.4); g.fillRect(-E.W, gy - 700, E.W * 3, 700); FX.crowd(g, t, { x: -E.W * 0.5, y: gy - 640, w: E.W * 2, rows: 18, rowH: 34, size: 2.2, color: shade(M.wall, -0.15), cheer: o.cheer || 0, flags: 0.03 }); }
    for (const x of [-120, E.W + 120]) { seg(g, [[x, gy], [x, gy - 1100]], 14, shade(M.dark, -0.2)); glow(g, x, gy - 1120, 260, M.key, 0.8); FX.lightCone(g, x, gy - 1120, { color: M.key, a: 0.08, angle: x < 0 ? Math.PI * 0.32 : Math.PI * 0.68, len: 1500 }); } });
  ground(g, cam, shade(M.grass, 0.05), shade(M.grass, -0.5), true);
  layer(g, cam, 0.9, g => FX.pool(g, CX(), gy + 20, 480, 70, M.key, 0.22));
  return M;
}

// ---------- the player ----------
function player(g, i, t, M, o = {}) {
  const age = AGES[i], L = ageLook(age), s = (o.s ?? V(1.6, 1.9)) * L.s;
  drawFigure(g, { x: o.x ?? CX(), y: o.y ?? GY(), s, facing: o.facing ?? 1, outfit: KIT[i], pose: agePose(o.pose || breathe(POSES.stand, t), age), expr: o.expr || 'smile',
    hands: o.hands, prop: o.prop, squash: o.squash, look: o.look, blink: blink(t, 3.1), rim: { color: M.rim, dir: o.rimDir || [0, -1] }, shadow: o.shadow });
  return s;
}
function trophy(g, x, y, s) {
  const gold = '#f2c21a', d = shade(gold, -0.3);
  rr(g, x - 26 * s, y + 40 * s, 52 * s, 18 * s, 4 * s); g.fillStyle = d; g.fill();
  seg(g, [[x, y + 40 * s], [x, y + 18 * s]], 10 * s, gold);
  g.fillStyle = gold; g.beginPath(); g.moveTo(x - 34 * s, y - 40 * s); g.lineTo(x + 34 * s, y - 40 * s); g.quadraticCurveTo(x + 30 * s, y + 18 * s, x, y + 20 * s); g.quadraticCurveTo(x - 30 * s, y + 18 * s, x - 34 * s, y - 40 * s); g.fill();
  g.strokeStyle = gold; g.lineWidth = 6 * s; for (const k of [-1, 1]) { g.beginPath(); g.arc(x + k * 34 * s, y - 20 * s, 16 * s, k < 0 ? Math.PI * 0.5 : -Math.PI * 0.5, k < 0 ? Math.PI * 1.5 : Math.PI * 0.5); g.stroke(); }
  glow(g, x, y - 10 * s, 120 * s, gold, 0.35);
}
function confetti(g, t, seed = 3) {
  const r = rng(seed), C = ['#f2c21a', GREEN, '#ffffff', '#f29ac0'];
  for (let i = 0; i < 90; i++) { const x = r() * E.W, sp = 120 + r() * 200, y = ((r() * E.H + t * sp) % (E.H + 100)) - 50, a = t * (2 + r() * 4) + r() * 6;
    g.save(); g.translate(x + Math.sin(t * 2 + i) * 20, y); g.rotate(a); g.fillStyle = C[i % 4]; g.fillRect(-6, -3, 12, 6); g.restore(); }
}

const STAGE = [
  // 0 — baby on the floor, a ball rolls into view
  (g, t, cam) => { const M = bedroom(g, t, cam); layer(g, cam, 1, g => {
    const bx = lerp(CX() + 420, CX() + 120, ease.out(prog(t, 0.3, 1.6))); soccerBall(g, bx, GY() - 26, 26, -t * 3);
    player(g, 0, t, M, { pose: POSES.sit, expr: exprAt(t, [[0, 'neutral'], [1.4, 'joy']]), look: t > 0.4 ? [0.8, 0.3] : [0, 0], rimDir: [0.4, -1] }); }); FX.dust(g, t, { count: 30 }); return M; },
  // 1 — kicks the ball against the wall, again and again
  (g, t, cam) => { const M = alley(g, t, cam); layer(g, cam, 1, g => { const L = t % 1.3, x = CX() - 120;
    const pose = act(L, [[0, 'stand'], [0.18, 'kick', { amt: 0.3 }], [0.62, 'stand']]);
    const u = clamp((L - 0.32) / 0.9), bx = x + 70 + 420 * Math.sin(Math.PI * u); soccerBall(g, bx, GY() - 24, 24, bx * 0.04);
    player(g, 1, t, M, { x, pose, expr: 'determined' }); }); FX.dust(g, t, { count: 30, color: '#ffe2bd' }); return M; },
  // 2 — juggling: knee up on every touch
  (g, t, cam) => { const M = fieldDay(g, t, cam); layer(g, cam, 1, g => { const ph = (t * 1.5) % 1, x = CX();
    const pose = arcBlend(POSES.stand, POSES.kick, clamp(1 - Math.sin(Math.PI * ph) * 1.8));
    const s = player(g, 2, t, M, { x, pose, expr: 'happy', look: [0.5, 0.6] });
    soccerBall(g, x + 50 * s, GY() - 70 * s - 330 * Math.sin(Math.PI * ph), 22 * s, t * 4); }); return M; },
  // 3 — night sprint past cones
  (g, t, cam) => { const M = floodlit(g, t, cam); layer(g, cam, 1, g => { const off = (t * 520) % 360;
    for (let k = -2; k < 6; k++) { const cx = k * 360 - off; g.fillStyle = '#ff8a3c'; g.beginPath(); g.moveTo(cx - 26, GY()); g.lineTo(cx, GY() - 60); g.lineTo(cx + 26, GY()); g.fill(); }
    player(g, 3, t, M, { x: CX() - 40, pose: walkPose(t * Math.PI * 2 * 1.6, { run: true }), expr: 'determined' });
    FX.speedLines(g, t, { a: 0.12 }); }); return M; },
  // 4 — first goal: jump, land, crowd erupts
  (g, t, cam) => { const M = floodlit(g, t, cam, { crowd: true, cheer: t > 0.9 ? 1 : 0.2 }); layer(g, cam, 1, g => {
    const up = 0.55, land = 1.15, air = clamp((t - up) / (land - up)), y = t > up && t < land ? -180 * 4 * air * (1 - air) : 0;
    const pose = t < up ? act(t, [[0, 'stand'], [0.15, 'crouch']]) : t < land ? POSES.cheer : act(t, [[land, 'crouch'], [land + 0.3, 'cheer']]);
    player(g, 4, t, M, { y: GY() + y, pose, expr: t > 0.5 ? 'joy' : 'determined', hands: t > land ? 'fist' : null, squash: t < land ? (t > up ? -0.12 : 0) : impact(t, land, 0.25) }); }); return M; },
  // 5 — the peak: trophy overhead, golden confetti
  (g, t, cam) => { const M = floodlit(g, t, cam, { mood: 'golden', golden: true, crowd: true, cheer: 1 }); layer(g, cam, 1, g => {
    const pose = act(t, [[0, 'stand'], [0.25, { ...POSES.cheer, hF: [16, -286], hB: [-10, -286], eF: [26, -236], eB: [-18, -236] }, { amt: 0.25 }]]);
    const s = player(g, 5, t, M, { pose: breathe(pose, t), expr: 'joy' });
    const hx = CX() + 3 * s, hy = GY() - 286 * s; if (t > 0.25) trophy(g, hx, lerp(GY() - 170 * s, hy - 62 * s, ease.out(prog(t, 0.25, 0.6))), s * 0.9); });
    confetti(g, t); return M; },
  // 6 — goodbye wave in the empty golden stadium
  (g, t, cam) => { const M = floodlit(g, t, cam, { mood: 'golden', golden: true, crowd: true, cheer: 0.3 }); layer(g, cam, 1, g => {
    const L = t % 0.9, pose = act(L, [[0, 'wave'], [0.45, { ...POSES.wave, hF: [40, -250] }, { amt: 0.05 }]]);
    player(g, 6, t, M, { pose: breathe(pose, t), expr: 'smile', hands: 'wave', facing: -1 }); }); FX.dust(g, t, { count: 40, color: '#ffe2bd' }); return M; },
  // 7 — the old coach points the way for two kids
  (g, t, cam) => { const M = fieldDay(g, t, cam); layer(g, cam, 1, g => {
    player(g, 7, t, M, { x: CX() - 170, pose: act(t, [[0, 'stand'], [0.5, 'point']]), expr: 'smile', hands: t > 0.6 ? { F: 'point' } : null, prop: { type: 'paper', hand: 'B' } });
    for (const [k, dx] of [[0, 140], [1, 300]]) drawFigure(g, { x: CX() + dx, y: GY(), s: V(1.6, 1.9) * ageLook(9).s, facing: -1, outfit: { top: 'jersey', color: k ? '#3a6ea5' : '#d64a33', number: String(7 + k), head: k ? 'ponytail' : 'none' },
      pose: breathe(POSES.stand, t, 1, k + 2), expr: 'awe', look: saccade(t, 5 + k), blink: blink(t, 3.4 + k * 0.3), rim: { color: M.rim, dir: [0, -1] } }); }); return M; },
];

for (const sh of E.shots) {
  const p = sh.params || {};
  if (p.stage != null) registerShot(sh.id, { draw(g, t, info) {
    const cam = { z: (1 + 0.05 * ease.inOut(t / info.dur)) * (p.part ? 1.2 : 1), x: p.part ? 40 : 0, y: p.part ? -60 : 0 };
    g.save(); const pop = 1 + 0.06 * (spring(t, 2.2, 0.5) - 1); g.translate(CX(), GY()); g.scale(pop, pop); g.translate(-CX(), -GY());
    STAGE[p.stage](g, t, cam); g.restore();
    evoOverlay(g, t, info, { center: [CX(), GY() - 220] });
  } });
  else if (p.hook) registerShot(sh.id, { draw(g, t, info) {
    const half = info.dur * 0.5, late = t >= half, lt = late ? t - half : t;
    (late ? STAGE[0] : STAGE[5])(g, lt + (late ? 1.6 : 0.6), { z: 1.15 });
    const k = ease.outBack(prog(lt, 0.05, 0.4)); g.save(); g.translate(CX(), V(150, 300)); g.scale(k, k);
    text(g, late ? '…BẮT ĐẦU TỪ ĐÂY' : 'MỘT HUYỀN THOẠI', 0, 0, { size: V(88, 92), color: S().ui.gold, glow: 30, glowColor: alpha(S().ui.gold, 0.7), stroke: 12, strokeColor: 'rgba(10,6,14,.55)' }); g.restore();
    if (late && lt < 0.3) { g.fillStyle = alpha('#ffffff', (1 - lt / 0.3) ** 2); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
  } });
  else if (p.outro) registerShot(sh.id, { draw(g, t, info) {
    const M = fieldDay(g, t, { z: 1 }), n = AGES.length;
    layer(g, { z: 1 }, 1, g => AGES.forEach((age, i) => { const a = clamp((t - i * 0.15) / 0.3); if (a <= 0) return; g.save(); g.globalAlpha = a;
      player(g, i, t + i, M, { x: lerp(70, E.W - 70, i / (n - 1)), s: V(0.9, 0.95), pose: i === 0 ? POSES.sit : breathe(POSES.stand, t, 1, i), expr: 'smile', rimDir: [0, -1] }); g.restore(); }));
    const q = ease.outBack(prog(t, 1.4, 1.8)); g.save(); g.translate(CX(), V(160, 330)); g.scale(q, q);
    text(g, 'Bạn đang ở', 0, -50, { size: V(64, 76), color: S().ui.cream, font: FONTS.ui, weight: 900, stroke: 10, strokeColor: 'rgba(10,6,14,.55)' });
    text(g, 'giai đoạn nào?', 0, 40, { size: V(64, 76), color: S().ui.gold, font: FONTS.ui, weight: 900, stroke: 10, strokeColor: 'rgba(10,6,14,.55)' }); g.restore();
    evoOverlay(g, t, info);
  } });
}
