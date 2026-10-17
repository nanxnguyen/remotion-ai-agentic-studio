import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {timeline} from './timeline';
import {C, LamFonts, clamp} from './kit';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';

const SCENES: Record<string, React.FC> = {
  s1: Scene01,
  s2: Scene02,
  s3: Scene03,
  s4: Scene04,
  s5: Scene05,
};

export const LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel = () => {
  const total = timeline.totalDurationInFrames;
  return (
    <AbsoluteFill style={{background: C.bg0}}>
      <LamFonts />
      {Object.entries(timeline.shots).map(([k, s]) => {
        const S = SCENES[k];
        return (
          <Sequence key={k} from={s.from} durationInFrames={s.duration} premountFor={30}>
            <S />
          </Sequence>
        );
      })}
      {Object.entries(timeline.shots).map(([k, s]) => (
        <Sequence key={`v-${k}`} from={s.from + (s.voiceFrom ?? 0)}>
          <Audio src={staticFile(`audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/${k}.mp3`)} volume={1} />
        </Sequence>
      ))}
      <Audio
        src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/bgm.mp3')}
        volume={(f) =>
          interpolate(f, [0, 30, total - 60, total], [0, 0.18, 0.18, 0], clamp)
        }
      />
      <Sequence from={timeline.shots.s2.from} durationInFrames={30}>
        <Audio src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-sweep.mp3')} volume={0.35} />
      </Sequence>
      <Sequence from={timeline.shots.s3.from} durationInFrames={30}>
        <Audio src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-riser.mp3')} volume={0.35} />
      </Sequence>
      <Sequence from={timeline.shots.s4.from} durationInFrames={30}>
        <Audio src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-shimmer.mp3')} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};
