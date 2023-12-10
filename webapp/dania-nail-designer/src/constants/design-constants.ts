import { Design, DesignElement } from "../types/design-types";


export const NailShape = {
  coffin: { label: 'Coffin', type: 'Tapered'},
  ballerina: { label: 'Ballerina', type: 'Tapered'},
  oval: { label: 'Oval', type: 'Rounded'},
  round: { label: 'Round', type: 'Rounded'},
  stiletto: { label: 'Stiletto', type: 'Pointy'},
  almondetto: { label: 'Almondetto', type: 'Pointy'},
  almond: { label: 'Almond', type: 'Pointy'},
  kitten: { label: 'Kitten', type: 'Pointy'},
  square: { label: 'Square', type: 'Square'},
} as const;


export const NailBase = {
  BaseGel: 'Base Gel',
  HardGel: 'Hard Gel',
  PolyGel: 'PolyGel',
  AcryGel: 'AcryGel',
} as const;


export const NailLength = {
  natural: {label: 'Natural', type: 'Natural'},
  x_short_S: {label: 'X Short', type: 'Same Length'},
  short_S: {label: 'Short', type: 'Same Length'},
  medium_S: {label: 'Medium', type: 'Same Length'},
  long_S: {label: 'Long', type: 'Same Length'},
  x_long_S: {label: 'X Long', type: 'Same Length'},
  xx_long_S: {label: '2X Long', type: 'Same Length'},
  x_short: {label: 'X Short', type: 'Extension'},
  short: {label: 'Short', type: 'Extension'},
  medium: {label: 'Medium', type: 'Extension'},
  long: {label: 'Long', type: 'Extension'},
  x_long: {label: 'X Long', type: 'Extension'},
  xx_long: {label: '2X Long', type: 'Extension'},
} as const;

export const ComplexityScore = {
  A: 0.5,
  B: 1.0,
  C: 1.5,
  D: 2.0,
  E: 2.5,
  F: 3.0,
} as const;

export const DesignElements: DesignElement[] = [
  { id: 0,  name: "French", complexity: "F" },
  { id: 1,  name: "Marble", complexity: "E" },
  { id: 2,  name: "Gradient", complexity: "D" },
  { id: 3,  name: "Glitter Gradient", complexity: "E" },
  { id: 4,  name: "Glitter Topper", complexity: "C"  },
  { id: 5,  name: "Dots", complexity: "C" },
  { id: 6,  name: "Jelly", complexity: "D" }, 
  { id: 7,  name: "Sticker", complexity: "D" }, 
  { id: 8,  name: "Gem", complexity: "C" }, 
  { id: 9,  name: "Gem Cluster", complexity: "D" }, 
  { id: 10, name: "Charm", complexity: "D" }, 
  { id: 11, name: "Sugaring", complexity: "D" }, 
  { id: 12, name: "Foil", complexity: "D" }, 
  { id: 13, name: "Chrome", complexity: "D" }, 
  { id: 14, name: "Magnetic", complexity: "E" }, 
  { id: 15, name: "Striping Tape", complexity: "D" }, 
  { id: 16, name: "Small Drawn Element", complexity: "D" }, 
  { id: 17, name: "Multiple Drawn Elements", complexity: "E" }, 
  { id: 18, name: "Inlay", complexity: "E" }
];


export function getDefaultDesign(): Design {
  return {
    left: {
      base: 'BaseGel',
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
      base: 'BaseGel',
      shape: 'stiletto',
      length: 'medium',
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