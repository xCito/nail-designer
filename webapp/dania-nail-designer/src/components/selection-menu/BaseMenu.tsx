import { getNailBasesAsList } from "@/service/helpers";
import classNames from "classnames";
import { NailBaseId } from "../../constants/design-constants";


const baseOptions = getNailBasesAsList();

interface Props {
  selected: NailBaseId | null
  onSelection: (base: NailBaseId | null) => void;
}
export function BaseMenu(props: Props) {
  const { selected, onSelection } = props;

  const onBaseSelect = (baseId: NailBaseId) => {
    if (selected === baseId) {
      onSelection(null);
    } else {
      onSelection(baseId);
    }
  }

  return <div>
    <h4 className="ps-3">Base Options</h4>
    <div className="d-flex flex-wrap column-gap-2 row-gap-2 px-3">
      {baseOptions.map(option =>
        <button key={option.value}
          className={classNames("fs-6", { active: selected === option.id })}
          onClick={() => onBaseSelect(option.id)}>
          {option.value}
        </button>
      )}
    </div>
  </div>
}