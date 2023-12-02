import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import { getAppliedBases, getAppliedDesignElementIds } from "../service/helpers";
import { NailBaseOption, NailDesignOption, NailLengthOption, NailShapeOption } from "../types/design-types";
import './../styles/style.css';
import { DesignSection } from "./DesignSection";
import { Summary } from "./receipt/Summary";
import { BaseMenu } from "./selection-menu/BaseMenu";
import { DesignElementMenu } from "./selection-menu/DesignElementMenu";
import { LengthMenu } from "./selection-menu/LengthMenu";
import { ShapeMenu } from "./selection-menu/ShapeMenu";
import { ConsultationMenu } from "./selection-menu/ConsultationMenu";

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
          title='Consultation' 
          isExpanded={openSection === 'Consultation'}
          onHeaderClick={() => onHeaderClick('Consultation')}>
            <ConsultationMenu />
        </DesignSection>

        <DesignSection 
          title='Base' 
          isExpanded={openSection === 'Base'}
          onHeaderClick={() => onHeaderClick('Base')}>
          <BaseMenu selected={getAppliedBases(nailDesign)} onSelection={onBaseSelection} />
        </DesignSection>

        <DesignSection 
          title='Length'
          isExpanded={openSection === 'Length'}
          onHeaderClick={() => onHeaderClick('Length')}>
          <LengthMenu 
            hand={nailDesign.left}
            selected={nailDesign.left.length} 
            onSelection={onLengthSelection} />
        </DesignSection>

        <DesignSection 
          title='Shape'
          isExpanded={openSection === 'Shape'}
          onHeaderClick={() => onHeaderClick('Shape')}>
          <ShapeMenu 
            hand={nailDesign.left}
            isNatural={nailDesign.left.length === 'natural'}
            selected={nailDesign.left.shape} 
            selectedLength={nailDesign.left.length}
            onSelection={onShapeSelection} />
        </DesignSection>

        <DesignSection 
          title='Design'
          isExpanded={openSection === 'Design'}
          // isExpanded={true}
          onHeaderClick={() => onHeaderClick('Design')}>
          <DesignElementMenu
            hand={nailDesign.left}
            selectedIds={getAppliedDesignElementIds(nailDesign)} 
            onSelection={onDesignElemSelection} 
            onRemove={onDesignElemRemoval}/>
        </DesignSection>
      </div>

      <Summary nailDesign={nailDesign} />
    </div>;
}