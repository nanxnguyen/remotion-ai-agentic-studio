/**
 * engine/tihon.js — Mascot Tí Hon v3.0 (1:1 Reference Match, Reusable Channel Mascot Rig)
 *
 * Matches canonical channel reference sheets 1:1:
 *   1. PRIMARY: Tí Hon standing in 3/4 view on red/white striped float ("360 TRIỆU NĂM TRƯỚC")
 *   2. SECONDARY: Panicked Tí Hon close-up (2 big eyes, 3 crown spikes, row of sharp white teeth, 3-fingered short arms)
 *
 * Key design anatomy:
 * 1. Compact dark-slate oval base pad (#334155) + big glossy red "VỀ NHÀ" dome button (#ef4444)
 *    + tiny cyan "TUA LẠI" LED on crown — leaving the green dinosaur head & crown spikes 100% visible (no yellow helmet).
 * 2. 3/4-View TWO-EYED Cartoon Dinosaur Head & Integrated Pear Body:
 *    - Vibrant green skin (#48b83e), 2.5D shading (#2e8527), bold dark outline (#142013).
 *    - Pointed dark-green crown/nape spikes (#1b661e) behind the red button pad (3 crown spikes in panic view).
 *    - TWO big expressive white eyes side by side in 3/4 view + two thick expressive dark eyebrows.
 *    - Protruding rounded dinosaur snout with dark-green nostril dot near tip + warm tan/peach cheek blush.
 *    - Separated pale-mint/cream lower jaw (#d8f3b4) + wide dark-maroon open mouth (#581c1c)
 *      with 5 sharp white upper teeth and a rounded pink tongue (#fb7185), driven by 7-shape Vietnamese lip-sync.
 * 3. Ribbed Pale-Cream Belly + Compact Orange Scarf + Short Curved Arms:
 *    - Vertical rounded belly patch (#d8f3b4) with 5 curved horizontal olive-grey rib lines.
 *    - Compact orange scarf (#f97316) around neck crease with two short angled ribbon tails & swingFrom() physics.
 *    - Cute short curved T-Rex arm tucked against upper belly (or 2 raised arms with 3 tiny dinosaur fingers in panic/wave/reach).
 * 4. Pointed Horizontal Triangular Tail + Dark-Green Dorsal Spikes + Chibi Pillar Legs:
 *    - Pointed triangular dinosaur tail sticking out horizontally from lower back with dark-green triangular spikes (#1b661e),
 *      curving cleanly behind the back onto the red "VỀ NHÀ" dome button when tailPress > 0 without obscuring face features.
 *    - Two sturdy chibi pillar legs standing side-by-side with rounded forward feet resting on (x, y).
 */
import {
  clamp,
  lerp,
  ease,
  rng,
  seg,
  circle,
  ring,
  rr,
  poly,
  linGrad,
  radGrad,
  alpha,
  mix,
  glow,
  text,
  FONTS,
} from '/engine/core.js';
import {swingFrom} from '/engine/motion.js';

const INK = '#142013';

const polyS = (g, pts, fill, stroke = INK, lw = 3.5) => {
  poly(g, pts, fill);
  if (stroke) {
    g.strokeStyle = stroke;
    g.lineWidth = lw;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.stroke();
  }
};

const ell = (g, cx, cy, rx, ry, fill, rot = 0, stroke = null, lw = 4) => {
  g.save();
  g.translate(cx, cy);
  g.rotate(rot);
  g.beginPath();
  g.ellipse(0, 0, Math.max(0.5, rx), Math.max(0.5, ry), 0, 0, Math.PI * 2);
  if (fill) {
    g.fillStyle = fill;
    g.fill();
  }
  if (stroke) {
    g.strokeStyle = stroke;
    g.lineWidth = lw;
    g.stroke();
  }
  g.restore();
};

/** Compute skin & belly shades matched to 1:1 reference palette, blending toward frost or soot when needed. */
function getSkinPalette(frost = 0, soot = 0) {
  const fk = clamp(frost);
  const sk = clamp(soot);
  const tint = (base, iceCol, charCol) => {
    let c = base;
    if (fk > 0) c = mix(c, iceCol, fk * 0.62);
    if (sk > 0) c = mix(c, charCol, sk * 0.38);
    return c;
  };
  return {
    skinHi: tint('#63d454', '#e0f2fe', '#57534e'),
    skinMid: tint('#48b83e', '#7dd3fc', '#44403c'),
    skinLow: tint('#2e8527', '#0284c7', '#292524'),
    skinDeep: tint('#1b661e', '#0c4a6e', '#1c1917'),
    spikeCol: tint('#1b661e', '#0369a1', '#1c1917'),
    bellyHi: tint('#e9f9cf', '#f0f9ff', '#a8a29e'),
    bellyMid: tint('#d8f3b4', '#bae6fd', '#78716c'),
    bellyLow: tint('#b9df8a', '#7dd3fc', '#57534e'),
    ribCol: tint('#8aa66c', '#38bdf8', '#57534e'),
    cheekCol: tint('#d0a368', '#93c5fd', '#57534e'),
  };
}

/** Deterministic sweat droplets bursting around head during panic/heat (like reference 2). */
const drawSweatDrops = (g, t, count = 4, x0 = -38, y0 = -28) => {
  const drops = [
    [x0, y0, -0.45, 1.0],
    [x0 - 12, y0 + 18, -0.65, 0.9],
    [-22, -6, 0.1, 0.82],
    [66, -24, 0.55, 0.9],
  ];
  for (let i = 0; i < Math.min(count, drops.length); i++) {
    const [bx, by, rot, sc] = drops[i];
    const phase = (t * 2.0 + i * 0.27) % 1;
    const sx = bx + (i === 3 ? phase * 10 : -phase * 10);
    const sy = by + phase * 14;
    const op = 0.55 + 0.45 * Math.sin(phase * Math.PI);
    g.save();
    g.translate(sx, sy);
    g.rotate(rot);
    g.scale(sc, sc);
    g.fillStyle = alpha('#7dd3fc', op);
    g.strokeStyle = alpha(INK, op * 0.85);
    g.lineWidth = 2.2;
    g.beginPath();
    g.moveTo(0, -9);
    g.quadraticCurveTo(6.5, 2, 0, 8);
    g.quadraticCurveTo(-6.5, 2, 0, -9);
    g.closePath();
    g.fill();
    g.stroke();
    circle(g, -1.5, 1.5, 1.8, alpha('#ffffff', op * 0.9));
    g.restore();
  }
};

/** 6-pointed frost crystal cluster for high-frost states. */
function drawFrostCrystal(g, cx, cy, r, op = 0.9) {
  g.save();
  g.translate(cx, cy);
  g.strokeStyle = alpha('#e0f2fe', op);
  g.lineWidth = Math.max(1.5, r * 0.16);
  g.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI) / 3;
    const dx = Math.cos(a) * r;
    const dy = Math.sin(a) * r;
    seg(g, [[-dx, -dy], [dx, dy]], Math.max(1.5, r * 0.16), alpha('#e0f2fe', op));
  }
  circle(g, 0, 0, r * 0.22, alpha('#ffffff', op));
  g.restore();
}

/** Organic smoky char smudges & rising deterministic ash specks. */
function drawSootLayer(g, t, soot, spots, smokeOrigin = [0, -40]) {
  const sk = clamp(soot);
  if (sk <= 0.05) return;
  g.save();
  for (const [sx, sy, rx, ry, rot] of spots) {
    ell(g, sx, sy, rx, ry, alpha('#1c1917', sk * 0.56), rot);
    ell(g, sx + 2, sy + 1, rx * 0.55, ry * 0.55, alpha('#090d16', sk * 0.42), rot);
  }
  const tick = Math.floor(t * 8);
  for (let i = 0; i < 4; i++) {
    const ph = (t * 0.85 + i * 0.25) % 1;
    const ox = smokeOrigin[0] + Math.sin(t * 4 + i * 2) * 10 + (rng(tick + i * 11)() - 0.5) * 4;
    const oy = smokeOrigin[1] - ph * 38;
    const op = Math.sin(ph * Math.PI) * sk * 0.65;
    circle(g, ox, oy, 4 + ph * 6, alpha('#57534e', op));
    if (i % 2 === 0) {
      circle(g, ox + 12 - ph * 16, oy + 6, 1.8, alpha('#1c1917', op * 1.2));
    }
  }
  g.restore();
}

const resolveExprName = expr =>
  typeof expr === 'object' && expr ? (expr.k >= 0.5 ? expr.to : expr.from) : expr || 'neutral';

/** Draw a pointed dark-green dinosaur spike (#1b661e) with bold outline. */
function drawGreenSpike(g, x0, y0, xTip, yTip, x1, y1, fill = '#1b661e', lw = 3.6) {
  polyS(
    g,
    [
      [x0, y0],
      [xTip, yTip],
      [x1, y1],
    ],
    fill,
    INK,
    lw
  );
}

