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
  HEAD,
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
  GRID,
  RED,
  SCREEN,
  LABEL,
  Feast,
  QuestionBurst,
  PhoneMock,
  Handwrite,
} from './kit';

export const HOOK_DUR = 129;
export const TURN_DUR = 234;
export const END_DUR = 198;

// ------------------------------------------------------------------ s1 HOOK
export const ProtoHook: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = mix(1, 1.05, ramp(f, 0, HOOK_DUR, E_SINE));
  // ruler slides in from left — start at 0 so it's never cut off
  const rulerX = mix(120, 140, ramp(f, 0, 24, E_SINE));
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
        <Ruler
          x={rulerX}
          y={500}
          width={700}
          angle={-12}
          ticks={[18, 22, 25, 30]}
          activeTick={30}
          enter={0}
        />
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
        <PencilChar x={130} y={1260} s={1.08} pose="hold" enter={0} />
        {/* HEADLINE: hook text */}
        <Headline
          lines={[
            [{t: 'Tuổi ba mươi, '}, {t: 'bị coi như một '}, {t: 'bản án', c: '#D23B2E'}, {t: '.'}],
          ]}
          top={170}
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
      {/* the Tết table is the pressure source, not an abstract oval */}
      <Feast x={150} y={510} scale={0.98} steam />
      <QuestionBurst x={285} y={675} />
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
      <div style={{position: 'absolute', left: 445, top: 120}}>
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
        top={1250}
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
        <PencilChar x={155} y={1180} s={1.02} pose="sit" enter={0} />
        {/* CARD: closing text — highlighter BEHIND text via z-order */}
        <div style={{position: 'absolute', left: 70, right: 70, top: 470, textAlign: 'center'}}>
          {/* highlighter sweep behind text */}
          <div
            style={{
              position: 'absolute',
              left: '2%',
              top: 8,
              width: `${sweepE * 96}%`,
              height: 94,
              background: HILITE,
              opacity: 0.72,
              borderRadius: 10,
              zIndex: 0,
            }}
          />
          <div
            style={{
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: 72,
              lineHeight: 1.2,
              color: INK,
              letterSpacing: 1,
              marginBottom: 20,
              position: 'relative',
              zIndex: 1,
              textShadow: `0 2px 0 ${PAPER}, 2px 0 0 ${PAPER}, -2px 0 0 ${PAPER}`,
            }}
          >
            ĐỪNG BIẾN TUỔI BA MƯƠI
            <br />
            THÀNH <span style={{color: '#B8A800'}}>BẢN ÁN</span>
          </div>
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
    {id: 's1', label: 'HOOK', desc: 'nhìn 30 · bàn giấy', sketch: 'ruler', pose: 'look'},
    {id: 's2', label: 'TỘI DANH', desc: 'viết 3 dòng đỏ · giấy', sketch: 'red', pose: 'write'},
    {id: 's3a', label: 'THƯỚC VẠCH', desc: 'né vạch · thước', sketch: 'ruler', pose: 'look'},
    {id: 's3b', label: 'DÀI THÊM', desc: 'giấy dồn · góc bàn', sketch: 'paper', pose: 'hunch'},
    {id: 's4a', label: 'TẾT CỖ', desc: 'gắp mâm cỗ · hơi nóng', sketch: 'feast', pose: 'eat'},
    {
      id: 's4b',
      label: 'HỎI DỒN',
      desc: 'đũa khựng · thái dương',
      sketch: 'questions',
      pose: 'temple',
    },
    {id: 's5a', label: 'FREEZE', desc: 'tay + bút treo · giấy', sketch: 'pen', pose: 'hold'},
    {id: 's5b', label: 'BÚT RƠI', desc: 'buông tay · dấu hỏi', sketch: 'pen', pose: 'drop'},
    {id: 's6a', label: 'ĐỎ DỞ', desc: 'dừng giữa chữ · giấy', sketch: 'red', pose: 'write'},
    {id: 's6b', label: 'MACRO', desc: 'quỳ sát nét chì · giấy', sketch: 'macro', pose: 'kneel'},
    {id: 's7a', label: 'FEED', desc: 'mặt hắt màn · điện thoại', sketch: 'phone', pose: 'phone'},
    {id: 's7b', label: 'MÀN TẮT', desc: 'ôm máy tối · phòng', sketch: 'phoneoff', pose: 'sit'},
    {id: 's8', label: 'SAO KÊ', desc: 'kéo 4 hướng · lương', sketch: 'arrows', pose: 'pull'},
    {id: 's9a', label: 'RÚT HẾT', desc: 'mâm trống · rời bàn', sketch: 'empty', pose: 'leave'},
    {id: 's9b', label: 'CLIMAX', desc: 'ôm gối · tự hỏi', sketch: 'glow', pose: 'sit'},
    {id: 's10', label: 'ĐÓNG', desc: 'đứng cạnh thước · vàng', sketch: 'hilite', pose: 'stand'},
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
        Storyboard · 16 beats · 9:16
      </div>
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 140,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        {shots.map((s) => (
          <div
            key={s.id}
            style={{
              background: 'rgba(175,214,211,0.2)',
              border: `2px solid ${INK}`,
              borderRadius: 12,
              padding: '12px 10px 14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                height: 168,
                marginBottom: 8,
                borderRadius: 8,
                background: 'rgba(240,243,240,0.72)',
                border: `2px solid ${INK}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {s.sketch === 'ruler' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 18,
                    right: 18,
                    top: 42,
                    height: 8,
                    background: '#D8D2BF',
                    border: `1px solid ${INK}`,
                    transform: 'rotate(-7deg)',
                  }}
                />
              )}
              {(s.pose === 'look' ||
                s.pose === 'stand' ||
                s.pose === 'write' ||
                s.pose === 'hunch' ||
                s.pose === 'hold' ||
                s.pose === 'drop' ||
                s.pose === 'temple' ||
                s.pose === 'kneel' ||
                s.pose === 'pull' ||
                s.pose === 'leave' ||
                s.pose === 'eat' ||
                s.pose === 'phone' ||
                s.pose === 'sit') && (
                <div
                  style={{
                    position: 'absolute',
                    left: 24,
                    bottom: 5,
                    width: 30,
                    height: 58,
                    borderRadius: 10,
                    background: INK,
                    boxShadow: '26px 0 0 ' + INK,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: -25,
                      width: 46,
                      height: 34,
                      borderRadius: '50%',
                      background: '#5A636B',
                    }}
                  />
                </div>
              )}
              {s.sketch === 'red' && (
                <div
                  style={{
                    fontFamily: HAND,
                    fontSize: 26,
                    color: RED,
                    lineHeight: 1.1,
                    marginTop: 4,
                  }}
                >
                  ✎ — — —
                </div>
              )}
              {s.sketch === 'questions' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 44,
                      top: 82,
                      width: 150,
                      height: 46,
                      borderRadius: '50%',
                      border: `3px solid ${INK}`,
                      background: '#D6CDBB',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 64,
                      top: 18,
                      fontFamily: HAND,
                      fontSize: 22,
                      color: RED,
                    }}
                  >
                    ?
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 124,
                      top: 8,
                      fontFamily: HAND,
                      fontSize: 22,
                      color: RED,
                    }}
                  >
                    ?
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 182,
                      top: 35,
                      fontFamily: HAND,
                      fontSize: 22,
                      color: RED,
                    }}
                  >
                    ?
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 81,
                      top: 58,
                      width: 4,
                      height: 70,
                      background: INK,
                      transform: 'rotate(-22deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 109,
                      top: 58,
                      width: 4,
                      height: 70,
                      background: INK,
                      transform: 'rotate(19deg)',
                    }}
                  />
                </>
              )}
              {s.sketch === 'paper' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 54,
                    top: 24,
                    width: 110,
                    height: 35,
                    border: `2px solid ${INK}`,
                    transform: 'rotate(-4deg)',
                  }}
                />
              )}
              {s.sketch === 'feast' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 48,
                    top: 88,
                    width: 180,
                    height: 58,
                    borderRadius: '50%',
                    background: '#D6CDBB',
                    border: `3px solid ${INK}`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 40,
                      top: -34,
                      width: 5,
                      height: 54,
                      background: LABEL,
                      transform: 'rotate(-12deg)',
                      boxShadow: '18px -4px 0 ' + LABEL + ' , 36px 0 0 ' + LABEL,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 36,
                      top: 15,
                      width: 42,
                      height: 27,
                      borderRadius: '50%',
                      background: '#B99E82',
                      border: `2px solid ${INK}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 100,
                      top: 8,
                      width: 46,
                      height: 30,
                      borderRadius: '50%',
                      background: '#8D927F',
                      border: `2px solid ${INK}`,
                    }}
                  />
                </div>
              )}
              {s.sketch === 'pen' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 104,
                    top: 26,
                    width: 8,
                    height: 45,
                    background: INK,
                    transform: 'rotate(25deg)',
                  }}
                />
              )}
              {s.sketch === 'macro' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 48,
                    right: 48,
                    top: 24,
                    height: 5,
                    background: INK,
                    transform: 'rotate(-5deg)',
                  }}
                />
              )}
              {s.sketch === 'phone' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 92,
                    top: 10,
                    width: 50,
                    height: 48,
                    borderRadius: 7,
                    background: SCREEN,
                    border: `2px solid ${INK}`,
                  }}
                />
              )}
              {s.sketch === 'phoneoff' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 92,
                    top: 10,
                    width: 50,
                    height: 72,
                    borderRadius: 7,
                    background: '#4A5258',
                    border: `2px solid ${INK}`,
                  }}
                />
              )}
              {s.sketch === 'arrows' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 80,
                      top: 82,
                      width: 150,
                      height: 24,
                      borderRadius: 5,
                      background: HILITE,
                      border: `2px solid ${INK}`,
                    }}
                  />
                  <div style={{fontFamily: CAP, fontSize: 27, color: RED, marginTop: 22}}>
                    ↗ ↘ ↗ ↘
                  </div>
                </>
              )}
              {s.sketch === 'empty' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 68,
                      top: 78,
                      width: 165,
                      height: 48,
                      borderRadius: '50%',
                      border: `3px solid ${GRID}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 104,
                      top: 30,
                      font: `700 26px ${HAND}`,
                      color: LABEL,
                    }}
                  >
                    ← →
                  </div>
                </>
              )}
              {s.sketch === 'glow' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 58,
                      right: 58,
                      top: 70,
                      height: 50,
                      background: HILITE,
                      opacity: 0.75,
                      borderRadius: 6,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 74,
                      top: 84,
                      fontFamily: HAND,
                      fontSize: 18,
                      whiteSpace: 'nowrap',
                      transform: 'scaleX(0.84)',
                      transformOrigin: 'left center',
                      color: INK,
                    }}
                  >
                    mình muốn gì?
                  </div>
                </>
              )}
              {s.sketch === 'hilite' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 30,
                    right: 30,
                    top: 42,
                    height: 10,
                    background: HILITE,
                    opacity: 0.8,
                    borderRadius: 4,
                  }}
                />
              )}
            </div>
            <div style={{fontFamily: CAP, fontWeight: 600, fontSize: 28, color: INK}}>{s.id}</div>
            <div
              style={{
                fontFamily: CAP,
                fontWeight: 600,
                fontSize: 22,
                color: '#D23B2E',
                marginTop: 4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: HAND,
                fontStyle: 'italic',
                fontSize: 20,
                color: INK,
                marginTop: 6,
              }}
            >
              {s.desc}
            </div>
          </div>
        ))}
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
