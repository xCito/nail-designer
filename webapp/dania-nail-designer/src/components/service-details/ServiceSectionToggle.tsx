import { TitledGridContainer } from "./TitledGridContainer";


interface Props {
  title: string;
  options: string[];
  selected: string[];
  onChange: (option: string, isChecked: boolean) => void;
}
export function ServiceSectionToggle(p: Props) {
  const { title, options, selected, onChange } = p;

  return <TitledGridContainer title={title} columns={1} gap={2}>
    {options.map(option => {
      const isChecked = selected.includes(option);

      return <label key={option}>
          <input
            type="checkbox" 
            name={title}
            onChange={e => onChange(option, e.target.checked)}
            checked={isChecked} />
          {option}
        </label>
    })}
  </TitledGridContainer>
}