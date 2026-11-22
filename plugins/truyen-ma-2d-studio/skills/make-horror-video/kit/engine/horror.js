// engine/horror.js — Truyện Ma 2D Studio horror kit (2D/2.5D canvas, logical units, deterministic).
// Ghosts that glide instead of walk, practical light that flickers, darkness with light holes, Vietnamese
// folk-horror props (bàn thờ, nhang, cây đa, giếng, đèn lồng, vàng mã), the signature "hẻm" alley set,
// 2.5D multiplane camera helpers, scare timing helpers, VHS / found-footage overlays and horror title cards.
// Rules: never Math.random / Date.now (use rng/noise), colours from mood()/S() where a set is lit by the scene.
import { E, V, clamp, lerp, ease, prog, rng, noise, alpha, mix, shade, seg, circle, ring, rr, poly, linGrad, radGrad, glow, veil, text, FONTS, layer, blurLayer, mood } from './core.js';

const TAU = Math.PI * 2;
const sm = (x) => x * x * (3 - 2 * x);

// ============================================================ timing helpers
// practical light flicker: ~1 with small wobble, drops to `min` for short random-looking moments (deterministic)
export function flicker(t, { seed = 1, rate = 9, drop = 0.16, min = 0.12, wobble = 0.12 } = {}) {
  const base = 1 - wobble * (0.5 + 0.5 * noise(t * rate, seed));
  const d = noise(t * 2.7, seed + 11) > 1 - 2 * drop && noise(t * 23, seed + 3) > -0.2;
  return d ? min + (1 - min) * 0.25 * (0.5 + 0.5 * noise(t * 40, seed + 7)) : base;
}
// on/off presence for an entity that "isn't really there" (1 = visible). Use for 1–3 frame blinks of a ghost.
export const presence = (t, { seed = 4, rate = 6, on = 0.55 } = {}) => (noise(t * rate, seed) > -1 + 2 * (1 - on) ? 1 : 0);
// zoom punch on a scare beat: multiply cam.z by punch(t, at)
export const punch = (t, at, amt = 0.16, decay = 7) => (t < at ? 1 : 1 + amt * Math.exp(-(t - at) * decay));
// slow dread push-in over the shot
export const creep = (t, dur, amt = 0.1) => 1 + amt * ease.sine(t / Math.max(0.01, dur));
// 2.5D dolly-zoom (vertigo): background swells while the subject shrinks slightly
export function dollyZoom(t, dur, amt = 0.22) { const k = ease.inOut(t / Math.max(0.01, dur)); return { bg: 1 + amt * k, fg: 1 - amt * 0.35 * k }; }
// camera tremble that grows with fear 0..1 (smooth, not a glitchy shake)
export const dread = (t, fear = 0.5, seed = 2) => [noise(t * 0.9, seed) * 10 * fear, noise(t * 0.8, seed + 5) * 7 * fear];
// silent beat before a scare: returns 0..1 "hold" weight (use to freeze motion / duck ambience) in [at-pre, at]
export const hush = (t, at, pre = 0.6) => clamp(1 - Math.abs(t - (at - pre / 2)) / (pre / 2));

// ============================================================ 2.5D multiplane
// planes(g, cam, [{depth, draw(g), blur}], ...) — far → near. depth < 1 moves slower (background), > 1 faster (foreground).
export function planes(g, cam, list) {
  for (const p of list) {
    if (p.blur && p.blur > 0.3) blurLayer(g, p.blur, p.draw, cam, p.depth ?? 1);
    else layer(g, cam, p.depth ?? 1, p.draw);
    if (p.haze) veil(g, p.haze[0], p.haze[1]);
  }
}

// ============================================================ darkness & light
let _dark = null;
// darkness(g, holes, {a, color}) — screen-space darkness with soft light holes. Call at stage level (outside layer()).
// hole: {x, y, r, soft=0.6, k=1} circle, or {cone: [x, y, angle, len, spread], k} for a flashlight beam.
export function darkness(g, holes = [], { a = 0.9, color = '#020206' } = {}) {
  const w = Math.max(8, Math.round(E.W * E.PX)), h = Math.max(8, Math.round(E.H * E.PX));
  if (!_dark || _dark.width !== w || _dark.height !== h) { _dark = document.createElement('canvas'); _dark.width = w; _dark.height = h; }
  const x = _dark.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, w, h); x.scale(E.PX, E.PX);
  x.globalCompositeOperation = 'source-over'; x.fillStyle = alpha(color, a); x.fillRect(0, 0, E.W, E.H);
  x.globalCompositeOperation = 'destination-out';
  for (const o of holes) {
    const k = o.k ?? 1;
    if (o.cone) {
      const [cx, cy, ang, len, spread] = o.cone;
      x.fillStyle = radGrad(x, cx, cy, 0, len, [alpha('#000', k), alpha('#000', k * 0.75), alpha('#000', 0)]);
      x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, len, ang - spread / 2, ang + spread / 2); x.closePath(); x.fill();
      x.fillStyle = radGrad(x, cx, cy, 0, len * 0.18, [alpha('#000', k), alpha('#000', 0)]); x.beginPath(); x.arc(cx, cy, len * 0.18, 0, TAU); x.fill();
    } else {
      const soft = o.soft ?? 0.6;
      x.fillStyle = radGrad(x, o.x, o.y, o.r * (1 - soft), o.r, [alpha('#000', k), alpha('#000', 0)]);
      x.beginPath(); x.arc(o.x, o.y, o.r, 0, TAU); x.fill();
    }
  }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(_dark, 0, 0); g.restore();
}
// visible beam of a flashlight (draw inside the scene, pair with darkness({cone}))
export function flashBeam(g, x, y, ang, { len = 900, spread = 0.42, color = '#fff4d8', a = 0.16, t = 0, seed = 1 } = {}) {
  const f = flicker(t, { seed, drop: 0.05, min: 0.6, wobble: 0.05 });
  g.save(); g.globalCompositeOperation = 'lighter';
  g.fillStyle = radGrad(g, x, y, 0, len, [alpha(color, a * f), alpha(color, a * 0.35 * f), alpha(color, 0)]);
  g.beginPath(); g.moveTo(x, y); g.arc(x, y, len, ang - spread / 2, ang + spread / 2); g.closePath(); g.fill(); g.restore();
  glow(g, x, y, 40, color, 0.5 * f);
}
// pulsing red/black vignette that beats like a heart (double thump)
export function heartbeatVignette(g, t, { bpm = 84, a = 0.5, color = '#2a0006' } = {}) {
  const ph = (t * bpm / 60) % 1; const b = Math.exp(-ph * 14) + 0.6 * Math.exp(-Math.max(0, ph - 0.18) * 14) * (ph > 0.18);
  const k = a * (0.55 + 0.45 * clamp(b));
  const v = g.createRadialGradient(E.W / 2, E.H / 2, Math.min(E.W, E.H) * 0.28, E.W / 2, E.H / 2, Math.max(E.W, E.H) * 0.62);
  v.addColorStop(0, alpha(color, 0)); v.addColorStop(1, alpha(color, k)); g.fillStyle = v; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
}
// flash on a scare: white (or red) frame that decays fast
export function scareFlash(g, t, at, { color = '#ffffff', dur = 0.14, a = 0.85 } = {}) { if (t < at || t > at + dur) return; veil(g, color, a * (1 - (t - at) / dur)); }

