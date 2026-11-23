// engine/chibi.js — 2D minimalist chibi historical storytelling helpers (OverSimplified / To Bo / Van Vo style).
// Deterministic: all animation derives from t / globalT; never use Math.random() or Date.now().
import { clamp, lerp, ease, text } from './core.js';

const INK = '#1e1e24';

function outlinePath(g, lw = 3.5, stroke = INK, fill = null) {
  if (fill) { g.fillStyle = fill; g.fill(); }
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke();
}

export function drawNameplate(g, x, y, label, opts = {}) {
  if (!label) return;
  const { alpha = 1, scale = 1, bg = '#edd78a', fg = INK, border = INK } = opts;
  if (alpha <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.globalAlpha *= alpha;
  g.font = '800 20px Nunito, sans-serif';
  const tw = g.measureText(label).width;
  const w = Math.max(92, tw + 34), h = 34;
  const x0 = -w / 2, y0 = -h / 2;

  g.beginPath(); g.rect(x0, y0, w, h);
  outlinePath(g, 2.5, border, bg);

  const cs = 7;
  g.fillStyle = bg; g.strokeStyle = border; g.lineWidth = 2;
  for (const [cx, cy] of [[x0 - 3, y0 - 3], [x0 + w - cs + 3, y0 - 3], [x0 - 3, y0 + h - cs + 3], [x0 + w - cs + 3, y0 + h - cs + 3]]) {
    g.fillRect(cx, cy, cs, cs);
    g.strokeRect(cx, cy, cs, cs);
  }

  text(g, label, 0, 1, { size: 20, weight: 800, color: fg, align: 'center', base: 'middle' });
  g.restore();
}

export function drawComicBadge(g, x, y, label, opts = {}) {
  if (!label) return;
  const { bg = '#ffd166', fg = INK, border = INK, size = 26, tilt = -0.025, scale = 1 } = opts;
  g.save();
  g.translate(x, y);
  g.rotate(tilt);
  g.scale(scale, scale);
  g.font = `900 ${size}px Nunito, sans-serif`;
  const tw = g.measureText(label).width;
  const w = tw + 44, h = size + 24;
  g.fillStyle = 'rgba(0,0,0,0.28)';
  g.fillRect(-w / 2 + 6, -h / 2 + 6, w, h);
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 10);
  outlinePath(g, 3.5, border, bg);
  text(g, label, 0, 1, { size, weight: 900, color: fg, align: 'center', base: 'middle' });
  g.restore();
}

export function drawStamp(g, x, y, label, progress = 1, color = '#c92a2a') {
  if (!label || progress <= 0.01) return;
  const k = clamp(progress);
  const sc = lerp(2.6, 1.0, ease.outBack(k));
  g.save();
  g.translate(x, y);
  g.rotate(-0.14);
  g.scale(sc, sc);
  g.globalAlpha *= clamp(k * 2.5);
  g.font = '900 34px Nunito, sans-serif';
  const tw = g.measureText(label).width;
  const w = tw + 48, h = 62;
  g.fillStyle = 'rgba(255,255,255,0.92)';
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 8); g.fill();
  g.lineWidth = 5; g.strokeStyle = color; g.stroke();
  g.lineWidth = 2; g.strokeRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12);
  text(g, label, 0, 2, { size: 32, weight: 900, color, align: 'center', base: 'middle' });
  g.restore();
}

export function drawChapterCard(g, num, title, t = 0) {
  g.fillStyle = '#14161f';
  g.fillRect(0, 0, 1920, 1080);
  // Subtle decorative border
  g.strokeStyle = '#d4a63a'; g.lineWidth = 4;
  g.strokeRect(80, 80, 1760, 920);
  const pop = ease.outBack(clamp(t * 2.5));
  g.save();
  g.translate(960, 500); g.scale(pop, pop);
  drawComicBadge(g, 0, -110, `CHƯƠNG ${num}`, { bg: '#c92a2a', fg: '#fff', size: 32, tilt: 0 });
  text(g, title, 0, 15, { size: 64, weight: 900, color: '#f4e3b2', stroke: '#000', strokeWidth: 8, align: 'center', base: 'middle' });
  g.restore();
}

function drawFloatingProp(g, prop, x, y, facing, t, seed, swing = 0) {
  if (!prop) return;
  const bob = Math.sin(t * 2.8 + seed) * 4;
  const idleRot = Math.sin(t * 2.1 + seed) * 0.06;
  g.save();
  g.translate(x + facing * 56, y - 54 + bob);
  g.scale(facing, 1);
  g.rotate(idleRot + swing);

  if (prop === 'sword') {
    g.beginPath(); g.moveTo(0, 12); g.lineTo(10, -52); g.lineTo(15, -62); g.lineTo(18, -49); g.lineTo(8, 12); g.closePath();
    outlinePath(g, 2.5, INK, '#d9e1ea');
    g.beginPath(); g.rect(-8, 10, 22, 6); outlinePath(g, 2.5, INK, '#d4a63a');
    g.beginPath(); g.rect(0, 16, 6, 14); outlinePath(g, 2.5, INK, '#6e3a24');
  } else if (prop === 'spear' || prop === 'guandao') {
    g.beginPath(); g.rect(-2, -95, 5, 138); outlinePath(g, 2.2, INK, '#593622');
    g.beginPath();
    if (prop === 'guandao') {
      g.moveTo(0, -95); g.quadraticCurveTo(20, -116, 6, -135); g.lineTo(-4, -120); g.closePath();
    } else {
      g.moveTo(0.5, -126); g.lineTo(9, -95); g.lineTo(-8, -95); g.closePath();
    }
    outlinePath(g, 2.5, INK, '#dce4ed');
  } else if (prop === 'fan') {
    g.beginPath(); g.rect(-2, 4, 5, 22); outlinePath(g, 2, INK, '#78462a');
    for (let i = -3; i <= 3; i++) {
      g.save(); g.rotate(i * 0.22);
      g.beginPath(); g.ellipse(0, -14, 7, 19, 0, 0, Math.PI * 2);
      outlinePath(g, 2, INK, '#f6f7f9');
      g.restore();
    }
  } else if (prop === 'scroll') {
    g.beginPath(); g.rect(-18, -14, 36, 28); outlinePath(g, 2.5, INK, '#f3e1a6');
    g.beginPath(); g.rect(-22, -16, 5, 32); outlinePath(g, 2, INK, '#8c5328');
    g.beginPath(); g.rect(17, -16, 5, 32); outlinePath(g, 2, INK, '#8c5328');
    g.strokeStyle = '#5c4932'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-10, -5); g.lineTo(10, -5); g.moveTo(-10, 2); g.lineTo(8, 2); g.stroke();
  } else if (prop === 'gavel') {
    g.beginPath(); g.rect(-3, -10, 6, 36); outlinePath(g, 2.2, INK, '#78462a');
    g.beginPath(); g.roundRect(-14, -22, 28, 16, 4); outlinePath(g, 2.5, INK, '#a66332');
  } else if (prop === 'handPoint') {
    g.beginPath(); g.ellipse(0, 0, 12, 9, 0, 0, Math.PI * 2); outlinePath(g, 2.5, INK, '#f6d5b8');
    g.beginPath(); g.roundRect(4, -5, 16, 6, 3); outlinePath(g, 2.5, INK, '#f6d5b8');
  }
  g.restore();
}

