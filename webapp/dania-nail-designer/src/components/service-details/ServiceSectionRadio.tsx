import { TitledGridContainer } from "./TitledGridContainer";


interface Props<T extends string> {
  title: string;
  options: ReadonlyArray<{id: T, label: string}>;
  selectedId: T | undefined;
  onChange: (optionId: T, isChecked: boolean) => void;
}
export function ServiceSectionRadio<T extends string>(p: Props<T>) {
  const { title, options, selectedId, onChange } = p;

  return <TitledGridContainer title={title} columns={2}>
    {options.map(option => {
      const isChecked = selectedId === option.id;
      
      return <label key={option.id}>
          <input
            type="radio" 
            name={title}
            onChange={e => onChange(option.id, e.target.checked)}
            checked={isChecked} />
          {option.label}
        </label>
    })}
  </TitledGridContainer>
}