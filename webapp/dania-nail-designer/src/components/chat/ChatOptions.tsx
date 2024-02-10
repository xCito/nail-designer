import classNames from "classnames";

interface Props {
  options: string[],
  selected: string | undefined,
  onOptionClick: (option: string) => void; 
}
export function ChatOptions(p: Props) {
  const { options, selected, onOptionClick } = p;

  return <div className="options">
    {options.map((opt) => 
      <button 
        key={opt}
        className={classNames({'outline': selected !== opt}, 'px-3 py-2')} 
        onClick={() => onOptionClick(opt)}
        children={opt} />
    )}
  </div>
}