import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Từ hai mươi bốn giờ say rượu đến mười một ngày cạn pin hoàn toàn, giấc ngủ chính là nút sạc sinh tồn mà bạn tuyệt đối không thể bỏ qua.';

const MILESTONES = [
  {label: '24 Giờ — Phản xạ như say rượu', pct: 80, color: '#38BDF8'},
  {label: '48 Giờ — Miễn dịch suy giảm', pct: 55, color: '#A3E635'},
  {label: '72 Giờ — Vi giấc ngủ (3-5s)', pct: 38, color: '#F59E0B'},
  {label: '120 Giờ — Ảo giác thị giác', pct: 22, color: '#A855F7'},
  {label: '264 Giờ (11 Ngày) — Sụp nguồn', pct: 1, color: '#EF4444'},
];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <MascotStage theme="studio" zoom={1.04}>
      <div
        style={{
          position: 'absolute',
          top: 76,
          left: 84,
          width: 1120,
          padding: '36px 42px',
          borderRadius: 28,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '3px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
        }}
      >
        <div
          style={{
            color: '#38BDF8',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 6,
          }}
        >
          TỔNG KẾT PIN NÃO BỘ
        </div>
        <div style={{color: '#F8FAFC', fontSize: 42, fontWeight: 900, marginBottom: 24}}>
          11 NGÀY THỨC TRẮNG
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {MILESTONES.map((item, idx) => {
            const delay = idx * 12;
            const fill = interpolate(frame, [delay, delay + 30], [100, item.pct], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={item.label}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span style={{color: '#F1F5F9', fontSize: 25, fontWeight: 800}}>
                    {item.label}
                  </span>
                  <span style={{color: item.color, fontSize: 26, fontWeight: 900}}>
                    {item.pct}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 20,
                    borderRadius: 999,
                    background: '#1E293B',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(3, fill)}%`,
                      height: '100%',
                      borderRadius: 999,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 22,
            padding: '12px 20px',
            borderRadius: 14,
            background: 'rgba(239, 68, 68, 0.14)',
            border: '2px dashed #EF4444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: interpolate(frame, [75, 100], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span style={{color: '#FCA5A5', fontSize: 22, fontWeight: 900}}>
            ??? 14 NGÀY KHÔNG NGỦ (Tập sau?)
          </span>
          <span style={{color: '#FDE047', fontSize: 24, fontWeight: 900}}>
            NGUY HIỂM TỬ VONG ⚠️
          </span>
        </div>
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={1520}
          y={610}
          scale={1.26}
          mood="normal"
          pose="point"
          flip
          narration={NARRATION}
          bandages={4}
        />
      </svg>

      <SubtitleBar text="Từ 24 giờ say rượu đến 11 ngày cạn pin, giấc ngủ chính là nút sạc sinh tồn của bạn!" />
    </MascotStage>
  );
};
