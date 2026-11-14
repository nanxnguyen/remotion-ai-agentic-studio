// engine/player.js — loads a project, maps global time -> shot, renders frames deterministically.
// window.renderFrame(frameIndex) draws one frame onto #main. Used by render.mjs (headless).
import { E, V, setStyle, getShot, clamp, ease, prog, alpha, text, FONTS } from './core.js';
import { STYLES } from './styles.js';
import { captions } from './ui2d.js';

const q = new URLSearchParams(location.search);
const PROJ = '/project';
const RES = { '720p': 720, '1080p': 1080, '1440p': 1440, '2160p': 2160, '4k': 2160 };
let main, mg, bufA, bufB, accum, glCanvas, grainTiles = [], three = null;
const errors = (window.ERRORS = []);
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

// Unicode ranges of the @fontsource subsets (latin, latin-ext, vietnamese).
const UR = {
  'latin': 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext': 'U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
  'vietnamese': 'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB',
};
// lang = the video language from config.json (e.g. 'vi', 'en'). Fredoka has no Vietnamese glyphs, so for
// Vietnamese the title family 'Fredoka' is served by Nunito (rounded, full accent coverage) to keep words in one font.
async function loadFonts(lang) {
  const vi = /^vi/i.test(lang || '');
  const nun = (w, sub, st = 'normal') => `nunito/files/nunito-${sub}-${w}-${st}.woff2`;
  const F = [];
  if (vi) {
    for (const [w, nw] of [['600', '800'], ['700', '900']]) for (const sub of ['latin', 'latin-ext', 'vietnamese']) F.push(['Fredoka', w, nun(nw, sub), 'normal', sub]);
  } else {
    for (const w of ['600', '700']) for (const sub of ['latin', 'latin-ext']) F.push(['Fredoka', w, `fredoka/files/fredoka-${sub}-${w}-normal.woff2`, 'normal', sub]);
  }
  for (const w of ['800', '900']) for (const sub of ['latin', 'latin-ext', 'vietnamese']) F.push(['Nunito', w, nun(w, sub), 'normal', sub]);
  for (const sub of ['latin', 'latin-ext', 'vietnamese']) F.push(['Playfair Display', '900', `playfair-display/files/playfair-display-${sub}-900-italic.woff2`, 'italic', sub]);
  for (const [fam, w, file, style, sub] of F) {
    try { const ff = new FontFace(fam, `url(/node_modules/@fontsource/${file})`, { weight: w, style, unicodeRange: UR[sub] }); await ff.load(); document.fonts.add(ff); }
    catch (e) { console.log('font missing', fam, w, sub); }
  }
}
async function boot() {
  const cfg = await (await fetch(`${PROJ}/config.json`)).json();
  const story = await (await fetch(`${PROJ}/story/shots.json`)).json();
  let words = []; try { const r = await fetch(`${PROJ}/timeline/words.json`); if (r.ok) words = await r.json(); } catch {}
  let visemes = []; try { const r = await fetch(`${PROJ}/timeline/visemes.json`); if (r.ok) visemes = (await r.json()).visemes || []; } catch {}
  const vertical = (cfg.aspect || '16:9') === '9:16';
  const short = RES[cfg.resolution || '1080p'] || 1080, long = Math.round((short * 16) / 9 / 2) * 2;
  const scale = +(q.get('scale') || 1);
  const outW = Math.round(((vertical ? short : long) * scale) / 2) * 2, outH = Math.round(((vertical ? long : short) * scale) / 2) * 2;
  Object.assign(E, { vertical, W: vertical ? 1080 : 1920, H: vertical ? 1920 : 1080, fps: cfg.fps || 24, cfg, words: words.words || words, shots: story.shots, visemes, outW, outH });
  E.PX = outW / E.W;
  setStyle(q.get('style') || cfg.style || 'dusk');
  await loadFonts(cfg.lang);
  main = document.getElementById('main'); main.width = outW; main.height = outH; mg = main.getContext('2d', { willReadFrequently: true });
  buildLUT();
  bufA = mk(outW, outH); bufB = mk(outW, outH); accum = mk(outW, outH);
  const gw = Math.ceil(outW / 2), gh = Math.ceil(outH / 2);
  for (let k = 0; k < 4; k++) { const c = mk(gw, gh), x = c.getContext('2d'), id = x.createImageData(gw, gh); let s = 1234 + k * 999; for (let i = 0; i < id.data.length; i += 4) { s = (s * 1664525 + 1013904223) >>> 0; const v = s >>> 24; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } x.putImageData(id, 0, 0); grainTiles.push(c); }
  const list = await (await fetch(`/__manifest`)).json();
  for (const f of list) { try { await import(f); } catch (e) { errors.push(`import ${f}: ${e.message}`); console.log('IMPORT ERROR', f, e.message); } }
  if (E.shots.some(s => getShot(s.id)?.kind === '3d')) { three = await import('./three-kit.js'); glCanvas = mk(outW, outH); three.getRenderer(glCanvas); }
  const dur = story.duration || E.shots[E.shots.length - 1].end;
  window.DURATION = dur; window.TOTAL_FRAMES = Math.ceil(dur * E.fps); window.OUT = [outW, outH];
  window.SHOT_LIST = E.shots.map(s => ({ id: s.id, start: s.start, end: s.end, ok: !!getShot(s.id) }));
  window.READY = true;
}

