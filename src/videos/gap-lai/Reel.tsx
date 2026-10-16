import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {Fonts} from '../../Main';
import {clamp} from '../../stick';
import {GAP_SFX, GAP_SHOTS, GAP_TOTAL, GAP_VOICE_OFFSET} from './timeline';
import {GapS1, GapS2, GapS3} from './scenesA';
import {GapS4, GapS5, GapS6, GapS7} from './scenesB';
import {GapS8, GapS9} from './scenesC';

const SCENES: Record<string, React.FC> = {
  s1: GapS1,
  s2: GapS2,
  s3: GapS3,
  s4: GapS4,
  s5: GapS5,
  s6: GapS6,
  s7: GapS7,
  s8: GapS8,
  s9: GapS9,
};

// gaplai: "phòng đêm đèn vàng" (#171310 bg), Be Vietnam Pro 600 captions below (scenes agent).
export const GaplaiReel: React.FC = () => (
  <AbsoluteFill style={{background: '#171310', overflow: 'hidden'}}>
    <Fonts />
    {Object.entries(GAP_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(GAP_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + GAP_VOICE_OFFSET}>
        <Audio src={staticFile(`audio/gaplai/${s.voice}.mp3`)} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('audio/gaplai-bgm.mp3')}
      volume={(f) => interpolate(f, [0, 40, GAP_TOTAL - 60, GAP_TOTAL], [0, 0.05, 0.05, 0], clamp)}
    />
    {GAP_SFX.map((x, i) => (
      <Sequence
        key={i}
        from={GAP_SHOTS[x.shot].from + x.offset}
        durationInFrames={x.duration ?? 70}
      >
        <Audio src={staticFile(`audio/${x.src}`)} volume={x.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
