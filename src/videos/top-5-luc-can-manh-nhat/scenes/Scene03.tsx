import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Đối thủ đầu tiên: Linh cẩu đốm. Lực cắn đo được lên tới một nghìn một trăm P S I, tương đương bốn nghìn năm trăm Newton.';

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const creatureX = interpolate(frame, [0, 30], [1620, 1280], {extrapolateRight: 'clamp'});
  const jawOpen = 0.35 + Math.sin(frame * 0.16) * 0.15;

  return (
    <MascotStage theme="savanna">
      <DangerCard
        roundLabel="VÒNG 1 / HẠNG 5"
        creatureName="Linh Cẩu Đốm"
        psi={1100}
        subLabel="~4,500 Newton"
        accentColor="#F59E0B"
      />
      <GagTally count={0} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={500}
          y={620}
          scale={1.18}
          mood="normal"
          pose="point"
          narration={NARRATION}
        />
        <CreatureArt kind="hyena" x={creatureX} y={590} scale={1.35} jawOpen={jawOpen} />
      </svg>
      <SubtitleBar text="Đối thủ đầu tiên: Linh cẩu đốm. Lực cắn lên tới 1,100 PSI (~4,500 Newton)." />
    </MascotStage>
  );
};
