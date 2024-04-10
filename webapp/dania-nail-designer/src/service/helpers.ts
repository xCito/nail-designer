import { Design, DesignElements, NailBases, NailDesignElemId, NailLengths, NailShapes, NailServices, getNailServiceById, NailService, NailLengthId, getNailLengthById, getNailShapeById } from "@/constants/design-constants";
import { FingerIndices } from "../constants/other-constants";
import { ChatItem, ChatOption, ChatState } from "@/components/chat/chat-reducer";
import { NailSvc, defaultNailService } from "@/contexts/NailServiceContext";
import { EXT_NAIL_REMOVAL_PRICE, ServicePrices, HAND_MASSAGE_PRICE, GEL_REMOVAL_PRICE } from "@/constants/pricing-constants";



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

    if (!chatChoice) continue;

    switch (chat.id) {
      case "whatService": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        
        svc.type = option?.entityId; 

        if (option?.entityId === 'g_manicure') {
          svc.desiredBase = 'base_gel';
        } else if (option?.entityId === 'enhan_ext') {
          svc.desiredBase = 'poly_gel';
          svc.additional.push('manicure'); 
        } 
        break;
      }
      case "wantManiService": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        if (option?.id !== 1) {
          svc.additional.push(option?.entityId!);
        }
        break;
      }
      case "desiredBase": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredBase = option?.entityId; 
        break;
      }
      case "whatCurrentMaintainLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.currentLength = option?.entityId;
        break;
      }
      case "whatCurrentMaintainShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.currentShape = option?.entityId;
        break;
      }
      case "desiredEnhanceLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredLength = option?.entityId;
        break;
      }
      case "whatManiLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredLength = option?.entityId;
        break;
      }
      case "whatGelManiLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredLength = option?.entityId;
        break;
      }
      case "desiredEnhanceShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredShape = option?.entityId;
        break;
      }
      case "whatManiShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredShape = option?.entityId;
        break;
      }
      case "whatGelManiShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);
        svc.desiredShape = option?.entityId;
        break;
      }
      case "needPreManiRemoval": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);

        if (option?.id === 1) {
          break;
        } else if (option?.id === 2) {
          svc.gelPolishRemoval = true;
        } else if (option?.id === 3) {
          svc.extensionRemoval = true;
        }
        break;
      }
      case "needPreGelManiRemoval": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);

        if (option?.id === 1) {
          break;
        } else if (option?.id === 2) {
          svc.gelPolishRemoval = true;
        } else if (option?.id === 3) {
          svc.extensionRemoval = true;
        }
        break;
      }
      case "needPreEnhanceRemoval": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);

        if (option?.id === 1) {
          svc.gelPolishRemoval = true;
        } else if (option?.id === 2) {
          svc.extensionRemoval = true;
        } else if (option?.id === 3) {
          svc.gelPolishRemoval = false;
          svc.extensionRemoval = false;
        }
        break;
      }
      case "wantChangeLength": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);

        if (option?.id === 1) {
          svc.desiredLength = svc.currentLength;
        } else {
          svc.desiredLength = option?.entityId;
        }
        break;
      }
      case "wantChangeShape": {
        const option = chat.options.find(o => o.label === chatChoice?.option.label
          && o.nextId === chatChoice?.option.nextId);

        if (option?.id === 1) {
          svc.desiredShape = svc.currentShape;
        } else {
          svc.desiredShape = option?.entityId;
        }
        break;
      }
      case "upgradeGelManiBase": {
        const option = chat.options.find(o => o.id === chatChoice?.option.id);
        svc.desiredBase = option?.entityId;
        break;
      }

    }
  }

  return svc;
}

export type OptionsVisibility<T extends {id: string}> = T & { disabled: boolean };
export function applyOptionVisibility<T extends {id: string}>(options: ReadonlyArray<T>, chat: ChatState): Array<OptionsVisibility<T>> {
  const chatQuestions = chat.messages;
  const allowedSet = new Set<string>();
  for (let question of chatQuestions) {
    filterOutOptions(question, chat)
      .forEach(o => o.entityId && o.visible === true && allowedSet.add(o.entityId));
  }

  return options.map(op => ({...op, disabled: !allowedSet.has(op.id) }));
}

