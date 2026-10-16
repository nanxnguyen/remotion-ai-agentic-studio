// Shared kit — xay-doi-minh-hay-chung-minh (director owns).
// Palette from design-spec §1; motion easings from the motion recipe.
import {Easing} from 'remotion';

export const COBALT_DEEP = '#141B6B';
export const COBALT = '#2A36C9';
export const SEN = '#FF2E9A';
export const SEN_LIGHT = '#FF5CB3';
export const SEN_DARK = '#B3126A';
export const LAMP = '#F3F6FF';
export const ICE = '#8FE3FF';
export const BOARD = '#7A7FA6';
export const TAPE = '#D9DCF2';
export const JADE = '#19C48A';
export const DAWN_A = '#DDEBFF';
export const DAWN_B = '#F2FBF6';
export const INK = '#0A0F3D';
export const SHIRT = '#E9EEFF';
export const PANTS = '#1A2060';
export const HAT = '#FFA3D1';
export const LABEL = '#8B93C9';
export const WOOD = '#8A6B46';
export const SUN = '#FFC46B';

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

/** Brick settle: weight with one small overshoot (locked param). */
export const settle = Easing.bezier(0.3, 0, 0.25, 1.15);
/** Slow breath for the second half (no overshoot). */
export const breathe = Easing.bezier(0.2, 0.75, 0.3, 1);

/** dB gain → Remotion linear volume. */
export const db2lin = (db: number): number => Math.pow(10, db / 20);
