# Lens A round 2

Lens (a) **fidelity + sources/claims** · clean context · 2026-10-17 · Gate A, fix round 1.
Inputs: `brief.md`, `script.md`, `voice.proposed.json`, `research.md`, `script-review.md` (round-1 merge + closure table), `script-review.a.md` (round-1 lens A).
Method: (1) re-ran every round-1 programmatic check against the **current** files — mandatory-line byte equality, JSON↔shot-table verbatim, syllable/hold arithmetic, caption-chunk substrings + char counts, source-code resolution, tone/CTA/digit scan; (2) re-verified the load-bearing quotes against their **live sources** with curl on 2026-10-17 (S1, S4, S5, S6, S7, S8 — 0 failures).

## 1. Closure verification (round-1 tickets)

| ticket id | verified fixed? | evidence (re-run, not copied) |
|---|---|---|
| C1 | **fixed** | Hold list `script.md:61` = 17 items, programmatic sum **7.70** (0.15+0.25+0.25+0.30+0.25+0.30+0.30+0.45+0.35+0.40+0.30+0.30+0.30+0.30+0.70+0.40+2.40). Totals recompute: 180/4.1=43.90+7.70=**51.60** · 180/4.3=41.86+7.70=**49.56** · 180/3.8=47.37+7.70=**55.07** = `script.md:62` and `brief.md:23`. Full mốc chain s1 0.00 → s10 end 51.61 re-derived from the table; per-slot deltas (0.40/0.25/0.30/0.25/0.30/0.30/0.45/0.35/0.40/0.30/0.30/0.30/0.30/0.70/0.40/2.40) = 7.70 — the 17 holds are actually consumed (0.01 end drift = rounding, not a ticket). grep: no stale `7.55` / `51.4` anywhere. |
| C2 | **fixed** | `script.md:24` s2 delivery = "Liền một hơi, đều, **không** hứa nghỉ giữa các dòng"; image col "ba dòng chỉ 'ngắt' trên hình, không trong audio"; `script.md:81` extends the rule to s3a/s4b/s7b. grep of all 16 delivery cells: no comma/pause promise left in audio. JSON s2 unchanged (13 syl). |
| C3 | **fixed** | 9 chunks (s3a 4 / s6a 2 / s8 3): every chunk `includes()` substring of its `voice.proposed.json` line (9/9); stated char counts == measured lengths (19/18/18/20 · 35/35 · 31/22/17, 9/9 exact); stated 2-line breaks 22+12, 25+9, 20+10 all ≤ 2 lines × ~28 ch. Unsplit chunks max 22 ch. |
| C4 | **fixed** | `script.md:35` s8 voice cell carries verify-note + full fallback: "tách s8a/s8b gap 0.3s, bù 0.3s từ đuôi s7b; mọi mốc từ s9a dịch theo" — the borrowed 0.30 s exists in the hold list (đuôi s7b), so the plan is budget-neutral. |
| C5 | **fixed** | `script.md:38` s10 CARD "ĐỪNG BIẾN TUỔI **BA MƯƠI** THÀNH BẢN ÁN" == cover form s1 ("Tuổi ba mươi,"); grep both bookends = "ba mươi"; `brief.md:38` documents that the user theme string keeps "30" in the header only. Spoken lines unchanged. |
| A-1 | **fixed** | Acceptance met: grep of brief+script shows **no "nguyên văn" attached to the s4b trio** — `brief.md:31` "**A-1: F5 + F15 gần nguyên văn**", `script.md:28` "**A-1: F5 gần nguyên văn**", `brief.md:20` tone line "(gần nguyên văn research)", `script.md:74` "gần nguyên văn". All 8 "nguyên văn" hits in brief/script are either qualified "gần" or refer to the `user` verbatim line (correct usage). Live re-verify: S5 contains "chưa mua nhà, chưa kết hôn, chưa địa vị", "Mua nhà chưa, chừng nào mua", "Lấy chồng/ vợ chưa"; S8 contains "Bao giờ lấy chồng?", "Lương bao nhiêu?" — research quotes are accurate. Residual note → A2-2 (Thap). |
| A-2 | **fixed** | Acceptance met: `research.md:149` sensory #9 now reads "sourced seed + `inference`" (no bare `sourced`). Stronger: the phrase is **real** — live S1 (curl, 2026-10-17) contains verbatim "…đơn giản là thu nhập vừa đến tài khoản đã có nơi để đi", and S1 also confirms F29/F30/F31/F32 verbatim. Residual pointer gap → A2-1 (Thap). |
| B-1 | **fixed** | `script.md:29` s5a keeps the mandated verbatim byte-for-byte; differentiation from s2 now lives in staging/mix/delivery: freeze toàn khung 0.4s + "tiếng ồn Tết cắt phắt" + tail reverb + "câu hỏi vang lại trong đầu (hồi âm do mix)… không phải tông đọc danh sách như s2". No wording touched (JSON unchanged). Side-effect note → §3 C2-1 (gap label), which does not reopen B-1 itself. |
| B-2 | **fixed** (way B) | Marked as dramatization in **both** places: `brief.md:29` "**B-2 dramatization:** research viết 'chưa địa vị' — script nói 'chưa **có** địa vị' (+1 âm tiết cho trôi miệng)" and `script.md:24` source cell. Syllable arithmetic correct (3 → 4 syl = +1). Spoken line unchanged in JSON. |

