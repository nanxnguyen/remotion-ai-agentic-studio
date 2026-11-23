import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Trong thí nghiệm kéo dài nhiều năm của tiến sĩ Gregory Erickson, một con cá sấu nước mặn trưởng thành đã tạo ra hơn mười sáu nghìn Newton lực nén lên cảm biến.';

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.15, 0.75]);

  return (
    <MascotStage theme="swamp">
      <DangerCard
        roundLabel="DỮ LIỆU KHOA HỌC"
        creatureName="16,460 Newton Lực Nén"
        psi={3700}
        subLabel="TS. Gregory Erickson"
        accentColor="#A3E635"
      />
      <GagTally count={2} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={460}
          y={620}
          scale={1.16}
          mood="determined"
          pose="holdMeter"
          narration={NARRATION}
          bandages={2}
        />
        <CreatureArt kind="croc" x={1240} y={600} scale={1.42} jawOpen={jawOpen} />
      </svg>
      <SubtitleBar text="Trong thí nghiệm của TS. Gregory Erickson, cá sấu nước mặn tạo ra hơn 16,000 Newton lực nén lên cảm biến." />
    </MascotStage>
  );
};
