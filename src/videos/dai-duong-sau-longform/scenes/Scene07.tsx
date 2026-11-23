import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [855, 899], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-longform/magnapinna.jpg"
        startScale={1.04}
        endScale={1.2}
        panX={18}
        panY={-16}
        brightness={0.95}
      />
      <MarineSnowLayer16x9 count={48} speed={1.8} />
      <DepthGaugeHud16x9 fromDepth={4000} toDepth={6500} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 18,
            to: 440,
            text: 'Dưới 4.000–6.000 m, áp suất gấp hàng trăm lần mặt nước. Bơi đuổi mồi trở thành sự lãng phí năng lượng chết người.',
          },
          {
            from: 455,
            to: 860,
            text: 'Magnapinna buông thõng đôi tay dài hàng mét như mạng nhện trôi giữa vực thẳm — kỳ dị, nhưng là thiết kế sinh tồn hoàn hảo.',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="4.000 – 6.000 m+"
        subtitle="TẦNG VỰC THẲM · Ánh sáng · Thức ăn · Áp suất · Nơi ẩn nấp"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
