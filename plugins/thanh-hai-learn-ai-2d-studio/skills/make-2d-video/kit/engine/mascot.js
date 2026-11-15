// engine/mascot.js — v0.7 full-body cartoon mascot (Tí Hon, the channel's original tiny T-rex) + the "inked" render layer.
//   mascot(g, {x, y, s, facing, t, pose, expr, look, blink, viseme, squash, rot, colors})  feet at (x, y), ≈ 250 units tall at s = 1
//     pose: 'stand' 'point' 'wave' 'think' 'cheer' 'handsOnHead' 'run' 'fall' 'reach' 'crouch'
//     expr: 'happy' 'joy' 'smirk' 'shocked' 'awe' 'nervous' 'thinking' 'cry' 'angry' 'determined'
//   mascotFace(g, x, y, r, {expr, look, blink, viseme, t, facing, tilt})   close-up head + shoulders, r = head radius
//   inked(g, fn, {w, color, light, shade})   draws fn into a layer, then puts it on screen with ONE clean outline around the
//     whole silhouette, a soft shadow side and a rim light, so code-drawn characters and critters share the same look.
import { E, clamp, lerp, ease, prog, circle, seg, rr, alpha, shade } from './core.js';

export const TIHON_COLORS = { body: '#5fb84a', dark: '#3f8f33', belly: '#d3ecaa', spike: '#2f7a2a', scarf: '#f28c28', scarfDark: '#c96a14', ink: '#1d2a1a', eye: '#ffffff', pupil: '#1a1622', tongue: '#e36a7a', mouth: '#5a1f2a', tooth: '#fffaf0' };
export const MASCOT_POSES = ['stand', 'point', 'wave', 'think', 'cheer', 'handsOnHead', 'run', 'fall', 'reach', 'crouch'];
export const MASCOT_EXPRS = ['happy', 'joy', 'smirk', 'shocked', 'awe', 'nervous', 'thinking', 'cry', 'angry', 'determined'];

const ell = (g, x, y, rx, ry, c, rot = 0) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, Math.PI * 2); g.fill(); };
const cap = (g, a, b, w, c) => seg(g, [a, b], w, c);

// ---------- the inked layer ----------
let LAYER = null;
function layerCanvas(g) {
  const W = g.canvas.width, H = g.canvas.height;
  if (!LAYER || LAYER.width !== W || LAYER.height !== H) { LAYER = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(W, H) : Object.assign(document.createElement('canvas'), { width: W, height: H }); }
  return LAYER;
}
export function inked(g, fn, o = {}) {
  if (!g.canvas || typeof g.getTransform !== 'function' || (typeof OffscreenCanvas === 'undefined' && typeof document === 'undefined')) { fn(g); return; }   // test contexts: draw straight through
  const { w = 5, color = TIHON_COLORS.ink, light = [-0.6, -0.8], shadeA = 0.22 } = o;
  const L = layerCanvas(g), c = L.getContext('2d'), m = g.getTransform(), px = w * Math.hypot(m.a, m.b);
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, L.width, L.height); c.setTransform(m); c.globalAlpha = 1; fn(c);
  // volume: darken the side away from the light, brighten a rim on the lit side (only where the layer already has paint)
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-atop';
  const cx = L.width / 2, cy = L.height / 2, R = Math.hypot(L.width, L.height) / 2;
  const sh = c.createLinearGradient(cx + light[0] * R, cy + light[1] * R, cx - light[0] * R, cy - light[1] * R);
  sh.addColorStop(0.45, 'rgba(0,0,0,0)'); sh.addColorStop(1, `rgba(20,10,40,${shadeA})`); c.fillStyle = sh; c.fillRect(0, 0, L.width, L.height);
  c.restore();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const d = Math.max(1, px), k = Math.round(d * 0.7);
  g.filter = `drop-shadow(${d}px 0 0 ${color}) drop-shadow(${-d}px 0 0 ${color}) drop-shadow(0 ${d}px 0 ${color}) drop-shadow(0 ${-d}px 0 ${color}) drop-shadow(${k}px ${k}px 0 ${color}) drop-shadow(${-k}px ${-k}px 0 ${color})`;
  g.drawImage(L, 0, 0); g.filter = 'none';
  g.restore();
}

