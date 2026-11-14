# Brief — thang-may-tang-13

> Director intake — 2026-11-07 (Asia/Ho_Chi_Minh). Runtime: Claude Code. Topic chosen by the owner from six proposals ("1").

## Identity (director-owned)

- vid / slug: `thang-may-tang-13`
- composition: `ThangMayTang13Reel` (numbered registry ID assigned by `video:new` during build)
- profile and format: story · horror Shorts · 1080×1920 · 30 fps · 13 narration scenes / 16 board panels · **≤ 60.000 s** total including final hold
- platform: YouTube Shorts + TikTok
- output: `out/thang-may-tang-13-anh-khoi-reel.mp4` — BGM version only (owner preference)
- skills applied: `ray-phim-ke-chuyen` (HOOK 0–6 / BODY 6–30 / CLIMAX 30–48 / ENDING 48–60, V3→V4 action-evidence gate, soft 0.35–0.55 s fades, captioned review board, clean film frames), `retention-action-director`, `docs/SHORTS_RETENTION_PLAYBOOK.md`.

## Owner constraints

- Original Vietnamese horror story: elevator in a 12-floor apartment stops at floor 13; identical corridor with sealed doors; Linh's own door ajar; someone watching the news about the building fire; the victim photo is Linh.
- Owner approval checkpoint: **script + 16-panel captioned storyboard are shown to the owner before voice and render** (owner-requested decision gate, recorded in HANDOFF.md).
- Real Vbee narration (Batch via GitHub Actions Secrets), never a placeholder voice labelled Vbee.
- Voice pace: natural, slightly faster than default (rate +4..+8 %), short pauses (owner memory).
- No fiction disclaimer read in the narration; "truyện hư cấu" label goes in the description.
- Delivery: Google Drive numbered `Videos-shorts` folder (MP4 + 9:16 thumbnail + title/description txt); GitHub holds source/QA only; **no GitHub Releases**; no publishing.

## Difference from prior films (Gate A A18)

`ngon-hai-dang` (keeper discovers he drowned) and `chiec-bat-goi-ten` (mother, portrait) share mechanics. This film differs in engine and tone: the trigger is the **mother's anniversary invitation** ("về ăn cơm"), seeded at 0–6 s on Linh's phone and paid off by the untouched rice bowl; the ending is **grief**, not a jump or a loop. Hook candidate chosen: **H1** ([hook-options.md](hook-options.md)).

## Premise and story question

Premise: On the night of her first death anniversary, Linh rides home not knowing she died in the building fire; the elevator takes her to a floor that exists only for her.
Story question (0–6 s): *Why does a 12-floor building have a 13th floor tonight — and what is waiting there?*
Viewer emotion: dread → recognition → grief-tinged chill.

## Character bible

- **Linh** — 26, office worker. Short black bob, pale face, **mustard-amber raincoat** (wet), white earbuds cable, grey tote bag, keycard lanyard. Same outfit in every shot; in the TV photo and altar portrait she wears the same raincoat collar.
- **Mẹ (Linh's mother)** — ~55, grey hair in a low bun, dark maroon cardigan over a cream blouse, thin face, red-rimmed eyes; holds three incense sticks.
- **Entity** — none shown as a monster. The horror is the place (floor 13), the seals, the TV, and Linh's own absence (no mirror reflection, ash hands).

## Environment bible

- Elevator car: brushed steel walls, one **mirror wall**, red 7-segment floor display above the door, button panel 1–12 (no 13 button).
- Floor 13 corridor: identical layout to floor 12 (shoe rack, potted plant, fire extinguisher box), but faint soot on the ceiling, flickering cold fluorescent tube, white paper seals with a red stamp on every door, dated with day/month + **00:12**, no year.
- Apartment 1205 (on floor 13): warm tungsten lamp, old CRT-style TV glow, sofa facing away from the door, small family altar with di ảnh, incense smoke, a bowl of rice and chopsticks set for one.

## Palette and type

Cold blue-black base, tungsten amber practicals, restrained crimson. Captions: ivory `#F7F1E8` narration, amber `#F5C467` clues (13, seal date, 1205), crimson `#ED3E4C` threat/twist (victim photo, "giỗ đầu"). Font: Be Vietnam Pro / Lexend bold (Vietnamese subsets in `public/fonts`).

## Voice route

- Provider: **Vbee Batch** (`mode=async`) via GitHub Actions Secrets (`scripts/gen-room404-vbee.py` pattern).
- voiceCode: `hn_male_phuthang_stor_24k-stl` (Anh Khôi nâng cao, storytelling) — most-used horror narrator in this repo (26 references); voice slug `anh-khoi`. Re-verify the code is still supported by the package before generation.
- Rate: +5 % target (owner pace preference); never post-stretch audio to fit a slot — rewrite text instead.
