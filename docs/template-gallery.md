# Starter video template gallery

Two self-contained, reproducible video demos are included in the repository. Both use React + Remotion, ship without voice/media files, and require **no AI API keys**.

| Template | Composition ID | Duration | Style | Source |
| --- | --- | --- | --- | --- |
| Stick Figure Story | `HelloWorldReel` | 5 seconds | White vector character on black, orange destination | [Source](../src/videos/hello-world/) |
| Editorial Quote | `EditorialQuoteReel` | 4 seconds | Kinetic typography, monochrome and orange highlight | [Source](../src/videos/editorial-quote/) |

## Render locally

```bash
npm ci
npm run render -- --id HelloWorldReel --out out/hello-world.mp4
npm run render -- --id EditorialQuoteReel --out out/editorial-quote.mp4
```

Or run `npm run studio` and select either composition to preview the frames and motion.

## CI preview

GitHub Actions' `demo-smoke` job renders both compositions and publishes MP4 files as **workflow artifacts** (not committed to Git). On a pull request, open the Actions run, then download the `zero-key-demo-mp4s` artifact to watch the samples. A static image or GIF showcase will be added only after its source render has been visually checked and confirmed suitable to distribute.

## Boundaries

These are deterministic visual starter examples—not a fully automatic AI video production run, nor a substitute for the 19-agent pipeline. They use only code and text authored for the repository; no third-party media or TTS previews are bundled. Refer to `AGENTS.md` for the production workflow.
