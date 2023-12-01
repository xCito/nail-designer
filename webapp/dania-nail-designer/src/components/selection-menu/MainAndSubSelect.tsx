import classNames from "classnames"
import { useState } from "react";
import { getByType } from "../../service/helpers";
import { NailShapeOption } from "../../types/design-types";

type Typed<K> = {id: K, label: string, type: string};
interface Props<K extends string, T extends Typed<K>> {
  options: Array<T>;
  selected: K;
  onSubSelect: (subId: K) => void; 
  isTypeDisabled?: (type: string) => boolean;  
  isSubTypeDisabled?: (shape: K) => boolean;  
}
export function MainAndSubSelect<K extends string, T extends Typed<K>>(props: Props<K, T>) {
  const { selected, options, onSubSelect, isTypeDisabled = () => false, isSubTypeDisabled = () => false} = props;
  const [selectedType, setType] = useState<null | string>(() => {
    return options.find(o => selected === o.id)?.type ?? null;
  });

  const mainOptions = [...options
    .reduce((set, val) => set.add(val.type), new Set<string>())];

  const filteredOptions = selectedType ? getByType(options, selectedType) : [];
  let count = filteredOptions.length;

  const onTypeSelect = (type: string) => {
    console.log(type);
    if (type === selectedType) {
      setType(null);
    } else {
      setType(type);

      const optionsbyType = getByType(options, type);
      if (optionsbyType.length === 1) {
        onSubSelect(optionsbyType[0].id);
      }
    }
  }

  return <div className={classNames("shape-menu", {'selected': selectedType !== null && count > 1})}>
  <div className={classNames("base-options-grid p-3")}>
    {mainOptions.map(option => 
      <div key={option}
        className={classNames(
            "base-option", 
            {active: selectedType === option},
            {disabled: isTypeDisabled(option)}
            )} 
        onClick={() => onTypeSelect(option)}>
        {option}
      </div>
    )}
  </div>
  
  {count > 1 && <div className="shape-list p-3">
    {filteredOptions.map((option) => {
      return <div key={option.id}
      className={classNames(
        'base-option',
        {'active': selected === option.id},
        {disabled: isSubTypeDisabled(option.id)}
      )}
      onClick={() => onSubSelect(option.id)}>
        {option.label}
      </div>
    })}
  </div>}
</div>
}