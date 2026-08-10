import classNames from "classnames";
import { NailLengthId, NailServices, NailShapeId } from "../../constants/design-constants";
import { getNailLengthsAsList, getNailShapesAsList } from "../../service/helpers";
import { ConsultationValue } from "@/types/other-types";
import { InfoIcon } from "../InfoIcon";


const shapeOptions = getNailShapesAsList();
const lengthOptions = getNailLengthsAsList();

interface Props {
  selectedShape: NailShapeId | null;
  selectedLength: NailLengthId | null;
  onShapeSelection: (shape: NailShapeId) => void;
  onLengthSelection: (length: NailLengthId) => void;
  onShapeChangeToggle: (isChecked: boolean) => void;
  onLengthChangeToggle: (isChecked: boolean) => void;
  consultData: ConsultationValue;
}
export function ShapeOptions(props: Props) {
  const { selectedShape, selectedLength, consultData } = props;
  const { onShapeSelection, onLengthSelection } = props;
  const { service } = consultData;

  const minSize = Math.min(...lengthOptions.map(s => s.value.size));
  const maxSize = Math.max(...lengthOptions.map(s => s.value.size));
  const minLength = lengthOptions.find(l => l.value.size === minSize) ?? lengthOptions[0];
  const maxLength = lengthOptions.find(l => l.value.size === maxSize) ?? lengthOptions[0];

  return <div className="px-3 position-relative mb-5">
    <h4 className="mb-3 d-flex align-items-center">
      Shape & Length
      <InfoIcon title="Shape & Length" content="Select your preferred nail shape and length." />
    </h4>

    <div className="shape-options">
      {shapeOptions.map(s => {
        const isDisabled = (service && NailServices[service].type === 'pre-service') ?? false
        return <button 
          className={classNames({active: selectedShape === s.id})} 
          onClick={() => onShapeSelection(s.id)} 
          disabled={isDisabled}
          key={s.id}>
          {s.value.label}
        </button>
      })}
    </div>

    <input 
      className="w-100"
      type="range" 
      list="lengths"
      min={minSize} 
      max={maxSize} 
      value={lengthOptions.find(l => l.id === selectedLength)?.value.size ?? minSize}
      onChange={(e) => onLengthSelection(lengthOptions.find(l => l.value.size === parseInt(e.target.value))?.id ?? lengthOptions[0].id)}
    />

    <datalist id="lengths">
      {lengthOptions.map(l => (
        <option key={l.id} value={l.value.size}></option>
      ))}
    </datalist>

    <div className="d-flex justify-content-between">
      <label className="length-label">{minLength.value.label}</label>
      <label className="length-label fw-bold text-center">{lengthOptions.find(l => l.id === selectedLength)?.value.label}</label>
      <label className="length-label">{maxLength.value.label}</label>
    </div>

    <fieldset className="change-container mt-3">
      <legend className="">Making changes?</legend>
      
      <div className="d-flex align-items-center">
        <input type="checkbox"
          id="shape-change"
          name="shape-change"
          checked={consultData.addOns.includes('shape_change')}
          onChange={(e) => {
            const isChecked = e.target.checked;
            props.onShapeChangeToggle?.(isChecked);
          }} />
        <label className="ms-2" htmlFor="shape-change">Shape Change</label>
      </div>

      <div className="d-flex align-items-center">
        <input type="checkbox"
          id="length-change"
          name="length-change"
          checked={consultData.addOns.includes('length_change')}
          onChange={(e) => {
            const isChecked = e.target.checked;
            props.onLengthChangeToggle?.(isChecked);
          }} />
        <label className="ms-2" htmlFor="length-change">Length Change</label>
      </div>

    </fieldset>
  </div>;
    
}