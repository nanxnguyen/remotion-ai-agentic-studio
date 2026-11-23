import React from 'react';
import {AbsoluteFill, Sequence, getStaticFiles} from 'remotion';
import {BackgroundMusic, SfxTrack} from '../../core';
import {timeline} from './timeline';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';

export const DaiDuongSauLongformVideo: React.FC = () => {
  const staticFileSet = new Set(getStaticFiles().map((f) => f.name));
  const bgm = 'audio/dai-duong-sau-thuc-te/bgm-abyss.wav';
  const whoosh = 'audio/dai-duong-sau-thuc-te/whoosh.wav';
  const ping = 'audio/dai-duong-sau-thuc-te/sonar-ping.wav';
  const hit = 'audio/dai-duong-sau-thuc-te/abyss-hit.wav';

  return (
    <AbsoluteFill style={{backgroundColor: '#020612'}}>
      {staticFileSet.has(bgm) && (
        <Sequence from={0} durationInFrames={timeline.totalDurationInFrames}>
          <BackgroundMusic src={bgm} volume={0.26} />
        </Sequence>
      )}

      <Sequence
        from={timeline.shots.scene01.from}
        durationInFrames={timeline.shots.scene01.duration}
      >
        <Scene01 />
        {staticFileSet.has(hit) && <SfxTrack src={hit} from={0} volume={0.65} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene02.from}
        durationInFrames={timeline.shots.scene02.duration}
      >
        <Scene02 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.5} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene03.from}
        durationInFrames={timeline.shots.scene03.duration}
      >
        <Scene03 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.5} />}
        {staticFileSet.has(ping) && <SfxTrack src={ping} from={20} volume={0.4} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene04.from}
        durationInFrames={timeline.shots.scene04.duration}
      >
        <Scene04 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.5} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene05.from}
        durationInFrames={timeline.shots.scene05.duration}
      >
        <Scene05 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.5} />}
        {staticFileSet.has(ping) && <SfxTrack src={ping} from={450} volume={0.45} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene06.from}
        durationInFrames={timeline.shots.scene06.duration}
      >
        <Scene06 />
        {staticFileSet.has(hit) && <SfxTrack src={hit} from={0} volume={0.6} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene07.from}
        durationInFrames={timeline.shots.scene07.duration}
      >
        <Scene07 />
        {staticFileSet.has(hit) && <SfxTrack src={hit} from={0} volume={0.7} />}
      </Sequence>
    </AbsoluteFill>
  );
};
