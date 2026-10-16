import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CAMON_SFX, CAMON_SHOTS, CAMON_TOTAL, CAMON_VOICE_OFFSET} from './timeline';
import {C, CamonFonts, Film, clamp} from './kit';
import {CamonS1, CamonS2, CamonS3} from './scenesA';
import {CamonS4, CamonS5, CamonS6} from './scenesB';
import {CamonS7, CamonS8} from './scenesC';
import {CamonS9, CamonS10} from './scenesD';

const SCENES: Record<string, React.FC> = {
  s1: CamonS1,
  s2: CamonS2,
  s3: CamonS3,
  s4: CamonS4,
  s5: CamonS5,
  s6: CamonS6,
  s7: CamonS7,
  s8: CamonS8,
  s9: CamonS9,
  s10: CamonS10,
};

// Shots overlap by their crossfade length (xf) at the start; each shot fades in over xf frames, the previous one stays underneath.
export const CamonReel: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <CamonFonts />
    {Object.entries(CAMON_SHOTS).map(([k, s], i, all) => {
      const S = SCENES[k];
      const tail = all[i + 1]?.[1].xf ?? 0; // stay visible under the next shot while it fades in
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.duration + tail} premountFor={30}>
          <FadeIn xf={s.xf}>
            <S />
          </FadeIn>
        </Sequence>
      );
    })}
    <Film />
    {Object.values(CAMON_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + CAMON_VOICE_OFFSET}>
        <Audio src={staticFile(`audio/camon/${s.voice}.mp3`)} volume={1} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('audio/camon/bgm-soft.mp3')}
      volume={(f) =>
        interpolate(f, [0, 45, CAMON_TOTAL - 90, CAMON_TOTAL], [0, 0.45, 0.45, 0], clamp)
      }
    />
    {CAMON_SFX.map((x, i) => {
      const sh = CAMON_SHOTS[x.shot];
      return (
        <Sequence
          key={i}
          from={sh.from + CAMON_VOICE_OFFSET + Math.round(x.at * sh.sec * 30)}
          durationInFrames={x.duration ?? 70}
        >
          <Audio src={staticFile(`audio/camon/${x.src}`)} volume={x.volume} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

// Crossfade: each shot fades in over its first `xf` frames on top of the previous shot, which runs `xf` frames longer.
const FadeIn: React.FC<{xf: number; children: React.ReactNode}> = ({xf, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: xf ? interpolate(f, [0, xf], [0, 1], clamp) : 1}}>
      {children}
    </AbsoluteFill>
  );
};
