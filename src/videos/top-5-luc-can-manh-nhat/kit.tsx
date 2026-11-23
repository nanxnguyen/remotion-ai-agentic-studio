import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONTSERRAT_FONT, ensureMontserratLoaded} from './font';
import {visemeForNarration, type Viseme} from './lip-sync';

export type StageTheme = 'studio' | 'savanna' | 'amazon' | 'river' | 'swamp' | 'ocean';
export type MascotMood = 'normal' | 'wide' | 'dizzy' | 'determined' | 'happy';
export type MascotPose =
  | 'idle'
  | 'point'
  | 'panic'
  | 'holdBone'
  | 'holdMeter'
  | 'paddle'
  | 'thumbsUp'
  | 'trapped';
export type CreatureKind = 'hyena' | 'jaguar' | 'hippo' | 'croc' | 'shark';

const THEME_PALETTES: Record<
  StageTheme,
  {
    skyTop: string;
    skyBot: string;
    horizon: string;
    ground: string;
    accent: string;
    glow: string;
    fog: string;
  }
> = {
  studio: {
    skyTop: '#070D19',
    skyBot: '#111C33',
    horizon: '#1E293B',
    ground: '#090E1A',
    accent: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.28)',
    fog: 'rgba(148, 163, 184, 0.08)',
  },
  savanna: {
    skyTop: '#160B29',
    skyBot: '#581C45',
    horizon: '#D96B38',
    ground: '#23120B',
    accent: '#F59E0B',
    glow: 'rgba(251, 146, 60, 0.32)',
    fog: 'rgba(253, 186, 116, 0.12)',
  },
  amazon: {
    skyTop: '#031711',
    skyBot: '#0B3628',
    horizon: '#185A40',
    ground: '#05140E',
    accent: '#34D399',
    glow: 'rgba(52, 211, 153, 0.26)',
    fog: 'rgba(110, 231, 183, 0.1)',
  },
  river: {
    skyTop: '#0E1A2F',
    skyBot: '#1E3A5F',
    horizon: '#3B6E8C',
    ground: '#091B2E',
    accent: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.28)',
    fog: 'rgba(186, 230, 253, 0.12)',
  },
  swamp: {
    skyTop: '#071710',
    skyBot: '#153326',
    horizon: '#2D523D',
    ground: '#06110C',
    accent: '#A3E635',
    glow: 'rgba(163, 230, 53, 0.24)',
    fog: 'rgba(190, 242, 100, 0.09)',
  },
  ocean: {
    skyTop: '#010817',
    skyBot: '#051E42',
    horizon: '#0A3668',
    ground: '#020E21',
    accent: '#22D3EE',
    glow: 'rgba(34, 211, 238, 0.32)',
    fog: 'rgba(56, 189, 248, 0.12)',
  },
};

