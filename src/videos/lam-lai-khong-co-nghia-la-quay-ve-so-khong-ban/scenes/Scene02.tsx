import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {riseStyle} from '../../../core';

export const Scene02 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg,#1f2433 0%,#2e261a 100%)',
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
        Nhưng chính những <span style={{color: '#F58B4C'}}>thất bại đó</span> đã dạy bạn điều bạn
        thực sự <span style={{color: '#F58B4C'}}>không muốn</span>.
      </div>
    </AbsoluteFill>
  );
};
