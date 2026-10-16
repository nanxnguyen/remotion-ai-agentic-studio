import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const EditorialQuoteReel: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const underline = interpolate(frame, [35, 90], [0, 660], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{width: 820, fontWeight: 800, fontSize: 100, lineHeight: 1.14, opacity: reveal}}>
        <div>Small steps.</div>
        <div style={{color: '#F28C52'}}>Big changes.</div>
        <svg width={720} height={36} viewBox="0 0 720 36" aria-label="Underline reveal">
          <line
            x1={0}
            y1={20}
            x2={underline}
            y2={20}
            stroke="#F28C52"
            strokeWidth={8}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          fontSize: 38,
          letterSpacing: 6,
          color: '#BDBDBD',
        }}
      >
        EDITORIAL · REMOTION
      </div>
    </AbsoluteFill>
  );
};
