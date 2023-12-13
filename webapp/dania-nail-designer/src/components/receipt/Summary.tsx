import { getAppliedDesignElementCounts, getNailDesignElementsAsList } from "@/service/helpers";
import { createPortal } from "react-dom";
import { ComplexityScore, Design, DesignElements, NailBaseId, NailBases, NailDesignElem, NailDesignElemId, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId, NailShapes } from "../../constants/design-constants";
import { BASE_MANICURE_PRICE, BasePrice, NO_CHARGE, LengthPrice, SHAPE_EXPANSION_BIG_FEE, ServicePrices, ShapePrice, TAKE_DOWN_PRICE, SHAPE_EXPANSION_SMALL_FEE } from "../../constants/pricing-constants";
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

function getNailServicePrice(svcId: NailServiceId | null) {
  switch (svcId) {
    case null: return 0;
    case 'manicure': return BASE_MANICURE_PRICE;
    case 'take_down': return TAKE_DOWN_PRICE;
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
  const lenDiff = startLength ? NailLengths[startLength].size - NailLengths[length].size : 0;
  const shapeDiff = startShape ? NailShapes[startShape].size - NailShapes[shape].size : 0;
  let shapeChangeFee = Math.abs(shapeDiff) >= 2 ? SHAPE_EXPANSION_BIG_FEE : SHAPE_EXPANSION_SMALL_FEE;
  let lengthChangeFee = lenDiff < 0  ? 5 : NO_CHARGE;

  if (selectedServiceId === 'new_set') {
    shapeChangeFee = NO_CHARGE;
    lengthChangeFee = NO_CHARGE;
  }

  const svcPrice = getNailServicePrice(selectedServiceId);
  const maniPrice = (selectedServiceId !== null && selectedServiceId in ServicePrices) && isManiApplied === true ? BASE_MANICURE_PRICE : 0;
  const bsePrice = getBasePrice(selectedServiceId, base);
  const lenPrice = LengthPrice[ length ];
  const shpPrice = ShapePrice[ shape ];
  const designCount = getAppliedDesignElementCounts(nailDesign);

  const designTotal = [...designCount.entries()]
    .map(([id, count]: [id: NailDesignElemId, count: number]) => getDesignPrice(DesignElements[id], count))
    .reduce((total, price) => total + price, 0);
  
  const total = 
    shapeChangeFee + lengthChangeFee
    + svcPrice + maniPrice + bsePrice + shpPrice + lenPrice 
    + designTotal;

  
  return <div className="pt-4 pb-5 text-black mx-3">
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

          {lenDiff !== 0 && startLength && <tr>
            <td />
            <td className="text-start fw-light ps-2" colSpan={2}>
              + Length {lenDiff > 0 ? 'Reduction' : 'Extension'} 
              {` (${NailLengths[startLength].label} -> ${NailLengths[length].label})`}
            </td>
            <td className="text-start fw-light">
              ${lengthChangeFee.toFixed(2)}
            </td>
          </tr>}

          {shapeDiff !== 0 && startShape && <tr>
            <td />
            <td className="text-start fw-light ps-2" colSpan={2}>
              + Shape {shapeDiff > 0 ? 'Slimming' : 'Expansion'}
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
              + {NailLengths[ length ].label} {NailShapes[ shape ].label}
              {length === startLength && <span className="fst-italic"> (Same length)</span>}
              {shape === startShape && <span className="fst-italic"> (Same shape)</span>}
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
          <td className="text-start fw-bolder fst-italic pt-4">Total</td>
          <td></td>
          <td></td>
          <td className="text-start fw-light fst-italic pt-4">${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    {createPortal(<FloatingTotal total={total}/>, document.body)}
</div>
}