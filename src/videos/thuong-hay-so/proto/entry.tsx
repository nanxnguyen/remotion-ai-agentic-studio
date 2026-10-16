// Prototype entry (design-agent only). Separate Remotion entry so stills render
// WITHOUT touching src/Root.tsx: `npx remotion still src/thuong-hay-so-bat-dau-lai/proto/index.ts <CompId> ...`
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {
  BoardTile,
  DiacriticsTest,
  END_DUR,
  HOOK_DUR,
  ProtoEnd,
  ProtoHook,
  ProtoTurn,
  TURN_DUR,
} from './scenes';

export const ProtoRoot: React.FC = () => (
  <>
    <Composition
      id="THS-ProtoHook"
      component={ProtoHook}
      durationInFrames={HOOK_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="THS-ProtoTurn"
      component={ProtoTurn}
      durationInFrames={TURN_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="THS-ProtoEnd"
      component={ProtoEnd}
      durationInFrames={END_DUR}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="THS-Board"
      component={BoardTile}
      durationInFrames={30}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="THS-Diacritics"
      component={DiacriticsTest}
      durationInFrames={30}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(ProtoRoot);
