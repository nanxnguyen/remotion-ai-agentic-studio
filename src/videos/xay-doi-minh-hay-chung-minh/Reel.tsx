import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {FONT_CSS} from '../../xay-doi-minh-hay-chung-minh/proto/fonts';
import {clamp, db2lin} from './kit';
import {XDM_AUDIO_DIR, XDM_BGM_OFFSET_FRAMES, XDM_SFX, XDM_SHOTS, XDM_TOTAL} from './timeline';
import {S1Scene, S2aScene, S2bScene} from './scenes/ScenesA';
import {S3Scene, S4Scene} from './scenes/ScenesB';
import {S5a1Scene, S5a2Scene, S5bScene, S6Scene} from './scenes/ScenesC';
import {S7aScene, S7bScene, S8Scene} from './scenes/ScenesD';
import {S10Scene, S11Scene, S9aScene, S9bScene} from './scenes/ScenesE';

const SCENES: Record<string, React.FC> = {
  s1: S1Scene,
  s2a: S2aScene,
  s2b: S2bScene,
  s3: S3Scene,
  s4: S4Scene,
  s5a1: S5a1Scene,
  s5a2: S5a2Scene,
  s5b: S5bScene,
  s6: S6Scene,
  s7a: S7aScene,
  s7b: S7bScene,
  s8: S8Scene,
  s9a: S9aScene,
  s9b: S9bScene,
  s10: S10Scene,
  s11: S11Scene,
};

// Mix-plan keyframes (video frames): bed 0.22 (-13dB), gap lifts 0.35 (-9dB),
// s7b swell, s8-end down, s9a low 0.10 (-20dB), s9b 0.05 (-26dB) -> silence,
// s10 dawn return 0.18 (-15dB), out by s11 voice end, pure silence to 1776.
const BGM_KEYS: Array<[number, number]> = [
  [0, 0],
  [XDM_BGM_OFFSET_FRAMES, 0],
  [XDM_BGM_OFFSET_FRAMES + 36, 0.22],
  [229, 0.22],
  [231, 0.35],
  [235, 0.35],
  [237, 0.22],
  [655, 0.22],
  [657, 0.35],
  [658, 0.35],
  [660, 0.22],
  [1137, 0.22],
  [1139, 0.35],
  [1147, 0.35],
  [1149, 0.22],
  [1205, 0.22],
  [1208, 0.35],
  [1214, 0.35],
  [1216, 0.22],
  [1342, 0.22],
  [1354, 0.1],
  [1433, 0.1],
  [1440, 0.05],
  [1486, 0.05],
  [1494, 0],
  [1515, 0],
  [1551, 0.18],
  [1680, 0.18],
  [1716, 0],
  [XDM_TOTAL, 0],
];

const bgmVolume = (f: number): number =>
  interpolate(
    f,
    BGM_KEYS.map(([t]) => t),
    BGM_KEYS.map(([, v]) => v),
    clamp,
  );

export const XayDoiMinhReel: React.FC = () => (
  <AbsoluteFill style={{background: '#141B6B', overflow: 'hidden'}}>
    <style>{FONT_CSS}</style>
    {Object.entries(XDM_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.durationInFrames} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(XDM_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + s.voiceOffset}>
        <Audio src={staticFile(`audio/${XDM_AUDIO_DIR}/${s.voice}`)} />
      </Sequence>
    ))}
    <Sequence from={XDM_BGM_OFFSET_FRAMES}>
      <Audio src={staticFile(`audio/${XDM_AUDIO_DIR}/bgm.mp3`)} volume={bgmVolume} />
    </Sequence>
    {XDM_SFX.map((x, i) => (
      <Sequence key={i} from={XDM_SHOTS[x.shot].from + x.offset} durationInFrames={x.trimFrames}>
        <Audio src={staticFile(`audio/${XDM_AUDIO_DIR}/${x.file}`)} volume={db2lin(x.gainDb)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
