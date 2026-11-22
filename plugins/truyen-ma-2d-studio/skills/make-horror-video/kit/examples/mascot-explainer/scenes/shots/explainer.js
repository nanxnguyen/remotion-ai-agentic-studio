// shots/explainer.js — "Cảm giác đánh nhau với bọ khổng lồ": a mascot-host explainer. The host is Cún Lú, an ORIGINAL
// dog mascot (yellow shirt, red bandana) who personally tests every fact and always loses. Structure from
// tools/explainer_plan.py: cold open → title → 3 rounds (round card, stat card, experience + gag) → recap → CTA.
// Running gag: the "Số lần bị kẹp" tally. Every spoken line is lip-synced from timeline/visemes.json.
import { E, V, registerShot, mood, layer, ease, prog, clamp, lerp, linGrad, glow, alpha, shade, text, FONTS, S, seg, circle, rr, visemeAt } from '/engine/core.js';
import { drawFigure, POSES, breathe, bigFace } from '/engine/rig2d.js';
import { act, spring, impact, exprAt, saccade, boilPose } from '/engine/motion.js';
import { roundTitle, dangerCard, tally, ouch, sign, bug } from '/engine/explainer.js';
import { titleCard } from '/engine/ui2d.js';
import * as FX from '/engine/fx2d.js';

const DOG = { top: 'tshirt', color: '#f2c21a', species: 'dog', fur: '#c98a4b' };   // brown dog, yellow shirt: the channel's signature
const GY = () => E.H * V(0.82, 0.7), CX = () => E.W / 2;
const blink = (t, p = 3.1) => (t % p) > p - 0.12;
const BUGK = ['beetle', 'spider', 'crab'];
// running gag: global times at which the mascot gets pinched / bitten
const HITS = [1.0, 22.9, 31.4, 35.6];
const hitsAt = gt => HITS.filter(h => gt >= h).length, sinceHit = gt => { const p = HITS.filter(h => gt >= h); return p.length ? gt - p[p.length - 1] : 9; };

// ---------- places ----------
function jungle(g, t, cam) {
  const M = mood('day'), gy = GY();
  layer(g, cam, 0.15, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#0f3a2a', '#2f7a4a', '#9fd27a']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.godRays(g, E.W * 0.3, -60, { color: '#eaffc0', a: 0.07, t, count: 8 }); });
  layer(g, cam, 0.45, g => { for (let i = 0; i < 9; i++) FX.tree(g, -200 + i * 260, gy - 10, 1.5 + (i % 3) * 0.4, '#123a26'); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#2c5a2e', '#0f2414']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, CX(), gy + 14, 460, 60, '#eaffc0', 0.18); });
  return { ...M, rim: '#eaffc0' };
}
function night(g, t, cam) {
  const M = mood('night'), gy = GY();
  layer(g, cam, 0.1, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.stars(g, t, { count: 120 }); FX.moon(g, E.W * 0.8, E.H * 0.2, 50); });
  layer(g, cam, 0.5, g => { g.fillStyle = shade(M.wall, -0.3); g.fillRect(E.W * 0.05, gy - 420, 520, 420); g.fillStyle = shade(M.wall, -0.5); g.beginPath(); g.moveTo(E.W * 0.05 - 40, gy - 420); g.lineTo(E.W * 0.05 + 260, gy - 600); g.lineTo(E.W * 0.05 + 560, gy - 420); g.fill();
    g.fillStyle = alpha(M.practical, 0.9); g.fillRect(E.W * 0.05 + 330, gy - 300, 110, 130); glow(g, E.W * 0.05 + 385, gy - 235, 220, M.practical, 0.35); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, [M.floor, M.dark]); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, CX(), gy + 14, 420, 56, M.key, 0.2); });
  return M;
}
function beach(g, t, cam) {
  const M = mood('dusk'), gy = GY();
  layer(g, cam, 0.12, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.68, gy - 150, 80, '#fff1d6', M.key, 4); });
  layer(g, cam, 0.4, g => { g.fillStyle = linGrad(g, 0, gy - 120, 0, gy, ['#3f4f86', '#7a5f8a']); g.fillRect(-E.W, gy - 120, E.W * 3, 120); for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(-200 + i * 380 + Math.sin(t + i) * 30, gy - 100 + i * 14, 240, 4); } });
  layer(g, cam, 0.6, g => { const px = E.W * 0.14; g.strokeStyle = '#1c1420'; g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); g.moveTo(px, gy); g.quadraticCurveTo(px + 60, gy - 360, px + 150, gy - 640); g.stroke();
    for (let i = 0; i < 6; i++) { const a = -2.6 + i * 0.75; g.lineWidth = 16; g.beginPath(); g.moveTo(px + 150, gy - 640); g.quadraticCurveTo(px + 150 + Math.cos(a) * 160, gy - 700 + Math.sin(a) * 90, px + 150 + Math.cos(a) * 280, gy - 600 + Math.sin(a) * 160 + 60); g.stroke(); } });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.6, ['#c9a06a', '#5a3f38']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, CX(), gy + 14, 460, 60, M.key, 0.22); });
  return M;
}
const PLACE = [jungle, night, beach];

