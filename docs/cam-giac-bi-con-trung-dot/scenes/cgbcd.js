// shots/cgbcd.js — "Cảm giác bị côn trùng đốt là như thế nào?" (mascot explainer, host Cún Lú).
// Shot ids and key timings come from story/shots.json (params.keys = [{k, s, e}] seconds relative to the shot).
// Cartoon-only pain: comic bursts, swelling, bandages. No blood.
import { E, V, registerShot, mood, layer, ease, prog, clamp, lerp, linGrad, radGrad, glow, alpha, shade, text, FONTS, S, seg, circle, ring, rr, poly, visemeAt, noise } from '/engine/core.js';
import { drawFigure, POSES, breathe, bigFace } from '/engine/rig2d.js';
import { act, spring, impact, exprAt, saccade, boilPose } from '/engine/motion.js';
import { roundTitle, dangerCard, tally, ouch, sign, bug, sizeCompare } from '/engine/explainer.js';
import { titleCard } from '/engine/ui2d.js';
import * as FX from '/engine/fx2d.js';

const DOG = { top: 'tshirt', color: '#f2c21a', species: 'dog', fur: '#c98a4b' };
const GY = () => E.H * V(0.82, 0.7), CX = () => E.W / 2;
const blink = (t, p = 3.3) => (t % p) > p - 0.12;
const SH = id => E.shots.find(s => s.id === id);
const kt = (info, k, which = 's') => { const r = (info.shot.params?.keys || []).find(x => x.k === k); return r ? r[which] : 0; };
const STROKE = { stroke: 10, strokeColor: 'rgba(10,6,14,.6)' };
const big = (g, str, x, y, o = {}) => text(g, str, x, y, { size: o.size ?? V(84, 96), color: o.color ?? S().ui.gold, glow: 24, glowColor: alpha(o.color ?? S().ui.gold, 0.7), ...STROKE, ...o });
const pop = (g, t, at, fn) => { const k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) return; g.save(); fn(g, k); g.restore(); };

// ---------- running gag: "Số lần bị đốt" ----------
const HIT = { r01d: 0.5, r02c: 0.6, r03c: 0.5, r04g: 0.25, r05c: 0.5, z99: null };
const hitT = id => { const s = SH(id); if (!s) return 1e9; if (id === 'z99') return s.start + (s.params.keys.find(k => k.k === 'z99b')?.s ?? s.end - s.start) - 0.45; return s.start + HIT[id]; };
const HITS = () => Object.keys(HIT).map(hitT);
function tallyNow(gt) {
  const t00 = SH('t00')?.start ?? 0; if (gt < t00) return { count: 5, since: 9 };
  const hs = HITS(), past = hs.filter(h => gt >= h), since = past.length ? gt - past[past.length - 1] : 9;
  const r01d = SH('r01d'), r01e = SH('r01e');
  if (r01d && gt >= hs[0] && gt < r01e.start + 0.7) return { count: Math.min(47, 1 + Math.floor((gt - hs[0]) * 14)), since: (gt * 7) % 0.4 };
  if (r01e && gt >= r01e.start + 0.7 && gt < r01e.start + 1.1) return { count: 1, since: gt - r01e.start - 0.7 };
  return { count: past.length, since };
}
const hud = (g, info) => { const { count, since } = tallyNow(info.globalT); tally(g, { label: 'Số lần bị đốt', count, since, y: V(128, 260) }); };

// ---------- creatures (y = ground, facing +x, ~200 units long at s = 1) ----------
const ell = (g, x, y, rx, ry, c, rot = 0) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); };
function shadowAt(g, x, y, w) { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 2, w, w * 0.1, 0, 0, 7); g.fill(); }
// ant: kind 'fire' | 'harvester' | 'bullet'
function ant(g, o) {
  const { x, y, s = 1, facing = 1, t = 0, kind = 'fire', rim } = o;
  const col = { fire: '#c8401f', harvester: '#8e3b1c', bullet: '#4a2a1c' }[kind], dk = shade(col, -0.45), hl = shade(col, 0.35);
  const headR = kind === 'harvester' ? 30 : kind === 'bullet' ? 30 : 24;
  shadowAt(g, x, y, 90 * s);
  g.save(); g.translate(x, y); g.scale(facing * s, s);
  const draw = (dx, dy, c, d) => {
    g.save(); g.translate(dx, dy);
    for (let i = 0; i < 3; i++) for (const side of [-1, 1]) { const ph = Math.sin(t * 14 + i * 2.1 + (side > 0 ? 3.1 : 0)) * 10, bx = -6 + i * 18;
      seg(g, [[bx, -46], [bx - 26 + i * 18 + ph, -70 + (side > 0 ? 6 : 0)], [bx - 40 + i * 30 + ph * 1.4, 0]], side > 0 ? 6 : 5, side > 0 ? c : d); }
    ell(g, -70, -52, 50, 36, c, -0.25); // gaster
    ell(g, -22, -50, 12, 10, c);         // petiole
    ell(g, 6, -54, 28, 16, c, -0.1);     // thorax
    ell(g, 50, -62, headR, headR * 0.86, c); // head
    seg(g, [[60, -84], [86, -118], [108, -112]], 4, c); seg(g, [[52, -86], [70, -124], [92, -126]], 4, c); // antennae
    seg(g, [[72, -50], [88, -42], [80, -36]], 6, c);   // mandible
    if (kind === 'bullet') seg(g, [[-118, -46], [-132, -40]], 5, c); // stinger
    g.restore();
  };
  if (rim) draw(rim.dir[0] * 5, rim.dir[1] * 5, rim.color, rim.color);
  draw(0, 0, col, dk);
  ell(g, -84, -66, 18, 9, alpha(hl, 0.55), -0.3); ell(g, 44, -72, 9, 6, alpha(hl, 0.5));
  circle(g, 60, -66, 5, '#0b0708'); circle(g, 61.5, -67.5, 1.8, '#ffffff');
  g.restore();
}
// honey bee (flying): x,y = body centre
function bee(g, o) {
  const { x, y, s = 1, facing = 1, t = 0, dead = false, rim } = o;
  g.save(); g.translate(x, y); g.scale(facing * s, s); if (dead) g.rotate(Math.PI);
  const flap = dead ? 0.2 : Math.sin(t * 60) * 0.5;
  for (const k of [0, 1]) { g.save(); g.translate(-6 + k * 14, -18); g.rotate(-1.1 - flap * (k ? 0.8 : 1)); ell(g, 0, -30, 18, 34, 'rgba(220,240,255,.55)'); g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 2; g.stroke(); g.restore(); }
  if (rim) ell(g, -2 + rim.dir[0] * 4, rim.dir[1] * 4, 46, 30, rim.color);
  ell(g, -2, 0, 46, 30, '#f5b81c');
  g.save(); g.beginPath(); g.ellipse(-2, 0, 46, 30, 0, 0, 7); g.clip(); for (const bx of [-30, -8, 14]) { g.fillStyle = '#1d140c'; g.fillRect(bx, -40, 12, 80); } g.restore();
  poly(g, [[-48, -4], [-66, 0], [-48, 6]], '#1d140c'); // stinger
  circle(g, 46, -6, 20, '#1d140c'); circle(g, 54, -10, 5, '#ffffff'); circle(g, 55, -10, 2.6, '#0b0708');
  seg(g, [[50, -24], [62, -46]], 3, '#1d140c'); seg(g, [[42, -24], [46, -48]], 3, '#1d140c');
  for (let i = 0; i < 3; i++) seg(g, [[-12 + i * 16, 24], [-18 + i * 16 + Math.sin(t * 9 + i) * 3, 42]], 3, '#1d140c');
  if (dead) { g.restore(); g.save(); g.translate(x, y - 58 * s); g.scale(s, s); ring(g, 0, 0, 30, 6, '#ffe48a'); glow(g, 0, 0, 60, '#ffe48a', 0.4); g.restore(); return; }
  g.restore();
}
// tarantula hawk wasp: x,y = body centre (flying) — blue-black body, orange wings
function hawk(g, o) {
  const { x, y, s = 1, facing = 1, t = 0, rim, ground = false } = o;
  g.save(); g.translate(x, y); g.scale(facing * s, s);
  const flap = ground ? 0.1 : Math.sin(t * 46) * 0.6;
  for (const k of [0, 1]) { g.save(); g.translate(4 + k * 10, -14); g.rotate(-1.0 - flap * (k ? 0.7 : 1)); ell(g, 0, -46, 20, 56, alpha('#e8782a', 0.85)); g.restore(); }
  const c = '#16172e', hl = '#4c5ab0';
  for (let i = 0; i < 3; i++) for (const sd of [-1, 1]) seg(g, [[-6 + i * 18, 8], [-20 + i * 26, 46 + sd * 4], [-34 + i * 36, 86]], sd > 0 ? 6 : 5, sd > 0 ? c : shade(c, -0.3));
  if (rim) { ell(g, -60 + rim.dir[0] * 4, 2 + rim.dir[1] * 4, 54, 22, rim.color, 0.08); ell(g, 10, rim.dir[1] * 4, 30, 18, rim.color); }
  ell(g, -60, 2, 54, 22, c, 0.08); ell(g, 10, 0, 30, 18, c); circle(g, 52, -6, 18, c);
  ell(g, -66, -6, 26, 6, alpha(hl, 0.6), 0.08); ell(g, 6, -8, 14, 5, alpha(hl, 0.6));
  seg(g, [[-112, 8], [-126, 14]], 4, c); // stinger
  seg(g, [[60, -20], [86, -52], [100, -50]], 4, '#e8782a'); seg(g, [[52, -22], [66, -60]], 4, '#e8782a');
  circle(g, 60, -10, 4, '#ffffff');
  g.restore();
}
const tarantula = (g, o) => bug(g, 'spider', { ...o, accent: null });

