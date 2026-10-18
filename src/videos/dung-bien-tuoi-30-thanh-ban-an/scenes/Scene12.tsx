import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, mix, ramp} from '../proto/motion';
import {
  CAP,
  DBTFonts,
  DbtLine,
  Finish,
  GridPaper,
  Handwrite,
  PencilChar,
  PhoneMock,
} from '../proto/kit';

/** s7b — the feed dies, leaving the character alone with the question. */
export const Scene12: React.FC = () => {
  const f = useCurrentFrame();
  const off = ramp(f, 12, 26, E_SINE);
  const phoneOpacity = 1 - off * 0.7;
  const question = ramp(f, 28, 18, E_SINE);
  return (
    <AbsoluteFill style={{background: '#20262C', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={1.15} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, rgba(35,43,50,${0.25 + off * 0.62}) 0%, rgba(20,24,28,.98) 72%)`,
        }}
      />
      <div style={{position: 'absolute', left: 424, top: 310, opacity: phoneOpacity}}>
        <PhoneMock on={false} scale={1.1} />
        <div
          style={{
            position: 'absolute',
            left: -22,
            top: -22,
            width: 300,
            height: 530,
            background: '#101419',
            opacity: off * 0.72,
            transform: `rotate(${mix(-15, 15, off)}deg)`,
            transformOrigin: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 76%)',
          }}
        />
      </div>
      <PencilChar x={170} y={1010} s={1.23} pose="sit" enter={0} />
      <div
        style={{
          position: 'absolute',
          left: 330,
          top: 1190,
          width: 86,
          height: 20,
          borderRadius: 16,
          background: '#2A2F33',
          transform: 'rotate(-38deg)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 70,
          right: 70,
          top: 630,
          textAlign: 'center',
          opacity: question,
        }}
      >
        <Handwrite
          text="Rồi tự hỏi:"
          size={60}
          x={0}
          y={0}
          color="#DCEAF2"
          style={{position: 'relative', left: 'auto', top: 'auto', display: 'block'}}
        />
        <div
          style={{
            fontFamily: CAP,
            fontWeight: 600,
            fontSize: 68,
            color: '#F3F5F2',
            fontStyle: 'italic',
            marginTop: 26,
          }}
        >
          mình đi nhầm đường à?
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1450}}>
        <DbtLine
          text={'Rồi tự hỏi:\nmình đi nhầm đường à?'}
          accent="nhầm đường à"
          accentColor="#FFE24D"
          size={56}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
