#!/usr/bin/env node
/**
 * Validates a stickman storyboard JSON against retention pacing,
 * 9:16 portrait safe-area captions, and valid pose/style presets.
 *
 * Usage:
 *   node scripts/stickman-director/validate-storyboard.mjs <path-to-storyboard.json>
 */
import fs from 'node:fs';
import path from 'node:path';

const VALID_STYLES = new Set([
  'classic-bw',
  'minimal-handdrawn',
  'amber-noir',
  'retro-tv',
  'survival-thriller',
  'dynamic-meme',
]);

const VALID_POSES = new Set([
  'idle',
  'thinking',
  'pointing',
  'shocked',
  'celebrate',
  'slumped',
  'presenting',
  'argue',
]);

export function validateStoryboard(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return ['Storyboard root must be a JSON object'];
  }

  if (!VALID_STYLES.has(data.styleId)) {
    errors.push(`Invalid styleId "${data.styleId}". Expected one of: ${[...VALID_STYLES].join(', ')}`);
  }

  if (!Array.isArray(data.shots) || data.shots.length === 0) {
    errors.push('Storyboard must contain a non-empty "shots" array');
    return errors;
  }

  let prevEnd = 0;
  for (const [index, shot] of data.shots.entries()) {
    const label = `shots[${index}]`;
    if (typeof shot.start !== 'number' || typeof shot.end !== 'number' || shot.end <= shot.start) {
      errors.push(`${label}: invalid start/end timing (${shot.start} -> ${shot.end})`);
      continue;
    }
    if (index === 0 && shot.end - shot.start > 3.5) {
      errors.push(`${label}: opening hook shot exceeds 3.5s (${(shot.end - shot.start).toFixed(2)}s)`);
    }
    if (shot.end - shot.start > 6.5) {
      errors.push(`${label}: shot duration ${(shot.end - shot.start).toFixed(2)}s exceeds 6.5s retention limit`);
    }
    if (Math.abs(shot.start - prevEnd) > 0.05) {
      errors.push(`${label}: gap or overlap with previous shot (${prevEnd} -> ${shot.start})`);
    }
    prevEnd = shot.end;

    if (shot.pose && !VALID_POSES.has(shot.pose)) {
      errors.push(`${label}: unknown pose "${shot.pose}"`);
    }

    if (shot.caption !== undefined) {
      if (typeof shot.caption !== 'string' || !shot.caption.trim()) {
        errors.push(`${label}: caption must be a non-empty string`);
      } else if (/[\r\n]/.test(shot.caption)) {
        errors.push(`${label}: caption must be single-line (no newlines)`);
      } else if (shot.caption.trim().length > 42) {
        errors.push(`${label}: caption exceeds 42 characters (${shot.caption.trim().length})`);
      }
    }
  }

  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node scripts/stickman-director/validate-storyboard.mjs <storyboard.json>');
    process.exit(2);
  }
  const resolved = path.resolve(target);
  const raw = fs.readFileSync(resolved, 'utf8');
  const parsed = JSON.parse(raw);
  const errors = validateStoryboard(parsed);
  if (errors.length) {
    console.error('Storyboard validation failed:');
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }
  console.log(`Storyboard OK: ${parsed.shots.length} shots, style=${parsed.styleId}`);
}
