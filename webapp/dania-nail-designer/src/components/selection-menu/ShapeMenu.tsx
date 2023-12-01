import { NailShape } from "../../constants/design-constants";
import { nailShapeAndLength } from "../../constants/other-constants";
import { getLengthId } from "../../service/helpers";
import { HandDesign, NailLengthOption, NailShapeOption, NailShapeOptionVal } from "../../types/design-types";
import { Hands } from "../hand/Hands";
import { MainAndSubSelect } from "./MainAndSubSelect";


const shapeOptions = Object.entries(NailShape)
  .map(([id, shape]) => ({id, ...shape})) as ({id: NailShapeOption} & NailShapeOptionVal)[];

interface Props {
  hand: HandDesign;
  selected: NailShapeOption;
  onSelection: (shape: NailShapeOption) => void;
  isNatural: boolean;
  selectedLength: NailLengthOption;
}
export function ShapeMenu(props: Props) {
  const { selected, onSelection, isNatural, selectedLength, hand } = props;

  const isTypeDisabled = (type: string) => {
    return isNatural && !(type === 'Rounded' || type === 'Square')
  }

  const isShapeDisabled = (shape: NailShapeOption) => {
    const length = getLengthId(selectedLength);
    const svg = nailShapeAndLength[shape][length] 
    return typeof svg === 'undefined' || svg === '';
  }

  return <div className="position-relative h-100">
    <Hands hand={hand} />
  
    <MainAndSubSelect 
      isTypeDisabled={isTypeDisabled}
      isSubTypeDisabled={isShapeDisabled}
      onSubSelect={onSelection}
      selected={selected}
      options={shapeOptions} />

  </div>;
    
}