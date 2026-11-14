// thumbnail: Cún Lú crying with a swollen heel + giant bullet ant + "ĐAU 24 GIỜ?!"
import { E, registerShot, alpha, glow, text, FONTS, rr } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import { ant, rainforest, swollenHeel, bandage, DOG } from './cgbcd.js';
registerShot('thumb', { draw(g) {
  rainforest(g, 2, { z: 1.1 });
  g.fillStyle = 'rgba(8,6,14,.35)'; g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W * 0.3, E.H * 0.55, 600, '#ff6a50', 0.25);
  g.save(); g.translate(E.W * 0.3, E.H * 0.56); g.scale(1.18, 1.05); bigFace(g, 0, 0, 330, { outfit: DOG, expr: 'cry', rimColor: '#b8f0c8', rimSide: -1 }); g.restore();
  bandage(g, E.W * 0.2, E.H * 0.38, 120, -0.5); bandage(g, E.W * 0.4, E.H * 0.7, 110, 0.4);
  swollenHeel(g, E.W * 0.43, E.H * 0.42, 2.2);
  ant(g, { x: E.W * 0.78, y: E.H * 0.97, s: 3.2, facing: -1, t: 0.3, kind: 'bullet', rim: { color: '#ffb36a', dir: [0, -1] } });
  text(g, 'ĐAU 24 GIỜ?!', E.W * 0.66, E.H * 0.19, { size: 160, color: '#ffd447', font: FONTS.ui, weight: 900, glow: 40, glowColor: alpha('#ff6a50', 0.9), stroke: 22, strokeColor: '#1a0a10' });
  rr(g, E.W * 0.66 - 330, E.H * 0.33, 660, 100, 50); g.fillStyle = '#ff4d4d'; g.fill();
  text(g, 'THANG ĐAU 1 → 4', E.W * 0.66, E.H * 0.33 + 52, { size: 62, color: '#fff', font: FONTS.ui, weight: 900 });
} });
