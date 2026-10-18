import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';

// Shared, style-free motion primitives. Every value is a pure function of the frame,
// so renders stay deterministic. Palettes and scene art direction stay in each video.

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

export type EaseFn = (t: number) => number;

export const EASE = {
  // Strong ease-out (~expo-out): entrances, settling after a push.
  snappy: Easing.bezier(0.16, 1, 0.3, 1),
  // Softer ease-out (~quint-out): secondary elements, text reveals.
  out: Easing.bezier(0.22, 1, 0.36, 1),
  // Symmetric in-out: position swaps, camera pans, cross-dissolves.
  smooth: Easing.bezier(0.65, 0, 0.35, 1),
  // Strong ease-in (~quart-in): exits.
  exit: Easing.bezier(0.7, 0, 0.84, 0),
  // Overshoots ~8% then settles: pops.
  overshoot: Easing.bezier(0.34, 1.45, 0.64, 1),
  linear: (t: number) => clamp01(t),
} satisfies Record<string, EaseFn>;

// Normalised, eased progress of `frame` across [start, start + dur], clamped to [0, 1].
export const ramp = (
  frame: number,
  start: number,
  dur: number,
  ease: EaseFn = EASE.out,
): number => {
  if (dur <= 0) return frame >= start ? 1 : 0;
  return ease(clamp01((frame - start) / dur));
};

// Unclamped linear blend; pairs with overshoot values outside [0, 1].
export const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

// Per-frame speed of a frame-driven value (central difference); feed it to motion blur.
export const velocity = (f: (frame: number) => number, frame: number): number =>
  f(frame + 0.5) - f(frame - 0.5);

export type RiseOptions = Readonly<{
  delay?: number;
  dur?: number;
  distance?: number;
  blur?: number;
}>;

// Text/element entrance: fade + rise + de-blur on one eased curve, instead of a flat linear fade.
export const riseStyle = (
  frame: number,
  {delay = 0, dur = 18, distance = 28, blur = 8}: RiseOptions = {},
): React.CSSProperties => {
  const t = ramp(frame, delay, dur, EASE.out);
  const b = mix(blur, 0, t);
  return {
    opacity: t,
    transform: `translateY(${mix(distance, 0, t)}px)`,
    filter: b < 0.05 ? 'none' : `blur(${Math.round(b * 100) / 100}px)`,
  };
};

export const Rise: React.FC<
  RiseOptions & {children: React.ReactNode; style?: React.CSSProperties}
> = ({children, style, ...options}) => {
  const frame = useCurrentFrame();
  return <div style={{...style, ...riseStyle(frame, options)}}>{children}</div>;
};

type ShotSpan = Readonly<{from: number; duration: number}>;

export type CrossfadeShot<Id extends string> = Readonly<{
  id: Id;
  from: number;
  durationInFrames: number;
  // Frames over which this shot dissolves in on top of the previous one (0 for the first).
  fadeIn: number;
}>;

// Turns hard cuts into cross-dissolves without moving any shot start: each shot except the
// last runs `overlap` frames longer, and the next shot fades in over that tail. Shot starts,
// voice placement and total length are unchanged.
export const crossfadeShots = <Id extends string>(
  shots: Readonly<Record<Id, ShotSpan>>,
  overlap: number,
): CrossfadeShot<Id>[] => {
  if (!Number.isInteger(overlap) || overlap < 0) {
    throw new Error('overlap must be a non-negative integer');
  }
  const entries = Object.entries(shots) as [Id, ShotSpan][];
  return entries.map(([id, shot], i) => {
    const fadeIn = i === 0 ? 0 : overlap;
    if (fadeIn > shot.duration) {
      throw new Error(`overlap ${overlap} is longer than shot ${id} (${shot.duration} frames)`);
    }
    const isLast = i === entries.length - 1;
    return {
      id,
      from: shot.from,
      durationInFrames: shot.duration + (isLast ? 0 : overlap),
      fadeIn,
    };
  });
};

// Wrap a shot inside its <Sequence>; it dissolves in over `fadeIn` frames.
export const ShotFade: React.FC<{fadeIn: number; children: React.ReactNode}> = ({
  fadeIn,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: ramp(frame, 0, fadeIn, EASE.smooth)}}>{children}</AbsoluteFill>
  );
};