/**
 * Compact dark-slate oval base pad (#334155) + big glossy red "VỀ NHÀ" dome button (#ef4444)
 * + cyan "TUA LẠI" LED on crown, seated directly on top of Tí Hon's green dinosaur head.
 */
function drawButtonPad(
  g,
  t,
  {
    tailPress = 0,
    pressGlow = 0,
    headlamp = false,
    buttonPulse = true,
    frost = 0,
    soot = 0,
    rewindGlint = false,
    detailLabel = false,
    big = false,
  } = {}
) {
  g.save();
  g.translate(2, -33);

  const dep = clamp(tailPress) > 0.75 ? 3.5 : 0;
  const idlePulse = buttonPulse ? 0.22 + 0.14 * Math.sin(t * 5.2) : 0;
  const effectiveGlow = Math.max(pressGlow, clamp(tailPress) > 0.75 ? 0.92 : idlePulse);
  if (effectiveGlow > 0.08) {
    glow(g, 0, -7 + dep * 0.5, 42 + effectiveGlow * 16, '#ef4444', effectiveGlow * 0.55);
  }

  // Dark-slate oval base pad (#334155 / #475569) with bold dark outline
  const padGrad = linGrad(g, 0, -7, 0, 7, [
    [0, '#64748b'],
    [0.45, '#334155'],
    [1, '#1e293b'],
  ]);
  ell(g, 0, 0, 22.5, 6.8, padGrad, 0, INK, 3.8);
  // Subtle upper grey rim highlight arc
  g.strokeStyle = alpha('#cbd5e1', 0.45);
  g.lineWidth = 2;
  g.beginPath();
  g.ellipse(0, -1, 18, 4.2, 0, Math.PI * 1.1, Math.PI * 1.9);
  g.stroke();

  // Tiny cyan "TUA LẠI" LED toggle on the left rim of the dark-slate pad
  const glintAmt = rewindGlint ? 1 : 0.35 + 0.45 * Math.max(0, Math.sin(t * 3.4));
  circle(g, -16.5, 0.5, 2.7, glintAmt > 0.65 ? '#67e8f9' : '#0284c7');
  ring(g, -16.5, 0.5, 2.7, 1.4, INK);
  if (rewindGlint || detailLabel) {
    glow(g, -16.5, 0.5, 12, '#38bdf8', 0.55);
    text(g, 'TUA LẠI', -22, -8, {
      size: big ? 7.8 : 6.8,
      align: 'right',
      color: '#bae6fd',
      font: FONTS.ui,
      weight: 900,
      stroke: 2.4,
      strokeColor: INK,
    });
  }

  // Big glossy red dome button (#ef4444) sitting on the slate pad
  const btnH = 11.5 - dep * 0.45;
  const btnW = 14.5;
  const btnGrad = radGrad(g, -3, -6 + dep, 2, 16, [
    [0, '#ff7b7b'],
    [0.45, '#ef4444'],
    [1, '#b91c1c'],
  ]);
  g.beginPath();
  g.ellipse(0, -2.5 + dep * 0.4, btnW, btnH, 0, Math.PI, 0);
  g.quadraticCurveTo(btnW, 2.5, 0, 2.8);
  g.quadraticCurveTo(-btnW, 2.5, -btnW, -2.5 + dep * 0.4);
  g.closePath();
  g.fillStyle = btnGrad;
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 3.8;
  g.stroke();

  // Soft glossy pink/white highlight oval on top-left of red dome (1:1 reference match)
  ell(g, -3.8, -7.2 + dep * 0.5, 5.8, 3.0, alpha('#fecaca', 0.88), -0.12);
  ell(g, -4.5, -7.6 + dep * 0.5, 2.6, 1.3, alpha('#ffffff', 0.92), -0.12);

  if (frost > 0.2) {
    drawFrostCrystal(g, 13, -4, 5.5, clamp(frost) * 0.85);
  }
  if (soot > 0.2) {
    ell(g, 7, -4, 6, 3, alpha('#1c1917', soot * 0.45), 0.2);
  }

  // Show "VỀ NHÀ" badge above button when tailPress or detailLabel is active
  if (clamp(tailPress) > 0.35 || detailLabel || pressGlow > 0.3) {
    const lblX = clamp(tailPress) > 0.45 ? 18 : 0;
    const lblY = -19 + dep;
    text(g, 'VỀ NHÀ', lblX, lblY, {
      size: big ? 9.5 : 8.5,
      color: '#fef08a',
      font: FONTS.ui,
      weight: 900,
      stroke: 2.8,
      strokeColor: INK,
    });
  }

  if (headlamp) {
    rr(g, 16, -6, 12, 10, 3);
    g.fillStyle = '#94a3b8';
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 2.4;
    g.stroke();
    circle(g, 28, -1, 4.2, '#fef9c3');
    g.save();
    g.globalCompositeOperation = 'lighter';
    const beam = linGrad(g, 28, -1, 420, -1, [
      [0, 'rgba(254, 249, 195, 0.55)'],
      [0.4, 'rgba(254, 240, 138, 0.24)'],
      [1, 'rgba(254, 240, 138, 0)'],
    ]);
    g.fillStyle = beam;
    g.beginPath();
    g.moveTo(28, -4);
    g.lineTo(440, -150);
    g.lineTo(440, 140);
    g.lineTo(28, 2);
    g.closePath();
    g.fill();
    g.restore();
  }

  g.restore();
}

/**
 * TWO big expressive white eyes side by side in 3/4 view + two thick expressive dark eyebrows
 * with natural curved blink & smooth pupil tracking (look).
 */
function drawTwoEyes34(g, {expr = 'neutral', blink = false, look = [0, 0], dilated = false, t = 0, pal = null} = {}) {
  const exName = resolveExprName(expr);
  const isPanic = exName === 'shocked' || exName === 'scared' || exName === 'panicked';
  const isWorried = exName === 'worried' || exName === 'sad' || exName === 'teary' || exName === 'shiver';
  const lidCol = pal ? pal.skinMid : '#48b83e';

  // Left eye (slightly smaller, further from snout) & Right eye (larger, adjacent to snout bridge)
  const lx = 2.5;
  const ly = -11.5;
  const lr = isPanic ? 10.6 : 9.6;

  const rx = 21.5;
  const ry = -11.2;
  const rrEye = isPanic ? 13.0 : 11.8;

  const drawSingleEye = (cx, cy, er, isRight) => {
    g.save();
    g.translate(cx, cy);
    if (blink) {
      g.strokeStyle = INK;
      g.lineWidth = 3.6;
      g.lineCap = 'round';
      g.beginPath();
      g.arc(0, -er * 0.08, er * 0.82, Math.PI * 0.12, Math.PI * 0.88);
      g.stroke();
      g.restore();
      return;
    }
    if (exName === 'relieved') {
      g.strokeStyle = INK;
      g.lineWidth = 3.4;
      g.lineCap = 'round';
      g.beginPath();
      g.arc(0, -er * 0.1, er * 0.78, Math.PI * 0.15, Math.PI * 0.85);
      g.stroke();
      g.restore();
      return;
    }
    if (exName === 'cry' || exName === 'disgusted') {
      g.strokeStyle = INK;
      g.lineWidth = 3.5;
      g.lineCap = 'round';
      g.beginPath();
      if (isRight) {
        g.moveTo(er * 0.75, -er * 0.38);
        g.lineTo(-er * 0.45, 0);
        g.lineTo(er * 0.75, er * 0.38);
      } else {
        g.moveTo(-er * 0.75, -er * 0.38);
        g.lineTo(er * 0.45, 0);
        g.lineTo(-er * 0.75, er * 0.38);
      }
      g.stroke();
      if (exName === 'cry') {
        ell(g, 0, er * 0.95, er * 0.32, er * 0.52, '#60a5fa');
      }
      g.restore();
      return;
    }

    // Crisp pure white sclera with bold dark outline
    circle(g, 0, 0, er, '#ffffff');
    ring(g, 0, 0, er, isRight ? 3.5 : 3.2, INK);

    if (exName === 'dizzy') {
      text(g, '@', 0, 1.5, {size: er * 1.35, color: INK, font: FONTS.ui, weight: 900});
    } else {
      const panicTrem = exName === 'panicked' ? Math.sin(t * 32) * 0.04 : 0;
      const pupilRatio = isPanic
        ? 0.34 + panicTrem
        : dilated || exName === 'teary'
          ? 0.58
          : 0.52;
      const pr = er * pupilRatio;
      const driftX = t > 0 ? Math.sin(t * 1.8) * 0.035 : 0;
      const driftY = t > 0 ? Math.cos(t * 1.4) * 0.025 : 0;
      const rawLX = (look && look[0] !== undefined && look[0] !== 0 ? look[0] : 0.18) + driftX;
      const rawLY = (look && look[1] !== undefined ? look[1] : 0) + driftY;
      const lookX = clamp(rawLX, -1, 1) * (er - pr) * 0.56;
      const lookY = clamp(rawLY, -1, 1) * (er - pr) * 0.56;

      circle(g, lookX, lookY, pr, INK);
      circle(
        g,
        lookX - pr * 0.28,
        lookY - pr * 0.3,
        Math.max(1.8, pr * 0.34),
        '#ffffff'
      );
      if (exName === 'teary') {
        circle(g, lookX + pr * 0.28, lookY + pr * 0.32, Math.max(1.2, pr * 0.18), '#bae6fd');
        ell(g, 0, er * 1.15, er * 0.24, er * 0.38, '#60a5fa', 0.15);
      }
    }

    if (exName === 'smug' || exName === 'smirk') {
      g.save();
      g.beginPath();
      g.arc(0, 0, er, Math.PI, Math.PI * 2);
      g.closePath();
      g.fillStyle = lidCol;
      g.fill();
      g.strokeStyle = INK;
      g.lineWidth = 3.0;
      g.stroke();
      g.restore();
    }
    g.restore();
  };

  drawSingleEye(lx, ly, lr, false);
  drawSingleEye(rx, ry, rrEye, true);

  // Two thick expressive dark eyebrows above the eyes (matching reference 1 & 2)
  g.save();
  g.strokeStyle = INK;
  g.lineCap = 'round';
  g.lineJoin = 'round';

  if (isPanic || isWorried) {
    g.lineWidth = 4.6;
    g.beginPath();
    g.moveTo(lx - 8, ly - lr - 1.5);
    g.lineTo(lx + 6, ly - lr - 7.5);
    g.stroke();

    g.lineWidth = 5.0;
    g.beginPath();
    g.moveTo(rx - 7, ly - rrEye - 7.5);
    g.lineTo(rx + 10, ly - rrEye - 1.5);
    g.stroke();
  } else if (exName === 'determined' || exName === 'angry') {
    g.lineWidth = 4.8;
    g.beginPath();
    g.moveTo(lx - 7, ly - lr - 6);
    g.lineTo(lx + 7, ly - lr - 2);
    g.moveTo(rx - 8, ry - rrEye - 2);
    g.lineTo(rx + 10, ry - rrEye - 6.5);
    g.stroke();
  } else {
    g.lineWidth = 4.4;
    g.beginPath();
    g.moveTo(lx - 5.5, ly - lr - 3.8);
    g.lineTo(lx + 6.5, ly - lr - 3.8);
    g.stroke();

    g.lineWidth = 5.4;
    g.beginPath();
    g.moveTo(rx - 6.5, ry - rrEye - 3.2);
    g.quadraticCurveTo(rx + 3, ry - rrEye - 6.5, rx + 10.5, ry - rrEye - 2.0);
    g.stroke();
  }
  g.restore();
}

