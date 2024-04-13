import classNames from "classnames";
import { useState, PointerEvent, TouchEvent, useRef, useContext, useEffect } from "react";
import { Summary } from "../receipt/Summary";
import { NailServiceContext } from "@/contexts/NailServiceContext";
import { getSummaryDetails } from "@/service/helpers";

const MIN_SWIPE_THRESHOLD = 20;
const MIN_HEIGHT = 60;
const MAX_OPACITY = 0.5;


let holdTransition: string;
export function PriceFooter() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const startPos = useRef<number>(-10);
  const startH = useRef<number>(0);
  const lastPos = useRef<number>(-10);
  const footerDiv = useRef<HTMLDivElement>(null);
  const bgOverlay = useRef<HTMLDivElement>(null);
  const touchActive = useRef<boolean>(false);

  const { nailService } = useContext(NailServiceContext);
  const summaryDetails = getSummaryDetails(nailService);
  

  const total = summaryDetails.reduce((sum, section) => {
    return sum + section.items.reduce((subTotal, item) => {
      return subTotal + item.price + (item.sub || []).reduce((sum, subItem) => sum + subItem.price, 0);
    }, 0);
  }, 0);
 

  // Listen for outside-of-footer, click events
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (!isOpen) return;
      if (!footerDiv.current) return;
      const x = e.clientX, y = e.clientY;
      const t = footerDiv.current.offsetTop;
      const l = footerDiv.current.offsetLeft;
      const w = footerDiv.current.offsetWidth;
      const h = footerDiv.current.offsetHeight;
      
      if (!(t <= y && t+h >= y && l <= x && l+w >= x)) {
        e.stopPropagation();
        setOpen(false);
      }

    }

    isOpen && document.addEventListener('click', onOutsideClick, { capture: true });
    return () => {
      document.removeEventListener('click', onOutsideClick, { capture: true });

    }
  }, [isOpen, footerDiv.current]);

  // Prevent Browser swipe down to refresh
  useEffect(() => {
    const root = document.getElementsByTagName('body')[0];
    if (isOpen || touchActive.current) {
      root.classList.add('no-scroll');
    } else {
      root.classList.remove('no-scroll');
    }
  }, [isOpen]);

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

    touchActive.current = true;
  }
  
  const onTouchMove = (e: TouchEvent) => {
    lastPos.current = e.touches[0].clientY;
    const d = startPos.current - lastPos.current;

    const rootElem = document.getElementById('root');
    const calcHeight = Math.max(startH.current + d, MIN_HEIGHT);
    const calcOpacity = Math.min(calcHeight / (rootElem?.clientHeight ?? 500), MAX_OPACITY);

    if (footerDiv.current) {
      footerDiv.current.style.height = `${calcHeight}px`;
    }
    if (bgOverlay.current) {
      bgOverlay.current.style.opacity = `${calcOpacity}`;
    }
  }
  
  const onTouchEnd = () => {
    
    const diff = startPos.current - lastPos.current;

    touchActive.current = false;
    // const root = document.getElementsByTagName('body')[0];
    // if (root) {
    //   root.classList.remove('no-scroll');
    // }
    if (footerDiv.current) {
      footerDiv.current.style.transition = holdTransition;
      footerDiv.current.style.height = '';
    }
    if (bgOverlay.current) bgOverlay.current.style.opacity = '';

    if ((lastPos.current < 0 && startPos.current < 0) || footerDiv.current == null) {
      return;
    }

    if (MIN_SWIPE_THRESHOLD > Math.abs(diff)) return;

    if (diff > 0 && !isOpen) { // swipe up
      startPos.current = -10;
      lastPos.current = -10;
      setOpen(true);
    }
    if (diff < 0 && isOpen) { // swipe down
      startPos.current = -10;
      lastPos.current = -10;
      setOpen(false);
    }
  }

  return <div>
    <div ref={bgOverlay} className={classNames("price-bg-overlay", {open: isOpen})} />
    <div 
      ref={footerDiv}
      onPointerUp={onClick}
      // onTouchMove={onTouchMove}
      // onTouchStart={onTouchStart}
      // onTouchEnd={onTouchEnd}
      className={classNames(
        "price",
        {open: isOpen}
      )}>
      {/* Drag handle */}
      <div 
        className={classNames("price-drag-handle", {open: isOpen})}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd} />
      {!isOpen && <div className="h-100 d-flex align-items-center justify-content-center">Total ${total.toFixed(2)}</div>}


      {/* Price Summary Contents */}
      {isOpen && <>
        <Summary summaryDetails={summaryDetails} total={total} />
      </>}
    </div>
  </div>
}