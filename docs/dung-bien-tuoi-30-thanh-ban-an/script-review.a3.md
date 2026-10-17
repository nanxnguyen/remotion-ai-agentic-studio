# Gate A — round 3 (final) · lens (a) fidelity + sources/claims · 2026-10-17

Scope: re-verify round-2 tickets A2-1..A2-4 + C2-1..C2-3 against CURRENT `brief.md`, `script.md`, `research.md`, `voice.proposed.json`, then full fidelity sweep. All evidence below produced programmatically (Node reads of the four files), not copied from round-2 reports.

## Programmatic checks (re-run, PASS)

| check | result |
|---|---|
| Mandatory line byte-identical | PASS — brief.md:5 full line == `voice.s5a + " " + voice.s5b`; script.md:4 `s5a "Bạn chưa có nhà, chưa kết hôn."` + `s5b "Nhưng ai đã quy định hôm nay bạn phải có đủ?"` byte-exact; JSON s5a/s5b == shot-table spoken cells |
| JSON ↔ shot-table verbatim | PASS — 16/16, 0 mismatch (keys s1…s10 in order) |
| Syllables | PASS — 180 total; every row's `n (cum)` matches token count of its JSON line |
| Hold/gap + totals | PASS — 17 items sum **7.70**; 180/4.1+7.70=**51.60**, /4.3=**49.56**, /3.8=**55.07**; brief.md:23 == script.md:62 |
| mốc chain recompute @4.1 + holds | PASS — all 16 key ranges reproduce the declared starts/ends (s4b 16.14+2.20+0.30→18.64; s5a 18.64+1.71+0.45→20.80; … s10 end 51.61 ≈ 51.60) |
| Citation ids resolve | PASS — F ids used in brief+script {1,3,4,5,6,9,14,15,31,32,33,35} ⊂ research F1–F37; I ids {1,5,8} ⊂ I1–I8; S ids ⊂ S1–S8; sensory #8/#9 rows exist; **F37 row exists** (research.md:69) and is reachable from brief/script via sensory #9 (research.md:150 gốc `F32, F37 (S1)`); all 16 source cells carry ≥1 resolvable token |
| Wrong quotes | PASS — every source-attributed quote in brief/script resolves verbatim in research, or is explicitly labelled `gần nguyên văn` / `nguyên ý` / `diễn giải` / `dramatization`; old A2-4 string `Dạo này, sống có vui không?` → 0 hits |
| Stale "trước vế 1" label | PASS — `gap 0.45s im trước vế 1` → 0 hits; `0.45…trước vế 1` adjacency → 0 hits; the two surviving "trước vế 1" strings (script.md:29,30) are correct clarifications and match the hold list (`đuôi s4b 0.30` exists) |
| Invented stats | PASS — 0 digits in all 16 spoken lines; only `%` hits are layout y-bands/opacity (26–100%, 85%) and the prohibition `100 triệu` (script.md:85 "cấm số cụ thể") |
| Caption chunks (C3 closure) | PASS — s3a 4/4, s6a 2/2, s8 3/3 chunks are exact substrings of the JSON spoken line |

## Round-2 ticket closure

| id | verdict | evidence (current files) |
|---|---|---|
| A2-1 | **closed ✓** | research.md:69 F37 row added, verbatim S1 text "thu nhập vừa đến tài khoản đã có nơi để đi"; research.md:150 sensory #9 gốc re-pointed to `F32, F37 (S1)`; both quoted fragments in #9 now resolve ("mấy tỷ" → F32, research.md:64) |
| A2-2 | **closed ✓** | script.md:28 s4b source cell mirrors brief:31 — `A2-2: "Khi nào cưới?" … đổi từ F5 "Lấy chồng/ vợ chưa" + F15 "Bao giờ lấy chồng?" … không có nguồn nào nói nguyên "Khi nào cưới?"`; research quotes in cell verified byte-exact (F5, F15) |
| A2-3 | **closed ✓** | script.md:24 s2 source = F4 (S5) with `A2-3: mọi sai khác so với trích dẫn đã đánh dấu đầy đủ`; "chưa nhà"=rút gọn F4 "chưa mua nhà"; "chưa có địa vị"=B-2 dramatization; explicit `F5 bộ câu hỏi **không** dùng ở row này` |
| A2-4 | **closed ✓** | brief.md:17 quote `'Dạo này, bạn sống có vui không?'` byte-matches voice s9b / script s9b; stale variant absent everywhere |
| C2-1 | **closed ✓** | script.md:29 `im lặng **0.45s giữa vế 1 và vế 2** (…phần im trước vế 1 là đuôi s4b 0.30s)`; script.md:30 `gap 0.45s im giữa vế 1 và vế 2 (chính là phần lặng trước câu này, không phải trước vế 1)`; grep confirms no 0.45s attributed to "trước vế 1"; timeline arithmetic confirms 0.30 s precedes s5a and 0.45 s sits s5a→s5b |
| C2-2 | **closed ✓** | script.md:25 image col now `ba vạch tuổi được nói — 18 · 25 · 30 — "lách" hiện trùng ba cụm từ được nói; vạch 22 … hiện cùng lượt với vạch 18 … (4 vạch trên thước, 3 vạch khớp lời)`; no longer claims 4 spoken clusters; 4 caption chunks are typeset independently (verified substrings) |
| C2-3 | **closed ✓** | script.md:27 s4a mốc cell carries `C2-3: "Tết đến." … chủ ý ĐỌC LIỀN một hơi, KHÔNG cần pause và KHÔNG tách key … nếu measure cho thấy clone tự ngắt thì giữ nguyên, timeline không bù hold` |

## New tickets

| id | Sev | ticket | evidence |
|---|---|---|---|
| A3-1 | Thap | Ripple of A2-1: the **optional source chip** for s8 still names only F32, but the clause "đã có nơi đi mất" now maps to the newly added F37 → change chip/source-chip note for s8 from `F32` to `F32/F37` in brief:39 (`F31 / F32`) and script:86 (`s8 (F32)`). Non-blocking: chip is optional, never read aloud; claim plan (brief:36, script:35) already resolves correctly through sensory #9 | brief.md:39, script.md:86 vs research.md:69,150 |

## Observations (no ticket)
- Brief story-spine (brief.md:18) tags the hook `(F33)` although F33's verbatim is "Tuổi 30 như 'bản án'"; the authoritative claim plan (brief.md:28) quotes F33 exactly **and** anchors the hook to `user`'s own topic, so provenance is covered.
- s8 spoken line derives from F32 (clause 1) + F37 (clause 2) and is already marked `Diễn giải … + sensory #9` — chain resolves; A3-1 only tightens the on-screen chip.

## Verdict

**PASS** · **9.5 / 10**
7/7 round-2 tickets closed with fresh programmatic evidence; mandatory line byte-identical across brief/script/voice; 16/16 JSON↔table; citations all resolve incl. new F37; no stale gap label; no wrong quotes; zero invented stats. One Thap provenance nit (A3-1, optional chip) open — no Cao/Trung.
