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
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';
import {Scene17} from './scenes/Scene17';
import {Scene18} from './scenes/Scene18';
import {Scene19} from './scenes/Scene19';

const SCENE_LIST: Array<{
  key: keyof typeof timeline.shots;
  Component: React.FC;
  voice: string;
  sfx?: {file: string; offset: number};
}> = [
  {
    key: 'scene01',
    Component: Scene01,
    voice: 'audio/top-5-luc-can-manh-nhat/s1.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/snap.wav', offset: 6},
  },
  {
    key: 'scene02',
    Component: Scene02,
    voice: 'audio/top-5-luc-can-manh-nhat/s2.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene03',
    Component: Scene03,
    voice: 'audio/top-5-luc-can-manh-nhat/s3.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {
    key: 'scene04',
    Component: Scene04,
    voice: 'audio/top-5-luc-can-manh-nhat/s4.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/crack.wav', offset: 35},
  },
  {
    key: 'scene05',
    Component: Scene05,
    voice: 'audio/top-5-luc-can-manh-nhat/s5.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/snap.wav', offset: 28},
  },
  {
    key: 'scene06',
    Component: Scene06,
    voice: 'audio/top-5-luc-can-manh-nhat/s6.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene07', Component: Scene07, voice: 'audio/top-5-luc-can-manh-nhat/s7.mp3'},
  {
    key: 'scene08',
    Component: Scene08,
    voice: 'audio/top-5-luc-can-manh-nhat/s8.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/crack.wav', offset: 32},
  },
  {
    key: 'scene09',
    Component: Scene09,
    voice: 'audio/top-5-luc-can-manh-nhat/s9.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene10', Component: Scene10, voice: 'audio/top-5-luc-can-manh-nhat/s10.mp3'},
  {
    key: 'scene11',
    Component: Scene11,
    voice: 'audio/top-5-luc-can-manh-nhat/s11.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/crack.wav', offset: 20},
  },
  {
    key: 'scene12',
    Component: Scene12,
    voice: 'audio/top-5-luc-can-manh-nhat/s12.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene13', Component: Scene13, voice: 'audio/top-5-luc-can-manh-nhat/s13.mp3'},
  {
    key: 'scene14',
    Component: Scene14,
    voice: 'audio/top-5-luc-can-manh-nhat/s14.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/boom.wav', offset: 24},
  },
  {
    key: 'scene15',
    Component: Scene15,
    voice: 'audio/top-5-luc-can-manh-nhat/s15.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene16', Component: Scene16, voice: 'audio/top-5-luc-can-manh-nhat/s16.mp3'},
  {
    key: 'scene17',
    Component: Scene17,
    voice: 'audio/top-5-luc-can-manh-nhat/s17.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/snap.wav', offset: 18},
  },
  {
    key: 'scene18',
    Component: Scene18,
    voice: 'audio/top-5-luc-can-manh-nhat/s18.mp3',
    sfx: {file: 'audio/top-5-luc-can-manh-nhat/whoosh.wav', offset: 0},
  },
  {key: 'scene19', Component: Scene19, voice: 'audio/top-5-luc-can-manh-nhat/s19.mp3'},
];

export const Top5LucCanManhNhatVideo: React.FC<{thumbnailOnly?: boolean}> = ({
  thumbnailOnly = false,
}) => {
  ensureMontserratLoaded();
  if (thumbnailOnly) {
    return <Thumbnail />;
  }
  const staticFileSet = new Set(getStaticFiles().map((f) => f.name));
  const playfulDur = timeline.shots.scene12.from;
  const tensionDur = timeline.shots.scene18.from - timeline.shots.scene12.from;
  const triumphDur = timeline.totalDurationInFrames - timeline.shots.scene18.from;

  return (
    <AbsoluteFill style={{backgroundColor: '#020617'}}>
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-playful.wav') && (
        <Sequence from={0} durationInFrames={playfulDur}>
          <BackgroundMusic src="audio/top-5-luc-can-manh-nhat/bgm-playful.wav" volume={0.14} />
        </Sequence>
      )}
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-tension.wav') && (
        <Sequence from={timeline.shots.scene12.from} durationInFrames={tensionDur}>
          <BackgroundMusic src="audio/top-5-luc-can-manh-nhat/bgm-tension.wav" volume={0.16} />
        </Sequence>
      )}
      {staticFileSet.has('audio/top-5-luc-can-manh-nhat/bgm-triumph.wav') && (
        <Sequence from={timeline.shots.scene18.from} durationInFrames={triumphDur}>
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