export const MascotStage: React.FC<{
  theme: StageTheme;
  shake?: number;
  impactFrame?: number;
  zoom?: number;
  children: React.ReactNode;
}> = ({theme, shake = 0, impactFrame, zoom = 1.05, children}) => {
  ensureMontserratLoaded();
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const pal = THEME_PALETTES[theme];

  const shakeX = shake > 0 ? Math.sin(frame * 2.9) * shake * 14 : 0;
  const shakeY = shake > 0 ? Math.cos(frame * 3.5) * shake * 10 : 0;
  const parallaxFar = Math.sin(frame * 0.012) * 14;
  const parallaxMid = Math.sin(frame * 0.018) * 28;
  const rayPulse = 0.75 + Math.sin(frame * 0.04) * 0.2;

  const pushZoom = interpolate(frame, [0, Math.max(1, durationInFrames)], [1.0, zoom], {
    extrapolateRight: 'clamp',
  });
  const impactOpacity =
    impactFrame !== undefined && frame >= impactFrame && frame < impactFrame + 8
      ? interpolate(frame, [impactFrame, impactFrame + 8], [0.45, 0], {extrapolateRight: 'clamp'})
      : 0;
  const entryOpacity = interpolate(frame, [0, 6], [0.75, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${pal.skyTop} 0%, ${pal.skyBot} 56%, ${pal.horizon} 74%, ${pal.ground} 100%)`,
        fontFamily: MONTSERRAT_FONT,
      }}
    >
      {/* Volumetric Key Light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 66% 40%, ${pal.glow}, transparent 58%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Far Parallax Layer */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0, transform: `translateX(${parallaxFar}px)`}}
      >
        <defs>
          <linearGradient id={`ray-${theme}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pal.accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={pal.accent} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="savanna-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Volumetric God-Rays */}
        <g opacity={rayPulse}>
          <polygon points="240,0 520,0 780,1080 120,1080" fill={`url(#ray-${theme})`} />
          <polygon points="940,0 1280,0 1620,1080 840,1080" fill={`url(#ray-${theme})`} />
        </g>

        {theme === 'savanna' && (
          <>
            <circle cx={1480} cy={250} r={190} fill="url(#savanna-sun)" opacity={0.9} />
            <path
              d="M0 780 Q320 680 740 745 T1480 710 T1920 755 L1920 1080 L0 1080 Z"
              fill="#1F0E0A"
              opacity={0.7}
            />
          </>
        )}
        {theme === 'amazon' && (
          <>
            <path
              d="M0 740 Q480 680 960 735 T1920 710 L1920 1080 L0 1080 Z"
              fill="#041811"
              opacity={0.75}
            />
            <ellipse cx={260} cy={140} rx={360} ry={160} fill="#052116" opacity={0.75} />
            <ellipse cx={1660} cy={120} rx={380} ry={170} fill="#052116" opacity={0.75} />
          </>
        )}
        {(theme === 'river' || theme === 'swamp') && (
          <>
            <path
              d="M0 710 Q420 675 940 715 T1920 695 L1920 1080 L0 1080 Z"
              fill="#061422"
              opacity={0.65}
            />
            <ellipse cx={960} cy={740} rx={780} ry={18} fill={pal.fog} />
          </>
        )}
        {theme === 'ocean' && (
          <>
            <path
              d="M0 860 Q320 760 660 850 T1380 800 T1920 840 L1920 1080 L0 1080 Z"
              fill="#010A1A"
              opacity={0.85}
            />
          </>
        )}
        {theme === 'studio' && (
          <>
            <rect
              x={90}
              y={110}
              width={1740}
              height={660}
              rx={42}
              fill="rgba(15,23,42,0.58)"
              stroke="rgba(56,189,248,0.2)"
              strokeWidth={3}
            />
            {[260, 440, 620].map((yPos) => (
              <line
                key={yPos}
                x1={90}
                y1={yPos}
                x2={1830}
                y2={yPos}
                stroke="rgba(56,189,248,0.08)"
                strokeWidth={2}
              />
            ))}
          </>
        )}
      </svg>

      {/* Mid Parallax Foliage / Ripples */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0, transform: `translateX(${parallaxMid}px)`}}
      >
        {theme === 'savanna' && (
          <>
            <path
              d="M210 800 L210 560 M210 615 L125 540 M210 595 L300 530"
              stroke="#140905"
              strokeWidth={20}
              strokeLinecap="round"
            />
            <ellipse cx={210} cy={520} rx={210} ry={48} fill="#140905" />
            <path d="M1740 810 L1740 610" stroke="#140905" strokeWidth={16} strokeLinecap="round" />
            <ellipse cx={1740} cy={590} rx={150} ry={36} fill="#140905" />
          </>
        )}
        {theme === 'amazon' && (
          <>
            <path d="M0 0 L240 0 L180 1080 L0 1080 Z" fill="#03120C" opacity={0.88} />
            <path d="M1700 0 L1920 0 L1920 1080 L1750 1080 Z" fill="#03120C" opacity={0.88} />
            <path d="M320 0 Q390 280 285 560" stroke="#0C3B2A" strokeWidth={14} fill="none" />
            <path d="M1610 0 Q1520 300 1630 590" stroke="#0C3B2A" strokeWidth={12} fill="none" />
          </>
        )}
        {(theme === 'river' || theme === 'swamp') && (
          <>
            {[0, 1, 2, 3].map((i) => {
              const offset = ((frame * 1.4 + i * 480) % 2100) - 180;
              return (
                <ellipse
                  key={i}
                  cx={offset}
                  cy={775 + (i % 2) * 32}
                  rx={160}
                  ry={7}
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth={3}
                />
              );
            })}
          </>
        )}
      </svg>

      {/* Atmospheric Dust / Caustic Bubbles */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        {Array.from({length: 24}).map((_, i) => {
          const x = ((i * 119 + frame * (0.35 + (i % 4) * 0.2)) % 1960) - 20;
          const y = (((i * 193 - frame * (theme === 'ocean' ? 1.35 : 0.4)) % 1080) + 1080) % 1080;
          const r = 2.5 + (i % 4) * 2.2;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={theme === 'ocean' ? '#E0F2FE' : pal.accent}
              opacity={0.14 + (i % 4) * 0.08}
            />
          );
        })}
      </svg>

      {/* 2.5D Ground Plane with Horizon Rim */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 295,
          background: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.62) 100%)`,
          borderTop: `2px solid rgba(255,255,255,0.14)`,
          pointerEvents: 'none',
        }}
      />

      {/* Scene Content with Kinetic Camera Zoom & Shake */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: entryOpacity,
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${pushZoom})`,
          transformOrigin: '52% 48%',
        }}
      >
        {children}
      </div>

      {/* Impact Flash Overlay */}
      {impactOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#FFFFFF',
            opacity: impactOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Subtle Cinema Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 210px rgba(0,0,0,0.72)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const MouthSvg: React.FC<{viseme: Viseme; mood: MascotMood}> = ({viseme, mood}) => {
  if (mood === 'dizzy') {
    return (
      <path
        d="M -20 4 Q -10 -5 0 4 T 20 4"
        stroke="#3B2314"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  switch (viseme) {
    case 'A':
      return (
        <g>
          <ellipse
            cx={0}
            cy={4}
            rx={19}
            ry={17}
            fill="#7F1D1D"
            stroke="#3B2314"
            strokeWidth={3.5}
          />
          <ellipse cx={0} cy={14} rx={11} ry={6} fill="#FB7185" />
          <rect x={-10} y={-10} width={20} height={5} rx={2} fill="#FFFFFF" />
        </g>
      );
    case 'O':
      return (
        <ellipse cx={0} cy={4} rx={13} ry={15} fill="#7F1D1D" stroke="#3B2314" strokeWidth={3.5} />
      );
    case 'U':
      return <circle cx={0} cy={4} r={9} fill="#7F1D1D" stroke="#3B2314" strokeWidth={3.5} />;
    case 'E':
      return (
        <g>
          <rect
            x={-20}
            y={-4}
            width={40}
            height={15}
            rx={7}
            fill="#7F1D1D"
            stroke="#3B2314"
            strokeWidth={3.5}
          />
          <rect x={-15} y={-2} width={30} height={5} rx={2} fill="#FFFFFF" />
        </g>
      );
    case 'M':
      return (
        <line
          x1={-17}
          y1={3}
          x2={17}
          y2={3}
          stroke="#3B2314"
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    case 'F':
      return (
        <g>
          <path
            d="M -16 1 Q 0 11 16 1"
            stroke="#3B2314"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
          <rect x={-10} y={1} width={20} height={5} rx={2} fill="#FFFFFF" />
        </g>
      );
    default:
      return mood === 'happy' ? (
        <path
          d="M -17 0 Q 0 16 17 0"
          stroke="#3B2314"
          strokeWidth={4.5}
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M -13 3 Q 0 9 13 3"
          stroke="#3B2314"
          strokeWidth={4.5}
          fill="none"
          strokeLinecap="round"
        />
      );
  }
};

export const CunBongMascot: React.FC<{
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
  turtleShell?: boolean;
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
  turtleShell = false,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const progress = durationInFrames > 0 ? Math.min(0.999, frame / durationInFrames) : 0;
  const viseme = visemeForNarration(narration, progress, speaking);

  const breatheY = Math.sin(frame * 0.14) * 5;
  const earWave = Math.sin(frame * 0.18) * (pose === 'panic' ? 16 : 6);
  const tailWag = Math.sin(frame * 0.34) * 20;
  const headScaleX = swollen ? 1.34 : 1;
  const headScaleY = swollen ? 1.25 : 1;
  const blink = frame % 110 >= 106;

  return (
    <g transform={`translate(${x}, ${y + breatheY}) scale(${flip ? -scale : scale}, ${scale})`}>
      <defs>
        <radialGradient id="fur-grad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF7E8" />
          <stop offset="60%" stopColor="#F5E6C8" />
          <stop offset="100%" stopColor="#D6B484" />
        </radialGradient>
        <linearGradient id="hoodie-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2B4F81" />
          <stop offset="55%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#10223B" />
        </linearGradient>
        <linearGradient id="scarf-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#F58B4C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>

      {/* Ground Contact Shadow */}
      <ellipse cx={0} cy={198} rx={102} ry={24} fill="rgba(0,0,0,0.48)" />

      {/* Fluffy Tail */}
      <path
        d={`M -68 110 Q ${-128 + tailWag * 0.6} 68 ${-118 + tailWag} 26`}
        stroke="#F5E6C8"
        strokeWidth={24}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M -68 110 Q ${-128 + tailWag * 0.6} 68 ${-118 + tailWag} 26`}
        stroke="#FFF7E8"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* Turtle Shell Armor (Round 2) */}
      {turtleShell && (
        <g transform="translate(-8, 55)">
          <ellipse cx={0} cy={0} rx={90} ry={98} fill="#3F6212" stroke="#1A2E05" strokeWidth={6} />
          <path
            d="M -52 -42 L 0 -62 L 52 -42 L 42 36 L -42 36 Z"
            fill="#65A30D"
            stroke="#1A2E05"
            strokeWidth={4}
          />
          <ellipse cx={-20} cy={-35} rx={24} ry={10} fill="#A3E635" opacity={0.3} />
        </g>
      )}

      {/* Legs & Sneakers */}
      <rect
        x={-48}
        y={132}
        width={34}
        height={58}
        rx={16}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth={4}
      />
      <rect
        x={14}
        y={132}
        width={34}
        height={58}
        rx={16}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth={4}
      />
      <ellipse cx={-31} cy={188} rx={24} ry={13} fill="#F8FAFC" stroke="#0F172A" strokeWidth={4} />
      <ellipse cx={31} cy={188} rx={24} ry={13} fill="#F8FAFC" stroke="#0F172A" strokeWidth={4} />

      {/* Shaded Navy Hoodie Torso */}
      <path
        d="M -68 15 C -78 82 -76 142 -52 148 L 52 148 C 76 142 78 82 68 15 Z"
        fill="url(#hoodie-grad)"
        stroke="#0F172A"
        strokeWidth={5}
      />
      {/* Hoodie Pocket & Drawstrings */}
      <path
        d="M -40 92 L 40 92 L 48 134 L -48 134 Z"
        fill="#152A47"
        stroke="#0F172A"
        strokeWidth={3}
      />
      <line
        x1={-16}
        y1={34}
        x2={-18}
        y2={76}
        stroke="#E2E8F0"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line
        x1={16}
        y1={34}
        x2={18}
        y2={76}
        stroke="#E2E8F0"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Orange Scarf */}
      <path
        d="M -62 8 Q 0 36 62 8 L 56 36 Q 0 58 -56 36 Z"
        fill="url(#scarf-grad)"
        stroke="#0F172A"
        strokeWidth={4}
      />
      <path d="M 22 24 L 46 84 L 16 88 L 6 28 Z" fill="#EA580C" stroke="#0F172A" strokeWidth={4} />

      {/* Left Arm */}
      <g
        transform={
          pose === 'panic'
            ? `translate(-70, 26) rotate(${-130 + Math.sin(frame * 0.5) * 18})`
            : pose === 'paddle'
              ? `translate(-64, 48) rotate(${-25 + Math.sin(frame * 0.4) * 28})`
              : 'translate(-68, 36) rotate(18)'
        }
      >
        <rect
          x={-14}
          y={0}
          width={28}
          height={74}
          rx={14}
          fill="url(#hoodie-grad)"
          stroke="#0F172A"
          strokeWidth={4}
        />
        <circle cx={0} cy={78} r={16} fill="url(#fur-grad)" stroke="#0F172A" strokeWidth={4} />
        {bandages >= 2 && (
          <rect
            x={-16}
            y={32}
            width={32}
            height={18}
            rx={4}
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth={2}
          />
        )}
      </g>

      {/* Right Arm + Props */}
      <g
        transform={
          pose === 'point'
            ? 'translate(68, 30) rotate(-75)'
            : pose === 'panic'
              ? `translate(70, 26) rotate(${130 - Math.sin(frame * 0.5) * 18})`
              : pose === 'thumbsUp'
                ? 'translate(68, 36) rotate(-110)'
                : 'translate(68, 36) rotate(-22)'
        }
      >
        <rect
          x={-14}
          y={0}
          width={28}
          height={74}
          rx={14}
          fill="url(#hoodie-grad)"
          stroke="#0F172A"
          strokeWidth={4}
        />
        <circle cx={0} cy={78} r={16} fill="url(#fur-grad)" stroke="#0F172A" strokeWidth={4} />

        {pose === 'holdBone' && (
          <g transform="translate(8, 80) rotate(50)">
            <rect
              x={-12}
              y={-50}
              width={24}
              height={70}
              rx={8}
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth={4}
            />
            <circle cx={-12} cy={-50} r={12} fill="#F8FAFC" stroke="#94A3B8" strokeWidth={3} />
            <circle cx={12} cy={-50} r={12} fill="#F8FAFC" stroke="#94A3B8" strokeWidth={3} />
          </g>
        )}
        {pose === 'holdMeter' && (
          <g transform="translate(10, 74) rotate(25)">
            <rect
              x={-26}
              y={-44}
              width={52}
              height={68}
              rx={10}
              fill="#334155"
              stroke="#0F172A"
              strokeWidth={4}
            />
            <rect x={-18} y={-34} width={36} height={26} rx={4} fill="#22D3EE" />
            <text x={0} y={-16} textAnchor="middle" fontSize={13} fontWeight={900} fill="#0F172A">
              PSI
            </text>
          </g>
        )}
        {pose === 'paddle' && (
          <g transform="translate(10, 78) rotate(35)">
            <rect
              x={-5}
              y={-70}
              width={10}
              height={110}
              rx={4}
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth={3}
            />
            <ellipse
              cx={0}
              cy={-78}
              rx={18}
              ry={28}
              fill="#E2E8F0"
              stroke="#475569"
              strokeWidth={3}
            />
          </g>
        )}
      </g>

      {/* Head */}
      <g transform={`translate(0, -68) scale(${headScaleX}, ${headScaleY})`}>
        {/* Ears */}
        <g transform={`translate(-64, -38) rotate(${-22 + earWave})`}>
          <ellipse cx={0} cy={22} rx={23} ry={45} fill="#C68B59" stroke="#3B2314" strokeWidth={5} />
          <ellipse cx={0} cy={24} rx={12} ry={28} fill="#E6B89C" opacity={0.55} />
        </g>
        <g transform={`translate(64, -38) rotate(${22 - earWave})`}>
          <ellipse cx={0} cy={22} rx={23} ry={45} fill="#C68B59" stroke="#3B2314" strokeWidth={5} />
          <ellipse cx={0} cy={24} rx={12} ry={28} fill="#E6B89C" opacity={0.55} />
        </g>

        {/* Main Head with Fur Gradient & Tuft */}
        <ellipse
          cx={0}
          cy={0}
          rx={80}
          ry={70}
          fill="url(#fur-grad)"
          stroke="#3B2314"
          strokeWidth={5}
        />
        <path
          d="M -12 -68 Q 0 -86 14 -68"
          fill="#F5E6C8"
          stroke="#3B2314"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Muzzle */}
        <ellipse cx={0} cy={22} rx={44} ry={31} fill="#FFF9F0" />
        {/* Glossy Nose */}
        <ellipse cx={0} cy={8} rx={16} ry={11} fill="#0F172A" />
        <ellipse cx={-5} cy={5} rx={6} ry={3} fill="#94A3B8" opacity={0.85} />

        {/* Rosy Cheeks */}
        <ellipse cx={-48} cy={20} rx={14} ry={8} fill="#FB7185" opacity={0.55} />
        <ellipse cx={48} cy={20} rx={14} ry={8} fill="#FB7185" opacity={0.55} />

        {/* Expressive Eyes */}
        {blink ? (
          <>
            <line
              x1={-40}
              y1={-14}
              x2={-16}
              y2={-14}
              stroke="#1E293B"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <line
              x1={16}
              y1={-14}
              x2={40}
              y2={-14}
              stroke="#1E293B"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </>
        ) : mood === 'dizzy' ? (
          <>
            <text x={-28} y={-6} textAnchor="middle" fontSize={30} fontWeight={900} fill="#1E293B">
              @
            </text>
            <text x={28} y={-6} textAnchor="middle" fontSize={30} fontWeight={900} fill="#1E293B">
              @
            </text>
          </>
        ) : (
          <>
            <ellipse
              cx={-28}
              cy={-16}
              rx={mood === 'wide' ? 18 : 14}
              ry={mood === 'wide' ? 20 : 16}
              fill="#FFFFFF"
              stroke="#1E293B"
              strokeWidth={3.5}
            />
            <circle cx={-26} cy={-15} r={mood === 'wide' ? 6.5 : 8.5} fill="#0F172A" />
            <circle cx={-29} cy={-19} r={3.5} fill="#FFFFFF" />
            <circle cx={-22} cy={-12} r={1.8} fill="#FFFFFF" />

            <ellipse
              cx={28}
              cy={-16}
              rx={mood === 'wide' ? 18 : 14}
              ry={mood === 'wide' ? 20 : 16}
              fill="#FFFFFF"
              stroke="#1E293B"
              strokeWidth={3.5}
            />
            <circle cx={26} cy={-15} r={mood === 'wide' ? 6.5 : 8.5} fill="#0F172A" />
            <circle cx={23} cy={-19} r={3.5} fill="#FFFFFF" />
            <circle cx={30} cy={-12} r={1.8} fill="#FFFFFF" />
          </>
        )}

        {/* Sweat Drop on Panic / Wide */}
        {(mood === 'wide' || pose === 'panic') && (
          <path
            d={`M 66 ${-32 + Math.sin(frame * 0.25) * 4} Q 76 -16 66 -8 Q 56 -16 66 ${-32 + Math.sin(frame * 0.25) * 4} Z`}
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth={2}
          />
        )}

        {/* Dizzy Orbiting Stars */}
        {mood === 'dizzy' && (
          <g transform={`translate(0, -86)`}>
            {[-45, 0, 45].map((sx, idx) => (
              <text
                key={idx}
                x={sx + Math.sin(frame * 0.2 + idx * 2) * 14}
                y={Math.cos(frame * 0.2 + idx * 2) * 8}
                textAnchor="middle"
                fontSize={24}
                fill="#FACC15"
              >
                ★
              </text>
            ))}
          </g>
        )}

        {/* Eyebrows */}
        <path
          d={mood === 'determined' ? 'M -42 -36 L -14 -28' : 'M -42 -36 Q -28 -44 -14 -36'}
          stroke="#3B2314"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={mood === 'determined' ? 'M 42 -36 L 14 -28' : 'M 14 -36 Q 28 -44 42 -36'}
          stroke="#3B2314"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />

        {/* Lip-Synced Mouth */}
        <g transform="translate(0, 32)">
          <MouthSvg viseme={viseme} mood={mood} />
        </g>

        {/* Bandages */}
        {bandages >= 1 && (
          <g transform="translate(42, -40) rotate(22)">
            <rect
              x={-22}
              y={-10}
              width={44}
              height={20}
              rx={5}
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth={2.5}
            />
            <line x1={-6} y1={0} x2={6} y2={0} stroke="#EF4444" strokeWidth={4} />
            <line x1={0} y1={-6} x2={0} y2={6} stroke="#EF4444" strokeWidth={4} />
          </g>
        )}
        {bandages >= 3 && (
          <g transform="translate(-45, 18) rotate(-18)">
            <rect
              x={-18}
              y={-9}
              width={36}
              height={18}
              rx={4}
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth={2.5}
            />
          </g>
        )}
        {bandages >= 4 && (
          <g transform="translate(0, -68)">
            <rect
              x={-56}
              y={-8}
              width={112}
              height={22}
              rx={10}
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth={3}
            />
          </g>
        )}
      </g>
    </g>
  );
};

export const CreatureArt: React.FC<{
  kind: CreatureKind;
  x: number;
  y: number;
  scale?: number;
  jawOpen?: number;
  ctScan?: boolean;
}> = ({kind, x, y, scale = 1, jawOpen = 0.5, ctScan = false}) => {
  const frame = useCurrentFrame();
  const hoverY = Math.sin(frame * 0.1) * 8;
  const openDeg = jawOpen * 38;

  return (
    <g transform={`translate(${x}, ${y + hoverY}) scale(${scale})`}>
      <defs>
        <linearGradient id="shark-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="croc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="55%" stopColor="#3F6212" />
          <stop offset="100%" stopColor="#1A2E05" />
        </linearGradient>
        <linearGradient id="hippo-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.3} />
          <stop offset="0%" stopColor="#9D88B3" />
          <stop offset="100%" stopColor="#584769" />
        </linearGradient>
        <linearGradient id="jaguar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="hyena-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6AD7E" />
          <stop offset="60%" stopColor="#A87E51" />
          <stop offset="100%" stopColor="#694827" />
        </linearGradient>
      </defs>

      <ellipse cx={0} cy={220} rx={200} ry={30} fill="rgba(0,0,0,0.48)" />

      {kind === 'hyena' && (
        <g>
          {/* Tail & Back Legs */}
          <path
            d="M 195 75 Q 255 95 245 145"
            stroke="#4A2E1B"
            strokeWidth={18}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 130 130 L 145 215 L 122 215 L 105 140 Z"
            fill="#7C5430"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <path
            d="M -55 125 L -65 215 L -88 215 L -80 130 Z"
            fill="#7C5430"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          {/* Bristled Mane & Neck */}
          <path
            d="M -95 -20 L -65 -58 L -30 -44 L 15 -58 L 55 -35 L 130 -18 L 110 30 L -95 40 Z"
            fill="#3B2314"
            stroke="#2D1B0E"
            strokeWidth={4}
          />
          {/* Sloping Muscular Torso */}
          <path
            d="M -95 25 Q 30 -35 190 28 Q 225 85 185 140 Q 45 165 -90 130 Z"
            fill="url(#hyena-grad)"
            stroke="#2D1B0E"
            strokeWidth={6}
          />
          {/* Front Legs */}
          <path
            d="M -35 115 L -42 218 L -15 218 L -8 120 Z"
            fill="url(#hyena-grad)"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <path
            d="M 155 120 L 165 218 L 190 218 L 182 115 Z"
            fill="url(#hyena-grad)"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          {/* Spots */}
          <circle cx={-10} cy={55} r={14} fill="#3B2314" opacity={0.78} />
          <circle cx={55} cy={92} r={18} fill="#3B2314" opacity={0.78} />
          <circle cx={115} cy={50} r={13} fill="#3B2314" opacity={0.78} />
          <circle cx={155} cy={88} r={11} fill="#3B2314" opacity={0.78} />
          {/* Rounded Ears */}
          <ellipse
            cx={-75}
            cy={-85}
            rx={24}
            ry={34}
            fill="#8C6239"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <ellipse cx={-75} cy={-82} rx={12} ry={20} fill="#E6B89C" opacity={0.5} />
          {/* Upper Head */}
          <g transform={`translate(-105, -20) rotate(${openDeg * 0.45})`}>
            <path
              d="M -112 10 Q -80 -65 35 -55 Q 70 -10 55 25 L -95 25 Z"
              fill="url(#hyena-grad)"
              stroke="#2D1B0E"
              strokeWidth={6}
            />
            <ellipse cx={-104} cy={12} rx={12} ry={9} fill="#1E293B" />
            <polygon
              points="-80,25 -65,54 -50,25"
              fill="#FFFFFF"
              stroke="#2D1B0E"
              strokeWidth={3}
            />
            <polygon points="-35,25 -20,48 -5,25" fill="#FFFFFF" stroke="#2D1B0E" strokeWidth={3} />
            <circle cx={-35} cy={-18} r={12} fill="#FDE047" stroke="#2D1B0E" strokeWidth={3} />
            <circle cx={-38} cy={-18} r={5} fill="#0F172A" />
          </g>
          <g transform={`translate(-105, 10) rotate(${-openDeg})`}>
            <path
              d="M -95 0 L 40 0 L 25 36 L -85 28 Z"
              fill="#8C6239"
              stroke="#2D1B0E"
              strokeWidth={6}
            />
            <polygon points="-75,0 -62,-26 -48,0" fill="#FFFFFF" stroke="#2D1B0E" strokeWidth={3} />
          </g>
        </g>
      )}

      {kind === 'jaguar' && (
        <g>
          {/* Long Spotted Tail */}
          <path
            d="M 205 70 Q 290 25 275 -45"
            stroke="#D97706"
            strokeWidth={18}
            strokeLinecap="round"
            fill="none"
          />
          {/* Back Legs */}
          <path
            d="M 140 120 L 158 215 L 132 215 L 114 130 Z"
            fill="#B45309"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <path
            d="M -60 120 L -70 215 L -95 215 L -86 125 Z"
            fill="#B45309"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          {/* Athletic Feline Body */}
          <path
            d="M -100 20 Q 45 -32 200 22 Q 235 80 190 135 Q 45 158 -95 128 Z"
            fill="url(#jaguar-grad)"
            stroke="#2D1B0E"
            strokeWidth={6}
          />
          {/* Front Legs */}
          <path
            d="M -38 110 L -44 218 L -16 218 L -10 116 Z"
            fill="url(#jaguar-grad)"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <path
            d="M 162 115 L 174 218 L 200 218 L 190 112 Z"
            fill="url(#jaguar-grad)"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          {[-15, 50, 115, 165].map((cx, idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={55 + (idx % 2) * 36}
              r={20}
              fill="none"
              stroke="#451A03"
              strokeWidth={7}
              strokeDasharray="14 8"
            />
          ))}
          <ellipse
            cx={-72}
            cy={-78}
            rx={20}
            ry={22}
            fill="#F59E0B"
            stroke="#2D1B0E"
            strokeWidth={5}
          />
          <g transform={`translate(-110, -25) rotate(${openDeg * 0.4})`}>
            <path
              d="M -115 15 Q -85 -70 40 -55 Q 65 0 45 30 L -100 30 Z"
              fill="url(#jaguar-grad)"
              stroke="#2D1B0E"
              strokeWidth={6}
            />
            <ellipse cx={-105} cy={12} rx={11} ry={8} fill="#1E293B" />
            <polygon
              points="-85,30 -70,70 -55,30"
              fill="#FFFFFF"
              stroke="#2D1B0E"
              strokeWidth={3}
            />
            <circle cx={-35} cy={-15} r={13} fill="#10B981" stroke="#2D1B0E" strokeWidth={3} />
            <ellipse cx={-37} cy={-15} rx={4} ry={9} fill="#0F172A" />
          </g>
          <g transform={`translate(-110, 12) rotate(${-openDeg})`}>
            <path
              d="M -95 0 L 35 0 L 20 38 L -80 30 Z"
              fill="#D97706"
              stroke="#2D1B0E"
              strokeWidth={6}
            />
            <polygon points="-80,0 -65,-32 -50,0" fill="#FFFFFF" stroke="#2D1B0E" strokeWidth={3} />
          </g>
        </g>
      )}

      {kind === 'hippo' && (
        <g>
          {/* Thick Pillar Legs */}
          <rect
            x={-70}
            y={130}
            width={44}
            height={88}
            rx={16}
            fill="#584769"
            stroke="#2E1065"
            strokeWidth={5}
          />
          <rect
            x={140}
            y={130}
            width={44}
            height={88}
            rx={16}
            fill="#584769"
            stroke="#2E1065"
            strokeWidth={5}
          />
          <ellipse
            cx={70}
            cy={65}
            rx={198}
            ry={132}
            fill="url(#hippo-grad)"
            stroke="#2E1065"
            strokeWidth={6}
          />
          <rect
            x={-30}
            y={138}
            width={48}
            height={84}
            rx={18}
            fill="url(#hippo-grad)"
            stroke="#2E1065"
            strokeWidth={5}
          />
          <rect
            x={180}
            y={135}
            width={48}
            height={85}
            rx={18}
            fill="url(#hippo-grad)"
            stroke="#2E1065"
            strokeWidth={5}
          />
          <ellipse
            cx={-40}
            cy={-78}
            rx={16}
            ry={20}
            fill="#9D88B3"
            stroke="#2E1065"
            strokeWidth={4}
          />
          <g transform={`translate(-115, -35) rotate(${openDeg * 1.15})`}>
            <path
              d="M -142 20 Q -95 -85 45 -65 L 40 35 L -130 35 Z"
              fill="url(#hippo-grad)"
              stroke="#2E1065"
              strokeWidth={6}
            />
            <circle cx={-122} cy={-12} r={8} fill="#2E1065" />
            <circle cx={-25} cy={-25} r={12} fill="#FFFFFF" stroke="#2E1065" strokeWidth={3} />
            <circle cx={-28} cy={-25} r={6} fill="#0F172A" />
            <rect
              x={-115}
              y={35}
              width={22}
              height={36}
              rx={6}
              fill="#FEF3C7"
              stroke="#2E1065"
              strokeWidth={3}
            />
          </g>
          <g transform={`translate(-115, 25) rotate(${-openDeg * 1.25})`}>
            <path
              d="M -135 0 L 40 0 L 25 55 L -120 48 Z"
              fill="#6B587A"
              stroke="#2E1065"
              strokeWidth={6}
            />
            <rect
              x={-110}
              y={-44}
              width={24}
              height={44}
              rx={6}
              fill="#FEF3C7"
              stroke="#2E1065"
              strokeWidth={3}
            />
          </g>
        </g>
      )}

      {kind === 'croc' && (
        <g>
          {/* Armored Long Tail */}
          <path
            d="M 220 65 Q 340 50 400 95 Q 330 128 210 112 Z"
            fill="url(#croc-grad)"
            stroke="#1A2E05"
            strokeWidth={6}
          />
          {/* Clawed Legs */}
          <path
            d="M -40 120 L -65 185 L -25 185 L -10 128 Z"
            fill="#365314"
            stroke="#1A2E05"
            strokeWidth={5}
          />
          <path
            d="M 140 120 L 125 185 L 165 185 L 175 128 Z"
            fill="#365314"
            stroke="#1A2E05"
            strokeWidth={5}
          />
          <ellipse
            cx={80}
            cy={85}
            rx={212}
            ry={76}
            fill="url(#croc-grad)"
            stroke="#1A2E05"
            strokeWidth={6}
          />
          {[-20, 40, 100, 160].map((cx, i) => (
            <polygon
              key={i}
              points={`${cx},15 ${cx + 22},-14 ${cx + 44},15`}
              fill="#65A30D"
              stroke="#1A2E05"
              strokeWidth={4}
            />
          ))}
          <g transform={`translate(-110, 5) rotate(${openDeg * 0.7})`}>
            <path
              d="M -212 15 Q -100 -45 45 -35 L 35 20 L -205 20 Z"
              fill="url(#croc-grad)"
              stroke="#1A2E05"
              strokeWidth={6}
            />
            <circle cx={-195} cy={-2} r={7} fill="#1A2E05" />
            {[-180, -140, -100, -60, -20].map((tx, i) => (
              <polygon
                key={i}
                points={`${tx},20 ${tx + 12},48 ${tx + 24},20`}
                fill="#FFFFFF"
                stroke="#1A2E05"
                strokeWidth={2.5}
              />
            ))}
            <circle cx={-10} cy={-16} r={13} fill="#FACC15" stroke="#1A2E05" strokeWidth={3} />
            <ellipse cx={-12} cy={-16} rx={3.5} ry={9} fill="#0F172A" />
          </g>
          <g transform={`translate(-110, 28) rotate(${-openDeg * 0.6})`}>
            <path
              d="M -200 0 L 40 0 L 30 34 L -190 24 Z"
              fill="#365314"
              stroke="#1A2E05"
              strokeWidth={6}
            />
            {[-170, -125, -80, -35].map((tx, i) => (
              <polygon
                key={i}
                points={`${tx},0 ${tx + 12},-28 ${tx + 24},0`}
                fill="#FFFFFF"
                stroke="#1A2E05"
                strokeWidth={2.5}
              />
            ))}
          </g>
        </g>
      )}

      {kind === 'shark' && (
        <g>
          {/* Crescent Tail Fin */}
          <path
            d="M 225 10 L 345 -115 L 295 25 L 340 135 L 220 55 Z"
            fill={ctScan ? 'rgba(34,211,238,0.22)' : 'url(#shark-top)'}
            stroke={ctScan ? '#22D3EE' : '#0F172A'}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          {/* Dorsal Fin */}
          <polygon
            points="20,-42 115,-185 160,-34"
            fill={ctScan ? 'rgba(34,211,238,0.22)' : 'url(#shark-top)'}
            stroke={ctScan ? '#22D3EE' : '#0F172A'}
            strokeWidth={6}
          />
          {/* Tapered Torso */}
          <path
            d="M -140 -35 Q 35 -116 245 5 L 245 58 Q 45 142 -140 60 Z"
            fill={ctScan ? 'rgba(14,116,144,0.35)' : 'url(#shark-top)'}
            stroke={ctScan ? '#22D3EE' : '#0F172A'}
            strokeWidth={6}
          />
          <path
            d="M -110 45 Q 45 128 232 54 L 232 62 Q 45 142 -110 60 Z"
            fill="#F8FAFC"
            opacity={ctScan ? 0.35 : 0.92}
          />
          {/* Pectoral Fin */}
          <path
            d="M 10 75 L 95 165 L 135 88 Z"
            fill={ctScan ? 'rgba(34,211,238,0.22)' : 'url(#shark-top)'}
            stroke={ctScan ? '#22D3EE' : '#0F172A'}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          {/* Gill Slits */}
          {[25, 45, 65].map((gx) => (
            <path
              key={gx}
              d={`M ${gx} -10 Q ${gx - 8} 20 ${gx} 46`}
              stroke={ctScan ? '#22D3EE' : '#1E293B'}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
          ))}
          <g transform={`translate(-120, -10) rotate(${openDeg * 0.65})`}>
            <path
              d="M -182 25 Q -100 -88 40 -55 L 30 25 Z"
              fill={ctScan ? 'rgba(34,211,238,0.28)' : 'url(#shark-top)'}
              stroke={ctScan ? '#22D3EE' : '#0F172A'}
              strokeWidth={6}
            />
            {[-145, -110, -75, -40, -5].map((tx, i) => (
              <polygon
                key={i}
                points={`${tx},25 ${tx + 14},64 ${tx + 28},25`}
                fill="#FFFFFF"
                stroke={ctScan ? '#22D3EE' : '#0F172A'}
                strokeWidth={3}
              />
            ))}
            <circle
              cx={-45}
              cy={-22}
              r={13}
              fill="#0F172A"
              stroke={ctScan ? '#22D3EE' : '#FFFFFF'}
              strokeWidth={3}
            />
            <circle cx={-48} cy={-25} r={4} fill="#FFFFFF" />
          </g>
          <g transform={`translate(-120, 26) rotate(${-openDeg * 0.75})`}>
            <path
              d="M -155 0 L 35 0 L 20 46 L -135 34 Z"
              fill={ctScan ? 'rgba(34,211,238,0.28)' : '#E2E8F0'}
              stroke={ctScan ? '#22D3EE' : '#0F172A'}
              strokeWidth={6}
            />
            {[-130, -95, -60, -25].map((tx, i) => (
              <polygon
                key={i}
                points={`${tx},0 ${tx + 13},-38 ${tx + 26},0`}
                fill="#FFFFFF"
                stroke={ctScan ? '#22D3EE' : '#0F172A'}
                strokeWidth={3}
              />
            ))}
          </g>
          {ctScan && (
            <g opacity={0.88}>
              <line
                x1={-285}
                y1={-40 + ((frame * 6) % 165)}
                x2={245}
                y2={-40 + ((frame * 6) % 165)}
                stroke="#38BDF8"
                strokeWidth={4}
              />
              <circle
                cx={-120}
                cy={15}
                r={96}
                fill="none"
                stroke="#F43F5E"
                strokeWidth={4}
                strokeDasharray="14 8"
              />
              <circle cx={-120} cy={15} r={54} fill="none" stroke="#FB923C" strokeWidth={3} />
            </g>
          )}
        </g>
      )}
    </g>
  );
};

export const DangerCard: React.FC<{
  roundLabel: string;
  creatureName: string;
  psi: number;
  maxPsi?: number;
  subLabel: string;
  accentColor: string;
}> = ({roundLabel, creatureName, psi, maxPsi = 4000, subLabel, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const barProgress = interpolate(frame, [8, 36], [0, Math.min(1, psi / maxPsi)], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const humanRatio = (psi / 160).toFixed(1);

  return (
    <div
      style={{
        position: 'absolute',
        top: 52,
        left: 64,
        width: 580,
        padding: '24px 30px',
        borderRadius: 26,
        background: 'rgba(10, 16, 32, 0.86)',
        backdropFilter: 'blur(12px)',
        border: `3px solid ${accentColor}`,
        boxShadow: `0 22px 54px rgba(0,0,0,0.6), 0 0 36px ${accentColor}38`,
        transform: `translateY(${(1 - enter) * -40}px) scale(${0.92 + enter * 0.08})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <span
          style={{
            background: accentColor,
            color: '#0F172A',
            fontWeight: 900,
            fontSize: 20,
            padding: '5px 15px',
            borderRadius: 999,
            letterSpacing: 1,
          }}
        >
          {roundLabel}
        </span>
        <span style={{color: '#E2E8F0', fontSize: 20, fontWeight: 800}}>
          Gấp {humanRatio}x người
        </span>
      </div>

      <div style={{color: '#F8FAFC', fontSize: 38, fontWeight: 900, marginBottom: 6}}>
        {creatureName}
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14}}>
        <span style={{color: accentColor, fontSize: 54, fontWeight: 900, lineHeight: 1}}>
          {Math.round(psi * (0.35 + 0.65 * Math.min(1, frame / 24))).toLocaleString('en-US')} PSI
        </span>
        <span style={{color: '#CBD5E1', fontSize: 22, fontWeight: 600}}>{subLabel}</span>
      </div>

      <div
        style={{
          width: '100%',
          height: 20,
          borderRadius: 999,
          background: '#1E293B',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${accentColor}, #FDE047)`,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};

export const ComicBurst: React.FC<{
  text: string;
  x: number;
  y: number;
  color?: string;
  startFrame?: number;
}> = ({text, x, y, color = '#EF4444', startFrame = 15}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - startFrame;
  if (local < 0) return null;

  const pop = spring({frame: local, fps, config: {damping: 8, stiffness: 190}});

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${pop}) rotate(-7deg)`,
        pointerEvents: 'none',
      }}
    >
      <svg
        width={340}
        height={170}
        viewBox="0 0 340 170"
        style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
      >
        <polygon
          points="20,40 75,10 120,30 170,4 220,30 275,8 320,42 300,85 330,130 265,158 215,138 170,166 125,138 70,158 14,126 42,82"
          fill={color}
          stroke="#FDE047"
          strokeWidth={7}
        />
      </svg>
      <div
        style={{
          position: 'relative',
          color: '#FFFFFF',
          fontWeight: 900,
          fontSize: 56,
          padding: '24px 44px',
          textShadow: '4px 4px 0 #0F172A',
          letterSpacing: 2,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const GagTally: React.FC<{count: number; total?: number}> = ({count, total = 4}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 52,
        right: 64,
        padding: '16px 28px',
        borderRadius: 22,
        background: 'rgba(10, 16, 32, 0.86)',
        border: '3px solid #F87171',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
      }}
    >
      <span style={{fontSize: 36}}>🩹</span>
      <div>
        <div style={{color: '#FCA5A5', fontSize: 16, fontWeight: 800, letterSpacing: 1}}>
          BĂNG BÓ
        </div>
        <div style={{color: '#FFFFFF', fontSize: 34, fontWeight: 900, lineHeight: 1.1}}>
          {count} / {total}
        </div>
      </div>
    </div>
  );
};

const HIGHLIGHT_RE =
  /(\d[\d.,]*|PSI|Newton|tấn|độ|Kẹp!?|Rắc!?|Bốp!!?|Nát|bụi|Vỡ|xương|mai rùa|cá mập|4\/4)/i;

export const SubtitleBar: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const words = text.trim().split(/\s+/);
  const chunkSize = 6;
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  const safeChunks = chunks.length > 0 ? chunks : [text];
  const progress = durationInFrames > 0 ? Math.min(0.999, frame / durationInFrames) : 0;
  const chunkIdx = Math.min(safeChunks.length - 1, Math.floor(progress * safeChunks.length));
  const chunkFrames = Math.max(1, durationInFrames / safeChunks.length);
  const localFrame = frame - chunkIdx * chunkFrames;
  const pop = spring({frame: Math.max(0, localFrame), fps, config: {damping: 14, stiffness: 220}});
  const activeChunk = safeChunks[chunkIdx];

  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        right: 130,
        bottom: 42,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(2, 6, 23, 0.90)',
          border: '2.5px solid rgba(255, 255, 255, 0.24)',
          padding: '16px 38px',
          borderRadius: 22,
          color: '#F8FAFC',
          fontSize: 38,
          fontWeight: 800,
          textAlign: 'center',
          lineHeight: 1.32,
          boxShadow: '0 14px 36px rgba(0,0,0,0.65)',
          transform: `scale(${0.94 + pop * 0.06})`,
        }}
      >
        {activeChunk.split(/\s+/).map((w, idx) => (
          <span
            key={idx}
            style={{color: HIGHLIGHT_RE.test(w) ? '#FDE047' : '#F8FAFC', marginRight: 10}}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

export const BoneDebris: React.FC<{x: number; y: number; startFrame: number}> = ({
  x,
  y,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0) return null;
  const spread = Math.min(1, local / 18);
  const alpha = interpolate(local, [12, 32], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shards = [
    {dx: -110, dy: -85, rot: -45},
    {dx: 95, dy: -100, rot: 55},
    {dx: -80, dy: 65, rot: -110},
    {dx: 115, dy: 55, rot: 95},
    {dx: 10, dy: -120, rot: 25},
  ];
  return (
    <g transform={`translate(${x}, ${y})`} opacity={alpha}>
      <circle cx={0} cy={0} r={35 + spread * 55} fill="rgba(248, 250, 252, 0.35)" />
      {shards.map((s, i) => (
        <polygon
          key={i}
          points="-12,-6 14,-2 8,10 -10,8"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth={2.5}
          transform={`translate(${s.dx * spread}, ${s.dy * spread}) rotate(${s.rot * spread})`}
        />
      ))}
    </g>
  );
};

export const CrackLines: React.FC<{x: number; y: number; startFrame: number}> = ({
  x,
  y,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;
  const grow = Math.min(1, (frame - startFrame) / 8);
  return (
    <g transform={`translate(${x}, ${y}) scale(${grow})`}>
      <path
        d="M -35 -45 L -8 -12 L -28 18 L 6 48"
        stroke="#FDE047"
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M -8 -12 L 26 -24 L 42 8"
        stroke="#FDE047"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

export const MeterExplosion: React.FC<{x: number; y: number; startFrame: number}> = ({
  x,
  y,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0) return null;
  const spread = Math.min(1, local / 16);
  const alpha = interpolate(local, [10, 28], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <g transform={`translate(${x}, ${y})`} opacity={alpha}>
      <circle cx={0} cy={0} r={24 + spread * 95} fill="rgba(249, 115, 22, 0.45)" />
      <circle cx={0} cy={0} r={16 + spread * 60} fill="rgba(250, 204, 21, 0.65)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.cos(rad) * (40 + spread * 120);
        const py = Math.sin(rad) * (40 + spread * 120);
        return (
          <circle key={deg} cx={px} cy={py} r={8} fill="#FDE047" stroke="#EF4444" strokeWidth={3} />
        );
      })}
    </g>
  );
};
