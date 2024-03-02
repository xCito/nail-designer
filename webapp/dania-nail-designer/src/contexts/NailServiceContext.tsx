import React, { PropsWithChildren, createContext, useReducer, useState } from 'react';

export interface NailSvc {
  type: string | undefined;
  currentLength: string | undefined;
  currentShape: string | undefined;
  desiredBase: string | undefined;
  desiredLength: string | undefined;
  desiredShape: string | undefined;

  designRemoval: boolean;
  gelPolishRemoval: boolean;
  extensionRemoval: boolean;
}
interface ContextVal {
  nailService: NailSvc,
  setNailService: (n: NailSvc) => void;
}

export const defaultNailService = (): NailSvc => ({
  type: undefined,
  currentLength: undefined,
  currentShape: undefined,
  desiredBase: undefined,
  desiredLength: undefined,
  desiredShape: undefined,
  designRemoval: false,
  gelPolishRemoval: false,
  extensionRemoval: false
})
const contextDefaultVal: ContextVal = {
  nailService: defaultNailService(),
  setNailService: () => void 0
}
export const NailServiceContext = createContext<ContextVal>(contextDefaultVal);
export function NailServiceProvider (p: PropsWithChildren) {
  const [nailService, setNailService] = useState<NailSvc>(defaultNailService);

  const val = {
    nailService,
    setNailService
  }
  return <NailServiceContext.Provider value={val}>
    {p.children}
  </NailServiceContext.Provider>
}