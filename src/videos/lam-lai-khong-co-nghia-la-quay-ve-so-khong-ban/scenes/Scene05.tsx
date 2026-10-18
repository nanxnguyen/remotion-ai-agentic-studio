import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {riseStyle} from '../../../core';

export const Scene05 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg,#2a3020 0%,#1f2a18 100%)',
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
        Mà là <span style={{color: '#F58B4C'}}>bắt đầu</span> từ những gì bạn đã{' '}
        <span style={{color: '#F58B4C'}}>học</span>.
      </div>
    </AbsoluteFill>
  );
};
