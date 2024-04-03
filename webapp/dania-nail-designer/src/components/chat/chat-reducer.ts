

export const CONVERSATION = [
  {
    id: 'whatService',
    question: 'What service do you want?', 
    options: [
      { label: 'Basic Manicure',         nextId: 'needPreManiRemoval',      entityId: 'manicure',   }, 
      { label: 'Gel Manicure',           nextId: 'needPreManiRemoval',      entityId: 'g_manicure', },
      { label: 'Takedown',               nextId: 'wantManiService',         entityId: 'take_down',  },
      { label: 'Enhancement/Extension',  nextId: 'needPreEnhanceRemoval',   entityId: 'enhan_ext',  },
    ]
  },
  {
    id: 'wantManiService',
    question: 'Would you like a manicure service afterwards?',
    options: [
      { label: 'No',                    nextId: 'done',                 entityId: undefined }, 
      { label: 'Gel Manicure',          nextId: 'whatManiLength',       entityId: 'g_manicure' },
      { label: 'Basic Manicure',        nextId: 'done',                 entityId: 'manicure' },
    ] 
  },
  {
    id: 'whatManiLength',
    question: 'How long do you want?', 
    options: [
      { label: 'Natural', nextId: 'whatManiShape', entityId: 'natural' }, 
      { label: 'X-Short', nextId: 'whatManiShape', entityId: 'x_short' },
      { label: 'Short', nextId: 'whatManiShape', entityId: 'short' },
      { label: 'Medium', nextId: 'whatManiShape', entityId: 'medium' },
    ]
  },
  {
    id: 'whatManiShape',
    question: 'What shape are you interested in?', 
    options: [
      { label: 'Oval', nextId: 'done', entityId: 'oval' }, 
      { label: 'Round', nextId: 'done', entityId: 'round' }, 
      { label: 'Square', nextId: 'done', entityId: 'square' }, 
    ]
  },
  {
    id: 'needPreManiRemoval',
    question: 'Want to remove anything?', 
    options: [
      { label: 'No', nextId: 'whatManiLength' }, 
      { label: 'Current design', nextId: 'whatManiLength' }, 
      { label: 'Old gel/polish', nextId: 'whatManiLength' }, 
    ]
  },
  {
    id: 'needPreEnhanceRemoval',
    question: 'Want to remove anything?', 
    options: [
      { label: 'No, new set', nextId: 'desiredEnhanceLength' }, 
      { label: 'Current design', nextId: 'whatCurrentMaintainLength' }, 
      { label: 'Old extension product', nextId: 'desiredEnhanceLength' }, 
    ]
  },
  {
    id: 'desiredEnhanceLength',
    question: 'What\'s your desired length?', 
    options: [
      { label: 'Natural', nextId: 'desiredEnhanceShape', entityId: 'natural' }, 
      { label: 'X-Short', nextId: 'desiredEnhanceShape', entityId: 'x_short' },
      { label: 'Short', nextId: 'desiredEnhanceShape', entityId: 'short' },
      { label: 'Medium', nextId: 'desiredEnhanceShape', entityId: 'medium' },
      { label: 'Long', nextId: 'desiredEnhanceShape', entityId: 'long' },
      { label: 'X Long', nextId: 'desiredEnhanceShape', entityId: 'x_long' },
      { label: '2xl Long', nextId: 'desiredEnhanceShape', entityId: 'xx_long' },
    ],
  },
  {
    id: 'desiredEnhanceShape',
    question: 'What\'s your desired shape?', 
    options: [
      { label: 'Oval', nextId: 'desiredBase', entityId: 'oval' },
      { label: 'Round', nextId: 'desiredBase', entityId: 'round' },
      { label: 'Square', nextId: 'desiredBase', entityId: 'square' },
      { label: 'Stiletto', nextId: 'desiredBase', entityId: 'stiletto' },
      { label: 'Ballerina', nextId: 'desiredBase', entityId: 'ballerina' },
      { label: 'Almond', nextId: 'desiredBase', entityId: 'almond' },
      { label: 'Coffin', nextId: 'desiredBase', entityId: 'coffin' },
    ],
  },
  {
    id: 'desiredBase',
    question: 'Choose a base.', 
    options: [
      { label: 'Base Gel', nextId: 'done', entityId: 'base_gel' },
      { label: 'Poly Gel', nextId: 'done', entityId: 'poly_gel' },
      { label: 'Hard Gel', nextId: 'done', entityId: 'hard_gel' },
      { label: 'Acry Gel', nextId: 'done', entityId: 'acry_gel' },
    ],
  },
  {
    id: 'wantChangeLength',
    question: 'Want to change your current length?', 
    options: [
      { label: 'No, Same length', nextId: 'whatCurrentMaintainShape' },
      { label: 'X-Short', nextId: 'whatCurrentMaintainShape' },
      { label: 'Short', nextId: 'whatCurrentMaintainShape' },
      { label: 'Medium', nextId: 'whatCurrentMaintainShape' },
      { label: 'Long', nextId: 'whatCurrentMaintainShape' },
      { label: 'X Long', nextId: 'whatCurrentMaintainShape' },
      { label: '2xl Long', nextId: 'whatCurrentMaintainShape' },
    ],
  },
  {
    id: 'whatCurrentMaintainLength',
    question: 'Want to change your current length?', 
    options: [
      { label: 'Natural', nextId: 'wantChangeLength',     entityId: 'natural' },
      { label: 'X-Short', nextId: 'wantChangeLength',     entityId: 'x_short' },
      { label: 'Short', nextId: 'wantChangeLength',       entityId: 'short' },
      { label: 'Medium', nextId: 'wantChangeLength',      entityId: 'medium' },
      { label: 'Long', nextId: 'wantChangeLength',        entityId: 'long' },
      { label: 'X Long', nextId: 'wantChangeLength',      entityId: 'x_long' },
      { label: '2xl Long', nextId: 'wantChangeLength',    entityId: 'xx_long' },
    ],
  },
  {
    id: 'wantChangeShape',
    question: 'Want to change your current shape?', 
    options: [
      { label: 'No, Same shape', nextId: 'desiredBase', entityId: undefined },
      { label: 'Oval', nextId: 'desiredBase',           entityId: 'oval' },
      { label: 'Round', nextId: 'desiredBase',          entityId: 'round' },
      { label: 'Square', nextId: 'desiredBase',         entityId: 'square' },
      { label: 'Stiletto', nextId: 'desiredBase',       entityId: 'stiletto' },
      { label: 'Ballerina', nextId: 'desiredBase',      entityId: 'ballerina' },
      { label: 'Almond', nextId: 'desiredBase',         entityId: 'almond' },
      { label: 'Coffin', nextId: 'desiredBase',         entityId: 'coffin' },
    ],
  },
  {
    id: 'whatCurrentMaintainShape',
    question: 'Want to change your current shape?', 
    options: [
      { label: 'Oval', nextId: 'wantChangeShape', entityId: 'oval' },
      { label: 'Round', nextId: 'wantChangeShape', entityId: 'round' },
      { label: 'Square', nextId: 'wantChangeShape', entityId: 'square' },
      { label: 'Stiletto', nextId: 'wantChangeShape', entityId: 'stiletto' },
      { label: 'Ballerina', nextId: 'wantChangeShape', entityId: 'ballerina' },
      { label: 'Almond', nextId: 'wantChangeShape', entityId: 'almond' },
      { label: 'Coffin', nextId: 'wantChangeShape', entityId: 'coffin' },
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
