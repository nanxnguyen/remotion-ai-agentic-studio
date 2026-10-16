// Storyboard: one tile per KEY (16 keys, D12). Low-fi staging + label (key + card)
// + caption/headline position. Rendered via XDM-Board (16 frames) → tile 4x4.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FONT_CSS} from './fonts';
import {Brick, Person} from './People';
import {SignBoard, Wall} from './Wall';
import {C, F_BODY, F_HEAD} from './tokens';

const NIGHT = `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`;
const DAWN = `linear-gradient(180deg, ${C.dawnTop}, ${C.dawnBot})`;

const Label: React.FC<{id: string; card: string}> = ({id, card}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1080,
      background: 'rgba(6,8,30,0.85)',
      padding: '14px 28px',
      fontFamily: F_BODY,
      fontWeight: 700,
      fontSize: 30,
      color: C.lampWhite,
    }}
  >
    {id} · {card}
  </div>
);

const CapLine: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', bottom: 224, width: 1080, textAlign: 'center'}}>
    <span
      style={{
        background: 'rgba(10,15,61,0.85)',
        borderRadius: 24,
        padding: '16px 32px',
        fontFamily: F_BODY,
        fontWeight: 600,
        fontSize: 44,
        color: C.lampWhite,
      }}
    >
      {text}
    </span>
  </div>
);

const HeadLine: React.FC<{text: string; color?: string}> = ({text, color = C.lampWhite}) => (
  <div style={{position: 'absolute', top: 150, width: 1080, textAlign: 'center', fontFamily: F_HEAD, fontWeight: 800, fontSize: 72, lineHeight: 1.2, color, padding: '0 60px'}}>
    {text}
  </div>
);

