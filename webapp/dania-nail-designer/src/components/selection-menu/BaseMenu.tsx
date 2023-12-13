import { getNailBasesAsList } from "@/service/helpers";
import classNames from "classnames";
import { NailBaseId } from "../../constants/design-constants";


const baseOptions = getNailBasesAsList();

interface Props {
    selected: NailBaseId
    onSelection: (base: NailBaseId) => void;
}
export function BaseMenu(props: Props) {
    const { selected, onSelection } = props;
    return <div>   
      <h4 className="ps-3">Base Options</h4>    
      <div className="base-options-grid px-3">
          {baseOptions.map(option => 
              <div key={option.value}
              className={classNames("base-option", {active: selected === option.id})} 
              onClick={() => onSelection(option.id)}>
                  {option.value}
              </div>
          )}
      </div>
    </div>
}