Supporting global checks (all re-run, all pass): mandatory line **byte-identical** — brief header == `s5a + " " + s5b` (string `===`, true) == `script.md:4` quotations; 16/16 JSON keys byte-equal the shot-table spoken column; 180 syl + per-key/cumulative match; 16/16 source cells non-empty and **every** F/I/S code resolves in `research.md` (brief claim-plan: 0 unresolved); tone scan of the 16 spoken lines = 0 hits for consolation/CTA/list vocabulary, 0 digits; no invented stats anywhere (the only quantities on screen are the sourced 18·22·25·30 milestones, F1 — verified in live S4: "18 tuổi học xong cấp 3, 22 tuổi tốt nghiệp, đi làm… 25 tuổi lập gia đình, 30 tuổi phải thăng cấp quản lý").

## 2. New tickets (lens A, round 2)

| id | Sev | ticket | evidence |
|---|---|---|---|
| A2-1 | Thap | research §4 sensory #9 quotes "thu nhập vừa đến tài khoản đã có nơi để đi" in quote marks and cites **F32 (S1)**, but F32's recorded text does not contain that sentence (F32 = "mấy tỷ… mục tiêu xa vời" + "không có đủ dư địa để tiết kiệm"). The sentence is genuine S1 text (verified live 2026-10-17), so no invented quote — but the pointer still misroutes a later agent to the wrong fact id. Fix (research-agent): add a fact row for the sentence (e.g. F37, S1 verbatim) and re-point #9's gốc to it, or reword gốc as "S1 verbatim, chưa lập F-code (F32 liên quan)" | research.md:149 vs research.md:64; live S1 "…thu nhập vừa đến tài khoản đã có nơi để đi" |
| A2-2 | Thap | A-1's relabel landed fully in brief but only partially in script: `script.md:28` says "F5 gần nguyên văn" and lists the source strings "Lấy chồng/ vợ chưa" / "Bao giờ lấy chồng?" without noting that the spoken "**Khi nào cưới?**" is a neutral-gender rewording — that note exists only in `brief.md:31`. A content-agent reading script.md alone can treat all three questions as near-verbatim. Fix: append the one clause "(→ 'Khi nào cưới?' trung tính giới, không có trong nguồn)" to the s4b source cell (A-1's own suggested wording); spoken line unchanged | script.md:28 vs brief.md:31; research.md:37/47 (no source says "Khi nào cưới?") |
| A2-3 | Thap | s2 source cell cites "**F5 bộ câu hỏi (S5)**", which supports nothing in the row — F5 is the question list used at s4a/s4b; s2's content is the "ba chưa" cluster (F4) + stamp styling (I8). Remove F5 or justify it; while there, add to the dramatization note that "chưa nhà" is the short form of F4's "chưa mua nhà" (the note currently covers only the "có" insertion), so the cell enumerates every deviation from the cited quote | script.md:24 vs research.md:36 (F4) / :37 (F5) |
| A2-4 | Thap | `brief.md:17` renders the climax question **in quotes** as "Dạo này, sống có vui không?" while `brief.md:18`, `script.md:37` (s9b) and the JSON use "Dạo này, bạn sống có vui không?" (F6 source = "…em dạo này sống có vui không"). Two different strings are presented as the same question in one document — align L17 to the script wording, or mark it as the F6 source fragment (no quotes) | brief.md:17 vs brief.md:18 / script.md:37 / voice.proposed.json s9b |

## 3. Reproduced by this lens, but already ticketed by lens C (not re-ticketed)

| id | Sev | what this lens reproduced |
|---|---|---|
| C2-1 (lens C) | Trung | Both s5a and s5b delivery cells say "gap 0.45s im… **trước vế 1**", but the only 0.45 gap is **s5a→s5b** (`script.md:61`, `:80`) — proven by the mốc arithmetic (s5a 18.64–20.80 = 1.71+0.45); trước vế 1 the timeline only budgets đuôi s4b **0.30**. Reproduced independently before reading lens C's report; it is a side-effect of the B-1/round-1 wording (B-1 itself stays closed). |
| C2-2 (lens C) | Thap | s3a image column "bốn vạch 'lách' hiện lần lượt **trùng bốn cụm từ được nói**" — only **three** clusters are spoken (mười tám / hai mươi lăm / ba mươi); F1 itself was already cited for "22 hiện trên vạch nhưng bỏ khỏi lời nói". |

## 4. Verdict

**Lens A: PASS · 9.0 / 10** — closure 9/9 verified (2/2 of this lens's own round-1 tickets, A-1/A-2, fully closed incl. live-source re-verification), 0 Cao/Trung raised by lens A (4 Thap: A2-1…A2-4, all citation/label residuals, none touching spoken text, tone, or numbers).

**Gate A overall: REVISE** — C2-1 (Trung) remains open (reproduced here §3); do not clear the gate on this report. Merged score = lowest lens = 8.5 (lens C).
