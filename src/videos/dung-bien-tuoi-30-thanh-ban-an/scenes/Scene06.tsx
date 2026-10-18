import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, ramp} from '../motion';
import {
  CAP,
  DBTFonts,
  Feast,
  Finish,
  GridPaper,
  HAND,
  LampGlow,
  PAPER,
  PencilChar,
  RED,
} from '../kit';

const questions = ['Khi nào cưới?', 'Lương bao nhiêu?', 'Mua nhà chưa?'];

export const Scene06 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.08} />
      <LampGlow opacity={0.28} x={100} y={80} />
      <Feast x={150} y={650} scale={1.02} steam />
      <PencilChar x={465} y={1040} s={1.02} pose="sit" enter={0} />
      <div
        style={{
          position: 'absolute',
          left: 586,
          top: 1132,
          width: 92,
          height: 18,
          borderRadius: 12,
          background: '#3E454B',
          transform: 'rotate(-33deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 610,
          top: 1000,
          width: 55,
          height: 70,
          borderLeft: '9px solid #3E454B',
          borderRadius: '50%',
          transform: 'rotate(22deg)',
        }}
      />
      <div style={{position: 'absolute', left: 110, top: 270, right: 110, height: 520}}>
        {questions.map((question, i) => {
          const e = ramp(f, 8 + i * 13, 9, E_SINE);
          return (
            <div
              key={question}
              style={{
                position: 'absolute',
                left: i === 1 ? 250 : i === 2 ? 100 : 0,
                top: i * 150,
                fontFamily: HAND,
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 62,
                color: RED,
                opacity: e,
                transform: `translateY(${(1 - e) * 20}px) rotate(${i === 1 ? 3 : -4}deg)`,
                textShadow: '0 2px 5px rgba(210,59,46,.16)',
              }}
            >
              {question}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 224,
          fontFamily: CAP,
          fontWeight: 600,
          fontSize: 58,
          lineHeight: 1.35,
          textAlign: 'center',
          color: '#F3F5F2',
          padding: '18px 24px 22px',
          borderRadius: 26,
          background: 'rgba(62,69,75,0.86)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
        }}
      >
        {questions.map((question, i) => {
          const e = ramp(f, 8 + i * 13, 9, E_SINE);
          return (
            <div
              key={question}
              style={{opacity: e, transform: `translateY(${(1 - e) * 12}px)`, marginTop: i ? 8 : 0}}
            >
              {question}
            </div>
          );
        })}
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
