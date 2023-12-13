import classNames from "classnames";
import { HandDesign, NailLengthId, NailShapeId } from "../../constants/design-constants";
import { getNailShapesAsList } from "../../service/helpers";


const shapeOptions = getNailShapesAsList();

interface Props {
  hand: HandDesign;
  selected: NailShapeId;
  onSelection: (shape: NailShapeId) => void;
  isNatural: boolean;
  selectedLength: NailLengthId;
}
export function ShapeMenu(props: Props) {
  const { selected, onSelection } = props;

  // const isTypeDisabled = (type: string) => {
  //   return isNatural && !(type === 'Rounded' || type === 'Square')
  // }

  // const isShapeDisabled = (shape: NailShapeId) => {
  //   const svg = nailShapeAndLength[shape][selectedLength];
  //   return typeof svg === 'undefined' || svg === '';
  // }

  return <div className="position-relative">
    <h4 className="ps-3">Shape Options</h4>

    
    {shapeOptions.map(s => 
      <button className={classNames({active: selected === s.id})} onClick={() => onSelection(s.id)} key={s.id}>
        {s.value.label}
      </button>
    )}
    {/* <MainAndSubSelect 
      isTypeDisabled={isTypeDisabled}
      isSubTypeDisabled={isShapeDisabled}
      onSubSelect={onSelection}
      selected={selected}
      options={shapeOptions} /> */}

  </div>;
    
}