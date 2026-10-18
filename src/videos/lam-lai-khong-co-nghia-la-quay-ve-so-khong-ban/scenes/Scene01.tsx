import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {riseStyle} from '../../../core';

export const Scene01 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg,#1a1f2e 0%,#2a2418 100%)',
        color: '#f5efe6',
        fontFamily: 'system-ui, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.25,
          textAlign: 'center',
          ...riseStyle(frame, {dur: 20}),
        }}
      >
        Bạn có thể đã từng gọi những năm vừa qua là <span style={{color: '#F58B4C'}}>công cốc</span>
        .
      </div>
    </AbsoluteFill>
  );
};
