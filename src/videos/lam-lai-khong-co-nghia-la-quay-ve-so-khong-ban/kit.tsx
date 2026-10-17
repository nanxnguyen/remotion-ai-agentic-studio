import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const C = {
  bg0: '#1a1f2e',
  bg1: '#2a2418',
  bgEnd: '#1f2a18',
  accent: '#F58B4C',
  text: '#f5efe6',
  textStrong: '#ffffff',
  muted: '#BDBDBD',
};

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const EASE = {out: Easing.bezier(0.22, 1, 0.36, 1), smooth: Easing.bezier(0.65, 0, 0.35, 1)};
export const ramp = (f: number, start: number, dur: number, ease = EASE.out) =>
  interpolate(f, [start, start + dur], [0, 1], {...clamp, easing: ease});

export const LamFonts: React.FC = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap');`}</style>
);