// ---------- props ----------
function nail(g, x, y, len, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); rr(g, -5, -len, 10, len, 3); g.fillStyle = linGrad(g, -5, 0, 5, 0, ['#8e97a6', '#e8edf5', '#7a8392']); g.fill(); ell(g, 0, -len, 18, 6, '#b8c0cc'); poly(g, [[-5, 0], [5, 0], [0, 16]], '#9aa3b2'); g.restore(); }
function coals(g, x, y, w, t) { for (let i = 0; i < 9; i++) { const cx = x - w / 2 + (i + 0.5) * w / 9, fl = 0.6 + 0.4 * Math.sin(t * 7 + i * 2.3); ell(g, cx, y, w / 16, w / 30, shade('#2a1410', 0.1)); ell(g, cx, y - 4, w / 22, w / 50, alpha('#ff7a2a', fl)); glow(g, cx, y - 6, w / 10, '#ff6a1a', 0.35 * fl); } }
function drill(g, x, y, s, t, spin = true) { g.save(); g.translate(x, y); g.scale(s, s); const jit = spin ? Math.sin(t * 70) * 3 : 0; g.translate(jit, -jit * 0.5);
  rr(g, -90, -40, 120, 64, 20); g.fillStyle = '#e8b21c'; g.fill(); rr(g, -60, 10, 44, 90, 14); g.fillStyle = '#2b2b33'; g.fill(); rr(g, 30, -22, 30, 28, 6); g.fillStyle = '#3a3a44'; g.fill();
  g.save(); g.translate(60, -8); for (let i = 0; i < 6; i++) { const ph = (t * (spin ? 30 : 0) + i) % 6; seg(g, [[ph * 10, -8], [ph * 10 + 8, 8]], 4, '#cfd5de'); } rr(g, 0, -5, 70, 10, 4); g.fillStyle = '#aab2be'; g.fill(); g.restore(); g.restore(); }
function hourglass(g, x, y, h, frac) { const w = h * 0.55; seg(g, [[x - w / 2 - 10, y - h / 2], [x + w / 2 + 10, y - h / 2]], 10, '#7a4a28'); seg(g, [[x - w / 2 - 10, y + h / 2], [x + w / 2 + 10, y + h / 2]], 10, '#7a4a28');
  g.fillStyle = 'rgba(220,235,255,.25)'; g.beginPath(); g.moveTo(x - w / 2, y - h / 2); g.lineTo(x + w / 2, y - h / 2); g.lineTo(x + 6, y); g.lineTo(x + w / 2, y + h / 2); g.lineTo(x - w / 2, y + h / 2); g.lineTo(x - 6, y); g.closePath(); g.fill();
  const top = (1 - frac) * h * 0.42, bot = frac * h * 0.42; poly(g, [[x - w * 0.42 * (top / (h * 0.42)), y - top], [x + w * 0.42 * (top / (h * 0.42)), y - top], [x, y - 4]], '#f2c46a');
  poly(g, [[x - w * 0.46, y + h / 2 - 4], [x + w * 0.46, y + h / 2 - 4], [x, y + h / 2 - 4 - bot]], '#f2c46a'); seg(g, [[x, y], [x, y + h / 2 - 6]], 2, '#f2c46a'); }
function bigSwitch(g, x, y, s, on = true, press = 0) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -90, -150, 180, 300, 26); g.fillStyle = '#e9e3d6'; g.fill(); g.strokeStyle = '#8a8270'; g.lineWidth = 8; g.stroke();
  rr(g, -40, -90, 80, 180, 14); g.fillStyle = '#c9c1ad'; g.fill(); g.save(); g.translate(0, on ? -40 + press * 8 : 40); rr(g, -34, -46, 68, 92, 12); g.fillStyle = on ? '#ff5b4a' : '#6b7280'; g.fill(); g.restore();
  text(g, 'BẬT', 0, -120, { size: 34, color: '#ff5b4a', font: FONTS.ui, weight: 900 }); text(g, 'TẮT', 0, 124, { size: 34, color: '#6b7280', font: FONTS.ui, weight: 900 }); g.restore(); }
function bandage(g, x, y, w, rot) { g.save(); g.translate(x, y); g.rotate(rot); rr(g, -w / 2, -w * 0.16, w, w * 0.32, w * 0.12); g.fillStyle = '#f0c9a0'; g.fill(); rr(g, -w * 0.16, -w * 0.12, w * 0.32, w * 0.24, 4); g.fillStyle = '#e6b088'; g.fill(); g.restore(); }
function swollenHeel(g, x, y, k) { ell(g, x, y, 46 * k, 34 * k, '#e2584a'); glow(g, x, y, 90 * k, '#ff6a50', 0.35); ell(g, x - 12 * k, y - 10 * k, 14 * k, 8 * k, alpha('#ffffff', 0.3)); }
function mound(g, x, y, w, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x - w / 2, y); g.quadraticCurveTo(x, y - w * 0.55, x + w / 2, y); g.fill(); circle(g, x, y - w * 0.26, w * 0.05, shade(c, -0.5)); }
function flower(g, x, y, s, c, t) { seg(g, [[x, y], [x + Math.sin(t + x) * 4, y - 70 * s]], 4 * s, '#3d6b2e'); const cx = x + Math.sin(t + x) * 4, cy = y - 70 * s; for (let i = 0; i < 6; i++) { const a = i * 1.047; ell(g, cx + Math.cos(a) * 14 * s, cy + Math.sin(a) * 14 * s, 11 * s, 8 * s, c, a); } circle(g, cx, cy, 8 * s, '#ffd447'); }
function hive(g, x, y, s) { seg(g, [[x - 260, y - 120], [x + 200, y - 150]], 18, '#4a2e1c'); for (let i = 0; i < 5; i++) ell(g, x, y + i * 26 * s, (70 - Math.abs(i - 2) * 14) * s, 18 * s, i % 2 ? '#c88a2c' : '#e0a33a'); circle(g, x, y + 70 * s, 12 * s, '#3a2410'); }
function cactus(g, x, y, s, c = '#3f7a4a') { rr(g, x - 22 * s, y - 220 * s, 44 * s, 220 * s, 22 * s); g.fillStyle = c; g.fill(); rr(g, x - 70 * s, y - 150 * s, 30 * s, 80 * s, 15 * s); g.fill(); rr(g, x - 70 * s, y - 90 * s, 60 * s, 24 * s, 12 * s); g.fill(); rr(g, x + 40 * s, y - 180 * s, 30 * s, 90 * s, 15 * s); g.fill(); rr(g, x + 14 * s, y - 112 * s, 56 * s, 24 * s, 12 * s); g.fill(); }
function seedDot(g, x, y) { ell(g, x, y, 12, 8, '#d9b36a'); }

