import { useRef, useContext } from "react";
import { ChatOptions } from "./ChatOptions";
import { ChatOption } from "./chat-reducer";
import { useScrollIntoView } from "@/hooks/useScrollIntoView";
import { NailServiceContext } from "@/contexts/NailServiceContext";
import { filterOutOptions } from "@/service/helpers";


export function Chat() {
  const { chat, chatDispatch: dispatch } = useContext(NailServiceContext);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const onOptionClick = (qIndex: number, selectedOption: ChatOption) => {
    dispatch({questionIndex: qIndex, selected: selectedOption});
  }

  console.log(chat);

  useScrollIntoView(chatContainerRef, [chat]);
  
  return <div className="chat pe-2" ref={chatContainerRef}>
    {chat.messages.map((chatItem, qIndex) => 
      <div key={chatItem.question + qIndex}>
        <p className="bubble">{chatItem.question}</p>

        {chatItem.options && <ChatOptions 
          options={filterOutOptions(chatItem, chat).filter(item => item.visible)} 
          selected={chat.selectedList.find(s => s.qId === chatItem.id)} 
          onOptionClick={(opt) => onOptionClick(qIndex, opt)} />}
      </div>
    )}
  </div>
}