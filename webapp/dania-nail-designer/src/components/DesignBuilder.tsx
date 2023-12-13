import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import { getAppliedBases, getAppliedDesignElementCounts } from "../service/helpers";
import { DesignSection } from "./DesignSection";
import { Summary } from "./receipt/Summary";
import { BaseMenu } from "./selection-menu/BaseMenu";
import { ConsultationMenu } from "./selection-menu/ConsultationMenu";
import { DesignElementMenu } from "./selection-menu/DesignElementMenu";
import { LengthMenu } from "./selection-menu/LengthMenu";
import { ShapeMenu } from "./selection-menu/ShapeMenu";
import { NailBaseId, NailShapeId, NailLengthId, NailDesignElemId } from "@/constants/design-constants";


export function DesignBuilder() {

  const [openSection, setOpenSection] = useState<string | null>('Design')
  const { 
    dispatch, 
    nailDesign, 
    startingLength, 
    setStartingLength,
    startingShape, 
    setStartingShape,
    service,
    setService
  } = useContext(DesignContext);

  const onHeaderClick = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  }

  const onBaseSelection = (base: NailBaseId | null) => {
    console.log('selected', base);
    dispatch({type: 'SET_BASE', baseId: base});
  }

  const onShapeSelection = (shape: NailShapeId) => {
    console.log('selected', shape);
    dispatch({type: 'SET_SHAPE', shapeId: shape});
  }

  const onLengthSelection = (length: NailLengthId) => {
    console.log('selected', length);
    dispatch({type: 'SET_LENGTH', lengthId: length});
  }

  const onDesignElemRemoval = () => {
    console.log('clear all');
    dispatch({type: 'REMOVE_ALL'});
  }

  const onDesignElementCountChange = (designElem: NailDesignElemId, count: number) => {
    console.log('selected', designElem);
    dispatch({type: 'SET_DESIGN_BY_COUNT', designId: designElem, count});
  }


  return <div className="h-100"> 
    <div className="layout d-flex flex-column">
        <DesignSection 
          title='Consultation' 
          isExpanded={openSection === 'Consultation'}
          onHeaderClick={() => onHeaderClick('Consultation')}>
            <ConsultationMenu 
              service={service}
              startLen={startingLength}
              startShape={startingShape}
              onServiceChange={setService}
              onShapeChange={setStartingShape}
              onLengthChange={setStartingLength} />
        </DesignSection>

        <DesignSection 
          title='Foundation' 
          isExpanded={openSection === 'Foundation'}
          onHeaderClick={() => onHeaderClick('Foundation')}
        >
          <BaseMenu selected={getAppliedBases(nailDesign)} onSelection={onBaseSelection} />
          
          <br/>
          
          <ShapeMenu 
            hand={nailDesign.left}
            isNatural={nailDesign.left.length === 'natural'}
            selected={nailDesign.left.shape} 
            selectedLength={nailDesign.left.length}
            onSelection={onShapeSelection} />
          
          <br/>
          
          <LengthMenu 
            hand={nailDesign.left}
            selected={nailDesign.left.length} 
            onSelection={onLengthSelection} />
        </DesignSection>

        {/* <DesignSection 
          title='Length'
          isExpanded={openSection === 'Length'}
          onHeaderClick={() => onHeaderClick('Length')}>
          
        </DesignSection> 

        <DesignSection 
          title='Shape'
          isExpanded={openSection === 'Shape'}
          onHeaderClick={() => onHeaderClick('Shape')}>
         
        </DesignSection> */}

        <DesignSection 
          title='Design'
          isExpanded={openSection === 'Design'}
          // isExpanded={true}
          onHeaderClick={() => onHeaderClick('Design')}>
          <DesignElementMenu
            hand={nailDesign.left}
            selectedCountMap={getAppliedDesignElementCounts(nailDesign)} 
            onSelection={onDesignElementCountChange} 
            onClear={onDesignElemRemoval}/>
        </DesignSection>
      </div>

      <Summary nailDesign={nailDesign} />
    </div>;
}