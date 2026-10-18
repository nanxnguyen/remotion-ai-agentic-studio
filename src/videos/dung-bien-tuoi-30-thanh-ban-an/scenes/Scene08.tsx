import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, mix, ramp} from '../proto/motion';
import {
  DBTFonts,
  Finish,
  GridPaper,
  Headline,
  LampGlow,
  PencilChar,
  RedPenLines,
  PAPER,
  RED,
} from '../proto/kit';

export const Scene08 = () => {
  const f = useCurrentFrame();
  const drop = ramp(f, 8, 16, E_SINE);
  const impact = ramp(f, 24, 6, E_SINE);
  const lamp = 1 - 0.6 * ramp(f, 8, 26, E_SINE);
  const penY = mix(1120, 1570, drop);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.22} />
      <LampGlow opacity={0.42 * lamp} x={90} y={70} />
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
          left: 560,
          top: penY,
          width: 9,
          height: 78,
          background: '#3E454B',
          borderRadius: 5,
          transform: `rotate(${15 - drop * 35}deg)`,
          opacity: drop > 0 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 650,
          top: 1020,
          fontFamily: 'Lora, Georgia, serif',
          fontStyle: 'italic',
          fontSize: 148,
          color: RED,
          opacity: impact,
          transform: `scale(${0.8 + impact * 0.2}) rotate(-8deg)`,
        }}
      >
        ?
      </div>
      <Headline
        lines={[
          [{t: 'Bạn chưa có nhà, chưa kết hôn.', b: true}],
          [{t: 'Nhưng '}, {t: 'ai đã quy định', c: RED}, {t: ' hôm nay bạn phải có đủ?'}],
        ]}
        top={1320}
        size={58}
        enter={4}
      />
      <Finish />
    </AbsoluteFill>
  );
};
