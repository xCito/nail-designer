import { useEffect, useRef, useState } from "react";
import { DefaultNailAndLength, NailSvgHeight, nailShapeAndLength } from "../../constants/other-constants";
import { NailLengthOption, NailShapeOption } from "../../types/design-types";
import { getLengthId } from "../../service/helpers";
import { NailLength, NailShape } from "../../constants/design-constants";


const isDiv = false;
const nailColor = '#f3d4da';


const sizes = Object.keys(NailLength) as NailLengthOption[];
const shapes = Object.keys(NailShape) as NailShapeOption[];
const UPDATE_SIZE_MS = 1000;
// const getInitValY = function* (): Generator<number, number, number> { 
//   let i = 0;
//   while(true)
//     yield i++ 
// }; 
// const getInitVal = getInitValY();

interface Props {
  shape: NailShapeOption,
  length: NailLengthOption
}
export function Finger({shape, length}: Props) {
  const processedLength = getLengthId(length);
  const [lengthVal, setLengthVal] = useState(processedLength);
  // const [shapeVal, setShapeVal] = useState(shape);
  const heightVal = NailSvgHeight[lengthVal];
  // console.log(lengthVal);

  // Animation reasons
  useEffect(() => {
    if (NailSvgHeight[processedLength] > NailSvgHeight[lengthVal]) {
      setLengthVal(processedLength);
      return;
    } 
    const int = setTimeout(() => setLengthVal(processedLength), 300);
    return () => clearTimeout(int);
  }, [length]);



  // ------- ANIMATION TESTING
  // useEffect(() => {
  //   const intVal = setInterval(() => {
  //     setLengthVal(() =>
  //       getLengthId(sizes[Math.floor(Math.random() * sizes.length)])
  //     );

  //     setShapeVal(() => 
  //       shapes[Math.floor(Math.random() * shapes.length)]
  //     )
  //   }, UPDATE_SIZE_MS);

  //   return () => clearInterval(intVal);
  // }, []);
  

  // ------- ANIMATION TESTING


  if (isDiv) {
      return <div className="finger" />
  } else {
      return <svg height={heightVal} viewBox={`-50 0 90 ${heightVal}`} xmlns="http://www.w3.org/2000/svg">

        {/* Coffin Long */}
        {/* <path d="M 35 12 C 39 -1 61 -1 64 12 C 65 15 66 24 65 36 C 64 48 60 80 58 95 C 53 95 47 95 41 95 C 39 80 35 48 34 36 c -1 -12 0 -21 1 -24 M 50 94 L 50 3" stroke="red" strokeWidth="1" fill="none" /> */}
        
        {/* Finger meat */}
        <path d="M -25 0 C -25 10 -22 22 -19 30 C -13 45 13 45 19 30 C 22 22 25 10 25 0" stroke="black" strokeWidth="0.5" style={{fill: "#e6bc98"}} />
        
        {/* Nail Bed mattress */}
        <path d="M -15 36 C -15 24 -15 16 -14 12 C -11 -1 11 -1 14 12 C 15 16 15 24 15 36" stroke="black" strokeWidth="0.5" fill={nailColor} />
        
        {/* Nail Shape and Length */}
        <path d={`M 15 36 ${nailShapeAndLength[shape][lengthVal] || DefaultNailAndLength}`} stroke="black" strokeWidth="0.5" fill={nailColor} style={{transition: 'all 0.3s'}} />

      </svg>
  }
}

// eye LASH brush