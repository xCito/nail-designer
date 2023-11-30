import classNames from "classnames";
import { NailShape2 } from "../../constants/design-constants";
import { NailShapeOption, NailShapeTypeOption } from "../../types/design-types";
import { useState } from "react";

// const shapeOptions = Object.entries(NailShape).map(o => {
//     return {label: o[1], value: o[0] as NailShapeOption}
// });

const shapeOptions: NailShapeTypeOption[] = Object.keys(NailShape2) as NailShapeTypeOption[];

interface Props {
    selected: NailShapeOption[];
    onSelection: (shape: NailShapeOption) => void;
}
export function ShapeMenu(props: Props) {
  const { selected, onSelection } = props;
  const [selectedShapeType, setShapeType] = useState<null | NailShapeTypeOption>(null);

  const onShapeTypeClick = (type: NailShapeTypeOption) => {
    if (type === selectedShapeType) {
      setShapeType(null);
    } else {
      setShapeType(type);
    }

    // onSelection();
  }

  return <div className={classNames("shape-menu", {'selected': selectedShapeType !== null})}>
    <div className={classNames("base-options-grid p-3")}>
      {shapeOptions.map(option => 
        <div key={option}
          className={classNames("base-option", {active: selectedShapeType === option})} 
          onClick={() => onShapeTypeClick(option)}>
          {option}
        </div>
      )}
    </div>
    
    {selectedShapeType && <div className="d-flex flex-column shape-list p-3">
      {NailShape2[selectedShapeType].map(shape => {
        return <div key={shape.id}
          className={classNames('base-option', {'active': selected.includes(shape.id)})}
          onClick={() => onSelection(shape.id)}>
          {shape.label}
        </div>
      })}
    </div>}
  </div>;
    
}