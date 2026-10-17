import {describe, expect, it} from 'vitest';
import {defineVoiceTimeline, framesForVoice} from '../../src/core/voice-timeline';

describe('framesForVoice', () => {
  it('rounds the measured clip up so speech is never cut', () => {
    expect(framesForVoice(6.48, 30)).toBe(195);
    expect(framesForVoice(6.481, 30)).toBe(195);
    expect(framesForVoice(6.4834, 30)).toBe(195);
    expect(framesForVoice(6.5, 30)).toBe(195);
    expect(framesForVoice(6.501, 30)).toBe(196);
  });

  it('adds lead-in and hold frames around the clip', () => {
    expect(framesForVoice(2, 30, {leadInFrames: 6, holdFrames: 30})).toBe(96);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])('rejects clip length %s', (seconds) => {
    expect(() => framesForVoice(seconds, 30)).toThrow();
  });

  it('rejects negative or fractional padding', () => {
    expect(() => framesForVoice(2, 30, {holdFrames: -1})).toThrow();
    expect(() => framesForVoice(2, 30, {leadInFrames: 1.5})).toThrow();
  });
});

describe('defineVoiceTimeline', () => {
  it('builds sequential shots from measured voice seconds', () => {
    const timeline = defineVoiceTimeline(
      [
        {id: 's1', voiceSeconds: 3, voice: 'audio/demo/s1.mp3'},
        {id: 's2', voiceSeconds: 1.2, holdFrames: 60},
      ] as const,
      30,
    );
    expect(timeline.shots).toEqual({
      s1: {from: 0, duration: 90, voice: 'audio/demo/s1.mp3'},
      s2: {from: 90, duration: 96},
    });
    expect(timeline.totalDurationInFrames).toBe(186);
  });

  it('starts each clip after its lead-in', () => {
    const timeline = defineVoiceTimeline([{id: 'hook', voiceSeconds: 1, leadInFrames: 9}], 30);
    expect(timeline.shots.hook).toEqual({from: 0, duration: 39, voiceFrom: 9});
  });
});
