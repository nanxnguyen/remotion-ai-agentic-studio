import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {Fonts} from '../../Main';
import {clamp} from './kit';
import {KTT_SFX, KTT_SHOTS, KTT_TOTAL, KTT_VOICE_OFFSET} from './timeline';
import {KttS1, KttS2, KttS3} from './scenesA';
import {KttS4, KttS5, KttS6} from './scenesB';
import {KttS7, KttS8} from './scenesC';

const SCENES: Record<string, React.FC> = {
  s1: KttS1,
  s2: KttS2,
  s3: KttS3,
  s4: KttS4,
  s5: KttS5,
  s6: KttS6,
  s7: KttS7,
  s8: KttS8,
};

// khoang-trong-trong-buc-tranh: one comp, BGM on (single BGM version per workflow).
export const KhoangTrongTrongBucTranhReel: React.FC = () => (
  <AbsoluteFill style={{background: '#1A1A2E', overflow: 'hidden'}}>
    <Fonts />
    {Object.entries(KTT_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(KTT_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + KTT_VOICE_OFFSET}>
        <Audio src={staticFile(`audio/khoang-trong-trong-buc-tranh/${s.voice}.mp3`)} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('audio/khoang-trong-trong-buc-tranh/bgm.mp3')}
      volume={(f) => interpolate(f, [0, 60, KTT_TOTAL - 90, KTT_TOTAL], [0, 0.04, 0.04, 0], clamp)}
    />
    {KTT_SFX.map((x, i) => (
      <Sequence
        key={i}
        from={KTT_SHOTS[x.shot].from + x.offset}
        durationInFrames={x.duration ?? 70}
      >
        <Audio src={staticFile(`audio/khoang-trong-trong-buc-tranh/${x.src}`)} volume={x.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
