import {defineSequentialTimeline} from '../../core';

export type SceneKind = 'notifications' | 'cake' | 'messages' | 'office' | 'paperwork' | 'comfort' | 'clock' | 'last-request' | 'typing' | 'reflection' | 'tear' | 'delete' | 'boundary' | 'flame' | 'wish' | 'sunrise';
export type SceneMood = 'lonely' | 'tired' | 'shock' | 'grief' | 'resolve' | 'hope';

export const scenes = [
  {id: 'scene01', durationInFrames: 144, kind: 'notifications', mood: 'lonely', lines: ["17 TIN NHẮN...",""], subtitle: 'Đêm sinh nhật của An'},
  {id: 'scene02', durationInFrames: 126, kind: 'cake', mood: 'lonely', lines: ["0 LỜI CHÚC.",""], subtitle: 'Chiếc bánh chưa thắp nến'},
  {id: 'scene03', durationInFrames: 174, kind: 'messages', mood: 'lonely', lines: ["TẤT CẢ ĐỀU...","NHỜ CÔ GIÚP"], subtitle: 'Những tin nhắn nối tiếp'},
  {id: 'scene04', durationInFrames: 168, kind: 'office', mood: 'tired', lines: ["AN CHƯA TỪNG","BIẾT NÓI KHÔNG"], subtitle: 'Cô ở lại sau giờ làm'},
  {id: 'scene05', durationInFrames: 162, kind: 'paperwork', mood: 'tired', lines: ["AI CŨNG CẦN AN",""], subtitle: 'Một chồng việc khác lại tới'},
  {id: 'scene06', durationInFrames: 168, kind: 'comfort', mood: 'tired', lines: ["\"MÌNH KHÔNG SAO\"",""], subtitle: 'Dù chính cô cũng đã rất mệt'},
  {id: 'scene07', durationInFrames: 174, kind: 'clock', mood: 'lonely', lines: ["23:59",""], subtitle: 'Sinh nhật gần kết thúc'},
  {id: 'scene08', durationInFrames: 198, kind: 'last-request', mood: 'shock', lines: ["\"GIÚP CHỊ NHÉ?\"",""], subtitle: 'Thêm một lời nhờ'},
  {id: 'scene09', durationInFrames: 168, kind: 'typing', mood: 'shock', lines: ["AN GÕ: \"VÂNG\"",""], subtitle: 'Như mọi lần'},
  {id: 'scene10', durationInFrames: 150, kind: 'reflection', mood: 'shock', lines: ["RỒI CÔ KHỰNG LẠI",""], subtitle: 'Một khuôn mặt hiện trên màn hình'},
  {id: 'scene11', durationInFrames: 144, kind: 'tear', mood: 'grief', lines: ["AI ĐANG KHÓC?",""], subtitle: 'Người An bỏ quên lâu nhất'},
  {id: 'scene12', durationInFrames: 168, kind: 'delete', mood: 'resolve', lines: ["LẦN ĐẦU TIÊN...",""], subtitle: 'Cô xóa chữ Vâng'},
  {id: 'scene13', durationInFrames: 180, kind: 'boundary', mood: 'resolve', lines: ["HÔM NAY","EM CẦN NGHỈ."], subtitle: 'Một lời tử tế cho chính mình'},
  {id: 'scene14', durationInFrames: 150, kind: 'flame', mood: 'hope', lines: ["AN TỰ THẮP NẾN",""], subtitle: 'Không cần chờ ai nữa'},
  {id: 'scene15', durationInFrames: 132, kind: 'wish', mood: 'hope', lines: ["ƯỚC CHO CHÍNH MÌNH",""], subtitle: 'Ngọn nến nhỏ, một niềm vui mới'},
  {id: 'scene16', durationInFrames: 144, kind: 'sunrise', mood: 'hope', lines: ["BẠN CŨNG XỨNG ĐÁNG","ĐƯỢC THƯƠNG."], subtitle: 'Đừng bắt trái tim mình chờ đến lượt'},
] as const;

export const timeline = defineSequentialTimeline(scenes);
export const DURATION_FRAMES = timeline.totalDurationInFrames;
export const FPS = 60;
export const TRANSITION_FRAMES = 24; // 0.8s across each cut at 60fps

export const shotStarts = scenes.map((_shot,index) =>
  scenes.slice(0,index).reduce((sum,shot) => sum + shot.durationInFrames,0),
);
if (DURATION_FRAMES !== 2550 || scenes.length !== 16) {
  throw new Error('17 messages film must contain 16 shots across 42.5 seconds');
}
