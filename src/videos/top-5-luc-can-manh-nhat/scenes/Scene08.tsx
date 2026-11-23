import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  ComicBurst,
  CrackLines,
  CreatureArt,
  CunBongMascot,
  GagTally,
  MascotStage,
  SubtitleBar,
} from '../kit';

const NARRATION =
  'Tôi đã cẩn thận mặc hẳn giáp mai rùa tự chế rồi mà vẫn nghe tiếng rắc cực giòn. Xin phép ghi nhận lần băng bó đầu tiên!';

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const lungeX =
    frame < 35
      ? interpolate(frame, [0, 35], [1260, 860])
      : interpolate(frame, [35, 70], [860, 1180], {extrapolateRight: 'clamp'});
  const shake = frame >= 30 && frame <= 48 ? 1.1 : 0;

  return (
    <MascotStage theme="amazon" shake={shake} impactFrame={32} zoom={1.08}>
      <GagTally count={1} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={480}
          y={620}
          scale={1.2}
          mood={frame > 35 ? 'dizzy' : 'wide'}
          pose="panic"
          narration={NARRATION}
          bandages={frame > 40 ? 1 : 0}
          turtleShell
        />
        <CrackLines x={470} y={680} startFrame={32} />
        <CreatureArt
          kind="jaguar"
          x={lungeX}
          y={590}
          scale={1.38}
          jawOpen={frame < 35 ? 0.85 : 0.1}
        />
      </svg>
      <ComicBurst text="RẮC!!" x={740} y={420} color="#EF4444" startFrame={32} />
      <SubtitleBar text="Tôi đã mặc hẳn giáp mai rùa tự chế rồi mà vẫn nghe tiếng rắc cực giòn. Lần băng bó đầu tiên!" />
    </MascotStage>
  );
};
