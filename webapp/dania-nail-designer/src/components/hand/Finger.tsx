import { NailLengthId, NailShapeId } from "../../constants/design-constants";
import { DefaultNailAndLength, NailSvgHeight, nailShapeAndLength } from "../../constants/other-constants";


const isDiv = false;
const nailColor = '#f3d4da';


// const sizes = Object.keys(NailLengths) as NailLengthId[];
// const shapes = Object.keys(NailShapes) as NailShapeId[];
// const UPDATE_SIZE_MS = 1000;
// const getInitValY = function* (): Generator<number, number, number> { 
//   let i = 0;
//   while(true)
//     yield i++ 
// }; 
// const getInitVal = getInitValY();

interface Props {
  shape: NailShapeId,
  length: NailLengthId
}
export function Finger({shape, length}: Props) {
  // const [lengthVal, setLengthVal] = useState(length);
  // const [shapeVal, setShapeVal] = useState(shape);
  const heightVal = NailSvgHeight['xx_long'];
  // console.log(lengthVal);

  // Animation reasons
  // useEffect(() => {
  //   if (NailSvgHeight[length] > NailSvgHeight[lengthVal]) {
  //     setLengthVal(length);
  //     return;
  //   } 
  //   const int = setTimeout(() => setLengthVal(length), 100);
  //   return () => clearTimeout(int);
  // }, [length, lengthVal]);




  if (isDiv) {
      return <div className="finger" />
  } else {
      return <svg height={heightVal} viewBox={`-50 0 90 ${heightVal}`} xmlns="http://www.w3.org/2000/svg">
        {/* Finger meat */}
        <path d="M -25 0 C -25 10 -22 22 -19 30 C -13 45 13 45 19 30 C 22 22 25 10 25 0" stroke="black" strokeWidth="0.5" style={{fill: "#e6bc98"}} />
        
        {/* Nail Bed mattress */}
        <path d="M -15 36 C -15 24 -15 16 -14 12 C -11 -1 11 -1 14 12 C 15 16 15 24 15 36" stroke="black" strokeWidth="0.5" fill={nailColor} />
        
        {/* Nail Shape and Length */}
        <path d={`M 15 36 ${nailShapeAndLength[shape][length] || DefaultNailAndLength}`} stroke="black" strokeWidth="0.5" fill={nailColor} style={{transition: 'all 0.3s'}} />
      </svg>
  }
}

// eye LASH brush