import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FitText} from '../../../core/fit-text';
import {E_SINE, ramp} from '../motion';
import {
  CAP,
  DBTFonts,
  Finish,
  GridPaper,
  HAND,
  INK,
  PencilChar,
  RED,
  RedPenLines,
} from '../kit';

const Caption: React.FC<{text: string; visible: boolean}> = ({text, visible}) => (
  <div
    style={{
      position: 'absolute',
      left: 64,
      right: 64,
      bottom: 224,
      display: 'flex',
      justifyContent: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
    }}
  >
    <FitText
      text={text}
      maxWidth={900}
      maxLines={2}
      fontFamily={CAP}
      fontWeight={600}
      minFontSize={54}
      maxFontSize={62}
      style={{
        color: '#F3F5F2',
        background: 'rgba(62,69,75,.88)',
        borderRadius: 24,
        padding: '20px 28px',
      }}
    />
  </div>
);

export const Scene02 = () => {
  const frame = useCurrentFrame();
  const reveal = ramp(frame, 0, 18, E_SINE);
  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.05} />
      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 188,
          padding: '10px 22px 12px',
          color: RED,
          border: `3px solid ${RED}`,
          fontFamily: CAP,
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: 5,
          transform: 'rotate(-4deg)',
          opacity: reveal,
        }}
      >
        BA CHƯA
      </div>
      <RedPenLines
        lines={['chưa nhà', 'chưa kết hôn', 'chưa có địa vị']}
        x={170}
        y={380}
        enter={0}
      />
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 900,
          width: 710,
          height: 3,
          background: RED,
          opacity: 0.55,
          transform: 'rotate(-5deg)',
        }}
      />
      <PencilChar x={155} y={1250} s={1.05} pose="stand" />
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 1160,
          fontFamily: HAND,
          fontSize: 52,
          color: INK,
          transform: 'rotate(-8deg)',
        }}
      >
        nhìn sang
      </div>
      <Caption text="Ba dòng tội danh:" visible={frame >= 0 && frame < 30} />
      <Caption text="chưa nhà, chưa kết hôn," visible={frame >= 30 && frame < 66} />
      <Caption text="chưa có địa vị." visible={frame >= 66} />
      <Finish />
    </AbsoluteFill>
  );
};
