import {describe, expect, it} from 'vitest';
import {
  DIRECTOR_STYLES,
  PORTRAIT_SAFE_AREA,
  arcArrowPoints,
  directorPose,
  interpolateKeyState,
  pointsToSvgPath,
  revealedPolylinePoints,
  underlinePoints,
  validatePortraitCaption,
} from '../../src/animation/stickman-director';

describe('interpolateKeyState', () => {
  it('clamps before first keyframe and after last keyframe', () => {
    const layer = {
      x: 10,
      alpha: 1,
      keys: [
        {t: 1, x: 100, alpha: 0},
        {t: 3, x: 300, alpha: 1},
      ],
    };
    expect(interpolateKeyState(layer, 0).x).toBe(100);
    expect(interpolateKeyState(layer, 0).alpha).toBe(0);
    expect(interpolateKeyState(layer, 5).x).toBe(300);
    expect(interpolateKeyState(layer, 5).alpha).toBe(1);
  });

  it('uses smoothstep midpoint between keyframes', () => {
    const layer = {
      x: 0,
      keys: [
        {t: 0, x: 0, scaleX: 1},
        {t: 2, x: 200, scaleX: 2},
      ],
    };
    const mid = interpolateKeyState(layer, 1);
    expect(mid.x).toBeCloseTo(100, 5);
    expect(mid.scaleX).toBeCloseTo(1.5, 5);
    const quarter = interpolateKeyState(layer, 0.5);
    expect(quarter.x).toBeLessThan(50);
  });
});

describe('kinetic strokes', () => {
  it('reveals polyline progressively from 0 to 1', () => {
    const pts = [
      {x: 0, y: 0},
      {x: 100, y: 0},
      {x: 100, y: 100},
    ];
    expect(revealedPolylinePoints(pts, 0)).toEqual([]);
    expect(revealedPolylinePoints(pts, 1)).toEqual(pts);
    const half = revealedPolylinePoints(pts, 0.5);
    expect(half.length).toBeGreaterThanOrEqual(2);
    expect(half[half.length - 1].x).toBeCloseTo(100, 3);
    expect(half[half.length - 1].y).toBeCloseTo(0, 3);
  });

  it('builds valid SVG paths for underline and arc arrow', () => {
    const ul = underlinePoints(200);
    const arrow = arcArrowPoints(180);
    expect(ul.length).toBe(4);
    expect(arrow.length).toBe(30);
    expect(pointsToSvgPath(ul)).toMatch(/^M\s/);
    expect(pointsToSvgPath(arrow)).toContain(' L ');
  });
});

describe('directorPose & styles', () => {
  it('returns finite coordinates for every director pose preset', () => {
    const presets = [
      'idle',
      'thinking',
      'pointing',
      'shocked',
      'celebrate',
      'slumped',
      'presenting',
      'argue',
    ] as const;

    for (const preset of presets) {
      const pose = directorPose({preset, originX: 540, groundY: 1360, time: 0.5});
      for (const p of [
        pose.head,
        pose.shoulder,
        pose.hip,
        ...pose.elbows,
        ...pose.hands,
        ...pose.knees,
        ...pose.feet,
      ]) {
        expect(Number.isFinite(p.x)).toBe(true);
        expect(Number.isFinite(p.y)).toBe(true);
      }
    }
  });

  it('provides all 6 style presets with required palette tokens', () => {
    expect(Object.keys(DIRECTOR_STYLES)).toEqual([
      'classic-bw',
      'minimal-handdrawn',
      'amber-noir',
      'retro-tv',
      'survival-thriller',
      'dynamic-meme',
    ]);
    for (const style of Object.values(DIRECTOR_STYLES)) {
      expect(style.background).toMatch(/^#/);
      expect(style.ink).toMatch(/^#/);
      expect(style.accent).toMatch(/^#/);
      expect(style.strokeWidth).toBeGreaterThan(0);
    }
  });
});

describe('portrait safe area & single-line captions', () => {
  it('defines 9:16 safe area inside 1080x1920', () => {
    expect(PORTRAIT_SAFE_AREA.x).toBeGreaterThanOrEqual(60);
    expect(PORTRAIT_SAFE_AREA.x + PORTRAIT_SAFE_AREA.w).toBeLessThanOrEqual(1080);
    expect(PORTRAIT_SAFE_AREA.y + PORTRAIT_SAFE_AREA.h).toBeLessThanOrEqual(1920);
  });

  it('rejects multi-line captions and accepts clean single-line cues', () => {
    expect(validatePortraitCaption('Một dòng ngắn gọn').ok).toBe(true);
    expect(validatePortraitCaption('Dòng 1\nDòng 2').ok).toBe(false);
    expect(validatePortraitCaption('').ok).toBe(false);
  });
});
