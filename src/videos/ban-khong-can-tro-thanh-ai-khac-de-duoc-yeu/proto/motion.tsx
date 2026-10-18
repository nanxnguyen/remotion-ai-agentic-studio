// Proto Motion: reusable motion hooks for ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
import { useCurrentFrame, interpolate } from 'remotion';
import { MOTION } from './kit';

/**
 * Text entrance: translateY from 24px to 0 over 20 frames
 * Frame 0 fully visible (Gate D GD-D01)
 */
export const useTextEntrance = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.textEntrance.duration], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/**
 * Art entrance: translateY from 36px to 0 over 22 frames
 * Slight lag behind text
 */
export const useArtEntrance = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.artEntrance.duration], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/**
 * Micro-breathe: subtle scale oscillation
 * 1 + sin(f/24) * 0.008
 */
export const useBreathe = (period = MOTION.breathe.period, amplitude = MOTION.breathe.amplitude) => {
  const f = useCurrentFrame();
  return 1 + Math.sin(f / period) * amplitude;
};

/**
 * Cross-dissolve opacity for emotional beat boundaries
 * 0 to 1 over 15 frames
 */
export const useCrossDissolve = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.crossDissolve.duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/**
 * Accent word highlight: scale + color shift
 * Triggered at specific frame, lasts 8 frames
 */
export const useAccentHighlight = (triggerFrame: number, duration = MOTION.accentHighlight.duration) => {
  const f = useCurrentFrame();
  const progress = interpolate(f - triggerFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = 1 + progress * (MOTION.accentHighlight.scale - 1);
  return { scale, progress };
};

/**
 * Hard cut (instant) - for realization moments
 * Returns 1 after trigger, 0 before
 */
export const useHardCut = (triggerFrame: number) => {
  const f = useCurrentFrame();
  return f >= triggerFrame ? 1 : 0;
};