// ============================================================ entities
// ghost(g, {x, y, s, t, kind, facing, a, float, reveal, tilt, reach, eyes, glitch, …}) — the signature "ma":
//  kind 'woman' (long black hair, white áo dài/gown), 'child' (bob hair, smaller), 'bride' (red veil), 'old' (grey bun, dark áo bà ba)
//  reveal 0 = hair hides the face, 1 = face visible (pale, hollow eyes). reach 0..1 lifts an arm toward the viewer.
//  It hovers (no feet, hem fades) — ghosts never walk with a walk cycle; move x with ease or snap between frames.
export function ghost(g, o = {}) {
  const { x = E.W / 2, y = E.H * 0.8, s = 1, t = 0, kind = 'woman', facing = 1, a = 0.92, float = 7, reveal = 0, tilt = 0, reach = 0,
    eyes = 'hollow', eyeColor = '#ff2a2a', glitch = 0, glowColor = '#9fd2ff', seed = 7, mouth = 0 } = o;
  const K = { woman: { h: 1, hair: '#07060a', cloth: '#dfe3ea', hairLen: 1, bob: false }, child: { h: 0.66, hair: '#07060a', cloth: '#e8e4dc', hairLen: 0.45, bob: true },
    bride: { h: 1, hair: '#07060a', cloth: '#7a0d14', hairLen: 1, veil: '#b3121c' }, old: { h: 0.92, hair: '#8a8a90', cloth: '#1e1a1f', hairLen: 0.25, bun: true } }[kind] || {};
  const hair = o.hair || K.hair, cloth = o.cloth || K.cloth, skin = o.skin || '#c6ced3', H = K.h ?? 1;
  const hov = Math.sin(t * 1.25 + seed) * float + 16;
  const jit = glitch > 0 && noise(t * 31, seed) > 0.35 ? noise(t * 57, seed + 1) * 22 * glitch : 0;
  const draw = (gg, tint) => {
    gg.save(); gg.translate(x + jit, y - hov * s); gg.scale(s * facing, s * H);
    if (!tint) glow(gg, 0, -130, 210, glowColor, 0.16 * a);
    const C = (c) => tint || c;
    const hl = 150 * (K.hairLen ?? 1);
    const tiltOn = (fn) => { gg.save(); gg.translate(0, -160); gg.rotate(tilt); gg.translate(0, 160); fn(); gg.restore(); };
    // 1. long back hair (behind everything)
    if (!K.bun) tiltOn(() => {
      gg.fillStyle = alpha(C(hair), a); gg.beginPath(); gg.moveTo(-25, -205);
      for (let i = 0; i <= 6; i++) { const u = i / 6; gg.lineTo(-27 - u * 12 + noise(t * 0.7 + i + 9, seed + 4) * 5, -200 + u * hl); }
      for (let i = 6; i >= 0; i--) { const u = i / 6; gg.lineTo(27 + u * 12 + noise(t * 0.7 + i, seed + 4) * 5, -200 + u * hl); }
      gg.lineTo(25, -205); gg.closePath(); gg.fill();
    });
    // 2. gown: shoulders → ragged hem that fades out (no feet)
    const hem = []; for (let i = 0; i <= 10; i++) { const u = i / 10; hem.push([lerp(-62, 62, u), -8 + noise(t * 0.9 + i * 0.7, seed) * 12 + Math.sin(u * 9 + t * 2) * 4]); }
    gg.fillStyle = linGrad(gg, 0, -160, 0, 0, [alpha(C(cloth), a), alpha(C(cloth), a * 0.85), alpha(C(cloth), 0)]);
    gg.beginPath(); gg.moveTo(-24, -158); gg.quadraticCurveTo(-34, -110, -50 + noise(t, seed + 2) * 6, -40); hem.forEach(p => gg.lineTo(p[0], p[1]));
    gg.lineTo(50 + noise(t, seed + 3) * 6, -40); gg.quadraticCurveTo(34, -110, 24, -158); gg.closePath(); gg.fill();
    // 3. arms (thin, pale, too long). reach lifts the near arm toward camera
    const sh = [18, -150], ang = lerp(1.42, -0.15, ease.inOut(reach)), L1 = 52 + 10 * reach, L2 = 52 + 14 * reach;
    const el = [sh[0] + Math.cos(ang) * L1 * 0.35, sh[1] + Math.sin(ang) * L1];
    const hd = [el[0] + Math.cos(ang - 0.15 * reach) * L2 * (0.3 + reach), el[1] + Math.sin(ang - 0.15 * reach) * L2];
    seg(gg, [sh, el, hd], 7, alpha(C(skin), a * 0.95));
    for (let f = -2; f <= 2; f++) { const fa = ang - 0.15 * reach + f * 0.22; seg(gg, [hd, [hd[0] + Math.cos(fa) * 17, hd[1] + Math.sin(fa) * 17]], 2.4, alpha(C(skin), a * 0.9)); }
    seg(gg, [[-18, -150], [-22, -100], [-20, -62]], 7, alpha(C(skin), a * 0.9));
    // 4. head, face, front hair
    tiltOn(() => {
      seg(gg, [[0, -160], [0, -172]], 9, alpha(C(skin), a));
      circle(gg, 0, -192, 23, alpha(C(skin), a));
      if (reveal > 0.05) {
        const ea = a * clamp(reveal * 1.4);
        if (eyes === 'glow') { glow(gg, -8, -194, 14, C(eyeColor), ea); glow(gg, 8, -194, 14, C(eyeColor), ea); circle(gg, -8, -194, 2.6, alpha(C('#ffe0e0'), ea)); circle(gg, 8, -194, 2.6, alpha(C('#ffe0e0'), ea)); }
        else { gg.fillStyle = alpha(C('#050407'), ea); gg.beginPath(); gg.ellipse(-8, -194, 4.6, 6.5, 0, 0, TAU); gg.ellipse(8, -194, 4.6, 6.5, 0, 0, TAU); gg.fill(); }
        gg.fillStyle = alpha(C('#1a0d10'), ea * 0.9); gg.beginPath(); gg.ellipse(0, -177, 5, 1.5 + mouth * 8, 0, 0, TAU); gg.fill();
      }
      gg.fillStyle = alpha(C(hair), a);
      if (K.bun) { circle(gg, 0, -216, 13, alpha(C(hair), a)); gg.beginPath(); gg.arc(0, -193, 25, Math.PI * 1.02, Math.PI * 1.98); gg.fill(); }
      else {
        gg.beginPath(); gg.arc(0, -192, 26, Math.PI * 1.05, Math.PI * 1.95); gg.closePath(); gg.fill();            // crown
        const part = reveal * 15, cl = K.bob ? 24 : 26 + 66 * (1 - reveal) * (K.hairLen ?? 1);
        for (const sd of [-1, 1]) { gg.beginPath(); gg.moveTo(sd * 2, -216); gg.quadraticCurveTo(sd * (26 + part), -208, sd * (27 + part * 0.5), -196 + cl);
          gg.lineTo(sd * (3 + part) + noise(t + sd, seed + 6) * 3, -186 + cl); gg.quadraticCurveTo(sd * (part * 0.8), -202, sd * 2, -216); gg.fill(); }
      }
      if (K.veil) { gg.fillStyle = alpha(C(K.veil), a * 0.55); gg.beginPath(); gg.moveTo(-30, -222); gg.quadraticCurveTo(0, -244, 30, -222); gg.lineTo(46 + noise(t, 3) * 6, -110); gg.lineTo(-46, -110); gg.closePath(); gg.fill(); }
    });
    gg.restore();
  };
  if (glitch > 0 && noise(t * 19, seed + 8) > 0.2) { g.save(); g.globalCompositeOperation = 'lighter'; g.translate(-10 * glitch, 0); draw(g, '#ff2040'); g.translate(20 * glitch, 0); draw(g, '#20d0ff'); g.restore(); }
  draw(g, null);
}
// shadowFigure — tall thin silhouette with glowing eyes and smoky edges (the "bóng đen" at the end of the hallway)
export function shadowFigure(g, o = {}) {
  const { x = E.W / 2, y = E.H * 0.8, s = 1, t = 0, a = 0.95, eyes = '#f2f2ff', eyeA = 1, lean = 0, seed = 9, color = '#030305', only = null } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(lean);
  // only: 'eyes' draws just the eyes — call it again AFTER darkness() so the eyes glow through the black
  for (let k = 3; k >= 0 && only !== 'eyes'; k--) {
    const sp = k * 6, al = k ? a * 0.18 : a;
    g.fillStyle = alpha(color, al); g.beginPath(); g.moveTo(-12 - sp, 0);
    g.bezierCurveTo(-30 - sp, -120, -34 - sp + noise(t * 0.6 + k, seed) * 4, -230, -20 - sp, -300);
    g.quadraticCurveTo(-26 - sp, -350, 0, -352 - sp); g.quadraticCurveTo(26 + sp, -350, 20 + sp, -300);
    g.bezierCurveTo(34 + sp + noise(t * 0.6 + k, seed + 2) * 4, -230, 30 + sp, -120, 12 + sp, 0); g.closePath(); g.fill();
    seg(g, [[-26, -292], [-58 - sp, -170], [-50 - sp, -60 + noise(t + k, seed) * 6]], 9 + sp * 0.6, alpha(color, al));
    seg(g, [[26, -292], [58 + sp, -170], [50 + sp, -60 + noise(t + k + 3, seed) * 6]], 9 + sp * 0.6, alpha(color, al));
  }
  if (eyeA > 0) { glow(g, -9, -326, 18, eyes, 0.7 * eyeA); glow(g, 9, -326, 18, eyes, 0.7 * eyeA); circle(g, -9, -326, 2.8, alpha('#ffffff', eyeA)); circle(g, 9, -326, 2.8, alpha('#ffffff', eyeA)); }
  g.restore();
}
// pairs of eyes opening in the dark: list [{x, y, s}]
export function eyesInDark(g, t, list, { color = '#ffd36a', seed = 3, open = 1 } = {}) {
  list.forEach((e, i) => {
    const bl = (t * 0.7 + i * 0.37 + noise(i, seed)) % 3.2 > 3.05 ? 0.1 : 1, k = open * bl, sz = (e.s || 1) * 7;
    glow(g, e.x - sz * 1.8, e.y, sz * 4, color, 0.35 * k); glow(g, e.x + sz * 1.8, e.y, sz * 4, color, 0.35 * k);
    g.fillStyle = alpha(color, k); g.beginPath(); g.ellipse(e.x - sz * 1.8, e.y, sz, sz * 0.45 * k + 0.5, 0, 0, TAU); g.ellipse(e.x + sz * 1.8, e.y, sz, sz * 0.45 * k + 0.5, 0, 0, TAU); g.fill();
  });
}
// pale hand reaching in from (x0,y0) toward (x1,y1); p 0..1 = how far it has reached
export function handReach(g, x0, y0, x1, y1, p, { s = 1, color = '#c3cacd', ink = '#08070a', t = 0, seed = 5 } = {}) {
  const k = ease.out(clamp(p)), hx = lerp(x0, x1, k), hy = lerp(y0, y1, k), ang = Math.atan2(y1 - y0, x1 - x0);
  seg(g, [[x0, y0], [lerp(x0, hx, 0.5) + noise(t, seed) * 8, lerp(y0, hy, 0.5)], [hx, hy]], 22 * s, ink);
  seg(g, [[x0, y0], [lerp(x0, hx, 0.5) + noise(t, seed) * 8, lerp(y0, hy, 0.5)], [hx, hy]], 15 * s, color);
  for (let f = -2; f <= 2; f++) {
    const fa = ang + f * 0.28 + Math.sin(t * 3 + f) * 0.05 * (1 - k), fl = (f === -2 ? 34 : 50 - Math.abs(f) * 4) * s;
    const m = [hx + Math.cos(fa) * fl * 0.55, hy + Math.sin(fa) * fl * 0.55], e = [hx + Math.cos(fa + 0.25 * k) * fl, hy + Math.sin(fa + 0.25 * k) * fl];
    seg(g, [[hx, hy], m, e], 5.5 * s, color); circle(g, e[0], e[1], 2.2 * s, alpha('#5b4a4a', 0.9));
  }
}
// palm + finger prints on glass / mirror / fogged window
export function handprints(g, list, { color = '#e8f0ff', a = 0.35 } = {}) {
  for (const p of list) { const s = p.s || 1; g.save(); g.translate(p.x, p.y); g.rotate(p.r || 0); g.fillStyle = alpha(color, a);
    g.beginPath(); g.ellipse(0, 0, 22 * s, 26 * s, 0, 0, TAU); g.fill();
    [[-20, -36, 6, 15], [-8, -46, 6, 18], [6, -46, 6, 18], [18, -38, 5.5, 15], [28, -6, 5, 13]].forEach(([fx, fy, rx, ry], i) => { g.beginPath(); g.ellipse(fx * s, fy * s, rx * s, ry * s, i === 4 ? 0.9 : (fx / 60), 0, TAU); g.fill(); });
    g.restore(); }
}
// cold breath puffs from a mouth position (periodic)
export function breathFog(g, x, y, t, { period = 2.6, seed = 2, color = '#e6eeff', dir = 1 } = {}) {
  const ph = ((t + noise(seed, 1)) % period) / period; if (ph > 0.6) return; const k = ph / 0.6;
  for (let i = 0; i < 5; i++) { const r = 8 + k * 46 + i * 6, px = x + dir * (10 + k * 70 + i * 9), py = y - k * 16 + noise(i + t, seed) * 6;
    g.fillStyle = radGrad(g, px, py, 0, r, [alpha(color, 0.2 * (1 - k)), alpha(color, 0)]); g.beginPath(); g.arc(px, py, r, 0, TAU); g.fill(); }
}

