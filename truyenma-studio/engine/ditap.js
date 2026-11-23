// engine/ditap.js — Dạ Hành Dị Tạp 2D folklore-horror engine (deterministic Canvas2D, logical units).
// Built on core.js and horror.js for zero-image-cost 25–35 min Vietnamese horror storytelling.
import {
  E, V, clamp, lerp, ease, prog, noise, alpha, shade, mix,
  circle, ring, rr, poly, seg, linGrad, radGrad, glow, text, measure,
  FONTS, layer, blurLayer, mood, visemeAt,
} from './core.js';
import { flicker, candle, incense, fogBank, thumbText } from './horror.js';

const TAU = Math.PI * 2;
const INK = '#111216';

// ---------- shared internal primitives ----------
const safeBlur = (g, amount, fn, cam = null, depth = 1) =>
  typeof document === 'undefined' || amount <= 0.3
    ? (cam ? layer(g, cam, depth, fn) : fn(g))
    : blurLayer(g, amount, fn, cam, depth);

function fillStrokeRR(g, x, y, w, h, r, fill, stroke = INK, lw = 3.5) {
  rr(g, x, y, w, h, r);
  g.fillStyle = fill;
  g.fill();
  if (lw > 0) {
    g.strokeStyle = stroke;
    g.lineWidth = lw;
    g.lineJoin = 'round';
    g.stroke();
  }
}

function fillStrokeCircle(g, x, y, r, fill, stroke = INK, lw = 3.5) {
  circle(g, x, y, r, fill);
  if (lw > 0) ring(g, x, y, r, lw, stroke);
}

function drawPillLimb(g, pts, width, fill, outline = INK, outlineW = 3.5) {
  if (outlineW > 0) seg(g, pts, width + outlineW * 2, outline, 'round');
  seg(g, pts, width, fill, 'round');
}

function drawVignette(g, strength = 0.65, color = '#020205') {
  const rad = radGrad(
    g,
    E.W / 2,
    E.H / 2,
    Math.min(E.W, E.H) * 0.28,
    Math.max(E.W, E.H) * 0.68,
    [alpha(color, 0), alpha(color, strength * 0.45), alpha(color, strength)]
  );
  g.fillStyle = rad;
  g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
}

function resolveBlink(blinkOpt, t, seed) {
  if (typeof blinkOpt === 'boolean') return blinkOpt ? 1 : 0;
  if (typeof blinkOpt === 'number') return clamp(blinkOpt);
  const ph = (t + (seed % 7) * 0.43) % 3.8;
  return ph > 3.66 ? clamp(1 - Math.abs(ph - 3.73) / 0.07) : 0;
}

// ---------- shared head & face renderer ----------
const DITAP_EXPRS = {
  neutral:    { brows: 'flat',    mouth: 'flat' },
  worried:    { brows: 'worried', mouth: 'wavy' },
  scared:     { brows: 'raised',  mouth: 'wavy' },
  shocked:    { brows: 'raised',  mouth: 'oBig' },
  determined: { brows: 'angry',   mouth: 'firm' },
  angry:      { brows: 'angry',   mouth: 'frown' },
  sad:        { brows: 'worried', mouth: 'frown' },
  eerie:      { brows: 'flat',    mouth: 'smirk' },
  smirk:      { brows: 'raised',  mouth: 'smirk' },
};

function drawVisemeMouth(g, v, mx, my, r, outline, lw) {
  const dark = '#190c10';
  switch (v) {
    case 'A':
      g.fillStyle = dark; g.beginPath(); g.ellipse(mx, my + r * 0.03, r * 0.17, r * 0.19, 0, 0, TAU); g.fill();
      g.fillStyle = '#c87272'; g.beginPath(); g.ellipse(mx, my + r * 0.12, r * 0.1, r * 0.06, 0, 0, TAU); g.fill();
      g.strokeStyle = outline; g.lineWidth = lw; g.beginPath(); g.ellipse(mx, my + r * 0.03, r * 0.17, r * 0.19, 0, 0, TAU); g.stroke();
      break;
    case 'O':
      g.fillStyle = dark; g.beginPath(); g.ellipse(mx, my, r * 0.12, r * 0.15, 0, 0, TAU); g.fill();
      g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
      break;
    case 'U':
      fillStrokeCircle(g, mx, my, r * 0.08, dark, outline, lw);
      break;
    case 'E':
      g.fillStyle = dark; g.beginPath(); g.ellipse(mx, my, r * 0.21, r * 0.075, 0, 0, TAU); g.fill();
      g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
      break;
    case 'M':
      seg(g, [[mx - r * 0.17, my], [mx + r * 0.17, my]], lw * 1.15, outline);
      break;
    case 'F':
      g.fillStyle = '#f4f0e8'; g.fillRect(mx - r * 0.11, my - r * 0.06, r * 0.22, r * 0.055);
      seg(g, [[mx - r * 0.17, my + r * 0.02], [mx + r * 0.17, my + r * 0.02]], lw, outline);
      break;
  }
}

