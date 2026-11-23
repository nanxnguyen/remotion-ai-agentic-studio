// shots/thumb.js — Dạ Hành Dị Tạp YouTube thumbnails (2 A/B variants)
import { E, V, registerShot, mood, veil, glow, blurLayer } from '/engine/core.js';
import * as D from '/engine/ditap.js';
import { NAM, THAY_TU, BONG_MA } from '../cast.js';

registerShot('thumb', {
  draw(g, t, info) {
    blurLayer(g, 7, (bg) => D.ditapAltar(bg, { z: 1.08, x: -120 }, 0.6, mood('altarRoom'), { blur: 0, photoEyes: 0.9 }));
    veil(g, '#000000', 0.38);
    glow(g, E.W * 0.76, E.H * 0.48, V(380, 320), '#d1121f', 0.42);
    D.ditapBigFace(g, E.W * 0.76, E.H * 0.53, V(255, 215), {
      ...THAY_TU,
      khanTang: true,
      expr: 'shocked',
      look: [-0.25, 0.05],
      rimColor: '#ff3a3a',
      t: 0.6,
    });
    D.ditapThumbText(g, {
      lines: ['32 CHIẾC', 'KHĂN TANG'],
      x: E.W * 0.04,
      y: E.H * 0.33,
      size: V(132, 108),
      accent: '#e01b24',
    });
  },
});

registerShot('thumb2', {
  draw(g, t, info) {
    blurLayer(g, 6, (bg) => D.ditapVillageStreet(bg, { z: 1.12, x: 80 }, 0.8, { moodName: 'bloodMoon' }));
    veil(g, '#000000', 0.34);
    D.ditapFigure(g, {
      ...BONG_MA,
      x: E.W * 0.8,
      y: E.H * 0.92,
      s: V(2.4, 2.0),
      facing: -1,
      alpha: 0.88,
      t: 0.8,
    });
    D.ditapFigure(g, {
      ...NAM,
      x: E.W * 0.56,
      y: E.H * 0.92,
      s: V(2.55, 2.1),
      pose: 'holdJar',
      prop: 'jar',
      expr: 'scared',
      look: [0.6, -0.1],
      t: 0.8,
    });
    D.ditapThumbText(g, {
      lines: ['ĐỪNG ĐẾM', 'NGƯỜI DƯ'],
      x: E.W * 0.05,
      y: E.H * 0.3,
      size: V(146, 114),
      accent: '#ff2e38',
    });
  },
});
