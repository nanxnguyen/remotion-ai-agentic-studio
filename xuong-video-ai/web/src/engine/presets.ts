import type { AgentDef, ChannelDef, StepDef, Workflow } from './types';

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const A = (id: string, name: string, title: string, role: AgentDef['role'], hue: number, trait: string, model = 'claude-sonnet-5-5'): AgentDef =>
  ({ id, name, title, role, hue, trait, model });

const S = (id: string, name: string, agentId: string, o: Partial<StepDef> & Pick<StepDef, 'action' | 'prop'>): StepDef => ({
  id, name, agentId, kind: 'work', duration: [5, 8], tokens: [3000, 9000], prompt: '', errorRate: 0, ...o,
});

const DIRECTOR = A('dao-dien', 'Anh Quân', 'Đạo diễn', 'director', 45, 'Điềm tĩnh, luôn nhìn bảng trắng', 'claude-opus-5-5');
const YOU = A('ban', 'Bạn', 'Người duyệt', 'human', 85, 'Người quyết định cuối cùng', 'con người');

function horror(): Workflow {
  const agents = [
    DIRECTOR,
    A('nghien-cuu', 'Minh', 'Nhà nghiên cứu', 'producer', 250, 'Mê sách cũ và chuyện dân gian'),
    A('bien-kich', 'Chị Lan', 'Biên kịch', 'producer', 25, 'Viết nhanh, ghét câu thừa', 'claude-opus-5-5'),
    A('tham-dinh', 'Bác Tư', 'Thẩm định kịch bản', 'reviewer', 300, 'Khó tính nhưng công bằng'),
    A('long-tieng', 'Huy', 'Lồng tiếng', 'producer', 340, 'Giọng trầm, luôn đeo tai nghe', 'vbee-tts'),
    A('am-thanh', 'Vy', 'Âm thanh', 'producer', 190, 'Nghe được tiếng muỗi bay'),
    A('storyboard', 'Tùng', 'Họa sĩ storyboard', 'producer', 150, 'Vẽ bằng cả hai tay'),
    A('thumbnail', 'Ngọc', 'Thiết kế thumbnail', 'producer', 280, 'Ám ảnh tỉ lệ click'),
    A('dung-phim', 'Khoa', 'Dựng phim', 'producer', 60, 'Uống cà phê đen, render cả đêm', 'remotion-worker'),
    A('qa', 'Thảo', 'QA', 'reviewer', 120, 'Đếm từng khung hình'),
    A('xuat-ban', 'Đạt', 'Xuất bản', 'producer', 220, 'Luôn kiểm tra link hai lần', 'drive+youtube-api'),
    YOU,
  ];
  const steps: StepDef[] = [
    S('research', 'Nghiên cứu', 'nghien-cuu', { action: 'read', prop: 'research', duration: [5, 8], prompt: 'Tìm 3 tích truyện dân gian Việt Nam có nguồn rõ, chấm độ lạ và tiềm năng hook. Trả JSON {source, summary, hookIdea}.' }),
    S('script', 'Kịch bản', 'bien-kich', { action: 'write', prop: 'script', duration: [7, 11], tokens: [6000, 14000], prompt: 'Viết kịch bản Shorts 9:16 dài 50–60 giây. Hook thách thức 0–3 giây, mỗi câu thoại có hành động nhìn thấy được, outro like + follow 3–5 giây.' }),
    S('review-script', 'Thẩm định', 'tham-dinh', { action: 'review', prop: 'audit', kind: 'review', duration: [4, 6], tokens: [4000, 7000], gate: { threshold: 80, maxRework: 3, reworkTo: 'script' }, prompt: 'Chấm kịch bản thang 100: hook, logic, twist, mức sẵn sàng sản xuất. Dưới ngưỡng thì trả về kèm danh sách sửa cụ thể.' }),
    S('voice', 'Lồng tiếng', 'long-tieng', { action: 'speak', prop: 'voice', duration: [5, 8], tokens: [0, 0], prompt: 'Gọi Vbee TTS, giọng trầm, tốc độ 0.95. Trả audio.wav và timestamp từng câu.' }),
    S('sound', 'Âm thanh', 'am-thanh', { action: 'mix', prop: 'music', duration: [4, 7], tokens: [1000, 3000], prompt: 'Chọn nhạc nền u tối, thêm hiệu ứng theo timestamp, cân âm lượng -14 LUFS.' }),
    S('storyboard', 'Storyboard', 'storyboard', { action: 'draw', prop: 'storyboard', duration: [7, 10], tokens: [5000, 10000], prompt: 'Storyboard 9:16 bám timestamp. Card thử thách mở đầu, card CTA kết thúc, màu theo không khí kịch bản.' }),
    S('thumbnail', 'Thumbnail', 'thumbnail', { action: 'draw', prop: 'thumbnail', duration: [5, 8], tokens: [3000, 6000], prompt: 'Thiết kế thumbnail kịch tính, tiêu đề dưới 60 ký tự, mô tả có hashtag.' }),
    S('render', 'Dựng phim', 'dung-phim', { action: 'render', prop: 'render', duration: [9, 13], tokens: [0, 0], errorRate: 0.12, prompt: 'npx remotion render Short --codec h264 --crf 20. Chuyển cảnh mềm, không timecode, không badge.' }),
    S('qa', 'QA', 'qa', { action: 'review', prop: 'qa', kind: 'review', duration: [4, 6], tokens: [3000, 6000], gate: { threshold: 85, maxRework: 3, reworkTo: 'storyboard' }, prompt: 'So từng câu thoại với khung hình thật. Trừ điểm nếu hành động không có bằng chứng hình, còn badge, cắt gắt.' }),
    S('approve', 'Duyệt', 'ban', { action: 'approve', prop: 'approve', kind: 'human', duration: [1, 1], tokens: [0, 0], prompt: 'Bạn xem thumbnail, tiêu đề và video trước khi xuất bản.' }),
    S('publish', 'Xuất bản', 'xuat-ban', { action: 'publish', prop: 'publish', duration: [4, 6], tokens: [500, 1500], prompt: 'Tạo thư mục Drive đánh số, upload MP4 + thumbnail + mô tả. Đăng YouTube Private, trả link xác minh.' }),
  ];
  const edges = [
    ['research', 'script'], ['script', 'review-script'],
    ['review-script', 'voice'], ['review-script', 'storyboard'], ['review-script', 'thumbnail'],
    ['voice', 'sound'], ['sound', 'render'], ['storyboard', 'render'],
    ['render', 'qa'], ['qa', 'approve'], ['thumbnail', 'approve'], ['approve', 'publish'],
  ].map(([from, to]) => ({ from, to }));
  return { version: 1, note: 'Workflow mặc định', publishedAt: 0, agents, steps, edges };
}

