import React from 'react';
import {CunBongMascot, MascotStage, SleepClockCard, SubtitleBar, TiredEyesOverlay} from '../kit';

const NARRATION =
  'Mốc bảy ngày không ngủ: Trí nhớ ngắn hạn gần như xóa sạch, nói năng lắp bắp và cơ thể bắt đầu tự phá hủy mô cơ để kiếm năng lượng.';

export const Scene10: React.FC = () => {
  return (
    <MascotStage theme="amazon" zoom={1.07}>
      <SleepClockCard
        hours={168}
        dayLabel="MỐC 5 / NGÀY 7"
        title="Xóa Trí Nhớ & Hủy Mô Cơ"
        batteryPct={10}
        accentColor="#F97316"
      />
      <TiredEyesOverlay level={14} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={940}
          y={620}
          scale={1.28}
          mood="dizzy"
          pose="idle"
          narration={NARRATION}
          bandages={3}
        />
      </svg>
      <SubtitleBar text="Mốc 7 ngày: Trí nhớ ngắn hạn xóa sạch, nói lắp bắp và cơ thể tự phá hủy mô cơ!" />
    </MascotStage>
  );
};
