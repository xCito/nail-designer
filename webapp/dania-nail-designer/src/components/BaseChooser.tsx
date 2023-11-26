import classNames from "classnames";
import { NailBase } from "../constants/design-constants"
import { NailBaseOption } from "../types/design-types";

const baseOptions = Object.entries(NailBase).map(o => {
    return {label: o[1], value: o[0] as NailBaseOption}
});

interface Props {
    selected: NailBaseOption[]
    onSelection: (base: NailBaseOption) => void;
}
export function BaseChooser(props: Props) {
    const { selected, onSelection } = props;
    return <div className="base-options-grid p-3">
        {baseOptions.map(option => 
            <div key={option.value}
                className={classNames("base-option", {active: selected.includes(option.value)})} 
                onClick={() => onSelection(option.value)}>
                {option.label}
            </div>
        )}
    </div>
}