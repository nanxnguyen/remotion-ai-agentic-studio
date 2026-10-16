// Storyboard: one low-fi frame per shot (15 keys), labelled with shot id +
// card name. Rendered as 15 stills of CMG-Board (frame = key index) and tiled
// with ffmpeg into out/qa/chung-minh-de-lam-gi-board.png.
// NOTE (T7): board captions are intentionally abbreviated (staging preview only);
// the build uses the FULL content-pack chunks byte-exact per key.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, F_BODY} from './tokens';
import {FONT_CSS} from './fonts';
import {BeamFan, Bubble, Chair, LightDisc, Medal, Mirror, Motes, PriceTag, Que, ARMS_UP, BOW, SIT, STAND} from './figures';
import {Caption, Chip, Headline, MinhHoa} from './text';

export const BOARD_KEYS = [
  's1', 's2a', 's2b', 's3', 's4a', 's4b', 's5', 's6',
  's7a', 's7b', 's8', 's9a', 's9b', 's10', 's11',
] as const;

export const BOARD_CARDS: Record<string, string> = {
  s1: 'spotlight-hero-card', s2a: 'spotlight-sweep (wake)', s2b: 'crash-zoom-punch',
  s3: 'type-entrance (drop)', s4a: 'wall-reveal (bento)', s4b: 'sweep (sleep) + hard cut',
  s5: 'paper-title-card', s6: 'list-reveal', s7a: 'draw-svg-trace',
  s7b: 'paper-title underline', s8: 'paper-title (chip)', s9a: 'type-assembly (stagger)',
  s9b: 'spotlight-sweep (land)', s10: 'hashtag-to-pill', s11: 'paper-title (hold)',
};

const Label: React.FC<{k: string}> = ({k}) => (
  <div style={{position: 'absolute', left: 40, top: 40, fontFamily: F_BODY, fontWeight: 600, fontSize: 34, color: C.orange}}>
    {k}
    <span style={{color: C.chipTx, fontSize: 28}}> · {BOARD_CARDS[k]}</span>
  </div>
);

const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

