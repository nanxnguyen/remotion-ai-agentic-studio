// Proto Scenes: all 9 shots for ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  COLORS,
  TYPOGRAPHY,
  MOTION,
  LAYOUT,
  Human,
  Calendar,
  LightParticles,
  ExpandingGlow,
} from './kit';

type ShotData = {
  id: string;
  heading: string;
  sub?: string;
  captionChunks: string[];
  accentWords: string[];
  motif:
    | 'typing'
    | 'split'
    | 'crack'
    | 'montage'
    | 'question'
    | 'eye'
    | 'hands'
    | 'two-figures'
    | 'expanding';
};

export const SHOTS: ShotData[] = [
  {
    id: 's1',
    heading: 'Gõ xóa... gõ xóa...',
    captionChunks: ['Bạn từng xóa / một tin nhắn', 'chỉ vì sợ / mình nói nhiều quá'],
    accentWords: ['xóa', 'nói nhiều'],
    motif: 'typing',
  },
  {
    id: 's2',
    heading: 'Giả vờ... để được nói',
    captionChunks: ['Từng giả vờ thích / một bộ phim', 'để có thêm chuyện nói / với ai đó'],
    accentWords: ['giả vờ', 'chuyện nói'],
    motif: 'split',
  },
  {
    id: 's3',
    heading: '"Không sao đâu" / (mà trong lòng tan vỡ)',
    captionChunks: ['Từng bảo mình / không buồn', 'vì sợ người kia / thấy bạn nhạy cảm'],
    accentWords: ['không buồn', 'nhạy cảm'],
    motif: 'crack',
  },
  {
    id: 's4',
    heading: 'Giỏi đoán người / Dốt hỏi mình',
    captionChunks: ['Lâu dần / bạn trở nên / rất giỏi đoán', 'xem người khác / muốn gì ở mình'],
    accentWords: ['giỏi đoán', 'dốt hỏi mình'],
    motif: 'montage',
  },
  {
    id: 's5',
    heading: 'Câu hỏi làm im lặng',
    captionChunks: ['Nhưng có một / câu hỏi', 'bạn lại / khó trả lời'],
    accentWords: ['khó trả lời'],
    motif: 'question',
  },
  {
    id: 's6',
    heading: 'Mình thích gì?',
    captionChunks: ['Rốt cuộc / mình thật sự', 'thích điều gì?'],
    accentWords: ['thật sự', 'thích'],
    motif: 'eye',
  },
  {
    id: 's7',
    heading: 'Cố được yêu / Mất chính mình',
    captionChunks: [
      'Thật lạ / khi cố gắng / để được một người',
      'yêu thương / đôi khi ta / lại giấu đi',
      'nhiều phần / của chính mình',
    ],
    accentWords: ['cố gắng', 'giấu đi', 'chính mình'],
    motif: 'hands',
  },
  {
    id: 's8',
    heading: 'Điều chỉnh ≠ Xóa mình',
    captionChunks: ['Một mối quan hệ / có thể cần', 'sự điều chỉnh / từ cả hai'],
    accentWords: ['điều chỉnh', 'cả hai'],
    motif: 'two-figures',
  },
  {
    id: 's9',
    heading: 'Vẫn còn chỗ / cho bạn thật',
    captionChunks: [
      'Nhưng mong rằng / trong những điều',
      'bạn thay đổi / vẫn còn chỗ',
      'cho con người thật / của bạn',
    ],
    accentWords: ['vẫn còn chỗ', 'con người thật'],
    motif: 'expanding',
  },
];

