// engine/chibi-shot.js — reusable shot renderer for chibi-history-video projects (skill v0.9+).
// Draws one shot from story/shots.json params: story-matched set (+options), shot-size framing with a camera that
// never reveals the canvas edge, punch-ins, cast from config objects or cast.js keys, acting (enter / clash /
// standoff + impact + shake), patient-in-bed (bedchamber), A Xìn tea table, army kept in the background band,
// chapter corner tag + chapter-open stamp (both below the 60px letterbox), comic badge and stamp.
// Project usage (scenes/shots/main.js):  drawChibiShot(g, t, { ...info, shot, index }, CAST)
import { clamp, ease, prog, lerp, text } from './core.js';
import {
  drawChibiPawn, drawSoldierCrowd, drawChibiSet,
  drawComicBadge, drawStamp, drawChapterCard, drawChapterTag, drawChapterOpen, drawImpact, boatTilt,
  drawArrowRain, drawCtaButton, drawSpeechBubble,
} from './chibi.js';

export function drawChibiShot(g, t, info, CAST) {
  const shot = info?.shot || {};
  const p = shot.params || {};
  const dur = Math.max(0.5, (shot.end || t + 3) - (shot.start || 0));
  const k = clamp(t / dur);

  // 1. Chapter title card if this shot announces a chapter
  if (p.chTitle) {
    drawChapterCard(g, p.ch, p.chTitle, t);
    return;
  }

  // 2. Dynamic camera pan / zoom (always alive)
  // Film grammar: shot size drives framing (wide = whole set, medium = waist-up, closeup = faces).
  const setKind = p.set || 'hills';
  const charKeys0 = p.chars && p.chars.length ? p.chars : ['TAO_THAO', 'LUU_BI'];
  const n0 = charKeys0.length;
  const slots0 = p.slots || (n0 === 1 ? [960] : n0 === 2 ? [620, 1300] : [480, 960, 1440]);
  const SIZE_ZOOM = { wide: 1.0, medium: 1.12, closeup: 1.3, close: 1.3, insert: 1.38 };
  const charStage = !['tacticalMap', 'teaTable', 'bedchamber'].includes(setKind) && !(p.arrows && p.arrows.length);
  const baseZoom = charStage ? (SIZE_ZOOM[shot.size] || 1.0) : 1.0;
  // punch-in on jokes / stamps: quick 8% push then settle; shake on clash impact
  const punch = p.punch ? 0.08 * (1 - ease.out(clamp(t / 0.6))) * ease.out(clamp(t / 0.12)) : 0;
  const zoom = baseZoom * (1 + punch) * (p.soi ? lerp(1.04, 1.12, ease.out(k)) : lerp(1.0, 1.05, k));
  const IMPACT_T = 0.45;
  const shakeAmp = p.action === 'clash' || p.action === 'standoff' ? Math.max(0, 1 - Math.abs(t - IMPACT_T - 0.1) / 0.3) * 14 : 0;
  const panX = (p.crowd ? lerp(35, -45, k) : Math.sin((info?.index || 0) * 1.7 + k * 2) * 18) + Math.sin(t * 90) * shakeAmp;
  const panY = Math.cos(t * 77) * shakeAmp * 0.6;
  const fx = baseZoom > 1 ? lerp(960, slots0[(info?.index || 0) % n0], 0.6) : 960;
  const fy = baseZoom > 1 ? 600 : 540;
  // keep the camera inside the 1920x1080 set: never reveal the canvas edge (black bars) when panning/zooming
  const z = Math.max(zoom, 1 + (2 * Math.max(Math.abs(panX), Math.abs(panY) * 1.78)) / 1920 + 0.01);
  const cfx = clamp(fx, (960 + panX) / z, 1920 - (960 - panX) / z);
  const cfy = clamp(fy, (540 + panY) / z, 1080 - (540 - panY) / z);
  g.save();
  g.translate(960 + panX, 540 + panY);
  g.scale(z, z);
  g.translate(-cfx, -cfy);

  // 3. Background set (story-matched; see engine/chibi.js EXTRA_SETS + campaign map)
  // alt angles (split pieces) continue the set's animation instead of restarting it
  drawChibiSet(g, setKind, t + (p.alt || 0) * 2.5, {
    fire: !!p.fire, gateOpen: !!p.gateOpen, crowd: !!p.crowd, faction: p.faction, chained: !!p.chained,
    straw: !!p.straw, night: !!p.night, arrows: p.arrows, places: p.places, label: p.label, focus: p.focus,
    era: p.era, notice: p.notice, snow: !!p.snow, tilt: p.tilt,
  });
  const mapTokens = setKind === 'tacticalMap' && p.arrows && p.arrows.length;

  // 4. Optional cloned soldier crowd
  if (p.crowd && setKind === 'riverbank') {
    // archers lined up on the left shore, shooting out over the water
    drawSoldierCrowd(g, { startX: 440, endX: 860, horizonY: 580, groundY: 700, rows: 2, cols: 4, t });
  } else if (p.crowd && ['battlefield', 'hills', 'forestCamp', 'cityGate', 'snowWall', 'siege'].includes(setKind)) {
    // army stays in the background band (behind and smaller than the named cast)
    drawSoldierCrowd(g, {
      startX: 140, endX: 1780, horizonY: 470, groundY: 640, rows: 2, cols: 9, t,
    });
  }

  // volley: arrows flying out from the archers (p.volley = 1 left->right, -1 right->left)
  if (p.volley) drawArrowRain(g, t, { x0: p.volley > 0 ? 200 : 700, x1: p.volley > 0 ? 1500 : 1900, y0: 120, y1: 620, count: 34, dir: p.volley, seed: 21 });

  // 5. Characters on stage
  const charKeys = p.chars && p.chars.length ? p.chars : ['TAO_THAO', 'LUU_BI'];
  const n = charKeys.length;
  const enter = ease.outBack(prog(t, 0.0, 0.35));
  const npAlpha = prog(t, 0.05, 0.35);

  if (setKind === 'teaTable') {
    const ax = CAST.AXIN;
    const swing = p.soi && t < 0.7 ? Math.sin(t * 16) * 0.5 : 0;
    // p.run: A Xìn hugs the button and dashes off to the right after p.run seconds
    const runK = p.run ? ease.in(prog(t, p.run, p.run + 0.9)) : 0;
    const axX = 960 + runK * 1100;
    drawChibiPawn(g, {
      ...ax, x: axX, y: 745, scale: 1.85 * lerp(0.92, 1, enter), facing: 1, t,
      expr: p.soi || p.grab ? 'smirk' : 'neutral', propSwing: swing, talking: true, nameplateAlpha: npAlpha,
    });
    if (p.grab) {
      // CTA button flies in from the top right and lands in A Xìn's hand, then bobs (or leaves with him)
      const fly = ease.outBack(prog(t, 0.15, 0.75));
      const bx = lerp(1700, axX + 210, fly), by = lerp(180, 600, fly) + Math.sin(t * 4) * 6 * fly;
      drawCtaButton(g, bx, by, p.grab === 'sub' ? 'ĐĂNG KÝ' : 'THÍCH', { kind: p.grab, scale: lerp(1.6, 1.25, fly), tilt: lerp(0.4, -0.08, fly) });
    }
    if (p.bubble) drawSpeechBubble(g, 1290, 420, p.bubble, ease.outBack(prog(t, 0.2, 0.5)));
  } else if (setKind === 'bedchamber' && (p.patient || charKeys.includes('TU_MA_Y'))) {
    // patient lies in the bed: Tư Mã Ý peeks and smirks (feigned), the others are truly ill
    const pat = p.patient || 'TU_MA_Y';
    const feigned = pat === 'TU_MA_Y';
    drawChibiPawn(g, {
      ...(CAST[pat] || CAST.TU_MA_Y), x: 1320, y: 690, scale: 1.5, facing: -1, t,
      expr: feigned ? (t > dur * 0.65 ? 'smirk' : 'sleep') : 'sleep', tilt: -1.48, prop: null, nameplateAlpha: npAlpha,
    });
    if (charKeys.length > 1) {
      const o = charKeys.find(c => c !== pat);
      const other = (typeof o === 'object' ? o : CAST[o]) || CAST.TAO_THAO;
      drawChibiPawn(g, {
        ...other, x: 580, y: 780, scale: 1.55, facing: 1, t, expr: feigned ? 'shocked' : 'scared', talking: true, nameplateAlpha: npAlpha,
      });
    }
  } else {
    const slots = mapTokens ? (n === 1 ? [1700] : n === 2 ? [220, 1700] : [220, 1700, 1460]) : (p.slots || (n === 1 ? [960] : n === 2 ? [620, 1300] : [480, 960, 1440]));
    const BASE_Y = { tacticalMap: 680, navalFleet: 880, starNight: 860, siege: 830, bridge: 860, mountainPass: 860, warTent: 820, court: 640, market: 820, peachGarden: 800,
      banquet: 760, cottage: 820, windAltar: 880, flood: 900, cavalry: 820, study: 800, emptyFort: 830, tiltBoat: 850 };
    const baseY = mapTokens ? 840 : (BASE_Y[setKind] || 790);
    const sc = mapTokens ? 1.05 : setKind === 'court' ? 1.3 : p.crowd ? 1.55 : (n === 1 ? 1.75 : 1.55);
    const act = p.action;
    // cast on the listing boat leans with the deck (pivot = boat centre in engine/chibi.js tiltBoat)
    g.save();
    if (setKind === 'tiltBoat') { const bt = boatTilt(t, p); g.translate(960, 860); g.rotate(bt.ang); g.translate(-960, -860); }
    charKeys.forEach((key, idx) => {
      const cfg = typeof key === 'object' ? key : (CAST[key] || CAST.LUU_BI);
      let cx = slots[idx] || 960;
      const facing = act === 'standoff' ? (cx < 960 ? 1 : -1) : (idx === n - 1 && n > 1 ? -1 : 1);
      const exprCycle = ['neutral', 'smirk', 'angry', 'shocked'];
      let expr = p.fire ? 'shocked' : exprCycle[((info?.index || 0) + idx) % exprCycle.length];
      let swing = (p.fire || p.crowd) ? Math.sin(t * 10 + idx) * 0.25 : 0;
      if ((act === 'clash' || act === 'standoff') && idx < 3) {
        // rush toward the centre, weapons meet at IMPACT_T, then recoil a little
        const rush = ease.inOut(clamp(t / IMPACT_T));
        const target = 960 + (cx < 960 ? -170 : cx > 960 ? 170 : 0);
        cx = lerp(cx, target, rush) + (t > IMPACT_T ? Math.sign(cx - 960) * 30 * ease.out(clamp((t - IMPACT_T) / 0.3)) : 0);
        expr = 'angry';
        swing = t < IMPACT_T ? -0.4 * rush : 0.9 * Math.max(0, 1 - (t - IMPACT_T) / 0.25);
      } else if (act === 'enter') {
        const from = cx < 960 ? -260 : cx > 960 ? 2180 : 960;
        cx = lerp(from, cx, ease.out(clamp((t - idx * 0.12) / 0.55)));
      }
      if (p.punch && idx === ((info?.index || 0) % n)) expr = p.stamp ? 'smirk' : 'shocked';
      if (p.crack && idx === 0) {
        drawCrackedPawn(g, { ...cfg, x: cx, y: lerp(baseY + 40, baseY, enter), scale: sc, facing, t, expr: 'shocked', nameplateAlpha: npAlpha },
          CAST[p.crack] || null, t, p.crackAt ?? 0.35);
        return;
      }
      drawChibiPawn(g, {
        ...cfg,
        x: cx,
        y: lerp(baseY + 40, baseY, enter),
        scale: sc,
        facing,
        t,
        expr,
        propSwing: swing,
        talking: idx === ((info?.index || 0) % n),
        nameplateAlpha: npAlpha,
      });
    });
    g.restore();
    if (act === 'clash' || act === 'standoff') drawImpact(g, 960, baseY - 160 * sc, t - IMPACT_T, 150);
  }

  g.restore();

  // 6. Comedic badge & A Xin Soi stamp (screen space, safe from bottom captions)
  if (p.chTag && !p.chOpen && setKind !== 'teaTable') drawChapterTag(g, p.chTag, prog(t, 0, 0.3));
  if (p.chOpen) drawChapterOpen(g, p.chOpen, t);
  if (p.badge) {
    drawComicBadge(g, 960, 115, p.badge, { scale: ease.outBack(prog(t, 0.08, 0.35)) });
  }
  if (p.stamp) {
    const sp = prog(t, 0.45, 0.78);
    if (sp > 0) {
      drawStamp(g, 1450, 260, p.stamp, sp, p.stamp.includes('THẬT') ? '#2b8a3e' : '#c92a2a');
    }
  }
}

