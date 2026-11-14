import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {locomotionPose} from '../../../animation/character-motion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
} from '../../../animation/StickmanDirectorKit';
import {DefenseSpikes, GROUND_Y, GlowingHeart, STYLE_ID, SceneFade} from '../kit';
import {timeline} from '../timeline';

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  // Character B walks in during 0-1.2s, then recoils when spikes pop out.
  const approach = spring({frame, fps, config: {damping: 16, stiffness: 90}});
  const spikePop = spring({frame: Math.max(0, frame - 26), fps, config: {damping: 12, stiffness: 180}});
  const recoil = interpolate(frame, [26, 48], [0, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mainPose = directorPose({
    preset: spikePop > 0.3 ? 'shocked' : 'slumped',
    originX: 400,
    groundY: GROUND_Y,
    time,
  });

  const visitorX = 830 - approach * 165 + recoil;
  const visitorPose =
    frame < 28
      ? locomotionPose({time, originX: visitorX, groundY: GROUND_Y, speed: 120, mode: 'walk'})
      : directorPose({preset: 'shocked', originX: visitorX, groundY: GROUND_Y, time, facing: -1});

  return (
    <SceneFade durationInFrames={timeline.shots.scene01.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DefenseSpikes cx={400} cy={GROUND_Y - 310} progress={spikePop} />
        <DirectorCharacter pose={mainPose} styleId={STYLE_ID} />
        <GlowingHeart x={400} y={GROUND_Y - 320} scale={0.75} locked />
        <DirectorCharacter pose={visitorPose} styleId={STYLE_ID} accessory="scarf" />
      </DirectorStage>
      <DirectorCaption text="Muốn được thương nhưng lại đẩy ra?" styleId={STYLE_ID} />
    </SceneFade>
  );
};
