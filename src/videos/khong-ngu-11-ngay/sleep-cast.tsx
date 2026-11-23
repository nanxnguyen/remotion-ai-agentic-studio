import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {visemeForNarration, type Viseme} from './lip-sync';
import type {MascotMood, MascotPose, StageTheme} from '../top-5-luc-can-manh-nhat/kit';

export const SleepThemeStage: React.FC<{
  theme: StageTheme;
  shake?: number;
  impactFrame?: number;
  zoom?: number;
  children: React.ReactNode;
}> = ({theme, shake = 0, impactFrame, zoom = 1.03, children}) => {
  const frame = useCurrentFrame();
  const autoZoom = interpolate(frame, [0, 240], [1.0, zoom], {extrapolateRight: 'clamp'});
  const shakeAmt = shake > 0 ? Math.sin(frame * 1.9) * shake * 12 : 0;
  const shakeY = shake > 0 ? Math.cos(frame * 2.4) * shake * 8 : 0;
  const impactFlash =
    impactFrame !== undefined && frame >= impactFrame && frame <= impactFrame + 4
      ? interpolate(frame, [impactFrame, impactFrame + 4], [0.55, 0], {extrapolateRight: 'clamp'})
      : 0;

  const palettes: Record<
    StageTheme,
    {
      top: string;
      bottom: string;
      wall: string;
      glow: string;
      windowSky: string;
      floor: string;
      particle: string;
    }
  > = {
    studio: {
      top: '#1E1B4B',
      bottom: '#0F172A',
      wall: '#27235C',
      glow: 'rgba(250, 204, 21, 0.16)',
      windowSky: '#0B1120',
      floor: '#1E1633',
      particle: '#FDE68A',
    },
    river: {
      top: '#0F172A',
      bottom: '#082F49',
      wall: '#162A45',
      glow: 'rgba(56, 189, 248, 0.18)',
      windowSky: '#061529',
      floor: '#0F2238',
      particle: '#7DD3FC',
    },
    swamp: {
      top: '#022C22',
      bottom: '#064E3B',
      wall: '#0B3B2E',
      glow: 'rgba(52, 211, 153, 0.16)',
      windowSky: '#021E18',
      floor: '#062920',
      particle: '#6EE7B7',
    },
    savanna: {
      top: '#3B0764',
      bottom: '#7C2D12',
      wall: '#4A154B',
      glow: 'rgba(251, 146, 60, 0.22)',
      windowSky: '#C2410C',
      floor: '#2E1035',
      particle: '#FDBA74',
    },
    ocean: {
      top: '#090617',
      bottom: '#2E1065',
      wall: '#1B0B3B',
      glow: 'rgba(239, 68, 68, 0.2)',
      windowSky: '#050311',
      floor: '#120726',
      particle: '#FCA5A5',
    },
    amazon: {
      top: '#042F2E',
      bottom: '#134E4A',
      wall: '#0B3A38',
      glow: 'rgba(45, 212, 191, 0.18)',
      windowSky: '#04201F',
      floor: '#072928',
      particle: '#5EEAD4',
    },
  };

  const p = palettes[theme] ?? palettes.studio;
  const clockHandDeg = (frame * 6) % 360;
  const lampFlicker = theme === 'ocean' ? 0.75 + Math.sin(frame * 0.5) * 0.25 : 1;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${p.top} 0%, ${p.bottom} 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${shakeAmt}px, ${shakeY}px) scale(${autoZoom})`,
          transformOrigin: 'center center',
        }}
      >
        <svg
          width={1920}
          height={1080}
          viewBox="0 0 1920 1080"
          style={{position: 'absolute', inset: 0}}
        >
          <defs>
            <radialGradient id="lampGlow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor={p.glow} stopOpacity={lampFlicker} />
              <stop offset="100%" stopColor={p.bottom} stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Back bedroom / sleep-lab wall panels */}
          <rect x={0} y={0} width={1920} height={820} fill={p.wall} opacity={0.45} />
          <line
            x1={0}
            y1={820}
            x2={1920}
            y2={820}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={4}
          />
          <rect x={0} y={820} width={1920} height={260} fill={p.floor} />
          {/* Wooden floor planks */}
          {[870, 930, 1000].map((yPos) => (
            <line
              key={yPos}
              x1={0}
              y1={yPos}
              x2={1920}
              y2={yPos}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={2}
            />
          ))}

          {/* Window overlooking night sky / dawn */}
          <g transform="translate(1180, 120)">
            <rect
              x={0}
              y={0}
              width={440}
              height={360}
              rx={22}
              fill={p.windowSky}
              stroke="#475569"
              strokeWidth={12}
            />
            {/* Moon & stars inside window */}
            <circle
              cx={340}
              cy={90}
              r={38}
              fill="#FEF08A"
              opacity={theme === 'savanna' ? 0.45 : 0.9}
            />
            {theme !== 'savanna' && <circle cx={356} cy={78} r={34} fill={p.windowSky} />}
            {[
              [70, 70],
              [140, 130],
              [230, 60],
              [110, 220],
              [280, 200],
            ].map(([sx, sy], idx) => (
              <circle
                key={idx}
                cx={sx}
                cy={sy}
                r={3 + (idx % 2) * 1.5}
                fill="#F8FAFC"
                opacity={0.45 + 0.4 * Math.sin(frame * 0.08 + idx)}
              />
            ))}
            {/* Window crossbars */}
            <line x1={220} y1={0} x2={220} y2={360} stroke="#475569" strokeWidth={10} />
            <line x1={0} y1={180} x2={440} y2={180} stroke="#475569" strokeWidth={10} />
            {/* Curtains */}
            <path
              d="M-18,-10 Q30,180 -10,370 L60,370 Q75,180 55,-10 Z"
              fill="#312E81"
              opacity={0.85}
            />
            <path
              d="M458,-10 Q410,180 450,370 L380,370 Q365,180 385,-10 Z"
              fill="#312E81"
              opacity={0.85}
            />
          </g>

          {/* Wall clock or EEG lab grid */}
          {theme === 'amazon' ? (
            <g opacity={0.28} transform="translate(140, 260)">
              <rect
                x={0}
                y={0}
                width={680}
                height={240}
                rx={18}
                fill="#042F2E"
                stroke="#2DD4BF"
                strokeWidth={4}
              />
              <polyline
                points="20,130 90,130 120,60 150,200 185,90 220,150 280,130 350,130 380,45 415,210 450,100 500,130 650,130"
                fill="none"
                stroke="#5EEAD4"
                strokeWidth={5}
              />
            </g>
          ) : (
            <g transform="translate(880, 240)" opacity={0.55}>
              <circle cx={0} cy={0} r={74} fill="#1E293B" stroke="#94A3B8" strokeWidth={8} />
              <circle cx={0} cy={0} r={6} fill="#FDE047" />
              <line
                x1={0}
                y1={0}
                x2={Math.cos(((clockHandDeg - 90) * Math.PI) / 180) * 48}
                y2={Math.sin(((clockHandDeg - 90) * Math.PI) / 180) * 48}
                stroke="#F87171"
                strokeWidth={4}
                strokeLinecap="round"
              />
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={-32}
                stroke="#F8FAFC"
                strokeWidth={5}
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Warm bedside lamp on left */}
          <g transform="translate(210, 580)">
            <rect
              x={-55}
              y={190}
              width={110}
              height={50}
              rx={10}
              fill="#334155"
              stroke="#0F172A"
              strokeWidth={4}
            />
            <rect
              x={-10}
              y={95}
              width={20}
              height={98}
              fill="#64748B"
              stroke="#0F172A"
              strokeWidth={3}
            />
            <polygon
              points="-58,98 58,98 36,15 -36,15"
              fill="#FDE68A"
              stroke="#0F172A"
              strokeWidth={4}
              opacity={lampFlicker}
            />
          </g>

          {/* Soft ambient glow */}
          <rect x={0} y={0} width={1920} height={1080} fill="url(#lampGlow)" />

          {/* Floating sleep-dust particles */}
          {Array.from({length: 14}).map((_, idx) => {
            const px = (idx * 173 + frame * (0.4 + (idx % 3) * 0.2)) % 1920;
            const py = (idx * 119 + Math.sin(frame * 0.03 + idx) * 24) % 920;
            return (
              <circle
                key={idx}
                cx={px}
                cy={py}
                r={3 + (idx % 3) * 1.5}
                fill={p.particle}
                opacity={0.28}
              />
            );
          })}
        </svg>

        {children}
      </div>

      {impactFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#FFFFFF',
            opacity: impactFlash,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

const MouthSVG: React.FC<{shape: Viseme}> = ({shape}) => {
  switch (shape) {
    case 'A':
      return (
        <ellipse cx={0} cy={38} rx={17} ry={22} fill="#7F1D1D" stroke="#1E293B" strokeWidth={4} />
      );
    case 'E':
      return (
        <ellipse cx={0} cy={38} rx={22} ry={12} fill="#7F1D1D" stroke="#1E293B" strokeWidth={4} />
      );
    case 'M':
      return (
        <line
          x1={-16}
          y1={38}
          x2={16}
          y2={38}
          stroke="#1E293B"
          strokeWidth={6}
          strokeLinecap="round"
        />
      );
    case 'O':
      return <circle cx={0} cy={38} r={14} fill="#7F1D1D" stroke="#1E293B" strokeWidth={4} />;
    case 'U':
      return <circle cx={0} cy={38} r={9} fill="#7F1D1D" stroke="#1E293B" strokeWidth={4} />;
    case 'F':
      return (
        <path
          d="M-16,35 Q0,44 16,35"
          fill="none"
          stroke="#1E293B"
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    default:
      return (
        <path
          d="M-14,36 Q0,42 14,36"
          fill="none"
          stroke="#1E293B"
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
  }
};

export const SleepOwlBoyMascot: React.FC<{
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  mood?: MascotMood;
  pose?: MascotPose;
  narration?: string;
  speaking?: boolean;
  bandages?: number;
  swollen?: boolean;
}> = ({
  x,
  y,
  scale = 1,
  flip = false,
  mood = 'normal',
  pose = 'idle',
  narration = '',
  speaking = true,
  bandages = 0,
  swollen = false,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const breath = Math.sin(frame * 0.14) * 3;
  const shakeX = mood === 'dizzy' || mood === 'wide' ? Math.sin(frame * 0.85) * 3.5 : 0;
  const progress = frame / Math.max(1, durationInFrames);
  const mouth: Viseme =
    speaking && narration ? visemeForNarration(narration, progress, speaking) : 'rest';
  const dir = flip ? -1 : 1;
  const eyeCircleOpacity = Math.min(0.85, 0.25 + bandages * 0.16);

  return (
    <g transform={`translate(${x + shakeX}, ${y + breath}) scale(${scale * dir}, ${scale})`}>
      {/* Ground shadow */}
      <ellipse cx={0} cy={222} rx={92} ry={20} fill="rgba(0,0,0,0.42)" />

      {/* Fluffy cat-owl tail with night stripes */}
      <path
        d="M-46,155 Q-118,132 -128,62 Q-130,36 -108,34 Q-90,34 -90,62 Q-86,112 -42,135 Z"
        fill="#A5B4FC"
        stroke="#0F172A"
        strokeWidth={6}
      />

      {/* Pajama pants & bunny/bear slippers */}
      <rect
        x={-44}
        y={145}
        width={34}
        height={64}
        rx={12}
        fill="#4338CA"
        stroke="#0F172A"
        strokeWidth={5}
      />
      <rect
        x={10}
        y={145}
        width={34}
        height={64}
        rx={12}
        fill="#4338CA"
        stroke="#0F172A"
        strokeWidth={5}
      />
      <ellipse cx={-28} cy={210} rx={26} ry={14} fill="#FDE047" stroke="#0F172A" strokeWidth={5} />
      <ellipse cx={28} cy={210} rx={26} ry={14} fill="#FDE047" stroke="#0F172A" strokeWidth={5} />

      {/* Striped Pajama Shirt */}
      <rect
        x={-64}
        y={24}
        width={128}
        height={134}
        rx={42}
        fill="#4F46E5"
        stroke="#0F172A"
        strokeWidth={6}
      />
      {/* Vertical pajama stripes */}
      {[-38, -12, 14, 38].map((sx) => (
        <line
          key={sx}
          x1={sx}
          y1={32}
          x2={sx}
          y2={152}
          stroke="#818CF8"
          strokeWidth={4}
          opacity={0.55}
        />
      ))}
      {/* Pajama collar & buttons */}
      <polygon
        points="-28,28 0,58 28,28 16,20 -16,20"
        fill="#E0E7FF"
        stroke="#0F172A"
        strokeWidth={4}
      />
      <circle cx={0} cy={76} r={5} fill="#FDE047" stroke="#0F172A" strokeWidth={2.5} />
      <circle cx={0} cy={104} r={5} fill="#FDE047" stroke="#0F172A" strokeWidth={2.5} />
      <circle cx={0} cy={132} r={5} fill="#FDE047" stroke="#0F172A" strokeWidth={2.5} />
      {/* Chest pocket with tiny sleep mask / pen */}
      <rect
        x={18}
        y={68}
        width={28}
        height={30}
        rx={6}
        fill="#3730A3"
        stroke="#0F172A"
        strokeWidth={3}
      />

      {/* Arms by pose */}
      {pose === 'panic' ? (
        <>
          <path
            d="M-60,55 Q-108,8 -82,-42"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={24}
            strokeLinecap="round"
          />
          <circle cx={-82} cy={-44} r={14} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
          <path
            d="M60,55 Q108,8 82,-42"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={24}
            strokeLinecap="round"
          />
          <circle cx={82} cy={-44} r={14} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
        </>
      ) : pose === 'point' ? (
        <>
          <path
            d="M-60,58 Q-86,98 -68,128"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={-68} cy={130} r={13} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
          <path
            d="M60,52 L118,22"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={120} cy={20} r={14} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
        </>
      ) : pose === 'thumbsUp' ? (
        <>
          <path
            d="M-60,58 Q-86,98 -68,128"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={-68} cy={130} r={13} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
          <path
            d="M60,52 Q98,18 96,-14"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={96} cy={-18} r={14} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
        </>
      ) : (
        <>
          <path
            d="M-60,58 Q-84,96 -66,132"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={-66} cy={134} r={13} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
          <path
            d="M60,58 Q84,96 66,132"
            fill="none"
            stroke="#4F46E5"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <circle cx={66} cy={134} r={13} fill="#E0E7FF" stroke="#0F172A" strokeWidth={4} />
        </>
      )}

      {/* Head: Midnight Owl-Cat Boy */}
      <ellipse
        cx={0}
        cy={-44}
        rx={swollen ? 98 : 88}
        ry={swollen ? 84 : 78}
        fill={swollen ? '#DDD6FE' : '#EEF2FF'}
        stroke="#0F172A"
        strokeWidth={6}
      />

      {/* Pointed owl-cat ears */}
      <polygon points="-76,-88 -92,-142 -36,-112" fill="#818CF8" stroke="#0F172A" strokeWidth={5} />
      <polygon points="76,-88 92,-142 36,-112" fill="#818CF8" stroke="#0F172A" strokeWidth={5} />

      {/* Nightcap tilted on head */}
      <path
        d="M-54,-104 Q-10,-168 62,-132 Q42,-92 -54,-104 Z"
        fill="#F59E0B"
        stroke="#0F172A"
        strokeWidth={5}
      />
      <rect
        x={-58}
        y={-114}
        width={116}
        height={18}
        rx={9}
        fill="#FDE047"
        stroke="#0F172A"
        strokeWidth={4}
      />
      <circle cx={66} cy={-130} r={14} fill="#FFFFFF" stroke="#0F172A" strokeWidth={4} />

      {/* Dark eye-bags under eyes (deepens with sleep deprivation) */}
      <ellipse cx={-34} cy={-38} rx={24} ry={13} fill="#4C1D95" opacity={eyeCircleOpacity} />
      <ellipse cx={34} cy={-38} rx={24} ry={13} fill="#4C1D95" opacity={eyeCircleOpacity} />

      {/* Eyes */}
      {mood === 'dizzy' ? (
        <>
          <circle cx={-34} cy={-50} r={18} fill="#FFFFFF" stroke="#0F172A" strokeWidth={4} />
          <circle cx={34} cy={-50} r={18} fill="#FFFFFF" stroke="#0F172A" strokeWidth={4} />
          <text x={-45} y={-42} fontSize={26} fontWeight={900} fill="#0F172A">
            @
          </text>
          <text x={23} y={-42} fontSize={26} fontWeight={900} fill="#0F172A">
            @
          </text>
        </>
      ) : mood === 'happy' ? (
        <>
          <path
            d="M-48,-48 Q-34,-66 -20,-48"
            fill="none"
            stroke="#0F172A"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path
            d="M20,-48 Q34,-66 48,-48"
            fill="none"
            stroke="#0F172A"
            strokeWidth={6}
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle
            cx={-34}
            cy={-50}
            r={mood === 'wide' ? 21 : 17}
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth={4}
          />
          <circle
            cx={34}
            cy={-50}
            r={mood === 'wide' ? 21 : 17}
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth={4}
          />
          <circle cx={-32} cy={-50} r={mood === 'wide' ? 8 : 9} fill="#0F172A" />
          <circle cx={32} cy={-50} r={mood === 'wide' ? 8 : 9} fill="#0F172A" />
          <circle cx={-35} cy={-54} r={3} fill="#FFFFFF" />
          <circle cx={29} cy={-54} r={3} fill="#FFFFFF" />
          {mood === 'determined' && (
            <>
              <line
                x1={-52}
                y1={-72}
                x2={-18}
                y2={-62}
                stroke="#0F172A"
                strokeWidth={6}
                strokeLinecap="round"
              />
              <line
                x1={52}
                y1={-72}
                x2={18}
                y2={-62}
                stroke="#0F172A"
                strokeWidth={6}
                strokeLinecap="round"
              />
            </>
          )}
        </>
      )}

      {/* Little beak/nose + cheeks */}
      <ellipse cx={-56} cy={-26} rx={12} ry={7} fill="#FB7185" opacity={0.45} />
      <ellipse cx={56} cy={-26} rx={12} ry={7} fill="#FB7185" opacity={0.45} />
      <polygon points="-9,-34 9,-34 0,-21" fill="#F59E0B" stroke="#0F172A" strokeWidth={3} />

      {/* Lip-synced mouth */}
      <g transform="translate(0, -44)">
        <MouthSVG shape={mouth} />
      </g>

      {/* Bandages / fatigue patches when bandages > 0 */}
      {bandages > 0 && (
        <g transform="translate(48, -82) rotate(18)">
          <rect
            x={-16}
            y={-8}
            width={32}
            height={16}
            rx={5}
            fill="#FEF3C7"
            stroke="#0F172A"
            strokeWidth={2.5}
          />
          <line x1={-4} y1={0} x2={4} y2={0} stroke="#EF4444" strokeWidth={3} />
          <line x1={0} y1={-4} x2={0} y2={4} stroke="#EF4444" strokeWidth={3} />
        </g>
      )}
    </g>
  );
};
