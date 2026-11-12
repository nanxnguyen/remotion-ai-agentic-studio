# Opening hook and mini-challenge — diverse 1–4 second intro (mandatory)

Owner rule, 2026-10-28. Applies to **EVERY new psychology Short** and revision of the opening. A first-frame intro is a **viewer hook** (challenge, dilemma, curious contradiction, tiny test) and **not** a fixed slogan or a request for likes/subscriptions. The optional like + subscribe CTA remains near the end, after delivering value.

## Non-negotiable production rules

1. **First meaningful hook 1–4 seconds**, measured in the **actual rendered audio/video**, not by estimated word count or a static storyboard. Voice begins immediately or after an intentional subsecond visual beat. When a longer sentence is needed to explain the topic, the **hook itself must end by 4s**, then the body continues. User requests for a different duration override this default.
2. Hook must make viewers want to test, notice, decide or discover **something connected to the episode's actual answer**. Give them a lightweight, safe mental challenge, an unexpected contrast, or a specific dilemma, not a guilt trip, fake research result or empty mystery.
3. **Never use the same hook sentence in two different videos.** For every episode draft at least **3 genuinely distinct hooks** with different idea, wording, rhythm and visual action, not three grammatical rewrites of one formula. Choose the strongest fit to the specific psychology claim, audience, format and authentic narrator. Do not force every hook to start with “Bạn có dám…”, “Thử xem…”, “Nếu bạn…” or “Bạn có biết…”. A repeating brand/series label, if needed, is visual and never consumes opening voice time.
4. **Check the spoken hook and visual hook against at least the 10 most recent accessible episodes**, including their openings, not merely their titles. Reject duplicates and material near-duplicates in wording, opening visual, underlying viewer challenge and narrative premise. Rotate hook *families*: (A) 3-second self-test, (B) concrete social dilemma, (C) counterintuitive contrast, (D) myth versus reality, (E) visual choice/prediction, (F) micro-story starting mid-action, (G) “spot the detail” observation with a genuinely shown detail. Do not systematically rotate rigidly or require each family to appear; choose for relevance. When prior hook data is unavailable, record comparison as `INCOMPLETE`, never claim verified uniqueness.
5. A challenge must be **answerable from the video** and not manipulative: no pseudo-diagnosis, absolute “đọc vị” claims, fear pressure, time-limited click bait, shaming or “nếu bạn không like bạn là…” coercion. Avoid forcing comments, likes, shares, follows or subscription in the opening. Real psychological claims must be qualified and source-checked in the main script.
6. **Visual hook should perform an action from frame 0–1s** (a stick figure about to say YES while overloaded, someone hesitating at an invitation, two opposing gestures, a real choice). Match the challenge to the visual and move past the hook without logo-only padding, mechanical shock zooms or a black card.
7. **Real Vbee verification:** Lock chosen hook in `episode-brief.json`; cast appropriate genuine Vbee voice; synthesize final speech; measure hook start/end from that audio with listening/timestamps; retime or rewrite if it exceeds 4s or is too short to convey a clear idea. Align on-screen hook, subtitles and scene action to same source MP3; do not claim word accuracy without human verification. Target 1–4s for the hook; body/answer may follow immediately and the final MP4 duration remains driven by narration.
8. **Release gate:** Block script approval if opening hooks are recycled, unoriginal, clickbait-only, misleading, or unrelated to payoff. Mark REVIEW if real-audio hook timing or visual/audio sync is unverified. Save hook ledger next to script/manifest on Drive/GitHub for future anti-duplicate checks.

## Example types (for ideation ONLY — never automatically reuse these sentences)

- *Specific choice:* “Sếp nhờ thêm việc. Bạn sẽ nói gì?” → show overloaded stick figure choosing reply.
- *Mini-test:* “Bạn xin lỗi vì lỗi của người khác?” → show apology vs no wrongdoing.
- *Myth check:* “Im lặng có luôn nghĩa là đồng ý?” → show two very different conversational contexts.
- *Visual contradiction:* “Người giúp nhiều nhất lại đang kiệt sức?” → show figure holding many tasks.
- *Prediction:* “Đoán xem ai sẽ dám từ chối trước?” → show two contrasting reactions.

These are pattern illustrations, **not** fixed starter lines, scientific findings or text that may be copied into several videos. Write a new topic-specific hook every time.

## Episode-level hook ledger

For each new episode, store with the episode's other artifacts:

```json
{
  "video_id": "episode-id",
  "hook_text": "exact canonical Vbee opening narration",
  "hook_family": "specific original category",
  "hook_visual_action": "specific action seen in the first second",
  "viewer_challenge": "what viewers can actually consider/test",
  "target_duration_seconds": 2.5,
  "measured_duration_seconds": null,
  "audio_asset_sha256": "fill after recording",
  "recent_comparison_ids": [],
  "originality_review": "PENDING | PASS | REWRITE | INCOMPLETE",
  "sync_review": "PENDING | PASS | REVIEW",
  "opening_qa_note": "what is answered later in this video"
}
```

Use `scripts/check_hook.py` for mechanical exact/near-verbatim comparisons where history is accessible (the threshold is a **local heuristic, not a YouTube duplicate score**). **Human editorial review remains mandatory** for different words describing the same tired opening. Record the verified opening after each exported video so the next episode can compare against it.
