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
type MiniPose =
  | 'look'
  | 'stand'
  | 'write'
  | 'hunch'
  | 'hold'
  | 'drop'
  | 'temple'
  | 'kneel'
  | 'pull'
  | 'leave'
  | 'eat'
  | 'phone'
  | 'sit';

const MiniCharacter: React.FC<{pose: MiniPose}> = ({pose}) => {
  const arm =
    pose === 'temple'
      ? {left: 22, top: 20, transform: 'rotate(-58deg)'}
      : pose === 'phone'
        ? {left: 46, top: 44, transform: 'rotate(-38deg)'}
        : pose === 'pull'
          ? {left: 38, top: 42, transform: 'rotate(30deg)'}
          : pose === 'leave'
            ? {left: 42, top: 36, transform: 'rotate(68deg)'}
            : {left: 45, top: 38, transform: 'rotate(18deg)'};
  const bodyTransform =
    pose === 'leave'
      ? 'rotate(18deg)'
      : pose === 'hunch' || pose === 'pull'
        ? 'rotate(10deg)'
        : 'none';
  return (
    <div
      style={{
        position: 'absolute',
        left: 20,
        bottom: 3,
        width: 74,
        height: 105,
        transform: pose === 'kneel' || pose === 'pull' ? 'scale(.9)' : 'none',
        transformOrigin: 'bottom left',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: 0,
          width: 29,
          height: 29,
          borderRadius: '50%',
          background: '#59636A',
          border: `2px solid ${INK}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: 25,
          width: 42,
          height: 49,
          borderRadius: '18px 18px 12px 12px',
          background: '#4F575D',
          border: `2px solid ${INK}`,
          transform: bodyTransform,
        }}
      />
      <div
        style={{
          position: 'absolute',
          ...arm,
          width: 9,
          height: 42,
          borderRadius: 8,
          background: '#4F575D',
          border: `2px solid ${INK}`,
          transformOrigin: 'top center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 70,
          width: 10,
          height: 31,
          borderRadius: 8,
          background: '#4F575D',
          border: `2px solid ${INK}`,
          transform: pose === 'kneel' || pose === 'pull' ? 'rotate(70deg)' : 'rotate(8deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 54,
          top: 70,
          width: 10,
          height: 31,
          borderRadius: 8,
          background: '#4F575D',
          border: `2px solid ${INK}`,
          transform: pose === 'kneel' || pose === 'pull' ? 'rotate(-70deg)' : 'rotate(-8deg)',
        }}
      />
      {pose === 'temple' && (
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 18,
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: `2px solid ${RED}`,
            background: PAPER,
          }}
        />
      )}
      {pose === 'phone' && (
        <div
          style={{
            position: 'absolute',
            left: 51,
            top: 40,
            width: 18,
            height: 30,
            borderRadius: 4,
            background: SCREEN,
            border: `2px solid ${INK}`,
            boxShadow: `0 0 16px ${HILITE}`,
          }}
        />
      )}
    </div>
  );
};

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
      desc: 'chạm thái dương · mâm cỗ',
      sketch: 'questions',
      pose: 'temple',
    },
    {id: 's5a', label: 'FREEZE', desc: 'tay + bút treo · giấy', sketch: 'pen', pose: 'hold'},
    {id: 's5b', label: 'BÚT RƠI', desc: 'buông tay · dấu hỏi', sketch: 'pen', pose: 'drop'},
    {id: 's6a', label: 'ĐỎ DỞ', desc: 'dừng giữa chữ · giấy', sketch: 'red', pose: 'write'},
    {id: 's6b', label: 'MACRO', desc: 'quỳ sát nét chì · giấy', sketch: 'macro', pose: 'kneel'},
    {id: 's7a', label: 'FEED', desc: 'ngồi lướt · màn sáng', sketch: 'phone', pose: 'phone'},
    {id: 's7b', label: 'MÀN TẮT', desc: 'co người · phòng tối', sketch: 'phoneoff', pose: 'sit'},
    {id: 's8', label: 'SAO KÊ', desc: 'quỳ nhìn · 4 nơi đi', sketch: 'arrows', pose: 'pull'},
    {
      id: 's9a',
      label: 'RÚT HẾT',
      desc: 'bước khỏi bàn · giấy trắng',
      sketch: 'empty',
      pose: 'leave',
    },
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
              <MiniCharacter pose={s.pose as MiniPose} />
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
                  <div
                    style={{
                      position: 'absolute',
                      left: 48,
                      top: 72,
                      width: 132,
                      height: 32,
                      borderRadius: '50%',
                      border: `3px solid ${INK}`,
                      background: '#D6CDBB',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 53,
                      top: 20,
                      width: 3,
                      height: 48,
                      background: LABEL,
                      transform: 'rotate(-22deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 112,
                      top: 18,
                      width: 3,
                      height: 50,
                      background: LABEL,
                      transform: 'rotate(18deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 174,
                      top: 31,
                      width: 3,
                      height: 44,
                      background: LABEL,
                      transform: 'rotate(32deg)',
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
                    boxShadow: `0 0 20px ${HILITE}`,
                  }}
                >
                  <div style={{height: 8, margin: 6, borderRadius: 3, background: '#9CB9C7'}} />
                  <div style={{height: 8, margin: 6, borderRadius: 3, background: '#C4D7DE'}} />
                  <div style={{height: 8, margin: 6, borderRadius: 3, background: '#9CB9C7'}} />
                </div>
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
                    boxShadow: '0 0 0 18px rgba(62,69,75,.14)',
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
                  <div
                    style={{
                      position: 'absolute',
                      left: 96,
                      top: 102,
                      fontFamily: CAP,
                      fontSize: 27,
                      color: RED,
                    }}
                  >
                    ↗
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 132,
                      top: 102,
                      fontFamily: CAP,
                      fontSize: 27,
                      color: RED,
                    }}
                  >
                    ↘
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 168,
                      top: 102,
                      fontFamily: CAP,
                      fontSize: 27,
                      color: RED,
                    }}
                  >
                    ↗
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 204,
                      top: 102,
                      fontFamily: CAP,
                      fontSize: 27,
                      color: RED,
                    }}
                  >
                    ↘
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 98,
                      top: 62,
                      width: 134,
                      height: 4,
                      background: INK,
                      transform: 'rotate(12deg)',
                    }}
                  />
                </>
              )}
              {s.sketch === 'empty' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 74,
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
                      left: 126,
                      top: 20,
                      font: `700 26px ${HAND}`,
                      color: LABEL,
                    }}
                  >
                    →
                  </div>
                </>
              )}
              {s.sketch === 'glow' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 42,
                      right: 42,
                      top: 24,
                      height: 118,
                      background: HILITE,
                      opacity: 0.32,
                      borderRadius: '50%',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 74,
                      top: 75,
                      width: 86,
                      height: 35,
                      borderRadius: '50%',
                      background: '#59636A',
                      border: `2px solid ${INK}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 86,
                      top: 55,
                      width: 58,
                      height: 44,
                      borderRadius: '50% 50% 40% 40%',
                      background: '#4F575D',
                      border: `2px solid ${INK}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 48,
                      top: 30,
                      width: 150,
                      textAlign: 'center',
                      fontFamily: HAND,
                      fontSize: 16,
                      lineHeight: 1.15,
                      color: INK,
                    }}
                  >
                    Dạo này, bạn
                    <br />
                    sống có vui không?
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 60,
                      top: 122,
                      width: 132,
                      height: 6,
                      background: HILITE,
                      borderRadius: 4,
                      transform: 'rotate(-3deg)',
                    }}
                  />
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
