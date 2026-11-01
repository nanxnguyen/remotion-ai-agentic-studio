import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame,
} from 'remotion';
import {FitText} from '../../core';
import {timeline} from './timeline';

const SCENES = [
  {
    "id": "scene01",
    "headline": "ĐẾM CÙNG TÔI",
    "caption": "Đếm cùng tôi.",
    "image": "images/cot-den-thu-tam/scene-01.png",
    "voice": "audio/cot-den-thu-tam/s1.mp3"
  },
  {
    "id": "scene02",
    "headline": "BẢY CỘT ĐÈN",
    "caption": "Bảy cột đèn thôi.",
    "image": "images/cot-den-thu-tam/scene-02.png",
    "voice": "audio/cot-den-thu-tam/s2.mp3"
  },
  {
    "id": "scene03",
    "headline": "CỘT THỨ TÁM",
    "caption": "Đèn thứ tám.",
    "image": "images/cot-den-thu-tam/scene-03.png",
    "voice": "audio/cot-den-thu-tam/s3.mp3"
  },
  {
    "id": "scene04",
    "headline": "ĐƠN HÀNG BÍ ẨN",
    "caption": "Phúc dừng xe. Điện thoại báo đơn giao cho chính anh.",
    "image": "images/cot-den-thu-tam/scene-04.png",
    "voice": "audio/cot-den-thu-tam/s4.mp3"
  },
  {
    "id": "scene05",
    "headline": "NGƯỜI DƯỚI ÁNH ĐÈN",
    "caption": "Người nhận đứng dưới đèn, mặc áo giống hệt Phúc.",
    "image": "images/cot-den-thu-tam/scene-05.png",
    "voice": "audio/cot-den-thu-tam/s5.mp3"
  },
  {
    "id": "scene06",
    "headline": "CUỘC GỌI LẠ",
    "caption": "Cuộc gọi vang lên: “Anh sắp tới rồi, phải không?”",
    "image": "images/cot-den-thu-tam/scene-06.png",
    "voice": "audio/cot-den-thu-tam/s6.mp3"
  },
  {
    "id": "scene07",
    "headline": "KHUÔN MẶT GIỐNG HỆT",
    "caption": "Người kia quay đầu. Khuôn mặt giống hệt anh.",
    "image": "images/cot-den-thu-tam/scene-07.png",
    "voice": "audio/cot-den-thu-tam/s7.mp3"
  },
  {
    "id": "scene08",
    "headline": "NGƯỜI NHẬN: PHÚC",
    "caption": "Ứng dụng hiện ảnh người nhận: chính Phúc.",
    "image": "images/cot-den-thu-tam/scene-08.png",
    "voice": "audio/cot-den-thu-tam/s8.mp3"
  },
  {
    "id": "scene09",
    "headline": "ĐƠN ĐÃ GIAO",
    "caption": "Đơn hàng báo đã giao, dù gói hàng vẫn nằm trong thùng xe. Người dưới cột đèn giơ tay vẫy. Cột đèn chớp tắt.",
    "image": "images/cot-den-thu-tam/scene-09.png",
    "voice": "audio/cot-den-thu-tam/s9.mp3"
  },
  {
    "id": "scene10",
    "headline": "ĐƯỜNG CHỈ CÓ BẢY CỘT",
    "caption": "Nếu dám đi qua cột đèn thứ tám, hãy thả tim và theo dõi Hẻm Chuyện Lạ.",
    "image": "images/cot-den-thu-tam/scene-10.png",
    "voice": "audio/cot-den-thu-tam/s10.mp3"
  }
] as const;

type ScenePlateProps = {
  image: string;
  headline: string;
  caption: string;
  duration: number;
  index: number;
  fadeIn: boolean;
  fadeOut: boolean;
};

