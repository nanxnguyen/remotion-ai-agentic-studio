import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, Grain, mix, ramp} from '../proto/motion';
import {
  CAP,
  DBTFonts,
  Feast,
  Finish,
  GridPaper,
  INK,
  LampGlow,
  PAPER,
  PencilChar,
  RED,
} from '../proto/kit';

const Scene05Caption: React.FC = () => {
  const f = useCurrentFrame();
  const first = ramp(f, 3, 10, E_SINE);
  const second = ramp(f, 24, 12, E_SINE);
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 224,
        color: '#F3F5F2',
        fontFamily: CAP,
        fontWeight: 600,
        fontSize: 58,
        lineHeight: 1.35,
        textAlign: 'center',
        padding: '18px 24px 22px',
        borderRadius: 26,
        background: 'rgba(62,69,75,0.86)',
        textShadow: '0 2px 14px rgba(0,0,0,.9)',
      }}
    >
      <div style={{opacity: first, transform: `translateY(${(1 - first) * 14}px)`}}>Tết đến.</div>
      <div
        style={{opacity: second, transform: `translateY(${(1 - second) * 14}px)`, marginTop: 10}}
      >
        Mâm cỗ còn <span style={{color: RED, fontWeight: 700}}>bốc khói</span>,<br />
        thì những câu hỏi <span style={{color: RED, fontWeight: 700}}>bật lên</span>.
      </div>
    </div>
  );
};

export const Scene05 = () => {
  const f = useCurrentFrame();
  const enter = ramp(f, 0, 22, E_SINE);
  const tableY = mix(142, 0, enter);
  const reaction = ramp(f, 9, 12, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <LampGlow opacity={0.34} x={90} y={80} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${tableY}px)`}}>
        <Feast x={150} y={650} scale={1.02} steam />
      </div>
      <PencilChar x={460} y={1030} s={1.04} pose="sit" enter={0} />
      <div
        style={{
          position: 'absolute',
          left: 560,
          top: 1150,
          width: 90,
          height: 18,
          borderRadius: 12,
          background: INK,
          transform: `rotate(-32deg) translateY(${(1 - reaction) * 12}px)`,
          opacity: reaction,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 655,
          top: 1060,
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: `5px solid ${INK}`,
          opacity: reaction * 0.8,
        }}
      />
      <Scene05Caption />
      <Finish />
      <Grain opacity={0.025} step={3} />
    </AbsoluteFill>
  );
};
