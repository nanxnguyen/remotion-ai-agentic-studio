import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Scene as BaseScene } from '../scenes';

export const Scene: React.FC = () => (
  <>
    <BaseScene index={6} />
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
        <rect x="100" y="100" width="100" height="100" fill="#E8A87C" opacity="0.1" />
      </svg>
    </AbsoluteFill>
  </>
);
