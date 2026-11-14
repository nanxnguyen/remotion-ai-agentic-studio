// engine/evolve.js — building blocks for "Evolution of X" videos (a life from baby to old age, species from a single
// cell to humans, an object through its eras). See skills/evolution-video and references/evolution-format.md.
//   stagesFromShots(E.shots)       stages = shots tagged with params.stage (tools/evolution_plan.py writes them)
//   stageAt(t, stages)             -> { i, stage, local, k, prev, next }
//   counterAt(t, stages)           year / age / "years ago" value, rolling between stages
//   fmtCounter(v, kind, lang)      '2006' · '12 tuổi' / 'Age 12' · '375 triệu năm trước' / '375 million years ago'
//   ageLook(age), agePose(p, age)  figure scale for a life stage, senior stoop
//   creature(g, kind, o)           species silhouettes in the house style: cell fish amphibian reptile mammal ape hominid human
//   evoOverlay(g, t, info, o)      the format's HUD: rolling counter + stage title + timeline bar + morph burst
import { E, V, S, clamp, lerp, ease, prog, circle, ring, seg, alpha, glow, text, FONTS } from './core.js';
import { drawFigure, POSES } from './rig2d.js';

// ---------- stages ----------
export function stagesFromShots(shots = E.shots) {
  const out = [];
  for (const s of shots) {
    if (!s.params || s.params.stage == null) continue;
    const last = out[out.length - 1];
    if (last && last.index === s.params.stage) { last.end = s.end; continue; }   // a long stage split into parts
    out.push({ id: s.id, start: s.start, end: s.end, value: s.params.value, title: s.params.title, label: s.params.label, index: s.params.stage });
  }
  return out;
}
export function stageAt(t, stages) {
  let i = 0; while (i + 1 < stages.length && t >= stages[i + 1].start) i++;
  const st = stages[i], local = Math.max(0, t - st.start), dur = st.end - st.start;
  return { i, stage: st, local, k: clamp(local / dur), prev: stages[i - 1] || null, next: stages[i + 1] || null };
}
// The value rolls (ease.out) from the previous stage's value over `roll` s, then holds. Deep-time values roll on a log scale.
export function counterAt(t, stages, roll = 0.6) {
  const { i, stage, local, prev } = stageAt(t, stages);
  if (!prev || local >= roll || prev.value == null) return stage.value;
  const k = ease.out(local / roll), a = prev.value, b = stage.value;
  if (a > 0 && b > 0 && Math.max(a / b, b / a) > 10) return Math.exp(lerp(Math.log(a), Math.log(b), k));
  return lerp(a, b, k);
}
const dec1 = (x, comma) => { const r = Math.round(x * 10) / 10, s = Number.isInteger(r) ? String(r) : r.toFixed(1); return comma ? s.replace('.', ',') : s; };
export function fmtCounter(v, kind = 'year', lang = 'en') {
  const vi = /^vi/.test(lang || '');
  if (kind === 'age') { if (v < 1) return vi ? 'Sơ sinh' : 'Newborn'; const n = Math.round(v); return vi ? `${n} tuổi` : `Age ${n}`; }
  if (kind === 'ago') {
    if (v <= 0) return vi ? 'Hôm nay' : 'Today';
    if (v >= 1e9) return vi ? `${dec1(v / 1e9, true)} tỷ năm trước` : `${dec1(v / 1e9)} billion years ago`;
    if (v >= 1e6) return vi ? `${Math.round(v / 1e6)} triệu năm trước` : `${Math.round(v / 1e6)} million years ago`;
    if (v >= 1e3) return vi ? `${Math.round(v / 1e3)} nghìn năm trước` : `${Math.round(v / 1e3)} thousand years ago`;
    return vi ? `${Math.round(v)} năm trước` : `${Math.round(v)} years ago`;
  }
  return String(Math.round(v));
}

// ---------- life stages ----------
// Scale multiplier for drawFigure({ s }) by age (do not also set outfit.kid), plus how much a senior stoops (0..1).
export function ageLook(age) {
  const s = age < 2 ? 0.42 : age < 6 ? 0.55 : age < 12 ? 0.7 : age < 18 ? 0.88 : age < 60 ? 1 : 0.97;
  return { s, kid: false, stoop: age >= 60 ? clamp((age - 60) / 25) * 0.9 : 0 };
}
export function agePose(p, age) {
  const k = ageLook(age).stoop; if (!k) return p;
  const q = { ...p }; q.head = [p.head[0] + 12 * k, p.head[1] + 16 * k]; q.sh = [p.sh[0] + 8 * k, p.sh[1] + 9 * k];
  q.eF = [p.eF[0] + 5 * k, p.eF[1] + 6 * k]; q.eB = [p.eB[0] + 5 * k, p.eB[1] + 6 * k]; q.hF = [p.hF[0] + 4 * k, p.hF[1] + 4 * k]; q.hB = [p.hB[0] + 4 * k, p.hB[1] + 4 * k];
  return q;
}
export const EVO_POSES = {
  knuckle: { head: [84, -150], sh: [54, -134], hip: [0, -96], eF: [70, -78], hF: [76, -6], eB: [58, -76], hB: [60, -6], kF: [18, -50], fF: [10, 0], kB: [-4, -48], fB: [-16, 0] },
  stoop: { head: [26, -200], sh: [16, -170], hip: [0, -100], eF: [22, -132], hF: [30, -96], eB: [8, -134], hB: [6, -98], kF: [8, -50], fF: [4, 0], kB: [-6, -50], fB: [-12, 0] },
};

