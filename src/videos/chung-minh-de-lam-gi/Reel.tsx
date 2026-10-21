// Reel.tsx — chung-minh-de-lam-gi (director owns; shared composition)
// Audio per mix-plan.md: BGM bed −11.1 dB, gap-lift −7.1 dB, s9a −18.1 dB, s9b −24.1 dB,
// OFF s10–s11, pure silence 53.60→55.60s. SFX per CMD_SFX. Voice stems resampled at mix (24kHz→44.1kHz).
// Frame-derived only; no Date.now/Math.random in scenes.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {CMD_AUDIO_DIR, CMD_BGM_KEYS, CMD_SHOTS, CMD_SFX, CMD_TOTAL} from './timeline';
import {db2lin, CLAMP} from './kit';
import {S1Scene} from './scenes/ScenesA';
import {S2aScene, S2bScene} from './scenes/ScenesB';
import {S3Scene, S4aScene, S4bScene} from './scenes/ScenesC';
import {S5Scene, S6Scene, S7aScene} from './scenes/ScenesD';
import {S7bScene, S8Scene, S9aScene} from './scenes/ScenesE';
import {S9bScene, S10Scene, S11Scene} from './scenes/ScenesF';

const SCENES: Record<string, React.FC> = {
  s1: S1Scene,
  s2a: S2aScene,
  s2b: S2bScene,
  s3: S3Scene,
  s4a: S4aScene,
  s4b: S4bScene,
  s5: S5Scene,
  s6: S6Scene,
  s7a: S7aScene,
  s7b: S7bScene,
  s8: S8Scene,
  s9a: S9aScene,
  s9b: S9bScene,
  s10: S10Scene,
  s11: S11Scene,
};

const bgmVolume = (f: number): number =>
  interpolate(
    f,
    CMD_BGM_KEYS.map(([t]) => t),
    CMD_BGM_KEYS.map(([, v]) => v),
    CLAMP,
  );

export const ChungMinhDeLamGiReel: React.FC = () => (
  <AbsoluteFill style={{background: '#060606', overflow: 'hidden'}}>
    {Object.entries(CMD_SHOTS).map(([k, s]) => {
      const S = SCENES[k];
      return (
        <Sequence key={k} from={s.from} durationInFrames={s.durationInFrames} premountFor={30}>
          <S />
        </Sequence>
      );
    })}
    {Object.values(CMD_SHOTS).map((s) => (
      <Sequence key={s.voice} from={s.from + s.voiceOffset}>
        <Audio src={staticFile(`audio/${CMD_AUDIO_DIR}/${s.voice}`)} />
      </Sequence>
    ))}
    <Sequence>
      <Audio src={staticFile(`audio/${CMD_AUDIO_DIR}/bgm.mp3`)} volume={bgmVolume} />
    </Sequence>
    {CMD_SFX.map((x, i) => (
      <Sequence key={i} from={CMD_SHOTS[x.shot].from + x.offset} durationInFrames={x.trimFrames}>
        <Audio src={staticFile(`audio/${CMD_AUDIO_DIR}/${x.file}`)} volume={db2lin(x.gainDb)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
