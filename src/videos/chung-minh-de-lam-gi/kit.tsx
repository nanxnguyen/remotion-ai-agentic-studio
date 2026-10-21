// kit.tsx — chung-minh-de-lam-gi (director owns; shared by scenes + Reel)
// Palette from design-spec §1: minimal editorial stick-figure, black bg / white text / orange accent.
export const BG = '#060606';
export const WHITE = '#FAFAF7';
export const ORANGE = '#F58B4C'; // highlight words & visual emphasis
export const PROP_GREY = '#8F8F8F'; // medal fill, props
export const GHOST = 'rgba(143,143,143,0.20)'; // empty chair background
export const INK = '#0A0F3D';
export const CLAMP = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

// db → linear volume for Reel mix.
export const db2lin = (db: number): number => Math.pow(10, db / 20);