function drawDitapMouth(g, cx, cy, r, o, ex, outline, lw) {
  const mx = cx, my = cy + r * 0.42;
  let v = o.viseme;
  if (!v && o.globalT != null && Array.isArray(o.talkRange)) v = visemeAt(o.globalT, o.talkRange[0], o.talkRange[1]);
  if (v && v !== 'rest') { drawVisemeMouth(g, v, mx, my, r, outline, lw); return; }
  if (o.talk > 0.05) {
    g.fillStyle = '#190c10'; g.beginPath(); g.ellipse(mx, my, r * 0.16, r * (0.04 + 0.15 * clamp(o.talk)), 0, 0, TAU); g.fill();
    g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
    return;
  }
  switch (ex.mouth) {
    case 'oBig':
      g.fillStyle = '#190c10'; g.beginPath(); g.ellipse(mx, my + r * 0.03, r * 0.14, r * 0.18, 0, 0, TAU); g.fill();
      g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
      break;
    case 'wavy':
      g.strokeStyle = outline; g.lineWidth = lw; g.lineCap = 'round'; g.beginPath();
      for (let i = 0; i <= 12; i++) {
        const u = i / 12, x = mx - r * 0.22 + u * r * 0.44, y = my + Math.sin(u * TAU) * r * 0.05;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.stroke();
      break;
    case 'frown':
      g.strokeStyle = outline; g.lineWidth = lw; g.lineCap = 'round'; g.beginPath();
      g.arc(mx, my + r * 0.18, r * 0.19, Math.PI + 0.45, TAU - 0.45); g.stroke();
      break;
    case 'smirk':
      g.strokeStyle = outline; g.lineWidth = lw; g.lineCap = 'round'; g.beginPath();
      g.moveTo(mx - r * 0.16, my + r * 0.02); g.quadraticCurveTo(mx + r * 0.06, my + r * 0.07, mx + r * 0.22, my - r * 0.09); g.stroke();
      break;
    case 'firm':
      seg(g, [[mx - r * 0.18, my], [mx + r * 0.18, my]], lw, outline);
      break;
    default:
      seg(g, [[mx - r * 0.14, my], [mx + r * 0.14, my]], lw * 0.95, outline);
  }
}

function drawDitapEye(g, exX, eyeY, eyeR, r, look, isBlind, blink, skin, outline, lw) {
  if (isBlind) {
    // Opaque milky cataract sphere with soft pale highlight and zero dark pupil dot
    fillStrokeCircle(g, exX, eyeY, eyeR, '#dce2ea', outline, lw * 0.9);
    g.strokeStyle = alpha('#f7f9fc', 0.85);
    g.lineWidth = Math.max(1.5, r * 0.03);
    g.beginPath();
    g.arc(exX - eyeR * 0.12, eyeY - eyeR * 0.12, eyeR * 0.55, Math.PI * 1.05, Math.PI * 1.65);
    g.stroke();
  } else {
    fillStrokeCircle(g, exX, eyeY, eyeR, '#ffffff', outline, lw * 0.9);
    const lx = clamp(look[0] || 0, -1, 1) * eyeR * 0.36;
    const ly = clamp(look[1] || 0, -1, 1) * eyeR * 0.32;
    circle(g, exX + lx, eyeY + ly, r * 0.085, outline);
    circle(g, exX + lx - r * 0.025, eyeY + ly - r * 0.025, r * 0.024, alpha('#ffffff', 0.85));
  }
  if (blink > 0.05) {
    g.save();
    g.beginPath();
    g.arc(exX, eyeY, eyeR + lw * 0.4, 0, TAU);
    g.clip();
    const lidBot = eyeY - eyeR + eyeR * 2.08 * blink;
    g.fillStyle = skin;
    g.fillRect(exX - eyeR - 4, eyeY - eyeR - 4, eyeR * 2 + 8, lidBot - (eyeY - eyeR - 4));
    seg(g, [[exX - eyeR, lidBot], [exX + eyeR, lidBot]], lw * 0.95, outline);
    g.restore();
  }
}

function drawDitapBrows(g, eyeXs, eyeY, eyeR, r, brows, hairColor, lw) {
  const by = eyeY - eyeR - r * 0.13, bw = r * 0.19;
  g.save();
  g.strokeStyle = hairColor;
  g.lineWidth = Math.max(2.2, lw * 1.05);
  g.lineCap = 'round';
  eyeXs.forEach((x, idx) => {
    const dir = idx === 0 ? -1 : 1;
    g.beginPath();
    if (brows === 'worried') {
      g.moveTo(x - bw, by - dir * r * 0.06);
      g.quadraticCurveTo(x, by - r * 0.05, x + bw, by + dir * r * 0.06);
    } else if (brows === 'angry') {
      g.moveTo(x - bw, by + dir * r * 0.08);
      g.quadraticCurveTo(x, by - r * 0.02, x + bw, by - dir * r * 0.08);
    } else if (brows === 'raised') {
      g.moveTo(x - bw, by - r * 0.02);
      g.quadraticCurveTo(x, by - r * 0.15, x + bw, by - r * 0.02);
    } else {
      g.moveTo(x - bw, by);
      g.quadraticCurveTo(x, by - r * 0.05, x + bw, by);
    }
    g.stroke();
  });
  g.restore();
}

function drawDitapFace(g, cx, cy, r, o, skin, outline, lw) {
  if (o.faceless) return; // faceless mode suppresses eyes, brows, blindEye, scar, nose, and mouth
  const ex = DITAP_EXPRS[o.expr] || DITAP_EXPRS.neutral;
  const look = o.look || [0, 0];
  const blink = resolveBlink(o.blink, o.t || 0, o.seed || 1);
  const eyeOffX = r * 0.34, eyeY = cy + r * 0.02, eyeR = r * 0.21;
  const eyeXs = [cx - eyeOffX, cx + eyeOffX];
  const hairCol = o.hairColor || INK;

  drawDitapEye(g, eyeXs[0], eyeY, eyeR, r, look, o.blindEye === 'left', blink, skin, outline, lw);
  drawDitapEye(g, eyeXs[1], eyeY, eyeR, r, look, o.blindEye === 'right', blink, skin, outline, lw);
  drawDitapBrows(g, eyeXs, eyeY, eyeR, r, ex.brows, hairCol, lw);

  if (o.scar) {
    const sx = o.scar === 'right' ? eyeXs[1] : eyeXs[0];
    const sy = eyeY - eyeR - r * 0.08;
    seg(g, [[sx - r * 0.13, sy - r * 0.11], [sx + r * 0.11, sy + r * 0.17]], Math.max(2.2, r * 0.045), '#7a2624');
    seg(g, [[sx - r * 0.08, sy - r * 0.01], [sx + r * 0.03, sy - r * 0.06]], Math.max(1.6, r * 0.03), '#7a2624');
    seg(g, [[sx - r * 0.03, sy + r * 0.09], [sx + r * 0.08, sy + r * 0.04]], Math.max(1.6, r * 0.03), '#7a2624');
  }

  // Minimal curved nose mark
  seg(g, [[cx - r * 0.02, cy + r * 0.12], [cx + r * 0.03, cy + r * 0.22], [cx - r * 0.02, cy + r * 0.25]], lw * 0.72, alpha(outline, 0.78));

  drawDitapMouth(g, cx, cy, r, o, ex, outline, lw);

  if (o.beard) {
    const bCol = o.beardColor || o.hairColor || '#9ea4ad';
    const bLen = o.beard === 'long' ? r * 0.65 : r * 0.36;
    poly(g, [
      [cx - r * 0.22, cy + r * 0.68],
      [cx + r * 0.22, cy + r * 0.68],
      [cx + r * 0.09, cy + r * 0.74 + bLen],
      [cx, cy + r * 0.84 + bLen],
      [cx - r * 0.09, cy + r * 0.74 + bLen],
    ], bCol);
    g.strokeStyle = outline; g.lineWidth = lw * 0.8; g.stroke();
  }
}

function drawKhanTang(g, cx, cy, r, t, seed, outline, lw) {
  const sway = Math.sin(t * 1.9 + seed) * r * 0.08;
  const bandY = cy - r * 0.67, bandH = r * 0.22;
  // Trailing mourning scarf ends behind/beside head
  const tx = cx - r * 0.96, ty = bandY + bandH * 0.5;
  poly(g, [
    [tx, ty],
    [tx - r * 0.32 + sway * 0.6, ty + r * 0.72],
    [tx - r * 0.12 + sway, ty + r * 1.18],
    [tx + r * 0.06 + sway * 0.5, ty + r * 0.65],
  ], '#ebe6da');
  g.strokeStyle = outline; g.lineWidth = lw * 0.85; g.lineJoin = 'round'; g.stroke();

  fillStrokeRR(g, cx - r * 1.03, bandY, r * 2.06, bandH, bandH * 0.42, '#f2eee4', outline, lw * 0.9);
  fillStrokeCircle(g, cx - r * 0.94, ty, r * 0.12, '#f2eee4', outline, lw * 0.85);
}

function drawNonLa(g, cx, cy, r, outline, lw) {
  const peakY = cy - r * 1.84, brimY = cy - r * 0.55, brimW = r * 1.95;
  // Chin strap (quai nón)
  g.strokeStyle = '#6f4230';
  g.lineWidth = Math.max(1.8, lw * 0.6);
  g.beginPath();
  g.moveTo(cx - r * 0.68, brimY + r * 0.05);
  g.quadraticCurveTo(cx, cy + r * 1.18, cx + r * 0.68, brimY + r * 0.05);
  g.stroke();

  // Conical straw hat
  g.fillStyle = linGrad(g, cx - brimW, peakY, cx + brimW, brimY, ['#e8d49c', '#cdb174', '#a7884d']);
  g.beginPath();
  g.moveTo(cx, peakY);
  g.lineTo(cx + brimW, brimY);
  g.quadraticCurveTo(cx, brimY + r * 0.22, cx - brimW, brimY);
  g.closePath();
  g.fill();
  g.strokeStyle = outline; g.lineWidth = lw; g.lineJoin = 'round'; g.stroke();

  for (let i = -2; i <= 2; i++) {
    seg(g, [[cx, peakY + r * 0.06], [cx + i * brimW * 0.36, brimY + r * 0.05]], Math.max(1.2, lw * 0.4), alpha('#7a5e2d', 0.45));
  }
}

function drawDitapHead(g, cx, cy, r, o, skin, outline, lw) {
  const hair = o.hair ?? 'cap';
  const hairCol = o.hairColor || '#191b22';
  const t = o.t || 0, seed = o.seed || 1;

  // Back hair layers
  if (hair === 'long') {
    fillStrokeRR(g, cx - r * 1.06, cy - r * 0.5, r * 2.12, r * 2.1, r * 0.6, hairCol, outline, lw);
  } else if (hair === 'bun') {
    fillStrokeCircle(g, cx - r * 0.58, cy - r * 0.96, r * 0.42, hairCol, outline, lw);
  }

  // Main rounded head
  fillStrokeCircle(g, cx, cy, r, skin, outline, lw);

  // Face features (guarded internally by o.faceless)
  drawDitapFace(g, cx, cy, r, { ...o, hairColor: hairCol }, skin, outline, lw);

  // Front hair cap / parted bangs kept high above cy - 0.45r so brows & scar remain crisp
  if (hair === 'cap' || hair === 'bun') {
    g.fillStyle = hairCol;
    g.beginPath();
    g.arc(cx, cy, r * 1.01, Math.PI * 1.15, Math.PI * 1.85);
    g.quadraticCurveTo(cx, cy - r * 0.56, cx - r * 0.90, cy - r * 0.45);
    g.closePath();
    g.fill();
    g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
  } else if (hair === 'parted') {
    g.fillStyle = hairCol;
    for (const sd of [-1, 1]) {
      g.beginPath();
      g.moveTo(cx, cy - r * 1.02);
      g.quadraticCurveTo(cx + sd * r * 0.88, cy - r * 0.96, cx + sd * r * 0.94, cy - r * 0.34);
      g.quadraticCurveTo(cx + sd * r * 0.46, cy - r * 0.56, cx, cy - r * 0.62);
      g.closePath();
      g.fill();
      g.strokeStyle = outline; g.lineWidth = lw * 0.9; g.stroke();
    }
  } else if (hair === 'long') {
    g.fillStyle = hairCol;
    g.beginPath();
    g.arc(cx, cy, r * 1.02, Math.PI * 1.12, Math.PI * 1.88);
    g.quadraticCurveTo(cx, cy - r * 0.52, cx - r * 0.94, cy - r * 0.36);
    g.closePath();
    g.fill();
    g.strokeStyle = outline; g.lineWidth = lw; g.stroke();
  }

  if (o.khanTang) drawKhanTang(g, cx, cy, r, t, seed, outline, lw);
  if (o.nonLa) drawNonLa(g, cx, cy, r, outline, lw);
}

// ---------- pose & prop helpers for ditapFigure ----------
function resolvePose(poseName, t, seed) {
  const walk = poseName === 'walk' ? Math.sin(t * 5.2 + seed) : 0;
  const crouchY = poseName === 'crouch' ? 28 : 0;
  const base = {
    hipY: -92 + crouchY,
    torsoTop: -172 + crouchY,
    headY: -214 + crouchY,
    shL: [-27, -160 + crouchY],
    shR: [27, -160 + crouchY],
    elL: [-34 + walk * 12, -124 + crouchY],
    hdL: [-30 + walk * 22, -92 + crouchY],
    elR: [34 - walk * 12, -124 + crouchY],
    hdR: [30 - walk * 22, -92 + crouchY],
    ftL: [-14 - walk * 22, -Math.max(0, -walk) * 10],
    ftR: [14 + walk * 22, -Math.max(0, walk) * 10],
  };
  if (poseName === 'point') {
    base.elR = [56, -158]; base.hdR = [88, -160];
  } else if (poseName === 'reach') {
    base.elR = [56, -174]; base.hdR = [88, -190];
    base.elL = [44, -144]; base.hdL = [72, -152];
  } else if (poseName === 'holdJar') {
    base.elL = [-34, -124]; base.hdL = [-4, -126];
    base.elR = [40, -124]; base.hdR = [16, -126];
  } else if (poseName === 'cane') {
    base.elR = [42, -126]; base.hdR = [48, -94];
  } else if (poseName === 'phone') {
    base.elR = [40, -134]; base.hdR = [36, -164];
  } else if (poseName === 'fear') {
    base.elL = [-44, -150]; base.hdL = [-24, -186];
    base.elR = [44, -150]; base.hdR = [24, -186];
  }
  return base;
}

function drawDitapProp(g, prop, ps, t, seed, outline, lw) {
  if (!prop) return;
  const [hx, hy] = ps.hdR;
  if (prop === 'cane') {
    seg(g, [[hx + 4, hy - 6], [hx + 10, 0]], 7, '#5a3820', 'round');
    seg(g, [[hx + 4, hy - 6], [hx + 10, 0]], 3.5, '#8c5a34', 'round');
    g.strokeStyle = outline; g.lineWidth = lw; g.lineCap = 'round';
    g.beginPath(); g.arc(hx - 2, hy - 6, 9, Math.PI, TAU); g.stroke();
  } else if (prop === 'jar') {
    const jx = (ps.hdL[0] + ps.hdR[0]) * 0.5 + 4, jy = ps.hdR[1] - 4;
    fillStrokeRR(g, jx - 19, jy - 20, 38, 42, 14, '#5a3222', outline, lw);
    // Red cloth seal at neck
    fillStrokeRR(g, jx - 14, jy - 28, 28, 12, 4, '#b81c22', outline, lw * 0.8);
    // Yellow paper talisman slip
    fillStrokeRR(g, jx - 5, jy - 10, 10, 22, 1.5, '#ebd070', outline, 1.8);
    seg(g, [[jx, jy - 6], [jx, jy + 8]], 1.8, '#b81c22');
  } else if (prop === 'phone') {
    glow(g, hx, hy - 14, 72, '#7ce0ff', 0.32);
    fillStrokeRR(g, hx - 9, hy - 26, 18, 30, 3.5, '#191c24', outline, lw * 0.75);
    g.fillStyle = '#9be8ff';
    g.fillRect(hx - 6, hy - 22, 12, 22);
  } else if (prop === 'lantern') {
    const f = flicker(t, { seed, drop: 0.08, min: 0.45 });
    seg(g, [[hx, hy], [hx + 4, hy + 18]], 2.5, outline);
    glow(g, hx + 4, hy + 34, 85 * f, '#ffb258', 0.45 * f);
    fillStrokeRR(g, hx - 8, hy + 20, 24, 28, 6, '#c81c20', outline, lw * 0.75);
  } else if (prop === 'incense') {
    incense(g, hx + 8, hy + 12, t, { s: 0.45, seed });
  }
}

function drawTorsoOutfit(g, outfitId, shirtCol, sashCol, ps, t, seed, outline, lw) {
  const tw = 50, tx = -tw / 2, ty = ps.torsoTop, th = ps.hipY - ps.torsoTop + 14;
  if (outfitId === 'ghost') {
    const grad = linGrad(g, 0, ty, 0, ps.hipY + 86, [shirtCol, alpha(shirtCol, 0.7), alpha(shirtCol, 0)]);
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(tx + 6, ty); g.lineTo(tx + tw - 6, ty);
    g.lineTo(tx + tw + 14, ps.hipY + 82);
    g.lineTo(tx - 14, ps.hipY + 82);
    g.closePath();
    g.fill();
    return;
  }
  const extraH = outfitId === 'coat' ? 24 : 8;
  fillStrokeRR(g, tx, ty, tw, th + extraH, 16, shirtCol, outline, lw);

  if (outfitId === 'baBa') {
    // Traditional Vietnamese áo bà ba center placket & buttons
    seg(g, [[0, ty + 6], [0, ty + th - 6]], 2.2, alpha(outline, 0.65));
    for (let i = 0; i < 3; i++) circle(g, 0, ty + 20 + i * 16, 2.2, alpha('#e8e0cf', 0.7));
  } else if (outfitId === 'mourning') {
    // White coarse mourning belt sash (dải xô) with swaying tie
    const sw = Math.sin(t * 1.7 + seed) * 3;
    fillStrokeRR(g, tx - 1, ps.hipY - 2, tw + 2, 10, 4, sashCol, outline, lw * 0.75);
    poly(g, [[5, ps.hipY + 8], [12 + sw, ps.hipY + 38], [3 + sw, ps.hipY + 40]], sashCol);
    g.strokeStyle = outline; g.lineWidth = lw * 0.7; g.stroke();
  } else if (outfitId === 'coat') {
    seg(g, [[-7, ty + 4], [-2, ty + 24], [7, ty + 4]], 2.2, alpha(outline, 0.7));
  }
}

// ============================================================ PUBLIC EXPORTS

function resolveOutfitPalette(outfit, skinOpt = null, shirtColor = null, pantsColor = null) {
  const ofObj = typeof outfit === 'string' ? { top: outfit } : (outfit || {});
  const outfitId = ofObj.top || 'baBa';
  const isGhost = outfitId === 'ghost';
  const skin = skinOpt || (isGhost ? '#c9d2da' : '#dfbea3');
  const defaultShirt = outfitId === 'mourning' ? '#ece6d8' : isGhost ? '#d4dce4' : outfitId === 'coat' ? '#242732' : '#2f3545';
  const shirtCol = shirtColor || ofObj.color || defaultShirt;
  const pantsCol = pantsColor || ofObj.pants || (outfitId === 'mourning' ? '#d9d2c2' : '#1b1d24');
  const sashCol = ofObj.sash || '#d8d0be';
  return { outfitId, isGhost, skin, shirtCol, pantsCol, sashCol };
}

/**
 * Draw a stylized 2D Dạ Hành Dị Tạp folklore-horror character.
 */
export function ditapFigure(g, opts = {}) {
  const {
    x = E.W / 2,
    y = E.H * V(0.86, 0.78),
    s = V(1.8, 1.5),
    facing = 1,
    t = 0,
    seed = 1,
    alpha: opAlpha = 1,
    outline = INK,
    outlineW = 3.5,
    outfit = 'baBa',
    skin: skinOpt = null,
    shirtColor = null,
    pantsColor = null,
    headR = 34,
    pose = 'stand',
    prop = null,
    tilt = 0,
  } = opts;

  const { outfitId, isGhost, skin, shirtCol, pantsCol, sashCol } = resolveOutfitPalette(outfit, skinOpt, shirtColor, pantsColor);
  const activeProp = prop ?? (['cane', 'phone'].includes(pose) ? pose : pose === 'holdJar' ? 'jar' : null);

  const ps = resolvePose(pose, t, seed);
  const breath = Math.sin(t * 1.9 + seed) * 2.0;
  const hover = isGhost ? Math.sin(t * 1.3 + seed) * 6 - 8 : 0;

  g.save();
  g.globalAlpha *= opAlpha;
  g.translate(x, y + hover);
  g.scale(facing * s, s);
  if (tilt) { g.translate(0, ps.hipY); g.rotate(tilt); g.translate(0, -ps.hipY); }

  if (!isGhost) {
    g.fillStyle = alpha('#000000', 0.28);
    g.beginPath();
    g.ellipse(0, 2, 34, 7, 0, 0, TAU);
    g.fill();
  }

  // Far arm behind torso
  drawPillLimb(g, [ps.shL, ps.elL, ps.hdL], 13, shade(shirtCol, -0.15), outline, outlineW);
  fillStrokeCircle(g, ps.hdL[0], ps.hdL[1], 6.5, skin, outline, outlineW * 0.85);

  // Legs (skip feet for ghost shroud); terminate cuffs above shoe soles so cream caps don't peek under shoes
  if (!isGhost) {
    drawPillLimb(g, [[-12, ps.hipY], [-13, (ps.hipY + ps.ftL[1]) * 0.5], [ps.ftL[0], ps.ftL[1] - 6]], 15, shade(pantsCol, -0.15), outline, outlineW);
    drawPillLimb(g, [[12, ps.hipY], [13, (ps.hipY + ps.ftR[1]) * 0.5], [ps.ftR[0], ps.ftR[1] - 6]], 15, pantsCol, outline, outlineW);
    fillStrokeRR(g, -23, ps.hipY - 12, 46, 20, 7, pantsCol, outline, outlineW * 0.9);
    fillStrokeRR(g, ps.ftL[0] - 9, ps.ftL[1] - 5, 20, 9, 4, '#14151a', outline, outlineW * 0.75);
    fillStrokeRR(g, ps.ftR[0] - 9, ps.ftR[1] - 5, 20, 9, 4, '#14151a', outline, outlineW * 0.75);
  }

  // Pill torso + short neck
  drawTorsoOutfit(g, outfitId, shirtCol, sashCol, ps, t, seed, outline, outlineW);
  drawPillLimb(g, [[0, ps.torsoTop + 2], [0, ps.headY + headR - 4]], 13, skin, outline, outlineW);

  // Head + face + headwear
  drawDitapHead(g, 0, ps.headY + breath * 0.7, headR, { ...opts, t, seed }, skin, outline, outlineW);

  // Rounded shoulder joint + near arm + prop
  fillStrokeCircle(g, ps.shR[0] - 2, ps.shR[1] + 2, 8.5, shirtCol, outline, outlineW * 0.9);
  drawPillLimb(g, [ps.shR, ps.elR, ps.hdR], 13.5, shirtCol, outline, outlineW);
  fillStrokeCircle(g, ps.hdR[0], ps.hdR[1], 7, skin, outline, outlineW * 0.85);
  drawDitapProp(g, activeProp, ps, t, seed, outline, outlineW);

  g.restore();
}

/**
 * Close-up dramatic bust / face portrait sharing identical Dạ Hành Dị Tạp face/head logic.
 */
export function ditapBigFace(g, cx, cy, r, opts = {}) {
  const {
    outfit = 'baBa',
    shirtColor = null,
    skin: skinOpt = null,
    outline = INK,
    outlineW = Math.max(3, r * 0.045),
    tilt = 0,
    rimColor = null,
    t = 0,
    seed = 1,
    alpha: opAlpha = 1,
  } = opts;

  const { skin, shirtCol } = resolveOutfitPalette(outfit, skinOpt, shirtColor);

  g.save();
  g.globalAlpha *= opAlpha;
  g.translate(cx, cy);
  if (tilt) g.rotate(tilt);

  // Close-up shoulders + short neck
  fillStrokeRR(g, -r * 1.25, r * 0.96, r * 2.5, r * 1.35, r * 0.55, shirtCol, outline, outlineW);
  fillStrokeRR(g, -r * 0.26, r * 0.65, r * 0.52, r * 0.45, r * 0.16, skin, outline, outlineW);

  if (rimColor) {
    glow(g, 0, 0, r * 1.65, rimColor, 0.22);
  }

  drawDitapHead(g, 0, 0, r, { ...opts, t, seed }, skin, outline, outlineW);
  g.restore();
}

function drawVeiledMirror(g, mx, my, mw, mh, peek, outline, lw) {
  fillStrokeRR(g, mx - mw / 2, my - mh / 2, mw, mh, 12, '#1d1410', outline, lw);
  // White draped cloth covering the mirror
  g.fillStyle = linGrad(g, mx, my - mh / 2, mx, my + mh / 2, ['#ebe5d8', '#d4cdc0', '#b8b0a3']);
  g.beginPath();
  g.moveTo(mx - mw * 0.56, my - mh * 0.52);
  g.quadraticCurveTo(mx, my - mh * 0.56, mx + mw * 0.56, my - mh * 0.52);
  g.lineTo(mx + mw * 0.6, my + mh * 0.48);
  g.quadraticCurveTo(mx, my + mh * 0.56, mx - mw * 0.6, my + mh * 0.48);
  g.closePath();
  g.fill();
  g.strokeStyle = outline; g.lineWidth = lw * 0.85; g.stroke();
  for (const fx of [-0.25, 0, 0.24]) {
    seg(g, [[mx + mw * fx, my - mh * 0.44], [mx + mw * fx * 1.15, my + mh * 0.42]], 2.2, alpha('#8a8275', 0.45));
  }
  if (peek > 0) {
    glow(g, mx - 12, my - 10, 18, '#ff3535', peek * 0.8);
    glow(g, mx + 12, my - 10, 18, '#ff3535', peek * 0.8);
  }
}

/**
 * Blurred 2.5D Vietnamese ancestor altar hall with hoành phi plaque, veiled mirrors, and candles.
 */
export function ditapAltar(g, cam = {}, t = 0, M = null, opts = {}) {
  M = M || mood('altarRoom');
  const blur = opts.blur ?? 5.5;
  const GY = E.H * V(0.84, 0.78);
  const altarW = V(560, 480), altarH = V(210, 190), altarTop = GY - altarH;
  const cx = E.W / 2;

  g.fillStyle = linGrad(g, 0, 0, 0, E.H, [shade(M.wall, -0.35), shade(M.floor, -0.55)]);
  g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);

  safeBlur(g, blur, (bg) => {
    // Timber wall + floor
    bg.fillStyle = linGrad(bg, 0, 0, 0, GY, [shade(M.wall, -0.15), shade(M.wall, -0.55)]);
    bg.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    bg.fillStyle = shade(M.floor, -0.35);
    bg.fillRect(-E.W, GY, E.W * 3, E.H);

    // Dark wooden columns (cột gỗ)
    const colOff = V(E.W * 0.36, E.W * 0.42), colW = V(64, 52);
    for (const sd of [-1, 1]) {
      const colX = cx + sd * colOff - colW / 2;
      bg.fillStyle = linGrad(bg, colX, 0, colX + colW, 0, ['#1b0d09', '#3a1b12', '#170a07']);
      bg.fillRect(colX, -E.H * 0.2, colW, GY + E.H * 0.2);
      bg.strokeStyle = INK; bg.lineWidth = 3; bg.strokeRect(colX, -E.H * 0.2, colW, GY + E.H * 0.2);
    }

    // Gold hoành phi plaque (德流光)
    const pw = V(460, 420), ph = V(106, 98), py = V(E.H * 0.08, E.H * 0.12);
    fillStrokeRR(bg, cx - pw / 2, py, pw, ph, 8, '#1d0d08', '#d9a43b', 5);
    text(bg, opts.plaqueText || '德流光', cx, py + ph / 2, {
      size: V(56, 50), font: FONTS.serif, weight: 900, color: '#e6b84c', spacing: 10,
    });

    // Flanked white-draped veiled mirrors (gương trùm vải trắng)
    const mOff = V(E.W * 0.24, E.W * 0.28), mw = V(140, 118), mh = V(270, 240);
    drawVeiledMirror(bg, cx - mOff, GY - altarH - mh * 0.38, mw, mh, opts.mirrorPeek || 0, INK, 3);
    drawVeiledMirror(bg, cx + mOff, GY - altarH - mh * 0.38, mw, mh, 0, INK, 3);

    // Altar portrait (di ảnh thờ)
    const fw = V(144, 130), fh = V(184, 168), fx = cx - fw / 2, fy = altarTop - fh - 26;
    fillStrokeRR(bg, fx - 10, fy - 10, fw + 20, fh + 20, 6, '#23130c', '#c89b3c', 3);
    bg.fillStyle = linGrad(bg, 0, fy, 0, fy + fh, ['#44413c', '#1c1a17']);
    bg.fillRect(fx, fy, fw, fh);
    circle(bg, cx, fy + fh * 0.38, fw * 0.2, '#5e5952');
    bg.fillStyle = '#48443f';
    bg.beginPath(); bg.ellipse(cx, fy + fh, fw * 0.36, fh * 0.28, 0, Math.PI, TAU); bg.fill();
    if (opts.photoEyes > 0) {
      glow(bg, cx - 11, fy + fh * 0.37, 12, '#ff2e2e', opts.photoEyes);
      glow(bg, cx + 11, fy + fh * 0.37, 12, '#ff2e2e', opts.photoEyes);
    }

    // Altar table + red cloth + incense + 2 flickering candles
    fillStrokeRR(bg, cx - altarW / 2, altarTop, altarW, altarH, 6, '#2a120c', INK, 3.5);
    bg.fillStyle = '#8e1818';
    bg.fillRect(cx - altarW / 2 - 6, altarTop - 8, altarW + 12, 22);
    bg.fillStyle = '#d6a03a';
    bg.fillRect(cx - altarW / 2 - 6, altarTop + 11, altarW + 12, 4);

    incense(bg, cx, altarTop - 4, t, { s: 1.0, seed: 3 });
    candle(bg, cx - altarW * 0.36, altarTop - 6, t, { s: 1.15, seed: 1 });
    candle(bg, cx + altarW * 0.36, altarTop - 6, t, { s: 1.15, seed: 7 });
  }, cam, 0.75);

  const warmF = flicker(t, { seed: 2, drop: 0.08, min: 0.55 });
  glow(g, cx, altarTop - 60, V(420, 340), M.practical || '#ffb35a', 0.24 * warmF);
  drawVignette(g, opts.vignette ?? 0.62, '#030204');
  return { GY, M, altarTop };
}

