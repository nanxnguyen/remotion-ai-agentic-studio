// engine/puppet2d.js — 2.5D multi-layer puppet helpers (DOM-free, deterministic, 16:9 & 9:16 unified).
import { E, clamp, noise, alpha, radGrad, visemeAt } from './core.js';

const VISEME_OPEN = {
  rest: 0,
  M: 0.08,
  F: 0.28,
  U: 0.55,
  E: 0.68,
  O: 0.84,
  A: 0.95,
  AA: 0.95,
};

function isImageReady(img) {
  if (!img) return false;
  if ('complete' in img && !img.complete) return false;
  if ('naturalWidth' in img && !img.naturalWidth) return false;
  return true;
}

function imgDims(img, fallbackW = 1920, fallbackH = 1080) {
  return [
    Math.max(1, img?.naturalWidth || img?.width || fallbackW),
    Math.max(1, img?.naturalHeight || img?.height || fallbackH),
  ];
}

/**
 * Computes cover-fit placement for an image inside a stage with overscan padding
 * and normalized focal framing, returning coordinate mappers for [0..1] overlays.
 */
export function computeCoverTransform(
  imgW,
  imgH,
  stageW,
  stageH,
  pad = 90,
  focusX = 0.5,
  focusY = 0.5,
) {
  const iw = Math.max(1, imgW || stageW || 1920);
  const ih = Math.max(1, imgH || stageH || 1080);
  const sw = Math.max(1, stageW || 1920);
  const sh = Math.max(1, stageH || 1080);
  const targetW = sw + pad * 2;
  const targetH = sh + pad * 2;
  const scale = Math.max(targetW / iw, targetH / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const fx = clamp(focusX, 0, 1);
  const fy = clamp(focusY, 0, 1);
  const dx = clamp(sw * 0.5 - fx * dw, sw + pad - dw, -pad);
  const dy = clamp(sh * 0.5 - fy * dh, sh + pad - dh, -pad);

  return {
    dx,
    dy,
    dw,
    dh,
    scale,
    stageW: sw,
    stageH: sh,
    mapX: (nx) => dx + nx * dw,
    mapY: (ny) => dy + ny * dh,
  };
}

/**
 * Deterministic per-frame puppet state derived strictly from time `t` and `opts`.
 */
export function puppetFrameState(t, opts = {}) {
  const seed = opts.seed ?? 1;
  const period = Math.max(0.4, opts.period ?? 3.2);
  const blinkDur = clamp(opts.blinkDur ?? 0.18, 0.05, period * 0.5);
  const breathRate = opts.breathRate ?? 1.45;
  const breathAmp = opts.breathAmp ?? 3.5;
  const breathScaleAmp = opts.breathScaleAmp ?? 0.006;
  const eyeAmp = opts.eyeAmp ?? 2.5;
  const lampSpeed = opts.lampSpeed ?? 1.35;
  const lampAmp = opts.lampAmp ?? 0.06;
  const flickerRate = opts.flickerRate ?? 9;

  const breathPhase = t * breathRate + seed * 0.73;
  const breathY = Math.sin(breathPhase) * breathAmp;
  const breathScale = 1 + Math.sin(breathPhase) * breathScaleAmp;

  const phaseOffset = ((Math.abs(seed) * 0.6180339887) % 1) * period;
  const local = (((t + phaseOffset) % period) + period) % period;
  const blink = local < blinkDur ? clamp(Math.sin((local / blinkDur) * Math.PI), 0, 1) : 0;

  const sacIdx = Math.floor(t * 1.2 + seed * 0.31);
  const eyeShiftX = noise(sacIdx * 1.7, seed + 3) * eyeAmp;
  const eyeShiftY = noise(sacIdx * 2.3, seed + 11) * (eyeAmp * 0.55);

  const lampAngle =
    Math.sin(t * lampSpeed + seed * 1.1) * lampAmp +
    Math.sin(t * lampSpeed * 2.1 + seed) * (lampAmp * 0.25);

  const wobble = 0.5 + 0.5 * noise(t * flickerRate, seed + 17);
  const drop =
    noise(t * 2.7, seed + 29) > 0.72 && noise(t * 23, seed + 21) > -0.2 ? 0.52 : 1;
  const lampFlicker = clamp((1 - 0.15 * wobble) * drop, 0.25, 1.05);

  return {
    breathY,
    breathScale,
    blink,
    eyeShiftX,
    eyeShiftY,
    lampAngle,
    lampFlicker,
  };
}

/**
 * Deterministic horizontal scanline offsets for river/water ripple animation.
 */
export function waterSliceOffsets(t, slices = 18, amp = 6) {
  const count = Math.max(1, Math.round(slices));
  const out = new Array(count);
  for (let i = 0; i < count; i++) {
    const frac = i / count;
    const wave =
      0.72 * Math.sin(t * 2.6 + i * 0.85) + 0.28 * Math.cos(t * 4.1 - i * 1.45);
    const depthGain = 0.45 + 0.55 * frac;
    out[i] = { frac, dx: wave * amp * depthGain };
  }
  return out;
}

/**
 * Maps `core.js` `visemeAt(globalT, from, to)` (or a test stub) into `{ active, open, shape }`.
 */
export function dialogueMouthOpen(
  globalT,
  isDialogue,
  visemeAtFn = visemeAt,
  from = -1e9,
  to = 1e9,
) {
  if (!isDialogue) return { active: false, open: 0, shape: 'rest' };
  const raw = typeof visemeAtFn === 'function' ? visemeAtFn(globalT, from, to) : null;
  if (!raw || raw === 'rest') return { active: false, open: 0, shape: 'rest' };

  if (typeof raw === 'object') {
    const shape = String(raw.shape || raw.v || 'rest');
    if (shape === 'rest') return { active: false, open: 0, shape: 'rest' };
    const open =
      typeof raw.open === 'number'
        ? clamp(raw.open, 0, 1)
        : VISEME_OPEN[shape] ?? 0.45;
    return { active: open > 0.02, open, shape };
  }

  const shape = String(raw);
  const open = VISEME_OPEN[shape] ?? 0.45;
  return { active: open > 0.02, open, shape };
}

/**
 * Draws an image into the cover-mapped rectangle `xf`.
 */
export function drawCoverMapped(g, img, xf, opts = {}) {
  if (!isImageReady(img) || !xf) return;
  g.save();
  if (typeof opts.alpha === 'number') g.globalAlpha *= opts.alpha;
  const filter =
    opts.filter || (opts.desat ? 'grayscale(0.75) contrast(1.12)' : null);
  if (filter) g.filter = filter;
  if (opts.flipX) {
    g.translate(xf.dx * 2 + xf.dw, 0);
    g.scale(-1, 1);
  }
  g.drawImage(img, xf.dx, xf.dy, xf.dw, xf.dh);
  g.restore();
}

/**
 * Re-projects a normalized character torso/head region with subtle breathing lift and scale.
 */
export function drawBreathingOverlay(g, img, xf, region, state, opts = {}) {
  if (!isImageReady(img) || !xf || !state) return;
  const [nx, ny, nw, nh] = Array.isArray(region)
    ? region
    : [
        region?.x ?? 0.25,
        region?.y ?? 0.22,
        region?.w ?? 0.5,
        region?.h ?? 0.6,
      ];
  if (nw <= 0 || nh <= 0) return;

  const [iw, ih] = imgDims(img);
  const sx = nx * iw;
  const sy = ny * ih;
  const sw = nw * iw;
  const sh = nh * ih;
  const dx = xf.mapX(nx);
  const dy = xf.mapY(ny);
  const dw = nw * xf.dw;
  const dh = nh * xf.dh;
  const breathY = (state.breathY ?? 0) * (xf.scale || 1);
  const breathScale = state.breathScale ?? 1;

  g.save();
  if (opts.clip !== false) {
    g.beginPath();
    g.ellipse(dx + dw * 0.5, dy + dh * 0.5, dw * 0.5, dh * 0.5, 0, 0, Math.PI * 2);
    g.clip();
  }
  g.translate(dx + dw * 0.5, dy + dh);
  g.scale(1 + (breathScale - 1) * 0.35, breathScale);
  g.translate(-(dx + dw * 0.5), -dy - dh + breathY);
  g.globalAlpha *= opts.alpha ?? 0.92;
  g.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  g.restore();
}

/**
 * Draws eye glints (following subtle saccades) and animated eyelids during blink pulses.
 */
export function drawEyeBlinkAndGlint(g, xf, eyeBoxes, state, opts = {}) {
  if (!xf || !Array.isArray(eyeBoxes) || !eyeBoxes.length) return;
  const scale = xf.scale || 1;
  const blink = clamp(state?.blink ?? 0, 0, 1);
  const sx = (state?.eyeShiftX ?? 0) * scale * 0.5;
  const sy = (state?.eyeShiftY ?? 0) * scale * 0.5;
  const glintColor = opts.glintColor || 'rgba(255, 236, 205, 1)';
  const lidColor = opts.lidColor || '#12151d';
  // Glint is a catch-light, not a pupil: a ~1-2px soft speck capped in screen pixels so a
  // slightly off eye coordinate can never paint a visible white dot on skin.
  const glintMax = opts.glintMax ?? 2.2;

  for (const box of eyeBoxes) {
    const [nx, ny, rxRaw = 10, ryRaw = 6, eyeLid] = box;
    const cx = xf.mapX(nx);
    const cy = xf.mapY(ny);
    const rx = rxRaw < 1 ? rxRaw * xf.dw : rxRaw * scale;
    const ry = ryRaw < 1 ? ryRaw * xf.dh : ryRaw * scale;

    if (blink < 0.6) {
      const gr = clamp(Math.min(rx, ry) * 0.16, 0.8, glintMax);
      g.save();
      g.globalAlpha *= (1 - blink / 0.6) * 0.42;
      g.fillStyle = glintColor;
      g.shadowColor = 'rgba(255, 236, 205, 0.6)';
      g.shadowBlur = gr * 1.5;
      g.beginPath();
      g.ellipse(cx + sx + rx * 0.18, cy + sy - ry * 0.14, gr, gr * 0.85, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }

    if (blink > 0.04) {
      g.save();
      g.fillStyle = eyeLid || lidColor;
      g.globalAlpha *= clamp(0.3 + blink * 0.7, 0, 1);
      g.beginPath();
      g.ellipse(
        cx,
        cy - ry * (1 - blink) * 0.3,
        rx * 1.15,
        Math.max(1.4, ry * blink * 1.12),
        0,
        0,
        Math.PI * 2,
      );
      g.fill();
      if (blink > 0.45) {
        g.strokeStyle = '#07090d';
        g.lineWidth = Math.max(1.5, ry * 0.28);
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(cx - rx, cy + ry * 0.12);
        g.lineTo(cx + rx, cy + ry * 0.12);
        g.stroke();
      }
      g.restore();
    }
  }
}

/**
 * Draws a swinging, flickering practical oil-lamp glow and ambient flicker pulse.
 */
export function drawSwingingLamp(
  g,
  xf,
  lampNorm,
  state,
  radius = 380,
  color = '#ffb454',
) {
  if (!xf || !lampNorm) return;
  const [nx, ny] = lampNorm;
  const angle = state?.lampAngle ?? 0;
  const fl = clamp(state?.lampFlicker ?? 1, 0.1, 1.3);
  const lx = xf.mapX(nx) + Math.sin(angle) * 18;
  const ly = xf.mapY(ny) + (1 - Math.cos(angle)) * 10;
  const r = Math.max(40, radius * (0.9 + 0.1 * fl));

  g.save();
  if (fl < 0.88) {
    g.fillStyle = alpha('#03050a', clamp((0.92 - fl) * 0.42, 0, 0.4));
    g.fillRect(xf.dx, xf.dy, xf.dw, xf.dh);
  }
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = radGrad(g, lx, ly, 0, r, [
    alpha(color, 0.42 * fl),
    alpha(color, 0.16 * fl),
    alpha(color, 0),
  ]);
  g.fillRect(lx - r, ly - r, r * 2, r * 2);

  g.fillStyle = alpha('#ffe4a8', 0.65 * fl);
  g.beginPath();
  g.ellipse(lx, ly, 7 + 3 * fl, 11 + 4 * fl, angle, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

/**
 * Animates horizontal scanline ripples below `waterNormY`.
 */
export function drawWaterRipples(
  g,
  img,
  xf,
  waterNormY = 0.65,
  t = 0,
  amp = 6,
  slices = 18,
) {
  if (!isImageReady(img) || !xf) return;
  const ny0 = clamp(waterNormY, 0.05, 0.95);
  const nh = 1 - ny0;
  const [iw, ih] = imgDims(img);
  const offsets = waterSliceOffsets(t, slices, amp);
  const count = offsets.length;
  const sliceNormH = nh / count;
  const scale = xf.scale || 1;
  const topY = xf.mapY(ny0);

  g.save();
  g.beginPath();
  g.rect(xf.dx, topY, xf.dw, nh * xf.dh);
  g.clip();

  for (let i = 0; i < count; i++) {
    const { frac, dx } = offsets[i];
    const sliceFrac = ny0 + frac * nh;
    const sy = sliceFrac * ih;
    const sh = Math.max(1, sliceNormH * ih);
    const dy = xf.mapY(sliceFrac);
    const dh = sliceNormH * xf.dh + 1.2;
    g.drawImage(img, 0, sy, iw, sh, xf.dx + dx * scale, dy, xf.dw, dh);
  }

  g.globalCompositeOperation = 'lighter';
  for (let i = 1; i < count; i += 3) {
    const { frac, dx } = offsets[i];
    const gy = xf.mapY(ny0 + frac * nh);
    const w = xf.dw * (0.14 + 0.06 * Math.sin(t * 1.9 + i));
    const gx = xf.mapX(0.5 + 0.22 * Math.sin(i * 1.7 + t * 0.4)) - w * 0.5 + dx * scale;
    g.fillStyle = alpha('#7aa6cc', 0.07);
    g.fillRect(gx, gy, w, 2 * scale);
  }
  g.restore();
}

/**
 * Draws voice-synced dialogue mouth movement at normalized `mouthNorm = [nx, ny, w, h]`.
 */
export function drawDialogueMouth(g, xf, mouthNorm, mouthState, opts = {}) {
  if (!xf || !mouthNorm || !mouthState?.active || (mouthState.open ?? 0) <= 0.02) {
    return;
  }
  const [nx, ny, rawW = 22, rawH = 10] = mouthNorm;
  const scale = xf.scale || 1;
  const mx = xf.mapX(nx);
  const my = xf.mapY(ny);
  const baseW = rawW < 1 ? rawW * xf.dw : rawW * scale;
  const baseH = rawH < 1 ? rawH * xf.dh : rawH * scale;
  const open = clamp(mouthState.open, 0, 1);
  const shape = mouthState.shape || 'A';

  let widthMul = 0.9;
  if (shape === 'O' || shape === 'U') widthMul = 0.62;
  else if (shape === 'E' || shape === 'F') widthMul = 1.08;
  else if (shape === 'M') widthMul = 1.05;

  const rx = Math.max(2, baseW * widthMul * 0.5);
  const ry = Math.max(1.4, baseH * (0.25 + 0.85 * open) * 0.5);

  g.save();
  g.fillStyle = opts.cavityColor || '#130709';
  g.beginPath();
  g.ellipse(mx, my + ry * 0.15, rx, ry, 0, 0, Math.PI * 2);
  g.fill();

  if (open > 0.45) {
    g.fillStyle = opts.teethColor || 'rgba(218, 212, 200, 0.55)';
    g.fillRect(mx - rx * 0.55, my - ry * 0.42, rx * 1.1, Math.max(1.5, ry * 0.35));
  }

  g.strokeStyle = opts.lipColor || 'rgba(42, 16, 18, 0.78)';
  g.lineWidth = Math.max(1.2, scale * 1.6);
  g.beginPath();
  g.ellipse(mx, my + ry * 0.15, rx, ry, 0, 0, Math.PI * 2);
  g.stroke();
  g.restore();
}

/**
 * Draws dark parallax foreground occluders (`boat` | `dock` | `house`) leaving the center clear.
 */
export function drawForegroundFrame(g, cam, t = 0, style = 'boat') {
  const W = E.W || 1920;
  const H = E.H || 1080;
  const px = -(cam?.x || 0) * 0.35;
  const py = -(cam?.y || 0) * 0.35;
  const sway = Math.sin(t * 1.15) * 10;

  g.save();
  g.translate(px, py);

  if (style === 'dock') {
    g.fillStyle = 'rgba(4, 6, 10, 0.88)';
    g.fillRect(-40, H * 0.35, W * 0.065, H * 0.7);
    g.fillRect(W * 0.94, H * 0.42, W * 0.08, H * 0.62);
    g.fillStyle = 'rgba(8, 12, 18, 0.82)';
    for (let i = 0; i < 4; i++) {
      g.beginPath();
      g.ellipse(
        W * (0.04 + i * 0.025) + sway * 0.4,
        H * 0.94,
        8,
        H * 0.14,
        0.12 + i * 0.05,
        0,
        Math.PI * 2,
      );
      g.fill();
    }
  } else if (style === 'house') {
    g.fillStyle = 'rgba(4, 5, 9, 0.9)';
    g.fillRect(-40, -40, W * 0.07, H + 80);
    g.fillRect(W * 0.93, -40, W * 0.09, H + 80);
    g.fillRect(-40, -40, W + 80, H * 0.05);
  } else {
    // 'boat': dark gunwale corners + foreground river reeds
    g.fillStyle = 'rgba(4, 6, 10, 0.86)';
    g.beginPath();
    g.moveTo(-40, H + 40);
    g.lineTo(-40, H * 0.78);
    g.quadraticCurveTo(W * 0.14, H * 0.92, W * 0.28, H + 40);
    g.closePath();
    g.fill();

    g.beginPath();
    g.moveTo(W + 40, H + 40);
    g.lineTo(W + 40, H * 0.78);
    g.quadraticCurveTo(W * 0.86, H * 0.92, W * 0.72, H + 40);
    g.closePath();
    g.fill();

    g.fillStyle = 'rgba(7, 11, 16, 0.72)';
    g.beginPath();
    g.ellipse(W * 0.05 + sway * 0.5, H * 0.9, 10, H * 0.16, 0.16, 0, Math.PI * 2);
    g.ellipse(W * 0.95 - sway * 0.4, H * 0.91, 9, H * 0.15, -0.18, 0, Math.PI * 2);
    g.fill();
  }

  g.restore();
}
