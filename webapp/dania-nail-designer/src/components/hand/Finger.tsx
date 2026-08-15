import { useEffect, useRef, useState } from "react";
import { NailLengthId, NailShapeId } from "../../constants/design-constants";
import { DefaultNailAndLength, NailSvgHeight, nailShapeAndLength } from "../../constants/other-constants";
import { interpolateSvgPath } from "../../service/helpers";

// const nailColor = '#f3d4da';

interface Props {
  shape: NailShapeId | null,
  length: NailLengthId | null;
}

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getNailPath(shape: NailShapeId | null, length: NailLengthId | null): string {
  const shapeVal = shape ?? 'round';
  const lengthVal = length ?? 'none';
  return `M 15 36 ${nailShapeAndLength[shapeVal][lengthVal] || DefaultNailAndLength}`;
}

export function Finger({shape, length = 'none'}: Props) {
  const initialPath = getNailPath(shape, length);
  const [nailPath, setNailPath] = useState(initialPath);
  const previousPathRef = useRef(initialPath);

  useEffect(() => {
    const nextPath = getNailPath(shape, length);
    const fromPath = previousPathRef.current;

    if (fromPath === nextPath) {
      setNailPath(nextPath);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();
    const duration = 260;

    const step = (now: number) => {
      const completion = Math.min((now - startTime) / duration, 1);
      const eased = easeInOutCubic(completion);
      setNailPath(interpolateSvgPath(fromPath, nextPath, eased));

      if (completion < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        previousPathRef.current = nextPath;
      }
    };

    frameId = requestAnimationFrame(step);
    previousPathRef.current = nextPath;

    return () => cancelAnimationFrame(frameId);
  }, [shape, length]);

  const heightVal = NailSvgHeight['x_long'];

  return <svg className={'finger'} width={heightVal * 1.5} viewBox={`-${heightVal} -0 ${heightVal} 1`} xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(90)">
        
      {/* Finger meat */}
      <path d="M -25 0 C -25 10 -22 22 -19 30 C -13 45 13 45 19 30 C 22 22 25 10 25 0" stroke="black" strokeWidth="0.5" className="skin" />
      
      {/* Nail Bed mattress */}
      <path d="M -15 36 C -15 24 -15 16 -14 12 C -11 -1 11 -1 14 12 C 15 16 15 24 15 36" stroke="black" strokeWidth="0.5" className="nail" />
      
      {/* Nail Shape and Length */}
      <path d={nailPath} stroke="black" strokeWidth="0.5" className="nail nail-ext" />
    </g>
  </svg>
  
}

// eye LASH brush