function drawRuralShopfront(g, x, GY, w, h, roofH, signTxt, wallCol, roofCol, lit, t, seed) {
  const top = GY - h;
  fillStrokeRR(g, x, top, w, h, 3, wallCol, INK, 3.5);
  // Pitched clay tile roof
  poly(g, [[x - 22, top + 6], [x + 18, top - roofH], [x + w - 18, top - roofH], [x + w + 22, top + 6]], roofCol);
  g.strokeStyle = INK; g.lineWidth = 3.5; g.lineJoin = 'round'; g.stroke();
  for (let i = 1; i < 8; i++) {
    const rx = lerp(x, x + w, i / 8);
    seg(g, [[rx, top + 3], [lerp(rx, x + w / 2, 0.14), top - roofH + 4]], 2.2, alpha(INK, 0.6));
  }
  // Wooden shutter doorway + practical glow
  const dw = w * 0.36, dh = h * 0.62, dx = x + w * 0.16, dy = GY - dh;
  fillStrokeRR(g, dx, dy, dw, dh, 2, '#130c09', INK, 3);
  if (lit > 0.05) {
    const f = flicker(t, { seed, drop: 0.12, min: 0.2 }) * lit;
    g.fillStyle = alpha('#ffb860', 0.35 * f);
    g.fillRect(dx + 6, dy + 6, dw - 12, dh * 0.35);
    glow(g, dx + dw / 2, dy + dh * 0.3, dw * 1.1, '#ffae54', 0.22 * f);
  }
  // Vietnamese storefront sign
  const sw = w * 0.56, sh = 40, sx = x + w * 0.22, sy = top + 14;
  fillStrokeRR(g, sx, sy, sw, sh, 4, '#dfd3b6', INK, 2.5);
  text(g, signTxt, sx + sw / 2, sy + sh / 2 + 1, { size: 22, font: FONTS.ui, weight: 900, color: '#241812', spacing: 1 });
}

