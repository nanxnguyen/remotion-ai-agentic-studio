import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{opacity: fadeIn}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-longform/cranchiidae.jpg"
        startScale={1.05}
        endScale={1.18}
        panX={0}
        panY={-20}
        brightness={0.93}
      />
      <MarineSnowLayer16x9 count={34} speed={1.2} />
      <DepthGaugeHud16x9 fromDepth={200} toDepth={1000} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 18,
            to: 440,
            text: 'Ở tầng Hoàng Hôn (200–1.000 m), kẻ săn mồi ngước nhìn lên để tìm bóng đen in trên nền sáng yếu ớt.',
          },
          {
            from: 450,
            to: 880,
            text: 'Giải pháp của Mực thủy tinh: loại bỏ sắc tố, biến toàn bộ cơ thể thành gần như trong suốt.',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="Mực thủy tinh"
        subtitle="họ Cranchiidae · thân gần như trong suốt (200 – 1.000 m)"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
