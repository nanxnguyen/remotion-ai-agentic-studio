# Lens A — fidelity + sources

**Verdict: pass** · **Score: 9/10** · Round 1 · reviewer: script-reviewer (lens a, clean context)

Verified programmatically and by reading:
- Mandatory user line is **byte-identical** (codepoint-verified) across `brief.md` header, `script.md` s5a+s5b, and `voice.proposed.json` (joined s5a + " " + s5b == brief line, curly quotes aside).
- `voice.proposed.json`: 16 keys, order and spoken text verbatim-equal to all 16 shot-table rows (16/16 OK).
- Every `source` cell in the shot table resolves to a real research id (F1–F35 / I1–I8 / sensory #8–#9 / `user`); no claim without a research anchor; **zero statistics or invented numbers** in spoken text (the only numbers spoken are the sourced 18·22·25·30 milestone list, F1).
- Tone nuance honored: no consolation payoff ("rồi bạn sẽ thành công" absent), no shaming of the viewer, the milestone list appears only as the ruler being examined (never as a standard), no engagement-bait CTA, ends with the user's title + 2.4s pure silence.
- Brief Content section consistent with the header (voice route, tone nuance, mandated-line handling, 40–60s window all agree).

## Tickets (full list)

| id | severity | ticket | evidence |
|---|---|---|---|
| A-1 | Thap | s4b source cells label the three Tết questions **"nguyên văn"**, but "Khi nào cưới?" is a paraphrase: F5 has "Lấy chồng/ vợ chưa" and F15 has "Bao giờ lấy chồng?" — no source says "Khi nào cưới?". The dramatization is allowed (only the user's line must be verbatim), but the label misleads the content-agent claim table / any future chip. Fix: relabel both cells to "gần nguyên văn (F5 'Lấy chồng/vợ chưa' + F15 'Bao giờ lấy chồng?' → 'Khi nào cưới?' trung tính giới)". Spoken line unchanged. Acceptance: `grep` of brief + script shows no "nguyên văn" attached to the s4b trio. | brief.md:31 (claim-plan row "Ba câu hỏi… F5 + F15 nguyên văn"); script.md:28 (s4b source cell "F5 nguyên văn (S5) + F15 (S8)"); research.md:37 (F5), :47 (F15) |
| A-2 | Thap | Research sensory #9 tags "'thu nhập vừa đến tài khoản đã có nơi để đi'" as **`sourced`** from F32, but F32's recorded text does not contain that phrase (it has "mấy tỷ… mục tiêu xa vời" + "không có đủ dư địa để tiết kiệm"). The script's s8 line inherits it and is correctly labeled "Diễn giải", so no viewer-facing claim is broken — but the research tag invites a later agent to quote the phrase as verbatim. Fix (owner: research-agent, carry to Phase 3a): change sensory #9's Loại to "sourced seed + inference". Acceptance: research.md:149 no longer reads bare `sourced`. | research.md:149 (sensory #9) vs research.md:64 (F32 text); script.md:35 (s8 row, correctly labeled "Diễn giải F32 + sensory #9") |

## Checked and clean (no ticket)

- s1 hook "Tuổi ba mươi, bị coi như một bản án." ← F33 "Tuổi 30 như 'bản án'" (S7) + user theme — supported, on-screen hook legible sound-off.
- s2 "chưa nhà, chưa kết hôn, chưa có địa vị" ← F4 "ba chưa" verbatim cluster; I8 supports the "BA CHƯA" stamp styling.
- s3a milestone list ← F1 verbatim content (compression 18/25/30 faithful; 22 shown on ruler but unspoken — consistent between brief and script).
- s6a near-verbatim of F31, correctly labeled "gần nguyên văn" (30 → "ba mươi", comma only).
- s6b labeled "dạng hình ảnh, không kết luận" — no "social clock"/"xã hội" spoken; complies with the brief's "Bỏ ra" list.
- s7b "mình đi nhầm đường à?" ← F9 "không biết liệu mình đã đi đúng đường hay chưa"; s7a's "đã cưới" is covered by I5's gốc (F8 "khoe nhà, xe, vợ/chồng", F10 "bạn bè đã có gia đình").
- s9b "Dạo này, bạn sống có vui không?" ← F6, correctly labeled "nguyên ý" (source "em" → viewer "bạn" second person is the mandated adaptation).
- s8: no money figure anywhere, sao kê drawn as bar + arrows only, "minh hoạ" labels present; re-hook at 18.64s sits inside the 15–20s window.

**Summary:** faithful, source-anchored script with the mandated line verbatim and zero invented stats — pass at 9/10, carrying two Thap citation-label fixes (A-1 s4b "nguyên văn" overclaim; A-2 research sensory #9 tag) to their owners.
