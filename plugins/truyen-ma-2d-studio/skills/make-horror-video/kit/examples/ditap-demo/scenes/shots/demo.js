// shots/demo.js — Dạ Hành Dị Tạp (Option C) 8-shot showcase
import { E, V, registerShot, mood, layer, backdrop, veil, ease, prog, glow, alpha } from '/engine/core.js';
import * as H from '/engine/horror.js';
import * as D from '/engine/ditap.js';
import { NAM, THAY_TU, BA_NGOAI, BONG_MA } from '../cast.js';

const beats = await fetch('/project/timeline/beats.json')
  .then((r) => (r.ok ? r.json() : []))
  .catch(() => []);

// d01 HOOK — village street at dusk; Nam carries a sealed jar while a faceless ghost lingers behind
registerShot('d01', {
  draw(g, t, info) {
    const cam = { z: H.creep(t, info.dur, 0.08), x: -20 + t * 14 };
    const { GY } = D.ditapVillageStreet(g, cam, t, { moodName: 'ghostNight' });
    layer(g, cam, 0.78, (lg) => {
      D.ditapFigure(lg, { ...BONG_MA, x: E.W * 0.72, y: GY - 4, s: V(1.35, 1.15), facing: -1, t, seed: 5, alpha: 0.72 });
    });
    layer(g, cam, 1, (lg) => {
      D.ditapFigure(lg, { ...NAM, x: E.W * 0.36, y: GY, s: V(1.75, 1.45), t, pose: 'holdJar', prop: 'jar', expr: 'worried', look: [0.4, 0.1] });
    });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d02 TITLE CARD — pure black card after the 3s hook (silent beat gap in beats.json)
registerShot('d02', {
  draw(g, t, info) {
    D.ditapTitleCard(g, t, {
      emblem: 'scarf',
      title: 'CHIẾC KHĂN TANG THỨ 32',
      sub: 'KHÔNG ĐƯỢC ĐẾM LẠI KHI ĐÈN TẮT',
      dur: info.dur,
    });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d03 SETUP — folk specialist Thầy Tư (scar + blindEye + cane) warns Nam on the street
registerShot('d03', {
  draw(g, t, info) {
    const cam = { z: 1.05, x: 10 - t * 8 };
    const { GY } = D.ditapVillageStreet(g, cam, t, { moodName: 'ghostNight' });
    layer(g, cam, 1, (lg) => {
      D.ditapFigure(lg, { ...THAY_TU, x: E.W * 0.34, y: GY, s: V(1.85, 1.55), t, pose: 'cane', prop: 'cane', expr: 'determined', viseme: t % 0.6 < 0.3 ? 'A' : 'O' });
      D.ditapFigure(lg, { ...NAM, x: E.W * 0.66, y: GY, s: V(1.78, 1.5), facing: -1, t, pose: 'stand', expr: 'worried', look: [-0.6, 0] });
    });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d04 DREAD — blurred ancestor hall with hoành phi plaque, veiled mirrors, candles; hush before scare
registerShot('d04', {
  draw(g, t, info) {
    const M = mood('altarRoom');
    const cam = { z: 1.0 + 0.08 * ease.inOut(t / info.dur), y: -10 };
    const { GY } = D.ditapAltar(g, cam, t, M, {
      blur: 6,
      photoEyes: ease.in(prog(t, 1.5, 2.8)) * 0.7,
      mirrorPeek: ease.in(prog(t, 1.8, 2.9)) * 0.6,
    });
    layer(g, cam, 1, (lg) => {
      D.ditapFigure(lg, { ...BA_NGOAI, x: E.W * 0.25, y: GY, s: V(1.7, 1.45), t, pose: 'holdJar', prop: 'jar', expr: 'sad' });
    });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d05 SCARE — close-up faceless apparition with zoom punch, heartbeat vignette & white scare flash
registerShot('d05', {
  draw(g, t, info) {
    const at = 0.08;
    const M = mood('altarRoom');
    const [dx, dy] = H.dread(t, 0.7, 4);
    const cam = { z: H.punch(t, at, 0.24), x: dx, y: dy };
    D.ditapAltar(g, cam, t, M, { blur: 8, vignette: 0.78 });
    layer(g, cam, 1, (lg) => {
      D.ditapBigFace(lg, E.W * 0.5, E.H * 0.48, V(220, 190), {
        ...BONG_MA,
        t,
        faceless: true,
        expr: 'shocked',
        viseme: 'A',
        rimColor: '#e02424',
      });
    });
    H.heartbeatVignette(g, t, { bpm: 118, a: 0.5 });
    H.scareFlash(g, t, at, { dur: 0.16 });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d06 DREAD — modern-tech phone glow inside altar room revealing mirror anomaly
registerShot('d06', {
  draw(g, t, info) {
    const M = mood('altarRoom');
    const cam = { z: 1.08 + 0.05 * t, x: -24 };
    const { GY } = D.ditapAltar(g, cam, t, M, { blur: 5.5, mirrorPeek: 0.95 });
    layer(g, cam, 1, (lg) => {
      D.ditapFigure(lg, { ...NAM, x: E.W * 0.38, y: GY, s: V(1.85, 1.55), t, pose: 'phone', prop: 'phone', expr: 'scared', look: [0.8, -0.1] });
    });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d07 TWIST — dramatic close-up of scarred, blind-eyed narrator revealing identity
registerShot('d07', {
  draw(g, t, info) {
    const cam = { z: H.creep(t, info.dur, 0.14) };
    D.ditapAltar(g, cam, t, mood('bloodMoon'), { blur: 9, vignette: 0.82 });
    layer(g, cam, 1, (lg) => {
      D.ditapBigFace(lg, E.W * 0.5, E.H * 0.48, V(215, 185), {
        ...THAY_TU,
        khanTang: true,
        t,
        expr: 'eerie',
        viseme: t % 0.5 < 0.25 ? 'E' : 'M',
        look: [0, 0.08],
        rimColor: '#d1121f',
      });
    });
    H.heartbeatVignette(g, t, { bpm: 102, a: 0.45 });
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});

// d08 CTA — 4th-wall black-mirror reflection tease on darkened glass screen
registerShot('d08', {
  draw(g, t, info) {
    backdrop(g, ['#020306', '#0b0e16']);
    const fadeGlass = ease.out(prog(t, 0.2, 1.4));
    // Subtle dark screen reflection silhouette watching back at the viewer
    D.ditapBigFace(g, E.W * 0.5, E.H * 0.49, V(185, 165), {
      outfit: 'mourning',
      shirtColor: '#191d28',
      skin: '#272e3b',
      hair: 'cap',
      hairColor: '#10131a',
      khanTang: true,
      outline: '#090b10',
      faceless: t < 1.2,
      expr: 'eerie',
      alpha: 0.46 * fadeGlass,
      rimColor: '#4a5a7a',
      t,
    });
    if (t >= 1.2) {
      const eg = ease.out(prog(t, 1.2, 2.0));
      glow(g, E.W * 0.5 - 62, E.H * 0.49, 28, '#ff3535', 0.45 * eg);
      glow(g, E.W * 0.5 + 62, E.H * 0.49, 28, '#ff3535', 0.45 * eg);
    }
    // Diagonal black-mirror glass reflection streak
    g.save();
    g.globalAlpha = 0.08;
    g.fillStyle = '#a8c2e8';
    g.beginPath();
    g.moveTo(E.W * 0.12, 0);
    g.lineTo(E.W * 0.28, 0);
    g.lineTo(E.W * 0.08, E.H);
    g.lineTo(-E.W * 0.08, E.H);
    g.closePath();
    g.fill();
    g.restore();
    veil(g, '#000000', 0.24);
    D.ditapTimedSubtitle(g, info.globalT, beats);
  },
});
