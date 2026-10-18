import React from 'react';
import {useCurrentFrame, spring, type SpringConfig} from 'remotion';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {EASE, mix, ramp} from './motion';

export type MotionTiming =
  | Readonly<{type: 'easing'; ease?: 'smooth' | 'linear' | 'out' | 'snappy' | 'exit'}>
  | Readonly<{type: 'spring'; config?: Partial<SpringConfig>}>;
export type MotionDirection = 'from-left' | 'from-right' | 'from-top' | 'from-bottom';
export type MotionShot<Id extends string = string> = Readonly<{
  id: Id;
  from: number;
  duration: number;
}>;
export type MotionBoundary<Id extends string = string> = Readonly<{
  fromShot: Id;
  toShot: Id;
  type: 'cut' | 'dissolve' | 'slide' | 'push' | 'wipe';
  durationInFrames: number;
  direction?: MotionDirection;
  timing: MotionTiming;
}>;
export type PlannedMotionShot<Id extends string = string> = MotionShot<Id> &
  Readonly<{visualDurationInFrames: number; outgoing?: MotionBoundary<Id>}>;

const integer = (value: number, minimum: number, name: string) => {
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(`${name} must be an integer >= ${minimum}`);
  }
};

/** Visual-only plan. Never use padded durations for narration or captions. */
export const planMotionTimeline = <Id extends string>(
  shots: readonly MotionShot<Id>[],
  boundaries: readonly MotionBoundary<Id>[],
): {shots: PlannedMotionShot<Id>[]; totalDurationInFrames: number} => {
  if (shots.length === 0) throw new Error('Motion needs at least one shot');
  const ids = new Set<string>();
  let end = 0;
  for (const shot of shots) {
    integer(shot.from, 0, 'shot.from');
    integer(shot.duration, 1, 'shot.duration');
    if (!shot.id || ids.has(shot.id)) throw new Error(`Duplicate/empty shot ID: ${shot.id}`);
    if (shot.from !== end) throw new Error(`Noncontiguous shot: ${shot.id}`);
    ids.add(shot.id);
    end += shot.duration;
  }
  const outgoing = new Map<string, MotionBoundary<Id>>();
  for (const boundary of boundaries) {
    const index = shots.findIndex((s) => s.id === boundary.fromShot);
    if (index < 0 || shots[index + 1]?.id !== boundary.toShot) {
      throw new Error('A transition must join adjacent, known shots');
    }
    if (outgoing.has(boundary.fromShot)) throw new Error('Duplicate transition boundary');
    integer(boundary.durationInFrames, boundary.type === 'cut' ? 0 : 1, 'transition duration');
    if (boundary.type === 'cut' && boundary.durationInFrames !== 0) {
      throw new Error('A cut must have zero overlap');
    }
    if (boundary.durationInFrames > Math.min(shots[index].duration, shots[index + 1].duration)) {
      throw new Error('Transition exceeds an adjacent shot');
    }
    outgoing.set(boundary.fromShot, boundary);
  }
  const planned = shots.map((shot, index) => {
    const transition = outgoing.get(shot.id);
    const incoming = index === 0 ? 0 : (outgoing.get(shots[index - 1].id)?.durationInFrames ?? 0);
    if (incoming + (transition?.durationInFrames ?? 0) > shot.duration) {
      throw new Error(`Conflicting transitions in shot ${shot.id}`);
    }
    return {
      ...shot,
      visualDurationInFrames: shot.duration + (transition?.durationInFrames ?? 0),
      outgoing: transition,
    };
  });
  return {shots: planned, totalDurationInFrames: end};
};

export type MotionShotRenderProps<Id extends string = string> = Readonly<{
  id: Id;
  frame: number;
  nominalDurationInFrames: number;
  visualDurationInFrames: number;
  isTail: boolean;
}>;

function ShotVisual<Id extends string>({
  shot,
  renderShot,
}: {
  shot: PlannedMotionShot<Id>;
  renderShot: (props: MotionShotRenderProps<Id>) => React.ReactNode;
}) {
  const frame = useCurrentFrame();
  // Tail frames continue naturally. The video's renderer explicitly controls their motion.
  return (
    <>
      {renderShot({
        id: shot.id,
        frame,
        nominalDurationInFrames: shot.duration,
        visualDurationInFrames: shot.visualDurationInFrames,
        isTail: frame >= shot.duration,
      })}
    </>
  );
}