// 9:16 Shorts: the 1920x1080 chibi world sits in a band across the vertical 1080x1920 stage (no side crop of
// the cast), with ink panels above (channel tag + badge) and below (word captions from player.js at y≈1517).
// Badge / stamp / chapter overlays move out of the 16:9 world into vertical screen space so they stay in frame.
// Per-shot params: vscale (world zoom, default 1), vfocus (world x kept at the centre, default 960), slots (cast x).
// opts: { tag: top-panel channel label, top: band top y (default 380), panel: [top, bottom] panel colours }.
export function drawChibiShotVertical(g, t, info, CAST, opts = {}) {
  const shot = info?.shot || {};
  const p = shot.params || {};
  const s = p.vscale || 1;
  const bandH = 1080 * s, y0 = opts.top ?? 380;
  const n = (p.chars || []).length;
  const slots = p.slots || (n === 2 ? [760, 1160] : n >= 3 ? [640, 960, 1280] : undefined);
  const fx = clamp(p.vfocus || 960, 540 / s, 1920 - 540 / s);
  const [c0, c1] = opts.panel || ['#120d16', '#2a1418'];
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, c0); bg.addColorStop(0.5, c1); bg.addColorStop(1, c0);
  g.fillStyle = bg; g.fillRect(0, 0, 1080, 1920);
  g.save();
  g.beginPath(); g.rect(0, y0, 1080, bandH); g.clip();
  g.translate(540, y0 + bandH / 2); g.scale(s, s); g.translate(-fx, -540);
  const inner = { ...p, badge: null, stamp: null, chTag: null, chOpen: null, slots };
  drawChibiShot(g, t, { ...(info || {}), shot: { ...shot, params: inner } }, CAST);
  g.restore();
  // gold rules framing the band
  g.fillStyle = '#c9a24d'; g.fillRect(0, y0 - 6, 1080, 6); g.fillRect(0, y0 + bandH, 1080, 6);
  if (opts.tag) text(g, opts.tag, 540, 92, { size: 38, weight: 900, color: '#e9c46a', align: 'center', base: 'middle', stroke: 6, strokeColor: '#000' });
  if (p.chTitle) return;
  if (p.badge) {
    g.save(); g.translate(540, y0 - 150); const k = ease.outBack(prog(t, 0.08, 0.35));
    g.scale(1.55 * k, 1.55 * k); drawComicBadge(g, 0, 0, p.badge, { size: badgeSize(g, p.badge) }); g.restore();
  }
  if (p.stamp) {
    const sp = prog(t, 0.45, 0.78);
    if (sp > 0) { g.save(); g.translate(540, y0 + 190); g.scale(1.7, 1.7); drawStamp(g, 0, 0, p.stamp, sp, p.stamp.includes('THẬT') ? '#2b8a3e' : '#c92a2a'); g.restore(); }
  }
}
// shrink long badge labels so the 1.55x badge stays inside the 1080 width
function badgeSize(g, label) {
  g.save(); g.font = '900 26px Nunito, sans-serif'; const w = g.measureText(label).width; g.restore();
  return Math.max(16, Math.min(40, 26 * (560 / (w + 44))));
}

