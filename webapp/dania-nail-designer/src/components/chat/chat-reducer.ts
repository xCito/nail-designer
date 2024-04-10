import { getNailBaseById, getNailLengthById, getNailServiceById, getNailShapeById } from "@/constants/design-constants";


export const CONVERSATION = [
  {
    id: 'whatService',
    question: 'What service do you want?', 
    options: [
      { id: 1, label: getNailServiceById('manicure')?.label,      nextId: 'needPreManiRemoval',      entityId: 'manicure',   info: undefined }, 
      { id: 2, label: getNailServiceById('g_manicure')?.label,    nextId: 'needPreGelManiRemoval',   entityId: 'g_manicure', info: undefined },
      { id: 3, label: getNailServiceById('enhan_ext')?.label,     nextId: 'needPreEnhanceRemoval',   entityId: 'enhan_ext',  info: undefined },
      { id: 4, label: getNailServiceById('take_down')?.label,     nextId: 'wantManiService',         entityId: 'take_down',  info: undefined }, // by dania
    ]
  },
  {
    id: 'wantManiService',
    question: 'Would you like a manicure service afterwards?',
    options: [
      { id: 1, label: 'No',                                         nextId: 'done',                 entityId: undefined,      info: undefined }, 
      { id: 2, label: getNailServiceById('g_manicure')?.label,      nextId: 'upgradeGelManiBase',   entityId: 'g_manicure',   info: undefined },
      { id: 3, label: getNailServiceById('manicure')?.label,        nextId: 'upgradeManiBase',      entityId: 'manicure',     info: undefined },
    ] 
  },
  {
    id: 'whatManiLength',
    question: 'How long do you want?', 
    options: [
      { id: 1, label: getNailLengthById('short')?.label,  nextId: 'whatManiShape',    entityId: 'short',  info: undefined }, 
      { id: 2, label: getNailLengthById('med')?.label,    nextId: 'whatManiShape',    entityId: 'med',    info: undefined },
      // { label: 'Natural', nextId: 'whatManiShape', entityId: 'natural' }, 
      // { label: 'X-Short', nextId: 'whatManiShape', entityId: 'x_short' },
      // { label: 'Short', nextId: 'whatManiShape', entityId: 'short' },
      // { label: 'Medium', nextId: 'whatManiShape', entityId: 'medium' },
    ]
  },
  {
    id: 'whatGelManiLength',
    question: 'How long do you want?', 
    options: [
      { id: 1, label: getNailLengthById('short')?.label,  nextId: 'whatGelManiShape', entityId: 'short',  info: undefined }, 
      { id: 2, label: getNailLengthById('med')?.label,    nextId: 'whatGelManiShape', entityId: 'med',    info: undefined },
    ]
  },
  {
    id: 'whatManiShape',
    question: 'What shape are you interested in?', 
    options: [
      { id: 1, label: getNailShapeById('oval')?.label,      nextId: 'upgradeManiBase',   entityId: 'oval',     info: undefined }, 
      { id: 2, label: getNailShapeById('round')?.label,     nextId: 'upgradeManiBase',   entityId: 'round',    info: undefined }, 
      { id: 3, label: getNailShapeById('square')?.label,    nextId: 'upgradeManiBase',   entityId: 'square',   info: undefined }, 
    ]
  },
  {
    id: 'whatGelManiShape',
    question: 'What shape are you interested in?', 
    options: [
      { id: 1, label: getNailShapeById('oval')?.label,       nextId: 'upgradeGelManiBase',    entityId: 'oval',        info: undefined }, 
      { id: 2, label: getNailShapeById('round')?.label,      nextId: 'upgradeGelManiBase',    entityId: 'round',       info: undefined }, 
      { id: 3, label: getNailShapeById('square')?.label,     nextId: 'upgradeGelManiBase',    entityId: 'square',      info: undefined }, 
    ]
  },
  {
    id: 'needPreManiRemoval',
    question: 'Want to remove anything?', 
    options: [
      { id: 1, label: 'No',                     nextId: 'whatManiLength',     entityId: undefined,  info: undefined }, 
      { id: 2, label: 'Old Gel/Polish',         nextId: 'whatManiLength',     entityId: undefined,  info: undefined }, 
      { id: 3, label: 'Old Enhancement/Ext',    nextId: 'whatManiLength',     entityId: undefined,  info: undefined }, 
    ]
  },
  {
    id: 'needPreGelManiRemoval',
    question: 'Want to remove anything?', 
    options: [
      { id: 1, label: 'No',                     nextId: 'whatGelManiLength',      entityId: undefined ,       info: undefined }, 
      { id: 2, label: 'Old Gel/Polish',         nextId: 'whatGelManiLength',      entityId: undefined ,       info: undefined }, 
      { id: 3, label: 'Old Enhancement/Ext',    nextId: 'whatGelManiLength',      entityId: undefined ,       info: undefined }, 
    ]
  },
  {
    id: 'needPreEnhanceRemoval',
    question: 'How are your nails looking?', 
    options: [
      { id: 1, label: 'Need new design and/or maintainance',  nextId: 'whatCurrentMaintainLength',    entityId: undefined,    info: undefined }, 
      { id: 2, label: 'Been a while, new set',                nextId: 'desiredEnhanceLength',         entityId: undefined,    info: undefined }, 
      { id: 3, label: 'Bare nails, full set',                 nextId: 'desiredEnhanceLength',         entityId: undefined,    info: undefined }, 
    ]
  },
  {
    id: 'desiredEnhanceLength',
    question: 'What\'s your desired length?', 
    options: [
      { id: 1, label: getNailLengthById('short')?.label,        nextId: 'desiredEnhanceShape',        entityId: 'short',        info: undefined }, 
      { id: 2, label: getNailLengthById('med')?.label,          nextId: 'desiredEnhanceShape',        entityId: 'med',          info: undefined },
      { id: 3, label: getNailLengthById('long')?.label,         nextId: 'desiredEnhanceShape',        entityId: 'long',         info: undefined },
      { id: 4, label: getNailLengthById('x_long')?.label,       nextId: 'desiredEnhanceShape',        entityId: 'x_long',       info: undefined },
      { id: 5, label: getNailLengthById('xx_long')?.label,      nextId: 'desiredEnhanceShape',        entityId: 'xx_long',      info: undefined },
      
      // { label: 'Natural', nextId: 'desiredEnhanceShape', entityId: 'natural' }, 
      // { label: 'X-Short', nextId: 'desiredEnhanceShape', entityId: 'x_short' },
      // { label: 'Short', nextId: 'desiredEnhanceShape', entityId: 'short' },
      // { label: 'Medium', nextId: 'desiredEnhanceShape', entityId: 'medium' },
      // { label: 'Long', nextId: 'desiredEnhanceShape', entityId: 'long' },
      // { label: 'X Long', nextId: 'desiredEnhanceShape', entityId: 'x_long' },
      // { label: '2xl Long', nextId: 'desiredEnhanceShape', entityId: 'xx_long' },
    ],
  },
  {
    id: 'desiredEnhanceShape',
    question: 'What\'s your desired shape?', 
    options: [
      { id: 1, label: getNailShapeById('oval')?.label,             nextId: 'desiredBase',      entityId: 'oval' ,            info: undefined},
      { id: 2, label: getNailShapeById('round')?.label,            nextId: 'desiredBase',      entityId: 'round' ,           info: undefined},
      { id: 3, label: getNailShapeById('square')?.label,           nextId: 'desiredBase',      entityId: 'square' ,          info: undefined},
      { id: 4, label: getNailShapeById('stiletto')?.label,         nextId: 'desiredBase',      entityId: 'stiletto' ,        info: undefined},
      { id: 5, label: getNailShapeById('ballerina')?.label,        nextId: 'desiredBase',      entityId: 'ballerina' ,       info: undefined},
      { id: 6, label: getNailShapeById('almond')?.label,           nextId: 'desiredBase',      entityId: 'almond' ,          info: undefined},
      { id: 7, label: getNailShapeById('coffin')?.label,           nextId: 'desiredBase',      entityId: 'coffin' ,          info: undefined},
      { id: 8, label: getNailShapeById('almondetto')?.label,       nextId: 'desiredBase',      entityId: 'almondetto' ,      info: undefined},
    ],
  },
  {
    id: 'desiredBase',
    question: 'Choose a base.', 
    options: [
      { id: 1, label: getNailBaseById('base_gel')?.label,         nextId: 'done', entityId: 'base_gel',        info: undefined },
      { id: 2, label: getNailBaseById('poly_gel')?.label,         nextId: 'done', entityId: 'poly_gel',        info: undefined },
      { id: 3, label: getNailBaseById('hard_gel')?.label,         nextId: 'done', entityId: 'hard_gel',        info: undefined },
      { id: 4, label: getNailBaseById('acrylic_base')?.label,     nextId: 'done', entityId: 'acrylic_base',    info: undefined },
      { id: 5, label: getNailBaseById('builder_base')?.label,     nextId: 'done', entityId: 'builder_base',    info: undefined },
      { id: 6, label: getNailBaseById('gel_x_base')?.label,       nextId: 'done', entityId: 'gel_x_base',      info: undefined },
    ],
  },
  {
    id: 'wantChangeLength',
    question: 'Want to change your current length?', 
    options: [
      { id: 1, label: "No, Same length",                    nextId: 'whatCurrentMaintainShape', entityId: undefined , info: undefined}, 
      { id: 2, label: getNailLengthById('short')?.label,    nextId: 'whatCurrentMaintainShape', entityId: 'short' , info: undefined}, 
      { id: 3, label: getNailLengthById('med')?.label,      nextId: 'whatCurrentMaintainShape', entityId: 'med', info: undefined },
      { id: 4, label: getNailLengthById('long')?.label,     nextId: 'whatCurrentMaintainShape', entityId: 'long', info: undefined },
      { id: 5, label: getNailLengthById('x_long')?.label,   nextId: 'whatCurrentMaintainShape', entityId: 'x_long', info: undefined },
      { id: 6, label: getNailLengthById('xx_long')?.label,  nextId: 'whatCurrentMaintainShape', entityId: 'xx_long', info: undefined },
     
      // { label: 'No, Same length', nextId: 'whatCurrentMaintainShape' },
      // { label: 'X-Short', nextId: 'whatCurrentMaintainShape' },
      // { label: 'Short', nextId: 'whatCurrentMaintainShape' },
      // { label: 'Medium', nextId: 'whatCurrentMaintainShape' },
      // { label: 'Long', nextId: 'whatCurrentMaintainShape' },
      // { label: 'X Long', nextId: 'whatCurrentMaintainShape' },
      // { label: '2xl Long', nextId: 'whatCurrentMaintainShape' },
    ],
  },
  {
    id: 'whatCurrentMaintainLength',
    question: 'What\'s your current length?', 
    options: [
      { id: 1, label: getNailLengthById('short')?.label,    nextId: 'wantChangeLength', entityId: 'short',        info: undefined }, 
      { id: 2, label: getNailLengthById('med')?.label,      nextId: 'wantChangeLength', entityId: 'med',          info: undefined },
      { id: 3, label: getNailLengthById('long')?.label,     nextId: 'wantChangeLength', entityId: 'long',         info: undefined },
      { id: 4, label: getNailLengthById('x_long')?.label,   nextId: 'wantChangeLength', entityId: 'x_long',       info: undefined },
      { id: 5, label: getNailLengthById('xx_long')?.label,  nextId: 'wantChangeLength', entityId: 'xx_long',      info: undefined },
     
      // { label: 'Natural', nextId: 'wantChangeLength',     entityId: 'natural' },
      // { label: 'X-Short', nextId: 'wantChangeLength',     entityId: 'x_short' },
      // { label: 'Short', nextId: 'wantChangeLength',       entityId: 'short' },
      // { label: 'Medium', nextId: 'wantChangeLength',      entityId: 'medium' },
      // { label: 'Long', nextId: 'wantChangeLength',        entityId: 'long' },
      // { label: 'X Long', nextId: 'wantChangeLength',      entityId: 'x_long' },
      // { label: '2xl Long', nextId: 'wantChangeLength',    entityId: 'xx_long' },
    ],
  },
  {
    id: 'wantChangeShape',
    question: 'Want to change your current shape?', 
    options: [
      { id: 1, label: 'No, Same shape',                   nextId: 'desiredBase',        entityId: undefined,        info: undefined },
      { id: 2, label: getNailShapeById('oval')?.label,           nextId: 'desiredBase',        entityId: 'oval',           info: undefined },
      { id: 3, label: getNailShapeById('round')?.label,          nextId: 'desiredBase',        entityId: 'round',          info: undefined },
      { id: 4, label: getNailShapeById('square')?.label,         nextId: 'desiredBase',        entityId: 'square',         info: undefined },
      { id: 5, label: getNailShapeById('stiletto')?.label,       nextId: 'desiredBase',        entityId: 'stiletto',       info: undefined },
      { id: 6, label: getNailShapeById('ballerina')?.label,      nextId: 'desiredBase',        entityId: 'ballerina',      info: undefined },
      { id: 7, label: getNailShapeById('almond')?.label,         nextId: 'desiredBase',        entityId: 'almond',         info: undefined },
      { id: 8, label: getNailShapeById('coffin')?.label,         nextId: 'desiredBase',        entityId: 'coffin',         info: undefined },
      { id: 9, label: getNailShapeById('almondetto')?.label,     nextId: 'desiredBase',        entityId: 'almondetto',     info: undefined },
    ],
  },
  {
    id: 'whatCurrentMaintainShape',
    question: 'What\'s your current shape?', 
    options: [
      { id: 1, label: getNailShapeById('oval')?.label,          nextId: 'wantChangeShape',        entityId: 'oval',          info: undefined },
      { id: 2, label: getNailShapeById('round')?.label,         nextId: 'wantChangeShape',        entityId: 'round',         info: undefined },
      { id: 3, label: getNailShapeById('square')?.label,        nextId: 'wantChangeShape',        entityId: 'square',        info: undefined },
      { id: 4, label: getNailShapeById('stiletto')?.label,      nextId: 'wantChangeShape',        entityId: 'stiletto',      info: undefined },
      { id: 5, label: getNailShapeById('ballerina')?.label,     nextId: 'wantChangeShape',        entityId: 'ballerina',     info: undefined },
      { id: 6, label: getNailShapeById('almond')?.label,        nextId: 'wantChangeShape',        entityId: 'almond',        info: undefined },
      { id: 7, label: getNailShapeById('coffin')?.label,        nextId: 'wantChangeShape',        entityId: 'coffin',        info: undefined },
      { id: 8, label: getNailShapeById('almondetto')?.label,    nextId: 'wantChangeShape',        entityId: 'almondetto',    info: undefined },
    ],
  },
  {
    id: 'upgradeManiBase',
    question: 'Would you like to upgrade your manicure with a gel base?', 
    options: [
      { id: 1, label: "No, thanks", nextId: 'done',               entityId: undefined,      info: undefined },
      { id: 2, label: "Sure",       nextId: 'upgradeGelManiBase', entityId: undefined,      info: undefined },
    ],
  },
  {
    id: 'upgradeGelManiBase',
    question: 'Would you like to upgrade your manicure to include a strengthening gel base?', 
    options: [
      { id: 1, label: `No, just ${getNailBaseById('base_gel')?.label}`, nextId: 'done', entityId: 'base_gel',            info: 'Standard\nrubber base' },
      { id: 2, label: `Upgrade to ${getNailBaseById('hard_gel')?.label}`, nextId: 'done', entityId: 'hard_gel',          info: 'Strengthening\nadds 30 minutes to the service' },
      { id: 3, label: `Upgrade to ${getNailBaseById('builder_base')?.label}`, nextId: 'done', entityId: 'builder_base',  info: 'Flexible & Strengthening base\nadds 30 minutes to the service' },
    ],
  },
  {
    id: 'done',
    question: 'Thanks for chatting with me, double check the details in the next tab above', 
    options: []
  },
] as const;


