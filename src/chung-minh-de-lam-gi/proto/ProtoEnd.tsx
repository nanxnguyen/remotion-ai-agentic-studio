// ProtoEnd (s11, 162f = 5.41s) — open question + 2.0s pure silence hold.
// Wide frame: que center, medal still in hand (not discarded), other hand on
// chest; ghost chair turned back toward que. Push-in 1.00->1.03 during the line,
// then DEAD STILL for the final 60f (R1 hold >=1s; silence hold is the climax).
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './tokens';
import {FONT_CSS} from './fonts';
import {Chair, Medal, Que, STAND} from './figures';
import {Headline, Rule} from './text';

export const END_DUR = 162;

const HOLD_FROM = 102; // push ends, stillness begins (last 60f = 2.0s)

export const ProtoEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / HOLD_FROM);
  const zoom = 1 + 0.03 * p;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <Headline
          lines={['Nếu từ mai không cần', 'cho ai thấy nữa, bạn', 'giữ lại điều gì?']}
          accents={['giữ', 'lại', 'điều', 'gì?']}
          instant size={72}
        />
        <Rule instant />
        <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
          <Que x={470} y={1180} pose={{...STAND, eR: [60, -60], hR: [30, -110]}} s={1.2} face="calm" />
          <Medal x={330} y={1010} r={64} />
          <Chair x={730} y={1420} s={0.8} opacity={0.28} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
