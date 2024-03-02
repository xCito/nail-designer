import { useRef, useReducer, useContext, useEffect } from "react";
import { ChatOptions } from "./ChatOptions";
import { CONVERSATION, ChatItem, ChatOption, chatReducer } from "./chat-reducer";
import { useScrollIntoView } from "@/hooks/useScrollIntoView";
import { NailServiceContext, NailSvc, defaultNailService } from "@/contexts/NailServiceContext";

function chatHistoryToNailServiceUpdate(chatHistory: ChatItem[]): NailSvc {
  const svc: NailSvc = defaultNailService(); 

  for(let chat of chatHistory) {
    switch (chat.id) {
      case "whatService": {
        svc.type = chat.selected; 
        if (chat.selected === 'Basic Manicure') {
          svc.desiredBase = 'Base Gel'
        } else if (chat.selected === 'Basic Manicure') {
          svc.desiredBase = 'Base Gel'
        } else if (chat.selected === 'Enhancement/Extension') {
          svc.desiredBase = 'Poly Gel'
        } 
        break;
      }
      case "wantManiService": {
        svc.type = chat.selected === 'No'? undefined : chat.selected; 
        break;
      }
      case "desiredBase": {
        svc.desiredBase = chat.selected; 
        break;
      }
      case "whatCurrentMaintainLength": {
        svc.currentLength = chat.selected; 
        break;
      }
      case "whatCurrentMaintainShape": {
        svc.currentShape = chat.selected; 
        break;
      }
      case "desiredEnhanceLength": {
        svc.desiredLength = chat.selected; 
        break;
      }
      case "whatManiLength": {
        svc.desiredLength = chat.selected; 
        break;
      }
      case "desiredEnhanceShape": {
        svc.desiredShape = chat.selected; 
        break;
      }
      case "whatManiShape": {
        svc.desiredShape = chat.selected; 
        break;
      }
      case "needPreManiRemoval": {
        if (chat.selected === 'Current design') {
          svc.designRemoval = true;
        } else if (chat.selected === 'Old gel/polish') {
          svc.gelPolishRemoval = true;
        } else {
          svc.designRemoval = false;
          svc.gelPolishRemoval = false;
        }
        break;
      }
      case "needPreEnhanceRemoval": {
        if (chat.selected === 'Current design') {
          svc.designRemoval = true;
        } else if (chat.selected === 'Old extension product') {
          svc.extensionRemoval = true;
        } else {
          svc.designRemoval = false;
          svc.extensionRemoval = false;
        }
        break;
      }
    }
  }

  return svc;
}

const START_INDEX = 0;
const DefaultConvo: ChatItem[] = [CONVERSATION[START_INDEX]];

export function Chat() {
  const [chatConvo, dispatch] = useReducer(chatReducer, DefaultConvo);
  const { setNailService } = useContext(NailServiceContext);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const onOptionClick = (qIndex: number, selectedOption: ChatOption) => {
    dispatch({questionIndex: qIndex, selected: selectedOption.label});
  }

  useEffect(() => {
    const svcUpdates = chatHistoryToNailServiceUpdate(chatConvo);
    setNailService(svcUpdates);
  }, [chatConvo]);

  useScrollIntoView(chatContainerRef, [chatConvo]);
  
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

