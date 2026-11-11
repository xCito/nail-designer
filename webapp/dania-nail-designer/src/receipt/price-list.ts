import { CatalogItem } from "./types";

/*
 * ============================================================================
 *  PRICE LIST
 *  Every price the app uses lives in this file. Change a number here and the
 *  app picks it up. Receipts that were already saved keep the prices they had.
 *
 *  Any line can still be re-priced or marked [COMP] on the receipt itself.
 * ============================================================================
 */

// ----------------------------------------------------------------- Hands ----

export const MANICURE: CatalogItem = { id: 'manicure', name: 'Manicure', price: 25, unit: 'flat' };

export const BUILD_SERVICES = [
  { id: 'ns',        label: 'New Set',   receipt: 'NS' },
  { id: 'rebalance', label: 'Rebalance', receipt: 'Rebalance' },
  { id: 'refill',    label: 'Refill',    receipt: 'Refill' },
] as const;

export const BUILD_MATERIALS = [
  { id: 'polygel', label: 'Polygel' },
  { id: 'builder', label: 'Builder Gel' },
  { id: 'acrygel', label: 'AcryGel' },
] as const;

export type BuildServiceId = typeof BUILD_SERVICES[number]['id'];
export type BuildMaterialId = typeof BUILD_MATERIALS[number]['id'];

/** Price of each build service, by material. null = not offered (Builder Gel is new sets only). */
export const BUILD_PRICES: Record<BuildServiceId, Record<BuildMaterialId, number | null>> = {
  ns:        { polygel: 35, builder: 20,   acrygel: 35 },
  rebalance: { polygel: 30, builder: null, acrygel: 30 },
  refill:    { polygel: 25, builder: null, acrygel: 25 },
};

/** Length charges for hands. Short and Medium are free, so they have no line. */
export const HAND_LENGTHS: CatalogItem[] = [
  { id: 'length_long',   name: 'Long Length',   price: 5,  unit: 'flat' },
  { id: 'length_x_long', name: 'X-Long Length', price: 10, unit: 'flat' },
];

export const HAND_PREP: CatalogItem[] = [
  { id: 'removal_hands', name: 'Removal to bare', label: 'Removal to bare', price: 10, unit: 'flat' },
  { id: 'shortening',    name: 'Shortening',      price: 5,  unit: 'flat' },
  { id: 'shape_change',  name: 'Shape Change',    price: 5,  unit: 'flat' },
  { id: 'repairs',       name: 'Repairs',         price: 3,  unit: 'nail', max: 10 },
];

export const HAND_COLOR: CatalogItem[] = [
  { id: 'gel_color',  name: 'Gel Color',  price: 5, unit: 'flat' },
  { id: 'gel_topper', name: 'Gel Topper', price: 5, unit: 'flat' },
];

// ------------------------------------------------------------------ Toes ----

export const PEDICURES: CatalogItem[] = [
  { id: 'pedi_russian',     name: 'Russian Pedicure',     price: 25, unit: 'flat' },
  { id: 'pedi_russian_gel', name: 'Russian Gel Pedicure', price: 30, unit: 'flat' },
];

export const TOE_SERVICES: CatalogItem[] = [
  { id: 'removal_toes', name: 'Removal',   price: 5, unit: 'flat' },
  { id: 'toe_gel_color', name: 'Gel Color', price: 5, unit: 'flat' },
  // Same price for half a nail, a pinky toe or a full big toe.
  { id: 'toe_polygel', name: 'Polygel', price: 3, unit: 'toe', max: 10 },
];

// --------------------------------------------- Designs (hands and toes) ----
// Priced by effort: about a minute = $1, a few minutes = $2, painted by hand = $5.

