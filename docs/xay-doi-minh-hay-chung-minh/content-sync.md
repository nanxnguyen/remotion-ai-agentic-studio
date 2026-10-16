# Content sync — xay-doi-minh-hay-chung-minh (content-agent, gate E close-out)

`content-pack.md` v1 left byte-untouched (voice.json byte-locked, Round 1 9.9 pass, no wording issues).
This file carries the E06/J1 + E12/J2 confirmations so no text row is edited.

## E06 / J1 — chip spec sync (s5b)
- Pack text unchanged, word for word:
  `Hiệu ứng spotlight / (Gilovich & cs., 2000): / ta hay nghĩ người khác / để ý mình hơn thực tế`
- 4 lines, all ≤ 28 chars (audit table says 18/23/22/22; recount of line 4 = 21 NFC — either way ≤ 28, max stays 27 elsewhere per review).
- Window 0.6–4.8s of shot, fades ≥ 0.2s before cut, never in s6, clear of caption zone (bottom:224 / 210px clear) and of s6.
- Size: design renders + specs Archivo **32px** (design-spec §3, Q11 floor). Pack v1 pins no px value for the chip (grep: no `30px`/`32px` in pack), so there is nothing to sync in pack text — build uses 32px.
- Status: confirmed, zero word changes.

## E12 / J2 — s11 accent "cho ai?"
- Pack text unchanged: HEADLINE `Viên gạch / tiếp theo, / bạn đặt cho ai?`, accent cluster `cho ai` (pack labels it `đậm` = bold white).
- Director decision logged for build: render **`cho ai?` in jade `#19C48A`** (self-side system + dawn pairing + 1-accent/shot rule, per design-spec §13 J2 and integration-review E12).
- Wording, line breaks, chunking: no change. Only the build-time color token switches đậm → jade.
- Final 2.0s pure silence, both worlds level, figure center — untouched.
- Status: confirmed jade for build, zero word changes.

## Fidelity re-check (2026-10-16, post-confirmation)
- 16/16 caption/headline joins == voice.json (NFC, single-space join), diff empty. s9a + " " + s9b byte-exact mandatory line intact.
- voice.json untouched. content-pack.md untouched (no text-row edits).
