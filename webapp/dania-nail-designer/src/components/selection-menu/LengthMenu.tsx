import classNames from "classnames";
import { NailLength } from "../../constants/design-constants";
import { NailLengthOption } from "../../types/design-types";

// const shapeOptions = Object.entries(NailShape).map(o => {
//     return {label: o[1], value: o[0] as NailShapeOption}
// });

const lengthOptions = Object.entries(NailLength).map(([id, label]) => {
  return { displayLabel: label, value: id };
}) as {displayLabel: string, value: NailLengthOption}[]
interface Props {
    selected: NailLengthOption[]
    onSelection: (length: NailLengthOption) => void;
}
export function LengthMenu(props: Props) {
  const { selected, onSelection } = props;

  return <div className="base-options-grid p-3">
      {lengthOptions.map(option => 
        <div key={option.value}
          onClick={() => onSelection(option.value)}
          className={classNames("base-option", {active: selected.includes(option.value)})}>
            {option.displayLabel}
        </div>
      )}   
    </div>
}