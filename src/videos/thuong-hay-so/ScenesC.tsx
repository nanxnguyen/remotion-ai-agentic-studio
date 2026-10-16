// Scenes C — thuong-hay-so-bat-dau-lai (scene-agent-3).
// s7 turn hội tụ (before-after-slider-scrub, chia trên/dưới) · s8 reset ngưỡng
// (tension pull-back-isolation) · s9 3 inserts (scan-bracket-sweep) · s10 F2 + lặng
// (paper-title-card). 9:16 1080x1920 @30fps, frame-driven, easeInOutSine only.
// Mỗi scene: local f=0 tại đầu shot. Durations khớp timeline.ts SHOTS.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, bezier, mix, ramp} from './lib/motion';
import {
  BLUE,
  BLUE_DEEP,
  Bowl,
  CAP,
  Cooker,
  Finish,
  GREEN,
  GREEN_LT,
  HAIR,
  HEAD,
  HandChop,
  INK,
  Led,
  MinhHoa,
  PAPER,
  PILL,
  RED,
  SHIRT,
  SKIN,
  SOUP,
  STICK1,
  STICK2,
  ThoFonts,
  ThoLine,
  TileWall,
} from './kit';

// ---------------------------------------------------------------- durations
export const S7_DUR = 218; // s7a 153 + gap 9 + s7b 56
export const S8_DUR = 161;
export const S9_DUR = 202; // 3 inserts x ~67f
export const S10_DUR = 189; // voice 132 + lặng thuần 57

// ------------------------------------------------------- workbench defaults
export const S7_DEFAULTS = {
  tagWarm: 'vì thương',
  tagCold: 'vì sợ',
  lineA: 'Cái bát vẫn y hệt nhau.',
  accentA: 'y hệt nhau',
  lineB: 'Có khi, mình cũng không biết.',
};
export const S8_DEFAULTS = {
  line: 'Mình đứng ở cửa bếp, nhìn lâu hơn mọi tối.',
  accent: 'nhìn lâu hơn mọi tối',
};
export const S9_DEFAULTS = {
  msg: 'Xin lỗi nha.',
  stamp: '· 00:47',
  oldQ: 'Tối nay ăn gì?',
  oldA: 'Gì cũng được.',
  newLine: 'Lại \u2018gì cũng được\u2019.',
  cap1: 'Cãi xong, lần nào người ấy cũng nhắn trước.',
  cap2: 'Có những chuyện, ba năm rồi vẫn cãi đúng một câu. Và vẫn ghét hành.',
};
export const S10_DEFAULTS = {size: 66, top: 175};

// ================================================================== S7 TURN
// before-after-slider-scrub dọc: hai nửa trên/dưới CÙNG tay phải nâng bát sạch
// (bát không hành + đĩa hành cạnh bên mỗi nửa). Ở "y hệt nhau" grades hội tụ về
// neutral, seam tan, tag nghỉ 35%; s7b nhập làm một. Rod nằm đúng clip boundary.
const NEUTRAL_BG = 'linear-gradient(180deg, #5E556E, #57506B 60%, #4E485E)';
const NEUTRAL_TABLE = 'linear-gradient(180deg,#5A5468,#4C4658)';