/**
 * Sleek transparent cyan diving goggles over BOTH eyes + yellow J-snorkel behind head,
 * leaving the green snout, row of white teeth, pale lower jaw, and red button pad 100% visible.
 */
function drawDivingMask(g, t, {big = false} = {}) {
  g.save();
  seg(g, [[-31, -11], [-9, -11]], 5.5, '#1e293b');
  seg(g, [[-8, 12], [-34, 14], [-46, -2], [-46, -42]], 6.5, '#facc15');
  seg(g, [[-8, 12], [-34, 14], [-46, -2], [-46, -42]], 2.2, INK);
  rr(g, -51, -50, 10, 10, 3);
  g.fillStyle = '#f97316';
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 2.2;
  g.stroke();

  rr(g, -10, -25, 46, 26, 11);
  g.fillStyle = alpha('#38bdf8', 0.28);
  g.fill();
  g.strokeStyle = '#0f172a';
  g.lineWidth = big ? 4.2 : 3.6;
  g.stroke();

  seg(g, [[-3, -21], [7, -6]], 2.5, alpha('#ffffff', 0.65));
  seg(g, [[17, -21], [27, -6]], 2.5, alpha('#ffffff', 0.65));

  for (let i = 0; i < 2; i++) {
    const ph = (t * 1.4 + i * 0.5) % 1;
    ring(g, -46 + Math.sin(t * 6 + i) * 3.5, -54 - ph * 22, 3 + i, 1.5, alpha('#bae6fd', 1 - ph));
  }
  g.restore();
}

/**
 * Draw 3/4-view two-eyed dinosaur head shell + crown spikes + rounded snout + separated pale lower jaw
 * + dark-maroon mouth cavity with 5 sharp white upper teeth & pink tongue, with expressive 7-shape
 * Vietnamese lip-sync (A, O, U, E, M, F, rest).
 */
function drawHead34(g, pal, {viseme = 'rest', expr = 'neutral', t = 0, rimColor = null} = {}) {
  const exName = resolveExprName(expr);
  const isPanic = exName === 'shocked' || exName === 'scared' || exName === 'panicked';
  const trem = exName === 'panicked' ? Math.sin(t * 42) * 1.1 : 0;

  // Expressive 7-shape Vietnamese lip-sync parameters (jaw opening, mouth corner width, tongue shape)
  let openAmt = 1.0;
  let mLeft = 17;
  let mRight = 54;
  let tongueRx = 13.5;
  let tongueRy = 6.2;

  if (isPanic) {
    openAmt = 1.35;
    mLeft = 15.5;
    mRight = 54.5;
    tongueRx = 14.5;
    tongueRy = 7.0;
  } else if (viseme === 'A') {
    openAmt = 1.24;
    mLeft = 16;
    mRight = 54.5;
    tongueRx = 14.2;
    tongueRy = 6.8;
  } else if (viseme === 'O') {
    openAmt = 1.12;
    mLeft = 19.5;
    mRight = 52;
    tongueRx = 11.5;
    tongueRy = 6.4;
  } else if (viseme === 'U') {
    openAmt = 0.88;
    mLeft = 21.5;
    mRight = 50;
    tongueRx = 9.5;
    tongueRy = 5.2;
  } else if (viseme === 'E') {
    openAmt = 0.94;
    mLeft = 15.5;
    mRight = 55;
    tongueRx = 14.0;
    tongueRy = 5.6;
  } else if (viseme === 'F') {
    openAmt = 0.72;
    mLeft = 17.5;
    mRight = 53.5;
    tongueRx = 11.5;
    tongueRy = 4.6;
  } else if (viseme === 'M') {
    openAmt = 0.42;
    mLeft = 18.5;
    mRight = 52.5;
    tongueRx = 10.0;
    tongueRy = 3.5;
  }

  const jawDrop = (openAmt - 1.0) * 5.8 + trem;

  // 1. Crown & Nape Dark-Green Spikes (#1b661e) behind red button pad
  if (isPanic) {
    drawGreenSpike(g, -29, -12, -39, -27, -18, -23, pal.spikeCol, 3.8);
    drawGreenSpike(g, -21, -21, -24, -41, -8, -27, pal.spikeCol, 3.8);
    drawGreenSpike(g, -11, -26, -7, -43, 3, -27, pal.spikeCol, 3.8);
  } else {
    drawGreenSpike(g, -24, -15, -24, -35, -12, -25, pal.spikeCol, 3.8);
    drawGreenSpike(g, -30, -3, -37, -13, -24, -15, pal.spikeCol, 3.4);
  }

  // 2. Separated Pale-Mint/Cream Lower Jaw (#d8f3b4) + Dark-Maroon Mouth Cavity (#581c1c)
  g.save();
  const jawGrad = linGrad(g, 12, 8, 56, 30 + jawDrop, [
    [0, pal.bellyHi],
    [0.55, pal.bellyMid],
    [1, pal.bellyLow],
  ]);
  g.beginPath();
  g.moveTo(11, 8);
  g.lineTo(56, 7);
  g.bezierCurveTo(61, 14 + jawDrop, 56, 28 + jawDrop, 37, 29 + jawDrop);
  g.bezierCurveTo(21, 30 + jawDrop, 10, 23 + jawDrop * 0.5, 9, 14);
  g.closePath();
  g.fillStyle = jawGrad;
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 4.2;
  g.lineJoin = 'round';
  g.stroke();

  if (exName === 'shiver') {
    const chat = Math.sin(t * 54) * 1.2;
    rr(g, 19, 6 + chat, 35, 12, 5);
    g.fillStyle = '#ffffff';
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 3.2;
    g.stroke();
    seg(g, [[21, 12 + chat], [52, 12 + chat]], 2.2, INK);
    for (const tx of [27, 34, 41, 47]) {
      seg(g, [[tx, 7 + chat], [tx, 17 + chat]], 1.8, '#94a3b8');
    }
  } else {
    g.save();
    g.beginPath();
    g.moveTo(mLeft, 6);
    g.lineTo(mRight, 6);
    g.bezierCurveTo(mRight - 1, 18 + jawDrop, 43, 22 + jawDrop, 33, 22 + jawDrop);
    g.bezierCurveTo(22, 22 + jawDrop, mLeft, 15 + jawDrop * 0.6, mLeft, 6);
    g.closePath();
    g.fillStyle = '#581c1c';
    g.fill();

    g.save();
    g.clip();
    ell(g, 37, 19.5 + jawDrop, tongueRx, tongueRy, '#fb7185', 0, INK, 2.2);
    ell(g, 35, 18.2 + jawDrop, tongueRx * 0.45, tongueRy * 0.35, alpha('#fda4af', 0.55));

    if (isPanic) {
      for (const lx of [23, 30, 38, 45]) {
        polyS(
          g,
          [
            [lx - 2.6, 22 + jawDrop],
            [lx, 15.5 + jawDrop],
            [lx + 2.6, 22 + jawDrop],
          ],
          '#ffffff',
          INK,
          1.8
        );
      }
    }
    g.restore();

    g.strokeStyle = INK;
    g.lineWidth = 3.6;
    g.lineJoin = 'round';
    g.stroke();

    // Row of 5 sharp white upper teeth hanging from upper jaw line (exact match to reference 1 & 2)
    const toothXs = [23.5, 30.2, 37.0, 43.8, 50.2];
    const toothScale = viseme === 'M' ? 0.78 : viseme === 'F' ? 0.92 : 1.0;
    for (let i = 0; i < toothXs.length; i++) {
      const tx = toothXs[i];
      if (tx - 2.5 < mLeft || tx + 2.0 > mRight + 1.5) continue;
      const tw = i === 4 ? 2.4 : 2.9;
      const th = (i === 0 || i === 4 ? 4.4 : 5.0) * toothScale;
      polyS(
        g,
        [
          [tx - tw, 6.2],
          [tx + 0.2, 6.2 + th],
          [tx + tw, 6.2],
        ],
        '#ffffff',
        INK,
        1.9
      );
    }
    g.restore();
  }
  g.restore();

  // 3. Vibrant Green Dinosaur Cranium & Protruding Rounded Snout (#48b83e)
  const headGrad = radGrad(g, 8, -12, 6, 62, [
    [0, pal.skinHi],
    [0.55, pal.skinMid],
    [0.9, pal.skinLow],
    [1, pal.skinDeep],
  ]);

  const traceGreenHead = () => {
    g.beginPath();
    g.moveTo(-25, 22);
    g.bezierCurveTo(-35, 8, -34, -17, -18, -27);
    g.bezierCurveTo(-6, -34, 14, -33, 25, -22);
    g.bezierCurveTo(31, -17, 46, -18, 55, -14);
    g.bezierCurveTo(64, -10, 64, 4, 55, 7);
    g.lineTo(18, 7);
    g.quadraticCurveTo(13, 7, 11, 14);
    g.bezierCurveTo(8, 22, -10, 25, -25, 22);
    g.closePath();
  };

  traceGreenHead();
  g.fillStyle = headGrad;
  g.fill();

  // Subtle 2.5D shading crescent (#2e8527) along back-left of head
  g.save();
  g.clip();
  g.fillStyle = alpha(pal.skinLow, 0.35);
  g.beginPath();
  g.moveTo(-36, -30);
  g.quadraticCurveTo(-22, 0, -20, 28);
  g.lineTo(-38, 28);
  g.closePath();
  g.fill();
  g.restore();

  traceGreenHead();
  g.strokeStyle = INK;
  g.lineWidth = 4.4;
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.stroke();

  // Warm tan/peach oval cheek blush spot just below right eye / above mouth corner
  ell(g, 28, 0.5, 6.2, 3.6, alpha(pal.cheekCol, 0.85), -0.05);

  // Cute dark-green nostril dot near tip of rounded snout
  ell(g, 54.5, -8.5, 2.4, 3.0, '#143d16', -0.2);

  if (rimColor) {
    g.strokeStyle = alpha(rimColor, 0.75);
    g.lineWidth = 3.2;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(31, -15);
    g.quadraticCurveTo(46, -16, 56, -11);
    g.stroke();
  }
}

