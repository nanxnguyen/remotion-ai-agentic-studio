import React from 'react';
import {AbsoluteFill, Composition, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';

const fps = 30;
const durationInFrames = 390*fps;
const beats:[number, number,string,string][] = [
 [0,12,'BẠN CÓ THẬT SỰ ỔN?','Có những người luôn mỉm cười… nhưng rất mệt.'],
 [45,57,'MỘT LẦN NỮA','Linh lại nhận phần việc không thuộc về mình.'],
 [90,102,'CÁI GIÁ CỦA MỘT LỜI ĐỒNG Ý','Một cuộc hẹn lỡ. Một tối về muộn.'],
 [142,153,'BẠN ĐÃ MỆT ĐẾN ĐÂU?','Không ai biết ngoài chính bạn.'],
 [205,218,'LẦN ĐẦU HỌC CÁCH TỪ CHỐI','Không viện cớ. Không tự trách.'],
 [258,272,'RANH GIỚI LÀ MỘT CÁCH YÊU THƯƠNG','Tử tế với cả người khác và chính mình.'],
 [340,353,'GIỮ LẠI MỘT KHOẢNG BÌNH YÊN','Mỗi ngày, một điều nhỏ cho riêng mình.'],
 [375,390,'ĐỪNG BỎ RƠI CHÍNH MÌNH','Lớn rồi… hãy dịu dàng với bản thân.'],
];

const Overlay:React.FC<{start:number,end:number,title:string,subtitle:string}>=({start,end,title,subtitle})=>{
  const local=useCurrentFrame();
  const length=(end-start)*fps;
  const opacity=interpolate(local,[0,15,length-18,length],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const y=interpolate(local,[0,28],[24,0],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{justifyContent:'flex-end',alignItems:'center',paddingBottom:130,pointerEvents:'none'}}>
    <div style={{width:'85%',fontFamily:'Be Vietnam Pro, sans-serif',textAlign:'center',transform:`translateY(${y}px)`,opacity,
      textShadow:'0px 5px 18px rgba(0,0,0,.82)'}}>
      <div style={{fontWeight:800,letterSpacing:1,fontSize:56,color:'#F5C58D',lineHeight:1.2}}>{title}</div>
      <div style={{fontWeight:400,letterSpacing:.2,fontSize:30,color:'#FFF7E9',marginTop:12}}>{subtitle}</div>
    </div>
  </AbsoluteFill>;
};

const HealingV3:React.FC=()=>{
  const frame=useCurrentFrame();
  const warm=interpolate(frame,[0,195*fps,340*fps],[0,.03,.08],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{backgroundColor:'#080d14'}}>
    {/* Existing genuine stock-footage AV with verified Vbee; NO synthetic speaker lip sync. */}
    <OffthreadVideo src={staticFile('healing-v3/master-stock-with-vbee.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}} />
    <AbsoluteFill style={{background:`linear-gradient(to bottom, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 67%, rgba(0,0,0,.35) 100%)`,pointerEvents:'none'}} />
    <AbsoluteFill style={{backgroundColor:`rgba(193,130,67,${warm})`,pointerEvents:'none'}} />
    {beats.map(([start,end,title,subtitle],i)=><Sequence key={i} from={start*fps} durationInFrames={(end-start)*fps}>
      <Overlay start={start} end={end} title={title} subtitle={subtitle}/>
    </Sequence>)}
  </AbsoluteFill>;
};

export const Root:React.FC=()=> <Composition id="HealingV3" component={HealingV3} width={1920} height={1080} fps={fps} durationInFrames={durationInFrames}/>;