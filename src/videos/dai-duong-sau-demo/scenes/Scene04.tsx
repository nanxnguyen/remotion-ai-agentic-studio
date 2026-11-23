import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {SpiderCrabScaleSvg} from '../creatures';
import {DepthBadge, DepthStage, ScaleCaption} from '../kit';

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const depth = interpolate(frame, [0, 210], [332, 632], {
    easing: Easing.inOut(Easing.quad),
  });

  const crabY = interpolate(frame, [0, 35, 192, 210], [1900, 740, 720, -820], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <DepthStage depthMeters={depth}>
      <DepthBadge label="632 MÉT" triggerFrame={0} />

      <div style={{position: 'absolute', left: 130, top: crabY}}>
        <SpiderCrabScaleSvg frame={frame} />
      </div>

      <ScaleCaption
        top={340}
        segments={[
          {text: 'XUỐNG TỚI 632 MÉT', startFrame: 0, endFrame: 60},
          {text: 'CUA NHỆN KHỔNG LỒ', startFrame: 60, endFrame: 130, accentColor: '#fb923c'},
          {text: 'SẢI CHÂN TỚI 3,8 MÉT', startFrame: 130, endFrame: 210, accentColor: '#fde047'},
        ]}
      />
    </DepthStage>
  );
};