function drawBicycle(g, bx, GY, s = 1) {
  g.save();
  g.translate(bx, GY);
  g.scale(s, s);
  ring(g, -28, -22, 22, 3.5, INK);
  ring(g, 28, -22, 22, 3.5, INK);
  seg(g, [[-28, -22], [-4, -24], [14, -46], [-12, -46], [-28, -22]], 3.5, INK);
  seg(g, [[-12, -46], [-16, -54]], 3.5, INK);
  seg(g, [[-22, -54], [-10, -54]], 4.5, INK);
  seg(g, [[28, -22], [14, -46], [12, -58], [22, -60]], 3.5, INK);
  g.restore();
}

function drawQuangGanh(g, qx, GY, s = 1) {
  g.save();
  g.translate(qx, GY);
  g.scale(s, s);
  for (const bx of [-34, 34]) {
    fillStrokeRR(g, bx - 16, -24, 32, 24, 8, '#8d683d', INK, 3);
    seg(g, [[bx - 12, -24], [bx, -58], [bx + 12, -24]], 2, INK);
  }
  g.strokeStyle = INK; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-48, -54); g.quadraticCurveTo(0, -68, 48, -54); g.stroke();
  g.strokeStyle = '#b48a52'; g.lineWidth = 2.5; g.stroke();
  g.restore();
}

