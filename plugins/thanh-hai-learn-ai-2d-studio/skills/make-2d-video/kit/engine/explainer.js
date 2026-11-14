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
