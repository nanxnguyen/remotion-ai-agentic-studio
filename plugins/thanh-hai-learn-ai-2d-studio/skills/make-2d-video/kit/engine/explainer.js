// engine/explainer.js — on-screen kit for mascot-host explainer videos ("What it's like to…", "Every way you can…",
// countdowns of the deadliest X). See skills/mascot-explainer and references/mascot-explainer-format.md.
//   roundTitle(g, t, {n, title, sub})        "#3  BỌ HUNG GOLIATH" slam-in chapter card
//   dangerCard(g, t, {name, stats, x, y})    fighter / creature card with animated stat bars -> bar widths
//   tally(g, {label, count, since})          running-gag counter (pops when `since` < 0.4 s) -> current scale
//   sizeCompare(g, t, {items, maxH})         height comparison with a dimension line -> pixel heights
//   ouch(g, t, x, y, {text})                 comic impact burst ("BỐP!"), gone after 0.6 s
//   sign(g, x, y, text)                      hand-held placard for gags ("ĐỪNG THỬ Ở NHÀ")
//   bug(g, kind, o)                          beetle, spider, crab, flytrap silhouettes in the house style
import { E, V, S, clamp, lerp, ease, prog, circle, seg, rr, alpha, shade, glow, text, FONTS } from './core.js';

const ui = () => S().ui;
const STROKE = { stroke: 10, strokeColor: 'rgba(10,6,14,.55)' };

export function roundTitle(g, t, o = {}) {
  const { n = 1, title = '', sub = null, y = V(E.H * 0.42, E.H * 0.4), color = ui().gold } = o;
  const k = ease.outBack(prog(t, 0, 0.35)), k2 = ease.out(prog(t, 0.12, 0.5)), out = 1 - ease.inOut(prog(t, (o.dur ?? 9) - 0.3, o.dur ?? 9));
  g.save(); g.globalAlpha *= out;
  g.fillStyle = alpha('#0a0710', 0.55 * k2); g.fillRect(-E.W, y - V(120, 150), E.W * 3, V(240, 300));
  g.save(); g.translate(E.W / 2, y - V(40, 60)); g.scale(k, k); text(g, `#${n}`, 0, 0, { size: V(120, 140), color, glow: 26, glowColor: alpha(color, 0.7), ...STROKE }); g.restore();
  text(g, title, lerp(-E.W * 0.3, E.W / 2, k2), y + V(60, 70), { size: V(64, 72), color: ui().cream, font: FONTS.ui, weight: 900, ...STROKE });
  if (sub) text(g, sub, E.W / 2, y + V(120, 140), { size: V(34, 40), color: alpha(ui().cream, 0.8 * k2), font: FONTS.ui, weight: 800 });
  g.restore();
}

// stats: [{label, v: 0..1, text}] ; returns the current bar widths (for tests / syncing SFX)
export function dangerCard(g, t, o = {}) {
  const { name = '', stats = [], w = V(700, 900), x = V(E.W - 760, (E.W - 900) / 2), y = V(170, E.H * 0.1), accent = ui().accent } = o;
  const rowH = V(92, 100), h = V(120, 136) + stats.length * rowH, inK = ease.outBack(prog(t, 0, 0.35));
  const widths = [];
  g.save(); g.translate(x + w / 2, y + h / 2); g.scale(inK, inK); g.translate(-(x + w / 2), -(y + h / 2));
  rr(g, x, y, w, h, 22); g.fillStyle = ui().card; g.fill(); g.strokeStyle = ui().cardLine; g.lineWidth = 2; g.stroke();
  text(g, name, x + 34, y + V(66, 74), { size: V(54, 60), color: ui().cream, font: FONTS.ui, weight: 900, align: 'left' });
  stats.forEach((s, i) => {
    const ry = y + V(124, 140) + i * rowH, bw = w - 68, k = ease.out(prog(t, 0.35 + i * 0.18, 1.0 + i * 0.18)), fw = bw * clamp(s.v) * k;
    widths.push(fw);
    text(g, s.label, x + 34, ry + 12, { size: V(34, 38), color: ui().text, font: FONTS.ui, weight: 800, align: 'left' });
    if (s.text) text(g, s.text, x + w - 34, ry + 12, { size: V(34, 38), color: ui().cream, font: FONTS.ui, weight: 900, align: 'right' });
    rr(g, x + 34, ry + 38, bw, 20, 10); g.fillStyle = 'rgba(255,255,255,.08)'; g.fill();
    if (fw > 1) { const c = s.v > 0.7 ? accent : s.v > 0.4 ? ui().gold : ui().blueprint; rr(g, x + 34, ry + 38, fw, 20, 10); g.fillStyle = c; g.fill(); if (s.v > 0.7) glow(g, x + 34 + fw, ry + 48, 28, c, 0.6); }
  });
  g.restore();
  return widths;
}

