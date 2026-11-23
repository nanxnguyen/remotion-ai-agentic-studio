import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  ComicBurst,
  CreatureArt,
  CunBongMascot,
  GagTally,
  MascotStage,
  MeterExplosion,
  SubtitleBar,
} from '../kit';

const NARRATION =
  'Tôi vừa đưa máy đo ra thì màn hình nổ cái bốp, còn đầu tôi thì sưng to gấp đôi. Chính thức chạm mốc ba lần băng bó!';

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = frame >= 24 && frame <= 44 ? 1.2 : 0;

  return (
    <MascotStage theme="swamp" shake={shake} impactFrame={24} zoom={1.08}>
      <GagTally count={3} />
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
          mood="dizzy"
          pose="panic"
          narration={NARRATION}
          bandages={3}
          swollen={frame > 26}
        />
        <MeterExplosion x={620} y={620} startFrame={24} />
        <CreatureArt kind="croc" x={1280} y={610} scale={1.34} jawOpen={frame < 24 ? 0.8 : 0.08} />
      </svg>
      <ComicBurst text="BỐP!!" x={740} y={390} color="#EF4444" startFrame={24} />
      <SubtitleBar text="Màn hình máy đo nổ cái bốp, đầu tôi sưng to gấp đôi. Chính thức chạm mốc 3 lần băng bó!" />
    </MascotStage>
  );
};
