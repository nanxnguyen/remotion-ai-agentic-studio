import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const WHITE = '#FFFFFF';
const ORANGE = '#F28C52';

export const HelloWorldReel: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  const progress = interpolate(frame, [25, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const walk = Math.sin(frame * 0.14) * 12 * progress;
  const x = 330 + progress * 390;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        color: WHITE,
        fontFamily: 'Arial, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        translate: '-664.8px 3862.9px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 285,
          width: 900,
          textAlign: 'center',
          fontSize: 82,
          fontWeight: 800,
          lineHeight: 1.22,
          opacity: entrance,
        }}
      >
        Every great story
        <div style={{color: ORANGE}}>starts with a step.</div>
      </div>
      <svg
        width={900}
        height={700}
        viewBox="0 0 900 700"
        role="img"
        aria-label="A stick figure walking toward a glowing orange destination"
      >
        <line x1={90} y1={570} x2={810} y2={570} stroke="#444444" strokeWidth={6} />
        <circle cx={780} cy={520} r={22} fill={ORANGE} opacity={0.4 + progress * 0.6} />
        <g
          transform={`translate(${x}, 0)`}
          stroke={WHITE}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <circle cx={0} cy={390} r={43} />
          <line x1={0} y1={433} x2={0} y2={520} />
          <line x1={0} y1={468} x2={-55} y2={495 + walk} />
          <line x1={0} y1={468} x2={55} y2={495 - walk} />
          <line x1={0} y1={520} x2={-40} y2={570 + walk} />
          <line x1={0} y1={520} x2={40} y2={570 - walk} />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: 265,
          textAlign: 'center',
          fontSize: 40,
          letterSpacing: 3,
          color: '#BDBDBD',
        }}
      >
        BUILT WITH REMOTION · NO API KEY
      </div>
    </AbsoluteFill>
  );
};
