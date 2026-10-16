// Paper craft for the diorama (D06): feTurbulence fiber overlay + 1–2px deckle
// misregistration. Grammar ref: riso-print-hits (offset color plate reads as print).
import React from 'react';
import {C, hash} from './tokens';

const FIBER_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>` +
  `<filter id='p' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/>` +
  `<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/>` +
  `</filter><rect width='240' height='240' filter='url(#p)'/></svg>`;

const FIBER_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(FIBER_SVG)}")`;

// Paper tooth laid over a scene or a surface. Deterministic (fixed seed tile).
export const PaperGrain: React.FC<{opacity?: number}> = ({opacity = 0.16}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity,
      backgroundImage: FIBER_URI,
      backgroundSize: '240px 240px',
    }}
  />
);

// Deckle misregistration edge: a 2px offset plate behind a paper shape.
// dir seeded per index so plates don't all slip the same way.
export const Deckle: React.FC<{w: number; h: number; seed: number; color?: string}> = ({
  w,
  h,
  seed,
  color = C.senDark,
}) => {
  const dx = (hash(seed * 13 + 1) > 0.5 ? 1 : -1) * 2;
  const dy = (hash(seed * 29 + 2) > 0.5 ? 1 : -1) * 2;
  return (
    <div
      style={{
        position: 'absolute',
        left: dx,
        top: dy,
        width: w,
        height: h,
        background: color,
        borderRadius: 8,
        opacity: 0.55,
      }}
    />
  );
};
