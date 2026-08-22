import { HandDesign, NailDesignElem, NailDesignElemId } from "@/constants/design-constants";
import { getNailDesignElementsAsList } from "@/service/helpers";
import classNames from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";


type ColMap = Record<number, Array<typeof designOptionArr[number]>>;
const COLUMNS = 2;

/**
 * Creates a default column object with empty arrays for each column.
 * Example: {0: [], 1: []} for 2 columns.
 * @returns A ColMap object with empty arrays for each column.
 */
function defaultColObj(): ColMap {
  return Object.fromEntries(new Array(COLUMNS).fill(0).map((_, i) => [i, []])); 
}

const designOptionArr = getNailDesignElementsAsList();

interface Props {
  hand: HandDesign,
  selectedCountMap: Map<NailDesignElemId, number>,
  onSelection: (design: NailDesignElemId, count: number) => void;
  onReset: () => void;
}
export function DesignElementMenu(props: Props) {
  const { selectedCountMap, onSelection, onReset } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [expandedDesign, setExpandedDesign] = useState<NailDesignElemId | null>(null);

  const filteredOptions = designOptionArr.filter(d => d.value.name.toUpperCase().includes(searchText.toUpperCase()))
  const designsByCategory = filteredOptions.reduce((groups, d) => {
    const groupKey = d.value.category;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(d);
    return groups;
  }, {} as Record<string, typeof designOptionArr>);

  const designsByCategoryCols = Object.entries(designsByCategory)
    .reduce((cols, [category, designs]) => {
      cols[category] = defaultColObj();
      for (let i = 0; i < designs.length; i++) {
        const colIndex = i % COLUMNS;
        if (!cols[category][colIndex]) {
          cols[category][colIndex] = [];
        }
        cols[category][colIndex].push(designs[i]);
      }
      return cols;
    }, {} as Record<string, ColMap>);
  
  return <div className="position-relative d-flex flex-column w-100 h-100">
    {/* <Hands hand={hand} /> */}
    <div className="text-end flex-grow-0 px-3 py-1">
      <input 
        type="text"
        value={searchText}
        onChange={e => setSearchText((e.target as HTMLInputElement).value)}
        className="me-2" 
        placeholder="Search..."/>

      <button onClick={onReset}>Reset</button>
    </div>

    <div className="flex-grow-1 overflow-auto design-list px-3 pt-2 mb-3 w-100">
      {Object.entries(designsByCategoryCols).map(([category, colMap]) => <Fragment key={category}>
        <h5 className="text-center text-uppercase mb-3">{category}</h5>

        <div className="d-flex gap-2">
          {Object.entries(colMap).map(([colNum, designs]) => (
            <div className="design-column d-flex flex-column" key={`${category}-${colNum}`}>
              {designs.map(option =>
                <DesignOption key={option.id}
                  isSelected={selectedCountMap.has(option.id)}
                  designType={option.value.type}
                  label={option.value.name}
                  count={selectedCountMap.get(option.id) || 0}
                  onSetCount={(c) => onSelection(option.id, c)}
                  isExpanded={expandedDesign === option.id}
                  setExpanded={(isExpanded) => setExpandedDesign(isExpanded ? option.id : null)}
                  onSelect={console.log} />
              )}
            </div>
          ))}
        </div>

        </Fragment>
      )}
    </div>
  </div>
}

interface OptionProps {
  isSelected: boolean;
  isExpanded: boolean;
  setExpanded: (isExpanded: boolean) => void;
  label: string;
  designType: NailDesignElem['type'];
  count: number;
  onSetCount: (c: number) => void;
  onSelect: () => void;
}
function DesignOption(props: OptionProps) {
  const { label, isSelected, count, onSetCount, designType, isExpanded, setExpanded } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const MIN = 0;
  const MAX = 10;
  const onLabelClick = () => setExpanded(!isExpanded);

  const onSubtractClick = () => onSetCount(count - 1);

  const onAddClick = () => onSetCount(count + 1);

  const onRemoveClick = () => onSetCount(MIN);

  const onAllClick = () => onSetCount(MAX);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isExpanded, setExpanded]);

  return <div ref={wrapperRef} className={
    classNames(
      "design-option flex-shrink-0 w-100", 
      { active: isSelected },
      { expanded: isExpanded }
    )}>

    <span className="option-header w-100" onClick={onLabelClick}>{label}</span>

    <div className="option-buttons">
      {designType !== 'base' && <>
        <button disabled={count === MIN} onClick={onSubtractClick}>-</button>
        {count === MIN && <button onClick={onAllClick}>All</button>}
        {count > MIN && <button onClick={onRemoveClick}>None</button>}
        <button disabled={count === MAX} onClick={onAddClick}>+</button>
      </>}
      {designType === 'base' && <>
        <button disabled={count === MAX} onClick={onAllClick}>On</button>
        <button disabled={count === MIN} onClick={onRemoveClick}>Off</button>
      </>}
    </div>

    {designType !== 'base' && count > MIN &&  <span className="option-count">{count}</span>}
    {designType === 'base' && count === MAX && <span className="option-count toggle">ON</span>}
  </div>
}