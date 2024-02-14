import classNames from "classnames";
import { useState, PointerEvent, TouchEvent, useRef, useContext } from "react";
import { Summary } from "../receipt/Summary";
import { DesignContext } from "@/contexts/DesignContext";

const MIN_SWIPE_THRESHOLD = 20;


let holdTransition: string;
export function PriceFooter() {
  const { nailDesign, consultData } = useContext(DesignContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const startPos = useRef<number>(-10);
  const startH = useRef<number>(0);
  const lastPos = useRef<number>(-10);
  const footerDiv = useRef<HTMLDivElement>(null);

  const onClick = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setOpen(!isOpen);
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    startPos.current = e.touches[0].clientY;

    if (footerDiv.current) {
      startH.current = footerDiv.current.clientHeight;
      holdTransition = footerDiv.current.style.transition;
      footerDiv.current.style.transition = 'none';
    }
    const root = document.getElementsByTagName('body')[0];
    if (root) {
      root.classList.add('no-scroll');
    }
  }
  
  const onTouchMove = (e: TouchEvent) => {
    lastPos.current = e.touches[0].clientY;
    const d = startPos.current - lastPos.current;

    if (footerDiv.current){
      footerDiv.current.style.height = `${startH.current + d}px`;
    }
  }
  
  const onTouchEnd = () => {
    
    const diff = startPos.current - lastPos.current;
    const root = document.getElementsByTagName('body')[0];
    if (root) {
      root.classList.remove('no-scroll');
    }
    if (footerDiv.current) {
      footerDiv.current.style.transition = holdTransition;
      footerDiv.current.style.height = '';
    }
    if ((lastPos.current < 0 && startPos.current < 0) || footerDiv.current == null) {
      return;
    }

    if (MIN_SWIPE_THRESHOLD > Math.abs(diff)) return;

    if (diff > 0 && !isOpen) { // swipe up
      footerDiv.current.classList.add('open');
      startPos.current = -10;
      lastPos.current = -10;
      setOpen(true);
    }
    if (diff < 0 && isOpen) { // swipe down
      footerDiv.current.classList.remove('open');
      startPos.current = -10;
      lastPos.current = -10;
      setOpen(false);
    }
  }

  return <div 
    ref={footerDiv}
    onPointerUp={onClick}
    onTouchMove={onTouchMove}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    className={classNames(
      "price",
      {open: isOpen}
    )}>
    {!isOpen && <div className="h-100 d-flex align-items-center justify-content-center">Total $10.00</div>}

    {isOpen && 
      <Summary 
        consultionData={consultData} 
        nailDesign={nailDesign}/>
    }
  </div>
}