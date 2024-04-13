import { Detail } from "@/service/helpers";
import { Fragment } from "react";


// function getDesignPrice(designId: NailDesignElemId, count: number): number {
//   const design = getDesignById(designId);

//   switch(design.value.type) {
//     case 'art': return ComplexityScore[design.value.complexity] * count;
//     case 'base': return BASE_COLOR_PRICE;
//     case 'item': return OrnamentPrices[design.id]! * count;
//   }
// }

// function getDesignById(id: NailDesignElemId) {
//   return getNailDesignElementsAsList().find(design => design.id == id)!;
// }


// function getShapeDiff(val1: NailShapeId | null, val2: NailShapeId | null) {
//   if (!val1 || !val2) return 0;
//   return NailShapes[val1].size - NailShapes[val2].size;
// }

// function getLengthDiff(val1: NailLengthId | null, val2: NailLengthId | null) {
//   if (!val1 || !val2) return 0;
//   return NailLengths[val1].size - NailLengths[val2].size;
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


// const PRE_SERVICE_INDEX = 0;
// const SERVICE_INDEX = 1;
// const EXT_SERVICE_INDEX = 2;
// const ADD_ON_INDEX = 3;
// const DESIGN_INDEX = 4;
// function getDefaultDetails(): Array<Detail> { 
//   return [
//     {section: 'Pre-Service', items: []},
//     {section: 'Service', items: []},
//     {section: 'Ext-Service', items: []},
//     {section: 'Add-On', items: []},
//     {section: 'Color & Design', items: []},
//   ];
// }

// interface DetailArgs { 
//   consult: ConsultationValue,
//   base: NailBaseId | null,
//   shape: NailShapeId | null,
//   length: NailLengthId | null,
//   designCounts: ReturnType<typeof getAppliedDesignElementCounts>,
// }
// function getSummaryDetails(args: DetailArgs) {
//   const summaryDetails: Array<Detail> = getDefaultDetails();
//   const { consult, base, shape, length, designCounts } = args;
//   const {service: svcId, startShape, startLen, isDesignRemoval, isEnhancementRemoval, isManiApplied } = consult;
  
  
//    // Design & color
//    if (designCounts.size > 0) {
//     Array.from(designCounts.entries())
//     .sort((a, b) => a[0].localeCompare(b[0]))
//     .forEach(([id, count]) => {
//       const design = getDesignById(id).value;
//       const name = `${design.name} x${count}`;
//       const price = getDesignPrice(id, count);
//       summaryDetails[DESIGN_INDEX].items.push({title: name, price: price});
//     });
//   }
  
//   if (!svcId) return summaryDetails;

//   const serviceRates = NailServiceRates[svcId];
  
//   // Pre-service
//   if (isDesignRemoval) 
//     summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Design Removal', price: DESIGN_REMOVAL_PRICE});
//   if (isEnhancementRemoval)
//     summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Enhancement Removal', price: NAIL_REMOVAL_PRICE});
//   if (isManiApplied && serviceRates.maniRate)
//     summaryDetails[PRE_SERVICE_INDEX].items.push({title: 'Manicure', price: serviceRates.maniRate});

//   // Service
//   if (svcId === 'manicure' || svcId === 'take_down') {
//     summaryDetails[SERVICE_INDEX].items.push({title: NailServices[svcId].name, price: serviceRates.rate});

//     // TODO: handle base selection here
//   }

//   // Extension Service
//   if (svcId === 'refill' || svcId === 'rebalance' || svcId === 'new_set') {
//     const serviceName = NailServices[svcId].name;
//     const baseName = base ? NailBases[base] : '';
//     const basePrice = base !== null ? serviceRates.base?.[base] ?? -99999 : 0;
//     const extName = `${baseName} ${serviceName}`;  
//     const extPrice = serviceRates.rate + basePrice;
//     summaryDetails[EXT_SERVICE_INDEX].items.push({title: extName, price: extPrice});
    
    
//     if (length && serviceRates.length) {
//       const diff = getLengthDiff(startLen, length);
//       const lengthLabel = diff === 0 ? 'Same' : diff > 0 ? 'Shorted' : 'Extended';
//       summaryDetails[EXT_SERVICE_INDEX].items.push({
//         title: `${NailLengths[length].label} Length (${lengthLabel})`, 
//         price: serviceRates.length[length] 
//       });
//     }
//   }
//   // Add-On
//   if (shape !== startShape) {/* Shape change, Gel removal, skin buffing */ 
//     const shapeChangeFee = getShapeFeePrice(svcId, startShape, shape);
//     const shapeLabel = getShapeDiff(startShape, shape) > 0 ? 'Slimming' : 'Expansion';
//     summaryDetails[ADD_ON_INDEX].items.push({title: `Shape Change (${shapeLabel})`, price: shapeChangeFee});
//   }


//   return summaryDetails;
// }


interface Props {
  summaryDetails: Array<Detail>;
  total: number;
}
export function Summary(p: Props) {
  const { summaryDetails, total } = p;

  const copyToClipboard = () => {
    let str = `Dania's Nail Service\n`;

    for (let detail of summaryDetails) {
      for (let detailItem of detail.items) {
        const desc = detailItem.title.padEnd(20);
        const price = detailItem.price.toFixed(2).padStart(5);
        str += `- ${desc}$${price}\n`;
      }
    }  

    str += `\n${"Total".padEnd(22)}$${total.toFixed(2).padStart(5)}`;

    const textAreaElem = document.createElement('textarea');
    textAreaElem.textContent = str;
    textAreaElem.contentEditable = "true";
    document.body.appendChild(textAreaElem);
    
    textAreaElem.select();
    document.execCommand('copy');
    document.body.removeChild(textAreaElem);
  }

  
  return <>
    <button className="copy-btn secondary p-1" onClick={copyToClipboard}>Copy</button>

    <div id="summary-d" className="summary-table px-1 p-2 pt-2">
      <table className="w-100 mb-5 pb-5">
        <thead>
          <tr>
            <th className="text-start pb-3">Details</th>
            <th className="text-start pb-3">Prices</th>
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
                <td className="fst-italic ps-3">+ {item.title}</td>
                <td>${item.price.toFixed(2)}</td>    
              </tr>
              
              {item.sub && item.sub.map(subItem => 
                <tr key={subItem.title}>
                  <td className="fst-italic muted ps-5">- {subItem.title}</td>
                  <td className="muted">${subItem.price.toFixed(2)}</td>  
                </tr>
              )}
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
    </div>
  </>
}