// ---------- the host ----------
function host(g, t, info, M, o = {}) {
  drawFigure(g, { x: o.x ?? CX() - 260, y: o.y ?? GY(), s: o.s ?? V(2.2, 2.2), facing: o.facing ?? 1, outfit: DOG, pose: o.pose || breathe(POSES.talk, t), expr: o.expr || 'happy',
    viseme: o.mute ? null : visemeAt(info.globalT, info.shot.start, info.shot.end), hands: o.hands, squash: o.squash, look: o.look, blink: blink(t), rim: { color: M.rim, dir: o.rimDir || [0, -1] }, prop: o.prop });
}
function coconut(g, x, y, r, crack = 0) { circle(g, x, y, r, '#5a3a22'); circle(g, x - r * 0.3, y - r * 0.3, r * 0.25, alpha('#ffffff', 0.12)); if (crack > 0) { seg(g, [[x - r * 0.2, y - r], [x + r * 0.1, y - r * 0.2], [x - r * 0.1, y + r * 0.4], [x + r * 0.2, y + r]], 5, '#fff1dc'); } }
const hud = (g, info) => tally(g, { label: 'Số lần bị kẹp', count: hitsAt(info.globalT), since: sinceHit(info.globalT), y: V(120, 250) });

for (const sh of E.shots) {
  const p = sh.params || {};
  // ---- cold open: already losing to the crab ----
  if (p.cold) registerShot(sh.id, { draw(g, t, info) {
    const hit = 1.0, shake = t > hit && t < hit + 0.4 ? Math.sin(t * 90) * 10 * (1 - (t - hit) / 0.4) : 0;
    const cam = { z: 1.25 + 0.05 * ease.out(t / info.dur), x: shake, y: -40 };
    const M = beach(g, t, cam);
    layer(g, cam, 1, g => {
      const cx = lerp(CX() + 520, CX() + 150, ease.out(prog(t, 0, hit)));
      host(g, t, info, M, { x: CX() - 80, facing: -1, pose: t < hit ? breathe(POSES.stand, t) : boilPose(POSES.handsOnHead, t, 2.2), expr: exprAt(t, [[0, 'smirk'], [hit, 'shocked'], [2.0, 'cry']], 0.08), squash: impact(t, hit, -0.22) });
      bug(g, 'crab', { x: cx, y: GY(), s: 1.5, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } });
      ouch(g, t - hit, CX() + 40, GY() - 150, { text: 'KẸP!' });
    });
    hud(g, info);
  } });
  // ---- title card ----
  else if (p.title) registerShot(sh.id, { captions: true, draw(g, t, info) {
    const M = jungle(g, t, { z: 1.1 }); g.fillStyle = 'rgba(8,6,14,.55)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    titleCard(g, t, { lines: ['CẢM GIÁC', 'ĐÁNH NHAU VỚI BỌ KHỔNG LỒ'], dur: info.dur, y: E.H * 0.2 });
    const k = ease.outBack(prog(t, 0.3, 0.7));
    layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: CX(), y: GY() + (1 - k) * 500, s: V(1.9, 2), pose: breathe(act(t, [[0, 'stand'], [0.8, 'wave']]), t), hands: 'wave' }));
  } });
  // ---- round card ----
  else if (p.roundTitle) registerShot(sh.id, { draw(g, t, info) {
    const M = PLACE[p.round](g, t, { z: 1.3 }); g.fillStyle = 'rgba(8,6,14,.45)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    layer(g, { z: 1 }, 1, g => bug(g, BUGK[p.round], { x: E.W * 0.8, y: GY(), s: 1.6 * (1 + 0.06 * (spring(t, 2.4, 0.5) - 1)), facing: -1, t, rim: { color: M.rim, dir: [0, -1] } }));
    roundTitle(g, t, { n: p.n, title: p.name.toUpperCase(), dur: info.dur });
    hud(g, info);
  } });
  // ---- stat card: creature + mascot presenting ----
  else if (p.card) registerShot(sh.id, { draw(g, t, info) {
    const cam = { z: 1.08 + 0.03 * ease.inOut(t / info.dur), x: -40 }, M = PLACE[p.round](g, t, cam);
    layer(g, cam, 1, g => {
      host(g, t, info, M, { x: E.W * 0.16, pose: breathe(act(t, [[0, 'stand'], [0.4, 'point'], [2.0, 'explain']]), t), hands: t < 2 ? { F: 'point' } : 'open', expr: p.round === 1 ? 'smirk' : 'happy' });
      const small = p.round === 1;
      bug(g, BUGK[p.round], { x: E.W * 0.4, y: GY(), s: small ? 0.45 : 1.25, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } });
      if (small) { g.strokeStyle = alpha(S().ui.gold, 0.9); g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.arc(E.W * 0.4, GY() - 30, 80, 0, 7); g.stroke(); g.setLineDash([]); }
    });
    dangerCard(g, t, { name: p.name, stats: p.stats });
    hud(g, info);
  } });
  // ---- experience beats ----
  else if (p.round === 0) registerShot(sh.id, { draw(g, t, info) {            // beetle: scary pose-off, then it just eats fruit
    const cam = { z: 1.12, x: 0 }, M = jungle(g, t, cam), calm = 2.2;
    layer(g, cam, 1, g => {
      host(g, t, info, M, { x: CX() - 300, pose: t < calm ? boilPose(POSES.ready, t, 1.5) : breathe(act(t, [[calm, 'ready'], [calm + 0.1, 'shrug'], [3.4, 'cheer']]), t), expr: exprAt(t, [[0, 'scared'], [calm, 'confused'], [3.4, 'joy']]), hands: t > 3.4 ? 'fist' : null });
      bug(g, 'beetle', { x: CX() + 220, y: GY(), s: 1.5, facing: -1, t: t < calm ? t : t * 0.3, rim: { color: M.rim, dir: [0, -1] } });
      if (t > calm) { circle(g, CX() + 60, GY() - 26, 26, '#e5484d'); seg(g, [[CX() + 60, GY() - 52], [CX() + 68, GY() - 66]], 5, '#2c5a2e'); }
    });
    if (t > 3.4) sign(g, CX() - 520, GY() + 10, 'DỄ ỢT!');
    hud(g, info);
  } });
  else if (p.round === 1) registerShot(sh.id, { draw(g, t, info) {            // spider: laughs at it, gets bitten, swells up
    const bite = 2.55, M0 = mood('night');
    if (t < bite + 0.25) { const cam = { z: 1.15 }, M = night(g, t, cam); layer(g, cam, 1, g => {
      host(g, t, info, M, { x: CX() - 200, pose: breathe(act(t, [[0, 'stand'], [0.3, 'point']]), t), hands: { F: 'point' }, expr: 'smirk', look: [0.6, 0.6] });
      const sx = lerp(CX() + 260, CX() - 120, ease.inOut(prog(t, 0.6, bite)));
      bug(g, 'spider', { x: sx, y: GY(), s: 0.4, facing: -1, t: t * 1.6, rim: { color: M.rim, dir: [0, -1] } });
      ouch(g, t - bite, CX() - 150, GY() - 80, { text: 'CẮN!', r: 110 }); }); }
    else { night(g, t, { z: 1.6, x: 200 }); g.fillStyle = 'rgba(8,6,14,.45)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
      const u = t - bite - 0.25, puff = 1 + 0.28 * spring(u, 1.6, 0.4);
      g.save(); g.translate(CX(), E.H * 0.52); g.scale(puff, 1 + 0.1 * spring(u, 1.6, 0.4)); bigFace(g, 0, 0, V(210, 250), { outfit: DOG, expr: exprAt(u, [[0, 'shocked'], [0.9, 'cry']]), viseme: visemeAt(info.globalT, info.shot.start, info.shot.end), rimColor: M0.rim, rimSide: -1 }); g.restore();
      text(g, 'NỌC ĐỘC THẦN KINH', CX(), V(120, 260), { size: V(64, 70), color: S().ui.accent, glow: 24, glowColor: alpha(S().ui.accent, 0.7), stroke: 10, strokeColor: 'rgba(10,6,14,.6)' }); }
    hud(g, info);
  } });
  else if (p.round === 2 && p.beat === 0) registerShot(sh.id, { draw(g, t, info) {   // crab cracks a coconut
    const crack = 1.9, cam = { z: 1.3 + 0.05 * ease.inOut(t / info.dur), x: 120, y: -30 }, M = beach(g, t, cam);
    layer(g, cam, 1, g => {
      host(g, t, info, M, { x: CX() - 380, pose: breathe(act(t, [[0, 'stand'], [crack, 'handsOnHead', { amt: 0.25 }]]), t), expr: exprAt(t, [[0, 'awe'], [crack, 'shocked']]) });
      bug(g, 'crab', { x: CX() + 180, y: GY(), s: 1.7, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } });
      const sq = t > crack ? 1 - 0.25 * clamp((t - crack) / 0.15) : 1; g.save(); g.translate(CX() - 20, GY() - 190); g.scale(1 / sq, sq); coconut(g, 0, 0, 44, t > crack ? 1 : 0); g.restore();
      ouch(g, t - crack, CX() - 20, GY() - 200, { text: 'RẮC!', r: 120 });
    });
    if (t > 2.2) { const k = ease.outBack(prog(t, 2.2, 2.6)); g.save(); g.translate(CX(), V(110, 250)); g.scale(k, k); text(g, '~3.300 N', 0, 0, { size: V(96, 110), color: S().ui.gold, glow: 26, glowColor: alpha(S().ui.gold, 0.7), stroke: 12, strokeColor: 'rgba(10,6,14,.6)' }); g.restore(); }
    hud(g, info);
  } });
  else if (p.round === 2) registerShot(sh.id, { draw(g, t, info) {            // gag: the tail is the next coconut
    const hit = HITS[3] - sh.start, cam = { z: 1.2, x: t > hit ? Math.sin(t * 80) * 8 * clamp(1 - (t - hit) / 0.4) : 0 }, M = beach(g, t, cam);
    layer(g, cam, 1, g => {
      const run = t > hit + 0.5, hx = run ? CX() - 100 - (t - hit - 0.5) * 700 : CX() - 100;
      host(g, t, info, M, { x: hx, facing: -1, pose: t < hit ? breathe(POSES.think, t) : boilPose(POSES.handsOnHead, t, 2.4), expr: exprAt(t, [[0, 'worried'], [hit, 'shocked'], [hit + 0.5, 'cry']], 0.08), squash: impact(t, hit, -0.25), look: [-0.5, 0.2] });
      bug(g, 'crab', { x: lerp(CX() + 420, hx + 190, ease.inOut(prog(t, 0.2, hit))), y: GY(), s: 1.5, facing: -1, t: t * 1.4, rim: { color: M.rim, dir: [0, -1] } });
      ouch(g, t - hit, CX() + 20, GY() - 140, { text: 'KẸP!' });
    });
    hud(g, info);
  } });
  // ---- recap: ranking ----
  else if (p.recap) registerShot(sh.id, { draw(g, t, info) {
    const M = beach(g, t, { z: 1.05 }); g.fillStyle = 'rgba(8,6,14,.6)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    text(g, 'BẢNG XẾP HẠNG', CX(), V(110, 240), { size: V(72, 84), color: S().ui.gold, glow: 24, glowColor: alpha(S().ui.gold, 0.7) });
    const rows = [['Cua dừa', 'crab', 1.0], ['Nhện góa phụ đen', 'spider', 0.8], ['Bọ hung Goliath', 'beetle', 0.25]], w = V(980, 900), x = CX() - w / 2 + V(-160, 0);
    rows.forEach(([name, kind, v], i) => { const k = ease.outBack(prog(t, 0.3 + i * 0.35, 0.7 + i * 0.35)); if (k <= 0) return; const y = V(210, 380) + i * V(140, 170);
      g.save(); g.translate(x + w / 2, y + 55); g.scale(k, k); g.translate(-(x + w / 2), -(y + 55));
      rr(g, x, y, w, 110, 20); g.fillStyle = S().ui.card; g.fill(); g.strokeStyle = i === 0 ? S().ui.gold : S().ui.cardLine; g.lineWidth = i === 0 ? 4 : 2; g.stroke(); if (i === 0) glow(g, x + 60, y + 55, 120, S().ui.gold, 0.35);
      text(g, `#${i + 1}`, x + 60, y + 58, { size: 54, color: i === 0 ? S().ui.gold : S().ui.cream });
      text(g, name, x + 130, y + 40, { size: 38, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left' });
      rr(g, x + 130, y + 68, (w - 330) * v * ease.out(prog(t, 0.6 + i * 0.35, 1.3 + i * 0.35)) + 1, 16, 8); g.fillStyle = v > 0.7 ? S().ui.accent : S().ui.gold; g.fill();
      bug(g, kind, { x: x + w - 90, y: y + 96, s: kind === 'spider' ? 0.5 : 0.55, facing: -1, t, rim: { color: M.rim, dir: [0, -1] } }); g.restore(); });
    if (!E.vertical) layer(g, { z: 1 }, 1, g => host(g, t, info, M, { x: E.W * 0.86, s: 1.9, facing: -1, pose: breathe(act(t, [[0, 'stand'], [0.6, 'point']]), t), hands: { F: 'point' }, expr: 'nervous' }));
    hud(g, info);
  } });
  // ---- CTA ----
  else if (p.cta) registerShot(sh.id, { draw(g, t, info) {
    const cam = { z: 1.2 - 0.04 * ease.inOut(t / info.dur) }, M = jungle(g, t, cam);
    layer(g, cam, 1, g => host(g, t, info, M, { x: CX() + 60, pose: breathe(act(t, [[0, 'stand'], [0.4, 'explain'], [2.2, 'wave']]), t), hands: t > 2.2 ? 'wave' : 'open', expr: 'happy', look: saccade(t, 3, { amp: 0.2 }) }));
    sign(g, CX() - 380, GY() + 10, 'TẬP SAU: ?', { tilt: 0.06 });
    hud(g, info);
  } });
}