export function tally(g, o = {}) {
  const { label = '', count = 0, since = 9, x = V(E.W - 40, E.W - 40), y = V(70, 230), color = ui().gold } = o;
  const sc = since < 0.4 ? 1 + 0.35 * (1 - ease.out(since / 0.4)) : 1;
  g.save(); g.translate(x, y); g.scale(sc, sc);
  const str = `${label}: ${count}`, wdt = Math.max(260, str.length * V(23, 24));
  rr(g, -wdt, -36, wdt, 72, 36); g.fillStyle = 'rgba(10,7,16,.7)'; g.fill();
  text(g, str, -wdt / 2, 2, { size: V(40, 42), color, font: FONTS.ui, weight: 900 });
  g.restore();
  return sc;
}

// items: [{label, h, color, draw?(g, x, baseY, pixelH)}] ; returns pixel heights
export function sizeCompare(g, t, o = {}) {
  const { items = [], maxH = V(520, 760), x0 = V(E.W * 0.25, E.W * 0.2), x1 = V(E.W * 0.75, E.W * 0.8), base = V(E.H * 0.82, E.H * 0.7) } = o;
  const top = Math.max(...items.map(i => i.h)), hs = items.map(i => (i.h / top) * maxH);
  items.forEach((it, i) => {
    const x = items.length > 1 ? lerp(x0, x1, i / (items.length - 1)) : (x0 + x1) / 2, k = ease.out(prog(t, 0.1 + i * 0.25, 0.7 + i * 0.25)), ph = hs[i] * k;
    if (it.draw) it.draw(g, x, base, ph); else { rr(g, x - 50, base - ph, 100, Math.max(ph, 1), 10); g.fillStyle = it.color || ui().blueprint; g.fill(); }
    seg(g, [[x + 80, base], [x + 80, base - ph]], 3, alpha(ui().gold, 0.8)); seg(g, [[x + 70, base - ph], [x + 90, base - ph]], 3, ui().gold);
    text(g, it.label, x, base + V(50, 60), { size: V(34, 40), color: ui().cream, font: FONTS.ui, weight: 900 });
    if (it.text) text(g, it.text, x + 100, base - ph - 20, { size: V(28, 32), color: ui().gold, font: FONTS.ui, weight: 900, align: 'left' });
  });
  return hs;
}

export function ouch(g, t, x, y, o = {}) {
  const { text: str = 'BỐP!', color = '#ffd447', r = V(130, 150) } = o;
  if (t < 0 || t > 0.6) return;
  const k = ease.outBack(prog(t, 0, 0.15)), fade = 1 - prog(t, 0.4, 0.6);
  g.save(); g.globalAlpha *= fade; g.translate(x, y); g.rotate(-0.12); g.scale(k, k);
  g.fillStyle = color; g.beginPath(); for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, rr2 = i % 2 ? r * 0.62 : r; g.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2 * 0.75); } g.closePath(); g.fill();
  g.strokeStyle = '#1a0f12'; g.lineWidth = 6; g.stroke();
  text(g, str, 0, 4, { size: r * 0.5, color: '#1a0f12', weight: 700 });
  g.restore();
}

export function sign(g, x, y, str, o = {}) {
  const { w = Math.max(260, str.length * 22), h = 110, tilt = -0.05, wood = '#b7804a' } = o;
  g.save(); g.translate(x, y); g.rotate(tilt);
  seg(g, [[0, 0], [0, -h - 120]], 14, shade(wood, -0.35));
  rr(g, -w / 2, -h - 220, w, h, 10); g.fillStyle = wood; g.fill(); g.strokeStyle = shade(wood, -0.4); g.lineWidth = 6; g.stroke();
  text(g, str, 0, -h / 2 - 220 + 4, { size: 40, color: '#2a160c', font: FONTS.ui, weight: 900 });
  g.restore();
}

