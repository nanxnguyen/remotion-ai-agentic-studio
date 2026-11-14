import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import type {Point} from './character-motion';
import {
  DIRECTOR_STYLES,
  PORTRAIT_SAFE_AREA,
  type DirectorCharacterPose,
  type DirectorStyleId,
  arcArrowPoints,
  pointsToSvgPath,
  revealedPolylinePoints,
  underlinePoints,
} from './stickman-director';

/**
 * 9:16 or 16:9 stage backdrop supporting `stickman-video-director` style presets
 * (optional hand-drawn grid for B1, retro scanlines + vignette for B3).
 */
export const DirectorStage: React.FC<{
  styleId?: DirectorStyleId;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}> = ({styleId = 'classic-bw', width = 1080, height = 1920, children}) => {
  const theme = DIRECTOR_STYLES[styleId];
  const gridLines: React.ReactNode[] = [];
  if (theme.showGrid) {
    for (let x = 32; x < width; x += 64) {
      gridLines.push(
        <line
          key={`vx-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="rgba(76, 90, 105, 0.05)"
          strokeWidth={1}
        />,
      );
    }
    for (let y = 32; y < height; y += 64) {
      gridLines.push(
        <line
          key={`hy-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="rgba(76, 90, 105, 0.05)"
          strokeWidth={1}
        />,
      );
    }
  }

  return (
    <div style={{position: 'absolute', inset: 0, backgroundColor: theme.background, overflow: 'hidden'}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{position: 'absolute', inset: 0}}
      >
        {gridLines}
        {children}
      </svg>
      {theme.scanlineIntensity ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `repeating-linear-gradient(to bottom, rgba(0,0,0,${0.12 * theme.scanlineIntensity}) 0px, rgba(0,0,0,${0.12 * theme.scanlineIntensity}) 1px, transparent 1px, transparent 5px)`,
            boxShadow: `inset 0 0 180px rgba(0,0,0,${0.45 * theme.scanlineIntensity})`,
          }}
        />
      ) : null}
    </div>
  );
};

/**
 * Progressive hand-drawn stroke (`underline`, `arrow`, or custom `polyline`)
 * driven deterministically by `progress` or Remotion frames.
 */
