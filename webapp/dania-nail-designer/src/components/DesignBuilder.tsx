import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import './../styles/style.css';
import { DesignSection } from "./DesignSection";
import { BaseChooser } from "./BaseChooser";
import { NailBaseOption, NailDesignOption, NailShapeOption } from "../types/design-types";
import { getAppliedBases, getAppliedDesignElementIds, getAppliedShape } from "../service/helpers";
import { ShapeChooser } from "./ShapeChooser";
import { DesignElementChooser } from "./DesignElementChooser";

export function DesignBuilder() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { dispatch, nailDesign } = useContext(DesignContext);
 console.log(JSON.stringify(nailDesign, null, 2));

  const onHeaderClick = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  }

  const onBaseSelection = (base: NailBaseOption) => {
    console.log('selected', base);
    dispatch({type: 'SET_BASE', base});
  }

  const onShapeSelection = (shape: NailShapeOption) => {
    console.log('selected', shape);
    dispatch({type: 'SET_SHAPE', shape});
  }

  const onDesignElemSelection = (designElem: NailDesignOption) => {
    console.log('selected', designElem);
    dispatch({type: 'ADD_DESIGN', design: designElem});
  }

  const onDesignElemRemoval = (designElem: NailDesignOption) => {
    console.log('selected', designElem);
    dispatch({type: 'REMOVE_DESIGN', design: designElem});
  }


  return <div className="layout d-flex flex-column">

      <DesignSection 
        title='Base' 
        isExpanded={openSection === 'Base'}
        onHeaderClick={() => onHeaderClick('Base')}>
        <BaseChooser selected={getAppliedBases(nailDesign)} onSelection={onBaseSelection} />
      </DesignSection>

      <DesignSection 
        title='Shape'
        isExpanded={openSection === 'Shape'}
        onHeaderClick={() => onHeaderClick('Shape')}>
        <ShapeChooser selected={getAppliedShape(nailDesign)} onSelection={onShapeSelection} />
      </DesignSection>

      <DesignSection 
        title='Design'
        isExpanded={openSection === 'Design'}
        onHeaderClick={() => onHeaderClick('Design')}>
        <DesignElementChooser
          selectedIds={getAppliedDesignElementIds(nailDesign)} 
          onSelection={onDesignElemSelection} 
          onRemove={onDesignElemRemoval}/>
      </DesignSection>


    </div>;
}