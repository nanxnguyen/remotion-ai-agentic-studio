import React from 'react';
import type {SceneKind, SceneMood} from '../timeline';

const COLOR = {
  background: '#08090B',
  pale: '#F5F5F4',
  gray: '#85878A',
  amber: '#EF9E69',
  dim: '#383E49',
  faint: '#262B32',
  green: '#8BAE96',
} as const;

type StageArtProps = {
  kind: SceneKind;
  frame: number;
  progress: number;
};

const clamp = (v: number): number => Math.max(0, Math.min(1, v));
const ease = (v: number): number => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

const MoonWindow: React.FC<{light: number}> = ({light}) => (
  <>
    <rect x={695} y={488} width={292} height={686} rx={8} stroke={COLOR.dim} strokeWidth={8} fill="#121822"/>
    <line x1={841} y1={488} x2={841} y2={1174} stroke={COLOR.dim} strokeWidth={6}/>
    <line x1={695} y1={822} x2={987} y2={822} stroke={COLOR.dim} strokeWidth={6}/>
    <circle cx={904} cy={608} r={39} fill={COLOR.amber} opacity={0.20 + light * .26}/>
    <path d="M720 1100 L752 940 L788 1005 L826 880 L870 1030 L906 966 L951 1089"
      fill="none" stroke="#273344" strokeWidth={4}/>
    <path d="M690 1178 L996 1178" stroke={COLOR.gray} strokeWidth={5}/>
  </>
);

const BirthdayCake: React.FC<{light?: number; flame?: boolean}> = ({light = .1, flame = false}) => (
  <g transform="translate(690 1130)">
    <ellipse cx={105} cy={198} rx={188} ry={28} fill="#242830"/>
    <rect x={-45} y={64} width={300} height={125} rx={24} fill="#312C31" stroke="#B98B7E" strokeWidth={5}/>
    <path d="M-42 101 Q-8 129 27 102 Q60 130 94 102 Q125 130 157 102 Q205 132 250 103"
      fill="none" stroke="#F4D6C3" strokeWidth={16} strokeLinecap="round"/>
    <rect x={99} y={-10} width={12} height={75} rx={4} fill={COLOR.amber}/>
    <path d="M105 -18 Q92 -33 105 -55 Q124 -33 105 -18Z"
      fill={COLOR.amber} opacity={flame ? .95 : .08 + light * .1}/>
    {flame && <circle cx={105} cy={-42} r={46} fill={COLOR.amber} opacity={.11 + light*.15}/>}
    <path d="M-30 185 L241 185" stroke="#E3BAA5" strokeWidth={4}/>
  </g>
);

const Phone: React.FC<{lines?: readonly string[]; glow?: number; cursor?: boolean}> = ({
  lines = ['GIÚP MÌNH VỚI', 'CẬU RẢNH KHÔNG?', 'CHỊ NHỜ EM NHÉ'],
  glow = .8,
  cursor = false,
}) => (
  <g transform="translate(675 636)">
    <rect x={0} y={0} width={300} height={520} rx={42} fill="#141A22" stroke="#777983" strokeWidth={9}/>
    <rect x={18} y={25} width={264} height={468} rx={26} fill="#1D252D"/>
    <path d="M120 16 L179 16" stroke="#9297A1" strokeWidth={6} strokeLinecap="round"/>
    <text x={44} y={75} fill={COLOR.gray} fontSize={24} fontFamily="DejaVu Sans">23:59</text>
    {lines.map((value,i) => (
      <g key={i} opacity={Math.max(.25, glow - i*.075)}>
        <rect x={35} y={105+i*98} width={226} height={77} rx={18}
          fill={i === 0 ? '#493B36' : '#303842'} stroke={i===0 ? COLOR.amber : COLOR.dim} strokeWidth={2}/>
        <text x={49} y={150+i*98} fill={i === 0 ? COLOR.pale : '#D3D5D8'}
          fontSize={17} fontWeight={700} fontFamily="DejaVu Sans">{value}</text>
      </g>
    ))}
    <rect x={43} y={421} width={212} height={39} rx={12} fill="#242B32" stroke={COLOR.gray}/>
    {cursor && <line x1={142} y1={430} x2={142} y2={453} stroke={COLOR.amber} strokeWidth={3}/>}
  </g>
);

