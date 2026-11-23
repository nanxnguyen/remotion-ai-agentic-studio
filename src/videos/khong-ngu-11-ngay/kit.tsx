import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ComicBurst,
  SubtitleBar,
  type MascotMood,
  type MascotPose,
  type StageTheme,
} from '../top-5-luc-can-manh-nhat/kit';
import {SleepOwlBoyMascot, SleepThemeStage} from './sleep-cast';

export {
  ComicBurst,
  SleepOwlBoyMascot as CunBongMascot,
  SleepThemeStage as MascotStage,
  SubtitleBar,
  type MascotMood,
  type MascotPose,
  type StageTheme,
};

export const SleepClockCard: React.FC<{
  hours: number;
  dayLabel: string;
  title: string;
  batteryPct: number;
  accentColor: string;
}> = ({hours, dayLabel, title, batteryPct, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const displayBattery = Math.round(
    interpolate(frame, [6, 30], [Math.min(100, batteryPct + 18), batteryPct], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 52,
        left: 64,
        width: 590,
        padding: '24px 30px',
        borderRadius: 26,
        background: 'rgba(10, 16, 32, 0.88)',
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
          {dayLabel}
        </span>
        <span style={{color: '#FDE047', fontSize: 24, fontWeight: 900}}>{hours} GIỜ THỨC</span>
      </div>

      <div style={{color: '#F8FAFC', fontSize: 34, fontWeight: 900, marginBottom: 12}}>{title}</div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
        <span style={{color: '#94A3B8', fontSize: 20, fontWeight: 800}}>PIN NÃO BỘ</span>
        <span style={{color: accentColor, fontSize: 26, fontWeight: 900}}>{displayBattery}%</span>
      </div>

      <div
        style={{
          width: '100%',
          height: 22,
          borderRadius: 999,
          background: '#1E293B',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          style={{
            width: `${Math.max(2, displayBattery)}%`,
            height: '100%',
            background:
              batteryPct <= 25
                ? 'linear-gradient(90deg, #EF4444, #F97316)'
                : `linear-gradient(90deg, ${accentColor}, #38BDF8)`,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};

export const CoffeeStackProp: React.FC<{x: number; y: number; count?: number}> = ({
  x,
  y,
  count = 6,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {Array.from({length: count}).map((_, i) => {
        const cx = (i % 3) * 56 - 56;
        const cy = Math.floor(i / 3) * -48;
        return (
          <g key={i} transform={`translate(${cx}, ${cy})`}>
            <polygon
              points="-18,-36 18,-36 14,16 -14,16"
              fill="#F8FAFC"
              stroke="#0F172A"
              strokeWidth={4}
            />
            <rect
              x={-20}
              y={-44}
              width={40}
              height={10}
              rx={4}
              fill="#92400E"
              stroke="#0F172A"
              strokeWidth={3}
            />
            <ellipse cx={0} cy={-10} rx={8} ry={8} fill="#78350F" />
          </g>
        );
      })}
    </g>
  );
};

export const MicrobeSwarmProp: React.FC<{x: number; y: number}> = ({x, y}) => {
  const frame = useCurrentFrame();
  const bugs = [
    {dx: 0, dy: 0, r: 44, color: '#A3E635'},
    {dx: -110, dy: -70, r: 34, color: '#22C55E'},
    {dx: 105, dy: -55, r: 38, color: '#84CC16'},
    {dx: -70, dy: 80, r: 30, color: '#4ADE80'},
  ];
  return (
    <g transform={`translate(${x}, ${y})`}>
      {bugs.map((b, i) => {
        const bobX = Math.sin(frame * 0.16 + i * 2) * 18;
        const bobY = Math.cos(frame * 0.2 + i * 1.5) * 14;
        return (
          <g key={i} transform={`translate(${b.dx + bobX}, ${b.dy + bobY})`}>
            <circle cx={0} cy={0} r={b.r} fill={b.color} stroke="#14532D" strokeWidth={5} />
            <circle cx={-12} cy={-8} r={7} fill="#0F172A" />
            <circle cx={12} cy={-8} r={7} fill="#0F172A" />
            <path d="M -14 12 Q 0 2 14 12" stroke="#14532D" strokeWidth={4} fill="none" />
          </g>
        );
      })}
    </g>
  );
};

export const ShadowMonsterProp: React.FC<{x: number; y: number}> = ({x, y}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.15) * 12;
  return (
    <g transform={`translate(${x}, ${y + sway})`}>
      <path
        d="M -130 160 Q -150 -40 0 -160 Q 150 -40 130 160 Q 60 120 0 155 Q -60 120 -130 160 Z"
        fill="#1E1B4B"
        stroke="#A855F7"
        strokeWidth={6}
      />
      {/* 3 Glowing Eyes */}
      <circle cx={-48} cy={-45} r={18} fill="#F43F5E" />
      <circle cx={0} cy={-85} r={20} fill="#F43F5E" />
      <circle cx={48} cy={-45} r={18} fill="#F43F5E" />
      <path
        d="M -55 25 L -30 50 L 0 22 L 30 50 L 55 25"
        stroke="#F8FAFC"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};

export const TiredEyesOverlay: React.FC<{level: number}> = ({level}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 52,
        right: 64,
        padding: '16px 28px',
        borderRadius: 22,
        background: 'rgba(10, 16, 32, 0.88)',
        border: '3px solid #A855F7',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
      }}
    >
      <span style={{fontSize: 34}}>☕</span>
      <div>
        <div style={{color: '#D8B4FE', fontSize: 16, fontWeight: 800, letterSpacing: 1}}>
          CÀ PHÊ ĐÃ UỐNG
        </div>
        <div style={{color: '#FFFFFF', fontSize: 34, fontWeight: 900, lineHeight: 1.1}}>
          {level} LY
        </div>
      </div>
    </div>
  );
};