export const DESIGN_TIERS: Array<{ title: string; hint: string; items: CatalogItem[] }> = [
  {
    title: 'Quick',
    hint: 'Pressed or tapped on',
    items: [
      { id: 'sticker',     name: 'Sticker',        price: 1, unit: 'nail', max: 20 },
      { id: 'dots',        name: 'Dots',           price: 1, unit: 'nail', max: 20 },
      { id: 'glitter_top', name: 'Glitter Topper', price: 1, unit: 'nail', max: 20 },
      { id: 'foil',        name: 'Foil',           price: 1, unit: 'nail', max: 20 },
    ],
  },
  {
    title: 'Standard',
    hint: 'Technique or extra cured layers',
    items: [
      { id: 'french',   name: 'French',        price: 2, unit: 'nail', max: 20 },
      { id: 'gradient', name: 'Gradient',      price: 2, unit: 'nail', max: 20 },
      { id: 'chrome',   name: 'Chrome',        price: 2, unit: 'nail', max: 20 },
      { id: 'magnetic', name: 'Magnetic',      price: 2, unit: 'nail', max: 20 },
      { id: 'jelly',    name: 'Jelly',         price: 2, unit: 'nail', max: 20 },
      { id: 'striping', name: 'Striping Tape', price: 2, unit: 'nail', max: 20 },
      { id: 'sugaring', name: 'Sugaring',      price: 2, unit: 'nail', max: 20 },
    ],
  },
  {
    title: 'Detailed',
    hint: 'Freehand or many layers',
    items: [
      { id: 'wallpaper', name: 'Wallpaper', price: 5, unit: 'nail', max: 20 },
      { id: 'marble',    name: 'Marble',    price: 5, unit: 'nail', max: 20 },
      { id: 'small_art', name: 'Small Art', price: 5, unit: 'nail', max: 20 },
      { id: 'hand_art',  name: 'Hand-Painted Art', price: 5, unit: 'nail', max: 20 },
    ],
  },
];

export const GEMS_AND_CHARMS: CatalogItem[] = [
  { id: 'gems',           name: 'Gems',            label: 'Gems (1–4 on a hand)', price: 1,  unit: 'piece', max: 40 },
  { id: 'gems_scattered', name: 'Scattered Gems',  price: 5,  unit: 'hand',  max: 4 },
  { id: 'gem_cluster',    name: 'Gem Cluster',     label: 'Gem Cluster (10+ on a nail)', price: 5, unit: 'nail', max: 20 },
  { id: 'full_bling',     name: 'Full Bling',      price: 10, unit: 'nail',  max: 20 },
  { id: 'charm_small',    name: 'Small Charm',     label: 'Small Charm / 3D', price: 5,  unit: 'piece', max: 20 },
  { id: 'charm_large',    name: 'Large Charm',     label: 'Large Charm / 3D', price: 10, unit: 'piece', max: 20 },
];

// ---------------------------------------------- Extras (hands and toes) ----

export const EXTRAS: CatalogItem[] = [
  { id: 'supple',    name: 'Supple Treat.', price: 5, unit: 'time', max: 10 },
  { id: 'hydration', name: 'Hydration',     price: 5, unit: 'flat' },
  { id: 'buffing',   name: 'Buffing',       price: 5, unit: 'flat' },
];

/** On every page. */
export const LATE: CatalogItem = { id: 'late', name: 'Late', price: 5, unit: 'time', max: 10 };

// ------------------------------------------------------------------ Hair ----

export const HAIR_WASH: CatalogItem = { id: 'wash', name: 'Wash', price: 5, unit: 'wash', max: 5, qtyDisplay: 'multiple' };
export const HAIR_DEEP_CONDITION: CatalogItem = { id: 'deep_condition', name: 'Deep Conditioning', price: 5, unit: 'flat' };
export const HAIR_LONG: CatalogItem = { id: 'long_hair', name: 'Long Hair', label: 'Long Hair (waist or longer)', price: 5, unit: 'flat' };

export const HAIR_DETANGLE: CatalogItem[] = [
  { id: 'detangle_light', name: 'Detangle', label: 'Light', price: 5,  unit: 'flat' },
  { id: 'detangle_heavy', name: 'Detangle', label: 'Heavy', price: 10, unit: 'flat' },
];

export const HAIR_STYLING: CatalogItem[] = [
  { id: 'style_kid',         name: 'Styling & Drying', label: 'Kid',           price: 10, unit: 'flat' },
  { id: 'style_adult_short', name: 'Styling & Drying', label: 'Adult · short', price: 15, unit: 'flat' },
  { id: 'style_adult_long',  name: 'Styling & Drying', label: 'Adult · long',  price: 25, unit: 'flat' },
];

export const HAIR_CUT: CatalogItem[] = [
  { id: 'cut_kid',   name: 'Haircut', label: 'Kid',   price: 10, unit: 'flat' },
  { id: 'cut_adult', name: 'Haircut', label: 'Adult', price: 20, unit: 'flat' },
];
