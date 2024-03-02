// export type ChatItem = typeof CONVERSATION[number];
export type QuestionId =
| 'whatService'
| 'needPreManiRemoval'
| 'needPreEnhanceRemoval'
| 'wantManiService'
| 'whatManiLength'
| 'whatManiShape'
| 'wantChangeShape'
| 'wantChangeLength'
| 'whatCurrentMaintainLength'
| 'whatCurrentMaintainShape'
| 'desiredEnhanceLength'
| 'desiredEnhanceShape'
| 'desiredBase'
| 'done';

export interface ChatItem {
  id: QuestionId;
  question: string;
  options: Array<ChatOption> | null;
  selected?: string;
}
export interface ChatOption {
  label: string;
  nextId: QuestionId;
}
export const CONVERSATION: ChatItem[] = [
  {
    id: 'whatService',
    question: 'What service do you want?', 
    options: [
       { label: 'Basic Manicure', nextId: 'needPreManiRemoval' }, 
       { label: 'Gel Manicure', nextId: 'needPreManiRemoval' },
       { label: 'Takedown', nextId: 'wantManiService' },
       { label: 'Enhancement/Extension', nextId: 'needPreEnhanceRemoval' },
    ]
  },
  {
    id: 'wantManiService',
    question: 'Would you like a manicure service afterwards?', 
    options: [
       { label: 'No', nextId: 'done' }, 
       { label: 'Gel Manicure', nextId: 'whatManiLength' },
       { label: 'Basic Manicure', nextId: 'done' },
    ]
  },
  {
    id: 'whatManiLength',
    question: 'How long do you want?', 
    options: [
       { label: 'Natural', nextId: 'whatManiShape' }, 
       { label: 'X-Short', nextId: 'whatManiShape' },
       { label: 'Short', nextId: 'whatManiShape' },
       { label: 'Medium', nextId: 'whatManiShape' },
    ]
  },
  {
    id: 'whatManiShape',
    question: 'What shape are you interested in?', 
    options: [
      { label: 'Oval', nextId: 'done' }, 
      { label: 'Round', nextId: 'done' }, 
      { label: 'Square', nextId: 'done' }, 
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
      { label: 'Natural', nextId: 'desiredEnhanceShape' }, 
      { label: 'X-Short', nextId: 'desiredEnhanceShape' },
      { label: 'Short', nextId: 'desiredEnhanceShape' },
      { label: 'Medium', nextId: 'desiredEnhanceShape' },
      { label: 'Long', nextId: 'desiredEnhanceShape' },
      { label: 'X Long', nextId: 'desiredEnhanceShape' },
      { label: '2xl Long', nextId: 'desiredEnhanceShape' },
    ],
  },
  {
    id: 'desiredEnhanceShape',
    question: 'What\'s your desired shape?', 
    options: [
      { label: 'Oval', nextId: 'desiredBase' },
      { label: 'Round', nextId: 'desiredBase' },
      { label: 'Square', nextId: 'desiredBase' },
      { label: 'Stiletto', nextId: 'desiredBase' },
      { label: 'Ballerina', nextId: 'desiredBase' },
      { label: 'Almond', nextId: 'desiredBase' },
      { label: 'Coffin', nextId: 'desiredBase' },
    ],
  },
  {
    id: 'desiredBase',
    question: 'Choose a base.', 
    options: [
      { label: 'Base Gel', nextId: 'done' },
      { label: 'Poly Gel', nextId: 'done' },
      { label: 'Hard Gel', nextId: 'done' },
      { label: 'Acry Gel', nextId: 'done' },
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
      { label: 'Natural', nextId: 'wantChangeLength' },
      { label: 'X-Short', nextId: 'wantChangeLength' },
      { label: 'Short', nextId: 'wantChangeLength' },
      { label: 'Medium', nextId: 'wantChangeLength' },
      { label: 'Long', nextId: 'wantChangeLength' },
      { label: 'X Long', nextId: 'wantChangeLength' },
      { label: '2xl Long', nextId: 'wantChangeLength' },
    ],
  },
  {
    id: 'wantChangeShape',
    question: 'Want to change your current shape?', 
    options: [
      { label: 'No, Same shape', nextId: 'desiredBase' },
      { label: 'Oval', nextId: 'desiredBase' },
      { label: 'Round', nextId: 'desiredBase' },
      { label: 'Square', nextId: 'desiredBase' },
      { label: 'Stiletto', nextId: 'desiredBase' },
      { label: 'Ballerina', nextId: 'desiredBase' },
      { label: 'Almond', nextId: 'desiredBase' },
      { label: 'Coffin', nextId: 'desiredBase' },
    ],
  },
  {
    id: 'whatCurrentMaintainShape',
    question: 'Want to change your current shape?', 
    options: [
      { label: 'Oval', nextId: 'wantChangeShape' },
      { label: 'Round', nextId: 'wantChangeShape' },
      { label: 'Square', nextId: 'wantChangeShape' },
      { label: 'Stiletto', nextId: 'wantChangeShape' },
      { label: 'Ballerina', nextId: 'wantChangeShape' },
      { label: 'Almond', nextId: 'wantChangeShape' },
      { label: 'Coffin', nextId: 'wantChangeShape' },
    ],
  },
  {
    id: 'done',
    question: 'Thanks for chatting with me, double check the details in the next tab above', 
    options: null
  },
];


export type ChatArg = {
  selected: string;
  questionIndex: number;
};
export function chatReducer(chatHistory: ChatItem[], args: ChatArg): ChatItem[] {
  const updatedChat = structuredClone(chatHistory);
  const curQuestion: ChatItem = updatedChat[args.questionIndex];

  // Set the selected option in chat
  curQuestion.selected = args.selected;
  const selectedOption = curQuestion.options?.find(op => op.label === args.selected)!;
  let nextQuestionIndex = CONVERSATION.findIndex(chat => chat.id === selectedOption.nextId);

  // Insert next question and delete everything after inserted index
  updatedChat.splice(args.questionIndex + 1, updatedChat.length, CONVERSATION[nextQuestionIndex]);
    
  // TODO: switch statement to update options for next question 

  return updatedChat;
}