function animation(): Workflow {
  const agents = [
    DIRECTOR,
    A('y-tuong', 'Hà', 'Người tìm ý tưởng', 'producer', 250, 'Xem phim hoạt hình mỗi sáng'),
    A('bien-kich', 'Nam', 'Biên kịch hình ảnh', 'producer', 25, 'Kể chuyện không cần lời', 'claude-opus-5-5'),
    A('tham-dinh', 'Cô Mai', 'Thẩm định', 'reviewer', 300, 'Hỏi "vì sao?" ba lần'),
    A('storyboard', 'Tùng', 'Họa sĩ storyboard', 'producer', 150, 'Vẽ bằng cả hai tay'),
    A('animator', 'Linh', 'Animator', 'producer', 340, 'Yêu đường cong ease-out'),
    A('am-nhac', 'Vy', 'Âm nhạc', 'producer', 190, 'Hát theo mọi giai điệu'),
    A('dung-phim', 'Khoa', 'Render 2K', 'producer', 60, 'Render cả đêm', 'remotion-worker'),
    A('qa', 'Thảo', 'QA captions', 'reviewer', 120, 'Đếm từng khung hình'),
    A('xuat-ban', 'Đạt', 'Xuất bản', 'producer', 220, 'Kiểm tra link hai lần', 'drive+youtube-api'),
    YOU,
  ];
  const steps: StepDef[] = [
    S('idea', 'Ý tưởng', 'y-tuong', { action: 'read', prop: 'research', prompt: 'Đề xuất 3 ý tưởng truyện 2D không lời 2–5 phút, kể bằng hình, có twist ấm áp.' }),
    S('script', 'Kịch bản', 'bien-kich', { action: 'write', prop: 'script', duration: [7, 10], prompt: 'Kịch bản theo beat hình ảnh, không thoại, ghi cảm xúc nhân vật từng cảnh.' }),
    S('audit', 'Thẩm định', 'tham-dinh', { action: 'review', prop: 'audit', kind: 'review', duration: [4, 6], gate: { threshold: 78, maxRework: 3, reworkTo: 'script' }, prompt: 'Chấm hook, logic, cấu trúc, twist, mức sẵn sàng sản xuất.' }),
    S('storyboard', 'Storyboard', 'storyboard', { action: 'draw', prop: 'storyboard', duration: [7, 10], prompt: 'Storyboard 16:9, mỗi khung ghi chuyển động camera và thời lượng.' }),
    S('music', 'Âm nhạc', 'am-nhac', { action: 'mix', prop: 'music', duration: [5, 8], prompt: 'Nhạc nền nhẹ nhàng theo cảm xúc từng cảnh.' }),
    S('animate', 'Animation', 'animator', { action: 'animate', prop: 'animation', duration: [10, 14], prompt: 'Dựng chuyển động từng cảnh, giữ model nhân vật nhất quán.' }),
    S('render', 'Render 2K', 'dung-phim', { action: 'render', prop: 'render', duration: [10, 14], tokens: [0, 0], errorRate: 0.15, prompt: 'Render 2560×1440, 30fps, h264.' }),
    S('qa', 'QA', 'qa', { action: 'review', prop: 'qa', kind: 'review', duration: [4, 6], gate: { threshold: 82, maxRework: 2, reworkTo: 'animate' }, prompt: 'Kiểm captions tiếng Anh, nhịp cảnh, lỗi hình.' }),
    S('approve', 'Duyệt', 'ban', { action: 'approve', prop: 'approve', kind: 'human', duration: [1, 1], tokens: [0, 0], prompt: 'Bạn xem bản cuối.' }),
    S('publish', 'Xuất bản', 'xuat-ban', { action: 'publish', prop: 'publish', duration: [4, 6], prompt: 'Upload Private lên kênh, lưu Drive, trả link xác minh.' }),
  ];
  const edges = [
    ['idea', 'script'], ['script', 'audit'], ['audit', 'storyboard'], ['audit', 'music'],
    ['storyboard', 'animate'], ['animate', 'render'], ['render', 'qa'], ['music', 'qa'],
    ['qa', 'approve'], ['approve', 'publish'],
  ].map(([from, to]) => ({ from, to }));
  return { version: 1, note: 'Workflow mặc định', publishedAt: 0, agents, steps, edges };
}

