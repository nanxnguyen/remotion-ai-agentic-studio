import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  DepthGaugeHud,
  GoldLowerThird,
  KenBurnsMedia,
  MarineSnowLayer,
  NarrationCaption,
} from '../kit';

export const Scene03: React.FC = () => {
  return (
    <AbsoluteFill>
      <KenBurnsMedia
        src="images/dai-duong-sau-thuc-te/cranchiidae.jpg"
        startScale={1.05}
        endScale={1.2}
        panX={0}
        panY={-26}
        brightness={0.94}
      />
      <MarineSnowLayer count={26} speed={1.6} />
      <DepthGaugeHud fromDepth={200} toDepth={1000} />
      <NarrationCaption
        text="Xuống 200–1.000 m, ánh sáng tắt dần — mực hóa thân trong suốt như thủy tinh."
        top={165}
      />
      <GoldLowerThird
        title="Mực thủy tinh"
        subtitle="Họ Cranchiidae · Tầng Hoàng Hôn (200 – 1.000 m)"
        enterFrame={10}
      />
    </AbsoluteFill>
  );
};
