// Reel — thuong-hay-so-bat-dau-lai (director-owned).
// Scenes per SHOTS, voice per key, BGM ducked under voice, SFX cues, closing silence.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {MIX, SFX, SHOTS, THS_TOTAL, VOICE} from './timeline';
import {ThoFonts} from './kit';
import {SceneS1, SceneS2, SceneS3} from './ScenesA';
import {SceneS4, SceneS5, SceneS6} from './ScenesB';
import {SceneS7, SceneS8, SceneS9, SceneS10} from './ScenesC';

const AUD = 'audio/thuong-hay-so-bat-dau-lai';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

// Voice windows [start, end] for ducking (voice spans + 6f ramps baked in).
const VWIN: Array<[number, number]> = (Object.keys(SHOTS) as Array<keyof typeof SHOTS>).map((k) => [
  SHOTS[k].voiceFrom,
  SHOTS[k].voiceFrom + SHOTS[k].voiceDuration,
]);

const bgmVolume = (f: number): number => {
  if (f >= MIX.bgmFadeStart) {
    return interpolate(
      f,
      [MIX.bgmFadeStart, MIX.bgmFadeStart + MIX.bgmFadeDur],
      [MIX.duck, 0],
      clamp,
    );
  }
  let v = MIX.bed;
  for (const [vs, ve] of VWIN) {
    if (f >= vs - MIX.duckRamp && f <= ve + MIX.duckRamp) {
      const edge = Math.min(
        (f - (vs - MIX.duckRamp)) / MIX.duckRamp,
        (ve + MIX.duckRamp - f) / MIX.duckRamp,
        1,
      );
      const ducked = MIX.bed + (MIX.duck - MIX.bed) * Math.max(0, Math.min(1, edge));
      if (ducked < v) v = ducked;
    }
  }
  return v;
};

const SCENES: Record<string, React.FC<never>> = {
  s1: SceneS1 as never,
  s2: SceneS2 as never,
  s3: SceneS3 as never,
  s4: SceneS4 as never,
  s5: SceneS5 as never,
  s6: SceneS6 as never,
  s7: SceneS7 as never,
  s8: SceneS8 as never,
  s9: SceneS9 as never,
  s10: SceneS10 as never,
};
// Sequence start per scene component (split keys share one component span).
const SEQ_FROM: Record<string, number> = {
  s1: SHOTS.s1.from,
  s2: SHOTS.s2.from,
  s3: SHOTS.s3.from,
  s4: SHOTS.s4a.from,
  s5: SHOTS.s5.from,
  s6: SHOTS.s6a.from,
  s7: SHOTS.s7a.from,
  s8: SHOTS.s8.from,
  s9: SHOTS.s9.from,
  s10: SHOTS.s10.from,
};
const SEQ_DUR: Record<string, number> = {
  s1: SHOTS.s1.duration,
  s2: SHOTS.s2.duration,
  s3: SHOTS.s3.duration,
  s4: 171,
  s5: SHOTS.s5.duration,
  s6: 277,
  s7: 218,
  s8: SHOTS.s8.duration,
  s9: SHOTS.s9.duration,
  s10: SHOTS.s10.duration,
};

export const ThuongHaySoReel: React.FC = () => (
  <AbsoluteFill style={{background: '#2A2238'}}>
    <ThoFonts />
    {Object.keys(SCENES).map((k) => {
      const S = SCENES[k] as React.FC;
      return (
        <Sequence key={k} from={SEQ_FROM[k]} durationInFrames={SEQ_DUR[k]}>
          <S />
        </Sequence>
      );
    })}
    {(Object.keys(VOICE) as Array<keyof typeof VOICE>).map((k) => (
      <Sequence key={k} from={SHOTS[k].voiceFrom} durationInFrames={SHOTS[k].voiceDuration + 30}>
        <Audio src={staticFile(`${AUD}/${VOICE[k]}`)} />
      </Sequence>
    ))}
    {SFX.map((c, i) => (
      <Sequence key={i} from={SHOTS[c.shot].from + c.offset} durationInFrames={c.duration + 30}>
        <Audio src={staticFile(`${AUD}/${c.src}`)} volume={c.volume} />
      </Sequence>
    ))}
    <Audio src={staticFile(`${AUD}/bgm.mp3`)} volume={bgmVolume} />
  </AbsoluteFill>
);