// ---------- poses: angles in radians (0 = pointing forward/right, + = down) ----------
function poseParams(name, t) {
  const b = Math.sin(t * 2.4) * 0.04;
  const P = {
    stand:       { armF: 0.9 + b, armB: 1.1 + b, lean: 0, legA: 0, legB: 0, crouch: 0 },
    point:       { armF: -0.15, armB: 1.0, lean: 0.06, legA: 0.08, legB: -0.08, crouch: 0 },
    wave:        { armF: -1.2 + Math.sin(t * 10) * 0.35, armB: 1.0, lean: -0.03, legA: 0, legB: 0, crouch: 0 },
    think:       { armF: -1.9, armB: 1.0, lean: -0.05, legA: 0.05, legB: -0.05, crouch: 0, chin: true },
    cheer:       { armF: -1.5 + Math.sin(t * 9) * 0.2, armB: -1.4 - Math.sin(t * 9) * 0.2, lean: -0.08, legA: 0.18, legB: -0.18, crouch: 0, hop: Math.abs(Math.sin(t * 7)) * 18 },
    handsOnHead: { armF: -2.2 + Math.sin(t * 24) * 0.08, armB: -2.3, lean: -0.1 + Math.sin(t * 24) * 0.02, legA: 0.12, legB: -0.12, crouch: 0.15 },
    run:         { armF: Math.sin(t * 20) * 0.9, armB: -Math.sin(t * 20) * 0.9, lean: 0.25, legA: Math.sin(t * 20) * 0.75, legB: -Math.sin(t * 20) * 0.75, crouch: 0.05, hop: Math.abs(Math.sin(t * 20)) * 14 },
    fall:        { armF: -2.6, armB: -2.4, lean: -0.2, legA: -0.7, legB: -0.3, crouch: 0 },
    reach:       { armF: -0.3, armB: 0.2, lean: 0.32, legA: 0.25, legB: -0.3, crouch: 0.05 },
    crouch:      { armF: 0.6, armB: 0.8, lean: 0.1, legA: 0.2, legB: -0.2, crouch: 0.35 },
  };
  return P[name] || P.stand;
}

