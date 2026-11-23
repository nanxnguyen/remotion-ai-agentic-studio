import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {OceanBuildingInfographic16x9} from '../kit';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [635, 659], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <OceanBuildingInfographic16x9 />
    </AbsoluteFill>
  );
};
