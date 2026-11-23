import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{opacity: fadeIn}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-longform/reef-squid.jpg"
        startScale={1.04}
        endScale={1.16}
        panX={24}
        panY={-12}
        brightness={0.96}
      />
      <MarineSnowLayer16x9 count={24} speed={0.9} />
      <DepthGaugeHud16x9 fromDepth={0} toDepth={200} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 18,
            to: 410,
            text: 'Tầng nước nông (0–200 m) tràn ngập ánh nắng. Mực dùng hàng triệu tế bào sắc tố để đổi màu chớp nhoáng.',
          },
          {
            from: 420,
            to: 825,
            text: 'Nhưng khi mặt trời biến mất dưới mốc 200 m, lớp áo ngụy trang sặc sỡ ấy trở nên vô nghĩa.',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="0 – 200 m"
        subtitle="TẦNG NƯỚC NÓNG · Mực rạn san hô (Sepioteuthis sepioidea)"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
