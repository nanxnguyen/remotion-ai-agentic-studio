import {describe, expect, it} from 'vitest';
import {editorialQuoteVideo} from '../../src/videos/editorial-quote';
import {videoRegistry} from '../../src/videos/registry';

describe('editorial quote starter', () => {
  it('registers the public demo', () => {
    expect(videoRegistry.find((video) => video.id === 'EditorialQuoteReel')).toBe(
      editorialQuoteVideo,
    );
  });

  it('has deterministic 9:16 metadata and valid golden test frames', () => {
    expect(editorialQuoteVideo.fps).toBe(30);
    expect(editorialQuoteVideo.width).toBe(1080);
    expect(editorialQuoteVideo.height).toBe(1920);
    expect(editorialQuoteVideo.testFrames).toEqual([0, 60, 119]);
  });
});
