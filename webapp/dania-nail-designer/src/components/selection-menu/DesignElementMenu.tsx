import classNames from "classnames";
import { DesignElements } from "../../constants/design-constants";
import { HandDesign, NailDesignOption } from "../../types/design-types";
import { Hands } from "../hand/Hands";

const designElemOptions = DesignElements.map(o => {
    return {label: o.name, value: o}
});

interface Props {
    hand: HandDesign,
    selectedIds: string[],
    onSelection: (design: NailDesignOption) => void;
    onRemove: (design: NailDesignOption) => void;
}
export function DesignElementMenu(props: Props) {
    const { selectedIds, onSelection, onRemove, hand } = props;

    return <div className="position-relative">
        <Hands hand={hand}/>

        <div className="base-options-grid col-3 py-3 px-3">
            {designElemOptions.sort((a, b) => a.label.localeCompare(b.label)).map(option => 
                <div key={option.value.id}
                className={classNames("base-option", {active: selectedIds.includes(option.value.id)})} 
                onClick={() => selectedIds.includes(option.value.id) ? onRemove(option.value) : onSelection(option.value)}>
                    {option.label}
                </div>
            )}
        </div>
    </div>
}