import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {DBTFonts, Finish, GridPaper, HILITE, LampGlow, PAPER, Ruler} from '../kit';
import {E_SINE, mix, ramp} from '../motion';

const CLOSING_TEXT = 'Đừng biến tuổi ba mươi thành bản án.';
const HOLD_FRAMES = 72;

export const Scene16 = () => {
  const frame = useCurrentFrame();
  const sweep = ramp(frame, 4, 18, E_SINE);
  const push = mix(1, 1.03, ramp(frame, 22, 30, E_SINE));
  const hold = ramp(frame, 22, HOLD_FRAMES, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${push})`}}>
        <GridPaper />
        <LampGlow opacity={0.28} x={100} y={70} />
        <div style={{position: 'absolute', left: 70, right: 70, top: 470, textAlign: 'center'}}>
          <div
            style={{
              position: 'absolute',
              left: '4%',
              top: 34,
              width: `${sweep * 92}%`,
              height: 104,
              background: HILITE,
              borderRadius: 14,
              opacity: 0.76,
            }}
          />
          <div
            aria-label={CLOSING_TEXT}
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: "'Literata',Georgia,serif",
              fontWeight: 700,
              fontSize: 72,
              lineHeight: 1.22,
              color: '#3E454B',
              textShadow: `0 2px 0 ${PAPER}, 2px 0 0 ${PAPER}, -2px 0 0 ${PAPER}`,
            }}
          >
            ĐỪNG BIẾN TUỔI BA MƯƠI
            <br />
            THÀNH <span style={{color: '#B8A800'}}>BẢN ÁN</span>
          </div>
        </div>
        {/* Unattended ruler: no hand overlaps the final hold. */}
        <div
          style={{
            position: 'absolute',
            left: 355,
            top: 1410,
            opacity: 0.82 * hold,
            transform: `translateX(${(1 - hold) * 10}px)`,
          }}
        >
          <Ruler x={0} y={0} width={560} angle={8} ticks={[18, 22, 25, 30]} enter={0} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 7,
            background: '#3E454B',
            opacity: 0.24 + 0.08 * Math.sin(frame / 20),
          }}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
