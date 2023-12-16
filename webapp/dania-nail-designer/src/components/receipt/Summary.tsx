import { getAppliedDesignElementCounts, getNailDesignElementsAsList } from "@/service/helpers";
import { ConsultationValue } from "@/types/other-types";
import { Fragment } from "react";
import { createPortal } from "react-dom";
import { ComplexityScore, Design, NailBaseId, NailBases, NailDesignElem, NailDesignElemId, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId, NailShapes } from "../../constants/design-constants";
import { DESIGN_REMOVAL_PRICE, NAIL_REMOVAL_PRICE, NO_CHARGE, NailServiceRates, SHAPE_EXPANSION_BIG_FEE, SHAPE_EXPANSION_SMALL_FEE } from "../../constants/pricing-constants";
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

// function getBasePrice(svcId: NailServiceId | null, baseId: NailBaseId | null) {
//   if (svcId === 'refill' || baseId == null || svcId == null) {
//     return NO_CHARGE;
//   } else {
//     return BasePrice[baseId];
//   }
// }

function getShapeDiff(val1: NailShapeId | null, val2: NailShapeId | null) {
  if (!val1 || !val2) return 0;
  return NailShapes[val1].size - NailShapes[val2].size;
}

function getLengthDiff(val1: NailLengthId | null, val2: NailLengthId | null) {
  if (!val1 || !val2) return 0;
  return NailLengths[val1].size - NailLengths[val2].size;
}

// function getLengthFeePrice(svcId: NailServiceId | null, sLen: NailLengthId | null, cLen: NailLengthId | null) {
//   let price = 0;
//   if (svcId === 'new_set') return price;

//   if (sLen && cLen) {
//     const isReduction = NailLengths[sLen].size >= NailLengths[cLen].size;
//     price = isReduction ? NO_CHARGE : LENGTH_EXTENSION_FEE;
//   }
//   return price;
// }


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
    {section: 'Add-On', items: []},
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
  const { consult, base, shape, length, designCounts } = args;
  const {service: svcId, startShape, startLen, isDesignRemoval, isEnhancementRemoval, isManiApplied } = consult;
  
  
   // Design & color
   if (designCounts.size > 0) {
    Array.from(designCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([id, count]) => {
      const design = getDesignById(id).value;
      const name = `${design.name} x${count}`;
      const price = getDesignPrice(design, count);
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
  if (isManiApplied && serviceRates.maniRate)
    summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Manicure', price: serviceRates.maniRate});

  // Service
  if (svcId === 'manicure' || svcId === 'take_down') 
    summaryDetails[SERVICE_INDEX].items.push({title: NailServices[svcId].name, price: serviceRates.rate});

  // Extension Service
  if (svcId === 'refill' || svcId === 'rebalance' || svcId === 'new_set') {
    const serviceName = NailServices[svcId].name;
    const baseName = base ? NailBases[base] : '';
    const basePrice = base !== null ? serviceRates.base?.[base] ?? -99999 : 0;
    const extName = `${baseName} ${serviceName}`;  
    const extPrice = serviceRates.rate + basePrice;
    summaryDetails[EXT_SERVICE_INDEX].items.push({title: extName, price: extPrice});
    
    
    if (length && serviceRates.length) {
      const diff = getLengthDiff(startLen, length);
      const lengthLabel = diff === 0 ? 'Same' : diff > 0 ? 'Shorted' : 'Extended';
      summaryDetails[EXT_SERVICE_INDEX].items.push({
        title: `${NailLengths[length].label} Length (${lengthLabel})`, 
        price: serviceRates.length[length]
      });
    }
  }
  // Add-On
  if (shape !== startShape) {/* Shape change, Gel removal, skin buffing */ 
    const shapeChangeFee = getShapeFeePrice(svcId, startShape, shape);
    const shapeLabel = getShapeDiff(startShape, shape) > 0 ? 'Slimming' : 'Expansion';
    summaryDetails[ADD_ON_INDEX].items.push({title: `Shape Change (${shapeLabel})`, price: shapeChangeFee});
  }


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
  // let shapeChangeFee = getShapeFeePrice(svcId, startShape, shape);
  // let lengthChangeFee = getLengthFeePrice(svcId, startLength, length);
  
  // if (svcId === 'new_set') {
  //   shapeChangeFee = NO_CHARGE;
  //   lengthChangeFee = NO_CHARGE;
  // }

  // const svcPrice = getNailServicePrice(svcId);
  // const maniPrice = getManicurePrice(svcId, isManiApplied);
  // const bsePrice = getBasePrice(svcId, base);
  // const lenPrice = length ? LengthPrice[ length ] : 0;
  // const shpPrice = shape ? ShapePrice[ shape ] : 0;
  // const designCount = getAppliedDesignElementCounts(nailDesign);

  // const designTotal = [...designCount.entries()]
  //   .map(([id, count]: [id: NailDesignElemId, count: number]) => getDesignPrice(DesignElements[id], count))
  //   .reduce((total, price) => total + price, 0);
  


  // const total = 
  //   shapeChangeFee + lengthChangeFee
  //   + svcPrice + maniPrice + bsePrice + shpPrice + lenPrice 
  //   + designTotal;

  
  return <div className="pt-4 pb-5 text-black">
    <h4 className="text-start mt-0">Summary</h4>

    <table className="w-100">

      <thead>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Service</th>
          <th className="text-start border-0 border-bottom dashed">Prices</th>
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
              <td className="ps-5">+ {item.title}</td>
              <td>${item.price.toFixed(2)}</td>    
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
    {/* <table className="w-100">

      <thead>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Attribute</th>
          <th className="text-start border-0 border-bottom dashed">Pick</th>
          <th className="text-start border-0 border-bottom dashed">Complexity</th>
          <th className="text-start border-0 border-bottom dashed">Price</th>
        </tr>
      </thead>

      <tbody>

        

        {svcId && base && <>
          <tr>
            <td className="text-start">Service</td>
            <td className="text-start fw-light">{NailBases[base]} {NailServices[svcId].name}</td>
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
              {shape === startShape && <span className="fst-italic"> (Same shape)</span>} }
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
    </table> */}

    {createPortal(<FloatingTotal total={total}/>, document.body)}
</div>
}