// ---------- species silhouettes (feet / belly on y = 0, facing +x, ≈ human height 240 at s = 1) ----------
export const CREATURES = ['cell', 'fish', 'amphibian', 'reptile', 'mammal', 'ape', 'hominid', 'human'];
const ell = (g, x, y, rx, ry, c, rot = 0) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); };
const tri = (g, pts, c) => { g.fillStyle = c; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath(); g.fill(); };
const SHAPES = {
  cell(g, c, t, acc) {
    g.fillStyle = c; g.beginPath();
    for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2, r = 62 + 6 * Math.sin(a * 5 + t * 3) + 3 * Math.sin(a * 3 - t * 2); const x = Math.cos(a) * r, y = -80 + Math.sin(a) * r * 0.88; i ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.closePath(); g.fill();
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, w = Math.sin(t * 6 + i) * 0.25; seg(g, [[Math.cos(a) * 64, -80 + Math.sin(a) * 56], [Math.cos(a + w) * 80, -80 + Math.sin(a + w) * 70]], 3, c); }
    if (acc) { circle(g, 10, -86, 22, acc); circle(g, -26, -60, 7, alpha(acc, 0.7)); circle(g, 30, -56, 5, alpha(acc, 0.6)); }
  },
  fish(g, c, t, acc) {
    const w = Math.sin(t * 8) * 14, y0 = -70;
    ell(g, 0, y0, 88, 34, c); tri(g, [[-74, y0], [-130, y0 - 34 + w], [-126, y0 + 34 + w]], c);
    tri(g, [[-10, y0 - 30], [20, y0 - 58], [36, y0 - 28]], c); tri(g, [[10, y0 + 22], [-14, y0 + 46], [30, y0 + 26]], c);
    if (acc) circle(g, 58, y0 - 8, 6, acc);
  },
  amphibian(g, c, t, acc) {
    const st = Math.sin(t * 5) * 6; ell(g, 0, -30, 78, 24, c); ell(g, 74, -38, 26, 20, c); ell(g, 74, -60, 10, 10, c);
    tri(g, [[-70, -34], [-140, -20], [-70, -20]], c);
    for (const [x, d] of [[44, 1], [-40, -1]]) { seg(g, [[x, -22], [x + 18 + st * d, -8], [x + 26 + st * d, 0]], 9, c); seg(g, [[x - 8, -22], [x - 26 - st * d, -8], [x - 30 - st * d, 0]], 9, c); }
    if (acc) circle(g, 78, -62, 4, acc);
  },
  reptile(g, c, t, acc) {
    const st = Math.sin(t * 6) * 8; ell(g, 0, -30, 92, 22, c); tri(g, [[60, -44], [130, -30], [60, -18]], c); ell(g, 104, -34, 26, 14, c);
    g.strokeStyle = c; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-80, -30); g.quadraticCurveTo(-150, -26 + st * 0.5, -200, -12); g.stroke();
    for (const [x, d] of [[50, 1], [-46, -1]]) { seg(g, [[x, -22], [x + 14 + st * d, -2]], 10, c); seg(g, [[x - 10, -22], [x - 24 - st * d, -2]], 10, c); }
    if (acc) circle(g, 112, -40, 4, acc);
  },
  mammal(g, c, t, acc) {
    const st = Math.sin(t * 7) * 10; ell(g, 0, -62, 70, 36, c); circle(g, 66, -88, 26, c); tri(g, [[56, -108], [62, -132], [74, -110]], c); tri(g, [[74, -106], [86, -128], [88, -100]], c);
    ell(g, 88, -82, 14, 9, c);
    for (const [x, d] of [[40, 1], [-40, -1]]) { seg(g, [[x, -40], [x + st * d * 0.5, 0]], 11, c); seg(g, [[x - 14, -40], [x - 14 - st * d * 0.5, 0]], 11, c); }
    g.strokeStyle = c; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(-64, -70); g.quadraticCurveTo(-110, -90, -96, -120 + st * 0.3); g.stroke();
    if (acc) circle(g, 76, -94, 4, acc);
  },
};
const FIG = { ape: { pose: EVO_POSES.knuckle, s: 0.95, outfit: { top: 'none', head: 'curly' } }, hominid: { pose: EVO_POSES.stoop, s: 0.98, outfit: { top: 'none', head: 'curly' }, prop: 'pointer' }, human: { pose: POSES.stand, s: 1, outfit: { top: 'none', head: 'none' } } };

