import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  ComicBurst,
  CunBongMascot,
  MascotStage,
  ShadowMonsterProp,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Tôi tưởng cái ghế trước mặt biến thành con quái vật ba mắt nên hét toáng lên, hàng xóm tưởng nhà có biến!';

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const revealChair = frame >= 60;
  return (
    <MascotStage
      theme="ocean"
      shake={frame >= 15 && frame <= 32 ? 0.9 : 0}
      impactFrame={15}
      zoom={1.08}
    >
      <TiredEyesOverlay level={12} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={540}
          y={620}
          scale={1.26}
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={3}
        />
        {!revealChair ? (
          <ShadowMonsterProp x={1320} y={560} />
        ) : (
          <g transform="translate(1320, 620)">
            <rect
              x={-70}
              y={-90}
              width={140}
              height={120}
              rx={12}
              fill="#92400E"
              stroke="#451A03"
              strokeWidth={6}
            />
            <rect
              x={-80}
              y={30}
              width={160}
              height={24}
              rx={8}
              fill="#B45309"
              stroke="#451A03"
              strokeWidth={5}
            />
            <rect
              x={-65}
              y={54}
              width={22}
              height={110}
              fill="#78350F"
              stroke="#451A03"
              strokeWidth={5}
            />
            <rect
              x={43}
              y={54}
              width={22}
              height={110}
              fill="#78350F"
              stroke="#451A03"
              strokeWidth={5}
            />
          </g>
        )}
      </svg>
      <ComicBurst text="ÁAAA!!" x={760} y={320} color="#A855F7" startFrame={15} />
      <SubtitleBar text="Tưởng cái ghế thành quái vật ba mắt nên hét toáng lên, hàng xóm tưởng có biến!" />
    </MascotStage>
  );
};
