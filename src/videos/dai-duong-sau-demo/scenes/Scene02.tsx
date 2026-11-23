import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {StingraySvg, TropicalFishSvg} from '../creatures';
import {DepthBadge, DepthStage, ScaleCaption} from '../kit';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const depth = interpolate(frame, [0, 180], [0, 100], {
    easing: Easing.inOut(Easing.quad),
  });

  // 0-90: Tropical Fish; 90-180: Stingray rises as fish scrolls up
  const fishY = interpolate(frame, [0, 22, 85, 115], [1400, 860, 820, -450], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rayY = interpolate(frame, [78, 112, 165, 180], [1850, 780, 740, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const is100m = frame >= 85;

  return (
    <DepthStage depthMeters={depth}>
      <DepthBadge label={is100m ? '100 MÉT' : 'MẶT BIỂN'} triggerFrame={is100m ? 85 : 0} />

      <div
        style={{
          position: 'absolute',
          left: 260,
          top: fishY,
        }}
      >
        <TropicalFishSvg frame={frame} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 230,
          top: rayY,
        }}
      >
        <StingraySvg frame={frame} />
      </div>

      <ScaleCaption
        top={340}
        segments={[
          {text: 'Ở MẶT BIỂN', startFrame: 0, endFrame: 35},
          {text: 'NHỮNG SINH VẬT QUEN THUỘC', startFrame: 35, endFrame: 85},
          {text: 'XUỐNG 100 MÉT', startFrame: 85, endFrame: 125, accentColor: '#fde047'},
          {text: 'BẠN SẼ BẮT GẶP CÁ ĐUỐI', startFrame: 125, endFrame: 180},
        ]}
      />
    </DepthStage>
  );
};
