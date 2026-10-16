import type React from 'react';

export type VideoDefinition<Props extends Record<string, unknown> = Record<string, never>> =
  Readonly<{
    id: string;
    slug: string;
    component: React.ComponentType<Props>;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
    defaultProps?: Props;
    testFrames: readonly number[];
    tags?: readonly string[];
  }>;

// Registries intentionally erase individual prop types after each manifest has
// been checked by defineVideo(). This keeps heterogeneous compositions in one
// collection while preserving strict props inside every video module.
export type AnyVideoDefinition = VideoDefinition<any>;

export type SequentialShot<Id extends string = string> = Readonly<{
  id: Id;
  durationInFrames: number;
  voice?: string;
}>;

type TimelineShot = Readonly<{from: number; duration: number; voice?: string}>;

export type SequentialTimeline<Id extends string> = Readonly<{
  shots: Readonly<Record<Id, TimelineShot>>;
  totalDurationInFrames: number;
}>;

const assertPositiveInteger = (label: string, value: number): void => {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
};

export const defineVideo = <Props extends Record<string, unknown> = Record<string, never>>(
  definition: VideoDefinition<Props>,
): VideoDefinition<Props> => {
  if (!/^[A-Z][A-Za-z0-9]*$/.test(definition.id)) {
    throw new Error(`Invalid composition id: ${definition.id}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(definition.slug)) {
    throw new Error(`Invalid video slug: ${definition.slug}`);
  }
  assertPositiveInteger('durationInFrames', definition.durationInFrames);
  assertPositiveInteger('fps', definition.fps);
  assertPositiveInteger('width', definition.width);
  assertPositiveInteger('height', definition.height);
  if (definition.testFrames.length === 0) {
    throw new Error('testFrames must contain at least one frame');
  }
  for (const frame of definition.testFrames) {
    if (!Number.isInteger(frame) || frame < 0 || frame >= definition.durationInFrames) {
      throw new Error(`Test frame ${frame} is outside ${definition.id}`);
    }
  }
  return Object.freeze({...definition, testFrames: Object.freeze([...definition.testFrames])});
};

export const defineSequentialTimeline = <const T extends readonly SequentialShot[]>(
  definitions: T,
): SequentialTimeline<T[number]['id']> => {
  const shots: Record<string, TimelineShot> = {};
  let from = 0;
  for (const shot of definitions) {
    if (shots[shot.id]) {
      throw new Error(`Duplicate shot id: ${shot.id}`);
    }
    assertPositiveInteger(`durationInFrames for ${shot.id}`, shot.durationInFrames);
    shots[shot.id] = Object.freeze({
      from,
      duration: shot.durationInFrames,
      ...(shot.voice ? {voice: shot.voice} : {}),
    });
    from += shot.durationInFrames;
  }
  return Object.freeze({
    shots: Object.freeze(shots) as Readonly<Record<T[number]['id'], TimelineShot>>,
    totalDurationInFrames: from,
  });
};

export const validateVideoRegistry = (videos: readonly AnyVideoDefinition[]): void => {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const video of videos) {
    if (ids.has(video.id)) throw new Error(`Duplicate composition id: ${video.id}`);
    if (slugs.has(video.slug)) throw new Error(`Duplicate video slug: ${video.slug}`);
    ids.add(video.id);
    slugs.add(video.slug);
  }
};