const ScenePlate: React.FC<ScenePlateProps> = ({
  image, headline, caption, duration, index, fadeIn, fadeOut,
}) => {
  const frame = useCurrentFrame();
  const eased = Easing.inOut(Easing.quad);
  const scale = interpolate(frame, [0, Math.max(1,duration)], [1.015, 1.075], {
    easing: eased, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const drift = index % 2 === 0 ? -20 : 20;
  const x = interpolate(frame, [0, Math.max(1,duration)], [0, drift], {
    easing: eased, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, 12], [0, 1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'})
    : 1;
  const fadeOutOpacity = fadeOut
    ? interpolate(frame, [Math.max(0,duration-12), duration], [1, 0], {extrapolateLeft:'clamp',extrapolateRight:'clamp'})
    : 1;
  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);
  return (
    <AbsoluteFill style={{backgroundColor:'#03080D', opacity, overflow:'hidden'}}>
      <Img
        src={staticFile(image)}
        style={{
          width:'100%', height:'100%', objectFit:'cover',
          transform:`translate3d(${x}px,0,0) scale(${scale})`,
          filter:'saturate(0.82) contrast(1.12) brightness(0.88)',
        }}
      />
      <AbsoluteFill style={{background:'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, transparent 28%, transparent 54%, rgba(0,0,0,0.82) 100%)'}} />
      <div style={{position:'absolute',top:94,left:72,right:72,display:'flex',alignItems:'center',gap:16}}>
        <div style={{width:7,height:34,background:'#D64A43',boxShadow:'0 0 22px rgba(220,55,48,.45)'}} />
        <div style={{fontFamily:'Noto Sans',fontSize:22,fontWeight:800,letterSpacing:3,color:'#E8E2D4',textShadow:'0 2px 10px #000'}}>HẺM CHUYỆN LẠ</div>
      </div>
      <div style={{position:'absolute',top:218,left:72,right:72}}>
        <FitText
          text={headline}
          maxWidth={930}
          maxLines={1}
          fontFamily='Noto Sans'
          fontWeight={900}
          minFontSize={38}
          maxFontSize={60}
          style={{color:'#F4EBDD',letterSpacing:1.2,textShadow:'0 3px 18px rgba(0,0,0,.95)'}}
        />
      </div>
      <div style={{position:'absolute',left:72,right:72,bottom:250,paddingTop:42,paddingBottom:34,borderTop:'2px solid rgba(238,225,199,.32)'}}>
        <FitText
          text={caption}
          maxWidth={930}
          maxLines={2}
          fontFamily='Noto Sans'
          fontWeight={700}
          minFontSize={39}
          maxFontSize={58}
          style={{color:'#FFF9ED',textShadow:'0 3px 16px rgba(0,0,0,.98)'}}
        />
      </div>
      <div style={{position:'absolute',left:72,right:72,bottom:214,height:3,background:'rgba(230,224,210,.16)'}}>
        <div style={{height:'100%',width:'100%',background:'rgba(220,70,62,.72)'}} />
      </div>
    </AbsoluteFill>
  );
};

export const CotDenThuTamReel: React.FC = () => (
  <AbsoluteFill style={{backgroundColor:'#02060A'}}>
    <Audio src={staticFile('audio/cot-den-thu-tam/ambience.wav')} volume={0.18} />
    {SCENES.map((scene, index) => {
      const timing = timeline.shots[scene.id];
      const visualFrom = index === 0 ? timing.from : Math.max(0, timing.from - 12);
      const visualDuration = timing.duration + (index === 0 ? 0 : 12);
      return (
        <Sequence
          key={scene.id}
          from={visualFrom}
          durationInFrames={visualDuration}
        >
          <ScenePlate
            image={scene.image}
            headline={scene.headline}
            caption={scene.caption}
            duration={visualDuration}
            index={index}
            fadeIn={index > 0}
            fadeOut={index < SCENES.length - 1}
          />
        </Sequence>
      );
    })}
    {SCENES.map((scene) => {
      const timing = timeline.shots[scene.id];
      const voiceIndex = Number(scene.id.slice(-2));
      return (
        <Sequence
          key={`voice-${scene.id}`}
          from={timing.from}
          durationInFrames={timeline.totalDurationInFrames - timing.from}
        >
          <Audio src={staticFile(`audio/cot-den-thu-tam/s${voiceIndex}.mp3`)} volume={1} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
