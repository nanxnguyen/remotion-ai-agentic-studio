import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FitText} from '../../../core/fit-text';
import {E_SINE, mix, ramp} from '../motion';
import {
  CAP,
  DBTFonts,
  Finish,
  GridPaper,
  HEAD,
  HILITE,
  INK,
  LampGlow,
  PencilChar,
  RED,
  Ruler,
} from '../kit';

export const Scene01 = () => {
  const frame = useCurrentFrame();
  const settle = ramp(frame, 0, 24, E_SINE);
  const circle = ramp(frame, 26, 40, E_SINE);
  const zoom = mix(1, 1.035, ramp(frame, 0, 120, E_SINE));

  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <div style={{position: 'absolute', inset: -56, transform: `scale(${zoom})`}}>
        <GridPaper />
        <LampGlow opacity={0.25} x={80} y={40} />
        <Ruler x={120 + settle * 18} y={550} width={720} angle={-12} activeTick={30} />
        <div
          style={{
            position: 'absolute',
            left: 120 + settle * 18 + 540,
            top: 504,
            width: 72,
            height: 72,
            border: `4px solid ${RED}`,
            borderRadius: '50%',
            opacity: circle,
            transform: `scale(${0.82 + circle * 0.18}) rotate(-8deg)`,
          }}
        />
        <PencilChar x={130} y={1260} s={1.08} pose="hold" />
        <div style={{position: 'absolute', left: 78, right: 78, top: 160, textAlign: 'center'}}>
          <FitText
            text="Tuổi ba mươi,"
            maxWidth={880}
            maxLines={1}
            fontFamily={HEAD}
            fontWeight={700}
            minFontSize={64}
            maxFontSize={94}
            style={{color: INK, textShadow: `0 3px 0 #F0F3F0`}}
          />
          <div style={{position: 'relative', marginTop: 8}}>
            <FitText
              text="bị coi như một bản án."
              maxWidth={880}
              maxLines={1}
              fontFamily={HEAD}
              fontWeight={700}
              minFontSize={58}
              maxFontSize={88}
              style={{color: INK, textShadow: `0 3px 0 #F0F3F0`}}
            />
            <div
              style={{
                position: 'absolute',
                right: 118,
                bottom: 3,
                width: 182,
                height: 18,
                borderRadius: 10,
                background: HILITE,
                opacity: 0.16,
                transform: 'rotate(-2deg)',
              }}
            />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 82,
            top: 930,
            fontFamily: CAP,
            fontSize: 34,
            fontWeight: 600,
            color: RED,
            letterSpacing: 4,
            opacity: 0.85,
            transform: 'rotate(-5deg)',
          }}
        >
          BẢN ÁN
        </div>
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
