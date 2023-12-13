import { ReactNode, createContext, useReducer, useState } from "react";
import { Design, NailLengthId, NailServiceId, NailShapeId, getDefaultDesign } from "../constants/design-constants";
import { ConsultationValue, DesignProviderValue } from "../types/other-types";
import { designReducer } from "./DesignReducer";

const defaultDesign: Design = getDefaultDesign();
const consultDataDefault: ConsultationValue = {
  isManiApplied: null,
  startLen: null,
  startShape: null,
  service: null,
}

const contextDefault: DesignProviderValue = {
  nailDesign: defaultDesign, 
  dispatch: () => void 0,
  consultData: consultDataDefault,
  setConsultData: () => void 0,
  // startingLength: null,
  // setStartingLength: () => void 0,
  // startingShape: null,
  // setStartingShape: () => void 0,
  // service: null,
  // setService: () => void 0,
  // includeManicure: null,
  // setIncludeManicure: () => void 0,
}

export const DesignContext = createContext<DesignProviderValue>(contextDefault);

export function DesignProvider({children}: {children?: ReactNode}) {
  const [nailDesign, dispatch] = useReducer(designReducer, defaultDesign);
  const [startingLength, setStartingLength] = useState<NailLengthId | null>(null);
  const [startingShape, setStartingShape] = useState<NailShapeId | null>(null);
  const [service, setService] = useState<NailServiceId | null>(null);
  const [includeManicure, setIncludeManicure] = useState<boolean | null>(null);
  const [consultation, setConsultation] = useState<ConsultationValue>(consultDataDefault);

  const updateConsultationData = (v: Partial<ConsultationValue>) => {
    setConsultation({...consultation, ...v});
  }

  const value: DesignProviderValue = {
    nailDesign, 
    consultData: consultation,
    setConsultData: updateConsultationData,
    dispatch,
  }
  return <DesignContext.Provider value={value}>
    {children}
  </DesignContext.Provider>
}