export type ChatOptionVisibilty = ChatOption & { visible: boolean };
export function filterOutOptions(curQuestion: ChatItem, chat: ChatState): ChatOptionVisibilty[] {
  
  if(curQuestion.id === 'wantChangeLength') {
    const prevAnswer = chat.selectedList.find(choice => choice.qId === 'whatCurrentMaintainLength');
    if (prevAnswer) { // Filter out already selected length
      return curQuestion.options.map(o => 
         ({...o, visible: !o.entityId || o.entityId !== prevAnswer.option?.entityId })
      );
    }
  }

  if(curQuestion.id === 'wantChangeShape') {
    const curShapeAnswer = chat.selectedList.find(choice => choice.qId === 'whatCurrentMaintainShape');
    const curLengthAnswer = chat.selectedList.find(choice => choice.qId === 'whatCurrentMaintainLength');
    const desiredLengthAnswer = chat.selectedList.find(choice => choice.qId === 'wantChangeLength');

    let filteredOptions = curQuestion.options.map(o => ({ ...o, visible: true }));
    if (curShapeAnswer) { // Filter out already selected shape
      filteredOptions = filteredOptions.map(o => ({...o, visible: !o.entityId || o.entityId !== curShapeAnswer.option.entityId}));
    }
    if (desiredLengthAnswer?.option?.entityId) { // Filter out shapes that dont meet min length requirement
      const nailLength = getNailLengthById(desiredLengthAnswer.option.entityId as NailLengthId)?.size ?? Number.MAX_SAFE_INTEGER;
      filteredOptions = filteredOptions.map(o => {
        if (!o.entityId) return { ...o, visible: true };
        const shapeEntity = getNailShapeById(o.entityId);
        const minLen = shapeEntity?.minLength ?? 0;
        const maxLen = shapeEntity?.maxLength ?? 100;
        return {...o, visible: nailLength >= minLen && nailLength <= maxLen};
      });
    } else if (curLengthAnswer) { // Filter out shapes that dont meet min length requirement from cur length if user clicks same length
      const nailLength = getNailLengthById(curLengthAnswer.option.entityId as NailLengthId)?.size ?? Number.MAX_SAFE_INTEGER;
      filteredOptions = filteredOptions.map(o => {
        if (!o.entityId) return { ...o, visible: true };
        const shapeEntity = getNailShapeById(o.entityId);
        const minLen = shapeEntity?.minLength ?? 0;
        const maxLen = shapeEntity?.maxLength ?? 100;
        return {...o, visible: nailLength >= minLen && nailLength <= maxLen};
      });
    }
    return filteredOptions;
  }
 
  if(curQuestion.id === 'desiredEnhanceShape') {
    const prevAnswer = chat.selectedList.find(choice => choice.qId === 'desiredEnhanceLength')
    if (prevAnswer) {
      const nailLength = getNailLengthById(prevAnswer.option.entityId as NailLengthId)?.size ?? Number.MAX_SAFE_INTEGER;
      return curQuestion.options.map(o => ({...o, visible: nailLength >= (getNailShapeById(o.entityId)?.minLength || 0)}));
    }
  } 

  if (curQuestion.id === 'desiredBase') {
    const extSubAnswer = chat.selectedList.find(choice => choice.qId === 'needPreEnhanceRemoval');
    let filteredOptions = curQuestion.options.map(o => ({ ...o, visible: true }));
    if (extSubAnswer?.option.id === 1) {
      filteredOptions = filteredOptions.map(o => ({ ...o, visible: ![1, 6].includes(o.id) }));
    } else if (extSubAnswer?.option.id === 2 || extSubAnswer?.option.id === 3) {
      filteredOptions = filteredOptions.map(o => ({ ...o, visible: [2,4,6].includes(o.id) }));
    }

    return filteredOptions;
  }

  return curQuestion.options.map(o => ({...o, visible: true }));
}



export interface Detail { 
  section: string, 
  items: Array<{title: string, price: number, sub?: Detail['items']}> 
}

function addToSummarySection(summary: Array<Detail>, section: string, item: Detail['items'][number]) {
  const idx = summary.findIndex(detail => detail.section === section);
  if (idx !== -1) {
    summary[idx].items.push(item);
  } else {
    summary.push({ section, items: [item]});
  }
}

export function getSummaryDetails(nailSvc: NailSvc) {
  const summaryDetails: Array<Detail> = [];

  if (nailSvc.gelPolishRemoval) {
    const entry = {title: "Gel Polish Removal", price: GEL_REMOVAL_PRICE};
    addToSummarySection(summaryDetails, 'Pre-Service', entry);
  }

  if (nailSvc.extensionRemoval) {
    const entry = {title: "Extension Removal", price: EXT_NAIL_REMOVAL_PRICE};
    addToSummarySection(summaryDetails, 'Pre-Service', entry);
  }

  if (nailSvc.type) {
    const title = getNailServiceById(nailSvc.type)?.label!;
    const price = ServicePrices[nailSvc.type];
    addToSummarySection(summaryDetails, 'Service', {title, price});
  }

  if (nailSvc.additional) {
    const nailServices = nailSvc.additional.map(getNailServiceById).filter(s => !!s) as NailService[];
    nailServices.forEach(svc => {
      const title = svc.label!;
      const price = ServicePrices[svc.id];
      const entry = {title, price};
     
      addToSummarySection(summaryDetails, 'After-Service', entry);
    });
  }

  if (nailSvc.massage) {
    const entry = {title: "Hand Massage", price: HAND_MASSAGE_PRICE};
    addToSummarySection(summaryDetails, 'After-Service', entry);
  }


  summaryDetails.forEach(detail => {
    detail.items.forEach(item => {
      if (item.title.match(/Gel Manicure/gi)){
        item.title = getNailServiceById('manicure')?.label!;
        item.price = ServicePrices['manicure'];
        item.sub = [{ title: 'Gel', price: 5 }];
      }
    })
  })

  return summaryDetails;
}

