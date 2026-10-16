import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {Fonts} from '../../Main';
import {clamp} from './kit';
import {CGN_SFX, CGN_SHOTS, CGN_TOTAL, CGN_VOICE_OFFSET} from './timeline';
import {CgnS1, CgnS2, CgnS3} from './scenesA';
import {CgnS4, CgnS5, CgnS6} from './scenesB';
import {CgnS7, CgnS8} from './scenesC';

const SCENES: Record<string, React.FC> = {
  s1: CgnS1,
  s2: CgnS2,
  s3: CgnS3,
  s4: CgnS4,
  s5: CgnS5,
  s6: CgnS6,
  s7: CgnS7,
  s8: CgnS8,
};

// cuoc-goi-nho-cua-me: one comp, BGM on (single BGM version per workflow).
export const CuocGoiNhoReel: React.FC = () => (
  <AbsoluteFill style={{background: '#E8EEF2', overflow: 'hidden'}}>
    <Fonts />
    {Object.entries(CGN_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(CGN_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + CGN_VOICE_OFFSET}>
        <Audio src={staticFile(`audio/cuoc-goi-nho-cua-me/${s.voice}.mp3`)} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('audio/cuoc-goi-nho-cua-me/bgm.mp3')}
      volume={(f) => interpolate(f, [0, 40, CGN_TOTAL - 60, CGN_TOTAL], [0, 0.05, 0.05, 0], clamp)}
    />
    {CGN_SFX.map((x, i) => (
      <Sequence
        key={i}
        from={CGN_SHOTS[x.shot].from + x.offset}
        durationInFrames={x.duration ?? 70}
      >
        <Audio src={staticFile(`audio/cuoc-goi-nho-cua-me/${x.src}`)} volume={x.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