// colour grade: per-channel lift/gamma/gain + contrast as LUTs, saturation per pixel
let LUT = null, SAT = 1;
function buildLUT() {
  const gr = E.style.grade || {}; const lift = gr.lift || [0, 0, 0], gam = gr.gamma || [1, 1, 1], gain = gr.gain || [1, 1, 1], con = gr.contrast ?? 1; SAT = gr.sat ?? 1;
  const ident = con === 1 && lift.every(v => v === 0) && gam.every(v => v === 1) && gain.every(v => v === 1);
  if (ident && SAT === 1) { LUT = null; return; }
  LUT = [0, 1, 2].map(c => { const a = new Uint8ClampedArray(256); for (let i = 0; i < 256; i++) { let x = i / 255; x = clamp((x - 0.5) * con + 0.5); x = clamp(gain[c] * (x + lift[c] * (1 - x))); x = Math.pow(x, 1 / gam[c]); a[i] = Math.round(x * 255); } return a; });
}
function applyGrade(W, H) {
  if (!LUT) return; const img = mg.getImageData(0, 0, W, H), d = img.data, [R, G, B] = LUT, s = SAT;
  for (let i = 0; i < d.length; i += 4) {
    let r = R[d[i]], g = G[d[i + 1]], b = B[d[i + 2]];
    if (s !== 1) { const l = 0.2126 * r + 0.7152 * g + 0.0722 * b; r = l + (r - l) * s; g = l + (g - l) * s; b = l + (b - l) * s; }
    d[i] = r; d[i + 1] = g; d[i + 2] = b;
  }
  mg.putImageData(img, 0, 0);
}
function shotIndexAt(t) { const S = E.shots; for (let i = 0; i < S.length; i++) if (t < S[i].end) return i; return S.length - 1; }
const cache3D = new Map();
function state3D(shot, def, info) {
  if (cache3D.has(shot.id)) return cache3D.get(shot.id);
  for (const [k, v] of cache3D) if (cache3D.size >= 2) { v.dispose?.(); v.stage?.dispose?.(); cache3D.delete(k); }
  const st = def.init(three, info); cache3D.set(shot.id, st); return st;
}
function drawShot(buf, shot, lt) {
  const g = buf.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
  g.fillStyle = '#000'; g.fillRect(0, 0, buf.width, buf.height); g.setTransform(E.PX, 0, 0, E.PX, 0, 0);
  const def = getShot(shot.id); const dur = shot.end - shot.start;
  const info = { ...(shot.params || {}), shot, dur, globalT: shot.start + lt, p: clamp(lt / dur), line: shot.line };
  if (!def) { g.fillStyle = '#20141c'; g.fillRect(0, 0, E.W, E.H); text(g, `MISSING SHOT ${shot.id}`, E.W / 2, E.H / 2 - 30, { size: 60, color: '#ff6f61' }); text(g, (shot.line || '').slice(0, 80), E.W / 2, E.H / 2 + 50, { size: 30, color: '#fff', font: FONTS.ui, weight: 800 }); return; }
  try {
    if (def.kind === '3d') {
      const st = state3D(shot, def, info); def.draw(st, lt, info, three); (st.stage || st).render();
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(glCanvas, 0, 0, buf.width, buf.height); g.restore();
      if (def.overlay) { g.save(); def.overlay(g, lt, info, st); g.restore(); }
    } else { g.save(); def.draw(g, lt, info); g.restore(); }
  } catch (e) { const msg = `${shot.id}@${lt.toFixed(2)}: ${e.message}`; if (!errors.includes(msg) && errors.length < 200) errors.push(msg); console.log('SHOT ERROR', msg, e.stack?.split('\n')[1]);
    g.setTransform(E.PX, 0, 0, E.PX, 0, 0); text(g, 'ERROR ' + msg.slice(0, 90), E.W / 2, E.H / 2, { size: 34, color: '#ff4040', font: FONTS.ui, weight: 900 }); }
}
const BARS = () => ({ none: 0, wide: V(60, 0), scope: V(138, 170), thin: V(30, 60) });
const barVal = (s) => (typeof (s?.bars ?? E.cfg.bars) === 'number' ? (s.bars ?? E.cfg.bars) : BARS()[s?.bars ?? E.cfg.bars ?? V('wide', 'none')] ?? 0);