// ---------- bugs & plants (y = ground, facing +x; ≈ 200 units long at s = 1) ----------
export const BUGS = ['beetle', 'spider', 'crab', 'flytrap'];
const ell = (g, x, y, rx, ry, c, rot = 0) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); };
const SH = {
  beetle(g, c, t, acc) {
    const w = Math.sin(t * 9) * 8;
    for (const k of [-1, 0, 1]) { seg(g, [[k * 34, -30], [k * 46 + w * (k === 0 ? 1 : -1), -8], [k * 58, 0]], 7, c); }
    ell(g, -6, -48, 70, 40, c); ell(g, 66, -46, 26, 22, c);
    seg(g, [[86, -54], [120, -96], [104, -110]], 9, c); seg(g, [[84, -40], [118, -36]], 6, c);
    if (acc) { seg(g, [[-6, -86], [-6, -10]], 3, alpha(acc, 0.5)); ell(g, -30, -64, 16, 8, alpha(acc, 0.25), -0.4); circle(g, 78, -52, 4, acc); }
  },
  spider(g, c, t, acc) {
    for (let i = 0; i < 4; i++) { const ph = Math.sin(t * 10 + i * 1.3) * 6, a = -0.9 + i * 0.6;
      for (const s of [-1, 1]) { const kx = Math.cos(a) * 70 * s, ky = -70 - Math.abs(Math.sin(a)) * 30; seg(g, [[s * 10, -56], [kx, ky + ph], [kx * 1.5, 0]], 6, c); } }
    ell(g, -36, -58, 46, 38, c); ell(g, 22, -56, 26, 22, c);
    if (acc) { for (const dx of [26, 34, 40]) circle(g, dx, -62, 3.5, '#ff4a3a'); g.fillStyle = '#ff4a3a'; g.beginPath(); g.moveTo(-40, -76); g.lineTo(-30, -58); g.lineTo(-40, -40); g.lineTo(-50, -58); g.closePath(); g.fill(); }
  },
  crab(g, c, t, acc) {
    const sn = Math.max(0, Math.sin(t * 6)) * 0.4;
    for (let i = 0; i < 3; i++) for (const s of [-1, 1]) seg(g, [[s * 30, -34], [s * (70 + i * 10), -46 + i * 8], [s * (86 + i * 12), 0]], 7, c);
    ell(g, 0, -44, 66, 34, c);
    for (const s of [-1, 1]) { seg(g, [[s * 46, -56], [s * 90, -96]], 10, c); ell(g, s * 104, -110, 26, 18, c, s * 0.5); g.save(); g.translate(s * 118, -112); g.rotate(s * (0.6 + sn)); g.fillStyle = c; g.beginPath(); g.ellipse(10 * s, 0, 18, 9, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
    for (const s of [-1, 1]) { seg(g, [[s * 14, -74], [s * 18, -96]], 4, c); circle(g, s * 18, -98, 6, acc || c); }
  },
  flytrap(g, c, t, acc) {
    const open = 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.2));
    seg(g, [[0, 0], [10, -90], [0, -150]], 10, c);
    for (const s of [-1, 1]) { g.save(); g.translate(0, -160); g.rotate(-s * open); g.fillStyle = c; g.beginPath(); g.ellipse(0, -s * 34, 64, 34, 0, s < 0 ? 0 : Math.PI, s < 0 ? Math.PI : Math.PI * 2); g.fill();
      for (let i = -4; i <= 4; i++) seg(g, [[i * 14, -s * 2], [i * 14 + 3, -s * -16]], 4, c);
      if (acc) { g.fillStyle = alpha('#d6405a', 0.85); g.beginPath(); g.ellipse(0, -s * 20, 50, 16, 0, 0, Math.PI * 2); g.fill(); } g.restore(); }
    ell(g, -40, -10, 40, 12, c, -0.3); ell(g, 44, -12, 40, 12, c, 0.3);
  },
};
// bug(g, kind, { x, y, s, facing, t, rim:{color, dir, w}, accent })
export function bug(g, kind, o = {}) {
  const fn = SH[kind]; if (!fn) throw new Error(`bug: unknown kind "${kind}" (use ${BUGS.join(', ')})`);
  const { x = E.W / 2, y = E.H * 0.8, s = 1, facing = 1, t = 0 } = o, ink = S().ink, acc = o.accent ?? S().feature;
  const pass = (dx, dy, c, a) => { g.save(); g.translate(x + dx, y + dy); g.scale(facing * s, s); fn(g, c, t, a); g.restore(); };
  g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 2, 80 * s, 8 * s, 0, 0, Math.PI * 2); g.fill();
  if (o.rim) { const w = (o.rim.w || S().rimWidth || 4) * 1.2; pass(o.rim.dir[0] * w, o.rim.dir[1] * w, o.rim.color, null); }
  pass(0, 0, ink, acc);
}

