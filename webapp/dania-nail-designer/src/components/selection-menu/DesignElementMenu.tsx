import classNames from "classnames";
import { DesignElements } from "../../constants/design-constants";
import { HandDesign, NailDesignOption } from "../../types/design-types";
import { Hands } from "../hand/Hands";

const designElemOptions = DesignElements.map(o => {
    return {label: o.name, value: o}
});

interface Props {
    hand: HandDesign,
    selectedIds: number[],
    onSelection: (design: NailDesignOption) => void;
    onRemove: (design: NailDesignOption) => void;
}
export function DesignElementMenu(props: Props) {
    const { selectedIds, onSelection, onRemove, hand } = props;

    return <div className="position-relative w-100">
        <Hands hand={hand}/>

        <div className="design-options-container py-3 px-3 w-100">
            {designElemOptions.sort((a, b) => a.label.localeCompare(b.label)).map(option => 
                <DesignOption key={option.value.id}
                    isSelected={selectedIds.includes(option.value.id)}
                    label={option.label}
                    onRemove={() => onRemove(option.value)}
                    onSelect={() => onSelection(option.value)} />
            )}
        </div>
    </div>
}

interface OptionProps {
    isSelected: boolean;
    label: string;
    onRemove: () => void;
    onSelect: () => void;
}
function DesignOption(props: OptionProps) {
    const {label, isSelected, onRemove, onSelect} = props;

    const onClick = () => {
        isSelected ? onRemove() : onSelect();
    }

    return <div className={classNames("design-option", {active: isSelected})} 
        onClick={onClick}>
        <div className="option-buttons">
            <button>-</button>
            <button>All</button>
            <button>+</button>
        </div>
        <div className="option-label">{label}</div>
    </div>
}