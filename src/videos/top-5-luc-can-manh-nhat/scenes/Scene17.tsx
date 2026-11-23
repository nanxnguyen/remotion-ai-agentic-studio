import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ComicBurst, CreatureArt, CunBongMascot, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Kẹp! Và đó chính là lý do tôi đang nằm gọn trong hàm cá mập như cảnh đầu video. Tổng kết bốn lần băng bó toàn thân!';

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = frame < 20 ? interpolate(frame, [0, 20], [0.95, 0.58]) : 0.6;
  const shake = frame >= 18 && frame <= 36 ? 1.2 : 0;

  return (
    <MascotStage theme="ocean" shake={shake} impactFrame={18} zoom={1.1}>
      <GagTally count={4} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CreatureArt kind="shark" x={1150} y={480} scale={1.55} jawOpen={jawOpen} />
        <CunBongMascot
          x={740}
          y={530}
          scale={0.92}
          mood="dizzy"
          pose="panic"
          narration={NARRATION}
          bandages={4}
        />
      </svg>
      <ComicBurst text="KẸP!! 4/4" x={740} y={240} color="#EF4444" startFrame={18} />
      <SubtitleBar text="Kẹp! Và đó là lý do tôi nằm gọn trong hàm cá mập như đầu video. Tổng kết: 4 lần băng bó toàn thân!" />
    </MascotStage>
  );
};
