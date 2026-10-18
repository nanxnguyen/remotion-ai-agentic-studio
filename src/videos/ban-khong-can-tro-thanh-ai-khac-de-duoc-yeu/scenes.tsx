// Scenes: ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { SPANS } from './timeline';
import {
  COLORS, TYPOGRAPHY, LAYOUT, MOTION,
  useTextEntrance, useArtEntrance, useBreathe, useCrossDissolve, useAccentHighlight,
  Human, Calendar, LightParticles, ExpandingGlow, DeleteKeyGlow, QuestionMarkBuild,
  CrackPath, MirrorReflection,
} from './kit';

type ShotData = {
  id: string;
  heading: string;
  sub?: string;
  captionChunks: string[];
  accentWords: string[];
  motif: 'typing' | 'split' | 'crack' | 'montage' | 'question' | 'eye' | 'hands' | 'two-figures' | 'expanding';
};

const SHOTS: ShotData[] = [
  { id: 's1', heading: 'Gõ xóa... gõ xóa...', captionChunks: ['Bạn từng xóa / một tin nhắn', 'chỉ vì sợ / mình nói nhiều quá'], accentWords: ['xóa', 'nói nhiều'], motif: 'typing' },
  { id: 's2', heading: 'Giả vờ... để được nói', captionChunks: ['Từng giả vờ thích / một bộ phim', 'để có thêm chuyện nói / với ai đó'], accentWords: ['giả vờ', 'chuyện nói'], motif: 'split' },
  { id: 's3', heading: '"Không sao đâu" / (mà trong lòng tan vỡ)', captionChunks: ['Từng bảo mình / không buồn', 'vì sợ người kia / thấy bạn nhạy cảm'], accentWords: ['không buồn', 'nhạy cảm'], motif: 'crack' },
  { id: 's4', heading: 'Giỏi đoán người / Dốt hỏi mình', captionChunks: ['Lâu dần / bạn trở nên / rất giỏi đoán', 'xem người khác / muốn gì ở mình'], accentWords: ['giỏi đoán', 'dốt hỏi mình'], motif: 'montage' },
  { id: 's5', heading: 'Câu hỏi làm im lặng', captionChunks: ['Nhưng có một / câu hỏi', 'bạn lại / khó trả lời'], accentWords: ['khó trả lời'], motif: 'question' },
  { id: 's6', heading: 'Mình thích gì?', captionChunks: ['Rốt cuộc / mình thật sự', 'thích điều gì?'], accentWords: ['thật sự', 'thích'], motif: 'eye' },
  { id: 's7', heading: 'Cố được yêu / Mất chính mình', captionChunks: ['Thật lạ / khi cố gắng / để được một người', 'yêu thương / đôi khi ta / lại giấu đi', 'nhiều phần / của chính mình'], accentWords: ['cố gắng', 'giấu đi', 'chính mình'], motif: 'hands' },
  { id: 's8', heading: 'Điều chỉnh ≠ Xóa mình', captionChunks: ['Một mối quan hệ / có thể cần', 'sự điều chỉnh / từ cả hai'], accentWords: ['điều chỉnh', 'cả hai'], motif: 'two-figures' },
  { id: 's9', heading: 'Vẫn còn chỗ / cho bạn thật', captionChunks: ['Nhưng mong rằng / trong những điều', 'bạn thay đổi / vẫn còn chỗ', 'cho con người thật / của bạn'], accentWords: ['vẫn còn chỗ', 'con người thật'], motif: 'expanding' },
];

const Caption: React.FC<{ chunks: string[]; accentWords: string[]; y: number }> = ({ chunks, accentWords, y }) => (
  <div style={{ position: 'absolute', bottom: y, left: LAYOUT.safeMarginHorizontal, right: LAYOUT.safeMarginHorizontal, textAlign: 'center', fontSize: 32, color: COLORS.text, fontFamily: TYPOGRAPHY.caption.fontFamily, fontWeight: TYPOGRAPHY.caption.fontWeight, lineHeight: TYPOGRAPHY.caption.lineHeight }}>
    {chunks.map((chunk, i) => (
      <div key={i} style={{ marginBottom: i < chunks.length - 1 ? 8 : 0 }}>
        {chunk.split(' ').map((word, wi) => (
          <span key={wi} style={{ color: accentWords.some(a => word.includes(a.replace(/[.,?]/g, ''))) ? COLORS.accent : COLORS.text, fontWeight: accentWords.some(a => word.includes(a.replace(/[.,?]/g, ''))) ? 600 : 500 }}>{word}&#8203;</span>
        ))}
      </div>
    ))}
  </div>
);

