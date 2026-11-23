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

/** Full-height 16:9 right-side depth gauge HUD matching Tò Mò 1 layout. */
export const DepthGaugeHud16x9: React.FC<{
  fromDepth: number;
  toDepth: number;
}> = ({fromDepth, toDepth}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 120], [0, 1], {extrapolateRight: 'clamp'});
  const currentDepth = fromDepth + (toDepth - fromDepth) * progress;
  const ratio = METER_TO_RATIO(currentDepth);
  const barHeight = 760;
  const pointerY = ratio * barHeight;

  return (
    <div
      style={{
        position: 'absolute',
        top: 150,
        right: 68,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        zIndex: 30,
      }}
    >
      <div
        style={{
          position: 'relative',
          height: barHeight,
          width: 110,
          textAlign: 'right',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 20,
          fontWeight: 600,
          color: 'rgba(226, 232, 240, 0.9)',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}
      >
        {DEPTH_MARKS.map((mark, idx) => (
          <div
            key={mark.label}
            style={{
              position: 'absolute',
              top: (idx / (DEPTH_MARKS.length - 1)) * barHeight - 11,
              right: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {mark.label}
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          width: 22,
          height: barHeight,
          borderRadius: 11,
          background:
            'linear-gradient(180deg, #38bdf8 0%, #0284c7 22%, #1e3a8a 48%, #0f172a 75%, #020617 100%)',
          border: '1.5px solid rgba(148, 163, 184, 0.45)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: pointerY - 8,
            left: 3,
            width: 13,
            height: 13,
            borderRadius: '50%',
            backgroundColor: '#facc15',
            boxShadow: '0 0 12px rgba(250, 204, 21, 0.95)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: pointerY - 10,
            left: 28,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '14px solid #facc15',
          }}
        />
      </div>
    </div>
  );
};

/** Bottom-left 16:9 lower-third with vertical amber bar. */
export const GoldLowerThird16x9: React.FC<{
  title: string;
  subtitle: string;
  enterFrame?: number;
}> = ({title, subtitle, enterFrame = 10}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slide = spring({
    frame: Math.max(0, frame - enterFrame),
    fps,
    config: {damping: 16, stiffness: 120},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        bottom: 64,
        maxWidth: 920,
        backgroundColor: 'rgba(6, 11, 24, 0.86)',
        borderLeft: '8px solid #f59e0b',
        padding: '20px 32px',
        borderRadius: '0 12px 12px 0',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.6)',
        transform: `translateX(${interpolate(slide, [0, 1], [-56, 0])}px)`,
        opacity: slide,
        zIndex: 25,
      }}
    >
      <div
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 42,
          fontWeight: 800,
          color: '#f8fafc',
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

/** Documentary narrative subtitle/callout banner at top-left for 16:9. */
export const DocumentaryCaption16x9: React.FC<{
  lines: ReadonlyArray<{from: number; to: number; text: string}>;
}> = ({lines}) => {
  const frame = useCurrentFrame();
  const active = lines.find((l) => frame >= l.from && frame < l.to);
  if (!active) return null;

  const local = frame - active.from;
  const opacity = interpolate(local, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        top: 68,
        left: 64,
        maxWidth: 1320,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 38,
        fontWeight: 700,
        color: '#f8fafc',
        lineHeight: 1.32,
        textShadow: '0 4px 18px rgba(0, 0, 0, 0.92)',
        backgroundColor: 'rgba(2, 6, 18, 0.45)',
        padding: '14px 24px',
        borderRadius: 10,
        opacity,
        zIndex: 26,
      }}
    >
      {active.text}
    </div>
  );
};

/** Smooth deterministic Ken Burns pan/zoom on real NOAA/Wikimedia media. */
export const KenBurnsMedia: React.FC<{
  src: string;
  startScale?: number;
  endScale?: number;
  panX?: number;
  panY?: number;
  brightness?: number;
}> = ({src, startScale = 1.05, endScale = 1.16, panX = -18, panY = -10, brightness = 0.9}) => {
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
            'radial-gradient(circle at 46% 48%, rgba(2,6,18,0.06) 35%, rgba(2,6,18,0.72) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Deterministic marine snow particles for 1920x1080 canvas. */
export const MarineSnowLayer16x9: React.FC<{count?: number; speed?: number}> = ({
  count = 36,
  speed = 1.2,
}) => {
  const frame = useCurrentFrame();
  const particles = Array.from({length: count}, (_, i) => {
    const seedX = ((i * 211 + 37) % 1000) / 1000;
    const seedY = ((i * 347 + 83) % 1000) / 1000;
    const size = 2 + (i % 4);
    const x = seedX * 1920 + Math.sin(frame * 0.025 + i) * 18;
    const y = (seedY * 1080 - frame * speed * (0.65 + (i % 3) * 0.35) + 1080 * 10) % 1080;
    const opacity = 0.14 + (i % 4) * 0.07;
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

/** Two-column 16:9 infographic matching Tò Mò 1's "ĐẠI DƯƠNG = MỘT TÒA NHÀ KHỔNG LỒ". */
export const OceanBuildingInfographic16x9: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const waveOffset = Math.sin(frame * 0.07) * 10;

  const tiers = [
    {range: '0–200 m', name: 'TẦNG NƯỚC NÓNG', color: '#7dd3fc', textColor: '#0f172a'},
    {range: '200–1.000 m', name: 'TẦNG HOÀNG HÔN', color: '#0284c7', textColor: '#f8fafc'},
    {range: '1–4 km', name: 'TẦNG ĐÊM THẲM', color: '#1e3a8a', textColor: '#f8fafc'},
    {range: '4–11 km', name: 'TẦNG VỰC THẲM', color: '#0f172a', textColor: '#f8fafc'},
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0b264d 0%, #030b1a 100%)',
        padding: '120px 140px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 80,
      }}
    >
      {/* Left title block */}
      <div style={{flex: 1}}>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 78,
            fontWeight: 900,
            color: '#f8fafc',
            lineHeight: 1.08,
          }}
        >
          ĐẠI DƯƠNG
        </div>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 54,
            fontWeight: 800,
            color: '#f59e0b',
            marginTop: 14,
            lineHeight: 1.15,
          }}
        >
          = MỘT TÒA NHÀ
          <br />
          KHỔNG LỒ
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 28,
            color: '#cbd5e1',
            lineHeight: 1.45,
          }}
        >
          Mỗi tầng sâu thay đổi hoàn toàn 4 điều kiện sinh tồn:
          <br />
          <strong style={{color: '#fde047'}}>
            Ánh sáng · Thức ăn · Nhiệt độ &amp; Áp suất · Nơi ẩn nấp
          </strong>
        </div>
      </div>

      {/* Right building cross-section */}
      <div style={{flex: 1.05, position: 'relative'}}>
        <div
          style={{
            textAlign: 'right',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 20,
            fontWeight: 700,
            color: '#bae6fd',
            marginBottom: 6,
          }}
        >
          MẶT NƯỚC
        </div>
        <svg width="100%" height={28} viewBox="0 0 700 28" style={{marginBottom: -4}}>
          <path
            d={`M0,14 Q175,${2 + waveOffset} 350,14 T700,14`}
            fill="none"
            stroke="#bae6fd"
            strokeWidth={4}
          />
        </svg>

        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {tiers.map((tier, idx) => {
            const appear = spring({
              frame: Math.max(0, frame - idx * 25),
              fps,
              config: {damping: 16, stiffness: 120},
            });
            return (
              <div
                key={tier.range}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  opacity: appear,
                  transform: `translateX(${interpolate(appear, [0, 1], [36, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 150,
                    textAlign: 'right',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#e2e8f0',
                  }}
                >
                  {tier.range}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 112,
                    borderRadius: 10,
                    backgroundColor: tier.color,
                    border: '2px solid rgba(186, 230, 253, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: 28,
                      fontWeight: 800,
                      color: tier.textColor,
                    }}
                  >
                    {tier.name}
                  </span>
                  <div style={{display: 'flex', gap: 10}}>
                    {[0, 1, 2, 3].map((w) => (
                      <div
                        key={w}
                        style={{
                          width: 24,
                          height: 44,
                          borderRadius: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.22)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