// ============================================================ atmosphere
export function fogBank(g, t, { y = E.H * 0.75, h = 260, color = '#9aa6b8', a = 0.28, speed = 18, seed = 6, count = 9 } = {}) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const w = 420 + r() * 520, px = ((r() * (E.W + w) + t * speed * (0.5 + r())) % (E.W + w * 2)) - w, py = y + (r() - 0.5) * h;
    g.fillStyle = radGrad(g, px, py, 0, w * 0.55, [alpha(color, a * (0.5 + r() * 0.5)), alpha(color, 0)]);
    g.save(); g.translate(px, py); g.scale(1, 0.32); g.beginPath(); g.arc(0, 0, w * 0.55, 0, TAU); g.fill(); g.restore();
  }
}
// vàng mã / paper offerings drifting down and tumbling
export function paperMoney(g, t, { seed = 8, count = 28, area = [0, -40, E.W, E.H + 80], color = '#d9b45a', fall = 60 } = {}) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const px = area[0] + r() * area[2] + Math.sin(t * 0.9 + i) * 40, py = area[1] + ((r() * area[3] + t * fall * (0.6 + r() * 0.8)) % area[3]);
    const rot = t * (1 + r() * 2) + i, flip = Math.cos(t * 2.2 + i * 1.7), w = 26 + r() * 14;
    g.save(); g.translate(px, py); g.rotate(rot); g.scale(1, Math.abs(flip) * 0.9 + 0.1);
    g.fillStyle = flip > 0 ? color : shade(color, -0.35); g.fillRect(-w / 2, -w * 0.32, w, w * 0.64);
    g.strokeStyle = alpha('#7a1a10', 0.7); g.lineWidth = 1.5; g.strokeRect(-w / 2 + 4, -w * 0.32 + 4, w - 8, w * 0.64 - 8); g.restore();
  }
}
// still / rippling water (sông, ao, giếng) with an optional moon reflection
export function water(g, y, t, M, { h = E.H - y + 40, color = null, moonX = null, seed = 3 } = {}) {
  const c = color || mix(M.dark, M.sky[0], 0.35);
  g.fillStyle = linGrad(g, 0, y, 0, y + h, [shade(c, 0.08), shade(c, -0.4)]); g.fillRect(-E.W, y, E.W * 3, h);
  const r = rng(seed);
  for (let i = 0; i < 46; i++) { const ly = y + Math.pow(r(), 1.6) * h, w = 40 + r() * 220 * (1 + (ly - y) / h), lx = (r() * E.W + Math.sin(t * 0.6 + i) * 30);
    seg(g, [[lx, ly], [lx + w, ly]], 1.2 + (ly - y) / h * 2, alpha(M.rim, 0.06 + r() * 0.1)); }
  if (moonX != null) for (let i = 0; i < 16; i++) { const ly = y + 8 + i * 14, w = 70 - i * 2.5 + noise(t * 2 + i, seed) * 18; seg(g, [[moonX - w / 2, ly], [moonX + w / 2, ly]], 3, alpha('#e8ecff', 0.35 - i * 0.018)); }
}

