// Kit: shared styles, colors, fonts for ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

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
  textEntrance: { duration: 20, easing: [0.25, 0.46, 0.45, 0.94] as const },
  artEntrance: { duration: 22, easing: [0.25, 0.46, 0.45, 0.94] as const },
  breathe: { period: 24, amplitude: 0.008 },
  crossDissolve: { duration: 15 },
  accentHighlight: { duration: 8, scale: 1.05 },
} as const;

export const LAYOUT = {
  width: 1080,
  height: 1920,
  safeMarginHorizontal: 90,
  safeMarginBottom: 210,
  captionTop: 268,
} as const;

// Reusable motion hooks
export const useTextEntrance = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.textEntrance.duration], [24, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
};

export const useArtEntrance = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.artEntrance.duration], [36, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
};

export const useBreathe = (period = MOTION.breathe.period, amplitude = MOTION.breathe.amplitude) => {
  const f = useCurrentFrame();
  return 1 + Math.sin(f / period) * amplitude;
};

export const useCrossDissolve = (offset = 0) => {
  const f = useCurrentFrame();
  return interpolate(f - offset, [0, MOTION.crossDissolve.duration], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
};

export const useAccentHighlight = (triggerFrame: number, duration = MOTION.accentHighlight.duration) => {
  const f = useCurrentFrame();
  const progress = interpolate(f - triggerFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return { scale: 1 + progress * (MOTION.accentHighlight.scale - 1), progress };
};

// SVG Components (from video-shotcraft demos/_fixtures)
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
    <rect x={0} y={0} width={230} height={250} rx={16} stroke={COLORS.muted} strokeWidth={8} fill="none" />
    {[0, 1, 2].map(i => (
      <path key={i} d={`M26 ${78 + i * 50}H204`} stroke={i === 2 ? COLORS.accent : COLORS.muted} strokeWidth={8} strokeLinecap="round" />
    ))}
    <path d="M40 0V-20M190 0V-20" stroke={COLORS.text} strokeWidth={10} />
  </g>
);

export const LightParticles: React.FC<{ x: number; y: number; count?: number; color?: string; frame?: number; maxFrame?: number }> = ({
  x, y, count = 16, color = COLORS.accent, frame = 0, maxFrame = 200,
}) => {
  const progress = frame / maxFrame;
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * Math.PI * 2) / count;
        const radius = 80 * progress;
        return (
          <circle
            key={i}
            cx={Math.cos(angle) * radius}
            cy={Math.sin(angle) * radius}
            r={4}
            fill={color}
            opacity={0.7 * (1 - progress * 0.5)}
          />
        );
      })}
    </g>
  );
};

export const ExpandingGlow: React.FC<{ x: number; y: number; radius: number; opacity?: number }> = ({
  x, y, radius, opacity = 0.12,
}) => (
  <circle cx={x} cy={y} r={radius} fill={COLORS.accent} opacity={opacity} />
);

export const DeleteKeyGlow: React.FC<{ x: number; y: number; intensity: number }> = ({
  x, y, intensity,
}) => (
  <circle cx={x} cy={y} r={20} fill={COLORS.accent} opacity={0.8 * intensity} />
);

export const QuestionMarkBuild: React.FC<{ x: number; y: number; progress: number; totalSyllables: number }> = ({
  x, y, progress, totalSyllables,
}) => {
  const visible = Math.floor(progress * totalSyllables);
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: totalSyllables }).map((_, i) => (
        i < visible ? (
          <text key={i} x={0} y={0} textAnchor="middle" fontSize={120} fill={COLORS.accent} fontFamily={FONTS.heading} fontWeight={900} opacity={1}>
            ?
          </text>
        ) : null
      ))}
    </g>
  );
};

export const CrackPath: React.FC<{ progress: number }> = ({ progress }) => (
  <path
    d="M420 920 Q450 900 480 920"
    stroke={COLORS.accent}
    strokeWidth={3}
    fill="none"
    strokeDasharray="8 4"
    strokeDashoffset={progress * 100}
  />
);

export const MirrorReflection: React.FC<{ x: number; y: number; offset: number; tint: number }> = ({
  x, y, offset, tint,
}) => (
  <g transform={`translate(${x} ${y})`} opacity={0.5}>
    <Human x={0} y={0} />
    <rect x={-115} y={-125} width={230} height={250} rx={16} stroke={tint > 0 ? COLORS.accent : COLORS.muted} strokeWidth={8} fill="none" />
  </g>
);