import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Vòng ba: Hà mã. Đừng để vẻ ngoài tròn trịa ăn chay đánh lừa bạn, lực cắn của nó ước tính lên tới một nghìn tám trăm P S I.';

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const creatureX = interpolate(frame, [0, 30], [1620, 1280], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="river">
      <DangerCard
        roundLabel="VÒNG 3 / HẠNG 3"
        creatureName="Hà Mã (Hippo)"
        psi={1800}
        subLabel="Ăn chay nhưng cực chiến"
        accentColor="#60A5FA"
      />
      <GagTally count={1} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={480}
          y={620}
          scale={1.18}
          mood="normal"
          pose="paddle"
          narration={NARRATION}
          bandages={1}
        />
        <CreatureArt
          kind="hippo"
          x={creatureX}
          y={590}
          scale={1.32}
          jawOpen={0.35 + Math.sin(frame * 0.1) * 0.1}
        />
      </svg>
      <SubtitleBar text="Vòng 3: Hà mã. Đừng để vẻ ngoài tròn trịa ăn chay đánh lừa, lực cắn của nó lên tới 1,800 PSI!" />
    </MascotStage>
  );
};
