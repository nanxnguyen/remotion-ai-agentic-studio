import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const Scene04 = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#2a2418 0%,#3a2e1a 100%)', color: '#ffffff', fontFamily: 'system-ui, sans-serif', justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{fontSize: 64, fontWeight: 800, lineHeight: 1.2, textAlign: 'center', opacity: reveal}}>
        Làm lại không có nghĩa là quay về <span style={{color: '#F58B4C'}}>số không</span>.
      </div>
    </AbsoluteFill>
  );
};
