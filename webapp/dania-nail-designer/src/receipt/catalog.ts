import {
  BUILD_MATERIALS, BUILD_PRICES, BUILD_SERVICES, BuildMaterialId, BuildServiceId,
  DESIGN_TIERS, EXTRAS, GEMS_AND_CHARMS, HAIR_CUT, HAIR_DEEP_CONDITION, HAIR_DETANGLE, HAIR_LONG,
  HAIR_STYLING, HAIR_WASH, HAND_COLOR, HAND_LENGTHS, HAND_PREP, LATE, MANICURE, PEDICURES, TOE_SERVICES,
} from "./price-list";
import { CatalogItem } from "./types";

export function buildItemId(service: BuildServiceId, material: BuildMaterialId) {
  return `build_${service}_${material}`;
}

export function isBuildOffered(service: BuildServiceId, material: BuildMaterialId) {
  return BUILD_PRICES[service][material] !== null;
}

export const BUILD_ITEMS: CatalogItem[] = BUILD_SERVICES.flatMap(service =>
  BUILD_MATERIALS
    .filter(material => isBuildOffered(service.id, material.id))
    .map(material => ({
      id: buildItemId(service.id, material.id),
      name: `${service.receipt} ${material.label}`,
      price: BUILD_PRICES[service.id][material.id]!,
      unit: 'flat' as const,
    }))
);

const byId = (items: CatalogItem[], id: string) => items.find(i => i.id === id)!;

/** Receipt order: roughly the order the work happens in. */
const RECEIPT_ORDER: CatalogItem[] = [
  byId(HAND_PREP, 'removal_hands'),
  byId(TOE_SERVICES, 'removal_toes'),
  MANICURE,
  ...PEDICURES,
  ...BUILD_ITEMS,
  ...HAND_LENGTHS,
  byId(HAND_PREP, 'shortening'),
  byId(HAND_PREP, 'shape_change'),
  byId(HAND_PREP, 'repairs'),
  byId(TOE_SERVICES, 'toe_polygel'),
  byId(HAND_COLOR, 'gel_color'),
  byId(TOE_SERVICES, 'toe_gel_color'),
  byId(HAND_COLOR, 'gel_topper'),
  ...DESIGN_TIERS.flatMap(t => t.items),
  ...GEMS_AND_CHARMS,
  ...EXTRAS,
  HAIR_WASH,
  HAIR_DEEP_CONDITION,
  ...HAIR_DETANGLE,
  ...HAIR_STYLING,
  HAIR_LONG,
  ...HAIR_CUT,
  LATE,
];

export const CUSTOM_ORDER_START = 10_000;

const CATALOG = new Map<string, CatalogItem & { order: number }>(
  RECEIPT_ORDER.map((item, order) => [item.id, { ...item, order }])
);

if (CATALOG.size !== RECEIPT_ORDER.length) {
  throw new Error('Price list has two items with the same id');
}

export function getCatalogItem(id: string) {
  const item = CATALOG.get(id);
  if (!item) throw new Error(`Unknown price list item: ${id}`);
  return item;
}

/** Groups where only one option can be on a visit at a time. */
export const CHOICE_GROUPS = {
  build: BUILD_ITEMS.map(i => i.id),
  handLength: HAND_LENGTHS.map(i => i.id),
  pedicure: PEDICURES.map(i => i.id),
  detangle: HAIR_DETANGLE.map(i => i.id),
  styling: HAIR_STYLING.map(i => i.id),
  haircut: HAIR_CUT.map(i => i.id),
} as const;

export type ChoiceGroupId = keyof typeof CHOICE_GROUPS;