/**
 * Compact orange scarf (#f97316) wrapped neatly around the neck crease
 * with two short angled ribbon tails on the upper back & swingFrom() physics.
 */
function drawOrangeScarf(g, t, swing = 0, frost = 0) {
  const sway = Math.sin(t * 4.2) * 3.2 + swing * 14;
  const fk = clamp(frost);
  const fCol = c => (fk > 0.15 ? mix(c, '#bae6fd', fk * 0.45) : c);

  g.save();
  polyS(
    g,
    [
      [-18, -103],
      [-48 - sway * 0.4, -85 + sway * 0.25],
      [-39 - sway * 0.35, -78 + sway * 0.2],
      [-12, -93],
    ],
    fCol('#ea580c'),
    INK,
    3.4
  );

  polyS(
    g,
    [
      [-16, -104],
      [-55 - sway * 0.5, -84 + sway * 0.3],
      [-44 - sway * 0.45, -76 + sway * 0.25],
      [-10, -93],
    ],
    fCol('#f97316'),
    INK,
    3.6
  );

  const collarGrad = linGrad(g, -22, -109, 26, -90, [
    [0, fCol('#fb923c')],
    [0.5, fCol('#f97316')],
    [1, fCol('#ea580c')],
  ]);
  rr(g, -22, -108, 48, 17, 8.5);
  g.fillStyle = collarGrad;
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 3.8;
  g.stroke();

  rr(g, -16, -105, 36, 4.5, 2.2);
  g.fillStyle = alpha('#fed7aa', 0.65);
  g.fill();

  if (fk > 0.25) {
    drawFrostCrystal(g, -46, -82, 5.5, fk * 0.85);
    drawFrostCrystal(g, 18, -98, 5.0, fk * 0.85);
  }
  g.restore();
}

/**
 * Compact explorer backpack seated on the mid-back so the crown spikes,
 * orange scarf, and spiked triangular tail all remain 100% visible.
 */
function drawBackpackBack(g, frost = 0, soot = 0) {
  const fk = clamp(frost);
  const sk = clamp(soot);
  const bagCol = c => {
    let r = c;
    if (fk > 0.1) r = mix(r, '#7dd3fc', fk * 0.38);
    if (sk > 0.1) r = mix(r, '#1c1917', sk * 0.35);
    return r;
  };
  const packGrad = linGrad(g, -54, -92, -22, -56, [
    [0, bagCol('#f59e0b')],
    [0.5, bagCol('#d97706')],
    [1, bagCol('#78350f')],
  ]);
  g.save();
  rr(g, -49, -92, 26, 33, 8);
  g.fillStyle = packGrad;
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 3.6;
  g.stroke();

  rr(g, -49, -92, 26, 12, 6);
  g.fillStyle = bagCol('#b45309');
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 3.0;
  g.stroke();

  rr(g, -42, -83, 8, 6, 2);
  g.fillStyle = '#fde047';
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 1.8;
  g.stroke();
  g.restore();
}

function drawBackpackStrap(g) {
  g.save();
  g.strokeStyle = INK;
  g.lineWidth = 7.5;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-12, -91);
  g.quadraticCurveTo(4, -76, -14, -58);
  g.stroke();
  g.strokeStyle = '#d97706';
  g.lineWidth = 4.2;
  g.stroke();
  g.restore();
}

