import { TitledGridContainer } from "./TitledGridContainer";


interface Props {
  title: string;
  options: string[];
  selected: string | undefined;
  onChange: (option: string, isChecked: boolean) => void;
}
export function ServiceSectionRadio(p: Props) {
  const { title, options, selected, onChange } = p;

  return <TitledGridContainer title={title} columns={2}>
    {options.map(option => {
      const isChecked = selected === option;

      return <label key={option}>
          <input
            type="radio" 
            name={title}
            onChange={e => onChange(option, e.target.checked)}
            checked={isChecked} />
          {option}
        </label>
    })}
  </TitledGridContainer>
}