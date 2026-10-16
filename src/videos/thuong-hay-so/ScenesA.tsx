// ScenesA — thuong-hay-so-bat-dau-lai: s1 (hook cover), s2 (wide bếp), s3 (top-down nhặt hành).
// scene-agent-1 owned. Kit/timeline/lib are read-only — only kit exports + SHOTS + motion used.
//
// Props: {f0} — frame offset, default 0. Reel.tsx wraps each scene in a <Sequence>
// WITHOUT f0, so useCurrentFrame() is already shot-local and f = frame - 0.
// (If ever placed on the absolute timeline, pass f0={SHOTS.sX.from}.)

//
// Card → demo mapping (task-review.md §2, read-only, mechanics adapted, never imported):
//   s1 spotlight-hero-card  ← SpotlightHeroCard.tsx (pool sweep→lock+6% pulse→push→hold)
//   s2 depth-layer-moves    ← MultiplaneReal.tsx (0.35/0.7/1.4, bezier(0.45,0,0.18,1), stop+float)
//   s3 overhead-camera-moves← TiltReveal.tsx (tilt settle 0°, micro push 1→1.018, NO overshoot)
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, Grain, bezier, mix, ramp} from './lib/motion';
import {
  BLUE_DEEP,
  Bowl,
  Cooker,
  DuskWindow,
  Finish,
  GREEN,
  GREEN_LT,
  HandChop,
  Headline,
  INOX,
  RED,
  SLEEVE_MINH,
  STICK1,
  STICK2,
  ThoFonts,
  ThoLine,
  TileWall,
} from './kit';

// Asymmetric in-out drive, locked from MultiplaneReal (命门 — never soften).
const DRIVE_EASE = bezier(0.45, 0, 0.18, 1);

// Piecewise easeInOutSine interpolation over [frame, value] keys (deterministic).
const keysAt = (f: number, keys: Array<[number, number]>) => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, v0] = keys[i];
    const [f1, v1] = keys[i + 1];
    if (f <= f1) return mix(v0, v1, ramp(f, f0, Math.max(1, f1 - f0), E_SINE));
  }
  return keys[keys.length - 1][1];
};

