import { getAppliedDesignElementCounts, getNailDesignElementsAsList } from "@/service/helpers";
import { createPortal } from "react-dom";
import { ComplexityScore, Design, DesignElements, NailDesignElem, NailDesignElemId, NailLengths, NailShapes } from "../../constants/design-constants";
import { BasePrice, LengthPrice, SERVICE_FEE, ShapePrice } from "../../constants/pricing-constants";
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

interface Props {
  nailDesign: Design
}
export function Summary({ nailDesign }: Props) {
  const {base, length, shape} = nailDesign.left;

  const bsePrice = base ? BasePrice[ base ] : 0;
  const lenPrice = LengthPrice[ length ];
  const shpPrice = ShapePrice[shape ];
  const designCount = getAppliedDesignElementCounts(nailDesign);
 

  const designTotal = [...designCount.entries()]
    .map(([id, count]: [id: NailDesignElemId, count: number]) => getDesignPrice(DesignElements[id], count))
    .reduce((total, price) => total + price, 0);
  
  const total = SERVICE_FEE + bsePrice + shpPrice + lenPrice + designTotal;

  
  return <div className="px-2 pt-4 pb-5 text-black">
    <h4 className="text-start mt-0">Summary</h4>

    <table className="w-100 px-2">

      <thead>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Attribute</th>
          <th className="text-start border-0 border-bottom dashed">Pick</th>
          <th className="text-start border-0 border-bottom dashed">Complexity</th>
          <th className="text-start border-0 border-bottom dashed">Price</th>
        </tr>
      </thead>

      <tbody>
        {/* <tr>
          <td className="text-start">Service</td>
          <td className="text-start fw-light">Russian Manicure</td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${SERVICE_FEE.toFixed(2)}</td>
        </tr> */}
        {/* <tr>
          <td className="text-start">Base</td>
          <td className="text-start fw-light">{NailBase[ nailDesign.left.base ]}</td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${bsePrice.toFixed(2)}</td>
        </tr> */}
        <tr>
          <td className="text-start">Length</td>
          <td className="text-start fw-light">
            {NailLengths[ nailDesign.left.length ].label}
            {lenPrice === 0 && <span className="fst-italic">(Same length)</span>}
          </td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${lenPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="text-start">Shape</td>
          <td className="text-start fw-light">
            {NailShapes[ nailDesign.left.shape ].label}
          </td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${shpPrice.toFixed(2)}</td>
        </tr>

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