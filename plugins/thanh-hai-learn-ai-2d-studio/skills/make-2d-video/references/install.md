# Installing the studio (once per machine or workspace)

The studio is a small Node + Python toolkit that ships inside this plugin, in the `kit/` folder of the `make-2d-video` skill. Copy it into a writable workspace folder, because the plugin folder may be read-only and the studio needs `node_modules`, projects and renders next to it.

## 1. Locate the kit
- The kit is `kit/` inside the `make-2d-video` skill's base directory. Stage commands (`new-video`, `video-styles`, `render-video`, `video-sound`) reach it at `../make-2d-video/kit/` from their own base directory.
- If the path is unclear, search for it: `find / -path "*make-2d-video/kit/render.mjs" 2>/dev/null | head -1` (Linux/macOS/Cowork VM), or `Get-ChildItem -Recurse -Filter render.mjs -Path $HOME\.claude | Select-Object -First 1` (PowerShell).

## 2. Choose the workspace and copy
- Use the user's connected project folder if there is one, otherwise the current working directory. Create `thanhhai-2d-studio/` there.
- If `thanhhai-2d-studio/` already exists with `render.mjs` inside, it's already installed. Skip to step 4 (doctor), and never overwrite the user's `projects/` folder.
- Copy all of `kit/` into it: `cp -r "<kit>/." thanhhai-2d-studio/` (bash) or `Copy-Item -Recurse "<kit>\*" thanhhai-2d-studio\` (PowerShell).
- Run `python tools/verify_kit.py` inside `thanhhai-2d-studio/`. It must report every file verified (N/N). If anything is missing or mismatched, copy those files again.

## 3. Install dependencies
Tell the user, in one short list, what is being installed and why: ffmpeg (video/audio encoding), Node.js packages (renderer, Three.js, fonts), a headless Chromium (draws the frames), and numpy, scipy and faster-whisper (sound synthesis and timestamps).

| Need | Windows | macOS | Linux |
|---|---|---|---|
| ffmpeg + ffprobe | `winget install --id Gyan.FFmpeg -e` (then open a new terminal) | `brew install ffmpeg` | `sudo apt-get install -y ffmpeg` |
| Node.js ≥ 18 | `winget install OpenJS.NodeJS.LTS` | `brew install node` | nodesource or distro package |
| Python ≥ 3.9 | python.org installer | `brew install python` | distro package |
| JS packages | `npm install` (inside thanhhai-2d-studio) | same | same |
| Headless Chromium | `npx playwright install chromium` | same | same (`npx playwright install-deps chromium` if libraries are missing) |
| Python packages | `python -m pip install numpy scipy faster-whisper` | same | add `--break-system-packages` on managed Pythons |

## 4. Check and self-test
1. `python tools/doctor.py`. Use `python3` where `python` isn't Python 3, and `py -3` on some Windows setups. Repeat until every line is OK. `python tools/doctor.py --install` runs the npm, playwright and pip fixes automatically.
2. Self-test: `node render.mjs --project examples/reaction-time --sheet --scale 0.3`. It should write `examples/reaction-time/build/sheets/sheet_01.png` with 14 finished frames (café scenes, giant faces, a 3D orbit, blueprint charts, a title card) and print no errors. Open the PNG to confirm, then delete `examples/reaction-time/build/`.
3. Optional second self-test for the v0.3 animation engine: `node render.mjs --project examples/motion-lab --sheet --scale 0.3` (5 frames: lab walk-in, dialogue, giant face, jump, thumbs up). Delete `examples/motion-lab/build/` afterwards. The evolution examples self-test the same way: `examples/evolution-life` (9:16) and `examples/evolution-species` (16:9).
4. If `npx playwright install chromium` cannot download (locked-down network), reuse any installed Chromium/Chrome: `CHROME_PATH=/path/to/chrome node render.mjs …` or `--chrome /path/to/chrome`.
5. Whisper downloads its model the first time it runs (~75 MB for `base`, ~500 MB for `small`). That needs internet access to huggingface.co.

## Notes
- On Linux servers and the Cowork VM there's no GPU. Chromium uses SwiftShader automatically (`--gl swiftshader` is the Linux default), so everything works, just slower.
- Disk: ~600 MB for node_modules + Chromium, plus renders (a 10-minute 1080p video is ~150–300 MB).
- Updating: when the plugin is updated, copy the new `kit/` over the existing install. It never touches `projects/`, so the user's videos are safe. Custom styles added to `engine/styles.js` would need re-adding, so check first.
