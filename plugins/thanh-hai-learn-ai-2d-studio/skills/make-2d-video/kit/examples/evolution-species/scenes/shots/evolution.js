// shots/evolution.js — "Sự tiến hoá của loài người": one environment + one creature per stage, the evoOverlay HUD,
// a "from THIS… to THIS" hook and a march-of-progress payoff. Shots are registered from story/shots.json params.
import { E, V, registerShot, mood, layer, blurLayer, ease, prog, clamp, lerp, linGrad, glow, alpha, shade, text, FONTS, S } from '/engine/core.js';
import { spring } from '/engine/motion.js';
import { creature, evoOverlay, stagesFromShots, CREATURES } from '/engine/evolve.js';
import * as FX from '/engine/fx2d.js';

const KINDS = ['cell', 'fish', 'amphibian', 'reptile', 'mammal', 'ape', 'hominid', 'human'];
const ENV = ['ocean', 'ocean', 'shore', 'fern', 'night', 'savanna', 'savanna', 'cave'];
const GY = () => E.H * V(0.8, 0.68);

function world(g, env, t, cam, noTrees = false) {
  const gy = GY();
  if (env === 'ocean') {
    const M = mood('night');
    layer(g, cam, 0.2, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H, ['#06283a', '#0d4a5c', '#127080']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.godRays(g, E.W * 0.55, -80, { color: '#bff4ff', a: 0.08, t, count: 9 }); });
    layer(g, cam, 0.6, g => FX.hills(g, { y: gy + 40, amp: 70, color: '#0a2f3a', seed: 3 }));
    FX.drops(g, t, { count: 40, color: '#bff4ff', rMin: 2, rMax: 7, drift: -30 });
    return M;
  }
  if (env === 'shore') {
    const M = mood('dusk');
    layer(g, cam, 0.15, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.7, gy - 120, 60, '#fff1d6', M.key, 4); });
    layer(g, cam, 0.4, g => { g.fillStyle = linGrad(g, 0, gy - 90, 0, gy, ['#3a4a78', '#6a5a7a']); g.fillRect(-E.W, gy - 90, E.W * 3, 90); });
    layer(g, cam, 0.9, g => { FX.hills(g, { y: gy + 20, amp: 30, color: shade(M.floor, -0.2), seed: 6 }); for (let i = 0; i < 12; i++) FX.tree(g, -200 + i * 180, gy + 8, 0.25, shade(M.dark, -0.2)); });
    return M;
  }
  if (env === 'fern') {
    const M = mood('golden');
    layer(g, cam, 0.15, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.3, gy - 200, 70, '#fff3dc', M.key, 4); });
    layer(g, cam, 0.35, g => FX.hills(g, { y: gy - 60, amp: 140, color: shade(M.wall, -0.1), seed: 9 }));
    layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 2, [M.floor, M.dark]); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); for (let i = 0; i < 8; i++) FX.pine(g, -100 + i * 320, gy, 0.6 + (i % 3) * 0.2, shade(M.dark, -0.3)); });
    return M;
  }
  if (env === 'night') {
    const M = mood('night');
    layer(g, cam, 0.1, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.stars(g, t, { count: 160 }); FX.moon(g, E.W * 0.78, E.H * 0.2, 46); });
    layer(g, cam, 0.5, g => { for (let i = 0; i < 14; i++) FX.pine(g, -300 + i * 190, gy, 1 + (i % 4) * 0.3, shade(M.dark, -0.2)); });
    layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 2, [M.floor, M.dark]); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, E.W / 2, gy + 10, 360, 50, M.key, 0.18); });
    return M;
  }
  if (env === 'cave') {
    const M = mood('interiorWarm'), fl = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3);
    layer(g, cam, 0.4, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, ['#120b0a', '#3a2418']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
      for (let i = 0; i < 5; i++) { g.fillStyle = alpha('#c2683a', 0.5); g.beginPath(); g.arc(E.W * 0.2 + i * 70, E.H * 0.32 + (i % 2) * 30, 18, 0, 7); g.fill(); } });
    layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 2, ['#2a1a12', '#0e0806']); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); });
    layer(g, cam, 1, g => { const fx = E.W * 0.68; glow(g, fx, gy - 30, 420 * fl, '#ff9a3c', 0.5); FX.pool(g, fx, gy + 6, 420, 60, '#ffb060', 0.35 * fl);
      for (let i = 0; i < 3; i++) { g.fillStyle = alpha(i ? '#ffd27a' : '#ff7a2a', 0.9); g.beginPath(); g.ellipse(fx + (i - 1) * 14, gy - 26 - i * 6, 18 - i * 4, (44 - i * 8) * fl, 0, 0, 7); g.fill(); } });
    return { ...M, rim: '#ffb060' };
  }
  // savanna
  const M = mood('golden');
  layer(g, cam, 0.15, g => { g.fillStyle = linGrad(g, 0, -E.H, 0, gy, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.sun(g, E.W * 0.5, gy - 90, 110, '#fff3dc', M.key, 4); FX.godRays(g, E.W * 0.5, gy - 90, { color: M.key, a: 0.06, t, angle: -Math.PI / 2, spread: 2.6 }); });
  if (!noTrees) layer(g, cam, 0.5, g => { FX.tree(g, E.W * 0.15, gy - 10, 1.6, shade(M.dark, -0.2)); FX.tree(g, E.W * 0.86, gy - 6, 1.2, shade(M.dark, -0.2)); });
  layer(g, cam, 0.9, g => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 2, [M.grass, M.dark]); g.fillRect(-E.W, gy, E.W * 3, E.H * 2); FX.pool(g, E.W / 2, gy + 10, 420, 60, M.key, 0.2); });
  return M;
}

