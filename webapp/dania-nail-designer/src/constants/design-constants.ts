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

export const DesignElements = [
  { id: 0,  name: "French", complexity: "F", type: 'art' },
  { id: 1,  name: "Marble", complexity: "E", type: 'art' },
  { id: 2,  name: "Gradient", complexity: "D", type: 'art' },
  { id: 3,  name: "Glitter Gradient", complexity: "E", type: 'art' },
  { id: 4,  name: "Glitter Topper", complexity: "C" , type: 'art' },
  { id: 5,  name: "Dots", complexity: "C", type: 'art' },
  { id: 6,  name: "Jelly", complexity: "D", type: 'art' }, 
  { id: 7,  name: "Sticker", complexity: "D", type: 'art' }, 
  { id: 8,  name: "Gem", complexity: "C", type: 'item' }, 
  { id: 9,  name: "Gem Cluster", complexity: "D", type: 'item' }, 
  { id: 10, name: "Charm SM", complexity: "D", type: 'item' }, 
  { id: 11, name: "Sugaring", complexity: "D", type: 'art' }, 
  { id: 12, name: "Foil", complexity: "D", type: 'art' }, 
  { id: 13, name: "Chrome", complexity: "D", type: 'art' }, 
  { id: 14, name: "Magnetic", complexity: "E", type: 'art' }, 
  { id: 15, name: "Striping Tape", complexity: "D", type: 'art' }, 
  { id: 16, name: "Small Art", complexity: "D", type: 'art' }, 
  { id: 17, name: "Multiple Arts", complexity: "E", type: 'art' }, 
  { id: 18, name: "Inlay", complexity: "E", type: 'art' },
  { id: 19, name: "Base Color", complexity: "E", type: 'base' },
  { id: 20, name: "Charm LG", complexity: "E", type: 'item' }, 
] as const;


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