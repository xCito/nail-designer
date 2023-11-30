import { NailBase, NailLength, NailShape } from "../constants/design-constants"
import { Design } from "../types/design-types"


interface Props {
  nailDesign: Design
}
export function Summary({nailDesign}: Props) {


  return <div className="px-2 pt-4 pb-5">
    <h4 className="text-start mt-0">Summary</h4>

    <table className="w-100 px-4">
      <tbody>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Attribute</th>
          <th className="text-start border-0 border-bottom dashed">Selection</th>
          <th className="text-start border-0 border-bottom dashed">Price</th>
        </tr>
        <tr>
          <td className="text-start">Base</td>
          <td className="text-start fw-light">{NailBase[ nailDesign.left.base ]}</td>
          <td className="text-start fw-light">$3</td>
        </tr>
        <tr>
          <td className="text-start">Length</td>
          <td className="text-start fw-light">{NailLength[ nailDesign.left.length ]}</td>
          <td className="text-start fw-light">$3</td>
        </tr>
        <tr>
          <td className="text-start">Shape</td>
          <td className="text-start fw-light">{NailShape[ nailDesign.left.shape ]}</td>
          <td className="text-start fw-light">$3</td>
        </tr>
      </tbody>
    </table>

    <h4 className="text-start mt-5">Design</h4>
    <table className="w-100 px-4">
      <tbody>
        <tr>
          <th className="text-start border-0 border-bottom dashed">Style</th>
          <th className="text-start border-0 border-bottom dashed">Choice</th>
          <th className="text-center border-0 border-bottom dashed">Complexity</th>
          <th className="text-start border-0 border-bottom dashed">Price</th>
        </tr>
        <tr>
          <td className="text-start">Base</td>
          <td className="text-start fw-light">{NailBase[ nailDesign.left.base ]}</td>
          <td className="text-center fw-light">-</td>
          <td className="text-start fw-light">$3</td>
        </tr>
        <tr>
          <td className="text-start">Length</td>
          <td className="text-start fw-light">{NailLength[ nailDesign.left.length ]}</td>
          <td className="text-center fw-light">LOW</td>
          <td className="text-start fw-light">$3</td>
        </tr>
        <tr>
          <td className="text-start">Shape</td>
          <td className="text-start fw-light">{NailShape[ nailDesign.left.shape ]}</td>
          <td className="text-center fw-light">LOW</td>
          <td className="text-start fw-light">$3</td>
        </tr>
      </tbody>
    </table>
</div>
}