function subject(g, kind, t, M, o = {}) {
  const swim = kind === 'cell' || kind === 'fish', gy = GY();
  const SIZE = { cell: 1.4, fish: 1.6, amphibian: 1.9, reptile: 1.7, mammal: 1.8 };   // small animals read bigger on screen
  const s = o.s ?? V(1.5, 1.6) * (SIZE[kind] || 1);
  const x = o.x ?? E.W / 2 + (swim ? Math.sin(t * 0.8) * 40 : 0), y = o.y ?? (swim ? gy - 140 + Math.sin(t * 1.7) * 14 : gy);
  creature(g, kind, { x, y, s, t, facing: o.facing ?? 1, rim: { color: M.rim, dir: [0, -1] }, accent: kind === 'cell' ? '#9ff0ff' : undefined, blink: (t % 3.1) > 3.0 });
}

for (const sh of E.shots) {
  const p = sh.params || {};
  if (p.stage != null) registerShot(sh.id, { draw(g, t, info) {
    const kind = KINDS[p.stage], env = ENV[p.stage];
    const pop = 1 + 0.08 * (spring(t, 2.2, 0.5) - 1);                 // springy arrival after the morph
    const cam = { z: (1 + 0.05 * ease.inOut(t / info.dur)) * (p.part ? 1.18 : 1), x: p.part ? -60 : 0 };
    const M = world(g, env, t, cam);
    layer(g, cam, 1, g => { g.save(); g.translate(E.W / 2, GY()); g.scale(pop, pop); g.translate(-E.W / 2, -GY()); subject(g, kind, t + p.stage, M); g.restore(); });
    FX.dust(g, t, { count: 30, color: alpha(M.rim, 0.8) });
    evoOverlay(g, t, info);
  } });
  else if (p.hook) registerShot(sh.id, { draw(g, t, info) {
    const half = info.dur * 0.48, late = t >= half, M = world(g, late ? 'cave' : 'ocean', t, { z: 1.25 + 0.08 * ease.out(t / info.dur) });
    layer(g, { z: 1 }, 1, g => subject(g, late ? 'human' : 'cell', t, M, { s: V(2.1, 2.2) }));
    const lt = late ? t - half : t, k = ease.outBack(prog(lt, 0.05, 0.4));
    g.save(); g.translate(E.W / 2, V(140, 300)); g.scale(k, k);
    text(g, late ? '…ĐẾN ĐÂY?' : 'TỪ ĐÂY…', 0, 0, { size: V(96, 120), color: S().ui.gold, glow: 30, glowColor: alpha(S().ui.gold, 0.7) }); g.restore();
    if (late && lt < 0.3) { g.fillStyle = alpha('#ffffff', (1 - lt / 0.3) ** 2); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
  } });
  else if (p.outro) registerShot(sh.id, { draw(g, t, info) {
    const M = world(g, 'savanna', t, { z: 1.02 - 0.02 * ease.inOut(t / info.dur) }, true), n = KINDS.length;
    layer(g, { z: 1 }, 1, g => KINDS.forEach((k, i) => { const a = clamp((t - i * 0.18) / 0.3); if (a <= 0) return; g.save(); g.globalAlpha = a;
      const x = lerp(V(150, 120), E.W - V(150, 120), i / (n - 1)), swim = k === 'cell' || k === 'fish';
      subject(g, k, t + i, M, { x, y: swim ? GY() - 70 : GY(), s: V(0.72, 0.48) * (0.85 + 0.3 * i / (n - 1)) }); g.restore(); }));
    const q = ease.outBack(prog(t, 1.5, 1.9)); g.save(); g.translate(E.W / 2, V(150, 320)); g.scale(q, q);
    text(g, 'Tiếp theo sẽ là gì?', 0, 0, { size: V(72, 84), color: S().ui.cream, font: FONTS.ui, weight: 900, glow: 18, glowColor: 'rgba(0,0,0,.6)' }); g.restore();
    evoOverlay(g, t, info, { counter: 'ago' });
  } });
}
