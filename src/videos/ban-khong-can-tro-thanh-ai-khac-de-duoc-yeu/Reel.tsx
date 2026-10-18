import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene } from './scenes';
import { SPANS } from './timeline';

export const BanKhongCanTroThanhAiKhacDeDuocYeuReel: React.FC = () => (
  <AbsoluteFill style={{ background: '#0D0D0D' }}>
    {SPANS.map((shot, index) => (
      <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration} name={shot.id}>
        <Scene index={index} />
        <Audio src={staticFile(`audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/${shot.id}.mp3`)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);