// creature(g, kind, { x, y, s, facing, t, rim:{color, dir, w}, accent, outfit, pose, expr })
export function creature(g, kind, o = {}) {
  const { x = E.W / 2, y = E.H * 0.8, s = 1, facing = 1, t = 0 } = o;
  if (FIG[kind]) { const f = FIG[kind]; drawFigure(g, { x, y, s: s * f.s, facing, pose: o.pose || f.pose, outfit: o.outfit || f.outfit, expr: o.expr || 'neutral', rim: o.rim || false, prop: o.prop ?? f.prop, blink: o.blink }); return; }
  const fn = SHAPES[kind]; if (!fn) throw new Error(`creature: unknown kind "${kind}" (use ${CREATURES.join(', ')})`);
  const ink = S().ink, rim = o.rim, acc = o.accent ?? S().feature;
  const pass = (dx, dy, c, a) => { g.save(); g.translate(x + dx, y + dy); g.scale(facing * s, s); fn(g, c, t, a); g.restore(); };
  if (kind !== 'cell' && kind !== 'fish') { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 2, 60 * s, 7 * s, 0, 0, Math.PI * 2); g.fill(); }
  if (rim) { const w = (rim.w || S().rimWidth || 4) * 1.2; pass(rim.dir[0] * w, rim.dir[1] * w, rim.color, null); }
  pass(0, 0, ink, acc);
}

// ---------- HUD ----------
function burst(g, x, y, lt, color) {
  const k = clamp(lt / 0.4); if (k >= 1) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  glow(g, x, y, 80 + 260 * k, '#ffffff', (1 - k) ** 2 * 0.9);
  ring(g, x, y, 60 + 300 * ease.out(k), 6 * (1 - k) + 1, alpha(color, 1 - k));
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2 + 0.3, r = 80 + 260 * ease.out(k); circle(g, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.8, 7 * (1 - k) + 1, alpha(color, 1 - k)); }
  g.restore();
}
export function timelineBar(g, gt, stages, o = {}) {
  if (!stages.length) return;
  const ui = S().ui, x0 = o.x0 ?? V(160, 110), x1 = o.x1 ?? E.W - V(160, 110), y = o.y ?? (E.vertical ? E.H * 0.9 : E.H - 70);
  const t0 = stages[0].start, t1 = stages[stages.length - 1].end, X = t => lerp(x0, x1, clamp((t - t0) / (t1 - t0)));
  seg(g, [[x0, y], [x1, y]], 4, alpha(ui.cream, 0.25)); seg(g, [[x0, y], [X(gt), y]], 5, ui.gold);
  stages.forEach(st => { const past = gt >= st.start; if (past) circle(g, X(st.start), y, 9, ui.gold); else ring(g, X(st.start), y, 8, 3, alpha(ui.cream, 0.5)); });
  glow(g, X(gt), y, 34, ui.gold, 0.8); circle(g, X(gt), y, 6, '#fff8e0');
}
// evoOverlay(g, t, info, { stages, counter: 'year'|'age'|'ago', center:[x,y], title: true, bar: true, counterY })
export function evoOverlay(g, t, info, o = {}) {
  const stages = o.stages || stagesFromShots(E.shots); if (!stages.length) return;
  const ui = S().ui, gt = info.globalT, onStage = info.shot?.params?.stage != null;
  if (onStage && !info.shot.params.part && o.burst !== false) burst(g, ...(o.center || [E.W / 2, E.H * V(0.6, 0.55)]), t, ui.gold);
  if (onStage) {
    const { stage, local } = stageAt(gt, stages), kind = o.counter || E.cfg.evolution?.counter || 'year', lang = E.cfg.lang || 'en';
    const cy = o.counterY ?? V(120, 250), pop = ease.outBack(prog(local, 0.02, 0.35));
    text(g, fmtCounter(counterAt(gt, stages), kind, lang), E.W / 2, cy, { size: V(92, 116), color: ui.gold, glow: 24, glowColor: alpha(ui.gold, 0.7), font: FONTS.title, weight: 700, stroke: V(10, 12), strokeColor: 'rgba(10,6,14,.55)' });
    if (o.title !== false && stage.title) { g.save(); g.translate(E.W / 2, cy + V(78, 104)); g.scale(pop, pop); text(g, stage.title, 0, 0, { size: V(48, 60), color: ui.cream, font: FONTS.ui, weight: 900, stroke: V(8, 10), strokeColor: 'rgba(10,6,14,.55)' }); g.restore(); }
  }
  if (o.bar !== false) timelineBar(g, gt, stages, o);
}
