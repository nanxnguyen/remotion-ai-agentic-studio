import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud,
  GoldLowerThird,
  KenBurnsMedia,
  MarineSnowLayer,
  NarrationCaption,
} from '../kit';

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const flashOpacity = interpolate(frame, [0, 12], [0.55, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <KenBurnsMedia
        src="images/dai-duong-sau-thuc-te/magnapinna.jpg"
        startScale={1.15}
        endScale={1.32}
        panX={-16}
        panY={-24}
        brightness={0.95}
      />
      <MarineSnowLayer count={32} speed={2.2} />
      <DepthGaugeHud fromDepth={6200} toDepth={6200} />
      <NarrationCaption
        text="Càng xuống sâu, loài mực càng giống sinh vật ngoài hành tinh?"
        top={165}
      />
      <GoldLowerThird
        title="Magnapinna"
        subtitle="Mực vây lớn · ghi hình ở độ sâu > 6.000 m"
        enterFrame={10}
      />
      <AbsoluteFill
        style={{backgroundColor: '#000', opacity: flashOpacity, pointerEvents: 'none'}}
      />
    </AbsoluteFill>
  );
};