export type QuestionId = typeof CONVERSATION[number]['id'];
export type ChatItem = typeof CONVERSATION[number];
export type ChatOption = typeof CONVERSATION[number]['options'][number];
export type ChatState = { messages: Array<ChatItem>, selectedList: Array<SelectedChatOption> };
export type SelectedChatOption = { qId: string, option: ChatOption };


export type ChatArg = {
  selected: ChatOption;
  questionIndex: number;
};
export function chatReducer(chat: ChatState, args: ChatArg): ChatState {
  const chatMessages = structuredClone(chat.messages);
  const selectedList = structuredClone(chat.selectedList);

  const curQuestion: ChatItem = chatMessages[args.questionIndex];


  // Set the selected option in chat
  const remainingSelected = selectedList
    .filter(o => chatMessages.some(m => m.id === o.qId) && o.qId !== curQuestion.id);
  remainingSelected.push({ qId: curQuestion.id, option: args.selected });

  // Insert next question and delete everything after inserted index
  let nextQuestionIndex = CONVERSATION.findIndex(chat => chat.id === args.selected.nextId);
  chatMessages.splice(args.questionIndex + 1, chatMessages.length, CONVERSATION[nextQuestionIndex]);
  
  return {
    messages: [...chatMessages],
    selectedList: remainingSelected
  };
}
