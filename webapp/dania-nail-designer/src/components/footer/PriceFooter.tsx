import classNames from "classnames";
import { useState, PointerEvent, TouchEvent, useRef } from "react";

const MAX_SWIPE_THRESHOLD = 500;
const MIN_SWIPE_THRESHOLD = 40;

export function PriceFooter() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const startPos = useRef<number>(-10);
  const lastPos = useRef<number>(-10);
  const footerDiv = useRef<HTMLDivElement>(null);

  const onClick = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setOpen(!isOpen);
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    startPos.current = e.touches[0].clientY;
  }
  
  const onTouchMove = (e: TouchEvent) => {
    lastPos.current = e.touches[0].clientY;
  }

  const onTouchEnd = (e: TouchEvent) => {
    const diff = startPos.current - lastPos.current;
  
    if ((lastPos.current < 0 && startPos.current < 0) || footerDiv.current == null) {
      return;
    }

    if (diff >= MIN_SWIPE_THRESHOLD && diff < MAX_SWIPE_THRESHOLD) { // swipe up
      footerDiv.current.classList.add('open');
      startPos.current = -10;
      lastPos.current = -10;
    }
    if (diff <= MIN_SWIPE_THRESHOLD && diff > -MAX_SWIPE_THRESHOLD) { // swipe down
      footerDiv.current.classList.remove('open');
      startPos.current = -10;
      lastPos.current = -10;
    }
  }

  return <div 
    ref={footerDiv}
    onPointerUp={onClick}
    onTouchMove={onTouchMove}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    className={classNames(
      "price d-flex align-items-center justify-content-center",
      {open: isOpen}
    )}>
    Total $10.00
  </div>
}