// ============================================================ props (Vietnamese folk horror)
export function candle(g, x, y, t, { s = 1, seed = 1, wax = '#e9dfc8', lit = 1 } = {}) {
  const f = flicker(t, { seed, drop: 0.04, min: 0.5, wobble: 0.2 }) * lit;
  g.fillStyle = linGrad(g, x - 9 * s, 0, x + 9 * s, 0, [shade(wax, -0.25), wax, shade(wax, -0.4)]); rr(g, x - 9 * s, y - 60 * s, 18 * s, 60 * s, 3 * s); g.fill();
  seg(g, [[x, y - 60 * s], [x, y - 68 * s]], 2 * s, '#1a1410');
  if (f <= 0.02) return;
  glow(g, x, y - 80 * s, 170 * s * f, '#ffb35a', 0.4 * f);
  const sw = noise(t * 5, seed) * 3 * s, fh = (24 + 6 * noise(t * 11, seed + 2)) * s * (0.7 + 0.3 * f);
  g.fillStyle = radGrad(g, x, y - 72 * s, 0, fh, ['#fff8e0', '#ffcf6a', alpha('#ff7a20', 0.0)]);
  g.beginPath(); g.moveTo(x - 6 * s, y - 68 * s); g.quadraticCurveTo(x - 7 * s + sw, y - 68 * s - fh * 0.6, x + sw * 2, y - 68 * s - fh); g.quadraticCurveTo(x + 7 * s + sw, y - 68 * s - fh * 0.6, x + 6 * s, y - 68 * s); g.fill();
}
export function incense(g, x, y, t, { s = 1, n = 3, seed = 2, smoke = '#cfd2da' } = {}) {
  g.fillStyle = '#5a4a2a'; g.beginPath(); g.ellipse(x, y - 12 * s, 30 * s, 9 * s, 0, 0, TAU); g.fill(); rr(g, x - 28 * s, y - 14 * s, 56 * s, 14 * s, 5 * s); g.fill();
  for (let i = 0; i < n; i++) {
    const ox = (i - (n - 1) / 2) * 9 * s, tip = [x + ox * 1.4, y - 92 * s];
    seg(g, [[x + ox, y - 14 * s], tip], 2.2 * s, '#8a2a1c'); glow(g, tip[0], tip[1], 10 * s, '#ff5a2a', 0.8); circle(g, tip[0], tip[1], 2.2 * s, '#ffb070');
    g.save(); g.lineCap = 'round'; let lx = 0, ly = 0; for (let k = 0; k < 18; k++) { const u = k / 18, px = tip[0] + noise(t * 0.5 + u * 3 + i * 7, seed) * 30 * s * u + Math.sin(u * 7 - t * 1.6 + i) * 8 * s * u, py = tip[1] - u * 300 * s;
      g.strokeStyle = alpha(smoke, 0.28 * (1 - u)); g.lineWidth = (2 + u * 7) * s; if (k) { g.beginPath(); g.moveTo(lx, ly); g.lineTo(px, py); g.stroke(); } lx = px; ly = py; } g.restore();
  }
}
// bàn thờ (ancestor altar): returns {top}. photo: true draws a framed portrait (silhouette) — set photoEyes > 0 for the "ảnh thờ nhìn theo" beat
export function altar(g, cx, GY, t, M, { s = 1, photo = true, photoEyes = 0, seed = 3 } = {}) {
  const w = 420 * s, h = 210 * s, top = GY - h, wood = '#3a1712';
  g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(wood, 0.12), shade(wood, -0.45)]); g.fillRect(cx - w / 2, top, w, h);
  g.fillStyle = '#9a1c1a'; g.fillRect(cx - w / 2 - 6 * s, top - 10 * s, w + 12 * s, 16 * s); g.fillStyle = alpha('#d6a03a', 0.8); g.fillRect(cx - w / 2 - 6 * s, top + 4 * s, w + 12 * s, 3 * s);
  if (photo) { const pw = 120 * s, ph = 156 * s, px = cx - pw / 2, py = top - 16 * s - ph;
    g.fillStyle = '#2a1a10'; g.fillRect(px - 10 * s, py - 10 * s, pw + 20 * s, ph + 20 * s); g.fillStyle = '#c8b48a'; g.fillRect(px - 4 * s, py - 4 * s, pw + 8 * s, ph + 8 * s);
    g.fillStyle = linGrad(g, 0, py, 0, py + ph, ['#3c3a36', '#1a1916']); g.fillRect(px, py, pw, ph);
    circle(g, cx, py + ph * 0.38, 26 * s, '#5a5650'); g.fillStyle = '#4a4640'; g.beginPath(); g.ellipse(cx, py + ph, 52 * s, 44 * s, 0, Math.PI, TAU); g.fill();
    if (photoEyes > 0) { glow(g, cx - 9 * s, py + ph * 0.37, 10 * s, '#ff3030', photoEyes); glow(g, cx + 9 * s, py + ph * 0.37, 10 * s, '#ff3030', photoEyes); }
    seg(g, [[px - 14 * s, py - 14 * s], [px + 16 * s, py - 34 * s], [px + pw - 16 * s, py - 34 * s], [px + pw + 14 * s, py - 14 * s]], 4 * s, '#d6a03a'); }
  candle(g, cx - w * 0.38, top - 6 * s, t, { s: s * 1.1, seed }); candle(g, cx + w * 0.38, top - 6 * s, t, { s: s * 1.1, seed: seed + 1 });
  incense(g, cx - w * 0.2, top - 4 * s, t, { s: s * 0.9, seed });
  g.fillStyle = '#c9b07a'; g.beginPath(); g.ellipse(cx + w * 0.2, top - 8 * s, 46 * s, 9 * s, 0, 0, TAU); g.fill();
  [['#e0a020', -18, -26], ['#7aa83a', 6, -30], ['#d8502a', 22, -22], ['#e8c040', -2, -44]].forEach(([c, ox, oy]) => circle(g, cx + w * 0.2 + ox * s, top + oy * s, 15 * s, c));
  return { top, left: cx - w / 2, right: cx + w / 2 };
}
// cây đa (banyan) with hanging aerial roots — village-entrance landmark
export function banyan(g, x, GY, t, M, { s = 1, seed = 5, color = null } = {}) {
  const c = color || shade(M.dark, -0.2), r = rng(seed);
  g.fillStyle = c; g.beginPath(); g.moveTo(x - 90 * s, GY); g.bezierCurveTo(x - 60 * s, GY - 160 * s, x - 70 * s, GY - 300 * s, x - 30 * s, GY - 420 * s); g.lineTo(x + 40 * s, GY - 420 * s);
  g.bezierCurveTo(x + 70 * s, GY - 300 * s, x + 60 * s, GY - 160 * s, x + 110 * s, GY); g.closePath(); g.fill();
  // canopy: many overlapping leaf clumps inside a wide dome, moon-lit top edge
  const cy = GY - 470 * s, clumps = [];
  for (let i = 0; i < 46; i++) { const a = Math.PI * (1.02 + r() * 0.96), d = Math.sqrt(r()); clumps.push([x + Math.cos(a) * d * 520 * s, cy + Math.sin(a) * d * 230 * s + 40 * s, (50 + r() * 70) * s]); }
  for (let i = 0; i < 18; i++) clumps.push([x + (r() - 0.5) * 900 * s, cy + (r() * 0.6) * 90 * s, (40 + r() * 50) * s]);
  clumps.sort((p, q) => p[1] - q[1]);
  for (const [px, py, pr] of clumps) { circle(g, px, py - pr * 0.18, pr, alpha(M.rim, 0.06)); circle(g, px, py, pr, c); }
  g.save(); g.lineCap = 'round';
  for (let i = 0; i < 26; i++) { const rx = x + (r() - 0.5) * 760 * s, ry = GY - (420 + r() * 120) * s, len = (120 + r() * 260) * s, sw = Math.sin(t * 0.8 + i) * 8 * s;
    g.strokeStyle = alpha(c, 0.9); g.lineWidth = (2 + r() * 3) * s; g.beginPath(); g.moveTo(rx, ry); g.quadraticCurveTo(rx + sw, ry + len * 0.5, rx + sw * 1.6, ry + len); g.stroke(); }
  g.restore();
}
// giếng cổ (old stone well) — returns {rim} y of the opening
export function well(g, x, GY, M, { s = 1 } = {}) {
  const w = 230 * s, h = 110 * s, top = GY - h, stone = mix(M.wall, '#6a6a66', 0.4);
  g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(stone, 0.05), shade(stone, -0.5)]); g.fillRect(x - w / 2, top, w, h);
  for (let row = 0; row < 4; row++) for (let i = 0; i < 6; i++) { const bx = x - w / 2 + (i + (row % 2) * 0.5) * (w / 6), by = top + row * (h / 4);
    g.strokeStyle = alpha(M.dark, 0.6); g.lineWidth = 2; g.strokeRect(bx, by, w / 6, h / 4); }
  g.fillStyle = shade(stone, 0.15); g.beginPath(); g.ellipse(x, top, w / 2 + 8 * s, 26 * s, 0, 0, TAU); g.fill();
  g.fillStyle = '#020203'; g.beginPath(); g.ellipse(x, top + 2 * s, w / 2 - 14 * s, 16 * s, 0, 0, TAU); g.fill();
  seg(g, [[x - w / 2 + 10 * s, top], [x - w / 2 + 10 * s, top - 190 * s]], 12 * s, '#2a1c14'); seg(g, [[x + w / 2 - 10 * s, top], [x + w / 2 - 10 * s, top - 190 * s]], 12 * s, '#2a1c14');
  seg(g, [[x - w / 2, top - 186 * s], [x + w / 2, top - 186 * s]], 10 * s, '#2a1c14'); seg(g, [[x, top - 186 * s], [x, top - 60 * s]], 2 * s, '#8a7a60');
  g.fillStyle = '#3a2a1c'; rr(g, x - 18 * s, top - 60 * s, 36 * s, 34 * s, 4 * s); g.fill();
  return { rim: top };
}
// red paper lantern (đèn lồng) — swaying, glowing
export function lantern(g, x, y, t, { s = 1, color = '#c8161f', lit = 1, seed = 2 } = {}) {
  const f = flicker(t, { seed, drop: 0.06, min: 0.35, wobble: 0.15 }) * lit, sw = Math.sin(t * 1.1 + seed) * 0.06;
  g.save(); g.translate(x, y); g.rotate(sw); seg(g, [[0, -80 * s], [0, -40 * s]], 2 * s, '#1a1210');
  if (f > 0.02) glow(g, 0, 0, 200 * s * f, '#ff5a3a', 0.35 * f);
  g.fillStyle = radGrad(g, 0, 0, 4 * s, 48 * s, [mix(color, '#ffd08a', 0.55 * f), color, shade(color, -0.5)]); g.beginPath(); g.ellipse(0, 0, 46 * s, 40 * s, 0, 0, TAU); g.fill();
  for (let i = -2; i <= 2; i++) { g.strokeStyle = alpha('#3a0808', 0.5); g.lineWidth = 1.6 * s; g.beginPath(); g.ellipse(0, 0, Math.abs(i) * 11 * s + 1, 40 * s, 0, 0, TAU); g.stroke(); }
  g.fillStyle = '#d4a030'; g.fillRect(-20 * s, -44 * s, 40 * s, 8 * s); g.fillRect(-20 * s, 36 * s, 40 * s, 8 * s);
  seg(g, [[0, 44 * s], [noise(t, seed) * 4, 90 * s]], 4 * s, '#c8161f'); g.restore();
}
// nhà cổ mái ngói (old tile-roof house) front — returns {door} rect
export function oldHouse(g, x, GY, t, M, { s = 1, lit = 0.6, seed = 4, doorOpen = 0 } = {}) {
  const w = 760 * s, h = 300 * s, top = GY - h, wall = mix(M.wall, '#8a7a5a', 0.25);
  g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(wall, 0.05), shade(wall, -0.45)]); g.fillRect(x - w / 2, top, w, h);
  for (let i = 0; i < 9; i++) { const k = noise(i * 3.1, seed); g.fillStyle = alpha(M.dark, 0.12 + 0.1 * k); g.fillRect(x - w / 2 + i * (w / 9), top + (0.3 + 0.3 * k) * h, w / 12, h * 0.5); }
  const roof = '#3a1f18'; poly(g, [[x - w / 2 - 70 * s, top + 6 * s], [x - w / 2 + 60 * s, top - 150 * s], [x + w / 2 - 60 * s, top - 150 * s], [x + w / 2 + 70 * s, top + 6 * s]], roof);
  for (let i = 0; i < 22; i++) { const lx = x - w / 2 - 50 * s + i * (w + 100 * s) / 21; seg(g, [[lx, top + 2 * s], [lerp(lx, x, 0.12), top - 146 * s]], 3 * s, alpha('#1a0c08', 0.8)); }
  seg(g, [[x - w / 2 + 50 * s, top - 152 * s], [x + w / 2 - 50 * s, top - 152 * s]], 12 * s, '#24120c');
  const dw = 170 * s, dh = 220 * s, dx = x - dw / 2, dy = GY - dh;
  g.fillStyle = '#050404'; g.fillRect(dx, dy, dw, dh);
  const open = clamp(doorOpen); g.fillStyle = '#4a2a1a'; g.fillRect(dx, dy, dw / 2 * (1 - open * 0.8), dh); g.fillRect(dx + dw - dw / 2 * (1 - open * 0.8), dy, dw / 2 * (1 - open * 0.8), dh);
  seg(g, [[dx, dy], [dx + dw, dy]], 8 * s, '#24120c');
  const f = flicker(t, { seed, drop: 0.1 }) * lit;
  for (const sx of [-1, 1]) { const wx = x + sx * 240 * s - 60 * s, wy = top + 80 * s; g.fillStyle = f > 0.05 ? mix('#120a08', M.practical, 0.75 * f) : '#0a0606'; g.fillRect(wx, wy, 120 * s, 90 * s);
    if (f > 0.05) glow(g, wx + 60 * s, wy + 45 * s, 140 * s, M.practical, 0.25 * f); for (let i = 1; i < 5; i++) seg(g, [[wx + i * 24 * s, wy], [wx + i * 24 * s, wy + 90 * s]], 4 * s, '#24120c'); }
  return { door: [dx, dy, dw, dh] };
}

