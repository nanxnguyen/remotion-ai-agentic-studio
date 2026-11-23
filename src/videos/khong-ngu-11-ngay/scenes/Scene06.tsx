import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  ComicBurst,
  CunBongMascot,
  MascotStage,
  SleepClockCard,
  SubtitleBar,
  TiredEyesOverlay,
} from '../kit';

const NARRATION =
  'Mốc bảy mươi hai giờ: Cơ thể rơi vào trạng thái vi giấc ngủ. Não bộ tự động sập nguồn ba đến năm giây ngay cả khi mắt bạn vẫn đang mở to!';

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const blackout = frame >= 60 && frame <= 85;
  return (
    <MascotStage theme="savanna" zoom={1.07}>
      <SleepClockCard
        hours={72}
        dayLabel="MỐC 3 / NGÀY 3"
        title="Vi Giấc Ngủ (Microsleep 3-5s)"
        batteryPct={38}
        accentColor="#F59E0B"
      />
      <TiredEyesOverlay level={9} />
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
          mood={blackout ? 'dizzy' : 'wide'}
          pose="idle"
          narration={NARRATION}
          bandages={1}
        />
      </svg>
      {blackout && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            pointerEvents: 'none',
          }}
        />
      )}
      <ComicBurst text="SẬP NGUỒN 3S" x={1350} y={360} color="#F59E0B" startFrame={58} />
      <SubtitleBar text="Mốc 72 giờ: Não tự động sập nguồn 3 đến 5 giây ngay cả khi mắt vẫn đang mở to!" />
    </MascotStage>
  );
};
