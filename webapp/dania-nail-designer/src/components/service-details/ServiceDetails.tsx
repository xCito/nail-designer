import { useState } from "react";
import { ServiceSectionRadio } from "./ServiceSectionRadio";
import { ServiceSectionToggle } from "./ServiceSectionToggle";

export function ServiceDetails() {
  const [selected, setSelected] = useState<string>('');
  const [selected2, setSelected2] = useState<string[]>([]);
  
  const onChange = (option: string) => {
    setSelected(option);
  }

  return <div className="service-details pe-2 w-100">
    <ServiceSectionRadio 
      title='Service' 
      options={['Option 1','Option 2','Option 3','Option 4']} 
      selected={selected}
      onChange={onChange} />
    <ServiceSectionRadio 
      title='Base' 
      options={['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7']} 
      selected={'Option 1'}
      onChange={console.log} />
    <ServiceSectionRadio 
      title='Length' 
      options={['Option 1','Option 2','Option 3','Option 4','Option 5']} 
      selected={'Option 1'}
      onChange={console.log} />

    <ServiceSectionToggle
      title='Add-Ons' 
      options={['Option Label 1','Option Label 2','Option Label Thing','Deep Tissue Massage','Option 5']} 
      selected={selected2}
      onChange={(opt, isChecked) => setSelected2(isChecked ? [...selected2, opt] : selected2.filter(o => o!=opt))} /> 
  </div>
}