import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, ramp} from '../proto/motion';
import {
  DBTFonts,
  Finish,
  GridPaper,
  Headline,
  LampGlow,
  PencilChar,
  RedPenLines,
  PAPER,
} from '../proto/kit';

export const Scene07 = () => {
  const f = useCurrentFrame();
  const flash = ramp(f, 0, 8, E_SINE) * (1 - ramp(f, 10, 8, E_SINE));
  const headline = ramp(f, 7, 12, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.3} />
      <LampGlow opacity={0.4} x={100} y={70} />
      <RedPenLines
        lines={['chưa nhà', 'chưa kết hôn', 'chưa có địa vị']}
        x={150}
        y={310}
        enter={0}
      />
      <PencilChar x={450} y={1040} s={1.04} pose="hold" enter={0} />
      <div
        style={{
          position: 'absolute',
          left: 562,
          top: 1160,
          width: 9,
          height: 78,
          background: '#3E454B',
          borderRadius: 5,
          transform: 'rotate(-30deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#F3F5F2',
          opacity: flash * 0.38,
          pointerEvents: 'none',
        }}
      />
      <div style={{opacity: headline}}>
        <Headline
          lines={[[{t: 'Bạn chưa có nhà,', b: true}], [{t: 'chưa kết hôn.', b: true}]]}
          top={1370}
          size={72}
          enter={0}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