// Helper: render caption chunks with accent words highlighted
const Caption: React.FC<{chunks: string[]; accentWords: string[]; y: number}> = ({
  chunks,
  accentWords,
  y,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: y,
      left: LAYOUT.safeMarginHorizontal,
      right: LAYOUT.safeMarginHorizontal,
      textAlign: 'center',
      fontSize: 32,
      color: COLORS.text,
      fontFamily: TYPOGRAPHY.caption.fontFamily,
      fontWeight: TYPOGRAPHY.caption.fontWeight,
      lineHeight: TYPOGRAPHY.caption.lineHeight,
    }}
  >
    {chunks.map((chunk, i) => (
      <div key={i} style={{marginBottom: i < chunks.length - 1 ? 8 : 0}}>
        {chunk.split(' ').map((word, wi) => (
          <span
            key={wi}
            style={{
              color: accentWords.some((a) => word.includes(a.replace(/[.,?]/g, '')))
                ? COLORS.accent
                : COLORS.text,
              fontWeight: accentWords.some((a) => word.includes(a.replace(/[.,?]/g, '')))
                ? 600
                : 500,
            }}
          >
            {word}&#8203;
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const ProtoScene: React.FC<{index: number}> = ({index}) => {
  const f = useCurrentFrame();
  const shot = SHOTS[index];
  const shotStart = index * 150; // approximate, real timeline from join
  const localFrame = f - shotStart;

  // Entrance animations (frame 0 visible per Gate D)
  const textRise = interpolate(localFrame, [0, MOTION.textEntrance.duration], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const artRise = interpolate(localFrame, [0, MOTION.artEntrance.duration], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const breathe = 1 + Math.sin(f / MOTION.breathe.period) * MOTION.breathe.amplitude;

  // Cross-dissolve on emotional boundaries (s3->s4, s5->s6, s7->s8)
  const isTransitionIn = localFrame < MOTION.crossDissolve.duration;
  const opacity = isTransitionIn
    ? interpolate(localFrame, [0, MOTION.crossDissolve.duration], [0, 1])
    : 1;

  return (
    <AbsoluteFill style={{background: COLORS.base, color: COLORS.text, opacity}}>
      <div
        style={{
          position: 'absolute',
          top: 265,
          left: LAYOUT.safeMarginHorizontal,
          right: LAYOUT.safeMarginHorizontal,
          textAlign: 'center',
          fontSize: 79,
          fontWeight: 850,
          letterSpacing: -2,
          lineHeight: 1.2,
          transform: `translateY(${textRise}px)`,
          fontFamily: TYPOGRAPHY.heading.fontFamily,
        }}
      >
        <div>{shot.heading.split(' / ')[0]}</div>
        {shot.sub && <div style={{color: COLORS.accent}}>{shot.sub}</div>}
        {shot.heading.split(' / ')[1] && (
          <div style={{color: COLORS.accent}}>{shot.heading.split(' / ')[1]}</div>
        )}
      </div>

      <svg
        viewBox="0 0 1080 1920"
        style={{
          width: '100%',
          height: '100%',
          transform: `translateY(${artRise}px) scale(${breathe})`,
          transformOrigin: '540px 960px',
        }}
      >
        {shot.motif === 'typing' && (
          <>
            <Human x={420} y={965} accent />
            <rect
              x={680}
              y={1010}
              width={230}
              height={250}
              rx={16}
              stroke={COLORS.muted}
              strokeWidth={8}
              fill="none"
            />
            <circle cx={820} cy={1180} r={20} fill={COLORS.accent} opacity={0.8} />{' '}
            {/* delete key glow */}
          </>
        )}
        {shot.motif === 'split' && (
          <>
            <Human x={365} y={950} />
            <Human x={735} y={950} accent />
          </>
        )}
        {shot.motif === 'crack' && (
          <>
            <Human x={420} y={965} />
            <path
              d="M420 920 Q450 900 480 920"
              stroke={COLORS.accent}
              strokeWidth={3}
              fill="none"
              strokeDasharray="8 4"
            />
          </>
        )}
        {shot.motif === 'montage' && (
          <>
            <Human x={420} y={965} />
            <rect
              x={680}
              y={1010}
              width={230}
              height={250}
              rx={16}
              stroke={COLORS.accent}
              strokeWidth={8}
              fill="none"
              opacity={0.5}
            />
          </>
        )}
        {shot.motif === 'question' && (
          <>
            <circle
              cx={540}
              cy={830}
              r={120}
              stroke={COLORS.accent}
              strokeWidth={4}
              fill="none"
              strokeDasharray="20 10"
            />
            <text
              x={540}
              y={835}
              textAnchor="middle"
              fontSize={120}
              fill={COLORS.accent}
              fontFamily={TYPOGRAPHY.heading.fontFamily}
              fontWeight={900}
            >
              ?
            </text>
          </>
        )}
        {shot.motif === 'eye' && (
          <>
            <ellipse
              cx={540}
              cy={830}
              rx={180}
              ry={80}
              stroke={COLORS.text}
              strokeWidth={6}
              fill="none"
            />
            <ellipse cx={540} cy={830} rx={60} ry={60} fill={COLORS.base} />
            <text
              x={540}
              y={840}
              textAnchor="middle"
              fontSize={80}
              fill={COLORS.accent}
              fontFamily={TYPOGRAPHY.heading.fontFamily}
            >
              ?
            </text>
          </>
        )}
        {shot.motif === 'hands' && (
          <>
            <path
              d="M400 1000 Q540 850 680 1000 Q540 900 400 1000"
              stroke={COLORS.text}
              strokeWidth={8}
              fill="none"
            />
            <LightParticles x={540} y={900} count={16} color={COLORS.accent} />
          </>
        )}
        {shot.motif === 'two-figures' && (
          <>
            <Human x={365} y={950} />
            <Human x={735} y={950} accent />
            <path
              d="M365 1230 L280 1490 M735 1230 L685 1375"
              stroke={COLORS.muted}
              strokeWidth={9}
              fill="none"
            />
          </>
        )}
        {shot.motif === 'expanding' && (
          <>
            <Human x={420} y={965} accent />
            <ExpandingGlow x={540} y={960} radius={400} opacity={0.12} />
          </>
        )}
      </svg>

      <Caption chunks={shot.captionChunks} accentWords={shot.accentWords} y={LAYOUT.captionTop} />

      <div
        style={{
          position: 'absolute',
          bottom: 340,
          left: 110,
          right: 110,
          height: 2,
          background: '#252525',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 268,
          textAlign: 'center',
          width: '100%',
          fontSize: 30,
          color: COLORS.muted,
        }}
      >
        BẠN ĐANG TIẾC ĐIỀU GÌ?
      </div>
    </AbsoluteFill>
  );
};
