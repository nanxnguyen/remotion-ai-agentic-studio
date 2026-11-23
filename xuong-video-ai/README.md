# Xưởng Video AI — v2.0-α (giai đoạn 1–2 của kế hoạch v2.0)

Văn phòng 3D nhiều agent kiêm CMS quy trình cho các kênh YouTube.
Ở bản này, kênh **Hẻm chuyện lạ** gọi Claude thật cho 3 bước đầu:

| Bước | Agent | Model | Ghi chú |
|---|---|---|---|
| Nghiên cứu | Minh | Sonnet 5.5 | có tra web (tối đa 3 lượt) |
| Kịch bản | Chị Lan | Opus 5.5 | HOOK · thân · TWIST · CTA, nhận phản hồi khi bị trả về |
| Thẩm định | Bác Tư | Sonnet 5.5 | chấm JSON 0–100, dưới 80 trả về Kịch bản |

Các bước sau (lồng tiếng, storyboard, dựng phim…) vẫn mô phỏng và được ghi rõ `(mock)`.
Tầng Olise và Kênh cảm động chạy mô phỏng ngay trong trình duyệt.

## Thư viện: xem video đã sản xuất xong

Mục **Thư viện** ở thanh bên trái liệt kê mọi video đã xong của cả 3 kênh (lọc theo kênh, tìm theo tên).
Bấm một video để mở trang xem. Trình phát chọn nguồn theo thứ tự:

1. **Link YouTube** bạn gắn cho video đó (dán link watch, youtu.be hoặc shorts; lưu trên trình duyệt).
2. **File video trên máy**: đặt `final.mp4` (hoặc .webm/.mov) vào `server/data/jobs/<mã video>/`, ví dụ
   `server/data/jobs/HCL-004/final.mp4`. Máy chủ phát có tua được (HTTP Range). Chỉ có khi chạy bằng máy chủ.
3. Nếu chưa có hai thứ trên: **bản xem trước dựng từ kịch bản** (chữ chạy theo cảnh, có ghi rõ chưa phải video thật).

Bên cạnh là thời gian sản xuất, chi phí, token, số lần bị trả về, điểm từng cổng và kịch bản đầy đủ.

## v2.0-α: src mới + nhân vật robot có xương

- **Nhân vật**: robot glTF có xương (RobotExpressive của Quaternius, CC0, xem `web/src/assets/models/LICENSE.md`).
  Mỗi robot gộp còn 1 lượt vẽ + 1 lượt viền; toon shading 4 nấc, viền đen, màu áo theo agent.
  Động tác: đứng thở, đi/chạy (khớp tốc độ mô phỏng), ngồi xuống/đứng dậy lên ghế thật, gõ phím, chống cằm nghĩ,
  giơ tay chờ duyệt, ôm hồ sơ, cầm cốc cà phê. Cảm xúc theo sự kiện thật: qua cổng thì giơ like, không đạt thì lắc
  đầu mặt cau có, người bị trả về buồn, lỗi thì ngạc nhiên, video lên YouTube thì đạo diễn nhảy mừng. Miệng mấp máy khi lồng tiếng.
- **src**: `three/Scene.tsx` (640 dòng) tách thành `render/{building,rooms,characters,fx,camera}`; thêm lớp
  `world/` tính tư thế mọi agent một lần mỗi khung hình; `StaticBatch` gộp đồ nội thất tĩnh theo vật liệu.
- **Đo được** (máy ảo, Chrome phần mềm, tầng Hẻm chuyện lạ): lượt vẽ mỗi khung hình 1.370 → khoảng 580.
  Thời gian logic JS mỗi khung tăng từ 2,4 lên khoảng 3,5 ms do hoạt ảnh xương của 12 robot.
- **Phòng Đạo diễn** riêng: tường 3 màn hình (dây chuyền, số video đã đăng, video vừa lên YouTube hoặc tiền Claude hôm nay), bàn điều phối, máy quay, ghế đạo diễn. Bấm vào phòng để camera nhìn thẳng vào tường màn hình.
- **Vách ngăn hiện đại**: kính cao trần khung nhôm đen, dải kính mờ màu agent, tường nan gỗ có dải LED, thảm theo màu agent.
- **Phòng thử nhân vật**: mở `http://localhost:8787/?lab#xuong` (thêm `=near`, `=seat`, `=side` để đổi góc).
  `?robots=0` dùng lại nhân vật khối hình cũ. `?bench` lộ renderer để đo.

## Xưởng 3D v1.2

