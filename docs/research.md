# Research — Understand Anything

Nguồn chính thức:

- Repo: https://github.com/Egonex-AI/Understand-Anything
- Website: https://understand-anything.com/
- README bản `main`, kiểm tra ngày 2026-10-12.

## Sự thật dùng trong video

- Sản phẩm biến codebase, knowledge base hoặc tài liệu thành knowledge graph tương tác.
- Pipeline đa agent trích xuất file, function, class và dependency.
- Dashboard cho phép click node, tìm kiếm theo tên/ngữ nghĩa, xem giải thích dễ hiểu và guided tour.
- Diff Impact Analysis giúp thấy vùng bị ảnh hưởng trước khi commit.
- Lệnh khởi đầu trên Claude Code là `/understand`; Codex dùng `$understand` hoặc yêu cầu bằng ngôn ngữ tự nhiên.
- Lần phân tích đầu có thể dùng nhiều token ở repo lớn; các lần sau mặc định incremental.
- Dự án theo giấy phép MIT.

## Claim không dùng

- Không tuyên bố chính xác tuyệt đối, tiết kiệm bao nhiêu phần trăm hay thay thế code review.
- Không gắn số node/tốc độ xử lý giả.
- “Repo 200.000 dòng” là tình huống mở đầu được chính README dùng để minh họa, không phải giới hạn sản phẩm.