export function drawChibiPawn(g, opts = {}) {
  const {
    x = 0, y = 0, scale = 1, facing = 1, t = 0, seed = 1,
    robeColor = '#283044', trimColor = '#d4a63a', capeColor = null,
    skin = '#f5d2b3', hair = 'topknot', hairColor = '#23242b',
    helmPlume = '#c92a2a', expr = 'neutral', beard = 'none', look = 0,
    prop = null, propSwing = 0, talking = false, nameplate = null, nameplateAlpha = 1,
    tilt = 0, armor = false,
  } = opts;

  const bounce = talking ? -Math.abs(Math.sin(t * 11 + seed)) * 5 : 0;

  g.save();
  g.translate(x, y + bounce);
  g.scale(scale, scale);
  g.rotate(tilt);

  g.fillStyle = 'rgba(0,0,0,0.18)';
  g.beginPath(); g.ellipse(0, 4, 42, 10, 0, 0, Math.PI * 2); g.fill();

  g.save();
  g.scale(facing, 1);

  if (capeColor) {
    g.beginPath();
    g.moveTo(-26, -104); g.lineTo(-48, -10); g.lineTo(44, -10); g.lineTo(26, -104); g.closePath();
    outlinePath(g, 3.5, INK, capeColor);
  }

  g.beginPath();
  g.moveTo(-24, -106);
  g.quadraticCurveTo(-36, -54, -38, -6);
  g.quadraticCurveTo(0, 4, 38, -6);
  g.quadraticCurveTo(36, -54, 24, -106);
  g.closePath();
  outlinePath(g, 3.5, INK, robeColor);

  g.beginPath(); g.moveTo(-16, -106); g.lineTo(0, -82); g.lineTo(16, -106);
  g.strokeStyle = trimColor; g.lineWidth = 4; g.stroke();

  g.beginPath(); g.rect(-30, -64, 60, 10); outlinePath(g, 2.5, INK, trimColor);
  g.beginPath(); g.arc(0, -59, 6, 0, Math.PI * 2); outlinePath(g, 2, INK, '#e7c65a');

  if (armor) {
    g.strokeStyle = trimColor; g.lineWidth = 2.5;
    for (let row = 0; row < 3; row++) {
      const yy = -44 + row * 12;
      g.beginPath(); g.moveTo(-26 - row * 2, yy); g.lineTo(26 + row * 2, yy); g.stroke();
    }
  }

  if (hair === 'ponytail') {
    g.beginPath();
    g.moveTo(-16, -146); g.quadraticCurveTo(-46, -120, -34, -72); g.quadraticCurveTo(-18, -88, -14, -126); g.closePath();
    outlinePath(g, 3, INK, hairColor);
  }

  const hy = -134;
  g.beginPath(); g.arc(0, hy, 31, 0, Math.PI * 2);
  outlinePath(g, 3.5, INK, skin);

  if (hair === 'helm') {
    if (helmPlume) {
      g.beginPath(); g.moveTo(0, hy - 32); g.quadraticCurveTo(-18, hy - 68, -28, hy - 78); g.quadraticCurveTo(-4, hy - 64, 8, hy - 32); g.closePath();
      outlinePath(g, 2.5, INK, helmPlume);
    }
    g.beginPath(); g.arc(0, hy - 2, 33, Math.PI * 1.02, Math.PI * 1.98);
    g.lineTo(32, hy + 8); g.lineTo(24, hy + 6); g.lineTo(22, hy - 8); g.lineTo(-22, hy - 8); g.lineTo(-24, hy + 6); g.lineTo(-32, hy + 8); g.closePath();
    outlinePath(g, 3, INK, '#3b4252');
  } else {
    g.beginPath(); g.arc(0, hy - 4, 31, Math.PI * 1.05, Math.PI * 1.95);
    g.quadraticCurveTo(10, hy - 14, 0, hy - 18); g.quadraticCurveTo(-12, hy - 14, -29, hy - 8); g.closePath();
    outlinePath(g, 3, INK, hairColor);
    if (hair === 'topknot' || hair === 'bun') {
      g.beginPath(); g.arc(0, hy - 37, 11, 0, Math.PI * 2); outlinePath(g, 3, INK, hairColor);
      g.beginPath(); g.rect(-9, hy - 32, 18, 6); outlinePath(g, 2, INK, trimColor);
    } else if (hair === 'crown') {
      g.beginPath(); g.rect(-14, hy - 44, 28, 16); outlinePath(g, 3, INK, '#23242b');
      g.beginPath(); g.rect(-16, hy - 32, 32, 6); outlinePath(g, 2, INK, trimColor);
    }
  }

  const lx = look * 3;
  const blink = (Math.sin(t * 2.3 + seed * 7) > 0.97) || expr === 'sleep' || expr === 'dead';
  g.strokeStyle = INK; g.fillStyle = INK; g.lineWidth = 2.6;

  if (expr === 'dead') {
    for (const ex of [-10, 10]) {
      g.beginPath(); g.moveTo(ex - 4, hy - 2); g.lineTo(ex + 4, hy + 5); g.moveTo(ex + 4, hy - 2); g.lineTo(ex - 4, hy + 5); g.stroke();
    }
  } else if (blink) {
    for (const ex of [-10, 10]) {
      g.beginPath(); g.moveTo(ex - 5, hy + 1); g.lineTo(ex + 5, hy + 1); g.stroke();
    }
  } else if (expr === 'shocked' || expr === 'scared') {
    for (const ex of [-10, 10]) {
      g.beginPath(); g.arc(ex + lx, hy + 1, 5.5, 0, Math.PI * 2); outlinePath(g, 2, INK, '#fff');
      g.beginPath(); g.arc(ex + lx, hy + 1, 2, 0, Math.PI * 2); g.fill();
    }
  } else {
    g.beginPath(); g.arc(-10 + lx, hy + 1, 2.8, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(10 + lx, hy + 1, 2.8, 0, Math.PI * 2); g.fill();
  }

  g.lineWidth = 2.6;
  if (expr === 'angry') {
    g.beginPath(); g.moveTo(-16, hy - 9); g.lineTo(-5, hy - 4); g.moveTo(16, hy - 9); g.lineTo(5, hy - 4); g.stroke();
  } else if (expr === 'smirk') {
    g.beginPath(); g.moveTo(-16, hy - 6); g.lineTo(-5, hy - 8); g.moveTo(5, hy - 4); g.lineTo(16, hy - 10); g.stroke();
  } else if (expr === 'shocked' || expr === 'scared') {
    g.beginPath(); g.moveTo(-15, hy - 11); g.lineTo(-5, hy - 13); g.moveTo(5, hy - 13); g.lineTo(15, hy - 11); g.stroke();
  }

  if (beard === 'full') {
    g.beginPath(); g.moveTo(-18, hy + 10); g.quadraticCurveTo(0, hy + 42, 18, hy + 10);
    g.quadraticCurveTo(0, hy + 18, -18, hy + 10); outlinePath(g, 2.5, INK, hairColor);
  } else if (beard === 'long') {
    g.beginPath(); g.moveTo(-12, hy + 12); g.quadraticCurveTo(-8, hy + 68, 0, hy + 74); g.quadraticCurveTo(8, hy + 68, 12, hy + 12);
    outlinePath(g, 2.5, INK, hairColor);
  } else if (beard === 'goatee') {
    g.beginPath(); g.moveTo(-8, hy + 12); g.lineTo(8, hy + 12); g.lineTo(0, hy + 26); g.closePath();
    outlinePath(g, 2, INK, hairColor);
  }

  if (talking || expr === 'shocked') {
    const mh = expr === 'shocked' ? 6 : 2 + Math.abs(Math.sin(t * 14 + seed)) * 4;
    g.beginPath(); g.ellipse(0, hy + 13, 5, mh, 0, 0, Math.PI * 2); outlinePath(g, 2, INK, '#8c2d2d');
  }

  g.restore();
  drawFloatingProp(g, prop, 0, 0, facing, t, seed, propSwing);
  if (nameplate) drawNameplate(g, 0, -198, nameplate, { alpha: nameplateAlpha });
  g.restore();
}

export function drawSoldierCrowd(g, opts = {}) {
  const { startX = 900, endX = 1850, horizonY = 580, groundY = 860, rows = 3, cols = 6, t = 0, robeColor = '#2c2f38', plume = '#c92a2a' } = opts;
  for (let r = 0; r < rows; r++) {
    const kr = (r + 1) / rows;
    const yy = lerp(horizonY + 40, groundY, kr);
    const sc = lerp(0.38, 0.72, kr);
    for (let c = 0; c < cols; c++) {
      const jitter = Math.sin(r * 13.7 + c * 7.1) * 24;
      const xx = lerp(startX, endX, (c + 0.5) / cols) + jitter;
      const march = Math.abs(Math.sin(t * 6.5 + c * 0.9 + r * 0.5)) * 4;
      drawChibiPawn(g, {
        x: xx, y: yy - march, scale: sc, facing: -1, t, seed: r * 10 + c,
        robeColor, trimColor: '#a68942', armor: true, hair: 'helm', helmPlume: plume,
        expr: 'angry', prop: 'spear',
      });
    }
  }
}

export function drawChibiSet(g, kind, t = 0, opts = {}) {
  const W = 1920, H = 1080;
  if (EXTRA_SETS[kind]) { EXTRA_SETS[kind](g, t, opts); return; }
  if (kind === 'tacticalMap' && (opts.arrows || opts.label)) { drawCampaignMap(g, t, opts); return; }
  if (kind === 'hills') {
    const sky = g.createLinearGradient(0, 0, 0, 620);
    sky.addColorStop(0, '#9bd6e5'); sky.addColorStop(1, '#d7eef5');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    for (const [cx, cy, cs] of [[320, 180, 1], [960, 140, 1.2], [1560, 210, 0.9]]) {
      const drift = Math.sin(t * 0.3 + cx) * 14;
      g.beginPath();
      g.arc(cx + drift, cy, 48 * cs, Math.PI * 0.5, Math.PI * 1.5);
      g.arc(cx + 42 * cs + drift, cy - 28 * cs, 46 * cs, Math.PI, Math.PI * 2);
      g.arc(cx + 96 * cs + drift, cy, 42 * cs, Math.PI * 1.5, Math.PI * 0.5);
      g.closePath();
      outlinePath(g, 3.5, '#536878', '#f5f8fa');
    }
    g.beginPath(); g.moveTo(0, 620); g.quadraticCurveTo(420, 470, 960, 560); g.quadraticCurveTo(1480, 630, W, 520); g.lineTo(W, H); g.lineTo(0, H); g.closePath();
    outlinePath(g, 3.5, '#4c6b32', '#95bf56');
    g.beginPath(); g.moveTo(0, 660); g.quadraticCurveTo(640, 610, 1280, 650); g.lineTo(W, 620); g.lineTo(W, H); g.lineTo(0, H); g.closePath();
    outlinePath(g, 3.5, '#4c6b32', '#7ba842');
  } else if (kind === 'battlefield') {
    const sky = g.createLinearGradient(0, 0, 0, 560);
    sky.addColorStop(0, opts.fire ? '#8c2d19' : '#c89b52');
    sky.addColorStop(1, opts.fire ? '#e07a38' : '#e8cd8b');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.beginPath(); g.moveTo(0, 560); g.lineTo(W, 560); g.lineTo(W, H); g.lineTo(0, H); g.closePath();
    outlinePath(g, 3.5, '#6b4f26', '#bf8c42');
    g.beginPath(); g.moveTo(0, 560); g.quadraticCurveTo(450, 500, 960, 540); g.quadraticCurveTo(1450, 490, W, 550); g.lineTo(W, 560); g.closePath();
    outlinePath(g, 2.5, '#6b4f26', '#9e7438');
  } else if (kind === 'tacticalMap') {
    g.fillStyle = '#e8d7ad'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(110, 82, 42, 0.16)'; g.lineWidth = 2;
    for (let gx = 0; gx < W; gx += 120) { g.beginPath(); g.moveTo(gx, 0); g.lineTo(gx, H); g.stroke(); }
    for (let gy = 0; gy < H; gy += 120) { g.beginPath(); g.moveTo(0, gy); g.lineTo(W, gy); g.stroke(); }
    const territories = [
      { cx: 960, cy: 290, rx: 460, ry: 170, fill: 'rgba(62, 92, 154, 0.25)', stroke: '#354f85', name: 'NGỤY (TÀO THÁO)' },
      { cx: 480, cy: 690, rx: 320, ry: 190, fill: 'rgba(67, 138, 78, 0.25)', stroke: '#2f6e38', name: 'THỤC (LƯU BỊ)' },
      { cx: 1420, cy: 690, rx: 320, ry: 190, fill: 'rgba(184, 58, 58, 0.25)', stroke: '#8c2626', name: 'NGÔ (TÔN QUYỀN)' },
    ];
    for (const tr of territories) {
      g.beginPath(); g.ellipse(tr.cx, tr.cy, tr.rx, tr.ry, 0, 0, Math.PI * 2);
      outlinePath(g, 4, tr.stroke, tr.fill);
      text(g, tr.name, tr.cx, tr.cy - tr.ry + 36, { size: 28, weight: 900, color: tr.stroke, align: 'center', base: 'middle' });
    }
    g.save();
    g.setLineDash([18, 12]);
    g.lineDashOffset = -t * 48;
    g.strokeStyle = '#9e2a2b'; g.lineWidth = 6;
    g.beginPath(); g.moveTo(960, 440); g.quadraticCurveTo(720, 520, 580, 620); g.stroke();
    g.beginPath(); g.moveTo(980, 440); g.quadraticCurveTo(1200, 520, 1340, 620); g.stroke();
    g.restore();
  } else if (kind === 'palace') {
    g.fillStyle = '#ddd4c4'; g.fillRect(0, 0, W, H);
    // Perspective room walls
    g.beginPath(); g.moveTo(0, 0); g.lineTo(340, 180); g.lineTo(340, 640); g.lineTo(0, 860); g.closePath(); outlinePath(g, 3, INK, '#c9bea9');
    g.beginPath(); g.moveTo(W, 0); g.lineTo(1580, 180); g.lineTo(1580, 640); g.lineTo(W, 860); g.closePath(); outlinePath(g, 3, INK, '#c9bea9');
    g.beginPath(); g.moveTo(0, 860); g.lineTo(340, 640); g.lineTo(1580, 640); g.lineTo(W, 860); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); outlinePath(g, 3, INK, '#b39268');
    // Dragon banner & throne dais
    g.beginPath(); g.rect(540, 210, 840, 230); outlinePath(g, 3.5, INK, '#424b5c');
    g.beginPath(); g.ellipse(960, 325, 180, 65, 0, 0, Math.PI * 2); outlinePath(g, 3, INK, '#e3b544');
    g.beginPath(); g.rect(680, 490, 560, 160); outlinePath(g, 3.5, INK, '#9e3338');
    // Top red drapery
    g.beginPath(); g.moveTo(0, 0); g.lineTo(W, 0); g.lineTo(W, 95); g.quadraticCurveTo(1440, 145, 960, 95); g.quadraticCurveTo(480, 145, 0, 95); g.closePath();
    outlinePath(g, 3.5, INK, '#a62630');
  } else if (kind === 'bedchamber') {
    g.fillStyle = '#2a221d'; g.fillRect(0, 0, W, H);
    g.beginPath(); g.rect(0, 660, W, 420); outlinePath(g, 3, INK, '#4a3525');
    // Wooden bed on right
    g.beginPath(); g.rect(1080, 610, 540, 140); outlinePath(g, 3.5, INK, '#6e472b');
    g.beginPath(); g.rect(1080, 750, 40, 90); g.rect(1580, 750, 40, 90); outlinePath(g, 3, INK, '#52331d');
    // Candle glow
    const flick = Math.sin(t * 9) * 8;
    const gr = g.createRadialGradient(480, 480, 10, 480, 480, 340 + flick);
    gr.addColorStop(0, 'rgba(255, 200, 90, 0.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  } else if (kind === 'riverbank') {
    const sky = g.createLinearGradient(0, 0, 0, 560);
    sky.addColorStop(0, opts.fire ? '#66180f' : '#2c8f96');
    sky.addColorStop(1, opts.fire ? '#d95326' : '#58b4b8');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    // Water
    g.beginPath(); g.rect(0, 540, W, 540); outlinePath(g, 3, '#1e4e54', opts.fire ? '#a83c24' : '#cdece6');
    // Shore on left
    g.beginPath(); g.moveTo(0, 540); g.lineTo(580, 540); g.quadraticCurveTo(780, 740, 920, 1080); g.lineTo(0, 1080); g.closePath();
    outlinePath(g, 3.5, '#59613b', '#b5bd86');
    // Water ripples
    g.strokeStyle = 'rgba(255,255,255,0.65)'; g.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const rx = 860 + (i % 3) * 320 + Math.sin(t * 2 + i) * 20;
      const ry = 630 + i * 65;
      g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx + 120, ry); g.stroke();
    }
  } else if (kind === 'teaTable') {
    g.fillStyle = '#33241d'; g.fillRect(0, 0, W, H);
    // Warm spotlight
    const gr = g.createRadialGradient(960, 460, 40, 960, 460, 680);
    gr.addColorStop(0, 'rgba(255, 224, 150, 0.28)'); gr.addColorStop(1, 'rgba(0,0,0,0.4)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // Tea table foreground
    g.beginPath(); g.rect(240, 720, 1440, 360); outlinePath(g, 4, INK, '#784a2a');
    // Teapot & cup
    g.beginPath(); g.arc(460, 700, 40, 0, Math.PI * 2); outlinePath(g, 3, INK, '#c99746');
    g.beginPath(); g.rect(560, 695, 34, 34); outlinePath(g, 3, INK, '#f5efe0');
  } else if (kind === 'forestCamp') {
    const sky = g.createLinearGradient(0, 0, 0, 580);
    sky.addColorStop(0, opts.fire ? '#5c140d' : '#7ec4cf');
    sky.addColorStop(1, opts.fire ? '#d9481e' : '#d2edf2');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.beginPath(); g.rect(0, 580, W, 500); outlinePath(g, 3, '#375229', '#5e8542');
    for (let tx = 140; tx < 1850; tx += 220) {
      g.beginPath(); g.rect(tx - 12, 460, 24, 140); outlinePath(g, 2.5, INK, '#6e472b');
      g.beginPath(); g.arc(tx, 410, 85, 0, Math.PI * 2); outlinePath(g, 3, INK, opts.fire ? '#b84220' : '#407336');
    }
  } else if (kind === 'cityGate' || kind === 'snowWall') {
    const snow = kind === 'snowWall';
    g.fillStyle = snow ? '#8fa1b3' : '#7ca7bd'; g.fillRect(0, 0, W, H);
    // City wall
    g.beginPath(); g.rect(180, 220, 1560, 520); outlinePath(g, 4, INK, snow ? '#6f7782' : '#8d877c');
    // Gate arch
    g.beginPath(); g.moveTo(810, 740); g.lineTo(810, 520); g.arc(960, 520, 150, Math.PI, 0); g.lineTo(1110, 740); g.closePath();
    outlinePath(g, 4, INK, opts.gateOpen ? '#23262e' : '#693d24');
    // Ground
    g.beginPath(); g.rect(0, 740, W, 340); outlinePath(g, 3, INK, snow ? '#e2e8f0' : '#b89f74');
    if (snow) {
      g.fillStyle = '#fff';
      for (let i = 0; i < 36; i++) {
        const sx = ((i * 197 + t * 90) % 1920);
        const sy = ((i * 113 + t * 140) % 1080);
        g.beginPath(); g.arc(sx, sy, 4 + (i % 3), 0, Math.PI * 2); g.fill();
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------
// v0.6 — story-matched sets (war council, siege, fleet, peach garden, bridge, mountain pass,
// falling-star night, market, imperial court) + reusable action layers + campaign map.
// Every set keeps the character stage free around y≈560–900 and draws only from t (deterministic).
// ---------------------------------------------------------------------------------------------
const W0 = 1920, H0 = 1080;
const hash = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

// tiltBoat state at shot time t: angle (rad, <0 = left side down), flip (1 → -1 while the boat turns round),
// nA / nB = arrows stuck on the hull's local left / right. Shared with chibi-shot.js so the cast leans with the deck.
export function boatTilt(t, o = {}) {
  const MAX = 0.2, FULL = 21;
  if (o.tilt === 'rebalance') {
    const turn = ease.inOut(clamp((t - 0.7) / 0.8));        // 0.7–1.5 s: swing the boat round
    const fill = ease.out(clamp((t - 1.5) / 1.1));          // 1.5–2.6 s: the other side takes arrows
    const flip = Math.cos(Math.PI * turn);
    const ang = t < 1.5 ? lerp(-MAX, MAX, turn) * Math.abs(flip) : lerp(MAX, 0, fill) + Math.sin(t * 2.4) * 0.01;
    return { ang, flip: Math.abs(flip) < 0.04 ? 0.04 * Math.sign(flip || 1) : flip, nA: FULL, nB: FULL * fill };
  }
  if (o.tilt === 'list') {
    const k = ease.out(clamp(t / 1.6));
    return { ang: -MAX * k + Math.sin(t * 3) * 0.012 * k, flip: 1, nA: FULL * k, nB: 0 };
  }
  return { ang: Math.sin(t * 1.6) * 0.015, flip: 1, nA: 0, nB: 0 };
}

function skyGrad(g, top, bottom, h = 620) {
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, top); sky.addColorStop(1, bottom);
  g.fillStyle = sky; g.fillRect(0, 0, W0, H0);
}

export function drawFlames(g, x, y, w, h, t, seed = 0) {
  const n = Math.max(3, Math.round(w / 34));
  for (let i = 0; i < n; i++) {
    const fx = x + (i + 0.5) * (w / n);
    const fh = h * (0.65 + 0.35 * Math.abs(Math.sin(t * 7 + i * 1.7 + seed)));
    const fw = (w / n) * 0.75;
    for (const [k, col] of [[1, '#e8590c'], [0.66, '#fab005'], [0.33, '#fff3bf']]) {
      g.beginPath();
      g.moveTo(fx - fw * k, y);
      g.quadraticCurveTo(fx - fw * k * 0.9, y - fh * k * 0.55, fx + Math.sin(t * 9 + i) * 6, y - fh * k);
      g.quadraticCurveTo(fx + fw * k * 0.9, y - fh * k * 0.55, fx + fw * k, y);
      g.closePath();
      g.fillStyle = col; g.fill();
    }
  }
}

export function drawSmoke(g, x, y, t, seed = 0, alpha = 0.35) {
  for (let i = 0; i < 5; i++) {
    const ph = (t * 0.35 + i / 5 + seed * 0.13) % 1;
    g.beginPath(); g.arc(x + Math.sin(ph * 6 + seed) * 30, y - ph * 260, 26 + ph * 60, 0, Math.PI * 2);
    g.fillStyle = `rgba(60,55,60,${alpha * (1 - ph)})`; g.fill();
  }
}

export function drawArrowRain(g, t, opts = {}) {
  const { x0 = 200, x1 = 1700, y0 = 120, y1 = 700, count = 26, dir = 1, seed = 0 } = opts;
  g.save(); g.strokeStyle = INK; g.lineWidth = 3;
  for (let i = 0; i < count; i++) {
    const ph = (t * 0.9 + hash(i + seed)) % 1;
    const ax = lerp(x0, x1, hash(i * 3.1 + seed)) + dir * ph * 260;
    const ay = lerp(y0, y1, ph);
    const ang = Math.atan2(y1 - y0, dir * 260);
    g.save(); g.translate(ax, ay); g.rotate(ang);
    g.beginPath(); g.moveTo(-34, 0); g.lineTo(0, 0); g.stroke();
    g.beginPath(); g.moveTo(0, 0); g.lineTo(-9, -5); g.lineTo(-9, 5); g.closePath(); g.fillStyle = INK; g.fill();
    g.beginPath(); g.moveTo(-34, 0); g.lineTo(-40, -5); g.moveTo(-34, 0); g.lineTo(-40, 5); g.stroke();
    g.restore();
  }
  g.restore();
}

function drawBanner(g, x, y, color, glyph, t, seed = 0) {
  g.beginPath(); g.rect(x - 3, y, 6, 190); outlinePath(g, 2.5, INK, '#5b3a22');
  const wave = Math.sin(t * 3 + seed) * 8;
  g.beginPath(); g.moveTo(x + 3, y + 6); g.quadraticCurveTo(x + 50, y + wave, x + 92, y + 10 + wave);
  g.lineTo(x + 92, y + 96 + wave); g.quadraticCurveTo(x + 50, y + 88 + wave, x + 3, y + 92); g.closePath();
  outlinePath(g, 3, INK, color);
  if (glyph) text(g, glyph, x + 47, y + 52 + wave * 0.6, { size: 40, weight: 900, color: '#fff3d6', align: 'center', base: 'middle' });
}

const FACTION = { wei: ['#354f85', 'NGỤY'], shu: ['#2f6e38', 'THỤC'], wu: ['#9b2226', 'NGÔ'], han: ['#b58328', 'HÁN'], dong: ['#4a2525', 'ĐỔNG'], yuan: ['#7a6332', 'VIÊN'], yellow: ['#d4a017', 'KHĂN'], jin: ['#342c44', 'TẤN'] };
const fac = (k) => FACTION[k] || FACTION.han;

function ground(g, y, stroke, fill) { g.beginPath(); g.rect(0, y, W0, H0 - y); outlinePath(g, 3.5, stroke, fill); }

function mountains(g, baseY, color, stroke, seed = 0, peaks = 6, hgt = 260) {
  g.beginPath(); g.moveTo(0, baseY);
  for (let i = 0; i <= peaks; i++) {
    const x = (i / peaks) * W0;
    const h = hgt * (0.55 + 0.45 * hash(i + seed));
    g.lineTo(x - W0 / peaks / 2, baseY - h); g.lineTo(x, baseY - h * 0.55);
  }
  g.lineTo(W0, baseY); g.closePath(); outlinePath(g, 3, stroke, color);
}

function ship(g, x, y, s, t, seed, opts = {}) {
  const bob = Math.sin(t * 2.2 + seed) * 5;
  g.save(); g.translate(x, y + bob); g.scale(s, s); g.rotate(Math.sin(t * 1.7 + seed) * 0.02);
  g.beginPath(); g.moveTo(-120, -10); g.lineTo(120, -10); g.lineTo(92, 34); g.lineTo(-96, 34); g.closePath();
  outlinePath(g, 3.5, INK, opts.straw ? '#c9a35c' : '#7a4b2a');
  g.beginPath(); g.rect(-4, -170, 8, 160); outlinePath(g, 2.5, INK, '#5b3a22');
  g.beginPath(); g.moveTo(-70, -160); g.lineTo(70, -160); g.lineTo(62, -30); g.lineTo(-62, -30); g.closePath();
  outlinePath(g, 3, INK, opts.sail || '#efe2c0');
  g.strokeStyle = 'rgba(30,30,36,0.55)'; g.lineWidth = 2;
  for (let k = 1; k < 4; k++) { const yy = -160 + k * 32; g.beginPath(); g.moveTo(-68 + k * 2, yy); g.lineTo(68 - k * 2, yy); g.stroke(); }
  if (opts.arrows) {
    g.strokeStyle = INK; g.lineWidth = 2;
    for (let k = 0; k < 18; k++) { const ax = -100 + k * 11.5, ay = -4 - (k % 3) * 6; g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax + 12, ay - 26); g.stroke(); }
  }
  if (opts.fire) drawFlames(g, -110, -12, 220, 150, t, seed);
  g.restore();
}

function tent(g, x, y, w, h, color) {
  g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x, y - h); g.lineTo(x + w / 2, y); g.closePath(); outlinePath(g, 3, INK, color);
  g.beginPath(); g.moveTo(x, y - h); g.lineTo(x - w * 0.12, y); g.lineTo(x + w * 0.12, y); g.closePath(); outlinePath(g, 2.5, INK, '#2a2620');
}

function house(g, x, y, w, h, wall, roof) {
  g.beginPath(); g.rect(x, y - h, w, h); outlinePath(g, 3, INK, wall);
  g.beginPath(); g.moveTo(x - 26, y - h); g.quadraticCurveTo(x + w / 2, y - h - 70, x + w + 26, y - h); g.lineTo(x + w + 40, y - h + 8); g.lineTo(x - 40, y - h + 8); g.closePath();
  outlinePath(g, 3, INK, roof);
  g.beginPath(); g.rect(x + w * 0.38, y - h * 0.55, w * 0.24, h * 0.55); outlinePath(g, 2.5, INK, '#4a2f1d');
}

function lantern(g, x, y, t, seed = 0) {
  const sw = Math.sin(t * 2 + seed) * 0.08;
  g.save(); g.translate(x, y); g.rotate(sw);
  g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -30); g.lineTo(0, 0); g.stroke();
  g.beginPath(); g.ellipse(0, 22, 20, 26, 0, 0, Math.PI * 2); outlinePath(g, 2.5, INK, '#d9480f');
  const gl = g.createRadialGradient(0, 22, 2, 0, 22, 70); gl.addColorStop(0, 'rgba(255,190,80,0.35)'); gl.addColorStop(1, 'rgba(255,190,80,0)');
  g.fillStyle = gl; g.fillRect(-70, -48, 140, 140);
  g.restore();
}

