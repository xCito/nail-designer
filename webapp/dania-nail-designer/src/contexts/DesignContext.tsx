import { ReactNode, createContext, useReducer, useState } from "react";
import { Design, NailLengthId, NailServiceId, NailShapeId, getDefaultDesign } from "../constants/design-constants";
import { DesignProviderValue } from "../types/other-types";
import { designReducer } from "./DesignReducer";

const defaultDesign: Design = getDefaultDesign();
const contextDefault: DesignProviderValue = {
  nailDesign: defaultDesign, 
  dispatch: () => void 0,
  startingLength: null,
  setStartingLength: () => void 0,
  startingShape: null,
  setStartingShape: () => void 0,
  service: null,
  setService: () => void 0,
}
export const DesignContext = createContext<DesignProviderValue>(contextDefault);

export function DesignProvider({children}: {children?: ReactNode}) {
  const [nailDesign, dispatch] = useReducer(designReducer, defaultDesign);
  const [startingLength, setStartingLength] = useState<NailLengthId | null>(null);
  const [startingShape, setStartingShape] = useState<NailShapeId | null>(null);
  const [service, setService] = useState<NailServiceId | null>(null);

  const value = {
    startingLength,
    setStartingLength,
    startingShape,
    setStartingShape,
    service,
    setService,
    nailDesign, 
    dispatch
  }
  return <DesignContext.Provider value={value}>
    {children}
  </DesignContext.Provider>
}