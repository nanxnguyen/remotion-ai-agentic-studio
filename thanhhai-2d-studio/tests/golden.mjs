// tests/golden.mjs — golden-frame regression test for the renderer.
//   node tests/golden.mjs            render fixed frames of examples/reaction-time + motion-lab and compare with tests/golden/*.png
//   node tests/golden.mjs --update   accept the current render as the new golden set (look at the PNGs first!)
// Fails when more than 0.5% of the pixels of any frame differ by more than 24/255 in any channel.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const GOLD = path.join(ROOT, 'tests', 'golden');
const SETS = [['reaction-time', '1.5,4.2,10.9,20.4,27.6,35.2,40.5,43.0'], ['motion-lab', '1.2,2.05,2.4,4.3,7.4,9.25,9.9,12.8'], ['evolution-species', '0.6,2.6,5.0,13.9,19.6,24.5'], ['evolution-life', '1.2,6.2,9.0,18.2,21.5,27.5'], ['mascot-explainer', '1.3,8.5,23.4,31.6,35.9,40.5']];
const update = process.argv.includes('--update');
const limit = +(process.env.GOLDEN_LIMIT || 0.005);

const shots = [];
for (const [name, times] of SETS) {
  const PROJ = path.join(ROOT, 'examples', name);
  const r = spawnSync('node', ['render.mjs', '--project', PROJ, '--stills', times, '--scale', '0.25'], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0 || /shot error/i.test(r.stdout)) { console.error(r.stdout, r.stderr); process.exit(1); }
  const stillDir = path.join(PROJ, 'build', 'stills');
  for (const f of fs.readdirSync(stillDir).filter(f => f.endsWith('.png') && !f.startsWith('sheet')).sort()) shots.push({ src: path.join(stillDir, f), name: `${name}__${f}` });
}
fs.mkdirSync(GOLD, { recursive: true });
if (update) { for (const f of fs.readdirSync(GOLD)) fs.rmSync(path.join(GOLD, f)); for (const s of shots) fs.copyFileSync(s.src, path.join(GOLD, s.name)); console.log(`golden: updated ${shots.length} frames`); process.exit(0); }
const launch = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
const browser = await chromium.launch(launch); const page = await browser.newPage();
let fail = 0;
for (const { src, name: f } of shots) {
  const g = path.join(GOLD, f); if (!fs.existsSync(g)) { console.log(`MISSING golden ${f} (run with --update)`); fail++; continue; }
  const b64 = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
  const ratio = await page.evaluate(async ([a, b]) => {
    const load = s => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.src = s; });
    const [ia, ib] = await Promise.all([load(a), load(b)]); if (ia.width !== ib.width || ia.height !== ib.height) return 1;
    const px = img => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
    const da = px(ia), db = px(ib); let bad = 0;
    for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) > 24 || Math.abs(da[i + 1] - db[i + 1]) > 24 || Math.abs(da[i + 2] - db[i + 2]) > 24) bad++;
    return bad / (da.length / 4);
  }, [b64(src), b64(g)]);
  const ok = ratio <= limit; if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${f}  ${(ratio * 100).toFixed(3)}% pixels differ`);
}
await browser.close();
console.log(fail ? `golden: ${fail} frame(s) changed` : `golden: all ${shots.length} frames match`);
process.exit(fail ? 1 : 0);
