# Packaging — title, thumbnail, description, Shorts funnel, policy

The title and thumbnail are two halves of one hook: the thumbnail shows the image, the title adds the information the image cannot. Never repeat the same words in both.

## Titles
Vietnamese (short, concrete, CAPS on the threat; ≤ 60 characters):
- `[VẬT/NƠI] + [ĐIỀU SAI]`: "CHIẾC XE BUÝT SỐ 0 KHÔNG CÓ TÀI XẾ", "PHÒNG 404 KHÔNG CÓ TRÊN SƠ ĐỒ"
- Rule: "ĐỪNG TRẢ LỜI NẾU CÓ AI GỌI TÊN BẠN LÚC 2 GIỜ SÁNG"
- Folk: "CON LÂN BIẾT CHỚP MẮT | Chuyện Nội Kể", "GIẾNG CỔ ĐẦU LÀNG KHÔNG AI DÁM MÚC NƯỚC"
- Compilation: "3 CHUYỆN KINH DỊ CÓ THẬT Ở BỆNH VIỆN | Số Đặc Biệt"
- Series suffix: "| Hẻm Chuyện Lạ #12"
English: "3 True Late-Night Bus Horror Stories Animated", "Never Answer the Door at 2:17 AM", "My Grandma's Altar Photo Smiled at Me".
Write 3 options; score each on curiosity gap, specificity, and honesty (the story must pay it off). Recommend one.

## Thumbnails (tools/make_thumb.py, scenes/shots/thumb.js)
- One subject, big: the entity (partially revealed) or the terrified human face + the threat behind them. Readable at phone size.
- One glowing anomaly: red eyes, the clock 02:17, a lit doorway, a hand.
- 2–4 words max via `H.thumbText` (last word red), never the full title. Optional `thumbArrow`/`thumbCircle` pointing into the dark.
- High contrast: dark scene, bright subject, one accent colour (red). No gore, no blood, no fake YouTube UI.
- Make 2–3 variants (`thumb`, `thumb2`, `thumb3`) — e.g. entity close-up vs. human reaction vs. object — and use YouTube's Test & Compare when available.

## Description template
```
{2-line story tease ending with a question}

⏱️ Chương
00:00 {cold open label}
{mm:ss} {chapter}…

🎧 Đeo tai nghe để trải nghiệm trọn vẹn.
Câu chuyện là hư cấu, lấy cảm hứng từ truyền thuyết dân gian. / This story is fiction inspired by folklore.
#truyenma #kinhdi #hemchuyenla {3–5 story tags}
```
Pinned comment: the CTA question from the story ("Nếu là bạn, bạn có mở cửa không?").
Tags: story nouns + format ("truyện ma có thật", "truyện ma hoạt hình", "animated horror story").

## Shorts funnel
From each long video cut 2–4 Shorts: the cold open (hook + first scare), the rule card, the twist tease (without the answer). End each with "Phần đầy đủ trên kênh" and link the long video as the related video.

## Policy and monetisation safety
- Advertiser-friendly: no gore, no realistic violence, no graphic injuries in the first 30 s or in the thumbnail; strong language minimal.
- Original stories + code-drawn animation + own narration = no reused-content risk; don't upload re-voiced stories copied from other creators.
- Altered/synthetic disclosure is for realistic depictions of real people/events; stylised 2D fiction normally doesn't need it — but if a TTS voice imitates a real person or a story claims to be a real event, disclose.
- Label fiction as fiction in the description even when narrated as "chuyện có thật".
- Not "made for kids" (horror), even when animated.

## Google Drive Delivery (Default Archive Policy)
- Fixed parent folder: `Videos-shorts` (`$VIDEOS_SHORTS_FOLDER_ID`).
- Always run `gdrive readonly ls "$VIDEOS_SHORTS_FOLDER_ID" --max 0 --json` first to compute `max(N) + 1`, then create `<N>. <Video title> - <YYYY-MM-DD>` (Vietnam local date).
- Upload 3 verified files into that folder:
  1. **`<slug>-final.mp4`** (or actual produced video title `.mp4` — **NEVER** rename to generic `video-final.mp4`)
  2. `thumbnail-youtube.png` (16:9 for long-form, 9:16 for Shorts)
  3. `youtube-title-description.txt` (UTF-8)
- Read back Drive metadata to verify non-zero bytes and MIME types, and output directly clickable `https://drive.google.com/...` links for the folder and all 3 files immediately.