export const StageArt: React.FC<StageArtProps> = ({kind, frame, progress}) => {
  const t = clamp(progress);
  const drift = Math.sin(frame / 77) * 4;
  const heartbeat = (1 + Math.sin(frame / 12)) / 2;
  const dots = Array.from({length: 11},(_,i)=>i);
  return (
    <g>
      {/* Recurring window and floor establish a single physical location. */}
      <MoonWindow light={kind === 'sunrise' ? 1 : .12}/>
      <path d="M70 1430 H1015" stroke={COLOR.dim} strokeWidth={4}/>
      <ellipse cx={417} cy={1450} rx={198} ry={22} fill="#171B22"/>
      {kind === 'notifications' && (
        <>
          <Phone lines={['GIÚP MÌNH NHÉ?', 'NHỜ AN MỘT CHÚT', 'CỨU CHỊ VỚI']} glow={.82}/>
          {dots.map(i=><g key={i} opacity={ease((t*1.7-i*.065))}>
            <circle cx={580+(i%2)*27} cy={560+i*53} r={6} fill={COLOR.amber}/>
            <path d={`M${570+(i%2)*27} ${560+i*53} h-18`} stroke={COLOR.amber} strokeWidth={3}/>
          </g>)}
          <text x={786} y={590} textAnchor="middle" fill={COLOR.amber} fontSize={84} fontWeight={800} fontFamily="DejaVu Sans">17</text>
        </>
      )}
      {kind === 'cake' && (
        <>
          <BirthdayCake/>
          <path d="M644 1314 H1003" stroke={COLOR.gray} strokeWidth={5}/>
          <text x={795} y={602} textAnchor="middle" fill={COLOR.amber}
            fontFamily="DejaVu Sans" fontWeight={800} fontSize={90}>0</text>
          <text x={795} y={655} textAnchor="middle" fill={COLOR.gray}
            fontFamily="DejaVu Sans" fontWeight={700} fontSize={25}>LỜI CHÚC</text>
        </>
      )}
      {kind === 'messages' && (
        <>
          <Phone lines={['LÀM HỘ CHỊ NHÉ', 'AN ƠI, CỨU MÌNH', 'CẬU NHẬN VIỆC NÀY']} glow={1}/>
          <circle cx={964} cy={654} r={20+heartbeat*5} fill={COLOR.amber}/>
          <text x={964} y={662} fontSize={20} fontWeight={800} textAnchor="middle" fill={COLOR.background}>!</text>
        </>
      )}
      {kind === 'office' && (
        <>
          <rect x={607} y={900} width={418} height={19} rx={8} fill={COLOR.gray}/>
          <path d="M665 920 V1392 M955 920 V1392" stroke={COLOR.gray} strokeWidth={12}/>
          <rect x={748} y={720} width={250} height={166} rx={15} fill="#27323A" stroke={COLOR.gray} strokeWidth={7}/>
          <rect x={772} y={743} width={202} height={118} rx={5} fill="#19252B"/>
          <path d="M788 767 L900 767 M788 803 L957 803 M788 836 L876 836" stroke={COLOR.amber} opacity={.55} strokeWidth={7}/>
          <text x={825} y={654} textAnchor="middle" fill={COLOR.amber} fontSize={50} fontFamily="DejaVu Sans">22:30</text>
        </>
      )}
      {kind === 'paperwork' && (
        <>
          {dots.slice(0,6).map(i=><g key={i} transform={`translate(${635+(i%3)*100} ${740+Math.floor(i/3)*173}) rotate(${(i%3-1)*5})`}>
            <rect x={0} y={0} width={132} height={163} rx={5} fill="#282F38" stroke={COLOR.gray} strokeWidth={4}/>
            <path d="M15 46 H120 M15 77 H105 M15 107 H118" stroke={i===3 ? COLOR.amber : '#69717B'} strokeWidth={6}/>
          </g>)}
          <text x={800} y={640} textAnchor="middle" fontSize={45} fill={COLOR.amber} fontFamily="DejaVu Sans">LÀM THÊM?</text>
        </>
      )}
      {kind === 'comfort' && (
        <>
          <g opacity={.65} transform={`translate(${drift} 0)`}>
            <circle cx={842} cy={780} r={65} stroke={COLOR.gray} fill="none" strokeWidth={8}/>
            <path d="M842 848 V1083 M842 960 L760 1046 M842 960 L910 1005" stroke={COLOR.gray} fill="none" strokeWidth={10} strokeLinecap="round"/>
            <path d="M807 784 Q842 759 874 786" stroke={COLOR.amber} strokeWidth={5} fill="none"/>
          </g>
          <path d="M598 820 Q673 746 760 779" fill="none" stroke={COLOR.amber} strokeWidth={5} opacity={.6}/>
          <text x={813} y={642} textAnchor="middle" fill={COLOR.pale} fontSize={31} fontFamily="DejaVu Sans">“CẢM ƠN AN...”</text>
        </>
      )}
      {kind === 'clock' && (
        <>
          <circle cx={811} cy={804} r={176} fill="#19232B" stroke={COLOR.gray} strokeWidth={8}/>
          <circle cx={811} cy={804} r={150} fill="none" stroke={COLOR.dim} strokeWidth={4}/>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{
            const a=i*Math.PI/6-Math.PI/2;
            return <line key={i} x1={811+Math.cos(a)*129} y1={804+Math.sin(a)*129}
              x2={811+Math.cos(a)*145} y2={804+Math.sin(a)*145}
              stroke={COLOR.pale} strokeWidth={4}/>;
          })}
          <path d={`M811 804 L${811+Math.sin(t*.10)*22} 695 M811 804 L901 780`}
            stroke={COLOR.amber} strokeWidth={9} strokeLinecap="round"/>
          <text x={811} y={1067} textAnchor="middle" fill={COLOR.amber}
            fontSize={76} fontFamily="DejaVu Sans" fontWeight={800}>23:59</text>
          <BirthdayCake/>
        </>
      )}
      {kind === 'last-request' && (
        <>
          <Phone lines={['GIÚP CHỊ NHÉ?', 'CÓ GẤP KHÔNG?', 'TRẢ LỜI ĐI EM']} glow={1}/>
          <circle cx={970} cy={641} r={18+heartbeat*6} fill={COLOR.amber}/>
          <path d="M671 577 H989" stroke={COLOR.amber} strokeWidth={4} opacity={.8}/>
        </>
      )}
      {kind === 'typing' && (
        <>
          <Phone lines={['GIÚP CHỊ NHÉ?', 'VÂNG...', '']} glow={.95} cursor/>
          <text x={819} y={1160} textAnchor="middle" fill={COLOR.amber} fontSize={28} fontFamily="DejaVu Sans">CHƯA GỬI</text>
        </>
      )}
      {kind === 'reflection' && (
        <>
          <rect x={637} y={598} width={350} height={622} rx={42} fill="#1D252D" stroke={COLOR.gray} strokeWidth={8}/>
          <circle cx={820} cy={819} r={92} fill="none" stroke={COLOR.gray} strokeWidth={8}/>
          <path d="M820 924 V1082 M820 997 L740 1048 M820 997 L900 1048" stroke={COLOR.gray} strokeWidth={8} fill="none" strokeLinecap="round"/>
          <path d="M782 849 Q822 818 858 848" stroke={COLOR.amber} strokeWidth={4} fill="none"/>
          <path d="M789 780 L793 798 M845 780 L849 798" stroke={COLOR.pale} strokeWidth={5}/>
        </>
      )}
      {kind === 'tear' && (
        <>
          <circle cx={820} cy={851} r={177} fill="none" stroke={COLOR.dim} strokeWidth={10}/>
          <path d="M743 822 Q770 797 793 824 M837 824 Q861 797 888 822" fill="none" stroke={COLOR.pale} strokeWidth={7}/>
          <path d={`M760 838 Q758 ${894+t*36} 759 ${910+t*34}`} stroke={COLOR.amber} strokeWidth={8} fill="none" strokeLinecap="round"/>
          <path d="M784 921 Q823 899 860 921" fill="none" stroke={COLOR.gray} strokeWidth={6}/>
          <text x={816} y={643} textAnchor="middle" fontSize={39} fill={COLOR.amber} fontFamily="DejaVu Sans">CHÍNH MÌNH</text>
        </>
      )}
      {kind === 'delete' && (
        <>
          <Phone lines={['GIÚP CHỊ NHÉ?', 'VÂNG', '']} glow={.55}/>
          <path d="M742 837 L900 841" stroke={COLOR.amber} strokeWidth={12} opacity={ease(t)}/>
          <text x={810} y={1230} textAnchor="middle" fill={COLOR.pale} fontSize={34} fontFamily="DejaVu Sans">ĐANG XÓA...</text>
        </>
      )}
      {kind === 'boundary' && (
        <>
          <rect x={602} y={710} width={407} height={204} rx={35} fill="#2C3937" stroke={COLOR.green} strokeWidth={5}/>
          <text x={805} y={789} textAnchor="middle" fill={COLOR.pale} fontSize={29} fontWeight={700} fontFamily="DejaVu Sans">HÔM NAY</text>
          <text x={805} y={841} textAnchor="middle" fill={COLOR.amber} fontSize={30} fontWeight={800} fontFamily="DejaVu Sans">EM CẦN NGHỈ.</text>
          <circle cx={968} cy={951} r={24} fill={COLOR.green}/>
          <path d="M957 951 L968 962 L980 939" stroke="#16211B" strokeWidth={5} fill="none"/>
        </>
      )}
      {kind === 'flame' && (
        <>
          <BirthdayCake flame light={heartbeat}/>
          <path d={`M625 1020 Q${663+t*34} 957 701 929`} stroke={COLOR.amber} fill="none" strokeWidth={4}/>
          {[0,1,2,3,4].map(i=><circle key={i} cx={658+i*64} cy={738+Math.sin(frame/60+i)*17} r={4} fill={COLOR.amber} opacity={.22+.08*i}/>)}
        </>
      )}
      {kind === 'wish' && (
        <>
          <BirthdayCake flame light={.8}/>
          <circle cx={801} cy={1119} r={190} fill={COLOR.amber} opacity={.065+.025*heartbeat}/>
          {dots.slice(0,7).map(i=><circle key={i} cx={678+i*43} cy={784+Math.sin(i*1.8+frame/65)*29}
            r={3+i%3} fill={COLOR.amber} opacity={.37}/>)}
        </>
      )}
      {kind === 'sunrise' && (
        <>
          <path d="M700 1055 Q825 930 979 1055" stroke={COLOR.amber} strokeWidth={9} fill="none"/>
          <circle cx={836} cy={972} r={133+heartbeat*3} fill={COLOR.amber} opacity={.11}/>
          <path d="M700 1067 H992" stroke={COLOR.amber} strokeWidth={5}/>
          <BirthdayCake flame light={.65}/>
        </>
      )}
    </g>
  );
};

