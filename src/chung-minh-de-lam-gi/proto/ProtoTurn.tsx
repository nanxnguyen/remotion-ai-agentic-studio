// ProtoTurn (s7b, 107f = 3.57s) — H2 "nằm trong ngực".
// Camera drifts medal up-out (opacity fade) while chest group settles in;
// orange flat shape (opacity 0.7) sits inside dashed chest outline (T7c:
// suggestive curves only, no detailed reflection). Que hand on chest.
// Caption bottom:224, "nằm trong ngực" orange.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, drift} from './tokens';
import {FONT_CSS} from './fonts';
import {Medal, Que, STAND} from './figures';
import {Caption} from './text';

export const TURN_DUR = 107;

const HAND_ON_CHEST: typeof STAND = {
  ...STAND,
  eR: [60, -60], hR: [30, -110],
};

export const ProtoTurn: React.FC = () => {
  const frame = useCurrentFrame();
  // medal drifts up and fades (opacity only — flat, T6)
  const medalOut = interpolate(frame, [10, 60], [0, 1], {...clamp, easing: drift});
  const chestIn = interpolate(frame, [18, 48], [0, 1], clamp);
  const glow = interpolate(frame, [40, 70], [0, 0.7], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
        <g opacity={1 - medalOut} transform={`translate(0 ${(-medalOut * 160).toFixed(1)})`}>
          <Medal x={540} y={560} r={120} dim={medalOut > 0.4} />
        </g>
        <g opacity={chestIn}>
          <Que x={540} y={1150} pose={HAND_ON_CHEST} s={1.25} face="droop" />
          {/* dashed chest outline on torso (below chin) + flat orange core */}
          <rect x={470} y={985} width={140} height={130} rx={40} fill="none" stroke={C.white} strokeWidth={8} strokeDasharray="22 16" />
          <ellipse cx={540} cy={1050} rx={44} ry={40} fill={C.orange} opacity={glow} />
        </g>
      </svg>
      <Caption chunks={['Nó chỉ treo yên', 'trên tường. Còn câu nói', 'vẫn nằm trong ngực.']} accents={['treo yên', 'nằm trong ngực.']} />
    </AbsoluteFill>
  );
};
