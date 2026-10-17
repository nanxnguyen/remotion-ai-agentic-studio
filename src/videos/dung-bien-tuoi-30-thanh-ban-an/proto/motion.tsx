// Motion toolkit COPIED from skills/video-shotcraft/demos/_fixtures/Polish.tsx
// (bezier, EASE, ramp, mix, Grain) — do not import across, copy per SC usage rules.
// Added: E_SINE (easeInOutSine, the video's "nhip thoi quen") + prand (seeded pseudo-random).
import React from 'react';
import {useCurrentFrame} from 'remotion';

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

export const bezier = (x1: number, y1: number, x2: number, y2: number) => {
  if (x1 === y1 && x2 === y2) return (t: number) => clamp01(t);
  const ax = 1 - 3 * x2 + 3 * x1,
    bx = 3 * x2 - 6 * x1,
    cx = 3 * x1;
  const ay = 1 - 3 * y2 + 3 * y1,
    by = 3 * y2 - 6 * y1,
    cy = 3 * y1;
  const sx = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sy = (u: number) => ((ay * u + by) * u + cy) * u;
  const dx = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  const solve = (x: number) => {
    let u = x;
    for (let i = 0; i < 8; i++) {
      const err = sx(u) - x;
      if (Math.abs(err) < 1e-7) return u;
      const d = dx(u);
      if (Math.abs(d) < 1e-6) break;
      u -= err / d;
    }
    let lo = 0,
      hi = 1;
    u = x;
    for (let i = 0; i < 40; i++) {
      const v = sx(u);
      if (Math.abs(v - x) < 1e-7) break;
      if (v < x) lo = u;
      else hi = u;
      u = (lo + hi) / 2;
    }
    return u;
  };
  return (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : sy(solve(t)));
};

export const EASE = {
  snappy: bezier(0.16, 1, 0.3, 1),
  out: bezier(0.22, 1, 0.36, 1),
  smooth: bezier(0.65, 0, 0.35, 1),
  swift: bezier(0.4, 0, 0.2, 1),
  exit: bezier(0.7, 0, 0.84, 0),
  linear: (t: number) => clamp01(t),
};

// "nhip thoi quen": symmetric ease-in-out, no overshoot — the ONLY easing for scene motion.
export const E_SINE = (t: number) => 0.5 - Math.cos(Math.PI * clamp01(t)) / 2;

export const ramp = (
  frame: number,
  start: number,
  dur: number,
  ease: (t: number) => number = EASE.snappy,
) => ease(clamp01((frame - start) / Math.max(1e-6, dur)));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Deterministic pseudo-random from index (frame-driven only).
export const prand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const grainCache = new Map<string, string>();
const grainTile = (variant: number, tile: number, freq: number) => {
  const key = `${variant}|${tile}|${freq}`;
  const hit = grainCache.get(key);
  if (hit) return hit;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${tile}' height='${tile}'>` +
    `<filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='2' seed='${variant * 17 + 3}' stitchTiles='stitch'/>` +
    `<feColorMatrix type='matrix' values='0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 0 1'/>` +
    `<feComponentTransfer><feFuncR type='linear' slope='2.4' intercept='-0.7'/><feFuncG type='linear' slope='2.4' intercept='-0.7'/><feFuncB type='linear' slope='2.4' intercept='-0.7'/></feComponentTransfer></filter>` +
    `<rect width='${tile}' height='${tile}' filter='url(#g)'/></svg>`;
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  grainCache.set(key, url);
  return url;
};

export const Grain: React.FC<{
  opacity?: number;
  step?: number;
  scale?: number;
  freq?: number;
  blend?: React.CSSProperties['mixBlendMode'];
  style?: React.CSSProperties;
}> = ({opacity = 0.06, step = 2, scale = 1, freq = 0.85, blend = 'overlay', style}) => {
  const frame = useCurrentFrame();
  const k = Math.floor(frame / Math.max(1, step));
  const tile = 256;
  const ox = Math.floor(hash(k * 3 + 1) * tile);
  const oy = Math.floor(hash(k * 7 + 2) * tile);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: blend,
        backgroundImage: grainTile(k % 6, tile, freq),
        backgroundSize: `${tile * scale}px ${tile * scale}px`,
        backgroundPosition: `${ox}px ${oy}px`,
        ...style,
      }}
    />
  );
};