// ---------- animals, fossils and Shorts UI (v0.6) ----------
//   critter(g, kind, {x, y, s, facing, t, peck, color})   chicken ostrich eagle croc whale trex: coloured, friendly, ≈ 200 units at s = 1
//   femur(g, x, y, len, {rot, color, blur})                    a fossil leg bone (blur > 0 = hidden behind frosted glass)
//   answerCards(g, t, {items:[{key, label, draw?}], reveal, pick})  quiz cards that pop in one by one; reveal flips card `pick`
//   subscribeButton(g, t, x, y, {label, clicked})              a red subscribe button that bounces in, then turns grey with a cursor click
export const CRITTERS = ['chicken', 'ostrich', 'eagle', 'croc', 'whale', 'trex'];
const CR = {
  chicken(g, t, o) {
    const body = o.color || '#f6f1e6', peck = o.peck || 0, bob = Math.sin(t * 7) * 2;
    seg(g, [[-10, -40], [-14, 0]], 6, '#e8a33a'); seg(g, [[12, -40], [16, 0]], 6, '#e8a33a'); seg(g, [[-24, 0], [-4, 0]], 5, '#e8a33a'); seg(g, [[6, 0], [26, 0]], 5, '#e8a33a');
    ell(g, 0, -78 + bob, 62, 46, body);
    for (const [dx, dy, r] of [[-56, -110], [-70, -92], [-60, -74]]) ell(g, dx, dy + bob, 22, 12, shade(body, -0.12), -0.7);   // tail feathers
    ell(g, -10, -78 + bob, 30, 20, shade(body, -0.08), 0.2);                                                                      // wing
    g.save(); g.translate(40, -118 + bob); g.rotate(peck * 0.9);
    seg(g, [[-6, 30], [0, 0]], 30, body); circle(g, 0, -6, 26, body);
    for (const [dx, dy, r] of [[-8, -34, 9], [2, -38, 10], [12, -34, 9]]) circle(g, dx, dy, r, '#e2412f');                    // comb
    ell(g, 16, 14, 7, 11, '#e2412f');                                                                                         // wattle
    g.fillStyle = '#f2a72e'; g.beginPath(); g.moveTo(22, -10); g.lineTo(44, -2); g.lineTo(22, 4); g.closePath(); g.fill();      // beak
    circle(g, 10, -10, 5, '#1a1622'); g.restore();
  },
  ostrich(g, t, o) {
    const c = o.color || '#3a3036';
    seg(g, [[-12, -110], [-16, -50], [-12, 0]], 9, '#d9a07a'); seg(g, [[14, -110], [18, -50], [22, 0]], 9, '#d9a07a');
    ell(g, 0, -140, 70, 46, c); ell(g, -60, -150, 24, 18, '#f2ece2');
    seg(g, [[46, -150], [60, -230], [56, -290]], 12, '#d9a07a'); circle(g, 60, -300, 18, '#d9a07a'); circle(g, 66, -304, 4, '#1a1622');
    g.fillStyle = '#e8c49a'; g.beginPath(); g.moveTo(74, -304); g.lineTo(92, -298); g.lineTo(74, -292); g.closePath(); g.fill();
  },
  eagle(g, t, o) {
    const c = o.color || '#5a3a26', flap = Math.sin(t * 5) * 0.4;
    for (const s of [-1, 1]) { g.save(); g.translate(0, -90); g.rotate(s * (0.5 + flap) - Math.PI / 2 * (s > 0 ? 0 : 0)); ell(g, s * 70, -10, 80, 22, shade(c, -0.1), s * -0.3); g.restore(); }
    ell(g, 0, -80, 40, 52, c); circle(g, 8, -142, 26, '#f6f1e6'); circle(g, 16, -146, 5, '#1a1622');
    g.fillStyle = '#f2b02e'; g.beginPath(); g.moveTo(30, -150); g.quadraticCurveTo(52, -146, 42, -128); g.lineTo(30, -136); g.closePath(); g.fill();
    seg(g, [[-8, -30], [-10, 0]], 6, '#f2b02e'); seg(g, [[10, -30], [12, 0]], 6, '#f2b02e');
  },
  croc(g, t, o) {
    const c = o.color || '#4f7a3a', jaw = Math.max(0, Math.sin(t * 3)) * 0.25;
    seg(g, [[-130, -30], [-200, -16]], 26, c); ell(g, -30, -40, 110, 34, c);
    for (let i = 0; i < 6; i++) { g.fillStyle = shade(c, -0.25); g.beginPath(); g.moveTo(-110 + i * 30, -70); g.lineTo(-98 + i * 30, -86); g.lineTo(-86 + i * 30, -70); g.fill(); }
    rr(g, 60, -64, 120, 30, 14); g.fillStyle = c; g.fill();
    g.save(); g.translate(64, -36); g.rotate(jaw); rr(g, 0, -4, 112, 20, 10); g.fillStyle = shade(c, 0.15); g.fill(); g.restore();
    for (let i = 0; i < 6; i++) { g.fillStyle = '#fbf6ea'; g.beginPath(); g.moveTo(80 + i * 16, -36); g.lineTo(88 + i * 16, -24); g.lineTo(96 + i * 16, -36); g.fill(); }
    circle(g, 70, -70, 12, c); circle(g, 72, -72, 5, '#f2d23a');
    for (const dx of [-80, -20, 30]) seg(g, [[dx, -20], [dx + 6, 0]], 14, shade(c, -0.15));
  },
  whale(g, t, o) {
    const c = o.color || '#3d6fa8';
    ell(g, 0, -80, 150, 70, c); ell(g, 10, -50, 120, 34, shade(c, 0.35));
    g.fillStyle = c; g.beginPath(); g.moveTo(-140, -90); g.lineTo(-230, -150 + Math.sin(t * 3) * 10); g.lineTo(-200, -80); g.lineTo(-230, -20 + Math.sin(t * 3) * 10); g.closePath(); g.fill();
    circle(g, 90, -100, 8, '#1a1622'); seg(g, [[80, -150], [70, -200], [60, -215]], 5, alpha('#cfe8ff', 0.8)); seg(g, [[80, -150], [92, -205], [104, -215]], 5, alpha('#cfe8ff', 0.8));
  },
  trex(g, t, o) {   // a big adult T-rex for size comparisons (≈ 4x the chicken)
    const c = o.color || '#4e8a3e', d = shade(c, -0.2), step = Math.sin(t * 2) * 6;
    seg(g, [[-30, -150], [-40, -70], [-30 + step, 0]], 34, d); seg(g, [[-30 + step, 0], [10 + step, 0]], 20, d);
    g.fillStyle = c; g.beginPath(); g.moveTo(-60, -220); g.quadraticCurveTo(-200, -230, -330, -170); g.quadraticCurveTo(-200, -170, -60, -140); g.closePath(); g.fill();   // tail
    ell(g, 0, -190, 110, 70, c, -0.25);
    seg(g, [[50, -150], [44, -80], [56 - step, 0]], 36, c); seg(g, [[56 - step, 0], [96 - step, 0]], 22, c);
    seg(g, [[80, -230], [130, -300]], 70, c);
    rr(g, 90, -380, 170, 90, 40); g.fillStyle = c; g.fill(); rr(g, 110, -310, 140, 34, 16); g.fillStyle = shade(c, 0.2); g.fill();
    for (let i = 0; i < 6; i++) { g.fillStyle = '#fbf6ea'; g.beginPath(); g.moveTo(130 + i * 20, -312); g.lineTo(138 + i * 20, -296); g.lineTo(146 + i * 20, -312); g.fill(); }
    circle(g, 150, -350, 10, '#1a1622'); seg(g, [[100, -170], [124, -156], [130, -146]], 10, d);   // the famous tiny arm
  },
};
export function critter(g, kind, o = {}) {
  const fn = CR[kind]; if (!fn) throw new Error(`critter: unknown kind "${kind}" (use ${CRITTERS.join(', ')})`);
  const { x = E.W / 2, y = E.H * 0.8, s = 1, facing = 1, t = 0 } = o;
  g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 2, 90 * s, 9 * s, 0, 0, Math.PI * 2); g.fill();
  g.save(); g.translate(x, y); g.scale(facing * s, s); fn(g, t, o); g.restore();
}
export function femur(g, x, y, len, o = {}) {
  const { rot = 0, color = '#e9dcc0', blur = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot); if (blur) g.filter = `blur(${blur}px)`;
  const w = len * 0.13, ink = shade(color, -0.35);
  rr(g, -len / 2, -w / 2, len, w, w / 2); g.fillStyle = color; g.fill();
  for (const s of [-1, 1]) { circle(g, s * len / 2, -w * 0.55, w * 0.85, color); circle(g, s * len / 2, w * 0.55, w * 0.75, color); }
  g.strokeStyle = alpha(ink, 0.6); g.lineWidth = Math.max(2, len * 0.008); g.beginPath(); g.moveTo(-len * 0.3, -w * 0.15); g.lineTo(len * 0.25, -w * 0.1); g.stroke();
  for (const [dx, dy] of [[-0.1, 0.2], [0.15, -0.25], [0.3, 0.1]]) circle(g, dx * len, dy * w, w * 0.08, alpha(ink, 0.5));
  g.restore();
}
export function answerCards(g, t, o = {}) {
  const { items = [], y = V(E.H * 0.62, E.H * 0.58), w = V(300, 300), h = V(300, 330), gap = V(40, 26), reveal = -1, pick = items.length - 1, step = 0.25 } = o;
  const total = items.length * w + (items.length - 1) * gap, x0 = E.W / 2 - total / 2;
  items.forEach((it, i) => {
    const k = ease.outBack(prog(t, i * step, i * step + 0.3)); if (k < 1e-3) return;
    const cx = x0 + i * (w + gap) + w / 2, flip = i === pick && reveal >= 0 ? prog(reveal, 0, 0.35) : 0, sx = Math.abs(Math.cos(flip * Math.PI)), back = flip > 0.5;
    const dim = reveal >= 0 && i !== pick ? 0.45 : 1;
    g.save(); g.globalAlpha *= dim; g.translate(cx, y); g.scale(k * Math.max(sx, 0.02), k);
    rr(g, -w / 2, -h / 2, w, h, 26); g.fillStyle = back ? ui().gold : ui().card; g.fill(); g.strokeStyle = back ? '#fff6d8' : ui().cardLine; g.lineWidth = 4; g.stroke();
    const shown = back ? (it.back || it) : it;
    text(g, shown.key || '', 0, -h / 2 + 52, { size: 54, color: back ? '#2a160c' : ui().gold, font: FONTS.ui, weight: 900 });
    if (shown.draw) { g.save(); g.translate(0, h * 0.18); shown.draw(g); g.restore(); }
    text(g, shown.label || '', 0, h / 2 - 34, { size: V(40, 42), color: back ? '#2a160c' : ui().cream, font: FONTS.ui, weight: 900 });
    g.restore();
  });
}
export function subscribeButton(g, t, x, y, o = {}) {
  const { label = 'ĐĂNG KÝ', clicked = 9, scale = 1 } = o;
  const k = ease.outBack(prog(t, 0, 0.35)), done = t >= clicked, press = t > clicked - 0.12 && t < clicked + 0.12 ? 0.9 : 1, w = 380, h = 110;
  if (k < 1e-3) return;
  g.save(); g.translate(x, y); g.scale(k * press * scale, k * press * scale);
  rr(g, -w / 2, -h / 2, w, h, h / 2); g.fillStyle = done ? '#55505c' : '#e5262b'; g.fill();
  if (!done) glow(g, 0, 0, w * 0.6, '#ff3b3b', 0.25 + 0.15 * Math.sin(t * 6));
  text(g, done ? 'ĐÃ ĐĂNG KÝ ✓' : label, 0, 4, { size: 46, color: '#ffffff', font: FONTS.ui, weight: 900 });
  const cp = ease.inOut(prog(t, clicked - 0.7, clicked - 0.1)), cx = lerp(w * 0.8, w * 0.12, cp), cy = lerp(h * 1.4, h * 0.15, cp);
  if (t > clicked - 0.7 && t < clicked + 1) { g.fillStyle = '#ffffff'; g.strokeStyle = '#1a1622'; g.lineWidth = 4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy + 56); g.lineTo(cx + 15, cy + 42); g.lineTo(cx + 28, cy + 66); g.lineTo(cx + 38, cy + 61); g.lineTo(cx + 26, cy + 38); g.lineTo(cx + 44, cy + 38); g.closePath(); g.fill(); g.stroke(); }
  g.restore();
}
