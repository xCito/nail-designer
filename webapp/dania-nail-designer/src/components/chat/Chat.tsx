import { useState } from "react";
import { ChatOptions } from "./ChatOptions";

type ChatItem = { 
  question: string;
  options: Array<string>;
  selected: string | undefined;
};

const CONVERSATION = [
  { 
    question: 'Hi, what service are you looking for?', 
    options: ['New Set', 'Rebalance', 'Refill', 'Takedown', 'Manicure'],
    selected: undefined,
  },
  {
    question: 'What length you\'re thinking of?', 
    options: ['Short', 'No Length','Long',  'Medium', '2X Long', 'X Long'],
    selected: undefined,
  },
  {
    question: 'How about shape?', 
    options: ['Oval', 'Round', 'Square', 'Stiletto', 'Ballerina', 'Almond', 'Coffin'],
    selected: undefined,
  },
]

export function Chat() {
  const [chatConvo, setChatConvo] = useState<ChatItem[]>(CONVERSATION);
  const [questionIndex, setQuestionIndex] = useState(0);
  const visibleConvo = chatConvo.filter((_, idx) => idx <= questionIndex);

  const onOptionClick = (qIndex: number, selectedOption: string) => {
    const updatedChat = structuredClone(chatConvo);
    updatedChat[qIndex].selected = selectedOption;
    
    setQuestionIndex(qIndex + 1);
    setChatConvo(updatedChat);
  }

  return <div className="chat pe-2">
    {visibleConvo.map((chatItem, qIndex) => 
      <div key={chatItem.question + qIndex}>
        <p className="bubble">{chatItem.question}</p>

        <ChatOptions 
          options={chatItem.options} 
          selected={chatItem.selected} 
          onOptionClick={(opt) => onOptionClick(qIndex, opt)} />
      </div>
    )}
  </div>
}