// ---------------------------------------------------------------- s1 HOOK COVER (dur 114)
// F1 đủ từng chữ từ frame 0 (headline thay caption). Tay KitHand + bát đối diện,
// LED Giữ ấm thở 72f (kit Led), sợ = BLUE_DEEP text-only. Grade ấm dâng ở "thương",
// tuýp chớp 1 lần ở "sợ" (voice s1 ≈ 102f: "thương," ~f55 · "sợ" ~f75).
export const SceneS1: React.FC<{f0?: number}> = ({f0 = 0}) => {
  const f = useCurrentFrame() - f0;
  const zoom = mix(1, 1.03, ramp(f, 0, 114, E_SINE)); // push-in cả shot, sine, không overshoot
  // Pool: cooker → bát đối diện, lock f34 + pulse 6% (locked), sau đó chỉ thở.
  const poolX = mix(220, 540, ramp(f, 4, 30, E_SINE));
  const pulse = 1 + 0.06 * Math.max(0, 1 - Math.abs(f - 34) / 6);
  const breathe = 1 + 0.015 * Math.sin((f - 44) / 14) * ramp(f, 44, 20, E_SINE);
  const warm = 0.22 + 0.33 * ramp(f, 28, 32, E_SINE);
  const cold = ramp(f, 72, 5, E_SINE) * (1 - ramp(f, 77, 10, E_SINE)) * 0.4;
  return (
    <AbsoluteFill style={{background: '#E6ECE8', overflow: 'hidden'}}>
      <ThoFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
        <TileWall />
        <DuskWindow x={90} y={120} w={900} h={380} />
        {/* bg mờ: ghế + áo người ấy */}
        <div
          style={{
            position: 'absolute',
            left: 830,
            top: 590,
            width: 250,
            height: 380,
            filter: 'blur(2px)',
            opacity: 0.95,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 60,
              width: 26,
              height: 320,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 194,
              top: 60,
              width: 26,
              height: 320,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 30,
              width: 210,
              height: 44,
              borderRadius: 20,
              background: '#6B5744',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 45,
              top: 60,
              width: 160,
              height: 210,
              borderRadius: 46,
              background: 'linear-gradient(180deg,#7A6A9C,#4E4266)',
              transform: 'rotate(-4deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 70,
              width: 60,
              height: 90,
              background: '#3A3149',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 88,
              top: 62,
              width: 74,
              height: 20,
              borderRadius: 10,
              background: '#57496E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 180,
              top: 150,
              width: 56,
              height: 170,
              borderRadius: 26,
              background: 'linear-gradient(180deg,#655A80,#453D59)',
            }}
          />
        </div>
        {/* bàn */}
        <div
          style={{
            position: 'absolute',
            left: -60,
            right: -60,
            top: 1040,
            bottom: -60,
            background: `linear-gradient(180deg, #C6CDD1, ${INOX} 12%, #9AA4A9 100%)`,
            boxShadow: '0 -18px 60px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -60,
            right: -60,
            top: 1040,
            height: 10,
            background: 'rgba(255,255,255,.6)',
          }}
        />
        {/* đũa thừa + đĩa hành foreground */}
        <div
          style={{
            position: 'absolute',
            left: -30,
            top: 1700,
            width: 300,
            height: 13,
            borderRadius: 7,
            background: STICK2,
            transform: 'rotate(-7deg)',
            boxShadow: '0 6px 14px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -30,
            top: 1718,
            width: 300,
            height: 13,
            borderRadius: 7,
            background: STICK1,
            transform: 'rotate(-7deg)',
            boxShadow: '0 6px 14px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 690,
            top: 1640,
            width: 190,
            height: 110,
            borderRadius: '50%',
            background: '#DDE3E1',
            boxShadow: '0 14px 36px rgba(20,15,35,.35)',
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 712 + i * 34,
              top: 1668 + (i % 2) * 14,
              width: 46,
              height: 12,
              borderRadius: 6,
              background: i % 2 ? GREEN : GREEN_LT,
              transform: `rotate(${-14 + i * 11}deg)`,
              boxShadow: '0 2px 5px rgba(40,70,40,.4)',
            }}
          />
        ))}
        <Cooker x={20} y={1300} s={0.9} steam={1} />
        {/* hero: bát canh ĐỐI DIỆN + tay mình gắp */}
        <Bowl x={370} y={1140} s={1.35} scallions={4} steam={0.7} />
        <Bowl x={150} y={1560} s={1.0} scallions={5} sticksAcross steam={0.5} />
        <HandChop x={600} y={740} s={1.2} angle={22} strand />
        {/* pool ấm lock trên bát hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(${(520 * pulse * breathe).toFixed(1)}px ${(480 * pulse * breathe).toFixed(1)}px at ${poolX}px 1230px, rgba(255,122,72,${(warm * pulse).toFixed(3)}), rgba(255,122,72,0) 70%)`,
          }}
        />
        {/* tuýp chớp lạnh 1 lần ở "sợ" */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(180deg, rgba(157,180,255,${cold.toFixed(3)}), rgba(157,180,255,${(cold * 0.4).toFixed(3)}) 60%, rgba(157,180,255,0) 100%)`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 130,
          height: 360,
          borderRadius: 30,
          background: 'rgba(24,16,44,.38)',
        }}
      />
      <Headline
        top={150}
        size={80}
        enter={0}
        lines={[
          [{t: 'Bạn giữ mối quan hệ ấy'}],
          [{t: 'vì '}, {t: 'thương,', c: RED}],
          [{t: 'hay vì '}, {t: 'sợ', c: BLUE_DEEP}, {t: ' phải bắt đầu lại?'}],
        ]}
      />
      <Finish />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s2 WIDE BẾP (dur 142)
// E-T4: beat "cạch" (f≈90) + LED Nấu→Giữ ấm. Đủ: 2 bộ đũa (mỗi bát 1 đôi ngang miệng),
// áo người ấy trên ghế, móc chìa cạnh cửa, cửa sổ tím, lưng mình ở bếp.
// Multiplane: drift ngang biên độ nhỏ, xa 0.35x / giữa 0.7x / gần 1.4x, drive
// bezier(0.45,0,0.18,1), có điểm dừng + hero float (LED), blur CHỈ layer gần.
export const SceneS2: React.FC<{f0?: number}> = ({f0 = 0}) => {
  const f = useCurrentFrame() - f0;
  const drive = -130 * ramp(f, 6, 124, DRIVE_EASE) + 5 * ramp(f, 130, 12, E_SINE);
  const xFar = -drive * 0.35;
  const xMid = -drive * 0.7;
  const xNear = -drive * 1.4;
  // Beat "cạch": Nấu tắt / Giữ ấm bật trong 4f tại f90, không overshoot.
  const nauOn = 1 - ramp(f, 90, 4, E_SINE);
  const giuOn = ramp(f, 90, 4, E_SINE);
  const pop = ramp(f, 90, 3, E_SINE) * (1 - ramp(f, 94, 10, E_SINE)); // vòng nhấn lúc nhảy nút
  const settle = ramp(f, 124, 14, E_SINE); // hero float: LED là điểm dừng
  const cap1 = ramp(f, 2, 12, E_SINE) * (1 - ramp(f, 52, 10, E_SINE));
  const cap2 = ramp(f, 56, 12, E_SINE);
  return (
    <AbsoluteFill style={{background: '#E6ECE8', overflow: 'hidden'}}>
      <ThoFonts />
      <TileWall />
      {/* FAR 0.35x: cửa sổ tím chạng vạng (nét, chỉ dim) */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${xFar.toFixed(2)}px)`}}>
        <DuskWindow x={140} y={150} w={800} h={430} />
        <div style={{position: 'absolute', inset: 0, background: 'rgba(42,34,56,.18)'}} />
      </div>
      {/* MID 0.7x: tableau bếp hai người */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${xMid.toFixed(2)}px)`}}>
        {/* cửa + móc chìa khoá cạnh cửa */}
        <div
          style={{
            position: 'absolute',
            left: 930,
            top: 480,
            width: 150,
            height: 580,
            borderRadius: 12,
            background: 'linear-gradient(180deg,#4E4266,#332C44)',
            boxShadow: '0 18px 50px rgba(20,12,35,.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 862,
            top: 700,
            width: 92,
            height: 130,
            borderRadius: 14,
            background: '#8E979C',
            boxShadow: '0 10px 26px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 898,
            top: 730,
            width: 20,
            height: 34,
            borderRadius: 8,
            background: '#3A3344',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 906,
            top: 762,
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: '6px solid #C9BBA6',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 910,
            top: 788,
            width: 8,
            height: 44,
            borderRadius: 4,
            background: '#C9BBA6',
            transform: 'rotate(8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 922,
            top: 790,
            width: 8,
            height: 38,
            borderRadius: 4,
            background: '#A89A82',
            transform: 'rotate(-6deg)',
          }}
        />
        {/* ghế + áo người ấy */}
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 640,
            width: 230,
            height: 360,
            filter: 'blur(1px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 56,
              width: 24,
              height: 304,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 182,
              top: 56,
              width: 24,
              height: 304,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: 28,
              width: 202,
              height: 42,
              borderRadius: 20,
              background: '#6B5744',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 56,
              width: 150,
              height: 200,
              borderRadius: 44,
              background: 'linear-gradient(180deg,#7A6A9C,#4E4266)',
              transform: 'rotate(-4deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 168,
              top: 140,
              width: 52,
              height: 160,
              borderRadius: 24,
              background: 'linear-gradient(180deg,#655A80,#453D59)',
            }}
          />
        </div>
        {/* lưng mình ở bếp (trái, quay lưng về phía nồi) */}
        <div style={{position: 'absolute', left: -30, top: 560, width: 300, height: 560}}>
          <div
            style={{
              position: 'absolute',
              left: 78,
              top: 0,
              width: 150,
              height: 165,
              borderRadius: 60,
              background: '#2E2838',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 150,
              width: 246,
              height: 410,
              borderRadius: 110,
              background: `linear-gradient(180deg, ${SLEEVE_MINH}, #A89A82)`,
            }}
          />
        </div>
        {/* bàn + hai bát + hai bộ đũa */}
        <div
          style={{
            position: 'absolute',
            left: -80,
            right: -80,
            top: 1080,
            bottom: -80,
            background: `linear-gradient(180deg, #C6CDD1, ${INOX} 12%, #9AA4A9 100%)`,
            boxShadow: '0 -18px 60px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -80,
            right: -80,
            top: 1080,
            height: 10,
            background: 'rgba(255,255,255,.6)',
          }}
        />
        <Bowl x={250} y={1180} s={0.95} scallions={4} sticksAcross steam={0.5} />
        <Bowl x={610} y={1180} s={0.95} scallions={4} sticksAcross steam={0.5} />
        {/* nồi cơm hero trên bàn: Nấu → Giữ ấm ở f90, panel lộ trên caption */}
        <Cooker x={70} y={1090} s={0.7} steam={1} />
        {/* chấm Nấu (hổ phách) — tắt lúc "cạch" */}
        <div
          style={{
            position: 'absolute',
            left: 70 + 150 * 0.7,
            top: 1090 + 190 * 0.7,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: '#FFB347',
            opacity: nauOn,
            boxShadow: `0 0 ${18 * nauOn}px rgba(255,179,71,${0.9 * nauOn})`,
          }}
        />
        {/* chấm Giữ ấm (đỏ son) — bật lúc "cạch", thở 72f sau đó */}
        <div
          style={{
            position: 'absolute',
            left: 70 + 30 * 0.7,
            top: 1090 + 245 * 0.7,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: RED,
            opacity: giuOn,
            boxShadow: `0 0 ${(18 + 14 * settle) * giuOn}px rgba(255,90,54,${0.95 * giuOn})`,
          }}
        />
        {/* vòng nhấn lúc nhảy nút */}
        {pop > 0.01 && (
          <div
            style={{
              position: 'absolute',
              left: 70 + 30 * 0.7 - 34 * pop,
              top: 1090 + 245 * 0.7 - 34 * pop,
              width: 26 + 68 * pop,
              height: 26 + 68 * pop,
              borderRadius: '50%',
              border: '3px solid rgba(255,90,54,.9)',
              opacity: pop * 0.9,
            }}
          />
        )}
      </div>
      {/* NEAR 1.4x: mép khung cửa mờ lướt qua (blur chỉ ở đây) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${xNear.toFixed(2)}px)`,
          filter: 'blur(7px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -260,
            top: -40,
            width: 150,
            height: 2000,
            background: 'rgba(20,16,30,.7)',
            transform: 'rotate(2deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -70,
            top: -40,
            width: 10,
            height: 2000,
            background: 'rgba(247,245,250,.16)',
          }}
        />
      </div>
      {/* caption 2 nhịp, đáy bottom 224 */}
      <div style={{opacity: cap1}}>
        <ThoLine text="Ba năm nay, tối nào cũng vậy." enter={0} size={58} />
      </div>
      <div style={{opacity: cap2}}>
        <ThoLine
          text="Nồi cơm nhảy cái cạch, đèn Giữ ấm sáng lên."
          accent="Giữ ấm"
          accentColor={RED}
          enter={0}
          size={58}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s3 TOP-DOWN NHẶT HÀNH (dur 121)
