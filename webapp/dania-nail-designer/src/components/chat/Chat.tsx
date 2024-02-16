import { useRef, useLayoutEffect, useReducer } from "react";
import { ChatOptions } from "./ChatOptions";
import { CONVERSATION, ChatItem, ChatOption, QuestionId, chatReducer } from "./chat-reducer";



const START: QuestionId = 'removal';
const DefaultConvo: ChatItem[] = [CONVERSATION[START]];
export function Chat() {
  const [chatConvo, dispatch] = useReducer(chatReducer, DefaultConvo);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const onOptionClick = (qIndex: number, selectedOption: ChatOption) => {
    dispatch({questionIndex: qIndex, selected: selectedOption.label});
  }

  useLayoutEffect(() => {
    setTimeout(() =>{
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 250);

    setTimeout(() =>{
      document.getElementById('root')?.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    }, 0);
  }, [chatConvo]);

  return <div className="chat pe-2" ref={chatContainerRef}>
    {chatConvo.map((chatItem, qIndex) => 
      <div key={chatItem.question + qIndex}>
        <p className="bubble">{chatItem.question}</p>

        {chatItem.options && <ChatOptions 
          options={chatItem.options} 
          selected={chatItem.selected} 
          onOptionClick={(opt) => onOptionClick(qIndex, opt)} />}
      </div>
    )}
  </div>
}

