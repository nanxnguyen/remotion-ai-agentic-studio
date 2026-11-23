import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Hà mã có thể há miệng rộng gần một trăm năm mươi độ, kết hợp cùng khối cơ hàm khổng lồ đủ sức bẻ gãy đôi một chiếc xuồng gỗ.';

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = interpolate(frame, [0, 45], [0.2, 1.0], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="river">
      <DangerCard
        roundLabel="HÁ MIỆNG 150 ĐỘ"
        creatureName="Cơ Hàm Khổng Lồ"
        psi={1800}
        subLabel="Bẻ gãy đôi xuồng gỗ"
        accentColor="#60A5FA"
      />
      <GagTally count={1} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={470}
          y={630}
          scale={1.16}
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={1}
        />
        <CreatureArt kind="hippo" x={1250} y={580} scale={1.4} jawOpen={jawOpen} />
      </svg>
      <SubtitleBar text="Hà mã có thể há miệng rộng gần 150 độ, đủ sức bẻ gãy đôi một chiếc xuồng gỗ." />
    </MascotStage>
  );
};