function candle(g, x, y, t, seed = 0) {
  g.beginPath(); g.rect(x - 7, y - 36, 14, 36); outlinePath(g, 2, INK, '#f1e3c2');
  const f = Math.sin(t * 11 + seed) * 2;
  g.beginPath(); g.ellipse(x, y - 46 + f * 0.3, 6, 11 + f, 0, 0, Math.PI * 2); g.fillStyle = '#ffd43b'; g.fill();
  const gl = g.createRadialGradient(x, y - 46, 4, x, y - 46, 150); gl.addColorStop(0, 'rgba(255,200,90,0.28)'); gl.addColorStop(1, 'rgba(255,200,90,0)');
  g.fillStyle = gl; g.fillRect(x - 150, y - 196, 300, 300);
}

function miniPawn(g, x, y, s, color, t, seed, expr = 'neutral', prop = 'spear') {
  drawChibiPawn(g, { x, y, scale: s, facing: 1, t, seed, robeColor: color, trimColor: '#a68942', armor: true, hair: 'helm', helmPlume: '#c92a2a', expr, prop });
}

const EXTRA_SETS = {
  // War council / meeting tent: hanging campaign map, low table, candles, faction banners.
  warTent(g, t, o) {
    const [col, glyph] = fac(o.faction);
    g.fillStyle = '#3b2a1f'; g.fillRect(0, 0, W0, H0);
    for (let i = 0; i < 8; i++) {
      g.beginPath(); g.moveTo(i * 240, 0); g.lineTo(i * 240 + 240, 0); g.lineTo(960 + (i - 3.5) * 150, 640); g.lineTo(960 + (i - 4.5) * 150, 640); g.closePath();
      outlinePath(g, 2.5, '#1e1612', i % 2 ? '#6b4a33' : '#5a3d2a');
    }
    g.beginPath(); g.rect(640, 170, 640, 330); outlinePath(g, 4, INK, '#e8d7ad');
    g.beginPath(); g.rect(626, 156, 668, 22); outlinePath(g, 3, INK, '#7a4b2a');
    for (const [cx, cy, rx, c] of [[960, 260, 190, 'rgba(62,92,154,.35)'], [800, 400, 120, 'rgba(67,138,78,.35)'], [1120, 400, 120, 'rgba(184,58,58,.35)']]) {
      g.beginPath(); g.ellipse(cx, cy, rx, 60, 0, 0, Math.PI * 2); outlinePath(g, 2.5, '#5c4932', c);
    }
    g.save(); g.setLineDash([12, 9]); g.lineDashOffset = -t * 40; g.strokeStyle = '#9e2a2b'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(960, 280); g.quadraticCurveTo(1060, 330, 1110, 395); g.stroke(); g.restore();
    ground(g, 640, INK, '#4a3525');
    g.beginPath(); g.rect(420, 600, 1080, 70); outlinePath(g, 3.5, INK, '#7a4b2a');
    g.beginPath(); g.rect(860, 586, 200, 18); outlinePath(g, 2.5, INK, '#f3e1a6');
    candle(g, 520, 600, t, 1); candle(g, 1400, 600, t, 2);
    drawBanner(g, 200, 260, col, glyph, t, 1); drawBanner(g, 1630, 260, col, glyph, t, 2);
  },

  // Siege: crenellated wall, ladders with climbing soldiers, arrows, boulders, optional fire.
  siege(g, t, o) {
    const [col, glyph] = fac(o.faction || 'wei');
    skyGrad(g, o.fire ? '#5c140d' : '#5d7fa3', o.fire ? '#e0662f' : '#d9c7a0');
    mountains(g, 420, '#6b7d8f', '#3c4a57', 3, 7, 170);
    g.beginPath(); g.rect(0, 330, W0, 280); outlinePath(g, 4, INK, '#8d877c');
    for (let x = 0; x < W0; x += 96) { g.beginPath(); g.rect(x, 290, 58, 44); outlinePath(g, 3.5, INK, '#9c968a'); }
    g.strokeStyle = 'rgba(30,30,36,.25)'; g.lineWidth = 2;
    for (let y = 380; y < 600; y += 50) for (let x = (y / 50) % 2 ? 0 : 60; x < W0; x += 120) { g.strokeRect(x, y, 120, 50); }
    g.beginPath(); g.moveTo(830, 610); g.lineTo(830, 430); g.arc(960, 430, 130, Math.PI, 0); g.lineTo(1090, 610); g.closePath(); outlinePath(g, 4, INK, o.gateOpen ? '#23262e' : '#693d24');
    drawBanner(g, 300, 110, col, glyph, t, 3); drawBanner(g, 1540, 110, col, glyph, t, 4);
    for (const lx of [380, 1380, 1640]) {
      g.save(); g.translate(lx, 640); g.rotate(-0.22);
      g.strokeStyle = '#5b3a22'; g.lineWidth = 8; g.beginPath(); g.moveTo(-30, 0); g.lineTo(-30, -430); g.moveTo(30, 0); g.lineTo(30, -430); g.stroke();
      g.lineWidth = 5; for (let r = 30; r < 430; r += 42) { g.beginPath(); g.moveTo(-30, -r); g.lineTo(30, -r); g.stroke(); }
      const climb = ((t * 0.18 + hash(lx)) % 1) * 360;
      miniPawn(g, 0, -40 - climb, 0.42, '#2c2f38', t, lx, 'angry', 'sword');
      g.restore();
    }
    for (let i = 0; i < 2; i++) {
      const ph = (t * 0.45 + i * 0.5) % 1;
      const bx = lerp(-80, 900 + i * 400, ph), by = 520 - Math.sin(ph * Math.PI) * 420;
      g.beginPath(); g.arc(bx, by, 22, 0, Math.PI * 2); outlinePath(g, 3, INK, '#6c6a66');
    }
    if (o.fire) { drawFlames(g, 120, 330, 360, 120, t, 1); drawFlames(g, 1300, 330, 420, 150, t, 2); drawSmoke(g, 300, 220, t, 1); drawSmoke(g, 1500, 200, t, 2); }
    ground(g, 610, '#6b4f26', '#a98348');
    drawArrowRain(g, t, { x0: 200, x1: 1500, y0: 160, y1: 620, count: 16, dir: -1, seed: 5 });
  },

  // River fleet: rows of junks; opts.chained (liên hoàn), opts.fire (hỏa công), opts.straw (thuyền cỏ).
  navalFleet(g, t, o) {
    const night = o.fire || o.straw;
    skyGrad(g, o.fire ? '#4a0f0a' : night ? '#1d2b4a' : '#5aa2b8', o.fire ? '#e8590c' : night ? '#56607a' : '#cdeaf0', 540);
    if (o.straw) { g.fillStyle = 'rgba(230,236,245,0.55)'; for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(((i * 380 + t * 40) % 2300) - 200, 300 + i * 40, 360, 40, 0, 0, Math.PI * 2); g.fill(); } }
    mountains(g, 470, '#4f6b5e', '#2f4038', 9, 8, 120);
    g.beginPath(); g.rect(0, 470, W0, 610); outlinePath(g, 3, '#1e4e54', o.fire ? '#8f3a22' : '#3f8f9a');
    g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 3;
    for (let i = 0; i < 14; i++) { const rx = (i * 173 + t * 30) % 2000 - 40, ry = 520 + (i % 7) * 70; g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx + 90, ry); g.stroke(); }
    const rows = [[520, 0.55, 6], [610, 0.75, 4]];
    const pos = [];
    rows.forEach(([y, s, n], r) => { for (let i = 0; i < n; i++) { const x = 170 + i * (1600 / (n - 0.5)) + r * 90; pos.push([x, y, s]); ship(g, x, y, s, t, i + r * 10, { fire: o.fire && (i + r) % 2 === 0, arrows: o.straw, straw: o.straw, sail: o.faction === 'wu' ? '#f1c9c4' : '#efe2c0' }); } });
    if (o.chained) {
      g.strokeStyle = '#2b2b30'; g.lineWidth = 5; g.setLineDash([10, 6]);
      for (let i = 0; i + 1 < pos.length; i++) if (pos[i][1] === pos[i + 1][1]) { g.beginPath(); g.moveTo(pos[i][0] + 60 * pos[i][2], pos[i][1]); g.lineTo(pos[i + 1][0] - 60 * pos[i + 1][2], pos[i + 1][1]); g.stroke(); }
      g.setLineDash([]);
    }
    if (o.fire) { drawSmoke(g, 500, 380, t, 1, 0.45); drawSmoke(g, 1300, 360, t, 2, 0.45); }
    if (o.straw) drawArrowRain(g, t, { x0: 1300, x1: 1900, y0: 150, y1: 520, count: 18, dir: -1, seed: 9 });
    // foreground deck so the cast stands on a ship, not on water
    const sway = Math.sin(t * 1.6) * 4;
    g.beginPath(); g.moveTo(-20, 820 + sway); g.lineTo(1940, 820 - sway); g.lineTo(1940, 1100); g.lineTo(-20, 1100); g.closePath(); outlinePath(g, 4, INK, '#8a5a34');
    g.strokeStyle = 'rgba(30,30,36,.35)'; g.lineWidth = 3;
    for (let y = 860; y < 1080; y += 46) { g.beginPath(); g.moveTo(0, y + sway * (1 - y / 1080)); g.lineTo(1920, y - sway * (1 - y / 1080)); g.stroke(); }
    g.beginPath(); g.rect(-20, 800 + sway, 1960, 26); outlinePath(g, 3.5, INK, '#6e472b');
  },

  // One big boat close up, listing under arrows (o.tilt 'list') or turning round to take arrows on the
  // other side and level out (o.tilt 'rebalance') — Tôn Quyền at Nhu Tu. Arrows rain in from the left shore.
  tiltBoat(g, t, o) {
    skyGrad(g, '#1d2b4a', '#56607a', 600);
    g.fillStyle = 'rgba(230,236,245,0.35)';
    for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(((i * 420 + t * 35) % 2300) - 200, 260 + i * 46, 380, 38, 0, 0, Math.PI * 2); g.fill(); }
    mountains(g, 560, '#3e5560', '#26343a', 4, 7, 110);
    g.beginPath(); g.rect(0, 560, W0, 520); outlinePath(g, 3, '#1e4e54', '#2f7480');
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 3;
    for (let i = 0; i < 16; i++) { const rx = (i * 157 + t * 40) % 2000 - 40, ry = 600 + (i % 8) * 58; g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx + 80, ry); g.stroke(); }
    drawArrowRain(g, t, { x0: -200, x1: 600, y0: 120, y1: 640, count: 16, dir: 1, seed: 4 });
    const st = boatTilt(t, o);
    g.save(); g.translate(960, 860); g.rotate(st.ang); g.scale(st.flip, 1);
    // hull
    g.beginPath(); g.moveTo(-430, -40); g.lineTo(430, -40); g.quadraticCurveTo(420, 60, 330, 110); g.lineTo(-330, 110); g.quadraticCurveTo(-420, 60, -430, -40); g.closePath();
    outlinePath(g, 4, INK, '#7a4b2a');
    g.strokeStyle = 'rgba(30,30,36,.35)'; g.lineWidth = 3;
    for (const yy of [0, 40, 75]) { g.beginPath(); g.moveTo(-400, yy); g.lineTo(400, yy); g.stroke(); }
    g.beginPath(); g.rect(-440, -58, 880, 22); outlinePath(g, 3.5, INK, '#5e3d24');
    // mast + sail behind the deck
    g.beginPath(); g.rect(222, -420, 14, 380); outlinePath(g, 2.5, INK, '#5b3a22');
    g.beginPath(); g.moveTo(120, -400); g.lineTo(340, -400); g.lineTo(326, -150); g.lineTo(134, -150); g.closePath(); outlinePath(g, 3, INK, '#f1c9c4');
    // arrows stuck in the hull: side A = local left, side B = local right
    const stuck = (n, side) => {
      g.strokeStyle = INK; g.lineWidth = 3;
      for (let k = 0; k < n; k++) {
        const ax = side * (40 + (k % 7) * 52 + hash(k + side * 7) * 18), ay = -30 + Math.floor(k / 7) * 38 + hash(k * 3 + side) * 10;
        g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax - side * 30, ay - 34); g.stroke();
        g.beginPath(); g.moveTo(ax - side * 30, ay - 34); g.lineTo(ax - side * 38, ay - 36); g.moveTo(ax - side * 30, ay - 34); g.lineTo(ax - side * 31, ay - 43); g.stroke();
      }
    };
    stuck(Math.round(st.nA), -1); stuck(Math.round(st.nB), 1);
    g.restore();
  },

  // Peach garden oath: blossoming trees, falling petals, altar with incense.
  peachGarden(g, t) {
    skyGrad(g, '#fbe3e8', '#fff6e6');
    ground(g, 640, '#4c6b32', '#9cc26b');
    for (const [x, y, s] of [[180, 640, 1.2], [520, 600, 0.9], [1420, 600, 0.95], [1760, 650, 1.25], [960, 560, 0.7]]) {
      g.beginPath(); g.moveTo(x - 16 * s, y); g.quadraticCurveTo(x - 6 * s, y - 120 * s, x - 30 * s, y - 220 * s); g.lineTo(x + 10 * s, y - 220 * s); g.quadraticCurveTo(x + 20 * s, y - 120 * s, x + 16 * s, y); g.closePath();
      outlinePath(g, 3, INK, '#6e472b');
      for (let k = 0; k < 7; k++) { g.beginPath(); g.arc(x + Math.cos(k * 0.9) * 90 * s, y - 250 * s + Math.sin(k * 1.3) * 60 * s, 62 * s, 0, Math.PI * 2); outlinePath(g, 2.5, '#b0466a', k % 2 ? '#f7a8c4' : '#f48fb1'); }
    }
    for (let i = 0; i < 40; i++) { const ph = (t * 0.12 + hash(i)) % 1; const px = (hash(i * 7) * W0 + Math.sin(t + i) * 40) % W0; g.beginPath(); g.ellipse(px, ph * 900, 7, 4, ph * 6, 0, Math.PI * 2); g.fillStyle = '#f06595'; g.fill(); }
    g.beginPath(); g.rect(800, 590, 320, 60); outlinePath(g, 3.5, INK, '#9e3338');
    for (const bx of [870, 960, 1050]) { g.beginPath(); g.ellipse(bx, 586, 26, 10, 0, 0, Math.PI * 2); outlinePath(g, 2.5, INK, '#e3b544'); }
    drawSmoke(g, 960, 570, t, 4, 0.2);
  },

  // Trường Bản bridge: wooden bridge over a gorge, dust cloud of the pursuing army.
  bridge(g, t, o) {
    skyGrad(g, '#e9b872', '#f7e3b5');
    mountains(g, 520, '#b98b58', '#6b4f26', 4, 6, 200);
    ground(g, 700, '#6b4f26', '#c69c5d');
    g.beginPath(); g.rect(0, 700, W0, 120); outlinePath(g, 3, '#1e4e54', '#58a3ab');
    g.beginPath(); g.moveTo(300, 720); g.quadraticCurveTo(960, 560, 1620, 720); g.lineTo(1620, 760); g.quadraticCurveTo(960, 600, 300, 760); g.closePath(); outlinePath(g, 4, INK, '#8c5a33');
    g.strokeStyle = INK; g.lineWidth = 3;
    for (let x = 360; x < 1600; x += 80) { const yy = 720 - Math.sin(((x - 300) / 1320) * Math.PI) * 120; g.beginPath(); g.moveTo(x, yy); g.lineTo(x, yy - 60); g.stroke(); }
    for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; g.beginPath(); g.arc(1500 + i * 60 + Math.sin(t * 3 + i) * 20, 600 - ph * 80, 50 + ph * 40, 0, Math.PI * 2); g.fillStyle = `rgba(190,150,100,${0.5 * (1 - ph)})`; g.fill(); }
    for (let i = 0; i < 5; i++) miniPawn(g, 1560 + i * 70, 640 + (i % 2) * 20, 0.38, '#252936', t, i, 'scared');
  },

  // Mountain pass (Nhai Đình, Âm Bình, Kỳ Sơn): layered peaks, winding road, mist.
  mountainPass(g, t, o) {
    skyGrad(g, o.night ? '#1b2240' : '#8fb7c9', o.night ? '#4b5675' : '#e4eef0');
    mountains(g, 520, '#7d8f9c', '#475561', 11, 5, 320);
    mountains(g, 640, '#5b7461', '#33463a', 12, 6, 260);
    g.fillStyle = 'rgba(255,255,255,.35)';
    for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(((i * 520 + t * 25) % 2400) - 240, 470 + i * 30, 300, 34, 0, 0, Math.PI * 2); g.fill(); }
    ground(g, 690, '#33463a', '#6f8b5a');
    g.beginPath(); g.moveTo(1500, 690); g.quadraticCurveTo(1100, 560, 1300, 470); g.quadraticCurveTo(1500, 400, 1250, 330); g.lineTo(1280, 330); g.quadraticCurveTo(1540, 400, 1340, 470); g.quadraticCurveTo(1160, 560, 1600, 690); g.closePath(); outlinePath(g, 2.5, '#6b4f26', '#c9a76b');
    if (o.crowd) for (let i = 0; i < 6; i++) { const ph = (t * 0.08 + i * 0.12) % 1; miniPawn(g, lerp(1560, 1270, ph), lerp(680, 340, ph), lerp(0.4, 0.16, ph), '#2c2f38', t, i, 'angry'); }
  },

  // Night camp with falling star (Ngũ Trượng Nguyên) or omen sky.
  starNight(g, t) {
    skyGrad(g, '#0b1026', '#2a3358', 700);
    for (let i = 0; i < 90; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 3 + i); g.beginPath(); g.arc(hash(i) * W0, hash(i + 50) * 560, 1.5 + (i % 3), 0, Math.PI * 2); g.fillStyle = `rgba(255,250,220,${0.35 + 0.6 * tw})`; g.fill(); }
    const ph = (t * 0.35) % 1;
    const sx = lerp(1500, 700, ph), sy = lerp(80, 470, ph);
    const tr = g.createLinearGradient(sx, sy, sx + 260, sy - 140); tr.addColorStop(0, 'rgba(255,240,180,0.95)'); tr.addColorStop(1, 'rgba(255,240,180,0)');
    g.strokeStyle = tr; g.lineWidth = 8; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + 260, sy - 140); g.stroke();
    g.beginPath(); g.arc(sx, sy, 13, 0, Math.PI * 2); g.fillStyle = '#fff3bf'; g.fill();
    mountains(g, 640, '#1f2a3d', '#0f1522', 21, 6, 160);
    ground(g, 700, '#0f1522', '#27324a');
    for (const [x, s] of [[230, 1], [520, 0.8], [1450, 0.85], [1730, 1.05]]) tent(g, x, 700, 250 * s, 190 * s, '#4a4f63');
    const fl = g.createRadialGradient(960, 760, 10, 960, 760, 420); fl.addColorStop(0, 'rgba(255,170,70,0.35)'); fl.addColorStop(1, 'rgba(255,170,70,0)');
    g.fillStyle = fl; g.fillRect(0, 300, W0, 780);
  },

  // Market street: tiled-roof houses, stalls, lanterns, notice board (cáo thị).
  market(g, t, o) {
    skyGrad(g, '#f4c27a', '#fbe7c2');
    house(g, 60, 640, 300, 230, '#e9d8b4', '#7a2e2e'); house(g, 470, 620, 260, 200, '#efe0c2', '#3d5a6c');
    house(g, 1190, 620, 260, 200, '#e9d8b4', '#3d5a6c'); house(g, 1560, 640, 300, 230, '#efe0c2', '#7a2e2e');
    ground(g, 640, '#6b4f26', '#c8a56e');
    g.beginPath(); g.rect(800, 380, 320, 210); outlinePath(g, 4, INK, '#f3e1a6');
    g.beginPath(); g.rect(790, 370, 340, 18); outlinePath(g, 3, INK, '#7a4b2a');
    text(g, o.notice || 'CÁO THỊ', 960, 430, { size: 34, weight: 900, color: '#9e2a2b', align: 'center', base: 'middle' });
    g.strokeStyle = '#5c4932'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(840, 480 + k * 26); g.lineTo(1080 - (k % 2) * 40, 480 + k * 26); g.stroke(); }
    for (const x of [300, 640, 1280, 1620]) lantern(g, x, 330, t, x);
  },

  // Imperial court: palace hall + two rows of kneeling officials.
  court(g, t, o) {
    drawChibiSet(g, 'palace', t, o);
    for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 4; i++) {
      const x = 960 + side * (520 + i * 110), y = 700 + i * 34;
      drawChibiPawn(g, { x, y, scale: 0.55 + i * 0.05, facing: -side, t, seed: i + side * 7, robeColor: i % 2 ? '#3d5a6c' : '#7a2e2e', trimColor: '#e9c46a', hair: 'crown', hairColor: '#23242b', expr: o.fire ? 'scared' : 'neutral', prop: 'scroll' });
    }
  },
};

