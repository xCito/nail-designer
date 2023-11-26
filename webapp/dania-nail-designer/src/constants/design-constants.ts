import { Design } from "../types/design-types";

export const NailShape = {
  Oval: 'Oval',
  Coffin: 'Coffin',
  Almond: 'Almond',
  Stilletto: 'Stilletto',
  // Almondetto: 'Almondetto'
} as const;

export const NailBase = {
  BaseGel: 'Base Gel',
  HardGel: 'Hard Gel',
  PolyGel: 'PolyGel',
  AcryGel: 'AcryGel',
} as const;

export const DesignElements = [
  { id: "French",           complexity: 3, name: "French"},
  { id: "Marble",           complexity: 3, name: "Marble"},
  { id: "Gradient",         complexity: 2, name: "Gradient"},
  { id: "GlitterTopper",    complexity: 1, name: "Glitter Topper"}, 
  { id: "Dots",             complexity: 1, name: "Dots"},
  { id: "Jelly",            complexity: 2, name: "Jelly"},
  { id: "Sticker",          complexity: 2, name: "Sticker"},
  { id: "Gem",              complexity: 1, name: "Gem"},
  { id: "GemCluster",       complexity: 2, name: "Gem Cluster"},
  { id: "Charm",            complexity: 2, name: "Charm"},
  { id: "Sugaring",         complexity: 3, name: "Sugaring"},
  { id: "Foil",             complexity: 2, name: "Foil"},
  { id: "Chrome",           complexity: 2, name: "Chrome"},
  { id: "Magnetic",         complexity: 1, name: "Magnetic"},
  { id: "StripingTape",     complexity: 2, name: "Striping Tape"},
  { id: "HandDrawnLevel_1", complexity: 2, name: "Hand Drawn Art 1"}, 
  { id: "HandDrawnLevel_2", complexity: 3, name: "Hand Drawn Art 2"}, 
  { id: "HandDrawnLevel_3", complexity: 4, name: "Hand Drawn Art 3"}, 
] as const;


export function getDefaultDesign(): Design {
  return {
    left: {
      base: 'BaseGel',
      shape: 'Stilletto',
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
      base: 'BaseGel',
      shape: 'Stilletto',
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