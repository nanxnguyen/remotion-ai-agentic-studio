import React from 'react';
import {
  CunBongMascot,
  MascotStage,
  MicrobeSwarmProp,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Mốc bốn mươi tám giờ: Hệ miễn dịch bắt đầu sụt giảm nghiêm trọng. Tế bào bạch cầu mất phương hướng, tạo cơ hội cho vi khuẩn và cảm cúm tấn công ồ ạt.';

export const Scene05: React.FC = () => {
  return (
    <MascotStage theme="swamp" zoom={1.06}>
      <SleepClockCard
        hours={48}
        dayLabel="MỐC 2 / NGÀY 2"
        title="Hệ Miễn Dịch Suy Giảm"
        batteryPct={55}
        accentColor="#A3E635"
      />
      <TiredEyesOverlay level={6} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={580}
          y={620}
          scale={1.22}
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={1}
        />
        <MicrobeSwarmProp x={1280} y={540} />
      </svg>
      <SubtitleBar text="Mốc 48 giờ: Hệ miễn dịch sụt giảm mạnh, vi khuẩn và cảm cúm tấn công ồ ạt!" />
    </MascotStage>
  );
};
