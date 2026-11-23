import React from 'react';
import {CreatureArt, CunBongMascot} from './kit';
import {MONTSERRAT_FONT, ensureMontserratLoaded} from './font';

export const Thumbnail: React.FC = () => {
  ensureMontserratLoaded();

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 62% 52%, #0EA5E9 0%, #082F49 38%, #020617 85%)',
        fontFamily: MONTSERRAT_FONT,
      }}
    >
      {/* Dramatic Speed Lines + Crimson Danger Glow */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <radialGradient id="danger-aura" cx="62%" cy="55%" r="48%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#danger-aura)" />
        {Array.from({length: 28}).map((_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          const x1 = 1040 + Math.cos(angle) * 260;
          const y1 = 560 + Math.sin(angle) * 260;
          const x2 = 1040 + Math.cos(angle) * 1450;
          const y2 = 560 + Math.sin(angle) * 1450;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? 'rgba(255,255,255,0.16)' : 'rgba(250,204,21,0.14)'}
              strokeWidth={i % 3 === 0 ? 10 : 5}
            />
          );
        })}
      </svg>

      {/* Close-up Characters: Giant Shark Jaw vs Panicking Cún Bông */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CreatureArt kind="shark" x={1360} y={590} scale={2.45} jawOpen={0.92} />
        <CunBongMascot
          x={520}
          y={760}
          scale={2.35}
          mood="wide"
          pose="panic"
          narration="Áaaaa!"
          speaking
          bandages={4}
        />

        {/* Neon Red Danger Arrow pointing directly into Shark Jaws */}
        <path
          d="M 800 300 Q 950 350 960 540"
          stroke="#EF4444"
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="962,578 924,522 994,524" fill="#EF4444" stroke="#FDE047" strokeWidth={5} />
      </svg>

      {/* Top Focal Hook Typography (2-4 punchy words, huge contrast) */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 72,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transform: 'rotate(-3deg)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: 'linear-gradient(90deg, #EF4444, #F97316)',
            color: '#FFFFFF',
            fontSize: 48,
            fontWeight: 900,
            padding: '12px 34px',
            borderRadius: 18,
            border: '5px solid #FFFFFF',
            boxShadow: '0 14px 36px rgba(0,0,0,0.65)',
            letterSpacing: 1.5,
          }}
        >
          TOP 5 LỰC CẮN MẠNH NHẤT
        </div>

        <div
          style={{
            color: '#FDE047',
            fontSize: 138,
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: -2,
            WebkitTextStroke: '10px #020617',
            paintOrder: 'stroke fill',
            textShadow: '0 16px 36px rgba(0,0,0,0.85)',
          }}
        >
          4,000 PSI!!
        </div>

        <div
          style={{
            color: '#FFFFFF',
            fontSize: 52,
            fontWeight: 900,
            WebkitTextStroke: '6px #020617',
            paintOrder: 'stroke fill',
            textShadow: '0 8px 20px rgba(0,0,0,0.8)',
          }}
        >
          CẮN PHÁT NÁT XƯƠNG?!
        </div>
      </div>
    </div>
  );
};
