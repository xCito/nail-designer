import { NailLengthId, NailServiceId, NailShapeId } from "@/constants/design-constants"
import { getNailLengthsAsList, getNailServicesAsList, getNailShapesAsList } from "@/service/helpers";
import { ConsultationValue } from "@/types/other-types";
import classNames from "classnames";
import { ChangeEvent } from "react";

interface Props {
  startLen: NailLengthId | null,
  startShape: NailShapeId | null,
  service: NailServiceId | null,
  manicureApplied: boolean | null,
  designRemoval: boolean | null,
  enhancementRemoval: boolean | null,
  onConsultChange: (v: Partial<ConsultationValue>) => void;
}

const lengths = getNailLengthsAsList();
const shapes = getNailShapesAsList();
const services = getNailServicesAsList();

export function ConsultationMenu(props: Props) {
  const { startLen, startShape, service, manicureApplied, designRemoval, enhancementRemoval } = props;
  const { onConsultChange } = props;

  const onStartLengthSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectLen = e.target.value as NailLengthId;
    onConsultChange({startLen: selectLen});
  }

  const onStartShapeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectShape = e.target.value as NailShapeId;
    onConsultChange({startShape: selectShape});
  }

  const onServiceSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectSvc = e.target.value as NailServiceId;
    const updateConsult: Partial<ConsultationValue> = { service: selectSvc };

    if (selectSvc === 'manicure') {
      updateConsult.isManiApplied = null
      updateConsult.startLen = null, 
      updateConsult.startShape = null;
    } else if (selectSvc == 'take_down') {
      updateConsult.isManiApplied = true,
      updateConsult.startLen = null, 
      updateConsult.startShape = null;
    } else {
      updateConsult.isManiApplied = true;
    }

    onConsultChange(updateConsult);
  }

  const onApplyManicureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onConsultChange({isManiApplied: isChecked});
  }

  const onDesignRemoval = (e: ChangeEvent<HTMLInputElement>) =>  
    onConsultChange({isDesignRemoval: e.target.checked, isEnhancementRemoval: false});
  const onEnhancementRemoval = (e: ChangeEvent<HTMLInputElement>) =>  
    onConsultChange({isDesignRemoval: false, isEnhancementRemoval: e.target.checked});


  return <div className="text-start px-3">

    <p className='fw-bold'>Desired Service</p>
    {services.map(s => 
      <label className='ms-3 mb-2 d-block fs-4' htmlFor={`svc_type_${s.id}`} key={s.id}>
        <input 
          id={`svc_type_${s.id}`}
          checked={s.id === service}
          name="service_type" 
          className="me-3"
          type="radio" 
          value={s.id}
          onChange={onServiceSelect} />
          {s.value.name}
      </label>
    )}
    
    <br />
    
    {(service !== null && service !== 'manicure') && <>
      <p className='fw-bold'>Include Manicure?</p>
      <label htmlFor='include_mani' className="ms-3 fs-4">
        <input 
          id="include_mani" 
          type="checkbox"
          className="me-3"
          checked={manicureApplied ?? false} 
          onChange={onApplyManicureChange}/>
        Yes
      </label>

      <br />
      <br />
    </>}
    
    {(service !== null && service !== 'take_down') && <>
      <p className='fw-bold'>Removal Services</p>
      <label htmlFor='take_down_radio' className={classNames("ms-3 fs-4 d-block", {"text-muted": ['refill', 'rebalance'].includes(service)})}>
        <input 
          id="take_down_radio" 
          name={'removals'} 
          type="checkbox" 
          className="me-3"
          checked={!!enhancementRemoval} 
          disabled={['refill', 'rebalance'].includes(service)}
          onChange={onEnhancementRemoval}/>
        Remove old nails
      </label>
      <label htmlFor='design_remove_radio' className="ms-3 fs-4 d-block">
        <input 
          id="design_remove_radio" 
          name={'removals'} 
          type="checkbox" 
          className="me-3"
          checked={!!designRemoval}
          onChange={onDesignRemoval}/>
        Remove old design
      </label>

      <br />
      <br />
    </>}
    

    

    {(service !== null && service !== 'manicure' && service !== 'take_down') && <>
      <p className='fw-bold'>Select your nail length before service</p>
      <select className="ms-3 p-2 fs-6 rounded" id="strt_length" onChange={onStartLengthSelect} value={startLen ?? ''}>
        <option disabled value={''}>Choose length</option>
        {lengths.map(len => <option key={len.id} value={len.id}>{len.value.label}</option>)}
      </select>

      <br />
      <br />

      <p className='fw-bold'>Select your nail shape before service</p>
      <select className="ms-3 p-2 fs-6 rounded" id="strt_shape" onChange={onStartShapeSelect} value={startShape ?? ''}>
        <option disabled value={''}>Choose shape</option>
        {shapes.map(len => <option key={len.id} value={len.id}>{len.value.label}</option>)}
      </select>

      <br />
      <br />
    </>}

{/*     
    <label className='d-block' htmlFor="mani_type">Desired Manicure Service</label>
    <select id="mani_type" onChange={onServiceSelect}>
      <option>Basic</option>
      <option>Polish</option>
      <option>Base gel</option>
      <option>Rubber gel</option>
      <option>Hard gel</option>
      <option>Poly gel</option>
    </select> */}

    <br />
    <br />

    {/* <label>Removal: </label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Non</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Polish</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Base gel</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Full take down</label> */}

    <br />

    {/* <label htmlFor="">Apply color: </label>
    <label htmlFor="">
      <input type="checkbox" name="" id="" />
      
    </label> */}

    {/* <ul>
      <li>Number of Fingers (default 10)</li>
      <li>Repairs (REDO caused by breaks & lifting)</li>
      <li>Manicure (general clean up) (includes polish removal, natural nail shaping if final length)</li>

      <li>Removal</li>
      <ul>
        <li>polish removal</li>
        <li>gel removal</li>
        <li>full (takedown) removal</li>
      </ul>

      <li>Service (adding material / extensions)</li> 
      <ul>
        <li>rebalance (correct hump & alignment)</li>
        <li>refill (fill-in space left by growth)</li>
        <li>full set (from scratch add nails)</li>
      </ul>
    </ul> */}
  </div>
}