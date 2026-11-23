import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Vòng hai: Báo đốm Mỹ. Với khoảng một nghìn năm trăm P S I, đây là loài có lực cắn mạnh nhất trong toàn bộ họ nhà mèo.';

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const creatureX = interpolate(frame, [0, 30], [1600, 1260], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="amazon">
      <DangerCard
        roundLabel="VÒNG 2 / HẠNG 4"
        creatureName="Báo Đốm Mỹ (Jaguar)"
        psi={1500}
        subLabel="Vua họ nhà mèo"
        accentColor="#34D399"
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
          turtleShell
        />
        <CreatureArt
          kind="jaguar"
          x={creatureX}
          y={590}
          scale={1.35}
          jawOpen={0.45 + Math.sin(frame * 0.14) * 0.12}
        />
      </svg>
      <SubtitleBar text="Vòng 2: Báo đốm Mỹ. Với 1,500 PSI, đây là loài có lực cắn mạnh nhất toàn họ nhà mèo." />
    </MascotStage>
  );
};