const S7Half: React.FC<{warm: boolean; conv: number; tagOp: number; tag: string; lift: number}> = ({
  warm,
  conv,
  tagOp,
  tag,
  lift,
}) => {
  const wash = warm ? 0.34 * (1 - conv) + 0.04 : 0.38 * (1 - conv) + 0.04;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: warm ? 0 : 960,
        height: 960,
        overflow: 'hidden',
        background: warm
          ? 'linear-gradient(180deg, #6B4A5E, #8C5A6E 60%, #7A4E62)'
          : 'linear-gradient(180deg, #3A4666, #2E3A55 60%, #333E5E)',
      }}
    >
      <div style={{position: 'absolute', inset: 0, opacity: conv, background: NEUTRAL_BG}} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          bottom: 0,
          background: warm
            ? 'linear-gradient(180deg,#8C6A72,#6E4E58)'
            : 'linear-gradient(180deg,#46536E,#333E5A)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          height: 8,
          background: 'rgba(255,255,255,.35)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          bottom: 0,
          opacity: conv * 0.9,
          background: NEUTRAL_TABLE,
        }}
      />
      {/* tay NÂNG bát: cùng một group lift + tilt nhẹ, hai nửa giống hệt */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${-lift}px) rotate(${-lift * 0.04}deg)`,
          transformOrigin: '570px 400px',
        }}
      >
        <HandChop x={80} y={285} s={0.95} dir="right" strand={false} frozen />
        <Bowl x={400} y={285} s={1.0} scallions={0} steam={0.6} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 455 - lift,
          width: 150,
          height: 92,
          borderRadius: '50%',
          background: '#DDE3E1',
          boxShadow: '0 10px 30px rgba(10,8,20,.4)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 24 + i * 34,
              top: 28 + (i % 2) * 14,
              width: 44,
              height: 11,
              borderRadius: 6,
              background: i % 2 ? GREEN : GREEN_LT,
              transform: `rotate(${-14 + i * 12}deg)`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: warm ? `rgba(255,90,54,${wash})` : `rgba(157,180,255,${wash})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: warm ? 110 : 60,
          opacity: tagOp,
          fontFamily: CAP,
          fontWeight: 700,
          fontSize: 44,
          color: warm ? RED : BLUE_DEEP,
          background: PILL,
          padding: '12px 26px',
          borderRadius: 20,
        }}
      >
        {tag}
      </div>
    </div>
  );
};

