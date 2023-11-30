import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import { getAppliedBases, getAppliedDesignElementIds, getAppliedLength, getAppliedShape } from "../service/helpers";
import { NailBaseOption, NailDesignOption, NailLengthOption, NailShapeOption } from "../types/design-types";
import './../styles/style.css';
import { DesignSection } from "./DesignSection";
import { BaseChooser } from "./selection-menu/BaseChooser";
import { LengthMenu } from "./selection-menu/LengthMenu";
import { ShapeMenu } from "./selection-menu/ShapeMenu";
import { DesignElementMenu } from "./selection-menu/DesignElementMenu";
import { Summary } from "./Summary";

export function DesignBuilder() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { dispatch, nailDesign } = useContext(DesignContext);
//  console.log(JSON.stringify(nailDesign, null, 2));

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

  const onLengthSelection = (length: NailLengthOption) => {
    console.log('selected', length);
    dispatch({type: 'SET_LENGTH', length});
  }

  const onDesignElemSelection = (designElem: NailDesignOption) => {
    console.log('selected', designElem);
    dispatch({type: 'ADD_DESIGN', design: designElem});
  }

  const onDesignElemRemoval = (designElem: NailDesignOption) => {
    console.log('selected', designElem);
    dispatch({type: 'REMOVE_DESIGN', design: designElem});
  }


  return <div className="h-100"> 
    <div className="layout d-flex flex-column">
        <DesignSection 
          title='Base' 
          isExpanded={openSection === 'Base'}
          onHeaderClick={() => onHeaderClick('Base')}>
          <BaseChooser selected={getAppliedBases(nailDesign)} onSelection={onBaseSelection} />
        </DesignSection>

        <DesignSection 
          title='Length'
          isExpanded={openSection === 'Length'}
          onHeaderClick={() => onHeaderClick('Length')}>
          <LengthMenu selected={getAppliedLength(nailDesign)} onSelection={onLengthSelection} />
        </DesignSection>

        <DesignSection 
          title='Shape'
          isExpanded={openSection === 'Shape'}
          onHeaderClick={() => onHeaderClick('Shape')}>
          <ShapeMenu selected={getAppliedShape(nailDesign)} onSelection={onShapeSelection} />
        </DesignSection>

        <DesignSection 
          title='Design'
          // isExpanded={openSection === 'Design'}
          isExpanded={true}
          onHeaderClick={() => onHeaderClick('Design')}>
          <DesignElementMenu
            shape={nailDesign.left.shape}
            length={nailDesign.left.length}
            selectedIds={getAppliedDesignElementIds(nailDesign)} 
            onSelection={onDesignElemSelection} 
            onRemove={onDesignElemRemoval}/>
        </DesignSection>
      </div>

      <Summary nailDesign={nailDesign} />
    </div>;
}