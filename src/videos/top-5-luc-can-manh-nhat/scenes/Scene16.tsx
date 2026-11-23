import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Bốn nghìn P S I tương đương khoảng một phẩy tám tấn lực dồn vào hàng trăm chiếc răng cưa sắc lẹm dưới đáy đại dương.';

export const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.25, 0.9]);

  return (
    <MascotStage theme="ocean">
      <DangerCard
        roundLabel="ÁP SUẤT TỬ THẦN"
        creatureName="1.8 Tấn Lực Dồn"
        psi={4000}
        subLabel="Hàng trăm răng cưa sắc lẹm"
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
          x={450}
          y={620}
          scale={1.12}
          mood="wide"
          pose="panic"
          narration={NARRATION}
          bandages={3}
        />
        <CreatureArt kind="shark" x={1230} y={540} scale={1.5} jawOpen={jawOpen} ctScan />
      </svg>
      <SubtitleBar text="4,000 PSI tương đương khoảng 1,8 tấn lực dồn vào hàng trăm chiếc răng cưa sắc lẹm dưới đáy đại dương." />
    </MascotStage>
  );
};
