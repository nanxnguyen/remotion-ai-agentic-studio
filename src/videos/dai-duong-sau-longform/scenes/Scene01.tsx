import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{opacity: fadeIn}}>
      <KenBurnsMedia
        src="images/dai-duong-sau-longform/magnapinna.jpg"
        startScale={1.12}
        endScale={1.28}
        panX={-24}
        panY={-16}
        brightness={0.94}
      />
      <MarineSnowLayer16x9 count={42} speed={1.5} />
      <DepthGaugeHud16x9 fromDepth={6200} toDepth={6200} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 10,
            to: 150,
            text: 'Ở độ sâu hơn 6.000 mét, tàu lặn bắt gặp một sinh vật có cánh tay dài như sợi dây...',
          },
          {
            from: 155,
            to: 295,
            text: 'Vì sao càng xuống sâu, loài mực lại tiến hóa càng kỳ quái đến vậy?',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="Magnapinna"
        subtitle="mực vây lớn (bigfin squid) · ghi hình ở tầng vực thẳm"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
