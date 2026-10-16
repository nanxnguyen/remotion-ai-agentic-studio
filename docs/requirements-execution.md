# Requirements → execution

| Yêu cầu / ràng buộc | Quyết định thực thi | Bằng chứng |
|---|---|---|
| Video Remotion dọc, ngắn | 1080×1920, 30fps, 1290 frame / 43 giây | `src/Root.tsx`, `src/timeline.ts` |
| Vui nhộn nhưng hữu ích | Pain → phóng đại → reveal → proof → relief → CTA; 2 punchline dev | `docs/script.md` |
| Claim chính xác | Chỉ dùng README/website chính thức; có cảnh báo token | `docs/research.md`, outro |
| UI sản phẩm thật | Dùng `overview.png` từ repo; graph code-native chỉ là diễn giải | S4, `assets-manifest.md` |
| Đọc tốt trên mobile | Caption 64px, bottom 224px; heading lớn | `Caption` trong `src/Main.tsx` |
| Shotcraft card stack | 12f/card, spring settle, blur depth; thích nghi thành danh sách file | S1 `FileCard` |
| Shotcraft diagram cascade | Line đi trước node, level cascade, full-tree hold | S3 `Graph` |
| Shotcraft type/filter | 3f/ký tự, 11f breath, non-target dim, auth target giữ slot | S5 |
| Shotcraft before/after | fast 12f → recoil 12f → hold 18f → slow return 48f | S6 slider |
| Shotcraft letterspace | Wordmark materialize 52f bằng opacity + letter-spacing | S6 |
| Âm thanh | Voice nữ trẻ; SFX theo shot offset; hai bản có/không BGM | `src/timeline.ts`, 2 composition |

## Chủ ý thích nghi

- Video 9:16 nên các recipe 16:9 được tái bố cục theo chiều dọc, không sao chép pixel.
- Graph tự dựng không được trình bày như screenshot sản phẩm; badge “DASHBOARD THẬT” chỉ xuất hiện ở UI chính thức.
- `letterspace-materialize` dùng typographic reveal thay vì SVG stroke để giữ nguyên wordmark/font chính thức; đây là biến thể có chủ ý, không tuyên bố giống Gallery pixel-perfect.
- Opening giữ đồng thời headline và file stack vì nội dung hook cần nêu “repo 200.000 dòng”; vi phạm có chủ ý nguyên tắc single-hero của Q5, nhưng card chỉ đóng vai bằng chứng phụ.
