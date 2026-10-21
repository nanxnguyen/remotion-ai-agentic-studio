import React from 'react';
import {describe, expect, it} from 'vitest';
import {
  defineSequentialTimeline,
  defineVideo,
  validateVideoRegistry,
} from '../../src/core/video-definition';

const EmptyVideo: React.FC = () => null;

describe('defineVideo', () => {
  it('returns a valid immutable video definition', () => {
    const video = defineVideo({
      id: 'ExampleReel',
      slug: 'example-reel',
      component: EmptyVideo,
      durationInFrames: 300,
      fps: 30,
      width: 1080,
      height: 1920,
      testFrames: [0, 150, 299],
    });

    expect(video.id).toBe('ExampleReel');
    expect(video.testFrames).toEqual([0, 150, 299]);
    expect(Object.isFrozen(video)).toBe(true);
  });

  it.each([
    ['invalid slug', {slug: 'Not Kebab'}],
    ['invalid composition id', {id: 'bad-id'}],
    ['non-positive duration', {durationInFrames: 0}],
    ['out-of-range test frame', {testFrames: [300]}],
  ])('rejects %s', (_label, override) => {
    expect(() =>
      defineVideo({
        id: 'ExampleReel',
        slug: 'example-reel',
        component: EmptyVideo,
        durationInFrames: 300,
        fps: 30,
        width: 1080,
        height: 1920,
        testFrames: [0],
        ...override,
      }),
    ).toThrow();
  });
});

describe('defineSequentialTimeline', () => {
  it('derives stable frame offsets and total duration', () => {
    const timeline = defineSequentialTimeline([
      {id: 'hook', durationInFrames: 90, voice: 's1.mp3'},
      {id: 'body', durationInFrames: 150, voice: 's2.mp3'},
      {id: 'outro', durationInFrames: 60},
    ] as const);

    expect(timeline.shots).toEqual({
      hook: {from: 0, duration: 90, voice: 's1.mp3'},
      body: {from: 90, duration: 150, voice: 's2.mp3'},
      outro: {from: 240, duration: 60},
    });
    expect(timeline.totalDurationInFrames).toBe(300);
  });

  it('rejects duplicate ids and non-positive durations', () => {
    expect(() =>
      defineSequentialTimeline([
        {id: 'same', durationInFrames: 30},
        {id: 'same', durationInFrames: 30},
      ]),
    ).toThrow(/duplicate/i);
    expect(() => defineSequentialTimeline([{id: 'bad', durationInFrames: -1}])).toThrow(
      /duration/i,
    );
  });
});

describe('validateVideoRegistry', () => {
  it('rejects duplicate composition ids and slugs', () => {
    const video = defineVideo({
      id: 'ExampleReel',
      slug: 'example-reel',
      component: EmptyVideo,
      durationInFrames: 300,
      fps: 30,
      width: 1080,
      height: 1920,
      testFrames: [0],
    });

    expect(() => validateVideoRegistry([video, video])).toThrow(/duplicate/i);
  });

  it('accepts NN-Name ids and requires them to ascend in registry order', () => {
    const make = (id: string, slug: string) =>
      defineVideo({
        id,
        slug,
        component: EmptyVideo,
        durationInFrames: 300,
        fps: 30,
        width: 1080,
        height: 1920,
        testFrames: [0],
      });
    const one = make('01-FirstReel', 'first');
    const two = make('02-SecondReel', 'second');
    expect(() => validateVideoRegistry([one, two])).not.toThrow();
    expect(() => validateVideoRegistry([two, one])).toThrow(/out of order/i);
    expect(() => make('1-BadReel', 'bad')).toThrow(/invalid composition id/i);
  });
});
