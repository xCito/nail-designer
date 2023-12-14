import { getNailLengthsAsList } from "@/service/helpers";
import { HandDesign, NailLengthId } from "../../constants/design-constants";
import classNames from "classnames";

const lengthOptions = getNailLengthsAsList();

interface Props {
  hand: HandDesign;
  selected: NailLengthId;
  onSelection: (length: NailLengthId) => void;
}
export function LengthMenu(props: Props) {
  const { selected, onSelection } = props;

  return <div className="position-relative">
    <h4 className="ps-3">Length Options</h4>
  
    <div className="d-flex flex-wrap column-gap-2 row-gap-2 px-3">
      {lengthOptions.map(s => 
        <button 
          className={classNames("fs-6",{active: selected === s.id})} 
          onClick={() => onSelection(s.id)} key={s.id}>
          {s.value.label}
        </button>
      )}
    </div>
    {/* <MainAndSubSelect
      onSubSelect={onSelection} 
      options={lengthOptions}
      selected={selected}  /> */}
  </div>;
    
}