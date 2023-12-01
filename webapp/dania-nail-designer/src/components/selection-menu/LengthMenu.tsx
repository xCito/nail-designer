import { NailLength } from "../../constants/design-constants";
import { HandDesign, NailLengthOption, NailLengthOptionVal } from "../../types/design-types";
import { Hands } from "../hand/Hands";
import { MainAndSubSelect } from "./MainAndSubSelect";

const lengthOptions = Object.entries(NailLength)
  .map(([id, val]) => ({id, ...val})) as ({id: NailLengthOption} & NailLengthOptionVal)[];

interface Props {
  hand: HandDesign;
  selected: NailLengthOption;
  onSelection: (length: NailLengthOption) => void;
}
export function LengthMenu(props: Props) {
  const { selected, onSelection, hand } = props;

  return <div className="position-relative h-100">
    <Hands hand={hand} />
  
    <MainAndSubSelect
      onSubSelect={onSelection} 
      options={lengthOptions}
      selected={selected}  />
  </div>;
    
}