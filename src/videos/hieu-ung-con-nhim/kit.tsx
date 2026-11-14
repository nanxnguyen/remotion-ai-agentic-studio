import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {DIRECTOR_STYLES} from '../../animation/stickman-director';

export const STYLE_ID = 'classic-bw' as const;
export const THEME = DIRECTOR_STYLES[STYLE_ID];
export const GROUND_Y = 1320;

/** Soft 0.35s scene fade envelope for smooth transitions. */
export const SceneFade: React.FC<{durationInFrames: number; children: React.ReactNode}> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const fade = 10;
  const opacity = interpolate(
    frame,
    [0, fade, Math.max(fade + 1, durationInFrames - fade), durationInFrames],
    [0.15, 1, 1, 0.15],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return <div style={{position: 'absolute', inset: 0, opacity}}>{children}</div>;
};

/** Glowing orange heart with optional iron cage bars. */
export const GlowingHeart: React.FC<{
  x: number;
  y: number;
  scale?: number;
  locked?: boolean;
  unlockProgress?: number;
}> = ({x, y, scale = 1, locked = false, unlockProgress = 0}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.22) * 0.08;
  const barAlpha = locked ? Math.max(0, 1 - unlockProgress) : 0;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * pulse})`}>
      <circle cx={0} cy={0} r={54} fill={THEME.accent} opacity={0.18} />
      <circle cx={0} cy={0} r={34} fill={THEME.accent} opacity={0.32} />
      <path
        d="M 0 22 C -28 2 -32 -22 -14 -30 C -4 -34 0 -22 0 -18 C 0 -22 4 -34 14 -30 C 32 -22 28 2 0 22 Z"
        fill={THEME.accent}
      />
      {barAlpha > 0.02 && (
        <g opacity={barAlpha}>
          {[-20, 0, 20].map((bx) => (
            <line
              key={bx}
              x1={bx}
              y1={-40 - unlockProgress * 35}
              x2={bx}
              y2={36 - unlockProgress * 35}
              stroke="#C9C9D1"
              strokeWidth={5}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
    </g>
  );
};

/** Radial defense spikes around a character (0 = hidden, 1 = full spike). */
export const DefenseSpikes: React.FC<{
  cx: number;
  cy: number;
  progress: number;
  count?: number;
  innerR?: number;
  outerR?: number;
  color?: string;
}> = ({cx, cy, progress, count = 12, innerR = 90, outerR = 210, color = THEME.accent}) => {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.02) return null;

  return (
    <g transform={`translate(${cx}, ${cy})`} opacity={p}>
      {Array.from({length: count}, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const rEnd = innerR + (outerR - innerR) * p;
        const x1 = Math.cos(angle) * innerR;
        const y1 = Math.sin(angle) * innerR;
        const x2 = Math.cos(angle) * rEnd;
        const y2 = Math.sin(angle) * rEnd;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

/** Transparent glass box enclosing the stickman with optional crack lines. */
export const GlassCage: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  progress?: number;
  cracks?: number;
}> = ({x, y, width, height, progress = 1, cracks = 0}) => {
  const dropY = (1 - Math.max(0, Math.min(1, progress))) * -420;
  return (
    <g transform={`translate(${x}, ${y + dropY})`} opacity={progress}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill="rgba(255, 255, 255, 0.04)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth={5}
      />
      <line
        x1={26}
        y1={28}
        x2={90}
        y2={92}
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line
        x1={width - 28}
        y1={height - 100}
        x2={width - 80}
        y2={height - 48}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {cracks > 0 && (
        <path
          d={`M ${width * 0.85} ${height * 0.45} L ${width * 0.72} ${height * 0.52} L ${width * 0.79} ${height * 0.6} L ${width * 0.64} ${height * 0.68}`}
          fill="none"
          stroke={THEME.accent}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={Math.min(1, cracks)}
        />
      )}
    </g>
  );
};
