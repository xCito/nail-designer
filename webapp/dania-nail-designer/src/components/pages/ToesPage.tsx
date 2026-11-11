import { CHOICE_GROUPS } from "@/receipt/catalog";
import { PEDICURES, TOE_SERVICES } from "@/receipt/price-list";
import { ChipGrid, ChoiceChips, CountRow, PickerSection, ToggleChip } from "../pickers/Pickers";
import { DesignSections, ExtrasSection, SomethingElseSection } from "./SharedSections";

export function ToesPage() {
  return <>
    <PickerSection title="Pedicure" hint="Any length is free">
      <ChoiceChips items={PEDICURES} groupIds={CHOICE_GROUPS.pedicure} />
    </PickerSection>

    <PickerSection title="Removal & color">
      <ChipGrid>
        {TOE_SERVICES.filter(i => i.unit === 'flat').map(item => <ToggleChip key={item.id} item={item} />)}
      </ChipGrid>
      <div className="count-list mt-2">
        {TOE_SERVICES.filter(i => i.unit !== 'flat').map(item => <CountRow key={item.id} item={item} />)}
      </div>
    </PickerSection>

    <DesignSections />
    <ExtrasSection />
    <SomethingElseSection />
  </>;
}
