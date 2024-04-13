
export const NailServices = [
  { id: 'manicure',   label: 'Basic Manicure',        },
  { id: 'g_manicure', label: 'Gel Manicure',          },
  { id: 'enhan_ext',  label: 'Extension',             },
  { id: 'take_down',  label: 'Remove Extensions',     },
] as const;

export const NailShapes = [
  { id: 'stiletto',   label: 'Stiletto',        type: 'Pointy',     size: 0,    minLength: 1, maxLength: 100 },
  { id: 'almondetto', label: 'Almondetto',      type: 'Pointy',     size: 1,    minLength: 3, maxLength: 100  },
  { id: 'almond',     label: 'Almond',          type: 'Pointy',     size: 2,    minLength: 1, maxLength: 2  },
  { id: 'ballerina',  label: 'Ballerina',       type: 'Tapered',    size: 3,    minLength: 3, maxLength: 100  },
  { id: 'coffin',     label: 'Coffin',          type: 'Tapered',    size: 4,    minLength: 2, maxLength: 3  },
  { id: 'oval',       label: 'Oval',            type: 'Rounded',    size: 5,    minLength: 0, maxLength: 3  },
  { id: 'round',      label: 'Round',           type: 'Rounded',    size: 6,    minLength: 0, maxLength: 100  },
  { id: 'square',     label: 'Square',          type: 'Square',     size: 7,    minLength: 0, maxLength: 100  },
] as const;


export const NailBases = [
  { id: 'hard_gel',   label: 'HardGel',    },
  { id: 'base_gel',   label: 'Base Gel',   },
  { id: 'poly_gel',   label: 'PolyGel',    },
  { id: 'acrylic_base',   label: 'Acrylic',    },
  { id: 'builder_base',   label: 'BuilderGel',   },
  { id: 'gel_x_base',   label: 'Gel-X',    },
] as const;


export const NailLengths = [
  { id: 'short',    label: 'Short',     type: 'Extension',    size: 0 }, // short
  { id: 'med',     label: 'Medium',      type: 'Extension',  size: 1 }, // med - long
  { id: 'long',     label: 'Long',      type: 'Extension',  size: 2 }, // med - long
  { id: 'x_long',     label: 'Single XL',      type: 'Extension',  size: 3 }, // XL long
  { id: 'xx_long',    label: 'Double XL',     type: 'Extension',  size: 4 }, // 2XL long
  // { id: 'natural',    label: 'Natural',     type: 'Natural',    size: 0 }, // short
  // { id: 'x_short',    label: 'X Short',     type: 'Extension',  size: 1 },
  // { id: 'short',      label: 'Short',       type: 'Extension',  size: 2 },
  // { id: 'medium',     label: 'Medium',      type: 'Extension',  size: 3 }, // med - long
  // { id: 'long',       label: 'Long',        type: 'Extension',  size: 4 },
  // { id: 'x_long',     label: 'X Long',      type: 'Extension',  size: 5 }, // XL long
  // { id: 'xx_long',    label: '2X Long',     type: 'Extension',  size: 6 }, // 2XL long
] as const;

export const ComplexityScore = {
  A: 0.5,
  B: 1.0,
  C: 1.5,
  D: 2.0,
  E: 2.5,
  F: 3.0,
} as const;

export const DesignElements = [
  { id: 'french',       name: "French",           complexity: "F",  type: 'art'  },
  { id: 'marble',       name: "Marble",           complexity: "E",  type: 'art'  },
  { id: 'gradient',     name: "Gradient",         complexity: "D",  type: 'art'  },
  { id: 'glitter_grad', name: "Glitter Gradient", complexity: "E",  type: 'art'  },
  { id: 'glitter_top',  name: "Glitter Topper",   complexity: "C",  type: 'art'  },
  { id: 'dots',         name: "Dots",             complexity: "C",  type: 'art'  },
  { id: 'jelly',        name: "Jelly",            complexity: "D",  type: 'art'  },
  { id: 'sticker',      name: "Sticker",          complexity: "D",  type: 'art'  },
  { id: 'gem',          name: "Gem",              complexity: "C",  type: 'item' },
  { id: 'gem_cluster',  name: "Gem Cluster",      complexity: "D",  type: 'item' },
  { id: 'charm_sm',     name: "Charm SM",         complexity: "D",  type: 'item' },
  { id: 'sugaring',     name: "Sugaring",         complexity: "D",  type: 'art'  },
  { id: 'foil',         name: "Foil",             complexity: "D",  type: 'art'  },
  { id: 'chrome',       name: "Chrome",           complexity: "D",  type: 'art'  },
  { id: 'magnetic',     name: "Magnetic",         complexity: "E",  type: 'art'  },
  { id: 'striping',     name: "Striping Tape",    complexity: "D",  type: 'art'  },
  { id: 'small_art',    name: "Small Art",        complexity: "D",  type: 'art'  },
  { id: 'multiple_art', name: "Multiple Arts",    complexity: "E",  type: 'art'  },
  { id: 'inlay',        name: "Inlay",            complexity: "E",  type: 'art'  },
  { id: 'base_color',   name: "Gel Color",        complexity: "A",  type: 'base' },
  { id: 'charm_lg',     name: "Charm LG",         complexity: "E",  type: 'item' },
] as const


export const NailBuildingPlatforms = [
  { id: 'sculpted',      name: 'Sculped'  },
  { id: 'non_sculpted',  name: 'Tips'     }
] as const;

export function getDefaultDesign(): Design {
  return {
    left: {
      base: null,
      shape: 'round',
      length: 'short',
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
      length: 'short',
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


export type NailServiceId = typeof NailServices[number]['id'];
export type NailPlatformId = typeof NailBuildingPlatforms[number]['id'];
export type NailBaseId = typeof NailBases[number]['id'];
export type NailShapeId = typeof NailShapes[number]['id'];
export type NailLengthId = typeof NailLengths[number]['id'];
export type NailDesignElemId = typeof DesignElements[number]['id'];
export type ComplexityId = keyof typeof ComplexityScore;

export type NailService = typeof NailServices[number];
export type NailBase = typeof NailBases[number];
export type NailDesignElem = typeof DesignElements[number]
export type NailLength = typeof NailLengths[number];
export type NailShape = typeof NailShapes[number];

export type NailLengthType = typeof NailLengths[number]['type'];
export type NailShapeType = typeof NailShapes[number]['type'];

// ==================================== Functions ====================================

export function getNailServiceById(id: NailServiceId | string): NailService | undefined {
  return NailServices.find(s => s.id === id);
}

export function getNailBaseById(id: NailBaseId | string): NailBase | undefined {
  return NailBases.find(s => s.id === id);
}

export function getNailShapeById(id: NailShapeId | string): NailShape | undefined {
  return NailShapes.find(s => s.id === id);
}

export function getNailLengthById(id: NailLengthId | string): NailLength | undefined {
  return NailLengths.find(s => s.id === id);
}