const FaceBig: React.FC<{x: number; y: number; d?: number}> = ({x, y, d = 300}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <div style={{width: d, height: d, background: '#F6CFA8', border: `7px solid ${C.ink}`, borderRadius: '50%', position: 'relative'}}>
      <div style={{position: 'absolute', left: d * 0.24, top: d * 0.42, display: 'flex', gap: d * 0.18}}>
        {[0, 1].map((i) => (
          <div key={i} style={{width: d * 0.09, height: d * 0.045, borderRadius: 8, background: C.ink}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: d * 0.4, top: d * 0.68, width: d * 0.22, height: d * 0.04, borderRadius: 8, background: C.ink, transform: 'rotate(-7deg)'}} />
    </div>
  </div>
);

export const BoardFrame: React.FC<{k: string}> = ({k}) => {
  const frame = useCurrentFrame();
  void frame;
  const dawn = k === 's10' || k === 's11';
  return (
    <AbsoluteFill style={{background: dawn ? DAWN : NIGHT}}>
      <style>{FONT_CSS}</style>
      {k === 's1' && (
        <>
          <Label id="s1 HOOK" card="spotlight-hero-card" />
          <Wall x={120} y={830} cols={4} rows={8} seed={3} />
          <SignBoard x={220} y={1130} w={640} />
          <Person x={200} y={830} h={280} hat face="hope" />
          <HeadLine text="Bạn đang xây cuộc đời mình, hay cố chứng minh ai đó đã sai?" />
        </>
      )}
      {k === 's2a' && (
        <>
          <Label id="s2a Tết" card="overhead-tabletop-drop" />
          <div style={{position: 'absolute', left: 140, top: 500, width: 800, height: 700, background: '#3A2A5A', border: `5px solid ${C.ink}`, borderRadius: 40}} />
          <div style={{position: 'absolute', left: 390, top: 720, width: 300, height: 220, background: '#2E6B34', border: `5px solid ${C.ink}`, borderRadius: 20}} />
          <div style={{position: 'absolute', left: 180, top: 420, width: 200, height: 160, background: '#FF8FB3', borderRadius: '50%', border: `5px solid ${C.ink}`}} />
          <Person x={460} y={620} h={220} hat={false} face="calm" />
          <CapLine text="Mười tám tuổi, mâm cơm Tết…" />
        </>
      )}
      {k === 's2b' && (
        <>
          <Label id="s2b chê" card="crash-zoom-punch" />
          <div style={{position: 'absolute', left: -40, top: 700, width: 260, height: 120, background: '#E8B98A', border: `5px solid ${C.ink}`, borderRadius: 60, transform: 'rotate(-14deg)'}} />
          <FaceBig x={290} y={420} d={500} />
          <CapLine text="Có người bật cười: “Nó á? Còn lâu.”" />
        </>
      )}
      {k === 's3' && (
        <>
          <Label id="s3 bricks" card="deck-deal-flyin" />
          <Wall x={60} y={900} cols={4} rows={6} seed={4} />
          <Brick x={380} y={420} w={320} h={130} label="lương tháng đầu" />
          <Brick x={380} y={580} w={320} h={130} label="chiếc xe" />
          <Brick x={380} y={740} w={320} h={130} label="tấm bằng" />
          <Person x={150} y={1450} h={300} hat face="calm" />
          <CapLine text="…thành gạch xây về phía nhà người đó." />
        </>
      )}
      {k === 's4' && (
        <>
          <Label id="s4 story viewers" card="slide-spotlight-pan" />
          <div style={{position: 'absolute', left: 290, top: 480, width: 500, height: 800, background: '#0B0E33', border: `5px solid ${C.ink}`, borderRadius: 40}}>
            <div style={{fontFamily: F_BODY, fontSize: 40, color: C.lampWhite, textAlign: 'center', marginTop: 30}}>Người xem</div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 20, margin: '36px 50px'}}>
                <div style={{width: 70, height: 70, borderRadius: '50%', background: '#3A4188', border: `3px solid ${C.ink}`}} />
                <div style={{width: 220, height: 26, background: '#3A4188', borderRadius: 8}} />
              </div>
            ))}
            <div style={{position: 'absolute', right: 30, top: 30, fontFamily: F_BODY, fontSize: 30, color: C.labelGrey}}>minh hoạ</div>
            <div style={{position: 'absolute', left: 40, bottom: 40, fontFamily: F_BODY, fontSize: 34, color: '#FF6B6B'}}>pin 5%</div>
          </div>
          <Person x={420} y={1500} h={240} hat={false} face="down" />
          <CapLine text="…tìm đúng một cái tên." />
        </>
      )}
      {k === 's5a1' && (
        <>
          <Label id="s5a1 RE-HOOK" card="lead-word-zoom-assemble" />
          <HeadLine text="Họ có đang nhìn không?" />
          <Wall x={120} y={1150} cols={4} rows={5} seed={6} />
          <Person x={420} y={1150} h={280} hat face="calm" />
        </>
      )}
      {k === 's5a2' && (
        <>
          <Label id="s5a2 climb" card="crane-rise-reveal" />
          <Wall x={120} y={700} cols={4} rows={9} seed={6} />
          <div style={{position: 'absolute', left: 300, top: 480, width: 130, height: 500, opacity: 0.9}}>
            {[0, 1].map((s) => (
              <div key={s} style={{position: 'absolute', left: s * 104, top: 0, width: 22, height: 500, background: C.wood, border: `4px solid ${C.ink}`, borderRadius: 8}} />
            ))}
          </div>
          <Person x={270} y={900} h={280} hat face="calm" />
          <div style={{position: 'absolute', left: 0, top: 300, width: 1080, height: 300, background: 'linear-gradient(180deg, rgba(243,246,255,0.22), rgba(243,246,255,0))'}} />
          <CapLine text="…leo lên viên gạch cao nhất để xem." />
        </>
      )}
      {k === 's5b' && (
        <>
          <Label id="s5b interior" card="graze-face-tour" />
          <div style={{position: 'absolute', left: 240, top: 480, width: 600, height: 640, background: '#1A2060', border: `5px solid ${C.ink}`, borderRadius: 24}}>
            <div style={{position: 'absolute', left: 180, top: 120, width: 240, height: 200, background: C.ice, opacity: 0.85, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 230, bottom: 60, width: 140, height: 220, background: '#0A0F3D', borderRadius: 40}} />
            <div style={{position: 'absolute', left: 260, bottom: 260, width: 80, height: 80, background: '#0A0F3D', borderRadius: '50%'}} />
            {[0, 1].map((i) => (
              <div key={i} style={{position: 'absolute', left: 250 + i * 70, bottom: 330, width: 40, height: 150, borderRadius: 20, background: 'rgba(243,246,255,0.25)', filter: 'blur(8px)'}} />
            ))}
          </div>
          <div style={{position: 'absolute', top: 120, right: 48, maxWidth: 600, background: 'rgba(10,15,61,0.88)', borderRadius: 18, padding: '18px 26px', fontFamily: F_BODY, fontSize: 32, lineHeight: 1.4, color: C.lampWhite}}>Hiệu ứng spotlight (Gilovich…)</div>
          <CapLine text="Tối ấy, chẳng ai nhìn sang." />
        </>
      )}
      {k === 's6' && (
        <>
          <Label id="s6 turn" card="bullet-time-freeze-orbit" />
          <div style={{position: 'absolute', left: 500, top: 300, width: 80, height: 1200, background: C.boardBack, border: `5px solid ${C.ink}`}} />
          <div style={{position: 'absolute', left: 460, top: 600, width: 170, height: 44, background: C.tape, transform: 'rotate(-18deg)'}} />
          <Person x={380} y={1500} h={300} hat face="down" />
          <CapLine text="Phía sau bức tường: không cửa, không mái…" />
        </>
      )}
      {k === 's7a' && (
        <>
          <Label id="s7a split" card="before-after-slider-scrub" />
          <div style={{position: 'absolute', left: 0, top: 300, width: 540, height: 1100, background: C.sen, opacity: 0.85, borderRight: `8px solid ${C.ink}`}} />
          <div style={{position: 'absolute', left: 540, top: 300, width: 540, height: 1100, background: '#23264D'}} />
          <Person x={440} y={1450} h={320} hat face="down" />
          <CapLine text="…bức tường cho người khác nhìn." />
        </>
      )}
      {k === 's7b' && (
        <>
          <Label id="s7b chalk-blink" card="before-after-slider-scrub" />
          <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: '#23264D'}} />
          <div style={{position: 'absolute', left: 340, top: 700, width: 400, height: 420, border: `6px dashed ${C.jade}`, borderRadius: 16, opacity: 0.8}} />
          <div style={{position: 'absolute', left: 420, top: 820, width: 120, height: 160, border: `6px solid ${C.jade}`, borderRadius: 12}} />
          <Person x={420} y={1500} h={300} hat face="down" />
          <CapLine text="…chưa xây một căn phòng nào cho mình ở." />
        </>
      )}
      {k === 's8' && (
        <>
          <Label id="s8 05:00" card="freeze-annotate" />
          <Brick x={330} y={760} w={420} h={150} label="NÓ Á? CÒN LÂU." />
          {/* ladder + LOOSE brick pre-placed at its foot from frame 0 (A18) */}
          <div style={{position: 'absolute', left: 120, top: 980, width: 130, height: 420}}>
            {[0, 1].map((s) => (
              <div key={s} style={{position: 'absolute', left: s * 104, top: 0, width: 22, height: 420, background: C.wood, border: `4px solid ${C.ink}`, borderRadius: 8}} />
            ))}
          </div>
          <Brick x={90} y={1330} w={190} h={90} />
          <div style={{position: 'absolute', left: 560, top: 1080, width: 300, height: 200, background: '#0B0E33', border: `5px solid ${C.ink}`, borderRadius: 24, textAlign: 'center', fontFamily: F_HEAD, fontWeight: 800, fontSize: 72, color: C.lampWhite, lineHeight: '200px'}}>05:00</div>
          <Person x={330} y={1420} h={260} hat face="calm" />
          <CapLine text="Nó cũng có công." />
        </>
      )}
      {k === 's9a' && (
        <>
          <Label id="s9a blackout" card="aurora-bloom-bg-flip" />
          <div style={{position: 'absolute', left: 240, top: 420, width: 600, height: 500, background: '#10155A', border: `5px solid ${C.ink}`, borderRadius: 14}}>
            <div style={{position: 'absolute', left: 200, top: 120, width: 200, height: 220, background: '#232A7A', borderRadius: 10, border: `4px solid ${C.ink}`}} />
          </div>
          {/* foreground hand + brick (A15): the loose brick from s8, in hand */}
          <div style={{position: 'absolute', left: 300, top: 1050, width: 480, height: 220, background: `linear-gradient(180deg, ${C.senLight}, ${C.senDark})`, border: `6px solid ${C.ink}`, borderRadius: 14}} />
          <div style={{position: 'absolute', right: 140, top: 1120, width: 200, height: 260, background: C.shirt, border: `6px solid ${C.ink}`, borderRadius: 50}} />
          <Person x={440} y={1450} h={200} hat face="down" />
          <HeadLine text="Người từng xem thường bạn có thể đã quên." />
        </>
      )}
      {k === 's9b' && (
        <>
          <Label id="s9b paradox" card="aurora-bloom-bg-flip" />
          <div style={{position: 'absolute', left: 240, top: 700, width: 600, height: 500, background: '#10155A', border: `5px solid ${C.ink}`, borderRadius: 14}}>
            <div style={{position: 'absolute', left: 200, top: 120, width: 200, height: 220, background: '#232A7A', borderRadius: 10, border: `4px solid ${C.ink}`}} />
          </div>
          <SignBoard x={220} y={1050} w={640} />
          <Person x={460} y={1560} h={200} hat face="down" />
          <HeadLine text="Còn bạn vẫn sống để họ phải tiếc." />
        </>
      )}
      {k === 's10' && (
        <>
          <Label id="s10 brick down" card="draw-svg-trace" />
          <div style={{position: 'absolute', left: 240, top: 900, width: 600, height: 420, border: `7px solid ${C.jade}`, borderRadius: 14}} />
          <Brick x={430} y={1250} w={220} h={100} />
          <Person x={420} y={1250} h={300} hat face="hope" />
          <CapLine text="…bạn đặt xuống đất." />
        </>
      )}
      {k === 's11' && (
        <>
          <Label id="s11 hold" card="paper-title-card" />
          <div style={{position: 'absolute', left: 240, top: 900, width: 600, height: 420, border: `7px solid ${C.jade}`, borderRadius: 14}} />
          <Person x={450} y={1350} h={300} hat={false} face="hope" />
          <HeadLine text="Viên gạch tiếp theo, bạn đặt cho ai?" color={C.ink} />
        </>
      )}
    </AbsoluteFill>
  );
};
