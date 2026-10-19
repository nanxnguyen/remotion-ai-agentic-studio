# Assets manifest — ban-khong-yeu-duoi-chi-da-manh-qua-lau

Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 9:16 1080×1920 @ 30 fps ·
planned total **48.90 s** (3.9 syl/s planning rate) · audio branch owner: `audio-agent` (Phase 3b).

Every row below was measured on the delivered file with `ffprobe` (format/sample-rate) and
`ffmpeg -af volumedetect` / `ebur128=peak=true`. Numbers that were not measured are written
"not measured" — none are assumed.

**Timing basis.** All cue offsets are relative to their shot's start (`sound-design` §4.5), never
absolute frames. The absolute second shown is the `script.md` §1 planning projection at 3.9 syl/s;
`voice-report.md` does not exist yet, so these are planning positions, not measured ones. The mix
layer must re-base them onto the measured timeline at Phase 7 using the relative offsets in the cue
table (see `mix-plan.md` §7).

---

## 1 · BGM

| Field | Value |
|---|---|
| File | `public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/bgm.mp3` |
| Duration | 60.430 s (ffprobe) |
| Codec / rate / channels | mp3 160 kbps · 44 100 Hz · stereo |
| Integrated loudness | **−20.3 LUFS** (ebur128, whole 60.43 s file) · mean −22.5 dB · max −10.1 dB |
| Measured on the **played 43.90 s segment** (file offset 3.500 s) | **−20.1 LUFS** integrated · TP **−10.6 dBFS** · LRA 1.1 LU (whole file: LRA 1.5 LU) |
| Origin | Synthesized by this repo's `scripts/gen-bgm-soft.py` (C–Am–F–G pad + soft arpeggio, nominal 72 BPM, `loudnorm=I=-20:TP=-2`, generator's own 3 s fade-in / 4 s fade-out) |
| Licence | **Original synthesis produced inside this repository — no third-party licence, no attribution obligation, no download.** Deterministic (no RNG, no wall-clock), so the file is reproducible from the script. |
| Command | `python3 -I scripts/gen-bgm-soft.py public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/bgm.mp3 60.0` |

**Why not the library's five tracks.** `SC/assets/audio/bgm/` holds five beat-forward Mixkit tracks
(tech-house / house / hip-hop, ~86–129 BPM). `sound-design` §2 records that they were chosen for the
product-promo film, and the library's own note calls them "5 首 BGM 备选". This is a `story` profile and
`brief.md` fixes the register as *soft, intimate, nocturnal, never theatrical*; a 4-on-the-floor bed
would fight a 16.34 s silence budget that is doing most of the emotional work. `sound-design` §2's
alternative route — generate a soft bed — is the one taken. Same precedent as the sibling story video
`thuong-hay-so-bat-dau-lai`.

**Bed placement.** The render mounts the file at `startFrom = 105` frames (3.500 s), past the
generator's own 3 s fade-in, so the mix layer's 1.20 s fade-in is the only fade the listener hears.
The bed is cut to zero at **43.900 s**, the last spoken sound of the video.

### Beat grid — `analysis/no-beat-sync.md`, `analysis/grid_drift.json`

**No beat sync. No `beat_data.json` written.** Measured, not assumed:

- `librosa.beat.beat_track` (librosa 1.0.0, `~/.venvs/vieneu/bin/python`, `tightness=400`) on the played
  43.900 s segment returns **tempo 0.0 and 0 beats** — degenerate, so the §1 least-squares grid fit has
  no input. Onset autocorrelation returns **no BPM peaks**.
- §3 acceptance on the best candidate (nominal arpeggio grid, 288 BPM, t0 = 0.0348 s):
  **match 48.34 %** (threshold ≥ 98 %), mean error 5.97 ms (< 10 ms ✓), drift 0.884 ms (< 5 ms ✓),
  beat 0 on a real attack ✓ — **rejected on match alone, by 49.66 points.**
- Every other candidate (144 / 72 / 288 BPM × t0 ∈ {0, 0.0348} s): match **0.00 – 1.89 %**.

Consequence: cuts and cues are pinned to the voice timeline. No `beatF(n)`, no click track, no
render-time beat re-measurement (`music-beat-sync` §5) is required.

---

## 2 · SFX — foley first

Vocabulary was chosen **by film type, not by event** (`sound-design` S1): a quiet interior story gets
rain, water, fabric, glass and one physical switch click. Nothing from `ui/`'s synthetic-feedback tier
is used. All ten source files were md5-checked for duplicates: **ten distinct hashes**, so the
two-sample alternation in the `img1` cluster is a real timbral change, not the same file under two names
(`sound-design` §3.2).

