import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  DepthGaugeHud16x9,
  DocumentaryCaption16x9,
  GoldLowerThird16x9,
  KenBurnsMedia,
  MarineSnowLayer16x9,
} from '../kit';

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const showBio = frame >= 450;
  const crossFade = interpolate(frame, [440, 465], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {!showBio && (
        <KenBurnsMedia
          src="images/dai-duong-sau-longform/vampyroteuthis.jpg"
          startScale={1.05}
          endScale={1.18}
          panX={-20}
          panY={-10}
          brightness={0.86}
        />
      )}
      {crossFade > 0 && (
        <AbsoluteFill style={{opacity: crossFade}}>
          <KenBurnsMedia
            src="images/dai-duong-sau-longform/bioluminescence.jpg"
            startScale={1.08}
            endScale={1.2}
            panX={18}
            panY={-12}
            brightness={0.95}
          />
        </AbsoluteFill>
      )}
      <MarineSnowLayer16x9 count={42} speed={1.4} />
      <DepthGaugeHud16x9 fromDepth={1000} toDepth={2500} />
      <DocumentaryCaption16x9
        lines={[
          {
            from: 18,
            to: 440,
            text: 'Xuống 1.000–4.000 m, mực đen không còn tác dụng trong bóng tối tuyệt đối. Mực ma cà rồng chọn cách khác:',
          },
          {
            from: 455,
            to: 880,
            text: 'Thay vì phun mực đen, chúng phóng ra đám mây dịch phát sáng sinh học để làm lóa mắt kẻ thù.',
          },
        ]}
      />
      <GoldLowerThird16x9
        title="Mực ma cà rồng"
        subtitle="Vampyroteuthis infernalis · Tầng Đêm Thẳm (1.000 – 4.000 m)"
        enterFrame={15}
      />
    </AbsoluteFill>
  );
};
