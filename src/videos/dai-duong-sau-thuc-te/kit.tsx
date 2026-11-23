import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const DEPTH_MARKS = [
  {label: '0', meters: 0},
  {label: '200 m', meters: 200},
  {label: '1.000 m', meters: 1000},
  {label: '4.000 m', meters: 4000},
  {label: '6.000 m', meters: 6000},
  {label: '11.000', meters: 11000},
] as const;

const METER_TO_RATIO = (meters: number): number => {
  if (meters <= 200) return interpolate(meters, [0, 200], [0, 0.2]);
  if (meters <= 1000) return interpolate(meters, [200, 1000], [0.2, 0.4]);
  if (meters <= 4000) return interpolate(meters, [1000, 4000], [0.4, 0.6]);
  if (meters <= 6000) return interpolate(meters, [4000, 6000], [0.6, 0.8]);
  return interpolate(meters, [6000, 11000], [0.8, 1], {extrapolateRight: 'clamp'});
};

/** Right-side vertical ocean depth gauge inspired by Tò Mò 1, placed in 9:16 top-right safe zone. */
export const DepthGaugeHud: React.FC<{
  fromDepth: number;
  toDepth: number;
}> = ({fromDepth, toDepth}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 75], [0, 1], {extrapolateRight: 'clamp'});
  const currentDepth = fromDepth + (toDepth - fromDepth) * progress;
  const ratio = METER_TO_RATIO(currentDepth);
  const barHeight = 460;
  const pointerY = ratio * barHeight;

  return (
    <div
      style={{
        position: 'absolute',
        top: 150,
        right: 36,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        zIndex: 30,
      }}
    >
      {/* Depth labels */}
      <div
        style={{
          position: 'relative',
          height: barHeight,
          width: 96,
          textAlign: 'right',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 18,
          fontWeight: 600,
          color: 'rgba(226, 232, 240, 0.88)',
          textShadow: '0 2px 6px rgba(0,0,0,0.85)',
        }}
      >
        {DEPTH_MARKS.map((mark, idx) => (
          <div
            key={mark.label}
            style={{
              position: 'absolute',
              top: (idx / (DEPTH_MARKS.length - 1)) * barHeight - 10,
              right: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {mark.label}
          </div>
        ))}
      </div>

      {/* Vertical gradient bar + pointer */}
      <div
        style={{
          position: 'relative',
          width: 18,
          height: barHeight,
          borderRadius: 9,
          background:
            'linear-gradient(180deg, #38bdf8 0%, #0284c7 22%, #1e3a8a 48%, #0f172a 75%, #020617 100%)',
          border: '1.5px solid rgba(148, 163, 184, 0.45)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.55)',
        }}
      >
        {/* Active depth dot + triangle */}
        <div
          style={{
            position: 'absolute',
            top: pointerY - 7,
            left: 2,
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: '#facc15',
            boxShadow: '0 0 10px rgba(250, 204, 21, 0.9)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: pointerY - 9,
            left: 24,
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderRight: '12px solid #facc15',
          }}
        />
      </div>
    </div>
  );
};

/** Dark translucent lower-third with vertical amber accent bar in 9:16 mobile safe zone. */
export const GoldLowerThird: React.FC<{
  title: string;
  subtitle: string;
  enterFrame?: number;
}> = ({title, subtitle, enterFrame = 8}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slide = spring({
    frame: Math.max(0, frame - enterFrame),
    fps,
    config: {damping: 16, stiffness: 130},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        bottom: 300,
        maxWidth: 800,
        backgroundColor: 'rgba(6, 11, 24, 0.84)',
        borderLeft: '7px solid #f59e0b',
        padding: '18px 28px',
        borderRadius: '0 12px 12px 0',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.55)',
        transform: `translateX(${interpolate(slide, [0, 1], [-48, 0])}px)`,
        opacity: slide,
        zIndex: 25,
      }}
    >
      <div
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 40,
          fontWeight: 800,
          color: '#f8fafc',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 25,
          fontWeight: 500,
          color: '#cbd5e1',
          lineHeight: 1.3,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

/** Real photo with smooth deterministic Ken Burns pan/zoom and deep-sea vignette. */
export const KenBurnsMedia: React.FC<{
  src: string;
  startScale?: number;
  endScale?: number;
  panX?: number;
  panY?: number;
  brightness?: number;
}> = ({src, startScale = 1.06, endScale = 1.18, panX = 0, panY = -18, brightness = 0.92}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(t, [0, 1], [startScale, endScale]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  return (
    <AbsoluteFill style={{backgroundColor: '#020612', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: `brightness(${brightness}) contrast(1.08) saturate(1.05)`,
          transform: `scale(${scale}) translate3d(${tx}px, ${ty}px, 0)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(2,6,18,0.05) 30%, rgba(2,6,18,0.72) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Deterministic marine snow particles drifting upward as camera dives deeper. */
export const MarineSnowLayer: React.FC<{count?: number; speed?: number}> = ({
  count = 28,
  speed = 1.5,
}) => {
  const frame = useCurrentFrame();
  const particles = Array.from({length: count}, (_, i) => {
    const seedX = ((i * 197 + 43) % 1000) / 1000;
    const seedY = ((i * 313 + 71) % 1000) / 1000;
    const size = 2 + (i % 4);
    const x = seedX * 1080 + Math.sin(frame * 0.03 + i) * 14;
    const y = (seedY * 1920 - frame * speed * (0.7 + (i % 3) * 0.35) + 1920 * 10) % 1920;
    const opacity = 0.16 + (i % 4) * 0.08;
    return {x, y, size, opacity};
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 15}}>
      {particles.map((p, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: `rgba(186, 230, 253, ${p.opacity})`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** Concise 1-2 line narration caption in mobile safe zone. */
export const NarrationCaption: React.FC<{
  text: string;
  top?: number;
}> = ({text, top = 160}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 190,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 44,
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1.25,
        textShadow: '0 4px 18px rgba(0, 0, 0, 0.9)',
        opacity,
        zIndex: 28,
      }}
    >
      {text}
    </div>
  );
};

/** Tò Mò 1-inspired "ĐẠI DƯƠNG = MỘT TÒA NHÀ KHỔNG LỒ" 2D cross-section infographic. */
export const OceanBuildingInfographic: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const waveOffset = Math.sin(frame * 0.08) * 12;

  const tiers = [
    {range: '0 – 200 m', name: 'TẦNG NƯỚC NÓNG', color: '#38bdf8', desc: 'Ánh nắng chiếu rọi'},
    {range: '200 – 1.000 m', name: 'TẦNG HOÀNG HÔN', color: '#0369a1', desc: 'Ánh sáng tắt dần'},
    {range: '1.000 – 4.000 m', name: 'TẦNG ĐÊM THẲM', color: '#1e3a8a', desc: 'Tối đen tuyệt đối'},
    {
      range: '4.000 – 6.000 m+',
      name: 'TẦNG VỰC THẲM',
      color: '#0f172a',
      desc: 'Áp suất nghiền nát',
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #071936 0%, #020817 100%)',
        padding: '160px 56px 280px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 54,
            fontWeight: 900,
            color: '#f8fafc',
            lineHeight: 1.15,
          }}
        >
          ĐẠI DƯƠNG
        </div>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 42,
            fontWeight: 800,
            color: '#f59e0b',
            marginTop: 6,
          }}
        >
          = MỘT TÒA NHÀ KHỔNG LỒ
        </div>
      </div>

      {/* Building cross-section */}
      <div style={{position: 'relative', marginTop: 24}}>
        {/* Animated water surface line */}
        <svg width="100%" height={34} viewBox="0 0 800 34" style={{marginBottom: -4}}>
          <path
            d={`M0,18 Q200,${4 + waveOffset} 400,18 T800,18`}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth={4}
          />
        </svg>

        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {tiers.map((tier, idx) => {
            const appear = spring({
              frame: Math.max(0, frame - idx * 24),
              fps,
              config: {damping: 15, stiffness: 120},
            });
            return (
              <div
                key={tier.range}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '26px 28px',
                  borderRadius: 14,
                  backgroundColor: tier.color,
                  border: '2px solid rgba(186, 230, 253, 0.25)',
                  opacity: appear,
                  transform: `translateY(${interpolate(appear, [0, 1], [24, 0])}px)`,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#fde047',
                    }}
                  >
                    {tier.range}
                  </div>
                  <div
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: 32,
                      fontWeight: 800,
                      color: '#ffffff',
                      marginTop: 4,
                    }}
                  >
                    {tier.name}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'rgba(241, 245, 249, 0.9)',
                    textAlign: 'right',
                  }}
                >
                  {tier.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
