import { getAppliedDesignElementCounts, getNailDesignElementsAsList } from "@/service/helpers";
import { createPortal } from "react-dom";
import { ComplexityScore, Design, DesignElements, NailBaseId, NailBases, NailDesignElem, NailDesignElemId, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId, NailShapes } from "../../constants/design-constants";
import { BASE_MANICURE_PRICE, BasePrice, LENGTH_EXTENSION_FEE, LengthPrice, NO_CHARGE, SHAPE_EXPANSION_BIG_FEE, SHAPE_EXPANSION_SMALL_FEE, ServicePrices, ShapePrice } from "../../constants/pricing-constants";
import { FloatingTotal } from "./FloatingTotal";


function getDesignPrice(design: NailDesignElem, count: number): number {
  return design.type === 'art' 
    ? ComplexityScore[design.complexity] * count
    : design.type === 'base' 
    ? 5
    : 5 * count;
}

function getDesignById(id: NailDesignElemId) {
  return getNailDesignElementsAsList().find(design => design.id == id)!;
}

function getBasePrice(svcId: NailServiceId | null, baseId: NailBaseId | null) {
  if (svcId === 'refill' || baseId == null || svcId == null) {
    return NO_CHARGE;
  } else {
    return BasePrice[baseId];
  }
}

function getShapeDiff(val1: NailShapeId | null, val2: NailShapeId | null) {
  if (!val1 || !val2) return 0;
  return NailShapes[val1].size - NailShapes[val2].size;
}

function getLengthDiff(val1: NailLengthId | null, val2: NailLengthId | null) {
  if (!val1 || !val2) return 0;
  return NailLengths[val1].size - NailLengths[val2].size;
}

function getLengthFeePrice(svcId: NailServiceId | null, sLen: NailLengthId | null, cLen: NailLengthId | null) {
  let price = 0;
  if (svcId === 'new_set') return price;

  if (sLen && cLen) {
    const isReduction = NailLengths[sLen].size >= NailLengths[cLen].size;
    price = isReduction ? NO_CHARGE : LENGTH_EXTENSION_FEE;
  }
  return price;
}


function getShapeFeePrice(svcId: NailServiceId | null, sShp: NailShapeId | null, cShp: NailShapeId | null) {
  let price = 0;
  if (svcId === 'new_set') return price;

  if (sShp && cShp) {
    const shapeDiff = getShapeDiff(sShp, cShp);
    price = shapeDiff === 0 
            ? NO_CHARGE
            : Math.abs(shapeDiff) >= 2 ? SHAPE_EXPANSION_BIG_FEE : SHAPE_EXPANSION_SMALL_FEE;
  }
  return price;
}

function getNailServicePrice(svcId: NailServiceId | null) {
  switch (svcId) {
    case null: return 0;
    case 'manicure': return BASE_MANICURE_PRICE;
    default: return ServicePrices[svcId];
  }
}

