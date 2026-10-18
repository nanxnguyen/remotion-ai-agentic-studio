import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, ramp} from '../proto/motion';
import {
  CAP,
  DBTFonts,
  DbtLine,
  Finish,
  GridPaper,
  HAND,
  INK,
  LampGlow,
  PencilChar,
  RED,
} from '../proto/kit';

/** s6a — the red verdict stops before it can finish writing “thất bại”. */
export const Scene09: React.FC = () => {
  const f = useCurrentFrame();
  const write = ramp(f, 14, 38, E_SINE);
  const stop = ramp(f, 52, 10, E_SINE);
  const redPulse = 0.72 + 0.28 * Math.sin(f / 5);
  const caption =
    f < 56 ? 'Một người ba mươi tuổi\nchưa có nhà,' : 'không nhất thiết là người\nthất bại.';
  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.08} />
      <LampGlow opacity={0.36} x={-80} y={80} />
      <div style={{position: 'absolute', left: 126, top: 370, width: 828, height: 720}}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 245,
            width: 828,
            height: 4,
            background: INK,
            opacity: 0.45,
            transform: 'rotate(-7deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 310,
            top: 214,
            width: 230,
            height: 92,
            border: `3px solid ${RED}`,
            borderRadius: 14,
            opacity: 0.22,
            transform: 'rotate(-7deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 350,
            top: 140,
            width: `${230 + write * 74 - stop * 34}px`,
            height: 104,
            overflow: 'hidden',
            fontFamily: HAND,
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 74,
            color: RED,
            letterSpacing: 2,
            opacity: redPulse,
            transform: `rotate(-7deg) translateX(${(1 - write) * -24}px)`,
          }}
        >
          <span style={{display: 'block', width: 360}}>thất bại</span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 345,
            top: 238,
            width: `${Math.max(10, 178 * write)}px`,
            height: 9,
            borderRadius: 8,
            background: RED,
            opacity: 0.65,
            transform: 'rotate(-7deg)',
            transformOrigin: 'left center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 510,
            top: 114,
            width: 20,
            height: 180,
            borderRadius: 10,
            background: RED,
            transform: `rotate(-7deg) translateX(${write * 86}px)`,
            opacity: write * (1 - stop * 0.35),
            transformOrigin: 'bottom center',
          }}
        />
        <PencilChar x={34} y={360} s={1.08} pose="stand" enter={0} />
      </div>
      <div style={{position: 'absolute', top: 1180, left: 70, right: 70}}>
        <DbtLine
          text={caption}
          accent={f < 56 ? undefined : 'thất bại.'}
          accentColor={RED}
          size={56}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 126,
          right: 70,
          fontFamily: CAP,
          fontWeight: 600,
          fontSize: 32,
          color: '#7C858C',
          opacity: 0.8 * (1 - ramp(f, 92, 18, E_SINE)),
        }}
      >
        F31
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
