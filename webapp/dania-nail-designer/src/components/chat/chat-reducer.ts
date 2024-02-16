
export type QuestionId = 
| 'removal' 
| 'service' 
| 'maniGelOrBasic'
| 'maniLength'
| 'maniShape'
| 'lastService'
| 'reduceLength'
| 'inputLength'
| 'changeShape'
| 'inputShape'
// | 'enhanceMaintain'
| 'enhanceMaintain2'
| 'enhanceLength'
| 'enhanceBase'
| 'enhanceShape'
| 'end';

export interface ChatOption {
  label: string, 
  nextId: QuestionId
}
export type ChatItem = | { 
  id: QuestionId;
  question: string;
  options: Array<ChatOption>;
  selected: string | undefined;
} | {
  id: QuestionId;
  question: string;
  options: null;
  selected?: never;
}

export type Conversation = {
  [id in QuestionId]: ChatItem
}

export const CONVERSATION: Conversation = {
  removal: {
    id: 'removal',
    question: 'Hi! Do you need to remove any old product?', 
    options: [
      { label: 'No, just manicure', nextId: 'maniGelOrBasic' },
      { label: 'Yes, remove previous gel polish/design', nextId: 'service' },
      { label: 'Yep, reset my extensions', nextId: 'enhanceMaintain2' }, 
    ],
    selected: undefined,
  },
  service: {
    id: 'service',
    question: 'What kind of service are you looking for?', 
    options: [
       { label: 'Basic Manicure', nextId: 'maniLength' }, 
       { label: 'Gel Manicure', nextId: 'maniLength' },
       { label: 'Enhancement/Extension', nextId: 'enhanceBase' },
    ],
    selected: undefined,
  },
  maniGelOrBasic: {
    id: 'maniGelOrBasic',
    question: 'Would that be a basic or gel manicure?', 
    options: [
      { label: 'Basic manicure', nextId: 'maniLength' },
      { label: 'Gel manicure', nextId: 'maniLength' },
    ],
    selected: undefined,
  },
  maniLength: {
    id: 'maniLength',
    question: 'What length you\'re thinking of?', 
    options: [
      { label: 'X-Short', nextId: 'maniShape' },
      { label: 'Short', nextId: 'maniShape' },
      // { label: 'No Length', nextId: 'maniShape' },
      { label: 'Long', nextId: 'maniShape' },
      { label: 'Medium', nextId: 'maniShape' },
    ],
    selected: undefined,
  },
  maniShape: {
    id: 'maniShape',
    question: 'How about shape?', 
    options: [
      { label: 'Oval', nextId: 'end' }, 
      { label: 'Round', nextId: 'end' }, 
      { label: 'Square', nextId: 'end' }, 
    ],
    selected: undefined,
  },
  enhanceMaintain2: {
    id: 'enhanceMaintain2',
    question: 'Would that be maintenance or new set?', 
    options: [
      { label: 'Maintenance', nextId: 'lastService' }, 
      { label: 'New Set', nextId: 'inputLength' },
    ],
    selected: undefined,
  },
  inputLength: {
    id: 'inputLength',
    question: 'How long are your nails now?', 
    options: [
      { label: 'Natural', nextId: 'reduceLength' }, 
      { label: 'X-Short', nextId: 'reduceLength' },
      { label: 'Short', nextId: 'reduceLength' },
      { label: 'Medium', nextId: 'reduceLength' },
      { label: 'Long', nextId: 'reduceLength' },
      { label: 'X Long', nextId: 'reduceLength' },
      { label: '2xl Long', nextId: 'reduceLength' },
    ],
    selected: undefined,
  },
  reduceLength: {
    id: 'reduceLength',
    question: 'Do you want change length?',  
    options: [ // Filter out lengths >= current length 
      { label: 'No, same length', nextId: 'inputShape' }, 
      // { label: 'Yes, Natural', nextId: 'inputShape' }, 
      { label: 'Yes, X-Short', nextId: 'inputShape' },
      { label: 'Yes, Short', nextId: 'inputShape' },
      { label: 'Yes, Medium', nextId: 'inputShape' }, 
      { label: 'Yes, Long', nextId: 'inputShape' },
      { label: 'Yes, X-Long', nextId: 'inputShape' },
      { label: 'Yes, 2xl Long', nextId: 'inputShape' },
    ],
    selected: undefined,
  },
  inputShape: {
    id: 'inputShape',
    question: 'What\'s your current shape?', 
    options: [
      { label: 'Oval', nextId: 'changeShape' },
      { label: 'Round', nextId: 'changeShape' },
      { label: 'Square', nextId: 'changeShape' },
      { label: 'Stiletto', nextId: 'changeShape' },
      { label: 'Ballerina', nextId: 'changeShape' },
      { label: 'Almond', nextId: 'changeShape' },
      { label: 'Coffin', nextId: 'changeShape' },
    ],
    selected: undefined,
  },
  changeShape: {
    id: 'changeShape',
    question: 'Want to change your shape?', 
    options: [ // Filter out current shape
      { label: 'No, same shape', nextId: 'end' }, 
      { label: 'Yes, Oval', nextId: 'end' }, 
      { label: 'Yes, Round', nextId: 'end' }, 
      { label: 'Yes, Square', nextId: 'end' }, 
      { label: 'Yes, Stiletto', nextId: 'end' }, 
      { label: 'Yes, Ballerina', nextId: 'end' }, 
      { label: 'Yes, Almond', nextId: 'end' }, 
      { label: 'Yes, Coffin', nextId: 'end' }, 
    ],
    selected: undefined,
  },
  lastService: {
    id: 'lastService',
    question: 'How long ago was your previous service?', 
    options: [
      { label: '2 or less weeks ago', nextId: 'enhanceLength' }, 
      { label: '3 weeks ago', nextId: 'enhanceLength' }, 
      { label: 'more than 3 weeks ago', nextId: 'enhanceLength' }, 
    ],
    selected: undefined,
  },
  enhanceLength: {
    id: 'enhanceLength',
    question: 'What length do you want?',  
    options: [
      { label: 'Natural', nextId: 'enhanceBase' }, 
      { label: 'X-Short', nextId: 'enhanceBase' },
      { label: 'Short', nextId: 'enhanceBase' },
      { label: 'Medium', nextId: 'enhanceBase' }, 
      { label: 'Long', nextId: 'enhanceBase' },
      { label: 'X Long', nextId: 'enhanceBase' },
      { label: '2xl Long', nextId: 'enhanceBase' },
    ],
    selected: undefined,
  },
  enhanceBase: {
    id: 'enhanceBase',
    question: 'Choose a base', 
    options: [ // Filter based on length option selected
      { label: 'Base Gel', nextId: 'enhanceShape' },
      { label: 'Poly Gel', nextId: 'enhanceShape' },
      { label: 'Hard Gel', nextId: 'enhanceShape' },
      { label: 'Acry Gel', nextId: 'enhanceShape' },
    ],
    selected: undefined,
  },
  enhanceShape: {
    id: 'enhanceShape',
    question: 'What shape?', 
    options: [
      { label: 'Oval', nextId: 'end' },
      { label: 'Round', nextId: 'end' },
      { label: 'Square', nextId: 'end' },
      { label: 'Stiletto', nextId: 'end' },
      { label: 'Ballerina', nextId: 'end' },
      { label: 'Almond', nextId: 'end' },
      { label: 'Coffin', nextId: 'end' },
    ],
    selected: undefined,
  },
  end: {
    id: 'end',
    question: 'Thanks for chatting with me, double check the details in the next tab above',
    options: null,
  }
}

export type ChatArg = {
  selected: string;
  questionIndex: number;
};
export function chatReducer(chatHistory: ChatItem[], args: ChatArg): ChatItem[] {
  const updatedChat = structuredClone(chatHistory);
  const curQuestion: ChatItem = updatedChat[args.questionIndex];
  let nextQuestion: ChatItem;

  // Set the selected option in chat
  curQuestion.selected = args.selected;
  const selectedOption = curQuestion.options?.find(op => op.label === args.selected)!;
  nextQuestion = CONVERSATION[selectedOption.nextId];

  // Insert next question and delete everything after inserted index
  updatedChat.splice(args.questionIndex + 1, updatedChat.length, nextQuestion);
    
  return updatedChat;
}