// shot-local time, optionally held on twos ("timing": "twos" on a shot or in config.json)
const localT = (shot, t) => { const lt = t - shot.start, tw = shot.timing ?? E.cfg.timing; return tw === 'twos' ? Math.floor(lt * E.fps / 2 + 1e-6) * 2 / E.fps : lt; };
// draws the shot (and any transition) at global time t into mg, before grading
function composite(t) {
  const i = shotIndexAt(t), shot = E.shots[i], lt = t - shot.start;
  drawShot(bufA, shot, localT(shot, t));
  const tr = shot.in || { type: 'cut' }, tdur = tr.dur ?? (tr.type === 'whip' ? 0.35 : 0.5);
  const W = main.width, H = main.height; mg.setTransform(1, 0, 0, 1, 0, 0); mg.globalAlpha = 1; mg.globalCompositeOperation = 'source-over';
  const grade = E.style.grade; mg.filter = grade.filter && grade.filter !== 'none' ? grade.filter : 'none';
  if (tr.type !== 'cut' && i > 0 && lt < tdur) {
    const prev = E.shots[i - 1], k = ease.inOut(lt / tdur); drawShot(bufB, prev, localT(prev, t));
    if (tr.type === 'fade') { mg.drawImage(bufB, 0, 0); mg.globalAlpha = k; mg.drawImage(bufA, 0, 0); }
    else if (tr.type === 'dip' || tr.type === 'dipWhite') { const c = tr.type === 'dip' ? '#000' : '#fff'; mg.drawImage(k < 0.5 ? bufB : bufA, 0, 0); mg.filter = 'none'; mg.globalAlpha = k < 0.5 ? k * 2 : (1 - k) * 2; mg.fillStyle = c; mg.fillRect(0, 0, W, H); }
    else if (tr.type === 'flash') { mg.drawImage(bufA, 0, 0); mg.filter = 'none'; mg.globalAlpha = (1 - lt / tdur) ** 2; mg.fillStyle = '#fff'; mg.fillRect(0, 0, W, H); }
    else if (tr.type === 'whip') { const dir = tr.dir || 1; for (let s = 0; s < 4; s++) { mg.globalAlpha = 0.3; mg.drawImage(bufB, -dir * k * W * 1.1 - dir * s * W * 0.02, 0); mg.drawImage(bufA, dir * (1 - k) * W * 1.1 + dir * s * W * 0.02, 0); } }
    else if (tr.type === 'zoom') { mg.drawImage(bufB, 0, 0); const s = 1.15 - 0.15 * k; mg.globalAlpha = k; mg.translate(W / 2, H / 2); mg.scale(s, s); mg.drawImage(bufA, -W / 2, -H / 2); mg.setTransform(1, 0, 0, 1, 0, 0); }
    else mg.drawImage(bufA, 0, 0);
  } else mg.drawImage(bufA, 0, 0);
  mg.globalAlpha = 1; mg.filter = 'none'; mg.setTransform(1, 0, 0, 1, 0, 0);
}
window.renderFrame = function (f) {
  const t = f / E.fps, i = shotIndexAt(t), shot = E.shots[i], lt = t - shot.start;
  const W = main.width, H = main.height, grade = E.style.grade;
  // motion blur: average N sub-frames across the shutter ("mblur": N on a shot, in config.json, or --mblur N)
  const n = Math.round(shot.mblur ?? E.cfg.mblur ?? (+q.get('mblur') || 0));
  if (n > 1) {
    const sh = E.cfg.shutter ?? 0.5, ag = accum.getContext('2d'); ag.setTransform(1, 0, 0, 1, 0, 0);
    for (let k = 0; k < n; k++) {
      const tk = Math.max(shot.start, Math.min(shot.end - 1e-4, t + ((k + 0.5) / n - 0.5) * sh / E.fps));
      composite(tk); ag.globalAlpha = 1 / (k + 1); ag.drawImage(main, 0, 0);
    }
    ag.globalAlpha = 1; mg.setTransform(1, 0, 0, 1, 0, 0); mg.drawImage(accum, 0, 0);
  } else composite(t);
  applyGrade(W, H);
  if (grade.tint) { mg.globalCompositeOperation = grade.tint[1]; mg.fillStyle = alpha(grade.tint[0], grade.tint[2]); mg.fillRect(0, 0, W, H); mg.globalCompositeOperation = 'source-over'; }
  if (shot.vignette !== false && grade.vignette > 0) { const v = mg.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.62); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${grade.vignette})`); mg.fillStyle = v; mg.fillRect(0, 0, W, H); }
  if (grade.grain > 0) { mg.save(); mg.globalAlpha = grade.grain; mg.globalCompositeOperation = 'overlay'; mg.drawImage(grainTiles[f % 4], 0, 0, W, H); mg.restore(); }
  mg.setTransform(E.PX, 0, 0, E.PX, 0, 0);
  if (E.cfg.captions && shot.captions !== false) captions(mg, t, E.cfg.captionStyle || {});
  const cur = barVal(shot), prevB = i > 0 ? barVal(E.shots[i - 1]) : cur, bar = prevB + (cur - prevB) * ease.inOut(prog(lt, 0, 0.6));
  if (bar > 0) { mg.fillStyle = '#000'; mg.fillRect(0, 0, E.W, bar); mg.fillRect(0, E.H - bar, E.W, bar); }
  const fi = E.cfg.fadeIn ?? 0.5, fo = E.cfg.fadeOut ?? 0.8, dur = window.DURATION, fade = Math.max(fi > 0 ? 1 - t / fi : 0, fo > 0 ? 1 - (dur - t) / fo : 0);
  if (fade > 0) { mg.fillStyle = `rgba(0,0,0,${clamp(fade)})`; mg.fillRect(0, 0, E.W, E.H); }
  if (q.has('debug')) { mg.fillStyle = 'rgba(0,0,0,.6)'; mg.fillRect(0, E.H - 54, E.W, 54); text(mg, `${shot.id}  ${t.toFixed(2)}s  (${lt.toFixed(2)}/${(shot.end - shot.start).toFixed(2)})  ${(shot.line || '').slice(0, 70)}`, 20, E.H - 27, { size: 26, color: '#fff', font: FONTS.ui, weight: 800, align: 'left' }); }
  mg.setTransform(1, 0, 0, 1, 0, 0);
};
boot().catch(e => { window.BOOT_ERROR = e.message + '\n' + e.stack; console.log('BOOT ERROR', e.message); });