// ---------- places ----------
function meadow(g, t, cam) {      // round 1: sunny field
  const M = { ...mood('day'), rim: '#fff6d8' }, gy = GY();
  layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#4f86c8', '#8fc0e8', '#e8f2dc']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.78, E.H * 0.16, 70, '#fffbe8', '#ffe39a', 5); FX.clouds(g, { y: E.H * 0.08, a: 0.5, count: 5 }); });
  layer(g, cam, 0.4, g => FX.hills(g, { y: gy - 90, amp: 60, color: '#6fae58', seed: 4 }));
  layer(g, cam, 0.6, g => { for (let i = 0; i < 7; i++) FX.tree(g, -260 + i * 380, gy - 40, 1.2 + (i % 2) * 0.3, '#3f7a3a'); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#78b04a', '#2f5a24']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); for (let i = 0; i < 70; i++) { const gx = -E.W + i * 70 + (i * 37) % 30; seg(g, [[gx, gy + 6], [gx + Math.sin(t * 2 + i) * 6, gy - 18]], 4, '#5d9a3a'); } FX.pool(g, CX(), gy + 14, 520, 60, '#fff6d8', 0.2); });
  return M;
}
function garden(g, t, cam) {      // round 2: flower garden, golden hour
  const M = mood('golden'), gy = GY();
  layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.2, gy - 260, 80, '#fff1d6', M.key, 4); FX.godRays(g, E.W * 0.2, gy - 260, { angle: 0.4, color: M.key, a: 0.06, t }); });
  layer(g, cam, 0.45, g => { FX.hills(g, { y: gy - 70, amp: 50, color: '#6a4a40', seed: 7 }); for (let i = 0; i < 5; i++) FX.tree(g, -100 + i * 520, gy - 30, 1.6, '#4a3030'); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#6a7a3a', '#2a2a18']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); const cs = ['#ff7a9a', '#c58aff', '#ffffff', '#ff9f43']; for (let i = 0; i < 30; i++) flower(g, -E.W * 0.4 + i * 110, gy + 10 + (i % 3) * 12, 1 + (i % 2) * 0.3, cs[i % 4], t); FX.pool(g, CX(), gy + 14, 480, 60, M.key, 0.22); });
  FX.dust(g, t, { color: '#fff1c8', count: 40, a: 0.5 });
  return M;
}
function dryfield(g, t, cam) {    // round 3: dry grassland
  const M = { ...mood('dusk'), rim: '#ffd59a' }, gy = GY();
  layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#5a4a6e', '#c27a5a', '#f2c088']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.7, gy - 180, 90, '#fff1d6', '#ffb070', 4); });
  layer(g, cam, 0.4, g => FX.hills(g, { y: gy - 60, amp: 40, color: '#7a5038', seed: 11 }));
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#c49a5a', '#5a3a22']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); for (let i = 0; i < 60; i++) { const gx = -E.W + i * 80 + (i * 53) % 40; seg(g, [[gx, gy + 4], [gx + 6 + Math.sin(t * 1.5 + i) * 5, gy - 34]], 3, '#e0b46a'); } FX.pool(g, CX(), gy + 14, 480, 60, '#ffd59a', 0.2); });
  return M;
}
function desert(g, t, cam) {      // round 4: hot desert at noon
  const M = { ...mood('day'), rim: '#fff3d0' }, gy = GY();
  layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#3f7fc0', '#9fd0f0', '#f6e6c0']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.5, E.H * 0.1, 90, '#ffffff', '#fff0a0', 6); });
  layer(g, cam, 0.35, g => FX.hills(g, { y: gy - 80, amp: 70, color: '#e0b070', seed: 21, freq: 0.002 }));
  layer(g, cam, 0.6, g => { cactus(g, E.W * 0.08, gy - 20, 1.2); cactus(g, E.W * 0.92, gy - 10, 0.9, '#356a40'); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#eac088', '#9a6a3a']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); ell(g, E.W * 0.82, gy - 10, 120, 50, '#a77a50'); FX.pool(g, CX(), gy + 14, 520, 60, '#fff3d0', 0.25); });
  return M;
}
function rainforest(g, t, cam) {  // round 5 + cold open: night rainforest
  const M = mood('night'), gy = GY();
  layer(g, cam, 0.1, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#060a18', '#10203a', '#1c3a40']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.moon(g, E.W * 0.82, E.H * 0.14, 46); });
  layer(g, cam, 0.35, g => { for (let i = 0; i < 9; i++) { seg(g, [[-200 + i * 280, gy], [-200 + i * 280 + 20, -100]], 34, '#0c1c1a'); } });
  layer(g, cam, 0.6, g => { for (let i = 0; i < 12; i++) { const lx = -300 + i * 220, ly = gy - 260 - (i % 3) * 120; g.save(); g.translate(lx, ly); g.rotate(-0.5 + (i % 4) * 0.3 + Math.sin(t * 0.8 + i) * 0.03); ell(g, 0, 0, 130, 46, i % 2 ? '#12332a' : '#174034'); seg(g, [[-120, 0], [120, 0]], 3, '#0a2018'); g.restore(); } });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#1a2e22', '#08120c']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, CX(), gy + 14, 460, 56, M.key, 0.22); });
  for (let i = 0; i < 14; i++) { const fx = (noise(i * 3.1 + t * 0.15, 4) * 1.4 - 0.2) * E.W, fy = E.H * (0.25 + 0.5 * noise(i * 7.7 + t * 0.12, 9)), a = 0.5 + 0.5 * Math.sin(t * 3 + i); glow(g, fx, fy, 22, '#d8ff7a', 0.5 * a); circle(g, fx, fy, 3, alpha('#f4ffb8', a)); }
  return { ...M, rim: '#b8f0c8' };
}
function studio(g, t, cam) {      // title / recap / CTA
  const M = { ...mood('void'), rim: '#ffd59a' }, gy = GY();
  layer(g, cam, 0.15, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#120c1e', '#2a1a36', '#3a2240']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.lightCone(g, CX(), -40, { color: '#ffd59a', a: 0.16, w: 900 }); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#2a1c2e', '#0c0810']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, CX(), gy + 14, 560, 70, '#ffd59a', 0.28); });
  FX.dust(g, t, { color: '#ffe9c8', count: 30, a: 0.35 });
  return M;
}
const dim = (g, a = 0.5) => { g.fillStyle = `rgba(8,6,14,${a})`; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); };

// ---------- the host ----------
function host(g, t, info, M, o = {}) {
  drawFigure(g, { x: o.x ?? CX() - 260, y: o.y ?? GY(), s: o.s ?? V(2.2, 2.2), facing: o.facing ?? 1, outfit: DOG, pose: o.pose || breathe(POSES.talk, t), expr: o.expr || 'happy',
    viseme: o.mute ? null : visemeAt(info.globalT, info.shot.start, info.shot.end), hands: o.hands, squash: o.squash, look: o.look, blink: blink(t), rot: o.rot, rim: { color: M.rim, dir: o.rimDir || [0, -1] }, prop: o.prop });
  // accumulated bandages after each round
  const n = Math.min(5, tallyNow(info.globalT).count), s = (o.s ?? 2.2) / 2.2, f = o.facing ?? 1, hx = o.x ?? CX() - 260, hy = o.y ?? GY();
  if (o.bandages !== false && info.globalT >= (SH('t00')?.start ?? 0)) {
    const spots = [[18, -90, 0.6], [-14, -250, -0.4], [24, -300, 0.3], [-30, -150, 0.9], [8, -360, -0.2]];
    for (let i = 0; i < Math.min(n, 5); i++) { const [dx, dy, r] = spots[i]; bandage(g, hx + dx * s * f, hy + dy * s, 40 * s, r); }
  }
}
const face = (g, t, info, M, o = {}) => bigFace(g, o.x ?? CX(), o.y ?? E.H * 0.52, o.r ?? V(210, 250), { outfit: DOG, expr: o.expr || 'happy', viseme: visemeAt(info.globalT, info.shot.start, info.shot.end), blink: blink(t), rimColor: M.rim, rimSide: -1, look: o.look });

// ---------- shots ----------
const DRAW = {
  c00(g, t, info) {      // cold open: hopping, swollen heel, "CÁI ĐINH?!" → "…KHÔNG CÓ CÁI ĐINH NÀO."
    const kb = kt(info, 'c00b'), freeze = t >= kb, tt = freeze ? kb + (t - kb) * 0.08 : t;
    const cam = { z: 1.22 + 0.06 * ease.out(t / info.dur), x: freeze ? 0 : Math.sin(t * 40) * 6, y: -30 };
    const M = rainforest(g, tt, cam), hop = freeze ? 0 : Math.abs(Math.sin(tt * 7)) * 60;
    layer(g, cam, 1, g => { host(g, tt, info, M, { x: CX() - 60, y: GY() - hop, pose: freeze ? breathe(POSES.shrug, tt) : boilPose(POSES.handsOnHead, tt, 2.4), expr: exprAt(t, [[0, 'cry'], [kb, 'confused']], 0.1), squash: freeze ? 0 : impact(tt % (Math.PI / 7), 0.05, -0.15), bandages: false });
      for (const [dx, dy, r] of [[18, -90, 0.6], [-14, -250, -0.4], [24, -300, 0.3], [-30, -150, 0.9], [8, -360, -0.2]]) bandage(g, CX() - 60 + dx, GY() - hop + dy, 40, r);
      swollenHeel(g, CX() - 40, GY() - hop - 10, 1 + 0.06 * Math.sin(tt * 10)); });
    if (!freeze) pop(g, t, 0.3, (g, k) => { g.translate(CX(), V(190, 300)); g.scale(k, k); big(g, 'CÁI ĐINH?!', 0, 0, { size: V(120, 130), color: '#ff6f61' }); });
    else { pop(g, t, kb, (g, k) => { g.translate(CX(), V(190, 300)); g.scale(k, k); big(g, '…KHÔNG CÓ CÁI ĐINH NÀO.', 0, 0, { size: V(84, 90), color: S().ui.cream }); }); g.fillStyle = `rgba(255,255,255,${0.25 * (1 - prog(t, kb, kb + 0.2))})`; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
    hud(g, info);
  },
  t00(g, t, info) {      // title card + host intro
    const M = studio(g, t, { z: 1.08 }); dim(g, 0.25);
    titleCard(g, t, { lines: ['CẢM GIÁC BỊ CÔN TRÙNG ĐỐT', 'LÀ NHƯ THẾ NÀO?'], dur: info.dur + 0.4, y: E.H * 0.2 });
    const k = ease.outBack(prog(t, 0.2, 0.7));
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: CX(), y: GY() + (1 - k) * 500, s: V(1.9, 2), pose: breathe(act(t, [[0, 'stand'], [0.6, 'wave'], [2.0, 'explain']]), t), hands: t < 2 ? 'wave' : 'open', prop: 'paper' }));
    ['#ff9f43', '#ffd447', '#9b59ff', '#ff4d4d'].forEach((c, i) => pop(g, t, 3.2 + i * 0.25, (g, k) => { g.translate(E.W * 0.12 + i * 70, E.H * 0.62); g.scale(k, k); ant(g, { x: 0, y: 0, s: 0.3, t, kind: i === 3 ? 'bullet' : 'fire' }); }));
    hud(g, info);
  },
  t01(g, t, info) {      // re-hook: the nail is saved for the end
    const M = studio(g, t, { z: 1.12 + 0.03 * t });
    layer(g, { z: 1.12 + 0.03 * t }, 1, g => host(g, t, info, M, { x: CX() - 260, pose: breathe(act(t, [[0, 'explain'], [0.6, 'pointUp']]), t), hands: { F: 'point' }, expr: 'smirk', look: [0.6, -0.4] }));
    const k = ease.outBack(prog(t, 0.3, 0.8)); g.save(); g.translate(lerp(E.W * 1.1, E.W * 0.68, k), E.H * 0.5); g.rotate(0.3 * (1 - k) - 0.15 + Math.sin(t * 2) * 0.03); g.scale(1.8, 1.8); nail(g, 0, 120, 260); g.restore();
    pop(g, t, 1.0, (g, k2) => { g.translate(E.W * 0.68, E.H * 0.18); g.scale(k2, k2); rr(g, -190, -46, 380, 92, 46); g.fillStyle = S().ui.accent; g.fill(); text(g, 'CUỐI VIDEO', 0, 4, { size: 54, color: '#fff', font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  t02(g, t, info) {      // the Schmidt scale 1..4
    const M = studio(g, t, { z: 1.04 }); dim(g, 0.3);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.14, s: 1.9, pose: breathe(act(t, [[0, 'explain'], [1.2, 'point']]), t), hands: { F: 'point' }, expr: 'happy' }));
    const cols = ['#7ec46a', '#ffd447', '#ff9f43', '#ff4d4d'], w = 300, x0 = E.W * 0.3;
    text(g, 'THANG ĐAU SCHMIDT', E.W * 0.62, E.H * 0.2, { size: V(64, 70), color: S().ui.cream, font: FONTS.ui, weight: 900, ...STROKE });
    cols.forEach((c, i) => pop(g, t, 0.5 + i * 0.35, (g, k) => { const x = x0 + i * (w + 24) + w / 2; g.translate(x, E.H * 0.47); g.scale(k, k); rr(g, -w / 2, -110, w, 220, 26); g.fillStyle = alpha(c, 0.92); g.fill(); text(g, `${i + 1}`, 0, -8, { size: 140, color: '#1a0f12', weight: 700 }); text(g, ['NHẸ', 'MỐC CHUẨN', 'RẤT ĐAU', 'ĐAU NHẤT'][i], 0, 80, { size: 34, color: '#1a0f12', font: FONTS.ui, weight: 900 }); }));
    pop(g, t, 3.6, (g, k) => { g.translate(E.W * 0.62, E.H * 0.78); g.scale(k, k); rr(g, -340, -40, 680, 80, 40); g.fillStyle = 'rgba(10,7,16,.75)'; g.fill(); text(g, '~78 loài ong & kiến đã chấm', 0, 2, { size: 40, color: S().ui.gold, font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  t03(g, t, info) {      // "Ông ấy làm vì khoa học. Còn tôi… lỡ ký hợp đồng rồi."
    const ke = kt(info, 't00e'), cam = { z: t < ke ? 1.05 : 1.35, x: t < ke ? 0 : -120 }, M = studio(g, t, cam);
    if (t < ke) { layer(g, cam, 1, g => { host(g, t, info, M, { x: CX() - 200, pose: breathe(act(t, [[0, 'explain'], [0.8, 'think']]), t), expr: 'thinking' }); }); pop(g, t, 0.2, (g, k) => { g.translate(CX() + 380, E.H * 0.42); g.scale(k, k); rr(g, -180, -120, 360, 240, 20); g.fillStyle = '#f4efe6'; g.fill(); text(g, 'KHOA HỌC', 0, -60, { size: 44, color: '#2a160c', font: FONTS.ui, weight: 900 }); seg(g, [[-110, 0], [110, 0]], 6, '#9aa'); seg(g, [[-110, 40], [80, 40]], 6, '#9aa'); }); }
    else { layer(g, cam, 1, g => host(g, t, info, M, { x: CX() - 200, pose: boilPose(POSES.facepalm, t, 1), expr: 'nervous', prop: 'paper' })); pop(g, t, ke + 0.1, (g, k) => { g.translate(CX() + 300, E.H * 0.36); g.scale(k, k); g.rotate(-0.08); rr(g, -220, -150, 440, 300, 16); g.fillStyle = '#fbf6ea'; g.fill(); text(g, 'HỢP ĐỒNG', 0, -90, { size: 50, color: '#2a160c', font: FONTS.ui, weight: 900 }); text(g, 'Chịu đốt: 5 loài', 0, -20, { size: 34, color: '#5a3a2a', font: FONTS.ui, weight: 800 }); text(g, '✍ Cún Lú', 40, 90, { size: 42, color: '#1e4aa8', font: FONTS.ui, weight: 900 }); }); }
    hud(g, info);
  },

  // ===== Round 1: fire ant =====
  r01a(g, t, info) { roundCard(g, t, info, 1, 'KIẾN LỬA ĐỎ', meadow, (g, M) => ant(g, { x: E.W * 0.78, y: GY(), s: 1.5, facing: -1, t, kind: 'fire', rim: { color: M.rim, dir: [0, -1] } })); },
  r01b(g, t, info) { statCard(g, t, info, meadow, 'Kiến lửa đỏ', [{ label: 'Điểm đau', v: 0.25, text: '1/4' }, { label: 'Thời gian', v: 0.1, text: '≤ 5 phút' }], (g, M) => ant(g, { x: E.W * 0.42, y: GY(), s: 1.1, facing: -1, t, kind: 'fire', rim: { color: M.rim, dir: [0, -1] } }), [['sắc', 1.6], ['đột ngột', 2.6], ['giật mình', 3.6]]); },
  r01c(g, t, info) {
    const cam = { z: 1.1 + 0.04 * t / info.dur, x: 60 }, M = meadow(g, t, cam), step = 2.2;
    layer(g, cam, 1, g => { mound(g, CX() + 160, GY(), 360, '#9a5a2a'); for (let i = 0; i < 6; i++) ant(g, { x: CX() + 60 + i * 40 + Math.sin(t * 3 + i) * 20, y: GY() - 30 - (i % 2) * 40, s: 0.18, t: t + i, kind: 'fire', facing: i % 2 ? 1 : -1 });
      const onTop = t > step, hx = lerp(CX() - 260, CX() + 160, ease.inOut(prog(t, step, step + 0.6))), hy = onTop ? GY() - 150 * ease.out(prog(t, step, step + 0.6)) : GY();
      host(g, t, info, M, { x: hx, y: hy, pose: breathe(act(t, [[0, 'stand'], [0.3, 'crossArms'], [step, 'jump'], [step + 0.6, 'cheer']]), t), expr: exprAt(t, [[0, 'smirk'], [step + 0.6, 'joy']]), squash: impact(t, step + 0.6, 0.2) }); });
    hud(g, info);
  },
  r01d(g, t, info) {
    const cam = { z: 1.25, x: 160, y: -60 + Math.sin(t * 30) * 4 }, M = meadow(g, t, cam), hit = HIT.r01d;
    layer(g, cam, 1, g => { mound(g, CX() + 160, GY(), 360, '#9a5a2a'); const hx = CX() + 160, hy = GY() - 150 - Math.abs(Math.sin(t * 9)) * 60 * clamp((t - hit) * 2);
      host(g, t, info, M, { x: hx, y: hy, pose: t < hit ? breathe(POSES.cheer, t) : boilPose(POSES.handsOnHead, t, 2.4), expr: exprAt(t, [[0, 'joy'], [hit, 'shocked'], [hit + 1, 'scared']], 0.08), squash: impact(t, hit, -0.2) });
      for (let i = 0; i < 26; i++) { const u = clamp((t - i * 0.08) / 2), ax = hx - 90 + (i % 7) * 30 + Math.sin(t * 6 + i) * 10, ay = GY() - u * (120 + (i % 5) * 50); if (t > i * 0.08) ant(g, { x: ax, y: ay, s: 0.16, t: t + i, kind: 'fire', facing: i % 2 ? 1 : -1 }); }
      ['CHÍCH!', 'CHÍCH!', 'CHÍCH!', 'CHÍCH!'].forEach((s, i) => ouch(g, t - hit - i * 0.7, hx + (i % 2 ? 160 : -170), hy - 200 - i * 40, { text: s, r: 90 })); });
    hud(g, info);
  },
  r01e(g, t, info) {
    const cam = { z: 1.15 }, M = meadow(g, t, cam);
    layer(g, cam, 1, g => host(g, t, info, M, { x: CX() - 200, pose: breathe(act(t, [[0, 'shrug'], [0.6, 'wave']]), t), hands: t > 0.6 ? 'wave' : 'open', expr: exprAt(t, [[0, 'nervous'], [0.7, 'smirk']]), look: [0.8, -0.8] }));
    hud(g, info);
  },

  // ===== Round 2: honey bee =====
  r02a(g, t, info) { roundCard(g, t, info, 2, 'ONG MẬT', garden, (g, M) => { hive(g, E.W * 0.78, GY() - 520, 1.2); bee(g, { x: E.W * 0.72 + Math.sin(t * 2) * 60, y: GY() - 260 + Math.sin(t * 5) * 20, s: 1.4, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } }); }); },
  r02b(g, t, info) {
    const M = garden(g, t, { z: 1.04 }); dim(g, 0.35);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.13, s: 1.9, pose: breathe(act(t, [[0, 'explain'], [1.5, 'point']]), t), hands: { F: 'point' } }));
    const cols = ['#7ec46a', '#ffd447', '#ff9f43', '#ff4d4d'], w = 250, x0 = E.W * 0.3;
    cols.forEach((c, i) => { const x = x0 + i * (w + 20) + w / 2; rr(g, x - w / 2, E.H * 0.5 - 80, w, 160, 22); g.fillStyle = alpha(c, i === 1 ? 0.95 : 0.35); g.fill(); text(g, `${i + 1}`, x, E.H * 0.5, { size: 110, color: '#1a0f12', alpha: i === 1 ? 1 : 0.5 }); });
    const bx = x0 + (w + 20) + w / 2, k = ease.out(prog(t, 0.6, 1.6)); bee(g, { x: lerp(E.W * 1.05, bx, k), y: lerp(E.H * 0.1, E.H * 0.5 - 150, k) + Math.sin(t * 5) * 8, s: 1.1, facing: -1, t });
    pop(g, t, 1.8, (g, k2) => { g.translate(bx, E.H * 0.5 + 130); g.scale(k2, k2); rr(g, -150, -34, 300, 68, 34); g.fillStyle = S().ui.gold; g.fill(); text(g, 'MỐC CHUẨN', 0, 2, { size: 40, color: '#1a0f12', font: FONTS.ui, weight: 900 }); });
    pop(g, t, 3.4, () => dangerCard(g, t - 3.4, { name: 'Ong mật', stats: [{ label: 'Điểm đau', v: 0.5, text: '2/4' }, { label: 'Thời gian', v: 0.2, text: '5–10 phút' }], y: V(620, E.H * 0.6), x: E.W - 760 }));
    hud(g, info);
  },
  r02c(g, t, info) {      // bee stings the nose; nose swells
    const hit = HIT.r02c, cam = { z: 1.5 + 0.1 * ease.out(prog(t, hit, hit + 1)), x: -140, y: 70 }, M = garden(g, t, cam);
    layer(g, cam, 1, g => { const hx = CX() - 160; host(g, t, info, M, { x: hx, pose: t < hit ? breathe(POSES.stand, t) : boilPose(POSES.handsOnHead, t, 1.6), expr: exprAt(t, [[0, 'surprised'], [hit, 'shocked'], [hit + 0.8, 'cry']], 0.08), squash: impact(t, hit, -0.2) });
      const bx = t < hit ? lerp(CX() + 300, hx + 80, ease.in(prog(t, 0, hit))) : hx + 80 + (t - hit) * 220, by = GY() - 400 + Math.sin(t * 9) * 10; bee(g, { x: bx, y: by, s: 0.6, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } });
      if (t > hit) { const sw = 1 + 0.6 * spring(t - hit, 1.4, 0.5); circle(g, hx + 56, GY() - 395, 16 * sw, '#e2584a'); glow(g, hx + 56, GY() - 395, 40 * sw, '#ff6a50', 0.3); }
      ouch(g, t - hit, hx + 130, GY() - 470, { text: 'CHÍCH!', r: 90 }); });
    [['NÓNG RÁT', kt(info, 'r02c') + 1.2], ['ĂN MÒN', 2.3], ['…CHỊU ĐƯỢC', 3.4]].forEach(([s, at], i) => pop(g, t, at, (g, k) => { g.translate(E.W * 0.74, E.H * (0.3 + i * 0.13)); g.scale(k, k); big(g, s, 0, 0, { size: V(64, 70), color: i === 2 ? S().ui.cream : '#ff9f43' }); }));
    hud(g, info);
  },
  r02d(g, t, info) {      // barbed stinger insert + host peeking; bee "hy sinh"
    const ke = kt(info, 'r02e'), M = garden(g, t, { z: 1.2 }); dim(g, 0.45);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.16, s: 1.9, pose: breathe(act(t, [[0, 'think'], [ke, 'handsOnHead', { amt: 0.2 }]]), t), expr: exprAt(t, [[0, 'thinking'], [ke, 'shocked']]), look: [1, 0] }));
    const cx = E.W * 0.62, cy = E.H * 0.48, R = 340; g.save(); g.beginPath(); g.arc(cx, cy, R, 0, 7); g.clip(); g.fillStyle = '#f2c9a8'; g.fillRect(cx - R, cy - R, R * 2, R * 2);
    for (let i = 0; i < 6; i++) seg(g, [[cx - R, cy + 70 + i * 30], [cx + R, cy + 90 + i * 26]], 2, alpha('#c9907a', 0.5));
    const pull = ease.inOut(prog(t, ke - 0.6, ke + 0.6)); g.save(); g.translate(cx - 40 - pull * 420, cy - 30); g.rotate(-0.15); bee(g, { x: -160, y: -40, s: 1.6, facing: 1, t }); g.restore();
    g.save(); g.translate(cx - 30, cy + 40); g.rotate(-0.15); seg(g, [[-160, 0], [140, 0]], 14, '#2a1a10'); for (let i = 0; i < 6; i++) { const bx = -100 + i * 40; poly(g, [[bx, -6], [bx - 26, -22], [bx - 10, -4]], '#2a1a10'); poly(g, [[bx, 6], [bx - 26, 22], [bx - 10, 4]], '#2a1a10'); } g.restore();
    g.restore(); ring(g, cx, cy, R, 10, S().ui.gold);
    pop(g, t, 0.8, (g, k) => { g.translate(cx, cy - R - 50); g.scale(k, k); big(g, 'GAI NGƯỢC', 0, 0, { size: 58 }); });
    if (t > ke) pop(g, t, ke, (g, k) => { g.translate(cx, cy + R + 40); g.scale(k, k); big(g, 'HY SINH 🪦'.replace(' 🪦', ''), 0, 0, { size: 62, color: S().ui.cream }); });
    hud(g, info);
  },
  r02e: null,
  r02f(g, t, info) {      // swollen face + falling bee with halo
    const M = garden(g, t, { z: 1.6, x: 200 }); dim(g, 0.4);
    const puff = 1 + 0.22 * spring(t, 1.4, 0.4); g.save(); g.translate(CX() - 220, E.H * 0.54); g.scale(puff, 1 + 0.06 * spring(t, 1.4, 0.4)); face(g, t, info, M, { x: 0, y: 0, expr: exprAt(t, [[0, 'cry'], [2.0, 'sad']]) }); g.restore();
    swollenHeel(g, CX() - 140, E.H * 0.58, 1.3 + 0.1 * Math.sin(t * 4));
    const fy = lerp(E.H * 0.1, E.H * 0.8, ease.in(prog(t, 0.6, 3.2))); bee(g, { x: E.W * 0.74 + Math.sin(t * 3) * 40, y: fy, s: 1.1, t, dead: t > 0.6 });
    hud(g, info);
  },
  r02g(g, t, info) {      // serious safety note
    const M = studio(g, t, { z: 1.05 }); dim(g, 0.2);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: CX() + 280, facing: -1, pose: breathe(POSES.explain, t), hands: 'open', expr: 'determined' }));
    sign(g, CX() - 320, GY() + 10, 'DỊ ỨNG? GỌI CẤP CỨU', { w: 560, tilt: 0.02 });
    pop(g, t, 2.6, (g, k) => { g.translate(CX() - 320, E.H * 0.2); g.scale(k, k); rr(g, -330, -44, 660, 88, 44); g.fillStyle = S().ui.accent; g.fill(); text(g, 'SƯNG MẶT • KHÓ THỞ', 0, 4, { size: 46, color: '#fff', font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },

  // ===== Round 3: harvester ant =====
  r03a(g, t, info) { roundCard(g, t, info, 3, 'KIẾN THỢ GẶT', dryfield, (g, M) => ant(g, { x: E.W * 0.78, y: GY(), s: 1.6, facing: -1, t, kind: 'harvester', rim: { color: M.rim, dir: [0, -1] } })); },
  r03b(g, t, info) {
    const cam = { z: 1.08, x: -30 }, M = dryfield(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: E.W * 0.15, pose: breathe(act(t, [[0, 'think'], [3.5, 'point']]), t), expr: 'thinking', hands: t > 3.5 ? { F: 'point' } : null });
      for (let i = 0; i < 6; i++) { const ax = ((t * 90 + i * 260) % (E.W * 1.1)) - 60; ant(g, { x: ax, y: GY() + 30, s: 0.38, t: t + i, kind: 'harvester' }); seedDot(g, ax + 30, GY() + 30 - 52); }
      mound(g, E.W * 0.86, GY() + 30, 300, '#a0703a'); });
    dangerCard(g, t, { name: 'Kiến thợ gặt', stats: [{ label: 'Điểm đau', v: 0.75, text: '3/4' }] });
    pop(g, t, 1.4, (g, k) => { g.translate(E.W * 0.7, E.H * 0.5); g.scale(k, k); rr(g, -220, -40, 440, 80, 40); g.fillStyle = 'rgba(10,7,16,.7)'; g.fill(); text(g, '🌾 CHÂU MỸ • KHÔ HẠN'.replace('🌾 ', ''), 0, 2, { size: 38, color: S().ui.gold, font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  r03c(g, t, info) {      // sting on the toe + drill
    const hit = HIT.r03c, cam = { z: 1.3, x: -80, y: -40 }, M = dryfield(g, t, cam);
    layer(g, cam, 1, g => { const hx = CX() - 240; host(g, t, info, M, { x: hx, pose: t < hit ? breathe(POSES.stand, t) : boilPose(POSES.crouch, t, 1.8), expr: exprAt(t, [[0, 'surprised'], [hit, 'shocked'], [hit + 0.8, 'cry']], 0.08), squash: impact(t, hit, -0.2) });
      ant(g, { x: hx + 140, y: GY(), s: 0.5, facing: -1, t, kind: 'harvester' }); ouch(g, t - hit, hx + 120, GY() - 120, { text: 'KHOAN!', r: 100 });
      if (t > hit + 0.4) drill(g, CX() + 300, GY() - 320, 2.2 * ease.outBack(prog(t, hit + 0.4, hit + 0.8)), t); });
    pop(g, t, 3.0, (g, k) => { g.translate(E.W * 0.72, E.H * 0.18); g.scale(k, k); big(g, 'MÓNG CHÂN MỌC NGƯỢC', 0, 0, { size: V(56, 62), color: '#ff9f43' }); });
    hud(g, info);
  },
  r03d(g, t, info) {      // clock spins 8 hours, drill bit stuck
    const ke = kt(info, 'r03e'), cam = { z: 1.15 }, M = dryfield(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: CX() - 320, pose: boilPose(POSES.sit, t, 1.2), expr: exprAt(t, [[0, 'sad'], [ke, 'cry']]) }); drill(g, CX() - 160, GY() - 70, 1.0, t, t < ke); });
    FX.clock(g, E.W * 0.72, E.H * 0.38, 150, t * 6, { speed: 40 });
    pop(g, t, 0.6, (g, k) => { g.translate(E.W * 0.72, E.H * 0.7); g.scale(k, k); big(g, `${Math.min(8, Math.floor(1 + t * 1.6))} TIẾNG`, 0, 0, { size: 70 }); });
    if (t > ke) pop(g, t, ke, (g, k) => { g.translate(CX() - 160, GY() - 230); g.scale(k, k); big(g, 'KẸT!', 0, 0, { size: 70, color: '#ff6f61' }); });
    hud(g, info);
  },
  r03e: null,
  r03f(g, t, info) {      // toothpick vs drill
    const brk = info.dur * 0.62, cam = { z: 1.2, x: 40 }, M = dryfield(g, t, cam);
    layer(g, cam, 1, g => { const hx = CX() - 300; host(g, t, info, M, { x: hx, pose: breathe(act(t, [[0, 'ready'], [0.6, 'reach'], [brk, 'shrug']]), t), expr: exprAt(t, [[0, 'determined'], [brk, 'confused']]), hands: 'grip' });
      const tx = hx + 160 + Math.sin(t * 12) * 20 * (t < brk ? 1 : 0); seg(g, [[tx, GY() - 280], [tx + 140, GY() - 300]], 6, '#e8c890'); if (t > brk) seg(g, [[tx + 140, GY() - 300 + (t - brk) * 600], [tx + 200, GY() - 330 + (t - brk) * 620]], 6, '#e8c890');
      drill(g, CX() + 260, GY() - 300, 1.6, t); ouch(g, t - brk, tx + 150, GY() - 330, { text: 'TÁCH', r: 80 }); });
    if (t > brk + 0.4) pop(g, t, brk + 0.4, (g, k) => { g.translate(E.W * 0.7, E.H * 0.16); g.scale(k, k); big(g, 'MÁY KHOAN: 1 • TĂM: 0', 0, 0, { size: 58 }); });
    hud(g, info);
  },
  r03g(g, t, info) {      // bandaged toe, limping
    const cam = { z: 1.1, x: -t * 30 }, M = dryfield(g, t, cam);
    layer(g, cam, 1, g => { const hx = CX() - 200 + t * 70, lim = Math.abs(Math.sin(t * 4)) * 24; host(g, t, info, M, { x: hx, y: GY() - lim, pose: breathe(POSES.sad, t), expr: 'sad' }); ell(g, hx + 36, GY() - lim - 14, 44, 30, '#f4efe6'); seg(g, [[hx + 2, GY() - lim - 22], [hx + 70, GY() - lim - 6]], 4, '#d9cfc0'); });
    hud(g, info);
  },

  // ===== Round 4: tarantula hawk =====
  r04a(g, t, info) { roundCard(g, t, info, 4, 'ONG SĂN NHỆN', desert, (g, M) => hawk(g, { x: E.W * 0.76 + Math.sin(t * 1.5) * 50, y: GY() - 300 + Math.sin(t * 4) * 16, s: 1.5, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } }), 'tarantula hawk'); },
  r04b(g, t, info) {
    const cam = { z: 1.06 }, M = desert(g, t, cam);
    layer(g, cam, 1, g => host(g, t, info, M, { x: E.W * 0.12, s: 1.8, pose: breathe(act(t, [[0, 'stand'], [0.5, 'point']]), t), hands: { F: 'point' }, expr: 'worried' }));
    dangerCard(g, t, { name: 'Ong săn nhện', stats: [{ label: 'Điểm đau', v: 1.0, text: '4/4' }, { label: 'Thời gian', v: 0.1, text: '~5 phút' }] });
    pop(g, t, 2.2, () => sizeCompare(g, t - 2.2, { x0: E.W * 0.34, x1: E.W * 0.54, maxH: 300, base: GY() - 60, items: [{ label: 'Ong ~5 cm', h: 5, draw: (g, x, b, ph) => hawk(g, { x, y: b - ph / 2, s: ph / 140, t, ground: true }) }, { label: 'Ong mật ~1,5 cm', h: 1.5, draw: (g, x, b, ph) => bee(g, { x, y: b - ph / 2, s: ph / 70, t }) }] }));
    hud(g, info);
  },
  r04c(g, t, info) {      // wasp drags paralysed tarantula; host hides behind rock
    const kd = kt(info, 'r04d'), cam = { z: 1.12, x: -t * 20 }, M = desert(g, t, cam);
    layer(g, cam, 1, g => { const px = lerp(CX() + 500, CX() + 60, prog(t, 0, kd)); tarantula(g, { x: px, y: GY(), s: 1.3, facing: -1, t: 0, rim: { color: M.rim, dir: [0, -1] } }); hawk(g, { x: px - 120, y: GY() - 120 + Math.sin(t * 6) * 6, s: 0.9, facing: -1, t, ground: true });
      ell(g, E.W * 0.86, GY() + 40, 80, 40, '#1a1208'); FX.pool(g, E.W * 0.86, GY() + 30, 90, 30, '#000', 0.4);
      ell(g, CX() - 380, GY() - 70, 170, 110, '#9a6a3a'); host(g, t, info, M, { x: CX() - 440, y: GY() + (t < kd ? 120 : 60), s: 1.8, pose: breathe(t < kd ? POSES.crouch : POSES.shrug, t), expr: t < kd ? 'scared' : 'nervous', look: [1, 0.2] }); });
    if (t > 1.8 && t < kd) pop(g, t, 1.8, (g, k) => { g.translate(E.W * 0.62, E.H * 0.2); g.scale(k, k); big(g, 'TÊ LIỆT → KÉO VỀ HANG', 0, 0, { size: 52, color: S().ui.cream }); });
    hud(g, info);
  },
  r04d: null,
  r04e(g, t, info) {      // wasp circling, host trembling; "Nằm xuống, và hét."
    const kf = kt(info, 'r04f'), cam = { z: 1.2 }, M = desert(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: CX() - 100, pose: t < kf ? boilPose(POSES.ready, t, 2.2) : act(t, [[kf, 'fall'], [kf + 0.4, { ...POSES.lie }]]), rot: t > kf ? -1.4 * ease.out(prog(t, kf, kf + 0.4)) : 0, expr: t < kf ? 'scared' : 'shocked' });
      const a = t * 2.4; hawk(g, { x: CX() - 100 + Math.cos(a) * 320, y: GY() - 330 + Math.sin(a) * 90, s: 0.9, facing: Math.sin(a) > 0 ? -1 : 1, t }); });
    [['CHÓI CẢ MẮT', 0.9], ['DỮ DỘI', 2.0], ['⚡ ĐIỆN GIẬT'.replace('⚡ ', ''), 3.0]].forEach(([s, at], i) => { if (t < kf) pop(g, t, at, (g, k) => { g.translate(E.W * 0.76, E.H * (0.24 + i * 0.13)); g.scale(k, k); big(g, s, 0, 0, { size: 60, color: i === 2 ? '#7fd8ff' : '#ff9f43' }); }); });
    if (t > kf) pop(g, t, kf + 0.2, (g, k) => { g.translate(CX(), E.H * 0.2); g.scale(k, k); big(g, 'NẰM XUỐNG & HÉT', 0, 0, { size: 76 }); });
    hud(g, info);
  },
  r04f: null,
  r04g(g, t, info) {      // ZAP — lying in the sand screaming
    const hit = HIT.r04g, cam = { z: 1.35, x: Math.sin(t * 60) * 6 * clamp(1 - t), y: -60 }, M = desert(g, t, cam);
    layer(g, cam, 1, g => host(g, t, info, M, { x: CX(), y: GY() + 50, pose: boilPose(POSES.lie, t, 2.5), rot: -1.4, expr: exprAt(t, [[0, 'shocked'], [1.2, 'cry']]), squash: impact(t, hit, -0.25) }));
    if (t > hit && t < hit + 0.5) for (let i = 0; i < 3; i++) FX.lightning(g, { seed: 3 + i + Math.floor(t * 20), x1: CX() - 200 + i * 200, y1: E.H * 0.2, x2: CX() - 60 + i * 60, y2: GY() - 80, a: 0.9 });
    ouch(g, t - hit, CX() + 220, GY() - 260, { text: 'XẸT!', r: 130, color: '#9fe8ff' });
    pop(g, t, 1.0, (g, k) => { g.translate(E.W * 0.22, E.H * 0.2); g.scale(k, k); rr(g, -160, -44, 320, 88, 44); g.fillStyle = S().ui.gold; g.fill(); text(g, '~5 PHÚT', 0, 4, { size: 52, color: '#1a0f12', font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  r04h(g, t, info) {      // hourglass crawls, fur greys
    const cam = { z: 1.15 }, M = desert(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: CX() - 260, y: GY() + 50, pose: breathe(POSES.lie, t * 0.3), rot: -1.4, expr: 'sleepy', mute: false }); const grey = prog(t, 0.5, info.dur - 0.5); ell(g, CX() - 330, GY() - 120, 46 * grey, 30 * grey, alpha('#d8d8d8', 0.85)); });
    hourglass(g, E.W * 0.7, E.H * 0.45, 380, prog(t, 0, info.dur * 3)); FX.clock(g, E.W * 0.88, E.H * 0.2, 70, t * 0.2);
    pop(g, t, 0.4, (g, k) => { g.translate(E.W * 0.7, E.H * 0.82); g.scale(k, k); big(g, '5 PHÚT = MỘT ĐỜI', 0, 0, { size: 58, color: S().ui.cream }); });
    hud(g, info);
  },

  // ===== Round 5: bullet ant =====
  r05a(g, t, info) { roundCard(g, t, info, 5, 'KIẾN ĐẠN', rainforest, (g, M) => ant(g, { x: E.W * 0.76, y: GY(), s: 1.9, facing: -1, t, kind: 'bullet', rim: { color: M.rim, dir: [0, -1] } }), 'VÒNG CUỐI'); },
  r05b(g, t, info) {
    const cam = { z: 1.06 }, M = rainforest(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: E.W * 0.12, s: 1.8, pose: breathe(act(t, [[0, 'stand'], [0.4, 'point']]), t), hands: { F: 'point' }, expr: 'worried' }); ant(g, { x: E.W * 0.36, y: GY(), s: 0.9, facing: -1, t, kind: 'bullet', rim: { color: M.rim, dir: [0, -1] } }); });
    dangerCard(g, t, { name: 'Kiến đạn', stats: [{ label: 'Điểm đau', v: 1.0, text: '4/4' }, { label: 'Thời gian', v: 1.0, text: 'tới ~24 giờ' }] });
    pop(g, t, 3.4, (g, k) => { g.translate(E.W * 0.7, E.H * 0.74); g.scale(k, k); rr(g, -340, -44, 680, 88, 44); g.fillStyle = 'rgba(10,7,16,.75)'; g.fill(); text(g, 'Ong săn nhện 4/4  =  Kiến đạn 4/4', 0, 3, { size: 38, color: S().ui.gold, font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  r05c(g, t, info) {      // sting on heel + insert: coals + nail
    const hit = HIT.r05c, M = rainforest(g, t, { z: 1.25, x: -260 }); dim(g, 0.2);
    layer(g, { z: 1.25, x: -260 }, 1, g => { const hx = CX() - 420; host(g, t, info, M, { x: hx, pose: t < hit ? breathe(POSES.stand, t) : boilPose(POSES.handsOnHead, t, 2.6), expr: exprAt(t, [[0, 'worried'], [hit, 'shocked'], [hit + 1, 'cry']], 0.08), squash: impact(t, hit, -0.25) }); ant(g, { x: hx + 70, y: GY(), s: 0.5, facing: -1, t, kind: 'bullet' }); ouch(g, t - hit, hx + 40, GY() - 150, { text: 'ĐOÀNG!', r: 130 }); if (t > hit) swollenHeel(g, hx + 26, GY() - 12, 0.7 + 0.3 * ease.out(prog(t, hit, hit + 1))); });
    const ix = E.W * 0.7, iy = E.H * 0.52, R = 300, k = ease.outBack(prog(t, 2.0, 2.4)); if (k > 0) { g.save(); g.translate(ix, iy); g.scale(k, k); g.beginPath(); g.arc(0, 0, R, 0, 7); g.save(); g.clip(); g.fillStyle = '#1a0e0a'; g.fillRect(-R, -R, R * 2, R * 2); coals(g, 0, 140, 520, t); ell(g, 0, 40, 130, 60, '#e8b896'); nail(g, 10, 60, 230 * ease.out(prog(t, 3.6, 4.4)), 0.05); g.restore(); ring(g, 0, 0, R, 10, '#ff7a2a'); g.restore(); }
    pop(g, t, 4.4, (g, k2) => { g.translate(ix, iy - R - 40); g.scale(k2, k2); big(g, 'ĐINH 7,5 CM', 0, 0, { size: 60, color: '#ff6f61' }); });
    [['NGUYÊN CHẤT', 1.2], ['DỮ DỘI', 1.9], ['SÁNG LOÁ', 2.6]].forEach(([s, at], i) => pop(g, t, at, (g, k2) => { g.translate(E.W * 0.24, E.H * (0.16 + i * 0.1)); g.scale(k2, k2); big(g, s, 0, 0, { size: 50, color: '#ff9f43' }); }));
    hud(g, info);
  },
  r05d(g, t, info) {      // callback to cold open
    const ke = kt(info, 'r05e'), M = rainforest(g, t, { z: 1.1 }); dim(g, 0.3);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: CX() - 360, pose: breathe(act(t, [[0, 'point'], [ke, 'sad']]), t), hands: t < ke ? { F: 'point' } : null, expr: exprAt(t, [[0, 'smirk'], [ke, 'sad']]) }));
    const fx = E.W * 0.66, fy = E.H * 0.42, fw = 620, fh = 350; rr(g, fx - fw / 2 - 12, fy - fh / 2 - 12, fw + 24, fh + 24, 18); g.fillStyle = '#f4efe6'; g.fill();
    g.save(); rr(g, fx - fw / 2, fy - fh / 2, fw, fh, 10); g.clip(); g.translate(fx, fy); g.scale(fw / E.W, fh / E.H); g.translate(-CX(), -E.H / 2); const c0 = SH('c00'); DRAW.c00(g, Math.min(1.2, t), { ...info, dur: c0.end - c0.start, shot: c0, globalT: c0.start + 1.2 }); g.restore();
    text(g, 'ĐẦU VIDEO', fx, fy + fh / 2 + 50, { size: 40, color: S().ui.cream, font: FONTS.ui, weight: 900 });
    if (t > ke) pop(g, t, ke, (g, k) => { g.translate(CX(), E.H * 0.13); g.scale(k, k); big(g, 'CÁI ĐAU THÌ CÓ THẬT', 0, 0, { size: 70, color: '#ff6f61' }); });
    hud(g, info);
  },
  r05e: null,
  r05f(g, t, info) {      // split: 5 minutes vs ~24 hours
    const M = studio(g, t, { z: 1 }); dim(g, 0.2);
    rr(g, 60, 140, CX() - 90, E.H - 280, 30); g.fillStyle = 'rgba(30,40,70,.85)'; g.fill(); rr(g, CX() + 30, 140, CX() - 90, E.H - 280, 30); g.fillStyle = 'rgba(70,24,24,.85)'; g.fill();
    hawk(g, { x: E.W * 0.25, y: E.H * 0.42, s: 1.2, facing: 1, t }); ant(g, { x: E.W * 0.75, y: E.H * 0.52, s: 1.3, facing: -1, t, kind: 'bullet' });
    pop(g, t, 1.0, (g, k) => { g.translate(E.W * 0.25, E.H * 0.7); g.scale(k, k); big(g, '5 PHÚT', 0, 0, { size: 96, color: '#7fd8ff' }); });
    pop(g, t, info.dur * 0.42, (g, k) => { g.translate(E.W * 0.75, E.H * 0.7); g.scale(k, k); big(g, '~24 GIỜ', 0, 0, { size: 96, color: '#ff6f61' }); });
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: CX(), s: 1.6, pose: breathe(POSES.shrug, t), expr: exprAt(t, [[0, 'confused'], [3.0, 'shocked']]), look: [Math.sin(t * 1.5), 0] }));
    hud(g, info);
  },
  r05g(g, t, info) {      // nerve switch stuck ON
    const M = studio(g, t, { z: 1.05 }); dim(g, 0.25);
    const x0 = E.W * 0.36, x1 = E.W * 0.86, y = E.H * 0.44; seg(g, [[x0, y], [x1, y]], 18, '#e8c86a'); for (let i = 0; i < 8; i++) { const u = ((t * 1.6 + i / 8) % 1), px = lerp(x0, x1, u); glow(g, px, y, 40, '#ff6a50', 0.8); circle(g, px, y, 10, '#fff1dc'); }
    circle(g, x1, y, 40, '#e8c86a'); text(g, 'NÃO: ĐAU!', x1, y - 90, { size: 44, color: '#ff6f61', font: FONTS.ui, weight: 900 });
    bigSwitch(g, x0 - 20, y + 10, 0.9, true);
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.12, s: 1.8, pose: breathe(act(t, [[0, 'explain'], [1.5, 'point']]), t), hands: { F: 'point' }, expr: 'worried', prop: 'pointer' }));
    pop(g, t, 0.5, (g, k) => { g.translate(E.W * 0.62, E.H * 0.16); g.scale(k, k); big(g, 'PONERATOXIN', 0, 0, { size: 72, color: '#b8f0c8' }); });
    hud(g, info);
  },
  r05h(g, t, info) {      // host hammers the switch; it never turns off
    const ki = kt(info, 'r05i'), M = studio(g, t, { z: 1.15 }), press = Math.abs(Math.sin(t * 14));
    bigSwitch(g, CX() + 220, E.H * 0.48, 1.4, true, press);
    layer(g, { z: 1.15 }, 1, g => host(g, t, info, M, { x: CX() - 140, pose: t < ki ? boilPose(POSES.reach, t, 2.4) : breathe(POSES.facepalm, t), hands: 'fist', expr: t < ki ? 'angry' : 'cry', squash: t < ki ? 0.08 * press : 0 }));
    if (t < ki) for (let i = 0; i < 3; i++) ouch(g, (t + i * 0.2) % 0.6, CX() + 120 + i * 40, E.H * 0.3 + i * 30, { text: 'BẤM!', r: 70 });
    pop(g, t, 0.8, (g, k) => { g.translate(E.W * 0.8, E.H * 0.3); g.scale(k, k); big(g, `x${Math.min(100, Math.floor(t * 30))}`, 0, 0, { size: 80 }); });
    if (t > ki) pop(g, t, ki, (g, k) => { g.translate(CX(), E.H * 0.86); g.scale(k, k); big(g, 'KHÔNG CÓ NÚT TẮT', 0, 0, { size: 72, color: '#ff6f61' }); });
    hud(g, info);
  },
  r05i: null,
  r05j(g, t, info) {      // timelapse day → night, ends on the cold-open frame; "Bé Đinh"
    const kk = kt(info, 'r05k'), M = rainforest(g, t, { z: 1.12 }), u = prog(t, 0, kk);
    g.fillStyle = `rgba(255,190,110,${0.35 * Math.sin(u * Math.PI)})`; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    const sx = lerp(-100, E.W + 100, u), sy = E.H * 0.4 - Math.sin(u * Math.PI) * E.H * 0.3; FX.sun(g, sx, sy, 60, '#fff1d6', '#ffcf8f', 4);
    layer(g, { z: 1.12 }, 1, g => { host(g, t, info, M, { x: CX() - 60, pose: boilPose(POSES.sad, t, 1.4), expr: t < kk ? 'cry' : 'smile' }); swollenHeel(g, CX() - 40, GY() - 10, 1 + 0.05 * Math.sin(t * 6)); });
    const hrs = [[0, 'GIỜ 1'], [kk * 0.28, 'GIỜ 6'], [kk * 0.58, 'GIỜ 24']]; hrs.forEach(([at, s], i) => { if (t >= at && (i === 2 || t < hrs[i + 1][0])) pop(g, t, at, (g, k) => { g.translate(E.W * 0.78, E.H * 0.2); g.scale(k, k); big(g, s, 0, 0, { size: 84 }); }); });
    if (t > kk) pop(g, t, kk, (g, k) => { g.translate(CX() + 380, GY() - 120); g.scale(k, k); rr(g, -150, -50, 300, 100, 50); g.fillStyle = '#ffd6e0'; g.fill(); text(g, 'BÉ ĐINH', 0, 4, { size: 52, color: '#7a1a3a', font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  r05k: null,

  // ===== Recap + CTA =====
  z90(g, t, info) {
    const M = studio(g, t, { z: 1.04 }); dim(g, 0.45);
    text(g, 'BẢNG XẾP HẠNG ĐAU', CX() - 120, V(110, 240), { size: V(72, 84), color: S().ui.gold, glow: 24, glowColor: alpha(S().ui.gold, 0.7) });
    const rows = [['Kiến đạn', 1.0, 'bullet', '4 • ~24 giờ'], ['Ong săn nhện', 0.97, 'hawk', '4 • ~5 phút'], ['Kiến thợ gặt', 0.75, 'harvester', '3'], ['Ong mật', 0.5, 'bee', '2'], ['Kiến lửa đỏ', 0.25, 'fire', '1']];
    const w = 1080, x = CX() - w / 2 - 160, order = [4, 3, 2, 1, 0];   // reveal from #5 up to #1
    order.forEach((i, j) => { const [name, v, kind, lab] = rows[i], at = 0.6 + j * Math.max(1.6, (info.dur - 4) / 6); const k = ease.outBack(prog(t, at, at + 0.4)); if (k <= 0) return; const y = V(190, 380) + i * 140;
      g.save(); g.translate(x + w / 2, y + 55); g.scale(k, k); g.translate(-(x + w / 2), -(y + 55));
      rr(g, x, y, w, 116, 20); g.fillStyle = S().ui.card; g.fill(); g.strokeStyle = i === 0 ? S().ui.gold : S().ui.cardLine; g.lineWidth = i === 0 ? 5 : 2; g.stroke(); if (i === 0) glow(g, x + 60, y + 58, 140, S().ui.gold, 0.4 + 0.2 * Math.sin(t * 4));
      text(g, `#${i + 1}`, x + 60, y + 60, { size: 54, color: i === 0 ? S().ui.gold : S().ui.cream });
      text(g, name, x + 130, y + 40, { size: 38, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left' }); text(g, lab, x + w - 200, y + 40, { size: 32, color: S().ui.gold, font: FONTS.ui, weight: 900, align: 'right' });
      rr(g, x + 130, y + 70, (w - 360) * v * ease.out(prog(t, at + 0.3, at + 1.0)) + 1, 16, 8); g.fillStyle = v > 0.7 ? S().ui.accent : S().ui.gold; g.fill();
      const cx = x + w - 90, cy = y + 96; if (kind === 'bee') bee(g, { x: cx, y: cy - 30, s: 0.45, t }); else if (kind === 'hawk') hawk(g, { x: cx, y: cy - 34, s: 0.4, t }); else ant(g, { x: cx, y: cy, s: 0.32, t, kind });
      g.restore(); });
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.88, s: 1.8, facing: -1, pose: breathe(act(t, [[0, 'stand'], [0.6, 'point']]), t), hands: { F: 'point' }, expr: 'nervous' }));
    hud(g, info);
  },
  z91(g, t, info) {      // subjectivity caveat
    const M = studio(g, t, { z: 1.1 });
    layer(g, { z: 1.1 }, 1, g => host(g, t, info, M, { x: CX() - 220, pose: breathe(act(t, [[0, 'shrug'], [1.5, 'explain']]), t), hands: 'open', expr: 'smile' }));
    pop(g, t, 0.4, (g, k) => { g.translate(CX() + 400, E.H * 0.4); g.scale(k, k); rr(g, -330, -120, 660, 240, 26); g.fillStyle = 'rgba(10,7,16,.78)'; g.fill(); text(g, 'Thang Schmidt =', 0, -50, { size: 44, color: S().ui.cream, font: FONTS.ui, weight: 900 }); text(g, 'cảm nhận chủ quan', 0, 10, { size: 50, color: S().ui.gold, font: FONTS.ui, weight: 900 }); text(g, 'chỉ để so sánh cho vui', 0, 70, { size: 34, color: S().ui.text, font: FONTS.ui, weight: 800 }); });
    hud(g, info);
  },
  z99(g, t, info) {      // CTA + button gag (stray fire ant → 6)
    const kb = kt(info, 'z99b'), hit = kb - 0.45, cam = { z: 1.15 - 0.04 * ease.inOut(t / info.dur) }, M = meadow(g, t, cam);
    layer(g, cam, 1, g => { host(g, t, info, M, { x: CX() + 120, pose: t < hit ? breathe(act(t, [[0, 'stand'], [0.4, 'explain'], [3.6, 'wave']]), t) : boilPose(POSES.stand, t, 0.6), hands: t > 3.6 && t < hit ? 'wave' : 'open', expr: exprAt(t, [[0, 'happy'], [hit, 'shocked'], [kb, 'neutral']], 0.1), look: t > hit ? [0, 1] : saccade(t, 3, { amp: 0.2 }), squash: impact(t, hit, -0.15) });
      if (t > hit - 1.6) ant(g, { x: lerp(CX() - 200, CX() + 140, prog(t, hit - 1.6, hit)), y: GY(), s: 0.2, t, kind: 'fire' }); ouch(g, t - hit, CX() + 150, GY() - 60, { text: 'CHÍCH!', r: 70 }); });
    sign(g, CX() - 420, GY() + 10, 'TẬP SAU: ???', { tilt: 0.06 });
    if (t < hit) { pop(g, t, 1.2, (g, k) => { g.translate(CX() - 520, E.H * 0.24); g.scale(k * 1.7, k * 1.7); g.fillStyle = 'rgba(20,40,80,.85)'; g.beginPath(); g.ellipse(-170, 0, 70, 46, 0, Math.PI, 0); g.fill(); for (let i = 0; i < 5; i++) seg(g, [[-220 + i * 25, 0], [-220 + i * 25 + Math.sin(t * 3 + i) * 10, 90]], 5, 'rgba(120,180,255,.7)'); text(g, 'SỨA HỘP', -170, 135, { size: 30, color: S().ui.cream, font: FONTS.ui, weight: 900, ...STROKE }); text(g, 'hay', 0, 40, { size: 34, color: S().ui.gold, font: FONTS.ui, weight: 900, ...STROKE }); seg(g, [[120, 70], [150, 30], [180, 60], [210, 10]], 16, '#3a5a2a'); circle(g, 212, 4, 16, '#3a5a2a'); text(g, 'HỔ MANG CHÚA', 170, 135, { size: 30, color: S().ui.cream, font: FONTS.ui, weight: 900, ...STROKE }); }); }
    pop(g, t, 2.6, (g, k) => { g.translate(E.W * 0.8, E.H * 0.82); g.scale(k, k); rr(g, -230, -40, 460, 80, 40); g.fillStyle = S().ui.accent; g.fill(); text(g, 'ĐỪNG THỬ Ở NHÀ!', 0, 3, { size: 40, color: '#fff', font: FONTS.ui, weight: 900 }); });
    hud(g, info);
  },
  z99b: null,
};

function roundCard(g, t, info, n, title, place, creature, sub = null) {
  const M = place(g, t, { z: 1.3 }); dim(g, 0.4);
  layer(g, { z: 1 }, 1, g => { creature(g, M); host(g, t, info, M, { x: E.W * 0.16, s: 1.7, pose: breathe(act(t, [[0, 'stand'], [0.3, 'cheer']]), t), expr: n >= 4 ? 'nervous' : 'joy', hands: 'fist' }); });
  roundTitle(g, t, { n, title, sub, dur: info.dur });
  hud(g, info);
}
function statCard(g, t, info, place, name, stats, creature, words = []) {
  const cam = { z: 1.08 + 0.03 * ease.inOut(t / info.dur), x: -40 }, M = place(g, t, cam);
  layer(g, cam, 1, g => { host(g, t, info, M, { x: E.W * 0.16, pose: breathe(act(t, [[0, 'stand'], [0.4, 'point'], [2.4, 'explain']]), t), hands: t < 2.4 ? { F: 'point' } : 'open', expr: 'smirk' }); creature(g, M); });
  dangerCard(g, t, { name, stats });
  words.forEach(([s, at], i) => pop(g, t, at, (g, k) => { g.translate(E.W * 0.8, E.H * (0.5 + i * 0.1)); g.scale(k, k); big(g, s.toUpperCase(), 0, 0, { size: 60, color: '#ff9f43' }); }));
  hud(g, info);
}

for (const sh of E.shots) { const fn = DRAW[sh.id]; if (fn) registerShot(sh.id, { draw: fn }); }
export { ant, rainforest, swollenHeel, bandage, DOG, big };
