import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  ComicBurst,
  CreatureArt,
  CunBongMascot,
  DangerCard,
  GagTally,
  MascotStage,
  SubtitleBar,
} from '../kit';

const NARRATION =
  'Trên thảo nguyên đêm, linh cẩu sở hữu bộ răng hàm hình nón cực dày, chuyên dùng để nghiền nát xương ống thành bột mịn chỉ trong một cú đớp.';

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const snapPhase = frame % 70;
  const jawOpen =
    snapPhase < 35
      ? interpolate(snapPhase, [0, 35], [0.85, 0.05])
      : interpolate(snapPhase, [35, 70], [0.05, 0.85]);

  return (
    <MascotStage theme="savanna" shake={snapPhase >= 33 && snapPhase <= 40 ? 0.6 : 0}>
      <DangerCard
        roundLabel="CƠ CHẾ NGHIỀN XƯƠNG"
        creatureName="Răng Hàm Hình Nón"
        psi={1100}
        subLabel="Nghiền nát xương ống"
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
          x={460}
          y={630}
          scale={1.15}
          mood="wide"
          pose="holdBone"
          narration={NARRATION}
        />
        <CreatureArt kind="hyena" x={1220} y={580} scale={1.45} jawOpen={jawOpen} />
      </svg>
      <ComicBurst text="RẮC!" x={1020} y={420} color="#F59E0B" startFrame={35} />
      <SubtitleBar text="Linh cẩu sở hữu bộ răng hàm hình nón cực dày, nghiền nát xương ống thành bột mịn trong một cú đớp." />
    </MascotStage>
  );
};