// Campaign map: three-kingdom (or warlord) territories, named cities, animated march arrows, year label.
const PLACES = {
  'lạc dương': [960, 330], 'trường an': [720, 330], 'hứa xương': [1090, 400], 'quan độ': [1060, 250], 'hà bắc': [1080, 170],
  'kinh châu': [960, 600], 'xích bích': [1130, 630], 'giang đông': [1520, 640], 'kiến nghiệp': [1560, 600], 'thành đô': [400, 730],
  'hán trung': [600, 470], 'kỳ sơn': [650, 400], 'ngũ trượng nguyên': [770, 380], 'nhai đình': [680, 360], 'di lăng': [860, 660], 'bạch đế': [740, 650],
  'phàn thành': [1000, 520], 'mạch thành': [900, 560], 'âm bình': [520, 560], 'từ châu': [1300, 420], 'trường bản': [1000, 560], 'tây lương': [420, 260],
  'ích châu': [430, 640], 'hạ bì': [1360, 380], 'bạch mã': [1120, 280], 'hổ lao quan': [1030, 330], 'hoa dung': [1060, 600],
  'nhu tu': [1400, 470],
};
export const MAP_PLACES = Object.keys(PLACES);

function drawCampaignMap(g, t, o) {
  g.fillStyle = '#e8d7ad'; g.fillRect(0, 0, W0, H0);
  g.strokeStyle = 'rgba(110, 82, 42, 0.16)'; g.lineWidth = 2;
  for (let gx = 0; gx < W0; gx += 120) { g.beginPath(); g.moveTo(gx, 0); g.lineTo(gx, H0); g.stroke(); }
  for (let gy = 0; gy < H0; gy += 120) { g.beginPath(); g.moveTo(0, gy); g.lineTo(W0, gy); g.stroke(); }
  g.strokeStyle = '#4f8fa0'; g.lineWidth = 7; g.beginPath(); g.moveTo(300, 610); g.bezierCurveTo(700, 560, 1100, 700, 1800, 600); g.stroke();
  g.lineWidth = 5; g.beginPath(); g.moveTo(500, 300); g.bezierCurveTo(800, 260, 1100, 330, 1700, 260); g.stroke();
  const terr = o.era === 'warlords'
    ? [[1180, 190, 240, 'yuan'], [1130, 430, 160, 'wei'], [620, 320, 180, 'dong'], [930, 610, 170, 'han'], [1500, 650, 220, 'wu'], [420, 720, 190, 'shu']]
    : [[960, 300, 470, 'wei'], [470, 690, 320, 'shu'], [1420, 690, 320, 'wu']];
  for (const [cx, cy, rx, k] of terr) {
    const [c, name] = fac(k);
    const hl = o.focus === k ? 0.5 + 0.2 * Math.sin(t * 5) : 0.22;
    g.beginPath(); g.ellipse(cx, cy, rx, rx * 0.42, 0, 0, Math.PI * 2);
    g.globalAlpha = hl; g.fillStyle = c; g.fill(); g.globalAlpha = 1;
    g.lineWidth = o.focus === k ? 6 : 3.5; g.strokeStyle = c; g.stroke();
    text(g, name, cx, cy - rx * 0.42 + 30, { size: 30, weight: 900, color: c, align: 'center', base: 'middle' });
  }
  const shown = new Set();
  (o.arrows || []).forEach(([a, b, k], i) => {
    const A = PLACES[a], B = PLACES[b]; if (!A || !B) return;
    shown.add(a); shown.add(b);
    const p = clamp(t / 1.4 - i * 0.25);
    const mx = (A[0] + B[0]) / 2, my = Math.min(A[1], B[1]) - 80;
    g.save(); g.setLineDash([18, 12]); g.lineDashOffset = -t * 48; g.strokeStyle = fac(k)[0]; g.lineWidth = 7;
    g.beginPath();
    for (let s = 0; s <= 30 * p; s++) { const u = s / 30; const x = (1 - u) * (1 - u) * A[0] + 2 * (1 - u) * u * mx + u * u * B[0]; const y = (1 - u) * (1 - u) * A[1] + 2 * (1 - u) * u * my + u * u * B[1]; s ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke(); g.restore();
    if (p > 0.95) { g.beginPath(); g.arc(B[0], B[1], 18 + Math.sin(t * 8) * 4, 0, Math.PI * 2); g.lineWidth = 4; g.strokeStyle = '#c92a2a'; g.stroke(); }
  });
  (o.places || []).forEach(n => shown.add(n));
  const drawn = [];
  for (const n of shown) {
    const P = PLACES[n]; if (!P) continue;
    if (drawn.some(([x, y]) => Math.hypot(x - P[0], y - P[1]) < 70)) continue;
    drawn.push(P);
    g.beginPath(); g.arc(P[0], P[1], 10, 0, Math.PI * 2); outlinePath(g, 3, INK, '#fff3d6');
    const lbl = n.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    text(g, lbl, P[0], P[1] + 32, { size: 26, weight: 900, color: INK, stroke: '#f3e4b0', strokeWidth: 6, align: 'center', base: 'middle' });
  }
  if (o.label) drawComicBadge(g, 1700, 100, o.label, { bg: '#c92a2a', fg: '#fff', size: 34, tilt: 0.03 });
}

// ---------------------------------------------------------------------------------------------
// v0.7 — more story places: banquet, thatched cottage (snow), wind altar, flood valley,
// cavalry charge, scholar study, empty-fort tower. Same stage contract (cast stands y≈800–880).
// ---------------------------------------------------------------------------------------------
Object.assign(EXTRA_SETS, {
  // Banquet / drinking scene (thanh mai chử tửu, tiệc mừng, rượu nóng chém Hoa Hùng)
  banquet(g, t, o) {
    g.fillStyle = '#4a2c22'; g.fillRect(0, 0, W0, H0);
    for (let x = 0; x < W0; x += 160) { g.beginPath(); g.rect(x, 0, 150, 560); outlinePath(g, 2.5, '#2a1812', x % 320 ? '#6e3b2a' : '#7a4430'); }
    g.beginPath(); g.moveTo(0, 0); g.lineTo(W0, 0); g.lineTo(W0, 80); g.quadraticCurveTo(960, 140, 0, 80); g.closePath(); outlinePath(g, 3.5, INK, '#a62630');
    for (const x of [260, 720, 1200, 1660]) lantern(g, x, 150, t, x);
    ground(g, 560, INK, '#8a5f3a');
    g.beginPath(); g.ellipse(960, 640, 560, 70, 0, 0, Math.PI * 2); outlinePath(g, 4, INK, '#7a4b2a');
    for (let i = 0; i < 6; i++) { const x = 560 + i * 160; g.beginPath(); g.ellipse(x, 622, 34, 14, 0, 0, Math.PI * 2); outlinePath(g, 2.5, INK, i % 2 ? '#e3b544' : '#f1f3f5'); }
    for (const [x, c] of [[700, '#6fae4f'], [1220, '#6fae4f']]) for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x + (k % 2) * 22 - 11, 600 - Math.floor(k / 2) * 18, 11, 0, Math.PI * 2); outlinePath(g, 2, INK, c); }
    g.beginPath(); g.moveTo(940, 560); g.lineTo(980, 560); g.lineTo(990, 616); g.lineTo(930, 616); g.closePath(); outlinePath(g, 3, INK, '#c99746');
    drawSmoke(g, 960, 556, t, 2, 0.18);
  },

  // Thatched cottage at Ngọa Long (Tam cố thảo lư); opts.snow for the second visit.
  cottage(g, t, o) {
    skyGrad(g, o.snow ? '#9aa9b8' : '#a9d3c8', o.snow ? '#e6ecf2' : '#eef6e8');
    mountains(g, 520, o.snow ? '#cfd8e2' : '#7fa38d', o.snow ? '#7c8a99' : '#3f5f4c', 31, 5, 220);
    for (const x of [180, 340, 1620, 1780]) { g.beginPath(); g.rect(x - 10, 340, 20, 300); outlinePath(g, 2.5, INK, '#7a8f4a'); for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(x + (k % 2 ? 30 : -30), 360 + k * 60, 36, 10, k % 2 ? 0.5 : -0.5, 0, Math.PI * 2); outlinePath(g, 2, INK, '#8fbf5a'); } }
    ground(g, 640, '#4c6b32', o.snow ? '#eef2f6' : '#9cc26b');
    g.beginPath(); g.rect(760, 430, 420, 210); outlinePath(g, 3.5, INK, '#d9c49a');
    g.beginPath(); g.moveTo(700, 450); g.lineTo(970, 290); g.lineTo(1240, 450); g.closePath(); outlinePath(g, 3.5, INK, o.snow ? '#f4f6f8' : '#c9a35c');
    g.strokeStyle = 'rgba(30,30,36,.35)'; g.lineWidth = 2; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(760 + k * 55, 410 - (k < 4 ? k : 7 - k) * 30); g.lineTo(740 + k * 60, 448); g.stroke(); }
    g.beginPath(); g.rect(920, 520, 100, 120); outlinePath(g, 3, INK, '#5b3a22');
    g.beginPath(); g.rect(800, 490, 80, 60); outlinePath(g, 3, INK, '#f3e1a6');
    if (o.snow) { g.fillStyle = '#fff'; for (let i = 0; i < 60; i++) { const sx = (i * 197 + t * 70) % W0, sy = (i * 113 + t * 120) % H0; g.beginPath(); g.arc(sx, sy, 3 + (i % 3), 0, Math.PI * 2); g.fill(); } }
  },

  // Seven-star wind altar (đàn cầu gió đông): terraced altar, banners whipping one way.
  windAltar(g, t, o) {
    skyGrad(g, '#2a3358', '#7d6a8c', 600);
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + t * 0.2; g.beginPath(); g.arc(960 + Math.cos(a) * 240, 170 + Math.sin(a) * 50, 6, 0, Math.PI * 2); g.fillStyle = '#ffe8a3'; g.fill(); }
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 4;
    for (let i = 0; i < 10; i++) { const ph = (t * 0.8 + i / 10) % 1; const y = 120 + i * 50; g.beginPath(); g.moveTo(ph * 2200 - 300, y); g.quadraticCurveTo(ph * 2200 - 150, y - 20, ph * 2200, y); g.stroke(); }
    ground(g, 700, '#2f2b38', '#4a4458');
    for (const [w, y, c] of [[900, 700, '#6e472b'], [700, 610, '#7a4b2a'], [500, 520, '#8a5a34']]) { g.beginPath(); g.rect(960 - w / 2, y - 90, w, 90); outlinePath(g, 3.5, INK, c); }
    for (const x of [560, 760, 1160, 1360]) { const wave = Math.sin(t * 6 + x) * 6; g.beginPath(); g.rect(x - 3, 330, 6, 200); outlinePath(g, 2, INK, '#3b2a1f'); g.beginPath(); g.moveTo(x, 336); g.lineTo(x + 90, 330 + wave); g.lineTo(x + 84, 380 + wave); g.lineTo(x, 386); g.closePath(); outlinePath(g, 2.5, INK, ['#2f6e38', '#9b2226', '#354f85', '#e9c46a'][(x / 200 | 0) % 4]); }
  },

  // Flood valley (Phàn Thành / thủy yểm thất quân): rising water, floating debris, wall half-sunk.
  flood(g, t, o) {
    skyGrad(g, '#3d4a5c', '#8a99a8', 520);
    g.strokeStyle = 'rgba(200,215,230,.4)'; g.lineWidth = 2; for (let i = 0; i < 60; i++) { const x = (i * 71 + t * 300) % W0, y = (i * 53 + t * 600) % 700; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 8, y + 26); g.stroke(); }
    mountains(g, 470, '#5d6b78', '#33404c', 41, 6, 180);
    g.beginPath(); g.rect(1240, 300, 560, 240); outlinePath(g, 3.5, INK, '#8d877c');
    for (let x = 1240; x < 1800; x += 80) { g.beginPath(); g.rect(x, 270, 50, 34); outlinePath(g, 3, INK, '#9c968a'); }
    const lvl = 540 - Math.min(1, t / 4) * 60;
    g.beginPath(); g.moveTo(0, lvl);
    for (let x = 0; x <= W0; x += 40) g.lineTo(x, lvl + Math.sin(x * 0.02 + t * 3) * 10);
    g.lineTo(W0, H0); g.lineTo(0, H0); g.closePath(); outlinePath(g, 3, '#2c4f5e', '#5f8797');
    for (let i = 0; i < 5; i++) { const x = (i * 380 + t * 60) % 2100 - 100, y = lvl + 60 + (i % 3) * 70; g.save(); g.translate(x, y + Math.sin(t * 2 + i) * 6); g.rotate(Math.sin(t + i) * 0.3); g.beginPath(); g.rect(-50, -8, 100, 16); outlinePath(g, 2.5, INK, '#6e472b'); g.restore(); }
    g.beginPath(); g.moveTo(-20, 820); g.lineTo(1940, 820); g.lineTo(1940, 1100); g.lineTo(-20, 1100); g.closePath(); outlinePath(g, 4, INK, '#7a4b2a');
  },

  // Cavalry charge: open plain, dust trail, galloping horse silhouettes in the distance.
  cavalry(g, t, o) {
    skyGrad(g, o.fire ? '#7a2414' : '#d9a25b', o.fire ? '#e8590c' : '#f5dfae', 600);
    mountains(g, 560, '#b08453', '#6b4f26', 51, 7, 130);
    ground(g, 600, '#6b4f26', '#c69c5d');
    const [col] = fac(o.faction || 'wei');
    for (let i = 0; i < 7; i++) {
      const ph = (t * 0.35 + i * 0.13) % 1, x = lerp(1900, -150, ph) + (i % 2) * 40, y = 610 + (i % 3) * 26, s = 0.55 + (i % 3) * 0.08, gal = Math.sin(t * 14 + i) * 5;
      g.save(); g.translate(x, y + gal); g.scale(-s, s);
      g.beginPath(); g.ellipse(0, -60, 70, 30, 0, 0, Math.PI * 2); outlinePath(g, 3, INK, '#5b3a22');
      g.beginPath(); g.moveTo(55, -75); g.lineTo(95, -115); g.lineTo(110, -100); g.lineTo(70, -55); g.closePath(); outlinePath(g, 3, INK, '#5b3a22');
      for (const lx of [-45, -25, 25, 45]) { g.beginPath(); g.moveTo(lx, -40); g.lineTo(lx + Math.sin(t * 14 + lx) * 14, 0); g.lineWidth = 6; g.strokeStyle = INK; g.stroke(); }
      g.beginPath(); g.arc(0, -115, 20, 0, Math.PI * 2); outlinePath(g, 3, INK, '#f6d5b8');
      g.beginPath(); g.rect(-18, -100, 36, 40); outlinePath(g, 3, INK, col);
      g.restore();
      g.beginPath(); g.arc(x + 90, y - 10, 30 + ph * 20, 0, Math.PI * 2); g.fillStyle = 'rgba(190,150,100,0.35)'; g.fill();
    }
  },

  // Scholar study (Khổng Minh / Tư Mã Ý reading memorials, Xuất Sư Biểu written by candle).
  study(g, t, o) {
    g.fillStyle = '#2f2620'; g.fillRect(0, 0, W0, H0);
    g.beginPath(); g.rect(160, 120, 520, 460); outlinePath(g, 3.5, INK, '#5b3a22');
    for (let r = 0; r < 4; r++) { g.beginPath(); g.rect(160, 120 + r * 115, 520, 10); outlinePath(g, 2, INK, '#3b2a1f'); for (let k = 0; k < 9; k++) { g.beginPath(); g.rect(185 + k * 54, 140 + r * 115, 30, 85); outlinePath(g, 2, INK, ['#f3e1a6', '#e9d8b4', '#d9c49a'][k % 3]); } }
    g.beginPath(); g.rect(1240, 150, 300, 300); outlinePath(g, 4, INK, '#c9e3f0');
    g.beginPath(); g.arc(1390, 230, 50, 0, Math.PI * 2); g.fillStyle = '#fff3bf'; g.fill();
    g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(1390, 150); g.lineTo(1390, 450); g.moveTo(1240, 300); g.lineTo(1540, 300); g.stroke();
    ground(g, 620, INK, '#4a3525');
    g.beginPath(); g.rect(640, 560, 640, 60); outlinePath(g, 3.5, INK, '#7a4b2a');
    g.beginPath(); g.rect(800, 540, 320, 24); outlinePath(g, 2.5, INK, '#f3e1a6');
    g.strokeStyle = '#3b2a1f'; g.lineWidth = 2; for (let k = 0; k < 9; k++) { g.beginPath(); g.moveTo(820 + k * 32, 544); g.lineTo(820 + k * 32, 560); g.stroke(); }
    candle(g, 700, 560, t, 3);
  },

  // Empty-fort tower (Không thành kế): open gate, sweeping "civilians", zither on the tower.
  emptyFort(g, t, o) {
    skyGrad(g, '#d9b26f', '#f5e3bd');
    g.beginPath(); g.rect(0, 360, W0, 300); outlinePath(g, 4, INK, '#8d877c');
    for (let x = 0; x < W0; x += 96) { g.beginPath(); g.rect(x, 320, 58, 44); outlinePath(g, 3.5, INK, '#9c968a'); }
    g.beginPath(); g.rect(720, 150, 480, 180); outlinePath(g, 4, INK, '#7a2e2e');
    g.beginPath(); g.moveTo(660, 160); g.quadraticCurveTo(960, 60, 1260, 160); g.lineTo(1280, 176); g.lineTo(640, 176); g.closePath(); outlinePath(g, 3.5, INK, '#3d5a6c');
    g.beginPath(); g.rect(880, 270, 160, 26); outlinePath(g, 3, INK, '#a66332');
    g.strokeStyle = '#f3e1a6'; g.lineWidth = 2; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(890, 276 + k * 3.5); g.lineTo(1030, 276 + k * 3.5 + Math.sin(t * 20 + k) * 1.2); g.stroke(); }
    g.fillStyle = INK; for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; text(g, '♪', 1060 + ph * 120, 250 - ph * 90, { size: 34, weight: 900, color: `rgba(30,30,36,${1 - ph})`, align: 'center', base: 'middle' }); }
    drawSmoke(g, 860, 280, t, 3, 0.2);
    g.beginPath(); g.moveTo(830, 660); g.lineTo(830, 520); g.arc(960, 520, 130, Math.PI, 0); g.lineTo(1090, 660); g.closePath(); outlinePath(g, 4, INK, '#23262e');
    ground(g, 660, '#6b4f26', '#c8a56e');
    for (const x of [420, 1500]) { const sw = Math.sin(t * 4 + x) * 0.4; g.save(); g.translate(x, 700); g.rotate(sw); g.beginPath(); g.rect(-3, -90, 6, 90); outlinePath(g, 2, INK, '#8a5a34'); g.beginPath(); g.moveTo(-26, 0); g.lineTo(26, 0); g.lineTo(14, 22); g.lineTo(-14, 22); g.closePath(); outlinePath(g, 2, INK, '#c9a35c'); g.restore(); }
  },
});

