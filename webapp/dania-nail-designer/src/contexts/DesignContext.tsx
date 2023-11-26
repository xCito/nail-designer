import { ReactNode, createContext, useReducer } from "react";
import { getDefaultDesign } from "../constants/design-constants";
import { Design } from "../types/design-types";
import { DesignProviderValue } from "../types/other-types";
import { designReducer } from "./DesignReducer";

const defaultDesign: Design = getDefaultDesign();
export const DesignContext = createContext<DesignProviderValue>({nailDesign: defaultDesign, dispatch: () => void 0});

export function DesignProvider({children}: {children?: ReactNode}) {
  const [nailDesign, dispatch] = useReducer(designReducer, defaultDesign);

  return <DesignContext.Provider value={{nailDesign, dispatch}}>
    {children}
  </DesignContext.Provider>
}