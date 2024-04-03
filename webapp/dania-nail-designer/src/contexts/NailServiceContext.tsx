import { CONVERSATION, ChatArg, ChatState, chatReducer } from '@/components/chat/chat-reducer';
import { NailBaseId, NailLengthId, NailServiceId, NailShapeId } from '@/constants/design-constants';
import { chatHistoryToNailServiceUpdate } from '@/service/helpers';
import { PropsWithChildren, createContext, useEffect, useReducer, useState } from 'react';

export interface NailSvc {
  type: NailServiceId | undefined;
  additional: NailServiceId[];
  currentLength: NailLengthId | undefined;
  currentShape: NailShapeId | undefined;
  desiredBase: NailBaseId | undefined;
  desiredLength: NailLengthId | undefined;
  desiredShape: NailShapeId | undefined;

  designRemoval: boolean;
  gelPolishRemoval: boolean;
  extensionRemoval: boolean;
  massage: boolean;
}
interface ContextVal {
  nailService: NailSvc,
  setNailService: (n: NailSvc) => void;
  chat: ChatState,
  chatDispatch: (a: ChatArg) => void;
}

const InitialConvo: ChatState = {
  messages: [ CONVERSATION[0] ],
  selectedList: []  
}
export const defaultNailService = (): NailSvc => ({
  type: undefined,
  additional: [],
  currentLength: undefined,
  currentShape: undefined,
  desiredBase: undefined,
  desiredLength: undefined,
  desiredShape: undefined,
  designRemoval: false,
  gelPolishRemoval: false,
  extensionRemoval: false,
  massage: true,
});
const contextDefaultVal: ContextVal = {
  nailService: defaultNailService(),
  setNailService: () => console.log('dummy'),
  chat: InitialConvo,
  chatDispatch: (_: ChatArg) => void 0
}
export const NailServiceContext = createContext<ContextVal>(contextDefaultVal);
export function NailServiceProvider (p: PropsWithChildren) {
  const [nailService, setNailService] = useState<NailSvc>(defaultNailService);
  const [chat, dispatch] = useReducer<typeof chatReducer>(chatReducer, InitialConvo);
  
  useEffect(() => {
    const svcUpdates = chatHistoryToNailServiceUpdate(chat);
    setNailService(svcUpdates);
  }, [chat.selectedList]);
  
  const val = {
    nailService,
    setNailService,
    chat,
    chatDispatch: dispatch
  };
  return <NailServiceContext.Provider value={val}>
    {p.children}
  </NailServiceContext.Provider>
}