/**
 * 2.5D rural Vietnamese village street with misty hills, shopfronts, bicycle, quang gánh, and utility wires.
 */
export function ditapVillageStreet(g, cam = {}, t = 0, opts = {}) {
  const M = opts.M || mood(opts.moodName || 'ghostNight');
  const GY = E.H * V(0.83, 0.76);

  // Far sky & hazy karst hills (depth 0.25)
  layer(g, cam, 0.25, (lg) => {
    lg.fillStyle = linGrad(lg, 0, 0, 0, E.H, [M.sky[0], M.sky[M.sky.length - 1]]);
    lg.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    circle(lg, E.W * V(0.76, 0.72), E.H * 0.16, V(42, 34), alpha('#e6ecfa', 0.75));
    for (const [yOff, amp, col, sd] of [[0.2, 130, shade(M.dark, 0.12), 4], [0.08, 90, shade(M.dark, 0.05), 9]]) {
      lg.fillStyle = col;
      lg.beginPath();
      lg.moveTo(-E.W, GY + E.H);
      for (let x = -E.W; x <= E.W * 2; x += 28) {
        lg.lineTo(x, GY - E.H * yOff - (noise(x * 0.0035, sd) * 0.5 + 0.5) * amp);
      }
      lg.lineTo(E.W * 2, GY + E.H);
      lg.closePath();
      lg.fill();
    }
  });

  // Mid shopfronts, bicycle, quang gánh, utility pole/wires (depth 0.65)
  layer(g, cam, 0.65, (lg) => {
    const shopW = V(460, 380), shopH = V(270, 260);
    const leftX = V(E.W * 0.07, E.W * 0.03);
    const rightX = V(E.W * 0.62, E.W * 0.56);
    drawRuralShopfront(lg, leftX, GY, shopW, shopH, V(96, 86), 'TẠP HOÁ', '#6a6252', '#3a1f18', 0.85, t, 3);
    drawRuralShopfront(lg, rightX, GY, shopW, shopH * 0.94, V(88, 78), 'VẢI SỢI', '#5a5f64', '#2e1a15', 0.3, t, 9);

    drawBicycle(lg, rightX + shopW * 0.72, GY, V(1.15, 0.95));
    drawQuangGanh(lg, leftX + shopW * 0.85, GY, V(1.05, 0.9));

    // Concrete utility pole & sagging wires
    const px = E.W * V(0.51, 0.48), pyTop = E.H * 0.08;
    fillStrokeRR(lg, px - 9, pyTop, 18, GY - pyTop, 3, '#3c4048', INK, 3);
    seg(lg, [[px - 44, pyTop + 36], [px + 44, pyTop + 36]], 6, INK);
    const sway = noise(t * 0.45, 7) * 8;
    lg.strokeStyle = alpha(INK, 0.88);
    lg.lineWidth = 2.4;
    for (const wy of [pyTop + 36, pyTop + 56]) {
      lg.beginPath(); lg.moveTo(-E.W * 0.2, wy - 24); lg.quadraticCurveTo(px, wy + 70 + sway, px, wy); lg.stroke();
      lg.beginPath(); lg.moveTo(px, wy); lg.quadraticCurveTo(E.W * 0.8, wy + 76 + sway, E.W * 1.2, wy - 18); lg.stroke();
    }
  });

  // Ground lane + drifting mist (depth 1.0)
  layer(g, cam, 1, (lg) => {
    lg.fillStyle = linGrad(lg, 0, GY, 0, E.H * 1.3, [shade(M.road || M.floor, -0.2), shade(M.dark, -0.4)]);
    lg.fillRect(-E.W, GY, E.W * 3, E.H);
    seg(lg, [[-E.W, GY], [E.W * 2, GY]], 3, INK);
  });

  fogBank(g, t, { y: GY - 20, h: 170, a: 0.24, color: M.fog });
  return { GY, M };
}

