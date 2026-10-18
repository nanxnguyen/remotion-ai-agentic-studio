import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {riseStyle} from '../../../core';

export const Scene03 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg,#22283a 0%,#332a1c 100%)',
        color: '#f5efe6',
        fontFamily: 'system-ui, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 600,
          lineHeight: 1.25,
          textAlign: 'center',
          ...riseStyle(frame, {dur: 20}),
        }}
      >
        Và điều đó <span style={{color: '#F58B4C'}}>đủ để</span> bạn chọn một{' '}
        <span style={{color: '#F58B4C'}}>con đường khác</span>.
      </div>
    </AbsoluteFill>
  );
};
