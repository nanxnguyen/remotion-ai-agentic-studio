import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Vòng bốn: Cá sấu nước mặn. Đây là loài giữ kỷ lục lực cắn đo trực tiếp mạnh nhất còn sống trên Trái Đất: ba nghìn bảy trăm P S I!';

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const creatureX = interpolate(frame, [0, 32], [1640, 1280], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="swamp">
      <DangerCard
        roundLabel="VÒNG 4 / Á QUÂN"
        creatureName="Cá Sấu Nước Mặn"
        psi={3700}
        subLabel="Kỷ lục đo trực tiếp"
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
          mood="wide"
          pose="holdMeter"
          narration={NARRATION}
          bandages={2}
        />
        <CreatureArt
          kind="croc"
          x={creatureX}
          y={610}
          scale={1.34}
          jawOpen={0.45 + Math.sin(frame * 0.14) * 0.12}
        />
      </svg>
      <SubtitleBar text="Vòng 4: Cá sấu nước mặn. Kỷ lục lực cắn đo trực tiếp mạnh nhất Trái Đất: 3,700 PSI!" />
    </MascotStage>
  );
};
