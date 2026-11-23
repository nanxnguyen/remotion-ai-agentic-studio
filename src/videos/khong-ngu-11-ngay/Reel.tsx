import React from 'react';
import {AbsoluteFill, Sequence, getStaticFiles} from 'remotion';
import {BackgroundMusic, SfxTrack, VoiceTrack} from '../../core';
import {ensureMontserratLoaded} from './font';
import {Thumbnail} from './Thumbnail';
import {timeline} from './timeline';
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

const SCENE_LIST: Array<{
  key: keyof typeof timeline.shots;
  Component: React.FC;
  voice: string;
  sfx?: {file: string; offset: number};
}> = [
  {
    key: 'scene01',
    Component: Scene01,
    voice: 'audio/khong-ngu-11-ngay/s1.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/boom.wav', offset: 8},
  },
  {
    key: 'scene02',
    Component: Scene02,
    voice: 'audio/khong-ngu-11-ngay/s2.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene03',
    Component: Scene03,
    voice: 'audio/khong-ngu-11-ngay/s3.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene04',
    Component: Scene04,
    voice: 'audio/khong-ngu-11-ngay/s4.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/crack.wav', offset: 22},
  },
  {
    key: 'scene05',
    Component: Scene05,
    voice: 'audio/khong-ngu-11-ngay/s5.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene06',
    Component: Scene06,
    voice: 'audio/khong-ngu-11-ngay/s6.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/snap.wav', offset: 58},
  },
  {
    key: 'scene07',
    Component: Scene07,
    voice: 'audio/khong-ngu-11-ngay/s7.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/boom.wav', offset: 45},
  },
  {
    key: 'scene08',
    Component: Scene08,
    voice: 'audio/khong-ngu-11-ngay/s8.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene09',
    Component: Scene09,
    voice: 'audio/khong-ngu-11-ngay/s9.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/snap.wav', offset: 15},
  },
  {
    key: 'scene10',
    Component: Scene10,
    voice: 'audio/khong-ngu-11-ngay/s10.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene11',
    Component: Scene11,
    voice: 'audio/khong-ngu-11-ngay/s11.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/boom.wav', offset: 20},
  },
  {
    key: 'scene12',
    Component: Scene12,
    voice: 'audio/khong-ngu-11-ngay/s12.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene13',
    Component: Scene13,
    voice: 'audio/khong-ngu-11-ngay/s13.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene14', Component: Scene14, voice: 'audio/khong-ngu-11-ngay/s14.mp3'},
];

export const KhongNgu11NgayVideo: React.FC<{thumbnailOnly?: boolean}> = ({
  thumbnailOnly = false,
}) => {
  ensureMontserratLoaded();
  if (thumbnailOnly) {
    return <Thumbnail />;
  }
  const staticFileSet = new Set(getStaticFiles().map((f) => f.name));
  const playfulDur = timeline.shots.scene08.from;
  const tensionDur = timeline.shots.scene12.from - timeline.shots.scene08.from;
  const triumphDur = timeline.totalDurationInFrames - timeline.shots.scene12.from;

  return (
    <AbsoluteFill style={{backgroundColor: '#020617'}}>
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-playful.wav') && (
        <Sequence from={0} durationInFrames={playfulDur}>
          <BackgroundMusic src="audio/top-5-luc-can-manh-nhat/bgm-playful.wav" volume={0.14} />
        </Sequence>
      )}
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-tension.wav') && (
        <Sequence from={timeline.shots.scene08.from} durationInFrames={tensionDur}>
          <BackgroundMusic src="audio/top-5-luc-can-manh-nhat/bgm-tension.wav" volume={0.16} />
        </Sequence>
      )}
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-triumph.wav') && (
        <Sequence from={timeline.shots.scene12.from} durationInFrames={triumphDur}>
          <BackgroundMusic src="audio/top-5-luc-can-manh-nhat/bgm-triumph.wav" volume={0.15} />
        </Sequence>
      )}

      {SCENE_LIST.map(({key, Component, voice, sfx}) => {
        const shot = timeline.shots[key];
        return (
          <Sequence key={key} from={shot.from} durationInFrames={shot.duration}>
            <Component />
            {staticFileSet.has(voice) && <VoiceTrack src={voice} volume={1.0} />}
            {sfx && staticFileSet.has(sfx.file) && (
              <SfxTrack src={sfx.file} from={sfx.offset} volume={0.65} />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