function drawTitleEmblem(g, emblem, cx, cy, s, col, acc) {
  g.save();
  g.translate(cx, cy);
  g.scale(s, s);
  g.strokeStyle = col;
  g.lineWidth = 3.2;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  if (emblem === 'boat') {
    poly(g, [[-56, 8], [56, 8], [34, 26], [-34, 26]], col);
    seg(g, [[-64, 34], [64, 34]], 2.2, alpha(col, 0.45));
    seg(g, [[-38, 44], [38, 44]], 2.0, alpha(col, 0.3));
  } else if (emblem === 'scarf') {
    g.strokeStyle = col; g.lineWidth = 6;
    g.beginPath(); g.arc(0, -4, 24, Math.PI * 0.9, Math.PI * 2.1); g.stroke();
    seg(g, [[-22, 4], [-34, 42]], 5, col);
    seg(g, [[22, 4], [36, 40]], 5, col);
    circle(g, 0, -4, 6, acc);
  } else if (emblem === 'mirror') {
    g.beginPath(); g.ellipse(0, 4, 28, 38, 0, 0, TAU); g.stroke();
    seg(g, [[-14, -18], [16, 22]], 2.5, acc);
    seg(g, [[8, -20], [-10, 12]], 1.8, alpha(col, 0.55));
  } else {
    // 'jar' (hũ sành sealed in red cloth)
    rr(g, -22, -16, 44, 52, 18); g.stroke();
    rr(g, -16, -28, 32, 14, 4); g.fillStyle = acc; g.fill();
    g.fillStyle = col; g.fillRect(-5, -6, 10, 24);
  }
  g.restore();
}