// ---------- head (shared by the full body and the close-up) ----------
// local frame: head centre at (0,0), radius 60, facing +x; the snout reaches x ≈ 98
function head(g, o) {
  const C = o.colors || TIHON_COLORS, ex = o.expr || 'happy', t = o.t || 0, look = o.look || [0.4, 0];
  const blink = o.blink ?? ((t % 3.1) > 2.98);
  // back-of-head spikes
  g.fillStyle = C.spike;
  for (const [a, h] of [[-2.2, 26], [-1.75, 30], [-1.3, 24]]) { const x0 = Math.cos(a - 0.2) * 54, y0 = Math.sin(a - 0.2) * 54, x1 = Math.cos(a + 0.2) * 54, y1 = Math.sin(a + 0.2) * 54; g.beginPath(); g.moveTo(x0, y0); g.lineTo(Math.cos(a) * (54 + h), Math.sin(a) * (54 + h)); g.lineTo(x1, y1); g.closePath(); g.fill(); }
  // skull + snout as one soft shape
  g.fillStyle = C.body; g.beginPath(); g.ellipse(0, 0, 62, 58, 0, 0, Math.PI * 2); g.fill();
  rr(g, 10, -26, 92, 62, 30); g.fill();
  // jaw: opens with the mouth
  const v = o.viseme, open = { A: 0.9, O: 0.75, U: 0.45, E: 0.5, F: 0.15, M: 0, rest: 0.05 }[v] ?? ({ shocked: 0.85, awe: 0.55, cry: 0.6, joy: 0.45, nervous: 0.12, angry: 0.3 }[ex] ?? 0.1);
  const jo = open * 22;
  ell(g, 54, 34 + jo * 0.5, 44, 16 + jo * 0.5, C.belly);                    // lighter chin
  // mouth
  g.save();
  if (jo > 3) {
    g.fillStyle = C.mouth; g.beginPath(); g.moveTo(26, 22); g.quadraticCurveTo(64, 16, 100, 18); g.quadraticCurveTo(70, 26 + jo * 1.6, 26, 22 + jo * 0.6); g.closePath(); g.fill();
    ell(g, 62, 24 + jo * 0.9, 16, 5 + jo * 0.18, C.tongue);
    g.fillStyle = C.tooth; for (let i = 0; i < 4; i++) { const tx = 44 + i * 14; g.beginPath(); g.moveTo(tx - 5, 19); g.lineTo(tx + 5, 19); g.lineTo(tx, 27); g.closePath(); g.fill(); }
  } else {
    g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath();
    if (ex === 'smirk') { g.moveTo(40, 22); g.quadraticCurveTo(72, 26, 94, 12); }
    else if (ex === 'nervous') { g.moveTo(36, 22); for (let i = 1; i <= 6; i++) g.lineTo(36 + i * 10, 22 + (i % 2 ? -4 : 3)); }
    else if (ex === 'thinking' || ex === 'determined' || ex === 'angry') { g.moveTo(42, 22); g.lineTo(90, 20); }
    else { g.moveTo(34, 18); g.quadraticCurveTo(66, 36, 98, 16); }
    g.stroke();
    if (ex === 'happy' || ex === 'smirk' || ex === 'joy') { g.fillStyle = C.tooth; g.beginPath(); g.moveTo(84, 19); g.lineTo(92, 18); g.lineTo(88, 26); g.closePath(); g.fill(); }
  }
  g.restore();
  circle(g, 92, -10, 4, alpha(C.ink, 0.55));                               // nostril
  ell(g, 40, 10, 12, 7, alpha('#ff8a8a', ex === 'joy' || ex === 'happy' ? 0.45 : 0.2));   // blush
  // eyes: near eye big, far eye smaller (3/4 view)
  const eye = (cx, cy, r, far) => {
    if (blink || ex === 'joy' || ex === 'cry') {
      g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
      if (ex === 'joy') { g.moveTo(cx - r * 0.8, cy + 3); g.quadraticCurveTo(cx, cy - r * 0.9, cx + r * 0.8, cy + 3); }
      else { g.moveTo(cx - r * 0.8, cy); g.quadraticCurveTo(cx, cy + r * 0.6, cx + r * 0.8, cy); }
      g.stroke();
      if (ex === 'cry' && !far) { const k = ((t * 1.6) % 1); ell(g, cx + 4, cy + 10 + k * 40, 5, 8, alpha('#8fd3ff', 0.9 * (1 - k))); }
      return;
    }
    const big = ex === 'shocked' ? 1.18 : ex === 'awe' ? 1.1 : 1, pr = ex === 'shocked' ? 0.32 : ex === 'awe' ? 0.62 : 0.5;
    ell(g, cx, cy, r * big, r * big * 1.12, C.eye);
    const lx = clamp(look[0], -1, 1) * r * 0.35, ly = clamp(look[1], -1, 1) * r * 0.35;
    circle(g, cx + lx, cy + ly, r * pr, C.pupil);
    circle(g, cx + lx - r * pr * 0.35, cy + ly - r * pr * 0.4, r * pr * 0.38, '#ffffff');       // highlight
    if (ex === 'awe') circle(g, cx + lx + r * pr * 0.3, cy + ly + r * pr * 0.3, r * pr * 0.18, '#ffffff');
  };
  eye(-2, -22, 14, true); eye(34, -20, 19, false);
  // brows
  g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round';
  const brow = (cx, cy, w, tilt) => { g.beginPath(); g.moveTo(cx - w, cy + tilt); g.lineTo(cx + w, cy - tilt); g.stroke(); };
  const bt = { angry: -6, determined: -5, shocked: 4, awe: 3, nervous: 5, cry: 6, thinking: 2, smirk: -2 }[ex] ?? 0, by = ex === 'shocked' ? -10 : 0;
  brow(-2, -46 + by, 9, -bt); brow(36, -48 + by, 12, bt);
  if (ex === 'nervous') ell(g, -40, -30, 6, 10, alpha('#8fd3ff', 0.85));          // sweat drop
}

