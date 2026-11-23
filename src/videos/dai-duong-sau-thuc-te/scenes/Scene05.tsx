import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud,
  GoldLowerThird,
  KenBurnsMedia,
  MarineSnowLayer,
  NarrationCaption,
} from '../kit';

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [450, 479], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-thuc-te/magnapinna.jpg"
        startScale={1.04}
        endScale={1.22}
        panX={14}
        panY={-20}
        brightness={0.94}
      />
      <MarineSnowLayer count={40} speed={2.2} />
      <DepthGaugeHud fromDepth={4000} toDepth={6500} />
      <NarrationCaption
        text="Dưới 6.000 m, cánh tay dài hàng mét giúp Magnapinna giăng bẫy mà gần như không tốn sức."
        top={165}
      />
      <GoldLowerThird
        title="4.000 – 6.000 m+"
        subtitle="TẦNG VỰC THẲM · Hình dáng kỳ dị là bản thiết kế sinh tồn tối ưu"
        enterFrame={10}
      />
    </AbsoluteFill>
  );
};
