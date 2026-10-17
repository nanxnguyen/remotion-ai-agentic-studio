// Prototype scenes for dung-bien-tuoi-30-thanh-ban-an (design-agent Phase 3).
// Style: graphite pencil on grid paper, red pen = measuring, highlighter = self-claimed.
// Hook grammar: ruler slides in, red circle draws around 30 (stroke-dashoffset).
// Turn grammar: freeze 0.4s, pen drops "cộp", lamp glow contracts.
// End grammar: highlighter sweep 0.6s, push-in 1.00→1.03, still 2.4s silence.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, mix, ramp} from './motion';
import {
  CAP,
  DBTFonts,
  GridPaper,
  HAND,
  HILITE,
  Headline,
  INK,
  LampGlow,
  PAPER,
  RedPenLines,
  Ruler,
  PencilChar,
  Finish,
  DbtLine,
} from './kit';

export const HOOK_DUR = 129;
export const TURN_DUR = 234;
export const END_DUR = 198;

// ------------------------------------------------------------------ s1 HOOK
export const ProtoHook: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = mix(1, 1.05, ramp(f, 0, HOOK_DUR, E_SINE));
  // ruler slides in from left — start at 0 so it's never cut off
  const rulerX = mix(0, 140, ramp(f, 0, 24, E_SINE));
  // red circle draws around tick 30 (stroke-dashoffset effect via opacity)
  const circleE = ramp(f, 30, 36, E_SINE);
  // lamp glow
  const lampE = 0.2 + 0.15 * ramp(f, 20, 40, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
        <GridPaper />
        <LampGlow opacity={lampE} x={100} y={50} />
        {/* ruler with ticks 18/22/25/30 — narrower to fit frame */}
        <Ruler x={rulerX} y={500} width={700} angle={-12} ticks={[18, 22, 25, 30]} activeTick={30} enter={0} />
        {/* red circle around 30 — stroke-dashoffset simulation */}
        <div
          style={{
            position: 'absolute',
            left: rulerX + 540,
            top: 460,
            width: 70,
            height: 70,
            borderRadius: '50%',
            border: `4px solid #D23B2E`,
            opacity: circleE,
            transform: `scale(${0.8 + 0.2 * circleE})`,
          }}
        />
        {/* character looking up at 30 */}
        <PencilChar x={200} y={900} s={1.2} pose="hold" enter={10} />
        {/* HEADLINE: hook text */}
        <Headline
          lines={[
            [{t: 'Tuổi ba mươi, '}, {t: 'bị coi như một '}, {t: 'bản án', c: '#D23B2E'}, {t: '.'}],
          ]}
          top={200}
          enter={0}
        />
        {/* wet ink dot */}
        <div
          style={{
            position: 'absolute',
            left: rulerX + 560,
            top: 480,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#D23B2E',
            opacity: 0.6 * circleE,
          }}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ s5a/s5b TURN
export const ProtoTurn: React.FC = () => {
  const f = useCurrentFrame();
  // freeze 0.4s (12 frames) at start
  const freezeE = ramp(f, 0, 12, E_SINE);
  // pen drops after freeze
  const penDrop = ramp(f, 14, 30, E_SINE);
  const penY = mix(200, 700, penDrop);
  // lamp glow contracts
  const lampContract = 1 - 0.6 * ramp(f, 14, 40, E_SINE);
  // red lines flash
  const flashE = ramp(f, 12, 6, E_SINE) * (1 - ramp(f, 30, 10, E_SINE));
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.3} />
      <LampGlow opacity={0.4 * lampContract} x={100} y={50} />
      {/* three red crime lines — flash bright */}
      <RedPenLines
        lines={['chưa nhà', 'chưa kết hôn', 'chưa có địa vị']}
        x={150}
        y={250}
        enter={0}
      />
      {/* flash overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#D23B2E',
          opacity: flashE * 0.15,
          pointerEvents: 'none',
        }}
      />
      {/* frozen hand with pen */}
      <div style={{position: 'absolute', left: 400, top: 150}}>
        <PencilChar x={0} y={0} s={1} pose="hold" enter={0} />
        {/* pen in hand */}
        <div
          style={{
            position: 'absolute',
            left: 105,
            top: 130,
            width: 8,
            height: 60,
            background: INK,
            borderRadius: 4,
            transform: 'rotate(-30deg)',
            transformOrigin: 'top center',
          }}
        />
      </div>
      {/* falling pen */}
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: penY,
          width: 8,
          height: 60,
          background: INK,
          borderRadius: 4,
          transform: 'rotate(15deg)',
          opacity: penDrop > 0 ? 1 : 0,
        }}
      />
      {/* question mark — half-written */}
      <div
        style={{
          position: 'absolute',
          left: 600,
          top: 650,
          fontFamily: HAND,
          fontStyle: 'italic',
          fontSize: 120,
          color: '#D23B2E',
          opacity: ramp(f, 50, 20, E_SINE),
        }}
      >
        ?
      </div>
      {/* HEADLINE: re-hook text (user mandatory line) — moved up to avoid cutoff */}
      <Headline
        lines={[
          [{t: 'Bạn chưa có nhà, chưa kết hôn.', b: true}],
          [{t: 'Nhưng ai đã quy định hôm nay bạn phải có đủ?', c: '#D23B2E'}],
        ]}
        top={1100}
        enter={20}
      />
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ s10 END
export const ProtoEnd: React.FC = () => {
  const f = useCurrentFrame();
  // highlighter sweep 0.6s (18 frames)
  const sweepE = ramp(f, 0, 18, E_SINE);
  // push-in after sweep
  const pushIn = mix(1, 1.03, ramp(f, 18, 30, E_SINE));
  // lamp glow warm
  const lampWarm = 0.3 + 0.2 * ramp(f, 10, 40, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${pushIn})`}}>
        <GridPaper />
        <LampGlow opacity={lampWarm} x={100} y={50} />
        {/* ruler lying crooked at edge — no one holds it, positioned to fit */}
        <Ruler x={350} y={1400} width={550} angle={8} ticks={[18, 22, 25, 30]} enter={0} />
        {/* character small in wide frame */}
        <PencilChar x={100} y={1200} s={0.8} pose="sit" enter={10} />
        {/* CARD: closing text — highlighter BEHIND text via z-order */}
        <div style={{position: 'absolute', left: 70, right: 70, top: 500, textAlign: 'center'}}>
          {/* highlighter sweep behind text */}
          <div
            style={{
              position: 'absolute',
              left: '5%',
              right: '5%',
              top: -10,
              height: 80,
              background: `linear-gradient(90deg, transparent 0%, ${HILITE} ${sweepE * 100}%, transparent 100%)`,
              opacity: sweepE * 0.7,
              borderRadius: 8,
              zIndex: 0,
            }}
          />
          <div
            style={{
              fontFamily: CAP,
              fontWeight: 600,
              fontSize: 40,
              color: INK,
              letterSpacing: 2,
              marginBottom: 20,
              position: 'relative',
              zIndex: 1,
              textShadow: '0 1px 8px rgba(240,243,240,0.9)',
            }}
          >
            ĐỪNG BIẾN TUỔI BA MƯƠI THÀNH BẢN ÁN
          </div>
        </div>
        {/* "BẢN ÁN" in highlighter yellow */}
        <div
          style={{
            position: 'absolute',
            left: 70,
            right: 70,
            top: 620,
            textAlign: 'center',
            fontFamily: CAP,
            fontWeight: 600,
            fontSize: 36,
            color: '#B8A800',
            opacity: sweepE,
            textShadow: '0 1px 8px rgba(240,243,240,0.9)',
          }}
        >
          BẢN ÁN
        </div>
        {/* wind blowing paper edge in silence */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 4,
            background: INK,
            opacity: 0.3 + 0.1 * Math.sin(f / 20),
          }}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ Storyboard tile
export const BoardTile: React.FC = () => {
  const shots = [
    {id: 's1', label: 'HOOK', desc: 'Thước + khoanh tròn 30'},
    {id: 's2', label: 'Tội danh', desc: '3 dòng đỏ'},
    {id: 's3a', label: 'Thước vạch', desc: '18/22/25/30 lách'},
    {id: 's3b', label: 'Dài thêm', desc: 'Tràn khỏi giấy'},
    {id: 's4a', label: 'Tết cỗ', desc: 'Mâm cỗ bốc khói'},
    {id: 's4b', label: 'Hỏi dồn', desc: '3 câu hỏi'},
    {id: 's5a', label: 'FREEZE', desc: '0.4s đóng băng'},
    {id: 's5b', label: 'Bút rơi', desc: 'Câu hỏi user'},
    {id: 's6a', label: 'Đỏ dở', desc: 'Viết "thất bại"'},
    {id: 's6b', label: 'MACRO', desc: 'Nét chì kẻ tay'},
    {id: 's7a', label: 'Feed', desc: 'Lướt bạn bè'},
    {id: 's7b', label: 'Màn tắt', desc: 'Đi nhầm đường'},
    {id: 's8', label: 'Sao kê', desc: 'Mũi tên kéo tiền'},
    {id: 's9a', label: 'Rút hết', desc: 'Chỉ còn giấy'},
    {id: 's9b', label: 'CLIMAX', desc: 'Câu hỏi vắng mặt'},
    {id: 's10', label: 'Đóng', desc: 'Dạ quang + lặng'},
  ];
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 60,
          fontFamily: CAP,
          fontWeight: 600,
          fontSize: 48,
          color: INK,
          textAlign: 'center',
        }}
      >
        Storyboard — dung-bien-tuoi-30-thanh-ban-an
      </div>
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 140,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {shots.map((s) => (
          <div
            key={s.id}
            style={{
              background: 'rgba(175,214,211,0.2)',
              border: `2px solid ${INK}`,
              borderRadius: 12,
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: CAP, fontWeight: 600, fontSize: 28, color: INK}}>{s.id}</div>
            <div style={{fontFamily: CAP, fontWeight: 600, fontSize: 22, color: '#D23B2E', marginTop: 4}}>
              {s.label}
            </div>
            <div style={{fontFamily: HAND, fontStyle: 'italic', fontSize: 20, color: INK, marginTop: 6}}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
