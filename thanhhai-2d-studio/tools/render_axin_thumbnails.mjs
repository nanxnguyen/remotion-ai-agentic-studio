// render_axin_thumbnails.mjs — Dark Manga-Ink + Chibi Contrast 9:16 thumbnails (1080x1920).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/__thumb.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#060608;overflow:hidden}
      canvas{display:block;width:1080px;height:1920px}
    </style></head><body><canvas id="c" width="1080" height="1920"></canvas>
    <script type="module">
      import { drawChibiSet, drawChibiPawn, drawSoldierCrowd, drawArrowRain, drawSmoke } from '/engine/chibi.js';
      import * as CAST from '/projects/axin-short-01-thuyen-co-muon-ten/scenes/cast.js';

      function rng(seed) {
        let s = seed | 0;
        return () => { s = (s * 1664525 + 1013904223) | 0; return ((s >>> 0) / 4294967296); };
      }

      function drawGrungeBackdrop(g, w, h, seed = 42) {
        const rand = rng(seed);
        const bg = g.createRadialGradient(640, 1020, 80, 540, 960, 1200);
        bg.addColorStop(0, '#18181d');
        bg.addColorStop(0.55, '#0b0b0e');
        bg.addColorStop(1, '#040406');
        g.fillStyle = bg;
        g.fillRect(0, 0, w, h);

        // Dust & ink speckles
        for (let i = 0; i < 2400; i++) {
          const x = rand() * w, y = rand() * h, r = rand() * 2.2;
          g.fillStyle = rand() > 0.5 ? \`rgba(255,255,255,\${(rand()*0.07).toFixed(3)})\` : \`rgba(0,0,0,\${(rand()*0.25).toFixed(3)})\`;
          g.fillRect(x, y, r, r);
        }
        // Subtle scratch lines
        g.strokeStyle = 'rgba(255,255,255,0.035)';
        g.lineWidth = 1.2;
        for (let i = 0; i < 38; i++) {
          const x = rand() * w, y = rand() * h;
          g.beginPath();
          g.moveTo(x, y);
          g.lineTo(x + (rand() - 0.5) * 180, y + (rand() - 0.5) * 90);
          g.stroke();
        }
      }

      function drawCrossHatch(g, x, y, w, h, seed = 7) {
        const rand = rng(seed);
        g.save();
        g.strokeStyle = 'rgba(0,0,0,0.28)';
        g.lineWidth = 2;
        for (let i = -h; i < w + h; i += 14) {
          if (rand() > 0.25) {
            g.beginPath();
            g.moveTo(x + i, y);
            g.lineTo(x + i - h * 0.45, y + h);
            g.stroke();
          }
        }
        g.restore();
      }

      function drawCliffAndAxin(g) {
        // Dark rocky ledge at bottom-left
        g.save();
        g.fillStyle = '#191920';
        g.strokeStyle = '#34343f';
        g.lineWidth = 4;
        g.beginPath();
        g.moveTo(0, 1580);
        g.lineTo(360, 1560);
        g.lineTo(445, 1650);
        g.lineTo(410, 1920);
        g.lineTo(0, 1920);
        g.closePath();
        g.fill(); g.stroke();

        // Warm flashlight cone pointing up-right
        const cone = g.createLinearGradient(275, 1465, 960, 820);
        cone.addColorStop(0, 'rgba(255, 240, 185, 0.52)');
        cone.addColorStop(0.45, 'rgba(255, 225, 150, 0.16)');
        cone.addColorStop(1, 'rgba(255, 220, 140, 0)');
        g.fillStyle = cone;
        g.beginPath();
        g.moveTo(275, 1455);
        g.lineTo(1060, 620);
        g.lineTo(1080, 1420);
        g.lineTo(282, 1478);
        g.closePath();
        g.fill();

        // Tiny shocked A Xin chibi
        drawChibiPawn(g, { ...CAST.AXIN, nameplate: '', x: 200, y: 1555, scale: 1.45, facing: 1, expr: 'shocked', prop: null });

        // Flashlight in hand
        g.save();
        g.translate(258, 1468);
        g.rotate(-0.48);
        g.fillStyle = '#3b3e47'; g.strokeStyle = '#111'; g.lineWidth = 3.5;
        g.fillRect(-18, -10, 38, 20); g.strokeRect(-18, -10, 38, 20);
        g.fillStyle = '#ffeaa7';
        g.fillRect(20, -13, 10, 26); g.strokeRect(20, -13, 10, 26);
        g.restore();

        // Yellow "!" + lightning sparks + sweat drops above A Xin
        g.save();
        g.font = '900 84px "Arial Black", sans-serif';
        g.textAlign = 'center';
        g.lineWidth = 10; g.strokeStyle = '#070709';
        g.strokeText('!', 195, 1295);
        g.fillStyle = '#ffd166';
        g.fillText('!', 195, 1295);

        // Sparks
        g.strokeStyle = '#ffd166'; g.lineWidth = 5; g.lineCap = 'round';
        g.beginPath(); g.moveTo(235, 1300); g.lineTo(255, 1272); g.lineTo(245, 1272); g.lineTo(268, 1245); g.stroke();
        g.beginPath(); g.moveTo(262, 1320); g.lineTo(290, 1302); g.stroke();

        // Sweat drops
        g.fillStyle = '#74c0fc';
        g.beginPath(); g.ellipse(120, 1345, 7, 11, -0.4, 0, Math.PI * 2); g.fill();
        g.beginPath(); g.ellipse(105, 1378, 5, 8, -0.3, 0, Math.PI * 2); g.fill();
        g.restore();
        g.restore();
      }

      function drawCurvedRedArrow(g, x1, y1, cx, cy, x2, y2) {
        g.save();
        g.strokeStyle = '#ff1e1e';
        g.fillStyle = '#ff1e1e';
        g.shadowColor = 'rgba(255, 20, 20, 0.75)';
        g.shadowBlur = 18;
        g.lineWidth = 14;
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(x1, y1);
        g.quadraticCurveTo(cx, cy, x2, y2);
        g.stroke();

        const ang = Math.atan2(y2 - cy, x2 - cx);
        g.translate(x2, y2);
        g.rotate(ang);
        g.beginPath();
        g.moveTo(18, 0);
        g.lineTo(-26, -20);
        g.lineTo(-16, 0);
        g.lineTo(-26, 20);
        g.closePath();
        g.fill();
        g.restore();
      }

      function drawHeadlineAndBadges(g, line1, line2, sub, cornerTag, bottomStat) {
        // Top-right red corner tag (like "TOP 1?!")
        g.save();
        g.font = '900 44px "Impact", "Arial Black", sans-serif';
        g.textAlign = 'right';
        g.shadowColor = 'rgba(255, 20, 20, 0.85)';
        g.shadowBlur = 16;
        g.fillStyle = '#ff2a2a';
        g.fillText(cornerTag, 1028, 108);
        g.restore();

        // Giant condensed headline top-left
        g.save();
        g.textAlign = 'left';
        g.lineJoin = 'round';
        g.font = '900 134px "Impact", "Arial Narrow", "Arial Black", sans-serif';
        g.lineWidth = 18; g.strokeStyle = '#050507';
        g.strokeText(line1, 56, 225);
        g.fillStyle = '#f1f1ef';
        g.fillText(line1, 56, 225);

        g.font = '900 144px "Impact", "Arial Narrow", "Arial Black", sans-serif';
        g.shadowColor = 'rgba(255, 18, 18, 0.78)';
        g.shadowBlur = 28;
        g.lineWidth = 18; g.strokeStyle = '#050507';
        g.strokeText(line2, 56, 372);
        g.fillStyle = '#ff1c1c';
        g.fillText(line2, 56, 372);
        g.restore();

        // Crisp smaller white subtitle
        g.save();
        g.textAlign = 'left';
        g.font = '900 36px "Arial Black", sans-serif';
        g.lineWidth = 8; g.strokeStyle = '#050507';
        g.strokeText(sub, 60, 444);
        g.fillStyle = '#ffffff';
        g.fillText(sub, 60, 444);
        g.restore();

        // Bottom-left digital red stat (like "PSI 5000+")
        g.save();
        g.textAlign = 'left';
        g.font = '900 54px "Courier New", monospace';
        g.shadowColor = 'rgba(255, 20, 20, 0.85)';
        g.shadowBlur = 18;
        g.fillStyle = '#ff2424';
        g.fillText(bottomStat, 52, 1848);
        g.restore();
      }

      function renderMonochromeInkStage(drawFn) {
        const off = document.createElement('canvas');
        off.width = 1080; off.height = 1920;
        const og = off.getContext('2d');
        og.save();
        og.translate(640, 1020);
        og.scale(1.36, 1.36);
        og.translate(-960, -540);
        drawFn(og);
        og.restore();
        drawCrossHatch(og, 0, 380, 1080, 1300, 19);
        return off;
      }

      window.renderThumb = function(ep) {
        const c = document.getElementById('c');
        const g = c.getContext('2d');
        g.clearRect(0, 0, 1080, 1920);
        drawGrungeBackdrop(g, 1080, 1920, ep * 101);

        // Render giant monochrome ink historical scene
        const stage = renderMonochromeInkStage((og) => {
          if (ep === 1) {
            drawChibiSet(og, 'navalFleet', 2.4, { straw: true, faction: 'wu' });
            drawArrowRain(og, 2.4, { x0: 350, x1: 1650, y0: 120, y1: 720, count: 22, dir: 1 });
            drawChibiPawn(og, { ...CAST.BONG_DEN, nameplate: '', x: 1150, y: 745, scale: 2.35, facing: -1, expr: 'smirk' });
            drawChibiPawn(og, { ...CAST.KONG_MINH, nameplate: '', x: 840, y: 785, scale: 2.7, facing: 1, expr: 'shocked' });
          } else if (ep === 2) {
            drawChibiSet(og, 'emptyFort', 2.0, { gateOpen: true });
            drawChibiPawn(og, { ...CAST.KONG_MINH, nameplate: '', x: 960, y: 470, scale: 1.55, expr: 'smirk' });
            og.save(); og.globalAlpha = 0.55;
            drawSoldierCrowd(og, { x: 670, y: 800, rows: 2, cols: 5, robe: '#2c3550', scale: 0.72 });
            drawChibiPawn(og, { ...CAST.TU_MA_Y, nameplate: '', x: 960, y: 815, scale: 2.25, expr: 'shocked' });
            og.restore();
            drawSmoke(og, 830, 680, 1.5, 1, 0.55);
            drawSmoke(og, 1080, 710, 2.1, 2, 0.55);
          } else if (ep === 3) {
            drawChibiSet(og, 'warTent', 1.8, { faction: 'wei' });
            drawChibiPawn(og, { ...CAST.TU_MA_Y, nameplate: '', x: 920, y: 790, scale: 2.85, facing: 1, expr: 'smirk', prop: null });
          } else if (ep === 4) {
            drawChibiSet(og, 'palace', 1.5, {});
            drawChibiPawn(og, { nameplate: '', robeColor: '#1b1822', trimColor: '#3a3444', skin: '#2a2630', hair: 'bun', hairColor: '#0e0d12', beard: 'none', prop: null, x: 1140, y: 745, scale: 2.25, facing: -1 });
            drawChibiPawn(og, { nameplate: '', robeColor: '#e07a9b', trimColor: '#f3d87c', hair: 'bun', hairColor: '#1e1e24', beard: 'none', prop: 'fan', x: 865, y: 790, scale: 2.85, facing: 1 });
          } else if (ep === 5) {
            drawChibiSet(og, 'banquet', 2.0, {});
            drawChibiPawn(og, { nameplate: '', robeColor: '#342c44', trimColor: '#c9a24d', hair: 'crown', hairColor: '#23242b', beard: 'goatee', prop: 'sword', x: 1165, y: 775, scale: 2.35, facing: -1, expr: 'angry' });
            drawChibiPawn(og, { ...CAST.LUU_THIEN, nameplate: '', x: 845, y: 795, scale: 2.85, facing: 1, expr: 'smirk', prop: 'scroll' });
          }
        });

        // Composite monochrome ink stage with radial dark vignette so it floats out of black
        g.save();
        g.filter = 'grayscale(100%) contrast(165%) brightness(82%)';
        g.drawImage(stage, 0, 0);
        g.restore();

        // Soft edge fade to pure pitch black around top, bottom, and left
        const topFade = g.createLinearGradient(0, 0, 0, 560);
        topFade.addColorStop(0, 'rgba(6,6,8,1)');
        topFade.addColorStop(0.65, 'rgba(6,6,8,0.88)');
        topFade.addColorStop(1, 'rgba(6,6,8,0)');
        g.fillStyle = topFade; g.fillRect(0, 0, 1080, 560);

        const botFade = g.createLinearGradient(0, 1460, 0, 1920);
        botFade.addColorStop(0, 'rgba(6,6,8,0)');
        botFade.addColorStop(0.55, 'rgba(6,6,8,0.85)');
        botFade.addColorStop(1, 'rgba(6,6,8,1)');
        g.fillStyle = botFade; g.fillRect(0, 1460, 1080, 460);

        const leftFade = g.createLinearGradient(0, 0, 320, 0);
        leftFade.addColorStop(0, 'rgba(6,6,8,0.92)');
        leftFade.addColorStop(1, 'rgba(6,6,8,0)');
        g.fillStyle = leftFade; g.fillRect(0, 0, 320, 1920);

        drawCliffAndAxin(g);

        // Color focal accents over monochrome ink (blood-red cracks, pink dress, red ?, cheat scroll)
        if (ep === 1) {
          g.save();
          g.strokeStyle = '#ff2424'; g.lineWidth = 9; g.lineCap = 'round';
          g.shadowColor = 'rgba(255,30,30,0.8)'; g.shadowBlur = 14;
          g.beginPath(); g.moveTo(475, 960); g.lineTo(445, 1090); g.lineTo(505, 1190); g.lineTo(460, 1340); g.stroke();
          g.restore();
          drawCurvedRedArrow(g, 520, 740, 690, 680, 820, 820);
          drawHeadlineAndBadges(g, 'KHỔNG MINH', 'SAI RỒI!', 'A XIN CHÉM SỬ · TẬP 1', 'HỒI 46?!', '100.000 TÊN');
        } else if (ep === 2) {
          drawCurvedRedArrow(g, 390, 960, 510, 870, 620, 1010);
          drawHeadlineAndBadges(g, 'THÀNH TRỐNG', 'VẮNG MẶT!', 'A XIN CHÉM SỬ · TẬP 2', 'TẬP 2?!', '1.000 DẶM');
        } else if (ep === 3) {
          // Pink silk dress + hourglass accent
          g.save();
          g.translate(825, 1210); g.rotate(-0.12);
          g.fillStyle = '#e85d99'; g.strokeStyle = '#111'; g.lineWidth = 7;
          g.beginPath(); g.moveTo(-58, -95); g.lineTo(58, -95); g.lineTo(105, 105); g.lineTo(-105, 105); g.closePath();
          g.fill(); g.stroke();
          g.restore();
          drawCurvedRedArrow(g, 430, 1080, 580, 1010, 715, 1140);
          drawHeadlineAndBadges(g, 'TẶNG VÁY', 'CHỈ CẦN CHỜ!', 'A XIN CHÉM SỬ · TẬP 3', 'TẬP 3?!', 'NĂM 234');
        } else if (ep === 4) {
          // Red glowing ? over face
          g.save();
          g.fillStyle = '#ff1e1e'; g.strokeStyle = '#070709'; g.lineWidth = 12;
          g.shadowColor = 'rgba(255,20,20,0.85)'; g.shadowBlur = 24;
          g.beginPath(); g.arc(510, 895, 92, 0, Math.PI * 2); g.fill(); g.stroke();
          g.fillStyle = '#ffffff'; g.font = '900 120px "Arial Black", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
          g.fillText('?', 510, 902);
          g.restore();
          drawCurvedRedArrow(g, 640, 720, 780, 690, 880, 830);
          drawHeadlineAndBadges(g, 'ĐIÊU THUYỀN', 'KHÔNG CÓ TÊN!', 'A XIN CHÉM SỬ · TẬP 4', 'TẬP 4?!', 'NĂM 192');
        } else if (ep === 5) {
          // Cheat sheet scroll
          g.save();
          g.translate(335, 1045); g.rotate(-0.08);
          g.fillStyle = '#f8f0d6'; g.strokeStyle = '#111'; g.lineWidth = 7;
          g.fillRect(-130, -78, 260, 156); g.strokeRect(-130, -78, 260, 156);
          g.fillStyle = '#111'; g.font = '900 30px sans-serif'; g.textAlign = 'center';
          g.fillText('BÀI HỌC THUỘC', 0, -22);
          g.fillStyle = '#d90429'; g.font = '800 26px sans-serif';
          g.fillText('- Khước Chính -', 0, 30);
          g.restore();
          drawCurvedRedArrow(g, 410, 850, 500, 890, 440, 965);
          drawHeadlineAndBadges(g, 'VUA A ĐẨU', 'LỘ BÀI RỒI!', 'A XIN CHÉM SỬ · TẬP 5', 'TẬP 5?!', 'NĂM 264');
        }
      };
      window.THUMB_READY = true;
    </script></body></html>`);
  }
  const p = path.join(ROOT, url);
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(p).pipe(res);
}).listen(0);

const PORT = server.address().port;
const JOBS = [
  { ep: 1, slug: 'axin-short-01-thuyen-co-muon-ten' },
  { ep: 2, slug: 'axin-short-02-khong-thanh-ke' },
  { ep: 3, slug: 'axin-short-03-bo-vay-phu-nu' },
  { ep: 4, slug: 'axin-short-04-dieu-thuyen-co-that-khong' },
  { ep: 5, slug: 'axin-short-05-a-dau-gia-ngu' },
];

const browser = await chromium.launch({ args: ['--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:${PORT}/__thumb.html`);
await page.waitForFunction('window.THUMB_READY === true');

for (const job of JOBS) {
  await page.evaluate((ep) => window.renderThumb(ep), job.ep);
  const out = path.join(ROOT, 'projects', job.slug, 'out', 'thumbnail-youtube.png');
  await page.screenshot({ path: out, type: 'png' });
  console.log('wrote', out);
}

await browser.close();
server.close();
