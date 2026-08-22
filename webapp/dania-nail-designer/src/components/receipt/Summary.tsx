import { getAddOnServicesAsList, getAppliedDesignElementCounts, getNailDesignElementsAsList } from "@/service/helpers";
import { ConsultationValue } from "@/types/other-types";
import classNames from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";
import { ComplexityScore, Design, NailBaseId, NailBases, NailDesignElemId, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId } from "../../constants/design-constants";
import { AddOnPrices, BASE_COLOR_PRICE, DESIGN_REMOVAL_PRICE, NAIL_REMOVAL_PRICE, NailServiceRates, OrnamentPrices } from "../../constants/pricing-constants";
import { ExpandIcon } from "../ExpandIcon";
import { CloseIcon } from "../CloseIcon";
import { CollapseIcon } from "../CollapseIcon";

const SWIPE_DRAG_THRESHOLD = 90;
type DrawerState = "close" | "open" | "full";


function getDesignPrice(designId: NailDesignElemId, count: number): number {
  const design = getDesignById(designId);

  switch(design.value.type) {
    case 'art': return ComplexityScore[design.value.complexity] * count;
    case 'base': return BASE_COLOR_PRICE;
    case 'item': return OrnamentPrices[design.id]! * count;
  }
}

function getDesignById(id: NailDesignElemId) {
  return getNailDesignElementsAsList().find(design => design.id == id)!;
}

// function getBasePrice(svcId: NailServiceId | null, baseId: NailBaseId | null) {
//   if (svcId === 'refill' || baseId == null || svcId == null) {
//     return NO_CHARGE;
//   } else {
//     return BasePrice[baseId];
//   }
// }

// function getShapeDiff(val1: NailShapeId | null, val2: NailShapeId | null) {
//   if (!val1 || !val2) return 0;
//   return NailShapes[val1].size - NailShapes[val2].size;
// }

// function getLengthDiff(val1: NailLengthId | null, val2: NailLengthId | null) {
//   if (!val1 || !val2) return 0;
//   return NailLengths[val1].size - NailLengths[val2].size;
// }

// function getLengthFeePrice(svcId: NailServiceId | null, sLen: NailLengthId | null, cLen: NailLengthId | null) {
//   let price = 0;
//   if (svcId === 'new_set') return price;

//   if (sLen && cLen) {
//     const isReduction = NailLengths[sLen].size >= NailLengths[cLen].size;
//     price = isReduction ? NO_CHARGE : LENGTH_EXTENSION_FEE;
//   }
//   return price;
// }


// function getShapeFeePrice(svcId: NailServiceId | null, sShp: NailShapeId | null, cShp: NailShapeId | null) {
//   let price = 0;
//   if (svcId === 'new_set') return price;

//   if (sShp && cShp) {
//     const shapeDiff = getShapeDiff(sShp, cShp);
//     price = shapeDiff === 0 
//             ? NO_CHARGE
//             : Math.abs(shapeDiff) >= 2 ? SHAPE_EXPANSION_BIG_FEE : SHAPE_EXPANSION_SMALL_FEE;
//   }
//   return price;
// }

// function getNailServicePrice(svcId: NailServiceId | null) {
//   switch (svcId) {
//     case null: return 0;
//     case 'manicure': return BASE_MANICURE_PRICE;
//     default: return ServicePrices[svcId];
//   }
// }

// function getManicurePrice(svcId: NailServiceId | null, maniApplied: boolean | null) {
//   if (svcId === null) return 0;

//   if (svcId in ServicePrices && maniApplied) {
//     return BASE_MANICURE_PRICE;
//   } else {
//     return 0;
//   }
// }

