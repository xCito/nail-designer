import { useContext } from "react";
import { ServiceSectionRadio } from "./ServiceSectionRadio";
import { NailServiceContext } from "@/contexts/NailServiceContext";
import { NailBaseId, NailBases, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId, NailShapes, getNailServiceById } from "@/constants/design-constants";
import { TitledGridContainer } from "./TitledGridContainer";

export function ServiceDetails() {
  const { nailService, setNailService } = useContext(NailServiceContext);
  

  const onServiceChange = (optionId: NailServiceId | undefined) => {
    setNailService({...nailService, type: optionId})
  }
  const onBaseChange = (optionId: NailBaseId | undefined) => {
    setNailService({...nailService, desiredBase: optionId})
  }
  const onLengthChange = (optionId: NailLengthId | undefined) => {
    setNailService({...nailService, desiredLength: optionId})
  }
  const onShapeChange = (optionId: NailShapeId | undefined) => {
    setNailService({...nailService, desiredShape: optionId})
  }

  const onAdditionalServiceChange = (valueId: NailServiceId, checked: boolean) => {
    setNailService({
      ...nailService,
      additional: !checked 
        ? nailService.additional.filter(v => v !== valueId)
        : [...nailService.additional.filter(v => !v.includes('manicure')), valueId]
    });
  }

  return <div className="service-details pe-2 w-100">
    <ServiceSectionRadio 
      title='Service' 
      options={NailServices} 
      selectedId={nailService.type}
      onChange={onServiceChange} />
    <ServiceSectionRadio 
      title='Base' 
      options={NailBases} 
      selectedId={nailService.desiredBase}
      onChange={onBaseChange} />
    <ServiceSectionRadio 
      title='Length' 
      options={NailLengths} 
      selectedId={nailService.desiredLength}
      onChange={onLengthChange} />
    <ServiceSectionRadio 
      title='Shape' 
      options={NailShapes} 
      selectedId={nailService.desiredShape}
      onChange={onShapeChange} />

    <TitledGridContainer title={"Add-ons"} columns={1} gap={2}>
      <label>
        Extension Removal
        <input type="checkbox" 
          onChange={e => setNailService({...nailService, extensionRemoval: e.currentTarget.checked})}
          checked={nailService.extensionRemoval} />
      </label>
     
      <label>
        Gel Removal
        <input type="checkbox" 
          onChange={e => setNailService({...nailService, gelPolishRemoval: e.currentTarget.checked})}
          checked={nailService.gelPolishRemoval} />
      </label>
     
      <label>
        Design Removal
        <input type="checkbox" 
          onChange={e => setNailService({...nailService, designRemoval: e.currentTarget.checked})}
          checked={nailService.designRemoval} />
      </label>
     
      <label>
        After - Manicure
        <input type="checkbox" 
          onChange={e => onAdditionalServiceChange('manicure', e.currentTarget.checked)}
          checked={nailService.additional.includes('manicure')} />
      </label>
     
      <label>
        After - Gel Manicure
        <input type="checkbox" 
          onChange={e => onAdditionalServiceChange('g_manicure', e.currentTarget.checked)}
          checked={nailService.additional.includes('g_manicure')} />
      </label>

      <label>
        After - Hand Massage
        <input type="checkbox" 
          onChange={e => setNailService({...nailService, massage: e.currentTarget.checked})}
          checked={nailService.massage} />
      </label>
    </TitledGridContainer>
  </div>
}