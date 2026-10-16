import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {Fonts} from '../Main';
import {clamp} from '../stick';
import {TT2_SFX, TT2_SHOTS, TT2_TOTAL, TT2_VOICE_OFFSET} from './timeline';
import {Tt2S1, Tt2S2, Tt2S3} from './scenesA';
import {Tt2S4, Tt2S5, Tt2S6} from './scenesB';
import {Tt2S7, Tt2S8} from './scenesC';

const SCENES: Record<string, React.FC> = {s1: Tt2S1, s2: Tt2S2, s3: Tt2S3, s4: Tt2S4, s5: Tt2S5, s6: Tt2S6, s7: Tt2S7, s8: Tt2S8};

// "Lan" video: one comp, BGM on (user decision: no NoBgm render).
export const LanReel: React.FC = () => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <Fonts />
    {Object.entries(TT2_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}><S /></Sequence>;
    })}
    {Object.values(TT2_SHOTS).map(s => <Sequence key={s.voice} from={s.from + TT2_VOICE_OFFSET}><Audio src={staticFile(`audio/truongthanh2/${s.voice}.mp3`)} /></Sequence>)}
    <Audio src={staticFile('audio/bgm.mp3')} volume={(f) => interpolate(f, [0, 40, TT2_TOTAL - 60, TT2_TOTAL], [0, .05, .05, 0], clamp)} />
    {TT2_SFX.map((x, i) => <Sequence key={i} from={TT2_SHOTS[x.shot].from + x.offset} durationInFrames={'duration' in x ? x.duration : 70}><Audio src={staticFile(`audio/${x.src}`)} volume={x.volume} /></Sequence>)}
  </AbsoluteFill>
);
