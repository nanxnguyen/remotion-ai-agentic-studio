// Proto-only compositions (design-agent scope). Entry for stills:
// npx remotion still src/chung-minh-de-lam-gi/proto/entry.tsx <CompId> out/qa/... --frame=N
import React from 'react';
import {Composition} from 'remotion';
import {BoardFrame} from './Board';
import {END_DUR, ProtoEnd} from './ProtoEnd';
import {HOOK_DUR, ProtoHook} from './ProtoHook';
import {ProtoTurn, TURN_DUR} from './ProtoTurn';
import {S2B_DUR, S2bClose} from './S2bClose';

export const ProtoEntry: React.FC = () => (
  <>
    <Composition id="CMG-Hook" component={ProtoHook} durationInFrames={HOOK_DUR} fps={30} width={1080} height={1920} />
    <Composition id="CMG-Turn" component={ProtoTurn} durationInFrames={TURN_DUR} fps={30} width={1080} height={1920} />
    <Composition id="CMG-End" component={ProtoEnd} durationInFrames={END_DUR} fps={30} width={1080} height={1920} />
    <Composition id="CMG-S2b" component={S2bClose} durationInFrames={S2B_DUR} fps={30} width={1080} height={1920} />
    <Composition id="CMG-Board" component={BoardFrame} durationInFrames={15} fps={30} width={1080} height={1920} />
  </>
);
