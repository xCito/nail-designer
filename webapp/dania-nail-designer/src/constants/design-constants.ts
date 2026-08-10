
export const NailShapes = {
  stiletto:   { label: 'Stiletto',    type: 'Pointy',  size: 0 },
  almondetto: { label: 'Almondetto',  type: 'Pointy',  size: 1 },
  almond:     { label: 'Almond',      type: 'Pointy',  size: 2 },
  // kitten:     { label: 'Kitten',      type: 'Pointy',  size: 3 },
  ballerina:  { label: 'Ballerina',   type: 'Tapered', size: 3 },
  coffin:     { label: 'Coffin',      type: 'Tapered', size: 4 },
  oval:       { label: 'Oval',        type: 'Rounded', size: 5 },
  round:      { label: 'Round',       type: 'Rounded', size: 6 },
  square:     { label: 'Square',      type: 'Square',  size: 7 },
  duck:       { label: 'Duck',        type: 'Square',  size: 8 },
} as const;


export const NailBases = {
  NoBase: 'No Base',
  BaseGel: 'Base Gel',
  HardGel: 'Hard Gel',
  PolyGel: 'PolyGel',
  AcryGel: 'AcryGel',
  NoCare: 'I Don\'t Care',
} as const;


export const NailLengths = {
  none:    { label: 'None',    type: 'Natural',   size: 0},
  // x_short: { label: 'X Short', type: 'Extension', size: 1},
  short:   { label: 'Short',   type: 'Extension', size: 2},
  medium:  { label: 'Medium',  type: 'Extension', size: 3},
  long:    { label: 'Long',    type: 'Extension', size: 4},
  x_long:  { label: 'X Long',  type: 'Extension', size: 5},
  // xx_long: { label: '2X Long', type: 'Extension', size: 6},
} as const;

export const ComplexityScore = {
  A: 0.5,
  B: 1.0,
  C: 1.5,
  D: 2.0,
  E: 2.5,
  F: 3.0,
} as const;

export const DesignElements = {
  french:       { name: "French",            category: 'overlay',   complexity: "F", type: 'art' },
  marble:       { name: "Marble",            category: 'overlay',   complexity: "E", type: 'art' },
  gradient:     { name: "Gradient",          category: 'overlay',   complexity: "D", type: 'art' },
  glitter_grad: { name: "Glitter Gradient",  category: 'overlay',   complexity: "E", type: 'art' },
  glitter_top:  { name: "Glitter Topper",    category: 'overlay',   complexity: "C", type: 'art' },
  dots:         { name: "Dots",              category: 'overlay',   complexity: "C", type: 'art' },
  jelly:        { name: "Jelly",             category: 'overlay',   complexity: "D", type: 'art' },
  sticker:      { name: "Sticker",           category: 'overlay',   complexity: "D", type: 'art' },
  gem:          { name: "Gem",               category: 'accessory', complexity: "C", type: 'item' },
  gem_cluster:  { name: "Gem Cluster",       category: 'accessory', complexity: "D", type: 'item' },
  charm_sm:     { name: "Charm SM",          category: 'accessory', complexity: "D", type: 'item' },
  charm_lg:     { name: "Charm LG",          category: 'accessory', complexity: "E", type: 'item' },
  sugaring:     { name: "Sugaring",          category: 'overlay',   complexity: "D", type: 'art' },
  foil:         { name: "Foil",              category: 'overlay',   complexity: "D", type: 'art' },
  chrome:       { name: "Chrome",            category: 'overlay',   complexity: "D", type: 'art' },
  magnetic:     { name: "Magnetic",          category: 'overlay',   complexity: "E", type: 'art' },
  striping:     { name: "Striping Tape",     category: 'overlay',   complexity: "D", type: 'art' },
  small_art:    { name: "Small Art",         category: 'overlay',   complexity: "D", type: 'art' },
  multiple_art: { name: "Multiple Arts",     category: 'overlay',   complexity: "E", type: 'art' },
  inlay:        { name: "Inlay",             category: 'inlay',     complexity: "E", type: 'art' },
  base_color:   { name: "Gel Color",         category: 'overlay',   complexity: "A", type: 'base' },
  base_color_polish:   { name: "Polish Color",      category: 'overlay',   complexity: "A", type: 'base' },
} as const

export const NailServices = {
  manicure:   { name: 'Manicure', type: 'pre-service'},
  pedicure:   { name: 'Pedicure', type: 'pre-service'},
  new_set:    { name: 'New Set',        type: 'ext-service'},
  rebalance:  { name: 'Rebalance',      type: 'ext-service'},
  take_down:  { name: 'Removal',        type: 'pre-service'},
  // refill:     { name: 'Refill',         type: 'ext-service' },
} as const;

export const AddOnServices = {
  hydration:     { name: 'Hydration',      type: 'add-on'},
  massage:       { name: 'Massage',        type: 'add-on'},
  length_change: { name: 'Length Change',  type: 'add-on'},
  shape_change:  { name: 'Shape Change',   type: 'add-on'},
} as const;

export const NailBuildingPlatforms = {
  sculpted:       { name: 'Sculped' },
  non_sculpted:   { name: 'Tips' }
}

export function getDefaultDesign(): Design {
  return {
    left: {
      base: null,
      shape: 'round',
      length: 'none',
      f1: {
        name: 'Thumb',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f2: {
        name: 'Index',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f3: {
        name: 'Middle',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f4: {
        name: 'Ring',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f5: {
        name: 'Pinky',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
    },
    right: {
      base: null,
      shape: 'round',
      length: 'none',
      f1: {
        name: 'Thumb',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f2: {
        name: 'Index',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f3: {
        name: 'Middle',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f4: {
        name: 'Ring',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f5: {
        name: 'Pinky',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      }
    },
  }
}


// ====================================== Types ======================================

export interface Design {
  left: HandDesign;
  right: HandDesign;
} 

export interface HandDesign {
  shape: NailShapeId | null;
  base: NailBaseId | null;
  length: NailLengthId | null;
  f1: Finger;
  f2: Finger;
  f3: Finger;
  f4: Finger;
  f5: Finger;
}

export interface Finger {
  name: 'Thumb' | 'Index' | 'Middle' | 'Ring' | 'Pinky';
  ornaments: Set<'Gem' | 'Cluster' | 'Charm' | 'Foil' | 'Chain'>;
  designElems: Array<NailDesignElemId>;
  bgColor: string | null;
}


export type NailServiceId = keyof typeof NailServices;
export type NailPlatformId = keyof typeof NailBuildingPlatforms;
export type AddOnServiceId = keyof typeof AddOnServices;
export type NailBaseId = keyof typeof NailBases;
export type NailShapeId = keyof typeof NailShapes;
export type NailLengthId = keyof typeof NailLengths;
export type NailDesignElemId = keyof typeof DesignElements;
export type ComplexityId = keyof typeof ComplexityScore;

export type NailService = typeof NailServices[NailServiceId];
export type NailDesignElem = typeof DesignElements[NailDesignElemId]
export type NailLength = typeof NailLengths[NailLengthId];
export type NailShape = typeof NailShapes[NailShapeId];

export type NailLengthType = typeof NailLengths[NailLengthId]['type'];
export type NailShapeType = typeof NailShapes[NailShapeId]['type'];
