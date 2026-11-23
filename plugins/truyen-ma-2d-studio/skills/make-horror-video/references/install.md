# Installing the studio (once per machine or workspace)

The studio is a small Node + Python toolkit that ships inside this plugin, in the `kit/` folder of the `make-horror-video` skill. Copy it into a writable workspace folder, because the plugin folder may be read-only and the studio needs `node_modules`, projects and renders next to it.

## 1. Locate the kit
- The kit is `kit/` inside the `make-horror-video` skill's base directory. The other skills of this plugin (`horror-story-writer`, `horror-package`) reach it at `../make-horror-video/kit/` from their own base directory.
- If the path is unclear, search for it: `find / -path "*make-horror-video/kit/render.mjs" 2>/dev/null | head -1` (Linux/macOS/Cowork VM), or `Get-ChildItem -Recurse -Filter render.mjs -Path $HOME\.claude | Select-Object -First 1` (PowerShell).

## 2. Choose the workspace and copy
- Use the user's connected project folder if there is one, otherwise the current working directory. Create `truyenma-studio/` there.
- If `truyenma-studio/` already exists with `render.mjs` inside, it's already installed. Skip to step 4 (doctor), and never overwrite the user's `projects/` folder.
- Copy all of `kit/` into it: `cp -r "<kit>/." truyenma-studio/` (bash) or `Copy-Item -Recurse "<kit>\*" truyenma-studio\` (PowerShell).
- Run `python tools/verify_kit.py` inside `truyenma-studio/`. It must report every file verified (N/N). If anything is missing or mismatched, copy those files again.

## 3. Install dependencies
Tell the user, in one short list, what is being installed and why: ffmpeg (video/audio encoding), Node.js packages (renderer, Three.js, fonts), a headless Chromium (draws the frames), and numpy, scipy and faster-whisper (sound synthesis and timestamps).

| Need | Windows | macOS | Linux |
|---|---|---|---|
| ffmpeg + ffprobe | `winget install --id Gyan.FFmpeg -e` (then open a new terminal) | `brew install ffmpeg` | `sudo apt-get install -y ffmpeg` |
| Node.js ≥ 18 | `winget install OpenJS.NodeJS.LTS` | `brew install node` | nodesource or distro package |
| Python ≥ 3.9 | python.org installer | `brew install python` | distro package |
| JS packages | `npm install` (inside truyenma-studio) | same | same |
| Headless Chromium | `npx playwright install chromium` | same | same (`npx playwright install-deps chromium` if libraries are missing) |
| Python packages | `python -m pip install numpy scipy faster-whisper` | same | add `--break-system-packages` on managed Pythons |

## 4. Check and self-test
1. `python tools/doctor.py`. Use `python3` where `python` isn't Python 3, and `py -3` on some Windows setups. Repeat until every line is OK. `python tools/doctor.py --install` runs the npm, playwright and pip fixes automatically.
2. Self-test: `node render.mjs --project examples/hem-demo --sheet --scale 0.4`. It should write `examples/hem-demo/build/sheets/sheet_01.png` with 9 finished horror frames (the alley at 02:17, a man with a phone light, the altar with glowing portrait eyes, a ghost close-up, a banyan with lanterns, red eyes in a flashlight beam, a hand from a well, a VHS rule card, the title card) and print no errors. Open the PNG to confirm, then delete `examples/hem-demo/build/`.
3. The original Thanh Hai examples (`examples/reaction-time`, `motion-lab`, `evolution-*`, `mascot-explainer`) still self-test the same way and are the best reference for character acting.
4. If `npx playwright install chromium` cannot download (locked-down network), reuse any installed Chromium/Chrome: `CHROME_PATH=/path/to/chrome node render.mjs …` or `--chrome /path/to/chrome`.
5. Whisper downloads its model the first time it runs (~75 MB for `base`, ~500 MB for `small`). That needs internet access to huggingface.co.

## Notes
- On Linux servers and the Cowork VM there's no GPU. Chromium uses SwiftShader automatically (`--gl swiftshader` is the Linux default), so everything works, just slower.
- Disk: ~600 MB for node_modules + Chromium, plus renders (a 10-minute 1080p video is ~150–300 MB).
- Updating: when the plugin is updated, copy the new `kit/` over the existing install. It never touches `projects/`, so the user's videos are safe. Custom styles added to `engine/styles.js` would need re-adding, so check first.
