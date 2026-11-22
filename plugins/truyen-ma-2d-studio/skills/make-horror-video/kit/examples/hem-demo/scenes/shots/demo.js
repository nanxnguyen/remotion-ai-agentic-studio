// shots/demo.js — Truyện Ma 2D Studio reference project: every horror.js building block in 9 shots.
import { E, V, registerShot, mood, layer, blurLayer, veil, backdrop, ease, prog, key, clamp, lerp, glow, alpha, shade, mix, linGrad } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import { act, exprAt } from '/engine/motion.js';
import * as FX from '/engine/fx2d.js';
import * as H from '/engine/horror.js';
import { MINH } from '../cast.js';

// h01 HOOK — the alley at 02:17, a woman in white at the far end. Slow creep-in, lamp flicker, clock stamp.
registerShot('h01', { draw(g, t, info) {
  const cam = { z: H.creep(t, info.dur, 0.12), x: 0 };
  const { GY, M, VX, VY, f } = H.hem(g, t, cam, { moodName: 'night', endGlow: 0.6 });
  layer(g, cam, 0.42, (g) => H.ghost(g, { x: VX, y: VY + 96, s: 0.55, t, a: 0.85 * (0.4 + 0.6 * f), reveal: 0, float: 3 }));
  H.fogBank(g, t, { y: GY - 40, h: 160, a: 0.22, color: M.fog });
  H.clockStamp(g, t, { str: '02:17', x: E.W * 0.82, y: E.H * 0.14, size: 70 });
} });

// h02 SETUP — Minh walks home lighting the way with his phone; breath fog; the lamp dies behind him.
registerShot('h02', { draw(g, t, info) {
  const cam = { z: 1.15, x: -60 + t * 12 };
  const { GY, M, f } = H.hem(g, t, cam, { moodName: 'night', lamp: t < 2.2 ? 1 : 0.05 });
  const x = E.W * 0.32 + t * 70, rim = { color: M.rim, dir: [1, -0.4], w: 3 };
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x, y: GY, s: 1.5, facing: 1, outfit: MINH, pose: walkPose(t * 1.6), expr: t > 2.3 ? 'scared' : 'worried', prop: 'phone', rim });
    const [hx, hy, hr] = headPos({ x, y: GY, s: 1.5, facing: 1, pose: walkPose(t * 1.6) });
    H.breathFog(g, hx + hr * 0.9, hy + hr * 0.3, t, { period: 1.8 });
  });
  if (t > 2.2) H.darkness(g, [{ cone: [x + 70, GY - 200, -0.15, 900, 0.5] }, { x: x, y: GY - 230, r: 260 }], { a: 0.82 * ease.out(prog(t, 2.2, 2.6)) });
} });

// h03 DREAD — insert on the ancestor altar; the portrait's eyes light up red. (hush before the scare)
registerShot('h03', { draw(g, t, info) {
  const M = mood('altarRoom'); const cam = { z: 1.05 + 0.1 * ease.inOut(t / info.dur), y: -40 };
  backdrop(g, [shade(M.wall, -0.3), shade(M.wall, -0.7)]);
  layer(g, cam, 1, (g) => { H.altar(g, E.W / 2, E.H * 0.86, t, M, { s: 1.5, photoEyes: ease.in(prog(t, 1.6, 2.8)) }); });
  H.darkness(g, [{ x: E.W / 2, y: E.H * 0.5, r: 760, soft: 0.8 }], { a: 0.75 });
} });

// h04 SCARE — the ghost's face: hair parts, hollow eyes, zoom punch + white flash on the hit.
registerShot('h04', { draw(g, t, info) {
  const at = 0.05, M = mood('night');
  const cam = { z: H.punch(t, at, 0.22) * (1.6 + 0.08 * t), y: -60 };
  backdrop(g, [M.sky[0], M.sky[2]]);
  layer(g, cam, 1, (g) => H.ghost(g, { x: E.W / 2, y: E.H * 0.42 + 208 * 2.6, s: 2.6, t, reach: ease.inOut(prog(t, 0.8, 2.4)), reveal: ease.out(prog(t, 0.0, 0.6)), eyes: 'hollow', mouth: ease.in(prog(t, 1.2, 2.6)), glitch: t < 0.5 ? 0.8 : 0.1, tilt: 0.12 * Math.sin(t * 0.8) }));
  H.heartbeatVignette(g, t, { bpm: 110, a: 0.55 });
  H.scareFlash(g, t, at, { dur: 0.16 });
} });

// h05 BREATHER — village entrance: banyan tree, swaying red lanterns, vàng mã drifting. Multiplane 2.5D pan.
registerShot('h05', { draw(g, t, info) {
  const M = mood('ghostNight'); const cam = { z: 1.04, x: -80 + t * 40 };
  const GY = E.H * 0.82;
  H.planes(g, cam, [
    { depth: 0.2, draw: (g) => { backdrop(g, [M.sky[0], M.sky[2]]); FX.moon(g, E.W * 0.72, E.H * 0.2, 46, '#dfe6ff'); FX.stars(g, t, { count: 60 }); } },
    { depth: 0.5, draw: (g) => { FX.hills(g, { y: GY - 60, amp: 110, color: shade(M.dark, 0.08) }); }, haze: [M.fog, 0.08] },
    { depth: 0.8, draw: (g) => { H.banyan(g, E.W * 0.42, GY, t, M, { s: 1.1 }); g.fillStyle = shade(M.floor, -0.3); g.fillRect(-E.W, GY, E.W * 3, E.H); } },
    { depth: 1.0, draw: (g) => { H.lantern(g, E.W * 0.22, E.H * 0.42, t, { s: 1.1 }); H.lantern(g, E.W * 0.62, E.H * 0.38, t, { s: 0.9, seed: 5 }); } },
    { depth: 1.35, blur: 6, draw: (g) => { H.paperMoney(g, t, { count: 18 }); } },
  ]);
  H.fogBank(g, t, { y: GY, h: 160, a: 0.3, color: M.fog });
} });

