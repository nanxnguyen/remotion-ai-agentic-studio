import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {S8_CAPTION_BOUNDARIES, VOICE_LEAD_IN_FRAMES, timeline} from './timeline';
import {VOICE_SECONDS} from './voice-durations';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';

export const DungBienTuoi30ThanhBanAnReel = () => <DungBienTuoi30ThanhBanAnComposition />;

const AUDIO_ROOT = 'audio/dung-bien-tuoi-30-thanh-ban-an';
// The regenerated source clips measure below the integrated delivery target after
// MP3 encoding; apply one deterministic gain at the composition boundary.
const VOICE_GAIN = 1.6;
const KEYS = [
  's1',
  's2',
  's3a',
  's3b',
  's4a',
  's4b',
  's5a',
  's5b',
  's6a',
  's6b',
  's7a',
  's7b',
  's8',
  's9a',
  's9b',
  's10',
] as const;
const SCENE_IDS = KEYS.map((_, i) => `scene${String(i + 1).padStart(2, '0')}`) as Array<
  keyof typeof timeline.shots
>;
const VOICE_LEAD_IN: Record<(typeof KEYS)[number], number> = {
  s1: VOICE_LEAD_IN_FRAMES.scene01,
  s2: 0,
  s3a: 0,
  s3b: 0,
  s4a: 0,
  s4b: 0,
  s5a: 0,
  s5b: 0,
  s6a: 0,
  s6b: 0,
  s7a: 0,
  s7b: 0,
  s8: 0,
  s9a: 0,
  s9b: 0,
  s10: 0,
};
const SFX_CUES = [
  ['s1', 'sfx-pencil-write.mp3', 71, 5, 0.18],
  ['s2', 'sfx-pencil-write.mp3', 101, 6, 0.16],
  ['s3a', 'sfx-paper-slide.mp3', 130, 6, 0.16],
  ['s3b', 'sfx-paper-slide.mp3', 61, 5, 0.13],
  ['s4a', 'sfx-plate-slide.mp3', 103, 7, 0.12],
  ['s5b', 'sfx-pen-drop.mp3', 76, 9, 0.2],
  ['s6b', 'sfx-macro-zoom.mp3', 94, 7, 0.1],
  ['s7a', 'sfx-feed-swipe.mp3', 99, 7, 0.13],
  ['s8', 'sfx-paycheck-notify.mp3', 125, 3, 0.1],
  ['s8', 'sfx-paycheck-notify.mp3', 129, 3, 0.075],
  ['s9a', 'sfx-paper-wind.mp3', 91, 19, 0.1],
  ['s10', 'sfx-paper-wind.mp3', 58, 24, 0.08],
] as const;

const sceneFor = (key: (typeof KEYS)[number]) => timeline.shots[SCENE_IDS[KEYS.indexOf(key)]];

const DungBienTuoi30ThanhBanAnComposition = () => {
  const frame = useCurrentFrame();
  const voiceWindows = KEYS.map((key) => {
    const shot = sceneFor(key);
    const start = shot.from + VOICE_LEAD_IN[key];
    return [start, start + Math.round(VOICE_SECONDS[key] * 30)] as const;
  });
  const lastVoiceEnd = voiceWindows[voiceWindows.length - 1][1];
  const bgmVolume = () => {
    if (frame >= lastVoiceEnd)
      return interpolate(frame, [lastVoiceEnd, lastVoiceEnd + 9], [0.3, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    for (const [start, end] of voiceWindows) {
      if (frame >= start - 6 && frame < start)
        return interpolate(frame, [start - 6, start], [0.3, 0.165], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
      if (frame >= start && frame <= end) return 0.165;
      if (frame > end && frame <= end + 6)
        return interpolate(frame, [end, end + 6], [0.165, 0.3], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
    }
    return 0.3;
  };

  return (
    <AbsoluteFill style={{backgroundColor: '#F0F3F0'}}>
      {SCENE_IDS.map((sceneId, i) => {
        const Scene = [
          Scene01,
          Scene02,
          Scene03,
          Scene04,
          Scene05,
          Scene06,
          Scene07,
          Scene08,
          Scene09,
          Scene10,
          Scene11,
          Scene12,
          Scene13,
          Scene14,
          Scene15,
          Scene16,
        ][i];
        const shot = timeline.shots[sceneId];
        return (
          <Sequence key={sceneId} from={shot.from} durationInFrames={shot.duration}>
            <Scene />
          </Sequence>
        );
      })}
      {KEYS.map((key) => {
        const shot = sceneFor(key);
        return (
          <Sequence
            key={`voice-${key}`}
            from={shot.from + VOICE_LEAD_IN[key]}
            durationInFrames={Math.round(VOICE_SECONDS[key] * 30) + 2}
          >
            <Audio src={staticFile(`${AUDIO_ROOT}/${key}.mp3`)} volume={VOICE_GAIN} />
          </Sequence>
        );
      })}
      {SFX_CUES.map(([key, file, offset, duration, volume], i) => (
        <Sequence key={`sfx-${i}`} from={sceneFor(key).from + offset} durationInFrames={duration}>
          <Audio src={staticFile(`${AUDIO_ROOT}/${file}`)} volume={volume} />
        </Sequence>
      ))}
      <Audio src={staticFile(`${AUDIO_ROOT}/bgm.mp3`)} volume={bgmVolume} />
    </AbsoluteFill>
  );
};
