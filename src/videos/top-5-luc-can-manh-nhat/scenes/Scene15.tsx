import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Và trùm cuối: Cá mập trắng lớn. Theo mô phỏng chụp cắt lớp ba chiều trên cá thể khổng lồ dài hơn sáu mét, lực cắn có thể đạt tới bốn nghìn P S I.';

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const creatureX = interpolate(frame, [0, 35], [1640, 1250], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="ocean">
      <DangerCard
        roundLabel="TRÙM CUỐI / HẠNG 1"
        creatureName="Cá Mập Trắng Lớn"
        psi={4000}
        subLabel="Mô phỏng CT 3D (6m+)"
        accentColor="#22D3EE"
      />
      <GagTally count={3} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={460}
          y={620}
          scale={1.15}
          mood="wide"
          pose="point"
          narration={NARRATION}
          bandages={3}
        />
        <CreatureArt kind="shark" x={creatureX} y={550} scale={1.42} jawOpen={0.45} ctScan />
      </svg>
      <SubtitleBar text="Và trùm cuối: Cá mập trắng lớn. Mô phỏng CT 3D trên cá thể dài hơn 6 mét đạt tới 4,000 PSI!" />
    </MascotStage>
  );
};
