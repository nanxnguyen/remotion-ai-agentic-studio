import React from 'react';
import {Sequence} from 'remotion';
import {timeline} from './timeline';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';

export const SoNoiKhong = () => (
  <>
    <Sequence from={timeline.shots.scene01.from} durationInFrames={timeline.shots.scene01.duration}><Scene01 /></Sequence>
    <Sequence from={timeline.shots.scene02.from} durationInFrames={timeline.shots.scene02.duration}><Scene02 /></Sequence>
    <Sequence from={timeline.shots.scene03.from} durationInFrames={timeline.shots.scene03.duration}><Scene03 /></Sequence>
    <Sequence from={timeline.shots.scene04.from} durationInFrames={timeline.shots.scene04.duration}><Scene04 /></Sequence>
    <Sequence from={timeline.shots.scene05.from} durationInFrames={timeline.shots.scene05.duration}><Scene05 /></Sequence>
    <Sequence from={timeline.shots.scene06.from} durationInFrames={timeline.shots.scene06.duration}><Scene06 /></Sequence>
    <Sequence from={timeline.shots.scene07.from} durationInFrames={timeline.shots.scene07.duration}><Scene07 /></Sequence>
  </>
);
