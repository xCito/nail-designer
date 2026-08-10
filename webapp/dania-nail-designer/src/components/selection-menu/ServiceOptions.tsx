import { NailServiceId } from "@/constants/design-constants";
import { getNailServicesAsList } from "@/service/helpers";
import { ConsultationValue } from "@/types/other-types";
import classNames from "classnames";
import { InfoIcon } from "../InfoIcon";

interface Props {
  service: NailServiceId | null,
  onConsultChange: (v: Partial<ConsultationValue>) => void;
  dispatch: (action: any) => void;
}

const services = getNailServicesAsList();

export function ServiceOptions(props: Props) {
  const { dispatch, service } = props;
  const { onConsultChange } = props;

  const onServiceSelect = (selectSvc: NailServiceId) => {
    const updateConsult: Partial<ConsultationValue> = { service: selectSvc };

    if (selectSvc === 'manicure') {
      updateConsult.isManiApplied = null
      updateConsult.startLen = null,
        updateConsult.startShape = null;
      dispatch({ type: 'SET_BASE', baseId: 'BaseGel' });
    } else if (selectSvc == 'take_down') {
      updateConsult.isManiApplied = true,
        updateConsult.startLen = null,
        updateConsult.startShape = null;
    } else {
      updateConsult.isManiApplied = true;
      dispatch({ type: 'SET_BASE', baseId: 'PolyGel' });
    }

    onConsultChange(updateConsult);
  }

  return <div className="px-3 mb-5">
    <h4 className="d-flex align-items-center mb-3">
      Service
      <InfoIcon title="Service" content="Select your preferred nail service." />
    </h4>
    <div className="service-options">
      {services.map(s => (
        <button 
          key={s.id}
          className={classNames({active: service === s.id})} 
          onClick={() => onServiceSelect(s.id)}>{s.value.name}</button>
      ))}
    </div>
  </div>;
}
