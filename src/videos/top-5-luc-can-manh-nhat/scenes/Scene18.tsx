import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Nhìn lại bảng xếp hạng từ một trăm sáu mươi P S I của người, lên linh cẩu, báo đốm, hà mã, cá sấu nước mặn và cá mập trắng, thiên nhiên thật sự không đùa được đâu.';

const RANKING = [
  {label: 'Con Người', psi: 160, color: '#94A3B8'},
  {label: 'Linh Cẩu Đốm', psi: 1100, color: '#F59E0B'},
  {label: 'Báo Đốm Mỹ', psi: 1500, color: '#34D399'},
  {label: 'Hà Mã', psi: 1800, color: '#60A5FA'},
  {label: 'Cá Sấu Nước Mặn', psi: 3700, color: '#A3E635'},
  {label: 'Cá Mập Trắng Lớn', psi: 4000, color: '#22D3EE'},
];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <MascotStage theme="studio">
      {/* Ranked Bar Chart */}
      <div
        style={{
          position: 'absolute',
          top: 76,
          left: 84,
          width: 1120,
          padding: '36px 42px',
          borderRadius: 28,
          background: 'rgba(15, 23, 42, 0.88)',
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
          BẢNG XẾP HẠNG CHÍNH THỨC
        </div>
        <div style={{color: '#F8FAFC', fontSize: 42, fontWeight: 900, marginBottom: 28}}>
          SO SÁNH LỰC CẮN (PSI)
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          {RANKING.map((item, idx) => {
            const delay = idx * 14;
            const fill = interpolate(frame, [delay, delay + 35], [0, item.psi / 4000], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={item.label}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                  <span style={{color: '#F1F5F9', fontSize: 26, fontWeight: 800}}>
                    {item.label}
                  </span>
                  <span style={{color: item.color, fontSize: 28, fontWeight: 900}}>
                    {item.psi.toLocaleString('en-US')} PSI
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 22,
                    borderRadius: 999,
                    background: '#1E293B',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(4, fill * 100)}%`,
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

        {/* Secret Replay Teaser */}
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
            opacity: interpolate(frame, [90, 115], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span style={{color: '#FCA5A5', fontSize: 22, fontWeight: 900}}>
            ??? T-REX (Tập sau?)
          </span>
          <span style={{color: '#FDE047', fontSize: 24, fontWeight: 900}}>~12,800 PSI 🔥</span>
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

      <SubtitleBar text="Từ 160 PSI của người lên 4,000 PSI của cá mập trắng — thiên nhiên thật sự không đùa được đâu!" />
    </MascotStage>
  );
};
