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
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';

export const DungBienTuoi30ThanhBanAnReel = () => (
  <>
    <Sequence from={timeline.shots.scene01.from} durationInFrames={timeline.shots.scene01.duration}><Scene01 /></Sequence>
    <Sequence from={timeline.shots.scene02.from} durationInFrames={timeline.shots.scene02.duration}><Scene02 /></Sequence>
    <Sequence from={timeline.shots.scene03.from} durationInFrames={timeline.shots.scene03.duration}><Scene03 /></Sequence>
    <Sequence from={timeline.shots.scene04.from} durationInFrames={timeline.shots.scene04.duration}><Scene04 /></Sequence>
    <Sequence from={timeline.shots.scene05.from} durationInFrames={timeline.shots.scene05.duration}><Scene05 /></Sequence>
    <Sequence from={timeline.shots.scene06.from} durationInFrames={timeline.shots.scene06.duration}><Scene06 /></Sequence>
    <Sequence from={timeline.shots.scene07.from} durationInFrames={timeline.shots.scene07.duration}><Scene07 /></Sequence>
    <Sequence from={timeline.shots.scene08.from} durationInFrames={timeline.shots.scene08.duration}><Scene08 /></Sequence>
    <Sequence from={timeline.shots.scene09.from} durationInFrames={timeline.shots.scene09.duration}><Scene09 /></Sequence>
    <Sequence from={timeline.shots.scene10.from} durationInFrames={timeline.shots.scene10.duration}><Scene10 /></Sequence>
    <Sequence from={timeline.shots.scene11.from} durationInFrames={timeline.shots.scene11.duration}><Scene11 /></Sequence>
    <Sequence from={timeline.shots.scene12.from} durationInFrames={timeline.shots.scene12.duration}><Scene12 /></Sequence>
    <Sequence from={timeline.shots.scene13.from} durationInFrames={timeline.shots.scene13.duration}><Scene13 /></Sequence>
    <Sequence from={timeline.shots.scene14.from} durationInFrames={timeline.shots.scene14.duration}><Scene14 /></Sequence>
    <Sequence from={timeline.shots.scene15.from} durationInFrames={timeline.shots.scene15.duration}><Scene15 /></Sequence>
    <Sequence from={timeline.shots.scene16.from} durationInFrames={timeline.shots.scene16.duration}><Scene16 /></Sequence>
  </>
);
