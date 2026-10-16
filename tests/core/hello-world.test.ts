import {describe, expect, it} from 'vitest';
import {helloWorldVideo} from '../../src/videos/hello-world';
import {videoRegistry} from '../../src/videos/registry';

describe('zero-key demo', () => {
  it('is registered as a public sample composition', () => {
    expect(videoRegistry.find((video) => video.id === 'HelloWorldReel')).toBe(helloWorldVideo);
  });

  it('is a deterministic 9:16 video with valid test frames', () => {
    expect(helloWorldVideo.width).toBe(1080);
    expect(helloWorldVideo.height).toBe(1920);
    expect(helloWorldVideo.fps).toBe(30);
    expect(helloWorldVideo.durationInFrames).toBe(150);
    expect(helloWorldVideo.testFrames).toEqual([0, 75, 149]);
  });
});