export const KineticStroke: React.FC<{
  kind?: 'underline' | 'arrow' | 'polyline';
  x?: number;
  y?: number;
  width?: number;
  points?: readonly Point[];
  progress?: number;
  startFrame?: number;
  durationFrames?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  kind = 'underline',
  x = 0,
  y = 0,
  width = 220,
  points,
  progress,
  startFrame = 0,
  durationFrames = 18,
  color = '#F58B4C',
  strokeWidth = 6,
}) => {
  const frame = useCurrentFrame();
  const t =
    progress ??
    interpolate(frame, [startFrame, startFrame + Math.max(1, durationFrames)], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const basePoints =
    kind === 'polyline' && points
      ? points
      : kind === 'arrow'
        ? arcArrowPoints(width)
        : underlinePoints(width);

  const visible = revealedPolylinePoints(basePoints, t);
  if (visible.length < 2) return null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={pointsToSvgPath(visible)}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {kind === 'arrow' && t > 0.95 ? (
        <path
          d={`M ${width - 17} -12 L ${width} 0 L ${width - 19} 12`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
};

/**
 * Extended expressive stickman SVG puppet supporting all `DirectorExpression` states.
 */
export const DirectorCharacter: React.FC<{
  pose: DirectorCharacterPose;
  styleId?: DirectorStyleId;
  accessory?: 'none' | 'scarf' | 'beanie';
  shadow?: boolean;
}> = ({pose, styleId = 'classic-bw', accessory = 'none', shadow = true}) => {
  const theme = DIRECTOR_STYLES[styleId];
  const ink = theme.ink;
  const shade = theme.shade;
  const eyeColor = theme.background === '#FDFDFC' || theme.background === '#F4F0E5' ? '#FDFDFC' : '#191B26';

  const seg = (a: Point, b: Point, width: number, color = ink) => (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );

  const leftShoulder = {x: pose.shoulder.x - 26, y: pose.shoulder.y};
  const rightShoulder = {x: pose.shoulder.x + 26, y: pose.shoulder.y};
  const leftHip = {x: pose.hip.x - 20, y: pose.hip.y};
  const rightHip = {x: pose.hip.x + 20, y: pose.hip.y};
  const head = pose.head;
  const eyeY = pose.expression === 'tired' || pose.expression === 'sad' ? 4 : -8;

  return (
    <g>
      {shadow && (
        <ellipse
          cx={pose.hip.x}
          cy={Math.max(pose.feet[0].y, pose.feet[1].y) + 10}
          rx={105}
          ry={12}
          fill="#000000"
          opacity={0.28}
        />
      )}
      {seg(leftHip, pose.knees[0], theme.strokeWidth * 0.95, shade)}
      {seg(pose.knees[0], pose.feet[0], theme.strokeWidth * 0.88, shade)}
      {seg(leftShoulder, pose.elbows[0], theme.strokeWidth * 0.85, shade)}
      {seg(pose.elbows[0], pose.hands[0], theme.strokeWidth * 0.78, shade)}

      {accessory === 'scarf' && (
        <path
          d={`M ${pose.shoulder.x - 42} ${pose.shoulder.y + 8} Q ${pose.shoulder.x} ${pose.shoulder.y + 48} ${pose.shoulder.x + 44} ${pose.shoulder.y + 8}`}
          stroke={theme.accent}
          strokeWidth={28}
          fill="none"
          strokeLinecap="round"
        />
      )}

      {seg(rightHip, pose.knees[1], theme.strokeWidth)}
      {seg(pose.knees[1], pose.feet[1], theme.strokeWidth * 0.92)}
      {seg(pose.hip, pose.shoulder, theme.strokeWidth * 1.9)}
      {seg(rightShoulder, pose.elbows[1], theme.strokeWidth * 0.92)}
      {seg(pose.elbows[1], pose.hands[1], theme.strokeWidth * 0.82)}

      <circle cx={head.x} cy={head.y} r={58} fill={ink} />
      {accessory === 'beanie' && (
        <path
          d={`M ${head.x - 52} ${head.y - 24} Q ${head.x} ${head.y - 95} ${head.x + 52} ${head.y - 24} Z`}
          fill={theme.accent}
        />
      )}

      <circle cx={head.x - 19} cy={head.y + eyeY} r={6} fill={eyeColor} />
      <circle cx={head.x + 19} cy={head.y + eyeY} r={6} fill={eyeColor} />

      {pose.expression === 'angry' && (
        <>
          <line x1={head.x - 30} y1={head.y - 20} x2={head.x - 10} y2={head.y - 12} stroke={eyeColor} strokeWidth={5} strokeLinecap="round" />
          <line x1={head.x + 30} y1={head.y - 20} x2={head.x + 10} y2={head.y - 12} stroke={eyeColor} strokeWidth={5} strokeLinecap="round" />
        </>
      )}

      {pose.expression === 'shocked' ? (
        <circle cx={head.x} cy={head.y + 24} r={11} fill={eyeColor} />
      ) : pose.expression === 'happy' ? (
        <path
          d={`M ${head.x - 20} ${head.y + 15} Q ${head.x} ${head.y + 36} ${head.x + 20} ${head.y + 15}`}
          stroke={eyeColor}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      ) : pose.expression === 'sad' || pose.expression === 'angry' ? (
        <path
          d={`M ${head.x - 18} ${head.y + 28} Q ${head.x} ${head.y + 12} ${head.x + 18} ${head.y + 28}`}
          stroke={eyeColor}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <line
          x1={head.x - 15}
          y1={head.y + 22}
          x2={head.x + 15}
          y2={head.y + 22}
          stroke={eyeColor}
          strokeWidth={5}
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

/**
 * Single-line mobile-safe-area caption styled after `stickman-video-director` B1–B6.
 */
export const DirectorCaption: React.FC<{
  text: string;
  styleId?: DirectorStyleId;
  y?: number;
}> = ({text, styleId = 'classic-bw', y = PORTRAIT_SAFE_AREA.captionY}) => {
  const frame = useCurrentFrame();
  const theme = DIRECTOR_STYLES[styleId];
  const opacity = interpolate(frame, [0, 5], [0, 1], {extrapolateRight: 'clamp'});
  const offset = interpolate(frame, [0, 6], [12, 0], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        left: PORTRAIT_SAFE_AREA.x,
        width: PORTRAIT_SAFE_AREA.w,
        top: y,
        transform: `translateY(${offset}px)`,
        opacity,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1.2,
          color: theme.captionText,
          backgroundColor: theme.captionBg,
          padding: theme.captionBg === 'transparent' ? '0' : '12px 26px',
          borderRadius: 16,
          textAlign: 'center',
          textShadow:
            theme.captionBg === 'transparent'
              ? `0 3px 10px ${theme.captionStroke}`
              : 'none',
        }}
      >
        {text}
      </span>
    </div>
  );
};
