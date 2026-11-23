import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/** Đọc file .env đơn giản (KEY=VALUE), không ghi đè biến môi trường đã có. */
function loadDotEnv(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    const v = m[2].replace(/^["']|["']$/g, '');
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

export interface Config {
  port: number;
  host: string;
  token: string;            // để trống khi chạy trên máy; bắt buộc khi lên VPS
  apiKey: string;
  fake: boolean;            // dùng Claude giả để thử luồng, không tốn tiền
  realChannel: string;
  realSteps: string[];
  dailyCapUsd: number;
  videoCapUsd: number;
  concurrency: number;
  webSearch: boolean;
  maxSearches: number;
  dataDir: string;
  webDist: string;
}

export function loadConfig(root = resolve(import.meta.dirname, '..')): Config {
  loadDotEnv(resolve(root, '.env'));
  const e = process.env;
  const num = (v: string | undefined, d: number) => (v !== undefined && v !== '' && !Number.isNaN(+v) ? +v : d);
  return {
    port: num(e.PORT, 8787),
    host: e.HOST || '127.0.0.1',
    token: e.XV_TOKEN || '',
    apiKey: e.ANTHROPIC_API_KEY || '',
    fake: e.XV_FAKE_CLAUDE === '1',
    realChannel: e.REAL_CHANNEL || 'hcl',
    realSteps: (e.REAL_STEPS || 'research,script,review-script').split(',').map(s => s.trim()).filter(Boolean),
    dailyCapUsd: num(e.DAILY_CAP_USD, 3),
    videoCapUsd: num(e.VIDEO_CAP_USD, 0.8),
    concurrency: Math.max(1, num(e.MAX_CONCURRENT, 2)),
    webSearch: e.WEB_SEARCH !== '0',
    maxSearches: num(e.MAX_SEARCHES, 3),
    dataDir: resolve(root, e.DATA_DIR || 'data'),
    webDist: resolve(root, e.WEB_DIST || '../web/dist/index.html'),
  };
}
