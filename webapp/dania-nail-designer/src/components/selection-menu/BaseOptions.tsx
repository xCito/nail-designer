import classNames from "classnames";
import { getNailBasesAsList } from "@/service/helpers";
import { NailBaseId, NailServiceId } from "../../constants/design-constants";
import { ConsultationValue } from "@/types/other-types";
import { InfoIcon } from "../InfoIcon";
import { NailServiceRates } from "@/constants/pricing-constants";

function isBaseDisabled(service: NailServiceId | null, basedId: NailBaseId) {
  if (!service) return true;

  const basesBySvc = NailServiceRates[service].base!;
  const value = basesBySvc[basedId]

  if (value === null) return true;
  return false;
}

const bases = getNailBasesAsList();

interface Props {
  selected: NailBaseId | null
  onSelection: (base: NailBaseId | null) => void;
  consultData: ConsultationValue;
}
export function BaseOptions(props: Props) {
  const { selected, onSelection, consultData } = props;
  const { service } = consultData;
  const baseOptions = [...bases]

  const onBaseSelect = (baseId: NailBaseId | null) => {
    if (null === baseId) {
      onSelection(null);
    } else {
      onSelection(baseId);
    }
  }

  return <div className="px-3">
    <h4 className="d-flex align-items-center mb-3">
      Material
      <InfoIcon title="Material" content="Select your preferred nail material." />
    </h4>
    <div className="base-options">
      {baseOptions.map(option => {
        const isDisabled = isBaseDisabled(service, option.id);
        
        return <button key={option.value}
          className={classNames({ active: selected === option.id })}
          disabled={isDisabled}
          onClick={() => onBaseSelect(option.id)}>
          {option.value}
        </button>
      })}
    </div>
  </div>
}