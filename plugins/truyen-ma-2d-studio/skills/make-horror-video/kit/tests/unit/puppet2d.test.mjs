import test from 'node:test';
import assert from 'node:assert/strict';
import { mockCtx } from './mockctx.mjs';
import { E, visemeAt } from '../../engine/core.js';
import {
  computeCoverTransform,
  puppetFrameState,
  waterSliceOffsets,
  dialogueMouthOpen,
  drawCoverMapped,
  drawBreathingOverlay,
  drawEyeBlinkAndGlint,
  drawSwingingLamp,
  drawWaterRipples,
  drawDialogueMouth,
  drawForegroundFrame,
} from '../../engine/puppet2d.js';

test('computeCoverTransform maps normalized coordinates identically for 16:9 and 9:16', () => {
  const wide = computeCoverTransform(1920, 1080, 1920, 1080, 100, 0.5);
  assert.equal(Math.round(wide.mapX(0.5)), 960);
  assert.equal(Math.round(wide.mapY(0.5)), 540);
  const vert = computeCoverTransform(1920, 1080, 1080, 1920, 80, 0.25);
  assert.ok(vert.dw >= 1080 && vert.dh >= 1920);
  assert.ok(vert.mapX(0.25) > 300 && vert.mapX(0.25) < 780);
});

test('computeCoverTransform clamps edges to always cover stage + pad', () => {
  for (const fx of [0, 0.1, 0.5, 0.9, 1]) {
    const xf = computeCoverTransform(1920, 1080, 1080, 1920, 90, fx, 0.5);
    assert.ok(xf.dx <= -90 + 1e-6);
    assert.ok(xf.dx + xf.dw >= 1080 + 90 - 1e-6);
    assert.ok(xf.dy <= -90 + 1e-6);
    assert.ok(xf.dy + xf.dh >= 1920 + 90 - 1e-6);
  }
});

test('puppetFrameState is deterministic and fires blink pulses periodically', () => {
  const a = puppetFrameState(1.25, { period: 3.0, seed: 5 });
  const b = puppetFrameState(1.25, { period: 3.0, seed: 5 });
  assert.deepEqual(a, b);
  assert.ok(a.blink >= 0 && a.blink <= 1);
  let maxBlink = 0;
  for (let t = 0; t < 3.0; t += 0.04) {
    maxBlink = Math.max(maxBlink, puppetFrameState(t, { period: 3.0, seed: 5 }).blink);
  }
  assert.ok(maxBlink > 0.7, `expected blink peak > 0.7, got ${maxBlink}`);
});

test('waterSliceOffsets produces deterministic sine displacements', () => {
  const s1 = waterSliceOffsets(2.4, 12, 8);
  const s2 = waterSliceOffsets(2.4, 12, 8);
  assert.equal(s1.length, 12);
  assert.deepEqual(s1, s2);
  assert.ok(s1.every((x) => Math.abs(x.dx) <= 8.0001));
});

test('dialogueMouthOpen gates on isDialogue and maps viseme shapes', () => {
  const off = dialogueMouthOpen(12.0, false, () => ({ shape: 'AA', open: 0.9 }));
  assert.equal(off.active, false);
  assert.equal(off.open, 0);
  const on = dialogueMouthOpen(12.0, true, () => ({ shape: 'AA', open: 0.9 }));
  assert.equal(on.active, true);
  assert.ok(on.open > 0.5);
});

test('dialogueMouthOpen integrates with core.js visemeAt and E.visemes', () => {
  const prev = E.visemes;
  try {
    E.visemes = [
      { t: 10.0, v: 'M' },
      { t: 10.2, v: 'A' },
      { t: 10.5, v: 'rest' },
    ];
    const openA = dialogueMouthOpen(10.3, true, visemeAt);
    assert.equal(openA.active, true);
    assert.ok(openA.open > 0.7);
    const closedM = dialogueMouthOpen(10.05, true, visemeAt);
    assert.ok(closedM.open < 0.2);
    const resting = dialogueMouthOpen(10.6, true, visemeAt);
    assert.equal(resting.active, false);
    assert.equal(resting.open, 0);
  } finally {
    E.visemes = prev;
  }
});

