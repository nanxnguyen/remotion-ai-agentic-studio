// Prototype entry (design-agent only). Separate Remotion entry so stills render
// WITHOUT touching src/Root.tsx: `npx remotion still src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/index.tsx <CompId> ...`
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {BoardTile, END_DUR, HOOK_DUR, ProtoEnd, ProtoHook, ProtoTurn, TURN_DUR} from './scenes';

export const ProtoRoot: React.FC = () => (
  <>
    <Composition
      id="DBT-ProtoHook"
      component={ProtoHook}
      durationInFrames={HOOK_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="DBT-ProtoTurn"
      component={ProtoTurn}
      durationInFrames={TURN_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="DBT-ProtoEnd"
      component={ProtoEnd}
      durationInFrames={END_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="DBT-Board"
      component={BoardTile}
      durationInFrames={30}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(ProtoRoot);
