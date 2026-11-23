import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  BoneDebris,
  ComicBurst,
  CreatureArt,
  CunBongMascot,
  GagTally,
  MascotStage,
  SubtitleBar,
} from '../kit';

const NARRATION =
  'Tôi vừa đưa thử khúc xương giả ra, nó biến thành bụi trong đúng một giây. May quá, vòng một vẫn sống sót!';

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const jawOpen = frame < 30 ? interpolate(frame, [0, 30], [0.9, 0.02]) : 0.25;
  const shake = frame >= 28 && frame <= 42 ? 0.8 : 0;

  return (
    <MascotStage theme="savanna" shake={shake} impactFrame={28} zoom={1.08}>
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
          scale={1.2}
          mood="happy"
          pose="thumbsUp"
          narration={NARRATION}
        />
        <CreatureArt kind="hyena" x={1280} y={590} scale={1.35} jawOpen={jawOpen} />
        <BoneDebris x={1020} y={560} startFrame={28} />
      </svg>
      <ComicBurst text="NÁT BÉT!" x={1010} y={450} color="#EF4444" startFrame={28} />
      <SubtitleBar text="Tôi vừa đưa thử khúc xương giả ra, nó biến thành bụi trong đúng 1 giây. May quá, vòng 1 vẫn sống sót!" />
    </MascotStage>
  );
};