| Cue file | Source (`skills/video-shotcraft/assets/audio/`) | Mixkit original name | Trim (s) | Delivered dur | Delivered peak | Delivered TP |
|---|---|---|---|---|---|---|
| `sfx-rain-wash.mp3` | `sfx/transition/wind-swoosh-short.mp3` | Short wind swoosh | 0.000–1.000 | 1.000 s | −1.3 dB | −1.3 dBFS |
| `sfx-drop-glass.mp3` | `sfx/fluid/water-drop-cave.mp3` | Water drop splashes in cave | 0.042–0.362 | 0.320 s | −4.9 dB | −3.5 dBFS |
| `sfx-back-a.mp3` | `sfx/text/typewriter-hit-single.mp3` | Mechanical typewriter single hit | 0.091–0.371 | 0.280 s | −0.4 dB | −0.2 dBFS |
| `sfx-back-b.mp3` | `sfx/ui/switch-click-quick.mp3` | Quick switch click | 0.000–0.260 | 0.260 s | −1.1 dB | −0.6 dBFS |
| `sfx-phone-down.mp3` | `sfx/paper/paper-move-quick.mp3` | Paper quick movement | 0.225–0.625 | 0.400 s | −2.2 dB | −1.7 dBFS |
| `sfx-screen-wake.mp3` | `sfx/ui/switch-light.mp3` | Light switch sound | 0.013–0.183 | 0.154 s | −5.1 dB | −5.1 dBFS |
| `sfx-umbrella-lift.mp3` | `sfx/fluid/sand-swish.mp3` | Sand swish | 0.076–0.626 | 0.550 s | −5.1 dB | −3.8 dBFS |
| `sfx-drop-fabric.mp3` | `sfx/fluid/water-splash.mp3` | Water splash | 0.309–0.609 | 0.300 s | −0.4 dB | −0.0 dBFS |
| `sfx-light-turn.mp3` | `sfx/light/sparkle-touch.mp3` | Magic sparkle touch | 0.223–0.823 | 0.600 s | −1.5 dB | −1.5 dBFS |
| `sfx-cup-down.mp3` | `sfx/glass/glass-plate-slide.mp3` | Glass plate slide | 0.169–0.449 | 0.280 s | −4.2 dB | −4.2 dBFS |

All ten are Mixkit **Sound Effects Free License** — free commercial use, **no attribution required** —
registered with per-file URLs in `SC/assets/audio/ATTRIBUTION.md`. All ten are in that file's
§"扩充 SFX 第二批（2026-07-27 下载，当场记录 URL）" table (verified by `analysis/check-licences.py`).
Original URLs:

| Cue file | Mixkit asset URL |
|---|---|
| `sfx-rain-wash.mp3` | https://assets.mixkit.co/active_storage/sfx/1461/1461-preview.mp3 |
| `sfx-drop-glass.mp3` | https://assets.mixkit.co/active_storage/sfx/3179/3179-preview.mp3 |
| `sfx-back-a.mp3` | https://assets.mixkit.co/active_storage/sfx/1382/1382-preview.mp3 |
| `sfx-back-b.mp3` | https://assets.mixkit.co/active_storage/sfx/2582/2582-preview.mp3 |
| `sfx-phone-down.mp3` | https://assets.mixkit.co/active_storage/sfx/2380/2380-preview.mp3 |
| `sfx-screen-wake.mp3` | https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3 |
| `sfx-umbrella-lift.mp3` | https://assets.mixkit.co/active_storage/sfx/1494/1494-preview.mp3 |
| `sfx-drop-fabric.mp3` | https://assets.mixkit.co/active_storage/sfx/1311/1311-preview.mp3 |
| `sfx-light-turn.mp3` | https://assets.mixkit.co/active_storage/sfx/3083/3083-preview.mp3 |
| `sfx-cup-down.mp3` | https://assets.mixkit.co/active_storage/sfx/1527/1527-preview.mp3 |

### Pre-processing actually applied

1. **Peak-aligned trims** (`sound-design` §4.6 offset-two). Every trim window was placed on the
   source's measured energy peak (librosa RMS envelope, hop 128), not on the file head. Measured peak
   position inside each delivered cue: `back-a` 0.078 s · `back-b` 0.015 s · `cup-down` 0.099 s ·
   `drop-fabric` 0.102 s · `drop-glass` 0.078 s · `phone-down` 0.099 s · `screen-wake` 0.058 s ·
   `umbrella-lift` 0.209 s · `light-turn` 0.253 s · `rain-wash` 0.163 s.