// Corner chapter tag (persistent orientation) and chapter-open stamp (no voice needed).
// Generic call-to-action pill (like / subscribe) — plain shapes and text, no platform logo.
export function drawCtaButton(g, x, y, label, opts = {}) {
  const { kind = 'like', scale = 1, tilt = 0 } = opts;
  g.save(); g.translate(x, y); g.rotate(tilt); g.scale(scale, scale);
  g.font = '900 40px Nunito, sans-serif';
  const w = g.measureText(label).width + 110, h = 84;
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.beginPath(); g.roundRect(-w / 2 + 7, -h / 2 + 7, w, h, h / 2); g.fill();
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, h / 2);
  outlinePath(g, 4, INK, kind === 'sub' ? '#c92a2a' : '#ffd166');
  const fg = kind === 'sub' ? '#fff' : INK;
  // icon: bell for subscribe, heart for like (drawn, not a font glyph)
  const ix = -w / 2 + 46;
  g.fillStyle = fg; g.beginPath();
  if (kind === 'sub') { g.moveTo(ix - 16, 12); g.quadraticCurveTo(ix - 14, -22, ix, -22); g.quadraticCurveTo(ix + 14, -22, ix + 16, 12); g.closePath(); g.fill(); g.beginPath(); g.arc(ix, 17, 6, 0, Math.PI * 2); g.fill(); }
  else { g.moveTo(ix, 18); g.bezierCurveTo(ix - 30, -2, ix - 16, -26, ix, -10); g.bezierCurveTo(ix + 16, -26, ix + 30, -2, ix, 18); g.fill(); }
  text(g, label, 22, 2, { size: 40, weight: 900, color: fg, align: 'center', base: 'middle' });
  g.restore();
}

