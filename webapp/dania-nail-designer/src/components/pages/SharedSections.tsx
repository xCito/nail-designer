import { DESIGN_TIERS, EXTRAS, GEMS_AND_CHARMS, LATE } from "@/receipt/price-list";
import { ChipGrid, CountList, CountRow, CustomLineForm, PickerSection, ToggleChip } from "../pickers/Pickers";

/** Designs, gems and charms: the same on hands and toes. */
export function DesignSections() {
  return <>
    {DESIGN_TIERS.map(tier =>
      <PickerSection key={tier.title} title={`${tier.title} designs`} hint={tier.hint}>
        <CountList items={tier.items} quickFill={10} />
      </PickerSection>
    )}
    <PickerSection title="Gems & charms">
      <CountList items={GEMS_AND_CHARMS} />
    </PickerSection>
  </>;
}

export function ExtrasSection({ treatments = true }: { treatments?: boolean }) {
  return <PickerSection title="Extras">
    {treatments && <ChipGrid>
      {EXTRAS.filter(e => e.unit === 'flat').map(item => <ToggleChip key={item.id} item={item} />)}
    </ChipGrid>}
    <div className="count-list mt-2">
      {treatments && EXTRAS.filter(e => e.unit !== 'flat').map(item => <CountRow key={item.id} item={item} />)}
      <CountRow item={LATE} />
    </div>
  </PickerSection>;
}

export function SomethingElseSection() {
  return <PickerSection title="Something else" hint="Not on the price list">
    <CustomLineForm />
  </PickerSection>;
}
