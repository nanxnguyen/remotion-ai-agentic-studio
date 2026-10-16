// S2bClose (s2b build staging, 88f = 2.93s) — T2 evidence.
// Face close-up: Que s=3.0 → face 336px wide; smirk asymmetry (one eye 8px low
// at unit scale = 24px rendered) legible at 480px phone width.
// Bubble carries pack-exact old quote; MinhHoa tag adjacent (T1).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp} from './tokens';
import {FONT_CSS} from './fonts';
import {Bubble, Que} from './figures';
import {Caption, MinhHoa} from './text';

export const S2B_DUR = 88;

export const S2bClose: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = interpolate(frame, [0, 14], [0.92, 1], clamp);
  const bubbleIn = interpolate(frame, [30, 39], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${settle.toFixed(4)})`}}>
        <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
          <g opacity={bubbleIn}>
            <Bubble x={540} y={300} w={620} h={170} lines={['nó thì làm được gì']} size={46} />
          </g>
          <Que x={540} y={1350} s={3.0} face="smirk" />
        </svg>
        <MinhHoa y={470} />
      </AbsoluteFill>
      <Caption chunks={['Ai đó cười khẩy', 'thành tiếng: nó thì', 'làm được gì.']} accents={['làm được gì.']} band />
    </AbsoluteFill>
  );
};
