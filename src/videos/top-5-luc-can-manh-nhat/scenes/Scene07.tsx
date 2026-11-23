import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CreatureArt, CunBongMascot, DangerCard, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Khác với sư tử hay hổ thường cắn vào cổ họng để làm ngạt con mồi, báo đốm Mỹ tiến hóa để cắn xuyên thẳng qua lớp mai rùa cứng như đá.';

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.25, 0.85]);

  return (
    <MascotStage theme="amazon">
      <DangerCard
        roundLabel="CHIẾN THUẬT SĂN MỒI"
        creatureName="Cắn Xuyên Mai Rùa"
        psi={1500}
        subLabel="Đánh thẳng hộp sọ & mai"
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
          x={480}
          y={620}
          scale={1.18}
          mood="wide"
          pose="idle"
          narration={NARRATION}
          turtleShell
        />
        <CreatureArt kind="jaguar" x={1220} y={580} scale={1.42} jawOpen={jawOpen} />
      </svg>
      <SubtitleBar text="Khác với sư tử hay hổ, báo đốm Mỹ tiến hóa để cắn xuyên thẳng qua lớp mai rùa cứng như đá." />
    </MascotStage>
  );
};
