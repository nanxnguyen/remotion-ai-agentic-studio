import React from 'react';
import {CoffeeStackProp, CunBongMascot, ShadowMonsterProp} from './kit';
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
        background: 'radial-gradient(circle at 60% 50%, #7C3AED 0%, #1E1B4B 42%, #020617 88%)',
        fontFamily: MONTSERRAT_FONT,
      }}
    >
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        {Array.from({length: 28}).map((_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={960 + Math.cos(angle) * 240}
              y1={540 + Math.sin(angle) * 240}
              x2={960 + Math.cos(angle) * 1450}
              y2={540 + Math.sin(angle) * 1450}
              stroke={i % 2 === 0 ? 'rgba(255,255,255,0.14)' : 'rgba(239,68,68,0.18)'}
              strokeWidth={i % 3 === 0 ? 10 : 5}
            />
          );
        })}

        <ShadowMonsterProp x={1480} y={540} />
        <CoffeeStackProp x={1150} y={890} count={9} />
        <CunBongMascot
          x={540}
          y={760}
          scale={2.4}
          mood="dizzy"
          pose="panic"
          speaking={false}
          bandages={4}
        />

        {/* Red Battery 1% Indicator */}
        <g transform="translate(1240, 120)">
          <rect
            x={0}
            y={0}
            width={340}
            height={130}
            rx={22}
            fill="rgba(2,6,23,0.9)"
            stroke="#EF4444"
            strokeWidth={8}
          />
          <rect x={340} y={38} width={22} height={54} rx={8} fill="#EF4444" />
          <rect x={18} y={18} width={36} height={94} rx={10} fill="#EF4444" />
          <text x={200} y={84} textAnchor="middle" fontSize={58} fontWeight={900} fill="#FDE047">
            1%
          </text>
        </g>

        {/* Danger Arrow */}
        <path
          d="M 880 310 Q 1030 240 1190 210"
          stroke="#EF4444"
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
        />
        <polygon
          points="1225,205 1170,180 1180,245"
          fill="#EF4444"
          stroke="#FDE047"
          strokeWidth={5}
        />
      </svg>

      {/* Top Left Punchy Hook */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 68,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          transform: 'rotate(-3deg)',
        }}
      >
        <div
          style={{
            alignSelf: 'flex-start',
            background: 'linear-gradient(90deg, #EF4444, #F97316)',
            color: '#FFFFFF',
            fontSize: 44,
            fontWeight: 900,
            padding: '10px 30px',
            borderRadius: 18,
            border: '5px solid #FFFFFF',
            boxShadow: '0 14px 36px rgba(0,0,0,0.65)',
          }}
        >
          THỨC TRẮNG LIÊN TỤC
        </div>
        <div
          style={{
            color: '#FDE047',
            fontSize: 132,
            fontWeight: 900,
            lineHeight: 0.98,
            WebkitTextStroke: '10px #020617',
            paintOrder: 'stroke fill',
            textShadow: '0 16px 36px rgba(0,0,0,0.85)',
          }}
        >
          11 NGÀY!!
        </div>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 50,
            fontWeight: 900,
            WebkitTextStroke: '6px #020617',
            paintOrder: 'stroke fill',
          }}
        >
          NÃO BỘ SẬP NGUỒN?!
        </div>
      </div>
    </div>
  );
};