/** Episode 2 & Episode 3 handheld props attached neatly to Tí Hon's hand. */
function drawHandheldItems(g, handX, handY, t, {popsicle, picnicBread, holdingWorm, frost = 0, pointer, prop}) {
  if (popsicle === 'whole' || popsicle === 'melting' || popsicle === 'stick') {
    g.save();
    g.translate(handX + 18, handY + 4);
    g.rotate(0.32);
    const stickGrad = linGrad(g, -3, -24, 3, 10, [
      [0, popsicle === 'stick' ? '#1c1917' : '#e7c08a'],
      [0.45, popsicle === 'stick' ? '#44403c' : '#d6a36e'],
      [1, '#a16207'],
    ]);
    rr(g, -3.5, -24, 7, 30, 3);
    g.fillStyle = stickGrad;
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 2.5;
    g.stroke();

    if (popsicle === 'whole') {
      const popGrad = linGrad(g, -13, -58, 13, -20, [
        [0, '#fda4af'],
        [0.45, '#f43f5e'],
        [1, '#be123c'],
      ]);
      rr(g, -13, -58, 26, 38, 12);
      g.fillStyle = popGrad;
      g.fill();
      g.strokeStyle = INK;
      g.lineWidth = 3;
      g.stroke();
      seg(g, [[-6, -50], [-6, -28]], 3.5, alpha('#ffffff', 0.65));
    } else if (popsicle === 'melting') {
      g.save();
      g.rotate(0.16);
      g.fillStyle = '#fb7185';
      g.strokeStyle = INK;
      g.lineWidth = 2.8;
      g.beginPath();
      g.moveTo(-11, -24);
      g.quadraticCurveTo(-13, -44, 0, -45);
      g.quadraticCurveTo(13, -42, 11, -24);
      g.quadraticCurveTo(5, -16, 0, -24);
      g.quadraticCurveTo(-6, -15, -11, -24);
      g.fill();
      g.stroke();
      for (let i = 0; i < 2; i++) {
        const ph = (t * 2.4 + i * 0.5) % 1;
        ell(g, -6 + i * 12, -16 + ph * 28, 3.2, 5.2, '#f43f5e', 0, INK, 1.4);
      }
      g.restore();
    } else {
      circle(g, 0, -23, 3.5, '#ef4444');
      for (let i = 0; i < 3; i++) {
        const ph = (t * 1.4 + i * 0.33) % 1;
        circle(g, Math.sin(t * 7 + i) * 5, -28 - ph * 26, 3 + ph * 3.5, alpha('#94a3b8', (1 - ph) * 0.7));
      }
    }
    g.restore();
  }

  if (picnicBread) {
    g.save();
    g.translate(handX + 20, handY + 4);
    g.rotate(-0.2);
    const fk = clamp(frost);
    const frozen = fk > 0.3;
    const breadGrad = linGrad(g, -22, -11, 22, 11, [
      [0, mix('#fde68a', '#e0f2fe', fk * 0.85)],
      [0.45, mix('#f59e0b', '#7dd3fc', fk * 0.85)],
      [1, mix('#92400e', '#0369a1', fk * 0.85)],
    ]);
    ell(g, 0, 0, 24, 11, breadGrad, 0, frozen ? '#0c4a6e' : INK, 3.2);
    for (const sx of [-10, 0, 9]) {
      seg(g, [[sx - 2, -6], [sx + 3, 5]], 2.2, frozen ? '#bae6fd' : '#fef3c7');
    }
    if (frozen) {
      poly(g, [[-14, -10], [-9, -18], [-4, -9]], alpha('#e0f2fe', 0.9));
      poly(g, [[4, 9], [9, 17], [13, 8]], alpha('#bae6fd', 0.9));
      drawFrostCrystal(g, 14, -11, 6.5, clamp((fk - 0.3) * 1.4));
    }
    g.restore();
  }

  if (holdingWorm) {
    g.save();
    g.translate(handX + 8, handY + 2);
    const segs = 7;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      pts.push([Math.sin(t * 14 + u * 5.2) * (4 + u * 6), u * 42]);
    }
    seg(g, pts, 11, INK);
    seg(g, pts, 7.5, '#fb7185');
    seg(g, [pts[2], pts[3]], 8.5, '#fecdd3');
    const tip = pts[pts.length - 1];
    circle(g, tip[0] - 2.4, tip[1] - 1, 2.3, '#ffffff');
    circle(g, tip[0] + 2.4, tip[1] - 1, 2.3, '#ffffff');
    circle(g, tip[0] - 2.4, tip[1] - 1, 1.0, INK);
    circle(g, tip[0] + 2.4, tip[1] - 1, 1.0, INK);
    g.restore();
  }

  if (pointer || prop === 'pointer') {
    seg(g, [[handX + 4, handY], [handX + 76, handY - 46]], 5.5, '#fef08a');
    circle(g, handX + 76, handY - 46, 5, '#ef4444');
  } else if (prop === 'fossilPhoto' || prop === 'tornPhoto') {
    g.save();
    g.translate(handX + 26, handY - 22);
    rr(g, -22, -16, 44, 32, 4);
    g.fillStyle = '#f8fafc';
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 3;
    g.stroke();
    if (prop === 'tornPhoto') {
      poly(g, [[2, -16], [22, -16], [22, 16], [6, 16], [10, 4], [0, -4]], INK);
    } else {
      ell(g, 0, 0, 13, 6.5, '#64748b');
      ell(g, 2, 0, 6.5, 3.2, '#cbd5e1');
    }
    g.restore();
  }
}

/** Quadratic Bezier evaluation & tangent helper for tailPress animation. */
function evalQuad(p0, p1, p2, u) {
  const m = 1 - u;
  const x = m * m * p0[0] + 2 * m * u * p1[0] + u * u * p2[0];
  const y = m * m * p0[1] + 2 * m * u * p1[1] + u * u * p2[1];
  const dx = 2 * m * (p1[0] - p0[0]) + 2 * u * (p2[0] - p1[0]);
  const dy = 2 * m * (p1[1] - p0[1]) + 2 * u * (p2[1] - p1[1]);
  const len = Math.hypot(dx, dy) || 1;
  return {x, y, tx: dx / len, ty: dy / len};
}

/**
 * Draw pointed horizontal triangular tail + dark-green dorsal spikes (#1b661e).
 * When tailPress > 0, curves smoothly up behind the back to tap the red "VỀ NHÀ" button on top of the head
 * without crossing or obscuring any facial features.
 */
function drawPointedTail(g, t, pal, tailPress = 0, pass = 'full') {
  const wag = Math.sin(t * 4.2) * 3.5;
  const tp = ease.inOut(clamp(tailPress));

  if (tp <= 0.02) {
    if (pass === 'tip') return;
    const tipX = -97;
    const tipY = -41 + wag;

    // 2 dark-green triangular dorsal spikes (#1b661e) along the top slope of the tail
    drawGreenSpike(
      g,
      lerp(-24, tipX, 0.68),
      lerp(-67, tipY, 0.68) + 1,
      lerp(-24, tipX, 0.61) - 4,
      lerp(-67, tipY, 0.61) - 13,
      lerp(-24, tipX, 0.50),
      lerp(-67, tipY, 0.50) + 1,
      pal.spikeCol,
      3.6
    );
    drawGreenSpike(
      g,
      lerp(-24, tipX, 0.44),
      lerp(-67, tipY, 0.44) + 1,
      lerp(-24, tipX, 0.37) - 4,
      lerp(-67, tipY, 0.37) - 13,
      lerp(-24, tipX, 0.25),
      lerp(-67, tipY, 0.25) + 1,
      pal.spikeCol,
      3.6
    );

    const tailGrad = linGrad(g, -24, -68, tipX, tipY + 6, [
      [0, pal.skinMid],
      [0.7, pal.skinMid],
      [1, pal.skinLow],
    ]);
    g.beginPath();
    g.moveTo(-22, -67);
    g.quadraticCurveTo(-58, -55 + wag * 0.5, tipX, tipY);
    g.quadraticCurveTo(-58, -40 + wag * 0.3, -18, -39);
    g.closePath();
    g.fillStyle = tailGrad;
    g.fill();

    g.strokeStyle = INK;
    g.lineWidth = 4.4;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(-24, -67);
    g.quadraticCurveTo(-58, -55 + wag * 0.5, tipX, tipY);
    g.quadraticCurveTo(-58, -40 + wag * 0.3, -19, -39);
    g.stroke();
    return;
  }

  // Curved tailPress path arching up behind the back to tap the red dome button at (2, -172)
  const p0 = [-20, -52];
  const p1 = [lerp(-68, -112, tp), lerp(-46, -225, tp)];
  const p2 = [lerp(-97, 2, tp), lerp(-41 + wag, -173, tp)];

  const N = 20;
  const topPts = [];
  const botPts = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const {x, y, tx, ty} = evalQuad(p0, p1, p2, u);
    const sign = tp > 0.35 ? 1 : -1;
    const nx = sign * ty;
    const ny = sign * -tx;
    const halfW = lerp(15.5, 2.0, Math.pow(u, 0.82));
    topPts.push([x + nx * halfW, y + ny * halfW, nx, ny]);
    botPts.push([x - nx * halfW, y - ny * halfW]);
  }

  const iStart = pass === 'tip' ? Math.floor(N * 0.42) : 0;
  const iEnd = pass === 'base' ? Math.ceil(N * 0.48) : N;

  for (const su of [0.25, 0.48, 0.7]) {
    if (pass === 'base' && su > 0.46) continue;
    if (pass === 'tip' && su <= 0.46) continue;
    const idx = Math.round(su * N);
    const pt = topPts[idx];
    const sz = lerp(12, 7.5, su);
    const tx = -pt[3];
    const ty = pt[2];
    drawGreenSpike(
      g,
      pt[0] - tx * sz * 0.5,
      pt[1] - ty * sz * 0.5,
      pt[0] + pt[2] * sz * 1.15,
      pt[1] + pt[3] * sz * 1.15,
      pt[0] + tx * sz * 0.5,
      pt[1] + ty * sz * 0.5,
      pal.spikeCol,
      3.2
    );
  }

  g.save();
  g.beginPath();
  g.moveTo(topPts[iStart][0], topPts[iStart][1]);
  for (let i = iStart + 1; i <= iEnd; i++) g.lineTo(topPts[i][0], topPts[i][1]);
  for (let i = iEnd; i >= iStart; i--) g.lineTo(botPts[i][0], botPts[i][1]);
  g.closePath();
  g.fillStyle = pal.skinMid;
  g.fill();

  g.strokeStyle = INK;
  g.lineWidth = 4.2;
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(topPts[iStart][0], topPts[iStart][1]);
  for (let i = iStart + 1; i <= iEnd; i++) g.lineTo(topPts[i][0], topPts[i][1]);
  if (iEnd === N) {
    g.lineTo(botPts[N][0], botPts[N][1]);
  } else {
    g.moveTo(botPts[iEnd][0], botPts[iEnd][1]);
  }
  for (let i = iEnd - 1; i >= iStart; i--) g.lineTo(botPts[i][0], botPts[i][1]);
  g.stroke();
  g.restore();
}