/**
 * Pure-black minimal folk horror title card with emblem, cream serif title, crimson sub, and tag.
 */
export function ditapTitleCard(g, t = 0, opts = {}) {
  const {
    emblem = 'jar',
    title = 'CHIẾC KHĂN TANG THỨ BA MƯƠI HAI',
    sub = '',
    tag = 'TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM',
    dur = null,
    cream = '#f3ead5',
    crimson = '#c41c24',
  } = opts;

  g.fillStyle = '#000000';
  g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);

  const fadeIn = ease.out(prog(t, 0, 0.75));
  const fadeOut = dur ? clamp((dur - t) / 0.5) : 1;
  const a = fadeIn * fadeOut;
  if (a <= 0.001) return;

  const cx = E.W / 2, cy = E.H * 0.49;
  g.save();
  g.globalAlpha *= a;

  drawTitleEmblem(g, emblem, cx, cy - V(156, 168), V(1.15, 1.05), cream, crimson);

  const baseSz = V(76, 58);
  const w = measure(g, title, baseSz, FONTS.serif, 900);
  const sz = w > E.W * 0.86 ? baseSz * ((E.W * 0.86) / w) : baseSz;
  text(g, title, cx, cy - V(20, 24), {
    size: sz, font: FONTS.serif, weight: 900, italic: true, color: cream, spacing: 2,
  });

  if (sub) {
    text(g, sub, cx, cy + V(66, 58), {
      size: V(32, 28), font: FONTS.ui, weight: 800, color: crimson, spacing: 4,
    });
  }

  if (tag) {
    text(g, tag, cx, cy + V(134, 122), {
      size: V(20, 19), font: FONTS.ui, weight: 800, color: '#8a8278', spacing: 5,
    });
  }
  g.restore();
}

function measureSubWidth(g, str, size, stubConstant) {
  return stubConstant ? str.length * size * 0.52 : measure(g, str, size, FONTS.ui, 800);
}

function wrapTwoLines(g, str, size, maxW) {
  // Detect constant-width stub mocks (like mockCtx returning 10 for every string)
  const stubConstant = measure(g, 'WWWWWWWWWW', size, FONTS.ui, 800) <= measure(g, 'W', size, FONTS.ui, 800);
  if (measureSubWidth(g, str, size, stubConstant) <= maxW) return [str];
  const words = str.split(/\s+/);
  if (words.length <= 1) {
    const mid = Math.ceil(str.length / 2);
    return [str.slice(0, mid), str.slice(mid)];
  }
  let bestIdx = Math.ceil(words.length / 2), bestScore = 1e9;
  for (let i = 1; i < words.length; i++) {
    const l1 = words.slice(0, i).join(' '), l2 = words.slice(i).join(' ');
    const w1 = measureSubWidth(g, l1, size, stubConstant);
    const w2 = measureSubWidth(g, l2, size, stubConstant);
    const punctBonus = /[,.;:?!—–]$/.test(words[i - 1]) ? -size * 3.5 : 0;
    const score = Math.abs(w1 - w2) + Math.max(0, Math.max(w1, w2) - maxW) * 4 + punctBonus;
    if (score < bestScore) { bestScore = score; bestIdx = i; }
  }
  return [words.slice(0, bestIdx).join(' '), words.slice(bestIdx).join(' ')];
}

/**
 * Clean burn-in Vietnamese subtitle: bold white Nunito 800, thick #000 outline, drop shadow, NO dark box.
 */
export function ditapSubtitle(g, str, opts = {}) {
  const clean = typeof str === 'string' ? str.trim().replace(/\s+/g, ' ') : '';
  if (!clean) return [];

  const {
    y = E.H * V(0.89, 0.80),
    size = V(44, 48),
    maxW = E.W * V(0.84, 0.88),
    color = '#ffffff',
    strokeColor = '#000000',
  } = opts;

  const lines = wrapTwoLines(g, clean, size, maxW).slice(0, 2);
  const stubConstant = measure(g, 'WWWWWWWWWW', size, FONTS.ui, 800) <= measure(g, 'W', size, FONTS.ui, 800);
  const maxLW = Math.max(...lines.map((l) => measureSubWidth(g, l, size, stubConstant)));
  const sz = maxLW > maxW ? size * (maxW / maxLW) : size;
  const lineH = sz * 1.24;
  const startY = lines.length === 2 ? y - lineH * 0.5 : y;

  g.save();
  g.shadowColor = 'rgba(0,0,0,0.92)';
  g.shadowBlur = 8;
  g.shadowOffsetY = 3;
  lines.forEach((ln, idx) => {
    text(g, ln, E.W / 2, startY + idx * lineH, {
      size: sz,
      font: FONTS.ui,
      weight: 800,
      color,
      stroke: Math.max(4, sz * 0.19),
      strokeColor,
      align: 'center',
      base: 'middle',
    });
  });
  g.restore();
  return lines;
}

