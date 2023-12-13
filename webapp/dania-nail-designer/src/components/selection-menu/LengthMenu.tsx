import { getNailLengthsAsList } from "@/service/helpers";
import { HandDesign, NailLengthId } from "../../constants/design-constants";

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
  
    {/* <MainAndSubSelect
      onSubSelect={onSelection} 
      options={lengthOptions}
      selected={selected}  /> */}
  </div>;
    
}