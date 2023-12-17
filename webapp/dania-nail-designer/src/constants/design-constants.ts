
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
} as const;


export const NailBases = {
  BaseGel: 'Base Gel',
  HardGel: 'Hard Gel',
  PolyGel: 'PolyGel',
  AcryGel: 'AcryGel',
} as const;


export const NailLengths = {
  natural: { label: 'Natural', type: 'Natural',   size: 0},
  x_short: { label: 'X Short', type: 'Extension', size: 1},
  short:   { label: 'Short',   type: 'Extension', size: 2},
  medium:  { label: 'Medium',  type: 'Extension', size: 3},
  long:    { label: 'Long',    type: 'Extension', size: 4},
  x_long:  { label: 'X Long',  type: 'Extension', size: 5},
  xx_long: { label: '2X Long', type: 'Extension', size: 6},
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
  french:       { name: "French",           complexity: "F", type: 'art' },
  marble:       { name: "Marble",           complexity: "E", type: 'art' },
  gradient:     { name: "Gradient",         complexity: "D", type: 'art' },
  glitter_grad: { name: "Glitter Gradient", complexity: "E", type: 'art' },
  glitter_top:  { name: "Glitter Topper",   complexity: "C", type: 'art' },
  dots:         { name: "Dots",             complexity: "C", type: 'art' },
  jelly:        { name: "Jelly",            complexity: "D", type: 'art' },
  sticker:      { name: "Sticker",          complexity: "D", type: 'art' },
  gem:          { name: "Gem",              complexity: "C", type: 'item'},
  gem_cluster:  { name: "Gem Cluster",      complexity: "D", type: 'item'},
  charm_sm:     { name: "Charm SM",         complexity: "D", type: 'item'},
  sugaring:     { name: "Sugaring",         complexity: "D", type: 'art' },
  foil:         { name: "Foil",             complexity: "D", type: 'art' },
  chrome:       { name: "Chrome",           complexity: "D", type: 'art' },
  magnetic:     { name: "Magnetic",         complexity: "E", type: 'art' },
  striping:     { name: "Striping Tape",    complexity: "D", type: 'art' },
  small_art:    { name: "Small Art",        complexity: "D", type: 'art' },
  multiple_art: { name: "Multiple Arts",    complexity: "E", type: 'art' },
  inlay:        { name: "Inlay",            complexity: "E", type: 'art' },
  base_color:   { name: "Gel Color",        complexity: "A", type: 'base'},
  charm_lg:     { name: "Charm LG",         complexity: "E", type: 'item'},
} as const

export const NailServices = {
  manicure:   { name: 'Basic Manicure', type: 'pre-service'},
  refill:     { name: 'Refill',         type: 'ext-service' },
  rebalance:  { name: 'Rebalance',      type: 'ext-service'},
  new_set:    { name: 'New Set',        type: 'ext-service'},
  take_down:  { name: 'Take Down',      type: 'pre-service'},
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
      length: 'natural',
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
      length: 'natural',
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
