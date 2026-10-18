import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, mix, ramp} from '../proto/motion';
import {DBTFonts, DbtLine, Finish, GridPaper, HAND, HILITE, INK, LampGlow} from '../proto/kit';

/** s6b — macro reveal: the “30” is a hand-drawn pencil mark, not a real ruler. */
export const Scene10: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = mix(1, 1.22, ramp(f, 0, 82, E_SINE));
  const line = ramp(f, 10, 44, E_SINE);
  const eraser = ramp(f, 34, 18, E_SINE);
  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <div
        style={{
          position: 'absolute',
          inset: -180,
          transform: `scale(${zoom})`,
          transformOrigin: '520px 860px',
        }}
      >
        <GridPaper dim={0.04} />
        <LampGlow opacity={0.46} x={130} y={100} />
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 760,
            width: 850,
            height: 5,
            background: INK,
            opacity: 0.2,
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 260,
            top: 704,
            width: 560,
            height: 6,
            borderRadius: 6,
            background: INK,
            opacity: 0.7,
            transform: `rotate(-8deg) scaleX(${line})`,
            transformOrigin: 'left center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 508,
            top: 565,
            fontFamily: HAND,
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 190,
            color: INK,
            opacity: 0.9,
            transform: 'rotate(-8deg)',
            textShadow: '5px 5px 0 rgba(62,69,75,.12)',
          }}
        >
          30
        </div>
        <div
          style={{
            position: 'absolute',
            left: 760,
            top: 532,
            width: 180,
            height: 86,
            borderRadius: 24,
            background: '#E4E0D8',
            border: `3px solid ${INK}`,
            transform: `rotate(19deg) translate(${(1 - eraser) * 70}px, ${(1 - eraser) * -35}px)`,
            opacity: eraser,
            boxShadow: '0 10px 18px rgba(62,69,75,.18)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 12,
              border: '2px dashed rgba(62,69,75,.32)',
              borderRadius: 14,
            }}
          />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 822 + i * 23,
              top: 650 + (i % 2) * 28,
              width: 11,
              height: 8,
              borderRadius: '50%',
              background: '#B9B5AC',
              opacity: eraser,
              transform: `translateY(${(1 - eraser) * -50}px) rotate(${i * 31}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 304,
            top: 788,
            fontFamily: HAND,
            fontSize: 44,
            color: '#8B9395',
            transform: 'rotate(-8deg)',
          }}
        >
          nét chì kẻ tay
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1250}}>
        <DbtLine
          text={'Cái mốc ba mươi ấy,\nchỉ là một nét ai đó kẻ tay.'}
          accent="nét ai đó kẻ tay"
          accentColor={HILITE}
          size={54}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
