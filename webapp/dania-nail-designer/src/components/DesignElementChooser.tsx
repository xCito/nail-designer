import classNames from "classnames";
import { DesignElements } from "../constants/design-constants"
import { NailDesignOption, NailShapeOption } from "../types/design-types";
import { Finger } from "./Finger";

const designElemOptions = DesignElements.map(o => {
    return {label: o.name, value: o}
});

interface Props {
    selectedIds: string[],
    onSelection: (design: NailDesignOption) => void;
    onRemove: (design: NailDesignOption) => void;
}
export function DesignElementChooser(props: Props) {
    const { selectedIds, onSelection, onRemove } = props;

    return <div className="position-relative">
        <div className="hand d-flex justify-content-center position-sticky top-0 pb-3">
            <Finger />
            <Finger />
            <Finger />
            <Finger />
            <Finger />
        </div>
    

        <div className="base-options-grid col-3 p-3">
            {designElemOptions.map(option => 
                <div key={option.value.id}
                className={classNames("base-option", {active: selectedIds.includes(option.value.id)})} 
                onClick={() => selectedIds.includes(option.value.id) ? onRemove(option.value) : onSelection(option.value)}>
                    {option.label}
                </div>
            )}
        </div>
    </div>
}