import { NailLengthId, NailShapeId } from "@/constants/design-constants"
import { getNailLengthsAsList, getNailServicesAsList, getNailShapesAsList } from "@/service/helpers";
import { ChangeEvent } from "react";

interface Props {
  startingLength: NailLengthId | null,
  onStartLengthChange: (l: NailLengthId) => void;
  startingShape: NailShapeId | null,
  onStartShapeChange: (l: NailShapeId) => void;
}

const lengths = getNailLengthsAsList();
const shapes = getNailShapesAsList();
const services = getNailServicesAsList();

export function ConsultationMenu(props: Props) {
  const { startingLength, startingShape, onStartLengthChange, onStartShapeChange } = props;

  const onStartLengthSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onStartLengthChange(e.target.value as NailLengthId);
  }

  const onStartShapeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onStartShapeChange(e.target.value as NailShapeId);
  }

  const onServiceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value as NailShapeId);
  }

  return <div className="text-start px-3">
    <label className='d-block' htmlFor="strt_length">Select your nail length before service</label>
    <select id="strt_length" onChange={onStartLengthSelect} value={startingLength ?? undefined}>
      <option disabled>Choose length</option>
      {lengths.map(len => <option key={len.id} value={len.id}>{len.value.label}</option>)}
    </select>

    <br />
    <br />

    <label className='d-block' htmlFor="strt_shape">Select your nail shape before service</label>
    <select id="strt_shape" onChange={onStartShapeSelect} value={startingShape ?? undefined}>
      <option disabled>Choose length</option>
      {shapes.map(len => <option key={len.id} value={len.id}>{len.value.label}</option>)}
    </select>

    <br />
    <br />


    <label className='d-block' htmlFor="service_type">Desired Service</label>
    {services.map(s => 
      <label className='d-block' htmlFor={`svc_type_${s.id}`} key={s.id}>
        <input id={`svc_type_${s.id}`} name="service_type" type="radio" /> {s.value.name}
      </label>
    )}
    
    <br />
    <br />
    
    <label className='d-block' htmlFor="mani_type">Desired Manicure Service</label>
    <select id="mani_type" onChange={onServiceSelect}>
      <option>Basic</option>
      <option>Polish</option>
      <option>Base gel</option>
      <option>Rubber gel</option>
      <option>Hard gel</option>
      <option>Poly gel</option>
    </select>

    <br />
    <br />

    <label>Removal: </label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Non</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Polish</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Base gel</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Full take down</label>

    <br />

    <label htmlFor="">Apply color: </label>
    <label htmlFor="">
      <input type="checkbox" name="" id="" />
      
    </label>

    <ul>
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
        {/* <li>refill (fill-in space left by growth)</li> */}
        <li>full set (from scratch add nails)</li>
      </ul>
    </ul>
  </div>
}