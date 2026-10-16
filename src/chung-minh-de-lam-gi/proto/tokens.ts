// Design tokens — chung-minh-de-lam-gi (from brief Style + script, locked by design-agent).
// NOTE: repo-root DESIGN.md specifies the MONITOR UI (teal command deck), NOT video art.
// No monitor token is imported here. This video reuses the truongthanh SYSTEM
// (black bg, white stick figures, orange accent) with its own story devices.
// Must NOT resemble: xay-doi (paper-cut cobalt/sen/jade), ClaudeMem (cream/clay),
// Understand Anything (dark/gold), family group (gaplai/metkhong/camon/cuoc-goi).
import {Easing} from 'remotion';

export const C = {
  bg: '#060606', // near-black stage (flat, no gradient — T6)
  panel: '#101010', // flat riser behind crowd row (s4a "sáng rực" wall)
  white: '#FAFAF7', // warm white figures + headlines
  orange: '#F58B4C', // THE accent: keywords, medals, beam tint (locked, = stick.tsx OR)
  grey: '#8F8F8F', // muted props (chair, mirror frame, chart axis)
  ghost: '#FFFFFF', // used at 20% opacity for background chair
  ink: '#060606', // face strokes on white heads
  chipBd: '#3A3A3A', // source-chip border
  chipTx: '#C9C9C9', // source-chip text
  lampWhite: '#FFFFFF', // desk-lamp circle / mirror beam (flat opacity, no gradient)
} as const;

// OFL, Vietnamese subset verified (name table → scripts.sil.org/OFL, *-VN.woff2 in public/fonts).
export const F_HEAD = "'Lexend', 'Be Vietnam Pro', sans-serif"; // headlines, 700
export const F_BODY = "'Be Vietnam Pro', 'Lexend', sans-serif"; // captions + chips, 600

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

/** Press-in settle (paper-title-card demo: bezier(0.2,0.75,0.3,1), 9f window). */
export const press = Easing.bezier(0.2, 0.75, 0.3, 1);
/** Underline draw (paper-title-card: bezier(0.3,0,0.2,1), f16-34). */
export const draw = Easing.bezier(0.3, 0, 0.2, 1);
/** Soft overshoot for prop pops (bento content pop family, single small overshoot). */
export const pop = Easing.bezier(0.3, 1.4, 0.5, 1);
/** Story pace: slow, symmetric arcs (calmer than product presets). */
export const drift = Easing.bezier(0.4, 0, 0.6, 1);

/** Seeded pseudo-random (frame-driven only; no Math.random/Date.now). */
export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