// h06 DREAD — pitch black; the flashlight beam sweeps and finds a tall shadow figure.
registerShot('h06', { draw(g, t, info) {
  const M = mood('ghostNight'); const cam = { z: 1.0 + 0.04 * t };
  const GY = E.H * 0.86, ang = lerp(-0.9, -0.36, ease.inOut(prog(t, 0, 1.5)));
  const ox = E.W * 0.12, oy = E.H * 0.9;
  layer(g, cam, 1, (g) => {
    backdrop(g, [shade(M.wall, -0.4), shade(M.floor, -0.3)]);
    g.fillStyle = mix(M.wall, '#4a5262', 0.5); g.fillRect(-E.W, E.H * 0.12, E.W * 3, GY - E.H * 0.12); for (let i = 0; i < 6; i++) { g.fillStyle = shade(M.wall, -0.3); g.fillRect(i * 340 - 40, E.H * 0.12, 22, GY - E.H * 0.12); }
    H.shadowFigure(g, { x: E.W * 0.7, y: GY, s: 1.5, t, eyeA: ease.out(prog(t, 1.4, 1.8)) });
    H.flashBeam(g, ox, oy, ang, { len: 1500, t, a: 0.28 });
  });
  H.darkness(g, [{ cone: [ox, oy, ang, 1500, 0.42] }], { a: 0.96 });
  layer(g, cam, 1, (g) => H.shadowFigure(g, { x: E.W * 0.7, y: GY, s: 1.5, t, only: 'eyes', eyes: '#ff3a3a', eyeA: ease.out(prog(t, 1.4, 1.8)) }));
} });

// h07 REVEAL — the old well; a pale hand climbs out of the black water.
registerShot('h07', { draw(g, t, info) {
  const M = mood('moonRiver'); const cam = { z: 1.25 + 0.06 * t, y: 40 };
  const GY = E.H * 0.86;
  layer(g, cam, 1, (g) => {
    backdrop(g, [M.sky[0], M.sky[2]]); FX.moon(g, E.W * 0.2, E.H * 0.16, 36);
    g.fillStyle = shade(M.floor, -0.2); g.fillRect(-E.W, GY, E.W * 3, E.H);
    const { rim } = H.well(g, E.W / 2, GY, M, { s: 1.6 });
    H.handReach(g, E.W / 2 + 30, rim + 12, E.W / 2 + 160, rim - 150, prog(t, 0.9, 2.2), { s: 1.4, t });
  });
  H.fogBank(g, t, { y: GY - 20, h: 120, a: 0.28, color: M.fog });
} });

// h08 TWIST — found-footage tape: the rule card. VHS overlay + static on the cut.
registerShot('h08', { draw(g, t, info) {
  const M = mood('ghostNight'); backdrop(g, [shade(M.wall, -0.5), shade(M.floor, -0.6)]);
  H.handprints(g, [{ x: E.W * 0.2, y: E.H * 0.3, s: 1.4, r: -0.2 }, { x: E.W * 0.82, y: E.H * 0.62, s: 1.2, r: 0.3 }], { a: 0.18 });
  H.ruleCard(g, t, { n: 1, body: 'Sau 2 giờ sáng, đừng trả lời nếu có ai gọi tên bạn ngoài cửa.' });
  H.vhs(g, t, { stamp: '17-11-2026  02:17:44' });
  if (t < 0.25) H.staticBurst(g, t, { a: 0.7 });
} });

// h09 CTA — channel title card with a red underglow.
registerShot('h09', { draw(g, t, info) {
  backdrop(g, ['#020205', '#0a0a12']); H.fogBank(g, t, { y: E.H * 0.7, h: 200, a: 0.25 });
  H.horrorTitle(g, t, { text: 'HẺM CHUYỆN LẠ', sub: 'BẠN CÓ DÁM NGHE TIẾP?' });
} });

// thumbnail (tools/make_thumb.py): one entity, one glowing anomaly, 2–4 huge words
registerShot('thumb', { draw(g, t, info) {
  blurLayer(g, 8, (g) => H.hem(g, 0.4, { z: 1.3, x: -260 }, { moodName: 'night', endGlow: 1 })); veil(g, '#000000', 0.3);
  H.ghost(g, { x: E.W * 0.72, y: E.H * 0.4 + 208 * 2.5, s: 2.5, t: 0.4, reveal: 0.75, eyes: 'glow', glowColor: '#ff8a8a' });
  H.thumbText(g, { lines: ['ĐỪNG', 'QUAY LẠI'], x: E.W * 0.05, y: E.H * 0.3, size: 175 });
  H.thumbArrow(g, E.W * 0.42, E.H * 0.72, E.W * 0.6, E.H * 0.5);
} });
