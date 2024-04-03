import { Design, DesignElements, NailBases, NailDesignElemId, NailLengths, NailShapes, NailServices } from "@/constants/design-constants";
import { FingerIndices } from "../constants/other-constants";
import { ChatArg, ChatState } from "@/components/chat/chat-reducer";
import { NailSvc, defaultNailService } from "@/contexts/NailServiceContext";
import { Dispatch } from "react";



function getObjAsList<T extends { [k in keyof T]: string | object}>(obj: T): Array<{id: keyof T, value: T[keyof T]}> {
  return (Object.entries<string | object>(obj) as Array<[id: keyof T, value: T[keyof T]]>)
    .map(([k,v]) => ({id: k, value: typeof v ==='object' ? {...v} : v}));
}

export function getNailServicesAsList() {  return getObjAsList(NailServices); }
export function getNailBasesAsList() {  return getObjAsList(NailBases); }
export function getNailLengthsAsList() {  return getObjAsList(NailLengths); }
export function getNailShapesAsList() {  return getObjAsList(NailShapes); }
export function getNailDesignElementsAsList() {  return getObjAsList(DesignElements); }

export function getAppliedBases(nailDesign: Design) {
  return nailDesign.left.base;
}

export function getAppliedLength(nailDesign: Design) {
  return nailDesign.left.length;
}

export function getAppliedShape(nailDesign: Design) {
  return nailDesign.left.shape;
}

export function getAppliedDesignElementIds(nailDesign: Design): NailDesignElemId[] {
  const fingers = [];
  for (const fingerIndex of FingerIndices) {
    fingers.push(nailDesign.left[fingerIndex]);
    fingers.push(nailDesign.right[fingerIndex]);
  }

  const designElemSet = fingers.map(finger => finger.designElems)
    .flat()
    .reduce((set, d) => set.add(d), new Set<NailDesignElemId>());

  return Array.from(designElemSet);
}

export function getAppliedDesignElementCounts(nailDesign: Design): Map<NailDesignElemId, number> {
  const countMap = new Map<NailDesignElemId, number>();

  const fingers = [];
  for (const fingerIndex of FingerIndices) {
    fingers.push(nailDesign.left[fingerIndex]);
  }
  for (const fingerIndex of FingerIndices) {
    fingers.push(nailDesign.right[fingerIndex]);
  }

  fingers.map(finger => finger.designElems).flat().forEach(dElemId => {
    if (countMap.has(dElemId))
      countMap.set(dElemId, countMap.get(dElemId)! + 1);
    else
      countMap.set(dElemId, 1);
  });

  return countMap;
}


export function getByType<T extends { "type": string }>(list: T[], t: string): T[] {
  return list.filter(elem => elem.type === t);
}

// export function serviceDetailsChangeToChatUpdate(chatState: ChatState, chatDispatch: Dispatch<ChatArg>, svcAttr: keyof NailSvc, svcValue: any) {
//   const msgList = structuredClone(chatState.messages);
//   const chosenList = structuredClone(chatState.selectedList);

//   switch(svcAttr) {
//     case 'type': {
//       const msgIndex = msgList.findIndex((msg) => msg.id === 'whatService');

//       chatDispatch({questionIndex: msgIndex, selected: { entityId: svcValue }})
//     }
//   }
// }

export function chatHistoryToNailServiceUpdate(chatState: ChatState): NailSvc {
  const chatHistory = chatState.messages;
  const selectedOptionList = chatState.selectedList;

  const svc: NailSvc = defaultNailService(); 
  
  for (let chat of chatHistory) {
    const chatChoice = selectedOptionList.find(o => o.qId === chat.id);

    switch (chat.id) {
      case "whatService": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        
          svc.type = option?.entityId; 

        if (option?.entityId === 'manicure') {
          svc.desiredBase = 'base_gel';
        } else if (option?.entityId === 'g_manicure') {
          svc.desiredBase = 'base_gel';
        } else if (option?.entityId === 'enhan_ext') {
          svc.desiredBase = 'poly_gel';
        } 
        break;
      }
      case "wantManiService": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        if (option?.label !== 'No') {
          svc.additional.push(option?.entityId!);
        }
        break;
      }
      case "desiredBase": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.desiredBase = option?.entityId; 
        break;
      }
      case "whatCurrentMaintainLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.currentLength = option?.entityId;
        break;
      }
      case "whatCurrentMaintainShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.currentShape = option?.entityId;
        break;
      }
      case "desiredEnhanceLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.desiredLength = option?.entityId;
        break;
      }
      case "whatManiLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.desiredLength = option?.entityId;
        break;
      }
      case "desiredEnhanceShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.desiredShape = option?.entityId;
        break;
      }
      case "whatManiShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.label === chatChoice?.option.label);
        svc.desiredShape = option?.entityId;
        break;
      }
      case "needPreManiRemoval": {
        // if (chatSelection === 'Current design') {
        //   svc.designRemoval = true;
        // } else if (chatSelection === 'Old gel/polish') {
        //   svc.gelPolishRemoval = true;
        // } else {
        //   svc.designRemoval = false;
        //   svc.gelPolishRemoval = false;
        // }
        break;
      }
      case "needPreEnhanceRemoval": {
        // if (chatSelection === 'Current design') {
        //   svc.designRemoval = true;
        // } else if (chatSelection === 'Old extension product') {
        //   svc.extensionRemoval = true;
        // } else {
        //   svc.designRemoval = false;
        //   svc.extensionRemoval = false;
        // }
        break;
      }
    }
  }

  return svc;
}