// Cardboard-cutout gag: at crackAt a jagged split runs down the pawn, both halves fall apart and the
// figure behind (e.g. CAST.BONG_DEN) is revealed. Deterministic from t.
function drawCrackedPawn(g, pawn, behind, t, crackAt) {
  const k = ease.out(prog(t, crackAt, crackAt + 0.55));
  if (k <= 0) { drawChibiPawn(g, pawn); return; }
  const { x, y, scale } = pawn;
  if (behind) drawChibiPawn(g, { ...behind, x, y, scale, facing: pawn.facing, t, expr: 'smirk', nameplateAlpha: k });
  const top = y - 330 * scale, bot = y + 40 * scale, zig = [];
  for (let i = 0; i <= 8; i++) zig.push([x + (i % 2 ? 14 : -14) * scale, lerp(top, bot, i / 8)]);
  for (const side of [-1, 1]) {
    g.save();
    g.translate(x + side * 150 * k * scale, y + 40 * k * k * scale);
    g.rotate(side * 0.35 * k); g.translate(-x, -y);
    g.beginPath(); g.moveTo(x + side * 400 * scale, top - 200);
    zig.forEach(([zx, zy]) => g.lineTo(zx, zy));
    g.lineTo(x + side * 400 * scale, bot + 200); g.closePath(); g.clip();
    g.globalAlpha *= 1 - 0.85 * prog(t, crackAt + 0.6, crackAt + 1.1);
    drawChibiPawn(g, { ...pawn, nameplateAlpha: 0 });
    g.restore();
  }
  drawImpact(g, x, y - 170 * scale, t - crackAt, 170);
}
