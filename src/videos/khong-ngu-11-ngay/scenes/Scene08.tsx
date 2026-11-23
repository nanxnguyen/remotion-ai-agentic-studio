import React from 'react';
import {
  CunBongMascot,
  MascotStage,
  ShadowMonsterProp,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Mốc một trăm hai mươi giờ, tức năm ngày thức trắng: Não thiếu ngủ sinh ra ảo giác thị giác. Mọi đồ vật bình thường bắt đầu méo mó như quái vật.';

export const Scene08: React.FC = () => {
  return (
    <MascotStage theme="ocean" zoom={1.08}>
      <SleepClockCard
        hours={120}
        dayLabel="MỐC 4 / NGÀY 5"
        title="Ảo Giác Thị Giác Nặng"
        batteryPct={22}
        accentColor="#A855F7"
      />
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
          scale={1.24}
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={2}
        />
        <ShadowMonsterProp x={1320} y={560} />
      </svg>
      <SubtitleBar text="Mốc 120 giờ (5 ngày): Não sinh ảo giác thị giác, đồ vật méo mó như quái vật!" />
    </MascotStage>
  );
};
