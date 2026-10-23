import {describe, expect, it} from 'vitest';
import {
  DURATION_FRAMES, FPS, TRANSITION_FRAMES, scenes, shotStarts,
} from '../../src/videos/17-tin-nhan-khong-loi-chuc/timeline';

describe('17 messages - ray emotional stick shorts', () => {
  it('is a 42.5 second real 60fps composition with 16 visually distinct shots', () => {
    expect(FPS).toBe(60);
    expect(DURATION_FRAMES).toBe(2550);
    expect(scenes).toHaveLength(16);
    expect(new Set(scenes.map((scene) => scene.kind)).size).toBe(16);
  });

  it('offers enough frames for smooth 48-frame overlap at every boundary', () => {
    expect(TRANSITION_FRAMES).toBe(24);
    expect(scenes.every((s) => s.durationInFrames > TRANSITION_FRAMES * 2)).toBe(true);
    expect(shotStarts[0]).toBe(0);
    expect(shotStarts.every((v,i) => i === 0 || v > shotStarts[i-1])).toBe(true);
    expect(shotStarts[15] + scenes[15].durationInFrames).toBe(2550);
  });

  it('opens on a specific hook and resolves with compassion', () => {
    expect(scenes[0].lines[0]).toContain('17 TIN NHẮN');
    expect(scenes[1].lines[0]).toContain('0 LỜI CHÚC');
    expect(scenes[15].lines.join(' ')).toContain('ĐƯỢC THƯƠNG');
  });
});
