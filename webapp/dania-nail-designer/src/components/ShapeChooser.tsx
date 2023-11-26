import classNames from "classnames";
import { NailShape } from "../constants/design-constants"
import { NailShapeOption } from "../types/design-types";

const shapeOptions = Object.entries(NailShape).map(o => {
    return {label: o[1], value: o[0] as NailShapeOption}
});

interface Props {
    selected: NailShapeOption[]
    onSelection: (base: NailShapeOption) => void;
}
export function ShapeChooser(props: Props) {
    const { selected, onSelection } = props;
    return <div className="base-options-grid p-3">
        {shapeOptions.map(option => 
            <div key={option.value}
                className={classNames("base-option", {active: selected.includes(option.value)})} 
                onClick={() => onSelection(option.value)}>
                {option.label}
            </div>
        )}
    </div>
}