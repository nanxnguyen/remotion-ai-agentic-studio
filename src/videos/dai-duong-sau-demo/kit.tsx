import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export interface DepthStageProps {
  /** Current depth in meters (drives ruler scroll + color darkening). */
  depthMeters: number;
  /** Optional custom background gradient override (e.g., sunlit hook). */
  backgroundGradient?: string;
  children?: React.ReactNode;
}

const lerpColor = (a: [number, number, number], b: [number, number, number], t: number): string => {
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(a[0] + (b[0] - a[0]) * clamped);
  const g = Math.round(a[1] + (b[1] - a[1]) * clamped);
  const bl = Math.round(a[2] + (b[2] - a[2]) * clamped);
  return `rgb(${r}, ${g}, ${bl})`;
};

export const DepthStage: React.FC<DepthStageProps> = ({
  depthMeters,
  backgroundGradient,
  children,
}) => {
  const frame = useCurrentFrame();

  // Smoothly darken ocean blueprint blue as depth increases from 0m to 1000m
  const t = Math.max(0, Math.min(1, depthMeters / 1000));
  const topColor = lerpColor([28, 118, 232], [5, 19, 48], t);
  const bottomColor = lerpColor([14, 72, 178], [2, 8, 24], t);
  const gridOpacity = interpolate(t, [0, 1], [0.22, 0.14]);

  // Ruler scrolls vertically proportional to depthMeters
  const tickSpacing = 22;
  const scrollPx = (depthMeters * 3.2) % (tickSpacing * 5);

  // Deterministic ambient bubbles
  const bubbles = Array.from({length: 14}, (_, i) => {
    const x = ((i * 83 + 45) % 960) + 60;
    const speed = 2.2 + (i % 4) * 0.9;
    const y = 1960 - ((frame * speed + i * 173) % 2040);
    const r = 4 + (i % 5) * 3;
    const alpha = 0.14 + (i % 3) * 0.08;
    return {x, y, r, alpha};
  });

  return (
    <AbsoluteFill
      style={{
        background:
          backgroundGradient ?? `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
        overflow: 'hidden',
        fontFamily: 'Montserrat, Arial, sans-serif',
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,${gridOpacity}) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(255,255,255,${gridOpacity}) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '72px 72px',
          backgroundPosition: `0px ${-scrollPx * 0.5}px`,
        }}
      />

      {/* Subtle Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 55% 48%, transparent 45%, rgba(0, 8, 25, 0.48) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left Scrolling Ruler */}
      <svg
        width={110}
        height={1920}
        style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}
      >
        <line x1={8} y1={0} x2={8} y2={1920} stroke="rgba(10,15,28,0.85)" strokeWidth={6} />
        {Array.from({length: 96}, (_, i) => {
          const y = i * tickSpacing - (scrollPx % (tickSpacing * 5));
          const isMajor = i % 5 === 0;
          return (
            <line
              key={i}
              x1={8}
              y1={y}
              x2={isMajor ? 68 : 38}
              y2={y}
              stroke={isMajor ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.72)'}
              strokeWidth={isMajor ? 5 : 3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Ambient Floating Bubbles */}
      <svg
        width={1080}
        height={1920}
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        {bubbles.map((b, idx) => (
          <circle
            key={idx}
            cx={b.x}
            cy={b.y}
            r={b.r}
            fill="none"
            stroke={`rgba(210, 238, 255, ${b.alpha})`}
            strokeWidth={2}
          />
        ))}
      </svg>

      {children}
    </AbsoluteFill>
  );
};

export const DepthBadge: React.FC<{label: string; triggerFrame?: number}> = ({
  label,
  triggerFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - triggerFrame);
  const pop = spring({
    frame: localFrame,
    fps,
    config: {damping: 12, stiffness: 180, mass: 0.8},
  });
  const scale = interpolate(pop, [0, 1], [0.75, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 112,
        top: 170,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#ff2323',
          letterSpacing: 1,
          textTransform: 'uppercase',
          WebkitTextStroke: '10px #ffffff',
          paintOrder: 'stroke fill',
          textShadow: '0 8px 20px rgba(0,0,0,0.45)',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export interface CaptionSegment {
  text: string;
  startFrame: number;
  endFrame: number;
  accentColor?: string;
}

export const ScaleCaption: React.FC<{segments: CaptionSegment[]; top?: number}> = ({
  segments,
  top = 360,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const active = segments.find((s) => frame >= s.startFrame && frame < s.endFrame);
  if (!active) return null;

  const localFrame = frame - active.startFrame;
  const pop = spring({
    frame: localFrame,
    fps,
    config: {damping: 14, stiffness: 220, mass: 0.6},
  });
  const scale = interpolate(pop, [0, 1], [0.86, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        right: 60,
        top,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          lineHeight: 1.18,
          textAlign: 'center',
          textTransform: 'uppercase',
          color: active.accentColor ?? '#ffffff',
          WebkitTextStroke: '11px #090d16',
          paintOrder: 'stroke fill',
          textShadow: '0 6px 18px rgba(0,0,0,0.65)',
        }}
      >
        {active.text}
      </div>
    </div>
  );
};