function warm(): Workflow {
  const agents = [
    DIRECTOR,
    A('nghien-cuu', 'Minh', 'Nhà nghiên cứu', 'producer', 250, 'Thích chuyện đời thường'),
    A('bien-kich', 'Chị Lan', 'Biên kịch', 'producer', 25, 'Viết câu kết làm người ta lặng đi', 'claude-opus-5-5'),
    A('long-tieng', 'Hương', 'Lồng tiếng', 'producer', 340, 'Giọng ấm miền Nam', 'vbee-tts'),
    A('dung-phim', 'Khoa', 'Dựng phim', 'producer', 60, 'Render cả đêm', 'remotion-worker'),
    A('qa', 'Thảo', 'QA', 'reviewer', 120, 'Đếm từng khung hình'),
    A('xuat-ban', 'Đạt', 'Xuất bản', 'producer', 220, 'Kiểm tra link hai lần', 'drive+youtube-api'),
    YOU,
  ];
  const steps: StepDef[] = [
    S('research', 'Nghiên cứu', 'nghien-cuu', { action: 'read', prop: 'research', prompt: 'Tìm câu chuyện đời thường cảm động có nguồn rõ.' }),
    S('script', 'Kịch bản', 'bien-kich', { action: 'write', prop: 'script', duration: [6, 9], prompt: 'Kịch bản 60 giây, mở bằng chi tiết đời thường, kết bằng một câu đọng lại.' }),
    S('voice', 'Lồng tiếng', 'long-tieng', { action: 'speak', prop: 'voice', tokens: [0, 0], prompt: 'Vbee TTS giọng nữ miền Nam, nhịp chậm.' }),
    S('render', 'Dựng phim', 'dung-phim', { action: 'render', prop: 'render', duration: [8, 11], tokens: [0, 0], errorRate: 0.1, prompt: 'Render 9:16 với ảnh minh họa và phụ đề.' }),
    S('qa', 'QA', 'qa', { action: 'review', prop: 'qa', kind: 'review', duration: [3, 5], gate: { threshold: 80, maxRework: 2, reworkTo: 'script' }, prompt: 'Kiểm phụ đề khớp giọng, âm lượng chuẩn.' }),
    S('approve', 'Duyệt', 'ban', { action: 'approve', prop: 'approve', kind: 'human', duration: [1, 1], tokens: [0, 0], prompt: 'Bạn xem bản cuối.' }),
    S('publish', 'Xuất bản', 'xuat-ban', { action: 'publish', prop: 'publish', prompt: 'Upload Private, lưu Drive.' }),
  ];
  const edges = [['research', 'script'], ['script', 'voice'], ['voice', 'render'], ['render', 'qa'], ['qa', 'approve'], ['approve', 'publish']]
    .map(([from, to]) => ({ from, to }));
  return { version: 1, note: 'Workflow mặc định', publishedAt: 0, agents, steps, edges };
}