export const SceneS7: React.FC<Partial<typeof S7_DEFAULTS>> = (p) => {
  const d = {...S7_DEFAULTS, ...p};
  const f = useCurrentFrame();
  const lift = mix(0, 46, ramp(f, 8, 70, E_SINE)); // động tác NÂNG, sine, không overshoot
  const conv = ramp(f, 72, 60, E_SINE); // "y hệt nhau" (+2.4s sfx-converge) → neutral ở f132
  const divOp = 1 - ramp(f, 100, 30, E_SINE); // seam tan hẳn ở f130
  const tagOp = (0.35 + 0.65 * (1 - ramp(f, 90, 60, E_SINE))) * (1 - ramp(f, 158, 10, E_SINE));
  const mergedOp = ramp(f, 150, 14, E_SINE); // s7b: hai nửa nhập làm một
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <ThoFonts />
      <S7Half warm tag={d.tagWarm} conv={conv} tagOp={tagOp} lift={lift} />
      <S7Half warm={false} tag={d.tagCold} conv={conv} tagOp={tagOp} lift={lift} />
      {/* seam-melt: cầu neutral qua y=960, tan đường chia còn sót */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 900,
          height: 120,
          opacity: conv,
          background:
            'linear-gradient(180deg, rgba(94,85,110,0), rgba(94,85,110,.9) 50%, rgba(94,85,110,0))',
        }}
      />
      {/* divider rod: nằm đúng clip boundary y=960 (lệch là穿帮) */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: 956,
          height: 8,
          borderRadius: 4,
          background: 'rgba(247,245,250,.85)',
          opacity: divOp,
          boxShadow: '0 0 24px rgba(247,245,250,.6)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 508,
          top: 928,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: PAPER,
          opacity: divOp,
          boxShadow: '0 0 30px rgba(247,245,250,.7)',
        }}
      />
      {/* s7b merged: một bát trung tính, nhãn đã biến mất */}
      <div style={{position: 'absolute', inset: 0, opacity: mergedOp, background: NEUTRAL_BG}}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1050,
            bottom: 0,
            background: NEUTRAL_TABLE,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1050,
            height: 8,
            background: 'rgba(255,255,255,.35)',
          }}
        />
        <div style={{position: 'absolute', inset: 0, transform: `translateY(${-lift * 0.4}px)`}}>
          <HandChop x={110} y={760} s={1.05} dir="right" strand={false} frozen />
          <Bowl x={430} y={760} s={1.1} scallions={0} steam={0.6} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 800,
            top: 950,
            width: 150,
            height: 92,
            borderRadius: '50%',
            background: '#DDE3E1',
            boxShadow: '0 10px 30px rgba(10,8,20,.4)',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 24 + i * 34,
                top: 28 + (i % 2) * 14,
                width: 44,
                height: 11,
                borderRadius: 6,
                background: i % 2 ? GREEN : GREEN_LT,
                transform: `rotate(${-14 + i * 12}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      {f < 158 ? (
        <ThoLine
          text={d.lineA}
          accent={d.accentA}
          accentColor={PAPER}
          size={56}
          enter={70}
          lift={70}
        />
      ) : (
        <ThoLine text={d.lineB} size={56} enter={164} lift={70} />
      )}
      <Finish />
    </AbsoluteFill>
  );
};

// ================================================================== S8 NGƯỠNG
// tension pull-back-isolation: pull-back chậm về khung cửa bếp (zoom-out sine) +
// rack focus vai mình → người ấy treo chìa; xong hold tĩnh ≥30f. Eye-insert
// close-up "nhìn lâu" hiện trong hold (t9). Sáng reset trung tính.
export const SceneS8: React.FC<Partial<typeof S8_DEFAULTS>> = (p) => {
  const d = {...S8_DEFAULTS, ...p};
  const f = useCurrentFrame();
  const zoom = mix(1.16, 1.0, ramp(f, 0, 110, E_SINE)); // pull-back, xong khóa máy
  const focusT = ramp(f, 36, 54, E_SINE); // rack focus: vai → người ấy
  const shoulderBlur = mix(1, 6, focusT);
  const partnerBlur = mix(7, 0, focusT);
  const hangK = ramp(f, 10, 34, E_SINE); // tay treo chìa lên móc
  const eyeOp = ramp(f, 104, 16, E_SINE); // close-up mắt trong hold
  return (
    <AbsoluteFill style={{background: '#14101E', overflow: 'hidden'}}>
      <ThoFonts />
      <div style={{position: 'absolute', inset: -70, transform: `scale(${zoom})`}}>
        {/* phòng trong: trung tính reset */}
        <div
          style={{
            position: 'absolute',
            left: 170,
            top: 120,
            right: 170,
            bottom: 120,
            borderRadius: 10,
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #4E4763, #5C5670 50%, #555065)',
          }}
        />
        {/* tường + móc chìa */}
        <div
          style={{
            position: 'absolute',
            left: 470,
            top: 700,
            width: 140,
            height: 200,
            borderRadius: 20,
            background: '#3A3448',
            filter: `blur(${partnerBlur}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 58,
              top: 30,
              width: 24,
              height: 60,
              borderRadius: 10,
              background: '#8E8AA0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 52,
              top: 86,
              width: 36,
              height: 44,
              borderRadius: '50%',
              border: '9px solid #C9BBA6',
            }}
          />
        </div>
        {/* người ấy: treo chìa xong quay lại */}
        <div
          style={{
            position: 'absolute',
            left: 620,
            top: 640,
            width: 300,
            height: 700,
            filter: `blur(${partnerBlur}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 220,
              width: 180,
              height: 330,
              borderRadius: 60,
              background: `linear-gradient(180deg, ${SHIRT}, #3E4A63)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 92,
              top: 100,
              width: 116,
              height: 126,
              borderRadius: 52,
              background: SKIN,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 76,
              top: 40,
              width: 150,
              height: 100,
              borderRadius: 46,
              background: HAIR,
            }}
          />
          {/* cánh tay treo chìa: từ thấp lên móc */}
          <div
            style={{
              position: 'absolute',
              left: mix(120, -60, hangK),
              top: mix(420, 130, hangK),
              width: 150,
              height: 52,
              borderRadius: 26,
              background: SKIN,
              transform: `rotate(${mix(30, -24, hangK)}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: mix(60, -116, hangK),
              top: mix(430, 96, hangK),
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '7px solid #C9BBA6',
              opacity: hangK,
            }}
          />
        </div>
        {/* vai mình foreground ở cửa bếp: mất nét dần khi focus sang người ấy */}
        <div
          style={{
            position: 'absolute',
            left: 30,
            bottom: 100,
            width: 360,
            height: 940,
            filter: `blur(${shoulderBlur}px)`,
            opacity: 0.97,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 55,
              top: 0,
              width: 230,
              height: 250,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #2E2838, #1D1826)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 270,
              width: 320,
              height: 670,
              borderRadius: 130,
              background: 'linear-gradient(180deg, #3B3550, #241F33)',
            }}
          />
        </div>
        {/* khung cửa bếp (frame-in-frame) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 170,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 170,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 56,
            background: '#0E0B16',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 170,
            top: 120,
            bottom: 56,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 170,
            top: 120,
            bottom: 56,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        {/* LED Giữ ấm thở suốt (thói quen không đổi) */}
        <Led x={880} y={1560} r={13} />
        {/* eye-insert close-up "nhìn lâu" (t9): mắt mình nhìn sang, hiện trong hold */}
        <div
          style={{
            position: 'absolute',
            left: (1080 - 560) / 2,
            top: 170,
            width: 560,
            height: 330,
            borderRadius: 34,
            overflow: 'hidden',
            opacity: eyeOp,
            background: 'linear-gradient(180deg, #2A2438, #1D1826)',
            border: '3px solid rgba(247,245,250,.4)',
            boxShadow: '0 24px 80px rgba(8,5,18,.7)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 50,
              top: 96,
              width: 460,
              height: 130,
              borderRadius: '50%',
              background: PAPER,
              boxShadow: 'inset 0 8px 24px rgba(30,25,45,.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 266,
              top: 94,
              width: 122,
              height: 122,
              borderRadius: '50%',
              background: '#23202B',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 300,
              top: 122,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: PAPER,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 50,
              top: 36,
              width: 460,
              height: 42,
              borderRadius: 21,
              background: '#171221',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 50,
              top: 248,
              fontFamily: CAP,
              fontWeight: 600,
              fontSize: 32,
              color: '#8C86A0',
            }}
          >
            nhìn lâu hơn mọi tối
          </div>
        </div>
      </div>
      <ThoLine text={d.line} accent={d.accent} accentColor={PAPER} size={56} enter={40} />
      <Finish />
    </AbsoluteFill>
  );
};

// ================================================================== S9 INSERTS
// scan-bracket-sweep x3: mỗi insert là 1 tài liệu TUYỆT ĐỐI TĨNH + bracket stagger
// + đúng 1 pass scan sine, quang帶裁 trong bbox. Insert 2 phóng to 1 dòng ≥64px;
// nhãn "minh hoạ" trên (1)(2); giữ timestamp "· 00:47" (E-T3, director đã quyết).
const S9_INS = 67; // ~2.2s mỗi insert
const SCAN = '157,180,255'; // BLUE lạnh trung tính

const Brackets: React.FC<{f: number; color?: string}> = ({f, color = PAPER}) => {
  const arms: {l: number; t: number; sx: number; sy: number}[] = [
    {l: -10, t: -10, sx: 1, sy: 1},
    {l: 0, t: -10, sx: -1, sy: 1},
    {l: 0, t: 0, sx: -1, sy: -1},
    {l: -10, t: 0, sx: 1, sy: -1},
  ];
  return (
    <>
      {arms.map((a, i) => {
        const k = ramp(f, i * 4, 10, E_SINE); // stagger依次, sine收位 (không overshoot)
        const off = (1 - k) * 14;
        const horiz = a.sx === 1 ? 'left' : 'right';
        const vert = a.sy === 1 ? 'top' : 'bottom';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              opacity: k,
              ...(horiz === 'left' ? {left: a.l - off} : {right: -10 - off}),
              ...(vert === 'top' ? {top: a.t - off} : {bottom: -10 - off}),
              width: 64,
              height: 64,
              borderLeft: a.sx === 1 ? `6px solid ${color}` : undefined,
              borderRight: a.sx === -1 ? `6px solid ${color}` : undefined,
              borderTop: a.sy === 1 ? `6px solid ${color}` : undefined,
              borderBottom: a.sy === -1 ? `6px solid ${color}` : undefined,
              borderTopLeftRadius: a.sx === 1 && a.sy === 1 ? 18 : 0,
              borderTopRightRadius: a.sx === -1 && a.sy === 1 ? 18 : 0,
              borderBottomLeftRadius: a.sx === 1 && a.sy === -1 ? 18 : 0,
              borderBottomRightRadius: a.sx === -1 && a.sy === -1 ? 18 : 0,
            }}
          />
        );
      })}
    </>
  );
};

const ScanBand: React.FC<{f: number; h: number}> = ({f, h}) => {
  const y = mix(0, h, ramp(f, 8, S9_INS - 16, E_SINE)); // 1 pass duy nhất, sine
  const op = ramp(f, 6, 8, E_SINE) * (1 - ramp(f, S9_INS - 10, 8, E_SINE));
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 26,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: op,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 0,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -70,
            height: 70,
            mixBlendMode: 'multiply',
            background: `linear-gradient(180deg, rgba(${SCAN},0) 0%, rgba(${SCAN},0.06) 55%, rgba(${SCAN},0.2) 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -9,
            height: 18,
            background: `linear-gradient(180deg, rgba(${SCAN},0) 0%, rgba(${SCAN},0.22) 50%, rgba(${SCAN},0) 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -1.5,
            height: 3,
            background: `linear-gradient(90deg, rgba(${SCAN},0.55) 0%, rgb(${SCAN}) 18%, #c3c8ff 50%, rgb(${SCAN}) 82%, rgba(${SCAN},0.55) 100%)`,
            boxShadow: `0 0 6px rgba(${SCAN},0.75)`,
          }}
        />
      </div>
    </div>
  );
};

const DocShell: React.FC<{f: number; h: number; children: React.ReactNode; dark?: boolean}> = ({
  f,
  h,
  children,
  dark,
}) => (
  <div style={{position: 'absolute', left: 150, right: 150, top: 460, height: h}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 26,
        overflow: 'hidden',
        background: dark
          ? 'linear-gradient(180deg, #2E3350, #262B45)'
          : 'linear-gradient(180deg, #FFFFFF, #FBFAF8)',
        border: `1px solid ${dark ? 'rgba(157,180,255,.35)' : 'rgba(20,22,28,.1)'}`,
        boxShadow: '0 30px 90px rgba(10,8,20,.45), inset 0 1px 0 rgba(255,255,255,.9)',
      }}
    >
      {children}
      <ScanBand f={f} h={h} />
    </div>
    <Brackets f={f} color={dark ? BLUE : PAPER} />
  </div>
);

