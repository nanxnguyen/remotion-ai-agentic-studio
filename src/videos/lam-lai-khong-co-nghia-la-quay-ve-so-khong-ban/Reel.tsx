import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ShotFade, crossfadeShots} from '../../core';
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

// Cross-dissolve length between shots; shot starts and voice placement do not move.
const SHOT_OVERLAP = 10;

export const LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel = () => {
  const total = timeline.totalDurationInFrames;
  return (
    <AbsoluteFill style={{background: C.bg0}}>
      <LamFonts />
      {crossfadeShots(timeline.shots, SHOT_OVERLAP).map((s) => {
        const S = SCENES[s.id];
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.durationInFrames} premountFor={30}>
            <ShotFade fadeIn={s.fadeIn}>
              <S />
            </ShotFade>
          </Sequence>
        );
      })}
      {Object.entries(timeline.shots).map(([k, s]) => (
        <Sequence key={`v-${k}`} from={s.from + (s.voiceFrom ?? 0)}>
          <Audio
            src={staticFile(`audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/${k}.mp3`)}
            volume={1}
          />
        </Sequence>
      ))}
      <Audio
        src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/bgm.mp3')}
        volume={(f) => interpolate(f, [0, 30, total - 60, total], [0, 0.18, 0.18, 0], clamp)}
      />
      <Sequence from={timeline.shots.s2.from} durationInFrames={30}>
        <Audio
          src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-sweep.mp3')}
          volume={0.35}
        />
      </Sequence>
      <Sequence from={timeline.shots.s3.from} durationInFrames={30}>
        <Audio
          src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-riser.mp3')}
          volume={0.35}
        />
      </Sequence>
      <Sequence from={timeline.shots.s4.from} durationInFrames={30}>
        <Audio
          src={staticFile('audio/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/sfx-shimmer.mp3')}
          volume={0.35}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