const PRE_SERVICE_INDEX = 0;
const SERVICE_INDEX = 1;
const EXT_SERVICE_INDEX = 2;
const ADD_ON_INDEX = 3;
const DESIGN_INDEX = 4;
function getDefaultDetails(): Array<Detail> { 
  return [
    {section: 'Pre-Service', items: []},
    {section: 'Service', items: []},
    {section: 'Ext-Service', items: []},
    {section: 'Add-Ons', items: []},
    {section: 'Color & Design', items: []},
  ];
}
interface Detail { section: string, items: Array<{title: string, price: number}> }
interface DetailArgs { 
  consult: ConsultationValue,
  base: NailBaseId | null,
  shape: NailShapeId | null,
  length: NailLengthId | null,
  designCounts: ReturnType<typeof getAppliedDesignElementCounts>,
}
function getSummaryDetails(args: DetailArgs) {
  const summaryDetails: Array<Detail> = getDefaultDetails();
  const { consult, base, length, designCounts } = args;
  const {service: svcId, isDesignRemoval, isEnhancementRemoval, addOns } = consult;
  
  
  // Design & color
  if (designCounts.size > 0) {
    Array.from(designCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([id, count]) => {
      const design = getDesignById(id).value;
      const name = design.type !== 'base' ? `${design.name} x${count}` : design.name;
      const price = getDesignPrice(id, count);
      summaryDetails[DESIGN_INDEX].items.push({title: name, price: price});
    });
  }
  
  if (!svcId) return summaryDetails;

  const serviceRates = NailServiceRates[svcId];
  
  // Pre-service
  if (isDesignRemoval) 
    summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Design Removal', price: DESIGN_REMOVAL_PRICE});
  if (isEnhancementRemoval)
    summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Enhancement Removal', price: NAIL_REMOVAL_PRICE});


  switch (svcId) {
    // Pre-Service
    case 'manicure': {
      const serviceName = NailServices[svcId].name;
      const baseName = base ? NailBases[base] : '';
      const basePrice = base !== null ? serviceRates.base?.[base] ?? -99999 : 0;
      const maniName = `${baseName} ${serviceName}`;
      const maniPrice = serviceRates.rate + basePrice;
      summaryDetails[SERVICE_INDEX].items.push({title: maniName, price: maniPrice});
      break;
    }
    // Pre-Service
    case 'pedicure': {
      const serviceName = NailServices[svcId].name;
      const baseName = base ? NailBases[base] : '';
      const basePrice = base !== null ? serviceRates.base?.[base] ?? -99999 : 0;
      const pedName = `${baseName} ${serviceName}`;
      const pedPrice = serviceRates.rate + basePrice;
      summaryDetails[SERVICE_INDEX].items.push({title: pedName, price: pedPrice});
      break;
    }
    // Pre-Service
    case 'take_down': {
      summaryDetails[SERVICE_INDEX].items.push({title: NailServices[svcId].name, price: serviceRates.rate});
      break;
    }
    // Extension Service
    case 'rebalance':
    case 'new_set': {
      const serviceName = NailServices[svcId].name;
      let baseId = base as NailBaseId;

      // IDC defaults to PolyGel
      if (base === 'NoCare') { baseId = 'PolyGel' }

      const baseName = baseId ? NailBases[baseId] : '';
      const basePrice = baseId !== null ? serviceRates.base?.[baseId] ?? -99999 : 0;
      const extName = `${baseName} ${serviceName}`;  
      const extPrice = serviceRates.rate + basePrice;
      summaryDetails[EXT_SERVICE_INDEX].items.push({title: extName, price: extPrice});
      
      
      if (length && serviceRates.length) {
        summaryDetails[EXT_SERVICE_INDEX].items.push({
          title: `${NailLengths[length].label} Length`, 
          price: serviceRates.length[length] 
        });
      }

      summaryDetails[EXT_SERVICE_INDEX].items.push({
        title: `Manicure`, 
        price: 0
      });
      break;
    }
    default: {
      throw new Error(`Unknown service id: ${svcId}`);
    }
  }


  // Add-Ons  /* Shape change, Gel removal, skin buffing */ 
  addOns.forEach(addOnId => {
    const addOn = getAddOnServicesAsList().find(addOn => addOn.id === addOnId);
    if (addOn) {
      const price = AddOnPrices[addOnId] ?? 0;
      summaryDetails[ADD_ON_INDEX].items.push({title: addOn.value.name, price: price});
    }
  });


  return summaryDetails;
}

