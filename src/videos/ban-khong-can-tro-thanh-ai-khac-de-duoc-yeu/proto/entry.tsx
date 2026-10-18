// Proto Entry: preview composition for ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu design prototype
import React from 'react';
import { Composition, Sequence } from 'remotion';
import { ProtoScene } from './scenes';
import { SHOTS } from './scenes';

type ShotData = {
  id: string;
  heading: string;
  sub?: string;
  captionChunks: string[];
  accentWords: string[];
  motif: string;
};

export const ProtoComposition: React.FC = () => {
  const shotDuration = 150; // frames per shot (approx 5s @ 30fps)
  const totalFrames = SHOTS.length * shotDuration;

  return (
    <>
      {SHOTS.map((shot: ShotData, index: number) => (
        <Sequence key={shot.id} from={index * shotDuration} durationInFrames={shotDuration}>
          <ProtoScene index={index} />
        </Sequence>
      ))}
    </>
  );
};

export const protoVideo = {
  id: 'BanKhongCanTroThanhAiKhacDeDuocYeuProto',
  component: ProtoComposition,
  durationInFrames: SHOTS.length * 150,
  fps: 30,
  width: 1080,
  height: 1920,
  defaultProps: {},
};