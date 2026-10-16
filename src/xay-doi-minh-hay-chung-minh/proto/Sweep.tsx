// Origin: skills/video-shotcraft/demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx
// (verbatim grammar, re-skinned). Locked param: sweep is STRICTLY linear
// (no easing — eased light reads as intentional, linear reads as searchlight).
// Re-skin: cold white #F3F6FF 4-layer edge glow (blur30/10/5/1.5 + core),
// sweeping a paper-cut wall instead of a UI panel.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from './tokens';

const grad = (dir: string, c: string) =>
  `linear-gradient(${dir}, rgba(0,0,0,0) 0%, ${c} 42%, ${c} 58%, rgba(0,0,0,0) 100%)`;

// Horizontal cold-light band sweeping across the wall, y-centered at `y`.
export const WallSweep: React.FC<{from: number; to: number; y: number; height?: number}> = ({
  from,
  to,
  y,
  height = 260,
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 90], [from, to]); // strict linear — 命门
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: x - 640,
          top: y - height / 2,
          width: 1280,
          height,
          background: grad('90deg', 'rgba(243,246,255,0.40)'),
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 470,
          top: y - 46,
          width: 940,
          height: 92,
          background: grad('90deg', 'rgba(243,246,255,0.55)'),
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 330,
          top: y - 22,
          width: 660,
          height: 44,
          background: grad('90deg', 'rgba(255,255,255,0.65)'),
          filter: 'blur(5px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 300,
          top: y - 4,
          width: 600,
          height: 8,
          background: grad('90deg', '#ffffff'),
          filter: 'blur(1.5px)',
        }}
      />
    </div>
  );
};

export const SWEEP_COLD = C.lampWhite;
