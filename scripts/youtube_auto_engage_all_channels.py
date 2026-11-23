#!/usr/bin/env python3
"""Scan public videos across configured YouTube channels at 08:00 daily:
1. If a public video has no top-level comment from the channel owner yet, post an
   engaging, story-matched question + CTA comment.
2. For viewer comments without an owner reply: analyze what the viewer actually asked
   or said in the context of that specific video. Reply ONLY when the intent/context
   is clear and specific; SKIP unclear, 1-2 word, emoji-only, spam, or ambiguous comments.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

from googleapiclient.discovery import build

from youtube_multi_channel import ROOT, YT_SCOPES, credentials

YT_COMMENT_SCOPES = [*YT_SCOPES, "https://www.googleapis.com/auth/youtube.force-ssl"]

OWN_CHANNEL_IDS = {
    "UCAXz543u0godPTo44c9hH3g",  # A Xìn Chém Sử
    "UC4zHyyv2YnYGv1xbyuZzteA",  # Hẻm Chuyện Lạ
    "UChoJn1aAPcs2xWgEhaCcpQA",  # Khủng Long Tí Hon
    "UClvEUI8YW3dv9aqQknMJS0w",  # Sống Chậm Lại
    "UCPy649MXLinlhyxnc2OQHxg",  # Tech Cà Chớn
    "UCY3n3Nlqyo6uI4GU8nuX-5g",  # Olise Man
    "UCxt1zM1tzZ2vkEC5AMoVsKA",  # Thảo Nguyên Ella
    "UCRsfFasaKaKcsRjsCO5pGSA",  # Gieo Một Niệm Lành
}

CHANNEL_PERSONAS: dict[str, dict[str, str]] = {
    "HEM_CHUYEN_LA": {
        "name": "Hẻm Chuyện Lạ",
        "voice": "Kể chuyện tâm linh, dân gian Việt Nam ấm áp, bí ẩn, lịch sự.",
        "fallback_comment": (
            "Chi tiết nào trong câu chuyện đêm nay khiến bạn nổi da gà nhất? 🕯️\n"
            "Để lại bình luận bên dưới, ấn Thích để giữ ngọn đèn luôn sáng và ĐĂNG KÝ Hẻm Chuyện Lạ "
            "để không bỏ lỡ đêm gác tiếp theo lúc 19:30 mỗi ngày nhé!"
        ),
    },
    "A_XIN_KE_CHUYEN": {
        "name": "A Xìn Chém Sử",
        "voice": "Chủ quán trà A Xìn kể chuyện lịch sử / Tam Quốc hài hước, cà khịa duyên dáng, am hiểu chính sử.",
        "fallback_comment": (
            "Theo bạn chi tiết nào trong tập này là đỉnh cao mưu lược, chi tiết nào là tiểu thuyết chém gió? ⚔️🍵\n"
            "Comment ngay ý kiến của bạn bên dưới, ấn Thích và ĐĂNG KÝ kênh A Xìn Chém Sử để đón xem màn soi sử tiếp theo nhé!"
        ),
    },
    "TINY_REX": {
        "name": "Khủng Long Tí Hon",
        "voice": "Tí Hon vui vẻ, thông minh, giải thích khoa học tiến hóa ngắn gọn, thân thiện.",
        "fallback_comment": (
            "Trước khi xem đáp án cuối video, bạn đã đoán đúng họ hàng thật sự của loài này chưa? 🦖🧬\n"
            "Comment kết quả của bạn bên dưới và ĐĂNG KÝ Khủng Long Tí Hon để thử sức với câu đố tiến hóa tiếp theo nhé!"
        ),
    },
    "TECH_CA_CHON": {
        "name": "Tech Cà Chớn",
        "voice": "Dân công nghệ/code hài hước, châm biếm thông minh, thực tế.",
        "fallback_comment": (
            "Bạn đã từng dính cảnh dở khóc dở cười này khi dùng công nghệ hay code chưa? 💻🔥\n"
            "Chia sẻ ngay dưới phần bình luận và bấm ĐĂNG KÝ Tech Cà Chớn để xem thêm các pha bóc phốt công nghệ tiếp theo nhé!"
        ),
    },
    "OLISE_MAN": {
        "name": "Olise Man",
        "voice": "Thoughtful, concise English storytelling host.",
        "fallback_comment": (
            "What moment in this story surprised you the most? 👀\n"
            "Share your thoughts in the comments below and SUBSCRIBE to Olise Man for the next episode!"
        ),
    },
    "CU_LA_CHINH_MINH": {
        "name": "Sống Chậm Lại",
        "voice": "Trầm ấm, chữa lành, nhẹ nhàng, sâu sắc.",
        "fallback_comment": (
            "Câu nói hay khoảnh khắc nào trong video hôm nay chạm đến tâm trạng của bạn nhất? 🌿\n"
            "Hãy chia sẻ nhẹ nhàng dưới bình luận và bấm ĐĂNG KÝ Sống Chậm Lại để giữ một góc bình yên mỗi ngày nhé."
        ),
    },
    "THAO_NGUYEN_ELLA": {
        "name": "Thảo Nguyên Ella",
        "voice": "Nhẹ nhàng, thân thiện, tích cực.",
        "fallback_comment": (
            "Khoảnh khắc nào trong video hôm nay bạn thích nhất? ✨\n"
            "Chia sẻ dưới phần bình luận và bấm ĐĂNG KÝ kênh để đón xem video tiếp theo nhé!"
        ),
    },
}


def build_contextual_comment(channel_key: str, video_id: str, title: str, custom_map: dict[str, str]) -> str:
    if video_id in custom_map:
        return custom_map[video_id]
    persona = CHANNEL_PERSONAS.get(channel_key) or CHANNEL_PERSONAS["A_XIN_KE_CHUYEN"]
    clean_title = re.sub(r"#\S+", "", title).strip()
    if channel_key == "A_XIN_KE_CHUYEN":
        return (
            f"Xem xong \"{clean_title}\", nếu được chọn 1 người về làm sếp: Tào Tháo, Khổng Minh hay Tư Mã Ý — bạn chọn ai? 🍵⚔️\n"
            "Comment lý do bên dưới để A Xìn đọc ở tập sau, và nhớ bấm THÍCH + ĐĂNG KÝ A Xìn Chém Sử nhé!"
        )
    if channel_key == "HEM_CHUYEN_LA":
        return (
            f"Trong \"{clean_title}\", khoảnh khắc nào làm bạn lạnh sống lưng nhất? 🕯️😱\n"
            "Comment ngay bên dưới, ấn Thích để giữ ngọn đèn luôn sáng và ĐĂNG KÝ Hẻm Chuyện Lạ để đón xem tập tiếp theo lúc 19:30 mỗi tối!"
        )
    return persona["fallback_comment"]


def generate_contextual_reply(
    channel_key: str,
    video_title: str,
    video_desc: str,
    author: str,
    comment_text: str,
) -> str | None:
    """Analyze the viewer's comment in the context of the video.
    Returns a tailored reply (< 35 words) if the comment is clear and meaningful,
    or None to SKIP if the comment is too short, vague, spam, or ambiguous.
    """
    raw = (comment_text or "").strip()
    if not raw or "http://" in raw.lower() or "https://" in raw.lower():
        return None

    # Strip emojis/punctuation to count real words
    words = re.findall(r"[\wÀ-ỹ]+", raw, flags=re.UNICODE)
    if len(words) < 4:
        # 1-3 word comments like "hay", "ảo vậy", "đỉnh", "sứa nha" without clear standalone context -> skip
        return None

    persona = CHANNEL_PERSONAS.get(channel_key) or CHANNEL_PERSONAS["A_XIN_KE_CHUYEN"]

    # 1. If Gemini API key is configured, use Gemini Flash for strict context-matched reply or SKIP
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if api_key:
        prompt = (
            f"Bạn là chủ kênh YouTube '{persona['name']}' ({persona['voice']}).\n"
            f"Video: {video_title}\n"
            f"Mô tả video: {video_desc[:500]}\n"
            f"Khán giả {author} bình luận: \"{raw}\"\n\n"
            "Quy tắc bắt buộc:\n"
            "1. Nếu bình luận vô nghĩa, spam, chửi bới, quá mơ hồ, hoặc bạn không hiểu rõ người xem đang hỏi/nói gì về nội dung video: chỉ trả về đúng chữ SKIP.\n"
            "2. Nếu bình luận hỏi hoặc nhận xét cụ thể về nội dung video: viết câu trả lời trực tiếp, đúng ngữ cảnh chi tiết đó, tự nhiên như người thật, tối đa 30 từ, không rập khuôn.\n"
            "Chỉ in ra nội dung câu trả lời hoặc chữ SKIP."
        )
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
            req = urllib.request.Request(
                url,
                data=json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                doc = json.loads(resp.read().decode("utf-8"))
                ans = doc["candidates"][0]["content"]["parts"][0]["text"].strip()
                if not ans or ans.upper() == "SKIP" or len(ans) < 5:
                    return None
                return ans
        except Exception:
            pass

    # 2. Deterministic context-matching fallback (only replies when specific video keywords or clear intent match)
    low = raw.lower()
    title_words = {
        w.lower() for w in re.findall(r"[\wÀ-ỹ]{3,}", f"{video_title} {video_desc[:300]}")
        if w.lower() not in {"trong", "những", "không", "được", "chuyện", "video", "shorts", "kênh", "mình", "người"}
    }
    matched_topics = [w for w in words if w.lower() in title_words]

    # Case A: Viewer mentions loyalty / following every video
    if any(p in low for p in ["mỗi ngày", "đừng quên", "video đầu", "mới làm", "luôn ủng hộ"]):
        return f"Cảm ơn {author} đã luôn theo dõi và bình luận đồng hành cùng {persona['name']} từ những tập đầu tiên nhé!"

    # Case B: Viewer references a specific detail/number/character from the video title or description
    if matched_topics:
        topic_str = " ".join(matched_topics[:2])
        if "?" in raw or any(q in low for q in ["sao", "vậy", "hả", "không", "thật à", "là ai", "tại sao"]):
            # Do not guess answers to open factual questions without LLM verification -> skip safely
            return None
        return (
            f"Bạn {author} để ý đúng chi tiết đắt giá của tập này luôn ({topic_str})! "
            f"Cảm ơn bạn đã xem kỹ và chia sẻ cảm nhận cùng {persona['name']} nhé!"
        )

    # Anything else where we are not 100% sure what they mean -> SKIP!
    return None


def engage_channel(
    yt,
    channel_key: str,
    channel_id: str,
    custom_map: dict[str, str],
    *,
    execute: bool = False,
    max_videos: int = 25,
    max_replies: int = 10,
) -> dict:
    ch_res = yt.channels().list(part="snippet,contentDetails", id=channel_id).execute()
    items = ch_res.get("items", [])
    if not items:
        return {"channel_key": channel_key, "channel_id": channel_id, "error": "channel_not_found"}
    ch_title = items[0]["snippet"]["title"]
    uploads_id = items[0]["contentDetails"]["relatedPlaylists"]["uploads"]

    pl = yt.playlistItems().list(part="contentDetails", playlistId=uploads_id, maxResults=max_videos).execute()
    vids = [it["contentDetails"]["videoId"] for it in pl.get("items", [])]
    if not vids:
        return {"channel_key": channel_key, "channel_title": ch_title, "videos_scanned": 0, "actions": []}

    det = yt.videos().list(part="snippet,status", id=",".join(vids)).execute()
    public_videos = [
        {
            "video_id": v["id"],
            "title": v["snippet"]["title"],
            "description": v["snippet"].get("description", ""),
        }
        for v in det.get("items", [])
        if v.get("status", {}).get("privacyStatus") == "public"
    ]

    actions = []
    replies_sent = 0

    for video in public_videos:
        vid = video["video_id"]
        title = video["title"]
        desc = video["description"]
        try:
            threads = yt.commentThreads().list(part="snippet,replies", videoId=vid, maxResults=50).execute().get("items", [])
        except Exception as exc:
            actions.append({"video_id": vid, "title": title, "status": f"comments_disabled_or_error: {exc}"})
            continue

        has_owner_top = False
        unanswered_threads = []
        for th in threads:
            top_snip = th["snippet"]["topLevelComment"]["snippet"]
            author_id = top_snip.get("authorChannelId", {}).get("value")
            if author_id == channel_id:
                has_owner_top = True
            elif author_id not in OWN_CHANNEL_IDS:
                replies = th.get("replies", {}).get("comments", [])
                owner_replied = any(
                    r.get("snippet", {}).get("authorChannelId", {}).get("value") == channel_id
                    for r in replies
                )
                if not owner_replied:
                    unanswered_threads.append({
                        "thread_id": th["id"],
                        "author": top_snip.get("authorDisplayName", "bạn"),
                        "text": top_snip.get("textOriginal") or top_snip.get("textDisplay", ""),
                    })

        # 1. Post owner top-level engagement comment if missing
        if not has_owner_top:
            comment_text = build_contextual_comment(channel_key, vid, title, custom_map)
            if execute:
                created = yt.commentThreads().insert(
                    part="snippet",
                    body={
                        "snippet": {
                            "videoId": vid,
                            "topLevelComment": {"snippet": {"textOriginal": comment_text}},
                        }
                    },
                ).execute()
                actions.append({
                    "video_id": vid,
                    "title": title,
                    "action": "posted_owner_comment",
                    "comment_id": created.get("id"),
                })
            else:
                actions.append({
                    "video_id": vid,
                    "title": title,
                    "action": "dry_run_would_post_owner_comment",
                    "comment": comment_text,
                })
        else:
            actions.append({"video_id": vid, "title": title, "action": "owner_comment_exists"})

        # 2. Reply to unanswered viewer comments ONLY when context is clear
        for uth in unanswered_threads:
            if replies_sent >= max_replies:
                break
            reply_text = generate_contextual_reply(channel_key, title, desc, uth["author"], uth["text"])
            if not reply_text:
                actions.append({
                    "video_id": vid,
                    "action": "skipped_unclear_or_short_comment",
                    "thread_id": uth["thread_id"],
                    "user_comment": uth["text"],
                })
                continue
            if execute:
                rep = yt.comments().insert(
                    part="snippet",
                    body={"snippet": {"parentId": uth["thread_id"], "textOriginal": reply_text}},
                ).execute()
                replies_sent += 1
                actions.append({
                    "video_id": vid,
                    "action": "replied_to_user",
                    "thread_id": uth["thread_id"],
                    "user_comment": uth["text"],
                    "reply": reply_text,
                    "reply_id": rep.get("id"),
                })
            else:
                replies_sent += 1
                actions.append({
                    "video_id": vid,
                    "action": "dry_run_would_reply_to_user",
                    "thread_id": uth["thread_id"],
                    "user_comment": uth["text"],
                    "reply": reply_text,
                })

    return {
        "channel_key": channel_key,
        "channel_id": channel_id,
        "channel_title": ch_title,
        "public_videos_scanned": len(public_videos),
        "actions": actions,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--channels", default="ALL", help="Comma-separated channel keys or ALL")
    ap.add_argument("--comments-file", default="config/films/hem-chuyen-la-comments.json")
    ap.add_argument("--execute", action="store_true", help="Actually post comments/replies (default: dry-run)")
    ap.add_argument("--receipt", default="youtube-auto-engage-receipt.json")
    args = ap.parse_args()

    cfg_doc = json.loads((ROOT / "config" / "youtube-channel-targets.json").read_text(encoding="utf-8"))
    channels_cfg = cfg_doc.get("channels", {})
    selected = (
        list(channels_cfg.keys())
        if args.channels.upper() == "ALL"
        else [c.strip() for c in args.channels.split(",") if c.strip()]
    )

    custom_map = {}
    cpath = ROOT / args.comments_file
    if cpath.exists():
        custom_map = json.loads(cpath.read_text(encoding="utf-8"))

    report = []
    for key in selected:
        token_env = f"YOUTUBE_REFRESH_TOKEN_{key}"
        refresh = os.environ.get(token_env, "").strip()
        if not refresh and len(selected) == 1:
            refresh = os.environ.get("YOUTUBE_REFRESH_TOKEN", "").strip()
        if not refresh:
            report.append({"channel_key": key, "status": "skipped_no_token_env"})
            continue

        try:
            yt = build("youtube", "v3", credentials=credentials(YT_COMMENT_SCOPES, refresh), cache_discovery=False)
            owned = yt.channels().list(part="id,snippet", mine=True).execute().get("items", [])
            if not owned:
                report.append({"channel_key": key, "status": "error_no_channel_for_token"})
                continue
            ch_id = owned[0]["id"]
            pinned = channels_cfg.get(key, {}).get("channel_id")
            if pinned and pinned != ch_id:
                report.append({"channel_key": key, "status": f"blocked_channel_id_mismatch: expected {pinned}, got {ch_id}"})
                continue
            res = engage_channel(yt, key, ch_id, custom_map, execute=args.execute)
            report.append(res)
        except Exception as exc:
            report.append({"channel_key": key, "status": f"error: {type(exc).__name__}: {exc}"})

    Path(args.receipt).write_text(json.dumps({"execute": args.execute, "channels": report}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"execute": args.execute, "channels": report}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
