import { test } from 'node:test';
import assert from 'node:assert/strict';
import { E, setStyle } from '../../engine/core.js';
import {
  ditapFigure,
  ditapBigFace,
  ditapAltar,
  ditapVillageStreet,
  ditapTitleCard,
  ditapSubtitle,
  ditapTimedSubtitle,
  ditapWordSubtitle,
  ditapThumbText,
} from '../../engine/ditap.js';
import { mockCtx } from './mockctx.mjs';

setStyle('nhang');

function setAspect(vertical) {
  E.vertical = vertical;
  E.W = vertical ? 1080 : 1920;
  E.H = vertical ? 1920 : 1080;
}

function spyCtx({ measureCharW = 0 } = {}) {
  const base = mockCtx();
  const state = {
    fillStyle: null,
    strokeStyle: null,
    lineWidth: 1,
    font: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetY: 0,
  };
  const drawn = [];
  return new Proxy(base, {
    get(t, k) {
      if (k === 'drawn') return drawn;
      if (k === 'state') return state;
      if (k === 'measureText' && measureCharW > 0) {
        return (s) => ({ width: String(s).length * measureCharW });
      }
      const val = t[k];
      if (typeof val === 'function') {
        return (...args) => {
          if (['fill', 'stroke', 'fillRect', 'strokeRect', 'fillText', 'strokeText', 'roundRect'].includes(k)) {
            drawn.push({
              op: k,
              args,
              fillStyle: state.fillStyle,
              strokeStyle: state.strokeStyle,
              lineWidth: state.lineWidth,
              font: state.font,
              shadowBlur: state.shadowBlur,
              shadowOffsetY: state.shadowOffsetY,
            });
          }
          return val(...args);
        };
      }
      return val;
    },
    set(t, k, v) {
      if (k in state) state[k] = v;
      t[k] = v;
      return true;
    },
  });
}

const texts = (g) => g.log.filter((c) => c[0] === 'fillText').map((c) => String(c[1]));

test('ditapFigure is deterministic and varies cleanly across costumes, traits, and props', () => {
  setAspect(false);
  const g1 = mockCtx();
  const g2 = mockCtx();
  const base = { x: 960, y: 900, s: 1.8, t: 1.2, seed: 3, outfit: 'baBa', expr: 'worried' };
  ditapFigure(g1, base);
  ditapFigure(g2, base);
  assert.deepEqual(g1.log, g2.log);
  assert.ok(g1.log.length > 20);

  const variants = [
    { ...base, outfit: 'mourning', khanTang: true },
    { ...base, scar: true },
    { ...base, beard: true, hair: 'bun', prop: 'cane' },
    { ...base, nonLa: true, prop: 'jar' },
    { ...base, prop: 'phone', look: [0.4, 0.2] },
    { ...base, viseme: 'A' },
  ];
  const sigs = new Set([JSON.stringify(g1.log)]);
  for (const v of variants) {
    const g = mockCtx();
    ditapFigure(g, v);
    sigs.add(JSON.stringify(g.log));
  }
  assert.equal(sigs.size, variants.length + 1);
});

test('ditapFigure and ditapBigFace run DOM-free in both 16:9 and 9:16 via V()', () => {
  try {
    for (const vertical of [false, true]) {
      setAspect(vertical);
      const gf = mockCtx();
      ditapFigure(gf, { t: 0.5, khanTang: true, prop: 'jar' });
      assert.ok(gf.log.length > 15, `ditapFigure vertical=${vertical}`);

      const gb = mockCtx();
      ditapBigFace(gb, E.W / 2, E.H * 0.45, 180, { expr: 'scared', viseme: 'O', khanTang: true });
      assert.ok(gb.log.length > 15, `ditapBigFace vertical=${vertical}`);
    }
  } finally {
    setAspect(false);
  }
});

