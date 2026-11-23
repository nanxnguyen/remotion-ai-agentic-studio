import React from 'react';
import {
  CoffeeStackProp,
  CunBongMascot,
  MascotStage,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Mốc hai mươi bốn giờ: Pin não bộ tụt xuống tám mươi phần trăm. Phản xạ lúc này chậm ngang ngửa một người đang say rượu với nồng độ cồn không phẩy một phần trăm.';

export const Scene03: React.FC = () => {
  return (
    <MascotStage theme="river" zoom={1.06}>
      <SleepClockCard
        hours={24}
        dayLabel="MỐC 1 / NGÀY 1"
        title="Phản Xạ Ngang Say Rượu (0.1% Cồn)"
        batteryPct={80}
        accentColor="#38BDF8"
      />
      <TiredEyesOverlay level={3} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CoffeeStackProp x={1360} y={760} count={3} />
        <CunBongMascot
          x={720}
          y={620}
          scale={1.25}
          mood="dizzy"
          pose="idle"
          narration={NARRATION}
        />
      </svg>
      <SubtitleBar text="Mốc 24 giờ: Pin não tụt xuống 80%. Phản xạ chậm ngang người say rượu 0.1% cồn!" />
    </MascotStage>
  );
};
