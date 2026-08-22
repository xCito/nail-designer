import { ConsultationValue } from "@/types/other-types";
import { InfoIcon } from "../InfoIcon";
import { getAddOnServicesAsList } from "@/service/helpers";
import { AddOnServiceId } from "@/constants/design-constants";

const addOnsList = getAddOnServicesAsList();
const EXCLUDED: AddOnServiceId[] = ['length_change', 'shape_change'];
interface Props {
  onAddOnToggle: (addOnId: AddOnServiceId, isChecked: boolean) => void;
  consultData: ConsultationValue;
}
export function AddOnOptions(props: Props) {
  const { consultData } = props;
  const { addOns: selectedAddOns } = consultData;
  const addOnOptions = [...addOnsList].filter(o => !EXCLUDED.includes(o.id));

  const onAddOnToggle = (addOnId: AddOnServiceId, isChecked: boolean) => {
    if (isChecked) {
      props.onAddOnToggle(addOnId, true);
    } else {
      props.onAddOnToggle(addOnId, false);
    }
  }

  return <div className="px-3">
      <h4 className="d-flex align-items-center mb-3">
        Add-ons
        <InfoIcon title="Add-ons" content="Select your preferred add-on." />
      </h4>

      {/* <fieldset className="change-container mt-3">
        <legend className="">Additional Services</legend> */}
        
        {addOnOptions.map(option => {
          const isChecked = selectedAddOns.includes(option.id);
          return <div className="d-flex align-items-center ms-2 mb-1" key={option.id}>
            <input type="checkbox"
              id={option.id}
              name={option.id}
              checked={isChecked}
              onChange={(e) => onAddOnToggle(option.id, e.target.checked)}
            />
            <label className="ms-2 flex-grow-1 py-2" htmlFor={option.id}>{option.value.name}</label>
          </div>
        })}
      {/* </fieldset> */}

    </div>  
}