interface Props {
  nailDesign: Design;
  selectedServiceId: NailServiceId | null;
  startLength: NailLengthId | null;
  startShape: NailShapeId | null;
  isManiApplied: boolean | null;
}
export function Summary({ nailDesign, selectedServiceId, startLength, startShape, isManiApplied }: Props) {
  const {base, length, shape} = nailDesign.left;
  let shapeChangeFee = getShapeFeePrice(selectedServiceId, startShape, shape);
  let lengthChangeFee = getLengthFeePrice(selectedServiceId, startLength, length);
  
  if (selectedServiceId === 'new_set') {
    shapeChangeFee = NO_CHARGE;
    lengthChangeFee = NO_CHARGE;
  }

  const svcPrice = getNailServicePrice(selectedServiceId);
  const maniPrice = (selectedServiceId !== null && selectedServiceId in ServicePrices) && isManiApplied === true ? BASE_MANICURE_PRICE : 0;
  const bsePrice = getBasePrice(selectedServiceId, base);
  const lenPrice = length ? LengthPrice[ length ] : 0;
  const shpPrice = shape ? ShapePrice[ shape ] : 0;
  const designCount = getAppliedDesignElementCounts(nailDesign);

  const designTotal = [...designCount.entries()]
    .map(([id, count]: [id: NailDesignElemId, count: number]) => getDesignPrice(DesignElements[id], count))
    .reduce((total, price) => total + price, 0);
  
    
  const total = 
    shapeChangeFee + lengthChangeFee
    + svcPrice + maniPrice + bsePrice + shpPrice + lenPrice 
    + designTotal;

  
  return <div className="pt-4 pb-5 text-black">
    <h4 className="text-start mt-0">Summary</h4>

    <table className="w-100">

      <thead>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Attribute</th>
          <th className="text-start border-0 border-bottom dashed">Pick</th>
          <th className="text-start border-0 border-bottom dashed">Complexity</th>
          <th className="text-start border-0 border-bottom dashed">Price</th>
        </tr>
      </thead>

      <tbody>
        {selectedServiceId && <>
          <tr>
            <td className="text-start">Service</td>
            <td className="text-start fw-light">{NailServices[selectedServiceId].name}</td>
            <td />
            <td className="text-start fw-light">${svcPrice.toFixed(2)}</td>
          </tr>

          {maniPrice > 0 && <tr>
            <td />
            <td className="text-start fw-light ps-2">+ Manicure</td>
            <td />
            <td className="text-start fw-light">${BASE_MANICURE_PRICE.toFixed(2)}</td>
          </tr>}

          {lengthChangeFee > 0 && startLength && length && <tr>
            <td />
            <td className="text-start fw-light ps-2" colSpan={2}>
              + Length {getLengthDiff(startLength, length) > 0 ? 'Reduction' : 'Extension'} 
              {` (${NailLengths[startLength].label} -> ${NailLengths[length].label})`}
            </td>
            <td className="text-start fw-light">
              ${lengthChangeFee.toFixed(2)}
            </td>
          </tr>}

          {shapeChangeFee > 0 && startShape && shape && <tr>
            <td />
            <td className="text-start fw-light ps-2" colSpan={2}>
              + Shape {getShapeDiff(startShape, shape) > 0 ? 'Slimming' : 'Expansion'}
              {` (${NailShapes[startShape].label} -> ${NailShapes[shape].label})`}
            </td>
            <td className="text-start fw-light">
              ${shapeChangeFee.toFixed(2)}
            </td>
          </tr>}


        </>}
        {base && <>
          <tr>
            <td className="text-start">Base</td>
            <td className="text-start fw-light">{NailBases[ base ]}</td>
            <td />
            <td className="text-start fw-light">${bsePrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td />
            <td className="text-start fw-light ps-2" colSpan={2}>
              + {length ? NailLengths[length].label : ''} {shape ? NailShapes[shape].label : ''}
              {/* {length === startLength && <span className="fst-italic"> (Same length)</span>}
              {shape === startShape && <span className="fst-italic"> (Same shape)</span>} */}
            </td>
            <td className="text-start fw-light">${lenPrice.toFixed(2)}</td>
          </tr>
        
        </>}

        {[...designCount.entries()].map(([designId, count]) => {
          const design = getDesignById(designId);
          return <tr key={designId}>
            <td className="text-start">Design</td>
            <td className="text-start fw-lighter">{design.value.name}</td>
            <td className="text-start fw-lighter">{design.value.complexity} x{count}</td>
            <td className="text-start fw-lighter">${getDesignPrice(design.value, count).toFixed(2)}</td>
          </tr>
        })}
      </tbody>

      <tfoot>
        <tr>
          <td className="text-start fw-bold fst-italic pt-4">Total</td>
          <td></td>
          <td></td>
          <td className="text-start fw-bold fst-italic pt-4">${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    {createPortal(<FloatingTotal total={total}/>, document.body)}
</div>
}