// ---------- full body ----------
export function mascot(g, o = {}) {
  const C = o.colors || TIHON_COLORS, t = o.t || 0, f = o.facing || 1, s = o.s || 1, P = poseParams(o.pose || 'stand', t);
  const sq = o.squash || 0, breath = Math.sin(t * 2.6) * 0.015;
  g.save(); g.translate(o.x ?? E.W / 2, (o.y ?? E.H * 0.7) - (P.hop || 0) * s); if (o.rot) g.rotate(o.rot); g.scale(f * s * (1 + sq * 0.6), s * (1 - sq + breath));
  // contact shadow (not inked)
  ell(g, 0, 2, 70, 10, 'rgba(0,0,0,0.22)');
  const cr = P.crouch * 30, lean = P.lean;
  const hip = [0, -64 + cr], chest = [12 + lean * 60, -128 + cr], hd = [24 + lean * 90, -196 + cr * 1.1];
  const swing = Math.sin(t * 3) * 0.12 + lean * 0.6;
  inked(g, g2 => {
    const C2 = C;
    // tail (behind), thick and tapered, follow-through on movement
    g2.fillStyle = C2.body; g2.beginPath(); g2.moveTo(hip[0] - 20, hip[1] - 34); g2.quadraticCurveTo(-90, hip[1] - 30 + swing * 40, -150, hip[1] + 22 + swing * 30);
    g2.quadraticCurveTo(-80, hip[1] + 10, hip[0] - 8, hip[1] + 18); g2.closePath(); g2.fill();
    g2.fillStyle = C2.spike; for (let i = 0; i < 3; i++) { const x = -48 - i * 30, y = hip[1] - 30 + i * 12 + swing * 12 * i; g2.beginPath(); g2.moveTo(x - 10, y + 6); g2.lineTo(x - 2, y - 14); g2.lineTo(x + 8, y + 4); g2.closePath(); g2.fill(); }
    // far leg + far arm (darker)
    const leg = (a, x0, col) => { const kx = x0 + Math.sin(a) * 34, ky = hip[1] + 34 - Math.abs(Math.sin(a)) * 6, fx = x0 + Math.sin(a) * 52, fy = -10 + (a < 0 ? -Math.abs(Math.sin(a)) * 18 : 0);
      cap(g2, [x0, hip[1]], [kx, ky], 32, col); cap(g2, [kx, ky], [fx, fy], 28, col); ell(g2, fx + 12, fy + 4, 24, 13, col); };
    leg(P.legB, -10, C2.dark);
    const arm = (a, sx, sy, col) => { const ex2 = sx + Math.cos(a) * 26, ey2 = sy + Math.sin(a) * 26, hx = ex2 + Math.cos(a + 0.4) * 20, hy = ey2 + Math.sin(a + 0.4) * 20; cap(g2, [sx, sy], [ex2, ey2], 16, col); cap(g2, [ex2, ey2], [hx, hy], 14, col); circle(g2, hx, hy, 10, col); };
    arm(P.armB, chest[0] + 4, chest[1] + 8, C2.dark);
    // torso: bean + belly
    g2.save(); g2.translate((hip[0] + chest[0]) / 2, (hip[1] + chest[1]) / 2 - 4); g2.rotate(lean * 0.6);
    ell(g2, 0, 0, 58, 74, C2.body); ell(g2, 18, 8, 34, 54, C2.belly);
    g2.strokeStyle = alpha(C2.dark, 0.35); g2.lineWidth = 3; for (let i = 0; i < 4; i++) { g2.beginPath(); g2.moveTo(4, -22 + i * 18); g2.quadraticCurveTo(18, -18 + i * 18, 32, -22 + i * 18); g2.stroke(); }
    g2.restore();
    leg(P.legA, 14, C2.body);
    // head
    g2.save(); g2.translate(hd[0], hd[1]); g2.rotate(lean * 0.4 + (o.tilt || 0)); head(g2, { ...o, colors: C2, t }); g2.restore();
    // scarf: band + a trailing end that flutters
    const sx = chest[0] - 4, sy = chest[1] - 26, fl = Math.sin(t * 7) * 6 + lean * 30;
    g2.fillStyle = C2.scarf; rr(g2, sx - 34, sy - 10, 70, 22, 11); g2.fill();
    g2.fillStyle = C2.scarfDark; g2.beginPath(); g2.moveTo(sx - 22, sy + 4); g2.quadraticCurveTo(sx - 52, sy + 18 + fl * 0.3, sx - 66 - fl, sy + 30 + fl * 0.5); g2.lineTo(sx - 50 - fl, sy + 40 + fl * 0.4); g2.quadraticCurveTo(sx - 36, sy + 22, sx - 10, sy + 10); g2.closePath(); g2.fill();
    // near arm (the famous tiny arm)
    arm(P.chin ? -2.4 : P.armF, chest[0] + 26, chest[1] + 10, C2.body);
  }, { w: o.inkW ?? 5, light: o.light });
  g.restore();
}

// ---------- close-up ----------
export function mascotFace(g, x, y, r, o = {}) {
  const C = o.colors || TIHON_COLORS, k = r / 60, t = o.t || 0, f = o.facing || 1;
  inked(g, g2 => {
    g2.save(); g2.translate(x, y); g2.scale(f * k, k);
    // shoulders + scarf below the head
    ell(g2, -10, 120, 120, 70, C.body); ell(g2, 8, 128, 70, 46, C.belly);
    g2.fillStyle = C.scarf; rr(g2, -84, 56, 168, 34, 17); g2.fill();
    g2.fillStyle = C.scarfDark; g2.beginPath(); g2.moveTo(-60, 76); g2.quadraticCurveTo(-96, 100 + Math.sin(t * 6) * 6, -112, 140); g2.lineTo(-88, 146); g2.quadraticCurveTo(-74, 108, -40, 86); g2.closePath(); g2.fill();
    g2.rotate(o.tilt || 0); head(g2, { ...o, colors: C, t });
    g2.restore();
  }, { w: Math.max(4, k * 3), light: o.light });
}