const ShotComponent: React.FC<{ shot: ShotData; span: typeof SPANS[0]; localFrame: number; isTransitionIn: boolean; transitionProgress: number }> = ({
  shot, span, localFrame, isTransitionIn, transitionProgress,
}) => {
  const textRise = useTextEntrance(span.from);
  const artRise = useArtEntrance(span.from);
  const breathe = useBreathe();
  const opacity = isTransitionIn ? transitionProgress : 1;

  // Accent highlight triggers (approximate frames from motion-spec)
  const accentTriggers: Record<string, number[]> = {
    s1: [15, 45], s2: [18, 48, 88], s3: [15, 55], s4: [22, 82],
    s5: [35], s6: [20, 85], s7: [16, 76, 136], s8: [17, 77], s9: [20, 90],
  };

  return (
    <AbsoluteFill style={{ background: COLORS.base, color: COLORS.text, opacity }}>
      <div style={{ position: 'absolute', top: 265, left: LAYOUT.safeMarginHorizontal, right: LAYOUT.safeMarginHorizontal, textAlign: 'center', fontSize: 79, fontWeight: 850, letterSpacing: -2, lineHeight: 1.2, transform: `translateY(${textRise}px)`, fontFamily: TYPOGRAPHY.heading.fontFamily }}>
        {shot.heading.split(' / ').map((line, i) => (
          <div key={i} style={{ color: i > 0 ? COLORS.accent : COLORS.text }}>{line}</div>
        ))}
      </div>

      <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%', transform: `translateY(${artRise}px) scale(${breathe})`, transformOrigin: '540px 960px' }}>
        {shot.motif === 'typing' && (
          <>
            <Human x={420} y={965} accent />
            <DeleteKeyGlow x={820} y={1180} intensity={0.8} />
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
            <CrackPath progress={Math.min(localFrame / 15, 1)} />
          </>
        )}
        {shot.motif === 'montage' && (
          <>
            <Human x={420} y={965} />
            <MirrorReflection x={680} y={1010} offset={localFrame > 132 ? 20 : 0} tint={localFrame > 132 ? 1 : 0} />
          </>
        )}
        {shot.motif === 'question' && (
          <QuestionMarkBuild x={540} y={830} progress={Math.min(localFrame / 50, 1)} totalSyllables={10} />
        )}
        {shot.motif === 'eye' && (
          <>
            <ellipse cx={540} cy={830} rx={180} ry={80} stroke={COLORS.text} strokeWidth={6} fill="none" />
            <ellipse cx={540} cy={830} rx={60} ry={60} fill={COLORS.base} />
            <text x={540} y={840} textAnchor="middle" fontSize={80} fill={COLORS.accent} fontFamily={TYPOGRAPHY.heading.fontFamily} fontWeight={900}>?</text>
          </>
        )}
        {shot.motif === 'hands' && (
          <LightParticles x={540} y={900} count={16} frame={localFrame} maxFrame={218} />
        )}
        {shot.motif === 'two-figures' && (
          <>
            <Human x={interpolate(localFrame, [0, 198], [365, 480])} y={950} />
            <Human x={interpolate(localFrame, [0, 198], [735, 620])} y={950} accent />
          </>
        )}
        {shot.motif === 'expanding' && (
          <>
            <Human x={420} y={965} accent />
            <ExpandingGlow x={540} y={960} radius={interpolate(localFrame, [0, 176], [0, 400])} />
          </>
        )}
      </svg>

      <Caption chunks={shot.captionChunks} accentWords={shot.accentWords} y={LAYOUT.captionTop} />

      <div style={{ position: 'absolute', bottom: 340, left: 110, right: 110, height: 2, background: '#252525' }} />
      <div style={{ position: 'absolute', bottom: 268, textAlign: 'center', width: '100%', fontSize: 30, color: COLORS.muted }}>BẠN ĐANG TIẾC ĐIỀU GÌ?</div>
    </AbsoluteFill>
  );
};

export const Scene: React.FC<{ index: number }> = ({ index }) => {
  const f = useCurrentFrame();
  const span = SPANS[index];
  const shot = SHOTS[index];
  const localFrame = f - span.from;
  const isTransitionIn = localFrame < MOTION.crossDissolve.duration && index > 0 && [3, 5, 6, 7].includes(index);
  const transitionProgress = isTransitionIn ? interpolate(localFrame, [0, MOTION.crossDissolve.duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

  return <ShotComponent shot={shot} span={span} localFrame={localFrame} isTransitionIn={isTransitionIn} transitionProgress={transitionProgress} />;
};