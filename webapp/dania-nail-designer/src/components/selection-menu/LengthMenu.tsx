import { getNailLengthsAsList } from "@/service/helpers";
import { ConsultationValue } from "@/types/other-types";
import classNames from "classnames";
import { NailLengthId, NailLengths } from "../../constants/design-constants";

const lengthOptions = getNailLengthsAsList();

interface Props {
  selected: NailLengthId | null;
  onSelection: (length: NailLengthId) => void;
  consultData: ConsultationValue;
}
export function LengthMenu(props: Props) {
  const { selected, onSelection, consultData } = props;
  const service = consultData.service || undefined;
  const startLength = consultData.startLen || 'xx_long';

  return <div className="position-relative">
    <h4 className="ps-3">Length Options</h4>
  
    <div className="d-flex flex-wrap column-gap-2 row-gap-2 px-3">
      {lengthOptions.map(s => {
        const isDisabled = (service !== 'new_set' && NailLengths[s.id].size > NailLengths[startLength].size)
                          || service === 'manicure' 
                          || service === 'take_down';

        return <button 
          className={classNames("fs-6",{active: selected === s.id})} 
          disabled={isDisabled}
          onClick={() => onSelection(s.id)} key={s.id}>
          {s.value.label}
        </button>
      })}
    </div>
    {/* <MainAndSubSelect
      onSubSelect={onSelection} 
      options={lengthOptions}
      selected={selected}  /> */}
  </div>;
    
}