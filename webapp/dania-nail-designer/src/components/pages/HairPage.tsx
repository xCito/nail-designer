import { CHOICE_GROUPS } from "@/receipt/catalog";
import { HAIR_CUT, HAIR_DEEP_CONDITION, HAIR_DETANGLE, HAIR_LONG, HAIR_STYLING, HAIR_WASH } from "@/receipt/price-list";
import { ChipGrid, ChoiceChips, CountRow, PickerSection, ToggleChip } from "../pickers/Pickers";
import { ExtrasSection, SomethingElseSection } from "./SharedSections";

export function HairPage() {
  return <>
    <PickerSection title="Wash" hint="Count each wash">
      <div className="count-list"><CountRow item={HAIR_WASH} /></div>
      <ChipGrid>
        <ToggleChip item={HAIR_DEEP_CONDITION} />
        <ToggleChip item={HAIR_LONG} />
      </ChipGrid>
    </PickerSection>

    <PickerSection title="Detangle">
      <ChoiceChips items={HAIR_DETANGLE} groupIds={CHOICE_GROUPS.detangle} />
    </PickerSection>

    <PickerSection title="Styling & drying">
      <ChoiceChips items={HAIR_STYLING} groupIds={CHOICE_GROUPS.styling} />
    </PickerSection>

    <PickerSection title="Haircut">
      <ChoiceChips items={HAIR_CUT} groupIds={CHOICE_GROUPS.haircut} />
    </PickerSection>

    <ExtrasSection treatments={false} />
    <SomethingElseSection />
  </>;
}