export const SceneS9: React.FC<Partial<typeof S9_DEFAULTS>> = (p) => {
  const d = {...S9_DEFAULTS, ...p};
  const f = useCurrentFrame();
  const idx = Math.min(2, Math.floor(f / S9_INS));
  const lf = f - idx * S9_INS; // local frame trong insert
  const cross = (i: number) => {
    if (i === idx) return 1;
    if (i === idx - 1 && lf < 8) return 1 - lf / 8;
    return 0;
  };
  const DOC_H = 940;
  return (
    <AbsoluteFill style={{background: '#1E1B2E', overflow: 'hidden'}}>
      <ThoFonts />
      <TileWall dim={0.45} />
      {/* (1) điện thoại trong tay mình: tin người ấy + timestamp giữ nguyên */}
      <div style={{position: 'absolute', inset: 0, opacity: cross(0)}}>
        <DocShell f={lf} h={DOC_H}>
          <MinhHoa top={36} />
          <div
            style={{
              position: 'absolute',
              left: 225,
              top: 120,
              width: 330,
              height: 640,
              borderRadius: 44,
              background: '#23202B',
              boxShadow: '0 20px 60px rgba(10,8,20,.5)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 16,
                top: 16,
                right: 16,
                bottom: 16,
                borderRadius: 30,
                background: PAPER,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 48,
                top: 180,
                right: 48,
                borderRadius: 24,
                background: '#E4E7F5',
                padding: '28px 26px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: CAP,
                  fontWeight: 500,
                  fontSize: 54,
                  color: INK,
                  lineHeight: 1.35,
                }}
              >
                {d.msg}
              </div>
              <div
                style={{
                  fontFamily: CAP,
                  fontWeight: 500,
                  fontSize: 36,
                  color: '#8C86A0',
                  marginTop: 10,
                }}
              >
                {d.stamp}
              </div>
            </div>
          </div>
        </DocShell>
      </div>
      {/* (2) hai bong bóng cùng câu cãi: 1 dòng phóng to ≥64px */}
      <div style={{position: 'absolute', inset: 0, opacity: cross(1)}}>
        <DocShell f={lf} h={DOC_H} dark>
          <MinhHoa top={36} />
          <div style={{position: 'absolute', left: 60, right: 60, top: 130}}>
            <div
              style={{
                borderRadius: 24,
                background: 'rgba(247,245,250,.1)',
                padding: '26px 30px',
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  fontFamily: CAP,
                  fontWeight: 500,
                  fontSize: 44,
                  color: PAPER,
                  lineHeight: 1.4,
                }}
              >
                {d.oldQ}
              </div>
              <div
                style={{
                  fontFamily: CAP,
                  fontWeight: 500,
                  fontSize: 44,
                  color: BLUE,
                  lineHeight: 1.4,
                  marginTop: 12,
                  textAlign: 'right',
                }}
              >
                {d.oldA}
              </div>
            </div>
            <div
              style={{
                borderRadius: 24,
                background: 'rgba(157,180,255,.16)',
                border: '1px solid rgba(157,180,255,.4)',
                padding: '30px 30px',
              }}
            >
              <div
                style={{
                  fontFamily: CAP,
                  fontWeight: 600,
                  fontSize: 64,
                  color: PAPER,
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}
              >
                {d.newLine}
              </div>
            </div>
          </div>
        </DocShell>
      </div>
      {/* (3) tay người ấy gạt đĩa hành sang bên: tĩnh, trung tính */}
      <div style={{position: 'absolute', inset: 0, opacity: cross(2)}}>
        <DocShell f={lf} h={DOC_H}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 330,
              bottom: 0,
              background: 'linear-gradient(180deg, #C6CDD1, #9AA4A9)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 330,
              height: 8,
              background: 'rgba(255,255,255,.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 430,
              width: 260,
              height: 150,
              borderRadius: '50%',
              background: '#DDE3E1',
              boxShadow: '0 14px 36px rgba(20,15,35,.35)',
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 40 + i * 48,
                  top: 60 + (i % 2) * 20,
                  width: 62,
                  height: 15,
                  borderRadius: 8,
                  background: i % 2 ? GREEN : GREEN_LT,
                  transform: `rotate(${-14 + i * 11}deg)`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 390,
              width: 200,
              height: 110,
              borderRadius: 40,
              background: `linear-gradient(180deg, ${SKIN}, #C99A68)`,
              transform: 'rotate(-8deg)',
            }}
          />
        </DocShell>
      </div>
      {f < 100 ? (
        <ThoLine text={d.cap1} size={56} enter={0} />
      ) : (
        <ThoLine text={d.cap2} size={56} enter={102} />
      )}
      {/* grain chống banding trên grade (W4) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(24,16,40,.38) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// ================================================================== S10 F2
// paper-title-card trên scrim tối: F2 press từng từ (scale 1.28→1 + blur 7→0,
// stagger 4f/9f) — 0 accent (trắng hết, nhấn chỉ đậm), KHÔNG underline,
// KHÔNG fade-out (giữ suốt lặng). Push 1.00→1.04 rồi đứng im hẳn; lặng cuối chỉ
// LED thở. CẤM ghế đối diện + đèn. Hai màu ngang nhau: LED đỏ son + vệt tuýp lạnh.
const PRESS_EASE = bezier(0.2, 0.75, 0.3, 1);
const F2: {t: string; b?: boolean; br?: boolean}[] = [
  {t: 'Nếu'},
  {t: 'hôm nay'},
  {t: 'mới gặp', b: true},
  {t: 'người ấy,', br: true},
  {t: 'biết mọi điều'},
  {t: 'đang biết,', br: true},
  {t: 'bạn có'},
  {t: 'chọn', b: true},
  {t: 'bước vào'},
  {t: 'không?'},
];

export const SceneS10: React.FC<Partial<typeof S10_DEFAULTS>> = (p) => {
  const d = {...S10_DEFAULTS, ...p};
  const f = useCurrentFrame();
  const zoom = mix(1, 1.04, ramp(f, 0, 120, E_SINE)); // push-in rồi đứng im hẳn
  return (
    <AbsoluteFill style={{background: '#14101E', overflow: 'hidden'}}>
      <ThoFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
        <TileWall dim={0.55} />
        {/* phòng trong */}
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 130,
            right: 200,
            bottom: 40,
            overflow: 'hidden',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #463E5C, #6B6480 45%, #7E7890 75%, #6E6A80)',
            }}
          />
          {/* vệt tuýp lạnh trên tường, ngang tầm LED: màu lạnh ngang màu ấm */}
          <div
            style={{
              position: 'absolute',
              left: -20,
              top: 1290,
              width: 700,
              height: 120,
              background:
                'linear-gradient(90deg, rgba(157,180,255,.6), rgba(157,180,255,.3) 55%, rgba(157,180,255,0) 100%)',
              filter: 'blur(3px)',
            }}
          />
          {/* người ấy ngồi ăn, chưa ngẩng lên */}
          <div style={{position: 'absolute', left: 360, top: 790, width: 280, height: 530}}>
            <div
              style={{
                position: 'absolute',
                left: 55,
                top: 250,
                width: 170,
                height: 280,
                borderRadius: 55,
                background: `linear-gradient(180deg, ${SHIRT}, #3E4A63)`,
                transform: 'rotate(6deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 75,
                top: 130,
                width: 120,
                height: 130,
                borderRadius: 55,
                background: SKIN,
                opacity: 0.95,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 58,
                top: 55,
                width: 155,
                height: 115,
                borderRadius: 55,
                background: HAIR,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 330,
                width: 120,
                height: 44,
                borderRadius: 22,
                background: SKIN,
                transform: 'rotate(12deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 220,
                width: 130,
                height: 44,
                borderRadius: 22,
                background: SKIN,
                transform: 'rotate(-38deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 196,
                width: 8,
                height: 110,
                borderRadius: 4,
                background: STICK1,
                transform: 'rotate(18deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 162,
                top: 198,
                width: 8,
                height: 110,
                borderRadius: 4,
                background: STICK2,
                transform: 'rotate(22deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 105,
                top: 330,
                width: 130,
                height: 88,
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${SOUP}, #D9C8A8)`,
                border: '11px solid #DDE3E1',
                boxShadow: '0 14px 34px rgba(20,15,35,.4)',
              }}
            />
          </div>
          {/* đĩa hành nhặt ra cạnh bên */}
          <div
            style={{
              position: 'absolute',
              left: 210,
              top: 1180,
              width: 150,
              height: 90,
              borderRadius: '50%',
              background: '#DDE3E1',
              boxShadow: '0 10px 30px rgba(20,15,35,.3)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 25 + i * 34,
                  top: 28 + (i % 2) * 14,
                  width: 44,
                  height: 11,
                  borderRadius: 6,
                  background: i % 2 ? GREEN : GREEN_LT,
                  transform: `rotate(${-14 + i * 12}deg)`,
                }}
              />
            ))}
          </div>
          {/* "chỗ vẫn chờ": bát mình (còn hành) + đũa ngang + hơi bốc */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 1420,
              width: 800,
              height: 260,
              borderRadius: 30,
              background: 'linear-gradient(180deg, #8E979C, #6E777C)',
              boxShadow: '0 -14px 50px rgba(20,15,35,.35)',
            }}
          />
          <Bowl x={170} y={1360} s={1.0} scallions={5} sticksAcross steam={0.6} />
          <div
            style={{
              position: 'absolute',
              left: 310,
              top: 1240,
              width: 44,
              height: 130,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse, rgba(247,245,250,.45), rgba(247,245,250,0) 70%)',
              transform: `translateX(${Math.sin(f / 16) * 10}px)`,
            }}
          />
          {/* chấm LED đỏ son: ngang hàng với vệt lạnh */}
          <Cooker x={500} y={1440} s={0.6} steam={1} />
        </div>
        {/* khung cửa: jambs + lintel + threshold + bản lề (không ghế đối diện, không đèn) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 130,
            bottom: 60,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 200,
            top: 130,
            bottom: 60,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 130,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            right: 200,
            top: 130,
            height: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 60,
            background: '#0E0B16',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 60,
            height: 3,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        {[500, 1100].map((y) => (
          <div
            key={y}
            style={{
              position: 'absolute',
              left: 52,
              top: y,
              width: 26,
              height: 44,
              borderRadius: 8,
              background: '#3A3344',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,.7)',
            }}
          />
        ))}
        {/* lưng mình đứng yên ở ngưỡng */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            bottom: 120,
            width: 340,
            height: 900,
            filter: 'blur(3px)',
            opacity: 0.96,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 65,
              top: 0,
              width: 210,
              height: 235,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #2E2838, #1D1826)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 195,
              width: 100,
              height: 90,
              borderRadius: 24,
              background: '#241F33',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 130,
              top: 205,
              width: 80,
              height: 60,
              borderRadius: 18,
              background: '#171221',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 25,
              top: 260,
              width: 290,
              height: 640,
              borderRadius: 120,
              background: 'linear-gradient(180deg, #3B3550, #241F33)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 288,
              top: 280,
              width: 8,
              height: 580,
              borderRadius: 4,
              background: 'linear-gradient(180deg, rgba(157,180,255,.55), rgba(157,180,255,.05))',
            }}
          />
        </div>
      </div>
      {/* F2 press-in: giữ suốt shot + lặng, không fade-out */}
      <div style={{position: 'absolute', left: 150, right: 150, top: d.top, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 600,
            fontSize: d.size,
            lineHeight: 1.4,
            color: PAPER,
            textShadow: '0 3px 24px rgba(10,6,25,.9)',
          }}
        >
          {F2.map((w, i) => {
            const t = ramp(f, 8 + i * 4, 9, PRESS_EASE);
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    display: 'inline-block',
                    opacity: t,
                    transform: `scale(${1.28 - 0.28 * t})`,
                    filter: `blur(${(1 - t) * 7}px)`,
                    fontWeight: w.b ? 700 : 600,
                    marginRight: '0.26em',
                  }}
                >
                  {w.t}
                </span>
                {w.br && <br />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