// Comic speech bubble with a tail pointing down-left; k = pop-in progress (0..1+).
export function drawSpeechBubble(g, x, y, label, k = 1) {
  if (k <= 0.01) return;
  g.save(); g.translate(x, y); g.scale(k, k);
  g.font = '900 44px Nunito, sans-serif';
  const w = g.measureText(label).width + 70, h = 110;
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 40);
  g.moveTo(-w / 2 + 60, h / 2 - 4); g.lineTo(-w / 2 + 10, h / 2 + 60); g.lineTo(-w / 2 + 120, h / 2 - 4);
  outlinePath(g, 4, INK, '#fffaf0');
  text(g, label, 0, 2, { size: 44, weight: 900, color: INK, align: 'center', base: 'middle' });
  g.restore();
}

export function drawChapterTag(g, label, alpha = 1) {
  if (!label || alpha <= 0.01) return;
  g.save(); g.globalAlpha = alpha * 0.92;
  g.font = '900 24px Nunito, sans-serif';
  const w = g.measureText(label).width + 40;
  g.beginPath(); g.roundRect(40, 84, w, 46, 8); outlinePath(g, 3, INK, '#14161f');  // below the 60px letterbox
  g.beginPath(); g.rect(40, 84, 10, 46); g.fillStyle = '#c92a2a'; g.fill();
  text(g, label, 40 + w / 2 + 4, 108, { size: 24, weight: 900, color: '#f4e3b2', align: 'center', base: 'middle' });
  g.restore();
}