// ============================================================ the signature set: HẺM (Saigon alley at night), 2.5D
// hem(g, t, cam, {mood, lamp, depthEnd}) → {GY, M, lampX, lampY, f}. Far end of the alley is a dark vanishing point where things appear.
export function hem(g, t, cam = {}, { moodName = 'night', M = null, lamp = 1, seed = 11, endGlow = 0 } = {}) {
  M = M || mood(moodName);
  const GY = E.H * V(0.84, 0.74), VX = E.W / 2, VY = E.H * V(0.5, 0.46);
  const f = flicker(t, { seed, drop: 0.12, min: 0.08 }) * lamp, r = rng(seed);
  // far: end of the alley (depth 0.35)
  layer(g, cam, 0.35, (g) => {
    g.fillStyle = linGrad(g, 0, 0, 0, E.H, [M.sky[0], M.sky[M.sky.length - 1]]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    g.fillStyle = '#030306'; rr(g, VX - 90, VY - 160, 180, 260, 6); g.fill();
    if (endGlow > 0) glow(g, VX, VY - 30, 160, M.rim, endGlow * 0.4);
  });
  // mid: side walls converging to the vanishing point (depth 0.7) with doors, AC units, wires
  layer(g, cam, 0.7, (g) => {
    for (const sd of [-1, 1]) {
      const x0 = sd < 0 ? -E.W * 0.15 : E.W * 1.15, xa = VX + sd * 90;
      g.fillStyle = linGrad(g, x0, 0, xa, 0, [shade(M.wall, -0.15), shade(M.wall, -0.65)]);
      g.beginPath(); g.moveTo(x0, -E.H * 0.2); g.lineTo(xa, VY - 220); g.lineTo(xa, VY + 100); g.lineTo(x0, GY + E.H * 0.3); g.closePath(); g.fill();
      for (let i = 0; i < 5; i++) { const u = 0.12 + i * 0.17, px = lerp(x0, xa, u), sc = 1 - u * 0.85, dh = 230 * sc, dyb = lerp(GY + E.H * 0.3, VY + 100, u) - 10 * sc;
        g.fillStyle = alpha('#0a0708', 0.85); g.fillRect(px - 50 * sc * sd - (sd < 0 ? 0 : 0), dyb - dh, 70 * sc * -sd, dh);
        if (i === 2) { g.fillStyle = alpha(M.practical, 0.25 * f); g.fillRect(px - 50 * sc * sd, dyb - dh * 0.95, 70 * sc * -sd, dh * 0.08); }
        g.fillStyle = shade(M.wall, -0.3); g.fillRect(px - 20 * sc, lerp(-E.H * 0.2, VY - 220, u) + 90 * sc, 64 * sc * -sd, 40 * sc); }
    }
    g.save(); g.lineCap = 'round'; for (let i = 0; i < 9; i++) { const y0 = VY - 380 + r() * 160, y1 = VY - 380 + r() * 160, sag = 40 + r() * 70;
      g.strokeStyle = alpha('#050407', 0.85); g.lineWidth = 2 + r() * 2.5; g.beginPath(); g.moveTo(-E.W * 0.1, y0); g.quadraticCurveTo(VX + noise(t * 0.3 + i, 2) * 6, Math.max(y0, y1) + sag, E.W * 1.1, y1); g.stroke(); }
    g.restore();
  });
  // floor (depth 1)
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, VY + 100, 0, E.H * 1.3, [shade(M.floor, -0.6), shade(M.floor, 0.05)]);
    g.beginPath(); g.moveTo(VX - 90, VY + 100); g.lineTo(VX + 90, VY + 100); g.lineTo(E.W * 1.6, E.H * 1.4); g.lineTo(-E.W * 0.6, E.H * 1.4); g.closePath(); g.fill();
    for (let i = 0; i < 7; i++) { const u = i / 7; seg(g, [[lerp(VX - 90, -E.W * 0.6, u * u) + 40, lerp(VY + 100, E.H * 1.4, u * u)], [lerp(VX + 90, E.W * 1.6, u * u) - 40, lerp(VY + 100, E.H * 1.4, u * u)]], 1.5, alpha(M.dark, 0.4)); }
    // puddle reflecting the lamp
    g.fillStyle = alpha(M.practical, 0.12 * f); g.beginPath(); g.ellipse(VX + V(260, 120), GY + 30, V(220, 160), 22, 0, 0, TAU); g.fill();
  });
  // practical: one buzzing street lamp on the right wall (depth 0.85)
  const lampX = VX + V(300, 170), lampY = VY - V(230, 300);
  layer(g, cam, 0.85, (g) => {
    seg(g, [[lampX + 80, lampY - 10], [lampX + 10, lampY]], 6, '#0c0a0c'); rr(g, lampX - 26, lampY - 4, 52, 16, 6); g.fillStyle = '#141014'; g.fill();
    if (f > 0.03) { glow(g, lampX, lampY + 14, 280, M.practical, 0.45 * f);
      g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, lampX, lampY + 14, 0, 700, [alpha(M.practical, 0.2 * f), alpha(M.practical, 0)]);
      g.beginPath(); g.moveTo(lampX - 20, lampY + 14); g.lineTo(lampX - 340, GY + 80); g.lineTo(lampX + 300, GY + 80); g.lineTo(lampX + 20, lampY + 14); g.closePath(); g.fill(); g.restore(); }
  });
  return { GY, M, VX, VY, lampX, lampY: lampY + 14, f };
}

