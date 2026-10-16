import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {clamp} from '../../stick';
import {MET_SFX, MET_SHOTS, MET_TOTAL, MET_VOICE_OFFSET} from './timeline';
import {MetFonts} from './kit';
import {MetS1, MetS2, MetS3, MetS4} from './scenesA';
import {MetS5, MetS6, MetS7} from './scenesB';

const SCENES: Record<string, React.FC> = {
  s1: MetS1,
  s2: MetS2,
  s3: MetS3,
  s4: MetS4,
  s5: MetS5,
  s6: MetS6,
  s7: MetS7,
};

// metkhong: "chung cu khuya xam lanh + mot bong den am" (#141A24 bg).
export const MetkhongReel: React.FC = () => (
  <AbsoluteFill style={{background: '#141A24', overflow: 'hidden'}}>
    <MetFonts />
    {Object.entries(MET_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(MET_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + MET_VOICE_OFFSET}>
        <Audio src={staticFile(`audio/metkhong/${s.voice}.mp3`)} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('audio/metkhong-bgm.mp3')}
      volume={(f) => interpolate(f, [0, 40, MET_TOTAL - 60, MET_TOTAL], [0, 0.3, 0.3, 0], clamp)}
    />
    {MET_SFX.map((x, i) => (
      <Sequence
        key={i}
        from={MET_SHOTS[x.shot].from + x.offset}
        durationInFrames={x.duration ?? 70}
      >
        <Audio src={staticFile(`audio/${x.src}`)} volume={x.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
