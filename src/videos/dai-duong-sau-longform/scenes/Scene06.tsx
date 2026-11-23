import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{opacity: fadeIn}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-longform/giant-squid.jpg"
        startScale={1.04}
        endScale={1.16}
        panX={22}
        panY={-14}
        brightness={0.88}
      />
      <MarineSnowLayer16x9 count={44} speed={1.6} />
      <DepthGaugeHud16x9 fromDepth={2500} toDepth={4000} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 18,
            to: 440,
            text: 'Càng xuống sâu, nhiệt độ giảm sát 0°C và thức ăn khan hiếm buộc cơ thể phải to lớn để giữ nhiệt & tích trữ năng lượng.',
          },
          {
            from: 455,
            to: 880,
            text: 'Mực khổng lồ (Architeuthis) dài hơn xe buýt, sở hữu đôi mắt to bằng chiếc đĩa ăn cơm để thu từng photon ánh sáng.',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="Mực khổng lồ"
        subtitle="Architeuthis dux · mắt đường kính tới 27 cm"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
