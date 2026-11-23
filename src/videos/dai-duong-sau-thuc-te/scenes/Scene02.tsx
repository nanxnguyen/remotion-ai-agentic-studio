import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud,
  GoldLowerThird,
  KenBurnsMedia,
  MarineSnowLayer,
  NarrationCaption,
  OceanBuildingInfographic,
} from '../kit';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  // First 210 frames (7s): Building Infographic; next 180 frames (6s): Sunlit reef squid 0-200m
  const showReef = frame >= 210;
  const crossFade = interpolate(frame, [202, 218], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {!showReef && <OceanBuildingInfographic />}
      {crossFade > 0 && (
        <AbsoluteFill style={{opacity: crossFade}}>
          <KenBurnsMedia
            src="images/dai-duong-sau-thuc-te/reef-squid.jpg"
            startScale={1.06}
            endScale={1.18}
            panX={20}
            panY={-10}
            brightness={0.96}
          />
          <MarineSnowLayer count={18} speed={1.1} />
          <DepthGaugeHud fromDepth={0} toDepth={200} />
          <NarrationCaption
            text="Ở tầng nước nông, mực dùng sắc tố đổi màu để ngụy trang."
            top={165}
          />
          <GoldLowerThird
            title="0 – 200 m"
            subtitle="TẦNG NƯỚC NÓNG · Mực rạn san hô (Sepioteuthis)"
            enterFrame={220}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
