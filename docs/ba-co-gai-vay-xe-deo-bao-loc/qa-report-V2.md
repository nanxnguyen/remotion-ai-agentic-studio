# QA Report — Ba Cô Gái Vẫy Xe Trên Đèo Bảo Lộc V2

## Kết quả kỹ thuật

- MP4: H.264 video + AAC stereo audio.
- Độ phân giải: 1080×1920 (9:16), 30 FPS.
- Thời lượng: 37.136 giây; giữ nguyên thời lượng V1.
- Audio: 48 kHz, 2 kênh stereo.
- Dung lượng: 18,921,874 bytes.
- SHA-256 MP4: `7cd16f13afdb285f1d30fb7ea603c9a71025577cb68e24fff46c3273932e014b`.
- SHA-256 video stream: `b6d5b41872d8f876a0da8d8795eadd47f0c2d7de4f29fdbb508043f2eabf732b`; trùng khớp V1, xác nhận hình ảnh không thay đổi.
- Full-file FFmpeg decode: PASS, không phát hiện decode error.
- Integrated loudness: -18.2 LUFS; true peak: -0.9 dBFS.

## Giọng và âm thanh

- 8/8 đoạn lời kể được tạo thành công bằng Vbee Batch API.
- Voice code: `n_hn_male_ngankechuyen_ytstable_vc` (Ngạn Kể Chuyện).
- Nội dung 8 câu thoại và vị trí cue được giữ nguyên theo V1.
- Các clip được căn thời lượng về đúng slot cũ bằng time-stretch nhẹ, hệ số 0.974–1.054; không thay đổi câu chữ.
- Nhạc nền ambient, tiếng gió và hiệu ứng SFX của V1 được giữ lại: phần lời V1 được triệt bằng các MP3 nguồn trùng hash, sau đó mix giọng V2 vào đúng cue.
- Tương quan phần dư với các clip giọng V1 sau khi tách nền thấp (cao nhất khoảng 0.058), không cho thấy giọng V1 còn rõ trong nền.
- Peak được giới hạn ở -0.9 dBFS; không có clipping số trong file PCM trung gian.
- Manual audio listening: PENDING; cần nghe lại trên điện thoại trước khi đăng.

## Nội dung và chính sách

- Không thay đổi hình ảnh, phụ đề, nhạc nền hoặc nội dung lời kể so với V1.
- Câu chuyện vẫn được đóng khung là giai thoại/lời đồn, không khẳng định hiện tượng siêu nhiên là sự thật.
- Không có máu me, xác chết hoặc tai nạn đồ họa.
- Không xuất bản tự động; quyền đăng vẫn thuộc người dùng.

## Kết luận

**Automated technical QA: PASS.**
**Voice generation: PASS — Vbee Ngạn Kể Chuyện.**
**Visual preservation: PASS — video stream bit-identical to V1.**
**Manual audio listening: PENDING.**
**Publish status: NOT PUBLISHED; requires user approval.**