export const CHANNELS: ChannelDef[] = [
  { id: 'hcl', name: 'Hẻm chuyện lạ', kind: 'Shorts kinh dị · 9:16', theme: 'horror', workflow: horror(),
    titles: ['Tiếng gõ cửa lúc 3 giờ sáng', 'Cái giếng sau chùa bỏ hoang', 'Chuyến xe đò cuối cùng', 'Bóng áo trắng trên cầu tre', 'Phòng trọ số 13', 'Con búp bê trong rương gỗ', 'Ngọn hải đăng không người gác', 'Tiếng hát dưới đáy sông', 'Ngôi nhà có hai cửa sổ', 'Đám cưới trong rừng tràm', 'Chiếc gương của bà ngoại', 'Ông lão bán vé số lúc nửa đêm'] },
  { id: 'olise', name: 'Olise', kind: 'Hoạt hình không lời · 16:9', theme: 'pastel', workflow: animation(),
    titles: ['The Lost Umbrella', 'Robot Learns to Dance', 'The Last Leaf', 'Paper Boat Journey', 'Lighthouse Cat', 'The Tiny Gardener', 'Moon Delivery', 'Snowman’s Summer'] },
  { id: 'lab', name: 'Kênh cảm động', kind: 'Truyện đời thường · 9:16', theme: 'warm', workflow: warm(),
    titles: ['Lá thư không gửi', 'Bát phở của ba', 'Chiếc xe đạp cũ', 'Người gác chắn tàu', 'Cô giáo vùng cao', 'Hộp cơm mẹ gói'] },
];

/** Giá API (USD / 1 triệu token), theo bảng giá Claude tháng 11/2026. Haiku tính mức prompt dưới 100K token. */
export const PRICES: Record<string, { in: number; out: number }> = {
  'claude-opus-5-5': { in: 4, out: 20 }, 'claude-sonnet-5-5': { in: 2, out: 10 }, 'claude-haiku-5-5': { in: 0.1, out: 0.5 },
};
export const WEB_SEARCH_USD = 0.01;
/** Chi phí mô phỏng: coi 80% token là input, 20% là output. */
export function mockCost(model: string, tokens: number) {
  const p = PRICES[model];
  return (p ? (tokens * 0.8 * p.in + tokens * 0.2 * p.out) / 1e6 : 0) + (FIXED_FEE[model] ?? 0);
}
export const FIXED_FEE: Record<string, number> = { 'vbee-tts': 0.02, 'remotion-worker': 0.01, 'drive+youtube-api': 0 };
export const MODELS = ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5', 'vbee-tts', 'remotion-worker', 'drive+youtube-api', 'con người'];
