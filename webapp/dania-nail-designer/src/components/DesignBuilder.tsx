import { NailBaseId, NailDesignElemId, NailLengthId, NailShapeId } from "@/constants/design-constants";
import { ConsultationValue } from "@/types/other-types";
import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import { getAppliedBases, getAppliedDesignElementCounts } from "../service/helpers";
import { DesignSection } from "./DesignSection";
import { Finger } from "./hand/Finger";
import { Summary } from "./receipt/Summary";
import { BaseMenu } from "./selection-menu/BaseMenu";
import { ConsultationMenu } from "./selection-menu/ConsultationMenu";
import { DesignElementMenu } from "./selection-menu/DesignElementMenu";
import { LengthMenu } from "./selection-menu/LengthMenu";
import { ShapeMenu } from "./selection-menu/ShapeMenu";


export function DesignBuilder() {

  const [openSection, setOpenSection] = useState<string | null>('Consultation')
  const { 
    dispatch, 
    nailDesign, 
    consultData,
    setConsultData,
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


  return <div className="h-100 py-3 px-2"> 
    <div className="layout d-flex flex-column mx-auto">

      <div className="d-flex">
        <div>
          <h2 className="page-title fancy-font my-0">Stardust Factory</h2>
          <p className="fancy-font mt-0">By Dania Nails</p>
        </div>
        <div className="flex-grow-1 justify-self-end text-end">

          <Finger 
            length={nailDesign.left.length} 
            shape={nailDesign.left.shape} />
        </div>
      </div>

        <DesignSection 
          title='Consultation' 
          isExpanded={openSection === 'Consultation'}
          onHeaderClick={() => onHeaderClick('Consultation')}>
            <ConsultationMenu 
              service={consultData.service}
              startLen={consultData.startLen}
              startShape={consultData.startShape}
              isManiApplied={consultData.isManiApplied}
              onConsultChange={(v: Partial<ConsultationValue>) => setConsultData(v) }  />
        </DesignSection>

        <DesignSection 
          title='Foundation' 
          isExpanded={openSection === 'Foundation'}
          onHeaderClick={() => onHeaderClick('Foundation')}
        >
          <BaseMenu selected={getAppliedBases(nailDesign)} onSelection={onBaseSelection} />
          
          <br/>
          
          <ShapeMenu 
            selected={nailDesign.left.shape} 
            onSelection={onShapeSelection} />
          
          <br/>
          
          <LengthMenu 
            selected={nailDesign.left.length} 
            onSelection={onLengthSelection} />

          {/* <div className={classNames("d-flex justify-content-center mt-5 hands border-top", nailDesign.left.length)}>
            <Hands hand={nailDesign.left} />
          </div> */}
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

      <Summary 
        nailDesign={nailDesign} 
        isManiApplied={consultData.isManiApplied}
        selectedServiceId={consultData.service}
        startLength={consultData.startLen}
        startShape={consultData.startShape} />
    </div>;
}