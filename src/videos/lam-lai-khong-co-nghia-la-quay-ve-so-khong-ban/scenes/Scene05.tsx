import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const Scene05 = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#2a3020 0%,#1f2a18 100%)', color: '#f5efe6', fontFamily: 'system-ui, sans-serif', justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{fontSize: 52, fontWeight: 600, lineHeight: 1.25, textAlign: 'center', opacity: reveal}}>
        Mà là <span style={{color: '#F58B4C'}}>bắt đầu</span> từ những gì bạn đã <span style={{color: '#F58B4C'}}>học</span>.
      </div>
    </AbsoluteFill>
  );
};
