import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ComicBurst, CreatureArt, CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Khoan đã! Nếu bạn đang thắc mắc tại sao tôi lại nằm kẹt giữa hàm cá mập trắng khổng lồ thế này, thì mọi chuyện bắt đầu từ một thử nghiệm cực kỳ ngớ ngẩn cách đây ba phút.';

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = interpolate(Math.sin(frame * 0.14), [-1, 1], [0.55, 0.72]);
  const shake = frame < 20 ? 0.5 : 0;

  return (
    <MascotStage theme="ocean" shake={shake}>
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
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={4}
        />
      </svg>
      <ComicBurst text="KẸP!!" x={720} y={240} color="#EF4444" startFrame={6} />
      <SubtitleBar text="Khoan đã! Nếu bạn đang thắc mắc tại sao tôi lại nằm kẹt giữa hàm cá mập trắng khổng lồ thế này..." />
    </MascotStage>
  );
};
