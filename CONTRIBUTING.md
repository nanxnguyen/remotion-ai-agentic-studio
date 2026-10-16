# Contributing

Use Node 22 and start from an issue before a large change. Install dependencies with `npm install`, create videos with `npm run video:new`, and keep each video's visual language inside its own module.

Before opening a pull request, run:

```bash
npm run verify
npm run test:visual # when visuals or timelines change
```

Do not commit generated MP4s, secrets, personal voice samples, or media whose redistribution rights are unclear. Explain intentional golden-frame changes in the pull request.
