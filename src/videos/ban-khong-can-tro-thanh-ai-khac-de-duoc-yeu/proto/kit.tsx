// Proto Kit: shared styles, colors, fonts for ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
import React from 'react';

export const COLORS = {
  base: '#0D0D0D',
  accent: '#E8A87C',
  muted: '#A0A0A0',
  text: '#F5F5F5',
  accentDim: '#C8885C',
} as const;

export const FONTS = {
  heading: 'Playfair Display',
  body: 'Be Vietnam Pro',
} as const;

export const TYPOGRAPHY = {
  heading: {
    fontFamily: FONTS.heading,
    fontWeight: 900,
    letterSpacing: -2,
    lineHeight: 1.2,
  },
  caption: {
    fontFamily: FONTS.body,
    fontWeight: 500,
    lineHeight: 1.35,
  },
  onScreen: {
    fontFamily: FONTS.body,
    fontWeight: 600,
    lineHeight: 1.3,
  },
} as const;

export const MOTION = {
  textEntrance: { duration: 20, easing: [0.25, 0.46, 0.45, 0.94] },
  artEntrance: { duration: 22, easing: [0.25, 0.46, 0.45, 0.94] },
  breathe: { period: 24, amplitude: 0.008 },
  crossDissolve: { duration: 15 },
  accentHighlight: { duration: 8, scale: 1.05 },
} as const;

export const LAYOUT = {
  width: 1080,
  height: 1920,
  safeMarginHorizontal: 90,
  safeMarginBottom: 210,
  captionTop: 268, // from bottom
} as const;

// Reusable SVG components (stroke-based, from video-shotcraft demos/_fixtures)
export const Human: React.FC<{ x: number; y: number; accent?: boolean; scale?: number }> = ({
  x, y, accent = false, scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={accent ? COLORS.accent : COLORS.text} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={0} cy={0} r={44} />
    <path d="M0 45 V260 M0 127 L-80 208 M0 127 L80 208 M0 260 L-75 382 M0 260 L75 382" />
  </g>
);

export const Calendar: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} fill="none" opacity={opacity}>
    <rect x={0} y={0} width={230} height={250} rx={16} stroke={COLORS.muted} strokeWidth={8} />
    {[0, 1, 2].map(i => (
      <path key={i} d={`M26 ${78 + i * 50}H204`} stroke={i === 2 ? COLORS.accent : COLORS.muted} strokeWidth={8} strokeLinecap="round" />
    ))}
    <path d="M40 0V-20M190 0V-20" stroke={COLORS.text} strokeWidth={10} />
  </g>
);

export const LightParticles: React.FC<{ x: number; y: number; count?: number; color?: string }> = ({
  x, y, count = 12, color = COLORS.accent,
}) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: count }).map((_, i) => (
      <circle
        key={i}
        cx={Math.cos(i * Math.PI * 2 / count) * 80}
        cy={Math.sin(i * Math.PI * 2 / count) * 80}
        r={4}
        fill={color}
        opacity={0.7}
      />
    ))}
  </g>
);

export const ExpandingGlow: React.FC<{ x: number; y: number; radius: number; opacity?: number }> = ({
  x, y, radius, opacity = 0.15,
}) => (
  <circle cx={x} cy={y} r={radius} fill={COLORS.accent} opacity={opacity} />
);