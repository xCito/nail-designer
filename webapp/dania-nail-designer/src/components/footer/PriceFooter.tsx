import classNames from "classnames";
import { useState, PointerEvent, TouchEvent, useRef } from "react"

const START_HEIGHT = 60;

export function PriceFooter() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const startPos = useRef<number>(0);
  const startHeight = useRef<number>(0);
  const footerDiv = useRef<HTMLDivElement>(null);

  const onClick = (e: PointerEvent<HTMLDivElement>) => {
    console.log(e);
    setOpen(!isOpen);
  }

  const onTouchStart = (e: TouchEvent) => {
    console.log('start');
    if (footerDiv.current) {
      startPos.current = e.touches[0].screenY;
      startHeight.current = Number.parseInt(footerDiv.current.style.height.slice(0, -2));
    }
  }
  const onTouchMove = (e: TouchEvent) => {
    const startY = startPos.current;
    const d = startY - e.touches[0].screenY;
    console.log('now', d);

    if (footerDiv.current){
      const offset = Math.max(startHeight.current + d, START_HEIGHT);
      footerDiv.current.style.height = `${offset}px`;
      console.log(footerDiv.current.style)
    }
  }

  return <div 
    ref={footerDiv}
    onClick={onClick}
    onTouchMove={onTouchMove}
    onTouchStart={onTouchStart}
    style={{height: `${START_HEIGHT}px`}}
    className={classNames(
      "price d-flex align-items-center justify-content-center",
      {open: isOpen}
    )}>
    Total $10.00
  </div>
}