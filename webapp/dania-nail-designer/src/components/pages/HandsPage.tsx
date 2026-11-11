import classNames from "classnames";
import { useState } from "react";
import { NailLengthId, NailLengths, NailShapes, NailShapeId } from "@/constants/design-constants";
import { CHOICE_GROUPS, buildItemId, isBuildOffered } from "@/receipt/catalog";
import {
  BUILD_MATERIALS, BUILD_PRICES, BUILD_SERVICES, BuildMaterialId, BuildServiceId,
  HAND_COLOR, HAND_LENGTHS, HAND_PREP, MANICURE,
} from "@/receipt/price-list";
import { useReceipt } from "@/receipt/ReceiptContext";
import { ChipGrid, CountRow, PickerSection, ToggleChip } from "../pickers/Pickers";
import { DesignSections, ExtrasSection, SomethingElseSection } from "./SharedSections";

const SHAPES = Object.entries(NailShapes) as Array<[NailShapeId, typeof NailShapes[NailShapeId]]>;
const LENGTHS = (Object.entries(NailLengths) as Array<[NailLengthId, typeof NailLengths[NailLengthId]]>)
  .sort((a, b) => a[1].size - b[1].size);

/** Which length line (if any) a length on the slider adds. */
const LENGTH_CHARGE: Partial<Record<NailLengthId, string>> = {
  long: 'length_long',
  x_long: 'length_x_long',
};

function parseBuildId(itemId: string | undefined) {
  if (!itemId) return null;
  const [, service, material] = itemId.split('_');
  return { service: service as BuildServiceId, material: material as BuildMaterialId };
}

function BuildPicker() {
  const { visit, dispatch } = useReceipt();
  const active = parseBuildId(visit.lines.find(l => CHOICE_GROUPS.build.includes(l.itemId))?.itemId);
  const [pickedMaterial, setPickedMaterial] = useState<BuildMaterialId>('polygel');
  const material = active?.material ?? pickedMaterial;
  const hasManicure = visit.lines.some(l => l.itemId === MANICURE.id);

  const chooseService = (service: BuildServiceId) => {
    if (active?.service === service) {
      dispatch({ type: 'choose', groupIds: CHOICE_GROUPS.build, itemId: null });
      return;
    }
    dispatch({ type: 'choose', groupIds: CHOICE_GROUPS.build, itemId: buildItemId(service, material) });
    // Every build comes with a manicure; it can be comped or turned off.
    if (!hasManicure) dispatch({ type: 'setQty', itemId: MANICURE.id, qty: 1 });
  };

  const chooseMaterial = (next: BuildMaterialId) => {
    setPickedMaterial(next);
    if (active) {
      dispatch({ type: 'choose', groupIds: CHOICE_GROUPS.build, itemId: buildItemId(active.service, next) });
    }
  };

  return <>
    <div className="chip-grid cols-3">
      {BUILD_SERVICES.map(s => {
        const price = BUILD_PRICES[s.id][material];
        return <button key={s.id} type="button"
          className={classNames('chip', { active: active?.service === s.id })}
          aria-pressed={active?.service === s.id}
          disabled={!isBuildOffered(s.id, material)}
          onClick={() => chooseService(s.id)}>
          <span className="chip-label">{s.label}</span>
          <span className="chip-price">{price === null ? 'New sets only' : `$${price}`}</span>
        </button>;
      })}
    </div>
    <div className="segmented mt-2" role="group" aria-label="Building material">
      {BUILD_MATERIALS.map(m =>
        <button key={m.id} type="button"
          className={classNames({ active: material === m.id })}
          aria-pressed={material === m.id}
          disabled={active !== null && !isBuildOffered(active.service, m.id)}
          onClick={() => chooseMaterial(m.id)}>
          {m.label}
        </button>
      )}
    </div>
  </>;
}

function ShapeAndLength() {
  const { visit, dispatch } = useReceipt();
  const lengthIndex = Math.max(0, LENGTHS.findIndex(([id]) => id === visit.length));
  const lengthCharge = HAND_LENGTHS.find(l => l.id === LENGTH_CHARGE[visit.length]);

  const setLength = (length: NailLengthId) => {
    dispatch({ type: 'setNail', length });
    dispatch({ type: 'choose', groupIds: CHOICE_GROUPS.handLength, itemId: LENGTH_CHARGE[length] ?? null });
  };

  return <>
    <div className="segmented shapes" role="group" aria-label="Nail shape (no charge)">
      {SHAPES.map(([id, shape]) =>
        <button key={id} type="button"
          className={classNames({ active: visit.shape === id })}
          aria-pressed={visit.shape === id}
          onClick={() => dispatch({ type: 'setNail', shape: id })}>
          {shape.label}
        </button>
      )}
    </div>

    <input
      className="w-100 mt-3"
      type="range"
      aria-label="Nail length"
      min={0}
      max={LENGTHS.length - 1}
      value={lengthIndex}
      onChange={e => setLength(LENGTHS[Number(e.target.value)][0])} />
    <div className="d-flex justify-content-between length-labels">
      <span>{LENGTHS[0][1].label}</span>
      <strong>
        {LENGTHS[lengthIndex][1].label}
        {lengthCharge ? ` · +$${lengthCharge.price}` : ' · free'}
      </strong>
      <span>{LENGTHS[LENGTHS.length - 1][1].label}</span>
    </div>
  </>;
}

export function HandsPage() {
  const prepFlat = HAND_PREP.filter(i => i.unit === 'flat');
  const repairs = HAND_PREP.find(i => i.id === 'repairs')!;

  return <>
    <PickerSection title="Service">
      <ChipGrid><ToggleChip item={MANICURE} /></ChipGrid>
      <div className="mt-2"><BuildPicker /></div>
    </PickerSection>

    <PickerSection title="Shape & length" hint="Shape is free">
      <ShapeAndLength />
    </PickerSection>

    <PickerSection title="Prep & fixes">
      <ChipGrid>
        {prepFlat.map(item => <ToggleChip key={item.id} item={item} />)}
      </ChipGrid>
      <div className="count-list mt-2"><CountRow item={repairs} /></div>
    </PickerSection>

    <PickerSection title="Color">
      <ChipGrid>
        {HAND_COLOR.map(item => <ToggleChip key={item.id} item={item} />)}
      </ChipGrid>
    </PickerSection>

    <DesignSections />
    <ExtrasSection />
    <SomethingElseSection />
  </>;
}