/** Place only scene visuals here. Keep audio/captions in sibling measured Sequences. */
export function MotionSequence<Id extends string>({
  shots,
  boundaries,
  renderShot,
}: {
  shots: readonly MotionShot<Id>[];
  boundaries: readonly MotionBoundary<Id>[];
  renderShot: (props: MotionShotRenderProps<Id>) => React.ReactNode;
}) {
  const plan = planMotionTimeline(shots, boundaries);
  return (
    <TransitionSeries>
      {plan.shots.flatMap((shot) => {
        const elements: React.ReactNode[] = [
          <TransitionSeries.Sequence key={shot.id} durationInFrames={shot.visualDurationInFrames}>
            <ShotVisual shot={shot} renderShot={renderShot} />
          </TransitionSeries.Sequence>,
        ];
        const boundary = shot.outgoing;
        if (!boundary || boundary.type === 'cut') return elements;
        const timing =
          boundary.timing.type === 'spring'
            ? springTiming({
                durationInFrames: boundary.durationInFrames,
                config: boundary.timing.config,
              })
            : linearTiming({
                durationInFrames: boundary.durationInFrames,
                easing: EASE[boundary.timing.ease ?? 'smooth'],
              });
        const key = `${shot.id}:transition`;
        if (boundary.type === 'dissolve') {
          elements.push(
            <TransitionSeries.Transition key={key} timing={timing} presentation={fade()} />,
          );
        } else if (boundary.type === 'wipe') {
          elements.push(
            <TransitionSeries.Transition
              key={key}
              timing={timing}
              presentation={wipe({direction: boundary.direction ?? 'from-left'})}
            />,
          );
        } else {
          // The official slide presentation pushes the outgoing and incoming scenes together.
          elements.push(
            <TransitionSeries.Transition
              key={key}
              timing={timing}
              presentation={slide({direction: boundary.direction ?? 'from-left'})}
            />,
          );
        }
        return elements;
      })}
    </TransitionSeries>
  );
}

export type MotionCue = Readonly<{from: number; durationInFrames: number; timing?: MotionTiming}>;
export const motionProgress = (frame: number, fps: number, cue: MotionCue): number => {
  integer(cue.from, 0, 'cue.from');
  integer(cue.durationInFrames, 1, 'cue.durationInFrames');
  if (!Number.isFinite(fps) || fps <= 0) throw new Error('fps must be positive');
  if (frame <= cue.from) return 0;
  if (frame >= cue.from + cue.durationInFrames) return 1;
  return cue.timing?.type === 'spring'
    ? spring({
        frame: frame - cue.from,
        fps,
        durationInFrames: cue.durationInFrames,
        config: cue.timing.config,
      })
    : ramp(frame, cue.from, cue.durationInFrames, EASE[cue.timing?.ease ?? 'smooth']);
};

export const staggerFrame = (frame: number, index: number, delayInFrames: number): number => {
  integer(index, 0, 'stagger index');
  integer(delayInFrames, 0, 'stagger delay');
  return frame - index * delayInFrames;
};
export type CameraPose = Readonly<{x: number; y: number; scale: number}>;
export const panZoomStyle = (
  progress: number,
  from: CameraPose,
  to: CameraPose,
): React.CSSProperties => ({
  transform: `translate(${mix(from.x, to.x, progress)}px, ${mix(from.y, to.y, progress)}px) scale(${mix(from.scale, to.scale, progress)})`,
});
export const parallaxOffset = (cameraOffset: number, depth: number): number => cameraOffset * depth;
export const entranceExitStyle = (
  frame: number,
  fps: number,
  options: {
    enter?: MotionCue;
    exit?: MotionCue;
    distance?: number;
  },
): React.CSSProperties => {
  const enter = options.enter ? motionProgress(frame, fps, options.enter) : 1;
  const exit = options.exit ? motionProgress(frame, fps, options.exit) : 0;
  return {
    opacity: Math.max(0, Math.min(1, enter * (1 - exit))),
    transform: `translateY(${(1 - enter - exit) * (options.distance ?? 24)}px)`,
  };
};