/**
 * Cute short curved T-Rex arm:
 * - When raised (panic / wave / reach / point / coverHead / shrug), shows 3 tiny spread dinosaur fingers.
 * - When resting against the upper belly (idle / talk / float), shows the iconic short curved green arm
 *   tucked against the pale ribbed belly.
 */
function drawShortDinoArm(g, pal, {pose = 'idle', isPanic = false, t = 0, side = 'near', clockOnWrist = false} = {}) {
  const armWave =
    isPanic || pose === 'panic' || pose === 'tumble'
      ? Math.sin(t * 22) * 8
      : pose === 'wave' || pose === 'celebrate'
        ? Math.sin(t * 10) * 8
        : pose === 'shiver'
          ? Math.sin(t * 50) * 2.5
          : 0;

  if (side === 'far') {
    g.save();
    const hx = -56;
    const hy = -112 - armWave * 0.45;
    g.fillStyle = pal.skinMid;
    g.strokeStyle = INK;
    g.lineWidth = 4.0;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(-20, -88);
    g.quadraticCurveTo(-38, -94, hx + 4, hy + 8);
    g.lineTo(hx - 6, hy + 5);
    g.quadraticCurveTo(hx - 10, hy + 2, hx - 3, hy - 1);
    g.lineTo(hx - 8, hy - 7);
    g.quadraticCurveTo(hx - 9, hy - 11, hx - 1, hy - 5);
    g.lineTo(hx + 1, hy - 12);
    g.quadraticCurveTo(hx + 5, hy - 13, hx + 6, hy - 4);
    g.quadraticCurveTo(-34, -100, -16, -97);
    g.closePath();
    g.fill();
    g.stroke();
    g.restore();
    return {handX: hx, handY: hy};
  }

  const isRaised =
    isPanic ||
    pose === 'panic' ||
    pose === 'reach' ||
    pose === 'wave' ||
    pose === 'celebrate' ||
    pose === 'point' ||
    pose === 'pointerStick' ||
    pose === 'coverHead' ||
    pose === 'shrug';

  if (isRaised) {
    const hx =
      pose === 'point' || pose === 'pointerStick'
        ? 48
        : pose === 'coverHead'
          ? 34
          : pose === 'shrug'
            ? 44
            : 48;
    const hy =
      pose === 'point' || pose === 'pointerStick'
        ? -88
        : pose === 'coverHead'
          ? -116
          : pose === 'shrug'
            ? -82
            : -95 + armWave * 0.5;

    g.save();
    g.fillStyle = pal.skinMid;
    g.strokeStyle = INK;
    g.lineWidth = 4.0;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(18, -86);
    g.quadraticCurveTo(34, -92, hx - 4, hy - 4);
    g.lineTo(hx - 1, hy - 12);
    g.quadraticCurveTo(hx + 3, hy - 13, hx + 3, hy - 5);
    g.lineTo(hx + 10, hy - 9);
    g.quadraticCurveTo(hx + 13, hy - 6, hx + 5, hy - 1);
    g.lineTo(hx + 11, hy + 2);
    g.quadraticCurveTo(hx + 11, hy + 6, hx + 3, hy + 5);
    g.quadraticCurveTo(32, -80, 18, -75);
    g.closePath();
    g.fill();
    g.stroke();
    g.restore();

    if (clockOnWrist) {
      const wx = lerp(18, hx, 0.65);
      const wy = lerp(-81, hy, 0.65);
      circle(g, wx, wy, 6.5, '#0f172a');
      ring(g, wx, wy, 6.5, 2, '#facc15');
      seg(g, [[wx, wy], [wx + Math.cos(t * 8) * 4, wy + Math.sin(t * 8) * 4]], 1.6, '#38bdf8');
    }
    return {handX: hx, handY: hy};
  }

  // Default 1:1 tucked curved green arm resting on the pale belly
  const hx = pose === 'shiver' || pose === 'huddle' ? 25 : 28;
  const hy = pose === 'shiver' || pose === 'huddle' ? -72 + armWave : -65 + armWave;

  g.save();
  g.fillStyle = pal.skinMid;
  g.strokeStyle = INK;
  g.lineWidth = 4.0;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(15, -86);
  g.bezierCurveTo(25, -87, 34, -76, hx + 3, hy);
  g.bezierCurveTo(hx + 3, hy + 7, hx - 6, hy + 7, hx - 7, hy + 1);
  g.bezierCurveTo(21, -71, 18, -77, 13, -78);
  g.fill();
  g.beginPath();
  g.moveTo(15, -86);
  g.bezierCurveTo(25, -87, 34, -76, hx + 3, hy);
  g.bezierCurveTo(hx + 3, hy + 7, hx - 6, hy + 7, hx - 7, hy + 1);
  g.bezierCurveTo(21, -71, 18, -77, 14, -78);
  g.stroke();
  g.restore();

  if (clockOnWrist) {
    circle(g, 24, -74, 6.5, '#0f172a');
    ring(g, 24, -74, 6.5, 2, '#facc15');
    seg(g, [[24, -74], [24 + Math.cos(t * 8) * 4, -74 + Math.sin(t * 8) * 4]], 1.6, '#38bdf8');
  }
  return {handX: hx, handY: hy};
}

/**
 * Exported helper to draw the red-and-white striped oval lifebuoy float
 * from reference 1 (and optional green outer tube from reference 2).
 */
export function drawFloat(g, x, y, s = 1, {greenRing = false} = {}) {
  g.save();
  g.translate(x, y);
  g.scale(s, s);

  if (greenRing) {
    const ringGrad = linGrad(g, 0, -42, 0, 26, [
      [0, '#a3e635'],
      [0.5, '#4d7c0f'],
      [1, '#1a2e05'],
    ]);
    ell(g, 0, -8, 102, 36, ringGrad, 0, INK, 4.5);
  }

  const rx = 86;
  const ry = 22;
  g.save();
  g.beginPath();
  g.ellipse(0, 4, rx, ry, 0, 0, Math.PI * 2);
  g.fillStyle = '#ffffff';
  g.fill();
  g.clip();

  const redCol = '#e63926';
  poly(g, [[-18, 4], [-92, -16], [-92, 6], [-24, 9]], redCol);
  poly(g, [[8, 8], [32, 30], [72, 26], [24, 6]], redCol);
  poly(g, [[20, 1], [88, -14], [94, 4], [26, 5]], redCol);
  poly(g, [[-12, 0], [-42, -22], [6, -24], [8, 0]], redCol);
  g.restore();

  ell(g, 0, 4, rx, ry, null, 0, INK, 4.0);
  ell(g, 0, 3, 42, 8.5, '#cbd5e1', 0, '#94a3b8', 2.0);

  g.restore();
}

/**
 * Mascot Tí Hon v3.0: 1:1 channel mascot rig. Feet rest at (x, y).
 */
