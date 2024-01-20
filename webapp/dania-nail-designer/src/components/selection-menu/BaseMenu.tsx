import { getNailBasesAsList } from "@/service/helpers";
import classNames from "classnames";
import { NailBaseId, NailServices } from "../../constants/design-constants";
import { ConsultationValue } from "@/types/other-types";


const baseOptions = getNailBasesAsList();

interface Props {
  selected: NailBaseId | null
  onSelection: (base: NailBaseId | null) => void;
  consultData: ConsultationValue;
}
export function BaseMenu(props: Props) {
  const { selected, onSelection, consultData } = props;
  const { service } = consultData;
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
      {baseOptions.map(option => {
        const isDisabled = (service && (
              (NailServices[service].type === 'ext-service' && option.id === 'BaseGel')
              || (NailServices[service].type === 'pre-service' && option.id !== 'BaseGel')
            )) ?? false;
        
        return <button key={option.value}
          className={classNames("fs-6", { active: selected === option.id })}
          disabled={isDisabled}
          onClick={() => onBaseSelect(option.id)}>
          {option.value}
        </button>
      })}
    </div>
  </div>
}