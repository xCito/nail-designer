import classNames from "classnames";
import { ChatOption } from "./Chat";

interface Props {
  options: ChatOption[],
  selected: string | undefined,
  onOptionClick: (option: ChatOption) => void; 
}
export function ChatOptions(p: Props) {
  const { options, selected, onOptionClick } = p;

  return <div className="options">
    {options.map((opt) => 
      <button 
        key={opt.label}
        className={classNames({'outline': selected !== opt.label}, 'px-3 py-2')} 
        onClick={() => onOptionClick(opt)}
        children={opt.label} />
    )}
  </div>
}