import { HandDesign, NailDesignElem, NailDesignElemId } from "@/constants/design-constants";
import { getNailDesignElementsAsList } from "@/service/helpers";
import classNames from "classnames";
import { useState } from "react";


type ColMap = Record<number, Array<typeof designOptionArr[number]>>;
const COLUMNS = 2;
function defaultColObj(): ColMap {
  return Object.fromEntries(new Array(2).fill(0).map((_, i) => [i, []])); 
}


const designOptionArr = getNailDesignElementsAsList();


interface Props {
  hand: HandDesign,
  selectedCountMap: Map<NailDesignElemId, number>,
  onSelection: (design: NailDesignElemId, count: number) => void;
  onClear: () => void;
}
export function DesignElementMenu(props: Props) {
  const { selectedCountMap, onSelection, onClear } = props;
  const [searchText, setSearchText] = useState<string>("");

  const filteredOptions = designOptionArr.filter(d => d.value.name.toUpperCase().includes(searchText.toUpperCase()))
  
  const designColumns = filteredOptions
      .sort((a, b) => a.value.complexity.localeCompare(b.value.complexity))
      .reduce((cols, d, index) => {
        const mappedTo = index % COLUMNS;
        cols[mappedTo].push(d);
        return cols;
      }, defaultColObj());

  
  return <div className="position-relative d-flex flex-column w-100 h-100">
    {/* <Hands hand={hand} /> */}
    <div className="text-end flex-grow-0 px-3 py-1">
      <input 
        type="text"
        value={searchText}
        onChange={e => setSearchText((e.target as HTMLInputElement).value)}
        className="me-2" 
        placeholder="Search..."/>

      <button onClick={onClear}>Clear</button>
    </div>

    <div className="flex-grow-1 overflow-auto design-list d-flex px-3 pt-2 mb-3 w-100 text-white">
      {Object.entries(designColumns).map(([colNum, designs]) =>
        <div className="design-column d-flex flex-column" key={colNum}>
          {designs.map(option =>
            <DesignOption key={option.id}
              isSelected={selectedCountMap.has(option.id)}
              designType={option.value.type}
              label={option.value.name}
              count={selectedCountMap.get(option.id) || 0}
              onSetCount={(c) => onSelection(option.id, c)}
              onSelect={console.log} />
          )}
        </div>
      )}
    </div>
  </div>
}

interface OptionProps {
  isSelected: boolean;
  label: string;
  designType: NailDesignElem['type'];
  count: number;
  onSetCount: (c: number) => void;
  onSelect: () => void;
}
function DesignOption(props: OptionProps) {
  const { label, isSelected, count, onSetCount, designType } = props;
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const MIN = 0;
  const MAX = designType === 'base' ? 1 : 10;
  const onLabelClick = () => setExpanded(!isExpanded);

  const onSubtractClick = () => onSetCount(count - 1);

  const onAddClick = () => onSetCount(count + 1);

  const onRemoveClick = () => onSetCount(MIN);

  const onAllClick = () => onSetCount(MAX);

  return <div className={
    classNames(
      "design-option flex-shrink-0 w-100", 
      { active: isSelected },
      { expanded: isExpanded }
    )}
    >
    <div className="option-buttons">
      <button disabled={count === MIN} onClick={onSubtractClick}>-</button>
      {count === MIN && <button onClick={onAllClick}>All</button>}
      {count > MIN && <button onClick={onRemoveClick}>None</button>}
      <button disabled={count === MAX} onClick={onAddClick}>+</button>
    </div>
    <label className="option-label w-100" onClick={onLabelClick}>{label}</label>
    {count > MIN && <span className="option-count">{count}</span>}
  </div>
}