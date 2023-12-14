import classNames from "classnames";
import { NailShapeId } from "../../constants/design-constants";
import { getNailShapesAsList } from "../../service/helpers";


const shapeOptions = getNailShapesAsList();

interface Props {
  selected: NailShapeId | null;
  onSelection: (shape: NailShapeId) => void;
}
export function ShapeMenu(props: Props) {
  const { selected, onSelection } = props;
  

  return <div className="position-relative">
    <h4 className="ps-3">Shape Options</h4>

    <div className="d-flex flex-wrap column-gap-2 row-gap-2 px-3">
      {shapeOptions.map(s => 
        <button 
          className={classNames("fs-6",{active: selected === s.id})} 
          onClick={() => onSelection(s.id)} 
          key={s.id}>
          {s.value.label}
        </button>
      )}
    </div>
    {/* <MainAndSubSelect 
      isTypeDisabled={isTypeDisabled}
      isSubTypeDisabled={isShapeDisabled}
      onSubSelect={onSelection}
      selected={selected}
      options={shapeOptions} /> */}

  </div>;
    
}