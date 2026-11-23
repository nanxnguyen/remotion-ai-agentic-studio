import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {DiverHookSvg} from '../creatures';
import {DepthStage, ScaleCaption} from '../kit';

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const diverScale = interpolate(frame, [0, 90], [0.95, 1.08]);

  return (
    <DepthStage
      depthMeters={0}
      backgroundGradient="linear-gradient(180deg, #06b6d4 0%, #0369a1 45%, #0f172a 100%)"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${diverScale})`,
        }}
      >
        <DiverHookSvg frame={frame} />
      </div>

      <ScaleCaption
        top={420}
        segments={[
          {text: 'ĐẠI DƯƠNG THỰC SỰ', startFrame: 0, endFrame: 42},
          {text: 'SÂU ĐẾN MỨC NÀO?', startFrame: 42, endFrame: 90, accentColor: '#fde047'},
        ]}
      />
    </DepthStage>
  );
};
