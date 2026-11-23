import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ComicBurst, CunBongMascot, MascotStage, SubtitleBar, TiredEyesOverlay} from '../kit';

const NARRATION =
  'Tôi định rót thêm ly cà phê cho tỉnh, ai ngờ tay run quá rót trượt thẳng ra ngoài bàn luôn!';

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <MascotStage
      theme="river"
      shake={frame >= 22 && frame <= 36 ? 0.6 : 0}
      impactFrame={22}
      zoom={1.08}
    >
      <TiredEyesOverlay level={4} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        {/* Spilled coffee puddle */}
        <ellipse
          cx={1160}
          cy={790}
          rx={frame > 22 ? 170 : 30}
          ry={28}
          fill="#451A03"
          opacity={0.85}
        />
        <CunBongMascot
          x={680}
          y={620}
          scale={1.28}
          mood="wide"
          pose="panic"
          narration={NARRATION}
        />
      </svg>
      <ComicBurst text="TRƯỢT!!" x={1150} y={520} color="#F59E0B" startFrame={22} />
      <SubtitleBar text="Định rót thêm ly cà phê cho tỉnh, ai ngờ tay run quá rót trượt ra ngoài bàn!" />
    </MascotStage>
  );
};
