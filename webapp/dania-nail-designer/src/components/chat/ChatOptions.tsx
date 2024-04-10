import classNames from "classnames";
import { ChatOption, SelectedChatOption } from "./chat-reducer";
import { GoInfo } from "react-icons/go";
import { Tooltip } from 'react-tooltip';
import { MouseEvent, useState } from "react";

interface Props {
  options: readonly ChatOption[],
  selected: SelectedChatOption | undefined,
  onOptionClick: (option: ChatOption) => void; 
}
export function ChatOptions(p: Props) {
  const { options, selected, onOptionClick } = p;

  return <div className="options">
    {options.map((opt) => 
      <OptionButton key={opt.label} opt={opt} onOptionClick={onOptionClick} selected={selected} />
    )}
  </div>
}


interface OptButtonProps {
  opt: ChatOption;
  selected: SelectedChatOption | undefined;
  onOptionClick: (option: ChatOption) => void; 
}
function OptionButton({opt, onOptionClick, selected}: OptButtonProps) {
  const [isOpen, setOpen] = useState(false);
  
  const onInfoClick = (e: MouseEvent) => {
    // e.stopPropagation();
    setOpen(!isOpen);
  } 

  return (
    <button 
      className={classNames({'outline': selected?.option.label !== opt.label}, 'px-3 py-2 d-inline-flex align-items-center')} 
      onClick={() => onOptionClick(opt)}>
        {opt.label} 
        {opt.info && <>
          <GoInfo data-tooltip-id={opt.id + opt.label} size={24} onClick={onInfoClick} className="ms-3"/>
          <Tooltip id={opt.id + opt.label} openOnClick>
            <pre className="text-start m-0">{opt.info}</pre>
          </Tooltip>
        </>}
    </button>
  );
} 