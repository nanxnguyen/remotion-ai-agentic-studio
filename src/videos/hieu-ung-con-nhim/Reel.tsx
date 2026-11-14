import React from 'react';
import {Sequence, getStaticFiles} from 'remotion';
import {VoiceTrack} from '../../core';
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

const SHOT_ENTRIES = [
  {key: 'scene01', file: 'audio/hieu-ung-con-nhim/s1.mp3', Component: Scene01},
  {key: 'scene02', file: 'audio/hieu-ung-con-nhim/s2.mp3', Component: Scene02},
  {key: 'scene03', file: 'audio/hieu-ung-con-nhim/s3.mp3', Component: Scene03},
  {key: 'scene04', file: 'audio/hieu-ung-con-nhim/s4.mp3', Component: Scene04},
  {key: 'scene05', file: 'audio/hieu-ung-con-nhim/s5.mp3', Component: Scene05},
  {key: 'scene06', file: 'audio/hieu-ung-con-nhim/s6.mp3', Component: Scene06},
  {key: 'scene07', file: 'audio/hieu-ung-con-nhim/s7.mp3', Component: Scene07},
  {key: 'scene08', file: 'audio/hieu-ung-con-nhim/s8.mp3', Component: Scene08},
  {key: 'scene09', file: 'audio/hieu-ung-con-nhim/s9.mp3', Component: Scene09},
] as const;

export const HieuUngConNhimReel: React.FC = () => {
  const staticNames = new Set(getStaticFiles().map((f) => f.name));

  return (
    <>
      {SHOT_ENTRIES.map(({key, file, Component}) => {
        const span = timeline.shots[key];
        return (
          <React.Fragment key={key}>
            <Sequence from={span.from} durationInFrames={span.duration}>
              <Component />
            </Sequence>
            {staticNames.has(file) && (
              <VoiceTrack src={file} from={span.from} durationInFrames={span.duration} volume={1} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