test('faceless: true suppresses eyes, eyebrows, nose, and mouth even if expr, blindEye, or viseme are passed', () => {
  setAspect(false);
  const gSuppressed = spyCtx();
  ditapBigFace(gSuppressed, 500, 500, 140, {
    faceless: true,
    expr: 'shocked',
    blindEye: 'left',
    viseme: 'A',
    look: [0.6, -0.3],
    scar: true,
  });

  const gCleanFaceless = spyCtx();
  ditapBigFace(gCleanFaceless, 500, 500, 140, { faceless: true });
  assert.deepEqual(gSuppressed.log, gCleanFaceless.log);

  const gWithFace = spyCtx();
  ditapBigFace(gWithFace, 500, 500, 140, { faceless: false, expr: 'shocked', viseme: 'A' });
  assert.ok(gWithFace.log.length > gSuppressed.log.length + 10);

  // Also test on ditapFigure
  const gf1 = spyCtx();
  const gf2 = spyCtx();
  ditapFigure(gf1, { x: 400, y: 800, faceless: true, expr: 'scared', blindEye: 'right', viseme: 'O' });
  ditapFigure(gf2, { x: 400, y: 800, faceless: true });
  assert.deepEqual(gf1.log, gf2.log);
});

test('blindEye draws an opaque milky sphere without dark pupil while healthy eye tracks look', () => {
  setAspect(false);
  const gLeft = spyCtx();
  ditapBigFace(gLeft, 500, 500, 150, { blindEye: 'left', look: [0.8, 0], expr: 'neutral' });

  const gRight = spyCtx();
  ditapBigFace(gRight, 500, 500, 150, { blindEye: 'right', look: [0.8, 0], expr: 'neutral' });

  const gHealthy = spyCtx();
  ditapBigFace(gHealthy, 500, 500, 150, { blindEye: null, look: [0.8, 0], expr: 'neutral' });

  assert.notDeepEqual(gLeft.log, gRight.log);
  assert.notDeepEqual(gLeft.log, gHealthy.log);

  // Healthy has 2 dark pupil fills (#111216); blindEye has exactly 1 dark pupil fill and 1 milky fill (#dce2ea)
  const darkPupilFills = (g) => g.drawn.filter((d) => d.op === 'fill' && d.fillStyle === '#111216').length;
  assert.equal(darkPupilFills(gHealthy), 2, 'expected 2 dark pupil fills when both eyes healthy');
  assert.equal(darkPupilFills(gLeft), 1, 'expected 1 dark pupil fill when left eye is blind');
  assert.equal(darkPupilFills(gRight), 1, 'expected 1 dark pupil fill when right eye is blind');

  const milkyFills = gLeft.drawn.filter((d) => d.op === 'fill' && d.fillStyle === '#dce2ea');
  assert.equal(milkyFills.length, 1, 'expected 1 opaque milky eye sphere fill');

  // Verify healthy pupil actually shifts X when look changes from left [-0.8, 0] to right [0.8, 0]
  const gLookL = spyCtx();
  ditapBigFace(gLookL, 500, 500, 150, { blindEye: 'left', look: [-0.8, 0], expr: 'neutral' });
  const pupilArcX = (g) => {
    const arcs = g.log.filter((c) => c[0] === 'arc' && c[3] > 10 && c[3] < 16);
    return arcs.length ? arcs[0][1] : null;
  };
  assert.ok(pupilArcX(gLookL) < pupilArcX(gLeft), 'healthy pupil X must shift right when look.x increases');

  // Verify ditapBigFace shares outfit/skin palette resolution with ditapFigure
  const gGhost = spyCtx();
  ditapBigFace(gGhost, 500, 500, 140, { outfit: 'ghost', faceless: true });
  assert.ok(gGhost.drawn.some((d) => d.fillStyle === '#d4dce4' || d.fillStyle === '#c9d2da'), 'ditapBigFace should apply ghost palette');
});

test('ditapAltar and ditapVillageStreet execute DOM-free across 16:9 and 9:16', () => {
  try {
    for (const vertical of [false, true]) {
      setAspect(vertical);
      const ga = spyCtx();
      const resA = ditapAltar(ga, { x: 10, y: -5, z: 1.04 }, 1.5, null, { blur: 6 });
      assert.ok(resA && typeof resA.GY === 'number');
      assert.ok(texts(ga).includes('德流光'), 'altar plaque calligraphy missing');
      assert.ok(
        ga.drawn.some((d) => d.op === 'fillRect' && d.args[0] === -E.W && d.fillStyle && typeof d.fillStyle === 'object'),
        'expected gradient fillRect for warm glow & vignette'
      );

      const gv = spyCtx();
      const resV = ditapVillageStreet(gv, { x: -20, y: 0, z: 1.02 }, 2.1);
      assert.ok(resV && typeof resV.GY === 'number');
      const vTexts = texts(gv);
      assert.ok(vTexts.includes('TẠP HOÁ'), 'expected TẠP HOÁ shop sign');
      assert.ok(vTexts.includes('VẢI SỢI'), 'expected VẢI SỢI shop sign');
    }
  } finally {
    setAspect(false);
  }
});