// TiltReveal adapt: mở hơi nghiêng (rotX 10°→0 settle, E_SINE, KHÔNG overshoot) →
// khóa top-down → micro push 1→1.018 theo tay gắp. 3 cọng nhặt vào đĩa nhỏ.
// t11: bàn không phẳng — ron mờ + vignette + noise, giữ safe zone caption.
const PICK: Array<[number, number]> = [
  [18, 42],
  [50, 74],
  [82, 106],
]; // 3 lần gắp
const BOWL_TIP = {x: 330, y: 830}; // đầu đũa trên bát người ấy
const DISH_TIP = {x: 485, y: 1240}; // đầu đũa trên đĩa nhỏ
const handKeys: Array<[number, number]> = [[0, BOWL_TIP.x]];
PICK.forEach(([a, b]) => {
  handKeys.push([a + 8, BOWL_TIP.x], [b - 8, DISH_TIP.x], [b + 4, DISH_TIP.x]);
});
handKeys.push([121, BOWL_TIP.x]);
const BOWL_SLOTS = [
  {x: 268, y: 768},
  {x: 330, y: 786},
  {x: 392, y: 770},
];
const BOWL_LEFT = [
  {x: 300, y: 800},
  {x: 362, y: 806},
]; // còn lại cho s4 "đang nhặt dở"
const DISH_SLOTS = [
  {x: 446, y: 1212},
  {x: 496, y: 1228},
  {x: 546, y: 1212},
];
export const SceneS3: React.FC<{f0?: number}> = ({f0 = 0}) => {
  const f = useCurrentFrame() - f0;
  // Tilt settle: rotX 10°→0 trong 40f rồi khóa; push 1→1.018 giữ đến hết.
  const tilt = mix(10, 0, ramp(f, 0, 40, E_SINE));
  const push = mix(1, 1.018, ramp(f, 40, 81, E_SINE));
  const handX = keysAt(f, handKeys);
  // Tay nhấc theo弧 khi di chuyển, hạ khi gắp/thả.
  const dip = PICK.reduce((acc, [a, b]) => {
    const pinch = ramp(f, a, 5, E_SINE) * (1 - ramp(f, a + 8, 5, E_SINE));
    const drop = ramp(f, b - 13, 5, E_SINE) * (1 - ramp(f, b - 3, 6, E_SINE));
    return acc + pinch * 16 + drop * 16;
  }, 0);
  const liftArc = PICK.reduce((acc, [a, b]) => {
    const t = ramp(f, a + 8, Math.max(1, b - 8 - (a + 8)), E_SINE);
    return acc + (f > a + 8 && f < b - 8 ? Math.sin(t * Math.PI) * 26 : 0);
  }, 0);
  const cap1 = ramp(f, 2, 12, E_SINE) * (1 - ramp(f, 40, 10, E_SINE));
  const cap2 = ramp(f, 44, 12, E_SINE);
  return (
    <AbsoluteFill style={{background: '#9AA4A9', overflow: 'hidden'}}>
      <ThoFonts />
      <div
        style={{
          position: 'absolute',
          inset: -80,
          transform: `scale(${push})`,
          perspective: 1400,
          perspectiveOrigin: '50% 45%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 80,
            transform: `rotateX(${tilt}deg)`,
            transformOrigin: '50% 45%',
          }}
        >
          {/* bàn inox top-down + t11 shading: ron mờ + vân + vignette + noise */}
          <div
            style={{
              position: 'absolute',
              inset: -120,
              background: 'linear-gradient(180deg, #B4BCC0, #A5ADB2 40%, #8E979C 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: -120,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent 0 120px, rgba(90,98,103,.28) 120px 123px), repeating-linear-gradient(90deg, transparent 0 120px, rgba(90,98,103,.28) 120px 123px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: -120,
              background:
                'radial-gradient(ellipse 70% 60% at 46% 42%, rgba(255,255,255,.14), rgba(255,255,255,0) 60%)',
            }}
          />
          {/* bát người ấy (trái) — cọng tự vẽ để gắp dần */}
          <Bowl x={120} y={560} s={1.25} scallions={0} steam={0.7} />
          {BOWL_LEFT.map((p, i) => (
            <div
              key={`l${i}`}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: 64,
                height: 13,
                borderRadius: 7,
                background: i % 2 ? GREEN : GREEN_LT,
                transform: `rotate(${-18 + i * 22}deg)`,
                boxShadow: '0 2px 4px rgba(40,70,40,.4)',
              }}
            />
          ))}
          {/* bát mình (phải) — còn hành */}
          <Bowl x={600} y={600} s={1.0} scallions={5} steam={0.5} />
          {/* nồi Giữ ấm mép khung */}
          <Cooker x={800} y={60} s={0.55} steam={0.8} />
          {/* đĩa nhỏ */}
          <div
            style={{
              position: 'absolute',
              left: 380,
              top: 1180,
              width: 210,
              height: 120,
              borderRadius: '50%',
              background: '#DDE3E1',
              boxShadow: '0 14px 36px rgba(20,15,35,.35), inset 0 3px 8px rgba(120,130,135,.4)',
            }}
          />
          {/* 3 cọng: bát → tay → đĩa */}
          {PICK.map(([a, b], i) => {
            const t = ramp(f, a + 8, Math.max(1, b - 8 - (a + 8)), E_SINE);
            const landed = f >= b - 8;
            const lifted = f >= a && !landed;
            const x = landed
              ? DISH_SLOTS[i].x
              : lifted
                ? mix(BOWL_SLOTS[i].x, DISH_SLOTS[i].x, t)
                : BOWL_SLOTS[i].x;
            const yBase = landed
              ? DISH_SLOTS[i].y
              : lifted
                ? mix(BOWL_SLOTS[i].y, DISH_SLOTS[i].y, t)
                : BOWL_SLOTS[i].y;
            const y = yBase - (lifted ? Math.sin(t * Math.PI) * 30 : 0);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 60,
                  height: 13,
                  borderRadius: 7,
                  background: i % 2 ? GREEN : GREEN_LT,
                  transform: `rotate(${-14 + i * 12}deg)`,
                  boxShadow: lifted
                    ? '0 8px 14px rgba(20,15,35,.45)'
                    : '0 2px 5px rgba(40,70,40,.4)',
                }}
              />
            );
          })}
          {/* tay gắp (không strand rời — cọng đi theo đầu đũa) */}
          <HandChop x={handX - 90} y={430 + dip - liftArc} s={1.0} angle={18} strand={false} />
        </div>
      </div>
      <div style={{opacity: cap1}}>
        <ThoLine text="Mình múc hai bát canh." enter={0} size={58} />
      </div>
      <div style={{opacity: cap2}}>
        <ThoLine text="Bát người ấy, mình nhặt từng cọng hành ra." enter={0} size={58} />
      </div>
      <Finish />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