export function drawChapterOpen(g, label, t) {
  if (!label || t > 2.4) return;
  const k = ease.outBack(clamp(t / 0.35)), out = clamp((2.4 - t) / 0.4);
  g.save(); g.globalAlpha = out;
  g.fillStyle = 'rgba(10,10,16,0.45)'; g.fillRect(0, 380, W0, 220);
  g.translate(960, 490); g.scale(k, k); g.rotate(-0.02);
  const [num, ...rest] = label.split(':');
  drawComicBadge(g, 0, -52, num, { bg: '#c92a2a', fg: '#fff', size: 30, tilt: 0 });
  text(g, rest.join(':').trim(), 0, 30, { size: 62, weight: 900, color: '#f4e3b2', stroke: '#000', strokeWidth: 9, align: 'center', base: 'middle' });
  g.restore();
}

// Impact burst for clashes / punchlines.
export function drawImpact(g, x, y, t, size = 120) {
  if (t < 0 || t > 0.35) return;
  const k = t / 0.35;
  g.save(); g.translate(x, y); g.globalAlpha = 1 - k;
  g.beginPath();
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r = (i % 2 ? 0.45 : 1) * size * (0.6 + k * 0.6); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  g.closePath(); outlinePath(g, 4, INK, '#fff3bf');
  g.restore();
}
