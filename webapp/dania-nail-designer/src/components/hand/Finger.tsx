import { NailLengthId, NailShapeId } from "../../constants/design-constants";
import { DefaultNailAndLength, NailSvgHeight, nailShapeAndLength } from "../../constants/other-constants";


const nailColor = '#f3d4da';

interface Props {
  shape: NailShapeId | null,
  length: NailLengthId | null;
}
export function Finger({shape, length = 'natural'}: Props) {
  const shapeVal = shape ?? 'round';
  const lengthVal = length ?? 'natural';
  const heightVal = NailSvgHeight['xx_long'];

  return <svg className={'finger'} width={heightVal * 1.5} viewBox={`-${heightVal} -0 ${heightVal} 1`} xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(90)">
        
      {/* Finger meat */}
      <path d="M -25 0 C -25 10 -22 22 -19 30 C -13 45 13 45 19 30 C 22 22 25 10 25 0" stroke="black" strokeWidth="0.5" style={{fill: "#e6bc98"}} />
      
      {/* Nail Bed mattress */}
      <path d="M -15 36 C -15 24 -15 16 -14 12 C -11 -1 11 -1 14 12 C 15 16 15 24 15 36" stroke="black" strokeWidth="0.5" fill={nailColor} />
      
      {/* Nail Shape and Length */}
      <path d={`M 15 36 ${nailShapeAndLength[shapeVal][lengthVal] || DefaultNailAndLength}`} stroke="black" strokeWidth="0.5" fill={nailColor} style={{transition: 'd 0.3s'}} />
    </g>
  </svg>
  
}

// eye LASH brush