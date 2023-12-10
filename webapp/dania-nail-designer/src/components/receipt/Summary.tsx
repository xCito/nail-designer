import { createPortal } from "react-dom";
import { ComplexityScore, DesignElements, NailBase, NailLength, NailShape } from "../../constants/design-constants"
import { FingerIndices } from "../../constants/other-constants";
import { BasePrice, LengthPrice, SERVICE_FEE, ShapePrice } from "../../constants/pricing-constants"
import { ComplexityValue, Design, DesignElement } from "../../types/design-types"
import { FloatingTotal } from "./FloatingTotal";


function complexityToPrice(cmplx: ComplexityValue, count: number) {
  const prod = ComplexityScore[cmplx] * count;
  return prod;
}

function getDesignById(id: string | number): DesignElement {
  return DesignElements.find(design => design.id == id)!;
}

interface Props {
  nailDesign: Design
}
export function Summary({ nailDesign }: Props) {
  const bsePrice = BasePrice[ nailDesign.left.base ];
  const lenPrice = LengthPrice[ nailDesign.left.length ];
  const shpPrice = ShapePrice[ nailDesign.left.shape ];
  const designCount = new Map<number, number>();
 
  // Count designs occurrences
  for (const finger of FingerIndices) {
    nailDesign.left[finger].designElems.forEach(dL => {
      if (designCount.has(dL.id)) {
        designCount.set(dL.id, designCount.get(dL.id)! + 1);
      } else {
        designCount.set(dL.id, 1);
      }
    });
    nailDesign.right[finger].designElems.forEach(dL => {
      if (designCount.has(dL.id)) {
        designCount.set(dL.id, designCount.get(dL.id)! + 1);
      } else {
        designCount.set(dL.id, 1);
      }
    });
  }

  const designTotal = Object.entries(designCount)
    .map(([id, count]: [id: string, count: number]) => complexityToPrice(getDesignById(id).complexity, count))
    .reduce((total, price) => total + price, 0);
  
  const total = SERVICE_FEE + bsePrice + shpPrice + lenPrice + designTotal;

  
  return <div className="px-2 pt-4 pb-5">
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
        <tr>
          <td className="text-start">Service</td>
          <td className="text-start fw-light">Russian Manicure</td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${SERVICE_FEE}</td>
        </tr>
        <tr>
          <td className="text-start">Base</td>
          <td className="text-start fw-light">{NailBase[ nailDesign.left.base ]}</td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${bsePrice}</td>
        </tr>
        <tr>
          <td className="text-start">Length</td>
          <td className="text-start fw-light">
            {NailLength[ nailDesign.left.length ].label}
            {lenPrice === 0 && <span className="fst-italic">(Same length)</span>}
          </td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${lenPrice}</td>
        </tr>
        <tr>
          <td className="text-start">Shape</td>
          <td className="text-start fw-light">
            {NailShape[ nailDesign.left.shape ].label}
          </td>
          <td className="text-start fw-light">-</td>
          <td className="text-start fw-light">${shpPrice}</td>
        </tr>

        {[...designCount.entries()].map(([designId, count]) => {
          const design = getDesignById(designId);
          return <tr key={designId}>
            <td className="text-start">Design</td>
            <td className="text-start fw-light">{design.name}</td>
            <td className="text-start fw-light">{design.complexity} x{count}</td>
            <td className="text-start fw-light">${complexityToPrice(design.complexity, count)}</td>
          </tr>
        })}
      </tbody>

      <tfoot>
        <tr>
          <td className="text-start fw-bolder fst-italic pt-4">Total</td>
          <td></td>
          <td></td>
          <td className="text-start fw-light fst-italic pt-4">${total}</td>
        </tr>
      </tfoot>
    </table>

    {createPortal(<FloatingTotal total={total}/>, document.body)}
</div>
}