interface Props {
  nailDesign: Design;
  consultionData: ConsultationValue,
  selectedServiceId: NailServiceId | null;
  startLength: NailLengthId | null;
  startShape: NailShapeId | null;
  isManiApplied: boolean | null;
}
export function Summary({ nailDesign, consultionData }: Props) {
  const {base, length, shape} = nailDesign.left;
  const [isOpen, setOpen] = useState<DrawerState>('close');
  const [dragOffset, setDragOffset] = useState(0);
  const dragState = useRef({ active: false, startY: 0, currentState: 'close' as DrawerState });

  const summaryDetails = getSummaryDetails({
    consult: consultionData, 
    base, 
    length, 
    shape, 
    designCounts: getAppliedDesignElementCounts(nailDesign)
  });
  

  const total = summaryDetails.reduce((sum, section) => {
    return sum + section.items.reduce((subTotal, item) => subTotal + item.price, 0);
  }, 0);

  const resolveDragState = (currentState: DrawerState, deltaY: number): DrawerState => {
    if (currentState === 'close') {
      return deltaY < -SWIPE_DRAG_THRESHOLD ? 'open' : 'close';
    }

    if (currentState === 'open') {
      if (deltaY > SWIPE_DRAG_THRESHOLD) return 'close';
      if (deltaY < -SWIPE_DRAG_THRESHOLD) return 'full';
      return 'open';
    }

    if (deltaY > SWIPE_DRAG_THRESHOLD) return 'open';
    if (deltaY < -SWIPE_DRAG_THRESHOLD) return 'full';
    return 'full';
  };

  useEffect(() => {
    const clickHandler = function (e: MouseEvent) {
      if (e.target && isOpen !== 'close') {
        const sumElem = document.getElementById('summary-d')!;
        const { top, bottom, left, right } = sumElem.getBoundingClientRect();
        const isInside = top < e.y && e.y < bottom && left < e.x && e.x < right;
        if (!isInside)
          setOpen('close');
      }
    };

    if (isOpen) {
      // Wait for animation to finish
      setTimeout(() => document.addEventListener('click', clickHandler), 100);
    }
    
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, [isOpen]);

  const onHeaderClick = () => {
    if (isOpen === 'close')
      setOpen('open');
  }
 
  const onFullClick = () => {
    if (isOpen === 'open')
      setOpen('full');
    else if (isOpen === 'full')
      setOpen('open');
  }
 
  const onMiniClick = () => {
    setOpen('close');
  }

  const onBackdropClick = () => {
    setOpen('close');
  }

  const getDrawerHeight = (state: DrawerState) => {
    if (typeof window === 'undefined') return 56;

    const viewportHeight = window.innerHeight;
    const fullHeight = Math.min(viewportHeight - 110, 680);

    switch (state) {
      case 'close': return 56;
      case 'open': return Math.min(Math.max(viewportHeight * 0.42, 220), 360);
      case 'full': return Math.max(Math.min(fullHeight, viewportHeight * 0.8), 360);
      default: return 56;
    }
  };

  const getVisualHeight = () => {
    if (!dragState.current.active) return getDrawerHeight(isOpen);

    const baseHeight = getDrawerHeight(dragState.current.currentState);
    return baseHeight - dragOffset;
  };

  const startDrag = (clientY: number) => {
    dragState.current = {
      active: true,
      startY: clientY,
      currentState: isOpen,
    };
    setDragOffset(0);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startDrag(event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    const deltaY = event.clientY - dragState.current.startY;

    if (Math.abs(deltaY) > 8) {
      setDragOffset(deltaY);
      event.preventDefault();
    }
  };

  const onPointerUp = () => {
    if (!dragState.current.active) return;

    const nextState = resolveDragState(dragState.current.currentState, dragOffset);
    setOpen(nextState);
    setDragOffset(0);
    dragState.current.active = false;
  };

  const onCopyClick = () => {
    let text = "";

    for (const sumDetail of summaryDetails) {
      const row = sumDetail.section.toUpperCase();

      if (sumDetail.items.length === 0) {
        continue;
      }
      text += `\n[ ${row} ]\n`
      for (const item of sumDetail.items) {
        const amt = ` $${item.price.toString().padStart(3, " ")}`
        text += `${amt} - ${item.title} ${item.price === 0 ? '(Included)' : ''}\n`
      }
    }

    if (text !== "") {
      text += `${"-".repeat(30)}\nTotal: $${total.toFixed(2)}`.padStart(38, ' ')
    }

    navigator.clipboard.writeText(text);
  }

  return <>
    {isOpen !== 'close' ? <div className="summary-backdrop" onClick={onBackdropClick} /> : null}
    <div
      className={classNames("summary-drawer", {'open': isOpen === 'open'}, {'open full': isOpen === 'full'})}
      style={{
        height: `${getVisualHeight()}px`,
        transition: dragState.current.active ? 'none' : undefined,
      }}
    >

      <div
        className="header px-3 py-3"
        role='button'
        onClick={onHeaderClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <h3 className="title m-0">Summary</h3>
        <h3 className="text-center price m-0">Total ${total.toFixed(2)}</h3>
        <div className="btn-group">
          <button className="" onClick={onFullClick}>
            {isOpen === 'full' ? <CollapseIcon /> : <ExpandIcon />}
          </button>
          <button className="" onClick={onMiniClick}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div id="summary-d" className="summary-table pb-2 px-3">
        <table className="w-100 mb-3">
          <thead>
            <tr>
              <th className="text-start">Service</th>
              <th className="text-start">Prices</th>
            </tr>
          </thead>

          <tbody>
            {summaryDetails.map((sumDetail) => <Fragment key={sumDetail.section}>
              {sumDetail.items.map((item, index) => <Fragment key={item.title}>
                {index === 0 && <tr>
                  {<td>{sumDetail.section}</td>}
                  <td />
                </tr>}
                <tr>
                  <td className="fst-italic ps-5">+ {item.title}</td>
                  <td>{item.price === 0 ? 'Included' : `$${item.price.toFixed(2)}`}</td>    
                </tr>
              </Fragment>)}
            </Fragment>)}
          </tbody>

          <tfoot>
            <tr>
              <td className="text-start fw-bold fst-italic pt-4">Total</td>
              <td className="text-start fw-bold fst-italic pt-4">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button className="copy-btn" onClick={onCopyClick} >Copy Table Details</button>
      </div>
    
    </div>
  </>
}