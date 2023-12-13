import classNames from "classnames";
import { useState } from "react";
import { getByType } from "../../service/helpers";

type Typed<T> = {id: keyof T, value: T[keyof T]};
interface Props<T extends Typed<T>> {
  options: Array<T>;
  selected: T['id'];
  onSubSelect: (subId: T['id']) => void; 
  isTypeDisabled?: (type: string) => boolean;  
  isSubTypeDisabled?: (shape: T['id']) => boolean;  
}
export function MainAndSubSelect<T extends Typed<T>>(props: Props<T>) {
  const { selected, options, onSubSelect, isTypeDisabled = () => false, isSubTypeDisabled = () => false} = props;
  const [selectedType, setType] = useState<null | string>(() => {
    return options.find(o => selected === o.id)?.value.type ?? null;
  });

  const mainOptions = [...options
    .reduce((set, val) => set.add(val.type), new Set<string>())];

  const filteredOptions = selectedType ? getByType(options, selectedType) : [];
  const count = filteredOptions.length;

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

  return <div className={classNames("shape-menu px-3", {'selected': selectedType !== null && count > 1})}>
    <div className={classNames("base-options-grid")}>
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