# Motion specification — no-jitter contract

- Native 60fps, Remotion frame-driven state and global time only; 2,550 frames / 42.5 sec.
- 16 genuinely distinct scenes, no re-timing of older clips. Continuous protagonist drawn **once** across all transitions; no silhouette duplication or changing actor scale/anchor between scenes.
- Boundary crossfade is centered on each scene start and spans 48 frames (0.8 sec), over background imagery only.
- Limb poses and facial expression linearly interpolate with smoothstep over exactly the same boundary window.
- Global camera drift `sin(frame/211)`, `cos(frame/287)`, small scale variance (<~2%); **no per-shot integer camera jump**.
- Two families only: background cross-dissolve and prop transform (amber phone screen → candle); no random whip/glitch/fast flashes.
- Typography hard-reset avoided by temporal overlap, no moving marquee, text is readable as a complete emotional phrase.
- QA: ffprobe 60 fps; inspect frame 0, before/after 15 boundaries, climax and closing. Measure seam frame mean deltas and fail gross discontinuity; verify visually using stills.
