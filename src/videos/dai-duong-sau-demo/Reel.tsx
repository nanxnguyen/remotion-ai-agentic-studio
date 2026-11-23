import React from 'react';
import {AbsoluteFill, Sequence, getStaticFiles} from 'remotion';
import {BackgroundMusic, SfxTrack} from '../../core';
import {timeline} from './timeline';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';

export const DaiDuongSauDemoReel: React.FC = () => {
  const staticFileSet = new Set(getStaticFiles().map((f) => f.name));
  const bgm = 'audio/dai-duong-sau-demo/bgm-ocean.wav';
  const whoosh = 'audio/dai-duong-sau-demo/whoosh.wav';
  const pop = 'audio/dai-duong-sau-demo/pop.wav';
  const abyssHit = 'audio/dai-duong-sau-demo/abyss-hit.wav';

  return (
    <AbsoluteFill style={{backgroundColor: '#020818'}}>
      {staticFileSet.has(bgm) && (
        <Sequence from={0} durationInFrames={timeline.totalDurationInFrames}>
          <BackgroundMusic src={bgm} volume={0.22} />
        </Sequence>
      )}

      <Sequence
        from={timeline.shots.scene01.from}
        durationInFrames={timeline.shots.scene01.duration}
      >
        <Scene01 />
        {staticFileSet.has(pop) && <SfxTrack src={pop} from={6} volume={0.5} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene02.from}
        durationInFrames={timeline.shots.scene02.duration}
      >
        <Scene02 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.55} />}
        {staticFileSet.has(pop) && <SfxTrack src={pop} from={85} volume={0.55} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene03.from}
        durationInFrames={timeline.shots.scene03.duration}
      >
        <Scene03 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.55} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene04.from}
        durationInFrames={timeline.shots.scene04.duration}
      >
        <Scene04 />
        {staticFileSet.has(whoosh) && <SfxTrack src={whoosh} from={0} volume={0.55} />}
        {staticFileSet.has(pop) && <SfxTrack src={pop} from={60} volume={0.5} />}
      </Sequence>

      <Sequence
        from={timeline.shots.scene05.from}
        durationInFrames={timeline.shots.scene05.duration}
      >
        <Scene05 />
        {staticFileSet.has(abyssHit) && <SfxTrack src={abyssHit} from={0} volume={0.7} />}
        {staticFileSet.has(abyssHit) && <SfxTrack src={abyssHit} from={105} volume={0.65} />}
      </Sequence>
    </AbsoluteFill>
  );
};
