import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  DepthGaugeHud,
  GoldLowerThird,
  KenBurnsMedia,
  MarineSnowLayer,
  NarrationCaption,
} from '../kit';

export const Scene04: React.FC = () => {
  return (
    <AbsoluteFill>
      <KenBurnsMedia
        src="images/dai-duong-sau-thuc-te/vampyroteuthis.jpg"
        startScale={1.08}
        endScale={1.22}
        panX={-18}
        panY={-12}
        brightness={0.86}
      />
      <MarineSnowLayer count={34} speed={1.9} />
      <DepthGaugeHud fromDepth={1000} toDepth={4000} />
      <NarrationCaption
        text="Tầng Đêm Thẳm: thiếu oxy & tối đen khiến loài mực tiết dịch phát sáng đánh lạc hướng."
        top={165}
      />
      <GoldLowerThird
        title="Mực ma cà rồng"
        subtitle="Vampyroteuthis infernalis · Tầng Đêm Thẳm (1.000 – 4.000 m)"
        enterFrame={10}
      />
    </AbsoluteFill>
  );
};