export type FigureProps = {
  previousMood: SceneMood;
  nextMood: SceneMood;
  previousKind: SceneKind;
  nextKind: SceneKind;
  blend: number;
  frame: number;
};

const brightness: Record<SceneMood,number> = {
  lonely: .15,
  tired: .08,
  shock: .0,
  grief: .0,
  resolve: .45,
  hope: .92,
};
const armPose: Record<SceneKind, number> = {
  notifications:.45,cake:.1,messages:.55,office:.75,paperwork:.70,
  comfort:.28,clock:.04,'last-request':.68,typing:.85,
  reflection:.48,tear:.15,delete:.70,boundary:.65,flame:.50,wish:.35,sunrise:.10,
};
export const Protagonist: React.FC<FigureProps> = ({
  previousMood,nextMood,previousKind,nextKind,blend,frame,
}) => {
  const t=ease(blend);
  const breath=5*Math.sin(frame/96);
  const headY=863+breath;
  const x=435+3*Math.sin(frame/130);
  const joy=brightness[previousMood]*(1-t)+brightness[nextMood]*t;
  const arm=armPose[previousKind]*(1-t)+armPose[nextKind]*t;
  const handX=x+144-arm*116;
  const handY=1188-arm*214+breath;
  const gaze=3*Math.sin(frame/81);
  return (
    <g>
      <ellipse cx={x} cy={1398} rx={124} ry={18} fill="#14171C"/>
      <circle cx={x} cy={headY} r={75} stroke={COLOR.pale} strokeWidth={9} fill="none"/>
      <path d={`M${x} ${headY+75} L${x+1} ${1198+breath}`}
        stroke={COLOR.pale} strokeWidth={10} strokeLinecap="round"/>
      <path d={`M${x} ${1020+breath} Q${x-83} ${1056+breath} ${x-131} ${1188+breath}`}
        stroke={COLOR.pale} strokeWidth={9} fill="none" strokeLinecap="round"/>
      <path d={`M${x} ${1020+breath} Q${x+130} ${1091+breath} ${handX} ${handY}`}
        stroke={COLOR.pale} strokeWidth={9} fill="none" strokeLinecap="round"/>
      <circle cx={handX} cy={handY} r={10} fill={COLOR.pale}/>
      <path d={`M${x+1} ${1198+breath} L${x-87} ${1403} M${x+1} ${1198+breath} L${x+88} ${1403}`}
        stroke={COLOR.pale} strokeWidth={10} fill="none" strokeLinecap="round"/>
      <circle cx={x-25+gaze} cy={headY-10} r={5} fill={COLOR.pale}/>
      <circle cx={x+25+gaze} cy={headY-10} r={5} fill={COLOR.pale}/>
      <path d={`M${x-27} ${headY+30} Q${x} ${headY+22+joy*38} ${x+27} ${headY+30}`}
        stroke={COLOR.pale} strokeWidth={4} fill="none" strokeLinecap="round"/>
      {(previousMood==='grief'||nextMood==='grief')&&
      <path d={`M${x+31} ${headY+10} Q${x+35} ${headY+32} ${x+33} ${headY+47}`}
        fill="none" stroke={COLOR.amber} strokeWidth={4} opacity={1-joy}/>}
      {arm>.47&& <g opacity={Math.min(1,(arm-.47)*3)}>
        <rect x={handX-30} y={handY-65} width={49} height={83} rx={8}
          fill="#303842" stroke={COLOR.gray} strokeWidth={4}/>
        <circle cx={handX-7} cy={handY-38} r={5} fill={COLOR.amber}/>
      </g>}
    </g>
  );
};
