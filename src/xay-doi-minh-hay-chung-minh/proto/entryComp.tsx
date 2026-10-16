// Proto-only compositions (design-agent scope).
import React from 'react';
import {Composition, useCurrentFrame} from 'remotion';
import {BoardFrame} from './BoardFrame';
import {HOOK_DUR, ProtoHook} from './ProtoHook';
import {ProtoEnd} from './ProtoEnd';
import {ProtoTurn} from './ProtoTurn';
import {S2bFace, S5bFaceReturn, S5bInterior, S9aBrick} from './Details';

const KEYS = ['s1', 's2a', 's2b', 's3', 's4', 's5a1', 's5a2', 's5b', 's6', 's7a', 's7b', 's8', 's9a', 's9b', 's10', 's11'];

const Board16: React.FC = () => {
  const frame = useCurrentFrame();
  return <BoardFrame k={KEYS[Math.min(16, frame + 1) - 1]} />;
};

const S5bChip: React.FC = () => <S5bInterior chip />;

export const ProtoEntry: React.FC = () => (
  <>
    <Composition id="XDM-Hook" component={ProtoHook} durationInFrames={HOOK_DUR} fps={30} width={1080} height={1920} />
    <Composition id="XDM-Turn" component={ProtoTurn} durationInFrames={110} fps={30} width={1080} height={1920} />
    <Composition id="XDM-End" component={ProtoEnd} durationInFrames={119} fps={30} width={1080} height={1920} />
    <Composition id="XDM-Board" component={Board16} durationInFrames={16} fps={30} width={1080} height={1920} />
    <Composition id="XDM-S2b" component={S2bFace} durationInFrames={70} fps={30} width={1080} height={1920} />
    <Composition id="XDM-S5b" component={S5bInterior} durationInFrames={150} fps={30} width={1080} height={1920} />
    <Composition id="XDM-S5bChip" component={S5bChip} durationInFrames={150} fps={30} width={1080} height={1920} />
    <Composition id="XDM-S5bFace" component={S5bFaceReturn} durationInFrames={90} fps={30} width={1080} height={1920} />
    <Composition id="XDM-S9a" component={S9aBrick} durationInFrames={87} fps={30} width={1080} height={1920} />
  </>
);