test('dialogueMouthOpen respects dialogueRange [from, to] with core.js visemeAt', () => {
  const prev = E.visemes;
  try {
    E.visemes = [
      { t: 127.5, v: 'A' },
      { t: 128.9, v: 'rest' },
      { t: 129.5, v: 'O' },
      { t: 130.2, v: 'rest' },
    ];
    const range = [127.5, 128.95];
    const inside = dialogueMouthOpen(128.0, true, visemeAt, ...range);
    assert.equal(inside.active, true);
    assert.ok(inside.open > 0.7);
    // narration after the quoted line ("Tôi ngẩng lên.") must not move the mouth
    const after = dialogueMouthOpen(129.7, true, visemeAt, ...range);
    assert.equal(after.active, false);
    assert.equal(after.open, 0);
    const before = dialogueMouthOpen(127.2, true, visemeAt, ...range);
    assert.equal(before.active, false);
    // without a range the same narration frame would animate the mouth
    assert.equal(dialogueMouthOpen(129.7, true, visemeAt).active, true);
  } finally {
    E.visemes = prev;
  }
});

test('eye glint stays a tiny soft highlight, never a big white dot', () => {
  const g = mockCtx();
  const wide = computeCoverTransform(1920, 1080, 1920, 1080, 45, 0.5);
  const vert = computeCoverTransform(1920, 1080, 1080, 1920, 105, 0.5);
  const open = { blink: 0, eyeShiftX: 0, eyeShiftY: 0 };
  drawEyeBlinkAndGlint(g, wide, [[0.39, 0.38, 11, 6]], open);
  drawEyeBlinkAndGlint(g, vert, [[0.39, 0.38, 11, 6]], open);
  drawEyeBlinkAndGlint(g, vert, [[0.39, 0.38, 0.011, 0.012]], open);
  const glints = g.log.filter((c) => c[0] === 'ellipse');
  assert.equal(glints.length, 3);
  for (const [, , , rx, ry] of glints) {
    assert.ok(rx <= 2.5 && ry <= 2.5, `glint radius too big: ${rx}x${ry}`);
  }
  const alphas = g.log.filter((c) => c[0] === 'alpha').map((c) => c[1]);
  assert.ok(alphas.every((a) => a <= 0.5), `glint alpha too strong: ${alphas}`);
});

test('blink eyelid uses the per-eye skin colour (5th eye-box item), not a black hole', () => {
  const fills = [];
  const g = new Proxy(mockCtx(), {
    set(t, k, v) { if (k === 'fillStyle') fills.push(v); t[k] = v; return true; },
  });
  const xf = computeCoverTransform(1920, 1080, 1920, 1080, 45, 0.5);
  drawEyeBlinkAndGlint(g, xf, [[0.39, 0.38, 16, 8, '#bb926e'], [0.42, 0.38, 14, 8]], { blink: 1 });
  assert.deepEqual(fills, ['#bb926e', '#12151d']);
});

test('draw helpers issue expected Canvas2D calls via mockCtx', () => {
  const g = mockCtx();
  const xf = computeCoverTransform(1920, 1080, 1920, 1080, 90, 0.5);
  drawEyeBlinkAndGlint(g, xf, [[0.35, 0.34, 12, 7]], { blink: 0.8, eyeShiftX: 1, eyeShiftY: 0 });
  drawSwingingLamp(g, xf, [0.22, 0.24], { lampAngle: 0.05, lampFlicker: 0.9 }, 420);
  drawDialogueMouth(g, xf, [0.35, 0.42, 24, 10], { active: true, open: 0.7 });
  assert.ok(g.log.some((c) => c[0] === 'ellipse'));
  assert.ok(g.log.some((c) => c[0] === 'fillRect'));
});

test('drawCoverMapped, drawBreathingOverlay, drawWaterRipples, drawForegroundFrame run DOM-free', () => {
  const g = mockCtx();
  const img = { complete: true, naturalWidth: 1920, naturalHeight: 1080 };
  const xf = computeCoverTransform(1920, 1080, 1080, 1920, 90, 0.5);
  const st = puppetFrameState(1.1, { seed: 2 });
  drawCoverMapped(g, img, xf, { desat: true });
  drawBreathingOverlay(g, img, xf, [0.25, 0.25, 0.5, 0.55], st);
  drawWaterRipples(g, img, xf, 0.65, 1.1, 6);
  drawForegroundFrame(g, { x: 12, y: -6, z: 1.04 }, 1.1, 'boat');
  drawForegroundFrame(g, { x: -8, y: 4, z: 1.02 }, 1.1, 'dock');
  drawForegroundFrame(g, { x: 0, y: 0, z: 1.0 }, 1.1, 'house');
  assert.ok(g.log.filter((c) => c[0] === 'drawImage').length >= 10);
});