export function drawTiHon(g, o = {}) {
  const {
    x = 0,
    y = 0,
    s = 1,
    facing = 1,
    t = 0,
    pose = 'idle',
    expr = 'neutral',
    viseme = 'rest',
    blink = false,
    look = [0, 0],
    rim = {color: '#ffd47e', dir: [0, -1]},
    tailPress = 0,
    pressGlow = 0,
    bandages = 0,
    slime = false,
    costume = null,
    headlamp = false,
    sunglasses = false,
    glasses = false,
    goggles = false,
    swing,
    xFn = null,
    squash = 0,
    rot = 0,
    alpha: opa = 1,
    shadow = true,
    prop = null,
    boil = false,
    sweat = false,
    buttonPulse = true,
    backpack = false,
    popsicle = null,
    divingMask = false,
    picnicBread = false,
    frost = 0,
    soot = 0,
    holdingWorm = false,
    pointer = false,
    clockOnWrist = false,
    rewindGlint = false,
  } = o;

  const exName = resolveExprName(expr);
  const isPanic = pose === 'panic' || exName === 'shocked' || exName === 'scared' || exName === 'panicked';
  const fk = clamp(frost);
  const sk = clamp(soot);
  const shivAmt = Math.max(fk, pose === 'shiver' || exName === 'shiver' ? 0.85 : 0);
  const boilTick = Math.floor(t * 12);
  const bx =
    (boil || pose === 'panic' ? (rng(boilTick * 37 + 1)() - 0.5) * 4.0 : 0) +
    (shivAmt > 0.12 ? Math.sin(t * 62) * 3.0 * shivAmt : 0);
  const by =
    (boil || pose === 'panic' ? (rng(boilTick * 53 + 2)() - 0.5) * 3.0 : 0) +
    (shivAmt > 0.12 ? Math.cos(t * 78) * 1.4 * shivAmt : 0);
  const isCalm = pose === 'idle' || pose === 'talk' || pose === 'explain' || pose === 'float' || pose === 'proud';
  const breath = isCalm ? Math.sin(t * 2.7) * 0.012 : 0;
  const bob =
    isCalm
      ? Math.sin(t * 3.2) * 2.5
      : pose === 'tiptoe'
        ? -6 + Math.abs(Math.sin(t * 7)) * 4
        : pose === 'sit' || pose === 'crouch' || pose === 'huddle'
          ? 12
          : 0;
  const sqX = (squash ? 1 / (1 + squash * 0.45) : 1) * (1 + breath);
  const sqY = (squash ? 1 + squash * 0.45 : 1) * (1 + breath * 0.5);
  const effSwing = swing !== undefined ? swing : xFn ? swingFrom(xFn, t, {facing}) : 0;

  const pal = getSkinPalette(fk, sk);

  g.save();
  g.globalAlpha *= opa;
  if (shadow) {
    ell(g, x, y + 3, 46 * s, 11 * s, 'rgba(0,0,0,0.35)');
  }
  g.translate(x + bx, y + by);
  g.scale(facing * s * sqX, s * (2 - sqY));
  if (rot) g.rotate(rot);
  g.translate(0, bob);

  // 1. Compact explorer backpack on mid-back (leaving crown spikes, scarf & tail spikes 100% visible)
  if (backpack) {
    drawBackpackBack(g, fk, sk);
  }

  // 2. Far arm (raised on left side during panic / celebrate / shrug)
  if (isPanic || pose === 'celebrate' || pose === 'shrug') {
    drawShortDinoArm(g, pal, {pose, isPanic, t, side: 'far'});
  }

  // 3. Pointed Horizontal Triangular Tail + Dark-Green Dorsal Spikes (Pass 1)
  const tailPassSplit = clamp(tailPress) > 0.45;
  drawPointedTail(g, t, pal, tailPress, tailPassSplit ? 'base' : 'full');

  // 4. Pear-Shaped Green Torso (#48b83e) + 2.5D Shading (#2e8527) + Ribbed Pale-Cream Belly Patch (#d8f3b4)
  const bodyGrad = linGrad(g, -26, -104, 32, -28, [
    [0, pal.skinHi],
    [0.45, pal.skinMid],
    [1, pal.skinLow],
  ]);
  g.save();
  g.beginPath();
  g.moveTo(-18, -102);
  g.bezierCurveTo(0, -105, 18, -102, 25, -88);
  g.bezierCurveTo(36, -70, 36, -42, 18, -31);
  g.bezierCurveTo(2, -26, -14, -28, -22, -39);
  g.bezierCurveTo(-28, -56, -24, -84, -18, -102);
  g.closePath();
  g.fillStyle = bodyGrad;
  g.fill();

  // Clip inside pear torso for 2.5D back shading & vertical rounded pale-cream belly patch + curved rib lines
  g.save();
  g.clip();
  g.fillStyle = alpha(pal.skinLow, 0.32);
  g.beginPath();
  g.moveTo(-28, -104);
  g.quadraticCurveTo(-14, -68, -16, -28);
  g.lineTo(-32, -28);
  g.closePath();
  g.fill();

  const bellyGrad = linGrad(g, -4, -98, 32, -30, [
    [0, pal.bellyHi],
    [0.55, pal.bellyMid],
    [1, pal.bellyLow],
  ]);
  g.beginPath();
  g.moveTo(-2, -96);
  g.bezierCurveTo(15, -98, 31, -86, 33, -62);
  g.bezierCurveTo(33, -42, 23, -30, 6, -30);
  g.bezierCurveTo(-6, -32, -8, -48, -7, -68);
  g.bezierCurveTo(-7, -84, -5, -93, -2, -96);
  g.closePath();
  g.fillStyle = bellyGrad;
  g.fill();

  // 5 curved horizontal olive-grey rib lines across the pale belly patch
  g.strokeStyle = pal.ribCol;
  g.lineWidth = 2.4;
  g.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const ry = -84 + i * 10.5;
    g.beginPath();
    g.moveTo(2, ry);
    g.quadraticCurveTo(14, ry - 2.5, 23, ry + 1.5);
    g.stroke();
  }
  g.restore();

  // Stroke outer torso contour cleanly
  g.strokeStyle = INK;
  g.lineWidth = 4.4;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(-23, -66);
  g.bezierCurveTo(-25, -80, -22, -92, -18, -102);
  g.moveTo(19, -98);
  g.bezierCurveTo(35, -80, 37, -43, 17, -31);
  g.stroke();
  g.restore();

  // 5. Far Chibi Pillar Leg (standing side-by-side behind near leg)
  const step =
    pose === 'run' || pose === 'dogpaddle' || pose === 'swim'
      ? Math.sin(t * 16) * 12
      : pose === 'walk'
        ? Math.sin(t * 7) * 8
        : pose === 'tiptoe'
          ? 5
          : 0;
  const heelLift = pose === 'tiptoe' ? -5 : 0;
  g.save();
  g.translate(-step * 0.5, heelLift * 0.6);
  g.fillStyle = mix(pal.skinMid, pal.skinLow, 0.25);
  g.strokeStyle = INK;
  g.lineWidth = 4.4;
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-19, -40);
  g.lineTo(-16, -9);
  g.quadraticCurveTo(-15, 1, -2, 1);
  g.lineTo(10, 1);
  g.quadraticCurveTo(15, 0, 14, -10);
  g.lineTo(6, -40);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(-19, -39);
  g.lineTo(-16, -9);
  g.quadraticCurveTo(-15, 1, -2, 1);
  g.lineTo(4, 1);
  g.stroke();
  g.restore();

  if (backpack) {
    drawBackpackStrap(g);
  }

  // 6. Near Chibi Pillar Leg + Rounded Forward Foot
  g.save();
  g.translate(step * 0.6, heelLift);
  g.fillStyle = pal.skinMid;
  g.strokeStyle = INK;
  g.lineWidth = 4.4;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(-4, -56);
  g.quadraticCurveTo(7, -64, 16, -52);
  g.lineTo(16, -15);
  g.quadraticCurveTo(30, -15, 30, -5);
  g.quadraticCurveTo(30, 1, 14, 1);
  g.lineTo(2, 1);
  g.quadraticCurveTo(-5, 1, -5, -8);
  g.lineTo(-5, -36);
  g.closePath();
  g.fill();

  g.beginPath();
  g.moveTo(16, -50);
  g.lineTo(16, -15);
  g.quadraticCurveTo(30, -15, 30, -5);
  g.quadraticCurveTo(30, 1, 14, 1);
  g.lineTo(2, 1);
  g.quadraticCurveTo(-5, 1, -5, -8);
  g.lineTo(-5, -34);
  g.stroke();
  g.restore();

  if (costume === 'scientist') {
    const coatGrad = linGrad(g, -28, -98, 12, -34, [
      [0, '#ffffff'],
      [0.65, '#f1f5f9'],
      [1, '#cbd5e1'],
    ]);
    polyS(g, [[-22, -98], [-4, -98], [4, -34], [-30, -36]], coatGrad, INK, 3.4);
    rr(g, -22, -68, 12, 13, 2);
    g.fillStyle = '#e2e8f0';
    g.fill();
    seg(g, [[-18, -68], [-18, -74]], 2.8, '#2563eb');
    seg(g, [[-14, -68], [-14, -73]], 2.8, '#ef4444');
  }

  if (sk > 0.05) {
    drawSootLayer(
      g,
      t,
      sk,
      [
        [8, -68, 12, 8, 0.2],
        [-16, -54, 10, 7, -0.3],
      ],
      [-6, -110]
    );
  }

  // 7. Compact Orange Scarf around neck crease
  drawOrangeScarf(g, t, effSwing, fk);

  // 8. Near Short Curved Dinosaur Arm + Handheld Props
  const {handX, handY} = drawShortDinoArm(g, pal, {
    pose,
    isPanic: isPanic || Boolean(popsicle || picnicBread || holdingWorm || pointer || prop),
    t,
    side: 'near',
    clockOnWrist,
  });
  drawHandheldItems(g, handX, handY, t, {popsicle, picnicBread, holdingWorm, frost: fk, pointer, prop});

  // 9. 3/4-View TWO-EYED Cartoon Dinosaur Head + Red Button Pad on Crown
  g.save();
  const headBobY = isCalm ? Math.sin(t * 3.2 - 0.35) * 0.8 : 0;
  g.translate(0, -132 + headBobY);
  const headTilt =
    pose === 'panic'
      ? -0.08
      : pose === 'lookUp' || pose === 'awe'
        ? -0.18
        : pose === 'point' || pose === 'proud'
          ? 0.05
          : Math.sin(t * 2.7 - 0.45) * 0.028;
  g.rotate(headTilt);

  // Draw green dinosaur head shell, crown spikes, rounded snout, row of white teeth & pale lower jaw
  drawHead34(g, pal, {viseme, expr, t, rimColor: rim?.color});

  if (sk > 0.05) {
    drawSootLayer(
      g,
      t,
      sk,
      [
        [4, 2, 9, 5, 0.2],
        [-16, -8, 10, 6, -0.4],
      ],
      [6, -68]
    );
  }
  if (fk > 0.22) {
    drawFrostCrystal(g, -18, 4, 6.0, fk * 0.85);
    const bph = (t * 0.9) % 1;
    ell(g, 66 + bph * 24, 6 - bph * 8, 7 + bph * 8, 5 + bph * 4, alpha('#e0f2fe', (1 - bph) * fk * 0.55));
  }

  // TWO big expressive white eyes side by side + two thick dark eyebrows
  drawTwoEyes34(g, {expr, blink, look, dilated: isPanic && exName !== 'shocked', t, pal});

  if (divingMask) {
    drawDivingMask(g, t, {big: false});
  }
  if (goggles || costume === 'scientist') {
    seg(g, [[-29, -11], [-9, -11]], 4.5, '#334155');
    rr(g, -9, -23, 44, 22, 9);
    g.fillStyle = alpha('#38bdf8', 0.32);
    g.fill();
    g.strokeStyle = '#475569';
    g.lineWidth = 3.2;
    g.stroke();
    seg(g, [[-2, -19], [7, -7]], 2.2, alpha('#ffffff', 0.68));
    seg(g, [[17, -19], [26, -7]], 2.2, alpha('#ffffff', 0.68));
  }
  if (sunglasses) {
    rr(g, -9, -22, 44, 18, 5);
    g.fillStyle = '#0f172a';
    g.fill();
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 2.6;
    g.stroke();
    seg(g, [[-3, -19], [5, -10]], 2.0, alpha('#ffffff', 0.55));
    seg(g, [[16, -19], [24, -10]], 2.0, alpha('#ffffff', 0.55));
  }
  if (glasses) {
    ring(g, 2.5, -11.5, 10.5, 2.6, '#0f172a');
    ring(g, 21.5, -11.2, 12.6, 2.6, '#0f172a');
    seg(g, [[-18, -12], [-8, -12]], 2.4, '#0f172a');
  }

  // Compact dark-slate oval base pad + big glossy red "VỀ NHÀ" dome button on top of crown
  drawButtonPad(g, t, {
    tailPress,
    pressGlow,
    headlamp,
    buttonPulse,
    frost: fk,
    soot: sk,
    rewindGlint,
    detailLabel: false,
    big: false,
  });

  if (bandages > 0) {
    g.save();
    g.globalAlpha *= clamp(bandages, 0.35, 1);
    g.translate(-16, -8);
    g.rotate(-0.35);
    rr(g, -9, -3.5, 18, 7, 2.5);
    g.fillStyle = '#fef3c7';
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 2.2;
    g.stroke();
    if (bandages > 1) {
      g.rotate(0.7);
      rr(g, -9, -3.5, 18, 7, 2.5);
      g.fillStyle = '#fef3c7';
      g.fill();
      g.stroke();
    }
    g.restore();
  }
  if (slime) {
    poly(g, [[-10, 20], [-4, 40], [2, 22], [14, 48], [22, 20]], alpha('#84cc16', 0.88));
    circle(g, -4, 42, 3.8, alpha('#bef264', 0.9));
    circle(g, 14, 51, 4.2, alpha('#bef264', 0.9));
  }
  if (sweat || isPanic) {
    drawSweatDrops(g, t, 4, -36, -24);
  }
  g.restore(); // end head

  // Pass 2 of tailPress: render arched tail tip pressing ON TOP of the red dome button
  if (tailPassSplit) {
    drawPointedTail(g, t, pal, tailPress, 'tip');
  }

  g.restore();
}

