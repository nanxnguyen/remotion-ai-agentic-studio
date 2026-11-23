import React from 'react';
import {
  CoffeeStackProp,
  ComicBurst,
  CunBongMascot,
  MascotStage,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Ê khoan! Nếu bạn thấy tôi mắt thâm như gấu trúc bên mười lăm ly cà phê thế này, thì đây là kết quả sau hai trăm sáu mươi bốn giờ thức trắng liên tiếp!';

export const Scene01: React.FC = () => {
  return (
    <MascotStage theme="studio" shake={0.35} impactFrame={8} zoom={1.08}>
      <SleepClockCard
        hours={264}
        dayLabel="NGÀY 11 / KHẨN CẤP"
        title="CẢNH BÁO SẬP NGUỒN!"
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
        <CoffeeStackProp x={1350} y={760} count={9} />
        <CunBongMascot
          x={840}
          y={620}
          scale={1.32}
          mood="dizzy"
          pose="panic"
          narration={NARRATION}
          bandages={2}
        />
      </svg>
      <ComicBurst text="264 GIỜ!!" x={1150} y={320} color="#EF4444" startFrame={8} />
      <SubtitleBar text="Nếu bạn thấy tôi bên 15 ly cà phê thế này, đây là kết quả sau 264 giờ thức trắng!" />
    </MascotStage>
  );
};
