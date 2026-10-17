import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Scene} from './scenes';
import {SPANS} from './timeline';

export const TiecNguoiHayNamThangReel: React.FC = () => (
  <AbsoluteFill style={{background: '#000000'}}>
    {SPANS.map((shot, index) => (
      <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration} name={shot.id}>
        <Scene index={index} />
        <Audio src={staticFile(`audio/tiec-nguoi-hay-nam-thang/${shot.id}.mp3`)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
