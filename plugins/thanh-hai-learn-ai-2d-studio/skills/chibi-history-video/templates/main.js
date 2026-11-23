// scenes/shots/main.js — chibi-history-video project template (skill v0.9+). Copy into projects/<slug>/scenes/shots/.
// All drawing lives in /engine/chibi-shot.js; shot data comes from story/shots.json (tools/chibi_assign.py).
import { E, registerShot } from '/engine/core.js';
import { drawChibiShot } from '/engine/chibi-shot.js';
import * as CAST from '../cast.js';

for (let i = 1; i <= 999; i++) {
  const id = 's' + String(i).padStart(3, '0');
  registerShot(id, {
    draw(g, t, info) {
      const shot = (E.shots || []).find(s => s.id === id) || {};
      drawChibiShot(g, t, { ...(info || {}), shot, index: i }, CAST);
    },
  });
}