// ============================================================ overlays
// VHS / found-footage: scanlines, tracking band, REC + timestamp. Call last (stage level).
export function vhs(g, t, { stamp = '', rec = true, a = 1, seed = 2, lang = 'en' } = {}) {
  g.save(); g.globalAlpha = a;
  g.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = 0; y < E.H; y += 4) g.fillRect(0, y, E.W, 1.6);
  const by = ((t * 0.23 + noise(seed, 1)) % 1.2) * E.H * 1.1 - 60; g.fillStyle = linGrad(g, 0, by - 40, 0, by + 40, ['rgba(255,255,255,0)', 'rgba(255,255,255,0.07)', 'rgba(255,255,255,0)']); g.fillRect(0, by - 40, E.W, 80);
  const r = rng(Math.floor(t * 24) + seed); for (let i = 0; i < 18; i++) { g.fillStyle = `rgba(255,255,255,${0.04 + r() * 0.08})`; g.fillRect(r() * E.W, by + (r() - 0.5) * 60, 30 + r() * 160, 2); }
  const pad = V(70, 60), sz = V(40, 46);
  if (rec) { if ((t % 1.2) < 0.75) circle(g, pad + 12, pad + 14, 13, '#ff2a2a'); text(g, 'REC', pad + 36, pad + 15, { size: sz, font: FONTS.ui, weight: 900, align: 'left', color: '#f4f4f4' }); }
  if (stamp) text(g, stamp, pad, E.H - pad, { size: sz, font: FONTS.ui, weight: 800, align: 'left', color: '#f4f4f4', alpha: 0.9 });
  g.restore();
}
// short burst of TV static (deterministic) for cuts / signal loss
export function staticBurst(g, t, { a = 0.6, cell = 8, seed = 4 } = {}) {
  const r = rng(Math.floor(t * 24) * 13 + seed); g.save(); g.globalAlpha = a;
  for (let y = 0; y < E.H; y += cell * 3) for (let x = 0; x < E.W; x += cell * 3) { const v = (r() * 255) | 0; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, y, cell * 3, cell * 3); }
  g.restore();
}