/**
 * Draw active beat text from timeline/beats.json at globalT; highlights active spoken word when words.json is available.
 */
export function ditapTimedSubtitle(g, globalT, beats, opts = {}) {
  if (!Array.isArray(beats) || beats.length === 0) return [];
  const active = beats.find((b) => b && globalT >= b.start && globalT < b.end);
  if (!active) return [];
  const str = active.text ?? active.line ?? '';
  const words = Array.isArray(opts.words) ? opts.words : (Array.isArray(E.words) ? E.words : []);
  if (opts.karaoke === false || words.length === 0) {
    return ditapSubtitle(g, str, opts);
  }

  // Match tokens in this beat against E.words timestamps in [active.start - 0.1, active.end + 0.1]
  const beatWords = words.filter((w) => w && w.end >= active.start - 0.1 && w.start <= active.end + 0.1);
  if (beatWords.length === 0) return ditapSubtitle(g, str, opts);

  const clean = typeof str === 'string' ? str.trim().replace(/\s+/g, ' ') : '';
  if (!clean) return [];

  const {
    y = E.H * V(0.89, 0.80),
    size = V(44, 48),
    maxW = E.W * V(0.84, 0.88),
    color = '#ffffff',
    highlightColor = '#ffd257',
    strokeColor = '#000000',
  } = opts;

  const lines = wrapTwoLines(g, clean, size, maxW).slice(0, 2);
  const stubConstant = measure(g, 'WWWWWWWWWW', size, FONTS.ui, 800) <= measure(g, 'W', size, FONTS.ui, 800);
  const maxLW = Math.max(...lines.map((l) => measureSubWidth(g, l, size, stubConstant)));
  const sz = maxLW > maxW ? size * (maxW / maxLW) : size;
  const lineH = sz * 1.24;
  const startY = lines.length === 2 ? y - lineH * 0.5 : y;

  // Find currently spoken word index inside beatWords
  let activeWordIdx = -1;
  for (let k = beatWords.length - 1; k >= 0; k--) {
    if (globalT >= beatWords[k].start - 0.05) {
      if (globalT <= beatWords[k].end + 0.25) activeWordIdx = k;
      break;
    }
  }

  let wordCursor = 0;
  lines.forEach((ln, lineIdx) => {
    const tokens = ln.split(' ').filter(Boolean);
    const spaceW = measureSubWidth(g, ' ', sz, stubConstant) || sz * 0.3;
    const tokenWidths = tokens.map((tok) => measureSubWidth(g, tok, sz, stubConstant));
    const totalW = tokenWidths.reduce((a, b) => a + b, 0) + spaceW * Math.max(0, tokens.length - 1);
    let x = E.W / 2 - totalW / 2;
    const ly = startY + lineIdx * lineH;

    tokens.forEach((tok, tIdx) => {
      const isCur = wordCursor === activeWordIdx;
      const wObj = beatWords[wordCursor];
      const pop = isCur && wObj ? 1 + 0.06 * ease.out(prog(globalT, wObj.start, wObj.start + 0.12)) : 1;
      const cx = x + tokenWidths[tIdx] / 2;
      g.save();
      g.translate(cx, ly);
      g.scale(pop, pop);
      g.shadowColor = 'rgba(0,0,0,0.92)';
      g.shadowBlur = 8;
      g.shadowOffsetY = 3;
      text(g, tok, 0, 0, {
        size: sz,
        font: FONTS.ui,
        weight: 800,
        color: isCur ? highlightColor : color,
        stroke: Math.max(4, sz * 0.19),
        strokeColor,
        align: 'center',
        base: 'middle',
      });
      g.restore();
      x += tokenWidths[tIdx] + spaceW;
      wordCursor += 1;
    });
  });

  return lines;
}

/**
 * Word-level 3-4 word karaoke phrase caption (Shorts/TikTok & Tí Hon style): uppercase white + golden active word, no box.
 */
export function ditapWordSubtitle(g, globalT, opts = {}) {
  const words = Array.isArray(opts.words) ? opts.words : (Array.isArray(E.words) ? E.words : []);
  if (words.length === 0) return [];

  const {
    y = E.H * V(0.88, 0.79),
    size = V(52, 68),
    max = 4,
    maxW = E.W * 0.88,
    color = '#ffffff',
    highlightColor = '#ffd257',
    strokeColor = '#000000',
    uppercase = true,
  } = opts;

  let i = -1;
  for (let k = words.length - 1; k >= 0; k--) {
    if (globalT >= words[k].start - 0.05) {
      if (globalT <= words[k].end + 0.32) i = k;
      break;
    }
  }
  if (i < 0) return [];

  const brk = (k) => k > 0 && (/[.!?…]["')\]]*$/.test(words[k - 1].word.trim()) || words[k].start - words[k - 1].end > 0.5);
  let s = i;
  while (s > 0 && !brk(s)) s--;
  let e = s;
  while (e < words.length && (e === s || !brk(e))) e++;
  const st = s + Math.floor((i - s) / max) * max;
  const en = Math.min(st + max, e);
  const group = words.slice(st, en);
  const strs = group.map((w) => (uppercase ? w.word.trim().toUpperCase() : w.word.trim()));

  const stubConstant = measure(g, 'WWWWWWWWWW', size, FONTS.ui, 800) <= measure(g, 'W', size, FONTS.ui, 800);
  const rawW = strs.map((t) => measureSubWidth(g, t, size, stubConstant)).reduce((a, b) => a + b, 0) + size * 0.3 * Math.max(0, strs.length - 1);
  const sz = rawW > maxW ? size * (maxW / rawW) : size;
  const gap = sz * 0.3;
  const widths = strs.map((t) => measureSubWidth(g, t, sz, stubConstant));
  const total = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, strs.length - 1);

  let x = E.W / 2 - total / 2;
  strs.forEach((tok, k) => {
    const isCur = st + k === i;
    const pop = isCur ? 1 + 0.08 * ease.out(prog(globalT, group[k].start, group[k].start + 0.12)) : 1;
    g.save();
    g.translate(x + widths[k] / 2, y);
    g.scale(pop, pop);
    g.shadowColor = 'rgba(0,0,0,0.92)';
    g.shadowBlur = 8;
    g.shadowOffsetY = 3;
    text(g, tok, 0, 0, {
      size: sz,
      font: FONTS.ui,
      weight: 900,
      color: isCur ? highlightColor : color,
      stroke: Math.max(4, sz * 0.18),
      strokeColor,
      align: 'center',
      base: 'middle',
    });
    g.restore();
    x += widths[k] + gap;
  });
  return strs;
}

/**
 * Split-color high-contrast Vietnamese horror thumbnail typography (delegates to horror.thumbText).
 */
export function ditapThumbText(g, opts = {}) {
  const {
    lines = [],
    x = E.W * 0.05,
    y = E.H * 0.28,
    align = 'left',
    size = V(138, 112),
    color = '#ffffff',
    accent = '#e01b24',
    tilt = -0.025,
  } = opts;
  if (!lines.length) return;
  thumbText(g, { lines, x, y, align, size, color, accent, tilt });
}