2. **Fades** on every cue: 4–60 ms in, 25–150 ms out, per length. No clicks, no truncated tails.
3. **Pre-normalisation** (`sound-design` §4.1 route 2) for the two sources whose own peak is unusable:
   `ui/switch-light` (−10.7 dB) +6.0 dB and `glass/glass-plate-slide` (−11.0 dB) +7.0 dB at build time,
   then `fluid/water-drop-cave` (+4.0 dB) and `fluid/sand-swish` (+5.0 dB) after their trims, because
   the trim cut into their tails. **No delivered cue is below −12 dB** — the lowest is −5.1 dB. No cue
   uses `volume > 1`, so nothing is preview-clamped differently from the render (`sound-design` §4.1).
4. **No source was left un-processed.** Nothing is a straight copy of a library file, and every build
   step is a plain `ffmpeg -ss/-t + afade/volume` chain that can be re-run.

### Substitutions declared openly

`sound-design` §4.1 forbids letting a quiet sample hide behind a low `volume`. Where the library has no
honest match, the substitution is stated rather than dressed up:

| Needed on screen | Library reality | What was used and why it is honest |
|---|---|---|
| **rain** (cover street, `s3` glass, `a2` window, `img2` sleeve) | the library has **no rain sample at all** | three different real water/air samples instead: a wind wash (`transition/`), a drop striking a hard wet surface (`fluid/water-drop-cave`), and a short splat (`fluid/water-splash`). No synthesized rain was invented. |
| **backspace on a phone** (`img1`) | no phone-keyboard sample | `text/typewriter-hit-single` (a real mechanical single hit) alternating with `ui/switch-click-quick` — which `sound-design` §3.3 lists as ✅ "real switch", not synthetic feedback. This is S4 "on-screen-action foley", not a UI beep. |
| **the phone turned face-down** (`img1`) | no "object set down on a soft surface" sample | `paper/paper-move-quick` — **a gesture proxy**: the material is wrong, the movement (a light object drawn quickly across a surface) is right. Declared, not hidden. |
| **an incoming call ringing** (`s6`) | **no ringtone in the library**; `ui/ui-notify-tech` / `ui-message-pop` are ❌ notification sounds under §3.3 | **no ring is played.** The screen lighting is foley (`ui/switch-light`, a real light switch); the ring itself is the **0.679 s of silence** in `s6`'s hold, which is the point of the shot — the call is not answered. Downloading a ringtone would mean an unlicensed source. |
| **a warm cup set down on wood** (`s10`) | `glass/glass-hit-cine` is a 4.7 s suspense hit | `glass/glass-plate-slide` trimmed to the settle — a real hard object coming to rest on a surface. |

**Deliberately not used, and why.** `riser-cine`, `impact-deep-whoosh`, `impact-cine-big`,
`sparkle` (Mixkit) — all cinematic-punctuation vocabulary that would break `brief.md`'s "gentle,
intimate, never theatrical" register; the closing-phrase grammar is honoured with foley instead
(`analysis/no-beat-sync.md` §4.3 table). `ui/pop.mp3` — provenance is "来源待考" in `ATTRIBUTION.md`;
not used in a video that will be published. Every ❌/⚠️ file of the `ui/` §3.3 list
(`ui-click-tone`, `ui-confirm-bleep`, `ui-confirm-tone`, `ui-tone-quick`, `ui-success-soft`,
`ui-notify-tech`, `ui-message-pop`, `ui-popup-dry`, `ui-option-select`, `ui-select-modern`) is unused.

---

## 3 · Files written by this branch

| Path | Owner | Written |
|---|---|---|
| `public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/bgm.mp3` | audio-agent | ✅ |
| `public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/sfx-*.mp3` (10 files) | audio-agent | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/assets-manifest.md` | audio-agent | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/mix-plan.md` | audio-agent | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/grid_drift.json` | audio-agent | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/no-beat-sync.md` | audio-agent | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/check-cues.py` | audio-agent (re-runnable acceptance check) | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/cue-check.txt` | audio-agent (its output) | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/check-licences.py` | audio-agent (re-runnable licence-coverage check) | ✅ |
| `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/analysis/licence-check.txt` | audio-agent (its output, 0 gaps) | ✅ |

**Not touched:** `public/audio/<vid>/s*.mp3` and `raw/` (voice-agent, running in parallel),
`src/`, `status.json`, `voice.json`, `script.md`, `content-pack.md`, `design-spec.md`, `voice-report.md`.

## 4 · Licence summary

| Asset | Count | Licence | Redistribution |
|---|---|---|---|
| BGM bed | 1 | original synthesis, this repo's `scripts/gen-bgm-soft.py` | free |
| SFX | 10 | Mixkit Sound Effects Free License (free commercial, **no attribution**) | free |

Nothing unlicensed was downloaded. No personal voice material, no secrets and no rendered media were
written into `docs/`. No asset is committed from an unverified source: each of the ten SFX resolves to a
registered Mixkit asset URL in `SC/assets/audio/ATTRIBUTION.md`, cross-checked against
`docs/audio-attribution.md`.