// ============================================================ titles & cards
// horror title card: letters jitter in with a red underglow. Use fonts with full Vietnamese glyphs (Nunito 900 / Playfair italic).
export function horrorTitle(g, t, { text: str = '', sub = '', y = E.H * 0.46, color = '#f3ece4', accent = '#d1121f', size = V(118, 104), seed = 3 } = {}) {
  const k = ease.out(prog(t, 0, 0.9)); const jx = noise(t * 18, seed) * 4 * (1 - k * 0.7), jy = noise(t * 15, seed + 1) * 3;
  glow(g, E.W / 2, y + 30, E.W * 0.45, accent, 0.18 * k);
  text(g, str, E.W / 2 + jx, y + jy, { size, font: FONTS.ui, weight: 900, color, alpha: k, glow: 28, glowColor: alpha(accent, 0.9), spacing: 2 });
  seg(g, [[E.W / 2 - E.W * 0.3 * k, y + size * 0.62], [E.W / 2 + E.W * 0.3 * k, y + size * 0.62]], 4, alpha(accent, 0.9 * k));
  if (sub) text(g, sub, E.W / 2, y + size * 1.15, { size: size * 0.36, font: FONTS.ui, weight: 800, color: alpha(color, 0.85), alpha: ease.out(prog(t, 0.5, 1.3)), spacing: 6 });
}
// "QUY TẮC SỐ 1" rule card (rules-horror format): torn paper note with handwritten-feel serif
export function ruleCard(g, t, { n = 1, label = 'QUY TẮC SỐ', body = '', x = E.W / 2, y = E.H * 0.45, w = V(980, 900), seed = 5 } = {}) {
  const k = ease.outBack(prog(t, 0, 0.5)); g.save(); g.translate(x, y); g.rotate(-0.025 + noise(seed, 2) * 0.02); g.scale(k, k);
  const h = w * 0.5; g.fillStyle = '#e8dcc0'; g.beginPath(); g.moveTo(-w / 2, -h / 2); for (let i = 0; i <= 20; i++) g.lineTo(-w / 2 + (w * i) / 20, -h / 2 + noise(i, seed) * 6); g.lineTo(w / 2, h / 2); for (let i = 20; i >= 0; i--) g.lineTo(-w / 2 + (w * i) / 20, h / 2 + noise(i + 40, seed) * 7); g.closePath(); g.fill();
  g.fillStyle = alpha('#6a4a20', 0.15); g.fillRect(-w / 2, -h / 2, w, h);
  text(g, `${label} ${n}`, 0, -h * 0.22, { size: w * 0.075, font: FONTS.ui, weight: 900, color: '#8a0c12', spacing: 3 });
  const words = body.split(' '), lines = []; let cur = ''; for (const wd of words) { if ((cur + ' ' + wd).length > 30) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; } if (cur) lines.push(cur);
  lines.slice(0, 3).forEach((ln, i) => text(g, ln, 0, -h * 0.02 + i * w * 0.07, { size: w * 0.055, font: FONTS.serif, weight: 900, italic: true, color: '#1a1410', alpha: ease.out(prog(t, 0.3 + i * 0.25, 0.8 + i * 0.25)) }));
  g.restore();
}
// glowing digital clock (02:17 is the house time of Hẻm Chuyện Lạ stories)
export function clockStamp(g, t, { str = '02:17', x = E.W / 2, y = E.H * 0.4, size = V(160, 150), color = '#ff3030' } = {}) {
  const parts = str.split(':'), blink = (t % 1) < 0.55; const shown = parts.join(blink ? ':' : ' ');
  glow(g, x, y, size * 2, color, 0.22); text(g, shown, x, y, { size, font: FONTS.ui, weight: 900, color, glow: 30, glowColor: alpha(color, 0.9), spacing: 8 });
}
// lower-third chapter tag for compilations: "CHUYỆN SỐ 2 — Tiệm giặt ủi"
export function chapterTag(g, t, { n = 1, label = 'CHUYỆN SỐ', title = '', accent = '#d1121f' } = {}) {
  const k = ease.out(prog(t, 0, 0.6)), x = V(110, 70), y = E.H * V(0.8, 0.78);
  g.save(); g.globalAlpha = k; seg(g, [[x, y - 50], [x, y + 50]], 8, accent);
  text(g, `${label} ${n}`, x + 30 + (1 - k) * 40, y - 22, { size: V(40, 44), font: FONTS.ui, weight: 900, align: 'left', color: accent, spacing: 4 });
  text(g, title, x + 30 + (1 - k) * 60, y + 26, { size: V(64, 66), font: FONTS.ui, weight: 900, align: 'left', color: '#f3ece4' }); g.restore();
}