- Ánh sáng studio tự dựng (không tải HDR), tone mapping AgX, đổ bóng mềm theo góc khuất (N8AO), bloom, khử răng cưa SMAA.
- Phòng có vách kính mờ, tấm tiêu âm theo màu agent, đèn thả trần sáng lên khi agent làm việc, bàn và ghế bo góc, cây xanh, bụi sáng lơ lửng.
- Vòng tiến độ hologram dưới ghế, vệt chấm sáng chỉ đường khi agent mang hồ sơ (đỏ khi bị trả về), bong bóng suy nghĩ, pháo giấy khi qua cổng hoặc video lên YouTube.
- **▶ Điện ảnh**: camera tự lia tới nơi vừa có chuyện, ưu tiên việc cần bạn và lỗi, có viền phim và phụ đề kể lại.
- Mở tầng có cảnh bay vào; rê chuột vào phòng sẽ sáng viền; bấm vào con mèo để vuốt ve.
- Máy yếu tự hạ chất lượng: tắt AO trước, rồi tắt hậu kỳ.

## Chạy trên Mac

Cần Node.js 20 trở lên (`brew install node`).

```bash
unzip xuong-video-ai-v1.1.zip && cd xuong-video-ai
./start.sh            # lần đầu: tạo server/.env rồi dừng
# mở server/.env, dán ANTHROPIC_API_KEY (lấy ở console.anthropic.com)
./start.sh            # chạy thật
```

Mở **http://localhost:8787** — thanh trên cùng hiện "Claude thật", tiền đã dùng hôm nay và nút **Dừng khẩn cấp**.
Bấm **+ Video** hoặc gõ tiêu đề ở trang Video để bắt đầu. Kênh thật không tự sinh video, chỉ chạy khi bạn tạo.

Muốn thử luồng mà không tốn tiền: `./start.sh --fake`.

## Ngân sách mặc định (mức trung bình)

- **$3/ngày** cho cả kênh, **$0.80/video**, tối đa **2 lượt gọi cùng lúc**.
- Ước tính mỗi video: nghiên cứu ~$0.08 (gồm tra web $0.01/lượt), kịch bản ~$0.07, thẩm định ~$0.035.
  Một video qua cổng ngay ≈ **$0.19**; bị trả về 1–2 lần ≈ $0.30–0.40.
  Tức khoảng **8–15 video/ngày** trong hạn $3.
- Trước mỗi lượt gọi, máy chủ ước tính chi phí; nếu vượt hạn mức ngày hoặc hạn mức video thì bước đó chờ trong khay và giao diện ghi lý do.
- Ngày tính theo giờ Việt Nam. Sửa hạn mức trong `server/.env`.

## Dữ liệu nằm ở đâu

```
server/data/events.jsonl        nhật ký event — khởi động lại sẽ dựng lại xưởng từ đây
server/data/ledger.jsonl        sổ chi tiêu từng lượt gọi (token, số lượt tra web, USD)
server/data/jobs/<mã video>/    bản nghiên cứu, kịch bản, bản chấm điểm (.md, mỗi lần chạy 1 file)
```

Muốn làm lại từ đầu: tắt máy chủ, xóa `server/data/events.jsonl` (giữ `ledger.jsonl` để không mất số tiền đã tiêu trong ngày).
Nếu tắt máy chủ khi một bước đang gọi Claude, lúc mở lại bước đó báo lỗi để bạn bấm **Retry**.

## Thao tác hữu ích

- **Chạy lại từ đây** (trang Video): sửa prompt rồi chạy lại một bước và mọi bước sau. Với bước thật, prompt mới được gửi cho Claude.
- **Workflow**: sửa prompt, ngưỡng cổng, model của agent rồi Xuất bản — máy chủ dùng bản mới cho lượt sau.
- **Dừng khẩn cấp**: hủy các lượt đang gọi và không gọi thêm cho tới khi bấm "Cho gọi lại".

## Lên VPS sau này

1. Copy thư mục lên VPS (Node ≥ 20), chạy `./start.sh` như trên.
2. Trong `server/.env`: `HOST=0.0.0.0` và đặt `XV_TOKEN` là một chuỗi dài ngẫu nhiên (`openssl rand -hex 24`).
3. Mở bằng `https://ten-mien/?token=<XV_TOKEN>`. Nên đặt sau Caddy/Nginx có HTTPS, ví dụ Caddy:
   ```
   xuong.example.com {
     reverse_proxy 127.0.0.1:8787
   }
   ```
   (khi đó giữ `HOST=127.0.0.1`, chỉ Caddy mở ra ngoài).
4. Giữ máy chủ chạy nền: `npm i -g pm2 && cd server && pm2 start "npm start" --name xuong`.

## Kiểm thử

```bash
cd web && npm test        # engine: 16 test (gồm 5 test cho bước Claude thật với hook giả)
cd server && npm test     # máy chủ: 4 test (ngân sách, dừng khẩn cấp, sổ chi tiêu, đọc điểm JSON)
```
