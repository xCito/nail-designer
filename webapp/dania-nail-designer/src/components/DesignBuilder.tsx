import { AddOnServiceId, NailBaseId, NailDesignElemId, NailLengthId, NailShapeId } from "@/constants/design-constants";
import { ConsultationValue } from "@/types/other-types";
import { useContext, useState } from "react";
import { DesignContext } from "../contexts/DesignContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { getAppliedBases, getAppliedDesignElementCounts } from "../service/helpers";
import { DesignSection } from "./DesignSection";
import { Finger } from "./hand/Finger";
import { Summary } from "./receipt/Summary";
import { BaseOptions } from "./selection-menu/BaseOptions";
import { DesignElementMenu } from "./selection-menu/DesignElementMenu";
import { ShapeOptions } from "./selection-menu/ShapeOptions";
import { ServiceOptions } from "./selection-menu/ServiceOptions";
import { AddOnOptions } from "./selection-menu/AddOnOptions";
import logoDark from '@/assets/SDF-transparent-logo-black.png';
import logoLight from '@/assets/SDF-transparent-logo-glow-purple.png';

export function DesignBuilder() {

  const [openSection, setOpenSection] = useState<string | null>('Consultation')
  const { 
    dispatch, 
    nailDesign, 
    consultData,
    setConsultData,
  } = useContext(DesignContext);
  const { themeMode, resolvedTheme, setThemeMode } = useContext(ThemeContext);

  const isDarkMode = themeMode === 'system' ? resolvedTheme === 'dark' : themeMode === 'dark';

  const onThemeToggle = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  const onHeaderClick = (section: string) => {
    if (openSection === section) {
      // setOpenSection(null);
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

  const onAddOnToggle = (addOnId: AddOnServiceId, isChecked: boolean) => {
    const newAddOns = isChecked 
      ? [...consultData.addOns, addOnId] 
      : consultData.addOns.filter(a => a !== addOnId);
    setConsultData({addOns: newAddOns});
  }

  const onShapeChangeToggle = (isChecked: boolean) => {
    console.log('shape change toggle', isChecked);
    onAddOnToggle('shape_change', isChecked);
  }

  const onLengthChangeToggle = (isChecked: boolean) => {
    console.log('length change toggle', isChecked);
    onAddOnToggle('length_change', isChecked);
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

      <div className="d-flex align-items-start justify-content-between gap-1">
        <div className="mb-2">
          <div className="d-flex align-items-center gap-2 mb-2">
          <img src={isDarkMode ? logoLight : logoDark} alt="Stardust Factory Logo" width="40" />
          <h2 className="page-title fancy-font my-0">
            Stardust Factory
          </h2>
          </div><div className="d-flex align-items-center gap-2">
            <span className="theme-toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
            <button
              type="button"
              className={`theme-toggle ${isDarkMode ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
              onClick={onThemeToggle}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              aria-pressed={isDarkMode}
            >
              <span className="theme-toggle-knob" />
            </button>
          </div>
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
          <ServiceOptions 
            service={consultData.service}
            dispatch={dispatch}
            onConsultChange={(v: Partial<ConsultationValue>) => setConsultData(v) } />
          
          <ShapeOptions 
            selectedShape={nailDesign.left.shape} 
            selectedLength={nailDesign.left.length}
            consultData={consultData}
            onLengthSelection={onLengthSelection}
            onShapeSelection={onShapeSelection} 
            onShapeChangeToggle={onShapeChangeToggle}
            onLengthChangeToggle={onLengthChangeToggle}
            />
          
          <BaseOptions 
            selected={getAppliedBases(nailDesign)} 
            consultData={consultData}
            onSelection={onBaseSelection} />

          <AddOnOptions
            consultData={consultData}
            onAddOnToggle={onAddOnToggle} />
     
      </DesignSection>

      <DesignSection 
        title='Design'
        isExpanded={openSection === 'Design'}
        onHeaderClick={() => onHeaderClick('Design')}>
          <DesignElementMenu
            hand={nailDesign.left}
            selectedCountMap={getAppliedDesignElementCounts(nailDesign)} 
            onSelection={onDesignElementCountChange} 
            onReset={onDesignElemRemoval}/>
      </DesignSection>
    </div>

    <Summary 
      nailDesign={nailDesign} 
      consultionData={consultData}
      isManiApplied={consultData.isManiApplied}
      selectedServiceId={consultData.service}
      startLength={consultData.startLen}
      startShape={consultData.startShape} />
  </div>;
}