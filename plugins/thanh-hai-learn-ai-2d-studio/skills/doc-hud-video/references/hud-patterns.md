# HUD & Media Patterns Reference (`doc-hud-video`)

Proven patterns extracted from `dai-duong-sau-thuc-te` (9:16) and `dai-duong-sau-longform` (16:9).

## 1. Piecewise Scale Mapping for `DepthGaugeHud`

A linear meter scale crams `0–200 m` and `200–1.000 m` into the top 5% of the bar. Use piecewise interpolation across evenly spaced visual ticks:

```ts
const METER_TO_RATIO = (meters: number): number => {
  if (meters <= 200) return interpolate(meters, [0, 200], [0, 0.2]);
  if (meters <= 1000) return interpolate(meters, [200, 1000], [0.2, 0.4]);
  if (meters <= 4000) return interpolate(meters, [1000, 4000], [0.4, 0.6]);
  if (meters <= 6000) return interpolate(meters, [4000, 6000], [0.6, 0.8]);
  return interpolate(meters, [6000, 11000], [0.8, 1], {extrapolateRight: 'clamp'});
};
```

## 2. Layout Coordinates by Aspect Ratio

| Component | 9:16 (`1080x1920`) | 16:9 (`1920x1080`) |
|---|---|---|
| `DepthGaugeHud` | `top: 150, right: 36`, `barHeight: 460` | `top: 150, right: 68`, `barHeight: 760` |
| `GoldLowerThird` | `left: 48, bottom: 300, maxWidth: 800` | `left: 64, bottom: 64, maxWidth: 920` |
| `NarrationCaption` | `top: 165, left: 48, right: 190` | `top: 68, left: 64, maxWidth: 1320` |
| `BuildingInfographic` | Single column, `padding: 160px 56px 280px` | Two columns (`title` left, `tiers` right), `padding: 120px 140px` |

## 3. Deterministic Particles (`MarineSnowLayer`)

Never use `Math.random()`. Derive positions from index primes and `useCurrentFrame()`:

```ts
const seedX = ((i * 211 + 37) % 1000) / 1000;
const seedY = ((i * 347 + 83) % 1000) / 1000;
const x = seedX * width + Math.sin(frame * 0.025 + i) * 18;
const y = (seedY * height - frame * speed * (0.65 + (i % 3) * 0.35) + height * 10) % height;
```

## 4. Open-Source Media Downloader (Wikimedia / Wikipedia REST API)

Always pass a descriptive `User-Agent` and `time.sleep(2)` between downloads to avoid HTTP 429/403:

```python
UA = "AntigravityStudio/1.0 (https://example.org; dev@example.org)"
req = urllib.request.Request(
    f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title}",
    headers={"User-Agent": UA},
)
```

For NOAA / Wikimedia Commons exact filenames (e.g. `Magnapinna sp. - Expl8176.jpg`, `Cranchiidae - Expn2374.jpg`), query `commons.wikimedia.org/w/api.php?action=query&generator=search&prop=imageinfo&iiprop=url|size|mime` and download via `curl -fsSL -A "$UA"`.

## 5. Word-Level Gold Highlight Captions (Matched to Voiceover)

Match the `ui2d.js` `captions()` look (3–4 uppercase words, thick black outline, active word highlighted in `#facc15` with a subtle pop, breaking at `. ! ? …` or `> 0.5 s` pauses):

```tsx
export interface TimedWord {
  word: string;
  start: number; // seconds
  end: number;   // seconds
}

// Group words cleanly (never crossing sentence boundaries or >0.5s pauses, max 4 words)
export function getCaptionGroup(words: readonly TimedWord[], idx: number, max = 4) {
  const isBreak = (k: number) =>
    k > 0 &&
    (/[.!?…]["')\]]*$/.test(words[k - 1].word.trim()) ||
      words[k].start - words[k - 1].end > 0.5);
  let s = idx;
  while (s > 0 && !isBreak(s)) s--;
  let e = s;
  while (e < words.length && (e === s || !isBreak(e))) e++;
  const st = s + Math.floor((idx - s) / max) * max;
  return words.slice(st, Math.min(st + max, e));
}
```

Render each word in the active group with `fontWeight: 900`, `textTransform: 'uppercase'`, `WebkitTextStroke: '6px rgba(0,0,0,0.88)'`, `paintOrder: 'stroke fill'`, color `isCurrent ? '#facc15' : '#ffffff'`, and `transform: isCurrent ? 'scale(1.08)' : 'scale(1)'`. Place centered above `GoldLowerThird` (`bottom: 430` in 9:16; `bottom: 185` in 16:9).

