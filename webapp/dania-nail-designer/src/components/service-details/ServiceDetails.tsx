import { ChangeEvent, FormEvent, useContext } from "react";
import { ServiceSectionRadio } from "./ServiceSectionRadio";
import { NailServiceContext } from "@/contexts/NailServiceContext";
import { NailBaseId, NailBases, NailLengthId, NailLengths, NailServiceId, NailServices, NailShapeId, NailShapes } from "@/constants/design-constants";
import { TitledGridContainer } from "./TitledGridContainer";
import { isBaseApplicable, isLengthApplicable, isShapeApplicable } from "@/service/helpers";

export function ServiceDetails() {
  const { chat, nailService, setNailService } = useContext(NailServiceContext);
  

  const onServiceChange = (optionId: NailServiceId | undefined) => {
    setNailService({...nailService, type: optionId})
  }
  const onBaseChange = (optionId: NailBaseId | undefined) => {
    setNailService({...nailService, desiredBase: optionId})
  }
  const onLengthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNailService({...nailService, desiredLength: e.currentTarget.value as NailLengthId})
  }
  const onCurLengthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNailService({...nailService, currentLength: e.currentTarget.value as NailLengthId})
  }
  const onShapeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNailService({...nailService, desiredShape: e.currentTarget.value as NailShapeId})
  }
  const onCurShapeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNailService({...nailService, currentShape: e.currentTarget.value as NailShapeId})
  }
  const onExtRemovalChange = (e: FormEvent<HTMLInputElement>) => {
    setNailService({
      ...nailService, 
      extensionRemoval: e.currentTarget.checked,
      gelPolishRemoval: nailService.gelPolishRemoval && false
    });
  }
  const onGelRemovalChange = (e: FormEvent<HTMLInputElement>) => {
    setNailService({
      ...nailService, 
      gelPolishRemoval: e.currentTarget.checked,
      extensionRemoval: nailService.extensionRemoval && false
    });
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
      options={NailBases.map(svc => ({...svc, disabled: !isBaseApplicable(nailService, svc.id)}))} 
      selectedId={nailService.desiredBase}
      onChange={onBaseChange} />

    <div className="d-flex gap-2">
      <TitledGridContainer title={''} columns={1} className="flex-grow-1 w-50 gap-0">
        <h4 className="ps-1 fw-normal">Desired Length</h4>
        <select defaultValue={nailService.desiredLength ?? -1} onChange={onLengthChange}>
          <option disabled value={-1}>Choose a length</option>
          {NailLengths.map(len => 
            <option 
              key={len.id}
              value={len.id} 
              disabled={!isLengthApplicable(nailService, len.id)}
              >
                {len.label}
            </option>
          )}
        </select>
        
        <h4 className="mt-3 ps-1 fw-normal">Current Length</h4>
        <select defaultValue={nailService.currentLength ?? -1} onChange={onCurLengthChange}>
          <option disabled value={-1}>Choose a length</option>
          {NailLengths.map(len => <option key={len.id} value={len.id}>{len.label}</option>)}
        </select>
      </TitledGridContainer>  

      <TitledGridContainer title={''} columns={1} className="flex-grow-1 w-50 gap-0">
        <h4 className="ps-1 fw-normal">Desired Shape</h4>
        <select defaultValue={nailService.desiredShape ?? -1} onChange={onShapeChange}>
          <option disabled value={-1}>Choose a shape</option>
          {NailShapes.map(shape =>
            <option 
              key={shape.id} 
              value={shape.id}
              disabled={!isShapeApplicable(nailService, shape.id)}
              >
                {shape.label}
              </option>
            )}
        </select>

        <h4 className="mt-3 ps-1 fw-normal">Current Shape</h4>
        <select defaultValue={nailService.currentShape ?? -1} onChange={onCurShapeChange}>
          <option disabled value={-1}>Choose a shape</option>
          {NailShapes.map(len => <option key={len.id} value={len.id}>{len.label}</option>)}
        </select>
      </TitledGridContainer>  
    </div>


    <TitledGridContainer title={"Add-ons"} columns={1} gap={2}>
      <label>
        Extension Removal
        <input type="checkbox" 
          onChange={onExtRemovalChange}
          checked={nailService.extensionRemoval} />
      </label>
     
      <label>
        Gel Removal
        <input type="checkbox" 
          onChange={onGelRemovalChange}
          checked={nailService.gelPolishRemoval} />
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