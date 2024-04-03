import classNames from "classnames";
import { ChatOption, SelectedChatOption } from "./chat-reducer";

interface Props {
  options: readonly ChatOption[],
  selected: SelectedChatOption | undefined,
  onOptionClick: (option: ChatOption) => void; 
}
export function ChatOptions(p: Props) {
  const { options, selected, onOptionClick } = p;

  return <div className="options">
    {options.map((opt) => 
      <button 
        key={opt.label}
        className={classNames({'outline': selected?.option.label !== opt.label}, 'px-3 py-2')} 
        onClick={() => onOptionClick(opt)}
        children={opt.label} />
    )}
  </div>
}