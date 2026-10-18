import React from 'react';

export {EASE, ramp} from '../../core';

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

export const LamFonts: React.FC = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap');`}</style>
);
