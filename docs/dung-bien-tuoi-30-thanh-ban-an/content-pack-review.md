# Content pack review — dung-bien-tuoi-30-thanh-ban-an

## Producer handoff preflight — Phase 3a

Reviewer: `content-reviewer` (append the scored review and any ticket rounds below)
Status: ready for independent review after producer preflight
Inputs locked: `brief.md`, `script.md`, `research.md`, `voice.json`

### Acceptance evidence

| Check | Result | Evidence |
|---|---|---|
| Voice keys covered | PASS — 16/16 | `content-pack.md` table order matches `voice.json` order: `s1, s2, s3a, s3b, s4a, s4b, s5a, s5b, s6a, s6b, s7a, s7b, s8, s9a, s9b, s10` |
| Caption join-back | PASS — 16/16 exact | Every caption chunk joins to the corresponding `voice.json` value, including s10 case and final punctuation |
| Caption layout | PASS | Each chunk is at most 2 lines; each rendered line is ≤28 characters; baseline is `bottom: 224` (>210px safe-zone floor) |
| On-screen text | PASS | Added text is ≤6 words; script-approved headline and in-world text are explicitly marked as exceptions |
| Claims | PASS — 13/13 | Every claim id resolves to a URL in `research.md` or the internal `user` brief instruction; inference rows are labelled |
| Labels | PASS | Recreated feed UI and salary statement are labelled `minh hoạ`; no source-backed UI is implied as actual footage |
| Accent beats | PASS | Accents follow `script.md`; H1 = s5a/s5b, H2 = s6b, H3 = s9b |
| Cover / re-hook / CTA | PASS | Cover is frame 0/s1, re-hook begins s5a at ~18.6s, ending card s10 has no engagement CTA |

### Open issues for script-agent

None. No spoken line was changed or rewritten.

### Producer handoff

`content-pack.md` is ready for the clean-context content reviewer. The reviewer should append the scored fidelity, sound-off clarity, readability, value, emphasis, credibility, and user-constraint assessment here, plus any fix-round closure table.

## Round 1

Reviewer: `content-reviewer` (clean context)
Inputs checked: `brief.md`, `script.md`, `research.md`, `voice.json`, `content-pack.md`, `design-spec.md`, and the locked constraints above.

### Rubric score

| Item | Score | Evidence |
|---|---:|---|
| Fidelity | 10.0 | Independent rejoin of every caption row against `voice.json`: **16/16 exact** (`content-pack.md:16-33`, acceptance summary at `content-pack.md:83-84`). The mandatory user wording is preserved across s5a+s5b exactly as specified in `brief.md:5`, `script.md:4`, and `content-pack.md:24-25`. |
| Sound-off clarity | 9.5 | Cover is frame 0/s1 with the complete headline, circled 30, and ruler; it is explicitly designed to read without audio (`content-pack.md:35-39`, `script.md:10-18`). Re-hook starts at 18.64s in s5a and carries the full two-part mandatory line (`content-pack.md:41-45`, `script.md:29-30`). |
| Readability | 9.5 | All caption chunks are at most two lines; independent check found every rendered line ≤28 characters. The pack sets `bottom: 224`, above the 210px floor, and keeps labels/chips at the top (`content-pack.md:5-12`, `content-pack.md:81-87`; `design-spec.md:44-47`). Breaks preserve natural phrases and diacritics. |
| Value of on-screen text | 9.5 | Text adds concrete visual information: ruler/deadline, Tết questions, feed, salary arrows, and the absent question; one idea is assigned per key/beat (`content-pack.md:18-33`, `script.md:23-38`). No abstract motivational tagline or achievement checklist is added; the list is framed as scrutiny, consistent with `brief.md:10,41`. |
| Emphasis | 9.5 | Accent treatment is tied to the three declared beats: H1 s5a/s5b, H2 s6b, H3 s9b; the closing BẢN ÁN uses yellow rather than the red measurement accent (`content-pack.md:12,24-33,88`; `script.md:29-30,32,37-38`). CTA/closing card is separate from H3 climax (`content-pack.md:47-50`). |
| Credibility | 9.5 | Claims table maps all 13 claim rows to research URLs or the internal `user` brief instruction and explicitly distinguishes fact, inference, and dramatization (`content-pack.md:52-70`). Recreated feed UI and salary statement are both labelled `minh hoạ`; the pack excludes names and concrete numbers (`content-pack.md:72-79`). |
| User constraints | 10.0 | Mandatory line is verbatim; no shaming, no checklist, no concrete money/statistical claims, no psychological jargon, and no engagement CTA. The ending is a non-engagement card plus 2.4s silence (`brief.md:5,10,22,41`; `content-pack.md:41-50`; `script.md:76,85`). |

**Mean: 9.6/10 — verdict: pass.** No rubric item is below 8, and no Cao/Trung ticket is open.

### Exhaustive Round 1 ticket list

None. All requested checks passed: 16/16 joins, mandatory wording, line-length/safe-zone constraints, claim URL and fact/inference mapping, `minh hoạ` labels, cover, re-hook, three emphasis beats, and CTA/ending.

### Closure

Round 1 is complete; no fix loop is required. The pre-existing repository audit defect (missing canonical `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md` referenced by Gate A) is outside this content report and was not altered.