test('ditapTitleCard renders black ground, title, subtitle, tag, and distinct emblems', () => {
  setAspect(false);
  const sigs = new Set();
  for (const emblem of ['boat', 'jar', 'scarf', 'mirror']) {
    const g = spyCtx();
    ditapTitleCard(g, 1.2, {
      emblem,
      title: 'CHIẾC KHĂN TANG THỨ 32',
      sub: 'ĐỪNG ĐẾM LẠI KHI ĐÈN TẮT',
    });
    const bgRect = g.drawn.find((d) => d.op === 'fillRect' && /^#000/i.test(String(d.fillStyle)));
    assert.ok(bgRect, 'expected pure black fillRect ground');
    const txt = texts(g);
    assert.ok(txt.includes('CHIẾC KHĂN TANG THỨ 32'));
    assert.ok(txt.includes('ĐỪNG ĐẾM LẠI KHI ĐÈN TẮT'));
    assert.ok(txt.includes('TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM'));
    sigs.add(JSON.stringify(g.log));
  }
  assert.equal(sigs.size, 4);
});

test('ditapSubtitle handles empty strings, draws NO background fillRect, and wraps long Vietnamese text into <= 2 lines', () => {
  setAspect(false);
  for (const empty of ['', '   ', '\n\t', null, undefined]) {
    const ge = spyCtx();
    ditapSubtitle(ge, empty);
    assert.equal(ge.log.length, 0, `expected no-op for ${JSON.stringify(empty)}`);
  }

  // Short line: crisp white Nunito 800, thick #000 stroke, shadow, ZERO fillRect/roundRect
  const gs = spyCtx({ measureCharW: 22 });
  ditapSubtitle(gs, 'Đừng trả lời khi nghe tiếng gõ.');
  assert.equal(gs.drawn.filter((d) => d.op === 'fillRect' || d.op === 'roundRect').length, 0, 'must NOT draw dark background box');
  const fills = gs.drawn.filter((d) => d.op === 'fillText');
  const strokes = gs.drawn.filter((d) => d.op === 'strokeText');
  assert.equal(fills.length, 1);
  assert.equal(strokes.length, 1);
  assert.ok(fills[0].font.includes('Nunito') && fills[0].font.includes('800'));
  assert.equal(fills[0].fillStyle, '#ffffff');
  assert.ok(strokes[0].lineWidth >= 4);
  assert.ok(fills[0].shadowBlur > 0 || fills[0].shadowOffsetY > 0);

  // Very long Vietnamese string: wraps into <= 2 lines with proportional measureText AND with default mockCtx
  const longStr = 'Đêm ba mươi tháng Chạp năm ấy, bà ngoại dặn tôi tuyệt đối không được đếm lại số chiếc khăn tang treo trên xà nhà trước khi gà gáy sáng.';
  for (const g of [spyCtx({ measureCharW: 24 }), spyCtx()]) {
    ditapSubtitle(g, longStr);
    assert.equal(g.drawn.filter((d) => d.op === 'fillRect' || d.op === 'roundRect').length, 0);
    const outLines = g.drawn.filter((d) => d.op === 'fillText');
    assert.ok(outLines.length >= 1 && outLines.length <= 2, `expected <= 2 lines, got ${outLines.length}`);
    assert.equal(outLines.length, 2, 'long Vietnamese string should wrap into 2 lines');
  }

  // Single unbroken token longer than maxW splits cleanly & scales font size below base size
  const singleG = spyCtx({ measureCharW: 40 });
  const splitLines = ditapSubtitle(singleG, 'KhănTangThứBaMươiHaiKhôngĐếmĐược', { maxW: 500, size: 44 });
  assert.equal(splitLines.length, 2);
  const singleFont = singleG.drawn.find((d) => d.op === 'fillText')?.font || '';
  const renderedSize = parseFloat(singleFont.replace(/^\d+\s+/, ''));
  assert.ok(renderedSize < 44, `expected scaled font < 44 for overflowing single token, got ${singleFont}`);
});

test('ditapTimedSubtitle safely no-ops on missing/empty beats or silence gaps', () => {
  setAspect(false);
  const beats = [
    { start: 0.0, end: 2.0, text: 'Ngoài hiên có tiếng bước chân.' },
    { start: 3.5, end: 6.0, text: 'Nhưng không có ai ở đó cả.' },
  ];

  for (const bad of [undefined, null, []]) {
    const g = spyCtx();
    assert.doesNotThrow(() => ditapTimedSubtitle(g, 1.0, bad));
    assert.equal(g.log.length, 0);
  }

  // Silence gap at t = 2.6
  const gGap = spyCtx();
  ditapTimedSubtitle(gGap, 2.6, beats);
  assert.equal(gGap.log.length, 0);

  // Active beat at t = 4.2
  const gHit = spyCtx({ measureCharW: 22 });
  ditapTimedSubtitle(gHit, 4.2, beats);
  assert.deepEqual(texts(gHit), ['Nhưng không có ai ở đó cả.']);
  assert.equal(gHit.drawn.filter((d) => d.op === 'fillRect').length, 0);
});

test('ditapThumbText renders outlined split-color headline lines', () => {
  setAspect(false);
  const g = spyCtx();
  ditapThumbText(g, { lines: ['ĐỪNG ĐẾM', 'KHĂN TANG'], x: 100, y: 240, size: 140 });
  const txt = texts(g);
  assert.deepEqual(txt, ['ĐỪNG ĐẾM', 'KHĂN TANG']);
  const fills = g.drawn.filter((d) => d.op === 'fillText');
  assert.equal(fills[0].fillStyle, '#ffffff');
  assert.notEqual(fills[1].fillStyle, '#ffffff');
});

test('ditapTimedSubtitle highlights active spoken word in gold when words timeline is available', () => {
  setAspect(false);
  const beats = [{ start: 0.0, end: 2.0, text: 'Xíu, thứ đầu tiên' }];
  const words = [
    { word: 'Xíu,', start: 0.0, end: 0.45 },
    { word: 'thứ', start: 0.48, end: 0.90 },
    { word: 'đầu', start: 0.92, end: 1.35 },
    { word: 'tiên', start: 1.38, end: 1.90 },
  ];
  const g = spyCtx({ measureCharW: 22 });
  ditapTimedSubtitle(g, 0.65, beats, { words });
  assert.equal(g.drawn.filter((d) => d.op === 'fillRect' || d.op === 'roundRect').length, 0);
  const fills = g.drawn.filter((d) => d.op === 'fillText');
  assert.equal(fills.length, 4);
  assert.deepEqual(texts(g), ['Xíu,', 'thứ', 'đầu', 'tiên']);
  assert.equal(fills[1].fillStyle, '#ffd257');
  assert.equal(fills[0].fillStyle, '#ffffff');
});

test('ditapWordSubtitle renders 3-4 word phrase with active word highlighted like reference image', () => {
  setAspect(true);
  const words = [
    { word: 'Xíu,', start: 0.0, end: 0.45 },
    { word: 'thứ', start: 0.48, end: 0.90 },
    { word: 'đầu', start: 0.92, end: 1.35 },
    { word: 'tiên', start: 1.38, end: 1.90 },
  ];
  const g = spyCtx({ measureCharW: 26 });
  ditapWordSubtitle(g, 0.65, { words });
  assert.equal(g.drawn.filter((d) => d.op === 'fillRect' || d.op === 'roundRect').length, 0);
  const fills = g.drawn.filter((d) => d.op === 'fillText');
  assert.equal(fills.length, 4);
  assert.deepEqual(texts(g), ['XÍU,', 'THỨ', 'ĐẦU', 'TIÊN']);
  assert.equal(fills[1].fillStyle, '#ffd257');
  assert.equal(fills[0].fillStyle, '#ffffff');
});