/**
 * Giant expressive close-up face of Tí Hon v3.0 (2 big eyes, crown spikes, row of 5 sharp teeth, red button pad).
 */
export function bigFaceTiHon(g, x, y, r, o = {}) {
  const {
    expr = 'shocked',
    viseme = 'rest',
    blink = false,
    look = [0, 0],
    t = 0,
    rimColor = '#fde047',
    bandages = 0,
    sweat = false,
    goggles = false,
    divingMask = false,
    glasses = false,
    sunglasses = false,
    headlamp = false,
    tailPress = 0,
    pressGlow = 0,
    backdropGlow = false,
    frost = 0,
    soot = 0,
    swing,
    dilated,
    rewindGlint = false,
  } = o;

  const exName = resolveExprName(expr);
  const fk = clamp(frost);
  const sk = clamp(soot);
  const pal = getSkinPalette(fk, sk);
  const s = (r / 52) * 1.22;
  const shivAmt = Math.max(fk, exName === 'shiver' ? 0.9 : 0);
  const sx = shivAmt > 0.12 ? Math.sin(t * 62) * 3.5 * shivAmt : 0;
  const sy = shivAmt > 0.12 ? Math.cos(t * 78) * 1.6 * shivAmt : 0;
  const effDilated = dilated !== undefined ? dilated : exName === 'panicked' || exName === 'teary';

  g.save();
  g.translate(x + sx, y + sy);
  g.scale(s, s);

  if (backdropGlow) {
    glow(g, 6, -6, 125, rimColor || '#38bdf8', 0.25);
  }
  if (rimColor) {
    glow(g, 8, -8, 75, rimColor, 0.2);
  }

  // Green upper torso & belly snippet below scarf for natural bust framing
  g.save();
  g.translate(0, 128);
  g.beginPath();
  g.moveTo(-20, -104);
  g.bezierCurveTo(2, -106, 22, -102, 28, -76);
  g.lineTo(-24, -76);
  g.closePath();
  g.fillStyle = pal.skinMid;
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 4.2;
  g.stroke();
  drawOrangeScarf(g, t, swing !== undefined ? swing : Math.sin(t * 8) * 0.2, fk);
  g.restore();

  // 3/4-View two-eyed dinosaur head shell + crown spikes + row of white teeth + pale lower jaw
  drawHead34(g, pal, {viseme, expr, t, rimColor});

  if (sk > 0.05) {
    drawSootLayer(
      g,
      t,
      sk,
      [
        [-8, 8, 12, 7, -0.2],
        [-22, -12, 11, 8, 0.3],
      ],
      [-8, -68]
    );
  }

  // TWO big expressive white eyes side by side + thick dark eyebrows
  drawTwoEyes34(g, {expr, blink, look, dilated: effDilated, t, pal});

  if (divingMask) {
    drawDivingMask(g, t, {big: true});
  }
  if (goggles) {
    seg(g, [[-29, -11], [-9, -11]], 4.8, '#334155');
    rr(g, -9, -23, 44, 22, 9);
    g.fillStyle = alpha('#38bdf8', 0.32);
    g.fill();
    g.strokeStyle = '#475569';
    g.lineWidth = 3.4;
    g.stroke();
    seg(g, [[-2, -19], [7, -7]], 2.4, alpha('#ffffff', 0.68));
    seg(g, [[17, -19], [26, -7]], 2.4, alpha('#ffffff', 0.68));
  }
  if (sunglasses) {
    rr(g, -9, -22, 44, 18, 5);
    g.fillStyle = '#0f172a';
    g.fill();
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 2.8;
    g.stroke();
  }
  if (glasses) {
    ring(g, 2.5, -11.5, 10.5, 2.8, '#0f172a');
    ring(g, 21.5, -11.2, 12.6, 2.8, '#0f172a');
  }

  if (fk > 0.2) {
    drawFrostCrystal(g, -22, 8, 6.5, fk * 0.9);
  }

  // Compact dark-slate oval base pad + big glossy red "VỀ NHÀ" dome button on crown
  drawButtonPad(g, t, {
    tailPress,
    pressGlow,
    headlamp,
    frost: fk,
    soot: sk,
    rewindGlint,
    detailLabel: true,
    big: true,
  });

  if (bandages > 0) {
    g.save();
    g.globalAlpha *= clamp(bandages, 0.35, 1);
    g.translate(-18, -10);
    g.rotate(-0.3);
    rr(g, -11, -4, 22, 8, 3);
    g.fillStyle = '#fef3c7';
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = 2.4;
    g.stroke();
    g.restore();
  }
  if (sweat || exName === 'shocked' || exName === 'scared' || exName === 'panicked' || exName === 'worried') {
    drawSweatDrops(g, t, 4, -36, -24);
  }
  g.restore();
}