// ============================================================ thumbnail helpers (tools/make_thumb.py)
// thumbText(g, {lines:['ĐỪNG', 'MỞ CỬA'], x, y, align, size, accent}) — huge outlined words, last line in the accent colour.
// Keep it to 2–4 words total; never repeat the title word for word (the thumbnail and the title tell two halves of one hook).
export function thumbText(g, { lines = [], x = E.W * 0.06, y = E.H * 0.2, align = 'left', size = 150, color = '#ffffff', accent = '#ff2a2a', tilt = -0.03 } = {}) {
  g.save(); g.translate(x, y); g.rotate(tilt);
  lines.forEach((ln, i) => { const last = i === lines.length - 1, sz = size * (last ? 1.12 : 1);
    text(g, ln, 0, i * size * 1.02, { size: sz, font: FONTS.ui, weight: 900, align, color: last ? accent : color, stroke: sz * 0.16, strokeColor: '#000000', glow: last ? 30 : 0, glowColor: alpha(accent, 0.9) }); });
  g.restore();
}
// red attention arrow / circle used on thumbnails (point at the thing in the dark)
export function thumbArrow(g, x0, y0, x1, y1, { color = '#ff2a2a', w = 18 } = {}) {
  seg(g, [[x0, y0], [x1, y1]], w + 10, '#000000'); seg(g, [[x0, y0], [x1, y1]], w, color);
  const a = Math.atan2(y1 - y0, x1 - x0), L = w * 3.2;
  poly(g, [[x1 + Math.cos(a) * L * 0.4, y1 + Math.sin(a) * L * 0.4], [x1 - Math.cos(a - 0.5) * L, y1 - Math.sin(a - 0.5) * L], [x1 - Math.cos(a + 0.5) * L, y1 - Math.sin(a + 0.5) * L]], color);
}
export function thumbCircle(g, x, y, r, { color = '#ff2a2a', w = 14 } = {}) { ring(g, x, y, r, w + 8, '#000000'); ring(g, x, y, r, w, color); }
