import React from 'react';
import {
  ComicBurst,
  CunBongMascot,
  MascotStage,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Và tại mốc mười một ngày, hai trăm sáu mươi bốn giờ: Pin não chỉ còn một phần trăm. Hệ thần kinh đứng trước nguy cơ sụp đổ hoàn toàn.';

export const Scene11: React.FC = () => {
  return (
    <MascotStage theme="ocean" shake={0.45} impactFrame={20} zoom={1.1}>
      <SleepClockCard
        hours={264}
        dayLabel="MỐC CUỐI / NGÀY 11"
        title="Nguy Cơ Sụp Đổ Thần Kinh"
        batteryPct={1}
        accentColor="#EF4444"
      />
      <TiredEyesOverlay level={15} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={920}
          y={620}
          scale={1.32}
          mood="dizzy"
          pose="panic"
          narration={NARRATION}
          bandages={4}
          swollen
        />
      </svg>
      <ComicBurst text="PIN 1%!!" x={1320} y={340} color="#EF4444" startFrame={20} />
      <SubtitleBar text="Mốc 11 ngày (264 giờ): Pin não chỉ còn 1%. Hệ thần kinh đứng trước nguy cơ sụp đổ!" />
    </MascotStage>
  );
};
