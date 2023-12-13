import { NailLengthId, NailServiceId, NailShapeId } from "@/constants/design-constants"
import { getNailLengthsAsList, getNailServicesAsList, getNailShapesAsList } from "@/service/helpers";
import { ChangeEvent } from "react";

interface Props {
  startLen: NailLengthId | null,
  onLengthChange: (l: NailLengthId) => void;
  startShape: NailShapeId | null,
  onShapeChange: (l: NailShapeId) => void;
  service: NailServiceId | null,
  onServiceChange: (l: NailServiceId) => void;
}

const lengths = getNailLengthsAsList();
const shapes = getNailShapesAsList();
const services = getNailServicesAsList();

export function ConsultationMenu(props: Props) {
  const { startLen, startShape, service } = props;
  const { onLengthChange, onShapeChange, onServiceChange } = props;

  const onStartLengthSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onLengthChange(e.target.value as NailLengthId);
  }

  const onStartShapeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onShapeChange(e.target.value as NailShapeId);
  }

  const onServiceSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onServiceChange(e.target.value as NailServiceId);
  }

  return <div className="text-start px-3">
  

    <p className='fw-bold'>Desired Service</p>
    {services.map(s => 
      <label className='ms-3 d-block' htmlFor={`svc_type_${s.id}`} key={s.id}>
        <input 
          id={`svc_type_${s.id}`}
          checked={s.id === service}
          name="service_type" 
          type="radio" 
          value={s.id}
          onChange={onServiceSelect} />
          {s.value.name}
      </label>
    )}
    
    <br />
    
    {(service !== 'manicure' && service !== 'take_down') && <>
      <p className='fw-bold'>Select your nail length before service</p>
      <select className="ms-3" id="strt_length" onChange={onStartLengthSelect} value={startLen ?? undefined}>
        <option disabled>Choose length</option>
        {lengths.map(len => <option key={len.id} value={len.id}>{len.value.label}</option>)}
      </select>

      <br />
      <br />

      <p className='fw-bold'>Select your nail shape before service</p>
      <select className="ms-3" id="strt_shape" onChange={onStartShapeSelect} value={startShape ?? undefined}>
        <option disabled>Choose shape</option>
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