import { useState } from "react";
import { DESIGN_SCORE } from '../variables/variables.js' 

function isInDesign(design, dElem, hand) {
  if (hand === 'left') return design.left.some(d => d.id === dElem.id)
  else return design.right.some(d => d.id === dElem.id);
}

export function DesignList({design, dispatch, hand}) {
  const [searchText, setSearchText] = useState(''); 
  const [isOpen, setOpen] = useState(true);
  const designItems = DESIGN_SCORE.filter(d => d.label.toLowerCase().includes(searchText.toLowerCase()));

  console.log(design)
  const onDesignElemClick = (dElem) => {
    if (isInDesign(design, dElem, hand)) {  
      dispatch({type: 'RemoveDesign', hand, designElem: dElem});
    } else {
      dispatch({type: 'AddDesign', hand, designElem: dElem});
    }
  }

  return <div className={"design-list p-3 w-100 " + (isOpen ? 'open' : '')}>
    <button onClick={() => setOpen(!isOpen)}>{isOpen ? 'v' : '^'}</button>
    {/* Search Bar */}
    <input type='text'
      className="p-2 d-block mx-auto mb-3"
      value={searchText} 
      onChange={e => setSearchText(e.target.value)} />

    {/* Design elements */}
    <div className='design-item-container pe-2 w-100 overflow-auto'>
      {designItems.map(d => 
        <div key={d.id} 
          className={'design-item rounded p-3 ' + (isInDesign(design, d, hand) ? 'selected':'' )} 
          onClick={() => onDesignElemClick(d)}
        >
          {d.label}
        </div>  
      )}
    </div>
  </div>
}