const Shot: React.FC<{k: string}> = ({k}) => {
  switch (k) {
    case 's1':
      return <><Headline lines={['Được công nhận rồi.', 'Sao vẫn thấy trống?']} accents={['trống?']} instant size={86} /><Stage><Que x={540} y={1090} pose={BOW} s={1.15} face="downcast" /><Medal x={660} y={1030} r={84} /><Chair x={730} y={1420} s={0.85} opacity={0.2} flip /></Stage></>;
    case 's2a':
      // T3 reframe: hero que s=1.3 (703px = 37% height); tube/disc subordinate band.
      return <><Stage><rect x={120} y={560} width={840} height={40} rx={8} fill={C.white} opacity={0.5} /><rect x={120} y={620} width={840} height={18} rx={6} fill={C.grey} opacity={0.4} /><LightDisc x={540} y={590} r={200} opacity={0.08} /><Que x={400} y={1230} s={1.3} face="downcast" /></Stage><Caption chunks={['Tháng đầu đi làm,', 'cuối buổi họp, bạn nói khẽ:']} accents={['để', 'rồi', 'xem.']} /></>;
    case 's2b':
      // T1+T2: face close-up (s=3.0, face 336px) + pack-exact bubble text + tag.
      return <><Stage><Bubble x={540} y={300} w={620} h={170} lines={['nó thì làm được gì']} size={46} /><Que x={540} y={1350} s={3.0} face="smirk" /></Stage><MinhHoa y={470} /><Caption chunks={['Ai đó cười khẩy', 'thành tiếng: nó thì']} accents={['khẩy']} /></>;
    case 's3':
      return <><Stage>{[0, 1, 2].map((i) => <Medal key={i} x={330 + i * 210} y={620} r={80} />)}<Que x={540} y={1250} s={1.2} face="downcast" /></Stage><Caption chunks={['Từ đó, tăng ca', 'triền miên, bằng khen,']} accents={['bằng', 'khen,']} /></>;
    case 's4a':
      return <><Stage><rect x={0} y={560} width={1080} height={420} fill={C.panel} />{[0, 1, 2, 3].map((i) => <Que key={i} x={220 + i * 210} y={900} s={0.75} face="smile" />)}<Que x={540} y={1250} s={1.1} face="smile" /><Medal x={540} y={1050} r={60} /></Stage><Caption chunks={['Ngày nhận bằng khen,', 'cả phòng đứng dậy']} /></>;
    case 's4b':
      return <><Stage>{[0, 1, 2].map((i) => <Medal key={i} x={330 + i * 210} y={600} r={72} dim />)}<Chair x={640} y={1250} s={0.9} opacity={0.35} flip /><Que x={400} y={1300} pose={SIT} s={1.0} face="droop" /><rect x={100} y={500} width={160} height={330} fill={C.orange} opacity={0.5} /></Stage><Caption chunks={['Tối về, phòng trọ', 'im phăng phắc,']} accents={['phăng', 'phắc,']} /></>;
    case 's5':
      return <><Headline lines={['Nếu không ai biết', 'chuyện này, bạn', 'còn làm không?']} accents={['làm', 'không?']} instant size={80} /><Stage><LightDisc x={540} y={1050} r={210} opacity={0.3} /><Motes cx={540} cy={1050} /><Que x={540} y={1180} s={1.1} face="calm" /></Stage></>;
    case 's6':
      return <><Stage>{[0, 1, 2, 3].map((i) => <Que key={i} x={180 + i * 240} y={900} s={0.85} face="none" opacity={i === 1 ? 1 : 0.45} />)}<line x1={140} y1={1250} x2={940} y2={1250} stroke={C.grey} strokeWidth={6} strokeDasharray="26 20" /></Stage><Caption chunks={['Thật ra, người ta', 'để ý bạn ít hơn nhiều']} accents={['hơn', 'nhiều']} /><Chip text="Hiệu ứng spotlight (Gilovich & cs., 2000): ta tưởng người khác để ý mình hơn thực tế" from={0} to={999} /></>;
    case 's7a':
      return <><Stage><Medal x={540} y={700} r={130} /><path d="M 380 950 Q 470 880 560 950 T 740 930" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" /><path d="M 400 1020 Q 500 960 600 1010 T 730 1000" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.7} /><Bubble x={540} y={330} w={520} h={150} lines={['nó thì làm được gì']} size={40} /></Stage><MinhHoa y={470} /><Caption chunks={['Bạn đã tưởng tấm', 'bằng khen này sẽ lấp']} accents={['lấp']} /></>;
    case 's7b':
      return <><Stage><Que x={540} y={1150} s={1.25} face="droop" /><rect x={470} y={985} width={140} height={130} rx={40} fill="none" stroke={C.white} strokeWidth={8} strokeDasharray="22 16" /><ellipse cx={540} cy={1050} rx={44} ry={40} fill={C.orange} opacity={0.7} /></Stage><Caption chunks={['Nó chỉ treo yên', 'trên tường. Còn câu nói', 'vẫn nằm trong ngực.']} accents={['treo yên', 'nằm trong ngực.']} /></>;
    case 's8':
      return <><Stage><line x1={140} y1={1250} x2={940} y2={1250} stroke={C.grey} strokeWidth={6} />{[0, 1, 2, 3].map((i) => <circle key={i} cx={260 + i * 200} cy={1050} r={12} fill={C.white} />)}<line x1={200} y1={1050} x2={880} y2={1050} stroke={C.white} strokeWidth={14} strokeLinecap="round" /><Medal x={170} y={1050} r={52} /><ellipse cx={880} cy={1050} rx={60} ry={34} fill="none" stroke={C.orange} strokeWidth={8} strokeDasharray="16 12" /><Que x={540} y={1450} s={0.8} face="calm" /></Stage><Caption chunks={['Có nghiên cứu theo dõi', 'bốn tuần: đạt điều']} /><Chip text="Nghiên cứu dọc 4 tuần (J. Personality 2010, abstract): đạt mục tiêu ngoại lai không tăng wellbeing" from={0} to={999} /></>;
    case 's9a':
      return <><Stage><Mirror x={540} y={950} /><Que x={400} y={1150} s={1.0} face="calm" /><Que x={680} y={1150} s={1.0} face="calm" flip opacity={0.85} /><text x={680} y={600} textAnchor="middle" fontFamily="'Lexend', sans-serif" fontWeight={700} fontSize={110} fill={C.white}>?</text></Stage><Caption chunks={['Nửa đêm, bạn soi gương', 'thật lâu, không sửa tóc,']} accents={['gương']} /></>;
    case 's9b':
      return <><Stage><BeamFan opacity={0.8} /><Que x={540} y={1220} s={1.25} face="lit" tilt={-6} /></Stage><Caption chunks={['Rồi bạn hỏi nhỏ:', 'rốt cuộc, mình đang cần', 'điều gì nhất?']} accents={['cần', 'gì', 'nhất?']} /></>;
    case 's10':
      return <><Headline lines={['Bấy lâu nay, bạn trao', 'quyền định giá mình', 'cho người khác.']} accents={['định', 'giá']} instant size={76} /><Stage><Que x={380} y={1250} s={1.1} face="calm" /><PriceTag x={560} y={1150} tilt={12} /><Que x={800} y={1250} s={1.1} face="none" opacity={0.35} /><MinhHoa y={1420} /></Stage><Chip text="Tuổi Trẻ 14/02/2026 (bình luận): “trao quyền định giá bản thân cho người khác”" from={0} to={999} top={500} /></>;
    case 's11':
      return <><Headline lines={['Nếu từ mai không cần', 'cho ai thấy nữa, bạn', 'giữ lại điều gì?']} accents={['giữ', 'lại', 'điều', 'gì?']} instant size={72} /><Stage><Que x={470} y={1180} s={1.2} face="calm" /><Medal x={330} y={1010} r={64} /><Chair x={730} y={1420} s={0.8} opacity={0.28} /></Stage></>;
    default:
      return null;
  }
};

export const BoardFrame: React.FC<{k?: string}> = ({k}) => {
  const frame = useCurrentFrame();
  const key = k ?? BOARD_KEYS[Math.min(BOARD_KEYS.length - 1, frame)];
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <Label k={key} />
      <Shot k={key} />
    </AbsoluteFill>
  );
};
